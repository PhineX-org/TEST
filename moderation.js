// ============================================================
// EL JASUS — JMS (El Jasus Moderation System) v3.1 ENHANCED
// Advanced Detection with Substring Extraction & Pattern Matching
// ============================================================

(function () {
'use strict';

// ══════════════════════════════════════════════════════════
// ENHANCED SYMBOL SUBSTITUTION MAP
// Normalizes leetspeak, symbols, emojis, Unicode tricks
// ══════════════════════════════════════════════════════════
const SYMBOL_MAP = {
    // Numbers to letters (expanded)
    '0': ['o', 'ο', 'о', '٠', 'ø', 'ɵ', 'θ'],
    '1': ['i', 'l', '١','ا', 'أ', 'إ', '|', 'ǀ', 'ɪ'],
    '2': ['z', '٢', 'ا', 'أ', 'إ', 'ء', 'ʒ'],
    '3': ['e', '٣', 'ع', 'ɛ', 'є', 'ε'],
    '4': ['a', '٤','ش', 'α', 'ą'],
    '5': ['s', '٥', 'خ', 'ś', 'š'],
    '6': ['b', '٦', 'ب'],
    '7': ['h', '٧', 'ح', 'ħ'],
    '8': ['b', '٨', 'غ', 'β'],
    '9': ['g', '٩', 'q', 'ق'],
    
    // Symbols to letters (expanded)
    '$': ['s'],
    '@': ['a', 'ع'],
    '!': ['i', 'l'],
    '|': ['i', 'l'],
    '&': ['and'],
    '*': ['a', 'o', 'x'],
    '#': ['h'],
    '%': ['x'],
    '^': ['a'],
    '~': ['n'],
    '+': ['t'],
    '=': ['e'],
    
    // Special/look-alike characters
    'а': ['a'], 'е': ['e'], 'о': ['o'], 'р': ['p'], 'с': ['c'],
    'х': ['x'], 'у': ['y'], 'і': ['i'], 'ѕ': ['s'], 'һ': ['h'],
    'ɑ': ['a'], 'е': ['e'], 'ο': ['o'], 'ѕ': ['s'],
    'ℓ': ['l'], '℮': ['e'], 'ℯ': ['e'], '℥': ['o'],
    
    // Remove these entirely
    '.': [''], '-': [''], '_': [''], ' ': [''], '/': [''], '\\': [''],
    ',': [''], ';': [''], ':': [''], '(': [''], ')': [''], '[': [''],
    ']': [''], '{': [''], '}': [''], '<': [''], '>': [''], '?': [''],
    '\'': [''], '"': [''], '`': [''], '´': [''], "": [''], '': [''],
    '"': [''], '"': [''], '«': [''], '»': [''], '→': [''], '←': [''],
    '↑': [''], '↓': [''], '•': [''], '·': [''], '∙': [''], '◦': [''],
};

// ══════════════════════════════════════════════════════════
// OFFENSIVE EMOJI PATTERNS
// ══════════════════════════════════════════════════════════
const OFFENSIVE_EMOJI_PATTERNS = [
    /🖕/g,
    /🍆🍑/g,
    /💦🍆/g,
    /🔞/g,
    /🔴⚫/g, 
    /💋/g,
    /🫦/g,
    /👙/g,
    /🌈/g,
    /🏳️‍🌈/g,
    /☮️/g,
    /✝️/g,
    /🕉️/g,
    /☸️/g,
    /✡️/g,
    /🔯/g,
    /🪯/g,
    /🕎/g,
    /☯️/g,
    /☦️/g,
    /⚧️/g,
    /🏳️‍⚧️/g,
];

// ══════════════════════════════════════════════════════════
// 5-LEVEL VIOLATION CLASSIFICATION
// ══════════════════════════════════════════════════════════
const LEVELS = {
    1: {
        name: 'المستوى الأول',
        nameEn: 'Level 1',
        icon: '⚠️',
        color: '#f59e0b',
        warningsThreshold: 10,
        banDuration: 3 * 864e5, // 3 days
        severity: 'تحذير خفيف',
    },
    2: {
        name: 'المستوى الثاني',
        nameEn: 'Level 2',
        icon: '🔶',
        color: '#f97316',
        warningsThreshold: 5,
        banDuration: 1 * 864e5, // 1 day
        severity: 'حظر مؤقت خفيف',
    },
    3: {
        name: 'المستوى الثالث',
        nameEn: 'Level 3',
        icon: '🔴',
        color: '#ef4444',
        warningsThreshold: 3,
        banDuration: 10 * 864e5, // 10 days
        severity: 'حظر مؤقت شديد',
    },
    4: {
        name: 'المستوى الرابع',
        nameEn: 'Level 4',
        icon: '🟣',
        color: '#a855f7',
        warningsThreshold: 1,
        banDuration: 45 * 864e5, // 45 days
        severity: 'حظر طويل',
    },
    5: {
        name: 'المستوى الخامس',
        nameEn: 'Level 5',
        icon: '☠️',
        color: '#000000',
        warningsThreshold: 0,
        banDuration: -1, // Permanent
        severity: 'حظر دائم',
    },
};

// ══════════════════════════════════════════════════════════
// MASSIVELY EXPANDED BLOCKED WORDS BY LEVEL
// ══════════════════════════════════════════════════════════
const VIOLATIONS = {
    // ── Level 1: Minor inappropriate language ────────────────
    1: {
        words: [
            // ========== ARABIC (massively expanded) ==========
            // Original words
            'غبي', 'غبية', 'أهبل', 'عبيط', 'حمار', 'جحش', 'بهيمة', 'حيوان',
            'زبالة', 'وسخ', 'حقير', 'نعل', 'تبا', 'ملعون', 'لعنة', 'قذر',
            'مقرف', 'سافل', 'تافه', 'سخيف', 'كلب', 'بقرة', 'ماعز', 'خنزير',
            
            // Extensive additions
            'أحمق', 'بليد', 'معتوه', 'مريض', 'خسيس', 'وضيع', 'دنيء', 'لئيم',
            'فاشل', 'خايب', 'ساقط', 'نذل', 'رعاع', 'أوغاد', 'جبان', 'متخلف',
            'جاهل', 'أبله', 'ساذج', 'مغفل', 'قبيح', 'بذيء', 'وقح', 'صفيق',
            'كذاب', 'نصاب', 'مارق', 'فاجر', 'ماكر', 'حقود', 'حسود', 'أناني',
            'مغرور', 'متكبر', 'فظ', 'غليظ', 'أخرق', 'أبكم', 'أطرش', 'أعمى',
            
            // More variations
            'هبل', 'هبلة', 'مهبل', 'تهبيل', 'غباء', 'غبائك', 'حمارك', 'حمارة',
            'وساخة', 'قذارة', 'نذالة', 'رذالة', 'خسة', 'وضاعة', 'دناءة',
            'فشل', 'خيبة', 'سقوط', 'انحطاط', 'تخلف', 'جهل', 'بلادة',
            
            // Insult prefixes
            'يا غبي', 'يا حمار', 'يا كلب', 'يا خنزير', 'يا جحش', 'يا بهيمة',
            'يا أهبل', 'يا عبيط', 'يا سافل', 'يا حقير', 'يا نذل', 'يا وسخ',
            'يا قذر', 'يا مقرف', 'يا تافه', 'يا سخيف', 'يا فاشل', 'يا خايب',
            
            // Animal insults
            'قرد', 'قردة', 'حشرة', 'حشرات', 'ذباب', 'صرصور', 'فأر', 'جرذ',
            'ثعبان', 'أفعى', 'عقرب', 'عنكبوت', 'تمساح', 'كلاب', 'خنازير',
            
            // ========== ENGLISH (massively expanded) ==========
            // Original
            'stupid', 'idiot', 'dumb', 'noob', 'loser', 'trash', 'garbage',
            'fool', 'moron', 'dumbass', 'asshole', 'piece of shit', 'shit',
            
            // Common profanity
            'damn', 'hell', 'crap', 'poop', 'butt', 'ass', 'arse',
            'piss', 'bollocks', 'bloody', 'blimey', 'crikey',
            
            // Insults
            'jerk', 'dummy', 'imbecile', 'cretin', 'ignoramus', 'buffoon',
            'simpleton', 'dimwit', 'nitwit', 'halfwit', 'numbskull', 'dunce',
            'dolt', 'nincompoop', 'blockhead', 'bonehead', 'airhead', 'birdbrain',
            
            // Gamer slang
            'noob', 'n00b', 'newb', 'scrub', 'pleb', 'peasant', 'bot',
            'trash player', 'garbage player', 'trash tier', 'low elo',
            
            // Variations
            'stupido', 'stupeed', 'stoopid', 'stoopud', 'stewpid',
            'idiota', 'idot', 'idoit', 'ediot', 'eejit',
            'dumass', 'dumas', 'dumaz', 'dumbazz',
            'looser', 'loozer', 'luser',
            'azzhole', 'a$$hole', 'a55hole', 'ahole', 'arsehole',
            
            // Mild profanity variations
            'shite', 'shiet', 'shieet', 'sh1t', 'sh!t', 'sht',
            'frick', 'freak', 'freaking', 'frigging', 'friggin',
            'heck', 'hecking', 'dang', 'darn', 'drat',
            
            // Body parts (mild)
            'booty', 'bootie', 'bum', 'buns', 'behind', 'rear',
            
            // Common substitutions
            'suck', 'sucks', 'sucka', 'sucker', 'suckz',
            'lame', 'lameo', 'lamer', 'lamest', 'lameass',
            'weak', 'weakling', 'weaksauce',
            'pathetic', 'pitiful', 'worthless', 'useless',
            
            // ========== FRANCO-ARABIC (expanded) ==========
            'ya 7mar', 'ya kalb', 'ya khanzir', 'ya ahbal', '3abeet',
            'ghabi', 'ghaby', 'ghabia', 'ghabya',
            'hamar', '7mar', 'hmar', 'homaar',
            'kalb', 'kelb', 'kilb', 'kalib',
            'wa5', 'waskh', 'wesekh', 'wisikh',
            'za2', 'za2er', 'za2eer',
            '7a2eer', '7a2ir', 'ha2eer', 'ha2ir',
        ],
        patterns: [
            /(.)\1{6,}/,  // Spam: same char 7+ times
            /^\s*(.+?)\s*\1\s*\1/,  // Repeated words 3+ times
            /(.{2,})\1{3,}/,  // Repeated sequences
        ],
        category: 'minor_profanity',
        description: 'ألفاظ غير لائقة خفيفة',
    },

    // ── Level 2: Moderate harassment ──────────────────────────
    2: {
        words: [
            // ========== ARABIC ==========
            'عرص', 'عرصة', 'معرص', 'عرصان', 'عراص', 'تعريص',
            'خول', 'خولة', 'خولات', 'تخويل', 'مخول',
            'كلب', 'كلبة', 'ابن كلب', 'بنت كلب', 'كليب', 'كلاب',
            'متخلف', 'متخلفة', 'متخلفين', 'تخلف',
            'بربري', 'بربرية', 'همجي', 'همجية', 'همج',
            'زق', 'زقق', 'يا زق', 'زقي',
            'خرا', 'خري', 'خرة', 'خرية', 'خراء', 'خرئ',
            'حثالة', 'حثالات', 'نفاية', 'قمامة', 'زبالة',
            'وصخ', 'واطي', 'واطية', 'نيل', 'زفت',
            'عفن', 'عفنة', 'عفونة', 'منتن', 'قذارة',
            'سافل', 'سافلة', 'سفالة', 'سافلين',
            'حقير', 'حقيرة', 'حقارة', 'محتقر',
            
            // Family insults (mild)
            'امك', 'ابوك', 'اهلك', 'اختك', 'اخوك',
            
            // ========== ENGLISH ==========
            'ass', 'asshole', 'azzhole', 'a$$', 'a$$hole',
            'jerk', 'jerkoff', 'jerkwad', 'jerkface',
            'bastard', 'basterd', 'bstard', 'b@stard',
            'prick', 'pr!ck', 'prik', 'pric',
            'douche', 'douchebag', 'douch', 'd0uche',
            'wanker', 'w@nker', 'wankr', 'tosser',
            'jackass', 'jackarse', 'jack@ss',
            'dipshit', 'dipsh!t', 'dips#it',
            'dickhead', 'd!ckhead', 'dickhed', 'd1ckhead',
            'shithead', 'sh!thead', 'shithed', 'shiithead',
            'scumbag', 'scum', 'filth', 'vermin',
            'retard', 'retarded', 'r3tard', 'tard',
            'autist', 'autistic', 'sperg', 'sperglord',
            
            // Slurs (mild)
            'gay', 'ghey', 'gey', 'homo',
            
            // ========== FRANCO-ARABIC ==========
            '3ars', '3rs', 'mo3ars', 'mo3rs', 'ars',
            'khawal', 'khwal', 'khawl', '5awal', '5wal',
            'kelb', 'kalb', 'ibn kalb', 'bent kalb',
            'za2', 'za22', 'zaa2', 'za2i',
            'khra', 'khara', '5ara', '5ra', 'khraa',
            'wa6i', 'wa6y', 'waty', 'wati',
        ],
        category: 'harassment',
        description: 'تحرش لفظي وإزعاج',
    },

    // ── Level 3: Severe profanity ─────────────────────────────
    3: {
        words: [
            // ========== ARABIC PROFANITY ==========
            // Core profanity
            'كس', 'كوس', 'كسك', 'كسها', 'كسه', 'كسمك', 'كسامك', 'كسخت',
            'كسي', 'كسكم', 'كساس', 'اكساس', 'تكسيس',
            
            'بص', 'بصص', 'بصة', 'بصاص', 'بصبص',
            
            'زبر', 'زبري', 'زبرك', 'زباير', 'زبور',
            'أير', 'اير', 'ايري', 'ايرك', 'عير', 'عيري',
            'زب', 'زبي', 'زبك', 'زبه', 'زبها', 'ازبار',
            
            // Sexual acts
            'نيك', 'نيكة', 'ينيك', 'انيك', 'تنيك', 'نيكها', 'نيكه',
            'مناك', 'منيوك', 'تناك', 'متناك', 'ناك', 'ناكها',
            'نايك', 'نيكني', 'نيكتك', 'منتاك', 'منتاكة',
            'فشخ', 'فشخك', 'فشخها', 'يفشخ', 'تفشيخ', 'مفشوخ',
            'لحس', 'لحاس', 'الحس', 'لحست', 'ملحوس',
            'مص', 'مصاص', 'امص', 'مصي', 'ممصوص',
            
            // Sexual slurs
            'شرموط', 'شرموطة', 'شرموته', 'شراميط', 'شرمطة',
            'قحبة', 'قحب', 'قحاب', 'اقحاب',
            'عاهرة', 'عاهر', 'عواهر', 'عهر',
            'مومس', 'مومسة', 'عاهرات',
            'قواد', 'قوادة', 'قيادة',
            'ديوث', 'دياثة', 'ديايث',
            
            // Body parts
            'طيز', 'طيزك', 'طيزها', 'طياز', 'اطياز',
            'مكوة', 'مكوتك', 'مكوتها',
            'بزاز', 'بز', 'بزك', 'بزها',
            'صدرها', 'نهودها', 'نهود',
            
            // ========== ENGLISH PROFANITY ==========
            // F-word variations
            'fuck', 'fucking', 'fucker', 'fucked', 'fuk', 'fck',
            'fuk', 'fuc', 'fawk', 'fawking', 'phuck', 'phuk',
            'f**k', 'f*ck', 'f***', 'fxck', 'fcuk', 'fuc',
            'motherfucker', 'mfer', 'mofo', 'mf', 'mutha',
            'motherfucking', 'motherfucka', 'muthafucka',
            
            // Genitalia
            'dick', 'cock', 'penis', 'dong', 'schlong', 'pecker',
            'd!ck', 'd1ck', 'dik', 'dck', 'c0ck', 'cawk',
            'pussy', 'cunt', 'vagina', 'puss', 'cooch', 'coochie',
            'p***y', 'c**t', 'cnt', 'kunt', 'c0nt',
            'balls', 'ballz', 'nutsack', 'nuts', 'testicles',
            'tits', 'titties', 'boobs', 'breasts', 't!ts', 'bewbs',
            
            // Sexual acts
            'sex', 'suck', 'blow', 'blowjob', 'handjob', 'oral',
            'anal', 'rape', 'molest', 'grope', 'fondle',
            
            // Slurs
            'bitch', 'b!tch', 'b1tch', 'biatch', 'biotch', 'beetch',
            'whore', 'wh0re', 'hoe', 'ho', 'slut', 'skank',
            'slag', 'tramp', 'hooker', 'prostitute',
            'twat', 'tw@t', 'twet', 'tw4t',
            
            // Shit variations
            'shit', 'shitting', 'shitty', 'shitter', 'shite',
            'sh!t', 'sh1t', 'sht', 'shiit', 'shieet',
            'bullshit', 'bs', 'horseshit', 'dogshit',
            
            // ========== FRANCO-ARABIC ==========
            'kos', 'koss', 'kus', 'kuss', 'kosomak', 'ksomak', 'ksmk', 'ks',
            'kosek', 'kosaha', 'koseha', 'kos omak', 'kos om',
            
            'ayr', '3ayr', 'ayri', '3ayri', 'ayrak', '3ayrak',
            'zob', 'zeb', 'zobi', 'zebi', 'zobak',
            
            'nik', 'neek', 'nayek', 'nayk', 'na3tek', 'nektk',
            'metnak', 'metnaka', 'mtnaka', 'mtnak',
            'mnyok', 'mnywk', 'manyok', 'manyouk',
            'tanyek', 'tenak', 'tnaka',
            
            'sharmota', 'sharmouta', '4armota', '4armouta', 'shrmota',
            '2a7ba', '2ahba', 'kahba', 'ka7ba', 'ga7ba',
            
            'a7a', 'aha', 'eh eh', 'eih eih',
            
            'teez', 'tiz', 'teezi', 'teezak', 't33z',
            
            'fsh5', 'fash5', 'fsh', 'fshhh',
        ],
        category: 'severe_profanity',
        description: 'ألفاظ بذيئة شديدة',
    },

    // ── Level 4: Hate speech & threats ────────────────────────
    4: {
        words: [
            // ========== RACIAL SLURS ==========
            'nigger', 'nigga', 'nigg', 'n1gg', 'nig', 'n1gger',
            'n1gga', 'niggr', 'nigr', 'nggr', 'n!gger', 'n!gga',
            
            'عبد', 'عبيد', 'عبدة', 'ياعبد',
            'زنجي', 'زنجية', 'زنوج', 'يازنجي',
            'عنصري', 'عنصرية', 'تمييز', 'عرقية',
            
            // ========== HOMOPHOBIC SLURS ==========
            'faggot', 'fag', 'fgt', 'f@ggot', 'f@g', 'fagg', 'fagot',
            'queer', 'dyke', 'tranny', 'shemale',
            
            'لوطي', 'لوطية', 'لواط', 'لواطة',
            'شاذ', 'شاذة', 'شذوذ', 'منحرف', 'منحرفة',
            'مخنث', 'مخنثة', 'تخنيث', 'خنوث',
            'مثلي', 'مثلية', 'مثليين',
            
            // ========== SEXUAL HARASSMENT ==========
            'rape', 'r@pe', 'raep', 'rpe', 'rapist',
            'molest', 'grope', 'fondle',
            
            'اغتصاب', 'اغتصب', 'اغتصبك', 'مغتصب',
            'تحرش', 'متحرش', 'تحرشي',
            
            // ========== DISABILITY SLURS ==========
            'retard', 'retarded', 'r3tard', 'tard',
            'autist', 'autistic', 'aspie', 'sperg',
            'cripple', 'gimp', 'vegetable',
            
            'معوق', 'معاق', 'معاقة', 'إعاقة',
            'متخلف عقليا', 'متخلفة عقليا',
            
            // ========== MILD THREATS ==========
            'kill you', 'beat you', 'hurt you', 'punch you',
            'kick your ass', 'beat your ass',
            
            'اقتلك', 'اقتله', 'اقتلها', 'سأقتلك',
            'اذبحك', 'اذبحه', 'اذبحها',
            'اضربك', 'اضربه', 'اضربها',
            'امسحك', 'امسحه', 'امسحها',
            'ادعسك', 'ادوسك',
            
            // ========== OTHER HATE SPEECH ==========
            'cancer', 'aids', 'die', 'suicide', 'hang yourself',
            'kys', 'kill yourself', 'go die',
            
            'مرض', 'سرطان', 'ايدز', 'موت', 'انتحر',
            'اشنق نفسك', 'مت', 'روح مت',
        ],
        category: 'hate_speech',
        description: 'خطاب كراهية وتهديدات',
    },

    // ── Level 5: Severe threats & illegal ────────────────────
    5: {
        words: [
            // ========== TERRORISM & VIOLENCE ==========
            'ارهابي', 'ارهابية', 'ارهاب', 'تطرف', 'متطرف',
            'تفجير', 'انفجار', 'قنبلة', 'متفجرات',
            'اغتيال', 'اغتصاب', 'خطف', 'احتجاز',
            'ذبح', 'قطع رأس', 'قطع الرأس',
            
            'terrorist', 'terrorism', 'extremist', 'radical',
            'bomb', 'bombing', 'explosive', 'detonate',
            'murder', 'assassination', 'assassinate',
            'kidnap', 'abduct', 'hostage',
            'strangle', 'strangulation',
            'cut your throat', 'slit throat', 'behead',
            
            // ========== SPECIFIC THREATS ==========
            'school shooting', 'mass shooting', 'shoot up',
            'massacre', 'genocide', 'ethnic cleansing',
            
            'اطلاق نار', 'اطلق النار', 'رصاص',
            'مجزرة', 'ابادة', 'تطهير عرقي',
            
            // ========== CHILD ABUSE ==========
            'pedo', 'pedophile', 'child abuse', 'cp',
            'minor', 'underage', 'grooming',
            
            'تحرش بالأطفال', 'اعتداء على الأطفال',
            'قاصر', 'قاصرين',
        ],
        patterns: [
            // Location threats
            /(?:اعرف|عارف|موجود|وصلت)\s*(?:في|ب)?(?:مكان|عنوان|بيت|مكانك|عنوانك)/i,
            /i\s*know\s*where\s*you\s*live/i,
            /gonna\s*find\s*you/i,
            /i['']ll\s*find\s*you/i,
            /track\s*you\s*down/i,
            /hunt\s*you\s*down/i,
            
            // Death threats
            /i['']ll\s*kill\s*you/i,
            /gonna\s*kill\s*you/i,
            /you['']re\s*dead/i,
            /you\s*will\s*die/i,
            
            // سأقتلك patterns
            /(?:سوف|س|ح)\s*(?:اقتل|اذبح|امسح|ادعس)/i,
        ],
        category: 'severe_threats',
        description: 'تهديدات جسيمة',
    },
};

// ══════════════════════════════════════════════════════════
// CATEGORIES METADATA
// ══════════════════════════════════════════════════════════
const CATEGORIES = {
    minor_profanity:    { ar: 'ألفاظ غير لائقة خفيفة',    icon: '⚠️',  color: '#f59e0b' },
    harassment:         { ar: 'تحرش وإزعاج',              icon: '🔶', color: '#f97316' },
    severe_profanity:   { ar: 'ألفاظ بذيئة شديدة',       icon: '🔴', color: '#ef4444' },
    hate_speech:        { ar: 'خطاب كراهية وتهديدات',    icon: '🟣', color: '#a855f7' },
    severe_threats:     { ar: 'تهديدات جسيمة',            icon: '☠️',  color: '#000000' },
    spam:               { ar: 'رسائل مزعجة',              icon: '📵', color: '#8b5cf6' },
    admin_decision:     { ar: 'قرار إداري',               icon: '🔨', color: '#1d4ed8' },
    permanent:          { ar: 'حظر دائم',                 icon: '⛔', color: '#000' },
};

// ══════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════
const PERM_BAN_THRESHOLD  = 3;
const RECHECK_INTERVAL_MS = 30_000;

const LS_BAN  = 'eljasus_ban_v4';
const LS_WARN = 'eljasus_warnings_v4';

let _db          = null;
let _user        = null;
let _unsubBan    = null;
let _recheckTimer = null;
let _screenShown = false;
let _navLocked   = false;

// ══════════════════════════════════════════════════════════
// ENHANCED TEXT NORMALIZATION
// ══════════════════════════════════════════════════════════
function normArabic(s) {
    return s
        .toLowerCase()
        .replace(/[\u064b-\u065f\u0670]/g, '')
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .trim();
}

function expandSymbols(text) {
    const chars = text.toLowerCase().split('');
    let results = [''];
    
    for (let char of chars) {
        const replacements = SYMBOL_MAP[char] || [char];
        const newResults = [];
        for (let result of results) {
            for (let replacement of replacements) {
                newResults.push(result + replacement);
            }
        }
        results = newResults;
        if (results.length > 150) {
            results = results.slice(0, 150);
        }
    }
    
    return results;
}

function aggressiveClean(text) {
    // Remove ALL special characters, spaces, symbols
    return text
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '')
        .toLowerCase();
}

function normalizeText(text) {
    const cleaned = aggressiveClean(text);
    const arabicNorm = normArabic(cleaned);
    
    const variations = new Set([
        cleaned,
        arabicNorm,
        ...expandSymbols(text),
    ]);
    
    return Array.from(variations);
}

// ══════════════════════════════════════════════════════════
// ADVANCED SUBSTRING EXTRACTION
// Detects banned words hidden in gibberish like "jhfiyda*asholehinv"
// ══════════════════════════════════════════════════════════
function extractSubstrings(text, minLength = 3, maxLength = 20) {
    const substrings = new Set();
    const cleaned = aggressiveClean(text);
    
    // Generate all possible substrings
    for (let i = 0; i < cleaned.length; i++) {
        for (let j = i + minLength; j <= Math.min(i + maxLength + 1, cleaned.length + 1); j++) {
            const substr = cleaned.substring(i, j);
            if (substr.length >= minLength) {
                substrings.add(substr);
                // Also add Arabic normalized version
                substrings.add(normArabic(substr));
            }
        }
    }
    
    return Array.from(substrings);
}

// ══════════════════════════════════════════════════════════
// ENHANCED VIOLATION DETECTION
// Multi-layered approach:
// 1. Check offensive emoji patterns
// 2. Check full text variations
// 3. Check all substrings (catches embedded words)
// 4. Check regex patterns
// ══════════════════════════════════════════════════════════
function detectViolation(text) {
    // Layer 1: Check offensive emoji patterns
    for (let pattern of OFFENSIVE_EMOJI_PATTERNS) {
        if (pattern.test(text)) {
            return {
                level: 3,
                category: 'severe_profanity',
                word: '<emoji pattern>',
                description: 'رموز تعبيرية غير لائقة',
            };
        }
    }
    
    const variations = normalizeText(text);
    const substrings = extractSubstrings(text, 3, 20);
    
    // Check each level from most severe (5) to least (1)
    for (let level = 5; level >= 1; level--) {
        const violation = VIOLATIONS[level];
        
        // Layer 2: Check patterns first
        if (violation.patterns) {
            for (let pattern of violation.patterns) {
                if (pattern.test(text)) {
                    return {
                        level,
                        category: violation.category,
                        word: '<pattern match>',
                        description: violation.description,
                    };
                }
            }
        }
        
        // Layer 3: Check words against full text variations
        for (let badWord of violation.words) {
            const normalizedBadWord = aggressiveClean(normArabic(badWord));
            
            for (let variant of variations) {
                if (variant.includes(normalizedBadWord)) {
                    return {
                        level,
                        category: violation.category,
                        word: badWord,
                        description: violation.description,
                    };
                }
            }
        }
        
        // Layer 4: Check words against extracted substrings
        // This catches "jhfiyda*asholehinv" → contains "asshole"
        for (let badWord of violation.words) {
            const normalizedBadWord = aggressiveClean(normArabic(badWord));
            
            for (let substr of substrings) {
                if (substr === normalizedBadWord || substr.includes(normalizedBadWord)) {
                    return {
                        level,
                        category: violation.category,
                        word: badWord,
                        description: violation.description + ' (مخفي)',
                    };
                }
            }
        }
    }
    
    return null;
}

// ══════════════════════════════════════════════════════════
// FIREBASE HELPERS
// ══════════════════════════════════════════════════════════
function fbFns() {
    if (window._firebaseFns) return window._firebaseFns;
    if (window.firebase?.database) return {
        ref:      (db, path) => firebase.database().ref(path),
        get:      r          => r.once('value'),
        update:   (r, v)     => r.update(v),
        set:      (r, v)     => r.set(v),
        remove:   r          => r.remove(),
        onValue:  (r, cb)    => { r.on('value', cb); return () => r.off('value', cb); },
        serverTimestamp: ()  => firebase.database.ServerValue.TIMESTAMP,
    };
    return null;
}

async function dbGet(path) {
    const f = fbFns(); if (!f || !_db) return null;
    try { const s = await f.get(f.ref(_db, path)); return s.exists() ? s.val() : null; }
    catch { return null; }
}

async function dbUpdate(path, value) {
    const f = fbFns(); if (!f || !_db) return;
    try { await f.update(f.ref(_db, path), value); } catch(e) { console.warn('[MOD] update failed', e); }
}

async function dbSet(path, value) {
    const f = fbFns(); if (!f || !_db) return;
    try { await f.set(f.ref(_db, path), value); } catch(e) { console.warn('[MOD] set failed', e); }
}

// ══════════════════════════════════════════════════════════
// LOCAL STORAGE
// ══════════════════════════════════════════════════════════
function lsBan(obj) {
    if (obj === null) { localStorage.removeItem(LS_BAN); return; }
    localStorage.setItem(LS_BAN, JSON.stringify(obj));
}
function lsGetBan() {
    try { const v = localStorage.getItem(LS_BAN); return v ? JSON.parse(v) : null; } catch { return null; }
}
function lsWarnings()  { return parseInt(localStorage.getItem(LS_WARN) || '0', 10); }
function lsSetWarn(n)  { localStorage.setItem(LS_WARN, String(n)); }

// ══════════════════════════════════════════════════════════
// WARNINGS MANAGEMENT
// ══════════════════════════════════════════════════════════
async function getWarnings() {
    if (!_user) return lsWarnings();
    const fb = await dbGet(`players/${_user.uid}/moderationWarnings`);
    const count = fb ?? 0;
    lsSetWarn(count);
    return count;
}

async function addWarning() {
    const current = await getWarnings();
    const next = current + 1;
    lsSetWarn(next);
    if (_user) await dbUpdate(`players/${_user.uid}`, { moderationWarnings: next });
    return next;
}

async function resetWarnings() {
    lsSetWarn(0);
    if (_user) await dbUpdate(`players/${_user.uid}`, { moderationWarnings: 0 });
}

// ══════════════════════════════════════════════════════════
// BAN OBJECT CREATION
// ══════════════════════════════════════════════════════════
async function buildBanObj(reason, category, level, bannedBy) {
    let banCount = 1;
    if (_user) {
        banCount = (await dbGet(`players/${_user.uid}/totalBans`) ?? 0) + 1;
    }
    
    const levelConfig = LEVELS[level] || LEVELS[3];
    const isPermanent = (levelConfig.banDuration === -1) || (banCount >= PERM_BAN_THRESHOLD);
    const expiresAt = isPermanent ? -1 : Date.now() + levelConfig.banDuration;

    return {
        reason,
        category,
        level,
        bannedAt:    Date.now(),
        expiresAt,
        durationMs:  isPermanent ? -1 : levelConfig.banDuration,
        bannedBy:    bannedBy || 'system',
        isPermanent,
        banCount,
    };
}

// ══════════════════════════════════════════════════════════
// BAN MANAGEMENT
// ══════════════════════════════════════════════════════════
async function issueBan(reason, category, level, bannedBy) {
    const ban = await buildBanObj(reason, category, level, bannedBy);

    if (_user) {
        const histKey = `players/${_user.uid}/banHistory/${ban.bannedAt}`;
        await dbSet(histKey, {
            reason:    ban.reason,
            category:  ban.category,
            level:     ban.level,
            bannedAt:  ban.bannedAt,
            expiresAt: ban.expiresAt,
            durationMs: ban.durationMs,
        });
        
        await dbUpdate(`players/${_user.uid}`, {
            ban,
            totalBans: ban.banCount,
        });
        
        await dbSet(`banned_users/${_user.uid}`, {
            ...ban,
            uid:      _user.uid,
            username: _user.displayName || localStorage.getItem('eljasus_user_name') || 'مجهول',
            email:    _user.email || '',
        });
    }

    lsBan(ban);
    await resetWarnings();
    showBanScreen(ban);
}

async function liftBan() {
    lsBan(null);
    lsSetWarn(0);
    if (_user) {
        await dbUpdate(`players/${_user.uid}`, { ban: null, moderationWarnings: 0 });
        await dbSet(`banned_users/${_user.uid}`, null);
    }
    removeBanScreen();
}

// ══════════════════════════════════════════════════════════
// BAN CHECK
// ══════════════════════════════════════════════════════════
async function fetchActiveBan() {
    let ban = null;

    if (_user) {
        ban = await dbGet(`players/${_user.uid}/ban`);
    }

    if (!ban) ban = lsGetBan();
    if (!ban) return null;

    if (!ban.isPermanent && ban.expiresAt !== -1 && Date.now() >= ban.expiresAt) {
        await liftBan();
        return null;
    }

    lsBan(ban);
    return ban;
}

// ══════════════════════════════════════════════════════════
// NAVIGATION LOCKOUT
// ══════════════════════════════════════════════════════════
function lockNavigation() {
    if (_navLocked) return;
    _navLocked = true;

    history.pushState({ banned: true }, '', location.href);

    const blockNav = (e) => {
        history.pushState({ banned: true }, '', location.href);
        e.preventDefault?.();
        return false;
    };

    window.addEventListener('popstate', blockNav);
    window.addEventListener('hashchange', blockNav);

    const _pushState = history.pushState.bind(history);
    const _replaceState = history.replaceState.bind(history);

    history.pushState = function(state, title, url) {
        if (state?.banned) return _pushState(state, title, url);
        console.warn('[MOD] Navigation blocked — user is banned');
    };

    history.replaceState = function(state, title, url) {
        if (state?.banned) return _replaceState(state, title, url);
        console.warn('[MOD] Navigation blocked — user is banned');
    };
}

// ══════════════════════════════════════════════════════════
// FORMAT HELPERS
// ══════════════════════════════════════════════════════════
function fmtDuration(ms) {
    if (ms === -1 || ms === Infinity) return 'دائم ♾️';
    const d = Math.floor(ms / 864e5);
    const h = Math.floor((ms % 864e5) / 36e5);
    const parts = [];
    if (d > 0) parts.push(`${d} يوم`);
    if (h > 0) parts.push(`${h} ساعة`);
    return parts.join(' و ') || 'أقل من ساعة';
}

function fmtDate(ts) {
    if (!ts || ts === -1) return '—';
    return new Date(ts).toLocaleString('ar-SA', {
        year:'numeric', month:'long', day:'numeric',
        hour:'2-digit', minute:'2-digit'
    });
}

function fmtRemaining(expiresAt) {
    if (expiresAt === -1) return '♾️ دائم';
    const diff = expiresAt - Date.now();
    if (diff <= 0) return 'انتهى';
    return fmtDuration(diff);
}

// ══════════════════════════════════════════════════════════
// ENHANCED BAN SCREEN UI (keeping your original design)
// ══════════════════════════════════════════════════════════
function showBanScreen(ban) {
    document.documentElement.style.cssText += ';overflow:hidden!important';
    document.body.style.cssText += ';overflow:hidden!important;pointer-events:none!important';

    lockNavigation();
    document.getElementById('_ej_ban')?.remove();

    const level = ban.level || 3;
    const levelConfig = LEVELS[level] || LEVELS[3];
    const cat = CATEGORIES[ban.category] || CATEGORIES.severe_profanity;
    const isPerm = ban.isPermanent || ban.expiresAt === -1;

    const overlay = document.createElement('div');
    overlay.id = '_ej_ban';
    overlay.style.cssText = `
        position:fixed;inset:0;z-index:2147483647;
        background:radial-gradient(ellipse at 50% 0%,#2a0008 0%,#0a0e1a 55%,#07000d 100%);
        display:flex;align-items:center;justify-content:center;
        font-family:'Cairo',sans-serif;overflow-y:auto;padding:20px;box-sizing:border-box;
        pointer-events:all;`;

    const remainingId = `_rem_${Date.now()}`;

    overlay.innerHTML = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Orbitron:wght@700;900&display=swap');
    @keyframes _bpulse{0%,100%{opacity:.03}50%{opacity:.09}}
    @keyframes _bspin {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes _bfade {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes _bglow {0%,100%{box-shadow:0 0 20px ${levelConfig.color}40}50%{box-shadow:0 0 40px ${levelConfig.color}80}}
    #_ej_ban *{box-sizing:border-box}
    #_ej_ban a:hover{opacity:.85}
</style>

<div style="
    max-width:560px;width:100%;
    background:linear-gradient(160deg,rgba(25,4,10,.98) 0%,rgba(12,4,20,.98) 100%);
    border:3px solid ${levelConfig.color}70;border-radius:32px;
    padding:40px 32px 32px;text-align:center;
    box-shadow:0 0 100px ${levelConfig.color}40,0 0 200px rgba(139,0,0,.2),inset 0 2px 0 rgba(255,255,255,.08);
    position:relative;overflow:hidden;
    animation:_bfade .6s ease both, _bglow 3s ease-in-out infinite;">

    <div style="position:absolute;inset:0;border-radius:32px;
        background:${levelConfig.color}08;animation:_bpulse 2.5s ease-in-out infinite;pointer-events:none;"></div>

    <div style="position:absolute;top:-80px;right:-80px;width:220px;height:220px;border-radius:50%;
        border:3px solid ${levelConfig.color}15;animation:_bspin 20s linear infinite;pointer-events:none;"></div>
    <div style="position:absolute;bottom:-60px;left:-60px;width:160px;height:160px;border-radius:50%;
        border:3px solid ${levelConfig.color}12;animation:_bspin 15s linear infinite reverse;pointer-events:none;"></div>

    <div style="display:inline-flex;align-items:center;justify-content:center;gap:8px;
        background:${levelConfig.color}20;border:2px solid ${levelConfig.color}60;
        border-radius:50px;padding:8px 20px;margin-bottom:16px;
        box-shadow:0 0 20px ${levelConfig.color}30;">
        <span style="font-size:28px;">${levelConfig.icon}</span>
        <div style="text-align:right;">
            <p style="font-size:11px;font-weight:900;color:${levelConfig.color};margin:0;line-height:1.2;">
                ${levelConfig.name}
            </p>
            <p style="font-size:9px;color:${levelConfig.color}90;margin:0;line-height:1;">
                ${levelConfig.severity}
            </p>
        </div>
    </div>

    <div style="font-size:90px;margin-bottom:12px;line-height:1;
        filter:drop-shadow(0 0 30px ${levelConfig.color});">🚫</div>

    <h1 style="font-family:'Orbitron',sans-serif;font-size:clamp(20px,5.5vw,30px);
        font-weight:900;color:#ef4444;margin:0 0 6px;
        text-shadow:0 0 30px rgba(239,68,68,.9);">تم حظر حسابك</h1>
    <p style="font-family:'Orbitron',sans-serif;font-size:11px;color:rgba(239,68,68,.6);
        letter-spacing:.3em;text-transform:uppercase;margin:0 0 28px;">ACCOUNT BANNED</p>

    <div style="display:inline-flex;align-items:center;gap:10px;
        background:${cat.color}20;border:2px solid ${cat.color}60;
        border-radius:35px;padding:8px 20px;margin-bottom:24px;">
        <span style="font-size:22px;">${cat.icon}</span>
        <span style="font-size:14px;font-weight:900;color:${cat.color};">${cat.ar}</span>
    </div>

    <div style="background:rgba(239,68,68,.09);border:2px solid rgba(239,68,68,.25);
        border-radius:18px;padding:18px 20px;margin-bottom:20px;">
        <p style="font-size:11px;color:rgba(255,255,255,.35);font-family:'Orbitron',sans-serif;
            letter-spacing:.18em;margin:0 0 8px;">سبب الحظر</p>
        <p style="font-size:16px;font-weight:900;color:#fff;margin:0;line-height:1.6;">
            ${ban.reason}
        </p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.1);
            border-radius:14px;padding:14px 12px;">
            <p style="font-size:10px;color:rgba(255,255,255,.35);font-family:'Orbitron',sans-serif;
                letter-spacing:.15em;margin:0 0 6px;">تاريخ الحظر</p>
            <p style="font-size:13px;font-weight:700;color:rgba(255,255,255,.8);margin:0;line-height:1.4;">
                ${fmtDate(ban.bannedAt)}
            </p>
        </div>

        <div style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.1);
            border-radius:14px;padding:14px 12px;">
            <p style="font-size:10px;color:rgba(255,255,255,.35);font-family:'Orbitron',sans-serif;
                letter-spacing:.15em;margin:0 0 6px;">ينتهي في</p>
            <p style="font-size:13px;font-weight:700;color:${isPerm ? '#ef4444' : 'rgba(255,255,255,.8)'};margin:0;line-height:1.4;">
                ${isPerm ? '♾️ دائم' : fmtDate(ban.expiresAt)}
            </p>
        </div>

        <div style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.1);
            border-radius:14px;padding:14px 12px;">
            <p style="font-size:10px;color:rgba(255,255,255,.35);font-family:'Orbitron',sans-serif;
                letter-spacing:.15em;margin:0 0 6px;">مدة الحظر</p>
            <p style="font-size:13px;font-weight:700;color:rgba(255,255,255,.8);margin:0;line-height:1.4;">
                ${fmtDuration(ban.durationMs)}
            </p>
        </div>

        <div style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.1);
            border-radius:14px;padding:14px 12px;">
            <p style="font-size:10px;color:rgba(255,255,255,.35);font-family:'Orbitron',sans-serif;
                letter-spacing:.15em;margin:0 0 6px;">نفّذه</p>
            <p style="font-size:13px;font-weight:700;color:rgba(255,255,255,.8);margin:0;">
                ${ban.bannedBy === 'system' ? '🤖 النظام' : '👤 الإدارة'}
            </p>
        </div>
    </div>

    ${isPerm ? `
    <div style="background:rgba(0,0,0,.5);border:3px solid rgba(239,68,68,.3);
        border-radius:20px;padding:20px;margin-bottom:24px;">
        <p style="font-size:12px;color:rgba(239,68,68,.7);font-family:'Orbitron',sans-serif;
            letter-spacing:.18em;margin:0 0 8px;">نوع الحظر</p>
        <p style="font-size:28px;font-weight:900;font-family:'Orbitron',sans-serif;
            color:#ef4444;text-shadow:0 0 20px rgba(239,68,68,.8);margin:0;">⛔ دائم</p>
    </div>
    ` : `
    <div style="background:rgba(0,0,0,.5);border:3px solid ${levelConfig.color}40;
        border-radius:20px;padding:20px;margin-bottom:24px;">
        <p style="font-size:11px;color:${levelConfig.color};font-family:'Orbitron',sans-serif;
            letter-spacing:.18em;margin:0 0 10px;">الوقت المتبقي</p>
        <div id="${remainingId}" style="font-family:'Orbitron',sans-serif;
            font-size:clamp(18px,5vw,28px);font-weight:900;color:${levelConfig.color};
            text-shadow:0 0 20px ${levelConfig.color}90;letter-spacing:.05em;">
            ${fmtRemaining(ban.expiresAt)}
        </div>
    </div>
    `}

    ${ban.banCount > 1 ? `
    <div style="background:rgba(239,68,68,.12);border:2px solid rgba(239,68,68,.3);
        border-radius:16px;padding:14px;margin-bottom:20px;">
        <p style="font-size:13px;color:#ef4444;font-weight:700;margin:0;line-height:1.6;">
            ⚠️ هذا حظرك رقم <strong style="font-size:18px;">${ban.banCount}</strong> من أصل ${PERM_BAN_THRESHOLD}
            ${ban.banCount >= PERM_BAN_THRESHOLD ? '<br><strong>الحظر التالي سيكون دائماً ⛔</strong>' : ''}
        </p>
    </div>` : ''}

    <p style="font-size:13px;color:rgba(255,255,255,.35);line-height:1.9;margin:0 0 24px;">
        لا يمكنك اللعب خلال فترة الحظر.<br>
        للاستئناف أو الإبلاغ عن خطأ تواصل معنا.
    </p>

    <a href="https://discord.gg/xBQ3ewVVHk" target="_blank" rel="noopener" style="
        display:inline-flex;align-items:center;gap:10px;
        padding:14px 30px;border-radius:16px;text-decoration:none;
        background:rgba(88,101,242,.15);border:3px solid rgba(88,101,242,.4);
        color:#fff;font-weight:900;font-size:14px;font-family:'Cairo',sans-serif;
        transition:all .3s;box-shadow:0 4px 20px rgba(88,101,242,.2);">
        <svg width="20" height="20" viewBox="0 0 71 55" fill="none">
            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.44077 45.4204 0.52529C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.52529C25.5141 0.44359 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4377C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.4349C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" fill="#5865F2"/>
        </svg>
        استأنف الحظر
    </a>
