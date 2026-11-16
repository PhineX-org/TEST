---
id: column-rule
kind: property
cat: layout
chip: column-rule
title: خط فاصل بين الأعمدة
en: CSS column-rule property
status: stable
support: all
size: compact
mdn: column-rule
summary: column-rule بيرسم خط بين الأعمدة (زي border). بتحدد سُمكه ونوعه ولونه، ومبياخدش مساحة.
keywords: column-rule, خط فاصل, فاصل اعمدة, multi-column, border
related: columns, column-count, column-gap, border
---

## intro

الخاصية `column-rule` بترسم **خط فاصل** بين الأعمدة في [[columns]]، وصيغتها نفس [[border]]: `width style color`، مثلاً `1px solid #7a4a1d`. الخط بيتحط في **نص الفراغ** بين الأعمدة ومبياخدش مساحة إضافية، وبتتحكم في الفراغ بـ `column-gap`. وبتتفكك لـ `column-rule-width` و`column-rule-style` و`column-rule-color`.

> [!note] لازم تحدد **النوع** (`solid` أو `dashed`…) وإلا مفيش خط هيظهر، لأن النوع الافتراضي `none`. والخط بيظهر بس لما يكون فيه أكتر من عمود وفيه محتوى كفاية للعمود الثاني.

## try

```html
<style>
  .t { columns:2; column-gap:20px; column-rule:2px solid #c9772f; background:#efe0bd; color:#3d2c18; padding:10px; line-height:1.8; }
</style>
<div class="t">خط فاصل بين العمودين بيساعد القارئ يفرّق. جرّب غيّر النوع لـ dashed أو dotted وكمّل كلام كفاية للعمود الثاني.</div>
```

## syntax

```css nolive
column-rule: 1px solid #999;
column-rule: 2px dashed #c9772f;
```

- **القيمة المبدئية**: `medium none currentcolor`.

## values

### `<line-width>`
سُمك الخط `1px`.

### `<line-style>`
`solid` `dashed` `dotted`…

### `<color>`
لون الخط.

## use

- فواصل مقالات الأعمدة.
- إبراز التقسيم في قوائم.

## avoid

- خط سميك يشتّت القراءة.

## examples

### 1) solid
خط عادي.

```html
<style>
  .t { columns:2; column-gap:16px; column-rule:1px solid #7a4a1d; background:#efe0bd; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">فاصل بسيط بين عمودين يظهر بعد ما يتملي العمود الأول بنص كفاية.</div>
```



### 2) dashed
خط متقطع.

```html
<style>
  .t { columns:2; column-gap:16px; column-rule:2px dashed #3d7a5a; background:#bcd4a8; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">فاصل متقطع بين عمودين يظهر بعد ما يتملي العمود الأول بنص كفاية.</div>
```



### 3) سميك
للتوضيح.

```html
<style>
  .t { columns:2; column-gap:20px; column-rule:6px double #b5551f; background:#e4c490; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">فاصل double سميك بين عمودين يظهر بعد ما يتملي العمود الأول بنص كفاية.</div>
```



## mistakes

### نسيان النوع

```css bad
.t { column-rule:2px #999; }  /* مفيش خط */
```

```css good
.t { column-rule:2px solid #999; }
```

النوع ضروري زي الحد.

## quiz

### column-rule شبه؟
- [x] border
- [ ] margin
- [ ] padding
- [ ] outline

نفس الصيغة.

### بياخد مساحة؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط dashed

بيتحط في الـ gap.

## refs

- [MDN: column-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule)
