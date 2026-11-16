---
id: image-rendering
kind: property
cat: modern-props
chip: image-rendering
title: جودة تكبير الصور
en: CSS image-rendering property
status: stable
support: all
size: compact
mdn: image-rendering
summary: image-rendering بتحدد خوارزمية تكبير الصور: auto ناعم، وpixelated يبين البكسلات الحادة (مفيد لـ pixel art).
keywords: image-rendering, pixelated, crisp-edges, pixel art, تكبير
related: object-fit, filter
---

## intro

الخاصية `image-rendering` بتحدد **الطريقة اللي المتصفح بيكبّر بيها الصور**. الافتراضي **`auto`**: تكبير ناعم بيعمل «تغبيش» (smoothing) وده حلو للصور الفوتوغرافية. لكن لو عندك **pixel art** (صور ألعاب بكسلات صغيرة) أو QR code فالنعومة بتبوّظها. الحل: **`pixelated`** (حواف حادة مربعة) أو `crisp-edges` (يحافظ على الحدة). بتتحط على `img` أو `canvas`. مفيدة جداً في ألعاب الويب والأيقونات البكسلية. ومعظم المتصفحات الحديثة بتدعم `pixelated`.

## try

```html
<style>
  img { width:120px; height:60px; border:2px solid #7a4a1d; margin:3px; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='2' shape-rendering='crispEdges'><rect width='2' height='2' fill='%23c9772f'/><rect x='2' width='2' height='1' fill='%233d7a5a'/></svg>" style="image-rendering:pixelated">
```

## syntax

```css nolive
img { image-rendering: auto; }
img.pixel { image-rendering: pixelated; }
img.sharp { image-rendering: crisp-edges; }
```

- **القيمة المبدئية**: `auto`.

## values

### auto
تكبير ناعم.

### pixelated
بكسلات حادة.

### crisp-edges
حواف حادة.

## use

- pixel art.
- QR code وأيقونات بكسلية.

## avoid

- pixelated للصور الفوتوغرافية.

## examples

### 1) pixelated
بكسلات واضحة.

```html
<style>
  img { width:120px; height:60px; border:2px solid #7a4a1d; image-rendering:pixelated; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='2' shape-rendering='crispEdges'><rect width='2' height='2' fill='%23c9772f'/><rect x='2' width='2' height='1' fill='%233d7a5a'/></svg>">
```



### 2) auto
ناعم.

```html
<style>
  img { width:120px; height:60px; border:2px solid #7a4a1d; image-rendering:auto; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>">
```



### 3) canvas
لعبة بكسلات.

```html
<style>
  canvas { width:120px; height:60px; border:2px solid #7a4a1d; image-rendering:pixelated; background:#efe0bd; }
</style>
<canvas id="c" width="8" height="4"></canvas>
<script>var x=document.getElementById('c').getContext('2d');x.fillStyle='#c9772f';x.fillRect(1,1,3,2);x.fillStyle='#3d7a5a';x.fillRect(5,0,2,2);</script>
```



## mistakes

### نعومة تبوّظ بكسلات

```css bad
img.pixel { }  /* غباش */
```

```css good
img.pixel { image-rendering:pixelated; }
```

للـ pixel art.

## quiz

### pixelated بتعمل؟
- [x] حواف حادة مربعة
- [ ] تنعّم
- [ ] تلوّن
- [ ] تدوّر

بكسلات.

### الافتراضي؟
- [x] auto
- [ ] pixelated
- [ ] crisp-edges
- [ ] smooth

auto.

## refs

- [MDN: image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)
