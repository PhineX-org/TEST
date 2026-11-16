---
id: tbody
kind: element
cat: tables
tag: tbody
title: جسم الجدول (tbody)
en: HTML table body element
status: stable
display: table-row-group
void: no
support: all
size: compact
summary: عنصر tbody بيجمّع صفوف بيانات الجدول الأساسية بعيداً عن الرأس والتذييل. المتصفح بيضيفه تلقائياً، وتقدر تستخدم أكتر من tbody لتقسيم الصفوف لمجموعات.
keywords: tbody, جسم الجدول, table body, صفوف البيانات, مجموعة صفوف, rowgroup, thead, tfoot
related: thead, tfoot, tr, table, td
---

## intro

الـ `<tbody>` (**Table Body**: جسم الجدول) بيجمّع **صفوف البيانات الأساسية** في الجدول، وبيفصلها عن الرأس [[thead]] والتذييل [[tfoot]]. معلومة غريبة: **المتصفح بيضيف `<tbody>` تلقائياً** لو كتبت `<tr>` مباشرة في `<table>`، فهتلاقيه في DevTools حتى لو مكتبتوش.

وتقدر تحط **أكتر من `<tbody>`** في نفس الجدول لتقسيم الصفوف لمجموعات (مثلاً أقسام، أو بيانات كل شهر)، كل مجموعة تتنسّق لوحدها أو تتخفّى بالجافاسكربت. وده مفيد لتنسيق CSS (خط بين المجموعات) أو للتمرير: ممكن تخلّي `<tbody>` لوحده قابل للتمرير.

> [!key] `<tbody>` = صفوف البيانات. أكتر من واحد مسموح لتقسيم المجموعات. المتصفح بيضيفه تلقائياً.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <thead><tr><th>الاسم</th></tr></thead>
  <tbody style="background:#f0fdf4"><tr><td>أحمد</td></tr><tr><td>سارة</td></tr></tbody>
</table>
```

## syntax

```html nolive
<table>
  <thead>...</thead>
  <tbody>
    <tr><td>بيانات</td></tr>
  </tbody>
</table>
```

- `<tbody>` — **الوسم الافتتاحي**.
- `<tr>` — **صفوف البيانات**.
- `</tbody>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لتجميع صفوف البيانات الأساسية.
- لتقسيم الصفوف لمجموعات متعددة.

## avoid

- متحطش عناوين الأعمدة جواه: `<thead>`.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحاذي المحتوى. **قديمة**: CSS.

### valign {deprecated}
كانت بتحاذي رأسياً. **قديمة**: CSS.

### class
للتنسيق.

## examples

### 1) جسم عادي
الشكل الأساسي.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <thead><tr><th>الاسم</th><th>الدرجة</th></tr></thead>
  <tbody>
    <tr><td>أحمد</td><td>90</td></tr>
    <tr><td>سارة</td><td>95</td></tr>
  </tbody>
</table>
```

- `<tbody>` بيحتوي كل صفوف البيانات.
- الرأس منفصل في `<thead>`.
- دي البنية الصحيحة للجدول الاحترافي.

### 2) مجموعات بأكتر من tbody
تقسيم.

```html
<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 14px; text-align: right; }
  tbody { border-top: 3px solid #6366f1; }
  tbody th { background: #eef2ff; }
</style>
<table>
  <tbody>
    <tr><th colspan="2">الفريق أ</th></tr>
    <tr><td>أحمد</td><td>مطوّر</td></tr>
    <tr><td>سارة</td><td>مصمّمة</td></tr>
  </tbody>
  <tbody>
    <tr><th colspan="2">الفريق ب</th></tr>
    <tr><td>محمد</td><td>مطوّر</td></tr>
  </tbody>
</table>
```

- كل `<tbody>` مجموعة صفوف مستقلة.
- الحد العلوي بيفصل بين المجموعات بصرياً.
- ده بيتفيد في الجداول المقسّمة لأقسام.

### 3) إظهار وإخفاء مجموعة
بالجافاسكربت.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <tbody id="g"><tr><td>صف مخفي/ظاهر</td></tr></tbody>
</table>
<button onclick="const g = document.getElementById('g'); g.hidden = !g.hidden">إظهار/إخفاء</button>
```

- الـ `hidden` على `<tbody>` بيخفي المجموعة كلها.
- بدون ما نلمس كل صف لوحده.
- ده نمط شائع للقوائم القابلة للطي.

## rules

- parents: [[table]].
- children: [[tr]] (صفر أو أكتر).
- closing: الوسم الختامي `</tbody>` (يفضّل تكتبه).
- role: `rowgroup`.
- dom: `HTMLTableSectionElement`.
- layout: `display: table-row-group`.

## mistakes

### tbody بعد tr مباشرة
```html bad
<table><tr><td>1</td></tr><tbody><tr><td>2</td></tr></tbody></table>
```
```html good
<table><tbody><tr><td>1</td></tr><tr><td>2</td></tr></tbody></table>
```
ليه؟ خلط `<tr>` المباشر مع `<tbody>` بيبوّظ البنية. ابدأ كل البيانات في `<tbody>`.

## a11y

- بيتعلن كـ `rowgroup` وبيحسّن التنقل.
- لو بتقسّم لمجموعات، اربط كل مجموعة بعنوان `<th scope="rowgroup">`.

## tips

- المتصفح بيضيفه لوحده، فمتتفاجئش لو لقيته في DevTools.
- لتنسيق الجسم كله استخدم `tbody` في CSS.

## quiz

### هل بيتضاف `<tbody>` لوحده؟
- [x] أيوه، لو كتبت `<tr>` مباشرة في `<table>`
- [ ] لأ أبداً
- [ ] بس في الطباعة
- [ ] بس في الموبايل
المتصفح بيصلّح البنية.

### ينفع أكتر من `<tbody>`؟
- [x] أيوه
- [ ] لأ
- [ ] اتنين بس
- [ ] واحد بس
لتقسيم الصفوف لمجموعات.

## refs

- [MDN: tbody](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody)
- [WHATWG: The tbody element](https://html.spec.whatwg.org/multipage/tables.html#the-tbody-element)
