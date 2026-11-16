---
id: td
kind: element
cat: tables
tag: td
title: خلية البيانات (td)
en: HTML table data cell element
status: stable
display: table-cell
void: no
support: all
summary: خلية بيانات في صف الجدول، بتحتوي أي محتوى، وبتتدمج بـ colspan وrowspan، وبتربط بعناوينها عن طريق headers، وبتتنسّق بـ CSS للمحاذاة والحدود والحشو.
keywords: td, خلية, خلية بيانات, table data, colspan, rowspan, headers, دمج خلايا, محاذاة, جدول, cell
related: th, tr, table, tbody, tfoot
---

## intro

الـ `<td>` (**Table Data**: بيانات الجدول) هي **الخلية العادية**: اللي بتشيل المعلومة الفعلية. «أحمد» و«25» و«القاهرة» كلها `<td>`. هي جزء من `<tr>` (الصف)، وبتتصف جنب بعضها في الصف، وعمودها بيتحدد من ترتيبها في الصف. أما العناوين اللي بتوصف الأعمدة والصفوف فهي [[th]].

الـ `<td>` **بتقبل أي محتوى** (Flow content): نص، صور، روابط، أزرار، قوايم، وحتى جدول جواها. وتقدر **تدمج** الخلايا: **`colspan`** لدمج أعمدة، **`rowspan`** لدمج صفوف. لما بتدمج خلية، لازم تشيل الخلايا اللي هي أخدت مكانها من الصفوف أو الأعمدة التانية، وإلا الجدول يتبوّظ.

والخلية بتتنسّق بـ CSS: `padding` للحشو، `border` للحدود، `text-align` للمحاذاة الأفقية، `vertical-align` للرأسية، `background` للخلفية. وفي الأرقام، الأفضل تحاذيها لجهة واحدة (مثلاً يمين) وتستخدم `font-variant-numeric: tabular-nums` عشان تتراصّ الأرقام.

> [!analogy] الجدول زي **عمارة**: كل `<tr>` دور، وكل `<td>` شقة. و`colspan` زي شقة بتاخد عرض شقتين. و`rowspan` زي شقة بتاخد دورين.

> [!key] `<td>` للبيانات. `colspan` و`rowspan` للدمج. المحاذاة والحدود بـ CSS.

## try

جرّب `colspan="2"` على خلية.

```html
<table border="1" cellpadding="8" style="border-collapse:collapse">
  <tr><td>أحمد</td><td>90</td><td>85</td></tr>
  <tr><td colspan="3" style="text-align:center">خلية مدموجة على 3 أعمدة</td></tr>
</table>
```

## syntax

```html nolive
<tr>
  <td>بيانات</td>
  <td colspan="2">خلية بتمتد على عمودين</td>
</tr>
```

