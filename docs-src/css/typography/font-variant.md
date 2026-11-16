---
id: font-variant
kind: property
cat: typography
chip: font-variant
title: متغيّرات الخط
en: CSS font-variant property
status: stable
support: all
size: compact
mdn: font-variant
summary: font-variant بتفعّل نسخ بديلة للحروف زي small-caps (حروف كبيرة صغيرة) وأرقام عمودية أو جدولية.
keywords: font-variant, small-caps, tabular-nums, ligatures, أرقام
related: font, text-transform, font-weight, letter-spacing
---

## intro

الخاصية `font-variant` بتفعّل **ميزات خاصة في الخط** (OpenType). أشهر قيمة: **`small-caps`** اللي بتحوّل الحروف الإنجليزية الصغيرة لحروف كبيرة بحجم صغير. وفيه شكل مفصّل زي `font-variant-numeric: tabular-nums` اللي بتخلّي **الأرقام بنفس العرض** (مهمة في الجداول والأسعار عشان تتراص تحت بعضها)، و`font-variant-ligatures` للربط بين الحروف.

لو مفهمتش الكلام ده متقلقش، أهم حاجة تعرفها: `font-variant-numeric: tabular-nums` مفيدة جداً للأرقام في الجداول. وبتتوارث. للعربي الاستخدام محدود، لكن الأرقام الجدولية ينفعوا مع أي لغة.

## try

```html
<style>
  p { margin:3px 0; font-size:1.3rem; color:#3d2c18; }
</style>
<p style="font-variant:small-caps">Hello World small caps</p>
<p>Normal: Hello World</p>
```

## syntax

```css nolive
font-variant: normal;
font-variant: small-caps;
font-variant-numeric: tabular-nums;
font-variant-ligatures: none;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
بدون ميزات.

### small-caps
حروف كبيرة صغيرة الحجم.

### tabular-nums
أرقام بعرض ثابت.

## use

- أرقام جداول وأسعار.
- عناوين إنجليزية بأسلوب أنيق.

## avoid

- small-caps على نص عربي (مفيش تأثير).

## examples

### 1) small-caps
الحروف الصغيرة بشكل كبير مصغّر.

```html
<style>
  p { font-size:1.3rem; color:#3d2c18; margin:3px 0; }
</style>
<p style="font-variant:small-caps">PhineX Academy</p>
```



### 2) أرقام جدولية
الأرقام بتتراص تحت بعض.

```html
<style>
  .t { font-size:1.3rem; color:#3d2c18; text-align:left; direction:ltr; width:90px; }
  .tab { font-variant-numeric:tabular-nums; }
</style>
<div class="t">1111<br>8888</div><div class="t tab">1111<br>8888</div>
```



### 3) ligatures
تعطيل الربط.

```html
<style>
  p { font-size:1.4rem; color:#3d2c18; margin:3px 0; font-family:Georgia,serif; }
</style>
<p>office fi fl</p><p style="font-variant-ligatures:none">office fi fl</p>
```



## mistakes

### أرقام متفاوتة العرض في جدول

```css bad
td { }  /* الأرقام مش متراصة */
```

```css good
td { font-variant-numeric:tabular-nums; }
```

أرقام ثابتة العرض.

## quiz

### small-caps بتعمل؟
- [ ] تكبّر الخط
- [x] حروف كبيرة بحجم صغير
- [ ] تشيل الحروف
- [ ] تغيّر اللون

حروف كبيرة مصغّرة.

### tabular-nums مفيدة في؟
- [x] الجداول والأسعار
- [ ] النصوص الطويلة
- [ ] الألوان
- [ ] الحدود

أرقام متراصة.

## refs

- [MDN: font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant)
