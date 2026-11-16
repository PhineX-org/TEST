---
id: table
kind: element
cat: tables
tag: table
title: عنصر الجدول
en: HTML table element
status: stable
display: table
void: no
support: all
summary: بيعرض بيانات في صفوف وأعمدة. بيتكوّن من tr للصفوف وth للعناوين وtd للخلايا، وبيتقسّم لـ thead وtbody وtfoot، وبيحتاج caption ووسوم إتاحة. للبيانات بس مش للتصميم.
keywords: table, جدول, صفوف, أعمدة, tr, td, th, thead, tbody, tfoot, caption, colspan, rowspan, border-collapse, بيانات, responsive
related: caption, thead, tbody, tfoot, tr, th, td, colgroup, col, dl
---

## intro

الجدول هو الطريقة الصح لعرض **بيانات ليها صفوف وأعمدة**: جدول مواعيد، قايمة أسعار، نتايج مباراة، مقارنة بين منتجات. الـ `<table>` هو الحاوية الأساسية، وجواه بتبني الشكل بعناصر تانية: [[tr]] (صف)، [[th]] (خلية عنوان)، [[td]] (خلية بيانات).

الفكرة بسيطة: **كل صف `<tr>`**، وجوه كل صف **خلايا**، وكل خلية إما `<th>` (عنوان، بيتعرض غامق ومتوسّط) أو `<td>` (بيانات). المتصفح بيحسب الأعمدة تلقائياً من عدد الخلايا في الصف. وتقدر تقسّمه لـ [[thead]] (رأس الجدول) و[[tbody]] (الجسم) و[[tfoot]] (التذييل: المجاميع)، وتحط له عنوان بـ [[caption]]، وتتحكم في الأعمدة بـ [[colgroup]] و[[col]].

**تحذير تاريخي مهم:** زمان (التسعينات) الناس كانت بتستخدم الجداول لـ **تخطيط الصفحة** (Layout): عمود لليسار وعمود لليمين وهيدر فوق. ده **غلط تماماً دلوقتي**: الجدول للبيانات بس. التخطيط بيتعمل بـ CSS (Flexbox وGrid). استخدام الجدول للتخطيط بيبوّظ الإتاحة (قارئ الشاشة بيحسبه بيانات) والاستجابة للموبايل.

والجداول ليها مشكلة على الموبايل: العرض الضيق. الحلول: تلف الجدول في `<div>` بـ `overflow-x: auto` (تمرير أفقي)، أو تحوّل الصفوف لكروت بـ CSS. ومهم تحط `<caption>` و`scope` على العناوين عشان قارئ الشاشة يفهم العلاقات.

> [!analogy] الجدول زي **شيت إكسل** في صفحتك: صفوف وأعمدة وعناوين، كل خلية فيها معلومة، ومعناها بييجي من صفها وعمودها.

> [!key] `<table>` للبيانات بس. `<tr>` للصف، `<th>` للعنوان، `<td>` للخلية. حط `<caption>` و`scope`. التخطيط = CSS مش جدول.

## try

زوّد صف أو عمود جديد.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><th>الكورس</th><th>المدة</th></tr>
  <tr><td>HTML</td><td>أسبوع</td></tr>
  <tr><td>CSS</td><td>أسبوعين</td></tr>
</table>
```

## syntax

```html nolive
<table>
  <caption>عنوان الجدول</caption>
  <thead>
    <tr><th scope="col">العمود 1</th><th scope="col">العمود 2</th></tr>
  </thead>
  <tbody>
    <tr><td>بيانات</td><td>بيانات</td></tr>
  </tbody>
  <tfoot>
    <tr><td>الإجمالي</td><td>100</td></tr>
  </tfoot>
