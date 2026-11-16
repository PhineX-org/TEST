---
id: col
kind: element
cat: tables
tag: col
title: عمود الجدول (col)
en: HTML table column element
status: stable
display: table-column
void: yes
support: all
size: compact
summary: عنصر col فاضي بيحدد عمود (أو أكتر بـ span) جوه colgroup لتنسيقه كله مرة واحدة: عرض، خلفية، حدود، إخفاء. مفيهوش محتوى ومفيش له وسم قفل.
keywords: col, عمود, colgroup, span, عرض عمود, لون عمود, table column, void
related: colgroup, table, td, th
---

## intro

الـ `<col>` (**Column**: عمود) عنصر **فاضي (Void)** بيتحط جوه [[colgroup]] وبيمثّل **عمود** (أو أكتر باستخدام `span`) في الجدول. هو مش بيحتوي حاجة: كل وظيفته إنك تقدر **تنسّق العمود كله** بسطر واحد: تحدد عرضه، أو تلوّن خلفيته، أو تحط حدود، أو تخفيه بـ `visibility: collapse`.

الترتيب مهم: أول `<col>` بيمثّل أول عمود، والتاني التاني، وهكذا. ولو عايز تتخطى عمود من غير تنسيق، حط `<col>` فاضي مكانه.

> [!key] `<col>` فاضي، جوه `<colgroup>`، بيمثّل عمود. التنسيق المسموح: `background`، `border`، `width`، `visibility`.

## try

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <colgroup>
    <col>
    <col style="background:#fee2e2; width:100px">
  </colgroup>
  <tr><th>الاسم</th><th>الدرجة</th></tr>
  <tr><td>أحمد</td><td>90</td></tr>
</table>
```

## syntax

```html nolive
<colgroup>
  <col style="width:100px">
  <col span="2" style="background:#eef">
</colgroup>
```

- `<col>` — وسم **واحد بس**، ومفيش `</col>`.
- `span` — **عدد الأعمدة** اللي يغطيها.
- `style` — **التنسيق** المسموح.

## use

- لتحديد عرض عمود.
- لتلوين عمود كامل.

## avoid

- متحطش جواه محتوى أو وسم قفل.

## attributes

### span
**عدد الأعمدة** اللي بيمثلها العنصر (الافتراضي 1).

```html nolive
<col span="3" style="background:#eef">
```

### align {deprecated}
كانت بتحاذي محتوى العمود. **قديمة**: CSS.

### width {deprecated}
كانت بتحدد عرض العمود. **قديمة**: `width` في CSS.

### class
للتنسيق.

## examples

### 1) عمود مميّز
لون.

```html
<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 14px; border: 1px solid #cbd5e1; }
</style>
<table>
  <colgroup><col><col style="background:#fef9c3"><col></colgroup>
  <tr><th>أ</th><th>ب</th><th>ج</th></tr>
  <tr><td>1</td><td>2</td><td>3</td></tr>
</table>
```

- العمود الأوسط اتلوّن كله بلون أصفر فاتح.
- الـ `<col>` الأول والتالت فاضيين: بس مكان محجوز.
- من غيرهم الترتيب كان هيتلخبط.

### 2) أعمدة بـ span
تجميع.

```html
<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 14px; border: 1px solid #cbd5e1; text-align: center; }
</style>
<table>
  <colgroup><col span="2" style="background:#e0f2fe"><col style="background:#fce7f3"></colgroup>
  <tr><th>أ</th><th>ب</th><th>ج</th></tr>
  <tr><td>1</td><td>2</td><td>3</td></tr>
</table>
```

- `span="2"` بيخلي `<col>` واحد يمثّل أول عمودين.
- العمود التالت ليه `<col>` لوحده بلون مختلف.
- ده بيوفّر كتابة عنصر لكل عمود.

### 3) إخفاء عمود
`visibility: collapse`.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <colgroup><col><col style="visibility:collapse"><col></colgroup>
  <tr><th>الاسم</th><th>سري</th><th>المدينة</th></tr>
  <tr><td>أحمد</td><td>****</td><td>القاهرة</td></tr>
</table>
```

- `visibility: collapse` بيخفي العمود كله من غير ما يشيله من الـ HTML.
- بيشتغل في المتصفحات الحديثة على الأعمدة.
- ممكن تبدّله بالجافاسكربت لعمل زرار «إخفاء/إظهار عمود».

## rules

- parents: [[colgroup]] (أو [[table]] مباشرة في بعض الحالات).
- children: **مفيش**. عنصر فاضي (Void).
- closing: **مفيش وسم قفل**.
- role: مفيش.
- dom: `HTMLTableColElement`.
- layout: `display: table-column`.

## mistakes

### وسم قفل
```html bad
<colgroup><col></col></colgroup>
```
```html good
<colgroup><col></colgroup>
```
ليه؟ `<col>` فاضي ومالوش وسم قفل.

## a11y

- مالوش تأثير على الإتاحة، لأنه للتنسيق. اعتمد على `<th scope>` لوصف العلاقات.
- لو أخفيت عمود بـ `visibility: collapse`، اتأكد إن مفيش معلومة مهمة بتضيع على المستخدم.

## tips

- تذكّر: `background` و`border` و`width` و`visibility` بس.
- للتنسيقات التانية استخدم `td:nth-child(n)`.

## quiz

### هل لـ `<col>` وسم قفل؟
- [ ] أيوه
- [x] لأ، عنصر فاضي
- [ ] أحياناً
- [ ] أيوه مع span
عنصر Void.

### إيه معنى `span="2"` على `<col>`؟
- [x] العنصر بيمثّل عمودين
- [ ] عرض 2 بكسل
- [ ] تكرار مرتين
- [ ] صفين
عدد الأعمدة المغطاة.

## refs

- [MDN: col](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col)
- [WHATWG: The col element](https://html.spec.whatwg.org/multipage/tables.html#the-col-element)
