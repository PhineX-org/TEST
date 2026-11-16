---
id: background-image
kind: property
cat: borders-bg
chip: background-image
title: صورة الخلفية
en: CSS background-image property
status: stable
support: all
mdn: background-image
summary: background-image بتحط صورة (url) أو تدرج لوني (gradient) كخلفية، وممكن طبقات متعددة. مع background-size وposition.
keywords: background-image, صورة خلفية, url, gradient, linear-gradient, طبقات, نقط, نمط
related: background, background-size, background-repeat, fn-linear-gradient, fn-radial-gradient, fn-url
---

## intro

الخاصية `background-image` بتحط **صورة** أو **تدرج لوني** كخلفية للعنصر. القيمة إما `url("image.png")` ([[fn-url]]) أو دالة تدرج زي [[fn-linear-gradient]] و[[fn-radial-gradient]] و[[fn-conic-gradient]]، أو `none` (الافتراضي).

الصور الخلفية **زينة** بس: مفيهاش `alt`، وقارئ الشاشة مش بيشوفها، فمتحطش فيها محتوى مهم (استخدم `<img>` لده).

الصورة بتتكرر افتراضياً (`repeat`) لحد ما تغطي العنصر، وبتتحط في الزاوية، فبتضبطها بـ [[background-repeat]] و[[background-position]] و[[background-size]]. وتقدر تحط **كذا طبقة** مفصولة بفاصلة (الأولى فوق).

وفيه حيل قوية بالتدرجات: **نمط شطرنج، خطوط، نقط** من غير أي ملف صورة.

> [!tip] تدرج + صورة: `background-image: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(a.jpg)` علشان تغمّق الصورة وتحسّن قراءة النص فوقها.

> [!warn] متحطش صور ثقيلة كخلفية من غير ضغط؛ بتبطّأ الصفحة.

## try

```html
<style>
  .b { height:90px; border-radius:10px; background-image:repeating-linear-gradient(45deg,#efe0bd 0 10px,#e4c490 10px 20px); }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-image: url("pic.jpg");
background-image: linear-gradient(#efe0bd, #c9772f);
background-image: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url("pic.jpg");
background-image: none;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** لأ.
- طبقات بفاصلة.

## values

### url()
صورة من ملف.

### `<gradient>`
تدرج خطي أو دائري أو مخروطي.

### none
بدون صورة.

## use

- صور غلاف hero.
- أنماط بتدرجات (خطوط ونقط) بدون ملفات.
- طبقة تعتيم فوق صورة.
- نقوش زخرفية.

## avoid

- محتوى مهم كصورة خلفية (مفيهاش alt).
- صور ضخمة بدون ضغط.

## examples

### 1) تدرج خطي
من لون للون.

```html
<style>
  .b { height:70px; border-radius:10px; background-image:linear-gradient(120deg,#c9772f,#3d7a5a); }
</style>
<div class="b"></div>
```



### 2) خطوط متكررة
نمط بدون صورة.

```html
<style>
  .b { height:70px; border-radius:10px; background-image:repeating-linear-gradient(90deg,#efe0bd 0 14px,#e4c490 14px 28px); }
</style>
<div class="b"></div>
```



### 3) نقط
radial-gradient بحجم صغير.

```html
<style>
  .b { height:70px; border-radius:10px; background-color:#efe0bd;
       background-image:radial-gradient(#7a4a1d 20%,transparent 21%); background-size:16px 16px; }
</style>
<div class="b"></div>
```



### 4) طبقة تعتيم
تدرج شفاف فوق تدرج تاني (بدل صورة).

```html
<style>
  .b { height:80px; border-radius:10px; padding:10px; color:#f3ede0;
       background-image:linear-gradient(rgba(29,25,22,.5),rgba(29,25,22,.5)), linear-gradient(135deg,#c9772f,#3d7a5a); }
</style>
<div class="b">نص واضح فوق خلفية معتمة</div>
```



## mistakes

### نسيان no-repeat

```css bad
.h { background-image:url(a.png); }  /* بيتكرر */
```

```css good
.h { background:url(a.png) no-repeat center / cover; }
```

الصور الصغيرة بتتكرر.

### محتوى مهم كخلفية

```css bad
.logo { background-image:url(logo.png); }  /* مفيش alt */
```

```css good
<img src="logo.png" alt="PhineX">
```

الخلفيات زينة. المحتوى المهم في `img`.

## quiz

### background-image بتقبل؟
- [x] صورة وتدرج
- [ ] لون فقط
- [ ] نص
- [ ] خط

url أو gradient.

### أول طبقة في القائمة؟
- [ ] الأسفل
- [x] الأعلى
- [ ] الوسط
- [ ] عشوائي

الأولى فوق.

### الصور الخلفية مفيهاش؟
- [ ] مسار
- [x] alt
- [ ] حجم
- [ ] تدرج

مفيهاش نص بديل.

## refs

- [MDN: background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
