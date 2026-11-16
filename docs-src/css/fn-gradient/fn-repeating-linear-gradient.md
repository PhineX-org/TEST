---
id: fn-repeating-linear-gradient
kind: function
cat: fn-gradient
chip: repeating-linear-gradient()
title: دالة repeating-linear-gradient(): تدرج خطي متكرر
en: CSS repeating-linear-gradient() function
status: stable
support: all
size: compact
mdn: gradient/repeating-linear-gradient
summary: repeating-linear-gradient() بتكرر نمط التدرج الخطي: خطوط مائلة ومخططات وخلفيات نمطية.
keywords: repeating-linear-gradient, خطوط, stripes, pattern, نمط
related: fn-linear-gradient, fn-radial-gradient, fn-conic-gradient, background-image
---

## intro

الدالة `repeating-linear-gradient()` زي [[fn-linear-gradient]] لكن **بتكرر** النمط بدل ما تمدّه مرة واحدة. بتكتب **وحدة النمط** (طولها بالبكسل أو نسبة) وهي بتكرّرها لحد ما تملا الصندوق. مثال **خطوط مائلة**: `repeating-linear-gradient(45deg, #efe0bd 0 10px, #e4c490 10px 20px)` يعني 10px بيج و10px أغمق وكرر. استخدامات: **خلفيات مخططة**، **شرايط تحذير**، **ورق مسطّر**، **أشرطة تقدّم متحركة**. اللون بعد آخر نقطة بيكمّل بنفس النمط. نصيحة: خلّي الألوان قريبة من بعض (دافية) عشان الخلفية ما تتعبش العين.

## try

```html
<style>
  .s { width:180px; height:70px; border-radius:10px; background:repeating-linear-gradient(45deg,#efe0bd 0 10px,#e4c490 10px 20px); }
</style>
<div class="s"></div>
```

## syntax

```css nolive
background: repeating-linear-gradient(45deg, #efe0bd 0 10px, #e4c490 10px 20px);
background: repeating-linear-gradient(90deg, #c9772f 0 4px, transparent 4px 16px);
```

- حدد وحدة النمط بأطوال.
- الزاوية زي linear.

## use

- خلفيات مخططة.
- ورق مسطّر.
- شريط تحذير.

## avoid

- ألوان متباينة جداً (إجهاد بصري).

## examples

### 1) خطوط مائلة
45deg.

```html
<style>
  .s { width:180px; height:70px; border-radius:10px; background:repeating-linear-gradient(45deg,#efe0bd 0 10px,#e4c490 10px 20px); }
</style>
<div class="s"></div>
```



### 2) ورق مسطّر
خطوط رفيعة.

```html
<style>
  .s { width:180px; height:80px; border-radius:10px; background:repeating-linear-gradient(#f3ede0 0 22px,#bda27a 22px 23px); }
</style>
<div class="s"></div>
```



### 3) شريط تقدّم
متحرك.

```html
<style>
  @keyframes mv { to { background-position:28px 0; } }
  .p { width:180px; height:20px; border-radius:10px; background:repeating-linear-gradient(45deg,#c9772f 0 10px,#d9904a 10px 20px); background-size:28px 28px; animation:mv .8s linear infinite; }
</style>
<div class="p"></div>
```



## mistakes

### تباين حاد

```css bad
repeating-linear-gradient(45deg, black 0 10px, white 10px 20px)
```

```css good
repeating-linear-gradient(45deg, #efe0bd 0 10px, #e4c490 10px 20px)
```

ألوان دافية.

## quiz

### الفرق عن linear-gradient؟
- [x] بتكرر النمط
- [ ] بتتحرك
- [ ] بتتشعّ
- [ ] بتلف

تكرار.

### أشهر استخدام؟
- [x] خطوط وأنماط
- [ ] pie chart
- [ ] ظل
- [ ] خط

stripes.

## refs

- [MDN: repeating-linear-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient)
