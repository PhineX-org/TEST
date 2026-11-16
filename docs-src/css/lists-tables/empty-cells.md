---
id: empty-cells
kind: property
cat: lists-tables
chip: empty-cells
title: الخلايا الفارغة
en: CSS empty-cells property
status: stable
support: all
size: compact
mdn: empty-cells
summary: empty-cells: hide بتخفي حدود وخلفية الخلايا الفاضية في الجدول (مع border-collapse: separate).
keywords: empty-cells, hide, show, خلايا فارغة, جدول
related: border-collapse, border-spacing, table-layout
---

## intro

الخاصية `empty-cells` بتحدد **هل الخلايا الفاضية** (اللي مفيهاش محتوى خالص) **تتعرض بحدودها وخلفيتها**: **`show`** (الافتراضي) تظهر عادي، و**`hide`** تختفي حدودها وخلفيتها كأنها مش موجودة. زي ما `border-spacing` بتشتغل **مع `border-collapse: separate`** فقط. مفيدة لجداول فيها بيانات ناقصة، أو لوحات بيانات فيها خلايا مش متاحة. خلية فيها مسافة فاضية أو `&nbsp;` **مش** فاضية بالنسبة للمتصفح، فتتعرض.

## try

```html
<style>
  table { border-collapse:separate; border-spacing:4px; color:#3d2c18; empty-cells:hide; }
  td { border:2px solid #7a4a1d; background:#efe0bd; padding:8px 14px; }
</style>
<table><tr><td>1</td><td></td><td>3</td></tr></table>
```

## syntax

```css nolive
table { empty-cells: hide; }
table { empty-cells: show; }
```

- **القيمة المبدئية**: `show`.
- مع separate فقط.
- بتتوارث.

## values

### show
تعرض الخلية الفاضية.

### hide
تخفي حدودها وخلفيتها.

## use

- جداول بيانات ناقصة.
- لوحات فيها خلايا مش متاحة.

## avoid

- استخدامها مع collapse.

## examples

### 1) hide
الخلية الفاضية بتختفي.

```html
<style>
  table { border-collapse:separate; border-spacing:4px; color:#3d2c18; empty-cells:hide; }
  td { border:2px solid #7a4a1d; background:#efe0bd; padding:8px 14px; }
</style>
<table><tr><td>1</td><td></td><td>3</td></tr></table>
```



### 2) show
الافتراضي.

```html
<style>
  table { border-collapse:separate; border-spacing:4px; color:#3d2c18; empty-cells:show; }
  td { border:2px solid #7a4a1d; background:#efe0bd; padding:8px 14px; }
</style>
<table><tr><td>1</td><td></td><td>3</td></tr></table>
```



### 3) مسافة بتعتبر محتوى
nbsp.

```html
<style>
  table { border-collapse:separate; border-spacing:4px; color:#3d2c18; empty-cells:hide; }
  td { border:2px solid #7a4a1d; background:#efe0bd; padding:8px 14px; }
</style>
<table><tr><td>1</td><td>&nbsp;</td><td>3</td></tr></table>
```



## mistakes

### مع collapse

```css bad
table { border-collapse:collapse; empty-cells:hide; }  /* مبتشتغلش */
```

```css good
border-collapse:separate
```

لازم separate.

## quiz

### hide بتعمل؟
- [x] تخفي حدود الخلايا الفاضية
- [ ] تحذفها
- [ ] تلونها
- [ ] تكبّرها

تخفي المظهر.

### خلية فيها nbsp؟
- [x] مش فاضية
- [ ] فاضية
- [ ] محذوفة
- [ ] مخفية

بتتعرض.

## refs

- [MDN: empty-cells](https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells)
