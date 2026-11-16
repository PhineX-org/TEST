---
id: autofill
kind: pseudoclass
cat: pc-form
chip: :autofill
title: تعبئة المتصفح التلقائية
en: CSS :autofill pseudo-class
status: stable
support: all
size: compact
mdn: :autofill
summary: الحالة autofill بتنطبق على الحقول اللي المتصفح عبّاها تلقائياً. تقدر تغيّر شكلها بحدود (غالباً بخدعة box-shadow).
keywords: :autofill, autofill, تعبئة تلقائية, chrome, password
related: valid, focus, color
---

## intro

`:autofill` بتنطبق على الحقول اللي **المتصفح ملّاها تلقائياً** (مثلاً الإيميل وكلمة المرور المحفوظين). المتصفحات بتدي الحقل خلفية ملونة (أصفر/أزرق) غالباً بتتعارض مع تصميمك. الـ `:autofill` بتخلّيك تعرف إن ده حصل، لكن **المتصفح بيفرض الخلفية** فمش بتقدر تغيّرها بـ `background` عادي؛ الحيلة الشائعة: `box-shadow: inset 0 0 0 100px #f3ede0` وتغيير لون النص بـ `-webkit-text-fill-color`. وبعض المتصفحات محتاجة `:-webkit-autofill` بجانبها للتوافق الكامل.

## try

```html
<style>
  input:autofill, input:-webkit-autofill { box-shadow:inset 0 0 0 100px #efe0bd; -webkit-text-fill-color:#3d2c18; }
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<input type="email" autocomplete="email" placeholder="ايميل">
```

## syntax

```css nolive
input:autofill { box-shadow: inset 0 0 0 100px #efe0bd; }
input:-webkit-autofill { -webkit-text-fill-color: #3d2c18; }
```

- المتصفح يفرض الخلفية.
- حيلة box-shadow.

## use

- توحيد شكل الحقل المعبأ.
- تحسين التباين.

## avoid

- محاولة background عادي (مبتشتغلش).

## examples

### 1) حيلة الظل
تغطية خلفية المتصفح.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:-webkit-autofill, input:autofill { box-shadow:inset 0 0 0 100px #efe0bd; -webkit-text-fill-color:#3d2c18; }
</style>
<input type="password" autocomplete="current-password" placeholder="كلمة السر">
```



### 2) لون الحد
تمييز الحقل المعبأ.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:autofill { border-color:#3d7a5a; }
</style>
<input type="email" autocomplete="email" placeholder="ايميل">
```



### 3) تباين النص
لون النص واضح.

```html
<style>
  input:-webkit-autofill { -webkit-text-fill-color:#3d2c18; }
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<input type="text" autocomplete="name" placeholder="الاسم">
```



## mistakes

### background عادي

```css bad
input:autofill { background:#fff; }  /* مبتشتغلش */
```

```css good
input:autofill { box-shadow:inset 0 0 0 100px #fff; }
```

الحيلة بالظل.

## quiz

### autofill بتنطبق على؟
- [x] حقل عبّاه المتصفح
- [ ] حقل فاضي
- [ ] حقل معطّل
- [ ] زرار

التعبئة التلقائية.

### حيلة تغيير الخلفية؟
- [x] box-shadow inset
- [ ] background
- [ ] border
- [ ] margin

ظل داخلي كبير.

## refs

- [MDN: :autofill](https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill)
