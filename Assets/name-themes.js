// ============================================================
// EL JASUS — NAME THEMES & TAGS SYSTEM v1.0
// Handles player name styling, themes, tags, and rank display
// Include on ALL pages where player names are shown
// ============================================================

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // NAME THEMES LIBRARY — Animated & Static with Particles
  // ═══════════════════════════════════════════════════════════
  
  const NAME_THEMES = {
    // ── STATIC THEMES ────────────────────────────────────────
    default: {
      name: 'افتراضي',
      type: 'static',
      price: 0,
      css: {
        color: '#ffffff',
        textShadow: 'none',
        fontWeight: '700'
      }
    },
    
    neonCyan: {
      name: 'سيان نيون',
      type: 'static',
      price: 100,
      css: {
        color: '#00f2ff',
        textShadow: '0 0 10px rgba(0,242,255,0.8), 0 0 20px rgba(0,242,255,0.6)',
        fontWeight: '900'
      }
    },
    
    neonPurple: {
      name: 'بنفسجي نيون',
      type: 'static',
      price: 100,
      css: {
        color: '#7c30ff',
        textShadow: '0 0 10px rgba(124,48,255,0.8), 0 0 20px rgba(124,48,255,0.6)',
        fontWeight: '900'
      }
    },
    
    fireGold: {
      name: 'ذهب ناري',
      type: 'static',
      price: 200,
      css: {
        color: '#ffd700',
        textShadow: '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,140,0,0.6)',
        fontWeight: '900'
      }
    },
    
    bloodRed: {
      name: 'أحمر دموي',
      type: 'static',
      price: 200,
      css: {
        color: '#ff0033',
        textShadow: '0 0 15px rgba(255,0,51,0.9), 0 0 30px rgba(139,0,0,0.7)',
        fontWeight: '900'
      }
    },
    
    emeraldGreen: {
      name: 'زمرد أخضر',
      type: 'static',
      price: 200,
      css: {
        color: '#00ff88',
        textShadow: '0 0 15px rgba(0,255,136,0.8), 0 0 30px rgba(0,200,100,0.6)',
        fontWeight: '900'
      }
    },
    
    iceBlue: {
      name: 'أزرق جليدي',
      type: 'static',
      price: 250,
      css: {
        color: '#88ddff',
        textShadow: '0 0 20px rgba(136,221,255,0.9), 0 0 40px rgba(100,180,255,0.7)',
        fontWeight: '900'
      }
    },
    
    // ── ANIMATED THEMES ──────────────────────────────────────
    rainbowShift: {
      name: 'قوس قزح متحرك',
      type: 'animated',
      price: 300,
      animation: 'rainbowShift 3s linear infinite',
      css: {
        fontWeight: '900',
        textShadow: '0 0 15px currentColor'
      },
      keyframes: `
        @keyframes rainbowShift {
          0%   { color: #ff0000; }
          16%  { color: #ff8800; }
          33%  { color: #ffff00; }
          50%  { color: #00ff00; }
          66%  { color: #0088ff; }
          83%  { color: #8800ff; }
          100% { color: #ff0000; }
        }
      `
    },
    
    pulseGlow: {
      name: 'نبض مضيء',
      type: 'animated',
      price: 300,
      animation: 'pulseGlow 2s ease-in-out infinite',
      css: {
        color: '#00f2ff',
        fontWeight: '900'
      },
      keyframes: `
        @keyframes pulseGlow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(0,242,255,0.8), 0 0 20px rgba(0,242,255,0.6);
          }
          50% { 
            text-shadow: 0 0 30px rgba(0,242,255,1), 0 0 60px rgba(0,242,255,0.8), 0 0 90px rgba(0,242,255,0.6);
          }
        }
      `
    },
    
    glitchEffect: {
      name: 'تأثير الخلل',
      type: 'animated',
      price: 350,
      animation: 'glitchAnim 0.5s infinite',
      css: {
        color: '#00ff00',
        fontWeight: '900',
        position: 'relative'
      },
      keyframes: `
        @keyframes glitchAnim {
          0%, 100% { 
            text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
          }
          25% { 
            text-shadow: -2px 0 #ff00ff, 2px 2px #00ffff;
          }
          50% { 
            text-shadow: 2px -2px #ff00ff, -2px 0 #00ffff;
          }
          75% { 
            text-shadow: -2px 2px #ff00ff, 2px 0 #00ffff;
          }
        }
      `
    },
    
    wavyText: {
      name: 'نص موجي',
      type: 'animated',
      price: 350,
      animation: 'wavyText 2s ease-in-out infinite',
      css: {
        color: '#ff00ff',
        fontWeight: '900',
        display: 'inline-block'
      },
      keyframes: `
        @keyframes wavyText {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            text-shadow: 0 0 10px rgba(255,0,255,0.8);
          }
          25% { 
            transform: translateY(-5px) rotate(2deg);
            text-shadow: 0 5px 15px rgba(255,0,255,0.9);
          }
          75% { 
            transform: translateY(5px) rotate(-2deg);
            text-shadow: 0 -5px 15px rgba(255,0,255,0.9);
          }
        }
      `
    },
    
    fireFlicker: {
      name: 'وميض ناري',
      type: 'animated',
      price: 400,
      animation: 'fireFlicker 1.5s ease-in-out infinite',
      css: {
        color: '#ff4500',
        fontWeight: '900'
      },
      keyframes: `
        @keyframes fireFlicker {
          0%, 100% { 
            color: #ff4500;
            text-shadow: 0 0 10px rgba(255,69,0,0.8), 0 0 20px rgba(255,140,0,0.6);
          }
          25% { 
            color: #ff6600;
            text-shadow: 0 0 20px rgba(255,102,0,1), 0 0 40px rgba(255,165,0,0.8);
          }
          50% { 
            color: #ff8800;
            text-shadow: 0 0 15px rgba(255,136,0,0.9), 0 0 30px rgba(255,180,0,0.7);
          }
          75% { 
            color: #ff6600;
            text-shadow: 0 0 20px rgba(255,102,0,1), 0 0 40px rgba(255,165,0,0.8);
          }
        }
      `
    },
    
    electricShock: {
      name: 'صدمة كهربائية',
      type: 'animated',
      price: 450,
      animation: 'electricShock 0.3s infinite',
      css: {
        color: '#00ffff',
        fontWeight: '900'
      },
      keyframes: `
        @keyframes electricShock {
          0%, 100% { 
            color: #00ffff;
            text-shadow: 0 0 5px rgba(0,255,255,0.8), 0 0 10px rgba(0,200,255,0.6);
            transform: translate(0, 0);
          }
          10% { 
            color: #ffffff;
            text-shadow: 0 0 20px rgba(0,255,255,1), 0 0 40px rgba(100,200,255,0.8);
            transform: translate(-1px, -1px);
          }
          20% { 
            transform: translate(1px, 1px);
          }
          30% { 
            transform: translate(-1px, 0);
          }
        }
      `
    },
    
    // ── PARTICLE THEMES ──────────────────────────────────────
    starField: {
      name: 'حقل النجوم',
      type: 'particle',
      price: 500,
      css: {
        color: '#ffffff',
        fontWeight: '900',
        textShadow: '0 0 10px rgba(255,255,255,0.8)',
        position: 'relative'
      },
      particles: {
        count: 8,
        type: 'star',
        animation: 'starFloat 3s ease-in-out infinite'
      },
      keyframes: `
        @keyframes starFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 0.7; }
        }
      `
    },
    
    snowfall: {
      name: 'تساقط الثلج',
      type: 'particle',
      price: 500,
      css: {
        color: '#88ddff',
        fontWeight: '900',
        textShadow: '0 0 15px rgba(136,221,255,0.9)',
        position: 'relative'
      },
      particles: {
        count: 10,
        type: 'snow',
        animation: 'snowFall 4s linear infinite'
      },
      keyframes: `
        @keyframes snowFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(40px) rotate(360deg); opacity: 0; }
        }
      `
    },
    
    sparkles: {
      name: 'لمعان',
      type: 'particle',
      price: 550,
      css: {
        color: '#ffd700',
        fontWeight: '900',
        textShadow: '0 0 15px rgba(255,215,0,0.9)',
        position: 'relative'
      },
      particles: {
        count: 12,
        type: 'sparkle',
        animation: 'sparkleAnim 2s ease-in-out infinite'
      },
      keyframes: `
        @keyframes sparkleAnim {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          10% { transform: scale(1) rotate(45deg); opacity: 1; }
          90% { transform: scale(0.5) rotate(135deg); opacity: 0.5; }
        }
      `
    },
    
    hearts: {
      name: 'قلوب',
      type: 'particle',
      price: 600,
      css: {
        color: '#ff1493',
        fontWeight: '900',
        textShadow: '0 0 15px rgba(255,20,147,0.9)',
        position: 'relative'
      },
      particles: {
        count: 6,
        type: 'heart',
        animation: 'heartFloat 3s ease-in-out infinite'
      },
      keyframes: `
        @keyframes heartFloat {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0; }
        }
      `
    },
    
    lightning: {
      name: 'برق',
      type: 'particle',
      price: 650,
      css: {
        color: '#ffff00',
        fontWeight: '900',
        textShadow: '0 0 20px rgba(255,255,0,1)',
        position: 'relative'
      },
      particles: {
        count: 4,
        type: 'lightning',
        animation: 'lightningStrike 2s ease-in-out infinite'
      },
      keyframes: `
        @keyframes lightningStrike {
          0%, 90%, 100% { opacity: 0; }
          92%, 94% { opacity: 1; }
          93% { opacity: 0.5; }
        }
      `
    }
  };

  // ═══════════════════════════════════════════════════════════
  // NAME TAGS LIBRARY
  // ═══════════════════════════════════════════════════════════
  
  const NAME_TAGS = {
    vip: {
      name: 'VIP',
      icon: '👑',
      color: '#ffd700',
      bgColor: 'rgba(255, 215, 0, 0.15)',
      border: '1px solid rgba(255, 215, 0, 0.4)',
      price: 200
    },
    pro: {
      name: 'PRO',
      icon: '⭐',
      color: '#00f2ff',
      bgColor: 'rgba(0, 242, 255, 0.15)',
      border: '1px solid rgba(0, 242, 255, 0.4)',
      price: 150
    },
    legend: {
      name: 'LEGEND',
      icon: '🔥',
      color: '#ff4500',
      bgColor: 'rgba(255, 69, 0, 0.15)',
      border: '1px solid rgba(255, 69, 0, 0.4)',
      price: 300
    },
    master: {
      name: 'MASTER',
      icon: '💎',
      color: '#7c30ff',
      bgColor: 'rgba(124, 48, 255, 0.15)',
      border: '1px solid rgba(124, 48, 255, 0.4)',
      price: 250
    },
    elite: {
      name: 'ELITE',
      icon: '🎖️',
      color: '#ff1493',
      bgColor: 'rgba(255, 20, 147, 0.15)',
      border: '1px solid rgba(255, 20, 147, 0.4)',
      price: 350
    },
    champion: {
      name: 'CHAMPION',
      icon: '🏆',
      color: '#ffa500',
      bgColor: 'rgba(255, 165, 0, 0.15)',
      border: '1px solid rgba(255, 165, 0, 0.4)',
      price: 400
    },
    super: {
      name: 'SUPER',
      icon: '⚡',
      color: '#00ff00',
      bgColor: 'rgba(0, 255, 0, 0.15)',
      border: '1px solid rgba(0, 255, 0, 0.4)',
      price: 500
    },
    phantom: {
      name: 'PHANTOM',
      icon: '👻',
      color: '#9370db',
      bgColor: 'rgba(147, 112, 219, 0.15)',
      border: '1px solid rgba(147, 112, 219, 0.4)',
      price: 450
    },
    savage: {
      name: 'SAVAGE',
      icon: '🦁',
      color: '#ff6347',
      bgColor: 'rgba(255, 99, 71, 0.15)',
      border: '1px solid rgba(255, 99, 71, 0.4)',
      price: 380
    },
    ninja: {
      name: 'NINJA',
      icon: '🥷',
      color: '#2f4f4f',
      bgColor: 'rgba(47, 79, 79, 0.25)',
      border: '1px solid rgba(47, 79, 79, 0.5)',
      price: 320
    },
    gameowner: {
      name: 'GAME OWNER',
      icon: '👑',
      color: '#ffe100',
      bgColor: 'rgba(255, 0, 0, 0.15)',
      border: '1px solid rgba(255, 196, 0, 0.4)',
      price: null // Special tag, not purchasable
    }
  };

  // ═══════════════════════════════════════════════════════════
  // RANKS SYSTEM
  // ═══════════════════════════════════════════════════════════
  
  const RANKS = {
    bronze: {
      name: 'Bronze',
      nameAr: 'برونز',
      min: 0,
      max: 999,
      color: '#cd7f32',
      icon: '🥉',
      division: 'Division I'
    },
    silver: {
      name: 'Silver',
      nameAr: 'فضي',
      min: 1000,
      max: 2499,
      color: '#c0c0c0',
      icon: '🥈',
      division: 'Division I'
    },
    gold: {
      name: 'Gold',
      nameAr: 'ذهبي',
      min: 2500,
      max: 4999,
      color: '#ffd700',
      icon: '🥇',
      division: 'Division I'
    },
    platinum: {
      name: 'Platinum',
      nameAr: 'بلاتيني',
      min: 5000,
      max: 9999,
      color: '#e5e4e2',
      icon: '💠',
      division: 'Division I'
    },
    diamond: {
      name: 'Diamond',
      nameAr: 'ألماس',
      min: 10000,
      max: 19999,
      color: '#00f2ff',
      icon: '💎',
      division: 'Division I'
    },
    master: {
      name: 'Master',
      nameAr: 'خبير',
      min: 20000,
      max: 39999,
      color: '#7c30ff',
      icon: '👑',
      division: 'Division I'
    },
    grandmaster: {
      name: 'Grandmaster',
      nameAr: 'خبير أعظم',
      min: 40000,
      max: 99999,
      color: '#ff0080',
      icon: '🔱',
      division: 'Division I'
    },
    challenger: {
      name: 'Challenger',
      nameAr: 'متحدي',
      min: 100000,
      max: Infinity,
      color: '#39ff14',
      icon: '⚡',
      division: 'Division I'
    }
  };

  // ═══════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════
  
  function calculateRank(points) {
    points = parseInt(points) || 0;
    const rankKeys = Object.keys(RANKS);
    for (let key of rankKeys) {
      const rank = RANKS[key];
      if (points >= rank.min && points <= rank.max) {
        return rank;
      }
    }
    return RANKS.bronze; // Default to bronze
  }

  function injectStylesheet() {
    if (document.getElementById('ej-name-themes-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'ej-name-themes-styles';
    
    let css = `
      /* ═══ NAME THEME WRAPPER ═══ */
      .ej-name-themed {
        position: relative;
        display: inline-block;
        z-index: 1;
      }
      
      .ej-name-particle-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120%;
        height: 150%;
        pointer-events: none;
        z-index: -1;
      }
      
      .ej-name-particle {
        position: absolute;
        font-size: 10px;
        pointer-events: none;
      }
      
      .ej-name-tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 9px;
        font-weight: 900;
        margin-right: 4px;
        white-space: nowrap;
        vertical-align: middle;
      }
      
      .ej-rank-badge {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 8px;
        font-weight: 700;
        margin-left: 4px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
        white-space: nowrap;
        vertical-align: middle;
      }
    `;
    
    // Add all theme keyframes
    Object.values(NAME_THEMES).forEach(theme => {
      if (theme.keyframes) {
        css += theme.keyframes;
      }
    });
    
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createParticles(container, config) {
    if (!config || !config.particles) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ej-name-particle-container';
    
    const particleIcons = {
      star: '⭐',
      snow: '❄️',
      sparkle: '✨',
      heart: '💖',
      lightning: '⚡'
    };
    
    for (let i = 0; i < config.particles.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'ej-name-particle';
      particle.textContent = particleIcons[config.particles.type] || '✨';
      particle.style.animation = config.particles.animation;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particleContainer.appendChild(particle);
    }
    
    container.appendChild(particleContainer);
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════
  
  window.NameThemes = {
    themes: NAME_THEMES,
    tags: NAME_TAGS,
    ranks: RANKS,
    
    /**
     * Apply name theme to an element
     * @param {HTMLElement} element - The element to apply theme to
     * @param {string} themeName - Theme name from NAME_THEMES
     * @param {string} playerName - The player's name
     */
    applyTheme(element, themeName, playerName) {
      const theme = NAME_THEMES[themeName] || NAME_THEMES.default;
      
      // Apply CSS
      Object.assign(element.style, theme.css);
      
      // Apply animation if exists
      if (theme.animation) {
        element.style.animation = theme.animation;
      }
      
      // Wrap in themed container
      if (theme.type === 'particle') {
        const wrapper = document.createElement('span');
        wrapper.className = 'ej-name-themed';
        wrapper.textContent = playerName;
        Object.assign(wrapper.style, theme.css);
        if (theme.animation) wrapper.style.animation = theme.animation;
        
        createParticles(wrapper, theme);
        
        element.textContent = '';
        element.appendChild(wrapper);
      } else {
        element.textContent = playerName;
      }
    },
    
    /**
     * Create a name tag element
     * @param {string} tagName - Tag name from NAME_TAGS
     * @returns {HTMLElement} - The tag element
     */
    createTag(tagName) {
      const tag = NAME_TAGS[tagName];
      if (!tag) return null;
      
      const el = document.createElement('span');
      el.className = 'ej-name-tag';
      el.style.color = tag.color;
      el.style.backgroundColor = tag.bgColor;
      el.style.border = tag.border;
      el.innerHTML = `${tag.icon} <span>${tag.name}</span>`;
      
      return el;
    },
    
    /**
     * Create a rank badge element
     * @param {number} rankPoints - Player's rank points
     * @returns {HTMLElement} - The rank badge element
     */
    createRankBadge(rankPoints) {
      const rank = calculateRank(rankPoints);
      
      const el = document.createElement('span');
      el.className = 'ej-rank-badge';
      el.style.color = rank.color;
      el.style.borderColor = rank.color + '40';
      el.innerHTML = `${rank.icon} <span>${rank.nameAr}</span>`;
      
      return el;
    },
    
    /**
     * Apply full player styling (theme + tag + rank)
     * @param {HTMLElement} container - Container to render in
     * @param {Object} playerData - Player data object
     * @returns {HTMLElement} - The styled container
     */
    applyPlayerStyle(container, playerData) {
      container.innerHTML = '';
      container.style.display = 'inline-flex';
      container.style.alignItems = 'center';
      container.style.gap = '4px';
      container.style.flexWrap = 'wrap';
      
      // Add tag if exists
      if (playerData.nameTag) {
        const tag = this.createTag(playerData.nameTag);
        if (tag) container.appendChild(tag);
      }
      
      // Add themed name
      const nameSpan = document.createElement('span');
      this.applyTheme(nameSpan, playerData.nameTheme || 'default', playerData.username || 'Player');
      container.appendChild(nameSpan);
      
      // Add rank badge if rank points exist
      if (playerData.rankPoints !== undefined) {
        const rankBadge = this.createRankBadge(playerData.rankPoints);
        container.appendChild(rankBadge);
      }
      
      return container;
    },
    
    /**
     * Get player's current rank
     * @param {number} rankPoints - Player's rank points
     * @returns {Object} - Rank object
     */
    getRank(rankPoints) {
      return calculateRank(rankPoints);
    },
    
    /**
     * Initialize the name themes system
     */
    init() {
      injectStylesheet();
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.NameThemes.init());
  } else {
    window.NameThemes.init();
  }
})();
