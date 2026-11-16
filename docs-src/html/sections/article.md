---
id: article
kind: element
cat: sections
tag: article
title: عنصر المقال (article)
en: HTML article contents element
status: stable
display: block
void: no
support: all
summary: عنصر article بيلفّ محتوى مستقل بذاته ينفع يتنشر أو يتشارك لوحده، زي مقال أو خبر أو منشور أو تعليق أو كارت منتج، وممكن يتداخل جوه بعضه.
keywords: article, مقال, خبر, منشور, تعليق, مدونة, مستقل, blog post, news, comment, card, منتج
related: section, header, footer, aside, main, h2, time, address
---

## intro

الـ `<article>` معناه «مقال»، لكن في HTML هو أوسع من كده: هو أي **محتوى مستقل بذاته** (Self-contained). يعني لو سحبت الحتة دي من الصفحة وحطيتها في صفحة تانية أو في إيميل أو في تطبيق قراءة RSS، هتفضل مفهومة ومكتملة. المقال في مدونة، الخبر في جرنال، التعليق تحت فيديو، المنشور في منتدى، كارت المنتج في متجر: كلهم `<article>`.

الاختبار البسيط: **«هل ينفع أنشر الحتة دي لوحدها وتبقى مفهومة؟»**. لو أيوه، `<article>`. لو لأ (مثلاً قسم «أسعارنا» من صفحة هبوط ملهوش معنى من غير باقي الصفحة)، يبقى `<section>`. وده الفرق اللي بيلخبط الناس بين التنين.

الـ `<article>` ممكن **يتداخل**: مقال فيه تعليقات، وكل تعليق هو نفسه `<article>` جوه المقال الأب. وفي الحالة دي العلاقة دي بتتفهم: التعليقات تابعة للمقال. وكمان ممكن يبقى جواه `<header>` (عنوان وتاريخ وكاتب) و `<footer>` (تصنيف وحقوق) و `<section>` لفصول المقال.

ولو بتعمل مدونة، كل بوست `<article>`، وصفحة المدونة اللي بتعرض قايمة البوستات فيها `<article>` متعددة جوه `<main>`. وقارئ الشاشة بيعلن كل واحد كـ «مقال»، فبيقدر المستخدم ينتقل بينهم بسهولة.

> [!analogy] تخيّل مجلة فيها مقالات: كل مقال له عنوان وكاتب ومحتوى، وتقدر تقصّه وتديه لحد فيفهمه لوحده. ده `<article>`. أما صفحة «المحتويات» في أول المجلة فمش بتتفهم من غير باقي المجلة.

> [!key] `<article>` = محتوى **مستقل** ينفع يتنشر لوحده. وممكن يتداخل (تعليق جوه مقال).

## try

ده مقال بسيط بهيدر وفوتر. جرّب تضيف تعليق جواه كـ `<article>` تاني.

```html
<style>
  article { border: 2px solid #0ea5e9; border-radius: 10px; padding: 12px; max-width: 420px; }
  article header h2 { margin: 0; font-size: 20px; }
  article footer { color: #666; font-size: 13px; margin-top: 8px; }
</style>
<article>
  <header>
    <h2>إزاي تتعلم HTML في أسبوع</h2>
    <p><time datetime="2026-10-28">28 أكتوبر 2026</time> · أحمد</p>
  </header>
  <p>ابدأ بالأساسيات، وبعدين تدرّب على صفحة بسيطة كل يوم.</p>
  <footer>التصنيف: HTML</footer>
</article>
```

## syntax

```html nolive
<article>
  <header>
    <h2>عنوان المقال</h2>
    <p>التاريخ والكاتب</p>
  </header>
  <p>نص المقال…</p>
  <footer>معلومات إضافية</footer>
</article>
```

