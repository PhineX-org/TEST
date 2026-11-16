---
id: header
kind: element
cat: sections
tag: header
title: عنصر الترويسة
en: HTML header element
status: stable
display: block
void: no
support: all
summary: بيجمع العناصر التمهيدية بتاعة الصفحة أو المقال أو القسم، زي العنوان والشعار وقايمة التنقل، ولو على مستوى الصفحة بيبقى منطقة banner.
keywords: هيدر, ترويسة, رأس الصفحة, مقدمة, header, banner, logo, شعار, landmark
related: nav, h1, hgroup, article, section, footer, main, search
---

## intro

عنصر `<header>` معناه «الترويسة» أو «راس المكان». بيمثّل **مجموعة عناصر تمهيدية**: أول حاجة القارئ بيشوفها في الصفحة أو المقال أو القسم، زي العنوان، الشعار (Logo)، قايمة التنقل `<nav>`، أو صندوق البحث. هو **حاوية** وبس: مش بيرسم شكل ولا لون لوحده، لكنه بيقول للمتصفح ولقارئ الشاشة (Screen reader: برنامج بيقرا الصفحة بصوت عالي للناس اللي مش بتشوف) «اللي جوايا ده مقدمة المكان اللي أنا فيه».

أهم نقطة لازم تفهمها: الـ `<header>` **مش بس لأعلى الصفحة**. تقدر تستخدمه أكتر من مرة في نفس الصفحة: مرة للصفحة كلها، ومرة جوه كل `<article>`، ومرة جوه `<section>` لو القسم ليه مقدمة. كل واحد منهم بيبقى مقدمة لـ **أقرب أب** ليه. يعني الـ `<header>` اللي جوه مقال هو مقدمة المقال ده بس، مش مقدمة الموقع.

وهنا بييجي الجزء اللي بيتلخبط فيه كتير. لو الـ `<header>` على مستوى الصفحة (مش جوه `<article>` ولا `<aside>` ولا `<main>` ولا `<nav>` ولا `<section>`) فالمتصفحات بتعتبره **منطقة مهمة اسمها banner** (بنسميها Landmark: يعني علامة طريق بتخلّي قارئ الشاشة ينط عليها بسرعة). أما لو هو جوه واحد من العناصر دي فبيبقى مجرد حاوية عادية من غير الدور ده. وعشان كده المفروض يبقى عندك **banner واحد بس** في الصفحة.

كمان متخلطش بينه وبين حاجتين شبهه في الاسم. الـ `<head>` ده جزء **مخفي** من الصفحة فيه `<title>` و`<meta>` ومش بيظهر للمستخدم، أما `<header>` فبيظهر جوه `<body>`. والـ `<h1>` ده **عنوان** واحد، أما `<header>` فممكن يشيل العنوان ده ومعاه حاجات تانية.

> [!analogy] تخيّل الجرنال: في أعلى الصفحة الأولى فيه اسم الجرنال والشعار وفهرس سريع، ده هيدر الجرنال كله (الـ banner). وكل خبر جوه الجرنال له عنوان وسطر صغير فيه اسم المحرر والتاريخ، ده هيدر الخبر، وهو مش اسم الجرنال.

> [!key] الـ `<header>` بيبقى banner **بس** لو مش جوه `<article>` أو `<aside>` أو `<main>` أو `<nav>` أو `<section>`. غير كده هو مقدمة لأبوه من غير دور خاص.

## try

الصندوق الأزرق ده هو الـ `<header>` (لوّنّاه عشان نشوفه). جرّب تضيف جواه شعار أو رابط، أو امسح الـ `<p>` اللي جواه وشوف إيه اللي بيحصل.

```html
<style>
  header { background:#dbeafe; color:#111; padding:8px;
           border:2px solid #2563eb }
</style>
<header>
  <h1>مدونتي</h1>
  <p>بكتب عن البرمجة بالبسيط</p>
</header>
<p>هنا بيبدأ محتوى الصفحة…</p>
```

## syntax

```html nolive
<header>
  <h1>عنوان الصفحة أو المقال</h1>
  <nav aria-label="القايمة الرئيسية">…</nav>
</header>
```

