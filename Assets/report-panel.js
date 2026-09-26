// ============================================================
// EL JASUS — REPORT PANEL v2 (In-Game Reporting)
// Stretchable slide-in panel for reporting players
// Reports saved to Firebase → visible in admin panel
// ============================================================

const REPORT_LEVELS = {
    1: {
        ar: '⚠️ المستوى الأول',
        items: ['الكلام غير اللائق الخفيف', 'Rage Quit متكرر', 'Spam في الشات']
    },
    2: {
        ar: '🔶 المستوى الثاني',
        items: ['الإزعاج المتعمد', 'التحرش اللفظي', 'الغش بالتنسيق الخارجي']
    },
    3: {
        ar: '🔴 المستوى الثالث',
        items: ['التنمر والمضايقة المتكررة', 'الكلام العدواني الصريح', 'خلق حسابات متعددة للتحايل']
    },
    4: {
        ar: '🟣 المستوى الرابع',
        items: ['نشر محتوى مسيء للمجتمع', 'التحرش الجنسي', 'اختراق أو التلاعب بالنظام']
    },
    5: {
        ar: '☠️ المستوى الخامس',
        items: ['الإساءة الجسيمة المتكررة', 'التهديد بالأذى الجسدي', 'الاستغلال التجاري غير المرخص']
    }
};

class ReportPanel {
    constructor(db, roomCode, currentUid, currentUsername, roomPlayers = []) {
        this.db       = db;
        this.roomCode = roomCode;
        this.uid      = currentUid;
        this.username = currentUsername;
        this.roomPlayers = roomPlayers; // array of {uid, username}

        this._panelOpen = false;
        this._selectedPlayer = null;
        this._selectedLevel = null;
        this._selectedCategory = null;

        this.buildUI();
    }

