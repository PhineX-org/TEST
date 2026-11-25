---
id: first-child
kind: pseudoclass
cat: pc-structure
chip: :first-child
title: أول ابن
en: CSS :first-child pseudo-class
status: stable
support: all
mdn: :first-child
summary: الحالة first-child بتختار العنصر لو هو أول ابن لأبوه. مفيدة لإزالة الـ margin من أول عنصر أو تمييزه.
keywords: :first-child, first-child, أول عنصر, list, إزالة المسافة
related: last-child, only-child, nth-child, first-of-type, not, pseudo-guide
---

## intro

`:first-child` بتختار العنصر **لو كان أول ابن لأبوه**، بغض النظر عن نوعه. يعني `li:first-child` = كل `li` هو أول عنصر جوه الـ `ul` بتاعه. و`p:first-child` بتختار الفقرة **بس لو** كانت أول حاجة جوه أبوها (لو قبلها عنوان `h2` مثلاً، مش هتتختار!).

الاستخدامات الأكثر شيوعاً:
- **إزالة الـ margin العلوي** من أول عنصر في حاوية: `.card > :first-child { margin-top: 0; }`.
- **تمييز أول عنصر** في قايمة بتنسيق مختلف.
- **فواصل بين العناصر**: بدل ما تضيف حد لكل عنصر وتشيله من الأول، اكتب `li + li { border-top: ... }` أو `li:not(:first-child)`.

الفرق عن [[first-of-type]]: دي بتختار أول عنصر **من نوعه** (حتى لو مش أول ابن)، أما `first-child` فبتشترط يكون **الأول فعلاً**. ومعاها زميلاتها [[last-child]] و[[only-child]] و[[nth-child]].

> [!warn] أخطاء شائعة: توقع إن `p:first-child` هتختار أول فقرة، بس هي بتختارها لو أول ابن فقط. لو عايز أول فقرة بغض النظر استخدم `p:first-of-type`.

## try

```html
<style>
  li { padding:6px 10px; background:#efe0bd; color:#3d2c18; margin:2px 0; list-style:none; border-radius:4px; }
  li:first-child { background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<ul style="padding:0;margin:0"><li>الأول</li><li>التاني</li><li>التالت</li></ul>
```

## syntax

```css nolive
li:first-child { font-weight: bold; }
.card > :first-child { margin-top: 0; }
p:first-child { }
```

- أول ابن بغض النظر عن النوع.
- p:first-child لو أول ابن فقط.

## use

- إزالة الـ margin العلوي.
- تمييز أول عنصر في قائمة.
- تنسيق مختلف لأول خلية/صف.

## avoid

- توقع إنها بتختار أول عنصر من نوعه (استخدم first-of-type).
- محددات first-child على عناصر بتتغير ترتيبها ديناميكياً بدون حذر.

## examples

### 1) أول عنصر مميز
لون مختلف.

```html
<style>
  li { padding:6px 10px; background:#efe0bd; color:#3d2c18; margin:2px 0; list-style:none; border-radius:4px; }
  li:first-child { background:#3d7a5a; color:#f3ede0; }
</style>
<ul style="padding:0;margin:0"><li>الأول</li><li>التاني</li><li>التالت</li></ul>
```



### 2) إزالة الـ margin العلوي
أول عنصر في الكارت.

```html
<style>
  .c { background:#efe0bd; padding:10px; border-radius:8px; color:#3d2c18; }
  .c > * { margin:10px 0; }
  .c > :first-child { margin-top:0; }
</style>
<div class="c"><h4>عنوان</h4><p>فقرة</p></div>
```



### 3) p:first-child بشرط
مبتتطبقش لو قبلها h2.

```html
<style>
  p:first-child { color:#b5551f; font-weight:bold; }
  p { margin:4px 0; color:#3d2c18; }
</style>
<div><p>فقرة أولى (متطبق)</p></div><div><h4 style="margin:0;color:#3d2c18">عنوان</h4><p>فقرة بعد عنوان (مش متطبق)</p></div>
```



### 4) فاصل بين العناصر
بدون first-child.

```html
<style>
  li { list-style:none; padding:6px; color:#3d2c18; background:#efe0bd; }
  li:not(:first-child) { border-top:2px solid #bda27a; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li><li>ج</li></ul>
```



## mistakes

### توقع أول فقرة

```css bad
p:first-child { }  /* مش هتشتغل لو فيه h2 قبلها */
```

```css good
p:first-of-type { }
```

first-of-type بيعد النوع.

### حد على كل العناصر وإزالته من الأول

```css bad
li { border-top:1px solid; }
li:first-child { border-top:0; }
```

```css good
li + li { border-top:1px solid; }
```

طريقة أنضف.

## quiz

### first-child بتختار؟
- [x] أول ابن لأبوه
- [ ] أول عنصر من نوعه
- [ ] آخر ابن
- [ ] كل الأبناء

أول ابن فعلاً.

### p:first-child لو قبلها h2؟
- [x] مبتنطبقش
- [ ] بتنطبق
- [ ] بتنطبق على h2
- [ ] خطأ

لازم تكون الأولى.

### البديل لأول عنصر من نوعه؟
- [x] first-of-type
- [ ] last-child
- [ ] only-child
- [ ] empty

first-of-type.

## refs

- [MDN: :first-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child)
