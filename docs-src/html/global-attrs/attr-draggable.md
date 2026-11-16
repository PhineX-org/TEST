---
id: attr-draggable
kind: attribute
cat: global-attrs
chip: draggable
title: خاصية السحب
en: HTML draggable global attribute
status: stable
support: all
mdn: Global_attributes/draggable
summary: خاصية draggable بتخلّي العنصر قابل للسحب بالماوس ضمن واجهة السحب والإفلات (Drag and Drop). بتتكتب true أو false، وبتتطلب أحداث جافاسكربت للاستفادة منها.
keywords: draggable, سحب, إفلات, drag and drop, dragstart, dragover, drop, dataTransfer, true, false
related: attr-hidden, div, img, a, attr-class
---

## intro

الـ `draggable` بتحدد هل العنصر **ينفع يتسحب** بالماوس (أو باللمس في بعض الأجهزة) كجزء من واجهة **Drag and Drop** في المتصفح. القيمة `true` (قابل للسحب) أو `false` (ممنوع). **الصور والروابط قابلة للسحب افتراضياً**، وغيرهم محتاج `draggable="true"`.

لكن الخاصية لوحدها بتخلّي العنصر «يتشدّ» بس، مبتعملش حاجة مفيدة. السحر الحقيقي في **الأحداث**: على العنصر المسحوب **`dragstart`** (بتحدد إيه اللي بيتنقل في `event.dataTransfer`)، وعلى المكان اللي هتسيبه فيه **`dragover`** (لازم تعمل `event.preventDefault()` عشان تسمح بالإفلات) و**`drop`** (بتاخد البيانات وتنفّذ). ومن الأمثلة: ترتيب قوائم، لوحات كانبان، رفع ملفات بالسحب.

## try

اسحب العنصر الأصفر للمنطقة المنقّطة.

```html
<style>
  #drag { display:inline-block; padding:10px 18px; background:#fde68a; border-radius:8px; cursor:grab }
  #zone { margin-top:10px; padding:20px; border:2px dashed #94a3b8; border-radius:10px; min-height:40px; text-align:center }
  #zone.over { background:#dcfce7; border-color:#22c55e }
</style>
<div id="drag" draggable="true">اسحبني ✋</div>
<div id="zone">سيبني هنا</div>
<script>
  const d = document.getElementById('drag'), z = document.getElementById('zone');
  d.ondragstart = e => e.dataTransfer.setData('text/plain', 'drag');
  z.ondragover = e => { e.preventDefault(); z.classList.add('over'); };
  z.ondragleave = () => z.classList.remove('over');
  z.ondrop = e => { e.preventDefault(); z.classList.remove('over'); z.appendChild(d); z.firstChild.textContent = ''; };
</script>
```

## syntax

```html nolive
<element draggable="true">...</element>
<script>
  el.ondragstart = e => e.dataTransfer.setData('text/plain', id);
  zone.ondragover = e => e.preventDefault();
  zone.ondrop = e => { /* خد البيانات */ };
</script>
```

- `draggable="true"` — **يسمح** بالسحب.
- `dragstart` — **يبدأ** السحب ويحدد البيانات.
- `dragover` + `preventDefault()` — **يسمح** بالإفلات فوق المنطقة.
- `drop` — **ينفّذ** عند الإفلات.

## use

- ترتيب عناصر قائمة بالسحب.
- لوحات كانبان (Trello-style).
- رفع ملفات بالسحب على منطقة.
- سحب عناصر لسلة أو مجلد.

## avoid

- متعتمدش على السحب وحده: وفّر بديل بالكيبورد.
- متنساش `preventDefault()` في `dragover` وإلا الإفلات مش هيشتغل.

## section: القيم

- `true`: العنصر قابل للسحب.
- `false`: ممنوع السحب (مفيد لمنع سحب صورة).
- من غير قيمة: السلوك الافتراضي (الصور والروابط قابلة، الباقي لأ).

## examples

### 1) منع سحب صورة
مثال على draggable=false.

```html
<img draggable="false" alt="مربع" width="80" height="50"
 src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='50'><rect width='80' height='50' fill='%230ea5e9'/></svg>">
```

- الصور قابلة للسحب افتراضياً.
- `draggable="false"` بيمنع ده.
- مفيد في الصور اللي جزء من تصميم.

### 2) ترتيب قايمة بالسحب
إعادة ترتيب بسيطة.