</table>
```

- `<table>` — **الحاوية**.
- `<caption>` — **عنوان الجدول** (أول ابن).
- `<thead>` `<tbody>` `<tfoot>` — **أقسام الجدول**.
- `<tr>` — **الصف**.
- `<th>` — **خلية عنوان**، و`<td>` — **خلية بيانات**.
- `</table>` — **الوسم الختامي** إجباري.

## use

- لعرض بيانات منظّمة: أسعار، جداول زمنية، نتائج.
- لمقارنة عناصر على أكتر من خاصية.
- لتقارير وإحصائيات.
- لمواصفات منتجات متعددة.

## avoid

- متستخدمهوش لتخطيط الصفحة: CSS Grid/Flexbox.
- متستخدمهوش لبيانات من عمود واحد: قايمة `<ul>` أحسن.
- متحطش جداول عريضة جداً من غير تمرير أفقي على الموبايل.
- متستخدمش خلايا فاضية لضبط المسافات: CSS.

## attributes

الجدول الحديث بيتنسّق بـ CSS. الخصائص دي **قديمة** لكنها لسه بتتشاف في أكواد قديمة.

### border {deprecated}
كانت بتحدد سُمك حدود الجدول. **قديمة**: استخدم `border` في CSS.

### cellpadding {deprecated}
كانت بتحدد الحشو جوه الخلايا. **قديمة**: استخدم `padding` على `th, td`.

### cellspacing {deprecated}
كانت بتحدد المسافة بين الخلايا. **قديمة**: استخدم `border-spacing` أو `border-collapse`.

### width {deprecated}
كانت بتحدد عرض الجدول. **قديمة**: استخدم `width` في CSS.

### align {deprecated}
كانت بتحاذي الجدول. **قديمة**: استخدم `margin: auto` أو Flexbox.

### bgcolor {deprecated}
كانت بتلوّن خلفية الجدول. **قديمة**: `background-color`.

### summary {deprecated}
كانت بتوصف الجدول لقارئ الشاشة. **قديمة**: استخدم [[caption]].

### frame {deprecated}
كانت بتحدد أي حواف تظهر. **قديمة**: CSS.

### rules {deprecated}
كانت بتحدد أي خطوط داخلية تظهر. **قديمة**: CSS.

### class
بتستخدمها لتنسيق الجدول بـ CSS.

## examples

### 1) جدول بسيط بعناوين
`th` و`td`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 8px 14px; }
  th { background: #e2e8f0; }
</style>
<table>
  <tr><th>الاسم</th><th>الدرجة</th></tr>
  <tr><td>أحمد</td><td>90</td></tr>
  <tr><td>سارة</td><td>95</td></tr>
</table>
```

- `<th>` خلايا العناوين بتبقى غامقة ومتوسّطة تلقائياً.
- `border-collapse: collapse` بيدمج حدود الخلايا في خط واحد (بدل خطين متجاورين).
- الحدود والحشو من CSS مش من خصائص قديمة.

### 2) الأقسام الثلاثة
thead وtbody وtfoot.

```html
<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: right; }
  thead { background: #0f172a; color: #fff; }
  tfoot { background: #f1f5f9; font-weight: bold; }
</style>
<table>
  <caption>مبيعات الأسبوع</caption>
  <thead><tr><th>المنتج</th><th>الكمية</th><th>السعر</th></tr></thead>
  <tbody>
    <tr><td>قلم</td><td>10</td><td>50</td></tr>
    <tr><td>كراسة</td><td>5</td><td>75</td></tr>
  </tbody>
  <tfoot><tr><td colspan="2">الإجمالي</td><td>125</td></tr></tfoot>
</table>
```

- `<thead>` للعناوين، `<tbody>` للبيانات، `<tfoot>` للمجاميع.
- التقسيم بيسهّل التنسيق، وبيخلّي المتصفح يكرر الرأس في الطباعة، وقارئ الشاشة يفهم البنية.
- `<caption>` بيدّي الجدول اسم.
- `colspan="2"` دمج خليتين (نشرحه في `td`).

