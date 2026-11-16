---
id: mask-image
kind: property
cat: colors-effects
chip: mask-image
title: قناع الصورة والتدرج
en: CSS mask-image property
status: stable
support: all
size: compact
mdn: mask-image
summary: mask-image بتستخدم صورة أو تدرج كقناع: المناطق المعتمة تظهر والشفافة تختفي. أساس تلاشي الحواف.
keywords: mask-image, mask, قناع, fade, gradient mask, تلاشي الحواف
related: clip-path, background-image, opacity, fn-linear-gradient
---

## intro

الخاصية `mask-image` بتحط **قناع** على العنصر: المناطق **المعتمة** في القناع بتخلّي العنصر **ظاهر**، والمناطق **الشفافة** بتخفيه (وفي النص نص شفافية). تقدر تستخدم **تدرج** ([[fn-linear-gradient]]) أو صورة PNG/SVG كقناع. الاستخدام الأشهر: **تلاشي حواف** عنصر قابل للسكرول (`mask-image: linear-gradient(black, transparent)`).

الفرق عن [[clip-path]]: القص حاد بشكل هندسي، أما القناع فبيدعم **تدرج وشفافية ناعمة**. للتوافق ضيف `-webkit-mask-image`.

## try

```html
<style>
  .t { padding:16px; background:#7a4a1d; color:#f3ede0; border-radius:8px; -webkit-mask-image:linear-gradient(90deg,#000 50%,transparent); mask-image:linear-gradient(90deg,#000 50%,transparent); }
</style>
<div class="t">نص بيتلاشى لناحية اليمين</div>
```

## syntax

```css nolive
mask-image: linear-gradient(black, transparent);
mask-image: radial-gradient(circle, black 60%, transparent 61%);
mask-image: url(mask.svg);
mask-image: none;
```

- **القيمة المبدئية**: `none`.
- ضيف `-webkit-mask-image`.

## values

### `<image>`
تدرج أو صورة قناع.

### none
بدون قناع.

## use

- تلاشي حواف قائمة قابلة للسكرول.
- أشكال ناعمة.
- أيقونات SVG ملونة بلون الخلفية.

## avoid

- نسيان prefix -webkit.
- قناع ثقيل على عناصر متحركة.

## examples

### 1) تلاشي الأسفل
النص بيختفي تدريجياً.

```html
<style>
  .t { height:70px; overflow:hidden; padding:8px; background:#efe0bd; color:#3d2c18; -webkit-mask-image:linear-gradient(#000 50%,transparent); mask-image:linear-gradient(#000 50%,transparent); }
</style>
<div class="t">سطر 1<br>سطر 2<br>سطر 3<br>سطر 4<br>سطر 5</div>
```



### 2) قناع دائري
الظهور في الدائرة.

```html
<style>
  .i { width:110px; height:90px; background:linear-gradient(135deg,#c9772f,#3d7a5a); -webkit-mask-image:radial-gradient(circle,#000 45%,transparent 46%); mask-image:radial-gradient(circle,#000 45%,transparent 46%); }
</style>
<div class="i"></div>
```



### 3) تدرج ناعم
حواف ناعمة.

```html
<style>
  .i { width:140px; height:80px; background:#3d7a5a; -webkit-mask-image:radial-gradient(#000 40%,transparent 70%); mask-image:radial-gradient(#000 40%,transparent 70%); }
</style>
<div class="i"></div>
```



## mistakes

### نسيان -webkit-

```css bad
.a { mask-image:linear-gradient(...); }
```

```css good
.a { -webkit-mask-image:linear-gradient(...); mask-image:linear-gradient(...); }
```

بعض المتصفحات محتاجة prefix.

## quiz

### المنطقة المعتمة في القناع؟
- [ ] تخفي
- [x] تظهر
- [ ] تلوّن
- [ ] تكبّر

تظهر.

### الفرق عن clip-path؟
- [ ] مفيش
- [x] القناع بيدعم شفافية ناعمة
- [ ] clip أنعم
- [ ] القناع للنص فقط

ناعمة بتدرج.

## refs

- [MDN: mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
