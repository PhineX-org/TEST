---
id: attr-popover
kind: attribute
cat: global-attrs
chip: popover
title: خاصية النافذة المنبثقة
en: HTML popover global attribute
status: stable
support: all
mdn: Global_attributes/popover
summary: خاصية popover بتحوّل أي عنصر لنافذة منبثقة بتظهر فوق الصفحة في الـ top layer، وبتتفتح بزرار popovertarget من غير جافاسكربت، وبتتقفل بالضغط بره أو Esc.
keywords: popover, منبثق, popovertarget, showPopover, top layer, tooltip, قائمة, menu, auto, manual, hint, :popover-open
related: dialog, button, attr-hidden, attr-inert, details
---

## intro

زمان لو عايز **قايمة منبثقة** أو tooltip أو نافذة صغيرة فوق المحتوى، كنت بتكتب جافاسكربت: تحسب المكان، وتحط `z-index`، وتقفلها لما المستخدم يضغط برّه أو يدوس Esc. دلوقتي كل ده بـ **خاصية واحدة**: `popover`.

حط `popover` على أي عنصر، وهو **بيتخفي افتراضياً**. وبعدين زرار بـ `popovertarget="id"` بيفتحه ويقفله **من غير سطر جافاسكربت**. والعنصر بيظهر في **الطبقة العليا (Top Layer)** فوق كل حاجة (من غير مشاكل `z-index` و`overflow`). و`popover="auto"` (الافتراضي) فيه **إغلاق بالضغط برّه أو Esc** (Light Dismiss)، بينما **`manual`** إنت اللي بتتحكم في الإغلاق. وتقدر تتحكم برمجياً بـ `showPopover()` و`hidePopover()` و`togglePopover()`، وتنسّق الحالة المفتوحة بـ `:popover-open`.

> [!analogy] الـ popover زي **قايمة الـ Context Menu**: بتفتح فوق الصفحة وتتقفل لما تضغط في مكان تاني، من غير ما تبوّظ تخطيط الصفحة.

## try

```html h=140
<button popovertarget="p1">افتح</button>
<div id="p1" popover style="padding:14px; border-radius:10px; border:2px solid #0ea5e9">
  أنا نافذة منبثقة! اضغط برّه أو Esc عشان تتقفل.
</div>
```

## syntax

```html nolive
<button popovertarget="id" popovertargetaction="toggle|show|hide">زرار</button>
<div id="id" popover="auto|manual|hint">محتوى</div>
```

- `popover` — **يحوّل** العنصر لنافذة منبثقة مخفية.
- `popovertarget="id"` — **زرار** بيتحكم بـ id النافذة.
- `popovertargetaction` — **toggle** (افتراضي) أو **show** أو **hide**.
- `auto` — **إغلاق** بالضغط برّه وEsc، `manual` — **إنت** بتتحكم.

## use

- قوايم منسدلة وقوايم سياق.
- تلميحات (tooltips) وبطاقات معلومات.
- إشعارات وتنبيهات صغيرة (toasts).
- نوافذ غير مودال (مش بتقفل باقي الصفحة).

## avoid

- للنوافذ المودال (اللي بتقفل الصفحة) استخدم `<dialog>` مع `showModal()`.
- متحطّش محتوى أساسي مخفي جوه popover فقط.

## section: القيم

- `auto` (أو `""`): إغلاق بالضغط برّه وEsc، وبيقفل الـ auto التاني.
- `manual`: بيفضل مفتوح لحد ما إنت تقفله.
- `hint`: لتلميحات خفيفة (حديث ودعمه أقل).

## examples

### 1) قايمة منسدلة
popover كقايمة.

```html h=160
<button popovertarget="m">القائمة ▾</button>
<menu id="m" popover style="margin:0; padding:6px; list-style:none; border:1px solid #cbd5e1; border-radius:8px">
  <li><a href="#">الملف الشخصي</a></li>
  <li><a href="#">الإعدادات</a></li>
  <li><a href="#">خروج</a></li>
</menu>
```

- العنصر `<menu>` بيتحوّل لقايمة منبثقة.
- لا جافاسكربت ولا `z-index`.
- الضغط برّه أو Esc بيقفلها.

### 2) popover يدوي
مثال على manual.

