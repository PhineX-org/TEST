---
id: thead
kind: element
cat: tables
tag: thead
title: رأس الجدول (thead)
en: HTML table head element
status: stable
display: table-header-group
void: no
support: all
size: compact
summary: عنصر thead بيجمّع صف أو أكتر من عناوين الأعمدة في أعلى الجدول. بيخلّي المتصفح يكرر الرأس في الطباعة، وبيسهّل التثبيت بـ sticky، وبيدّي قارئ الشاشة بنية واضحة.
keywords: thead, رأس الجدول, table head, عناوين, header group, sticky, tbody, tfoot, طباعة
related: tbody, tfoot, tr, th, table
---

## intro

الـ `<thead>` (**Table Head**: رأس الجدول) بيجمّع **صف العناوين** (أو أكتر) في أعلى الجدول، ويفصلها عن **بيانات** الجدول في [[tbody]]. من غيره الجدول شغّال، لكن معاه بيتحسّن: المتصفح بيعرف إن دي عناوين فيكرّرها لو الجدول اتطبع على أكتر من صفحة، وتقدر **تثبّت** الرأس عند التمرير بـ `position: sticky`، وقارئ الشاشة بيفهم البنية بسهولة.

جواه [[tr]] واحد أو أكتر، وجوه كل `<tr>` خلايا [[th]] (غالباً). والمتصفح بيعرضه **فوق الجدول** حتى لو كتبته في الـ HTML بعد `<tbody>` (في HTML القديمة)، لكن النهارده الأفضل تكتبه بالترتيب المنطقي: `<thead>` ثم `<tbody>` ثم `<tfoot>`.

> [!key] `<thead>` = صف أو أكتر من العناوين، أول قسم في الجدول.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <thead style="background:#e2e8f0"><tr><th>الاسم</th><th>الدرجة</th></tr></thead>
  <tbody><tr><td>أحمد</td><td>90</td></tr></tbody>
</table>
```

## syntax

```html nolive
<table>
  <thead>
    <tr><th scope="col">العمود 1</th><th scope="col">العمود 2</th></tr>
  </thead>
  <tbody>...</tbody>
</table>
```

- `<thead>` — **الوسم الافتتاحي**.
- `<tr>` — **صف عناوين** (واحد أو أكتر).
- `</thead>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لتجميع صف عناوين الجدول.
- لتثبيت العناوين عند التمرير.

## avoid

- متحطش بيانات عادية جواه.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحاذي محتوى الرأس. **قديمة**: CSS.

### valign {deprecated}
كانت بتحاذي رأسياً. **قديمة**: CSS.

### class
للتنسيق.

## examples

### 1) رأس مثبّت عند التمرير
`sticky`.

```html h=200
<style>
  .box { height: 110px; overflow: auto; border: 1px solid #cbd5e1; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 6px 12px; text-align: right; }
  thead th { position: sticky; top: 0; background: #0f172a; color: #fff; }
  tbody tr:nth-child(even) { background: #f1f5f9; }
</style>
<div class="box">
  <table>
    <thead><tr><th>#</th><th>الاسم</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>أحمد</td></tr><tr><td>2</td><td>سارة</td></tr>
      <tr><td>3</td><td>محمد</td></tr><tr><td>4</td><td>منى</td></tr>
      <tr><td>5</td><td>علي</td></tr><tr><td>6</td><td>هدى</td></tr>
      <tr><td>7</td><td>كريم</td></tr><tr><td>8</td><td>نور</td></tr>
    </tbody>
  </table>
</div>
```

- `position: sticky; top: 0` على الخلايا `th` بيثبّت الرأس لما تمرّر الجسم.
- لازم الحاوية تكون فيها `overflow: auto` وارتفاع محدد.
- الرأس بيفضل ظاهر مهما نزلت.

### 2) رأس بصفّين
عناوين متعددة المستويات.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 12px; text-align: center; }
</style>
<table>
  <thead>
    <tr><th rowspan="2">الاسم</th><th colspan="2">الدرجات</th></tr>
    <tr><th>نظري</th><th>عملي</th></tr>
  </thead>
  <tbody><tr><td>أحمد</td><td>45</td><td>48</td></tr></tbody>
</table>
```

- `<thead>` فيه صفّين من العناوين.
- `rowspan` و`colspan` بيعملوا التسلسل الهرمي.
- كل ده مجمّع في `<thead>` فبيتعرّف كرأس.

### 3) تنسيق الرأس كله
`thead`.

```html
<style>
  table { border-collapse: collapse; width: 100%; }
  thead { background: linear-gradient(90deg,#6366f1,#ec4899); color: #fff; }
  th, td { padding: 8px 14px; text-align: right; }
</style>
<table>
  <thead><tr><th>المنتج</th><th>السعر</th></tr></thead>
  <tbody><tr><td>قلم</td><td>5</td></tr></tbody>
</table>
```

- تنسيق واحد على `<thead>` بيطبّق على كل صفوفه.
- الخلفية المتدرّجة بتظهر ورا العناوين.
- بسيط وأنظف من تنسيق كل `th`.

## rules

- parents: [[table]] (بعد `<caption>` و`<colgroup>`، قبل `<tbody>`).
- children: [[tr]] (صفر أو أكتر).
- closing: الوسم الختامي `</thead>` (يفضّل تكتبه).
- role: `rowgroup`.
- dom: `HTMLTableSectionElement`.
- layout: `display: table-header-group`.

## mistakes

### أكتر من thead
```html bad
<table><thead>...</thead><thead>...</thead></table>
```
```html good
<table><thead><tr>...</tr><tr>...</tr></thead></table>
```
ليه؟ مسموح بـ `<thead>` واحد بس. لو محتاج صفوف عناوين متعددة حطهم كلهم فيه.

## a11y

- بيتعلن كـ `rowgroup`، وبيساعد قارئ الشاشة على التنقل.
- استخدم `<th scope="col">` جواه.

## tips

- `thead` مع `position: sticky` هو أفضل حل لتثبيت العناوين.
- الطباعة بتكرر الرأس تلقائياً.

## quiz

### إيه فايدة `<thead>`؟
- [ ] تلوين الجدول
- [x] تجميع العناوين وتكرارها في الطباعة وتثبيتها
- [ ] حذف الصفوف
- [ ] ترتيب الأعمدة
بنية واضحة وفوائد عملية.

### كام `<thead>` مسموح في الجدول؟
- [ ] أي عدد
- [x] واحد بس
- [ ] اتنين
- [ ] مفيش
واحد، ويقدر يحتوي أكتر من صف.

## refs

- [MDN: thead](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/thead)
- [WHATWG: The thead element](https://html.spec.whatwg.org/multipage/tables.html#the-thead-element)
