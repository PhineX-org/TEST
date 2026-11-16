---
id: caption-side
kind: property
cat: lists-tables
chip: caption-side
title: مكان عنوان الجدول
en: CSS caption-side property
status: stable
support: all
size: compact
mdn: caption-side
summary: caption-side بتحدد عنوان الجدول caption يظهر فوق الجدول (top) ولا تحته (bottom).
keywords: caption-side, caption, عنوان الجدول, top, bottom
related: border-collapse, table-layout, text-align
---

## intro

الخاصية `caption-side` بتحدد **مكان عنوان الجدول** (العنصر `caption`) بالنسبة للجدول: **`top`** (فوق، الافتراضي) أو **`bottom`** (تحت). بتتحط على `caption` أو على `table` وبتتوارث. بتستخدم مع `text-align` لمحاذاة النص نفسه. والعنوان بيتعامل كجزء من الجدول (الوصولية بتعتمد عليه لوصف الجدول)، فاستخدم `caption` الحقيقي مش `div`. وفي المواصفات الحديثة فيه قيم منطقية `block-start` و`block-end` بدل top وbottom لكن الدعم بيتفاوت.

## try

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; }
  caption { caption-side:bottom; padding:6px; font-weight:bold; color:#7a4a1d; }
  td { border:1px solid #bda27a; padding:6px 12px; }
</style>
<table><caption>عنوان تحت الجدول</caption><tr><td>1</td><td>2</td></tr></table>
```

## syntax

```css nolive
caption { caption-side: top; }
caption { caption-side: bottom; }
```

- **القيمة المبدئية**: `top`.
- بتتوارث.

## values

### top
فوق الجدول.

### bottom
تحت الجدول.

## use

- عنوان فوق أو تحت حسب التصميم.
- عنوان تحت الجدول لمصدر البيانات.

## avoid

- استخدام `div` بدل `caption` الحقيقي.

## examples

### 1) فوق
الافتراضي.

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; }
  caption { caption-side:top; padding:6px; font-weight:bold; color:#7a4a1d; }
  td { border:1px solid #bda27a; padding:6px 12px; }
</style>
<table><caption>عنوان فوق</caption><tr><td>1</td><td>2</td></tr></table>
```



### 2) تحت
bottom.

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; }
  caption { caption-side:bottom; padding:6px; font-weight:bold; color:#7a4a1d; }
  td { border:1px solid #bda27a; padding:6px 12px; }
</style>
<table><caption>عنوان تحت</caption><tr><td>1</td><td>2</td></tr></table>
```



### 3) محاذاة
text-align معاه.

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; width:100%; }
  caption { text-align:start; padding:6px 0; font-weight:bold; color:#3d7a5a; }
  td { border:1px solid #bda27a; padding:6px 12px; }
</style>
<table><caption>جدول الدرجات</caption><tr><td>أحمد</td><td>90</td></tr></table>
```



## mistakes

### div بدل caption

```css bad
<div class="title"> فوق الجدول
```

```css good
<caption> جوه الجدول
```

للوصولية.

## quiz

### الافتراضي؟
- [x] top
- [ ] bottom
- [ ] left
- [ ] right

فوق.

### العنصر الصح للعنوان؟
- [x] caption
- [ ] div
- [ ] h1
- [ ] span

عنصر caption.

## refs

- [MDN: caption-side](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side)
