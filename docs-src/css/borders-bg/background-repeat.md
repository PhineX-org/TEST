---
id: background-repeat
kind: property
cat: borders-bg
chip: background-repeat
title: تكرار الخلفية
en: CSS background-repeat property
status: stable
support: all
size: compact
mdn: background-repeat
summary: background-repeat بتحدد هل صورة الخلفية تتكرر أفقياً ورأسياً: repeat وno-repeat وrepeat-x وrepeat-y وspace وround.
keywords: background-repeat, تكرار, no-repeat, repeat-x, repeat-y, space, round, نمط
related: background, background-image, background-size, background-position
---

## intro

الخاصية `background-repeat` بتحدد **هل صورة الخلفية (أو التدرج) تتكرر** لحد ما تملأ العنصر. الافتراضي `repeat` (تتكرر في الاتجاهين)، فصورة صغيرة بتتحول لنمط. القيم: `no-repeat` (مرة واحدة)، `repeat-x` (أفقياً بس)، `repeat-y` (رأسياً بس)، `space` (بتتكرر من غير قص وبتوزّع الفراغ بينها)، و`round` (بتتكرر وبتتمدد/تتقلص شوية علشان تملأ بالظبط). تقدر تكتب قيمتين: أفقي ورأسي. تُستخدم مع [[background-image]] و[[background-size]].

## try

```html
<style>
  .b { height:80px; background:radial-gradient(#c9772f 40%,transparent 41%) 0 0 / 24px 24px; background-repeat:repeat-x; background-color:#efe0bd; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-repeat: repeat;
background-repeat: no-repeat;
background-repeat: repeat-x;
background-repeat: space round;
```

- **القيمة المبدئية**: `repeat`.
- قيمتين: أفقي ورأسي.

## values

### repeat
يتكرر في الاتجاهين.

### no-repeat
مرة واحدة.

### repeat-x
أفقياً بس.

### space
تكرار مع توزيع الفراغ.

### round
تكرار مع تعديل الحجم.

## use

- صور hero بدون تكرار.
- نمط يتكرر أفقياً (خط زخرفي).

## avoid

- نسيان no-repeat مع صور الغلاف.

## examples

### 1) repeat
نمط كامل.

```html
<style>
  .b { height:70px; background:radial-gradient(#7a4a1d 35%,transparent 36%) 0 0/20px 20px, #efe0bd; background-repeat:repeat; }
</style>
<div class="b"></div>
```



### 2) no-repeat
مرة واحدة.

```html
<style>
  .b { height:70px; background:radial-gradient(#7a4a1d 35%,transparent 36%) 0 0/40px 40px, #efe0bd; background-repeat:no-repeat; }
</style>
<div class="b"></div>
```



### 3) repeat-x
صف أفقي.

```html
<style>
  .b { height:70px; background:radial-gradient(#3d7a5a 35%,transparent 36%) 0 0/30px 30px, #efe0bd; background-repeat:repeat-x; }
</style>
<div class="b"></div>
```



## mistakes

### نسيان no-repeat

```css bad
.hero { background-image:url(a.png); }
```

```css good
.hero { background:url(a.png) no-repeat center/cover; }
```

الافتراضي بيكرر.

## quiz

### الافتراضي؟
- [ ] no-repeat
- [x] repeat
- [ ] space
- [ ] round

repeat.

### repeat-x؟
- [ ] رأسي
- [x] أفقي
- [ ] لا تكرار
- [ ] الاتنين

أفقياً فقط.

## refs

- [MDN: background-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)