</div>`;

    document.body.appendChild(overlay);
    _screenShown = true;

    if (!isPerm) {
        const el = document.getElementById(remainingId);
        if (el) {
            const tick = () => {
                const rem = ban.expiresAt - Date.now();
                if (rem <= 0) {
                    el.textContent = '⏳ انتهى — جارٍ التحقق...';
                    fetchActiveBan().then(b => {
                        if (!b) {
                            removeBanScreen();
                            location.reload();
                        } else {
                            showBanScreen(b);
                        }
                    });
                    return;
                }
                const d = Math.floor(rem / 864e5);
                const h = Math.floor((rem % 864e5) / 36e5);
                const m = Math.floor((rem % 36e5) / 6e4);
                const s = Math.floor((rem % 6e4) / 1e3);
                el.textContent = d > 0
                    ? `${d}ي ${h}س ${m}د ${s}ث`
                    : `${h}س ${m}د ${s}ث`;
                setTimeout(tick, 1000);
            };
            tick();
        }
    }
}

function removeBanScreen() {
    document.getElementById('_ej_ban')?.remove();
    _screenShown = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    _navLocked = false;
}

// ══════════════════════════════════════════════════════════
// WARNING TOAST
// ══════════════════════════════════════════════════════════
function showWarningToast(level, warningNum, maxWarnings) {
    document.querySelectorAll('._ej_warn').forEach(e => e.remove());

    const levelConfig = LEVELS[level];
    const isLastWarning = warningNum >= maxWarnings - 1;

    const toast = document.createElement('div');
    toast.className = '_ej_warn';
    toast.style.cssText = `
        position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-24px);
        z-index:2147483646;font-family:'Cairo',sans-serif;text-align:center;
        background:${isLastWarning
            ? 'linear-gradient(135deg,rgba(239,68,68,.25),rgba(180,0,0,.2))'
            : `linear-gradient(135deg,${levelConfig.color}30,${levelConfig.color}20)`};
        border:3px solid ${isLastWarning ? 'rgba(239,68,68,.7)' : `${levelConfig.color}80`};
        border-radius:24px;padding:16px 26px;
        box-shadow:0 10px 50px rgba(0,0,0,.6);backdrop-filter:blur(20px);
        min-width:300px;max-width:90vw;
        transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .4s;`;

    toast.innerHTML = `
        <div style="font-size:36px;margin-bottom:8px;line-height:1;">${levelConfig.icon}</div>
        <p style="font-size:17px;font-weight:900;
            color:${isLastWarning ? '#ef4444' : levelConfig.color};margin:0 0 6px;">
            ${isLastWarning ? '🚨 آخر تحذير!' : `${levelConfig.name}`}
        </p>
        <p style="font-size:13px;color:rgba(255,255,255,.7);margin:0;line-height:1.7;">
            رسالتك تحتوي على محتوى محظور وتم حذفها<br>
            ${isLastWarning
                ? '<strong style="color:#ef4444;">المخالفة التالية ستؤدي للحظر فوراً</strong>'
                : `تحذير ${warningNum} من ${maxWarnings}`
            }
        </p>`;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-24px)';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ══════════════════════════════════════════════════════════
// REAL-TIME LISTENER
// ══════════════════════════════════════════════════════════
function startRealtimeListener() {
    if (!_user) return;
    const f = fbFns();
    if (!f?.onValue || !_db) return;

    if (_unsubBan) { try { _unsubBan(); } catch {} }

    const banRef = f.ref(_db, `players/${_user.uid}/ban`);
    _unsubBan = f.onValue(banRef, (snap) => {
        const ban = snap?.val?.() ?? snap?.exists?.() ? snap.val() : null;

        if (!ban) {
            if (_screenShown) {
                lsBan(null);
                removeBanScreen();
                location.reload();
            }
            return;
        }

        if (!ban.isPermanent && ban.expiresAt !== -1 && Date.now() >= ban.expiresAt) {
            liftBan();
            return;
        }

        lsBan(ban);
        showBanScreen(ban);
    });
}

// ══════════════════════════════════════════════════════════
// PERIODIC RE-CHECK
// ══════════════════════════════════════════════════════════
function startPeriodicCheck() {
    if (_recheckTimer) clearInterval(_recheckTimer);
    _recheckTimer = setInterval(async () => {
        const ban = await fetchActiveBan();
        if (ban && !_screenShown) {
            showBanScreen(ban);
        } else if (!ban && _screenShown) {
            removeBanScreen();
        }
    }, RECHECK_INTERVAL_MS);
}

// ══════════════════════════════════════════════════════════
// OFFENSE HISTORY
// ══════════════════════════════════════════════════════════
async function fetchOffenseHistory() {
    let currentWarnings = 0;
    let previousBans = 0;

    if (_user) {
        const playerData = await dbGet(`players/${_user.uid}`);
        currentWarnings = playerData?.moderationWarnings ?? 0;
        previousBans = playerData?.totalBans ?? 0;
    } else {
        currentWarnings = lsWarnings();
        const localBan = lsGetBan();
        if (localBan) previousBans = 1;
    }

    return { currentWarnings, previousBans };
}

// ══════════════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════════════

async function init(db, user) {
    _db = db;
    _user = user;

    const ban = await fetchActiveBan();
    if (ban) {
        showBanScreen(ban);
    }

    startRealtimeListener();
    startPeriodicCheck();
}

async function scan(text) {
    const violation = detectViolation(text);
    
    if (!violation) return false;

    const level = violation.level;
    const levelConfig = LEVELS[level];
    const { currentWarnings, previousBans } = await fetchOffenseHistory();

    if (level === 5) {
        await new Promise(r => setTimeout(r, 800));
        await issueBan(
            `${violation.description}: ${violation.word}`,
            violation.category,
            5,
            'system'
        );
        return true;
    }

    const adjustedThreshold = previousBans > 0 
        ? Math.max(1, Math.floor(levelConfig.warningsThreshold / 2))
        : levelConfig.warningsThreshold;

    if (currentWarnings >= adjustedThreshold) {
        showWarningToast(level, currentWarnings, adjustedThreshold);
        await new Promise(r => setTimeout(r, 800));
        await issueBan(
            `${violation.description} (${currentWarnings} تحذيرات)`,
            violation.category,
            level,
            'system'
        );
        return true;
    }

    const newWarnings = await addWarning();
    const isLast = newWarnings >= adjustedThreshold - 1;
    showWarningToast(level, newWarnings, adjustedThreshold);

    return true;
}

async function banUserManual(targetUid, reason, category, level) {
    const levelConfig = LEVELS[level] || LEVELS[3];
    const ban = {
        reason: reason || 'قرار إداري',
        category: category || 'admin_decision',
        level,
        bannedAt: Date.now(),
        expiresAt: levelConfig.banDuration === -1 ? -1 : Date.now() + levelConfig.banDuration,
        durationMs: levelConfig.banDuration,
        bannedBy: _user?.uid || 'admin',
        isPermanent: levelConfig.banDuration === -1,
        banCount: 1,
    };
    
    if (_db) {
        const f = fbFns();
        if (f) {
            await f.update(f.ref(_db, `players/${targetUid}`), { ban });
            await f.set(f.ref(_db, `banned_users/${targetUid}`), ban);
        }
    }
}

async function liftBanManual(targetUid) {
    if (!_db) return;
    const f = fbFns();
    if (!f) return;
    await f.update(f.ref(_db, `players/${targetUid}`), { ban: null, moderationWarnings: 0 });
    await f.set(f.ref(_db, `banned_users/${targetUid}`), null);
    if (_user && targetUid === _user.uid) {
        lsBan(null);
        lsSetWarn(0);
        removeBanScreen();
    }
}

// Export
window.MOD = {
    init,
    scan,
    banUserManual,
    liftBanManual,
    detectViolation,
    showBanScreen,
    CATEGORIES,
    LEVELS,
};

window.moderateMessage = async (text) => {
    const blocked = await scan(text);
    return { allowed: !blocked, message: blocked ? 'رسالتك تحتوي على محتوى محظور' : null };
};

console.log('[MOD] JMS v3.1 loaded — Advanced detection active');

})();