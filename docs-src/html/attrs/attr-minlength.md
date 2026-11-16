---
id: attr-minlength
kind: attribute
cat: attrs
chip: minlength
title: خاصية أقل طول
en: HTML minlength attribute
status: stable
support: all
size: compact
mdn: Attributes/minlength
summary: خاصية minlength بتحدد أقل عدد حروف مسموح في input وtextarea. بتفحص عند الإرسال بس لو المستخدم كتب (الفاضي بيعدّي)، ورسالة الخطأ بتقول الحد المطلوب.
keywords: minlength, أقل طول, tooShort, validation, password, textarea, حروف, maxlength, طول النص
related: input-text, input-password, textarea, attr-maxlength, attr-required, attr-pattern
---

## intro

`minlength` بتفرض **حد أدنى لعدد الحروف**: الباسورد 8 حروف على الأقل، التعليق 10 حروف. بتشتغل على [[input-text]] و[[input-password]] و`email` و`url` و`search` و`tel` و[[textarea]]. والفحص بيحصل عند الإرسال، وبيظهر رسالة «زوّد عدد الحروف». **تنبيه:** القيمة **الفاضية بتعدّي** الفحص (لأنه مفيش حاجة تتفحص)، فاستخدم [[attr-required]] معاها لو عايزه إلزامي. كمان فحص `tooShort` مبيشتغلش إلا لو المستخدم **عدّل القيمة بإيده** (مش لو الكود حطها).

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'عدّى ✅'">
  <input type="password" minlength="8" required placeholder="8 حروف على الأقل">
  <button>تسجيل</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input type="password" minlength="8" required>
<textarea minlength="10" required></textarea>
```

- `minlength="N"` — أقل عدد حروف.
- الفاضي بيعدّي (ضيف `required`).
- الأقصى: `maxlength`.

## use

- حد أدنى للباسورد.
- نص قصير لا يقل عن عدد حروف.

## avoid

- متعتمدش على الطول كمقياس وحيد لقوة الباسورد.

## examples

### 1) حد أدنى للتعليق
مثال على textarea.

```html
<textarea minlength="10" required placeholder="10 حروف على الأقل" rows="2"></textarea>
```

- الفحص عند الإرسال.
- الرسالة بتقول الحد.
- مع `required` عشان الفاضي ميعدّيش.

### 2) فحص بالجافاسكربت
مثال على tooShort.

```html
<input id="i" minlength="5" value="abc">
<button onclick="i.reportValidity(); o.textContent = i.validity.tooShort ? 'قصير ❌' : 'تمام'">افحص</button>
<p id="o"></p>
```

- `validity.tooShort`.
- `reportValidity()` بتعرض الرسالة.
- مش بيفعل لو القيمة اتحطت بالكود.

### 3) مع maxlength
نطاق.

```html
<input minlength="3" maxlength="12" placeholder="3 لـ 12 حرف">
```

- الحد الأقصى بيمنع الكتابة.
- الحد الأدنى بيفحص عند الإرسال.
- ممتاز لاسم المستخدم.

## mistakes

### الاعتماد عليها للإلزامي
```html bad
<input minlength="3">
```
```html good
<input minlength="3" required>
```
ليه؟ الفاضي بيعدّي من minlength.

## a11y

- اكتب الحد الأدنى في نص ظاهر.
- رسالة الخطأ لازم توضّح كام حرف ناقص.

## quiz

### هل الحقل الفاضي بيفشل؟
- [x] لأ، بيعدّي
- [ ] أيوه
- [ ] لو required فقط
- [ ] دايماً
ضيف required.

### الحد الأقصى؟
- [x] `maxlength`
- [ ] `max`
- [ ] `limit`
- [ ] `maxchars`
للنصوص.

## refs

- [MDN: minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength)
- [MDN: tooShort](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort)
