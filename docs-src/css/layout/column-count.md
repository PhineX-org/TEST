---
id: column-count
kind: property
cat: layout
chip: column-count
title: عدد الأعمدة
en: CSS column-count property
status: stable
support: all
size: compact
mdn: column-count
summary: column-count بتحدد عدد الأعمدة بالظبط لنص متعدد الأعمدة.
keywords: column-count, عدد الاعمدة, columns, multi-column
related: columns, column-width, column-rule, gap
---

## intro

الخاصية `column-count` بتحدد **عدد الأعمدة بالظبط** اللي المحتوى هيتقسّم عليها. لو كتبت `3` يبقى تلات أعمدة بغض النظر عن العرض. ده بيختلف عن [[column-width]] اللي بتحدد العرض المثالي وبيتغيّر العدد حسب المساحة. لو الاتنين اتحددوا، الـ count بيتعامل كـ **حد أقصى** للأعمدة. الاختصار [[columns]].

> [!tip] لو عايز تجاوب تلقائي مع عرض الشاشة استخدم `column-width` بدل `column-count`، لأنها بتحسب العدد حسب المساحة المتاحة.

## try

```html
<style>
  .t { column-count:2; column-gap:14px; background:#efe0bd; color:#3d2c18; padding:10px; line-height:1.8; }
</style>
<div class="t">نص بيتقسّم على عمودين ثابتين مهما كان عرض الصفحة. جرّب غيّر الرقم وشوف إزاي بيتوزع الكلام بين الأعمدة.</div>
```

## syntax

```css nolive
column-count: 3;
column-count: auto;
```

- **القيمة المبدئية**: `auto`.

## values

### `<integer>`
عدد صحيح موجب.

### auto
يتحدد بـ `column-width` أو عمود واحد.

## use

- عدد أعمدة ثابت لمقال.
- قوائم خيارات في 2 أو 3 أعمدة.

## avoid

- عدد كبير على شاشات ضيقة (الأعمدة هتبقى ضيقة).

## examples

### 1) عمودين
تقسيم بسيط.

```html
<style>
  .t { column-count:2; column-gap:12px; background:#efe0bd; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">نص يتوزع على عمودين بشكل تلقائي مع زيادة الكلام تحت. كمّل نص لحد ما العمود الأول يتملي.</div>
```



### 2) 4 أعمدة لقائمة
قائمة اختيارات.

```html
<style>
  ul { column-count:3; list-style:none; padding:8px; margin:0; background:#bcd4a8; color:#3d2c18; }
</style>
<ul><li>مصر</li><li>السعودية</li><li>الإمارات</li><li>الأردن</li><li>تونس</li><li>المغرب</li></ul>
```



### 3) count مع width
بيحترم الاتنين.

```html
<style>
  .t { column-count:4; column-width:80px; background:#e4c490; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">لو العرض مش كفاية للعدد المطلوب هيقل عدد الأعمدة تلقائياً.</div>
```



## mistakes

### عدد كبير في عرض ضيق

```css bad
.t { column-count:6; }
```

```css good
.t { column-width:150px; }
```

العرض المثالي أحسن للتجاوب.

## quiz

### column-count بتحدد؟
- [ ] عرض العمود
- [x] عدد الأعمدة
- [ ] المسافة
- [ ] الخط

العدد.

### القيمة المبدئية؟
- [ ] 1
- [x] auto
- [ ] none
- [ ] 0

auto.

## refs

- [MDN: column-count](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count)
