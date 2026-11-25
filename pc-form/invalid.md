---
id: invalid
kind: pseudoclass
cat: pc-form
chip: :invalid
title: قيمة غير صحيحة
en: CSS :invalid pseudo-class
status: stable
support: all
mdn: :invalid
summary: الحالة invalid بتنطبق على الحقول اللي قيمتها مخالفة لقواعد التحقق. استخدمها بحذر مع placeholder-shown أو user-invalid.
keywords: :invalid, invalid, خطأ, validation, نموذج, تحقق
related: valid, required, out-of-range, placeholder-shown, pseudo-guide
---

## intro

`:invalid` عكس [[valid]]، بتنطبق على الحقل **اللي قيمته مخالفة لقواعد التحقق** (إيميل غلط، رقم برّه النطاق، حقل إجباري فاضي، نمط `pattern` مش مطابق). بتستخدمها لإظهار **حالة الخطأ** (حد أحمر، رسالة).

أكبر فخ: الحقل الإجباري **الفاضي** يبقى `:invalid` من لحظة تحميل الصفحة؛ فلو لوّنته أحمر مباشرة هيبان **كل النموذج أحمر قبل ما المستخدم يعمل حاجة**، تجربة سيئة. الحل: 
1. `input:not(:placeholder-shown):invalid` (بعد ما يبدأ يكتب)، أو
2. `:user-invalid` الجديدة (بعد التفاعل)، أو
3. إضافة class بالـ JS بعد `blur`.

وللوصولية: **لا تعتمد على اللون**؛ ضيف **رسالة خطأ نصية** مربوطة بالحقل بـ `aria-describedby` وأيقونة. ولا تنسى التحقق في الخادم.

## try

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:not(:placeholder-shown):invalid { border-color:#b5551f; background:#fbe3d4; }
</style>
<input type="email" placeholder="اكتب إيميل غلط">
```

## syntax

```css nolive
input:invalid { border-color: #b5551f; }
input:not(:placeholder-shown):invalid { }
input:user-invalid { }
```

- الفاضي الإجباري غير صالح من البداية.
- استخدم :user-invalid الأفضل.

## use

- إظهار حالة الخطأ.
- تلوين حد أحمر بعد الكتابة.
- رسائل تصحيح.

## avoid

- تلوين أحمر من أول تحميل.
- الاعتماد على اللون وحده.

## examples

### 1) بعد الكتابة فقط
not placeholder-shown.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:not(:placeholder-shown):invalid { border-color:#b5551f; }
</style>
<input type="email" placeholder="ايميل">
```



### 2) رسالة خطأ
تظهر مع invalid.

```html
<style>
  .m { display:none; color:#b5551f; font-size:.9rem; }
  input:not(:placeholder-shown):invalid + .m { display:block; }
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<input type="email" placeholder="ايميل"><div class="m">الإيميل غير صحيح</div>
```



### 3) رقم برّه النطاق
min/max.

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:invalid { border-color:#b5551f; background:#fbe3d4; }
</style>
<input type="number" min="1" max="10" value="20">
```



### 4) إجباري فاضي
أحمر فوراً (مزعج).

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:invalid { border-color:#b5551f; }
</style>
<input required placeholder="فاضي وإجباري">
```



## mistakes

### أحمر مباشرة

```css bad
input:invalid { border:2px solid red; }
```

```css good
input:user-invalid { border:2px solid red; }
```

بعد التفاعل.

### اللون فقط

```css bad
input:invalid { border-color:red; }
```

```css good
input:invalid + .msg { display:block; }
```

ضيف رسالة نصية.

## quiz

### invalid بتنطبق على؟
- [x] قيمة مخالفة للقواعد
- [ ] قيمة صحيحة
- [ ] حقل معطّل
- [ ] زرار

غير صالحة.

### الفخ الشائع؟
- [x] حقل إجباري فاضي يبقى invalid من البداية
- [ ] invalid بطيئة
- [ ] invalid مبتشتغلش
- [ ] مفيش

أحمر من البداية.

### البديل الأحسن؟
- [x] :user-invalid
- [ ] :hover
- [ ] :root
- [ ] :empty

user-invalid.

## refs

- [MDN: :invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid)
