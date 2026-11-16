---
id: border
kind: property
cat: borders-bg
chip: border
title: خاصية الحد
en: CSS border property
status: stable
support: all
mdn: border
summary: border اختصار بيجمع سُمك الحد ونوعه ولونه: border: 2px solid #7a4a1d. بتحدد إطار حوالين العنصر، ولازم تكتب النوع.
keywords: border, حد, اطار, solid, dashed, border-width, border-style, border-color, حدود
related: border-radius, outline, box-model, border-width, border-style, border-color
---

## intro

الخاصية `border` بترسم **إطار** حوالين العنصر بين الحشو والهامش ([[box-model]]). وهي **اختصار** لتلات خصائص: [[border-width]] (السُمك) و[[border-style]] (النوع) و[[border-color]] (اللون)، بالترتيب الشائع: `border: 2px solid #7a4a1d`.

**أهم نقطة**: لازم تكتب **النوع** (`solid` أو `dashed`…). النوع الافتراضي `none`، فلو كتبت `border: 2px red` من غير نوع **مفيش حد هيظهر أبداً**! أما السُمك فالافتراضي `medium` (حوالي 3px) واللون الافتراضي هو لون النص (`currentcolor`).

الحد **بياخد مساحة** ويزوّد حجم العنصر الكلي (إلا لو `box-sizing: border-box`). ولو عايز جهة بعينها استخدم `border-top` وأخواتها، أو لو عايز إطار من غير ما يحتل مساحة استخدم [[outline]]. وللزوايا المدوّرة [[border-radius]].

> [!analogy] الحد زي إطار الصورة: له سُمك ونوع (خشب، ذهبي) ولون، وبيتحط حوالين الصورة والكرتون (الحشو).

> [!warn] `border: 2px #7a4a1d` من غير `solid` = **لا حد**. أكتر غلطة للمبتدئين.

## try

```html
<style>
  .b { border:4px dashed #7a4a1d; padding:12px; background:#efe0bd; color:#3d2c18; display:inline-block; }
</style>
<div class="b">غيّر النوع: solid / dotted / double</div>
```

## syntax

```css nolive
border: 2px solid #7a4a1d;       /* سُمك نوع لون */
border: 1px dashed currentColor;
border-bottom: 3px double #c9772f; /* جهة واحدة */
border: none;
```

- **القيمة المبدئية**: `medium none currentcolor`.
- **بتتوارث؟** لأ.
- الحد بياخد مساحة.

## values

### `<line-width>`
السُمك: `2px`، أو `thin`/`medium`/`thick`.

### `<line-style>`
النوع: `solid` `dashed` `dotted` `double` `groove` `ridge` `none`…

### `<color>`
لون الحد (الافتراضي لون النص).

### none
بدون حد.

## use

- إطار للكروت والحقول.
- خط فاصل `border-bottom`.
- إبراز عنصر بحد ملوّن.
- حدود الجداول.

## avoid

- نسيان النوع (مفيش حد).
- حد سميك قوي يشتّت (فضّل رفيع بلون هادي).

## examples

### 1) أنواع الحد
solid وdashed وdotted وdouble.

```html
<style>
  div { border-width:3px; border-color:#7a4a1d; padding:6px; margin:6px 0; color:#3d2c18; background:#efe0bd; }
</style>
<div style="border-style:solid">solid</div><div style="border-style:dashed">dashed</div>
<div style="border-style:dotted">dotted</div><div style="border-style:double">double</div>
```



### 2) جهة واحدة
خط تحت العنوان بس.

```html
<style>
  h4 { border-bottom:3px solid #c9772f; padding-bottom:6px; color:#7a4a1d; display:inline-block; margin:0; }
</style>
<h4>عنوان بخط تحته</h4>
```



### 3) النسيان القاتل
الأول مفيش حد (نسينا solid) والتاني شغال.

```html
<style>
  .a, .b { padding:8px; margin:6px 0; color:#3d2c18; background:#efe0bd; }
  .a { border:3px #a63b2f; } .b { border:3px solid #3d7a5a; }
</style>
<div class="a">من غير النوع</div><div class="b">مع النوع</div>
```



### 4) currentColor
الحد بياخد لون النص تلقائي.

```html
<style>
  .t { border:3px solid currentColor; padding:8px; display:inline-block; margin:4px; }
</style>
<div class="t" style="color:#3d7a5a">أخضر</div><div class="t" style="color:#b5551f">بني</div>
```



## mistakes

### نسيان النوع

```css bad
.a { border:2px #7a4a1d; }  /* مفيش حد */
```

```css good
.a { border:2px solid #7a4a1d; }
```

النوع الافتراضي `none`.

### حد بيزوّد الحجم

```css bad
.col { width:50%; border:5px solid; }  /* أعرض من 50% */
```

```css good
* { box-sizing:border-box; }
```

الحد بيتضاف على العرض إلا مع border-box.

## quiz

### أنهي حد هيظهر؟
- [ ] `border: 2px red`
- [x] `border: 2px solid red`
- [ ] `border: red`
- [ ] `border: 2px`

لازم النوع.

### الحد بياخد مساحة؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط dashed

بيزوّد الحجم.

### بديل بدون مساحة؟
- [ ] margin
- [x] outline
- [ ] padding
- [ ] gap

الـ outline.

## refs

- [MDN: border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
