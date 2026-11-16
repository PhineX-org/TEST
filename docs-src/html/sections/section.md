---
id: section
kind: element
cat: sections
tag: section
title: عنصر القسم (section)
en: HTML generic section element
status: stable
display: block
void: no
support: all
summary: عنصر section بيجمّع محتوى واحد ليه موضوع مشترك وعادةً ليه عنوان، زي قسم «المميزات» أو «الأسعار» في صفحة، ومش بديل لـ div اللي بنستخدمه للتنسيق بس.
keywords: section, قسم, جزء, موضوع, region, عنوان, heading, تقسيم الصفحة, thematic grouping
related: article, div, header, footer, main, aside, nav, h2, h1
---

## intro

تخيّل كتاب فيه فصول: كل فصل ليه عنوان وموضوع. الـ `<section>` هو **الفصل** في صفحة الويب: بيجمّع محتوى ليه **موضوع واحد** وعادةً ليه **عنوان** (`<h2>` غالباً). صفحة الكورسات ممكن تتقسم لـ `<section>` «للمبتدئين» و `<section>` «للمتقدمين» و `<section>` «أسئلة شائعة»، وكل قسم ليه عنوانه ومحتواه.

السؤال اللي بيحير كل المبتدئين: «أستخدم `<section>` ولا `<div>`؟». القاعدة السهلة: **اسأل نفسك هل الحتة دي ليها عنوان وموضوع مستقل؟** لو أيوه، `<section>`. لو الحتة دي مجرد صندوق عشان تنسّقه أو تحطه جنب حاجة تانية (Layout)، يبقى `<div>`. الـ `<section>` له **معنى**، والـ `<div>` مالوش.

نقطة مهمة في الوصولية: الـ `<section>` لوحده **مش** Landmark. بيتحول لمنطقة اسمها `region` بس لو إنت **سمّيته** بـ `aria-label` أو `aria-labelledby`. من غير اسم هو مجرد حاوية عادية لقارئ الشاشة. فلو القسم مهم وعايز قارئ الشاشة ينط له، اربطه بعنوانه بـ `aria-labelledby`.

وخلّي بالك من الفرق بينه وبين `<article>`: الـ `<article>` محتوى **مستقل** ينفع يتنشر لوحده (مقال، تعليق، منتج)، أما الـ `<section>` جزء من حاجة أكبر مش بيقف لوحده. ولو شككت: لو المحتوى ينفع يتبعت في إيميل أو يتشارك لوحده فهو `<article>`، لو ده «فصل» في صفحة أكبر فهو `<section>`.

> [!analogy] تخيّل الجرنال: فيه أقسام «سياسة» و«رياضة» و«فن». كل قسم له عنوان وموضوع، وجواه أخبار كتير. القسم ده `<section>`، وكل خبر جواه `<article>`.

> [!key] `<section>` = قسم **ليه موضوع وعنوان**. لو بتستخدمه للتنسيق بس، ده `<div>`.

## try

كل `<section>` هنا ليه `<h2>` خاص بيه. جرّب تضيف قسم تالت.

```html
<style>
  section { border: 2px solid #7c3aed; border-radius: 8px; padding: 10px; margin: 8px 0; }
  section h2 { margin: 0 0 6px; color: #7c3aed; font-size: 18px; }
</style>
<section>
  <h2>للمبتدئين</h2>
  <p>كورسات HTML و CSS من الصفر.</p>
</section>
<section>
  <h2>للمتقدمين</h2>
  <p>JavaScript و React.</p>
</section>
```

## syntax

```html nolive
<section aria-labelledby="features-title">
  <h2 id="features-title">المميزات</h2>
  <p>…</p>
</section>
```

- `<section>` — **الوسم الافتتاحي**.
- `<h2 id="…">` — عنوان القسم (تقريباً دايماً موجود).
- `aria-labelledby` — اختياري: بيربط القسم بعنوانه فيتحول لـ Landmark.
- `</section>` — **الوسم الختامي** إجباري.

## use

- لتقسيم صفحة لأقسام ليها عناوين: مميزات، أسعار، آراء العملاء، تواصل.
- لتقسيم مقال طويل لفصول.
- لتجميع محتوى لتبويب (Tab) أو شريحة (Slide) ليها موضوع.
- لما محتاج العنوان يبقى جزء من هيكل المستند.

