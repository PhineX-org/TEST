---
id: clip-path
kind: property
cat: colors-effects
chip: clip-path
title: قص شكل العنصر
en: CSS clip-path property
status: stable
support: all
mdn: clip-path
summary: clip-path بتقص العنصر على شكل معين (دائرة، مضلع، مستطيل بزوايا…) فاللي بره الشكل بيختفي. أساس الأشكال الحرة بدون صور.
keywords: clip-path, circle, polygon, inset, قص, أشكال, مثلث, shape
related: fn-circle, fn-polygon, fn-inset-shape, border-radius, mask-image
---

## intro

الخاصية `clip-path` بتحدد **منطقة مرئية** للعنصر، وأي حاجة بره المنطقة دي **بتختفي** (قص مش حذف). بتتعامل معاها بدوال الأشكال: [[fn-circle]] (دائرة)، [[fn-polygon]] (مضلع بنقط)، [[fn-inset-shape]] (مستطيل بزوايا مقصوصة)، وكمان `ellipse()` و`path()`. وتقدر تخلّي مثلث أو نجمة أو سهم من عنصر عادي بدل ما تحتاج صورة.

نقاط مهمة:
- الإحداثيات بالـ **%** غالباً عشان الشكل يتناسب مع حجم العنصر.
- المنطقة المقصوصة **مبتستقبلش ضغط** (hover/click).
- الظل ([[box-shadow]]) بيتقص كمان؛ استخدم `filter: drop-shadow` على الأب لو عايز ظل.
- بتتحرك (animation/transition) لو الشكلين ليهم نفس عدد النقط.

> [!analogy] `clip-path` زي ورقة مقصوصة بالمقص على شكل معين: اللي بره القص بيتشال.

## try

```html
<style>
  .t { width:110px; height:90px; background:#c9772f; clip-path:polygon(50% 0%, 100% 100%, 0% 100%); }
</style>
<div class="t"></div>
```

## syntax

```css nolive
clip-path: circle(50%);
clip-path: polygon(50% 0, 100% 100%, 0 100%);
clip-path: inset(10px round 12px);
clip-path: none;
```

- **القيمة المبدئية**: `none`.
- **بتتحرك؟** أيوه (لنفس نوع الشكل).

## values

### circle()
دائرة.

### ellipse()
قطع ناقص.

### inset()
مستطيل بـmargins.

### polygon()
مضلع بنقاط.

### none
بدون قص.

## use

- صور دائرية.
- مثلثات وأسهم بدون صور.
- تأثيرات كشف (reveal) بالأنيميشن.

## avoid

- الاعتماد عليها لقص محتوى مهم.
- نسيان إن الظل بيتقص.

## examples

### 1) دائرة
صورة دائرية.

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:circle(50%); }
</style>
<div class="i"></div>
```



### 2) مثلث
polygon بثلاث نقاط.

```html
<style>
  .i { width:100px; height:90px; background:#3d7a5a; clip-path:polygon(50% 0, 100% 100%, 0 100%); }
</style>
<div class="i"></div>
```



### 3) أشكال متنوعة
معيّن وسداسي.

```html
<style>
  .i { display:inline-block; width:80px; height:80px; margin:4px; background:#b5551f; }
</style>
<div class="i" style="clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)"></div>
<div class="i" style="clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)"></div>
```



### 4) كشف بالـ hover
الدائرة بتكبر.

```html
<style>
  .i { width:120px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:circle(20% at 50% 50%); transition:clip-path .5s; }
  .i:hover { clip-path:circle(75% at 50% 50%); }
</style>
<div class="i"></div>
```



## mistakes

### ظل مقصوص

```css bad
.shape { clip-path:polygon(...); box-shadow:0 4px 8px #000; }  /* الظل بيتقص */
```

```css good
.wrap { filter:drop-shadow(0 4px 6px rgba(0,0,0,.3)); }
.shape { clip-path:polygon(...); }
```

حط الظل على الأب.

### تحريك لشكلين مختلفين العدد

```css bad
a { clip-path:circle(50%); } a:hover { clip-path:polygon(...); }  /* مبتتحركش سلس */
```

```css good
a { clip-path:polygon(...4 نقاط); } a:hover { clip-path:polygon(...4 نقاط); }
```

نفس نوع الشكل وعدد النقط.

## quiz

### clip-path بتعمل؟
- [ ] تحذف العنصر
- [x] تقص الشكل المرئي
- [ ] تكبّر
- [ ] تلوّن

قص مرئي.

### لمثلث نستخدم؟
- [ ] circle
- [x] polygon
- [ ] inset
- [ ] ellipse

polygon.

### الظل مع clip-path؟
- [x] يتقص
- [ ] يتحرك
- [ ] يزيد
- [ ] مفيش

بيتقص.

## refs

- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
