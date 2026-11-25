---
id: shape-outside
kind: property
cat: modern-props
chip: shape-outside
title: التفاف النص حول شكل
en: CSS shape-outside property
status: stable
support: all
size: compact
mdn: shape-outside
summary: shape-outside بتخلّي النص يلتف حول شكل دايري أو مضلع بدل المستطيل، للعناصر العايمة float.
keywords: shape-outside, float, circle, polygon, التفاف النص
related: float, fn-circle, fn-polygon, clip-path
---

## intro

الخاصية `shape-outside` بتخلّي **النص يلتف حول شكل** (دايرة أو مضلع أو صورة شفافة) بدل ما يلتف حول **المستطيل** المعتاد للعنصر العايم (`float`). شغّالة **فقط مع `float`**. مثال: `img { float: right; shape-outside: circle(50%); border-radius: 50%; }` فالنص بيلتف حوالين دايرة الصورة بالظبط. القيم: دوال الأشكال [[fn-circle]] و[[fn-polygon]] وغيرها، أو `url()` لصورة (يستخدم قناة الشفافية)، أو `margin-box`. لاحظ: `shape-outside` بتأثر على **التفاف النص** بس، ومبتقصش العنصر نفسه (للقص استخدم [[clip-path]] أو `border-radius`). وبيتأثر بـ `shape-margin` لمسافة إضافية.

## try

```html
<style>
  .c { width:70px; height:70px; float:right; shape-outside:circle(50%); background:#c9772f; border-radius:50%; margin:0 0 4px 10px; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="c"></div><p>النص هنا بيلتف حوالين الدايرة مش المربع. بص كده على الأسطر الأولى وهي بتنحني حوالين الدايرة. النص هنا بيلتف حوالين الدايرة مش المربع. بص كده على الأسطر الأولى وهي بتنحني حوالين الدايرة.</p>
```

## syntax

```css nolive
.c { float: right; shape-outside: circle(50%); }
.p { float: left; shape-outside: polygon(0 0, 100% 0, 0 100%); }
```

- **القيمة المبدئية**: `none`.
- لازم `float`.
- بتأثر على الالتفاف فقط.

## values

### circle() / ellipse()
دايرة أو بيضاوي.

### polygon()
مضلع.

### url()
من شفافية صورة.

### margin-box
صندوق الـ margin.

## use

- صور دايرية بنص ملتف.
- تصميمات مجلات.

## avoid

- استخدامها بدون float.

## examples

### 1) دايرة
التفاف دايري.

```html
<style>
  .c { width:70px; height:70px; float:right; shape-outside:circle(50%); background:#c9772f; border-radius:50%; margin:0 0 4px 10px; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="c"></div><p>نص بيلتف حوالين دايرة بشكل ناعم وجميل، وكل سطر بيقصر ويطول حسب انحناء الدايرة. نص بيلتف حوالين دايرة بشكل ناعم وجميل.</p>
```



### 2) مثلث بمضلع
polygon.

```html
<style>
  .t { width:80px; height:80px; float:right; background:#3d7a5a; clip-path:polygon(100% 0, 0 0, 100% 100%); shape-outside:polygon(100% 0, 0 0, 100% 100%); margin-inline-start:8px; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="t"></div><p>النص بيلتف حوالين المثلث، فالسطور بتبدأ ضيقة وبعدين تتسع. النص بيلتف حوالين المثلث، فالسطور بتبدأ ضيقة وبعدين تتسع.</p>
```



### 3) بدون shape-outside
الالتفاف المستطيل.

```html
<style>
  .c { width:70px; height:70px; float:right; background:#c9772f; border-radius:50%; margin:0 0 4px 10px; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="c"></div><p>هنا النص بيلتف حوالين المربع غير المرئي حتى لو العنصر دايرة. هنا النص بيلتف حوالين المربع غير المرئي حتى لو العنصر دايرة.</p>
```



## mistakes

### بدون float

```css bad
.c { shape-outside:circle(50%); }  /* مفيش أثر */
```

```css good
.c { float:right; shape-outside:circle(50%); }
```

لازم float.

## quiz

### shape-outside بتغيّر؟
- [x] التفاف النص
- [ ] لون العنصر
- [ ] حجمه
- [ ] موضعه

الالتفاف.

### محتاجة؟
- [x] float
- [ ] flex
- [ ] grid
- [ ] absolute

float.

## refs

- [MDN: shape-outside](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside)
