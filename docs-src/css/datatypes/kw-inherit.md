---
id: kw-inherit
kind: datatype
cat: datatypes
chip: inherit
title: الكلمة inherit: وارث من الأب
en: CSS inherit keyword
status: stable
support: all
size: compact
mdn: inherit
summary: inherit بتخلّي الخاصية ترث قيمة الأب المباشر حتى لو الخاصية مش متوارثة أصلاً (زي border).
keywords: inherit, وراثة, parent, css-wide keyword
related: kw-initial, kw-unset, kw-revert, cascade-inheritance
---

## intro

الكلمة `inherit` بتجبر الخاصية تاخد **قيمة الأب المباشر** (المحسوبة). في CSS بعض الخصائص **بتتوارث تلقائياً** (زي `color` و`font-family` و`line-height`) وبعضها **لأ** (زي `border` و`margin` و`background` و`padding`). `inherit` بتخلّيك **تجبر الوراثة** حتى للي مش بيتوارث: `a { color: inherit; }` يخلّي الرابط ياخد لون نصّ أبوه بدل الأزرق الافتراضي (مفيد جداً)، و`.box { border: inherit; }` يرث حد أبوه. وكمان `button { font: inherit; }` عشان الزرار ياخد خط الصفحة (الأزرار والحقول بياخدوا خط النظام افتراضياً!). تذكّر: بترث من الأب **المباشر** فقط.

## try

```html
<style>
  .p { color:#7a4a1d; border:2px solid #7a4a1d; padding:6px; background:#efe0bd; border-radius:8px; }
  .p a { color:inherit; }
  .p .c { border:inherit; padding:4px; margin-top:4px; }
</style>
<div class="p"><a href="#" onclick="return false">رابط بلون الأب</a><div class="c">حد موروث</div></div>
```

## syntax

```css nolive
a { color: inherit; }
button { font: inherit; }
.child { border: inherit; }
```

- من الأب المباشر فقط.
- يجبر وراثة غير المتوارث.

## use

- روابط بلون النص: `color: inherit`.
- أزرار وحقول بخط الصفحة: `font: inherit`.

## avoid

- افتراض الوراثة من الجد.

## examples

### 1) رابط بلون الأب
color: inherit.

```html
<style>
  .p { color:#7a4a1d; padding:6px; background:#efe0bd; border-radius:8px; }
  .p a { color:inherit; font-weight:bold; }
</style>
<div class="p">نص <a href="#" onclick="return false">رابط بنفس اللون</a></div>
```



### 2) زرار بخط الصفحة
font: inherit.

```html
<style>
  .p { font-family:Georgia, serif; font-size:1.1rem; color:#3d2c18; }
  button { font:inherit; padding:6px 14px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; }
</style>
<div class="p">نص بخط الصفحة <button>زرار بنفس الخط</button></div>
```



### 3) حد موروث
border: inherit.

```html
<style>
  .p { border:3px dashed #3d7a5a; padding:6px; background:#efe0bd; color:#3d2c18; border-radius:8px; }
  .c { border:inherit; margin-top:4px; padding:4px; }
</style>
<div class="p">أب<div class="c">ابن ورث الحد</div></div>
```



## mistakes

### الوراثة من الجد

```css bad
.c { color:inherit; }  /* من الأب المباشر مش الجد */
```

```css good
/* حدد اللون على الأب المباشر */
```

أب مباشر فقط.

## quiz

### inherit بترث من؟
- [x] الأب المباشر
- [ ] الجد
- [ ] body
- [ ] html

مباشر.

### الاستخدام الشائع؟
- [x] font: inherit للأزرار
- [ ] z-index
- [ ] حركة
- [ ] shadow

خط الصفحة.

## refs

- [MDN: inherit](https://developer.mozilla.org/en-US/docs/Web/CSS/inherit)