```html
<style> li { padding:8px; margin:4px; background:#e0f2fe; border-radius:6px; cursor:grab; list-style:none } li.dragging { opacity:.4 } </style>
<ul id="l"><li draggable="true">HTML</li><li draggable="true">CSS</li><li draggable="true">JS</li></ul>
<script>
  const l = document.getElementById('l'); let cur;
  l.ondragstart = e => { cur = e.target; cur.classList.add('dragging'); };
  l.ondragend = () => cur.classList.remove('dragging');
  l.ondragover = e => { e.preventDefault(); const t = e.target.closest('li'); if (t && t !== cur) l.insertBefore(cur, e.offsetY > t.offsetHeight / 2 ? t.nextSibling : t); };
</script>
```

- بنحتفظ بالعنصر المسحوب في متغيّر `cur`.
- أثناء `dragover` بنحرّكه قبل أو بعد العنصر الجاري فوقه.
- ده الأساس لقوائم Reorderable.

### 3) نقل نص بالسحب
مثال على dataTransfer.

```html
<span draggable="true" id="w" style="background:#fef3c7; padding:4px 10px; border-radius:6px; cursor:grab">كلمة</span>
<div id="box" style="margin-top:8px; padding:14px; border:2px dashed #94a3b8">سيب هنا</div>
<script>
  document.getElementById('w').ondragstart = e => e.dataTransfer.setData('text', 'مرحبا من السحب');
  const b = document.getElementById('box');
  b.ondragover = e => e.preventDefault();
  b.ondrop = e => { e.preventDefault(); b.textContent = e.dataTransfer.getData('text'); };
</script>
```

- `setData` بيخزّن بيانات في عملية السحب.
- `getData` عند الإفلات بيقراها.
- نفس الفكرة تنقل id أو JSON.

### 4) تأثير بصري أثناء السحب
مثال على dragenter/dragleave.

```html
<style> .z { padding:20px; border:2px dashed #94a3b8; text-align:center } .z.hot { background:#fef9c3; border-color:#eab308 } </style>
<div draggable="true" style="display:inline-block; padding:8px; background:#bae6fd; cursor:grab">اسحب</div>
<div class="z" id="z">المنطقة</div>
<script>
  const z = document.getElementById('z');
  z.ondragenter = () => z.classList.add('hot');
  z.ondragleave = () => z.classList.remove('hot');
  z.ondragover = e => e.preventDefault();
  z.ondrop = () => { z.classList.remove('hot'); z.textContent = 'اتسلّم!'; };
</script>
```

- `dragenter` و`dragleave` بيلمّعوا المنطقة المستهدفة.
- ده بيدّي المستخدم إشارة إن الإفلات هنا مسموح.
- بنشيل التلميع عند `drop` كمان.

## mistakes

### نسيان preventDefault في dragover
```html bad
zone.ondrop = e => { /* مش هتشتغل */ };
```
```html good
zone.ondragover = e => e.preventDefault();
zone.ondrop = e => { e.preventDefault(); /* تمام */ };
```
ليه؟ من غير `preventDefault()` في `dragover` المتصفح بيرفض الإفلات.

### draggable بدون أحداث
```html bad
<div draggable="true">اسحبني</div>
```
```html good
<div draggable="true" ondragstart="event.dataTransfer.setData('text','x')">اسحبني</div>
```
ليه؟ من غير `dragstart` وبيانات، السحب مبيعملش حاجة مفيدة (وفايرفوكس ممكن يمنعه).

## a11y

- السحب لوحده مش متاح لمستخدمي الكيبورد وقارئ الشاشة: وفّر بدائل (أزرار «انقل لـ…»).
- ضيف `aria-grabbed`/إعلانات (`aria-live`) أو أزرار تحريك أعلى/أسفل.
- مش بتشتغل بسهولة على اللمس: جرّب على الموبايل.

## quiz

### إيه اللي لازم تعمله في `dragover` عشان الإفلات يشتغل؟
- [x] `event.preventDefault()`
- [ ] `event.stop()`
- [ ] مفيش
- [ ] `return false` بس
يسمح بالإفلات.

### أنهي عناصر قابلة للسحب افتراضياً؟
- [x] الصور والروابط
- [ ] الـ div
- [ ] الفقرات
- [ ] كل العناصر
الباقي محتاج draggable.

### قيمة منع السحب؟
- [x] `draggable="false"`
- [ ] `draggable="no"`
- [ ] `nodrag`
- [ ] `drag=0`
true أو false.

## refs

- [MDN: draggable](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/draggable)
- [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
