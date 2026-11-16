---
id: fn-skew
kind: function
cat: fn-transform
chip: skew()
title: دالة skew(): إمالة العنصر
en: CSS skew() function
status: stable
support: all
size: compact
mdn: transform-function/skew
summary: skew(x, y) بتميّل العنصر (تحوله لمتوازي أضلاع) بزاوية: transform: skewX(-10deg). لتأثيرات الأزرار المائلة.
keywords: skew, skewX, skewY, transform, إمالة, متوازي أضلاع
related: fn-rotate, fn-scale, fn-matrix, transform
---

## intro

الدالة `skew()` (داخل [[transform]]) بتعمل **إمالة (قص)** للعنصر: المستطيل بيتحوّل لمتوازي أضلاع. `skewX(-10deg)` بتميّل المحور الأفقي، و`skewY(5deg)` الرأسي، و`skew(10deg, 5deg)` الاتنين. بنستخدمها لأزرار وشرايط **بشكل مائل ديناميكي**. حيلة: ممكن **تلغي الإمالة عن النص** بإمالة معاكسة على العنصر الداخلي عشان النص يفضل مستقيم. زي باقي transform: ما بتأثرش على التخطيط وسريعة.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:skewX(-15deg)">X</div><div class="bx" style="transform:skewY(15deg)">Y</div></div>
```

## syntax

```css nolive
transform: skewX(-10deg);
transform: skewY(5deg);
transform: skew(10deg, 5deg);
```

- زوايا فقط.

## use

- أزرار وشرايط مائلة.
- أشكال ديناميكية.

## avoid

- إمالة النص بدون عكسها (قراءة صعبة).

## examples

### 1) X وY
محورين.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:skewX(-15deg)">X</div><div class="bx" style="transform:skewY(15deg)">Y</div></div>
```



### 2) زرار مائل
نص مستقيم.

```html
<style>
  .b { display:inline-block; transform:skewX(-12deg); background:#c9772f; padding:8px 22px; border-radius:6px; }
  .b span { display:inline-block; transform:skewX(12deg); color:#f3ede0; font-weight:bold; }
</style>
<div class="b"><span>اضغط</span></div>
```



### 3) skew مركّب
X وY مع بعض.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:skew(15deg,8deg)">XY</div></div>
```



## mistakes

### نص مائل

```css bad
.b { transform:skewX(-20deg); }  /* النص كمان مائل */
```

```css good
.b span { transform:skewX(20deg); }
```

اعكس الإمالة.

## quiz

### skew بتعمل؟
- [x] إمالة
- [ ] دوران
- [ ] تكبير
- [ ] تحريك

قص.

### تتحول المستطيل لـ؟
- [x] متوازي أضلاع
- [ ] دايرة
- [ ] مثلث
- [ ] مربع

shape.

## refs

- [MDN: skew()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew)