## avoid

- متستخدمهوش كحاوية للتنسيق بس: استخدم `<div>`.
- متحطش `<section>` من غير عنوان لو مفيش سبب قوي.
- متستخدمهوش مكان `<article>` للمحتوى المستقل.
- متستخدمهوش لكل حاجة: كتر `<section>` من غير معنى بيبوّظ الهيكل.
- متتوقعش إنه Landmark من غير `aria-label`.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]) و**ARIA**.

### aria-labelledby
بتربط القسم بعنوانه (بـ `id` العنوان). بتحوّل القسم لـ Landmark اسمه `region`.

```html nolive
<section aria-labelledby="t1"><h2 id="t1">الأسعار</h2>…</section>
```

### aria-label
بتدّي القسم اسم من غير عنوان ظاهر. استخدم `aria-labelledby` لو في عنوان.

```html nolive
<section aria-label="آراء العملاء">…</section>
```

### class
أشهر خاصية بتتحط على القسم للتنسيق.

### id
بتخلّي القسم هدف لرابط داخلي زي `#pricing`.

## examples

### 1) أبسط section
قسم بعنوان وفقرة.

```html
<section>
  <h2>مين إحنا؟</h2>
  <p>فريق بيعلّم البرمجة بالعربي بالمجان.</p>
</section>
```

- العنوان بيعرّف القسم، والفقرة هي المحتوى.

### 2) أقسام صفحة هبوط
الهيكل الشائع لصفحة منتج.

```html
<main>
  <section>
    <h2>المميزات</h2>
    <p>سريع وبسيط ومجاني.</p>
  </section>
  <section>
    <h2>الأسعار</h2>
    <p>مجاناً للأبد.</p>
  </section>
  <section>
    <h2>تواصل معانا</h2>
    <p>ابعتلنا رسالة.</p>
  </section>
</main>
```

- كل قسم بعنوان `<h2>` تحت `<h1>` الصفحة، فبيتكوّن هيكل واضح: الصفحة ثم الأقسام.
- لو فتحت الصفحة بقارئ شاشة وطلبت قايمة العناوين هتلاقي: المميزات، الأسعار، تواصل معانا.
- الأقسام دي بتتكرر في كل صفحة هبوط تقريباً، فهي أشهر استخدام لـ `<section>`.

### 3) section بـ aria-labelledby
بيتحول لمنطقة (Landmark) بتتنقل بالاختصارات.

```html
<section aria-labelledby="faq">
  <h2 id="faq">أسئلة شائعة</h2>
  <details>
    <summary>الكورسات مجانية؟</summary>
    <p>أيوه، كلها مجانية.</p>
  </details>
</section>
```

- قارئ الشاشة هيعلن «منطقة: أسئلة شائعة» فيقدر المستخدم ينط له.

### 4) section جوه section
تقسيم فرعي، والعنوان بيبقى `<h3>`.

```html
<section>
  <h2>الكورسات</h2>
  <section>
    <h3>HTML</h3>
    <p>أساس الويب.</p>
  </section>
  <section>
    <h3>CSS</h3>
    <p>التنسيق.</p>
  </section>
</section>
```

- الـ `<h3>` تحت `<h2>` عشان الترتيب منطقي: الأقسام الفرعية بتاخد مستوى عنوان أدنى.
- القسم الأب «الكورسات» بيجمّع قسمين فرعيين، وكل واحد ليه موضوعه (HTML وCSS).
- متنزلش مستوى العنوان من غير سبب: `<h2>` ثم `<h3>` ثم `<h4>` بالترتيب.

### 5) section وarticle مع بعض
الأقسام فيها مقالات مستقلة.

```html
<section>
  <h2>آخر المقالات</h2>
  <article>
    <h3>إزاي تتعلم HTML</h3>
    <p>ابدأ بالأساسيات.</p>
  </article>
  <article>
    <h3>يعني إيه CSS؟</h3>
    <p>اللغة اللي بتجمّل الصفحة.</p>
  </article>
</section>
```

- القسم بيجمّع الموضوع، وكل مقال مستقل ينفع يتشارك لوحده.

### 6) section ولا div؟
الأول فيه موضوع وعنوان، التاني مجرد تنسيق.