- `<article>` — **الوسم الافتتاحي**.
- `<header>` — اختياري: عنوان المقال وبياناته.
- المحتوى — فقرات وصور وغيرهم.
- `<footer>` — اختياري: تصنيف أو حقوق أو روابط.
- `</article>` — **الوسم الختامي** إجباري.

## use

- لبوست في مدونة أو خبر في موقع إخباري.
- لتعليق على مقال أو فيديو أو منتج.
- لمنشور في منتدى أو سوشيال ميديا.
- لكارت منتج أو إعلان يتفهم لوحده.
- لأي ويدجت مستقلة (طقس مثلاً) ينفع تتنقل لصفحة تانية.

## avoid

- متستخدمهوش لأجزاء مش مستقلة: استخدم `<section>`.
- متستخدمهوش للتنسيق بس: استخدم `<div>`.
- متحطش `<main>` جوه `<article>`.
- متنساش العنوان (`<h2>` غالباً) جوه كل `<article>`.
- متستخدمهوش لكل حاجة في الصفحة.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق، زي `class="post"`.

### id
بتخلّي المقال هدف لرابط داخلي (`#post-12`) فينفع تشارك رابط لمقال معيّن.

### aria-labelledby
بتربط المقال بعنوانه لو عايز اسم واضح لقارئ الشاشة.

```html nolive
<article aria-labelledby="t1"><h2 id="t1">العنوان</h2>…</article>
```

## examples

### 1) مقال بسيط
عنوان وفقرة.

```html
<article>
  <h2>أول مقال</h2>
  <p>أهلاً بيك في مدونتي.</p>
</article>
```

- ده أقل شكل ينفع: عنوان وفقرة.
- المقال ده مستقل: لو نقلته لصفحة تانية هيفضل مفهوم.
- المتصفح مش بيرسم له شكل مميز، فالشكل كله من الـ CSS.

### 2) مقال كامل بهيدر وفوتر
الهيدر جوه المقال بيبقى مقدمة المقال مش الصفحة.

```html
<article>
  <header>
    <h2>مقدمة في JavaScript</h2>
    <p>كتبه <strong>أحمد</strong> في <time datetime="2026-10-28">28/10/2026</time></p>
  </header>
  <p>JavaScript هي لغة الويب التفاعلية.</p>
  <footer><p>التصنيف: برمجة</p></footer>
</article>
```

- `<time>` بيعرّف التاريخ بشكل يفهمه الكمبيوتر.

### 3) قايمة مقالات في صفحة المدونة
كل بوست `<article>` مستقل.

```html
<style>
  article { border-bottom: 1px solid #ddd; padding: 8px 0; }
  article h2 { margin: 0 0 4px; font-size: 18px; }
</style>
<main>
  <h1>المدونة</h1>
  <article><h2>HTML للمبتدئين</h2><p>مقدمة بسيطة.</p></article>
  <article><h2>CSS للمبتدئين</h2><p>أول خطوات التنسيق.</p></article>
  <article><h2>JavaScript للمبتدئين</h2><p>برمجة الصفحة.</p></article>
</main>
```

- كل مقال ينفع يتسحب ويتنشر لوحده، وده سبب إننا استخدمنا `<article>` مش `<div>`.
- الـ `<h1>` للصفحة كلها (المدونة)، والـ `<h2>` لكل مقال تحتها.
- قارئ الشاشة بيعلن «مقال» لكل واحد، فالمستخدم بينتقل بينهم بسهولة.

### 4) تعليقات متداخلة
التعليق مقال جوه المقال.

```html
<article>
  <h2>مقال عن HTML</h2>
  <p>نص المقال.</p>
  <section>
    <h3>التعليقات</h3>
    <article>
      <p><strong>سارة:</strong> مقال ممتاز!</p>
    </article>
    <article>
      <p><strong>علي:</strong> شكراً على الشرح.</p>
    </article>
  </section>
</article>
```

- التعليقات في `<section>` لأنها قسم، وكل تعليق `<article>` لأنه مستقل.

