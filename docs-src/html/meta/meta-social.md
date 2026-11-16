---
id: meta-social
kind: guide
cat: meta
title: المشاركة على السوشيال ميديا (Open Graph و Twitter Cards)
en: Social sharing meta tags (Open Graph and Twitter Cards)
status: stable
summary: إزاي تتحكم في شكل رابط موقعك لما حد يشاركه على واتساب وفيسبوك وتويتر وغيرهم (الصورة والعنوان والوصف) باستخدام وسوم Open Graph و Twitter Cards.
keywords: open graph, og, twitter card, مشاركة, واتساب, فيسبوك, سوشيال ميديا, og:image, meta social, معاينة الرابط
related: meta, meta-description, title, head
---

## intro

لما حد بيبعت رابط موقعك على واتساب أو فيسبوك أو تويتر، بتلاقي بيظهر كارت صغير: صورة وعنوان وسطرين وصف. ده مش سحر: التطبيق بيزور الرابط، وبيقرا وسوم `<meta>` معينة في الـ `<head>`، وبيرسم الكارت منها. لو ما كتبتهاش، التطبيق هيخمّن (وغالباً بيخمّن وحش): ممكن يختار صورة غلط أو ما يعرضش صورة خالص.

الوسوم دي بتتبع معيار اسمه **Open Graph**، ابتكره فيسبوك، وبقى معتمد في واتساب وتلغرام وLinkedIn وديسكورد وغيرهم. وتويتر (X) عنده وسوم إضافية اسمها **Twitter Cards**، لكنه بيرجع لـ Open Graph لو ما لقاش اللي محتاجه.

خلّي بالك من حاجة غريبة: وسوم Open Graph بتستخدم خاصية `property` مش `name`، زي `<meta property="og:title" content="...">`. وخاصية `property` دي **مش** من HTML القياسي (هي من RDFa)، المتصفح بيتجاهلها، لكن تطبيقات المشاركة بتقراها. أما Twitter فبيستخدم `name` عادي.

الوسوم دي مفيدة جداً للمحتوى اللي هيتشارك كتير (مقالات، منتجات، دروس)، لأن الكارت الحلو بيزوّد عدد الناس اللي بتدوس على الرابط.

> [!analogy] تخيّل غلاف كتاب في المكتبة. الكتاب ممكن يكون ممتاز، لكن لو الغلاف بايظ ومكتوب عليه حاجة غلط محدش هيشتريه. وسوم المشاركة هي غلاف رابطك لما يتبعت لحد.

> [!key] أهم أربع وسوم: `og:title` و `og:description` و `og:image` و `og:url`. وعشان تحسّن تويتر ضيف `twitter:card`.

## examples

### 1) الوسوم الأساسية
ده الحد الأدنى لكارت محترم. كلها في الـ head.

```html nolive
<head>
  <meta charset="utf-8">
  <title>تعلّم HTML من الصفر</title>
  <meta property="og:title" content="تعلّم HTML من الصفر">
  <meta property="og:description"
        content="كورس بالعربي بأمثلة تفاعلية تجرّبها بنفسك.">
  <meta property="og:image" content="https://example.com/cover.jpg">
  <meta property="og:url" content="https://example.com/html">
  <meta property="og:type" content="website">
</head>
```

- `og:title` عنوان الكارت.
- `og:description` الوصف تحت العنوان.
- `og:image` الصورة (لازم رابط **كامل** يبدأ بـ `https://`).
- `og:url` الرابط الأساسي للصفحة.
- `og:type` النوع: `website` أو `article` أو غيره.

