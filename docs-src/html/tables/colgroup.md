---
id: colgroup
kind: element
cat: tables
tag: colgroup
title: مجموعة الأعمدة (colgroup)
en: HTML table column group element
status: stable
display: table-column-group
void: no
support: all
size: compact
summary: عنصر colgroup بيجمّع عمود أو أكتر في الجدول عشان تنسّقهم سوا (لون، عرض، حدود) من غير ما تكرر class على كل خلية. بيحتوي عناصر col أو بيستخدم span.
keywords: colgroup, مجموعة أعمدة, col, span, عمود, تنسيق عمود, table column group
related: col, table, td, th
---

## intro

تخيّل إنك عايز تلوّن العمود التالت في جدول من 100 صف. من غير `<colgroup>` لازم تكتب `class` على كل خلية في العمود. الحل: عنصر `<colgroup>` (**Column Group**: مجموعة أعمدة) اللي بيتحط في أول الجدول، وبيعرّف **الأعمدة** كحاوية تتنسّق مرة واحدة.

بتستخدمه بطريقتين: إما تحط جواه عناصر [[col]] (واحد لكل عمود أو مجموعة)، أو تستخدم الخاصية `span` على `<colgroup>` نفسه لو عايز مجموعة متشابهة. ومش أي CSS بيشتغل على الأعمدة: بس **`background`** و**`border`** و**`width`** و**`visibility`**. وبيتحط بعد `<caption>` وقبل `<thead>`.

> [!key] `<colgroup>` + `<col>` لتنسيق أعمدة كاملة بسطر واحد.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <colgroup>
    <col>
    <col style="background:#fef9c3">
  </colgroup>
  <tr><th>الاسم</th><th>الدرجة</th></tr>
  <tr><td>أحمد</td><td>90</td></tr>
</table>
```

## syntax

```html nolive
<table>
  <colgroup>
    <col style="width:120px">
    <col span="2" style="background:#eef">
  </colgroup>
  ...
</table>
```

- `<colgroup>` — **الحاوية**.
- `<col>` — **عمود** (أو مجموعة بـ `span`).
- `span` — **عدد الأعمدة** (لو مفيش `<col>` جواه).
- `</colgroup>` — **الوسم الختامي** إجباري.

## use

- لتلوين أو تحديد عرض عمود كامل.
- لتقسيم الجدول لمجموعات أعمدة (مثلاً بحد فاصل).

## avoid

- متحاولش تحط `color` أو `text-align` على `<col>`: مش بيشتغلوا.

## attributes

### span
**عدد الأعمدة** اللي المجموعة بتغطّيها لو مفيش `<col>` جواها (الافتراضي 1).

```html nolive
<colgroup span="2" style="background:#eef"></colgroup>
```

### align {deprecated}
كانت بتحاذي محتوى الأعمدة. **قديمة**: CSS.

### width {deprecated}
كانت بتحدد عرض الأعمدة. **قديمة**: `width` في CSS.

## examples

### 1) عرض أعمدة
ثابت.

```html
<style>
  table { border-collapse: collapse; table-layout: fixed; }
  th, td { border: 1px solid #94a3b8; padding: 6px 10px; }
</style>
<table>
  <colgroup>
    <col style="width:80px">
    <col style="width:160px">
    <col style="width:80px">
  </colgroup>
  <tr><th>#</th><th>الاسم</th><th>السن</th></tr>
  <tr><td>1</td><td>أحمد</td><td>25</td></tr>
</table>
```

- كل `<col>` بيحدد عرض عمود.
- `table-layout: fixed` بيخلّي العرض يتطبّق بدقة.
- ده أنظف من كتابة عرض في كل خلية.

### 2) لون لعمود
`background`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 14px; border: 1px solid #cbd5e1; }
</style>
<table>
  <colgroup>
    <col>
    <col style="background:#dcfce7">
    <col>
  </colgroup>
  <tr><th>الاسم</th><th>الدرجة</th><th>المدينة</th></tr>
  <tr><td>أحمد</td><td>90</td><td>القاهرة</td></tr>
  <tr><td>سارة</td><td>95</td><td>طنطا</td></tr>
</table>
```

- العمود التاني كله اتلوّن من سطر واحد.
- من غير `<colgroup>` كنا نحتاج class على كل خلية.
- الخلفية بتظهر وراء الخلايا اللي ملهاش خلفية.

### 3) تجميع أعمدة بـ span
مجموعتين.

```html
<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 14px; border: 1px solid #cbd5e1; text-align: center; }
</style>
<table>
  <colgroup span="2" style="background:#e0f2fe"></colgroup>
  <colgroup span="2" style="background:#fef3c7"></colgroup>
  <tr><th>أ</th><th>ب</th><th>ج</th><th>د</th></tr>
  <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
</table>
```

- كل `<colgroup span="2">` بيغطّي عمودين ويلوّنهم بلون واحد.
- من غير `<col>` جواه لأن `span` كفاية.
- ده بيفصل الجدول لمجموعتين بصرياً.

## rules

- parents: [[table]] (بعد `<caption>` وقبل `<thead>`).
- children: [[col]] (صفر أو أكتر)، أو مفيش لو عندك `span`.
- closing: الوسم الختامي `</colgroup>` (يفضّل تكتبه).
- role: مفيش.
- dom: `HTMLTableColElement`.
- layout: `display: table-column-group`.

## mistakes

### col برّه colgroup
```html bad
<table><col><tr><td>1</td></tr></table>
```
```html good
<table><colgroup><col></colgroup><tr><td>1</td></tr></table>
```
ليه؟ الأفضل تغلّف الـ `<col>` بـ `<colgroup>` عشان البنية سليمة.

## a11y

- `<colgroup>` للتنسيق، مش بيوصّل معنى لقارئ الشاشة. استخدم `scope="colgroup"` على `<th>` لو عايز دلالة.
- متعتمدش على لون العمود لوحده لنقل معلومة: ضيف نص أو رمز كمان.

## tips

- خصائص CSS المسموحة على الأعمدة: `background` و`border` و`width` و`visibility`.
- للتحكم الكامل في الأعمدة استخدم `:nth-child` على الخلايا.

## quiz

### إيه الخصائص اللي بتشتغل على `<col>`؟
- [ ] أي خاصية
- [x] `background` و`border` و`width` و`visibility`
- [ ] `color` بس
- [ ] مفيش
أربع خصائص بس.

### إيه فايدة `<colgroup>`؟
- [x] تنسيق أعمدة كاملة بسطر واحد
- [ ] ترتيب الصفوف
- [ ] إضافة صفوف
- [ ] حذف الجدول
بدل `class` على كل خلية.

## refs

- [MDN: colgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/colgroup)
- [WHATWG: The colgroup element](https://html.spec.whatwg.org/multipage/tables.html#the-colgroup-element)
