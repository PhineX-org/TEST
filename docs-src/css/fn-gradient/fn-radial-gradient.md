---
id: fn-radial-gradient
kind: function
cat: fn-gradient
chip: radial-gradient()
title: تدرج دائري
en: CSS radial-gradient() function
status: stable
support: all
mdn: gradient/radial-gradient
summary: radial-gradient() بتعمل تدرج بيتشعّ من نقطة (دايرة أو بيضاوي): radial-gradient(circle at top, #efe0bd, #c9772f).
keywords: radial-gradient, تدرج دائري, circle, ellipse, at center, spotlight
related: fn-linear-gradient, fn-conic-gradient, background-image, backgrounds-borders-guide
---

## intro

الدالة `radial-gradient()` بتعمل تدرج **بيتشعّ من نقطة** للخارج (زي بقعة ضوء أو دايرة موجة)، بدل الخط المستقيم. الصيغة: `radial-gradient(<shape> <size> at <position>, <colors...>)`.

- **الشكل**: `circle` (دايرة) أو `ellipse` (بيضاوي، الافتراضي حسب أبعاد الصندوق).
- **الحجم**: `closest-side` أو `farthest-corner` (الافتراضي) أو طول مثل `60px`.
- **الموضع** بعد `at`: `center` (الافتراضي) أو `top left` أو `30% 70%`.
- **الألوان** زي linear: `#efe0bd 0%, #c9772f 60%, #7a4a1d 100%`.

استخدامات: **توهّج/spotlight** خلف عنصر، **أزرار لامعة**، خلفية بدفء مركزي، أو **نقاط (dots)** مع `background-size` ([[fn-repeating-linear-gradient]] للخطوط). مثال دافي: `radial-gradient(circle at 30% 20%, #efe0bd, #c9772f)`. حاول تستخدمه برفق؛ التدرجات الناعمة بتريّح العين. تخيّل نقطة ضوء على حيطة: المنتصف أفتح وكل ما تبعد بيغمق تدريجياً، وده بالظبط شغل التدرج الدائري.

## try

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:radial-gradient(circle,#efe0bd,#c9772f)"></div><div class="g" style="background:radial-gradient(circle at 30% 20%,#efe0bd,#7a4a1d)"></div><div class="g" style="background:radial-gradient(ellipse at bottom,#c9772f,#efe0bd 70%)"></div>
```

## syntax

```css nolive
background: radial-gradient(circle, #efe0bd, #c9772f);
background: radial-gradient(circle at 30% 20%, #efe0bd, #7a4a1d);
background: radial-gradient(circle closest-side, #c9772f, transparent);
```

- الافتراضي ellipse عند center.
- `at` بيحدد المركز.
- الحجم الافتراضي farthest-corner.

## use

- توهّج وspotlight.
- أزرار لامعة.
- نقاط مع background-size.

## avoid

- تدرجات زاهية متنافرة.
- نسيان `circle` لو عايز دايرة حقيقية.

## examples

### 1) دايرة من المركز
أبسط.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:radial-gradient(circle,#efe0bd,#c9772f)"></div>
```



### 2) موضع المركز
at 30% 20%.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="background:radial-gradient(circle at 30% 20%,#efe0bd,#7a4a1d)"></div>
```



### 3) توهّج
transparent في الآخر.

```html
<style>
  .b { width:180px; height:90px; border-radius:10px; background:#3d2c18; display:grid; place-items:center; }
  .b span { padding:14px 22px; border-radius:50%; background:radial-gradient(circle, #e4c490, rgba(228,196,144,0) 70%); color:#f3ede0; font-weight:bold; }
</style>
<div class="b"><span>توهّج</span></div>
```



### 4) نقاط متكررة
background-size.

```html
<style>
  .d { width:180px; height:80px; border-radius:10px; background:radial-gradient(circle,#c9772f 20%,transparent 22%) 0 0/16px 16px, #efe0bd; }
</style>
<div class="d"></div>
```



## mistakes

### ellipse بدل circle

```css bad
radial-gradient(#efe0bd,#c9772f)  /* على صندوق مستطيل بيطلع بيضاوي */
```

```css good
radial-gradient(circle, #efe0bd, #c9772f)
```

حدد circle.

### توهّج بدون شفافية

```css bad
radial-gradient(circle, #e4c490, #3d2c18)  /* حواف غامقة مش شفافة */
```

```css good
radial-gradient(circle, #e4c490, rgba(228,196,144,0) 70%)
```

transparent في الآخر للتوهّج.

## quiz

### radial-gradient بيتشعّ من؟
- [x] نقطة
- [ ] خط
- [ ] حافة
- [ ] ركن فقط

مركز.

### الشكل الافتراضي؟
- [x] ellipse
- [ ] circle
- [ ] square
- [ ] line

بيضاوي.

### بتحدد المركز بـ؟
- [x] at
- [ ] from
- [ ] to
- [ ] by

at x y.

## refs

- [MDN: radial-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient)