### 5) كارت منتج
المنتج ينفع يظهر في أي مكان.

```html
<style>
  .p { border: 1px solid #ccc; border-radius: 10px; padding: 10px; width: 180px; text-align: center; }
</style>
<article class="p">
  <h3>كورس HTML</h3>
  <p>مجاني</p>
  <a href="#">ابدأ</a>
</article>
```

- الكارت مفهوم لوحده: اسم وسعر ورابط.

### 6) article مع صورة وشكل
مقال بصورة غلاف بسيطة (SVG مدمج).

```html
<article style="max-width:320px">
  <img alt="غلاف المقال" width="320" height="120"
       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='120'%3E%3Crect width='320' height='120' fill='%2339ff14'/%3E%3C/svg%3E">
  <h2>مقال بصورة</h2>
  <p>الصورة بتدّي المقال شكل جذاب.</p>
</article>
```

- الصورة لازم يبقى ليها `alt` وصف.

## rules

- parents: أي عنصر بيقبل **Flow content** (زي `<main>` و `<section>` و `<body>` و `<article>` نفسه).
- children: **Flow content** (عنوان ومحتوى، وممكن `<header>` و `<footer>`).
- closing: الوسم الختامي `</article>` إجباري.
- role: `article`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### article لجزء مش مستقل
```html bad
<article>
  <h2>أسعارنا</h2>
  <p>من 50 جنيه.</p>
</article>
```
```html good
<section>
  <h2>أسعارنا</h2>
  <p>من 50 جنيه.</p>
</section>
```
ليه؟ قسم الأسعار جزء من صفحة أكبر ومالوش معنى لوحده.

### main جوه article
```html bad
<article>
  <main>…</main>
</article>
```
```html good
<main>
  <article>…</article>
</main>
```
ليه؟ الـ `<main>` لازم يبقى محتوى الصفحة كلها.

### article من غير عنوان
```html bad
<article>
  <p>كلام من غير أي عنوان.</p>
</article>
```
```html good
<article>
  <h2>عنوان المقال</h2>
  <p>كلام ليه عنوان.</p>
</article>
```
ليه؟ العنوان بيحدد هوية المقال لقارئ الشاشة والمتصفح.

## a11y

- قارئ الشاشة بيعلن `<article>` كـ «مقال» وبيسهّل التنقل بين المقالات.
- كل مقال لازم يبقى له عنوان (`<h2>` أو `<h3>`).
- لو عندك مقالات كتير، العنوان بيساعد المستخدم يفرّق بينها.

## tips

- اسأل: «لو سحبت الحتة دي لصفحة تانية هتتفهم؟». لو أيوه فهو `<article>`.
- استخدم `<time datetime="…">` للتواريخ جوه المقال.
- لو بتعمل مدونة، `id` لكل مقال بيخليك تشارك رابط مباشر ليه.
- لو بتبني كارت مكرر في قايمة، `<article>` مناسب لو الكارت مستقل بمحتواه.

## quiz

### إيه الاختبار الأبسط لتعرف إنه `<article>`؟
- [ ] لو فيه صورة
- [x] لو ينفع ينتشر لوحده ويتفهم
- [ ] لو طويل
- [ ] لو فيه عنوان
الاستقلالية هي المعيار الأساسي.

### تعليق على مقال، أنهي عنصر الأنسب؟
- [ ] `<section>`
- [ ] `<div>`
- [x] `<article>`
- [ ] `<aside>`
التعليق محتوى مستقل جوه المقال الأب.

### أنهي ممنوع؟
- [ ] `<main>` فيه `<article>`
- [ ] `<article>` فيه `<article>`
- [x] `<article>` فيه `<main>`
- [ ] `<article>` فيه `<header>`
الـ `<main>` مينفعش يتحط جوه `<article>`.

## refs

- [MDN: article](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article)
- [WHATWG: The article element](https://html.spec.whatwg.org/multipage/sections.html#the-article-element)