### 2) شكل الكارت (رسم توضيحي)
ده رسم بالـ HTML لشكل الكارت اللي هيظهر. مجرد تمثيل عشان تتخيّل النتيجة.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    .card { max-width: 340px; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; font-family: sans-serif; }
    .img { height: 140px; background: linear-gradient(135deg, #39ff14, #00b0ff); display: grid; place-items: center; color: #fff; font-size: 22px; }
    .body { padding: 10px 14px; background: #fafafa; }
    .dom { font-size: 12px; color: #777; text-transform: uppercase; }
    .ttl { font-weight: bold; margin: 4px 0; }
    .dsc { font-size: 13px; color: #555; }
  </style>
</head>
<body>
  <div class="card">
    <div class="img">صورة og:image</div>
    <div class="body">
      <div class="dom">example.com</div>
      <div class="ttl">تعلّم HTML من الصفر</div>
      <div class="dsc">كورس بالعربي بأمثلة تفاعلية تجرّبها بنفسك.</div>
    </div>
  </div>
</body>
</html>
```

- الصورة فوق، وتحتها الدومين والعنوان والوصف.
- كل جزء جاي من وسم `<meta>` معين.

### 3) كروت تويتر (X)
تويتر بيفهم Open Graph، لكن لو عايز تحدد نوع الكارت ضيف الوسوم دي (وبتتكتب بـ `name`).

```html nolive
<head>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="تعلّم HTML من الصفر">
  <meta name="twitter:description" content="كورس بالعربي بأمثلة تفاعلية.">
  <meta name="twitter:image" content="https://example.com/cover.jpg">
</head>
```

- `summary`: كارت صغير بصورة صغيرة.
- `summary_large_image`: كارت بصورة كبيرة عريضة (الأشهر).

### 4) مقال بخصائص زيادة
لو الصفحة مقال، بتضيف معلومات النشر والكاتب.

```html nolive
<head>
  <meta property="og:type" content="article">
  <meta property="og:title" content="إزاي تتعلم HTML في أسبوع">
  <meta property="article:published_time" content="2026-01-15T09:00:00+02:00">
  <meta property="article:author" content="أحمد">
  <meta property="og:site_name" content="PhineX Academy">
  <meta property="og:locale" content="ar_AR">
</head>
```

- `og:site_name` اسم الموقع، و `og:locale` اللغة (للعربي `ar_AR`).
- `article:*` وسوم إضافية بتفيد لما النوع `article`.

### 5) مقاس الصورة
الصورة هي أهم جزء في الكارت. التوصية الشائعة نسبة تقريبية 1.91:1.

```html nolive
<head>
  <meta property="og:image" content="https://example.com/cover-1200x630.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="غلاف كورس HTML">
</head>
```

- مقاس 1200×630 بيشتغل كويس في معظم المنصات (ده التقدير الشائع، مش قاعدة رسمية).
- `og:image:alt` وصف للصورة (مفيد للوصولية).
- لازم الصورة تكون على رابط عام يقدر التطبيق يوصله.

### 6) توليد الوسوم بالجافاسكربت؟ لأ
مهم: تطبيقات المشاركة **ما بتشغّلش الجافاسكربت**. لازم الوسوم تكون موجودة في الـ HTML اللي بيرجع من السيرفر، مش مضافة بعدين.

```html nolive
<!-- هيشتغل: موجود في الـ HTML نفسه -->
<meta property="og:title" content="عنوان">

<!-- مش هيشتغل: مضاف بالسكربت بعد التحميل -->
<script>
  const m = document.createElement('meta');
  m.setAttribute('property', 'og:title');
  m.content = 'عنوان';
  document.head.appendChild(m);
</script>
```

- لو موقعك بيتولّد بـ Framework، استخدم Server-side rendering أو الأدوات اللي بتحط الوسوم في الـ HTML.

## use

- لأي صفحة المتوقع تتشارك: مقالات ومنتجات ودروس وصفحة رئيسية.
- لتحسين شكل الرابط على واتساب وتلغرام وفيسبوك ولينكدإن وديسكورد وتويتر.
- لتحديد صورة محددة بدل ما التطبيق يخمّن.

## avoid

- متحطش رابط صورة نسبي (`/img/a.jpg`): لازم رابط كامل بـ `https://`.
- متستخدمش صورة صغيرة أو مقصوصة وحشة.
- متضيفش الوسوم بالجافاسكربت.
- متنساش تحدّث الوسوم لو غيّرت الصورة: التطبيقات بتخزّن النسخة القديمة (Cache).

## mistakes

### استخدام name مع og
```html bad
<meta name="og:title" content="عنوان">
```
```html good
<meta property="og:title" content="عنوان">
```
ليه؟ وسوم Open Graph بتتكتب بـ `property`. بعض المنصات بتتسامح لكن الصح `property`.

### رابط صورة نسبي
```html bad
<meta property="og:image" content="/images/cover.jpg">
```
```html good
<meta property="og:image" content="https://example.com/images/cover.jpg">
```
ليه؟ التطبيق بيقرا الوسم من برّه موقعك، فمحتاج الرابط كامل.

### الصورة مش بتتغيّر بعد التعديل
```html bad
<!-- غيّرت الصورة بس بنفس الاسم -->
<meta property="og:image" content="https://example.com/cover.jpg">
```
```html good
<!-- اسم جديد أو رقم نسخة -->
<meta property="og:image" content="https://example.com/cover.jpg?v=2">
```
ليه؟ فيسبوك وواتساب بيخبّوا النسخة القديمة، فتغيير اسم الرابط بيجبرهم على تحميل الجديدة.

## tips

- اختبر روابطك بأدوات المعاينة بتاعة المنصات (فيه أدوات مجانية بتوريك الكارت).
- خلّي العنوان أقل من حوالي 60 حرف والوصف أقل من حوالي 150.
- أي ملف يتغيّر بس الكارت لسه قديم؟ لازم تعمل «re-scrape» من أداة المنصة.
- اكتب `og:image:alt` عشان قارئات الشاشة.

## quiz

### أي خاصية بنستخدمها مع وسوم Open Graph؟
- [ ] `name`
- [x] `property`
- [ ] `rel`
- [ ] `id`
وسوم Open Graph بتتكتب بـ `property` (زي `og:title`).

### ليه ما ينفعش نضيف وسوم og بالجافاسكربت؟
- [ ] مفيش مشكلة
- [x] لأن تطبيقات المشاركة ما بتشغّلش الجافاسكربت
- [ ] لأنها بتبطّئ الصفحة
- [ ] لأن المتصفح بيمنع
التطبيق بيقرا الـ HTML الأولي من السيرفر بس.

### إيه شكل رابط الصورة الصح؟
- [ ] `/cover.jpg`
- [x] `https://example.com/cover.jpg`
- [ ] `cover.jpg`
- [ ] `../cover.jpg`
لازم رابط كامل لأن التطبيق بيقراه من برّه موقعك.

## refs

- [Open Graph protocol](https://ogp.me/)
- [MDN: meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)
