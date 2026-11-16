---
id: input-date
kind: inputtype
cat: input-types
chip: type="date"
title: حقل التاريخ
en: <input type="date">
status: stable
support: all
mdn: Elements/input/date
summary: type="date" بيفتح منتقي تاريخ (تقويم) من المتصفح، والقيمة دايماً بصيغة YYYY-MM-DD مهما كان شكل العرض. بيدعم min وmax وvalueAsDate.
keywords: input date, تاريخ, تقويم, date picker, YYYY-MM-DD, min, max, valueAsDate, تاريخ الميلاد, حجز
related: input, input-time, input-datetime-local, input-month, attr-min, attr-max, time
---

## intro

بدل ما تخلّي المستخدم يكتب التاريخ بإيده (وكل واحد يكتبه بشكل: 5/11 و11-5 و٥ نوفمبر)، المتصفح بيدّيه **منتقي تاريخ (تقويم)** يختار منه بالضغط. وده بيقلل الأخطاء جداً ويتكيّف مع لغة وإعدادات جهاز المستخدم.

القاعدة الأهم: **الشكل اللي بيظهر للمستخدم** بيختلف حسب لغة المتصفح، لكن **القيمة اللي بتتبعت وبتقراها في `value`** دايماً بصيغة ثابتة **`YYYY-MM-DD`** (مثلاً `2026-11-06`). يعني لما تحط `value="..."` أو `min="..."` أو `max="..."` لازم بنفس الصيغة دي. استخدم [[attr-min]] و[[attr-max]] عشان تمنع تواريخ مش منطقية (زي تاريخ ميلاد في المستقبل). ولو محتاج التاريخ والوقت مع بعض شوف [[input-datetime-local]].

## try

```html
<label>تاريخ الميلاد: <input id="d" type="date" min="1950-01-01" max="2026-11-06" value="2000-01-01" onchange="o.textContent = 'القيمة اللي بتتبعت: ' + this.value"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="date" name="d" min="2026-01-01" max="2026-12-31" value="2026-11-06">
```

- `value` و`min` و`max` — كلهم بصيغة `YYYY-MM-DD`.
- `valueAsDate` — القيمة ككائن Date في JS.
- شكل العرض بيتحدد من المتصفح.

## use

- تاريخ الميلاد.
- حجوزات ومواعيد.
- فلترة بين تاريخين.

## avoid

- متكتبش القيمة بصيغة غير YYYY-MM-DD.
- متعتمدش على شكل العرض: خد القيمة من `value`.

## examples

### 1) مدى تواريخ
min وmax.

```html
<label>من <input id="a" type="date" value="2026-11-01"></label>
<label>إلى <input id="b" type="date" value="2026-11-10"></label>
<button onclick="o.textContent = ((b.valueAsDate - a.valueAsDate) / 864e5) + ' يوم'">احسب</button>
<p id="o"></p>
```

- `valueAsDate` بيدّي كائن Date.
- الفرق بالملي ثانية ÷ 86400000 = أيام.
- ممكن تتحقق إن النهاية بعد البداية.

### 2) تاريخ اليوم كقيمة مبدئية
مثال على JS.

```html
<input id="d" type="date">
<script>d.value = new Date().toISOString().slice(0, 10);</script>
```

- `toISOString().slice(0,10)` بيدّي `YYYY-MM-DD`.
- ملاحظة: بتوقيت UTC.
- لتوقيتك المحلي استخدم `toLocaleDateString("en-CA")`.

### 3) منع الماضي
min ديناميكي.

```html
<input id="d" type="date">
<script>d.min = new Date().toISOString().slice(0, 10);</script>
```

- الحجز مينفعش في الماضي.
- الـ `min` بيتحط بالكود عشان يتحدّث.
- اتأكد منه في السيرفر كمان.

### 4) اسم اليوم
مثال على toLocaleDateString.

```html
<input id="d" type="date" value="2026-11-06" onchange="o.textContent = this.valueAsDate.toLocaleDateString('ar-EG', {weekday:'long', timeZone:'UTC'})">
<p id="o"></p>
```

- `timeZone:"UTC"` عشان مايتحركش اليوم.
- بيعرض اسم اليوم بالعربي.
- مفيد لتأكيد الحجز.

## mistakes

### صيغة غلط للقيمة
```html bad
<input type="date" value="06/11/2026">
```
```html good
<input type="date" value="2026-11-06">
```
ليه؟ القيمة لازم YYYY-MM-DD وإلا الحقل هيفضل فاضي.

### الاعتماد على شكل العرض
```html bad
<script>alert(d.value.split('/'))</script>
```
```html good
<script>alert(d.value.split('-'))</script>
```
ليه؟ القيمة دايماً بشرطات: الشكل المعروض شيء تاني.

## a11y

- اربطه بـ label واضح.
- متدعمش المتصفحات القديمة: وفّر صيغة مكتوبة كبديل.
- ذكّر المستخدم بالصيغة لو الحقل ممكن يتحوّل لنص.

## quiz

### صيغة `value` للتاريخ؟
- [x] `YYYY-MM-DD`
- [ ] `DD/MM/YYYY`
- [ ] `MM-DD-YYYY`
- [ ] حسب اللغة
ثابتة.

### الحدود؟
- [x] `min` و`max`
- [ ] `from` و`to`
- [ ] `start`
- [ ] `range`
نفس الأرقام.

### قيمة ككائن Date؟
- [x] `valueAsDate`
- [ ] `dateValue`
- [ ] `asDate`
- [ ] `toDate`
خاصية DOM.

## refs

- [MDN: date](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date)
- [WHATWG: Date state](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date))
