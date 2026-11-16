---
id: attr-autocomplete
kind: attribute
cat: attrs
chip: autocomplete
title: خاصية التعبئة التلقائية
en: HTML autocomplete attribute
status: stable
support: all
mdn: Attributes/autocomplete
summary: خاصية autocomplete بتقول للمتصفح يعبّي الحقل من بيانات محفوظة (email, name, tel…) أو يمنع ده بـ off. بتسهّل على المستخدم وبتشغّل مدير كلمات السر.
keywords: autocomplete, تعبئة تلقائية, email, name, tel, current-password, new-password, one-time-code, off, address, cc-number, مدير كلمات السر
related: input, form, attr-name, input-password, input-email, input-tel
---

## intro

لما بتكتب في موقع «الإيميل» والمتصفح بيقترح عليك إيميلك المحفوظ بضغطة، ده `autocomplete` شغال. الخاصية دي بتقول للمتصفح **نوع المعلومة** اللي الحقل بيطلبها عشان يعرف يعبّيها من بيانات المستخدم المحفوظة. القيم المهمة: `name` و`email` و`tel` و`username` و`current-password` و`new-password` و`street-address` و`postal-code` و`country` و`cc-number` و**`one-time-code`** (لقبول رمز SMS تلقائياً على الموبايل).

**ليه مهمة؟** (1) بتوفّر وقت المستخدم وبتقلّل الأخطاء، خصوصاً على الموبايل. (2) **مهمة للإتاحة** لناس بيصعب عليهم الكتابة (WCAG 1.3.5 بتشترطها لحقول المعلومات الشخصية). (3) **مدير كلمات السر** بيعتمد على `current-password` و`new-password` عشان يعبّي ويقترح باسورد قوي، وعلى `username` للإيميل أو الاسم اللي قبل الباسورد.

وعلى مستوى الفورم: `autocomplete="off"` على [[form]] بتعطّل الاقتراحات للفورم كله، لكن **المتصفحات الحديثة بتتجاهل `off` لحقول الباسورد** عمداً. استخدم `off` بحذر وللحقول اللي فعلاً بتتغيّر كل مرة (رمز تحقق، كود خصم).

## try

```html
<form>
  <label>الاسم <input name="name" autocomplete="name"></label><br>
  <label>الإيميل <input name="email" type="email" autocomplete="email"></label><br>
  <label>الموبايل <input name="tel" type="tel" autocomplete="tel"></label>
</form>
<p style="color:#64748b">لو عندك بيانات محفوظة في المتصفح هتتقترح لك (قد لا تشتغل داخل الـ iframe).</p>
```

## syntax

```html nolive
<input type="email" name="email" autocomplete="email">
<input type="password" name="pw" autocomplete="current-password">
<input name="code" autocomplete="one-time-code" inputmode="numeric">
```

- `autocomplete="نوع المعلومة"` — يفعّل التعبئة.
- `off` — يعطّل الاقتراح.
- `current-password` و`new-password` — لمدير كلمات السر.

## use

- حقول معلومات شخصية (اسم، إيميل، عنوان).
- تسجيل الدخول والتسجيل (مدير الباسورد).
- رمز تحقق بالـ SMS (`one-time-code`).
- عناوين الشحن وبطاقات الدفع.

## avoid

- متحطش `off` على الباسورد وحقول الدخول.
- متستخدمش `on` / `off` وتسيب القيم المحددة (الأفضل النوع المخصوص).

## section: أشهر القيم

- **هوية:** `name` `given-name` `family-name` `username`.
- **تواصل:** `email` `tel`.
- **عنوان:** `street-address` `postal-code` `country`.
- **أمان:** `current-password` `new-password` `one-time-code`.
- **دفع:** `cc-name` `cc-number` `cc-exp` `cc-csc`.
- **تحكم:** `on` و`off`.

## examples

### 1) تسجيل دخول
username وcurrent-password.

```html
<form onsubmit="event.preventDefault()">
  <input name="u" type="email" autocomplete="username" placeholder="الإيميل">
  <input name="p" type="password" autocomplete="current-password" placeholder="الباسورد">
  <button>دخول</button>
</form>
```

- مدير الباسوردات بيعبّي الاتنين.
- الإيميل قبل الباسورد.
- استخدم نفس الأسماء في كل صفحة.

### 2) إنشاء حساب
مثال على new-password.

```html
<input type="password" autocomplete="new-password" minlength="8" placeholder="باسورد جديد">
```

- المتصفح بيقترح باسورد قوي.
- بيحفظه تلقائياً بعد التسجيل.
- استخدمه في حقل التأكيد كمان.

### 3) رمز SMS
مثال على one-time-code.

```html
<input name="otp" autocomplete="one-time-code" inputmode="numeric" pattern="[0-9]{6}" placeholder="الرمز">
```

- الموبايل بيقترح الرمز من الرسالة.
- `inputmode="numeric"` لوحة أرقام.
- ده أحسن تجربة مصادقة.

### 4) عنوان شحن
مثال على address.

```html
<input autocomplete="street-address" placeholder="العنوان">
<input autocomplete="postal-code" placeholder="الرمز البريدي" size="8">
<input autocomplete="country-name" placeholder="الدولة" size="10">
```

- التعبئة بتحصل بضغطة.
- كل حقل له قيمة.
- أنقص الكتابة على الموبايل.

## mistakes

### off على الباسورد
```html bad
<input type="password" autocomplete="off">
```
```html good
<input type="password" autocomplete="current-password">
```
ليه؟ بتزعج المستخدم وبتضعف الأمان (باسوردات ضعيفة).

### من غير autocomplete في الدفع
```html bad
<input name="card">
```
```html good
<input name="card" autocomplete="cc-number" inputmode="numeric">
```
ليه؟ بتسرّع الدفع وبتقلل الأخطاء.

## a11y

- مطلوب لتحقيق WCAG 1.3.5 (هدف الإدخال).
- بيساعد ذوي صعوبات الكتابة والذاكرة.
- متعطّلهوش من غير سبب.

## quiz

### لحقل الباسورد الجديد؟
- [x] `new-password`
- [ ] `password`
- [ ] `off`
- [ ] `secret`
يقترح باسورد.

### لرمز SMS؟
- [x] `one-time-code`
- [ ] `otp`
- [ ] `sms`
- [ ] `code`
الموبايل يقترح.

### هل off مضمون لحقول الباسورد؟
- [x] لأ، بتتجاهله
- [ ] أيوه
- [ ] في كروم بس
- [ ] دايماً
مقصود.

## refs

- [MDN: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)
- [WHATWG: Autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
