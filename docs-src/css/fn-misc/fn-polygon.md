---
id: fn-polygon
kind: function
cat: fn-misc
chip: polygon()
title: دالة polygon(): شكل مضلع
en: CSS polygon() function
status: stable
support: all
size: compact
mdn: basic-shape/polygon
summary: polygon(x1 y1, x2 y2, ...) بتعرّف مضلع بنقاط لقص العنصر بأي شكل: مثلث ومعين وسهم في clip-path.
keywords: polygon, clip-path, مثلث, مضلع, شكل مخصص, shape-outside
related: clip-path, shape-outside, fn-circle, fn-inset-shape
---

## intro

الدالة `polygon()` بتعرّف **مضلع** بقايمة **نقاط** (x y) مفصولة بفواصل، وبتقص العنصر على شكله بـ [[clip-path]] (أو تلفّ النص حواليه بـ [[shape-outside]]). كل نقطة بنسبة أو طول من الركن العلوي الأيسر. **مثلث**: `polygon(50% 0, 100% 100%, 0 100%)`. **معين**: `polygon(50% 0, 100% 50%, 50% 100%, 0 50%)`. **سهم** وأشكال مخصصة. ترتيب النقاط يرسم الحدود بالتتابع وبيقفل الشكل لوحده. وتتحرك بين مضلعين **بنفس عدد النقاط** بنعومة. أداة Clippy أو أدوات المطور بتخليك ترسمه بالماوس.

## try

```html
<style>
  .i { width:80px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); margin:4px; display:inline-block; }
</style>
<div class="i" style="clip-path:polygon(50% 0,100% 100%,0 100%)"></div><div class="i" style="clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)"></div><div class="i" style="clip-path:polygon(0 20%,60% 20%,60% 0,100% 50%,60% 100%,60% 80%,0 80%)"></div>
```

## syntax

```css nolive
clip-path: polygon(50% 0, 100% 100%, 0 100%);   /* مثلث */
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);   /* معين */
```

- نقاط x y بفواصل.
- الشكل يتقفل تلقائياً.
- للحركة: نفس عدد النقاط.

## use

- مثلثات وأسهم بدون صور.
- أقسام بحواف مائلة.

## avoid

- حركة بين مضلعات بأعداد نقاط مختلفة.

## examples

### 1) مثلث ومعين
أشكال أساسية.

```html
<style>
  .i { width:80px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); margin:4px; display:inline-block; }
</style>
<div class="i" style="clip-path:polygon(50% 0,100% 100%,0 100%)"></div><div class="i" style="clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)"></div>
```



### 2) سهم
7 نقاط.

```html
<style>
  .i { width:110px; height:70px; background:#c9772f; clip-path:polygon(0 20%,60% 20%,60% 0,100% 50%,60% 100%,60% 80%,0 80%); }
</style>
<div class="i"></div>
```



### 3) حركة بين شكلين
نفس عدد النقاط.

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:polygon(0 0,100% 0,100% 100%,0 100%); transition:clip-path .5s; }
  .i:hover { clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%); }
</style>
<div class="i"></div>
```



## mistakes

### أعداد نقاط مختلفة في الحركة

```css bad
polygon(3 نقاط) ← polygon(5 نقاط)  /* بلا نعومة */
```

```css good
نفس عدد النقاط
```

للحركة السلسة.

## quiz

### polygon بتقص بـ؟
- [x] نقاط
- [ ] دايرة
- [ ] حواف
- [ ] خط

مضلع.

### المثلث؟
- [x] 3 نقاط
- [ ] نقطتين
- [ ] 4 نقاط
- [ ] 5

3.

## refs

- [MDN: polygon()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/polygon)
