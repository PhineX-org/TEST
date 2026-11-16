---
id: input-time
kind: inputtype
cat: input-types
chip: type="time"
title: حقل الوقت
en: <input type="time">
status: stable
support: all
mdn: Elements/input/time
summary: type="time" بيفتح منتقي وقت (ساعة ودقيقة، واختيارياً ثواني)، والقيمة بصيغة 24 ساعة HH:MM مهما كان شكل العرض. بيدعم min وmax وstep.
keywords: input time, وقت, ساعة, دقيقة, HH:MM, 24 ساعة, step, منتقي وقت, موعد
related: input, input-date, input-datetime-local, attr-min, attr-max, attr-step, time
---

## intro

حقل لاختيار **وقت من اليوم** (ساعة ودقيقة) من غير تاريخ: وقت فتح محل، منبّه، موعد اجتماع متكرر. المتصفح بيعرض منتقي حسب إعدادات الجهاز (ممكن 12 ساعة بـ AM/PM)، لكن **القيمة اللي بتقراها دايماً بصيغة 24 ساعة `HH:MM`** (مثلاً `14:30` للساعة 2:30 م).

تحكم في النطاق بـ [[attr-min]] و[[attr-max]] (ساعات العمل مثلاً)، وفي الدقة بـ [[attr-step]] بالثواني: الافتراضي 60 (دقيقة)، و`step="900"` يعني كل 15 دقيقة، و`step="1"` يظهر الثواني. لو محتاج التاريخ مع الوقت استخدم [[input-datetime-local]]. ومتنساش إن العرض (12 أو 24 ساعة، AM أو م) بيحدده جهاز المستخدم، فمتفترضش شكل معيّن في الواجهة بتاعتك.

## try

```html
<label>ميعاد الاجتماع: <input id="t" type="time" value="14:30" min="09:00" max="18:00" step="900" onchange="o.textContent = 'القيمة: ' + this.value"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="time" name="t" min="09:00" max="18:00" step="900" value="14:30">
```

- القيمة بصيغة 24 ساعة `HH:MM` (أو `HH:MM:SS`).
- `step` بالثواني (900 = ربع ساعة).
- `min` و`max` — ساعات مسموحة.

## use

- مواعيد وساعات عمل.
- منبّهات وتذكيرات.
- حجوزات في فترات محددة.

## avoid

- متتوقعش 12 ساعة في `value`.
- متنساش `step` لو عايز فترات (15 دقيقة).

## examples

### 1) كل 15 دقيقة
مثال على step.

```html
<input type="time" step="900" value="10:00">
```

- 900 ثانية = 15 دقيقة.
- المتصفح بيعرض القيم المطابقة للخطوة.
- القيم الأخرى بتتحسب خطأ.

### 2) ساعات العمل
min وmax.

```html
<input id="t" type="time" min="09:00" max="17:00" value="08:00">
<button onclick="o.textContent = t.validity.valid ? 'تمام' : 'برّه ساعات العمل ❌'">افحص</button>
<p id="o"></p>
```

- الساعة 8 قبل الحد الأدنى.
- `validity.valid` بيرجّع false.
- السيرفر لازم يتأكد كمان.

### 3) تحويل لـ 12 ساعة
عرض بشكل مألوف.

```html
<input id="t" type="time" value="14:30" onchange="o.textContent = new Date('1970-01-01T' + this.value).toLocaleTimeString('ar-EG', {hour:'numeric', minute:'2-digit'})">
<p id="o"></p>
```

- القيمة 24 ساعة، والعرض بيتحول.
- `toLocaleTimeString` بيراعي اللغة.
- استخدمه في رسائل التأكيد.

### 4) ثواني
مثال على step=1.

```html
<input type="time" step="1" value="12:00:30">
```

- `step="1"` بيعرض الثواني.
- القيمة بتبقى `HH:MM:SS`.
- نادراً ما تحتاجها.

## mistakes

### قيمة 12 ساعة
```html bad
<input type="time" value="2:30 PM">
```
```html good
<input type="time" value="14:30">
```
ليه؟ القيمة لازم 24 ساعة.

### وقت من غير فحص نطاق
```html bad
<input type="time" name="t">
```
```html good
<input type="time" name="t" min="09:00" max="17:00">
```
ليه؟ لو فيه ساعات عمل حدّدها.

## a11y

- اربطه بـ label واضح.
- وفّر طريقة كتابة مباشرة (المتصفحات الحديثة بتدعمها).
- متعتمدش على المنتقي بس للموبايل والكمبيوتر.

## quiz

### صيغة `value` للوقت؟
- [x] `HH:MM` بـ 24 ساعة
- [ ] `hh:mm AM/PM`
- [ ] ثواني بس
- [ ] نص حر
ثابتة.

### كل ربع ساعة؟
- [x] `step="900"`
- [ ] `step="15"`
- [ ] `step="1"`
- [ ] `step="60"`
900 ثانية.

### الحدود؟
- [x] `min` و`max`
- [ ] `from`
- [ ] `start`
- [ ] `range`
بنفس الصيغة.

## refs

- [MDN: time](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time)
- [WHATWG: Time state](https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time))
