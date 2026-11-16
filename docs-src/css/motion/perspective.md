---
id: perspective
kind: property
cat: motion
chip: perspective
title: المنظور ثلاثي الأبعاد
en: CSS perspective property
status: stable
support: all
mdn: perspective
summary: perspective بتضيف إحساس العمق لتحويلات 3D للأبناء: كل ما القيمة أقل المنظور أقوى (أقرب للعين).
keywords: perspective, 3D, عمق, منظور, rotateY, perspective-origin
related: perspective-origin, transform-style, transform, fn-perspective
---

## intro

الخاصية `perspective` بتحدد **المسافة بين عينك والعنصر** في عالم 3D، وبتدّي **إحساس العمق** لتحويلات الأبناء (`rotateX` و`rotateY` و`translateZ`). من غيرها الدوران ثلاثي الأبعاد بيبان **مسطّح** زي لوحة بتتقلّص بس.

- **قيمة صغيرة** (مثلاً `200px`) = المنظور **قوي** والتشوه كبير (العين قريبة).
- **قيمة كبيرة** (مثلاً `1500px`) = المنظور **خفيف** وطبيعي.

بتتحط على **الأب** وبتأثر على **أبنائه** (مش على نفسه). لو عايز المنظور على العنصر نفسه استخدم دالة [[fn-perspective]] جوه `transform`: `transform: perspective(500px) rotateY(30deg)`. ونقطة النظر بتتحكم فيها [[perspective-origin]].

> [!tip] ابدأ بـ `perspective: 800px` لأن ده رقم متوازن لأغلب الأمثلة.

## try

```html
<style>
  .s { perspective:300px; width:140px; margin:10px auto; }
  .c { padding:20px; text-align:center; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; transform:rotateY(45deg); }
</style>
<div class="s"><div class="c">منظور 3D</div></div>
```

## syntax

```css nolive
perspective: none;
perspective: 600px;
perspective: 1200px;
```

- **القيمة المبدئية**: `none`.
- بتتحط على الأب.
- قيمة أقل = منظور أقوى.

## values

### none
بدون منظور.

### `<length>`
المسافة (أقل = أقوى).

### inherit
ياخد القيمة من الأب.

## use

- دوران 3D واقعي.
- كروت تنقلب.
- مكعبات.

## avoid

- وضعها على العنصر المتحوّل نفسه (مبتأثرش).
- قيم صغيرة جداً بتشوّه الشكل.

## examples

### 1) قيم مختلفة
200 مقابل 800.

```html
<style>
  .s { display:inline-block; margin:6px; }
  .c { width:90px; padding:14px 0; text-align:center; background:#c9772f; color:#f3ede0; border-radius:6px; font-weight:bold; transform:rotateY(50deg); }
</style>
<div class="s" style="perspective:200px"><div class="c">200</div></div><div class="s" style="perspective:800px"><div class="c">800</div></div>
```



### 2) بدون منظور
يبان مسطح.

```html
<style>
  .c { width:120px; padding:14px 0; text-align:center; background:#c9772f; color:#f3ede0; border-radius:6px; font-weight:bold; transform:rotateY(50deg); margin:10px auto; }
</style>
<div class="c">بدون perspective</div>
```



### 3) بدالة
على العنصر نفسه.

```html
<style>
  .c { width:120px; padding:14px 0; text-align:center; background:#3d7a5a; color:#f3ede0; border-radius:6px; font-weight:bold; transform:perspective(300px) rotateY(40deg); margin:10px auto; }
</style>
<div class="c">perspective()</div>
```



### 4) hover
يلف في 3D.

```html
<style>
  .s { perspective:500px; width:130px; margin:10px auto; }
  .c { padding:16px; text-align:center; background:#7a4a1d; color:#f3ede0; border-radius:8px; transition:transform .4s; }
  .s:hover .c { transform:rotateX(35deg); }
</style>
<div class="s"><div class="c">مرّر</div></div>
```



## mistakes

### على العنصر المتحوّل

```css bad
.card { perspective:500px; transform:rotateY(30deg); }  /* مفيش عمق */
```

```css good
.wrap { perspective:500px; }
.card { transform:rotateY(30deg); }
```

تتحط على الأب.

### قيمة صغيرة جداً

```css bad
.s { perspective:20px; }
```

```css good
.s { perspective:800px; }
```

تشوه مفرط.

## quiz

### perspective بتتحط على؟
- [x] الأب
- [ ] العنصر المتحوّل
- [ ] body فقط
- [ ] img

الأب.

### قيمة أقل؟
- [x] منظور أقوى
- [ ] منظور أضعف
- [ ] لا يتغيّر
- [ ] يختفي

أقرب للعين.

### البديل على العنصر نفسه؟
- [x] perspective() في transform
- [ ] perspective-origin
- [ ] z-index
- [ ] scale

الدالة.

## refs

- [MDN: perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
