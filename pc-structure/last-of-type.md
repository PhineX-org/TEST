---
id: last-of-type
kind: pseudoclass
cat: pc-structure
chip: :last-of-type
title: آخر عنصر من نوعه
en: CSS :last-of-type pseudo-class
status: stable
support: all
size: compact
mdn: :last-of-type
summary: الحالة last-of-type بتختار آخر عنصر من نوع معين بين إخواته، حتى لو بعده عناصر من أنواع تانية.
keywords: :last-of-type, last-of-type, آخر من نوعه
related: last-child, first-of-type, only-of-type, nth-of-type
---

## intro

`:last-of-type` بتختار **آخر عنصر من نوعه** بين إخواته، بغض النظر عن العناصر التانية اللي ممكن تيجي بعده. مرآة [[first-of-type]]. مثال: `p:last-of-type` = آخر فقرة في الحاوية حتى لو بعدها `<footer>` أو `<span>`. بتحل مشكلة `p:last-child` اللي مبتشتغلش لو الفقرة مش آخر ابن. مفيدة لإزالة margin آخر فقرة في مقال. وبتتعامل مع **اسم الوسم** (`p`, `li`, `img`) مش مع الـ class، فخد بالك لو عندك عناصر بنفس الوسم وأدوار مختلفة.

## try

```html
<style>
  p { margin:0 0 8px; color:#3d2c18; }
  p:last-of-type { margin-bottom:0; font-weight:bold; color:#b5551f; }
</style>
<div style="background:#efe0bd;padding:8px"><p>فقرة 1</p><p>فقرة 2 (آخر فقرة)</p><small>تعليق بعدها</small></div>
```

## syntax

```css nolive
p:last-of-type { margin-bottom: 0; }
```

- حسب اسم الوسم.

## use

- آخر فقرة بدون margin.
- تمييز آخر صورة.

## avoid

- الاعتماد على class.

## examples

### 1) آخر فقرة
حتى بعد وسم تاني.

```html
<style>
  .c { background:#efe0bd; padding:8px; color:#3d2c18; }
  .c p { margin:0 0 8px; }
  .c p:last-of-type { margin-bottom:0; color:#3d7a5a; font-weight:bold; }
</style>
<div class="c"><p>1</p><p>2</p><small>تعليق</small></div>
```



### 2) مقارنة
last-child مقابل last-of-type.

```html
<style>
  .a p:last-child { color:#b5551f; } .b p:last-of-type { color:#3d7a5a; }
  p { margin:2px 0; font-weight:bold; color:#3d2c18; }
</style>
<div class="a"><p>مبتتنطبقش</p><small>x</small></div><div class="b"><p>تنطبق</p><small>x</small></div>
```



### 3) آخر عنصر قائمة
نفس الوسم.

```html
<style>
  li:last-of-type { border-bottom:0; font-weight:bold; }
  li { list-style:none; padding:5px; border-bottom:2px solid #bda27a; color:#3d2c18; background:#efe0bd; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li><li>ج</li></ul>
```



## mistakes

### p:last-child وفيه وسم بعدها

```css bad
p:last-child { }
```

```css good
p:last-of-type { }
```

النوع أدق.

## quiz

### last-of-type بتختار؟
- [x] آخر عنصر من نوعه
- [ ] آخر ابن
- [ ] أول ابن
- [ ] الكل

نفس الوسم.

### مرآة؟
- [x] first-of-type
- [ ] empty
- [ ] root
- [ ] target

first-of-type.

## refs

- [MDN: :last-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-of-type)