### 3) دمج الخلايا
`colspan` و`rowspan`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 8px 12px; text-align: center; }
</style>
<table>
  <tr><th rowspan="2">اليوم</th><th colspan="2">المحاضرات</th></tr>
  <tr><th>الصبح</th><th>المساء</th></tr>
  <tr><td>السبت</td><td>HTML</td><td>CSS</td></tr>
  <tr><td>الأحد</td><td>JS</td><td>—</td></tr>
</table>
```

- `rowspan="2"` الخلية بتمتد على صفين.
- `colspan="2"` الخلية بتمتد على عمودين.
- لازم تحسب عدد الخلايا في كل صف صح عشان الجدول ما يبوظش.
- لاحظ إن الصف التاني فيه خليتين بس لأن الأولى محجوزة بالـ `rowspan`.

### 4) تنسيق مخطط (Zebra)
صفوف متبادلة.

```html
<style>
  table { border-collapse: collapse; width: 100%; font-family: sans-serif; }
  th, td { padding: 8px 12px; text-align: right; }
  thead th { background: #6366f1; color: #fff; }
  tbody tr:nth-child(even) { background: #eef2ff; }
  tbody tr:hover { background: #c7d2fe; }
</style>
<table>
  <thead><tr><th>#</th><th>الاسم</th><th>المدينة</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>أحمد</td><td>القاهرة</td></tr>
    <tr><td>2</td><td>سارة</td><td>الإسكندرية</td></tr>
    <tr><td>3</td><td>محمد</td><td>أسوان</td></tr>
    <tr><td>4</td><td>منى</td><td>طنطا</td></tr>
  </tbody>
</table>
```

- `:nth-child(even)` بيلوّن الصفوف الزوجية.
- `:hover` بيبرز الصف تحت الماوس.
- الاستهداف بـ `tbody tr` بيخلّي الرأس بعيد عن التلوين.

### 5) جدول متجاوب
تمرير أفقي.

```html
<style>
  .wrap { overflow-x: auto; border: 1px solid #cbd5e1; border-radius: 8px; max-width: 100%; }
  table { border-collapse: collapse; min-width: 520px; width: 100%; }
  th, td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; white-space: nowrap; text-align: right; }
</style>
<div class="wrap">
  <table>
    <tr><th>الاسم</th><th>البريد</th><th>الهاتف</th><th>المدينة</th><th>الدور</th></tr>
    <tr><td>أحمد</td><td>ahmed@example.com</td><td>0100000000</td><td>القاهرة</td><td>مطوّر</td></tr>
  </table>
</div>
```

- الجدول عريض (`min-width`) فبيتمرّر أفقياً جوه الحاوية على الشاشات الضيقة.
- `overflow-x: auto` على الـ `<div>` مش على الجدول.
- `white-space: nowrap` بيمنع النص ينزل لسطر جديد.
- ده أبسط حل لجداول الموبايل.

### 6) جدول متاح بـ scope وcaption
إتاحة.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 12px; text-align: center; }
  caption { font-weight: bold; margin-bottom: 6px; }
</style>
<table>
  <caption>درجات الطلاب</caption>
  <thead><tr><th scope="col">الطالب</th><th scope="col">رياضيات</th><th scope="col">علوم</th></tr></thead>
  <tbody>
    <tr><th scope="row">أحمد</th><td>90</td><td>85</td></tr>
    <tr><th scope="row">سارة</th><td>95</td><td>92</td></tr>
  </tbody>
</table>
```

- `scope="col"` بيقول إن الخلية عنوان لعمود، و`scope="row"` عنوان لصف.
- قارئ الشاشة لما يوصل لـ «90» بيقول «أحمد، رياضيات، 90».
- `<caption>` بيدّي الجدول اسم يتعلن قبل ما يدخل.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: [[caption]] (اختياري، أول ابن)، [[colgroup]]، [[thead]]، [[tbody]] (أو `tr`)، [[tfoot]].
- closing: الوسم الختامي `</table>` إجباري.
- role: `table`.
- dom: `HTMLTableElement`.
- layout: `display: table`.

## mistakes

### جدول للتخطيط
```html bad
<table><tr><td>القايمة</td><td>المحتوى</td></tr></table>
```
```html good
<div style="display:flex"><nav>القايمة</nav><main>المحتوى</main></div>
```
ليه؟ الجدول للبيانات. التخطيط بـ Flexbox أو Grid، وقارئ الشاشة بيحسب الجدول بيانات.

### td بدل th للعناوين
```html bad
<tr><td>الاسم</td><td>الدرجة</td></tr>
```
```html good
<tr><th scope="col">الاسم</th><th scope="col">الدرجة</th></tr>
```
ليه؟ `<th>` بيعرّف العناوين دلالياً. من غيره قارئ الشاشة مش هيربط البيانات بعناوينها.

### td مباشرة في table
```html bad
<table><td>خلية</td></table>
```
```html good
<table><tr><td>خلية</td></tr></table>
```
ليه؟ الخلايا لازم تكون جوه `<tr>`. المتصفح بيضيف `<tbody>` و`<tr>` تلقائياً أحياناً لكن ما تعتمدش عليه.

### عدد خلايا مختلف
```html bad
<tr><td>1</td><td>2</td></tr>
<tr><td>1</td></tr>
```
```html good
<tr><td>1</td><td>2</td></tr>
<tr><td>1</td><td></td></tr>
```
ليه؟ الصفوف غير المتساوية بتبوّظ شكل الجدول. اترك خلية فاضية بدل ما تحذفها.

## a11y

- حط **`<caption>`** لكل جدول ليه معنى: بيتعلن قبل الدخول فيه.
- استخدم **`<th scope="col">`** و**`<th scope="row">`** لربط الخلايا بعناوينها.
- للجداول المعقدة (رؤوس متعددة المستويات) استخدم `headers` و`id`.
- متدمجش خلايا من غير داعي: بيصعّب التنقل.
- لو الجدول للتخطيط (غلط) على الأقل `role="presentation"`.

## tips

- `border-collapse: collapse` أول CSS لأي جدول.
- لف الجدول في حاوية `overflow-x: auto` للموبايل.
- استخدم `text-align: right` للنص العربي ولليسار للأرقام الإنجليزية لو لازم.
- محاذاة الأرقام لليمين (أو لليسار في LTR) بتسهّل المقارنة، واستخدم `font-variant-numeric: tabular-nums`.
- لجداول كبيرة، `<thead>` مع `position: sticky; top: 0`.

## quiz

### أنهي عنصر بيمثّل **الصف**؟
- [ ] `<td>`
- [x] `<tr>`
- [ ] `<th>`
- [ ] `<row>`
`<tr>` = Table Row.

### إيه الغلط في استخدام الجدول لتخطيط الصفحة؟
- [ ] بطيء جداً
- [x] بيبوّظ الإتاحة والاستجابة، والتخطيط شغل CSS
- [ ] مش بيظهر
- [ ] مفيش غلط
الجدول للبيانات.

### ليه نستخدم `scope` على `<th>`؟
- [ ] للتلوين
- [x] عشان قارئ الشاشة يربط الخلية بعنوان عمودها أو صفها
- [ ] للدمج
- [ ] للحدود
بيوضّح اتجاه العنوان.

### إزاي تخلّي جدول عريض يشتغل على الموبايل؟
- [ ] تحذف أعمدة
- [x] تلفّه في حاوية `overflow-x: auto`
- [ ] تصغّر الخط جداً
- [ ] مفيش حل
التمرير الأفقي هو الأسهل.

## refs

- [MDN: table](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)
- [WHATWG: The table element](https://html.spec.whatwg.org/multipage/tables.html#the-table-element)
- [W3C WAI: Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)
