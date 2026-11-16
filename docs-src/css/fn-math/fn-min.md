---
id: fn-min
kind: function
cat: fn-math
chip: min()
title: دالة min(): الأصغر
en: CSS min() function
status: stable
support: all
size: compact
mdn: min
summary: min() بترجع أصغر قيمة من قايمة: width: min(90%, 600px) يعني «90% بس ماتزيدش عن 600px».
keywords: min, أصغر قيمة, max-width, عرض مرن
related: fn-max, fn-clamp, fn-calc, max-width
---

## intro

الدالة `min()` بتاخد **قايمة قيم** (ممكن بوحدات مختلفة) وبترجّع **أصغرهم**. أشهر استخدام: عرض مرن بحد أقصى في سطر واحد: `width: min(90%, 600px);` يعني: «90% من الأب، **لكن ماتزيدش عن 600px**». على شاشة صغيرة بتاخد 90%، وعلى شاشة كبيرة بتقف عند 600. يعني هي زي `max-width` لكن بشكل أقصر. وبتقبل حسابات جواها: `min(100%, 40rem - 2rem)`. وتشتغل في أي خاصية بتقبل أطوال (`width`، `font-size`، `padding`...). عكسها [[fn-max]]، وجمعهم [[fn-clamp]].

## try

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:min(90%, 200px); font-weight:bold; }
</style>
<div class="p"><div class="a">min(90%, 200px)</div></div>
```

## syntax

```css nolive
width: min(90%, 600px);
font-size: min(5vw, 2rem);
padding: min(4vw, 24px);
```

- بتاخد قيم كتير.
- بتختار الأصغر وقت العرض.

## use

- عرض بحد أقصى.
- مسافات مرنة.

## avoid

- وحدات متضاربة بدون قصد.

## examples

### 1) عرض بحد أقصى
90% أو 200 أيهما أقل.

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:min(90%, 200px); font-weight:bold; }
</style>
<div class="p"><div class="a">min(90%, 200px)</div></div>
```



### 2) خط بحد أقصى
vw أو 1.6rem.

```html
<style>
  h4 { font-size:min(6vw, 1.6rem); color:#7a4a1d; margin:6px 0; }
</style>
<h4>خط مرن بحد أعلى</h4>
```



### 3) حشو مرن
أقل من 24.

```html
<style>
  .a { padding:min(4vw, 24px); background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">حشو مرن</div>
```



## mistakes

### ظن إنها الأكبر

```css bad
width:min(90%,600px);  /* دي الأصغر */
```

```css good
width:max(90%,600px);
```

max للأكبر.

## quiz

### min(90%, 600px) تعني؟
- [x] الأصغر منهم
- [ ] الأكبر
- [ ] المتوسط
- [ ] مجموعهم

الأصغر.

### بتشبه؟
- [x] max-width
- [ ] min-width
- [ ] height
- [ ] gap

حد أقصى.

## refs

- [MDN: min()](https://developer.mozilla.org/en-US/docs/Web/CSS/min)
