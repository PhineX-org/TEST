---
id: font-size
kind: property
cat: typography
chip: font-size
title: حجم الخط
en: CSS font-size property
status: stable
support: all
mdn: font-size
summary: font-size بتحدد حجم الخط. استخدم rem وem بدل px عشان تحترم إعدادات المستخدم. القيمة 1rem = 16px عادةً.
keywords: font-size, حجم الخط, px, rem, em, clamp, fluid typography, تكبير
related: font-family, line-height, dt-length, fn-clamp, font
---

## intro

الخاصية `font-size` بتحدد **حجم الخط**. وأهم قرار فيها هو **الوحدة**:

- **`px`**: حجم ثابت بالبكسل. بسيط، لكن **ممكن مايحترمش** إعدادات تكبير الخط عند المستخدم.
- **`rem`**: نسبة من حجم خط **الجذر** (`<html>`، افتراضياً 16px). `1.25rem` = 20px. **الأفضل غالباً** لأنها ثابتة التوقع وبتحترم إعدادات المستخدم.
- **`em`**: نسبة من حجم خط **الأب**. بتتراكم لو اتداخلت (`1.2em` داخل `1.2em` = 1.44)، فاستخدمها بحذر.
- **`%`**: نسبة من خط الأب (زي em).
- **كلمات**: `small` و`medium` و`large` و`x-large`.
- **`vw` و`clamp()`**: لـ **الخط المتجاوب** ([[fn-clamp]]): `clamp(1rem, 2vw + .5rem, 1.5rem)`.

نصائح للقراءة المريحة (خصوصاً للعربي): خلّي النص الأساسي **16px (1rem) كحد أدنى**، ومتنزلش تحت 14px لنص مهم. وده بالظبط اللي بيعمله زرار A+ / A− في الموقع ده: بيغيّر حجم الخط الأساسي والباقي بـ `rem` يتبعه.

> [!tip] اضبط حجم الجذر مرة، واكتب الباقي بـ `rem`: التكبير والتصغير هيشتغلوا على الموقع كله بسلاسة.

## try

```html
<style>
  p { margin:2px 0; color:#3d2c18; }
</style>
<p style="font-size:.9rem">صغير 0.9rem</p>
<p style="font-size:1rem">عادي 1rem</p>
<p style="font-size:1.5rem">كبير 1.5rem</p>
<p style="font-size:2rem">أكبر 2rem</p>
```

## syntax

```css nolive
font-size: 16px;
font-size: 1.25rem;
font-size: 120%;
font-size: larger;
font-size: clamp(1rem, 2vw + .5rem, 1.5rem);
```

- **القيمة المبدئية**: `medium` (16px عادةً).
- **بتتوارث؟** أيوه.
- **بتتحرك؟** أيوه.

## values

### `<length>`
px وrem وem.

### `<percentage>`
نسبة من خط الأب.

### small .. xx-large
كلمات جاهزة.

### larger / smaller
أكبر/أصغر من الأب خطوة.

## use

- rem لضبط الأحجام.
- clamp للخط المتجاوب.
- أحجام عناوين متدرجة.

## avoid

- px لكل الأحجام (يتجاهل تفضيلات المستخدم).
- نص أساسي أقل من 14px.

## examples

### 1) px مقابل rem
الاتنين متساويين افتراضياً.

```html
<style>
  p { margin:3px 0; color:#3d2c18; }
</style>
<p style="font-size:20px">20px</p>
<p style="font-size:1.25rem">1.25rem (= 20px)</p>
```



### 2) em بتتراكم
كل مستوى بيكبّر عن اللي قبله.

```html
<style>
  div { font-size:1.4em; color:#3d2c18; }
</style>
<div>أب<div>ابن<div>حفيد</div></div></div>
```



### 3) خط متجاوب
clamp بين حد أدنى وأقصى.

```html
<style>
  h3 { font-size:clamp(1.1rem, 4vw, 2rem); color:#7a4a1d; margin:0; }
</style>
<h3>غيّر عرض النافذة وشوف الحجم</h3>
```



### 4) مقياس عناوين
تدرج منطقي بين المستويات.

```html
<style>
  .h1 { font-size:2rem; } .h2 { font-size:1.5rem; } .h3 { font-size:1.25rem; } .p { font-size:1rem; }
  div { color:#3d2c18; font-weight:bold; }
</style>
<div class="h1">عنوان 1</div><div class="h2">عنوان 2</div><div class="h3">عنوان 3</div><div class="p">فقرة</div>
```



## mistakes

### em متراكمة

```css bad
.a { font-size:1.2em; }  /* داخل .a تانية بيكبر أكتر */
```

```css good
.a { font-size:1.2rem; }
```

rem مش بتتراكم.

### نص صغير جداً

```css bad
p { font-size:11px; }
```

```css good
p { font-size:1rem; }
```

القراءة بتتعب، خصوصاً العربي.

## quiz

### 1rem = ؟
- [ ] حجم خط الأب
- [x] حجم خط الجذر (غالباً 16px)
- [ ] 10px
- [ ] عرض النافذة

نسبة من html.

### الوحدة اللي بتتراكم؟
- [ ] rem
- [x] em
- [ ] px
- [ ] vw

em نسبة من الأب.

### للخط المتجاوب؟
- [x] clamp()
- [ ] float
- [ ] z-index
- [ ] order

min/preferred/max.

## refs

- [MDN: font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
