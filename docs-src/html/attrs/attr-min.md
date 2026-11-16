---
id: attr-min
kind: attribute
cat: attrs
chip: min
title: خاصية الحد الأدنى
en: HTML min attribute
status: stable
support: all
mdn: Attributes/min
summary: خاصية min بتحدد أصغر قيمة مسموحة لحقول number وrange وdate وtime وmonth وweek وdatetime-local، وبتتطبّق أيضاً على meter وprogress. القيمة بنفس صيغة الحقل.
keywords: min, الحد الأدنى, rangeUnderflow, number, range, date, time, validation, step, الحد الأقصى, نطاق
related: input-number, input-range, input-date, attr-max, attr-step, meter
---

## intro

`min` بتحدد **أصغر قيمة مسموحة** للحقل. المتصفح بيفحص عند الإرسال: لو القيمة **أقل** من الحد بيمنع ويعرض رسالة («القيمة لازم تكون أكبر من أو تساوي كذا»). بتشتغل مع [[input-number]] و[[input-range]] والتواريخ والأوقات ([[input-date]] و[[input-time]] و`month` و`week` و`datetime-local`)، ومع [[meter]] (بتحدد بداية المقياس).

**قيمة `min` لازم تكون بنفس صيغة نوع الحقل:** رقم في number وrange (`min="1"`)، وتاريخ `YYYY-MM-DD` في date (`min="2026-01-01"`)، ووقت `HH:MM` في time. ومع `max` بتكوّن **نطاق** مسموح. وبتتكامل مع [[attr-step]] في تحديد القيم المسموحة (الخطوات بتتحسب من `min`).

أمثلة عملية: العمر `min="0"`، الكمية `min="1"`، حجز بتاريخ **من النهارده** (`min` ديناميكي بالجافاسكربت). وفي JS: `validity.rangeUnderflow` بتقولك لو القيمة أقل من الحد. وفي CSS الـ `:in-range` و`:out-of-range` للتنسيق. ومتنساش: الحد على الواجهة تسهيل، السيرفر لازم يتأكد.

## try

```html
<label>الكمية (1 فأكتر): <input id="n" type="number" min="1" value="0"></label>
<button onclick="o.textContent = n.validity.rangeUnderflow ? 'أقل من الحد ❌' : 'تمام ✅'">افحص</button>
<p id="o"></p>
```

## syntax

```html nolive
<input type="number" min="1">
<input type="date" min="2026-01-01">
<input type="range" min="0" max="100">
```

- `min` — أصغر قيمة مسموحة.
- صيغتها نفس صيغة النوع (رقم، تاريخ، وقت).
- مع `max` بتكوّن نطاق.

## use

- كميات وأعمار وأسعار بحد أدنى.
- تواريخ حجز من اليوم.
- بداية مقياس `meter` أو `range`.

## avoid

- متكتبش `min` بصيغة غلط (مثلاً تاريخ بـ /).
- متعتمدش عليه وحده في السيرفر.

## examples

### 1) نطاق عمر
min وmax.

```html
<input type="number" min="18" max="65" value="16"> <small>العمر 18–65</small>
```

- القيمة 16 برّه النطاق.
- الحقل بيبقى `:out-of-range`.
- رسالة الخطأ بتظهر عند الإرسال.

### 2) تاريخ من النهارده
min ديناميكي.

```html
<input id="d" type="date">
<script>d.min = new Date().toISOString().slice(0, 10)</script>
```

- `toISOString().slice(0,10)` بيدّي `YYYY-MM-DD`.
- التواريخ القديمة معطّلة.
- السيرفر لازم يتأكد.

### 3) تنسيق :out-of-range
مثال على CSS.

```html
<style>input:out-of-range { outline:2px solid #ef4444 }</style>
<input type="number" min="1" max="10" value="15">
```

- بيطابق القيم برّه النطاق.
- مفيد للتغذية الراجعة.
- متحطش لون بس: ضيف نص.

### 4) range مع min
شريط.

```html
<input type="range" min="10" max="50" value="30" oninput="o.value = this.value">
<output id="o">30</output>
```

- الشريط بيبدأ من 10.
- القيمة الافتراضية 30.
- الـ step بيتحسب من `min`.

## mistakes

### تاريخ بصيغة غلط
```html bad
<input type="date" min="01/01/2026">
```
```html good
<input type="date" min="2026-01-01">
```
ليه؟ لازم YYYY-MM-DD.

### min أكبر من max
```html bad
<input type="number" min="10" max="5">
```
```html good
<input type="number" min="5" max="10">
```
ليه؟ النطاق منطقياً مستحيل.

## a11y

- اذكر الحد المسموح في label أو نص مساعد.
- رسالة الخطأ لازم توضّح الحد.
- القارئ بيعلن min/max مع الحقل أحياناً.

## quiz

### `min` على date بصيغة؟
- [x] `YYYY-MM-DD`
- [ ] `DD/MM/YYYY`
- [ ] رقم
- [ ] نص حر
نفس صيغة النوع.

### خاصية JS للفحص؟
- [x] `validity.rangeUnderflow`
- [ ] `validity.tooLow`
- [ ] `validity.minError`
- [ ] `min.error`
أقل من الحد.

### بتشتغل مع text؟
- [x] لأ
- [ ] أيوه
- [ ] لو رقم
- [ ] مع pattern
للأرقام والتواريخ.

## refs

- [MDN: min](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/min)
- [MDN: :in-range](https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range)
