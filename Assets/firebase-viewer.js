// ═══════════════════════════════════════════════
// EL JASUS ADMIN PANEL - FIREBASE DATABASE VIEWER
// ═══════════════════════════════════════════════

window.firebaseViewerData = null;
window.firebaseViewerPath = '';
let expandedNodes = new Set();
let selectedNodePath = null;
let selectedNodeData = null;

window.refreshFirebaseViewer = async function() {
    const container = document.getElementById('firebase-tree-container');
    if (!container) return;
    
    container.innerHTML = '<div class="firebase-loading"><i class="fas fa-spinner fa-spin ml-2"></i>جاري تحميل البيانات...</div>';

    const { db, ref, get } = window;
    if (!db || !ref || !get) {
        container.innerHTML = '<div class="firebase-empty" style="color:#ef4444;">❌ Firebase غير متاح</div>';
        return;
    }

    try {
        const rootPath = document.getElementById('firebase-root-select')?.value || '';

        if (!rootPath) {
            // Load all known top-level paths
            const knownPaths = ['players', 'rooms', 'reports', 'bans', 'wordLists', 'announcements', 'adminConfig'];
            const results = await Promise.allSettled(knownPaths.map(p => get(ref(db, p))));
            const combined = {};
            results.forEach((result, i) => {
                if (result.status === 'fulfilled' && result.value.exists()) {
                    combined[knownPaths[i]] = result.value.val();
                }
            });
            if (Object.keys(combined).length === 0) {
                container.innerHTML = '<div class="firebase-empty">📭 لا توجد بيانات متاحة</div>';
                return;
            }
            window.firebaseViewerData = combined;
            window.firebaseViewerPath = '';
            renderFirebaseTree(combined, '', container);
            updateFirebaseBreadcrumb('');
        } else {
            // Load specific path
            const snapshot = await get(ref(db, rootPath));
            if (snapshot.exists()) {
                window.firebaseViewerData = snapshot.val();
                window.firebaseViewerPath = rootPath;
                renderFirebaseTree(window.firebaseViewerData, rootPath, container);
                updateFirebaseBreadcrumb(rootPath);
            } else {
                container.innerHTML = '<div class="firebase-empty">📭 لا توجد بيانات في هذا المحور</div>';
            }
        }
    } catch(e) {
        container.innerHTML = `<div class="firebase-empty" style="color:#ef4444;">❌ خطأ في التحميل: ${e.message}</div>`;
        console.error('Firebase viewer error:', e);
    }
};

