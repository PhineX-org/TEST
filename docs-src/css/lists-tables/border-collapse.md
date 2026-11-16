---
id: border-collapse
kind: property
cat: lists-tables
chip: border-collapse
title: دمج حدود الجدول
en: CSS border-collapse property
status: stable
support: all
mdn: border-collapse
summary: border-collapse: collapse بتدمج حدود الخلايا في خط واحد، وseparate بتسيبهم منفصلين بمسافة border-spacing.
keywords: border-collapse, collapse, separate, حدود الجدول, border-spacing
related: border-spacing, table-layout, empty-cells, caption-side
---

## intro

الخاصية `border-collapse` بتتحكم في **علاقة حدود خلايا الجدول ببعضها**. الافتراضي **`separate`**: كل خلية ليها حد مستقل، وبينهم مسافة [[border-spacing]] (فتشوف خطين متجاورين وفراغ بينهم، شكل قديم). و**`collapse`**: الحدود **بتندمج في خط واحد** بين الخلايا، وده الشكل الجدولي المعتاد اللي كلنا عايزينه تقريباً دايماً. فمعظم الجداول بتبدأ بـ `table { border-collapse: collapse; }`.

نقاط مهمة: مع `collapse` **`border-spacing` بيتجاهل**، و`border-radius` على الخلايا مبيشتغلش (استخدم `separate` مع `border-spacing: 0` لو عايز زوايا مدورة). وكمان لما حدين يتقابلوا بنفس المكان المتصفح بيختار الأعرض أو الأقوى. تتحط على `table` فقط. وده بيفرق جداً في شكل الصفحة: جدول بحدود مزدوجة بيبان قديم وتقيل على العين، بينما `collapse` بيدّي شكل نضيف ومنظّم زي الأوراق المطبوعة.

## try

```html
<style>
  table { color:#3d2c18; margin:3px 0; }
  td { border:2px solid #7a4a1d; padding:6px 12px; }
</style>
<table style="border-collapse:separate;border-spacing:4px"><tr><td>separate</td><td>خطين</td></tr></table>
<table style="border-collapse:collapse"><tr><td>collapse</td><td>خط واحد</td></tr></table>
```

## syntax

```css nolive
table { border-collapse: collapse; }
table { border-collapse: separate; border-spacing: 0; }
```

- **القيمة المبدئية**: `separate`.
- على table فقط.
- بتتوارث.

## values

### separate
حدود منفصلة بمسافة (الافتراضي).

### collapse
حدود مدموجة في خط واحد.

### inherit
تتوارث من العنصر الأب.

## use

- `collapse` لجداول البيانات العادية.
- `separate` مع `border-spacing:0` لزوايا مدورة.
- جداول فواتير ونتائج.

## avoid

- توقع `border-radius` على الخلايا مع `collapse`.
- استخدام `border-spacing` مع `collapse`.

## examples

### 1) جدول نضيف
collapse.

```html
<style>
  table { border-collapse:collapse; width:100%; color:#3d2c18; }
  th, td { border:1px solid #bda27a; padding:6px 10px; text-align:center; }
  th { background:#e4c490; }
</style>
<table><tr><th>الاسم</th><th>الدرجة</th></tr><tr><td>أحمد</td><td>90</td></tr><tr><td>منى</td><td>95</td></tr></table>
```



### 2) separate بمسافة
الشكل القديم.

```html
<style>
  table { border-collapse:separate; border-spacing:6px; color:#3d2c18; }
  td { border:2px solid #c9772f; padding:6px 12px; background:#f3e6c9; }
</style>
<table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
```



### 3) زوايا مدورة
separate مع spacing 0.

```html
<style>
  table { border-collapse:separate; border-spacing:0; border:2px solid #7a4a1d; border-radius:10px; overflow:hidden; color:#3d2c18; }
  td, th { padding:6px 14px; border-bottom:1px solid #bda27a; }
  th { background:#e4c490; }
  tr:last-child td { border-bottom:0; }
</style>
<table><tr><th>أ</th><th>ب</th></tr><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
```



### 4) تقاطع حدود
الأعرض بيكسب.

```html
<style>
  table { border-collapse:collapse; color:#3d2c18; }
  td { border:1px solid #bda27a; padding:6px 12px; }
  td.x { border:4px solid #b5551f; }
</style>
<table><tr><td>عادي</td><td class="x">سميك</td></tr><tr><td>عادي</td><td>عادي</td></tr></table>
```



## mistakes

### حدود مزدوجة

```css bad
table, td { border:1px solid #bda27a; }  /* خطين */
```

```css good
table { border-collapse:collapse; }
```

دمج الحدود.

### radius مع collapse

```css bad
table { border-collapse:collapse; border-radius:10px; }  /* مبيبانش */
```

```css good
border-collapse:separate; border-spacing:0
```

مع overflow:hidden.

## quiz

### الشكل الجدولي المعتاد؟
- [x] collapse
- [ ] separate
- [ ] inherit
- [ ] none

خط واحد.

### border-spacing مع collapse؟
- [x] بيتجاهل
- [ ] يشتغل
- [ ] يضاعف
- [ ] يخفي

مبيشتغلش.

### الافتراضي؟
- [x] separate
- [ ] collapse
- [ ] auto
- [ ] none

separate.

## refs

- [MDN: border-collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse)
