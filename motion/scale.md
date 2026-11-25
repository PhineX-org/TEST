---
id: scale
kind: property
cat: motion
chip: scale
title: تكبير مستقل
en: CSS scale property
status: stable
support: all
size: compact
mdn: scale
summary: scale خاصية مستقلة لتكبير أو تصغير العنصر بدون ما تلمس transform. مفيدة في transition وanimation المنفصلة.
keywords: scale, تكبير, تصغير, individual transforms
related: transform, translate, rotate, fn-scale
---

## intro

الخاصية `scale` بتكبّر أو تصغّر العنصر **بشكل مستقل** عن `transform`. `scale: 1.2` = تكبير 20%، و`scale: 0.8` = تصغير، و`scale: 1 2` = x ثم y. بتخلّي كود الـ hover أنضف: `scale: 1.1;` بدل `transform: scale(1.1)`. وبتفيد في تحريك **التكبير لوحده** بدون ما تتعارض مع حركات التدوير أو التحريك اللي على نفس العنصر. القيمة المبدئية `none` (= `1`). والتكبير بيحصل حوالين [[transform-origin]]. يعني الزرار اللي بيكبر من مركزه بيبان كأنه بيتنفس، لكن لو غيّرت الأصل هيكبر من زاوية.

## try

```html
<style>
  .b { display:inline-block; padding:10px 18px; background:#3d7a5a; color:#f3ede0; border-radius:8px; font-weight:bold; margin:14px; transition:scale .25s; }
  .b:hover { scale:1.2; }
</style>
<div class="b">مرّر</div>
```

## syntax

```css nolive
scale: 1.2;
scale: 0.8;
scale: 1 2;
scale: none;
```

- **القيمة المبدئية**: `none`.
- رقم بدون وحدة.

## values

### `<number>`
معامل التكبير.

### x y
محورين.

### none
بدون.

## use

- تكبير زرار عند hover.
- تصغير عند الضغط.

## avoid

- تكبير ضخم يغطي عناصر تانية.

## examples

### 1) مستويات
تصغير وتكبير.

```html
<style>
  .b { display:inline-block; width:40px; height:40px; background:#c9772f; border-radius:6px; margin:10px 14px; }
</style>
<div class="b" style="scale:.6"></div><div class="b"></div><div class="b" style="scale:1.5"></div>
```



### 2) hover
يكبّر بنعومة.

```html
<style>
  .b { width:80px; height:50px; background:#7a4a1d; border-radius:8px; margin:14px; transition:scale .3s; }
  .b:hover { scale:1.25; }
</style>
<div class="b"></div>
```



### 3) محورين
x مختلف عن y.

```html
<style>
  .b { width:50px; height:50px; background:#3d7a5a; border-radius:6px; margin:20px; scale:1.6 .7; }
</style>
<div class="b"></div>
```



## mistakes

### وحدة مع القيمة

```css bad
.a { scale:1.2px; }
```

```css good
.a { scale:1.2; }
```

رقم بدون وحدة.

## quiz

### scale: 2 معناها؟
- [x] ضعف الحجم
- [ ] نصف الحجم
- [ ] 2px
- [ ] دوران

تكبير مرتين.

### القيمة المبدئية؟
- [x] none
- [ ] 1px
- [ ] 0
- [ ] auto

none.

## refs

- [MDN: scale](https://developer.mozilla.org/en-US/docs/Web/CSS/scale)
