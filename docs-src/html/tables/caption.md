---
id: caption
kind: element
cat: tables
tag: caption
title: عنوان الجدول (caption)
en: HTML table caption element
status: stable
display: table-caption
void: no
support: all
size: compact
summary: عنصر caption هو عنوان الجدول أو وصفه، وبيتحط كأول ابن جوه table. بيتقري كاسم للجدول بقارئ الشاشة، وبيظهر فوق الجدول افتراضياً وبتتحكم في مكانه بـ caption-side.
keywords: caption, عنوان جدول, وصف, table caption, caption-side, إتاحة, اسم الجدول, table
related: table, figcaption, thead, th
---

## intro

كل جدول مفيد لازم له **اسم**: «درجات الطلاب»، «أسعار الباقات»، «جدول المحاضرات». العنصر `<caption>` (**كابشن**: عنوان) هو اللي بيدّي الجدول اسمه. بيتحط كـ **أول ابن** جوه [[table]]، وبيظهر **فوق الجدول** افتراضياً (وتقدر تنقله تحت بـ `caption-side: bottom`).

الـ `<caption>` مهم جداً للإتاحة: هو **الاسم الإتاحي** (Accessible name) للجدول، يعني قارئ الشاشة بيعلنه لما المستخدم يوصل للجدول، فيعرف بيتكلم عن إيه قبل ما يدخل فيه. وبالنسبة لأي جدول بيتشارك لوحده أو ضمن مقال، العنوان بيدّي سياق. ولو الشرح أطول من جملة، استخدم [[figure]] مع [[figcaption]].

> [!key] `<caption>` أول ابن في `<table>`، وهو اسم الجدول.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <caption>درجات الطلاب</caption>
  <tr><th>الاسم</th><th>الدرجة</th></tr>
  <tr><td>أحمد</td><td>90</td></tr>
</table>
```

## syntax

```html nolive
<table>
  <caption>عنوان الجدول</caption>
  ...
</table>
```

- `<caption>` — **الوسم الافتتاحي**، أول ابن للجدول.
- النص — **عنوان أو وصف**.
- `</caption>` — **الوسم الختامي** إجباري.

## use

- لإعطاء الجدول عنوان واضح.
- لتحسين الإتاحة وفهرسة محركات البحث.

## avoid

- متحطش عنوان طويل جداً: الجملة القصيرة أحسن.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحدد موضع العنوان (فوق/تحت/يمين/شمال). **قديمة**: استخدم `caption-side` و`text-align` في CSS.

### class
للتنسيق.

## examples

### 1) عنوان بسيط
الأشهر.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 14px; }
  caption { font-weight: bold; font-size: 1.1em; margin-bottom: 6px; }
</style>
<table>
  <caption>جدول المحاضرات الأسبوعي</caption>
  <tr><th>اليوم</th><th>المادة</th></tr>
  <tr><td>السبت</td><td>HTML</td></tr>
</table>
```

- العنوان بيظهر فوق الجدول من غير تحكّم.
- بنكبّر الخط ونعمله غامق بـ CSS.
- `margin-bottom` بيدّي مسافة بين العنوان والجدول.

### 2) العنوان تحت الجدول
`caption-side`.

```html
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #94a3b8; padding: 6px 14px; }
  caption { caption-side: bottom; color: #64748b; font-size: 13px; padding-top: 6px; }
</style>
<table>
  <caption>المصدر: بيانات الشركة 2026</caption>
  <tr><th>الشهر</th><th>المبيعات</th></tr>
  <tr><td>يناير</td><td>1200</td></tr>
</table>
```

- `caption-side: bottom` بينقل العنوان تحت الجدول.
- الـ HTML فضل زي ما هو: `<caption>` أول ابن.
- ده مفيد لذكر مصدر أو ملاحظة.

### 3) عنوان بمحتوى منسّق
مع عناصر داخلية.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <caption><strong>الأسعار</strong> <small>(بالجنيه المصري)</small></caption>
  <tr><th>الباقة</th><th>السعر</th></tr>
  <tr><td>أساسية</td><td>100</td></tr>
</table>
```

- `<caption>` بيقبل محتوى inline زي `<strong>` و`<small>`.
- مينفعش تحط جواه جدول تاني.
- نص العنوان كله بيتقري لقارئ الشاشة كاسم الجدول.

## rules

- parents: [[table]] (أول ابن بس).
- children: **Flow content** (من غير جداول).
- closing: الوسم الختامي `</caption>` إجباري.
- role: `caption`.
- dom: `HTMLTableCaptionElement`.
- layout: `display: table-caption`.

## mistakes

### caption بعد الصفوف
```html bad
<table><tr><td>1</td></tr><caption>عنوان</caption></table>
```
```html good
<table><caption>عنوان</caption><tr><td>1</td></tr></table>
```
ليه؟ لازم يكون أول ابن، وإلا اتجاهله المتصفح أو اعتبره خطأ.

## a11y

- ده الاسم الإتاحي للجدول، فاكتب عنوان وصفي.
- ماتعوّضوش بـ `<h3>` قبل الجدول لو بتقدر تستخدم `<caption>`.

## tips

- استخدم `<caption>` بدل `<h3>` لعنوان خاص بجدول واحد.
- اجمع بين `<caption>` و`aria-describedby` لو محتاج شرح أطول.

## quiz

### فين بيتحط `<caption>`؟
- [ ] آخر الجدول
- [x] أول ابن في `<table>`
- [ ] جوه `<tr>`
- [ ] برّه الجدول
لازم أول ابن.

### إزاي تنقل العنوان تحت الجدول؟
- [ ] `align="bottom"`
- [x] `caption-side: bottom`
- [ ] `<br>`
- [ ] مش ممكن
خاصية CSS.

## refs

- [MDN: caption](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption)
- [WHATWG: The caption element](https://html.spec.whatwg.org/multipage/tables.html#the-caption-element)
