---
id: only-child
kind: pseudoclass
cat: pc-structure
chip: :only-child
title: ابن وحيد
en: CSS :only-child pseudo-class
status: stable
support: all
size: compact
mdn: :only-child
summary: الحالة only-child بتختار العنصر لو هو الابن الوحيد لأبوه. اختصار لـ first-child مع last-child.
keywords: :only-child, only-child, ابن وحيد, عنصر وحيد
related: first-child, last-child, only-of-type, not
---

## intro

`:only-child` بتختار العنصر **لو هو الابن الوحيد** لأبوه، يعني مفيش إخوات قبله أو بعده. هي نفس `:first-child:last-child` بس مختصرة. مفيدة لتنسيق مختلف لما يكون فيه عنصر واحد بس (مثلاً قايمة فيها عنصر واحد، أو صورة وحيدة في معرض). الإخوة هنا بيتحسبوا **عناصر فقط** (النص مش بيتحسب). ولتجاهل نوع العنصر استخدم [[only-of-type]]. تخيّل أب عنده ولد واحد بس: هو ده «الابن الوحيد» مهما كان اسمه.

## try

```html
<style>
  li { list-style:none; padding:6px 10px; background:#efe0bd; color:#3d2c18; margin:2px 0; }
  li:only-child { background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<ul style="padding:0;margin:0 0 6px"><li>عنصر وحيد</li></ul><ul style="padding:0;margin:0"><li>أ</li><li>ب</li></ul>
```

## syntax

```css nolive
li:only-child { }
.gallery img:only-child { width: 100%; }
```

- = first-child + last-child.

## use

- تنسيق مختلف للعنصر الوحيد.
- صورة واحدة تاخد العرض كله.

## avoid

- افتراض إن النص بيتحسب كأخ.

## examples

### 1) قايمة بعنصر واحد
تتميّز.

```html
<style>
  li { list-style:none; padding:6px 10px; background:#efe0bd; color:#3d2c18; margin:2px 0; }
  li:only-child { background:#3d7a5a; color:#f3ede0; }
</style>
<ul style="padding:0;margin:0 0 6px"><li>وحيد</li></ul><ul style="padding:0;margin:0"><li>أ</li><li>ب</li></ul>
```



### 2) صورة وحيدة
عرض كامل.

```html
<style>
  .g { display:flex; gap:4px; background:#efe0bd; padding:6px; }
  .g div { flex:1; height:30px; background:#c9772f; }
  .g div:only-child { height:50px; background:#3d7a5a; }
</style>
<div class="g"><div></div></div><div class="g"><div></div><div></div></div>
```



### 3) مع not
تنسيق للعناصر المتعددة.

```html
<style>
  li { list-style:none; padding:6px; margin:2px 0; background:#efe0bd; color:#3d2c18; }
  li:not(:only-child) { border-inline-start:4px solid #c9772f; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li></ul>
```



## mistakes

### الخلط مع only-of-type

```css bad
p:only-child { }  /* لو فيه h2 جنبها مبتنطبقش */
```

```css good
p:only-of-type { }
```

النوع مش الإخوة كلهم.

## quiz

### only-child بتختار؟
- [x] الابن الوحيد
- [ ] أول ابن
- [ ] آخر ابن
- [ ] كل الأبناء

مفيش إخوات.

### بتساوي؟
- [x] first-child + last-child
- [ ] root + empty
- [ ] hover + focus
- [ ] link + visited

الاتنين معاً.

## refs

- [MDN: :only-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:only-child)
