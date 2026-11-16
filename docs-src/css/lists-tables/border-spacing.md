---
id: border-spacing
kind: property
cat: lists-tables
chip: border-spacing
title: المسافة بين خلايا الجدول
en: CSS border-spacing property
status: stable
support: all
size: compact
mdn: border-spacing
summary: border-spacing بتحدد المسافة بين حدود الخلايا في الجدول (مع border-collapse: separate). قيمة أو قيمتين: أفقي ورأسي.
keywords: border-spacing, مسافة الخلايا, جدول, separate
related: border-collapse, table-layout, padding
---

## intro

الخاصية `border-spacing` بتحدد **المسافة بين خلايا الجدول** (الفراغ بين حدود كل خلية والتانية). **بتشتغل فقط مع `border-collapse: separate`** (الافتراضي)؛ مع `collapse` بتتجاهل. القيمة: رقم واحد للمسافتين، أو رقمين **أفقي ثم رأسي**: `border-spacing: 8px 4px;`. بتتحط على `table`. ولو عايز صفوف وأعمدة ملتصقة مع زوايا مدورة اعمل `border-spacing: 0`. وبتتوارث. بديل حديث لعمل فجوات: تستخدم `display: grid` بدل الجدول لو البيانات مش جدولية فعلاً.

## try

```html
<style>
  table { border-collapse:separate; border-spacing:8px 4px; color:#3d2c18; }
  td { background:#efe0bd; padding:8px 14px; border-radius:6px; }
</style>
<table><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></table>
```

## syntax

```css nolive
table { border-spacing: 8px; }
table { border-spacing: 10px 4px; }
table { border-spacing: 0; }
```

- **القيمة المبدئية**: `0` (أو 2px حسب المتصفح).
- مع separate فقط.

## values

### `<length>`
مسافة واحدة للاتنين.

### `<horizontal> <vertical>`
قيمتين.

## use

- فجوات بين الخلايا.
- شكل بطاقات في جدول.

## avoid

- استخدامها مع `collapse`.

## examples

### 1) مسافة واحدة
8px.

```html
<style>
  table { border-spacing:8px; color:#3d2c18; }
  td { background:#efe0bd; padding:8px 14px; border-radius:6px; }
</style>
<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
```



### 2) أفقي ورأسي
قيمتين.

```html
<style>
  table { border-spacing:14px 2px; color:#3d2c18; }
  td { background:#e4c490; padding:6px 12px; border-radius:6px; }
</style>
<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
```



### 3) ملتصقة
صفر.

```html
<style>
  table { border-spacing:0; color:#3d2c18; }
  td { background:#efe0bd; padding:8px 14px; border:1px solid #bda27a; }
</style>
<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
```



## mistakes

### مع collapse

```css bad
table { border-collapse:collapse; border-spacing:8px; }  /* متجاهل */
```

```css good
table { border-collapse:separate; border-spacing:8px; }
```

لازم separate.

## quiz

### border-spacing بتشتغل مع؟
- [x] separate
- [ ] collapse
- [ ] الاتنين
- [ ] مفيش

separate.

### قيمتين معناهم؟
- [x] أفقي ثم رأسي
- [ ] رأسي ثم أفقي
- [ ] يمين ويسار
- [ ] أعلى وأسفل

أفقي ورأسي.

## refs

- [MDN: border-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing)
