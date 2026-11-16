---
id: filter
kind: property
cat: colors-effects
chip: filter
title: فلاتر الصور والعناصر
en: CSS filter property
status: stable
support: all
mdn: filter
summary: filter بتطبّق تأثيرات بصرية على العنصر: blur وbrightness وcontrast وgrayscale وsepia وdrop-shadow وhue-rotate، وممكن تجمّعها.
keywords: filter, blur, brightness, contrast, grayscale, sepia, drop-shadow, hue-rotate, فلتر, تأثير
related: backdrop-filter, fn-blur, fn-drop-shadow, fn-brightness, opacity, mix-blend-mode
---

## intro

الخاصية `filter` بتطبّق **تأثيرات بصرية** على العنصر (صورة أو أي عنصر كامل بنصه وأولاده) زي فلاتر Instagram. بتكتب دالة أو أكتر مفصولين بمسافة: `filter: grayscale(80%) contrast(1.1) blur(2px)`.

الدوال: [[fn-blur]] (تمويه)، [[fn-brightness]] (سطوع)، [[fn-contrast]] (تباين)، [[fn-grayscale]] (رمادي)، [[fn-sepia]] (لون قديم دافئ)، [[fn-saturate]] (تشبّع)، [[fn-hue-rotate]] (لف درجات اللون)، [[fn-invert]] (عكس)، [[fn-drop-shadow]] (ظل يتبع شكل الصورة الشفافة)، وكمان `opacity()` و`url()`.

الفرق بين `drop-shadow()` و[[box-shadow]]: الأولى بتتبع **شكل المحتوى الفعلي** (حتى لو شفاف)، والتانية بتظل الصندوق المستطيل. ولتمويه **اللي ورا العنصر** استخدم [[backdrop-filter]]. والفلاتر تقيلة نوعاً ما، وبتعمل stacking context.

> [!tip] الفلاتر ممتازة لتخفيف الصور لنمط «ثيم» دافئ: `sepia(.2) saturate(.9) brightness(.95)`.

## try

```html
<style>
  .i { width:140px; height:70px; background:linear-gradient(135deg,#c9772f,#3d7a5a); border-radius:10px; filter:grayscale(80%) blur(1px); }
</style>
<div class="i"></div>
```

## syntax

```css nolive
filter: blur(4px);
filter: grayscale(100%);
filter: sepia(.4) saturate(.9);
filter: brightness(1.1) contrast(.9);
filter: drop-shadow(0 4px 6px rgba(0,0,0,.3));
filter: none;
```

- **القيمة المبدئية**: `none`.
- **بتتحرك؟** أيوه.
- دوال مفصولة بمسافة.

## values

### blur()
تمويه بالبكسل.

### brightness() / contrast()
سطوع وتباين.

### grayscale() / sepia()
رمادي ولون قديم.

### saturate() / hue-rotate()
تشبّع ولف الدرجات.

### drop-shadow()
ظل بيتبع شكل المحتوى.

## use

- تحويل صور لأبيض/أسود عند hover.
- تمويه خلفية/عنصر.
- ظل لأيقونات PNG/SVG شفافة.
- تلطيف ألوان صور لثيم دافئ.

## avoid

- فلاتر تقيلة على عناصر كبيرة متحركة (أداء).
- blur على نص مهم.

## examples

### 1) كل الفلاتر
نفس الشكل بفلاتر مختلفة.

```html
<style>
  .i { display:inline-block; width:60px; height:44px; margin:3px; background:linear-gradient(135deg,#c9772f,#3d7a5a); border-radius:8px; }
</style>
<div class="i" style="filter:blur(3px)"></div><div class="i" style="filter:grayscale(1)"></div>
<div class="i" style="filter:sepia(1)"></div><div class="i" style="filter:hue-rotate(90deg)"></div><div class="i" style="filter:brightness(1.4)"></div>
```



### 2) hover يرجّع اللون
رمادي ثم ملوّن.

```html
<style>
  .i { width:140px; height:70px; background:linear-gradient(135deg,#c9772f,#3d7a5a); border-radius:10px; filter:grayscale(1); transition:filter .4s; }
  .i:hover { filter:grayscale(0); }
</style>
<div class="i"></div>
```



### 3) drop-shadow يتبع الشكل
الظل بيتبع المثلث مش المستطيل.

```html
<style>
  .t { width:0; height:0; border-left:30px solid transparent; border-right:30px solid transparent; border-bottom:50px solid #7a4a1d; filter:drop-shadow(0 6px 4px rgba(60,40,20,.4)); margin:10px; }
</style>
<div class="t"></div>
```



### 4) مجموعة فلاتر دافئة
تلطيف الألوان.

```html
<style>
  .i { width:140px; height:60px; background:linear-gradient(135deg,#d96a2b,#2f9a6a); border-radius:10px; filter:sepia(.25) saturate(.85) brightness(.95); }
</style>
<div class="i"></div>
```



## mistakes

### blur على نص مهم

```css bad
.t { filter:blur(3px); }
```

```css good
.bg { filter:blur(3px); }  /* على الخلفية فقط */
```

التمويه بيصعّب القراءة.

### box-shadow على صورة شفافة

```css bad
img { box-shadow:0 4px 8px #000; }  /* ظل مستطيل */
```

```css good
img { filter:drop-shadow(0 4px 8px rgba(0,0,0,.3)); }
```

drop-shadow بيتبع شكل الصورة.

## quiz

### filter:none؟
- [x] افتراضي
- [ ] خطأ
- [ ] فلتر قوي
- [ ] يخفي

القيمة المبدئية.

### الفرق بين drop-shadow وbox-shadow؟
- [ ] مفيش
- [x] drop-shadow بيتبع شكل المحتوى
- [ ] box-shadow أسرع
- [ ] للنص فقط

شكل المحتوى الفعلي.

### لتمويه اللي وراء العنصر؟
- [ ] filter
- [x] backdrop-filter
- [ ] opacity
- [ ] blur-image

backdrop-filter.

## refs

- [MDN: filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
