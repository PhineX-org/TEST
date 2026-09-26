// ============================================
// EL JASUS — EMOJI + REACTIONS SYSTEM
// ============================================

const EMOJI_CATEGORIES = {
    'وجوه': ['😀','😂','🤣','😍','🥹','😎','🤔','😤','😱','🤫','😈','👿','🫡','🥳','😴'],
    'أيدي': ['👍','👎','👏','🤝','🫶','✌️','🤞','🙏','💪','👊'],
    'رموز': ['❤️','🔥','⭐','💯','⚡','🎯','🏆','💎','👑','🎉','💀','🕵️','🔍','🗡️','🛡️'],
    'طعام': ['🍕','🍔','🍟','🌮','🍩','🧁','🍦','☕','🧃','🥤'],
    'أخرى': ['🚀','🎮','🎲','🤖','👻','💣','🗝️','🔑','📱','💡']
};

const QUICK_REACTIONS = ['👍','👎','😂','❤️','🔥','😱','🤔','💀'];

// ── EMOJI PICKER ──────────────────────────

class EmojiPicker {
    constructor(inputEl, sendBtn) {
        this.input = inputEl;
        this.send  = sendBtn;
        this.open  = false;
        this.buildPicker();
        this.buildBtn();
    }

    buildBtn() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id   = 'emoji-btn';
        btn.innerHTML = '😀';
        btn.style.cssText = `
            background:none;border:none;font-size:22px;cursor:pointer;
            padding:4px 8px;border-radius:8px;transition:transform .2s;
            flex-shrink:0;line-height:1;`;
        btn.onmouseover = () => btn.style.transform = 'scale(1.2)';
        btn.onmouseout  = () => btn.style.transform = 'scale(1)';
        btn.onclick = (e) => { e.stopPropagation(); this.toggle(); };

        if (this.send) {
            this.send.parentNode.insertBefore(btn, this.send);
        } else {
            this.input.parentNode.appendChild(btn);
        }
        this.btn = btn;
    }

    buildPicker() {
        if (document.getElementById('emoji-picker')) return;

        const picker = document.createElement('div');
        picker.id = 'emoji-picker';
        picker.style.cssText = `
            position:fixed;z-index:9500;width:300px;
            background:linear-gradient(135deg,rgba(10,14,26,.98),rgba(20,25,45,.98));
            border:2px solid rgba(0,242,255,.3);border-radius:20px;
            padding:14px;backdrop-filter:blur(20px);
            box-shadow:0 8px 32px rgba(0,0,0,.6);display:none;
            font-family:'Cairo',sans-serif;`;

        // Tabs
        const tabs = document.createElement('div');
        tabs.style.cssText = 'display:flex;gap:4px;margin-bottom:10px;flex-wrap:wrap;';

        const grid = document.createElement('div');
        grid.id = 'emoji-grid';
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-height:180px;overflow-y:auto;';

        Object.keys(EMOJI_CATEGORIES).forEach((cat, i) => {
            const tab = document.createElement('button');
            tab.textContent = cat;
            tab.style.cssText = `
                padding:4px 8px;border-radius:8px;border:1px solid rgba(0,242,255,.2);
                background:${i===0?'rgba(0,242,255,.15)':'transparent'};color:#ccc;
                font-size:10px;cursor:pointer;font-family:'Cairo',sans-serif;font-weight:700;
                transition:all .2s;`;
            tab.onclick = () => {
                tabs.querySelectorAll('button').forEach(b => b.style.background = 'transparent');
                tab.style.background = 'rgba(0,242,255,.15)';
                this.renderEmojis(cat, grid);
            };
            tabs.appendChild(tab);
        });

        // Search
        const search = document.createElement('input');
        search.placeholder = 'ابحث...';
        search.style.cssText = `
            width:100%;padding:6px 10px;background:rgba(0,242,255,.08);
            border:1px solid rgba(0,242,255,.2);border-radius:10px;
            color:white;font-size:12px;outline:none;margin-bottom:8px;
            font-family:'Cairo',sans-serif;`;
        search.oninput = () => {
            const q = search.value.trim();
            if (!q) { this.renderEmojis(Object.keys(EMOJI_CATEGORIES)[0], grid); return; }
            const all = Object.values(EMOJI_CATEGORIES).flat();
            grid.innerHTML = '';
            all.filter(e => e.includes(q)).slice(0, 49).forEach(e => grid.appendChild(this.emojiBtn(e)));
        };

        picker.appendChild(search);
        picker.appendChild(tabs);
        picker.appendChild(grid);
        document.body.appendChild(picker);
        this.picker = picker;

        // Render first category
        this.renderEmojis(Object.keys(EMOJI_CATEGORIES)[0], grid);

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!picker.contains(e.target) && e.target !== this.btn) this.close();
        });
    }

    emojiBtn(emoji) {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.style.cssText = `
            background:none;border:none;font-size:20px;cursor:pointer;
            padding:4px;border-radius:8px;transition:transform .15s;`;
        btn.onmouseover = () => btn.style.transform = 'scale(1.3)';
        btn.onmouseout  = () => btn.style.transform = 'scale(1)';
        btn.onclick = () => {
            this.insert(emoji);
            if (window.SND) SND.play('emoji');
        };
        return btn;
    }

    renderEmojis(cat, grid) {
        grid.innerHTML = '';
        (EMOJI_CATEGORIES[cat] || []).forEach(e => grid.appendChild(this.emojiBtn(e)));
    }

    insert(emoji) {
        const start = this.input.selectionStart;
        const end   = this.input.selectionEnd;
        const val   = this.input.value;
        this.input.value = val.slice(0, start) + emoji + val.slice(end);
        this.input.selectionStart = this.input.selectionEnd = start + emoji.length;
        this.input.focus();
    }

    toggle() {
        this.open ? this.close() : this.show();
    }

    show() {
        const rect = this.btn.getBoundingClientRect();
        const p = this.picker;
        p.style.display = 'block';
        // Position above the button
        const top = rect.top - p.offsetHeight - 8;
        p.style.top  = (top < 10 ? rect.bottom + 8 : top) + 'px';
        p.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - 310)) + 'px';
        this.open = true;
    }

    close() {
        if (this.picker) this.picker.style.display = 'none';
        this.open = false;
    }
}