function renderFirebaseTree(data, path, container, level = 0) {
    container.innerHTML = '';
    
    if (data === null || data === undefined) {
        container.innerHTML = '<div class="firebase-empty">القيمة: null</div>';
        return;
    }
    
    const isObject = typeof data === 'object' && data !== null;
    
    if (!isObject) {
        // Primitive value
        container.innerHTML = `<div class="firebase-node">
            <div class="firebase-node-header">
                <span class="firebase-value ${typeof data}">${formatFirebaseValue(data)}</span>
            </div>
        </div>`;
        return;
    }
    
    // Object/Array
    const entries = Object.entries(data);
    
    entries.forEach(([key, value]) => {
        const nodePath = path ? `${path}/${key}` : key;
        const isExpanded = expandedNodes.has(nodePath);
        const isSelected = selectedNodePath === nodePath;
        const hasChildren = typeof value === 'object' && value !== null;
        const childCount = hasChildren ? Object.keys(value).length : 0;
        
        const nodeEl = document.createElement('div');
        nodeEl.className = 'firebase-node';
        nodeEl.dataset.path = nodePath;
        
        const headerEl = document.createElement('div');
        headerEl.className = `firebase-node-header ${isSelected ? 'selected' : ''}`;
        headerEl.style.paddingLeft = `${level * 12}px`;
        
        // Toggle icon
        if (hasChildren) {
            const toggleEl = document.createElement('span');
            toggleEl.className = `firebase-toggle ${isExpanded ? 'expanded' : ''}`;
            toggleEl.innerHTML = '▶';
            toggleEl.onclick = (e) => {
                e.stopPropagation();
                toggleFirebaseNode(nodePath);
            };
            headerEl.appendChild(toggleEl);
        } else {
            const spacerEl = document.createElement('span');
            spacerEl.style.width = '16px';
            headerEl.appendChild(spacerEl);
        }
        
        // Key
        const keyEl = document.createElement('span');
        keyEl.className = 'firebase-key';
        keyEl.textContent = key;
        headerEl.appendChild(keyEl);
        
        // Type badge
        const typeEl = document.createElement('span');
        typeEl.className = 'firebase-type';
        if (hasChildren) {
            typeEl.textContent = Array.isArray(value) ? 'array' : 'object';
        } else {
            typeEl.textContent = typeof value;
        }
        headerEl.appendChild(typeEl);
        
        // Count badge for objects
        if (hasChildren) {
            const countEl = document.createElement('span');
            countEl.className = 'firebase-count';
            countEl.textContent = `${childCount}`;
            headerEl.appendChild(countEl);
        }
        
        // Value preview for primitives
        if (!hasChildren) {
            const valueEl = document.createElement('span');
            valueEl.className = `firebase-value ${typeof value}`;
            valueEl.textContent = formatFirebaseValue(value);
            headerEl.appendChild(valueEl);
        }
        
        // Actions
        const actionsEl = document.createElement('div');
        actionsEl.className = 'firebase-actions';
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'firebase-action-btn';
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        viewBtn.title = 'عرض التفاصيل';
        viewBtn.onclick = (e) => {
            e.stopPropagation();
            showFirebaseNodeDetails(nodePath, value);
        };
        actionsEl.appendChild(viewBtn);
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'firebase-action-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'نسخ المحور';
        copyBtn.onclick = (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(nodePath);
            UIAlert('تم نسخ المحور', { title: 'نسخ', type: 'success', icon: '📋' });
        };
        actionsEl.appendChild(copyBtn);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'firebase-action-btn danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'حذف';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            confirmDeleteFirebaseNode(nodePath);
        };
        actionsEl.appendChild(deleteBtn);
        
        headerEl.appendChild(actionsEl);
        
        // Click handler
        headerEl.onclick = () => {
            if (hasChildren) {
                toggleFirebaseNode(nodePath);
            }
            selectFirebaseNode(nodePath, value);
        };
        
        nodeEl.appendChild(headerEl);
        
        // Children container
        if (hasChildren) {
            const childrenEl = document.createElement('div');
            childrenEl.className = `firebase-children ${isExpanded ? 'expanded' : ''}`;
            if (isExpanded) {
                renderFirebaseTree(value, nodePath, childrenEl, level + 1);
            }
            nodeEl.appendChild(childrenEl);
        }
        
        container.appendChild(nodeEl);
    });
}

function formatFirebaseValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value.length > 50 ? value.slice(0, 50) + '...' : value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    return JSON.stringify(value).slice(0, 50) + '...';
}

function toggleFirebaseNode(path) {
    if (expandedNodes.has(path)) {
        expandedNodes.delete(path);
    } else {
        expandedNodes.add(path);
    }
    
    // Re-render only this node
    const nodeEl = document.querySelector(`[data-path="${path}"]`);
    if (nodeEl) {
        const childrenEl = nodeEl.querySelector('.firebase-children');
        const toggleEl = nodeEl.querySelector('.firebase-toggle');
        
        if (childrenEl && toggleEl) {
            const isExpanded = expandedNodes.has(path);
            childrenEl.classList.toggle('expanded', isExpanded);
            toggleEl.classList.toggle('expanded', isExpanded);
            
            if (isExpanded && childrenEl.children.length === 0) {
                // Lazy load children
                const pathParts = path.split('/').filter(p => p);
                let data = window.firebaseViewerData;
                for (const part of pathParts) {
                    data = data[part];
                }
                renderFirebaseTree(data, path, childrenEl, pathParts.length);
            }
        }
    }
}

function selectFirebaseNode(path, data) {
    // Deselect previous
    const prevSelected = document.querySelector('.firebase-node-header.selected');
    if (prevSelected) prevSelected.classList.remove('selected');
    
    // Select new
    const nodeEl = document.querySelector(`[data-path="${path}"] > .firebase-node-header`);
    if (nodeEl) nodeEl.classList.add('selected');
    
    selectedNodePath = path;
    selectedNodeData = data;
}

function showFirebaseNodeDetails(path, data) {
    selectedNodePath = path;
    selectedNodeData = data;
    
    const pathEl = document.getElementById('firebase-details-path');
    const typeEl = document.getElementById('firebase-details-type');
    const jsonEl = document.getElementById('firebase-details-json');
    const detailsPanel = document.getElementById('firebase-details');
    
    if (!pathEl || !typeEl || !jsonEl || !detailsPanel) return;
    
    pathEl.textContent = path;
    
    const type = Array.isArray(data) ? 'Array' : typeof data === 'object' ? 'Object' : typeof data;
    typeEl.textContent = type;
    
    const jsonStr = JSON.stringify(data, null, 2);
    jsonEl.textContent = jsonStr;
    
    detailsPanel.style.display = 'block';
    
    // Scroll to details
    detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

window.closeFirebaseDetails = function() {
    const panel = document.getElementById('firebase-details');
    if (panel) panel.style.display = 'none';
    selectedNodePath = null;
    selectedNodeData = null;
};

window.copyFirebaseNodeData = function() {
    if (!selectedNodeData) return;
    const jsonStr = JSON.stringify(selectedNodeData, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
        UIAlert('تم نسخ البيانات بتنسيق JSON', { title: 'نسخ', type: 'success', icon: '📋' });
    });
};

