---
id: nth-of-type
kind: pseudoclass
cat: pc-structure
chip: :nth-of-type
title: العنصر رقم n من نوعه
en: CSS :nth-of-type() pseudo-class
status: stable
support: all
size: compact
mdn: :nth-of-type
summary: الحالة nth-of-type زي nth-child لكن العد بين العناصر من نفس النوع فقط. مناسبة لفقرات وصور بين أنواع مختلطة.
keywords: :nth-of-type, nth-of-type, odd, even, حسب النوع
related: nth-child, first-of-type, last-of-type, nth-last-child
---

## intro

`:nth-of-type(n)` شبه [[nth-child]] بس **العد بيتم بين العناصر من نفس الوسم فقط**. يعني `p:nth-of-type(2)` = **ثاني فقرة** بغض النظر عن العناصر التانية (عناوين، صور) اللي بينهم. بتقبل نفس الصيغ: رقم، `odd`، `even`، `2n+1`… مفيدة لما الحاوية فيها أنواع مختلطة (فقرات وصور وعناوين) وعايز تنسق كل نوع بتناوب (مثلاً الصور الفردية يمين والزوجية شمال). والعدّ بيبدأ من 1 برضه، ولكل وسم عدّاده الخاص.

## try

```html
<style>
  p { margin:2px 0; padding:4px 8px; color:#3d2c18; background:#efe0bd; }
  p:nth-of-type(2) { background:#c9772f; color:#f3ede0; }
</style>
<div><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>فقرة 1</p><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>فقرة 2 (مميزة)</p><p>فقرة 3</p></div>
```

## syntax

```css nolive
p:nth-of-type(2) { }
img:nth-of-type(odd) { float: left; }
li:nth-of-type(3n) { }
```

- العد بين نفس الوسم فقط.

## use

- تناوب الصور بين الجانبين.
- فقرات زوجية/فردية وسط أنواع مختلطة.

## avoid

- الخلط مع nth-child في الحاويات المختلطة.

## examples

### 1) ثاني فقرة
بتتخطى العناوين.

```html
<style>
  p { margin:2px 0; padding:4px 8px; color:#3d2c18; background:#efe0bd; }
  p:nth-of-type(2) { background:#3d7a5a; color:#f3ede0; }
</style>
<div><h4 style="margin:0;color:#7a4a1d">ع</h4><p>1</p><h4 style="margin:0;color:#7a4a1d">ع</h4><p>2 (مميزة)</p><p>3</p></div>
```



### 2) تناوب
فردي/زوجي لنفس النوع.

```html
<style>
  p { margin:2px 0; padding:4px 8px; color:#3d2c18; }
  p:nth-of-type(odd) { background:#efe0bd; } p:nth-of-type(even) { background:#e4c490; }
</style>
<div><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>1</p><p>2</p><p>3</p><p>4</p></div>
```



### 3) مقارنة nth-child
العد بيختلف.

```html
<style>
  .a p:nth-child(2) { background:#e4c490; } .b p:nth-of-type(2) { background:#bcd4a8; }
  p { margin:2px 0; padding:4px 8px; color:#3d2c18; }
</style>
<div class="a"><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>1</p><p>2 (nth-child(2) = دي الأولى)</p></div><div class="b"><h4 style="margin:0;color:#7a4a1d">عنوان</h4><p>1</p><p>2 (nth-of-type(2))</p></div>
```



## mistakes

### nth-child في حاوية مختلطة

```css bad
p:nth-child(2) { }  /* بيعدّ كل الأنواع */
```

```css good
p:nth-of-type(2) { }
```

للعد حسب النوع.

## quiz

### nth-of-type بتعدّ؟
- [x] نفس الوسم فقط
- [ ] كل الإخوة
- [ ] الأبناء فقط
- [ ] الأحفاد

حسب النوع.

### الاستخدام؟
- [x] حاويات مختلطة الأنواع
- [ ] الجداول فقط
- [ ] الصور فقط
- [ ] الأزرار

أنواع مختلطة.

## refs

- [MDN: :nth-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)
