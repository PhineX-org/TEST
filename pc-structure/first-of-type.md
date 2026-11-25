---
id: first-of-type
kind: pseudoclass
cat: pc-structure
chip: :first-of-type
title: أول عنصر من نوعه
en: CSS :first-of-type pseudo-class
status: stable
support: all
size: compact
mdn: :first-of-type
summary: الحالة first-of-type بتختار أول عنصر من نوع معين بين إخواته، حتى لو كان قبله عناصر من أنواع تانية.
keywords: :first-of-type, first-of-type, أول من نوعه, p:first-of-type
related: first-child, last-of-type, only-of-type, nth-of-type
---

## intro

`:first-of-type` بتختار **أول عنصر من نوعه (نفس الوسم)** بين إخواته. الفرق عن [[first-child]]: دي بتتجاهل العناصر التانية. يعني `p:first-of-type` بتختار **أول فقرة** حتى لو قبلها `<h2>`، بينما `p:first-child` مش هتشتغل. هي الحل لـ«عايز أول فقرة بعد العنوان» وغالباً بتستخدم مع الفقرات أو الصور أو `<li>`. وبتتعامل مع **اسم الوسم** مش الـ class. تخيّل فصل فيه ولاد وبنات: «أول ولد» هو أول واحد من النوع ده حتى لو بنت وقفت قدامه في الطابور.

## try

```html
<style>
  p { margin:4px 0; color:#3d2c18; }
  p:first-of-type { font-weight:bold; color:#b5551f; }
</style>
<div><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>أول فقرة (مميزة)</p><p>فقرة تانية</p></div>
```

## syntax

```css nolive
p:first-of-type { }
img:first-of-type { }
```

- حسب اسم الوسم.

## use

- أول فقرة بعد العنوان.
- أول صورة في المقال.

## avoid

- استخدامها مع classes (بتعدّ الوسم فقط).

## examples

### 1) أول فقرة
حتى لو بعد عنوان.

```html
<style>
  p { margin:4px 0; color:#3d2c18; }
  p:first-of-type { font-size:1.2rem; font-weight:bold; }
</style>
<div><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>مقدمة بخط كبير</p><p>فقرة عادية</p></div>
```



### 2) مقارنة بـ first-child
الاتنين على نفس المثال.

```html
<style>
  .a p:first-child { color:#b5551f; } .b p:first-of-type { color:#3d7a5a; }
  p { margin:2px 0; font-weight:bold; }
</style>
<div class="a"><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>first-child (مبتنطبقش)</p></div><div class="b"><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>first-of-type (تنطبق)</p></div>
```



### 3) أول صورة
تكبير.

```html
<style>
  .g span { display:inline-block; width:30px; height:30px; background:#bcd4a8; margin:2px; }
  .g span:first-of-type { width:60px; background:#c9772f; }
</style>
<div class="g"><span></span><span></span><span></span></div>
```



## mistakes

### الاعتماد على class

```css bad
.item:first-of-type { }  /* بيعدّ الوسم مش class */
```

```css good
.item:nth-child(1 of .item) { }
```

أو استخدم محدد مختلف.

## quiz

### first-of-type بتختار؟
- [x] أول عنصر من نوعه
- [ ] أول ابن
- [ ] آخر ابن
- [ ] الكل

نفس الوسم.

### الفرق عن first-child؟
- [x] بتتجاهل الأنواع التانية
- [ ] نفسها
- [ ] بتختار الكل
- [ ] لا شيء

النوع فقط.

## refs

- [MDN: :first-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-of-type)
