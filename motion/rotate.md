---
id: rotate
kind: property
cat: motion
chip: rotate
title: تدوير مستقل
en: CSS rotate property
status: stable
support: all
size: compact
mdn: rotate
summary: rotate خاصية مستقلة لتدوير العنصر بالدرجات بدون ما تلمس transform. تقبل محاور في 3D.
keywords: rotate, تدوير, درجة, deg, individual transforms
related: transform, translate, scale, fn-rotate
---

## intro

الخاصية `rotate` بتدوّر العنصر **بشكل مستقل** عن `transform`: `rotate: 45deg;` (بالـ `deg` أو `turn` أو `rad`). وتقدر تحدد محور في 3D: `rotate: x 30deg` أو `rotate: 1 1 0 45deg`. نفس مميزات [[translate]] و[[scale]]: تقدر تحرك التدوير **لوحده** (مثلاً أيقونة تلف 360 للأبد) من غير ما تتعارض مع باقي التحويلات. والتدوير بيحصل حوالين [[transform-origin]]. وقيمة موجبة = **في اتجاه عقارب الساعة**، والسالبة عكسها. والدورة الكاملة = `360deg` = `1turn`.

## try

```html
<style>
  .b { display:inline-block; width:50px; height:50px; background:#c9772f; border-radius:8px; margin:20px; transition:rotate .4s; }
  .b:hover { rotate:90deg; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
rotate: 45deg;
rotate: 0.25turn;
rotate: x 30deg;
rotate: none;
```

- **القيمة المبدئية**: `none`.
- موجب = مع عقارب الساعة.

## values

### `<angle>`
الزاوية (deg وturn وrad).

### axis angle
محور في 3D.

### none
بدون.

## use

- أيقونة سهم تلف.
- تدوير hover.
- دوران مستمر.

## avoid

- نسيان وحدة الزاوية.

## examples

### 1) زوايا
مقارنة.

```html
<style>
  .b { display:inline-block; width:44px; height:44px; background:#3d7a5a; margin:14px; border-radius:6px; }
</style>
<div class="b" style="rotate:15deg"></div><div class="b" style="rotate:45deg"></div><div class="b" style="rotate:.25turn"></div>
```



### 2) سهم القايمة
يلف عند hover.

```html
<style>
  .a { display:inline-block; font-size:1.6rem; color:#7a4a1d; transition:rotate .3s; }
  .s:hover .a { rotate:180deg; }
  .s { display:inline-block; padding:8px 14px; background:#efe0bd; color:#3d2c18; border-radius:8px; }
</style>
<div class="s">القايمة <span class="a">▾</span></div>
```



### 3) دوران مستمر
animation بـ rotate.

```html
<style>
  .l { width:34px; height:34px; border:5px solid #efe0bd; border-top-color:#c9772f; border-radius:50%; margin:14px; animation:sp 1s linear infinite; }
  @keyframes sp { to { rotate:360deg; } }
</style>
<div class="l"></div>
```



## mistakes

### بدون وحدة

```css bad
.a { rotate:45; }
```

```css good
.a { rotate:45deg; }
```

وحدة الزاوية مطلوبة.

## quiz

### rotate بتحتاج؟
- [x] وحدة زاوية
- [ ] px
- [ ] %
- [ ] ms

deg.

### موجب معناه؟
- [x] مع عقارب الساعة
- [ ] عكس
- [ ] أفقي
- [ ] لا شيء

اتجاه الساعة.

## refs

- [MDN: rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate)
