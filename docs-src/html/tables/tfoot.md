---
id: tfoot
kind: element
cat: tables
tag: tfoot
title: تذييل الجدول (tfoot)
en: HTML table foot element
status: stable
display: table-footer-group
void: no
support: all
size: compact
summary: عنصر tfoot بيجمّع صفوف الملخص أو المجاميع في آخر الجدول. بيتعرّف كتذييل، وبيتكرر في الطباعة، وبيتنسّق منفصل عن البيانات. بيتحط بعد thead وtbody في الترتيب الحديث.
keywords: tfoot, تذييل الجدول, table foot, مجموع, إجمالي, ملخص, thead, tbody, footer group
related: thead, tbody, tr, table, td
---

## intro

الـ `<tfoot>` (**Table Foot**: تذييل الجدول) بيجمّع **صفوف الملخص**: الإجمالي، المتوسط، مجموع العمود، ملاحظات ختامية. زي [[thead]] بالظبط لكن في الآخر. بيفصل المجاميع عن البيانات العادية في [[tbody]] فتتنسّق بشكل مختلف (خط سميك فوقها، خلفية مختلفة) وبتتعرّف دلالياً كتذييل.

في HTML القديمة كان لازم `<tfoot>` ييجي **قبل** `<tbody>` في الكود (عشان المتصفح يعرضه قبل ما يحمّل الجسم الطويل)، لكن في HTML5 الحديثة **الأفضل والمعتاد** يتكتب **بعد** `<tbody>`، والمتصفح بيعرضه تحت في الحالتين.

> [!key] `<tfoot>` = صفوف المجاميع والملخص، في آخر الجدول، بعد `<tbody>`.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tbody><tr><td>قلم</td><td>20</td></tr><tr><td>كراسة</td><td>35</td></tr></tbody>
  <tfoot style="background:#fef9c3"><tr><td>الإجمالي</td><td>55</td></tr></tfoot>
</table>
```

## syntax

```html nolive
<table>
  <thead>...</thead>
  <tbody>...</tbody>
  <tfoot>
    <tr><td>الإجمالي</td><td>100</td></tr>
  </tfoot>
</table>
```

- `<tfoot>` — **الوسم الافتتاحي**.
- `<tr>` — **صفوف الملخص**.
- `</tfoot>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لصفوف المجاميع والإجماليات.
- لملاحظات ختامية للجدول.

## avoid

- متحطش بيانات عادية فيه.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحاذي المحتوى. **قديمة**: CSS.

### valign {deprecated}
كانت بتحاذي رأسياً. **قديمة**: CSS.

### class
للتنسيق.

## examples

### 1) إجمالي الفاتورة
`tfoot` بمجموع.

```html
<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 8px 14px; text-align: right; border-bottom: 1px solid #e2e8f0; }
  tfoot td { font-weight: bold; border-top: 3px double #0f172a; background: #f8fafc; }
</style>
<table>
  <thead><tr><th>المنتج</th><th>السعر</th></tr></thead>
  <tbody>
    <tr><td>قلم</td><td>20</td></tr>
    <tr><td>كراسة</td><td>35</td></tr>
  </tbody>
  <tfoot><tr><td>الإجمالي</td><td>55</td></tr></tfoot>
</table>
```

- `<tfoot>` فيه صف الإجمالي بتنسيق مميّز.
- الحد المزدوج فوقه بيعمل شكل فاتورة.
- بيتعرض في آخر الجدول بعد الجسم.

### 2) صفين في التذييل
مجموع وضريبة.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 14px; }
  tfoot { background: #f1f5f9; }
</style>
<table>
  <tbody><tr><td>خدمة</td><td>100</td></tr></tbody>
  <tfoot>
    <tr><th scope="row">الضريبة</th><td>14</td></tr>
    <tr><th scope="row">الإجمالي</th><td>114</td></tr>
  </tfoot>
</table>
```

- `<tfoot>` ممكن يحتوي أكتر من صف.
- استخدمنا `<th scope="row">` كعناوين لصفوف التذييل.
- ده بيحسّن الإتاحة في المجاميع.

### 3) حساب المجموع بالجافاسكربت
تلقائي.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tbody id="b">
    <tr><td>أ</td><td>10</td></tr>
    <tr><td>ب</td><td>20</td></tr>
    <tr><td>ج</td><td>30</td></tr>
  </tbody>
  <tfoot><tr><td>المجموع</td><td id="sum"></td></tr></tfoot>
</table>
<script>
  let s = 0;
  document.querySelectorAll('#b tr td:nth-child(2)').forEach(td => s += Number(td.textContent));
  document.getElementById('sum').textContent = s;
</script>
```

- بنجمع القيم في العمود التاني من `<tbody>`.
- النتيجة بتتحط في خلية جوه `<tfoot>`.
- ده أسلوب شائع للإجماليات المحسوبة.

## rules

- parents: [[table]] (بعد `<tbody>` في الأفضل).
- children: [[tr]] (صفر أو أكتر).
- closing: الوسم الختامي `</tfoot>` (يفضّل تكتبه).
- role: `rowgroup`.
- dom: `HTMLTableSectionElement`.
- layout: `display: table-footer-group`.

## mistakes

### أكتر من tfoot
```html bad
<table><tfoot>...</tfoot><tfoot>...</tfoot></table>
```
```html good
<table><tfoot><tr>...</tr><tr>...</tr></tfoot></table>
```
ليه؟ مسموح بـ `<tfoot>` واحد بس. حط الصفوف كلها جواه.

## a11y

- بيتعلن كـ `rowgroup`.
- استخدم `<th scope="row">` لعناوين صفوف الإجماليات.

## tips

- حط تنسيق المجموع (غامق وحد علوي) على `tfoot td`.
- في الطباعة المتصفح ممكن يكرّر التذييل في كل صفحة.

## quiz

### فين بيتعرض `<tfoot>`؟
- [ ] فوق الجدول
- [x] في آخر الجدول
- [ ] في الوسط
- [ ] برّه
تذييل = الآخر.

### إيه المناسب جوه `<tfoot>`؟
- [x] صفوف الإجمالي والملخص
- [ ] عناوين الأعمدة
- [ ] بيانات عادية
- [ ] صور
المجاميع والملاحظات الختامية.

## refs

- [MDN: tfoot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot)
- [WHATWG: The tfoot element](https://html.spec.whatwg.org/multipage/tables.html#the-tfoot-element)
