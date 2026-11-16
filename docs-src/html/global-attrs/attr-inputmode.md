---
id: attr-inputmode
kind: attribute
cat: global-attrs
chip: inputmode
title: خاصية نوع لوحة المفاتيح
en: HTML inputmode global attribute
status: stable
support: all
mdn: Global_attributes/inputmode
summary: خاصية inputmode بتحدد نوع لوحة المفاتيح الافتراضية على الموبايل: numeric وdecimal وtel وemail وurl وsearch وnone. بتفتح اللوحة المناسبة من غير ما تغيّر نوع الحقل.
keywords: inputmode, لوحة مفاتيح, numeric, decimal, tel, email, url, search, none, موبايل, أرقام, virtual keyboard
related: input, attr-enterkeyhint, attr-autocapitalize, textarea, attr-pattern
---

## intro

على الموبايل، نوع لوحة المفاتيح اللي بتظهر بيفرق جداً في راحة المستخدم: لو بيكتب **رقم** يظهر له لوحة أرقام، ولو بيكتب **إيميل** تظهر له لوحة فيها `@` و`.`. أسهل طريقة إنك تستخدم `type="number"` أو `type="email"`. لكن أحياناً `type` بيدّيك سلوكيات **مش عايزها**: `type="number"` بيحط أسهم زيادة ونقصان وبيقبل `e` وبيبوّظ أرقام مثل رقم البطاقة. وهنا تيجي **`inputmode`**.

بتتحكم **بس في لوحة المفاتيح** من غير ما تغيّر سلوك الحقل: `inputmode="numeric"` (أرقام صحيحة)، `decimal` (أرقام بفاصلة عشرية)، `tel` (لوحة تليفون)، `email`، `url`، `search`، `text` (الافتراضي)، و`none` (من غير لوحة: مفيد لو عندك لوحة مفاتيح مخصّصة بتعملها بنفسك). وغالباً بتتجمّع مع `type="text"` ومعاها `pattern` للتحقق.

## try

```html
<input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="رقم البطاقة (أرقام بس)" style="width:100%; padding:6px">
<p>افتحها من الموبايل وشوف لوحة الأرقام.</p>
```

## syntax

```html nolive
<input type="text" inputmode="numeric | decimal | tel | email | url | search | text | none">
```

- `numeric` — **أرقام صحيحة**.
- `decimal` — **أرقام مع فاصلة**.
- `tel` — **لوحة تليفون**.
- `none` — **من غير** لوحة افتراضية.

## use

- أرقام بطاقات وأكواد تحقق (OTP) من غير `type="number"`.
- مبالغ مالية: `decimal`.
- حقول تليفون وبحث وروابط.
- منع ظهور اللوحة لما عندك لوحة مخصّصة (`none`).

## avoid

- متستخدمهاش بدل `type` لما `type` المناسب (زي email) كافي.
- متفتكرش إنها بتمنع حروف: لازم `pattern` أو تحقق بنفسك.

## section: القيم

- `text`: لوحة عادية (الافتراضي).
- `numeric`: 0-9 فقط (للأكواد والبطاقات).
- `decimal`: أرقام وعلامة عشرية.
- `tel`: لوحة التليفون.
- `email` و`url` و`search`: لوحات مخصصة.
- `none`: من غير لوحة افتراضية.

## examples

### 1) كود تحقق OTP
مثال على numeric.

```html
<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="------" style="width:100%; padding:8px; letter-spacing:8px; text-align:center">
```

- لوحة أرقام على الموبايل.
- بدون أسهم `number` ومشاكله.
- `autocomplete="one-time-code"` بيقترح الكود من SMS.

### 2) مبلغ مالي
مثال على decimal.

```html
<input inputmode="decimal" placeholder="0.00" style="width:100%; padding:6px">
```

- لوحة أرقام فيها علامة عشرية.
- ممتاز للأسعار.
- اللغة بتحدد الفاصلة: `.` أو `,`.

### 3) رقم تليفون
مثال على tel.

```html
<input type="tel" inputmode="tel" placeholder="01xxxxxxxxx" style="width:100%; padding:6px">
```

- لوحة التليفون فيها `+` و`*` و`#`.
- `type="tel"` غالباً كفاية لوحده.
- استخدم `pattern` لو عايز تتحقق.

### 4) لوحة مخصّصة بـ none
من غير لوحة.

```html
<input inputmode="none" readonly placeholder="اختار من الأزرار" id="x" style="width:100%; padding:6px">
<div style="margin-top:6px"><button onclick="x.value+='1'">1</button> <button onclick="x.value+='2'">2</button> <button onclick="x.value=''">مسح</button></div>
```

- `inputmode="none"` بيمنع اللوحة الافتراضية.
- بتعمل لوحتك بأزرار HTML.
- مفيد في تطبيقات الـ POS والكيوسكات.

## mistakes

### type=number لرقم بطاقة
```html bad
<input type="number" name="card">
```
```html good
<input type="text" inputmode="numeric" pattern="[0-9]*" name="card">
```
ليه؟ `type=number` بيحذف الأصفار من أول الرقم وبيعمل أسهم. للأكواد استخدم `inputmode`.

### inputmode بدون type
```html bad
<input inputmode="email">
```
```html good
<input type="email">
```
ليه؟ لو فيه `type` مناسب (مثل email) استخدمه: بيدّيك تحقق كمان.

## a11y

- اللوحة المناسبة بتساعد ناس كتير، خصوصاً ذوي مشاكل الحركة.
- لا تستخدم `none` إلا لو في بديل كامل.
- اشرح التنسيق المتوقع في `label` أو نص مساعد.

## quiz

### أنهي قيمة لأكواد التحقق الرقمية؟
- [x] `numeric`
- [ ] `tel`
- [ ] `email`
- [ ] `url`
لوحة أرقام صحيحة.

### هل `inputmode` بتحدد نوع البيانات المسموح بيها؟
- [x] لأ، بتحدد اللوحة بس
- [ ] أيوه
- [ ] بتمنع الحروف
- [ ] بتعمل تحقق
التحقق بـ pattern.

### إيه مشكلة `type="number"` لأرقام البطاقات؟
- [x] بيحذف الأصفار الأولى وبيحط أسهم
- [ ] بطيء
- [ ] مش بيدعم الأرقام
- [ ] لازم HTTPS
inputmode أحسن.

## refs

- [MDN: inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode)
- [WHATWG: inputmode](https://html.spec.whatwg.org/multipage/interaction.html#attr-inputmode)
