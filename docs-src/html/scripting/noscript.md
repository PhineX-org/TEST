---
id: noscript
kind: element
cat: scripting
tag: noscript
title: عنصر لو السكريبت مقفول
en: HTML noscript element
status: stable
display: inline
void: no
support: all
size: compact
summary: بيعرض محتوى بديل بس لو الجافاسكربت مقفول أو مش مدعوم في المتصفح. بيتحط في body أو head، وبيتجاهله المتصفح تماماً لو السكريبتات شغّالة.
keywords: noscript, بدون سكريبت, جافاسكربت مقفول, بديل, fallback, javascript disabled, تدرج, progressive enhancement
related: script, template, link, style
---

## intro

مش كل الزوار بيشغّلوا الجافاسكربت: ممكن يكون مقفول بإضافة أمان، أو الملف فشل تحميله، أو المستخدم على متصفح نصي، أو زاحف (Crawler) مبيشغّلوش. العنصر `<noscript>` (**No Script**) بيحل ده: **المحتوى اللي جواه بيظهر بس لو السكريبتات مش شغّالة**. ولو شغّالة، المتصفح **بيتجاهله تماماً** كأنه مش موجود.

بتستخدمه لـ: رسالة «من فضلك فعّل الجافاسكربت»، أو صورة بديلة، أو رابط لنسخة مبسّطة، أو `<link>` لستايل بديل (جوه `<head>`)، أو بكسل تتبع احتياطي. وهو **مش بديل** للتصميم السليم: الأفضل إن الصفحة تشتغل أساساً من غير جافاسكربت وتتحسّن بيه (**Progressive Enhancement**).

> [!key] `<noscript>` = محتوى بديل يظهر **فقط** لو الجافاسكربت مقفول.

## try

بما إن الجافاسكربت شغّال في المعاينة، المحتوى جوه `<noscript>` مش هيظهر (ده المتوقع).

```html
<p>الجافاسكربت شغّال ✅</p>
<noscript>
  <p style="color:red">الجافاسكربت مقفول! فعّله علشان الصفحة تشتغل.</p>
</noscript>
```

## syntax

```html nolive
<noscript>
  <p>من فضلك فعّل الجافاسكربت.</p>
</noscript>
```

- `<noscript>` — **الوسم الافتتاحي**.
- المحتوى — **اللي هيظهر لو السكريبت مقفول**.
- `</noscript>` — **الوسم الختامي** إجباري.

## use

- لرسالة تنبيه بتفعيل الجافاسكربت.
- لمحتوى أو رابط بديل للنسخة غير التفاعلية.
- لبكسل تتبع احتياطي.

## avoid

- متعتمدش عليه كحل وحيد: صمّم الصفحة تشتغل من غيره.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) رسالة تنبيه
الأشهر.

```html nolive
<noscript>
  <div style="background:#fee2e2; padding:12px; border-radius:8px">
    الموقع ده محتاج جافاسكربت. من فضلك فعّله من إعدادات المتصفح.
  </div>
</noscript>
```

- لو الجافاسكربت شغّال، المستخدم مش هيشوف حاجة.
- لو مقفول، بيظهر الصندوق الأحمر.
- مفيد جداً للتطبيقات اللي بتعتمد كلياً على الجافاسكربت (SPA).

### 2) صورة بديلة
بدل صورة محمّلة بالسكريبت.

```html nolive
<img class="lazy" data-src="photo.jpg" alt="صورة المنتج">
<noscript>
  <img src="photo.jpg" alt="صورة المنتج">
</noscript>
```

- الصورة الأولى بتتحمّل بالجافاسكربت (تحميل كسول مخصص).
- لو الجافاسكربت مقفول، `<noscript>` بيعرض صورة عادية.
- النهارده الأحسن `loading="lazy"` الأصلي من غير أي سكريبت.

### 3) جوه head
ستايل بديل.

```html nolive
<head>
  <noscript>
    <link rel="stylesheet" href="no-js.css">
  </noscript>
</head>
```

- جوه `<head>` مسموح بس بـ `<link>` و`<style>` و`<meta>`.
- بيحمّل ستايل خاص بوضع بدون سكريبت (مثلاً إظهار عناصر كان السكريبت هيخفيها).
- المحتوى المرئي (زي `<p>`) مينفعش في الـ `<head>`.

## rules

- parents: أي عنصر بيقبل **Phrasing** (في `<body>`)، أو `<head>` (بشروط).
- children: في `<head>`: `<link>` و`<style>` و`<meta>`. في `<body>`: **Flow content** (من غير `<noscript>` متداخل).
- closing: الوسم الختامي `</noscript>` إجباري.
- role: مفيش.
- dom: `HTMLElement`.
- layout: `display: inline` (ومخفي لو السكريبت شغّال).

## mistakes

### noscript جوه noscript
```html bad
<noscript><noscript>رسالة</noscript></noscript>
```
```html good
<noscript>رسالة</noscript>
```
ليه؟ مينفعش تتداخل.

## a11y

- الرسالة اللي جواه لازم تبقى واضحة ومفهومة وبتقول إيه الحل.
- متعتمدش عليه عشان توفّر محتوى أساسي: خلّي الصفحة تشتغل من غير سكريبت.

## tips

- صمّم الصفحة تشتغل من غير جافاسكربت وبعدين حسّنها (Progressive Enhancement).
- استخدمه للتتبع الاحتياطي لأدوات التحليل.

## quiz

### إمتى بيظهر محتوى `<noscript>`؟
- [ ] دايماً
- [x] لما الجافاسكربت مقفول أو مش مدعوم
- [ ] لما الصفحة بتحمّل
- [ ] لما المستخدم يضغط
بيتجاهل لو السكريبت شغّال.

### إيه المسموح في `<noscript>` جوه `<head>`؟
- [x] `<link>` و`<style>` و`<meta>`
- [ ] `<p>`
- [ ] `<div>`
- [ ] أي حاجة
عناصر الـ Metadata بس.

## refs

- [MDN: noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript)
- [WHATWG: The noscript element](https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element)
