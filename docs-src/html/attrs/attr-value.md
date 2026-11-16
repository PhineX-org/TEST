---
id: attr-value
kind: attribute
cat: attrs
chip: value
title: خاصية القيمة
en: HTML value attribute
status: stable
support: all
mdn: Elements/input#value
summary: خاصية value بتحدد القيمة المبدئية للحقل أو القيمة اللي بتتبعت لما العنصر يتختار (radio, checkbox, option, button). هي الجزء الثاني في name=value.
keywords: value, قيمة, defaultValue, input value, option value, radio value, button value, li value, data, progress, meter
related: input, option, button, li, attr-name, input-radio
---

## intro

`value` بتحدد **القيمة** اللي بتتبعت مع الفورم، فهي نص `name=value`: الـ [[attr-name]] هو اسم الصندوق، والـ `value` هو اللي جواه. معناها بيتغيّر حسب العنصر:

**في حقول النص ([[input]]):** القيمة **المبدئية** اللي بتظهر في الحقل. المستخدم يقدر يغيّرها وبتتحدّث (`input.value` في JS بترجع الحالية، و`defaultValue` الأصلية). **في [[input-radio]] و[[input-checkbox]]:** القيمة اللي بتتبعت **لو اتعلّم** (الافتراضي `on`). **في [[option]]:** القيمة اللي بتتبعت لو اتختار (لو مكتبتش، بيتبعت نص الخيار نفسه). **في [[button]]/[[input-submit]]:** قيمة بتتبعت مع الفورم لتعرف أنهي زرار اتضغط، وفي `<input type="button|submit">` هي كمان **النص اللي على الزرار**. وبتظهر كمان في [[li]] (رقم عنصر `ol`) و`progress` و`meter` و`data`.

لو عايز تغيّر الحقل بعدين من الكود: `input.value = '...'`، مش `setAttribute` (ده بيغيّر الأصلية بس لو المستخدم لمس الحقل).

## try

```html
<input id="i" value="أحمد" placeholder="اسمك">
<button onclick="o.textContent = 'الحالية: ' + i.value + ' | الأصلية: ' + i.defaultValue">قارن</button>
<p id="o"></p>
```

## syntax

```html nolive
<input name="city" value="القاهرة">
<option value="cairo">القاهرة</option>
<input type="radio" name="size" value="L">
<button name="act" value="delete">حذف</button>
```

- حقل نص: القيمة المبدئية.
- radio/checkbox/option: القيمة المبعوتة لو اتختار.
- زرار: قيمة بتتبعت + النص (في `input`).

## use

- قيمة مبدئية لحقل.
- تحديد القيمة المبعوتة لخيار.
- تمييز بين أزرار إرسال.
- ترقيم `li` في `ol`.

## avoid

- متحطش value في `type="password"` أو "file" (لا فايدة ولا أمان).
- متفتكرش إن تغيير value في الـ HTML يغيّر حقل المستخدم بعد ما بدأ يكتب.

## examples

### 1) قيمة مختلفة عن النص
مثال على option.

```html
<select id="s" onchange="o.textContent = 'اتبعت: ' + this.value">
  <option value="">اختار…</option>
  <option value="eg">مصر 🇪🇬</option>
  <option value="sa">السعودية 🇸🇦</option>
</select>
<p id="o"></p>
```

- النص للمستخدم والـ value للسيرفر.
- كود البلد أنضف من الاسم.
- من غير value بيتبعت النص.

### 2) تمييز الأزرار
name وvalue للزرار.

```html
<form onsubmit="event.preventDefault(); o.textContent = event.submitter.name + '=' + event.submitter.value">
  <button name="action" value="save">حفظ</button>
  <button name="action" value="delete">حذف</button>
</form>
<p id="o" dir="ltr"></p>
```

- السيرفر يعرف مين الزرار اللي اتضغط.
- مفيد لأكتر من إجراء في فورم واحد.
- الزرار المتضغط بس هو اللي بيتبعت.

### 3) value مقابل defaultValue
الأصلية مقابل الحالية.

```html
<input id="i" value="أصل">
<button onclick="i.value = 'جديد'; o.textContent = i.value + ' / ' + i.defaultValue">غيّر</button>
<button onclick="i.value = i.defaultValue">رجّع الأصل</button>
<p id="o"></p>
```

- `defaultValue` بيعكس خاصية HTML.
- `value` الحالية.
- reset الفورم بيرجّع لـ `defaultValue`.

### 4) ترقيم من 5
مثال على li value.

```html
<ol><li>أول</li><li value="5">خامس</li><li>سادس</li></ol>
```

- `value` على `li` بتغيّر الرقم.
- اللي بعده بيكمّل.
- في `ul` مفيش تأثير.

## mistakes

### option من غير value بنصوص طويلة
```html bad
<option>القاهرة (مصر)</option>
```
```html good
<option value="cairo">القاهرة (مصر)</option>
```
ليه؟ بيتبعت النص كله بدل كود ثابت.

### radio من غير value
```html bad
<input type="radio" name="p"> كاش
```
```html good
<input type="radio" name="p" value="cash"> كاش
```
ليه؟ هيتبعت "on" لكل الخيارات.

## a11y

- value مش بيتقري لقارئ الشاشة في الـ option/radio: الـ label هو اللي بيتقري.
- حط قيمة مبدئية مفهومة للمستخدم (مثال) بس لا تغني عن label.
- placeholder مش بديل عن value.

## quiz

### radio بدون `value` بيبعت؟
- [x] `on`
- [ ] فاضي
- [ ] الاسم
- [ ] مفيش
الافتراضي.

### الحالية لحقل؟
- [x] `input.value`
- [ ] `input.defaultValue`
- [ ] `input.text`
- [ ] `input.data`
defaultValue للأصلية.

### option من غير value؟
- [x] بيتبعت نص الخيار
- [ ] مبيتبعتش
- [ ] بيتبعت رقمه
- [ ] خطأ
النص بيستخدم.

## refs

- [MDN: value](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#value)
- [WHATWG: The value attribute](https://html.spec.whatwg.org/multipage/input.html#the-value-attribute)
