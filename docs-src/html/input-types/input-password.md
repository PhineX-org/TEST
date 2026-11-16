---
id: input-password
kind: inputtype
cat: input-types
chip: type="password"
title: حقل كلمة السر
en: <input type="password">
status: stable
support: all
mdn: Elements/input/password
summary: type="password" بيخفي الحروف المكتوبة بنقط عشان محدش يشوفها. بيحتاج autocomplete المناسب عشان مدير كلمات السر، ومش بيشفّر حاجة بذاته: لازم HTTPS.
keywords: input password, كلمة السر, autocomplete, current-password, new-password, minlength, مدير كلمات السر, HTTPS, تسجيل دخول
related: input, input-text, attr-autocomplete, attr-minlength, form, label
---

## intro

نفس حقل النص العادي، بس **الحروف بتظهر نقط** (••••) علشان لو حد واقف وراك مايشوفش كلمة السر. ده كل اللي بيعمله: **تغطية بصرية بس**. القيمة لسه نص عادي جوه الصفحة وبتتبعت للسيرفر، ولو الاتصال مش **HTTPS** أي حد على الشبكة يقدر يشوفها. فالأمان الحقيقي بييجي من السيرفر والتشفير، مش من الحقل.

حاجة مهمة جداً: استخدم `autocomplete` الصح، وهو **`current-password`** في تسجيل الدخول و**`new-password`** في التسجيل أو تغيير الباسورد. كده مدير كلمات السر في المتصفح يقدر يعبّي ويقترح باسورد قوي. ومتمنعش اللصق (paste) لأن ده بيضرّ المستخدمين اللي بيستخدموا مدير كلمات.

> [!warn] الحقل بيخفي الحروف بصرياً بس. **أمان الباسورد بييجي من HTTPS ومن تخزينه Hashed على السيرفر**، مش من type="password".

## try

```html
<label>كلمة السر: <input id="p" type="password" autocomplete="current-password" value="secret123"></label>
<label><input type="checkbox" onchange="p.type = this.checked ? 'text' : 'password'"> اظهرها</label>
```

## syntax

```html nolive
<input type="password" name="pw" autocomplete="current-password" minlength="8" required>
```

- `type="password"` — بيخفي الحروف.
- `autocomplete` — `current-password` أو `new-password`.
- `minlength` — أقل طول مسموح.

## use

- تسجيل الدخول.
- إنشاء حساب أو تغيير الباسورد (مع حقل تأكيد).
- أي سر لازم يتخفي بصرياً.

## avoid

- متمنعش اللصق (paste) في الحقل.
- متبعتش الباسورد في رابط (GET) أبداً: استخدم POST.

## examples

### 1) تسجيل دخول
مثال على current-password.

```html
<form onsubmit="event.preventDefault(); o.textContent='اتبعت (تجريبي)'">
  <label>الإيميل <input type="email" name="email" autocomplete="username"></label><br>
  <label>الباسورد <input type="password" name="pw" autocomplete="current-password" required></label><br>
  <button>دخول</button>
</form>
<p id="o"></p>
```

- `username` + `current-password` بيخلّوا مدير الباسوردات يشتغل.
- الإيميل قبل الباسورد في الفورم.
- استخدم POST في الفورم الحقيقي.

### 2) إنشاء حساب مع تأكيد
مثال على new-password.

```html
<form onsubmit="event.preventDefault(); o.textContent = a.value === b.value ? 'متطابقين ✅' : 'مش متطابقين ❌'">
  <input id="a" type="password" autocomplete="new-password" minlength="8" placeholder="كلمة سر جديدة" required>
  <input id="b" type="password" autocomplete="new-password" placeholder="أكّدها" required>
  <button>إنشاء</button>
</form>
<p id="o"></p>
```

- `new-password` بيخلّي المتصفح يقترح باسورد قوي.
- المقارنة بين الحقلين بالجافاسكربت.
- الفحص الحقيقي لازم يحصل على السيرفر كمان.

### 3) زرار إظهار/إخفاء
تبديل النوع.

```html
<input id="p" type="password" value="MyPass123">
<button type="button" onclick="p.type = p.type === 'password' ? 'text' : 'password'; this.textContent = p.type === 'password' ? 'إظهار' : 'إخفاء'">إظهار</button>
```

- تغيير `type` بالكود بيبدّل الإخفاء.
- ده مفيد على الموبايل.
- الحالة بتتحدّث في نص الزرار.

### 4) قواعد قوة الباسورد
مثال على pattern.

```html
<input type="password" pattern="(?=.*\d)(?=.*[a-z]).{8,}" title="8 حروف على الأقل وفيها حرف ورقم" placeholder="8+ حروف وفيها رقم" required>
```

- `pattern` بيفرض شكل معيّن.
- القواعد المعقّدة بتضايق المستخدم: خلّيها بسيطة.
- الطول أهم من التعقيد.

## mistakes

### autocomplete ناقص
```html bad
<input type="password" name="pw">
```
```html good
<input type="password" name="pw" autocomplete="current-password">
```
ليه؟ من غيرها مدير كلمات السر ممكن مايعرفش يعبّي الحقل.

### منع اللصق
```html bad
<input type="password" onpaste="return false">
```
```html good
<input type="password" autocomplete="new-password">
```
ليه؟ منع اللصق بيمنع مدير الباسوردات وبيشجع على باسوردات ضعيفة.

## a11y

- اربط الحقل بـ `label` واضح.
- وفّر زرار «إظهار الباسورد» لمن يخطئ في الكتابة.
- وضّح القواعد قبل الكتابة مش بعد الخطأ.

## quiz

### أمان الباسورد بييجي من؟
- [x] HTTPS وتخزينه Hashed على السيرفر
- [ ] type="password" بس
- [ ] الـ placeholder
- [ ] الـ label
الحقل بيخفي بصرياً بس.

### `autocomplete` لتسجيل الدخول؟
- [x] `current-password`
- [ ] `new-password`
- [ ] `off`
- [ ] `secret`
للباسورد الحالي.

### هل تمنع اللصق؟
- [x] لأ، بيضر المستخدمين
- [ ] أيوه دايماً
- [ ] للموبايل بس
- [ ] لو الباسورد طويل
مدير الباسوردات بيعتمد عليه.

## refs

- [MDN: password](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/password)
- [MDN: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)
