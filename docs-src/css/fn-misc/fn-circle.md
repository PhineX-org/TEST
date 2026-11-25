---
id: fn-circle
kind: function
cat: fn-misc
chip: circle()
title: شكل دايرة
en: CSS circle() function
status: stable
support: all
size: compact
mdn: basic-shape/circle
summary: circle(r at x y) بتعرّف دايرة لاستخدامها في clip-path أو shape-outside لقص عنصر على شكل دايرة.
keywords: circle, clip-path, shape-outside, دايرة, shape
related: clip-path, shape-outside, fn-polygon, fn-inset-shape
---

## intro

الدالة `circle(<radius> at <position>)` بتعرّف **شكل دايرة** بتستخدمه في [[clip-path]] (قص العنصر على شكل دايرة) أو [[shape-outside]] (التفاف النص). مثال: `clip-path: circle(50%);` بتقص العنصر لدايرة مركزها المنتصف ونصف قطرها 50% (فتبان الصورة المربعة كدايرة). وممكن تحدد المركز: `circle(40% at 30% 60%)`. ولو متحددش نصف قطر = `closest-side`. حلوة لأنها تتحرك بسلاسة، ومفيدة لما تحب شكل الصورة دايرة من غير ما تغيّر ملفها: `transition: clip-path .5s` من `circle(0)` لـ `circle(70%)` عشان تأثير «كشف دائري».

## try

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); margin:6px; display:inline-block; }
</style>
<div class="i" style="clip-path:circle(50%)"></div><div class="i" style="clip-path:circle(30% at 30% 30%)"></div>
```

## syntax

```css nolive
clip-path: circle(50%);
clip-path: circle(40% at 30% 60%);
shape-outside: circle(50%);
```

- `at` لتحديد المركز.
- النسبة من أصغر بُعد.

## use

- صورة دايرية بدون border-radius.
- تأثير كشف دائري.

## avoid

- نسيان إن clip-path يقص الظلال والحدود.

## examples

### 1) قص دايري
50%.

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:circle(50%); }
</style>
<div class="i"></div>
```



### 2) مركز مخصص
at 30% 30%.

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:circle(35% at 30% 30%); }
</style>
<div class="i"></div>
```



### 3) كشف دائري
hover.

```html
<style>
  .i { width:90px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:circle(0%); transition:clip-path .6s; }
  .w:hover .i { clip-path:circle(75%); }
  .w { width:90px; height:90px; background:#efe0bd; border-radius:8px; }
</style>
<div class="w"><div class="i"></div></div>
```



## mistakes

### نسيان القص يقص الحدود

```css bad
.i { border:4px solid #7a4a1d; clip-path:circle(50%); }  /* الحد يتقص */
```

```css good
.i { border-radius:50%; border:4px solid #7a4a1d; }
```

border-radius لو في حد.

## quiz

### circle(50%) بتقص لـ؟
- [x] دايرة
- [ ] مربع
- [ ] مثلث
- [ ] خط

دايرة.

### بتستخدم مع؟
- [x] clip-path وshape-outside
- [ ] color
- [ ] font
- [ ] margin

أشكال.

## refs

- [MDN: circle()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/circle)
