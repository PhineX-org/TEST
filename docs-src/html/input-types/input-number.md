---
id: input-number
kind: inputtype
cat: input-types
chip: type="number"
title: حقل الأرقام
en: <input type="number">
status: stable
support: all
mdn: Elements/input/number
summary: type="number" حقل لأرقام حسابية بأسهم زيادة ونقصان وتحقق من min وmax وstep. مش مناسب للتليفون أو الرقم القومي أو أي رقم مش بتحسب بيه.
keywords: input number, رقم, min, max, step, valueAsNumber, أسهم, عجلة الفأرة, كمية, عدد صحيح, عشري
related: input, input-range, attr-min, attr-max, attr-step, input-tel
---

## intro

حقل لإدخال **أرقام تحسب بيها**: كمية منتج، عمر، سعر، درجة. بيظهر فيه **أسهم صغيرة** للزيادة والنقصان، وكيبورد الموبايل بيعرض أرقام. تحكم في الحدود بـ [[attr-min]] و[[attr-max]] و[[attr-step]] (خطوة الزيادة). والمتصفح بيرفض أي قيمة برّه الحدود أو مش على الخطوة (لو step=5 فـ 7 غلط).

اللي بيقع فيه الناس كتير: **متستخدمش number لأي رقم مش بتحسب بيه** زي رقم التليفون أو الرقم القومي أو الكود البريدي: هيشيل الأصفار اللي في الأول، وعجلة الفأرة ممكن تغيّر القيمة بالغلط. ولو عايز أرقام عشرية لازم تحدد `step="any"` أو `step="0.01"`، وإلا (الافتراضي step=1) هيعتبر 1.5 غلط. وفي الجافاسكربت `input.value` بترجع **نص**، استخدم `valueAsNumber` للرقم.

## try

```html
<label>الكمية: <input id="n" type="number" min="1" max="10" step="1" value="1" oninput="o.textContent = 'الإجمالي: ' + (this.valueAsNumber * 25) + ' جنيه'"></label>
<p id="o">الإجمالي: 25 جنيه</p>
```

## syntax

```html nolive
<input type="number" name="qty" min="1" max="10" step="1" value="1">
```

- `min` و`max` — الحدود.
- `step` — الخطوة (أو `any` لأي عشري).
- `valueAsNumber` — القيمة كرقم في JS.

## use

- كميات وأسعار وأعمار ودرجات.
- أي رقم بتحسب بيه أو بتقارنه.
- حدود واضحة عندك (min/max).

## avoid

- متستخدمهوش للتليفون أو الرقم القومي أو الكود البريدي.
- متنساش `step` لو محتاج عشري.

## examples

### 1) سعر بكسور
step عشري.

```html
<input type="number" min="0" step="0.01" value="9.99"> جنيه
```

- `step="0.01"` بيسمح بقرشين.
- من غيره 9.99 هتتعامل كخطأ.
- `step="any"` بيسمح بأي عدد.

### 2) قراءة كرقم
مثال على valueAsNumber.

```html
<input id="a" type="number" value="5"> + <input id="b" type="number" value="3">
<button onclick="o.textContent = a.valueAsNumber + b.valueAsNumber">اجمع</button>
<p id="o"></p>
```

- `valueAsNumber` بيرجّع رقم حقيقي.
- `.value` بيرجّع نص: "5"+"3" = "53".
- تحقق من `isNaN` لو الحقل فاضي.

### 3) رسالة حدود
مثال على validity.

```html
<input id="n" type="number" min="1" max="10" value="15">
<button onclick="o.textContent = n.validity.rangeOverflow ? 'أكبر من الحد ❌' : 'تمام ✅'">افحص</button>
<p id="o"></p>
```

- `rangeOverflow` لو أكبر من max.
- `rangeUnderflow` لو أقل من min.
- `stepMismatch` لو مش على الخطوة.

### 4) زرارين بدل الأسهم
stepUp وstepDown.

```html
<button onclick="n.stepDown()">−</button>
<input id="n" type="number" value="1" min="0" max="9" style="width:60px; text-align:center">
<button onclick="n.stepUp()">+</button>
```

- `stepUp()` و`stepDown()` تلتزم بـ min وmax وstep.
- تصميم عداد مخصّص.
- مفيد على الموبايل.

### 5) تعطيل العجلة
خطر تغيير بالغلط.

```html
<input type="number" value="5" onwheel="this.blur()">
```

- عجلة الفأرة بتغيّر القيمة وانت بتعمل scroll.
- `blur()` بيطلع الفوكس فمفيش تغيير.
- تحسين بسيط لتجربة أفضل.

## mistakes

### number للتليفون
```html bad
<input type="number" name="phone">
```
```html good
<input type="tel" name="phone">
```
ليه؟ هيشيل الصفر ويضيف أسهم ملهاش لازمة.

### نسيان step للعشري
```html bad
<input type="number" value="1.5">
```
```html good
<input type="number" step="0.1" value="1.5">
```
ليه؟ الافتراضي step=1 فالقيم العشرية بتتحسب خطأ في الفحص.

## a11y

- اربطه بـ label يوضح الوحدة (جنيه، قطعة).
- وضّح الحدود (من 1 إلى 10) في نص مجاور.
- ممكن `inputmode="numeric"` مع `pattern` بديل للأرقام الصحيحة بدون أسهم.

## quiz

### `.value` في الحقل بترجع؟
- [x] نص
- [ ] رقم
- [ ] boolean
- [ ] تاريخ
استخدم valueAsNumber للرقم.

### لقيم عشرية؟
- [x] `step="any"` أو step عشري
- [ ] `float`
- [ ] `decimal`
- [ ] مفيش داعي
الافتراضي step=1.

### هل تستخدم number للرقم القومي؟
- [x] لأ، بيشيل الأصفار
- [ ] أيوه
- [ ] لو طويل
- [ ] أحياناً
مش رقم حسابي.

## refs

- [MDN: number](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number)
- [WHATWG: Number state](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number))
