---
id: picture
kind: element
cat: media
tag: picture
title: عنصر الصورة المتجاوبة
en: HTML picture element
status: stable
display: inline
void: no
support: all
summary: حاوية بتخلّي المتصفح يختار أنسب صورة حسب عرض الشاشة أو صيغة الملف المدعومة، عن طريق عناصر source وتنتهي بعنصر img احتياطي إجباري.
keywords: picture, صورة متجاوبة, art direction, source, srcset, media, type, webp, avif, responsive images, صيغة, موبايل
related: img, source, figure, video
---

## intro

عنصر `<img>` لوحده ممكن يختار بين نسخ بنفس الصورة بمقاسات مختلفة (`srcset`). لكن لو احتجت أكتر من كده، زي: «على الموبايل اعرض صورة مقصوصة على الوش، وعلى اللابتوب اعرض صورة عريضة»، أو «لو المتصفح بيدعم AVIF هات AVIF، ولو لأ هات WebP، ولو لأ هات JPG»، هنا بيدخل `<picture>`.

`<picture>` **مش بيعرض حاجة بنفسه**: هو **حاوية** (Wrapper) بتلفّ **عنصر `<img>` واحد** (إجباري، وهو اللي بيظهر فعلاً) وقبله **صفر أو أكتر من عناصر [[source]]**. المتصفح بيقرا الـ `<source>` واحد واحد من فوق لتحت، وأول واحد شروطه تنطبق (حجم الشاشة في `media`، أو الصيغة المدعومة في `type`) بياخد منه الصورة. لو ولا واحد نفع، بيرجع لـ `<img>` ويحمّل منه.

استخدامين رئيسيين: **Art Direction** (تصميم مختلف حسب الشاشة، مثلاً بانر عريض للكمبيوتر وصورة قريبة للموبايل) و**Format Switching** (تقديم صيغة حديثة وصغيرة لمن يدعمها، واحتياطي لمن لأ). أما لو كل اللي محتاجه نفس الصورة بمقاسات مختلفة فـ `<img srcset sizes>` كفاية ومش محتاج `<picture>`.

وكل الستايل والـ `alt` والأبعاد بتتحط على الـ `<img>` اللي جوه، مش على `<picture>` نفسه (لأنه عبارة عن حاوية inline مالهاش شكل خاص).

> [!analogy] `<picture>` زي **سواق تاكسي عنده عدة خرايط**: يبص على الشاشة (media) وعلى اللي المتصفح يفهمه (type)، ويمشي بأول خريطة تنفع. ولو ولا خريطة نفعت، يمشي بالطريق المعروف (الـ `<img>` الاحتياطي).

> [!key] `<picture>` = `<source>` × عدد + `<img>` واحد في الآخر (إجباري). الأول الي ينطبق بيكسب، والـ `<img>` هو اللي بيتعرض.

## try

صغّر أو كبّر عرض الإطار (الـ preview) وشوف الصورة بتتغير.

```html
<picture>
  <source media="(min-width: 500px)"
    srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='140'%3E%3Crect width='480' height='140' fill='%2386efac'/%3E%3Ctext x='240' y='82' font-size='30' text-anchor='middle'%3EBig screen%3C/text%3E%3C/svg%3E">
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='140'%3E%3Crect width='240' height='140' fill='%2393c5fd'/%3E%3Ctext x='120' y='82' font-size='26' text-anchor='middle'%3ESmall screen%3C/text%3E%3C/svg%3E"
    alt="صورة بتتغير مع حجم الشاشة" style="max-width:100%">
</picture>
```

## syntax

```html nolive
<picture>
  <source media="(min-width: 800px)" srcset="wide.jpg">
  <source type="image/avif" srcset="a.avif">
  <source type="image/webp" srcset="a.webp">
  <img src="a.jpg" alt="الوصف" width="600" height="400">
</picture>
```

- `<picture>` — **الحاوية**.
- `<source>` — **صفر أو أكتر**، بتتقري بالترتيب. كل واحد بياخد `srcset` وشرط (`media` أو `type`).
- `<img>` — **إجباري وفي الآخر**: بياخد `alt` و`src` الاحتياطي.
- `</picture>` — **الوسم الختامي** إجباري.

## use

