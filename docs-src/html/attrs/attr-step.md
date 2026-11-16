---
id: attr-step
kind: attribute
cat: attrs
chip: step
title: خاصية الخطوة
en: HTML step attribute
status: stable
support: all
size: compact
mdn: Attributes/step
summary: خاصية step بتحدد الخطوة المسموحة بين القيم في number وrange وdate وtime: 1 افتراضياً، أو any لأي قيمة. القيم بتتحسب من min، وبتحدد نط الزيادة بالأسهم.
keywords: step, خطوة, stepUp, stepDown, number, range, any, stepMismatch, عشري, min
related: input-number, input-range, attr-min, attr-max, input-time, input-date
---

## intro

`step` بتحدد **المسافة بين القيم المسموحة** في الحقل. في [[input-number]] و[[input-range]] الافتراضي **1** (أعداد صحيحة)، فلو كتبت `1.5` المتصفح يعتبرها خطأ (`stepMismatch`). عشان تسمح بكسور اكتب `step="0.01"` (قرشين) أو **`step="any"`** (أي قيمة). والقيم المسموحة بتتحسب **بدءاً من `min`**: لو `min="2" step="5"` فالمسموح 2 و7 و12… وبتتحكم كمان في **حجم الزيادة** لما المستخدم يضغط الأسهم، وفي `time` بالثواني (`step="900"` = ربع ساعة).

## try

```html
<label>سعر: <input id="n" type="number" step="0.5" min="0" value="1" oninput="o.textContent = n.validity.stepMismatch ? 'مش على الخطوة ❌' : 'تمام ✅'"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="number" step="0.01" min="0">
<input type="range" min="0" max="100" step="10">
<input type="time" step="900">
```

- `step="N"` — المسافة بين القيم (الافتراضي 1).
- `step="any"` — أي قيمة.
- القيم المسموحة من `min`.

## use

- أسعار بكسور (`0.01`).
- شريط بقفزات (`range step=10`).

## avoid

- متنساش `step` لو محتاج أرقام عشرية.

## examples

### 1) سعر
مثال على 0.01.

```html
<input type="number" step="0.01" min="0" value="9.99">
```

- السماح بقرشين.
- من غير step: 9.99 خطأ.
- الأسهم بتزيد 0.01.

### 2) شريط بقفزات
مثال على range.

```html
<input type="range" min="0" max="100" step="25" value="50" list="m"><datalist id="m"><option value="0"><option value="25"><option value="50"><option value="75"><option value="100"></datalist>
```

- المقبض بيقفز كل 25.
- علامات من datalist.
- مناسب لمستويات محددة.

### 3) stepUp وstepDown
مثال على JS.

```html
<input id="n" type="number" step="5" value="10">
<button onclick="n.stepUp()">+5</button> <button onclick="n.stepDown()">−5</button>
```

- بتحترم step وmin وmax.
- بتزيد/بتنقص بخطوة.
- مفيدة لعدّاد مخصّص.

## mistakes

### عشري من غير step
```html bad
<input type="number" value="1.5">
```
```html good
<input type="number" step="0.1" value="1.5">
```
ليه؟ الافتراضي step=1 فبيرفض الكسور.

## a11y

- وضّح للمستخدم الخطوة المسموحة (مثلاً "بالجنيه والقرش").
- الأسهم بتساعد ذوي صعوبات الكتابة.

## quiz

### الافتراضي لـ step؟
- [x] 1
- [ ] 0.1
- [ ] any
- [ ] 0
أعداد صحيحة.

### أي قيمة مسموحة؟
- [x] `step="any"`
- [ ] `step="0"`
- [ ] `step="*"`
- [ ] `step="all"`
بدون قيود.

## refs

- [MDN: step](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/step)
- [WHATWG: step](https://html.spec.whatwg.org/multipage/input.html#the-step-attribute)
