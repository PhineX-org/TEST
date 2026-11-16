---
id: background-position
kind: property
cat: borders-bg
chip: background-position
title: موضع الخلفية
en: CSS background-position property
status: stable
support: all
size: compact
mdn: background-position
summary: background-position بتحدد مكان صورة الخلفية جوه العنصر: center وtop وleft وبنسب وبكسلات. مع cover بتتحكم في الجزء الظاهر.
keywords: background-position, موضع, center, top, left, نسبة, focal point, cover
related: background, background-size, background-repeat, object-position, dt-position
---

## intro

الخاصية `background-position` بتحدد **مكان صورة الخلفية** جوه العنصر. القيم: كلمات (`center` و`top` و`bottom` و`left` و`right`)، أو أطوال (`20px 10px`)، أو نسب (`50% 50%`). أول قيمة أفقي والتانية رأسي. الافتراضي `0% 0%` (الركن). مع `background-size: cover` بتتحكم في **أنهي جزء من الصورة يظهر**: `center` للوسط، و`top` لو عايز الجزء العلوي (الوجوه في الصور مثلاً). وفيه صيغة بإزاحة من حافة: `right 10px bottom 20px`. بتتكتب في الاختصار [[background]] قبل `/` الحجم. مرتبطة بـ [[dt-position]].

## try

```html
<style>
  .b { height:90px; background:radial-gradient(circle,#c9772f 30%,transparent 31%) no-repeat, #efe0bd;
       background-size:40px 40px; background-position:right 10px bottom 10px; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-position: center;
background-position: 50% 20%;
background-position: right 10px bottom 20px;
background-position: top left;
```

- **القيمة المبدئية**: `0% 0%`.
- أفقي ثم رأسي.

## values

### keyword
center/top/bottom/left/right.

### `<length-percentage>`
قيمة أو نسبة.

### edge offset
`right 10px bottom 20px`.

## use

- توسيط صورة خلفية.
- اختيار الجزء الظاهر مع cover.
- صورة في ركن.

## avoid

- نسيان إن الافتراضي الركن العلوي.

## examples

### 1) center
في النص.

```html
<style>
  .b { height:80px; background:radial-gradient(#c9772f 40%,transparent 41%) no-repeat, #efe0bd; background-size:50px 50px; background-position:center; }
</style>
<div class="b"></div>
```



### 2) ركن
أسفل يمين بإزاحة.

```html
<style>
  .b { height:80px; background:radial-gradient(#3d7a5a 40%,transparent 41%) no-repeat, #efe0bd; background-size:40px 40px; background-position:right 8px bottom 8px; }
</style>
<div class="b"></div>
```



### 3) نسب
30% أفقي و70% رأسي.

```html
<style>
  .b { height:80px; background:radial-gradient(#7a4a1d 40%,transparent 41%) no-repeat, #efe0bd; background-size:30px 30px; background-position:30% 70%; }
</style>
<div class="b"></div>
```



## mistakes

### ترتيب القيم

```css bad
.b { background-position:top 20px; }  /* غلط */
```

```css good
.b { background-position:20px top; }
```

الأفقي الأول ثم الرأسي.

## quiz

### الافتراضي؟
- [ ] center
- [x] 0% 0%
- [ ] 100% 100%
- [ ] top right

الركن.

### مع cover بتتحكم في؟
- [ ] اللون
- [x] الجزء الظاهر
- [ ] الحجم
- [ ] التكرار

focal point.

## refs

- [MDN: background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
