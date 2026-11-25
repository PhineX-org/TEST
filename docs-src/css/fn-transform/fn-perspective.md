---
id: fn-perspective
kind: function
cat: fn-transform
chip: perspective()
title: عمق ثلاثي الأبعاد
en: CSS perspective() function
status: stable
support: all
size: compact
mdn: transform-function/perspective
summary: perspective(d) بتضيف عمق (منظور) لعنصر داخل transform لتأثيرات 3D: transform: perspective(500px) rotateY(30deg).
keywords: perspective, 3d, rotateY, depth, عمق, منظور
related: perspective, perspective-origin, fn-rotate, transform-style
---

## intro

الدالة `perspective(d)` (داخل [[transform]]) بتضيف **عمق (منظور)** لعنصر واحد: بتحاكي **بُعد العين عن الشاشة** `d` بالبكسل. القيم الصغيرة (200px) = منظور **قوي ومبالغ**، والكبيرة (1000px) = **خفيف**. من غيرها، `rotateY(30deg)` بتبان **مسطحة** (زي ورقة بتضيق من غير عمق). مع المنظور تبان العنصر فعلاً **داخل في الشاشة**. لازم تكتبها **الأول** في قيمة transform: `transform: perspective(500px) rotateY(30deg);`. للمنظور على **مجموعة أبناء** مع بعض، استخدم الخاصية [[perspective]] على الأب بدل الدالة. حلوة لبطاقات تتقلب 3D.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:rotateY(45deg)">بدون</div><div class="bx" style="transform:perspective(200px) rotateY(45deg)">مع</div></div>
```

## syntax

```css nolive
transform: perspective(500px) rotateY(30deg);
transform: perspective(200px) rotateX(40deg);
```

- لازم أول الدوال.
- رقم صغير = منظور قوي.

## use

- بطاقات 3D.
- تأثير إمالة بعمق.

## avoid

- وضعها بعد rotate (بتتجاهل).

## examples

### 1) بدون ومع
الفرق واضح.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:rotateY(45deg)">بدون</div><div class="bx" style="transform:perspective(200px) rotateY(45deg)">مع</div></div>
```



### 2) قوي وخفيف
200 مقابل 800.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:perspective(150px) rotateX(45deg)">150</div><div class="bx" style="transform:perspective(800px) rotateX(45deg)">800</div></div>
```



### 3) بطاقة hover
تميل 3D.

```html
<style>
  .c { width:110px; padding:18px; text-align:center; background:#3d7a5a; color:#f3ede0; border-radius:10px; transition:transform .3s; }
  .c:hover { transform:perspective(400px) rotateY(18deg); }
</style>
<div class="c">مرّر عليّا</div>
```



## mistakes

### بعد rotate

```css bad
transform:rotateY(30deg) perspective(500px);  /* مبتأثرش */
```

```css good
transform:perspective(500px) rotateY(30deg);
```

الأول.

## quiz

### perspective(d) صغيرة؟
- [x] منظور قوي
- [ ] خفيف
- [ ] لا شيء
- [ ] دوران

مبالغ.

### مكانها في transform؟
- [x] الأول
- [ ] الآخر
- [ ] أي مكان
- [ ] مش ضرورية

أول دالة.

## refs

- [MDN: perspective()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective)
