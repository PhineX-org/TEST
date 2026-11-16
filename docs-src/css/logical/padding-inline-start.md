---
id: padding-inline-start
kind: property
cat: logical
chip: padding-inline-start
title: حشو بداية السطر
en: CSS padding-inline-start property
status: stable
support: all
size: compact
mdn: padding-inline-start
summary: padding-inline-start حشو عند بداية السطر: يمين في العربي وشمال في الإنجليزي. مثالي لقوائم ومسافة أيقونات.
keywords: padding-inline-start, بداية, حشو, rtl
related: padding-inline-end, padding-inline, padding-left, padding-right
---

## intro

الخاصية `padding-inline-start` بتحط حشو **عند بداية السطر** فقط: يمين في العربي (RTL) وشمال في الإنجليزي (LTR). مثال شهير: القوائم `ul` بتاخد حشو افتراضي من جهة البداية، فلو عايز تغيّره في موقع ثنائي الاتجاه استخدم `ul { padding-inline-start: 24px; }` بدل `padding-left` اللي هتبوظ في العربي. كمان للحقول اللي فيها أيقونة في البداية: `input { padding-inline-start: 36px; }` تفسح مكان الأيقونة. جزء من عائلة [[padding-inline]]. وبكده بتكتب الكود مرة واحدة وتنساه، ومتحتاجش تعمل نسخة منفصلة للعربي وأخرى للإنجليزي.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="padding-inline-start:50px">start حشو 50</div></div>
<div dir="ltr" class="w"><div class="i" style="padding-inline-start:50px">start padding 50</div></div>
```

## syntax

```css nolive
padding-inline-start: 24px;
ul { padding-inline-start: 1.5rem; }
```

- **القيمة المبدئية**: `0`.

## values

### `<length>`
مسافة.

### `<percentage>`
نسبة.

## use

- قوائم.
- حقول بأيقونة.

## avoid

- padding-left لقوائم RTL.

## examples

### 1) قايمة
بداية القايمة.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<ul class="w" style="padding-inline-start:36px;margin:0"><li>أول</li><li>تاني</li></ul>
```



### 2) حقل بأيقونة
مكان للأيقونة.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div style="position:relative;display:inline-block"><span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%)">🔍</span><input placeholder="بحث" style="padding:8px;padding-inline-start:34px;border:2px solid #bda27a;border-radius:8px;background:#f3ede0;color:#3d2c18"></div>
```



### 3) RTL وLTR
بيتقلب.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="padding-inline-start:40px">عربي</div></div><div dir="ltr" class="w"><div class="i" style="padding-inline-start:40px">English</div></div>
```



## mistakes

### left ثابت

```css bad
ul { padding-left:24px; }
```

```css good
ul { padding-inline-start:24px; }
```

يشتغل في RTL.

## quiz

### بتحط حشو؟
- [x] عند بداية السطر
- [ ] عند النهاية
- [ ] فوق
- [ ] تحت

start.

### مثال مفيد؟
- [x] حقل بأيقونة في البداية
- [ ] ترتيب z
- [ ] لون
- [ ] حركة

مكان للأيقونة.

## refs

- [MDN: padding-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start)
