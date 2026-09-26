// ============================================================
// EL JASUS — CHAT SYSTEM v3
// Real-time text chat with emoji picker & phase-aware layout
// ============================================================

class ChatSystem {
    constructor(db, roomCode, currentUid, currentUsername, auth) {
        this.db       = db;
        this.roomCode = roomCode;
        this.uid      = currentUid;
        this.username = currentUsername;
        this.auth     = auth;

        this.messages        = [];
        this._unsubMessages  = null;
        this._lastMessageTime = 0;
        this.playerColors    = {};
        this._emojiOpen      = false;

        this.buildUI();
        this.listenMessages();
    }

    buildUI() {
        if (document.getElementById('chat-container')) return;

        const EMOJIS = ['😀','😂','🥰','😎','🤔','😤','🤩','😭','💀','🔥',
                        '💯','👍','👎','❤️','💔','🎉','🚀','💪','🤝','✅',
                        '❌','⚠️','🎮','🕵️','🏆','🎯','💡','🔍','👀','🤫'];

        document.body.insertAdjacentHTML('beforeend', `
        <div id="chat-container" style="
            position:fixed;bottom:136px;left:20px;z-index:8400;
            width:280px;height:380px;
            background:linear-gradient(160deg,rgba(8,12,24,.96),rgba(18,15,35,.96));
            border:2px solid rgba(0,242,255,.25);border-radius:16px;
            display:none;flex-direction:column;overflow:hidden;
            box-shadow:0 8px 32px rgba(0,0,0,.5);font-family:'Cairo',sans-serif;">

            <!-- Header -->
            <div style="padding:12px 14px;border-bottom:1px solid rgba(0,242,255,.1);
                flex-shrink:0;display:flex;align-items:center;justify-content:space-between;">
                <h3 style="color:#00f2ff;font-size:12px;font-weight:900;
                    text-transform:uppercase;letter-spacing:1px;margin:0;">💬 الدردشة</h3>
                <button id="chat-minimize-btn" style="background:none;border:none;color:#555;
                    cursor:pointer;font-size:14px;padding:4px 6px;transition:color .2s;">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>

            <!-- Messages -->
            <div id="chat-messages" style="flex:1;overflow-y:auto;padding:10px;
                display:flex;flex-direction:column;gap:6px;
                scrollbar-width:thin;scrollbar-color:rgba(0,242,255,.3) transparent;">
                <p style="color:#555;font-size:10px;text-align:center;
                    padding:20px 10px;margin:0;">جاهز للدردشة 👋</p>
            </div>

            <!-- Emoji Picker -->
            <div id="chat-emoji-picker" style="
                display:none;padding:6px 8px;
                border-top:1px solid rgba(0,242,255,.1);
                background:rgba(0,0,0,.35);flex-wrap:wrap;
                max-height:76px;overflow-y:auto;flex-shrink:0;">
                ${EMOJIS.map(e => `<button class="_ec-btn" data-e="${e}" style="
                    background:none;border:none;cursor:pointer;
                    font-size:18px;padding:3px 4px;border-radius:5px;
                    transition:transform .1s;line-height:1.2;" 
                    onmouseover="this.style.transform='scale(1.3)'"
                    onmouseout="this.style.transform='scale(1)'">${e}</button>`).join('')}
            </div>

            <!-- Input Row -->
            <div style="padding:10px;border-top:1px solid rgba(0,242,255,.1);
                flex-shrink:0;display:flex;gap:6px;align-items:center;">
                <button id="chat-emoji-toggle" title="إيموجي" style="
                    width:32px;height:32px;border-radius:8px;flex-shrink:0;
                    background:rgba(255,255,255,.05);border:1px solid rgba(0,242,255,.2);
                    color:#00f2ff;cursor:pointer;font-size:15px;
                    display:flex;align-items:center;justify-content:center;
                    transition:background .2s;">😊</button>
                <input id="chat-input" type="text" placeholder="اكتب رسالة..." maxlength="300" style="
                    flex:1;padding:8px 11px;border-radius:10px;
                    background:rgba(255,255,255,.05);border:1px solid rgba(0,242,255,.2);
                    color:#fff;font-family:'Cairo',sans-serif;font-size:12px;outline:none;
                    transition:border .2s;"
                    onfocus="this.style.borderColor='rgba(0,242,255,.55)'"
                    onblur="this.style.borderColor='rgba(0,242,255,.2)'">
                <button id="chat-send-btn" style="
                    width:36px;height:36px;border-radius:10px;flex-shrink:0;
                    background:linear-gradient(135deg,#00f2ff,#7c30ff);
                    border:none;color:white;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    font-size:14px;transition:opacity .2s;"
                    onmouseover="this.style.opacity='.8'"
                    onmouseout="this.style.opacity='1'">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>`);

        // Wire events
        document.getElementById('chat-send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('chat-input').addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
        });
        document.getElementById('chat-minimize-btn').addEventListener('click', () => this.toggleMinimize());

