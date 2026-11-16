---
id: resize
kind: property
cat: ui
chip: resize
title: تغيير حجم العنصر باليد
en: CSS resize property
status: stable
support: all
mdn: resize
summary: resize بتخلّي المستخدم يغيّر حجم العنصر بالسحب من الركن: both وhorizontal وvertical وnone. افتراضي في textarea.
keywords: resize, textarea, تغيير الحجم, both, none, overflow
related: overflow, width, height, max-width
---

## intro

الخاصية `resize` بتضيف **مقبض في الركن السفلي** للعنصر عشان المستخدم **يسحبه ويغيّر الحجم**. القيم: **`none`** (بدون)، **`both`** (أفقي ورأسي)، **`horizontal`** (أفقي فقط)، **`vertical`** (رأسي فقط). وفي الحديث `block` و`inline`.

**شرط**: العنصر لازم يكون [[overflow]] غير `visible` (يعني `auto` أو `hidden` أو `scroll`)، وإلا مبتشتغلش. وحقول `textarea` عندها `resize: both` افتراضياً. مشهور إن المصممين يعملوا `textarea { resize: vertical; }` عشان المستخدم يطوّل الحقل بس من غير ما يكسر التصميم بالعرض، أو `none` لو التصميم ثابت.

تقدر تستخدمها على أي عنصر (div) مع `overflow: auto` لعمل لوحات قابلة للتحجيم، مع [[min-width]] و[[max-width]] لتحديد حدود الحجم.

## try

```html
<style>
  textarea { width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; resize:vertical; }
</style>
<textarea rows="3">اسحب الركن السفلي لتكبير الحقل رأسياً</textarea>
```

## syntax

```css nolive
resize: none;
resize: both;
resize: horizontal;
resize: vertical;
```

- **القيمة المبدئية**: `none` (وtextarea: both).
- محتاجة overflow غير visible.

## values

### none
بدون.

### both
أفقي ورأسي.

### horizontal
أفقي.

### vertical
رأسي.

## use

- textarea رأسي فقط.
- لوحات قابلة للتحجيم.
- منع كسر التصميم.

## avoid

- resize على عنصر overflow:visible.
- both في textarea ضمن تصميم ضيق.

## examples

### 1) textarea رأسي
الأشهر.

```html
<style>
  textarea { width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; resize:vertical; }
</style>
<textarea rows="2">vertical</textarea>
```



### 2) div قابل للتحجيم
overflow مطلوب.

```html
<style>
  .r { width:140px; height:60px; overflow:auto; resize:both; background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; min-width:100px; max-width:100%; }
</style>
<div class="r">اسحب الركن لتغيير الحجم</div>
```



### 3) none
منع التغيير.

```html
<style>
  textarea { width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; resize:none; }
</style>
<textarea rows="2">none: مفيش مقبض</textarea>
```



### 4) أفقي فقط
horizontal.

```html
<style>
  .r { width:140px; height:50px; overflow:auto; resize:horizontal; background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; min-width:100px; max-width:100%; }
</style>
<div class="r">اسحب أفقياً</div>
```



## mistakes

### بدون overflow

```css bad
.r { resize:both; }  /* مبتشتغلش على visible */
```

```css good
.r { resize:both; overflow:auto; }
```

overflow مطلوب.

### من غير حدود للحجم

```css bad
.r { resize:both; overflow:auto; }  /* ممكن المستخدم يصغّره لصفر */
```

```css good
.r { resize:both; overflow:auto; min-width:120px; max-width:100%; }
```

حط min وmax عشان التصميم ميتكسرش.

## quiz

### resize:vertical بتسمح بـ؟
- [x] تغيير الارتفاع فقط
- [ ] العرض فقط
- [ ] الاتنين
- [ ] لا شيء

رأسي.

### بتحتاج؟
- [x] overflow غير visible
- [ ] position:relative
- [ ] display:flex
- [ ] float

overflow.

### الافتراضي في textarea؟
- [x] both
- [ ] none
- [ ] horizontal
- [ ] vertical

أفقي ورأسي.

## refs

- [MDN: resize](https://developer.mozilla.org/en-US/docs/Web/CSS/resize)
