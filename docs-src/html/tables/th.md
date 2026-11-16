---
id: th
kind: element
cat: tables
tag: th
title: خلية العنوان (th)
en: HTML table header cell element
status: stable
display: table-cell
void: no
support: all
summary: خلية عنوان في الجدول لعمود أو صف أو مجموعة. بتتعرض غامقة ومتوسّطة، وبتحدد اتجاهها بـ scope، وبتدمج بـ colspan وrowspan، وبتخلّي قارئ الشاشة يربط البيانات بعناوينها.
keywords: th, خلية عنوان, header cell, scope, col, row, colgroup, rowgroup, headers, abbr, colspan, rowspan, جدول, عنوان عمود
related: td, tr, table, thead, caption
---

## intro

الـ `<th>` (**Table Header**: عنوان في الجدول) هو الخلية اللي بتقول **«الخلايا دي معناها إيه»**. العمود اللي فيه «الاسم» و«السن» و«المدينة»: كل ده `<th>`. وكمان اسم الصف («أحمد») لو الصف بيمثّله ممكن يبقى `<th>`. من غيره الجدول مجرد أرقام، ومعاه الجدول **بيحكي قصة**.

الفرق بينه وبين `<td>`: شكلياً `<th>` **غامق ومتوسّط** افتراضياً، لكن الأهم **دلالياً**: هو بيعرّف المتصفح وقارئ الشاشة والبحث إن ده **عنوان**. فلما قارئ الشاشة يوصل لخلية «90» بيقول «أحمد، رياضيات، 90» لأنه عارف العناوين من الـ `<th>`. ده الفرق بين جدول متاح وجدول مش متاح.

وأهم خاصية: **`scope`** بتحدد العنوان ده خاص بإيه: `col` (عمود)، `row` (صف)، `colgroup` (مجموعة أعمدة)، `rowgroup` (مجموعة صفوف). وفيه كمان `colspan` و`rowspan` للدمج (زي `<td>`)، و`headers` و`abbr` للجداول المعقدة.

> [!analogy] `<th>` زي **اللافتة فوق العمود** في كشف الدرجات: «الاسم | الرياضيات | العلوم». والخلايا تحتها بتتفهم من اللافتة.

> [!key] `<th scope="col">` لعناوين الأعمدة، `<th scope="row">` لعناوين الصفوف. بيخلّي الجدول متاح.

## try

غيّر `scope` وجرّب تحط عنوان صف.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><th scope="col">المنتج</th><th scope="col">السعر</th></tr>
  <tr><th scope="row">قلم</th><td>5</td></tr>
  <tr><th scope="row">كراسة</th><td>12</td></tr>
</table>
```

## syntax

```html nolive
<tr>
  <th scope="col">العمود</th>
  <th scope="row" colspan="2">صف</th>
</tr>
```

- `<th ...>` — **الوسم الافتتاحي**.
- `scope` — **اتجاه العنوان** (`col` أو `row`...).
- `colspan` و`rowspan` — **دمج** خلايا.
- المحتوى — **نص العنوان**.
- `</th>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لعناوين أعمدة الجدول (في `<thead>`).
- لعناوين الصفوف (أول خلية في الصف).
- لعناوين مجموعات (دمج بـ `colspan`).

## avoid

- متستخدمهوش لتكبير الخط بس: `<td>` مع CSS لو مش عنوان.
- متنساش `scope` في الجداول.
- متحطش `<th>` لبيانات عادية.

## attributes

### scope
**اتجاه العنوان**: `col` (لعمود)، `row` (لصف)، `colgroup` (لمجموعة أعمدة)، `rowgroup` (لمجموعة صفوف)، أو `auto`. أهم خاصية للإتاحة.

```html nolive
<th scope="col">الاسم</th>
<th scope="row">أحمد</th>
```

### colspan
**عدد الأعمدة** اللي الخلية بتمتد عليها (الافتراضي 1).

### rowspan
**عدد الصفوف** اللي الخلية بتمتد عليها.

### headers
**قايمة `id` لخلايا عناوين** بتحدد عناوين الخلية في الجداول المعقدة (متعددة المستويات).

### abbr
**نسخة مختصرة من العنوان** يقراها قارئ الشاشة بدل العنوان الطويل.

```html nolive
<th scope="col" abbr="درجة">الدرجة النهائية للمادة</th>
```

### align {deprecated}
كانت بتحاذي النص. **قديمة**: `text-align`.

### valign {deprecated}
كانت بتحدد المحاذاة الرأسية. **قديمة**: `vertical-align`.

### bgcolor {deprecated}
كانت بتحدد لون الخلفية. **قديمة**: `background-color`.

### width {deprecated}
كانت بتحدد العرض. **قديمة**: CSS.

## examples