- لتقديم صورة **مختلفة التصميم** للموبايل واللابتوب (Art Direction).
- لتقديم صيغة حديثة (AVIF/WebP) مع احتياطي JPG.
- لتقديم صورة داكنة للـ Dark Mode بـ `media="(prefers-color-scheme: dark)"`.
- لتقديم صورة بدقة عالية لشاشات الريتينا مع اختيارات تانية.

## avoid

- متستخدمهوش لو كل اللي عايزه نفس الصورة بمقاسات مختلفة: `<img srcset sizes>` كفاية.
- متنساش `<img>` جواه: من غيره مفيش حاجة هتظهر.
- متحطش `<source>` بعد `<img>`: المتصفح هيتجاهله.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]). كل التحكم بيحصل في عناصر [[source]] اللي جواه والـ [[img]] اللي في الآخر.

### class
بتتحط للتنسيق، لكن أغلب الستايل الأحسن يتحط على `<img>`.

## examples

### 1) تغيير الصورة حسب حجم الشاشة
Art Direction.

```html
<picture>
  <source media="(min-width: 480px)"
    srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='440' height='120'%3E%3Crect width='440' height='120' fill='%23fcd34d'/%3E%3Ccircle cx='60' cy='60' r='34' fill='%23f97316'/%3E%3Ctext x='260' y='70' font-size='26' text-anchor='middle'%3EWide banner%3C/text%3E%3C/svg%3E">
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23fcd34d'/%3E%3Ccircle cx='100' cy='80' r='50' fill='%23f97316'/%3E%3Ctext x='100' y='170' font-size='20' text-anchor='middle'%3ESquare crop%3C/text%3E%3C/svg%3E"
    alt="بانر عريض على الشاشات الكبيرة ومربع مقصوص على الصغيرة"
    style="max-width:100%; height:auto">
</picture>
```

- لو عرض الشاشة 480 بكسل أو أكتر، المتصفح بياخد الـ `<source>` (البانر العريض).
- لو أقل، بيرجع لـ `<img>` ويعرض النسخة المربعة المقصوصة.
- ده الفرق عن `srcset` العادي: هنا **التصميم نفسه** بيتغير مش الحجم بس.
- الشرط في `media` هو نفس صيغة Media Query في CSS.

### 2) صيغ حديثة مع احتياطي
`type` للـ format switching.

```html nolive
<picture>
  <source type="image/avif" srcset="photo.avif">
  <source type="image/webp" srcset="photo.webp">
  <img src="photo.jpg" alt="منظر طبيعي" width="800" height="500">
</picture>
```

- المتصفح بيبص على `type` ولو **بيفهم** الصيغة بياخد الملف، ولو لأ بيتخطّى.
- AVIF أصغر حجم، بعده WebP، وJPG الأوسع دعم.
- الترتيب مهم: الأحدث الأول، والأقدم في الآخر.
- المتصفح مش بيحمّل الملفات اللي مش هيستخدمها.

### 3) صورة للـ Dark Mode
حسب تفضيل النظام.

```html
<picture>
  <source media="(prefers-color-scheme: dark)"
    srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='100'%3E%3Crect width='220' height='100' fill='%23111827'/%3E%3Ctext x='110' y='58' font-size='22' text-anchor='middle' fill='%23f9fafb'%3EDark logo%3C/text%3E%3C/svg%3E">
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='100'%3E%3Crect width='220' height='100' fill='%23f9fafb' stroke='%23d1d5db'/%3E%3Ctext x='110' y='58' font-size='22' text-anchor='middle' fill='%23111827'%3ELight logo%3C/text%3E%3C/svg%3E"
    alt="لوجو الموقع">
</picture>
```

- لو نظام المستخدم على الوضع الداكن، بتظهر نسخة اللوجو الفاتحة على خلفية داكنة، والعكس.
- ده بيخلّي اللوجو واضح في الحالتين من غير جافاسكربت.
- لو عندك لوجو SVG، ممكن تحل المشكلة بـ CSS وتستغنى عن `<picture>`.

### 4) كثافة البكسل 1x و2x
شاشات الريتينا.

```html nolive
<picture>
  <source media="(min-width: 800px)" srcset="hero-1x.jpg 1x, hero-2x.jpg 2x">
  <img src="hero-mobile.jpg" alt="الصورة الرئيسية" width="400" height="300">
</picture>
```

- جوه كل `<source>` ممكن تحط أكتر من نسخة بـ `1x` و`2x`.
- شاشة عادية بتاخد `1x` وشاشة حادة (Retina) بتاخد `2x`.
- الشرط `media` بيحدد إمتى المجموعة دي تتفعّل، والباقي بيروح لـ `<img>`.

