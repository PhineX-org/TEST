---
id: attr-maxlength
kind: attribute
cat: attrs
chip: maxlength
title: خاصية أقصى طول
en: HTML maxlength attribute
status: stable
support: all
size: compact
mdn: Attributes/maxlength
summary: خاصية maxlength بتحدد أقصى عدد حروف مسموح في input وtextarea: المتصفح بيمنع الكتابة بعد الحد. لو الكود حط قيمة أطول بتفضل ومتتقصّش بس بتفشل الفحص.
keywords: maxlength, أقصى طول, tooLong, عداد حروف, textarea, input, minlength, حد الكتابة, طول النص
related: input-text, textarea, attr-minlength, attr-max, attr-pattern, attr-size
---

## intro

`maxlength` بتحدد **أقصى عدد حروف** يقدر المستخدم يكتبه: المتصفح **بيمنع الكتابة** بعد الوصول للحد (على عكس `min` اللي بيفحص عند الإرسال). بتشتغل على [[input-text]] والأنواع النصية و[[textarea]]. الحرف الواحد بيتحسب كـ **وحدات UTF-16**، فبعض الإيموجي بيتحسب بحرفين! ومتخلطش بينها وبين [[attr-max]] (اللي للأرقام والتواريخ) أو [[attr-size]] (العرض المرئي للحقل فقط). وبتتكامل مع عدّاد حروف بسيط بالجافاسكربت يوضّح للمستخدم كام باقي.

## try

```html
<textarea id="t" maxlength="50" rows="2" placeholder="لحد 50 حرف" oninput="c.textContent = (50 - this.value.length) + ' باقي'"></textarea>
<span id="c">50 باقي</span>
```

## syntax

```html nolive
<input maxlength="20">
<textarea maxlength="200"></textarea>
```

- `maxlength="N"` — أقصى حروف.
- بيمنع الكتابة بعد الحد.
- الإيموجي ممكن يتحسب بحرفين.

## use

- حد لاسم أو عنوان أو رسالة.
- تعليق بحد حروف (مثل 280).

## avoid

- متخلطش بينها وبين `max` أو `size`.

## examples

### 1) عدّاد حروف
مثال على oninput.

```html
<input id="i" maxlength="10" oninput="c.textContent = this.value.length + '/10'" placeholder="10 حروف">
<span id="c">0/10</span>
```

- العدّاد بيعرّف المستخدم.
- الحقل بيمنع الزيادة.
- اعرضه قبل الوصول للحد.

### 2) نطاق كامل
مثال على minlength + maxlength.

```html
<input minlength="3" maxlength="12" placeholder="3 لـ 12">
```

- الأدنى فحص، الأقصى منع.
- مناسب لأسماء المستخدمين.
- اكتب القاعدة في نص ظاهر.

### 3) قيمة من الكود
مثال على tooLong.

```html
<input id="i" maxlength="3">
<script>i.value = 'طويل جداً'; document.write('<p>' + i.value.length + ' حرف، tooLong=' + i.validity.tooLong + '</p>')</script>
```

- الكود يقدر يتخطّى المنع.
- `tooLong` بتفعّل بس بعد تعديل المستخدم.
- السيرفر لازم يقص أو يرفض.

## mistakes

### max للنص
```html bad
<input type="text" max="20">
```
```html good
<input type="text" maxlength="20">
```
ليه؟ `max` للأرقام والتواريخ فقط.

## a11y

- اعرض العدّاد بنص (`aria-live="polite"` للإعلان).
- لا تقطع كلام المستخدم بصمت: نبّهه قبل الحد.

## quiz

### maxlength بتعمل إيه؟
- [x] بتمنع الكتابة بعد الحد
- [ ] بتفحص عند الإرسال فقط
- [ ] بتخفي الزيادة
- [ ] بتكبّر الحقل
منع مباشر.

### للأرقام؟
- [x] `max`
- [ ] `maxlength`
- [ ] `size`
- [ ] `limit`
maxlength للنصوص.

## refs

- [MDN: maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength)
- [MDN: tooLong](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong)