// ── REACTION SYSTEM ───────────────────────

class ReactionSystem {
    constructor(container) {
        this.container = container;
        this.floating  = [];
        this.buildBar();
    }

    buildBar() {
        const bar = document.createElement('div');
        bar.id = 'reaction-bar';
        bar.style.cssText = `
            display:flex;gap:8px;align-items:center;
            padding:8px 12px;
            background:linear-gradient(135deg,rgba(10,14,26,.9),rgba(20,25,45,.9));
            border:2px solid rgba(0,242,255,.2);border-radius:40px;
            backdrop-filter:blur(12px);flex-wrap:wrap;justify-content:center;`;

        QUICK_REACTIONS.forEach(emoji => {
            const btn = document.createElement('button');
            btn.textContent = emoji;
            btn.dataset.emoji = emoji;
            btn.style.cssText = `
                background:none;border:none;font-size:24px;cursor:pointer;
                padding:4px 6px;border-radius:10px;transition:all .2s;
                position:relative;`;
            btn.onmouseover = () => btn.style.transform = 'scale(1.3) translateY(-4px)';
            btn.onmouseout  = () => btn.style.transform = '';
            btn.onclick = () => this.react(emoji, btn);
            bar.appendChild(btn);
        });

        this.bar = bar;
        if (this.container) this.container.appendChild(bar);
    }

    react(emoji, btn) {
        // Floating animation
        this.floatEmoji(emoji, btn);

        // Fire event (for Firebase sync)
        window.dispatchEvent(new CustomEvent('eljasus:reaction', { detail: { emoji } }));

        // Sound
        if (window.SND) SND.play('reaction');

        // Bump counter on button
        let badge = btn.querySelector('.rbadge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'rbadge';
            badge.style.cssText = `
                position:absolute;top:-6px;right:-6px;background:#ff3366;
                border-radius:10px;font-size:9px;font-weight:900;color:white;
                padding:1px 5px;min-width:16px;text-align:center;
                font-family:'Orbitron',sans-serif;`;
            btn.appendChild(badge);
        }
        badge.textContent = (parseInt(badge.textContent||0) + 1);
        setTimeout(() => { if (badge.parentNode) badge.remove(); }, 4000);
    }

    floatEmoji(emoji, sourceEl) {
        const el = document.createElement('div');
        el.textContent = emoji;

        const rect = sourceEl ? sourceEl.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2 };
        el.style.cssText = `
            position:fixed;left:${rect.left}px;top:${rect.top}px;
            font-size:32px;pointer-events:none;z-index:9999;
            animation:floatReact 2s ease-out forwards;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    }

    // Show reaction from another player
    showRemote(emoji, playerName) {
        this.floatEmoji(emoji, null);
        showToast(`${playerName} ${emoji}`);
    }
}

// ── INJECT CSS ─────────────────────────────
const style = document.createElement('style');
style.textContent = `
@keyframes floatReact {
    0%   { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-120px) scale(1.5); opacity: 0; }
}
#emoji-grid::-webkit-scrollbar { width: 4px; }
#emoji-grid::-webkit-scrollbar-track { background: transparent; }
#emoji-grid::-webkit-scrollbar-thumb { background: rgba(0,242,255,.3); border-radius: 2px; }
`;
document.head.appendChild(style);

// ── EXPORTS ───────────────────────────────
window.EmojiPicker   = EmojiPicker;
window.ReactionSystem = ReactionSystem;
