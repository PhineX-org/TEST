---
id: border-color
kind: property
cat: borders-bg
chip: border-color
title: لون الحد
en: CSS border-color property
status: stable
support: all
size: compact
mdn: border-color
summary: border-color بتحدد لون الحد، وتقبل 1-4 قيم للجهات. الافتراضي currentcolor (لون النص).
keywords: border-color, لون الحد, currentcolor, transparent, border
related: border, border-width, border-style, color
---

## intro

الخاصية `border-color` بتحدد **لون الحد**، بأي صيغة لون (hex أو rgb أو hsl أو اسم أو `transparent`). والافتراضي `currentcolor` يعني لون النص، علشان كده الحد من غير لون صريح بياخد لون الكلام. وزي `margin` تقدر تكتب 1-4 قيم: `border-color: red blue` (رأسي أحمر وأفقي أزرق). `transparent` مفيدة لحد غير ظاهر بيحافظ على المساحة. من غير [[border-style]] مفيش حد يتلوّن. تختصر في [[border]]. وللألوان بشكل عام اقرأ [[colors-guide]].

## try

```html
<style>
  .b { border:5px solid; border-color:#c9772f #3d7a5a; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">لونين: رأسي وأفقي</div>
```

## syntax

```css nolive
border-color: #7a4a1d;
border-color: red blue;
border-color: transparent;
border-color: currentColor;
```

- **القيمة المبدئية**: `currentcolor`.
- 1-4 قيم.

## values

### `<color>`
أي لون.

### transparent
شفاف مع بقاء المساحة.

### currentcolor
لون النص (الافتراضي).

## use

- ألوان مختلفة لجهات الحد.
- حد شفاف يحجز مساحة (لـ hover بدون قفز).
- حد بلون النص تلقائي.

## avoid

- الاعتماد على لون الحد وحده للتعبير عن خطأ.

## examples

### 1) لون لكل جهة
1-4 قيم.

```html
<style>
  .b { border:6px solid; border-color:#a63b2f #3d7a5a #4c78a3 #c9772f; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">4 ألوان</div>
```



### 2) transparent لمنع القفز
الحد الشفاف بيحجز المساحة لحد ما hover.

```html
<style>
  .b { border:3px solid transparent; padding:8px; background:#efe0bd; color:#3d2c18; display:inline-block; }
  .b:hover { border-color:#c9772f; }
</style>
<div class="b">مرّر عليّ</div>
```



### 3) currentColor
لون الحد تبع لون النص.

```html
<style>
  .b { border:3px solid; padding:8px; display:inline-block; margin:4px; }
</style>
<div class="b" style="color:#3d7a5a">أخضر</div><div class="b" style="color:#7a4a1d">بني</div>
```



## mistakes

### نسيان النوع

```css bad
.a { border-color:red; }
```

```css good
.a { border:2px solid red; }
```

لازم style علشان الحد يتعرض.

## quiz

### الافتراضي؟
- [ ] black
- [x] currentcolor
- [ ] transparent
- [ ] white

لون النص.

### transparent مفيد في؟
- [ ] إخفاء العنصر
- [x] حد غير مرئي يحجز المساحة
- [ ] تلوين
- [ ] ظل

يمنع قفز التخطيط.

## refs

- [MDN: border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color)
