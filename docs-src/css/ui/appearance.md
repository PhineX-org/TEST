---
id: appearance
kind: property
cat: ui
chip: appearance
title: مظهر عناصر النماذج الأصلي
en: CSS appearance property
status: stable
support: all
size: compact
mdn: appearance
summary: appearance:none بتشيل الشكل الأصلي لعناصر النماذج (select وcheckbox وbutton) عشان تصممها بنفسك.
keywords: appearance, none, select, checkbox, radio, تصميم مخصص
related: accent-color, checked, border-radius, background-image
---

## intro

الخاصية `appearance` بتتحكم في **المظهر الأصلي (native)** اللي المتصفح بيرسمه لعناصر النماذج: `select` وحقول `checkbox` و`radio` و`button` و`input[type=search]`. القيمة **`none`** بتشيل المظهر ده، فتقدر تصمم العنصر من الصفر بـ CSS (حد وخلفية وسهم مخصص). و`auto` (الافتراضي) بيرجع للمظهر الأصلي.

أشهر استخدام: **تخصيص `select`** (شيل السهم الأصلي وحط سهم خلفية بتاعك) وتصميم **checkbox/radio** مخصصين مع [[checked]]. دعم قديم بيحتاج `-webkit-appearance` و`-moz-appearance`.

نصيحة: لو كل اللي عايزه هو **تغيير لون** العناصر الأصلية استخدم [[accent-color]] وماتشيلش الشكل. فقدان المظهر الأصلي معناه إنك مسؤول عن **الوصولية** (تركيز، حالات، تباين).

## try

```html
<style>
  select { appearance:none; -webkit-appearance:none; padding:8px 30px 8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path d='M1 1l5 5 5-5' fill='none' stroke='%237a4a1d' stroke-width='2'/></svg>") no-repeat left 10px center; color:#3d2c18; font-size:1rem; }
</style>
<select><option>خيار 1</option><option>خيار 2</option></select>
```

## syntax

```css nolive
select { appearance: none; }
input[type=checkbox] { appearance: none; }
-webkit-appearance: none;
```

- **القيمة المبدئية**: `auto`.
- ضيف prefix للقديم.

## values

### none
يشيل المظهر الأصلي.

### auto
المظهر الأصلي.

## use

- تخصيص select.
- checkbox مخصص.
- شيل ستايل iOS للأزرار.

## avoid

- إزالة المظهر بدون الاهتمام بالوصولية.
- استخدامه لمجرد تغيير اللون (accent-color).

## examples

### 1) select مخصص
بسهم خاص.

```html
<style>
  select { appearance:none; -webkit-appearance:none; padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<select><option>خيار 1</option><option>خيار 2</option></select>
```



### 2) checkbox مخصص
مربع من CSS.

```html
<style>
  input { appearance:none; -webkit-appearance:none; width:22px; height:22px; border:2px solid #7a4a1d; border-radius:5px; background:#f3ede0; cursor:pointer; vertical-align:middle; }
  input:checked { background:#c9772f; box-shadow:inset 0 0 0 3px #f3ede0; }
</style>
<input type="checkbox" checked> <input type="checkbox">
```



### 3) البديل البسيط
accent-color بدل appearance.

```html
<style>
  input { accent-color:#c9772f; width:20px; height:20px; }
</style>
<input type="checkbox" checked> <input type="radio" checked>
```



## mistakes

### نسيان الحالات

```css bad
input { appearance:none; }  /* مفيش شكل للتحديد */
```

```css good
input:checked { background:#c9772f; }
```

لازم تصمم الحالات.

## quiz

### appearance:none بتعمل؟
- [x] تشيل المظهر الأصلي
- [ ] تخفي العنصر
- [ ] تعطّله
- [ ] تكبّره

تصميم من الصفر.

### بديل لتغيير اللون فقط؟
- [x] accent-color
- [ ] color
- [ ] background
- [ ] filter

أبسط.

## refs

- [MDN: appearance](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
