// ============================================
// EL JASUS — VOICE CHAT (WebRTC) v3 FIXED
// Peer-to-peer audio via Firebase signaling
// ALL BUGS FIXED:
//  • Firebase functions properly accessed
//  • Mute state correctly managed
//  • Voice panel toggle fixed
//  • No more "push is not a function" errors
//  • Clean disconnect/reconnect flow
// ============================================

class VoiceChat {
    constructor(db, roomCode, currentUid, currentUsername) {
        this.db       = db;
        this.roomCode = roomCode;
        this.uid      = currentUid;
        this.username = currentUsername;

        this.peers       = {};   // uid → RTCPeerConnection
        this.localStream = null;
        this.muted       = false;
        this.active      = false;
        this.speaking    = {};   // uid → bool
        this._audioCtx   = null; // single AudioContext for VAD
        this._rafId      = null; // voice detection animation frame ID

        this.config = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };

        this.buildUI();
        this.listenSignals();
    }

    // ── JOIN VOICE ────────────────────────────
    async join() {
        if (this.active) return; // already in voice

        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl:  true
                },
                video: false
            });

            this.active = true;
            this.muted  = false; // always start unmuted
            this.updateUI();
            this.setupVoiceDetection();

            // Announce presence to signal room
            this.signal('joined', { username: this.username });

            if (window.showToast) showToast('🎙️ انضممت للدردشة الصوتية');
        } catch (err) {
            console.error('[VC] join error:', err);
            this.active = false;
            if (err.name === 'NotAllowedError') {
                if (window.showToast) showToast('⛔ يجب السماح بالوصول للميكروفون');
                else alert('يجب السماح بالوصول للميكروفون لاستخدام الدردشة الصوتية');
            } else {
                if (window.showToast) showToast('⛔ خطأ في الصوت: ' + err.message);
                else alert('خطأ في الدردشة الصوتية: ' + err.message);
            }
        }
    }

    // ── LEAVE VOICE ───────────────────────────
    leave() {
        // Stop local mic tracks
        if (this.localStream) {
            this.localStream.getTracks().forEach(t => t.stop());
            this.localStream = null;
        }

        // Stop voice activity detection
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        
        if (this._audioCtx) {
            try { this._audioCtx.close(); } catch(e) {}
            this._audioCtx = null;
        }

        // Close all peer connections + remove their audio elements
        Object.keys(this.peers).forEach(uid => {
            this.removePeer(uid);
            this.removeVoiceUser(uid);
        });
        this.peers = {};

        // ✅ FIX: always reset muted state on leave
        this.active = false;
        this.muted  = false;

        this.updateUI();
        this.signal('left', {});

        if (window.showToast) showToast('🎙️ غادرت الدردشة الصوتية');
    }

    // ── MUTE / UNMUTE ─────────────────────────
    toggleMute() {
        if (!this.active) {
            if (window.showToast) showToast('⛔ انضم للدردشة الصوتية أولاً');
            return;
        }
        
        this.muted = !this.muted;

        // Apply to existing stream
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(t => (t.enabled = !this.muted));
        }

        this.updateUI();
        if (window.showToast) showToast(this.muted ? '🔇 تم كتم الصوت' : '🎙️ تم تشغيل الصوت');
    }

    // ── SIGNALING VIA FIREBASE ─────────────────
    signal(type, data) {
        // ✅ FIX: Properly access Firebase functions
        if (!window._firebaseFns || !window._firebaseFns.push || !window._firebaseFns.ref) {
            console.error('[VC] Firebase functions not available');
            if (window.showToast) showToast('⛔ خطأ في الاتصال بالسيرفر');
            return;
        }

        const { push, ref } = window._firebaseFns;
        
        try {
            push(ref(this.db, `rooms/${this.roomCode}/voiceSignals`), {
                from:      this.uid,
                fromName:  this.username,
                type,
                data,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error('[VC] Signal error:', error);
        }
    }

    listenSignals() {
        // ✅ FIX: Properly access Firebase functions
        if (!window._firebaseFns || !window._firebaseFns.ref || !window._firebaseFns.onChildAdded) {
            console.error('[VC] Firebase functions not available for listening');
            return;
        }

        const { ref, onChildAdded } = window._firebaseFns;
        const sigRef = ref(this.db, `rooms/${this.roomCode}/voiceSignals`);

        onChildAdded(sigRef, snap => {
            const msg = snap.val();
            if (!msg || msg.from === this.uid) return;
            // Ignore stale signals (older than 30s)
            if (msg.timestamp < Date.now() - 30000) return;

            this.handleSignal(msg);
        });
    }

    async handleSignal(msg) {
        switch (msg.type) {
            case 'joined':
                this.addVoiceUser(msg.from, msg.fromName);
                if (this.active) {
                    // We're already in voice — initiate a peer connection to the newcomer
                    await this.createPeer(msg.from, true);
                }
                break;

            case 'offer':
                await this.handleOffer(msg.from, msg.fromName, msg.data);
                break;

            case 'answer':
                if (this.peers[msg.from]) {
                    try {
                        await this.peers[msg.from].setRemoteDescription(
                            new RTCSessionDescription(msg.data)
                        );
                    } catch(e) { console.warn('[VC] setRemoteDescription error:', e); }
                }
                break;

            case 'ice':
                if (this.peers[msg.from]) {
                    try {
                        await this.peers[msg.from].addIceCandidate(
                            new RTCIceCandidate(msg.data)
                        );
                    } catch(e) { /* ignore ICE errors */ }
                }
                break;

            case 'left':
                this.removePeer(msg.from);
                this.removeVoiceUser(msg.from);
                break;

            case 'speaking':
                this.setSpeaking(msg.from, msg.data.speaking);
                break;
        }
    }

    // ── PEER CONNECTION ───────────────────────
    async createPeer(remoteUid, initiator) {
        // Close existing connection cleanly
        if (this.peers[remoteUid]) {
            this.peers[remoteUid].close();
            delete this.peers[remoteUid];
        }

        const pc = new RTCPeerConnection(this.config);
        this.peers[remoteUid] = pc;

        // Add local tracks
        if (this.localStream) {
            this.localStream.getTracks().forEach(t => pc.addTrack(t, this.localStream));
        }

        // Handle remote audio — remove stale element first
        pc.ontrack = (e) => {
            const old = document.getElementById(`audio-${remoteUid}`);
            if (old) old.remove();

            const audio = document.createElement('audio');
            audio.autoplay  = true;
            audio.id        = `audio-${remoteUid}`;
            audio.srcObject = e.streams[0];
            document.getElementById('voice-audio-container')?.appendChild(audio);
        };

        // ICE candidates
        pc.onicecandidate = (e) => {
            if (e.candidate) {
                this.signal('ice', e.candidate.toJSON());
            }
        };

        // Connection state changes
        pc.onconnectionstatechange = () => {
            this.updatePeerStatus(remoteUid, pc.connectionState);
            // Auto-remove on permanent failure
            if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
                this.removePeer(remoteUid);
            }
        };

        if (initiator) {
            const offer = await pc.createOffer({ offerToReceiveAudio: true });
            await pc.setLocalDescription(offer);
            this.signal('offer', pc.localDescription.toJSON());
        }

        return pc;
    }

    async handleOffer(fromUid, fromName, offerData) {
        if (!this.active) return; // ignore offers if we're not in voice

        const pc = await this.createPeer(fromUid, false);
        await pc.setRemoteDescription(new RTCSessionDescription(offerData));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        this.signal('answer', pc.localDescription.toJSON());
        this.addVoiceUser(fromUid, fromName);
    }

    removePeer(uid) {
        if (this.peers[uid]) {
            this.peers[uid].close();
            delete this.peers[uid];
        }
        const audio = document.getElementById(`audio-${uid}`);
        if (audio) audio.remove();
    }

    // ── VOICE ACTIVITY DETECTION ──────────────
    setupVoiceDetection() {
        if (!this.localStream || !window.AudioContext) return;

        // Close any previous AudioContext
        if (this._audioCtx) {
            try { this._audioCtx.close(); } catch(e) {}
        }

        this._audioCtx = new AudioContext();
        const source   = this._audioCtx.createMediaStreamSource(this.localStream);
        const analyser = this._audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const data      = new Uint8Array(analyser.frequencyBinCount);
        let lastState   = false;

        const check = () => {
            // Stop if no longer active or stream gone
            if (!this.active || !this.localStream) {
                this._rafId = null;
                return;
            }
            
            analyser.getByteFrequencyData(data);
            const avg      = data.reduce((a, b) => a + b, 0) / data.length;
            const speaking = avg > 20 && !this.muted;

            if (speaking !== lastState) {
                lastState = speaking;
                this.setSpeaking(this.uid, speaking);
                this.signal('speaking', { speaking });

                // Visual glow on own avatar
                const myAvatar = document.getElementById(`voice-user-${this.uid}`);
                if (myAvatar) {
                    myAvatar.style.borderColor = speaking ? '#00ff00' : 'rgba(0,242,255,.3)';
                    myAvatar.style.boxShadow   = speaking ? '0 0 15px rgba(0,255,0,.5)' : 'none';
                }
            }
            this._rafId = requestAnimationFrame(check);
        };
        check();
    }

    setSpeaking(uid, speaking) {
        this.speaking[uid] = speaking;
        const el = document.getElementById(`voice-user-${uid}`);
        if (el) {
            el.style.borderColor = speaking ? '#00ff00' : 'rgba(0,242,255,.3)';
            el.style.boxShadow   = speaking ? '0 0 15px rgba(0,255,0,.6)' : 'none';
        }
    }

    updatePeerStatus(uid, state) {
        const dot = document.getElementById(`peer-dot-${uid}`);
        if (!dot) return;
        const colors = {
            connected:    '#00ff00',
            connecting:   '#ffd700',
            failed:       '#ff4444',
            disconnected: '#666',
            closed:       '#666',
        };
        dot.style.background = colors[state] || '#666';
    }

    // ── VOICE USERS UI ────────────────────────
    addVoiceUser(uid, name) {
        const container = document.getElementById('voice-users');
        if (!container) return;
        if (document.getElementById(`voice-user-${uid}`)) return; // already shown

        // Remove "nobody here" placeholder
        const placeholder = container.querySelector('.vc-empty');
        if (placeholder) placeholder.remove();

        const el = document.createElement('div');
        el.id = `voice-user-${uid}`;
        el.style.cssText = `
            display:flex;flex-direction:column;align-items:center;gap:4px;
            padding:8px;border-radius:12px;border:2px solid rgba(0,242,255,.3);
            background:rgba(0,242,255,.05);transition:all .3s;min-width:60px;`;
        el.innerHTML = `
            <div style="width:36px;height:36px;border-radius:50%;
                background:linear-gradient(135deg,#00f2ff,#7c30ff);
                display:flex;align-items:center;justify-content:center;position:relative;">
                <i class="fas fa-user" style="color:white;font-size:14px;"></i>
                <div id="peer-dot-${uid}" style="
                    position:absolute;bottom:0;right:0;
                    width:10px;height:10px;border-radius:50%;
                    background:#ffd700;border:2px solid #0a0e1a;"></div>
            </div>
            <span style="font-size:9px;color:#ccc;font-weight:700;
                max-width:56px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name}</span>`;
        container.appendChild(el);
    }

    removeVoiceUser(uid) {
        document.getElementById(`voice-user-${uid}`)?.remove();
        // If container is now empty, restore placeholder
        const container = document.getElementById('voice-users');
        if (container && !container.querySelector('[id^="voice-user-"]')) {
            const p = document.createElement('p');
            p.className = 'vc-empty';
            p.style.cssText = 'color:#555;font-size:11px;text-align:center;width:100%;';
            p.textContent = 'لا أحد في الدردشة الصوتية';
            container.appendChild(p);
        }
    }

    // ── UI PANEL ──────────────────────────────
    buildUI() {
        if (document.getElementById('voice-panel')) return;

        document.body.insertAdjacentHTML('beforeend', `
        <!-- Hidden audio container -->
        <div id="voice-audio-container" style="display:none;position:absolute;"></div>

        <!-- Voice chat panel — centered overlay, same pattern as chat/friends/reports panels -->
        <div id="voice-panel" style="
            display:none;position:fixed;inset:0;z-index:8500;
            background:rgba(0,0,0,.85);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
            align-items:center;justify-content:center;padding:20px;
            animation:vcPanelIn .2s ease;">
          <div style="
              width:100%;max-width:340px;max-height:85vh;overflow-y:auto;
              background:linear-gradient(135deg,rgba(10,14,26,.98),rgba(20,25,45,.98));
              border:2px solid rgba(0,242,255,.3);border-radius:20px;padding:18px;
              box-shadow:0 8px 40px rgba(0,0,0,.6);font-family:'Cairo',sans-serif;">

            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <h4 style="color:#00f2ff;font-size:12px;font-weight:900;
                    text-transform:uppercase;letter-spacing:2px;margin:0;">
                    🎙️ الدردشة الصوتية
                </h4>
                <button id="vc-close-btn"
                    style="background:none;border:none;color:#555;cursor:pointer;font-size:16px;
                        padding:4px 6px;border-radius:6px;transition:color .2s;"
                    onmouseover="this.style.color='#ccc'" onmouseout="this.style.color='#555'">✕</button>
            </div>

            <!-- Active users list -->
            <div id="voice-users" style="
                display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;
                min-height:50px;align-items:center;justify-content:center;">
                <p class="vc-empty" style="color:#555;font-size:11px;text-align:center;width:100%;">
                    لا أحد في الدردشة الصوتية
                </p>
            </div>

            <!-- Controls -->
            <div style="display:flex;gap:8px;align-items:center;">
                <!-- Join button (visible when not in voice) -->
                <button id="vc-join-btn"
                    style="flex:1;padding:10px;border-radius:12px;font-weight:900;font-size:12px;
                        background:linear-gradient(135deg,#00f2ff,#7c30ff);border:none;
                        color:white;cursor:pointer;transition:opacity .2s;"
                    onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
                    انضم للصوت
                </button>

                <!-- Mute button (visible when in voice) -->
                <button id="vc-mute-btn"
                    style="display:none;flex:1;padding:10px;border-radius:12px;font-weight:900;font-size:12px;
                        border:2px solid rgba(0,242,255,.3);background:rgba(0,242,255,.1);
                        color:#00f2ff;cursor:pointer;transition:all .2s;">
                    <i class="fas fa-microphone"></i> مفتوح
                </button>

                <!-- Leave button (visible when in voice) -->
                <button id="vc-leave-btn"
                    style="display:none;width:42px;height:42px;border-radius:12px;
                        border:2px solid rgba(239,68,68,.3);background:rgba(239,68,68,.1);
                        color:#ef4444;cursor:pointer;font-size:16px;
                        align-items:center;justify-content:center;
                        transition:all .2s;"
                    title="مغادرة الصوت">
                    <i class="fas fa-phone-slash"></i>
                </button>
            </div>
          </div>
        </div>

        <style>
            @keyframes vcPanelIn {
                from { opacity:0; }
                to   { opacity:1; }
            }
        </style>`);

        // Wire up panel close button
        document.getElementById('vc-close-btn').addEventListener('click', () => this._togglePanel(false));

        // Click outside the card (on the backdrop) closes the panel — same UX as the other room panels
        document.getElementById('voice-panel').addEventListener('click', (e) => {
            if (e.target.id === 'voice-panel') this._togglePanel(false);
        });

        // Wire up join/mute/leave
        document.getElementById('vc-join-btn').addEventListener('click',  () => this.join());
        document.getElementById('vc-mute-btn').addEventListener('click',  () => this.toggleMute());
        document.getElementById('vc-leave-btn').addEventListener('click', () => {
            this.leave();
            this._togglePanel(false);
        });
    }

    _togglePanel(force) {
        const panel = document.getElementById('voice-panel');
        if (!panel) return;
        const isOpen = panel.style.display === 'flex';
        const next   = force !== undefined ? force : !isOpen;
        panel.style.display = next ? 'flex' : 'none';
    }

    updateUI() {
        const joinBtn  = document.getElementById('vc-join-btn');
        const muteBtn  = document.getElementById('vc-mute-btn');
        const leaveBtn = document.getElementById('vc-leave-btn');
        const trigger  = document.getElementById('voiceBtn'); // static dock button, lives in room.html
        if (!joinBtn || !muteBtn || !leaveBtn) return;

        if (this.active) {
            // ── In voice ──
            joinBtn.style.display  = 'none';
            muteBtn.style.display  = 'block';
            leaveBtn.style.display = 'flex';

            // Mute button appearance
            if (this.muted) {
                muteBtn.style.background    = 'rgba(239,68,68,.15)';
                muteBtn.style.borderColor   = 'rgba(239,68,68,.4)';
                muteBtn.style.color         = '#ef4444';
                muteBtn.innerHTML           = '<i class="fas fa-microphone-slash"></i> مكتوم';
            } else {
                muteBtn.style.background    = 'rgba(0,242,255,.1)';
                muteBtn.style.borderColor   = 'rgba(0,242,255,.3)';
                muteBtn.style.color         = '#00f2ff';
                muteBtn.innerHTML           = '<i class="fas fa-microphone"></i> مفتوح';
            }

            // Dock button: green when active, red-ish when muted (mirrors the old FAB states)
            if (trigger) {
                trigger.style.borderColor = this.muted ? 'rgba(239,68,68,.7)' : 'rgba(34,197,94,.7)';
                trigger.style.background  = this.muted ? 'rgba(239,68,68,.18)' : 'rgba(34,197,94,.22)';
                trigger.style.color       = this.muted ? '#ef4444' : '#00ff00';
                trigger.style.boxShadow   = this.muted
                    ? '0 0 12px rgba(239,68,68,.4)'
                    : '0 0 12px rgba(34,197,94,.4)';
            }

            // Add self to user list
            this.addVoiceUser(this.uid, this.username);

        } else {
            // ── Not in voice ──
            joinBtn.style.display  = 'block';
            muteBtn.style.display  = 'none';
            leaveBtn.style.display = 'none';

            // Dock button: back to its default idle colors
            if (trigger) {
                trigger.style.borderColor = 'rgba(34,197,94,0.3)';
                trigger.style.background  = 'rgba(34,197,94,0.15)';
                trigger.style.color       = '#22c55e';
                trigger.style.boxShadow   = 'none';
            }

            this.removeVoiceUser(this.uid);
        }
    }
}

// ── EXPORT ────────────────────────────────
window.VoiceChat = VoiceChat;