// ============================================================
// EL JASUS — GAME LAYOUT MANAGER  v2
// Patches missing API methods IMMEDIATELY on construction.
// IMPORTANT: Load WITHOUT defer so patches run before Firebase callbacks.
// ============================================================

class GameLayoutManager {
    constructor() {
        this.currentPhase = 'waiting';
        this._patchAPIs();                          // synchronous — runs instantly
        setTimeout(() => this._patchAPIs(), 200);   // catch late-loaded scripts
        setTimeout(() => this._patchAPIs(), 800);
    }

    _patchAPIs() {
        // ── FriendsPanel ─────────────────────────────────────
        if (!window.FriendsPanel) window.FriendsPanel = {};

        if (typeof window.FriendsPanel.updateRoomPlayers !== 'function') {
            window.FriendsPanel.updateRoomPlayers = (players) => {
                // Will be wired to real impl once friends-panel.js loads
            };
        }
        if (typeof window.FriendsPanel.initRoom !== 'function') {
            window.FriendsPanel.initRoom = (db, auth, uid, roomCode, players) => {
                try {
                    const u = uid || (auth && auth.currentUser && auth.currentUser.uid) || '';
                    const n = localStorage.getItem('eljasus_user_name') || 'لاعب';
                    if (typeof window.FriendsPanel.init === 'function') {
                        window.FriendsPanel.init(db, u, n);
                    }
                } catch (e) { /* safe no-op */ }
            };
        }
        if (typeof window.FriendsPanel.setOpen !== 'function') window.FriendsPanel.setOpen = () => {};
        if (typeof window.FriendsPanel.init   !== 'function') window.FriendsPanel.init    = () => {};

        // ── ReportPanel ──────────────────────────────────────
        if (window.ReportPanel && typeof window.ReportPanel === 'function') {
            // ReportPanel is a class — patch static-style calls used by room.html
            if (typeof window.ReportPanel.updatePlayers !== 'function') {
                window.ReportPanel.updatePlayers = (players) => {
                    if (!window.reportPanel) return;
                    window.reportPanel.roomPlayers = (players || []).map(p => ({
                        uid:      typeof p === 'string' ? p.replace(/\s*\(خامل\)$/i, '') : (p.uid || ''),
                        username: typeof p === 'string' ? p : (p.username || p)
                    }));
                    const sel = document.getElementById('report-player-select');
                    if (!sel) return;
                    const cur = sel.value;
                    sel.innerHTML = '<option value="">— اختر لاعباً —</option>';
                    window.reportPanel.roomPlayers.forEach(pl => {
                        if (pl.uid !== window.reportPanel.uid) {
                            const opt = document.createElement('option');
                            opt.value = pl.uid; opt.textContent = pl.username;
                            sel.appendChild(opt);
                        }
                    });
                    if (cur) sel.value = cur;
                };
            }
            if (typeof window.ReportPanel.init !== 'function') window.ReportPanel.init = () => {};
        } else if (!window.ReportPanel) {
            window.ReportPanel = { init: () => {}, updatePlayers: () => {} };
        }

        // ── ChatSystem ───────────────────────────────────────
        if (!window.ChatSystem) {
            window.ChatSystem = class {
                constructor() {}
                repositionForPhase() {}
                addSystemMessage() {}
                cleanup() {}
            };
        }
    }

    switchPhase(phase) {
        this.currentPhase = phase;
        // Reposition chat
        if (window.chatSystem && typeof window.chatSystem.repositionForPhase === 'function') {
            window.chatSystem.repositionForPhase(phase);
        }
        // Show/hide FABs
        const isGame  = phase !== 'waiting';
        const vcFab   = document.getElementById('voice-fab');
        const chatFab = document.getElementById('global-chat-fab');
        const chatDot = document.getElementById('chat-unread-dot');
        if (vcFab)             vcFab.style.display   = isGame ? 'flex' : 'none';
        if (chatFab)           chatFab.style.display  = isGame ? 'flex' : 'none';
        if (chatDot && !isGame) chatDot.style.display = 'none';
    }
}

window.GameLayoutManager = GameLayoutManager;