    buildUI() {
        if (document.getElementById('report-panel')) return;

        document.body.insertAdjacentHTML('beforeend', `
        <!-- Report Panel Backdrop -->
        <div id="report-backdrop" style="
            position:fixed;inset:0;z-index:8498;background:rgba(0,0,0,.5);
            backdrop-filter:blur(8px);display:none;cursor:pointer;"></div>

        <!-- Report Panel -->
        <div id="report-panel" style="
            position:fixed;right:0;top:0;bottom:0;z-index:8499;
            width:0;overflow:hidden;overflow-y:auto;
            background:linear-gradient(160deg,rgba(8,11,22,.99),rgba(18,12,40,.99));
            border-left:2px solid rgba(0,242,255,.2);
            box-shadow:-6px 0 40px rgba(0,0,0,.6);
            transition:width .35s cubic-bezier(.4,0,.2,1);
            display:flex;flex-direction:column;
            font-family:'Cairo',sans-serif;direction:rtl;">

            <!-- Header -->
            <div style="
                padding:18px 16px 14px;border-bottom:1px solid rgba(0,242,255,.1);
                flex-shrink:0;display:flex;align-items:center;justify-content:space-between;">
                <h2 style="
                    color:#ef4444;font-size:14px;font-weight:900;
                    text-transform:uppercase;letter-spacing:1.5px;margin:0;">
                    🚨 إبلاغ عن لاعب
                </h2>
                <button id="report-close-btn" style="
                    background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);
                    color:#555;cursor:pointer;font-size:18px;padding:6px 10px;
                    border-radius:8px;transition:all .2s;">
                    ✕
                </button>
            </div>

            <!-- Content (scrollable) -->
            <div style="flex:1;overflow-y:auto;padding:16px;">

                <!-- Step 1: Select Player -->
                <div id="report-step-1" style="margin-bottom:20px;">
                    <label style="
                        font-size:10px;font-weight:900;color:#888;
                        text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:8px;">
                        الخطوة 1️⃣: اختر اللاعب
                    </label>
                    <select id="report-player-select" style="
                        width:100%;padding:10px;border-radius:10px;
                        background:rgba(255,255,255,.05);border:1px solid rgba(0,242,255,.2);
                        color:#fff;font-family:'Cairo',sans-serif;cursor:pointer;outline:none;">
                        <option value="">— اختر لاعباً —</option>
                    </select>
                </div>

                <!-- Step 2: Select Level -->
                <div id="report-step-2" style="margin-bottom:20px;">
                    <label style="
                        font-size:10px;font-weight:900;color:#888;
                        text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:8px;">
                        الخطوة 2️⃣: اختر مستوى الخطورة
                    </label>
                    <div id="report-levels-container" style="display:flex;flex-direction:column;gap:6px;">
                        <!-- Levels will be populated here -->
                    </div>
                </div>

                <!-- Step 3: Select Category -->
                <div id="report-step-3" style="margin-bottom:20px;display:none;">
                    <label style="
                        font-size:10px;font-weight:900;color:#888;
                        text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:8px;">
                        الخطوة 3️⃣: اختر السبب
                    </label>
                    <div id="report-categories-container" style="display:flex;flex-direction:column;gap:6px;">
                        <!-- Categories will be populated here -->
                    </div>
                </div>

                <!-- Step 4: Description -->
                <div id="report-step-4" style="margin-bottom:20px;display:none;">
                    <label style="
                        font-size:10px;font-weight:900;color:#888;
                        text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:8px;">
                        الخطوة 4️⃣: وصف التفاصيل
                    </label>
                    <textarea id="report-description" placeholder="وصف مختصر عن الحادثة..."
                        style="
                            width:100%;height:80px;padding:10px;border-radius:10px;
                            background:rgba(255,255,255,.05);border:1px solid rgba(0,242,255,.2);
                            color:#fff;font-family:'Cairo',sans-serif;font-size:12px;outline:none;
                            resize:vertical;max-height:120px;"></textarea>
                </div>

                <!-- Step 5: Screenshot Upload -->
                <div id="report-step-5" style="margin-bottom:20px;display:none;">
                    <label style="
                        font-size:10px;font-weight:900;color:#888;
                        text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:8px;">
                        الخطوة 5️⃣: إرفق لقطة شاشة (اختياري)
                    </label>
                    <div id="report-upload-area" style="
                        padding:20px;border:2px dashed rgba(0,242,255,.3);border-radius:12px;
                        text-align:center;cursor:pointer;transition:all .2s;">
                        <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:#00f2ff;margin-bottom:8px;"></i>
                        <p style="color:#888;font-size:12px;margin:0;line-height:1.5;">
                            انقر لاختيار صورة<br><span style="font-size:10px;opacity:.6;">أو اسحب وأفلت</span>
                        </p>
                        <input id="report-screenshot" type="file" accept="image/*" style="display:none;">
                    </div>
                    <div id="report-file-preview" style="margin-top:10px;display:none;text-align:center;">
                        <img id="report-preview-img" style="max-width:100%;max-height:100px;border-radius:8px;">
                        <button id="report-remove-file" style="
                            margin-top:8px;padding:6px 12px;border-radius:8px;
                            background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);
                            color:#ef4444;cursor:pointer;font-size:11px;font-weight:700;">حذف الصورة</button>
                    </div>
                </div>
            </div>

            <!-- Footer Buttons -->
            <div style="
                padding:14px;border-top:1px solid rgba(0,242,255,.1);
                flex-shrink:0;display:flex;gap:8px;">
                <button id="report-submit-btn" style="
                    flex:1;padding:11px;border-radius:10px;
                    background:linear-gradient(135deg,#ef4444,#991b1b);
                    border:none;color:white;cursor:pointer;font-weight:900;font-size:12px;
                    font-family:'Cairo',sans-serif;transition:opacity .2s;"
                    title="إرسال البلاغ" disabled>
                    🚨 إرسال البلاغ
                </button>
            </div>
        </div>

        <style>
            #report-level-btn, #report-category-btn {
                padding:10px;border-radius:10px;border:1.5px solid rgba(255,255,255,.15);
                background:rgba(255,255,255,.04);color:#ccc;cursor:pointer;
                font-family:'Cairo',sans-serif;font-size:12px;font-weight:700;
                transition:all .2s;text-align:right;
            }
            #report-level-btn:hover, #report-category-btn:hover {
                background:rgba(255,255,255,.08);border-color:rgba(0,242,255,.3);
            }
            #report-level-btn.active, #report-category-btn.active {
                background:rgba(0,242,255,.15);border-color:rgba(0,242,255,.5);
                color:#00f2ff;box-shadow:0 0 12px rgba(0,242,255,.2);
            }
            #report-upload-area:hover {
                border-color:rgba(0,242,255,.6);background:rgba(0,242,255,.04);
            }
        </style>`);

        this.populatePlayerSelect();
        this.populateLevels();
        this.wireEvents();
    }

