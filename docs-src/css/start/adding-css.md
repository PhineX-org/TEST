---
id: adding-css
kind: guide
cat: start
title: تلات طرق تضيف بيها CSS
en: Adding CSS to HTML: inline, internal, external
status: stable
summary: ازاي تربط CSS بصفحتك: بـ style جوه العنصر (inline)، أو وسم style في الصفحة (internal)، أو ملف خارجي بـ link (external). وإمتى تستخدم كل واحدة.
keywords: adding css, inline, internal, external, link, style, ملف css, ربط css, @import, ازاي اضيف css, ربط ملف تنسيق
related: intro-css, css-syntax, at-import, cascade-inheritance, specificity
---

## intro

عندك تلات طرق تقول بيها للمتصفح «طبّق CSS ده على الصفحة دي». كل طريقة ليها مكان وفايدة، ولازم تعرف الفرق عشان متتلخبطش لما تلاقي مشروع حقيقي.

**الطريقة الأولى: Inline.** بتكتب CSS جوه الوسم نفسه بالخاصية `style`. بتأثّر على العنصر ده بس. سريعة للتجربة لكن بتخلّي الكود مبعثر وصعب التعديل.

**الطريقة التانية: Internal.** بتحط وسم `<style>` جوه `<head>` وتكتب فيه كل القواعد. مناسبة لصفحة واحدة أو للتجربة السريعة (زي الأمثلة هنا).

**الطريقة التالتة: External.** بتكتب CSS في ملف لوحده (`style.css` مثلاً) وتربطه بـ `<link rel="stylesheet" href="style.css">`. دي **الطريقة الاحترافية**، لأن الملف الواحد ممكن يخدم عشرات الصفحات، والمتصفح بيخزّنه (Cache) فالصفحات تتحمّل أسرع.

> [!key] للمشاريع الحقيقية: **ملف خارجي**. الـ inline للتجارب أو لقيمة بتتغيّر بالـ JavaScript. والـ internal للصفحة اللي لوحدها.

## try

```html
<style>
  .box { background: #efe0bd; padding: 12px; border-radius: 10px; }
</style>
<div class="box" style="color: #b5551f; font-weight: bold;">الخلفية من internal، واللون والخط من inline</div>
```

## syntax

```html nolive
<!-- 1) Inline -->
<p style="color: #b5551f;">نص</p>

<!-- 2) Internal -->
<head>
  <style>
    p { color: #b5551f; }
  </style>
</head>

<!-- 3) External -->
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

- `style="..."` — جوه العنصر، قواعد مفصولة بـ `;` من غير محدد.
- `<style>` — جوه `<head>`، قواعد كاملة بمحدد.
- `<link rel="stylesheet" href>` — يربط ملف `.css`.
- لو اتعارضوا: الأقوى حسب الـ [[specificity]] وبعدين الأحدث ترتيباً.

## examples

### 1) Inline: تنسيق جوه العنصر
الخاصية `style` بتاخد إعلانات CSS مفصولة بفاصلة منقوطة. بتأثّر على العنصر ده بس.

```html
<p style="background:#d8b878; color:#3d2c18; padding:10px; border-radius:8px;">فقرة منسّقة inline</p>
<p>فقرة عادية في نفس الصفحة</p>
```

- التنسيق اتطبّق على الفقرة الأولى بس.
- مفيش محدد لأن العنصر نفسه هو الهدف.

### 2) Internal: وسم style
القواعد في وسم `<style>` بتطبّق على كل العناصر اللي بتطابق المحدد في الصفحة.

```html
<style>
  p { background: #d8b878; color: #3d2c18; padding: 10px; border-radius: 8px; }
</style>
<p>فقرة 1</p>
<p>فقرة 2</p>
```

- قاعدة واحدة طبّقت على الفقرتين.
- ده اللي هنستخدمه في أغلب الأمثلة.

### 3) External: ملف style.css
ده مثال بالشكل اللي هتشتغل بيه فعلاً: ملف HTML وملف CSS جنبه. (عرض ثابت لأن الـ iframe مفيهوش ملفات.)

```html nolive
<!-- index.html -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>
<body><h1>أهلاً</h1></body>
</html>

/* style.css */
h1 { color: #b5551f; }
```

- الملف الخارجي بيتعمل cache.
- تغيير ملف واحد بيحدّث كل الصفحات.

### 4) تعارض: مين يكسب؟
العنصر ليه لون من الـ internal ولون من الـ inline. الـ inline أقوى، فالنص بيطلع بنفسجي-بني.

```html
<style> p { color: #3d7a5a; } </style>
<p>أخضر من internal</p>
<p style="color:#a63b2f;">أحمر من inline (الأقوى)</p>
```

- الـ inline له أعلى أولوية (ما عدا `!important`).
- اتعرّف على القواعد في [[specificity]].

## mistakes

### ملف CSS مش بيتحمّل بسبب المسار

```html bad
<link rel="stylesheet" href="/css/style.css">
<!-- لو الملف في نفس الفولدر -->
```

```html good
<link rel="stylesheet" href="style.css">
<!-- أو مسار نسبي صح: css/style.css -->
```

اتأكد من المسار (`href`) نسبة لمكان ملف الـ HTML. أسهل طريقة تعرف الغلط: افتح DevTools وشوف تبويب Network.

### كتابة CSS جوه body من غير وسم style

```html bad
<body>
  p { color: red; }
</body>
```

```html good
<head>
  <style>
    p { color: #a63b2f; }
  </style>
</head>
```

لازم CSS يبقى جوه `<style>` أو ملف، وإلا المتصفح هيعرضه كنص عادي.

## quiz

### أنهي طريقة هي الأنسب لموقع كبير فيه 50 صفحة؟
- [ ] Inline
- [ ] Internal
- [x] External (ملف .css واحد)
- [ ] كل صفحة بتكتب CSS خاص بيها

الملف الخارجي بيتشارك بين كل الصفحات وبيتخزّن في الـ cache.

### الوسم اللي بيربط ملف CSS خارجي هو؟
- [ ] `<style src>`
- [x] `<link rel="stylesheet">`
- [ ] `<css>`
- [ ] `<script>`

`<link rel="stylesheet" href="style.css">` جوه `<head>`.

### لو inline وinternal اتعارضوا على نفس الخاصية، مين غالباً يكسب؟
- [ ] Internal
- [x] Inline
- [ ] العشوائي
- [ ] الأطول

الـ inline له أولوية أعلى من أي محدد عادي.

## refs

- [MDN: ربط CSS بالصفحة](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started)
