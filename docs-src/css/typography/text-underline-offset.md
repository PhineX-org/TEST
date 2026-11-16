---
id: text-underline-offset
kind: property
cat: typography
chip: text-underline-offset
title: بُعد الخط التحتاني
en: CSS text-underline-offset property
status: stable
support: all
size: compact
mdn: text-underline-offset
summary: text-underline-offset بتتحكم في المسافة بين النص والخط التحتاني. بتخلّي underline أنضف وأقل تلامساً مع الحروف.
keywords: text-underline-offset, underline, خط تحت, مسافة, رابط
related: text-decoration, text-decoration-thickness, line-height, color
---

## intro

الخاصية `text-underline-offset` بتحدد **بُعد الخط التحتاني** (underline) عن النص. الخط الافتراضي بيكون ملاصق للحروف وممكن يقطع **ذيول الحروف** (descenders) فيبقى شكل مزحوم. بإزاحة بسيطة (مثلاً `0.2em`) بتخلّي الخط أنضف وأوضح.

بتتكامل مع [[text-decoration-thickness]] (سُمك الخط) و[[text-decoration]] (اللون والنمط). والوحدة المفضلة `em` عشان تتناسب مع حجم الخط. بتشتغل بس على underline مش overline أو line-through.

## try

```html
<style>
  a { color:#b5551f; font-size:1.4rem; font-weight:bold; text-decoration:underline; text-underline-offset:.3em; }
</style>
<a href="#">رابط بخط مبعّد</a>
```

## syntax

```css nolive
text-underline-offset: auto;
text-underline-offset: 0.2em;
text-underline-offset: 4px;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** أيوه.

## values

### auto
يحدده المتصفح.

### `<length>`
الإزاحة (يفضّل em).

## use

- روابط بخط تحتاني أنيق.
- عناوين مميزة.

## avoid

- إزاحات كبيرة جداً تفصل الخط عن الكلمة.

## examples

### 1) مقارنة
بدون إزاحة وبإزاحة.

```html
<style>
  a { display:block; margin:4px 0; color:#b5551f; font-size:1.3rem; }
</style>
<a href="#" style="text-underline-offset:auto">auto</a><a href="#" style="text-underline-offset:.25em">.25em</a><a href="#" style="text-underline-offset:.5em">.5em</a>
```



### 2) مع سُمك ولون
تنسيق كامل.

```html
<style>
  a { color:#3d2c18; font-size:1.3rem; text-decoration:underline; text-decoration-color:#c9772f; text-decoration-thickness:3px; text-underline-offset:.25em; }
</style>
<a href="#">رابط منسّق</a>
```



### 3) عنوان
خط تحتاني للتمييز.

```html
<style>
  h4 { margin:0; font-size:1.6rem; color:#7a4a1d; text-decoration:underline wavy #c9772f; text-underline-offset:.3em; }
</style>
<h4>عنوان مميز</h4>
```



## mistakes

### خط ملاصق للحروف

```css bad
a { text-decoration:underline; }
```

```css good
a { text-decoration:underline; text-underline-offset:.2em; }
```

يحسّن الوضوح.

## quiz

### text-underline-offset بتحدد؟
- [ ] سُمك الخط
- [x] بُعد الخط عن النص
- [ ] اللون
- [ ] النمط

المسافة.

### الوحدة المفضلة؟
- [ ] px
- [x] em
- [ ] vw
- [ ] deg

em.

## refs

- [MDN: text-underline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset)