- `<td ...>` — **الوسم الافتتاحي**.
- `colspan` و`rowspan` — **الدمج**.
- `headers` — **ربط بعناوين** (للمعقد).
- المحتوى — **أي Flow content**.
- `</td>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لكل خلية بيانات في الجدول.
- لدمج خلايا (إجمالي، عناوين فرعية).
- لخلايا فيها أزرار وروابط وصور.

## avoid

- متستخدمهوش للعناوين: [[th]].
- متحطش خلايا فاضية لضبط المسافات.
- متدمجش خلايا من غير ما تحسب مكان الباقي.

## attributes

### colspan
**عدد الأعمدة** اللي بتمتد عليها الخلية (1 افتراضي).

```html nolive
<td colspan="3">عرض 3 أعمدة</td>
```

### rowspan
**عدد الصفوف** اللي بتمتد عليها الخلية.

### headers
**قايمة `id` لخلايا `<th>`** بتحدد عناوين الخلية (لجداول معقدة).

### align {deprecated}
كانت بتحاذي المحتوى أفقياً. **قديمة**: `text-align`.

### valign {deprecated}
كانت بتحاذي المحتوى رأسياً. **قديمة**: `vertical-align`.

### width {deprecated}
كانت بتحدد عرض الخلية. **قديمة**: `width` في CSS.

### height {deprecated}
كانت بتحدد ارتفاع الخلية. **قديمة**: `height` في CSS.

### nowrap {deprecated}
كانت بتمنع لف النص. **قديمة**: `white-space: nowrap`.

### bgcolor {deprecated}
كانت بتلوّن الخلفية. **قديمة**: `background-color`.

## examples

### 1) خلايا عادية
صف بخلايا متعددة.

```html
<style>
  table { border-collapse: collapse; }
  td { border: 1px solid #94a3b8; padding: 8px 16px; }
</style>
<table>
  <tr><td>أحمد</td><td>25</td><td>القاهرة</td></tr>
  <tr><td>سارة</td><td>22</td><td>الإسكندرية</td></tr>
</table>
```

- كل `<td>` عمود، وبيتحدد ترتيبه من مكانه في الصف.
- الحدود والحشو من CSS على `td`.
- كل صف لازم يبقى فيه نفس عدد الأعمدة (أو تحسب الدمج).

### 2) دمج أعمدة
`colspan`.

```html
<style>
  table { border-collapse: collapse; }
  td, th { border: 1px solid #94a3b8; padding: 8px 14px; text-align: center; }
</style>
<table>
  <tr><th>المنتج</th><th>الكمية</th><th>السعر</th></tr>
  <tr><td>قلم</td><td>4</td><td>20</td></tr>
  <tr><td colspan="2"><b>الإجمالي</b></td><td><b>20</b></td></tr>
</table>
```

- الخلية «الإجمالي» ماسكة عمودين بـ `colspan="2"`.
- بنكتب خليتين بس في الصف الأخير (2+1 = 3 أعمدة).
- لو كتبنا 3 خلايا مع `colspan` هيطلع عمود زيادة.

### 3) دمج صفوف
`rowspan`.

```html
<style>
  table { border-collapse: collapse; }
  td, th { border: 1px solid #94a3b8; padding: 8px 14px; text-align: center; }
</style>
<table>
  <tr><th>اليوم</th><th>المحاضرة</th></tr>
  <tr><td rowspan="2">السبت</td><td>HTML</td></tr>
  <tr><td>CSS</td></tr>
  <tr><td>الأحد</td><td>JS</td></tr>
</table>
```

- «السبت» بتمتد على صفين بـ `rowspan="2"`.
- الصف التاني فيه خلية واحدة فقط (لأن الأولى محجوزة).
- ده أسلوب جداول المواعيد.

### 4) محاذاة الأرقام
بـ CSS.

```html
<style>
  table { border-collapse: collapse; }
  td, th { border: 1px solid #cbd5e1; padding: 6px 14px; }
  td.num { text-align: left; direction: ltr; font-variant-numeric: tabular-nums; }
</style>
<table>
  <tr><th>المنتج</th><th>السعر</th></tr>
  <tr><td>قلم</td><td class="num">5.50</td></tr>
  <tr><td>كراسة</td><td class="num">125.00</td></tr>
  <tr><td>شنطة</td><td class="num">1,250.75</td></tr>
</table>
```

- الأرقام مرتّبة تحت بعض بالمحاذاة الواحدة (بالعلامة العشرية).
- `tabular-nums` بيخلّي عرض الأرقام ثابت فبتتراصّ كويس.
- `direction: ltr` بيخلّي الأرقام تتعرض بالترتيب الصحيح داخل العربي.

### 5) محتوى متنوع جوه الخلية
رابط وزرار وصورة.

```html
<style>
  table { border-collapse: collapse; }
  td, th { border: 1px solid #cbd5e1; padding: 8px 12px; vertical-align: middle; }
</style>
<table>
  <tr><th>الاسم</th><th>الرابط</th><th>إجراء</th></tr>
  <tr>
    <td>أحمد</td>
    <td><a href="#a">بروفايل</a></td>
    <td><button>حذف</button></td>
  </tr>
</table>
```

- الخلية بتقبل أي محتوى، فممكن تحط رابط وزرار وصورة.
- `vertical-align: middle` بيوسّط المحتوى رأسياً.
- لو الزرار في كل صف، اكتب له `aria-label` فيه اسم الصف («حذف أحمد»).

## rules

- parents: [[tr]].
- children: **Flow content**.
- closing: الوسم الختامي `</td>` (يفضّل تكتبه).
- role: `cell` (أو `gridcell` جوه `grid`).
- dom: `HTMLTableCellElement`.
- layout: `display: table-cell`.

## mistakes

### td برّه tr
```html bad
<table><td>خلية</td></table>
```
```html good
<table><tr><td>خلية</td></tr></table>
```
ليه؟ الخلية لازم جوه صف.

### دمج من غير حذف الخلايا
```html bad
<tr><td colspan="2">أ</td><td>ب</td><td>ج</td></tr>
```
```html good
<tr><td colspan="2">أ</td><td>ب</td></tr>
```
ليه؟ لو الجدول 3 أعمدة، الخلية المدموجة بتاخد عمودين فلازم خلية واحدة بس بعدها (مش اتنين).

### td للعنوان
```html bad
<tr><td><b>الاسم</b></td><td><b>السن</b></td></tr>
```
```html good
<tr><th scope="col">الاسم</th><th scope="col">السن</th></tr>
```
ليه؟ العناوين `<th>` دلالياً، مش `<td>` بخط غامق.

## a11y

- فرّق بين العناوين `<th>` والبيانات `<td>`.
- الأزرار والروابط داخل الخلايا لازم يكون ليها اسم واضح (`aria-label`).
- متعتمدش على اللون بس لنقل معلومة في الخلية.
- الدمج الكتير بيصعّب التنقل لقارئ الشاشة.

## tips

- `padding` على `td` أحسن بكتير من `cellpadding`.
- لخلايا طويلة استخدم `max-width` و`overflow-wrap`.
- لمحاذاة موحدة اربط `text-align` بـ class للأرقام.

## quiz

### إيه الفرق بين `colspan` و`rowspan`؟
- [ ] مفيش فرق
- [x] `colspan` لدمج أعمدة، و`rowspan` لدمج صفوف
- [ ] `colspan` للصفوف
- [ ] واحد للألوان
Col = عمود، Row = صف.

### فين لازم يتحط `<td>`؟
- [ ] جوه `<table>` مباشرة
- [x] جوه `<tr>`
- [ ] جوه `<tbody>` مباشرة
- [ ] أي مكان
الخلايا جوه الصفوف.

### أنهي أنسب لمحاذاة النص أفقياً في خلية؟
- [ ] `align`
- [x] `text-align` في CSS
- [ ] `valign`
- [ ] `halign`
الخصائص القديمة اتشالت.

## refs

- [MDN: td](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td)
- [WHATWG: The td element](https://html.spec.whatwg.org/multipage/tables.html#the-td-element)
