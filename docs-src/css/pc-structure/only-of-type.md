---
id: only-of-type
kind: pseudoclass
cat: pc-structure
chip: :only-of-type
title: العنصر الوحيد من نوعه
en: CSS :only-of-type pseudo-class
status: stable
support: all
size: compact
mdn: :only-of-type
summary: الحالة only-of-type بتختار العنصر لو هو الوحيد من نوعه بين إخواته حتى لو معاه عناصر من أنواع تانية.
keywords: :only-of-type, only-of-type, وحيد من نوعه
related: only-child, first-of-type, last-of-type
---

## intro

`:only-of-type` بتختار العنصر **لو هو الوحيد من نوعه (نفس الوسم)** بين إخواته، حتى لو عنده إخوات من أنواع تانية. فرقها عن [[only-child]]: دي بتشمل الحالات اللي فيها عناصر تانية. مثال: `img:only-of-type` = صورة واحدة بس جوه الحاوية حتى لو معاها فقرات. تُستخدم لتنسيق عنصر «فريد» في حاويته. وهي تساوي `:first-of-type:last-of-type`. يعني «أنا النوع الوحيد من وسمي هنا»، مفيش حد من نفس الوسم قبلي أو بعدي.

## try

```html
<style>
  .a b:only-of-type { color:#b5551f; font-size:1.2rem; }
  .a { color:#3d2c18; }
</style>
<div class="a"><span>نص</span> <b>مميز وحيد</b></div>
```

## syntax

```css nolive
img:only-of-type { width: 100%; }
p:only-of-type { }
```

- = first-of-type + last-of-type.

## use

- تنسيق عنصر فريد النوع.
- صورة وحيدة وسط نصوص.

## avoid

- الخلط مع only-child.

## examples

### 1) وحيد النوع
حتى لو معاه إخوات.

```html
<style>
  .a b:only-of-type { color:#b5551f; font-size:1.2rem; }
  .a { color:#3d2c18; }
</style>
<div class="a"><span>نص</span> <b>مميز</b> <i>مائل</i></div>
```



### 2) مجموعتين
واحد فريد وواحد لا.

```html
<style>
  p:only-of-type { color:#3d7a5a; font-weight:bold; }
  p { margin:2px 0; color:#3d2c18; }
</style>
<div><p>الفقرة الوحيدة</p><h4 style="margin:0;color:#7a4a1d">عنوان</h4></div><div><p>فقرة 1</p><p>فقرة 2</p></div>
```



### 3) مقارنة only-child
الأخ مختلف.

```html
<style>
  .a p:only-child { background:#e4c490; } .b p:only-of-type { background:#bcd4a8; }
  p { margin:2px 0; padding:4px; color:#3d2c18; }
</style>
<div class="a"><p>only-child (لو معاها h4 مبتنطبقش)</p><h4 style="margin:0;color:#7a4a1d">عنوان</h4></div><div class="b"><p>only-of-type</p><h4 style="margin:0;color:#7a4a1d">عنوان</h4></div>
```



## mistakes

### استخدام only-child

```css bad
p:only-child { }  /* لو فيه h4 جنبها مبتنطبقش */
```

```css good
p:only-of-type { }
```

النوع أدق.

## quiz

### only-of-type بتختار؟
- [x] وحيد من نوعه
- [ ] وحيد تماماً
- [ ] أول ابن
- [ ] آخر ابن

نفس الوسم.

### بتساوي؟
- [x] first-of-type + last-of-type
- [ ] root + empty
- [ ] hover
- [ ] link

الاتنين.

## refs

- [MDN: :only-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:only-of-type)
