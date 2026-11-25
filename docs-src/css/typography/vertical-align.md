---
id: vertical-align
kind: property
cat: typography
chip: vertical-align
title: المحاذاة الرأسية
en: CSS vertical-align property
status: stable
support: all
mdn: vertical-align
summary: vertical-align بتحدد المحاذاة الرأسية للعناصر inline وخلايا الجداول: baseline وmiddle وtop وbottom وsub وsuper. مش بتوسّط الصندوق رأسياً.
keywords: vertical-align, middle, baseline, sub, super, محاذاة رأسية, صورة مع نص, خلية جدول
related: text-align, line-height, display, align-items
---

## intro

الخاصية `vertical-align` بتحدد **المحاذاة الرأسية** لحاجتين بس: **1) العناصر الـ inline و inline-block** (زي الصور والأيقونات) بالنسبة لسطر النص اللي هي فيه، و**2) خلايا الجداول** (`td` و`th`) جوه الصف.

⚠️ **أكبر خطأ للمبتدئين**: ناس بتجرّب `vertical-align: middle` على `div` عادي عشان توسّطه رأسياً ومبتشتغلش! **مبتأثرش على عناصر block**. لتوسيط عنصر رأسياً في الصندوق استخدم flex أو grid ([[align-items]]).

القيم الأساسية: **`baseline`** (الافتراضي: الخط اللي بيقعد عليه النص)، **`middle`** (منتصف العنصر عند منتصف حرف x في السطر)، **`top`** و**`bottom`** (أعلى/أسفل السطر)، **`sub`** و**`super`** (منخفض/مرتفع للأرقام السفلية والأسية)، وكمان قيم طول ونسبة.

مشكلة شهيرة: صورة داخل سطر بتسيب فراغ صغير تحتها (لأنها على الـ baseline)؛ الحل `vertical-align: middle` أو `display: block` على الصورة.

## try

```html
<style>
  .l { background:#efe0bd; padding:6px; color:#3d2c18; font-size:1.1rem; }
  .i { display:inline-block; width:34px; height:34px; background:#c9772f; border-radius:6px; }
</style>
<div class="l">baseline <span class="i"></span> middle <span class="i" style="vertical-align:middle"></span> top <span class="i" style="vertical-align:top"></span></div>
```

## syntax

```css nolive
vertical-align: baseline;
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;
vertical-align: sub;
vertical-align: super;
vertical-align: 4px;
```

- **القيمة المبدئية**: `baseline`.
- **بتتوارث؟** لأ.
- بتشتغل على inline وtable-cell فقط.

## values

### baseline
على خط النص (الافتراضي).

### middle
في المنتصف.

### top / bottom
أعلى/أسفل السطر.

### sub / super
سفلي/علوي (أرقام).

## use

- محاذاة أيقونة مع نص.
- محاذاة محتوى خلايا الجدول.
- أرقام أسية وسفلية.

## avoid

- استخدامها على عناصر block.
- توقع توسيط رأسي للـ div.

## examples

### 1) أيقونة مع نص
middle بتظبط المحاذاة.

```html
<style>
  .l { background:#efe0bd; padding:8px; color:#3d2c18; font-size:1.2rem; }
  .i { display:inline-block; width:20px; height:20px; background:#3d7a5a; border-radius:50%; }
</style>
<div class="l"><span class="i"></span> baseline (تحت شوية)</div><div class="l"><span class="i" style="vertical-align:middle"></span> middle (متظبطة)</div>
```



### 2) sub وsuper
معادلات و margins.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.3rem; }
  .s { font-size:.7em; }
</style>
<p>H<span class="s" style="vertical-align:sub">2</span>O و x<span class="s" style="vertical-align:super">2</span></p>
```



### 3) خلية جدول
top مقابل middle.

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; }
  td { border:1px solid #bda27a; padding:6px 10px; height:70px; }
</style>
<table><tr><td style="vertical-align:top">top</td><td style="vertical-align:middle">middle</td><td style="vertical-align:bottom">bottom</td></tr></table>
```



### 4) فراغ تحت الصورة
المشكلة والحل.

```html
<style>
  .a, .b { background:#e4c490; width:80px; margin:4px; display:inline-block; }
  .a span, .b span { display:inline-block; width:80px; height:40px; background:#c9772f; }
  .b span { vertical-align:middle; }
</style>
<div class="a"><span></span></div><div class="b"><span></span></div>
```



## mistakes

### توقع توسيط div

```css bad
.box { height:100px; vertical-align:middle; }  /* مبتشتغلش على block */
```

```css good
.box { height:100px; display:flex; align-items:center; }
```

للتوسيط استخدم flex.

### فراغ تحت الصور

```css bad
img { }  /* فراغ صغير تحت الصورة */
```

```css good
img { vertical-align:middle; }  /* أو display:block */
```

الصورة بتقعد على الـ baseline.

## quiz

### بتشتغل على؟
- [x] inline وtable-cell
- [ ] block كله
- [ ] flex فقط
- [ ] grid فقط

inline وخلايا الجداول.

### لتوسيط div رأسياً؟
- [ ] vertical-align:middle
- [x] flex مع align-items
- [ ] text-align
- [ ] float

flex.

### الافتراضي؟
- [ ] middle
- [ ] top
- [x] baseline
- [ ] bottom

baseline.

## refs

- [MDN: vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
