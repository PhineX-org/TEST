---
id: fn-matrix
kind: function
cat: fn-transform
chip: matrix()
title: دالة matrix(): كل التحويلات في مصفوفة
en: CSS matrix() function
status: stable
support: all
size: compact
mdn: transform-function/matrix
summary: matrix(a,b,c,d,tx,ty) بتجمع تحويلات 2D (تحريك وتكبير ودوران وإمالة) في مصفوفة واحدة. غالباً مش بنكتبها بإيدينا.
keywords: matrix, transform, مصفوفة, matrix3d
related: fn-translate, fn-scale, fn-rotate, fn-skew, transform
---

## intro

الدالة `matrix(a, b, c, d, tx, ty)` بتمثّل **أي تحويل ثنائي الأبعاد** (تحريك + تكبير + دوران + إمالة) في **ست أرقام** (مصفوفة 2×3). مثال: `matrix(1, 0, 0, 1, 20, 10)` = `translate(20px, 10px)`، و`matrix(2,0,0,2,0,0)` = `scale(2)`. المتصفح بيحوّل كل الدوال الأخرى لـ `matrix` داخلياً، وده اللي بتشوفه في أدوات المطور (`getComputedStyle`). **عملياً مش بنكتبها بإيدينا** لأنها صعبة القراءة؛ استخدم `translate/scale/rotate` الأوضح. بتبقى مفيدة لو بتقرا القيمة المحسوبة من JavaScript أو بتولّد تحويل بخوارزمية. وفيه `matrix3d()` بـ16 رقم للثلاثي الأبعاد.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:matrix(1,0,0,1,24,10)">T</div><div class="bx" style="transform:matrix(1.4,0,0,1.4,0,0)">S</div></div>
```

## syntax

```css nolive
transform: matrix(1, 0, 0, 1, 20, 10);   /* translate(20px, 10px) */
transform: matrix(2, 0, 0, 2, 0, 0);     /* scale(2) */
```

- 6 أرقام: a b c d tx ty.
- tx وty هما التحريك.

## use

- قراءة القيم المحسوبة.
- توليد تحويلات برمجياً.

## avoid

- كتابتها يدوياً للاستخدام العادي.

## examples

### 1) مكافئ translate
الأرقام الأخيرة.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:matrix(1,0,0,1,24,10)">T</div></div>
```



### 2) مكافئ scale
القطر.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:matrix(1.4,0,0,1.4,0,0)">S</div></div>
```



### 3) قراءتها من JS
getComputedStyle.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" id="m" style="transform:rotate(30deg)">R</div></div>
<p id="o" style="color:#3d2c18;direction:ltr;font-size:.8rem"></p>
<script>document.getElementById('o').textContent=getComputedStyle(document.getElementById('m')).transform;</script>
```



## mistakes

### استخدامها يدوياً

```css bad
transform:matrix(0.87,0.5,-0.5,0.87,0,0);  /* مش مفهومة */
```

```css good
transform:rotate(30deg);
```

الأوضح أحسن.

## quiz

### matrix بتمثل؟
- [x] تحويل 2D في 6 أرقام
- [ ] لون
- [ ] خط
- [ ] ظل

مصفوفة.

### بنكتبها غالباً؟
- [x] لأ
- [ ] أيوه
- [ ] دايماً
- [ ] للألوان

نادراً.

## refs

- [MDN: matrix()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)
