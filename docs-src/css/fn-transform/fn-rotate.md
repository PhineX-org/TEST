---
id: fn-rotate
kind: function
cat: fn-transform
chip: rotate()
title: تدوير العنصر
en: CSS rotate() function
status: stable
support: all
mdn: transform-function/rotate
summary: rotate(زاوية) بتدوّر العنصر حوالين مركزه: transform: rotate(45deg). موجب = مع عقارب الساعة.
keywords: rotate, deg, turn, transform, دوران, spinner
related: transform, rotate, fn-translate, fn-scale, transform-origin
---

## intro

الدالة `rotate()` (داخل [[transform]]) بتدوّر العنصر **حوالين مركزه** بزاوية. الموجب = **مع عقارب الساعة**، والسالب عكسها: `transform: rotate(45deg);`. وحدات الزاوية: **`deg`** (درجات)، **`turn`** (لفّة كاملة: `0.25turn` = 90 درجة)، **`rad`**، **`grad`**. وفيه `rotateX()` و`rotateY()` للدوران ثلاثي الأبعاد (مع [[perspective]])، و`rotateZ()` = rotate العادية.

استخدامات: **سهم مفتوح/مغلق** (قائمة منسدلة: سهم يلف 180°)، **spinner** تحميل (مع `@keyframes`)، **أيقونة +** تتحول لـ **×** بدوران 45°، **بطاقات مائلة** خفيفة. زي باقي transform: **ما بتأثرش على التخطيط** وسريعة (GPU). لو عايز الدوران حوالين نقطة غير المركز (ركن مثلاً) استخدم `transform-origin`. وفيه خاصية [[rotate]] مستقلة: `rotate: 45deg;`.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx">0</div><div class="bx" style="transform:rotate(20deg)">20</div><div class="bx" style="transform:rotate(-20deg)">-20</div><div class="bx" style="transform:rotate(.25turn)">¼</div></div>
```

## syntax

```css nolive
transform: rotate(45deg);
transform: rotate(-15deg);
transform: rotate(.25turn);
transform: rotate(360deg);
```

- الموجب مع عقارب الساعة.
- وحدات: deg وturn وrad.
- من المركز افتراضياً.

## use

- سهم مفتوح/مغلق.
- spinner.
- أيقونة تتحول.

## avoid

- نص مدوّر يصعب قراءته.
- نسيان transform-origin.

## examples

### 1) زوايا مختلفة
موجب وسالب.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx">0</div><div class="bx" style="transform:rotate(20deg)">20</div><div class="bx" style="transform:rotate(-20deg)">-20</div></div>
```



### 2) سهم قائمة
180 عند الفتح.

```html
<style>
  details summary { cursor:pointer; color:#3d2c18; }
  .ar { display:inline-block; transition:transform .25s; }
  details[open] .ar { transform:rotate(180deg); }
</style>
<details><summary><span class="ar">▼</span> افتح</summary><p style="color:#3d2c18">المحتوى</p></details>
```



### 3) spinner
دوران لا نهائي.

```html
<style>
  @keyframes sp { to { transform:rotate(1turn); } }
  .s { width:34px; height:34px; border:5px solid #e4c490; border-top-color:#b5551f; border-radius:50%; animation:sp .9s linear infinite; }
</style>
<div class="s"></div>
```



### 4) + تتحول لـ ×
45 درجة.

```html
<style>
  .p { width:40px; height:40px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-size:1.5rem; transition:transform .25s; }
  .p:hover { transform:rotate(45deg); }
</style>
<button class="p">+</button>
```



## mistakes

### نسيان الوحدة

```css bad
transform:rotate(45);  /* غلط */
```

```css good
transform:rotate(45deg);
```

لازم وحدة.

### ظن الموجب عكس الساعة

```css bad
rotate(90deg)  /* مع عقارب الساعة */
```

```css good
rotate(-90deg)  /* عكسها */
```

موجب = مع الساعة.

## quiz

### rotate(90deg)؟
- [x] ربع لفّة مع الساعة
- [ ] ربع لفّة عكسها
- [ ] نص لفّة
- [ ] لفّة كاملة

مع الساعة.

### الوحدة؟
- [x] deg أو turn
- [ ] px
- [ ] %
- [ ] em

زاوية.

### الدوران من؟
- [x] المركز افتراضياً
- [ ] الركن
- [ ] الأعلى
- [ ] اليمين

transform-origin.

## refs

- [MDN: rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate)
