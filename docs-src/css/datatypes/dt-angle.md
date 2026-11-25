---
id: dt-angle
kind: datatype
cat: datatypes
chip: <angle>
title: الزوايا
en: CSS <angle> data type
status: stable
support: all
size: compact
mdn: angle
summary: نوع angle هو زاوية بوحدة: deg (درجات) وturn (لفّة) وrad وgrad. مستخدمة في rotate وlinear-gradient وhsl.
keywords: angle, deg, turn, rad, grad, زاوية
related: fn-rotate, fn-linear-gradient, fn-conic-gradient, fn-hsl
---

## intro

النوع `<angle>` هو **قيمة زاوية** مع وحدتها، بيستخدم في [[fn-rotate]] و[[fn-skew]] و[[fn-linear-gradient]] و[[fn-conic-gradient]] و`hue-rotate` و`hsl()`. الوحدات: **`deg`** درجات (360 = دورة)، **`turn`** لفّات (`1turn` = دورة كاملة، `0.25turn` = 90deg)، **`rad`** راديان (2π)، **`grad`** جراد (400 = دورة). الأشهر `deg` وحلو `turn` لدورات كاملة. الصفر بدون وحدة مسموح في بعض الأماكن لكن الأفضل تكتب `0deg`. موجب = مع عقارب الساعة.

## try

```html
<style>
  .b { width:44px; height:44px; background:#c9772f; color:#f3ede0; border-radius:8px; display:inline-grid; place-items:center; margin:12px; font-weight:bold; }
</style>
<div class="b" style="transform:rotate(45deg)">45deg</div><div class="b" style="transform:rotate(.125turn)">1/8</div>
```

## syntax

```css nolive
transform: rotate(45deg);
transform: rotate(.25turn);
background: linear-gradient(90deg, #c9772f, #efe0bd);
filter: hue-rotate(120deg);
```

- `360deg` = `1turn`.
- موجب = مع الساعة.

## use

- دوران بـ deg أو turn.
- اتجاه التدرج.

## avoid

- نسيان الوحدة.

## examples

### 1) deg وturn
نفس الزاوية.

```html
<style>
  .b { width:44px; height:44px; background:#c9772f; color:#f3ede0; border-radius:8px; display:inline-grid; place-items:center; margin:12px; font-weight:bold; }
</style>
<div class="b" style="transform:rotate(45deg)">45°</div><div class="b" style="transform:rotate(.125turn)">⅛</div>
```



### 2) اتجاه تدرج
زاوية.

```html
<style>
  .g { width:120px; height:60px; border-radius:8px; background:linear-gradient(60deg,#c9772f,#efe0bd); }
</style>
<div class="g"></div>
```



### 3) hsl
درجة اللون.

```html
<style>
  .s { display:inline-block; width:50px; height:40px; border-radius:8px; margin:3px; }
</style>
<span class="s" style="background:hsl(30deg 60% 50%)"></span><span class="s" style="background:hsl(.4turn 40% 50%)"></span>
```



## mistakes

### بدون وحدة

```css bad
transform:rotate(45);  /* غلط */
```

```css good
transform:rotate(45deg);
```

وحدة إجبارية.

## quiz

### 1turn تساوي؟
- [x] 360deg
- [ ] 180deg
- [ ] 90deg
- [ ] 100deg

دورة.

### الوحدة الأشهر؟
- [x] deg
- [ ] rad
- [ ] grad
- [ ] turn

درجات.

## refs

- [MDN: `<angle>`](https://developer.mozilla.org/en-US/docs/Web/CSS/angle)
