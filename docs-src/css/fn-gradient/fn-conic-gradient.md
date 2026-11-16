---
id: fn-conic-gradient
kind: function
cat: fn-gradient
chip: conic-gradient()
title: دالة conic-gradient(): تدرج مخروطي
en: CSS conic-gradient() function
status: stable
support: all
mdn: gradient/conic-gradient
summary: conic-gradient() بتعمل تدرج بيلف حوالين نقطة (زي عجلة ألوان أو Pie chart): conic-gradient(#c9772f 40%, #efe0bd 0).
keywords: conic-gradient, pie chart, تدرج مخروطي, عجلة ألوان, angle
related: fn-linear-gradient, fn-radial-gradient, at-property, background-image
---

## intro

الدالة `conic-gradient()` بتعمل تدرج **بيلف حوالين نقطة مركزية** (دوران 360 درجة) زي عقارب الساعة، بدل ما يتشعّ للخارج (radial) أو يمتد في خط (linear). الصيغة: `conic-gradient(from <angle> at <position>, <color stops>)`.

أشهر استخدامات:
- **عجلة الألوان**: `conic-gradient(red, yellow, green, blue, red)`.
- **مخطط دائري (Pie chart)** بدون JavaScript: لونين بحد حاد: `conic-gradient(#c9772f 0 40%, #efe0bd 0)` = 40% برتقالي والباقي بيج. أضف `border-radius: 50%` فتبقى دايرة!
- **مؤشر تقدّم دائري** (progress ring).
- **أنماط شطرنج** بتكرار.

ولو عايزه **يتحرك** (يدور) سجّل زاويته بـ [[at-property]]. وتقدر تغيّر نقطة البداية بـ `from 45deg`. نصيحة: للنقط الحادة اكتب `0` بعد الأول وبعدين نسبة (نفس نقطة التوقف).

## try

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="width:90px;height:90px;border-radius:50%;background:conic-gradient(#c9772f 0 40%,#efe0bd 0)"></div><div class="g" style="width:90px;height:90px;border-radius:50%;background:conic-gradient(#c9772f,#e4c490,#3d7a5a,#7a4a1d,#c9772f)"></div>
```

## syntax

```css nolive
background: conic-gradient(#c9772f 0 40%, #efe0bd 0);   /* pie */
background: conic-gradient(from 45deg at 30% 60%, #c9772f, #efe0bd);
background: conic-gradient(#c9772f, #e4c490, #3d7a5a, #c9772f);
```

- `from` زاوية البداية.
- `at` المركز.
- `color 0 40%` يعمل حد حاد.

## use

- مخططات دائرية بدون JS.
- حلقات تقدّم.
- عجلات ألوان.

## avoid

- نسيان border-radius في الـ pie.
- ألوان متنافرة.

## examples

### 1) Pie chart
40% و60%.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="width:100px;height:100px;border-radius:50%;background:conic-gradient(#c9772f 0 40%,#efe0bd 0)"></div>
```



### 2) 3 شرائح
قطاعات.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="width:100px;height:100px;border-radius:50%;background:conic-gradient(#c9772f 0 30%,#3d7a5a 0 65%,#7a4a1d 0)"></div>
```



### 3) حلقة تقدّم
فراغ في المنتصف.

```html
<style>
  .r { width:100px; height:100px; border-radius:50%; background:conic-gradient(#3d7a5a 0 72%, #efe0bd 0); display:grid; place-items:center; }
  .r::before { content:"72%"; width:70px; height:70px; border-radius:50%; background:#f3ede0; display:grid; place-items:center; color:#3d2c18; font-weight:bold; }
</style>
<div class="r"></div>
```



### 4) عجلة ألوان
دورة كاملة.

```html
<style>
  .g { width:150px; height:80px; border-radius:10px; display:inline-block; margin:4px; vertical-align:top; }
</style>
<div class="g" style="width:100px;height:100px;border-radius:50%;background:conic-gradient(#c9772f,#e4c490,#bcd4a8,#3d7a5a,#7a4a1d,#c9772f)"></div>
```



## mistakes

### pie مربع

```css bad
background:conic-gradient(...);  /* مربع */
```

```css good
border-radius:50%;
```

دوّره.

### حد غير حاد

```css bad
conic-gradient(#c9772f 40%, #efe0bd 40%)
```

```css good
conic-gradient(#c9772f 0 40%, #efe0bd 0)
```

استخدم 0.

## quiz

### conic-gradient بيلف حوالين؟
- [x] نقطة مركزية
- [ ] خط
- [ ] حافة
- [ ] صورة

مركز.

### للـ pie chart؟
- [x] لونين بحد حاد
- [ ] radial
- [ ] linear
- [ ] blur

0 بعد النسبة.

### عشان تبقى الـ pie دايرة؟
- [x] border-radius: 50%
- [ ] overflow
- [ ] float
- [ ] z-index

تدوير الصندوق.

## refs

- [MDN: conic-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient)
