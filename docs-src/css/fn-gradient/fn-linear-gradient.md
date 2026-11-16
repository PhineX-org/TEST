---
id: fn-linear-gradient
kind: function
cat: fn-gradient
chip: linear-gradient()
title: دالة linear-gradient(): تدرج خطي
en: CSS linear-gradient() function
status: stable
support: all
mdn: gradient/linear-gradient
summary: linear-gradient() بتعمل تدرج لوني في خط مستقيم بزاوية أو اتجاه: linear-gradient(to left, #c9772f, #efe0bd).
keywords: linear-gradient, تدرج, gradient, background, angle, color stops
related: fn-radial-gradient, fn-conic-gradient, fn-repeating-linear-gradient, background-image, backgrounds-borders-guide
---

## intro

الدالة `linear-gradient()` بتعمل **تدرج لوني خطي**: لون بيتحول لونٍ تاني على خط مستقيم. وهي **صورة** (مش لون)، فبتتحط في `background` أو `background-image`، مش `background-color`.

الصيغة: `linear-gradient(<direction>, <color1>, <color2>, ...)`.

- **الاتجاه**: بكلمات `to right` أو `to bottom left`، أو بزاوية: `45deg` (0deg = لفوق، 90deg = لليمين، 180deg = لتحت). لو مكتبتش اتجاه الافتراضي `to bottom` (من فوق لتحت).
- **نقاط اللون (color stops)**: كل لون ممكن تديه موضع: `#c9772f 0%, #efe0bd 70%`. وقف لونين في نفس الموضع بيعمل **حد حاد** مش متدرج: `red 50%, blue 50%`.
- **أكتر من لونين** مسموح، وكمان **نقطة منتصف** (hint) بين لونين: `red, 30%, blue`.

استخدامات: خلفيات الأقسام، أزرار، **overlay غامق** فوق صورة عشان النص يبان: `linear-gradient(transparent, rgba(61,44,24,.7))`، وأشرطة تقدّم، وخطوط مخططة بالتكرار ([[fn-repeating-linear-gradient]]). نصيحة: التدرجات الناعمة بين ألوان دافية أريح للعين من التباين العالي.

## try

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:linear-gradient(to left,#c9772f,#efe0bd)"></div><div class="g" style="background:linear-gradient(135deg,#7a4a1d,#c9772f 50%,#efe0bd)"></div><div class="g" style="background:linear-gradient(#c9772f 50%,#3d7a5a 50%)"></div>
```

## syntax

```css nolive
background: linear-gradient(to right, #c9772f, #efe0bd);
background: linear-gradient(135deg, #7a4a1d, #c9772f 50%, #efe0bd);
background: linear-gradient(transparent, rgba(61,44,24,.7));
```

- الافتراضي `to bottom`.
- الزاوية: 0deg لفوق، 90deg لليمين.
- نقطتين في نفس الموضع = حد حاد.

## use

- خلفيات أقسام وأزرار.
- overlay فوق صورة للنص.
- أشرطة تقدّم.

## avoid

- تدرجات بألوان زاهية متنافرة.
- استخدامها مع background-color بدل background-image.

## examples

### 1) اتجاه بكلمات
to right.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:linear-gradient(to right,#c9772f,#efe0bd)"></div><div class="g" style="background:linear-gradient(to bottom,#c9772f,#efe0bd)"></div>
```



### 2) زاوية وأكتر من لونين
135deg.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:linear-gradient(135deg,#7a4a1d,#c9772f 50%,#efe0bd)"></div>
```



### 3) حد حاد
نفس الموضع.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:linear-gradient(90deg,#c9772f 50%,#3d7a5a 50%)"></div>
```



### 4) overlay فوق صورة
النص يبان.

```html
<style>
  .h { position:relative; width:180px; height:100px; border-radius:10px; background:#e4c490; overflow:hidden; }
  .h::after { content:""; position:absolute; inset:0; background:linear-gradient(transparent 30%, rgba(61,44,24,.75)); }
  .h span { position:absolute; z-index:1; bottom:8px; inset-inline:10px; color:#f3ede0; font-weight:bold; }
</style>
<div class="h"><span>عنوان فوق الصورة</span></div>
```



## mistakes

### في background-color

```css bad
background-color:linear-gradient(#c9772f,#efe0bd);  /* مش بيشتغل */
```

```css good
background:linear-gradient(#c9772f,#efe0bd);
```

التدرج صورة.

### ظن الزاوية 0 لليمين

```css bad
linear-gradient(0deg, A, B)  /* 0deg لفوق */
```

```css good
linear-gradient(90deg, A, B)  /* لليمين */
```

0deg = لفوق.

## quiz

### التدرج بيتحط في؟
- [x] background-image أو background
- [ ] background-color
- [ ] color
- [ ] border-color

هو صورة.

### 90deg تعني؟
- [x] لليمين
- [ ] لفوق
- [ ] لتحت
- [ ] لليسار

لليمين.

### لونين بنفس الموضع؟
- [x] حد حاد
- [ ] مزج
- [ ] خطأ
- [ ] شفافية

بدون تدرج.

## refs

- [MDN: linear-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)
