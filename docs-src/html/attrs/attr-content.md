---
id: attr-content
kind: attribute
cat: attrs
chip: content
title: خاصية المحتوى
en: HTML content attribute
status: stable
support: all
size: compact
mdn: Attributes/content
summary: خاصية content على meta بتحمل قيمة المعلومة اللي اسمها في name أو http-equiv أو property (مثل description وviewport وog:title). اسمها وقيمتها بيشتغلوا كزوج.
keywords: content, meta, name, http-equiv, property, viewport, description, og:title, SEO, نص وصفي
related: meta, meta-description, meta-viewport, meta-social, attr-name
---

## intro

عنصر [[meta]] بيشتغل كزوج «اسم + قيمة»: الاسم في `name` (أو `http-equiv` أو `property`)، **والقيمة في `content`**. يعني `<meta name="description" content="وصف الصفحة">`: الاسم `description` والمحتوى هو الوصف. وكذلك `<meta name="viewport" content="width=device-width, initial-scale=1">` و`<meta property="og:title" content="عنوان المشاركة">`. من غير `content` الـ meta فاضي ومالوش لازمة. ولو القيمة فيها فاصلة أو علامات اقتباس، اكتبها جوه علامات تنصيص صحيحة. وأهم حاجة تحطها في كل صفحة: وصف (`description`) وإعداد الـ `viewport` لأن الصفحة من غيره بتبان صغيرة جداً على الموبايل.

## try

```html
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;meta name="description" content="دورة HTML بالعربي"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;meta property="og:title" content="PhineX Academy"&gt;</pre>
```

## syntax

```html nolive
<meta name="description" content="وصف الصفحة">
<meta property="og:title" content="عنوان">
```

- `content` — **قيمة** الميتا.
- `name` أو `property` أو `http-equiv` — **اسمها**.
- من غير `content` مفيش فايدة.

## use

- وصف الصفحة والـ viewport.
- بيانات المشاركة (Open Graph).

## avoid

- متنساش `content` على أي `meta` بيستخدم `name`.

## examples

### 1) وصف للبحث
مثال على description.

```html nolive
<meta name="description" content="تعلّم HTML من الصفر بالعامية المصرية">
```

- بيظهر تحت العنوان في جوجل.
- حوالي 150 حرف.
- خلّيه مميّز لكل صفحة.

### 2) viewport
الموبايل.

```html nolive
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- ضروري لتصميم متجاوب.
- بيظبط العرض على الموبايل.
- من غيرها الصفحة بتبان مصغّرة.

### 3) Open Graph
مثال على property.

```html nolive
<meta property="og:title" content="PhineX Academy">
<meta property="og:image" content="https://example.com/card.png">
```

- بتحكم شكل المشاركة على السوشيال.
- الصورة رابط مطلق.
- اختبرها بأدوات المعاينة.

## mistakes

### meta بدون content
```html bad
<meta name="description">
```
```html good
<meta name="description" content="وصف">
```
ليه؟ من غير content الميتا فاضية.

## a11y

- `lang` و`description` بيحسّنوا فهم الصفحة.
- لا تمنع التكبير في `viewport` (`user-scalable=no`).

## quiz

### بتحمل إيه؟
- [x] قيمة الـ meta
- [ ] اسمها
- [ ] نوعها
- [ ] رابطها
الاسم في `name`.

### تستخدم مع؟
- [x] `<meta>`
- [ ] `<div>`
- [ ] `<a>`
- [ ] `<img>`
عنصر meta.

## refs

- [MDN: content](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/content)
- [MDN: meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)
