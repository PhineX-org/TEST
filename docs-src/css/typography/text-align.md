---
id: text-align
kind: property
cat: typography
chip: text-align
title: محاذاة النص
en: CSS text-align property
status: stable
support: all
mdn: text-align
summary: text-align بتحدد محاذاة النص أفقياً: start وend وcenter وjustify. في RTL استخدم start وend بدل left وright.
keywords: text-align, محاذاة, center, justify, start, end, right, left, توسيط النص
related: direction, text-indent, display, margin, justify-content
---

## intro

الخاصية `text-align` بتحدد **محاذاة النص الأفقية** داخل الصندوق. وهي بتأثر على **المحتوى الـ inline** (نص، صور inline، أزرار inline) جوه صندوق block، مش على الصندوق نفسه.

القيم: **`start`** (بداية السطر) و**`end`** (نهاية السطر) و**`center`** (وسط) و**`justify`** (ضبط الطرفين) و`left` و`right`.

**نقطة مهمة جداً للعربي**: الصفحة RTL (من اليمين لليسار). في RTL بداية السطر هي **اليمين**، فـ `start` = يمين و`end` = شمال. ولو كتبت `left` و`right` بشكل صريح بتكسر الاتجاه لو غيّرت اللغة. **فاستخدم `start` و`end`** عشان الكود يشتغل صح في العربي والإنجليزي مع بعض.

`justify` بتوزّع الكلمات عشان الطرفين يتساووا، ممتازة للفقرات الطويلة، لكنها ممكن تعمل فراغات واسعة في السطور الضيقة. ولتوسيط **صندوق** نفسه استخدم `margin: auto` أو flex، مش text-align.

## try

```html
<style>
  p { margin:3px 0; color:#3d2c18; background:#efe0bd; padding:6px 10px; }
</style>
<p style="text-align:start">start (يمين في العربي)</p>
<p style="text-align:center">center</p>
<p style="text-align:end">end (شمال في العربي)</p>
<p style="text-align:justify">justify: فقرة طويلة بتتوزع كلماتها عشان الطرفين يتساووا وتدي شكل مرتب للصفحة كلها.</p>
```

## syntax

```css nolive
text-align: start;
text-align: end;
text-align: center;
text-align: justify;
text-align: left;
```

- **القيمة المبدئية**: `start`.
- **بتتوارث؟** أيوه.
- بتأثر على المحتوى inline.

## values

### start / end
بداية/نهاية السطر (تتبع الاتجاه).

### center
وسط.

### justify
ضبط الطرفين.

### left / right
يسار/يمين ثابتين.

## use

- توسيط عنوان أو زرار.
- ضبط فقرات طويلة justify.
- أرقام الجداول محاذاة end.

## avoid

- left/right في موقع بيدعم RTL و LTR.
- justify لسطور ضيقة (فراغات واسعة).

## examples

### 1) كل القيم
أربع محاذاات.

```html
<style>
  p { margin:3px 0; color:#3d2c18; background:#efe0bd; padding:5px 10px; }
</style>
<p style="text-align:start">start</p><p style="text-align:center">center</p><p style="text-align:end">end</p><p style="text-align:justify">justify لفقرة طويلة شوية عشان نشوف التوزيع بين الطرفين.</p>
```



### 2) توسيط زرار
المحتوى inline بيتوسّط.

```html
<style>
  .w { text-align:center; background:#efe0bd; padding:10px; }
  button { background:#c9772f; color:#f3ede0; border:0; padding:8px 18px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><button>زرار متوسّط</button></div>
```



### 3) start مقابل left
في RTL بيختلفوا.

```html
<style>
  p { margin:3px 0; color:#3d2c18; background:#efe0bd; padding:5px 10px; }
</style>
<p style="text-align:start">start → يمين</p><p style="text-align:left">left → شمال دايماً</p>
```



### 4) أرقام جدول
الأرقام على نهاية الخلية.

```html
<style>
  table { border-collapse:collapse; width:100%; color:#3d2c18; }
  td { border:1px solid #bda27a; padding:4px 8px; } td:last-child { text-align:end; }
</style>
<table><tr><td>كتاب</td><td>120</td></tr><tr><td>قلم</td><td>8</td></tr></table>
```



## mistakes

### left/right في موقع RTL

```css bad
p { text-align:right; }
```

```css good
p { text-align:start; }
```

start بتتبع اتجاه الصفحة.

### توسيط صندوق بـ text-align

```css bad
.box { width:200px; text-align:center; }  /* الصندوق مش اتوسّط */
```

```css good
.box { width:200px; margin-inline:auto; }
```

للصندوق margin auto.

## quiz

### start في RTL معناها؟
- [x] يمين
- [ ] شمال
- [ ] وسط
- [ ] ضبط

بداية السطر = يمين.

### text-align بتأثر على؟
- [x] المحتوى inline داخل الصندوق
- [ ] الصندوق نفسه
- [ ] الخلفية
- [ ] الحجم

inline content.

### لتوسيط صندوق نفسه؟
- [ ] text-align:center
- [x] margin-inline:auto
- [ ] float
- [ ] z-index

margin auto.

## refs

- [MDN: text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
