---
id: border-width
kind: property
cat: borders-bg
chip: border-width
title: سُمك الـ border
en: CSS border-width property
status: stable
support: all
size: compact
mdn: border-width
summary: border-width بتحدد سُمك الحد: بالبكسل أو thin وmedium وthick، وتقدر تحدد كل جهة لوحدها بـ 1-4 قيم.
keywords: border-width, سمك الحد, thin, thick, medium, px
related: border, border-style, border-color, border-radius
---

## intro

الخاصية `border-width` بتحدد **سُمك الحد**: قيمة بالطول (`2px`) أو كلمات (`thin` ≈ 1px، `medium` ≈ 3px، `thick` ≈ 5px). وزي `margin`، تقدر تكتب **1 لـ 4 قيم** (فوق، يمين، تحت، شمال): `border-width: 1px 3px` = رأسي 1 وأفقي 3. **مهم**: الحد مش هيظهر لو [[border-style]] هو `none` (الافتراضي) حتى لو حددت السُمك، علشان كده بتكتب النوع دايماً، وبتختصر الكل في [[border]]. السُمك بيزوّد حجم العنصر إلا مع `box-sizing: border-box`.

## try

```html
<style>
  .b { border-style:solid; border-color:#7a4a1d; border-width:2px 8px 2px 8px; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">سُمك مختلف للجهات</div>
```

## syntax

```css nolive
border-width: 2px;
border-width: 1px 3px;
border-width: thin;
border-width: 1px 2px 3px 4px;
```

- **القيمة المبدئية**: `medium`.
- لا تقبل سالب.

## values

### `<length>`
قيمة مثل `2px`.

### thin / medium / thick
كلمات بسُمك تقريبي.

## use

- ظبط سُمك الحد منفصلاً.
- حدود غير متماثلة.

## avoid

- كتابتها من غير border-style (مفيش حد).

## examples

### 1) سُمك مختلف
thin وmedium وthick.

```html
<style>
  div { border-style:solid; border-color:#7a4a1d; padding:6px; margin:6px 0; color:#3d2c18; background:#efe0bd; }
</style>
<div style="border-width:thin">thin</div><div style="border-width:medium">medium</div><div style="border-width:thick">thick</div>
```



### 2) أربع قيم
فوق ويمين وتحت وشمال.

```html
<style>
  .b { border-style:solid; border-color:#c9772f; border-width:2px 10px 6px 0; padding:8px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">1-4 قيم</div>
```



### 3) بدون style
مفيش حد.

```html
<style>
  .b { border-width:6px; border-color:#a63b2f; padding:8px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">لا حد: النوع none</div>
```



## mistakes

### نسيان border-style

```css bad
.a { border-width:3px; border-color:red; }
```

```css good
.a { border-width:3px; border-style:solid; border-color:red; }
```

النوع ضروري.

## quiz

### border-width بتحدد؟
- [ ] اللون
- [x] السُمك
- [ ] النوع
- [ ] الشكل

سُمك.

### بتظهر لو style:none؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط thick

لازم نوع.

## refs

- [MDN: border-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)