- `<header>` — **الوسم الافتتاحي**: بيبدأ الترويسة. مفيش له خصائص خاصة.
- `<h1>` — عادةً أهم حاجة جواه: عنوان الصفحة أو المقال أو القسم.
- `<nav>` — اختياري: قايمة تنقل لو الترويسة بتاعة الصفحة.
- `…` — أي محتوى Flow تاني: شعار `<img>`، صندوق بحث، اسم كاتب، تاريخ.
- `</header>` — **الوسم الختامي**: لازم يتكتب.

## use

- ترويسة الموقع كله: الشعار واسم الموقع وقايمة التنقل وصندوق البحث، مباشرةً جوه `<body>`.
- ترويسة المقال `<article>`: العنوان واسم الكاتب وتاريخ النشر.
- ترويسة قسم `<section>` فيه عنوان وجملة تعريفية قبل التفاصيل.
- مقدمة صندوق أو كارت: صورة صغيرة وعنوان فوق باقي المحتوى.
- لما تعوز تجمّع عنوان وعنوان فرعي (مع `<hgroup>`) وتفصلهم عن باقي المقال.

## avoid

- لو عايز بس تغلّف كام عنصر عشان تظبط الشكل بالـ CSS: استخدم `<div>` اللي مالوش معنى.
- متحطش `<header>` جوه `<head>`: ده خطأ، الـ `<head>` ليه عناصره الخاصة (`<title>` و`<meta>` و`<link>`).
- متستخدمهوش للمحتوى الأساسي للصفحة؛ ده مكانه `<main>`.
- متحطش `<header>` جوه `<header>` ولا جوه `<footer>`: مش مسموح.
- متكتبش `role="banner"` عليه يدوياً؛ هو بياخده لوحده لما يكون على مستوى الصفحة.

## attributes

عنصر `<header>` **ملوش خصائص خاصة بيه**، بياخد بس [[global-attributes|الخصائص العامة]] اللي أي عنصر بياخدها، زي `class` و`id` و`lang` و`hidden`. مفيش داعي تكتب `role="banner"` لأنه الـ role الضمني (Implicit role: اللي المتصفح بيدّيه للعنصر من غير ما تكتبه) لما يكون على مستوى الصفحة. ولو الـ `<header>` جوه `<article>` أو `<section>` وكتبت عليه `role="banner"` بإيدك، هتعمل banner تاني في الصفحة وده غلط.

## examples

### 1) شكل الصفحة: header و main و footer
أول خطوة هي إنك تشوف **مكان** الـ `<header>` في هيكل الصفحة. بنحطه أول حاجة جوه `<body>`، وبعده `<main>` للمحتوى الأساسي، وبعدهم `<footer>`. لوّنّا كل واحد عشان تشوف الفرق.

```html
<style>
  header, main, footer { padding:8px; color:#111; margin:4px 0 }
  header { background:#dbeafe }
  main { background:#dcfce7 }
  footer { background:#fef9c3 }
</style>
<header>الترويسة: اسم الموقع</header>
<main>المحتوى الأساسي للصفحة</main>
<footer>الفوتر: حقوق النشر</footer>
```

- كل واحد من التلاتة بياخد سطر لوحده لأنهم عناصر `block`.
- الـ `<header>` هنا بيبقى banner لأنه مش جوه أي عنصر قسم.

### 2) شعار وقايمة تنقل
أشهر استخدام: الشعار على جنب وقايمة الروابط `<nav>` جنبه. الشعار صورة `<img>` جوه رابط `<a>` يرجّعك للرئيسية. الـ `alt` بتاع الصورة بيوصف **وجهة** الرابط.

```html
<style>
  header { display:flex; align-items:center; gap:16px; padding:8px;
           background:#dbeafe; color:#111 }
  nav ul { display:flex; gap:12px; list-style:none; margin:0; padding:0 }
</style>
<header>
  <a href="index.html">
    <img src="logo.png" alt="الصفحة الرئيسية" width="48" height="48">
  </a>
  <nav aria-label="القايمة الرئيسية">
    <ul>
      <li><a href="courses.html">الكورسات</a></li>
      <li><a href="about.html">من نحن</a></li>
    </ul>
  </nav>
</header>
```

