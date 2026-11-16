---
id: attr-max
kind: attribute
cat: attrs
chip: max
title: خاصية الحد الأقصى
en: HTML max attribute
status: stable
support: all
mdn: Attributes/max
summary: خاصية max بتحدد أكبر قيمة مسموحة لحقول number وrange وdate وtime وغيرها، وبتحدد نهاية meter وprogress. القيمة بنفس صيغة الحقل، ومع min بتكوّن نطاقاً.
keywords: max, الحد الأقصى, rangeOverflow, number, range, progress, meter, date, validation, :out-of-range, نطاق
related: input-number, input-range, progress, attr-min, attr-step, meter
---

## intro

`max` عكس [[attr-min]]: بتحدد **أكبر قيمة مسموحة**. لو القيمة **أكبر** من الحد، المتصفح بيمنع الإرسال ويعرض رسالة. بتشتغل مع [[input-number]] و[[input-range]] والتواريخ والأوقات، ومع العناصر [[progress]] و[[meter]]: هناك `max` هو **نهاية** المقياس (القيمة اللي تعادل 100%).

**قيمتها بنفس صيغة النوع:** رقم (`max="10"`)، تاريخ (`max="2026-12-31"`)، وقت (`max="17:00"`). مع `min` بتكوّن نطاق مسموح، وبتتحكم مع [[attr-step]] في القيم الممكنة. ملاحظة: لو لم تكتب `max` مع `range`، الافتراضي **100**. ومع `progress` الافتراضي **1** (يعني القيمة من 0 لـ 1 أو لحد max).

مثال شائع: عدد التذاكر في الحجز `max="5"`، والمتبقي من المخزون `max` ديناميكي. وفي JS: `validity.rangeOverflow` بتقولك لو القيمة أكبر من الحد. ومتنساش إن `max` للأرقام والتواريخ فقط، أما لطول النص استخدم [[attr-maxlength]].

## try

```html
<label>عدد التذاكر (لحد 5): <input id="n" type="number" max="5" value="8"></label>
<button onclick="o.textContent = n.validity.rangeOverflow ? 'أكبر من المسموح ❌' : 'تمام ✅'">افحص</button>
<p id="o"></p>
```

## syntax

```html nolive
<input type="number" max="10">
<progress value="30" max="100"></progress>
<input type="date" max="2026-12-31">
```

- `max` — أكبر قيمة مسموحة.
- في `progress`: نهاية المقياس.
- لطول النص استخدم `maxlength`.

## use

- حد أقصى لكمية أو عمر أو درجة.
- نطاق تواريخ مسموح.
- مؤشر تقدّم (`progress`) أو مقياس (`meter`).

## avoid

- متستخدمش `max` لطول النص: ده `maxlength`.
- متنساش الحد الأقصى في السيرفر.

## examples

### 1) progress
نهاية المقياس.

```html
<progress value="30" max="50"></progress> 30 من 50
```

- `max` هي نهاية الشريط.
- `value` القيمة الحالية.
- الافتراضي `max=1`.

### 2) meter
مقياس.

```html
<meter value="7" min="0" max="10" high="8" optimum="10">7/10</meter> 7 من 10
```

- `min` و`max` يحددوا المدى.
- `high` و`low` للألوان.
- مش للتقدّم: ده `progress`.

### 3) تاريخ لحد النهارده
max ديناميكي.

```html
<input id="d" type="date">
<script>d.max = new Date().toISOString().slice(0, 10)</script>
<small>تاريخ الميلاد (مش في المستقبل)</small>
```

- تاريخ الميلاد مش مستقبلي.
- نحدّث `max` بالكود.
- السيرفر يتأكد.

### 4) نطاق شريط
مثال على range.

```html
<input type="range" min="0" max="200" value="120" oninput="o.value = this.value">
<output id="o">120</output>
```

- الحد الأقصى للسحب 200.
- الافتراضي لو مفيش max = 100.
- عرض القيمة بـ `output`.

## mistakes

### max للنص
```html bad
<input type="text" max="20">
```
```html good
<input type="text" maxlength="20">
```
ليه؟ `max` للأرقام والتواريخ. لطول النص `maxlength`.

### max أقل من القيمة الافتراضية
```html bad
<input type="range" max="10" value="50">
```
```html good
<input type="range" max="100" value="50">
```
ليه؟ القيمة الافتراضية بتتقصّ لـ max.

## a11y

- اذكر الحد المسموح في نص ظاهر.
- `progress` مع label بيشرح التقدّم.
- رسالة الخطأ تذكر الحد.

## quiz

### لحد أقصى لطول النص؟
- [x] `maxlength`
- [ ] `max`
- [ ] `limit`
- [ ] `length`
`max` للأرقام.

### الافتراضي لـ range؟
- [x] 100
- [ ] 10
- [ ] 1
- [ ] مفيش
من 0 لـ 100.

### في `progress` بتعني؟
- [x] نهاية المقياس
- [ ] القيمة الحالية
- [ ] اللون
- [ ] الاسم
الـ value هي الحالية.

## refs

- [MDN: max](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/max)
- [MDN: progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress)
