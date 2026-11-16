---
id: object-fit
kind: property
cat: modern-props
chip: object-fit
title: ملاءمة الصورة داخل صندوقها
en: CSS object-fit property
status: stable
support: all
mdn: object-fit
summary: object-fit بتحدد إزاي الصورة أو الفيديو يملا صندوقه: cover يقص ويملا، contain يظهر كامل، fill يمط، none، scale-down.
keywords: object-fit, cover, contain, fill, صورة, crop, aspect ratio
related: object-position, aspect-ratio, width, height
---

## intro

الخاصية `object-fit` بتتحكم في **إزاي المحتوى المُستبدل** (صورة `img` أو `video`) **يتناسب مع الصندوق** اللي ليه عرض وارتفاع محدد. من غيرها لو حطيت `width` و`height` مش بنفس نسبة الصورة، الصورة **بتتمط وتتشوه** (وده `fill`، الافتراضي!).

القيم:
- **`cover`** ⭐: الصورة تملا الصندوق كله **بنسبتها الصحيحة**، وبتقص الزايد. أشهر قيمة (صور بطاقات وخلفيات).
- **`contain`**: الصورة تظهر **كاملة** جوه الصندوق، وممكن يفضل فراغ على الجوانب.
- **`fill`**: تتمط (الافتراضي).
- **`none`**: حجمها الأصلي من غير تغيير.
- **`scale-down`**: زي none أو contain أيهما أصغر.

تخيّلها زي صورة في إطار: `cover` بتقص الصورة عشان تملا الإطار، و`contain` بتصغّرها عشان تتدخل كلها. وبتتحكم في جزء القص بـ [[object-position]]. الأشهر: `img { width: 100%; height: 200px; object-fit: cover; }`.

## try

```html
<style>
  img { width:110px; height:80px; border:2px solid #7a4a1d; margin:3px; background:#f3ede0; }
  div { display:inline-block; text-align:center; color:#3d2c18; font-size:.8rem; }
</style>
<div><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-fit:fill"><br>fill</div><div><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-fit:cover"><br>cover</div><div><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-fit:contain"><br>contain</div>
```

## syntax

```css nolive
img { object-fit: cover; }
img { object-fit: contain; }
video { object-fit: cover; }
```

- **القيمة المبدئية**: `fill`.
- للـ img وvideo وcanvas.

## values

### cover
يملا ويقص بالنسبة الصحيحة.

### contain
يظهر كامل مع فراغ.

### fill
يتمط (الافتراضي).

### none
الحجم الأصلي.

### scale-down
الأصغر من none وcontain.

## use

- `cover` لصور البطاقات والـ thumbnails.
- `contain` للوجوهات والمنتجات.
- خلفية فيديو بـ cover.

## avoid

- ترك fill مع نسب مختلفة (تشوه).
- cover بدون التأكد إن الجزء المهم مش بيتقص.

## examples

### 1) cover
بطاقة صورة.

```html
<style>
  img { width:140px; height:80px; object-fit:cover; border-radius:8px; border:2px solid #7a4a1d; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>">
```



### 2) contain
الصورة كاملة.

```html
<style>
  img { width:140px; height:80px; object-fit:contain; border-radius:8px; border:2px solid #7a4a1d; background:#f3ede0; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="height:120px">
```



### 3) fill (تشوه)
الافتراضي.

```html
<style>
  img { width:100px; height:100px; object-fit:fill; border:2px solid #7a4a1d; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>">
```



### 4) none وscale-down
أحجام أصلية.

```html
<style>
  img { width:120px; height:60px; border:2px solid #7a4a1d; margin:3px; background:#f3ede0; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-fit:none"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-fit:scale-down">
```



## mistakes

### صورة مشوّهة

```css bad
img { width:200px; height:200px; }  /* الصورة تتمط */
```

```css good
img { width:200px; height:200px; object-fit:cover; }
```

cover بيحافظ على النسبة.

### وضع object-fit على div

```css bad
.box { object-fit:cover; }
```

```css good
img.box { object-fit:cover; }
```

للصور والفيديو فقط.

## quiz

### لو عايز الصورة تملا الصندوق بدون تشوه؟
- [x] cover
- [ ] fill
- [ ] none
- [ ] contain

cover.

### الافتراضي؟
- [x] fill
- [ ] cover
- [ ] contain
- [ ] none

fill (يمط).

### بتتحكم في جزء القص بـ؟
- [x] object-position
- [ ] position
- [ ] float
- [ ] clip

object-position.

## refs

- [MDN: object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