```html h=150
<button popovertarget="n" popovertargetaction="show">أظهر الإشعار</button>
<div id="n" popover="manual" style="padding:12px; border-radius:8px; background:#dcfce7; border:2px solid #22c55e">
  تم الحفظ ✅ <button popovertarget="n" popovertargetaction="hide">إغلاق</button>
</div>
```

- `manual` مش بيقفل لوحده: لازم زرار إغلاق.
- `popovertargetaction` بيحدد show/hide بدل toggle.
- مناسب للإشعارات اللي المستخدم يختار يقفلها.

### 3) تحكم برمجي
showPopover و hidePopover.

```html h=140
<div id="p" popover style="padding:12px; border:2px solid #7c3aed; border-radius:8px">برمجياً!</div>
<button onclick="document.getElementById('p').showPopover()">أظهر</button>
<button onclick="document.getElementById('p').hidePopover()">أخفي</button>
```

- `showPopover()` و`hidePopover()` بدل الزرار الجاهز.
- مفيدة لما الفتح بيحصل لسبب غير ضغطة زرار.
- `togglePopover()` بتبدّل.

### 4) تنسيق الحالة المفتوحة
مثال على :popover-open.

```html h=150
<style>
  #q { padding:14px; border:0; border-radius:12px; background:#0f172a; color:#fff; transition: opacity .2s; }
  #q:popover-open { box-shadow: 0 10px 30px #0006; }
  #q::backdrop { background: #0003; }
</style>
<button popovertarget="q">فتح بتنسيق</button>
<div id="q" popover>نافذة بتنسيق ومظلّة خلفية</div>
```

- `:popover-open` بيستهدف الحالة المفتوحة.
- `::backdrop` بيرسم الخلفية خلف النافذة.
- النافذة بتظهر في الـ top layer فمفيش `z-index`.

### 5) الاستماع لحدث toggle
معرفة الحالة.

```html h=170
<button popovertarget="t">اختبر</button>
<div id="t" popover style="padding:10px; border:1px solid #94a3b8">مرحبا</div>
<p id="o">الحالة: مقفول</p>
<script>
  const t = document.getElementById('t'), o = document.getElementById('o');
  t.addEventListener('toggle', e => o.textContent = 'الحالة: ' + (e.newState === 'open' ? 'مفتوح' : 'مقفول'));
</script>
```

- حدث `toggle` بيتطلق عند الفتح والإغلاق.
- `e.newState` بيقولك `open` أو `closed`.
- مفيدة لتحديث `aria-expanded` أو الحالة.

## mistakes

### نافذة مودال بـ popover
```html bad
<div popover>نافذة تأكيد مهمة (المستخدم لازم يرد)</div>
```
```html good
<dialog id="d">نافذة تأكيد</dialog>
<button onclick="d.showModal()">افتح</button>
```
ليه؟ الـ popover مش بيمنع التفاعل مع الصفحة. المودال الحقيقي هو `<dialog>`.

### نسيان id الهدف
```html bad
<button popovertarget="x">فتح</button>
<div popover>نافذة</div>
```
```html good
<button popovertarget="x">فتح</button>
<div id="x" popover>نافذة</div>
```
ليه؟ `popovertarget` لازم يطابق `id` عنصر الـ popover.

## a11y

- الزرار بيعرّف علاقته بالنافذة تلقائياً لقارئ الشاشة، لكن ضيف `aria-label` لو شكله أيقونة.
- Esc بيقفل الـ auto popover تلقائياً: متمنعهوش.
- للتلميحات (tooltips) تأكد إنها بتظهر مع الفوكس مش بس الماوس.

## quiz

### أنهي خاصية بتفتح popover من زرار؟
- [x] `popovertarget`
- [ ] `opens`
- [ ] `data-popover`
- [ ] `target`
بتشاور على id.

### إيه الفرق بين `auto` و`manual`؟
- [x] `auto` بيقفل بالضغط برّه وEsc
- [ ] `manual` أسرع
- [ ] مفيش
- [ ] `auto` للصور
manual إنت بتقفله.

### إمتى تستخدم `<dialog>` بدل `popover`؟
- [x] لما تحتاج مودال بيقفل الصفحة
- [ ] للقوايم
- [ ] للتلميحات
- [ ] دايماً
الـ dialog مع showModal.

## refs

- [MDN: popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
- [MDN: Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
