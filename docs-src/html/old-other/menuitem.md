---
id: menuitem
kind: element
cat: old-other
tag: menuitem
title: عنصر قائمة السياق (menuitem)
en: HTML menuitem element (obsolete)
status: obsolete
display: block
void: yes
support: none
size: compact
summary: عنصر menuitem كان بيضيف بنود لقائمة الضغط اليمين (context menu) في فايرفوكس فقط. اتشال من المواصفات، والبديل قائمة مخصّصة بـ contextmenu وجافاسكربت.
keywords: menuitem, context menu, قائمة, كليك يمين, menu, contextmenu, قديم, obsolete, فايرفوكس
related: menu, button, li, dialog
---

## intro

كان فيه مقترح في HTML5 لـ **قوائم الضغط اليمين**: `<menu type="context">` وجواه `<menuitem label="نسخ">`. فايرفوكس هو المتصفح الوحيد اللي دعمها فعلاً، وبعد سنين اتشالت من المعيار ومن فايرفوكس (الإصدار 85).

دلوقتي لو عايز قائمة كليك يمين مخصّصة: بتسمع لحدث **`contextmenu`** بجافاسكربت، وبتعمل `event.preventDefault()` وتعرض قائمة من عندك (بـ [[menu]] و[[button]] أو `role="menu"`). وبكده بتتحكم في الشكل والموقع، وبتقدر تدعم الكيبورد.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<menuitem>` اتشال. اعمل القائمة بنفسك بـ `contextmenu` وجافاسكربت.

## instead

اسمع حدث `contextmenu` وامنع القائمة الافتراضية، وبعدين اعرض [[menu]] فيها [[button]] لكل بند، وأغلقها عند الضغط في أي مكان.

```html
<div id="box" style="padding:22px; border:1px dashed #94a3b8">اضغط كليك يمين هنا</div>
<menu id="cm" hidden style="position:fixed; margin:0; padding:6px; list-style:none; background:#fff; border:1px solid #cbd5e1; border-radius:6px">
  <li><button type="button">نسخ</button></li>
  <li><button type="button">لصق</button></li>
</menu>
<script>
  const box = document.getElementById('box'), cm = document.getElementById('cm');
  box.oncontextmenu = e => { e.preventDefault(); cm.hidden = false; cm.style.left = e.clientX + 'px'; cm.style.top = e.clientY + 'px'; };
  document.addEventListener('click', () => cm.hidden = true);
</script>
```

## examples

### 1) الكود القديم (فايرفوكس سابقاً)
menu context.

```html nolive
<div contextmenu="m">كليك يمين</div>
<menu type="context" id="m">
  <menuitem label="نسخ" onclick="copy()"></menuitem>
  <menuitem label="لصق" onclick="paste()"></menuitem>
</menu>
```

- `contextmenu="m"` كان بيربط العنصر بالقائمة.
- اتشال من الدعم في فايرفوكس 85.
- مفيش متصفح دلوقتي بيفهمه.

### 2) قائمة مخصصة
contextmenu.

```html
<div id="b" style="padding:24px;background:#f1f5f9;border-radius:8px">كليك يمين</div>
<p id="o">اختيارك: -</p>
<menu id="m" hidden style="position:fixed;margin:0;padding:4px;list-style:none;background:#fff;border:1px solid #cbd5e1;border-radius:6px">
  <li><button type="button" data-v="تعديل">تعديل</button></li>
  <li><button type="button" data-v="حذف">حذف</button></li>
</menu>
<script>
  const b = document.getElementById('b'), m = document.getElementById('m'), o = document.getElementById('o');
  b.oncontextmenu = e => { e.preventDefault(); m.hidden = false; m.style.left = e.clientX + 'px'; m.style.top = e.clientY + 'px'; };
  m.onclick = e => { if (e.target.dataset.v) o.textContent = 'اختيارك: ' + e.target.dataset.v; m.hidden = true; };
  document.addEventListener('click', e => { if (!m.contains(e.target)) m.hidden = true; });
</script>
```

- `preventDefault()` بيمنع قائمة المتصفح.
- مكان القائمة من `clientX` و`clientY`.
- القائمة بتقفل لما تضغط برّاها.

## refs

- [MDN: menuitem](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menuitem)
