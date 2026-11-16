---
id: object-position
kind: property
cat: modern-props
chip: object-position
title: موضع الصورة داخل صندوقها
en: CSS object-position property
status: stable
support: all
size: compact
mdn: object-position
summary: object-position بتحدد أنهي جزء من الصورة يفضل ظاهر لما object-fit يقص: top أو center أو 20% 30%.
keywords: object-position, object-fit, cover, crop, موضع الصورة
related: object-fit, background-position, aspect-ratio
---

## intro

الخاصية `object-position` شبه `background-position` لكن لـ **الصور والفيديو** (`img`/`video`). بتحدد **أنهي جزء** من المحتوى يفضل ظاهر لما [[object-fit]] (`cover` أو `none`) بيقص منه. الافتراضي `50% 50%` (النص). لو في صورتك شخص في الأعلى وبتعمل `cover` في صندوق عريض، هتتقص راسه! الحل: `object-position: top;` (أو `50% 20%`) فيفضل الجزء المهم ظاهر. القيم: كلمات (`top` `bottom` `left` `right` `center`) أو نسب أو أطوال. زي ما تحرّك صورة جوه إطار صورة وتقرر أنهي جزء منها يبان.

## try

```html
<style>
  img { width:110px; height:60px; object-fit:cover; border:2px solid #7a4a1d; margin:3px; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-position:left"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-position:right">
```

## syntax

```css nolive
img { object-fit: cover; object-position: top; }
img { object-position: 20% 30%; }
img { object-position: center bottom; }
```

- **القيمة المبدئية**: `50% 50%`.
- مع cover غالباً.

## values

### top / bottom / left / right / center
كلمات.

### `<percentage>`
نسب.

### `<length>`
إزاحة.

## use

- إبقاء وجه أو موضوع الصورة ظاهر.
- صور بطاقات متنوعة النسب.

## avoid

- استخدامها بدون object-fit.

## examples

### 1) يسار ويمين
الجزء الظاهر يتغير.

```html
<style>
  img { width:110px; height:60px; object-fit:cover; border:2px solid #7a4a1d; margin:3px; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-position:left"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>" style="object-position:right">
```



### 2) نسب مئوية
20% 80%.

```html
<style>
  img { width:110px; height:60px; object-fit:cover; object-position:80% 50%; border:2px solid #7a4a1d; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>">
```



### 3) الافتراضي
النص.

```html
<style>
  img { width:110px; height:60px; object-fit:cover; border:2px solid #7a4a1d; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect width='200' height='100' fill='%23e4c490'/><circle cx='50' cy='50' r='40' fill='%23c9772f'/><rect x='110' y='20' width='70' height='60' fill='%233d7a5a'/></svg>">
```



## mistakes

### بدون object-fit

```css bad
img { object-position:top; }  /* مفيش قص فمفيش أثر */
```

```css good
img { object-fit:cover; object-position:top; }
```

محتاجة object-fit.

## quiz

### بتتحكم في؟
- [x] الجزء الظاهر من الصورة
- [ ] لونها
- [ ] حدتها
- [ ] ظلها

موضع القص.

### الافتراضي؟
- [x] 50% 50%
- [ ] 0 0
- [ ] 100% 100%
- [ ] top

النص.

## refs

- [MDN: object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)
