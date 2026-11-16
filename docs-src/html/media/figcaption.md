---
id: figcaption
kind: element
cat: media
tag: figcaption
title: عنصر تعليق الشكل
en: HTML figure caption element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر figcaption هو العنوان أو الشرح المرتبط بمحتوى figure، وبيتحط كأول أو آخر ابن جواه، وقارئ الشاشة بيستخدمه كاسم للشكل.
keywords: figcaption, تعليق, شرح, عنوان الشكل, caption, figure, صورة, مصدر
related: figure, img, blockquote, pre
---

## intro

الـ `<figcaption>` (**Figure Caption**) هو **التعليق أو العنوان** اللي بيشرح محتوى `<figure>`: «شكل 1: …» أو «ملف index.html» أو اسم صاحب الاقتباس. هو مش بيشتغل لوحده، لازم يتحط **جوه [[figure]]** وبس، وكمان لازم يبقى **أول ابن أو آخر ابن** (مش في النص).

الـ `<figcaption>` بيقبل أي **Flow content**، لكن غالباً هتحط جواه جملة أو اتنين. وبيكون هو **الاسم الإتاحي** (Accessible name) للـ `<figure>`، يعني قارئ الشاشة بيقراه لما يوصل للشكل. ومسموح بواحد بس جوه كل `<figure>`.

> [!key] `<figcaption>` جوه `<figure>` فقط، أول أو آخر ابن، وواحد بس.

## try

حرّك الـ `figcaption` لأول الـ `figure` وشوف الفرق.

```html
<figure style="margin:0">
  <pre style="background:#f1f5f9; padding:10px; direction:ltr; text-align:left"><code>console.log("hi")</code></pre>
  <figcaption>مثال 1: طباعة رسالة</figcaption>
</figure>
```

## syntax

```html nolive
<figure>
  <img src="a.jpg" alt="...">
  <figcaption>شكل 1: الشرح</figcaption>
</figure>
```

- `<figcaption>` — **الوسم الافتتاحي**، جوه `<figure>`.
- النص — الشرح أو العنوان.
- `</figcaption>` — **الوسم الختامي** إجباري.

## use

- لتعليق على صورة أو رسم في مقال.
- لعنوان مثال كود (اسم الملف أو رقم المثال).
- لذكر مصدر اقتباس أو صورة.

## avoid

- متستخدمهوش برّه `<figure>`.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق، زي لون النص أو المحاذاة.

## examples

### 1) تعليق تحت صورة
الشكل الأشهر.

```html
<figure style="margin:0; max-width:240px">
  <img width="240" height="90" alt="مستطيل بنفسجي"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='90'%3E%3Crect width='240' height='90' fill='%23c4b5fd'/%3E%3C/svg%3E">
  <figcaption style="font-size:13px; color:#475569">شكل 1: مستطيل بنفسجي</figcaption>
</figure>
```

- الـ `<figcaption>` آخر ابن فبيظهر تحت الصورة.
- بنستخدم CSS صغير عشان نخلّيه أصغر وبلون رمادي.
- ده الشكل المعتاد لتعليقات الصور في المقالات.

### 2) تعليق فوق المحتوى
أول ابن.

```html
<figure style="margin:0">
  <figcaption style="font-weight:bold">جدول 1: الألوان</figcaption>
  <ul><li>أحمر</li><li>أخضر</li></ul>
</figure>
```

- لأنه أول ابن بيظهر فوق المحتوى زي عنوان.
- ده مناسب للجداول والقوائم اللي العنوان بتاعها بييجي فوق.
- المسموح الأول أو الآخر، مش في النص.

### 3) مصدر اقتباس
مع blockquote.

```html
<figure style="margin:0">
  <blockquote style="margin:0">الصبر مفتاح الفرج.</blockquote>
  <figcaption>— مثل شعبي</figcaption>
</figure>
```

- الاقتباس في `<blockquote>`، ومصدره في `<figcaption>`.
- بيدّي اقتباس مستقل ومعاه صاحبه.
- الشرطة قبل المصدر عادة بتتكتب في الـ HTML نفسه.

## rules

- parents: [[figure]] فقط.
- children: **Flow content**.
- closing: الوسم الختامي `</figcaption>` إجباري.
- role: `generic` (بيتعلن كاسم الـ `figure`).
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### figcaption برّه figure
```html bad
<img src="a.jpg" alt="..."><figcaption>شرح</figcaption>
```
```html good
<figure><img src="a.jpg" alt="..."><figcaption>شرح</figcaption></figure>
```
ليه؟ الـ `<figcaption>` مالوش معنى من غير `<figure>` يشرحه.

## a11y

- بيتقري كاسم للـ `<figure>`، فاكتبه واضح ومفيد.
- ماتكررش نفس نص الـ `alt` فيه.

## tips

- خلّيه قصير ووصفي.
- نسّقه أصغر ورمادي عشان يبان تعليق مش عنوان رئيسي.

## quiz

### فين بيتحط `<figcaption>`؟
- [ ] برّه أي عنصر
- [x] جوه `<figure>`، أول أو آخر ابن
- [ ] جوه `<img>`
- [ ] جوه `<head>`
لازم يكون ابن مباشر لـ `<figure>` في أول أو آخر مكان.

### كام `<figcaption>` مسموح في `<figure>`؟
- [ ] أي عدد
- [x] واحد بس
- [ ] اتنين
- [ ] مفيش
تعليق واحد لكل شكل.

## refs

- [MDN: figcaption](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption)
- [WHATWG: The figcaption element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figcaption-element)
