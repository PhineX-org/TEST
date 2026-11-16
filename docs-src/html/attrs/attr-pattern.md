---
id: attr-pattern
kind: attribute
cat: attrs
chip: pattern
title: خاصية النمط
en: HTML pattern attribute
status: stable
support: all
mdn: Attributes/pattern
summary: خاصية pattern بتحدد تعبيراً نمطياً (Regex) لازم قيمة الحقل تطابقه بالكامل، فتفحص الشكل (موبايل، كود) قبل الإرسال. بتشتغل مع text وtel وemail وurl وsearch وpassword.
keywords: pattern, regex, تعبير نمطي, validation, title, patternMismatch, text, tel, password, فحص شكل, regular expression
related: input, input-text, input-tel, attr-required, attr-minlength, attr-maxlength
---

## intro

الخاصية `pattern` بتخلّيك تفرض **شكل معيّن** للنص باستخدام **تعبير نمطي (Regular Expression أو Regex)**. مثلاً: «11 رقم يبدأ بـ 01» أو «حروف إنجليزية وأرقام بس، من 3 لـ 12». لما المستخدم يبعت الفورم والقيمة **مش مطابقة**، المتصفح بيوقف الإرسال ويعرض رسالة خطأ.

مهم تعرف: (1) النمط لازم يطابق **القيمة كلها** (زي ما لو كتبت `^…$`)، فمتكتبش الـ `^` و`$` بنفسك. (2) بتشتغل مع أنواع النص: [[input-text]] و[[input-tel]] و`email` و`url` و`search` و`password`، **مش** مع number أو date. (3) الحقل **الفاضي** بيعدّي من الـ pattern (استخدم [[attr-required]] لو عايزه إلزامي). (4) اكتب خاصية **`title`** بتوصف الشكل المطلوب: بتظهر في رسالة الخطأ وتفيد المستخدم.

الـ Regex في HTML بيستخدم نفس صيغة JavaScript (flag `v` في المتصفحات الحديثة). أمثلة شائعة: `[0-9]{4}` (4 أرقام)، `[A-Za-z]+` (حروف إنجليزية)، `01[0125][0-9]{8}` (موبايل مصري). ومتنساش: الفحص ده تسهيل للمستخدم فقط، السيرفر لازم يفحص برضه.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'عدّى ✅'">
  <label>اسم مستخدم: <input pattern="[A-Za-z0-9_]{3,12}" title="3 إلى 12 حرف إنجليزي أو رقم أو _" required></label>
  <button>تسجيل</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input type="text" pattern="[A-Za-z]{3,10}" title="3 إلى 10 حروف إنجليزية">
```

- `pattern` — Regex (من غير `^` و`$`).
- `title` — شرح الشكل (بيظهر في رسالة الخطأ).
- الحقل الفاضي بيعدّي (استخدم `required`).

## use

- موبايل، كود بريدي، اسم مستخدم.
- أي تنسيق ثابت (مثلاً `ABC-1234`).
- حدود على الحروف المسموحة.

## avoid

- متحطش `^` و`$`: بيتضافوا تلقائياً.
- متنساش `title` يشرح الشكل.

## examples

### 1) موبايل مصري
مثال على tel.

```html
<input type="tel" pattern="01[0125][0-9]{8}" title="11 رقم يبدأ بـ 010/011/012/015" placeholder="01XXXXXXXXX" required>
```

- `01` ثم الشبكة ثم 8 أرقام.
- `{8}` عدد التكرار.
- `[0125]` مجموعة أحرف.

### 2) كود المنتج
مثال على ABC-1234.

```html
<input pattern="[A-Z]{3}-[0-9]{4}" title="3 حروف كبيرة، شرطة، 4 أرقام (مثلاً ABC-1234)" placeholder="ABC-1234" required>
```

- الحروف الكبيرة `[A-Z]`.
- الشرطة حرفية.
- تنسيق ثابت.

### 3) باسورد قوي بسيط
مثال على lookahead.

```html
<input type="password" pattern="(?=.*[0-9])(?=.*[a-z]).{8,}" title="8 حروف على الأقل، وفيها رقم وحرف صغير" required>
```

- `(?=.*[0-9])` يعني "لازم يكون فيه رقم".
- الطول من `.{8,}`.
- الطول أهم من التعقيد.

### 4) فحص بالجافاسكربت
مثال على validity.patternMismatch.

```html
<input id="i" pattern="[0-9]{4}" value="12ab">
<button onclick="o.textContent = i.validity.patternMismatch ? 'مش مطابق ❌' : 'مطابق ✅'">افحص</button>
<p id="o"></p>
```

- `patternMismatch` بيبقى true لو غلط.
- `checkValidity()` تجمّع كل الفحوصات.
- `reportValidity()` بتعرض الرسالة.

## mistakes

### من غير title
```html bad
<input pattern="[A-Z]{3}-[0-9]{4}">
```
```html good
<input pattern="[A-Z]{3}-[0-9]{4}" title="مثال: ABC-1234">
```
ليه؟ الرسالة الافتراضية مبتشرحش الشكل.

### pattern على number
```html bad
<input type="number" pattern="[0-9]{4}">
```
```html good
<input type="text" inputmode="numeric" pattern="[0-9]{4}">
```
ليه؟ مبتشتغلش مع number: استخدم text مع inputmode.

## a11y

- وضّح الشكل المطلوب في نص ظاهر قبل الكتابة.
- رسالة الخطأ لازم تشرح التصحيح.
- متعتمدش على `title` لوحده لقارئ الشاشة.

## quiz

### هل لازم `^…$`؟
- [x] لأ، بتتضاف تلقائياً
- [ ] أيوه
- [ ] لو طويل
- [ ] للأرقام
يطابق القيمة كلها.

### حقل فاضي؟
- [x] بيعدّي
- [ ] بيفشل
- [ ] خطأ
- [ ] تحذير
استخدم required.

### مع `type="number"`؟
- [x] مبتشتغلش
- [ ] بتشتغل
- [ ] بتحذف
- [ ] بتتحول
للنصوص فقط.

## refs

- [MDN: pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern)
- [MDN: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