- `display:flex` بيرص الشعار والقايمة جنب بعض (ده شغل CSS مش شغل الـ HTML).
- القايمة نفسها `<ul>` و`<li>` جوه `<nav>`، وده الشكل الصح للتنقل.

### 3) عنوان وعنوان فرعي مع hgroup
لو عندك عنوان ومعاه سطر توضيحي، لفّهم في `<hgroup>` جوه الـ `<header>`. الـ `<hgroup>` بيقول للمتصفح «دول عنوان واحد وعنوانه الفرعي»، فالسطر التاني ميتحسبش عنوان مستقل.

```html
<style>
  header { background:#dbeafe; color:#111; padding:8px }
  p { margin:4px 0 }
</style>
<header>
  <hgroup>
    <h1>تعلّم HTML</h1>
    <p>من الصفر لحد صفحة كاملة</p>
  </hgroup>
</header>
```

- `<hgroup>` بيجمّع العنوان `<h1>` مع الفقرة `<p>` اللي بتشرحه.
- الـ `<header>` برّه بيضيف معنى «ده مقدمة» لكل ده.

### 4) ترويسة مقال: عنوان وكاتب وتاريخ
هنا بقى الـ `<header>` **جوه `<article>`**. معناه إنه ترويسة المقال ده بس، وبيتحط فيه العنوان وبيانات التعريف (Meta info) زي اسم الكاتب والتاريخ. وده مش banner لأنه جوه عنصر قسم.

```html
<style>
  article { border:2px solid #16a34a; padding:8px; color:#111 }
  article header { background:#dcfce7; padding:6px }
</style>
<article>
  <header>
    <h2>إزاي تذاكر HTML؟</h2>
    <p>بقلم أحمد، <time datetime="2026-10-26">26 أكتوبر 2026</time></p>
  </header>
  <p>ابدأ بالأساسيات واكتب كل يوم صفحة صغيرة.</p>
</article>
```

- `<time datetime="...">` بيكتب التاريخ بصيغة يفهمها الكمبيوتر (سنة-شهر-يوم).
- الـ `<h2>` هنا وليس `<h1>` لأن المقال جزء من صفحة أكبر، وده اختيار مش إجباري.

### 5) ترويسة قسم
`<header>` ينفع كمان جوه `<section>` عشان يجمّع عنوان القسم مع جملة تعريفية. لو القسم مفيهوش غير عنوان، متحتاجش `<header>` أصلاً، حط العنوان على طول.

```html
<style>
  section { border:2px dashed #7c3aed; padding:8px; color:#111 }
  section header { background:#ede9fe; padding:6px }
</style>
<section>
  <header>
    <h2>الكورسات المتاحة</h2>
    <p>اختار الكورس اللي يناسب مستواك.</p>
  </header>
  <ul>
    <li>HTML للمبتدئين</li>
    <li>CSS من الصفر</li>
  </ul>
</section>
```

- الـ `<header>` جوه `<section>` هنا مقدمة القسم، مش banner.
- جرّب تمسح الـ `<header>` وتسيب `<h2>`: المعنى هيفضل واضح.

### 6) ترويسة بصندوق بحث
الترويسة غالباً فيها بحث. عنصر `<search>` معموله مخصوص لصندوق البحث، وجواه `<form>`. ده عنصر حديث (متصفحات 2023 وبعد كده)؛ لو بتدعم متصفحات أقدم اكتب `role="search"` على الـ `<form>`.

```html
<style>
  header { display:flex; justify-content:space-between; padding:8px;
           background:#dbeafe; color:#111; align-items:center }
</style>
<header>
  <strong>موقع الكورسات</strong>
  <search>
    <form action="search.html">
      <label>ابحث: <input type="search" name="q"></label>
      <button type="submit">بحث</button>
    </form>
  </search>
</header>
```

