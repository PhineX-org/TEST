---
id: tr
kind: element
cat: tables
tag: tr
title: صف الجدول (tr)
en: HTML table row element
status: stable
display: table-row
void: no
support: all
size: compact
summary: عنصر tr بيمثّل صف واحد في الجدول، وبيحتوي خلايا th أو td بس. بتتحدد منه أعمدة الجدول، وبيتنسّق بـ CSS للتلوين والتحويم والتخطيط المخطط.
keywords: tr, صف, table row, th, td, جدول, zebra, hover, تلوين صفوف, row
related: table, td, th, thead, tbody, tfoot
---

## intro

الـ `<tr>` (**Table Row**: صف الجدول) هو الحاوية اللي بتجمع الخلايا في صف أفقي واحد. جواه مسموح بس [[th]] و[[td]]: كل خلية بتبقى عمود. عدد الأعمدة في الجدول بيتحدد من أكتر صف فيه خلايا (مع حساب `colspan`)، فالأحسن كل الصفوف تبقى فيها نفس العدد من الأعمدة.

الـ `<tr>` نفسه ملوش شكل خاص، لكن هو **أنسب مكان للتنسيق على مستوى الصف**: لون خلفية لصف كامل، تأثير `:hover`، صفوف متبادلة بـ `:nth-child`. وبيتحط جوه [[thead]] أو [[tbody]] أو [[tfoot]] (أو مباشرة في `<table>` والمتصفح بيحط `<tbody>` تلقائياً).

> [!key] `<tr>` = صف، وجواه `<th>` و`<td>` بس. التنسيق على الصف بيتطبّق على كل خلاياه.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tr style="background:#fef9c3"><th>الاسم</th><th>الدرجة</th></tr>
  <tr><td>أحمد</td><td>90</td></tr>
</table>
```

## syntax

```html nolive
<tr>
  <th scope="row">أحمد</th>
  <td>90</td>
  <td>85</td>
</tr>
```

- `<tr>` — **الوسم الافتتاحي**.
- `<th>` و`<td>` — **الخلايا** (الأبناء الوحيدين المسموحين).
- `</tr>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لكل صف في الجدول.
- لتلوين صف كامل أو تمييزه.

## avoid

- متحطش جواه أي عنصر غير `<th>` و`<td>`.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحاذي محتوى الصف أفقياً. **قديمة**: `text-align`.

### valign {deprecated}
كانت بتحاذي رأسياً. **قديمة**: `vertical-align`.

### bgcolor {deprecated}
كانت بتلوّن الصف. **قديمة**: `background-color`.

### class
للتنسيق، مثلاً علامة صف مميز.

## examples

### 1) صفوف متبادلة
`nth-child`.

```html
<style>
  table { border-collapse: collapse; width: 100%; }
  td, th { padding: 8px; }
  tr:nth-child(even) { background: #f1f5f9; }
  tr:hover { background: #e0f2fe; }
</style>
<table>
  <tr><th>الاسم</th><th>المدينة</th></tr>
  <tr><td>أحمد</td><td>القاهرة</td></tr>
  <tr><td>سارة</td><td>طنطا</td></tr>
  <tr><td>محمد</td><td>أسوان</td></tr>
</table>
```

- `tr:nth-child(even)` بيلوّن الصفوف الزوجية بلون فاتح.
- `tr:hover` بيبرز الصف تحت الماوس.
- الاتنين بيتطبّقوا على الصف كله لأنه الحاوية الأب.

### 2) صف مميّز
بـ class.

```html
<style>
  table { border-collapse: collapse; }
  td, th { border: 1px solid #cbd5e1; padding: 6px 12px; }
  tr.total { background: #0f172a; color: #fff; font-weight: bold; }
</style>
<table>
  <tr><td>قلم</td><td>20</td></tr>
  <tr><td>كراسة</td><td>35</td></tr>
  <tr class="total"><td>الإجمالي</td><td>55</td></tr>
</table>
```

- الـ class على `<tr>` بيطبّق الستايل على كل خلايا الصف.
- ده مفيد لصف الإجمالي أو صف مختار.
- الخلايا بتورّث اللون والخط من الصف.

### 3) إضافة صف بالجافاسكربت
`insertRow`.

```html
<table id="t" border="1" cellpadding="6" style="border-collapse:collapse">
  <tr><th>العدد</th></tr>
</table>
<button onclick="
  const t = document.getElementById('t');
  const r = t.insertRow();
  r.insertCell().textContent = t.rows.length - 1;
">أضف صف</button>
```

- `insertRow()` بيضيف `<tr>` جديد في الجدول.
- `insertCell()` بيضيف خلية للصف ويرجّعها.
- `rows.length` بيدينا عدد الصفوف الحالية (بما فيها العنوان).

## rules

- parents: [[table]] أو [[thead]] أو [[tbody]] أو [[tfoot]].
- children: [[th]] و[[td]] (وعناصر السكريبت).
- closing: الوسم الختامي `</tr>` (يفضّل تكتبه).
- role: `row`.
- dom: `HTMLTableRowElement`.
- layout: `display: table-row`.

## mistakes

### محتوى مباشرة في tr
```html bad
<tr>نص مباشر</tr>
```
```html good
<tr><td>نص</td></tr>
```
ليه؟ المسموح جوه `<tr>` الخلايا بس.

## a11y

- المتصفح بيعلن الصفوف بـ `role="row"` وقارئ الشاشة بيقدر يتنقّل بينها.
- متحذفش صفوف أو خلايا من غير داعي: بيبوّظ الاتجاهات.

## tips

- استخدم `tr:nth-child(even)` للتبادل.
- لو الصف كله رابط، استخدم الجافاسكربت أو `<a>` في كل خلية، مش `<a>` حوالين `<tr>`.

## quiz

### أنهي عناصر مسموحة جوه `<tr>`؟
- [ ] `<div>`
- [x] `<td>` و`<th>`
- [ ] `<p>`
- [ ] `<li>`
خلايا الجدول بس.

### فين نطبّق لون لصف كامل؟
- [x] على `<tr>`
- [ ] على `<table>`
- [ ] على كل `<td>` لازم
- [ ] مش ممكن
الصف هو الحاوية.

## refs

- [MDN: tr](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tr)
- [WHATWG: The tr element](https://html.spec.whatwg.org/multipage/tables.html#the-tr-element)