### 5) تنسيق الصورة
الستايل على `<img>`.

```html
<style>
  picture img { width: 100%; max-width: 360px; border-radius: 16px; display: block; }
</style>
<picture>
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='160'%3E%3Crect width='360' height='160' fill='%23a7f3d0'/%3E%3Ctext x='180' y='92' font-size='28' text-anchor='middle'%3EStyled img%3C/text%3E%3C/svg%3E"
    alt="صورة بحواف مدورة">
</picture>
```

- الحواف المدورة والعرض اتحطوا على `<img>` اللي جوه، مش على `<picture>`.
- `<picture>` بيتصرف كحاوية سطرية بسيطة، فالتنسيق الحقيقي بيتعمل للصورة.
- حتى لو مفيش `<source>`، `<picture>` بيشتغل عادي (بس مالوش لازمة).

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: صفر أو أكتر من [[source]]، يليهم **`<img>` واحد بالظبط**، وممكن عناصر السكريبت (`<script>` و`<template>`).
- closing: الوسم الختامي `</picture>` إجباري.
- role: `generic` (والـ `<img>` اللي جواه بياخد دور `img`).
- dom: `HTMLPictureElement`.
- layout: `display: inline`.

## mistakes

### نسيان img
```html bad
<picture>
  <source srcset="a.webp" type="image/webp">
</picture>
```
```html good
<picture>
  <source srcset="a.webp" type="image/webp">
  <img src="a.jpg" alt="الوصف">
</picture>
```
ليه؟ العنصر اللي بيظهر فعلاً هو الـ `<img>`. من غيره مفيش صورة، ومفيش مكان لـ `alt`.

### وضع source بعد img
```html bad
<picture>
  <img src="a.jpg" alt="...">
  <source srcset="a.webp" type="image/webp">
</picture>
```
```html good
<picture>
  <source srcset="a.webp" type="image/webp">
  <img src="a.jpg" alt="...">
</picture>
```
ليه؟ المتصفح بيقرا `<source>` لحد ما يوصل لـ `<img>`، وكل اللي بعده بيتجاهله.

### alt على source
```html bad
<picture>
  <source srcset="a.webp" alt="وصف">
  <img src="a.jpg">
</picture>
```
```html good
<picture>
  <source srcset="a.webp">
  <img src="a.jpg" alt="وصف">
</picture>
```
ليه؟ الـ `alt` خاصية بتاعة `<img>` بس.

## a11y

- الـ `alt` بيتكتب على الـ `<img>` اللي جوه، وهو اللي بيتقرا لكل النسخ.
- لو اختلفت الصور تماماً بين الشاشات (محتوى مختلف) فكّر إن الـ `alt` لازم يناسب الكل.
- متحطش معلومات مهمة في صورة واحدة بس من الصور المحتملة.

## tips

- لو محتاج مقاسات بس، استخدم `<img srcset>` وكفاية.
- الترتيب: الأحدث والأصغر فوق، والأقدم تحت.
- حدّد `width` و`height` على الـ `<img>` عشان تتفادى القفزة.
- جرّب في أدوات المطور: كبّر وصغّر النافذة وشوف أنهي ملف اتحمّل في تبويب Network.

## quiz

### أنهي عنصر **إجباري** جوه `<picture>`؟
- [ ] `<source>`
- [x] `<img>`
- [ ] `<figure>`
- [ ] `<video>`
الـ `<img>` هو اللي بيتعرض فعلاً، وبياخد `alt`.

### إمتى تستخدم `<picture>` بدل `<img srcset>`؟
- [ ] لما عايز نفس الصورة بمقاسات مختلفة
- [x] لما عايز تصميم مختلف أو صيغة بديلة
- [ ] لما عايز صورة أسرع دايماً
- [ ] لما مفيش صور
Art Direction أو تبديل الصيغة هما الحالتين.

### إيه اللي بيحصل لو ولا `<source>` ينطبق؟
- [ ] مفيش صورة
- [x] المتصفح بيحمّل من `<img>`
- [ ] بيطلع خطأ
- [ ] بيحمّل آخر `<source>`
الـ `<img>` هو الاحتياطي النهائي.

## refs

- [MDN: picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)
- [WHATWG: The picture element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element)
- [web.dev: Responsive images](https://web.dev/learn/images/descriptive)
