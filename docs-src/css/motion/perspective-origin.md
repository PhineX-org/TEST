---
id: perspective-origin
kind: property
cat: motion
chip: perspective-origin
title: نقطة النظر
en: CSS perspective-origin property
status: stable
support: all
size: compact
mdn: perspective-origin
summary: perspective-origin بتحدد موضع «عين المشاهد» للمنظور: المركز افتراضياً، وتغييرها بيحرّك زاوية الرؤية.
keywords: perspective-origin, نقطة النظر, 3D, عين
related: perspective, transform, transform-origin
---

## intro

الخاصية `perspective-origin` بتحدد **موضع عين المشاهد** (نقطة التلاشي) لـ [[perspective]]. الافتراضي `50% 50%` (من منتصف العنصر الأب). لو غيّرتها لـ `top left` الرؤية هتبقى كأنك واقف في الزاوية العلوية اليسرى بتبص على العناصر. بتتحط على نفس الأب اللي عليه `perspective`، وبتتحكم في **زاوية الرؤية** مش الحجم. تأثيرها واضح لما تحرّك قيمتها مع `hover` أو الماوس لعمل تأثير parallax ثلاثي الأبعاد.

## try

```html
<style>
  .s { perspective:300px; perspective-origin:0% 0%; width:140px; margin:10px auto; }
  .c { padding:16px; text-align:center; background:#c9772f; color:#f3ede0; border-radius:8px; transform:rotateY(40deg); font-weight:bold; }
</style>
<div class="s"><div class="c">من الزاوية</div></div>
```

## syntax

```css nolive
perspective-origin: 50% 50%;
perspective-origin: top left;
perspective-origin: 25% 75%;
```

- **القيمة المبدئية**: `50% 50%`.

## values

### keywords
left وright وtop وbottom وcenter.

### `<percentage>`
نسبة من الأب.

## use

- تغيير زاوية الرؤية.
- تأثير parallax.

## avoid

- وضعها بدون perspective.

## examples

### 1) زوايا
مقارنة ثلاث نقاط.

```html
<style>
  .s { display:inline-block; perspective:250px; margin:6px; }
  .c { width:70px; padding:12px 0; text-align:center; background:#c9772f; color:#f3ede0; border-radius:6px; transform:rotateY(45deg); }
</style>
<div class="s" style="perspective-origin:0% 50%"><div class="c">شمال</div></div><div class="s" style="perspective-origin:50% 50%"><div class="c">وسط</div></div><div class="s" style="perspective-origin:100% 50%"><div class="c">يمين</div></div>
```



### 2) رأسي
أعلى وأسفل.

```html
<style>
  .s { display:inline-block; perspective:250px; margin:6px; }
  .c { width:70px; padding:12px 0; text-align:center; background:#3d7a5a; color:#f3ede0; border-radius:6px; transform:rotateX(45deg); }
</style>
<div class="s" style="perspective-origin:50% 0%"><div class="c">فوق</div></div><div class="s" style="perspective-origin:50% 100%"><div class="c">تحت</div></div>
```



### 3) تحريك
يتحرك مع hover.

```html
<style>
  .s { perspective:300px; perspective-origin:0% 50%; transition:perspective-origin .6s; width:130px; margin:10px auto; }
  .s:hover { perspective-origin:100% 50%; }
  .c { padding:14px; text-align:center; background:#7a4a1d; color:#f3ede0; border-radius:8px; transform:rotateY(40deg); }
</style>
<div class="s"><div class="c">مرّر</div></div>
```



## mistakes

### بدون perspective

```css bad
.s { perspective-origin:left; }  /* مفيش منظور */
```

```css good
.s { perspective:400px; perspective-origin:left; }
```

محتاجة perspective.

## quiz

### perspective-origin بتحدد؟
- [x] موضع عين المشاهد
- [ ] حجم العنصر
- [ ] لون
- [ ] اتجاه

نقطة النظر.

### الافتراضي؟
- [x] 50% 50%
- [ ] 0 0
- [ ] 100% 100%
- [ ] none

المركز.

## refs

- [MDN: perspective-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin)