    wireEvents() {
        const closeBtn = document.getElementById('report-close-btn');
        const backdrop = document.getElementById('report-backdrop');
        const submitBtn = document.getElementById('report-submit-btn');
        const playerSelect = document.getElementById('report-player-select');
        const uploadArea = document.getElementById('report-upload-area');
        const fileInput = document.getElementById('report-screenshot');
        const removeFileBtn = document.getElementById('report-remove-file');

        closeBtn.addEventListener('click', () => this.togglePanel(false));
        backdrop.addEventListener('click', () => this.togglePanel(false));
        submitBtn.addEventListener('click', () => this.submitReport());
        playerSelect.addEventListener('change', (e) => {
            this._selectedPlayer = e.target.value;
            this.updateSteps();
        });

        // File upload
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        removeFileBtn.addEventListener('click', () => this.clearFile());

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(0,242,255,.6)';
            uploadArea.style.background = 'rgba(0,242,255,.08)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'rgba(0,242,255,.3)';
            uploadArea.style.background = 'transparent';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) {
                fileInput.files = e.dataTransfer.files;
                this.handleFileUpload({ target: fileInput });
            }
        });
    }

    populatePlayerSelect() {
        const select = document.getElementById('report-player-select');
        this.roomPlayers.forEach(p => {
            if (p.uid !== this.uid) { // Don't report self
                const option = document.createElement('option');
                option.value = p.uid;
                option.textContent = p.username;
                select.appendChild(option);
            }
        });
    }

    populateLevels() {
        const container = document.getElementById('report-levels-container');
        Object.entries(REPORT_LEVELS).forEach(([level, data]) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = `level-${level}`;
            btn.className = 'level-btn';
            btn.style.cssText = `padding:10px;border-radius:10px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:#ccc;cursor:pointer;font-family:'Cairo',sans-serif;font-size:12px;font-weight:700;transition:all .2s;text-align:right;`;
            btn.innerHTML = `${data.ar}`;
            btn.addEventListener('click', () => this.selectLevel(level, btn));
            container.appendChild(btn);
        });
    }

    selectLevel(level, btn) {
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._selectedLevel = level;
        this.populateCategories(level);
        this.updateSteps();
    }

    populateCategories(level) {
        const container = document.getElementById('report-categories-container');
        container.innerHTML = '';
        const items = REPORT_LEVELS[level].items;
        items.forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'category-btn';
            btn.style.cssText = `padding:10px;border-radius:10px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:#ccc;cursor:pointer;font-family:'Cairo',sans-serif;font-size:12px;font-weight:700;transition:all .2s;text-align:right;`;
            btn.textContent = item;
            btn.addEventListener('click', () => this.selectCategory(item, btn));
            container.appendChild(btn);
        });
    }

    selectCategory(category, btn) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._selectedCategory = category;
        this.updateSteps();
    }

    updateSteps() {
        const step3 = document.getElementById('report-step-3');
        const step4 = document.getElementById('report-step-4');
        const step5 = document.getElementById('report-step-5');

        step3.style.display = this._selectedLevel ? 'block' : 'none';
        step4.style.display = this._selectedCategory ? 'block' : 'none';
        step5.style.display = this._selectedCategory ? 'block' : 'none';

        const submitBtn = document.getElementById('report-submit-btn');
        submitBtn.disabled = !this._selectedPlayer || !this._selectedLevel || !this._selectedCategory;
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = document.getElementById('report-file-preview');
            const img = document.getElementById('report-preview-img');
            img.src = event.target.result;
            preview.style.display = 'block';
            this._fileData = event.target.result; // Store base64
        };
        reader.readAsDataURL(file);
    }

    clearFile() {
        document.getElementById('report-screenshot').value = '';
        document.getElementById('report-file-preview').style.display = 'none';
        this._fileData = null;
    }

    async submitReport() {
        const description = document.getElementById('report-description').value.trim();

        try {
            const { push, ref, serverTimestamp } = window._firebaseFns;
            await push(ref(this.db, `reports`), {
                roomCode:       this.roomCode,
                reportedUid:    this._selectedPlayer,
                reportedUsername: document.getElementById('report-player-select').options[document.getElementById('report-player-select').selectedIndex].text,
                reporterUid:    this.uid,
                reporterUsername: this.username,
                level:          this._selectedLevel,
                category:       this._selectedCategory,
                description,
                photo:          this._fileData || null,
                timestamp:      serverTimestamp?.() || Date.now(),
                status:         'pending'
            });

            if (window.showToast) showToast('✅ تم إرسال البلاغ للإدارة بنجاح');
            this.resetForm();
            this.togglePanel(false);
        } catch (err) {
            console.error('[Report] submitReport error:', err);
            if (window.showToast) showToast('❌ فشل إرسال البلاغ');
        }
    }

    resetForm() {
        this._selectedPlayer = null;
        this._selectedLevel = null;
        this._selectedCategory = null;
        this._fileData = null;
        document.getElementById('report-player-select').value = '';
        document.getElementById('report-description').value = '';
        document.getElementById('report-screenshot').value = '';
        document.getElementById('report-file-preview').style.display = 'none';
        document.querySelectorAll('.level-btn, .category-btn').forEach(b => b.classList.remove('active'));
        this.updateSteps();
    }

    togglePanel(force) {
        const panel = document.getElementById('report-panel');
        const backdrop = document.getElementById('report-backdrop');
        const isOpen = panel.style.width === '100%' || panel.style.width === '320px';
        const next = force !== undefined ? force : !isOpen;

        panel.style.width = next ? '320px' : '0';
        backdrop.style.display = next ? 'block' : 'none';
        this._panelOpen = next;
    }

    cleanup() {
        document.getElementById('report-panel')?.remove();
        document.getElementById('report-backdrop')?.remove();
    }
}

window.ReportPanel = ReportPanel;