        // Emoji toggle
        const toggle = document.getElementById('chat-emoji-toggle');
        const picker = document.getElementById('chat-emoji-picker');
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            this._emojiOpen = !this._emojiOpen;
            picker.style.display = this._emojiOpen ? 'flex' : 'none';
        });
        picker.addEventListener('click', e => {
            const btn = e.target.closest('._ec-btn');
            if (!btn) return;
            const input = document.getElementById('chat-input');
            input.value += btn.dataset.e;
            input.focus();
        });
        document.addEventListener('click', e => {
            if (!e.target.closest('#chat-emoji-toggle') && !e.target.closest('#chat-emoji-picker')) {
                this._emojiOpen = false;
                picker.style.display = 'none';
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const text  = input.value.trim();
        if (!text) return;

        const now = Date.now();
        if (now - this._lastMessageTime < 500) {
            if (window.showToast) showToast('⏱️ أبطئ قليلاً!');
            return;
        }

        if (window.MOD) {
            const blocked = await MOD.scan(text);
            if (blocked) { input.value = ''; return; }
        }

        try {
            const { push, ref, serverTimestamp } = window._firebaseFns;
            await push(ref(this.db, `rooms/${this.roomCode}/messages`), {
                uid:       this.uid,
                username:  this.username,
                text,
                timestamp: serverTimestamp?.() || Date.now(),
                type:      'text'
            });
            this._lastMessageTime = Date.now();
            input.value = '';
            input.focus();
            if (window.SND) SND.play?.('click');
        } catch (err) {
            console.error('[Chat] sendMessage error:', err);
        }
    }

    listenMessages() {
        const { ref, onChildAdded } = window._firebaseFns;
        if (!ref || !onChildAdded) return;
        const msgRef = ref(this.db, `rooms/${this.roomCode}/messages`);
        this._unsubMessages = onChildAdded(msgRef, snap => {
            const msg = snap.val();
            if (!msg || this.messages.some(m => m.id === snap.key)) return;
            msg.id = snap.key;
            this.messages.push(msg);
            this.renderMessage(msg);
        });
    }

    renderMessage(msg) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        container.querySelector('p')?.remove();

        if (!this.playerColors[msg.uid]) {
            const cols = ['#00f2ff','#7c30ff','#22c55e','#f59e0b','#ef4444','#06b6d4','#a855f7'];
            this.playerColors[msg.uid] = cols[Object.keys(this.playerColors).length % cols.length];
        }
        const color = this.playerColors[msg.uid];
        const isOwn = msg.uid === this.uid;
        const time  = new Date(msg.timestamp).toLocaleTimeString('ar-SA', { hour:'2-digit', minute:'2-digit' });

        const el = document.createElement('div');
        el.style.cssText = `display:flex;gap:8px;margin-bottom:2px;${isOwn ? 'flex-direction:row-reverse;' : ''}`;
        el.innerHTML = `
            <div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;
                background:${color};display:flex;align-items:center;justify-content:center;
                font-size:10px;color:white;font-weight:900;">
                ${msg.username.charAt(0).toUpperCase()}
            </div>
            <div style="flex:1;${isOwn ? 'text-align:right;' : ''}">
                <div style="display:flex;align-items:center;gap:6px;
                    ${isOwn ? 'flex-direction:row-reverse;' : ''}margin-bottom:2px;">
                    <span style="color:${color};font-size:10px;font-weight:900;
                        max-width:100px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${msg.username}</span>
                    <span style="color:rgba(255,255,255,.3);font-size:9px;">${time}</span>
                </div>
                <p style="background:${isOwn ? 'rgba(0,242,255,.15)' : 'rgba(255,255,255,.05)'};
                    border:1px solid ${isOwn ? 'rgba(0,242,255,.3)' : 'rgba(255,255,255,.08)'};
                    border-radius:10px;padding:7px 10px;margin:0;color:#fff;
                    font-size:12px;line-height:1.4;word-wrap:break-word;max-width:200px;">
                    ${this.escapeHTML(msg.text)}
                </p>
            </div>`;

        container.appendChild(el);
        setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
    }

    toggleMinimize() {
        const container = document.getElementById('chat-container');
        const btn       = document.getElementById('chat-minimize-btn');
        const msgs      = document.getElementById('chat-messages');
        const picker    = document.getElementById('chat-emoji-picker');
        const inputRow  = container.querySelector('div:last-child');
        const mini      = container.dataset.minimized === 'true';

        if (mini) {
            container.style.height = '380px';
            msgs.style.display     = 'flex';
            if (inputRow) inputRow.style.display = 'flex';
            btn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            container.dataset.minimized = 'false';
        } else {
            container.style.height = '44px';
            msgs.style.display     = 'none';
            if (picker)   picker.style.display   = 'none';
            if (inputRow) inputRow.style.display  = 'none';
            this._emojiOpen = false;
            btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            container.dataset.minimized = 'true';
        }
    }

    repositionForPhase(phase) {
        const container = document.getElementById('chat-container');
        if (!container) return;

        // Hide during waiting room (room overlay is shown instead)
        if (phase === 'waiting') {
            container.style.display = 'none';
            return;
        }

        const positions = {
            playing:    { bottom:'136px', left:'20px', right:'auto', width:'280px', height:'380px' },
            discussion: { bottom:'20px',  left:'20px', right:'auto', width:'260px', height:'320px' },
            voting:     { bottom:'20px',  left:'20px', right:'auto', width:'240px', height:'280px' },
            reveal:     { bottom:'20px',  left:'20px', right:'auto', width:'240px', height:'280px' },
            spy_guess:  { bottom:'20px',  left:'20px', right:'auto', width:'240px', height:'280px' },
            result:     { bottom:'20px',  left:'20px', right:'auto', width:'240px', height:'280px' },
        };

        const pos = positions[phase] || positions.playing;
        container.style.display = 'flex';
        Object.assign(container.style, {
            bottom: pos.bottom, left: pos.left,
            right:  pos.right,  width: pos.width, height: pos.height
        });

        // Restore minimized if it was hidden
        if (container.dataset.minimized === 'true') {
            container.style.height = '44px';
        }
    }

    addSystemMessage(text) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        const el = document.createElement('div');
        el.style.cssText = `text-align:center;padding:6px 10px;
            color:rgba(0,242,255,.6);font-size:10px;font-style:italic;
            border-top:1px solid rgba(0,242,255,.1);border-bottom:1px solid rgba(0,242,255,.1);`;
        el.textContent = text;
        container.appendChild(el);
        setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
    }

    escapeHTML(text) {
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    cleanup() {
        if (this._unsubMessages) try { this._unsubMessages(); } catch(e) {}
        document.getElementById('chat-container')?.remove();
    }
}

window.ChatSystem = ChatSystem;