### 1) عناوين أعمدة
الأشهر.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 14px; }
  th { background: #e2e8f0; }
</style>
<table>
  <thead>
    <tr><th scope="col">الاسم</th><th scope="col">السن</th><th scope="col">المدينة</th></tr>
  </thead>
  <tbody>
    <tr><td>أحمد</td><td>25</td><td>القاهرة</td></tr>
  </tbody>
</table>
```

- كل `<th scope="col">` عنوان للعمود تحته.
- المتصفح بيعرضها غامقة ومتوسطة لوحده.
- بنلوّنها بـ CSS عشان تبان أكتر.

### 2) عناوين صفوف
`scope="row"`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 14px; text-align: center; }
  tbody th { background: #fef9c3; text-align: right; }
</style>
<table>
  <thead><tr><td></td><th scope="col">رياضيات</th><th scope="col">علوم</th></tr></thead>
  <tbody>
    <tr><th scope="row">أحمد</th><td>90</td><td>85</td></tr>
    <tr><th scope="row">سارة</th><td>95</td><td>92</td></tr>
  </tbody>
</table>
```

- أول خلية في كل صف `<th scope="row">` لأنها بتمثّل الصف كله.
- الخلية الفاضية في الزاوية مسموح تكون `<td>` فاضية.
- قارئ الشاشة بيربط «90» بـ «أحمد» و«رياضيات».

### 3) عنوان بيمتد
`colspan`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 14px; text-align: center; }
</style>
<table>
  <thead>
    <tr><th rowspan="2" scope="col">الاسم</th><th colspan="2" scope="colgroup">الدرجات</th></tr>
    <tr><th scope="col">نظري</th><th scope="col">عملي</th></tr>
  </thead>
  <tbody>
    <tr><td>أحمد</td><td>45</td><td>48</td></tr>
  </tbody>
</table>
```

- «الدرجات» عنوان بيغطّي عمودين بـ `colspan="2"` و`scope="colgroup"`.
- «الاسم» بيمتد على صفين بـ `rowspan="2"`.
- ده الجدول ذو العناوين المتعددة المستويات.

### 4) عنوان مختصر للقارئ
`abbr`.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr>
    <th scope="col" abbr="الاسم">الاسم الكامل للمشترك في الدورة</th>
    <th scope="col" abbr="الدرجة">الدرجة النهائية في الاختبار</th>
  </tr>
  <tr><td>أحمد</td><td>90</td></tr>
</table>
```

- `abbr` بيعطي نسخة قصيرة يقراها قارئ الشاشة مع كل خلية بدل العنوان الطويل.
- ده بيوفّر وقت على المستخدم لما العناوين طويلة.
- النص المرئي بيفضل كامل.

### 5) جدول معقد بـ headers
ربط الخلايا بعناوينها.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr>
    <td></td>
    <th id="ar" scope="col">عربي</th>
    <th id="en" scope="col">إنجليزي</th>
  </tr>
  <tr>
    <th id="a1" scope="row">أحمد</th>
    <td headers="a1 ar">90</td>
    <td headers="a1 en">85</td>
  </tr>
</table>
```

- كل `<th>` له `id`.
- كل `<td>` فيه `headers` بقايمة `id` للعناوين الخاصة بيه.
- ده مهم للجداول اللي `scope` مش كفاية فيها (دمج معقد).
- للجداول البسيطة `scope` كفاية.

## rules

- parents: [[tr]].
- children: **Flow content** (من غير `<header>` و`<footer>` وعناوين وأقسام وجداول متداخلة غالباً).
- closing: الوسم الختامي `</th>` (يفضّل تكتبه).
- role: `columnheader` أو `rowheader` أو `cell` (حسب السياق والـ `scope`).
- dom: `HTMLTableCellElement`.
- layout: `display: table-cell`، بخط غامق ومتوسّط.

## mistakes

### th برّه tr
```html bad
<table><th>عنوان</th></table>
```
```html good
<table><tr><th>عنوان</th></tr></table>
```
ليه؟ الخلايا لازم جوه `<tr>`.

### نسيان scope
```html bad
<tr><th>الاسم</th><th>السن</th></tr>
```
```html good
<tr><th scope="col">الاسم</th><th scope="col">السن</th></tr>
```
ليه؟ من غير `scope` بعض قارئات الشاشة بتتلخبط في الاتجاه، خاصة لو فيه عناوين صفوف وأعمدة.

### استخدام th للتنسيق
```html bad
<th>نص مهم</th>
```
```html good
<td><strong>نص مهم</strong></td>
```
ليه؟ `<th>` للعناوين الحقيقية فقط. للتنسيق استخدم `<strong>` أو CSS.

## a11y

- **`scope`** على كل `<th>`: ده أهم إجراء إتاحة للجداول.
- لجداول معقدة استخدم `headers` + `id`.
- لعناوين طويلة استخدم `abbr`.
- خلّي العناوين وصفية، مش «العمود 1».

## tips

- `th` بياخد `text-align: center` افتراضياً؛ غيّره حسب اللغة والاتجاه.
- لتثبيت الرأس عند التمرير: `thead th { position: sticky; top: 0; }`.
- العناوين ممكن تحتوي نص وأيقونات لفرز الأعمدة (بأزرار حقيقية جوه `<th>`).

## quiz

### إيه الخاصية اللي بتحدد إن `<th>` عنوان عمود أو صف؟
- [ ] `type`
- [x] `scope`
- [ ] `role`
- [ ] `for`
القيم: `col` و`row`.

### إيه الفرق بين `<th>` و`<td>`؟
- [ ] اللون بس
- [x] `<th>` عنوان دلالياً (غامق ومتوسّط) و`<td>` بيانات
- [ ] السرعة
- [ ] مفيش فرق
الدلالة أهم من الشكل.

### إمتى نستخدم `headers`؟
- [x] في الجداول المعقدة اللي `scope` مش كفاية فيها
- [ ] لكل جدول
- [ ] للألوان
- [ ] للدمج
بتربط الخلية بـ `id` عناوينها.

## refs

- [MDN: th](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th)
- [WHATWG: The th element](https://html.spec.whatwg.org/multipage/tables.html#the-th-element)
- [W3C WAI: Table headers](https://www.w3.org/WAI/tutorials/tables/)