- `<search>` بيعلّم المنطقة كمنطقة بحث، و`<form>` جواه بيعمل الشغل الفعلي.
- `<label>` بيربط الكلمة بالحقل، فقارئ الشاشة يعرف الحقل ده لإيه.

### 7) صفحة كاملة بترويسة المقال وترويسة الموقع
الصورة الكاملة: **banner** للموقع فيه الشعار والقايمة، وجوه `<main>` مقال بترويسته الخاصة، و`<footer>` تحت. عندك هنا `<header>` اتنين: الأول banner والتاني مقدمة المقال بس.

```html h=330
<style>
  body { color:#111 }
  header { padding:6px; margin:4px 0 }
  .site { background:#dbeafe; border:2px solid #2563eb }
  article { border:2px solid #16a34a; padding:6px }
  article header { background:#dcfce7 }
  footer { background:#fef9c3; padding:6px }
</style>
<header class="site">
  <strong>أكاديمية الكود</strong> |
  <nav style="display:inline">
    <a href="home.html">الرئيسية</a> -
    <a href="blog.html">المدونة</a>
  </nav>
</header>
<main>
  <article>
    <header>
      <h1>يعني إيه Semantic HTML؟</h1>
      <p><time datetime="2026-10-26">26 أكتوبر 2026</time></p>
    </header>
    <p>معناها نختار العنصر اللي بيعبّر عن المعنى مش الشكل.</p>
  </article>
</main>
<footer><small>© 2026 أكاديمية الكود</small></footer>
```

- `<header class="site">` أول حاجة في `<body>` فهو الـ banner الوحيد.
- `<header>` اللي جوه `<article>` بياخد عنوان المقال، ومش banner.
- جرّب تنقل `<header class="site">` جوه `<main>` وشوف إزاي معناه بيتغير (هيبقى مجرد ترويسة جوه المحتوى).

## rules

- parents: أي عنصر بيقبل محتوى Flow زي `<body>` و`<article>` و`<section>` و`<main>` و`<div>`. مينفعش جوه `<footer>` ولا `<address>` ولا `<header>` تاني ولا `<head>`.
- children: محتوى Flow (عناوين `<h1>` وفقرات `<p>` وقوايم `<ul>` و`<nav>` و`<img>` و`<form>`)، **من غير** أي `<header>` أو `<footer>` أو `<main>` جواه.
- closing: **لازم** يتكتب `</header>` دايماً.
- role: `banner` لو على مستوى الصفحة (مش جوه `<article>` أو `<aside>` أو `<main>` أو `<nav>` أو `<section>`). غير كده بيبقى `generic` يعني مالوش دور خاص.
- dom: `HTMLElement`
- layout: `block` (بياخد سطر لوحده وبياخد عرض الأب كله).

## mistakes

### header جوه header
```html bad
<header>
  <header>
    <h1>الموقع</h1>
  </header>
</header>
```
```html good
<header>
  <h1>الموقع</h1>
</header>
```
ليه ده غلط؟ لأن محتوى الـ `<header>` ممنوع يحتوي على `<header>` أو `<footer>` تاني. الترويسة هي مقدمة بتاعة أبوها، ومفيش معنى لمقدمة جوه مقدمة. لو عايز تنظّم الأجزاء جواها استخدم `<div>`.

### حطيت header جوه head
```html bad
<head>
  <title>موقعي</title>
  <header>اسم الموقع</header>
</head>
```
```html good
<head>
  <title>موقعي</title>
</head>
<body>
  <header>اسم الموقع</header>
</body>
```
ليه؟ لأن `<head>` للمعلومات المخفية بس. لو حطيت `<header>` جواه المتصفح بيقفل الـ `<head>` أول ما يشوفه ويبدأ `<body>` بنفسه، وده بيبوّظ ترتيب الصفحة. الترويسة اللي المستخدم بيشوفها مكانها جوه `<body>`.

