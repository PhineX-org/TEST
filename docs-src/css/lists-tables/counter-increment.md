---
id: counter-increment
kind: property
cat: lists-tables
chip: counter-increment
title: زيادة العدّاد
en: CSS counter-increment property
status: stable
support: all
size: compact
mdn: counter-increment
summary: counter-increment بتزوّد قيمة عدّاد CSS على كل عنصر (الافتراضي +1). مع counter-reset وcontent بتعمل ترقيم تلقائي.
keywords: counter-increment, عداد, زيادة, ترقيم
related: counter-reset, content, fn-counter, list-style-type
---

## intro

الخاصية `counter-increment` بتزوّد قيمة **عدّاد CSS** كل ما العنصر ده يتقابل (الافتراضي **+1**): `counter-increment: step;` أو `counter-increment: step 2;` (تزويد بـ 2) أو `-1` للعدّ التنازلي. بتتحط على **العناصر اللي بتعدّها** (كل `li` أو `h2`). لازم قبلها [[counter-reset]] على الحاوية (ولو مفيش، المتصفح بينشئ العدّاد تلقائياً). وبعد كده بتعرض القيمة بـ [[content]] و`counter(step)`. ترتيب الحدوث: العداد بيزيد **قبل** ما يُعرض في نفس العنصر، فأول عنصر بيظهر 1 مش 0.

## try

```html
<style>
  .l { counter-reset: s; }
  .l p { counter-increment: s 2; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s) ". "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>زوّد بـ 2</p><p>تاني</p><p>تالت</p></div>
```

## syntax

```css nolive
li { counter-increment: item; }
li { counter-increment: item 2; }
li { counter-increment: item -1; }
```

- **القيمة المبدئية**: `none`.
- الخطوة الافتراضية +1.

## values

### `<name>`
يزوّد بـ 1.

### `<name> <number>`
يزوّد بالرقم.

### none
بدون.

## use

- ترقيم عناوين وخطوات.
- عدّ تنازلي بـ -1.

## avoid

- وضعها على عنصر مش بتحب تعدّه.

## examples

### 1) +1 عادي
الأشهر.

```html
<style>
  .l { counter-reset:s; }
  .l p { counter-increment:s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s) ". "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>أول</p><p>تاني</p><p>تالت</p></div>
```



### 2) تنازلي
-1.

```html
<style>
  .l { counter-reset:s 4; }
  .l p { counter-increment:s -1; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s) ". "; color:#b5551f; font-weight:bold; }
</style>
<div class="l"><p>3</p><p>2</p><p>1</p></div>
```



### 3) ترقيم عناوين
h4 بعدّاد.

```html
<style>
  .d { counter-reset:h; }
  h4 { counter-increment:h; margin:6px 0; color:#7a4a1d; }
  h4::before { content:"الفصل " counter(h) ": "; color:#c9772f; }
</style>
<div class="d"><h4>المقدمة</h4><h4>الأساسيات</h4><h4>الخاتمة</h4></div>
```



## mistakes

### عرض قبل الزيادة

```css bad
/* لا increment */
```

```css good
li { counter-increment:item; }
```

بدونها مفيش زيادة.

## quiz

### الخطوة الافتراضية؟
- [x] +1
- [ ] +2
- [ ] 0
- [ ] -1

واحد.

### للعدّ التنازلي؟
- [x] قيمة سالبة
- [ ] reset
- [ ] none
- [ ] content

-1.

## refs

- [MDN: counter-increment](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment)
