// ============================================================
// EL JASUS — PROFILE VIEWER v1.0
// View other users' profiles (inventory, rank, stats, achievements)
// Used in friends.html and room.html friends panel
// ============================================================

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // FIREBASE SETUP
  // ═══════════════════════════════════════════════════════════
  
  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDnd-pmKEatI3DaFz6xHWB5ucurtHXt9tk',
    authDomain: 'el-jasus.firebaseapp.com',
    databaseURL: 'https://el-jasus-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'el-jasus',
    storageBucket: 'el-jasus.firebasestorage.app',
    messagingSenderId: '415659587906',
    appId: '1:415659587906:web:782f7940176ea4097eb0db',
  };

  let db, _ref, _get;

  async function initFirebase() {
    const { initializeApp, getApps } = await import(
      'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js'
    );
    const dbMod = await import(
      'https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js'
    );

    const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
    db = dbMod.getDatabase(app);
    _ref = dbMod.ref;
    _get = dbMod.get;
  }

  // ═══════════════════════════════════════════════════════════
  // CSS STYLES
  // ═══════════════════════════════════════════════════════════
  
  function injectStyles() {
    if (document.getElementById('profile-viewer-styles')) return;
    
    const css = `
      #profile-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(12px);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
      }
      
      #profile-modal-overlay.open {
        display: flex;
      }
      
      #profile-modal {
        background: linear-gradient(135deg, rgba(15,20,35,0.98), rgba(25,30,50,0.98));
        border: 2px solid rgba(0,242,255,0.4);
        border-radius: 24px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 0;
        font-family: 'Cairo', sans-serif;
        box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,242,255,0.1);
        animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes modalSlideIn {
        from { 
          opacity: 0; 
          transform: translateY(20px) scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }
      
      .pv-header {
        padding: 24px 28px;
        border-bottom: 2px solid rgba(0,242,255,0.2);
        position: relative;
      }
      
      .pv-close {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(239,68,68,0.15);
        border: 1px solid rgba(239,68,68,0.3);
        color: #ef4444;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 18px;
        font-weight: 900;
        transition: all 0.2s;
      }
      
      .pv-close:hover {
        background: rgba(239,68,68,0.25);
        transform: scale(1.1);
      }
      
      .pv-avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      
      .pv-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00f2ff, #7c30ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: white;
        box-shadow: 0 0 30px rgba(0,242,255,0.5);
        animation: avatarPulse 3s ease-in-out infinite;
      }
      
      @keyframes avatarPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0,242,255,0.5); }
        50% { box-shadow: 0 0 40px rgba(0,242,255,0.8); }
      }
      
      .pv-name-display {
        text-align: center;
      }
      
      .pv-username {
        font-size: 20px;
        font-weight: 900;
        color: #fff;
        margin-bottom: 4px;
      }
      
      .pv-rank-info {
        font-size: 13px;
        color: rgba(255,255,255,0.6);
        font-family: 'Orbitron', sans-serif;
      }
      
      .pv-content {
        padding: 20px 28px 28px;
      }
      
      .pv-section {
        margin-bottom: 24px;
      }
      
      .pv-section-title {
        font-size: 14px;
        font-weight: 900;
        color: #00f2ff;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
        font-family: 'Orbitron', sans-serif;
      }
      
      .pv-stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      
      .pv-stat-card {
        background: rgba(0,242,255,0.05);
        border: 1px solid rgba(0,242,255,0.2);
        border-radius: 12px;
        padding: 12px;
        text-align: center;
      }
      
      .pv-stat-value {
        font-size: 24px;
        font-weight: 900;
        color: #00f2ff;
        font-family: 'Orbitron', sans-serif;
      }
      
      .pv-stat-label {
        font-size: 11px;
        color: rgba(255,255,255,0.5);
        margin-top: 4px;
      }
      
      .pv-achievements-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      
      .pv-achievement {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
      }
      
      .pv-achievement.unlocked {
        background: rgba(255,215,0,0.1);
        border-color: rgba(255,215,0,0.3);
      }
      
      .pv-achievement.locked {
        opacity: 0.4;
      }
      
      .pv-achievement-icon {
        font-size: 24px;
      }
      
      .pv-achievement-info {
        flex: 1;
      }
      
      .pv-achievement-name {
        font-size: 11px;
        font-weight: 900;
        color: #fff;
      }
      
      .pv-achievement-desc {
        font-size: 9px;
        color: rgba(255,255,255,0.4);
      }
      
      .pv-inventory-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      
      .pv-item {
        background: rgba(0,242,255,0.05);
        border: 1px solid rgba(0,242,255,0.2);
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        transition: all 0.2s;
      }
      
      .pv-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,242,255,0.2);
      }
      
      .pv-item-name {
        font-size: 11px;
        font-weight: 700;
        color: #fff;
        margin-top: 6px;
      }
      
      .pv-item-type {
        font-size: 9px;
        color: rgba(255,255,255,0.4);
      }
      
      .pv-empty {
        grid-column: 1 / -1;
        text-align: center;
        color: rgba(255,255,255,0.3);
        padding: 20px;
        font-size: 13px;
      }
      
      .pv-loading {
        text-align: center;
        padding: 40px 20px;
        color: rgba(255,255,255,0.5);
        font-size: 14px;
      }
      
      .pv-spinner {
        border: 3px solid rgba(0,242,255,0.1);
        border-top-color: #00f2ff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @media (max-width: 640px) {
        #profile-modal {
          max-width: 100%;
          margin: 10px;
        }
        
        .pv-stats-grid,
        .pv-achievements-list,
        .pv-inventory-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'profile-viewer-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════
  // MODAL CREATION
  // ═══════════════════════════════════════════════════════════
  
  function createModal() {
    if (document.getElementById('profile-modal-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'profile-modal-overlay';
    overlay.innerHTML = `
      <div id="profile-modal">
        <div class="pv-header">
          <button class="pv-close" id="pv-close-btn">✕</button>
          <div class="pv-avatar-section">
            <div class="pv-avatar" id="pv-avatar">👤</div>
            <div class="pv-name-display">
              <div class="pv-username" id="pv-username">جاري التحميل...</div>
              <div class="pv-rank-info" id="pv-rank-info">---</div>
            </div>
          </div>
        </div>
        
        <div class="pv-content" id="pv-content">
          <div class="pv-loading">
            <div class="pv-spinner"></div>
            <div>جاري تحميل البيانات...</div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close handlers
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    
    document.getElementById('pv-close-btn').addEventListener('click', closeModal);
  }

  function closeModal() {
    const overlay = document.getElementById('profile-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
    }
  }

  // ═══════════════════════════════════════════════════════════
  // DATA LOADING
  // ═══════════════════════════════════════════════════════════
  
  async function loadUserProfile(uid) {
    try {
      const snapshot = await _get(_ref(db, `players/${uid}`));
      
      if (!snapshot.exists()) {
        return null;
      }
      
      const data = snapshot.val();
      return {
        username: data.username || 'Player',
        rankPoints: data.rankPoints || 0,
        stats: data.stats || {},
        achievements: data.achievements || {},
        inventory: data.inventory || {
          nameThemes: [],
          nameTags: []
        },
        nameTheme: data.nameTheme || 'default',
        nameTag: data.nameTag || null
      };
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PROFILE RENDERING
  // ═══════════════════════════════════════════════════════════
  
  function renderProfile(profileData) {
    // Update header
    document.getElementById('pv-username').textContent = profileData.username;
    
    // Calculate rank
    const rank = window.NameThemes ? 
      window.NameThemes.getRank(profileData.rankPoints) : 
      { nameAr: 'برونز', icon: '🥉', division: 'Division I' };
    
    document.getElementById('pv-rank-info').textContent = 
      `${rank.icon} ${rank.nameAr} · ${rank.division} · ${profileData.rankPoints} نقطة`;
    
    // Render content
    const content = document.getElementById('pv-content');
    
    // Calculate stats
    const stats = profileData.stats;
    const totalWins = (stats.spyWins || 0) + (stats.innocentWins || 0);
    const totalGames = stats.totalGames || 0;
    const totalLosses = Math.max(0, totalGames - totalWins);
    const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
    
    content.innerHTML = `
      <!-- STATS SECTION -->
      <div class="pv-section">
        <div class="pv-section-title">📊 الإحصائيات</div>
        <div class="pv-stats-grid">
          <div class="pv-stat-card">
            <div class="pv-stat-value">${totalWins}</div>
            <div class="pv-stat-label">انتصارات</div>
          </div>
          <div class="pv-stat-card">
            <div class="pv-stat-value">${totalLosses}</div>
            <div class="pv-stat-label">خسائر</div>
          </div>
          <div class="pv-stat-card">
            <div class="pv-stat-value">${winRate}%</div>
            <div class="pv-stat-label">نسبة الفوز</div>
          </div>
          <div class="pv-stat-card">
            <div class="pv-stat-value">${totalGames}</div>
            <div class="pv-stat-label">إجمالي المباريات</div>
          </div>
          <div class="pv-stat-card">
            <div class="pv-stat-value">${stats.spyWins || 0}</div>
            <div class="pv-stat-label">فوز كجاسوس</div>
          </div>
          <div class="pv-stat-card">
            <div class="pv-stat-value">${stats.currentStreak || 0}</div>
            <div class="pv-stat-label">سلسلة حالية</div>
          </div>
        </div>
      </div>
      
      <!-- ACHIEVEMENTS SECTION -->
      <div class="pv-section">
        <div class="pv-section-title">🏆 الإنجازات</div>
        <div class="pv-achievements-list" id="pv-achievements"></div>
      </div>
      
      <!-- INVENTORY SECTION -->
      <div class="pv-section">
        <div class="pv-section-title">🎒 المخزون</div>
        <div class="pv-inventory-grid" id="pv-inventory"></div>
      </div>
    `;
    
    // Render achievements
    renderAchievements(profileData.achievements);
    
    // Render inventory
    renderInventory(profileData.inventory);
  }

  function renderAchievements(achievements) {
    const container = document.getElementById('pv-achievements');
    
    const allAchievements = {
      firstWin: { name: 'الفوز الأول', icon: '🎉', desc: 'فز بأول مباراة' },
      masterDeceiver: { name: 'خبير الخداع', icon: '🕵️', desc: 'افز 10 مباريات كجاسوس' },
      eagleEye: { name: 'عين الصقر', icon: '🦅', desc: 'اكشف الجاسوس 5 مرات' },
      perfectGame: { name: 'مباراة مثالية', icon: '🎯', desc: 'خمن الكلمة كجاسوس' },
      centuryClub: { name: 'نادي المئة', icon: '💯', desc: 'العب 100 مباراة' },
      hotStreak: { name: 'سلسلة نارية', icon: '🔥', desc: 'افز 5 مباريات متتالية' },
      diamondPlayer: { name: 'لاعب ألماسي', icon: '💎', desc: 'وصل لرتبة الألماس' }
    };
    
    container.innerHTML = Object.keys(allAchievements).map(key => {
      const ach = allAchievements[key];
      const unlocked = achievements[key];
      
      return `
        <div class="pv-achievement ${unlocked ? 'unlocked' : 'locked'}">
          <div class="pv-achievement-icon">${ach.icon}</div>
          <div class="pv-achievement-info">
            <div class="pv-achievement-name">${ach.name}</div>
            <div class="pv-achievement-desc">${ach.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderInventory(inventory) {
    const container = document.getElementById('pv-inventory');
    
    const items = [];
    
    // Add name themes
    if (inventory.nameThemes && inventory.nameThemes.length > 0) {
      inventory.nameThemes.forEach(theme => {
        const themeData = window.NameThemes?.themes[theme];
        if (themeData) {
          items.push({
            name: themeData.name,
            type: 'ثيم اسم',
            icon: '✨'
          });
        }
      });
    }
    
    // Add name tags
    if (inventory.nameTags && inventory.nameTags.length > 0) {
      inventory.nameTags.forEach(tag => {
        const tagData = window.NameThemes?.tags[tag];
        if (tagData) {
          items.push({
            name: tagData.name,
            type: 'وسم',
            icon: tagData.icon
          });
        }
      });
    }
    
    if (items.length === 0) {
      container.innerHTML = '<div class="pv-empty">لا توجد عناصر في المخزون</div>';
      return;
    }
    
    container.innerHTML = items.map(item => `
      <div class="pv-item">
        <div style="font-size: 24px;">${item.icon}</div>
        <div class="pv-item-name">${item.name}</div>
        <div class="pv-item-type">${item.type}</div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════
  
  async function openProfile(uid, username) {
    const overlay = document.getElementById('profile-modal-overlay');
    if (!overlay) return;
    
    // Show modal with loading state
    overlay.classList.add('open');
    document.getElementById('pv-username').textContent = username || 'جاري التحميل...';
    document.getElementById('pv-rank-info').textContent = '---';
    document.getElementById('pv-content').innerHTML = `
      <div class="pv-loading">
        <div class="pv-spinner"></div>
        <div>جاري تحميل البيانات...</div>
      </div>
    `;
    
    // Load profile data
    const profileData = await loadUserProfile(uid);
    
    if (!profileData) {
      document.getElementById('pv-content').innerHTML = `
        <div class="pv-empty">تعذر تحميل البيانات</div>
      `;
      return;
    }
    
    renderProfile(profileData);
  }

  window.ProfileViewer = {
    /**
     * Open a user's profile
     * @param {string} uid - User ID
     * @param {string} username - Optional username for display
     */
    open: openProfile,
    
    /**
     * Close the profile modal
     */
    close: closeModal,
    
    /**
     * Initialize the profile viewer
     */
    init() {
      injectStyles();
      createModal();
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      await initFirebase();
      window.ProfileViewer.init();
    });
  } else {
    initFirebase().then(() => window.ProfileViewer.init());
  }
})();
