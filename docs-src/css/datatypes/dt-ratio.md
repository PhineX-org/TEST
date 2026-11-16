---
id: dt-ratio
kind: datatype
cat: datatypes
chip: <ratio>
title: نوع القيمة ratio: النسبة بين رقمين
en: CSS <ratio> data type
status: stable
support: all
size: compact
mdn: ratio
summary: نوع ratio هو نسبة بين رقمين مثل 16 / 9: بيستخدم في aspect-ratio وmedia query (aspect-ratio).
keywords: ratio, aspect-ratio, 16/9, نسبة العرض للارتفاع
related: aspect-ratio, object-fit, at-media
---

## intro

النوع `<ratio>` هو **نسبة بين رقمين** بالشكل `width / height`: `16 / 9` أو `4 / 3` أو `1 / 1`. بيستخدم في الخاصية [[aspect-ratio]] (عشان العنصر يحافظ على نسبة أبعاده مهما اتغيّر حجمه) وفي `@media (aspect-ratio: 16/9)` (نسبة النافذة) وفي `min-aspect-ratio`. ممكن تكتب رقم واحد (`2` = `2 / 1`). المسافات حوالين `/` اختيارية. أشهر النسب: **16/9** للفيديو، **4/3**، **1/1** (مربع)، **3/2** للصور، **21/9** للشاشات الواسعة.

## try

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; color:#3d2c18; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="aspect-ratio:16/9;width:140px">16 / 9</div><div class="b" style="aspect-ratio:1/1;width:70px">1/1</div></div>
```

## syntax

```css nolive
aspect-ratio: 16 / 9;
aspect-ratio: 1;
@media (min-aspect-ratio: 16/9) { ... }
```

- `number / number` أو رقم واحد.

## use

- حاويات فيديو وصور.
- بطاقات مربعة.

## avoid

- كتابة نسبة بوحدات.

## examples

### 1) 16/9
فيديو.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; color:#3d2c18; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="aspect-ratio:16/9;width:140px;display:grid;place-items:center">16 / 9</div></div>
```



### 2) مربع
1.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; color:#3d2c18; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="aspect-ratio:1;width:70px;display:grid;place-items:center">1</div></div>
```



### 3) 4/3
تقليدية.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; color:#3d2c18; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="aspect-ratio:4/3;width:120px;display:grid;place-items:center">4 / 3</div></div>
```



## mistakes

### وحدات في النسبة

```css bad
aspect-ratio:16px / 9px;  /* غلط */
```

```css good
aspect-ratio:16 / 9;
```

أرقام فقط.

## quiz

### النسبة بتتكتب؟
- [x] 16 / 9
- [ ] 16:9
- [ ] 16x9
- [ ] 16-9

بشرطة مائلة.

### 1 / 1؟
- [x] مربع
- [ ] مستطيل
- [ ] دايرة
- [ ] خط

مربع.

## refs

- [MDN: `<ratio>`](https://developer.mozilla.org/en-US/docs/Web/CSS/ratio)
