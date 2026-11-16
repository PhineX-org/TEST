---
id: column-width
kind: property
cat: layout
chip: column-width
title: عرض العمود المثالي
en: CSS column-width property
status: stable
support: all
size: compact
mdn: column-width
summary: column-width بتحدد أقل عرض مثالي للعمود، والمتصفح بيحسب عدد الأعمدة اللي تتسع، فالنص بيتجاوب تلقائياً.
keywords: column-width, عرض العمود, columns, متجاوب, multi-column
related: columns, column-count, column-gap, responsive-guide
---

## intro

الخاصية `column-width` بتحدد **العرض المثالي للعمود**، والمتصفح بيحسب **كام عمود** من العرض ده يتسع في المساحة المتاحة. فلو الصفحة عريضة هتتعمل أعمدة أكتر، ولو ضيقة هتقل لحد عمود واحد. ده **تجاوب تلقائي** من غير media queries. العمود الفعلي ممكن يكون أعرض شوية علشان يملا الباقي. الاختصار [[columns]]، والعدد [[column-count]].

> [!tip] الأحسن في الغالب تحدد `column-width` وتسيب المتصفح يختار العدد، علشان الأعمدة متضيقش جداً على الموبايل.

## try

```html
<style>
  .t { column-width:90px; column-gap:10px; background:#efe0bd; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">غيّر عرض النافذة وشوف عدد الأعمدة بيتغيّر تلقائياً. العمود لا يصغر عن العرض المحدد.</div>
```

## syntax

```css nolive
column-width: 200px;
column-width: 15em;
column-width: auto;
```

- **القيمة المبدئية**: `auto`.

## values

### `<length>`
العرض المثالي للعمود.

### auto
حسب `column-count`.

## use

- نص متجاوب بأعمدة تلقائية.
- قوائم طويلة تتوزع حسب العرض.

## avoid

- عرض كبير جداً (هيبقى عمود واحد غالباً).

## examples

### 1) عرض 100px
بيحسب العدد.

```html
<style>
  .t { column-width:100px; background:#efe0bd; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">نص بيتقسّم حسب العرض المتاح من غير ما تحدد عدد الأعمدة.</div>
```



### 2) مع gap
مسافة بين الأعمدة.

```html
<style>
  .t { column-width:90px; column-gap:20px; background:#bcd4a8; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">النص بيتقسّم والمسافة بين الأعمدة 20px.</div>
```



### 3) وحدة em
العرض بالنسبة لحجم الخط.

```html
<style>
  .t { column-width:8em; background:#e4c490; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">وحدة em بتتغير مع حجم الخط فالأعمدة تفضل مريحة.</div>
```



## mistakes

### عرض أكبر من الحاوية

```css bad
.t { column-width:900px; }
```

```css good
.t { column-width:min(300px,100%); }
```

لو أكبر من الأب هيبقى عمود واحد.

## quiz

### column-width بتحدد؟
- [ ] العدد بالظبط
- [x] العرض المثالي للعمود
- [ ] الخط
- [ ] الحد

والعدد يتحسب تلقائي.

### الفايدة؟
- [ ] بتلون
- [x] تجاوب تلقائي
- [ ] بتخفي
- [ ] بتسرع

عدد أعمدة حسب العرض.

## refs

- [MDN: column-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width)