### الاعتقاد إن كل header هو banner
```html bad
<article>
  <header role="banner">
    <h2>عنوان المقال</h2>
  </header>
</article>
```
```html good
<article>
  <header>
    <h2>عنوان المقال</h2>
  </header>
</article>
```
ليه؟ الـ banner المفروض يبقى واحد بس للصفحة كلها. لو فرضت `role="banner"` على ترويسة مقال هتعمل منطقة تانية بنفس الاسم، وقارئ الشاشة يتلخبط. سيب الـ `<header>` جوه المقال من غير role، هو أصلاً بيعمل شغله.

## a11y

- الـ `<header>` على مستوى الصفحة بيتحوّل لـ landmark اسمها **banner**، فمستخدم قارئ الشاشة يقدر ينط عليها من قايمة المناطق.
- الـ `<header>` جوه `<article>` أو `<section>` مش landmark، فمفيش خطر إنك تعمل مناطق كتير مالهاش لازمة.
- لازم يكون عندك banner واحد بس. لو عندك ترويسة تانية على مستوى الصفحة (غلط) هتبقى أكتر من واحد.
- لو الشعار صورة جوه رابط، اكتب `alt` يوصف الوجهة («الصفحة الرئيسية») مش شكل الصورة.
- ترتيب الكود هو ترتيب القراءة، فخلّي الـ `<header>` أول حاجة في `<body>` واستخدم الـ CSS لو عايز تغيّر مكانه على الشاشة.

## tips

- اتعوّد تكتب `<header>` و`<main>` و`<footer>` في كل صفحة؛ التلاتة مع بعض بيدّوا الصفحة هيكل واضح.
- لو عايز تسمّي الـ banner كمان ما تحتاجش `aria-label`، لأنه واحد بس ومعروف.
- متحطش `<h1>` في كل `<header>` من غير تفكير؛ خلّي كل عنوان بترتيبه المنطقي (`<h1>` ثم `<h2>`…).

## quiz

### امتى بيبقى الـ `<header>` منطقة banner؟
- [ ] دايماً، في أي مكان
- [x] لما يكون على مستوى الصفحة ومش جوه `<article>` أو `<aside>` أو `<main>` أو `<nav>` أو `<section>`
- [ ] لما نكتب جواه `<h1>` بس
- [ ] لما يكون جوه `<head>`

الـ banner بيتحدد بمكان الـ `<header>` مش بمحتواه. لو جوه عنصر قسم بيبقى مقدمة لأبوه من غير دور banner.

### مين الكلام الصح عن `<header>` و`<head>`؟
- [ ] هما نفس العنصر
- [ ] `<head>` بيظهر والـ `<header>` مخفي
- [x] `<head>` جزء مخفي فيه `<title>` و`<meta>`، و`<header>` ترويسة ظاهرة جوه `<body>`
- [ ] الـ `<header>` لازم يتحط جوه `<head>`

الاسمين شبه بعض بس شغلهم مختلف تماماً. الـ `<head>` للمعلومات اللي المتصفح بيحتاجها، والـ `<header>` لمقدمة المحتوى الظاهر.

### إيه المشكلة في الكود ده؟ `<footer><header>…</header></footer>`
- [ ] مفيش مشكلة
- [x] الـ `<footer>` مينفعش يحتوي على `<header>`
- [ ] لازم الـ `<header>` يكون قبل `<footer>`
- [ ] لازم نضيف `role="banner"`

الـ `<header>` و`<footer>` مينفعش أي واحد فيهم يحتوي التاني ولا نفسه. لو عايز تقسّم جوه الفوتر استخدم `<div>`.

### عندك ٣ مقالات في صفحة واحدة، كل واحد له `<header>`. هل ده صح؟
- [x] أيوه، كل `<header>` مقدمة للمقال بتاعه، ومش banner
- [ ] لأ، المسموح `<header>` واحد في الصفحة
- [ ] لأ، لازم نستخدم `<h1>` بدلهم
- [ ] أيوه، وكلهم بيبقوا banner

الصفحة ينفع يكون فيها `<header>` كتير. اللي بيتحدد بواحد بس هو الـ banner، وده الـ `<header>` اللي على مستوى الصفحة.

## refs

- [MDN: عنصر `<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header)
- [WHATWG: The header element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element)
