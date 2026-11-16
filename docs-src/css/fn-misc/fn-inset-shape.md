---
id: fn-inset-shape
kind: function
cat: fn-misc
chip: inset()
title: دالة inset(): قص مستطيل من الحواف
en: CSS inset() function
status: stable
support: all
size: compact
mdn: basic-shape/inset
summary: inset(top right bottom left round r) بتقص مستطيل مصغّر من حواف العنصر في clip-path، وبتتحرك بنعومة.
keywords: inset, clip-path, قص, مستطيل, round
related: clip-path, fn-circle, fn-polygon, shape-outside
---

## intro

الدالة `inset()` بتعرّف **مستطيل** بتحدده بالمسافة من **حواف العنصر الأربعة** (زي margin): `clip-path: inset(10px 20px 10px 20px);` يعني اقص 10px من فوق وتحت و20px من اليمين واليسار. وتقدر تدوّر الزوايا بـ `round`: `inset(0 round 12px)`. استخدامات: **تأثيرات كشف/ستارة** (inset(0 100% 0 0) ← inset(0))، **قص صورة**، **أزرار بحركة تعبئة**. ودالة التحويل سلسة لأن كل القيم أرقام. ملحوظة: اسمها في CSS هو `inset()` (في ID الموقع `fn-inset-shape` لتمييزها عن الخاصية `inset`).

## try

```html
<style>
  .i { width:120px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); margin:4px; display:inline-block; }
</style>
<div class="i" style="clip-path:inset(10px 20px)"></div><div class="i" style="clip-path:inset(0 round 20px)"></div>
```

## syntax

```css nolive
clip-path: inset(10px 20px 10px 20px);
clip-path: inset(0 round 12px);
clip-path: inset(0 100% 0 0);  /* مخفي بالكامل */
```

- زي margin: 4 قيم أو أقل.
- round لتدوير الزوايا.

## use

- تأثير كشف.
- قص صور.

## avoid

- الخلط مع خاصية inset للتموضع.

## examples

### 1) قص من الحواف
10 و20.

```html
<style>
  .i { width:120px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:inset(10px 20px); }
</style>
<div class="i"></div>
```



### 2) زوايا مدورة
round.

```html
<style>
  .i { width:120px; height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); clip-path:inset(0 round 24px); }
</style>
<div class="i"></div>
```



### 3) كشف بحركة
hover.

```html
<style>
  .i { width:120px; height:70px; background:#3d7a5a; clip-path:inset(0 100% 0 0); transition:clip-path .5s; }
  .w { width:120px; height:70px; background:#efe0bd; border-radius:6px; }
  .w:hover .i { clip-path:inset(0 0 0 0); }
</style>
<div class="w"><div class="i"></div></div>
```



## mistakes

### الخلط مع inset التموضع

```css bad
.a { clip-path:inset: 10px; }  /* غلط */
```

```css good
.a { clip-path:inset(10px); }
```

دالة بأقواس.

## quiz

### inset() بتقص؟
- [x] مستطيل من الحواف
- [ ] دايرة
- [ ] مثلث
- [ ] خط

من الحواف.

### تدوير الزوايا بـ؟
- [x] round
- [ ] radius
- [ ] curve
- [ ] corner

inset(0 round 12px).

## refs

- [MDN: inset()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset)