```html
<style>
  .row { display: flex; gap: 8px; }
  .col { flex: 1; background: #fef3c7; padding: 6px; }
</style>
<section>
  <h2>الكورسات</h2>
  <div class="row">
    <div class="col">عمود 1</div>
    <div class="col">عمود 2</div>
  </div>
</section>
```

- القسم `<section>` له عنوان، والأعمدة `<div>` للتنسيق فقط.

### 7) تبويبات (Tabs) بـ section
كل لوحة تبويب هي قسم بموضوع.

```html
<style>
  .tabs button { margin: 2px; }
  [hidden] { display: none; }
</style>
<div class="tabs">
  <button onclick="a.hidden=false;b.hidden=true">HTML</button>
  <button onclick="a.hidden=true;b.hidden=false">CSS</button>
</div>
<section id="a"><h2>HTML</h2><p>هيكل الصفحة.</p></section>
<section id="b" hidden><h2>CSS</h2><p>تنسيق الصفحة.</p></section>
```

- بنبدّل `hidden` بين القسمين. (للتبويبات الكاملة في تطبيق حقيقي بنستخدم ARIA إضافية.)

## rules

- parents: أي عنصر بيقبل **Flow content** (زي `<body>` و `<main>` و `<article>` و `<section>`).
- children: **Flow content** (عادةً عنوان وبعده محتوى).
- closing: الوسم الختامي `</section>` إجباري.
- role: `region` لو ليه اسم (`aria-label`/`aria-labelledby`)، وإلا `generic`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### section كحاوية تنسيق
```html bad
<section class="wrapper">
  <section class="inner">
    <p>نص</p>
  </section>
</section>
```
```html good
<div class="wrapper">
  <div class="inner">
    <p>نص</p>
  </div>
</div>
```
ليه؟ مفيش موضوع ولا عنوان، فده `<div>`.

### section من غير عنوان
```html bad
<section>
  <p>كلام من غير عنوان</p>
</section>
```
```html good
<section>
  <h2>العنوان</h2>
  <p>كلام ليه عنوان</p>
</section>
```
ليه؟ القسم بيتعرّف بعنوانه، ومن غيره المتصفح مش بيعتبره جزء ذا معنى في هيكل الصفحة.

### section لمقال مستقل
```html bad
<section>
  <h2>خبر</h2>
  <p>تفاصيل الخبر المستقل…</p>
</section>
```
```html good
<article>
  <h2>خبر</h2>
  <p>تفاصيل الخبر المستقل…</p>
</article>
```
ليه؟ الخبر ينفع يتنشر لوحده فهو `<article>`.

## a11y

- من غير اسم (`aria-label`/`aria-labelledby`) الـ `<section>` مش Landmark، فمفيش اختصار لقارئ الشاشة.
- ماتسمّيش كل الأقسام: اسّم المهم بس، عشان قايمة الـ Landmarks ما تطولش.
- حافظ على ترتيب العناوين: `<h2>` للقسم، `<h3>` للقسم الفرعي.

## tips

- اسأل نفسك: «هل أقدر أديه عنوان؟». لو أيوه، `<section>`.
- لو اضطريت تخترع عنوان مخفي بـ CSS فغالباً الأفضل `<div>`.
- كل `<section>` تحت عنوان الصفحة `<h1>` بيبقى عنوانه `<h2>`.
- مش ضروري تحط `<section>` جوه `<main>`: ممكن يبقى لكل الصفحة.

## quiz

### إمتى تستخدم `<section>` بدل `<div>`؟
- [ ] دايماً
- [x] لما يبقى للمحتوى موضوع وعنوان مشترك
- [ ] لما أحتاج تنسيق
- [ ] لما أحتاج جافاسكربت
الـ `<section>` له معنى (موضوع)، والـ `<div>` للتنسيق.

### إيه اللي بيحوّل `<section>` لـ Landmark؟
- [ ] class
- [x] aria-label أو aria-labelledby
- [ ] id
- [ ] style
من غير اسم، هو مجرد حاوية.

### خبر مستقل ينفع يتشارك لوحده. أنهي عنصر؟
- [ ] `<section>`
- [ ] `<div>`
- [x] `<article>`
- [ ] `<aside>`
المحتوى المستقل هو `<article>`.

## refs

- [MDN: section](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section)
- [WHATWG: The section element](https://html.spec.whatwg.org/multipage/sections.html#the-section-element)
