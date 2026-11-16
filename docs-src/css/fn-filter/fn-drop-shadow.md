---
id: fn-drop-shadow
kind: function
cat: fn-filter
chip: drop-shadow()
title: دالة drop-shadow(): ظل يتبع الشكل
en: CSS drop-shadow() function
status: stable
support: all
mdn: filter-function/drop-shadow
summary: drop-shadow(x y blur color) بتعمل ظل يتبع الشكل الحقيقي للصورة الشفافة (مش المستطيل). عكس box-shadow.
keywords: drop-shadow, filter, ظل, png, svg, شفافية
related: box-shadow, text-shadow, filter, fn-blur
---

## intro

الدالة `drop-shadow()` (داخل [[filter]]) بتعمل **ظل يتبع الشكل الفعلي** للعنصر بما فيه **الأجزاء الشفافة**، عكس [[box-shadow]] اللي بيعمل ظل للصندوق المستطيل دايماً. الفرق مهم مع **صور PNG وSVG شفافة** (شعار مثلاً)، أو عنصر بـ `clip-path`، أو بيضاوي: `box-shadow` هيعمل ظل مستطيل حواليه، لكن `drop-shadow` هيمشي مع حدود الرسمة نفسها.

الصيغة: `filter: drop-shadow(4px 6px 8px rgba(61,44,24,.4));` = إزاحة أفقية، إزاحة رأسية، تغبيش، لون. **مفيش `spread` ولا `inset`** (موجودين في box-shadow بس). تقدر تدمج أكتر من ظل: `drop-shadow(...) drop-shadow(...)`. نصيحة: استخدم ألوان دافية شفافة (`rgba` بني) بدل الأسود الصريح للظل الأريح. وخد بالك إنه بيتحسب على **كل** رسمة العنصر (بما فيه ظلال داخلية وأبناء)، فهو أثقل من `box-shadow` شوية.

## try

```html
<style>
  .t { width:70px; height:70px; background:#c9772f; clip-path:polygon(50% 0,100% 100%,0 100%); }
  .a { filter:drop-shadow(4px 6px 5px rgba(61,44,24,.45)); display:inline-block; margin:10px; }
  .b { box-shadow:4px 6px 5px rgba(61,44,24,.45); display:inline-block; margin:10px; }
</style>
<div class="a"><div class="t"></div></div><div class="b"><div class="t"></div></div>
```

## syntax

```css nolive
filter: drop-shadow(4px 6px 8px rgba(61,44,24,.4));
filter: drop-shadow(0 0 6px #c9772f);
```

- x y blur color (بدون spread).
- يتبع الشكل مش الصندوق.

## use

- ظل لشعار PNG/SVG شفاف.
- ظل لشكل مقصوص بـ clip-path.
- توهّج حوالين أيقونة.

## avoid

- استخدامه لمستطيلات عادية (box-shadow أخف).
- الأسود الصريح للظل.

## examples

### 1) مثلث: drop مقابل box
الفرق.

```html
<style>
  .t { width:70px; height:70px; background:#c9772f; clip-path:polygon(50% 0,100% 100%,0 100%); }
  .a { filter:drop-shadow(4px 6px 5px rgba(61,44,24,.45)); display:inline-block; margin:10px; }
  .b { box-shadow:4px 6px 5px rgba(61,44,24,.45); display:inline-block; margin:10px; }
</style>
<div class="a"><div class="t"></div></div><div class="b"><div class="t"></div></div>
```



### 2) ظل شعار شفاف
SVG.

```html
<style>
  img { width:90px; filter:drop-shadow(3px 5px 4px rgba(61,44,24,.4)); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='70'><circle cx='30' cy='35' r='24' fill='%23c9772f'/><rect x='58' y='20' width='26' height='30' rx='5' fill='%233d7a5a'/></svg>">
```



### 3) توهّج
بدون إزاحة.

```html
<style>
  .g { display:inline-block; padding:10px 20px; background:#3d2c18; color:#e4c490; border-radius:10px; filter:drop-shadow(0 0 8px rgba(228,196,144,.8)); font-weight:bold; }
</style>
<div class="g">توهّج</div>
```



### 4) ظلين مدموجين
قريب وبعيد.

```html
<style>
  .b { width:70px; height:70px; background:#3d7a5a; border-radius:50% 50% 50% 0; filter:drop-shadow(0 2px 2px rgba(61,44,24,.4)) drop-shadow(0 10px 10px rgba(61,44,24,.25)); margin:10px; }
</style>
<div class="b"></div>
```



## mistakes

### spread في drop-shadow

```css bad
filter:drop-shadow(0 0 0 5px #000);  /* غير مدعوم */
```

```css good
filter:drop-shadow(0 0 5px #3d2c18);
```

مفيش spread.

### drop-shadow لمستطيل عادي

```css bad
.card { filter:drop-shadow(0 4px 6px rgba(0,0,0,.3)); }
```

```css good
.card { box-shadow:0 4px 6px rgba(61,44,24,.3); }
```

box-shadow أخف وأوضح للمستطيلات.

## quiz

### drop-shadow بيتبع؟
- [x] شكل الرسمة
- [ ] الصندوق
- [ ] الأب
- [ ] الشاشة

الأجزاء المرئية.

### مفيش فيه؟
- [x] spread وinset
- [ ] blur
- [ ] color
- [ ] x y

مش مدعوم.

### تستخدمه مع؟
- [x] PNG وSVG شفاف
- [ ] div عادي فقط
- [ ] body
- [ ] head

أشكال غير مستطيلة.

## refs

- [MDN: drop-shadow()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow)
