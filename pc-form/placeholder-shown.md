---
id: placeholder-shown
kind: pseudoclass
cat: pc-form
chip: :placeholder-shown
title: النص التوضيحي ظاهر
en: CSS :placeholder-shown pseudo-class
status: stable
support: all
mdn: :placeholder-shown
summary: الحالة placeholder-shown بتنطبق على الحقل لما نص placeholder ظاهر (يعني فاضي). مفيدة لعمل تسميات عائمة وللتحكم في valid/invalid.
keywords: :placeholder-shown, placeholder-shown, placeholder, فاضي, floating label
related: placeholder, valid, invalid, empty, focus, pseudo-guide
---

## intro

`:placeholder-shown` بتنطبق على `input` أو `textarea` **طالما نص الـ `placeholder` ظاهر**، يعني الحقل **فاضي** (والـ placeholder معرّف). أول ما المستخدم يكتب حرف الحالة بتروح.

استخدامين مهمين جداً:
1. **تسميات عائمة (Floating Labels)**: التسمية تبقى كبيرة جوه الحقل وهو فاضي، وتصغر وتطلع فوق لما تكتب (`input:not(:placeholder-shown) + label`).
2. **التحكم في التحقق**: تحل مشكلة [[invalid]] من أول لحظة: `input:not(:placeholder-shown):invalid` يعني «غير صالح **وفيه كتابة**».

شرط: لازم يكون للحقل `placeholder` (حتى مسافة `placeholder=" "`) عشان الحالة تشتغل. وهو أفضل من JavaScript للأمور دي.

> [!tip] ضيف `placeholder=" "` لحقل بتسمية عائمة عشان تستخدم الحالة حتى لو مش عايز نص ظاهر.

## try

```html
<style>
  .f { position:relative; width:200px; }
  .f input { width:100%; box-sizing:border-box; padding:16px 10px 6px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  .f label { position:absolute; inset-inline-start:10px; top:12px; color:#8a7a62; transition:.2s; pointer-events:none; }
  .f input:not(:placeholder-shown) + label, .f input:focus + label { top:2px; font-size:.7rem; color:#b5551f; }
</style>
<div class="f"><input placeholder=" "><label>الاسم</label></div>
```

## syntax

```css nolive
input:placeholder-shown { background: #eee; }
input:not(:placeholder-shown) + label { }
input:not(:placeholder-shown):invalid { }
```

- لازم placeholder (ولو مسافة).
- بتروح أول ما يكتب.

## use

- تسميات عائمة.
- تأخير تنسيق invalid لحد الكتابة.
- تنسيق مختلف للحقل الفاضي.

## avoid

- نسيان placeholder (مبتشتغلش).
- استخدام placeholder بديل للتسمية.

## examples

### 1) تسمية عائمة
بتطلع لفوق مع الكتابة.

```html
<style>
  .f { position:relative; width:200px; }
  .f input { width:100%; box-sizing:border-box; padding:16px 10px 6px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  .f label { position:absolute; inset-inline-start:10px; top:12px; color:#8a7a62; transition:.2s; pointer-events:none; }
  .f input:not(:placeholder-shown) + label { top:2px; font-size:.7rem; color:#3d7a5a; }
</style>
<div class="f"><input placeholder=" "><label>الإيميل</label></div>
```



### 2) خلفية للفاضي
تنسيق وهو فاضي.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:placeholder-shown { background:#efe7d4; }
</style>
<input placeholder="اكتب">
```



### 3) تحقق بعد الكتابة
invalid بعد وجود نص.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:not(:placeholder-shown):invalid { border-color:#b5551f; }
</style>
<input type="email" placeholder="ايميل">
```



### 4) بدون placeholder
مبتشتغلش.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:placeholder-shown { background:#e4c490; }
</style>
<input>
```



## mistakes

### نسيان placeholder

```css bad
<input>  /* الحالة مبتشتغلش */
```

```css good
<input placeholder=" ">
```

لازم placeholder.

### placeholder بدل label

```css bad
<input placeholder="الاسم">
```

```css good
<label>الاسم</label><input>
```

التسمية ضرورية للوصولية.

## quiz

### placeholder-shown بتنطبق إمتى؟
- [x] الحقل فاضي وplaceholder ظاهر
- [ ] الحقل معطّل
- [ ] الحقل متركز
- [ ] الحقل صحيح

وهو فاضي.

### تحتاج؟
- [x] placeholder
- [ ] required
- [ ] pattern
- [ ] min

لازم placeholder.

### استخدام شائع؟
- [x] تسميات عائمة
- [ ] ألوان
- [ ] حدود
- [ ] ظل

floating labels.

## refs

- [MDN: :placeholder-shown](https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown)