window.exportFirebaseNode = function() {
    if (!selectedNodeData || !selectedNodePath) return;
    
    const jsonStr = JSON.stringify(selectedNodeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `firebase_${selectedNodePath.replace(/\//g, '_')}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    UIAlert('تم تصدير البيانات', { title: 'تصدير', type: 'success', icon: '💾' });
};

window.deleteFirebaseNode = async function() {
    if (!selectedNodePath) return;
    await confirmDeleteFirebaseNode(selectedNodePath);
};

async function confirmDeleteFirebaseNode(path) {
    const ok = await UIConfirm(
        `هل أنت متأكد من حذف هذه العقدة؟<br><br><code style="font-family:monospace;background:rgba(0,0,0,.4);padding:4px 8px;border-radius:4px;color:#ef4444;">${path}</code><br><br>⚠️ <strong>هذا الإجراء لا يمكن التراجع عنه!</strong>`,
        { title: 'حذف عقدة', type: 'error', confirmText: 'حذف نهائياً', cancelText: 'إلغاء', icon: '🗑️' }
    );
    
    if (!ok) return;
    
    const { db, ref, remove } = window;
    if (!db || !ref || !remove) return;
    
    try {
        await remove(ref(db, path));
        await UIAlert('تم حذف العقدة بنجاح', { title: 'تم الحذف', type: 'success', icon: '✅' });
        window.closeFirebaseDetails();
        window.refreshFirebaseViewer();
    } catch(e) {
        await UIAlert(`خطأ في الحذف: ${e.message}`, { title: 'خطأ', type: 'error', icon: '❌' });
    }
}

window.expandAllNodes = function() {
    if (!window.firebaseViewerData) return;
    
    function collectAllPaths(data, basePath = '') {
        const paths = [];
        if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach(key => {
                const path = basePath ? `${basePath}/${key}` : key;
                paths.push(path);
                paths.push(...collectAllPaths(data[key], path));
            });
        }
        return paths;
    }
    
    const allPaths = collectAllPaths(window.firebaseViewerData, window.firebaseViewerPath);
    allPaths.forEach(p => expandedNodes.add(p));
    
    window.refreshFirebaseViewer();
};

window.collapseAllNodes = function() {
    expandedNodes.clear();
    window.refreshFirebaseViewer();
};

window.filterFirebaseNodes = function(query) {
    const nodes = document.querySelectorAll('.firebase-node');
    query = query.toLowerCase();
    
    if (!query) {
        nodes.forEach(node => node.style.display = '');
        return;
    }
    
    nodes.forEach(node => {
        const path = node.dataset.path || '';
        const text = node.textContent.toLowerCase();
        const matches = path.toLowerCase().includes(query) || text.includes(query);
        node.style.display = matches ? '' : 'none';
    });
};

window.loadFirebaseRoot = function(rootPath) {
    window.firebaseViewerPath = rootPath;
    expandedNodes.clear();
    window.refreshFirebaseViewer();
};

function updateFirebaseBreadcrumb(path) {
    const breadcrumb = document.getElementById('firebase-breadcrumb');
    if (!breadcrumb) return;
    
    if (!path) {
        breadcrumb.innerHTML = '<span class="firebase-breadcrumb-item" onclick="loadFirebaseRoot(\'\')">الجذر /</span>';
        return;
    }
    
    const parts = path.split('/').filter(p => p);
    let html = '<span class="firebase-breadcrumb-item" onclick="loadFirebaseRoot(\'\')">الجذر</span>';
    
    parts.forEach((part, i) => {
        const partPath = parts.slice(0, i + 1).join('/');
        html += `<span class="firebase-breadcrumb-separator">/</span>`;
        html += `<span class="firebase-breadcrumb-item" onclick="loadFirebaseRoot('${partPath}')">${part}</span>`;
    });
    
    breadcrumb.innerHTML = html;
}

console.log('[Firebase Viewer] Module loaded successfully');