---
id: nav
kind: element
cat: sections
tag: nav
title: عنصر التنقل (nav)
en: HTML navigation section element
status: stable
display: block
void: no
support: all
summary: عنصر nav بيلفّ مجموعة روابط التنقل الرئيسية (قايمة الموقع، فهرس الصفحة، مسار التنقل) وبيتحول لمنطقة navigation بتساعد قارئ الشاشة ينط عليها بسرعة.
keywords: nav, تنقل, قايمة, منيو, navigation, menu, breadcrumb, مسار, فهرس, landmark, aria-label, navbar
related: ul, a, header, footer, main, aside, section, ol, details
---

## intro

كل موقع محترم فيه حتة فيها روابط بتوديك للصفحات الأساسية: «الرئيسية»، «الكورسات»، «اتصل بينا». الحتة دي اسمها **قايمة التنقل**، والعنصر اللي بيعلّم عليها في HTML هو `<nav>` (اختصار **Navigation**). هو حاوية بتلفّ الروابط دي وبتقول للمتصفح ولقارئ الشاشة: «اللي جوايا ده روابط تنقل رئيسية، مش مجرد روابط عادية في نص كلام».

الـ `<nav>` **ما بيرسمش** قايمة ولا شكل معيّن. هو حاوية Block فاضية من التنسيق. اللي بيدّي الشكل (أفقي أو رأسي، بخلفية أو من غير) هو الـ CSS. والعادة إنك بتحط جواه قايمة `<ul>` وكل رابط `<a>` في `<li>`، لأن قايمة الروابط في الحقيقة قايمة، وقارئ الشاشة بيقول «قايمة من 5 عناصر» فتعرف حجمها قبل ما تدخل فيها.

الفايدة الحقيقية جاية من إن المتصفح بيدّيه دور (**role**) اسمه `navigation`، وده بيخلّيه **علامة طريق (Landmark)**. شخص بيستخدم قارئ شاشة يقدر يضغط اختصار ويقفز بين المناطق الكبيرة (المنيو، المحتوى الرئيسي، التذييل) من غير ما يسمع الصفحة كلها. ولو شلت `<nav>` وحطيت `<div>` هيضيع الاختصار ده.

مهم تفهم **إمتى** تستخدمه: مش لازم كل مجموعة روابط تتلف في `<nav>`. الـ `<nav>` للتنقل **الأساسي** في الموقع أو في الصفحة، زي المنيو الرئيسي وفهرس المحتويات ومسار التنقل (Breadcrumb) وأرقام الصفحات. أما مجموعة روابط عادية في التذييل (سياسة الخصوصية، شروط الاستخدام) فعادةً مش محتاجة `<nav>` لوحدها، `<footer>` كفاية. ولو عندك أكتر من `<nav>` في الصفحة لازم تفرّق بينهم بـ `aria-label`.

> [!analogy] تخيّل لوحة الإرشادات في مول كبير: «المطاعم → الطابق التالت»، «السينما → الطابق الرابع». اللوحة دي مش بتوصفلك المحلات، هي بس **بتوجّهك**. ده الـ `<nav>`: لوحة إرشادات الموقع.

> [!key] `<nav>` للتنقل **الرئيسي** بس. وقارئ الشاشة بيعتبره Landmark، فلو عندك أكتر من واحد لازم `aria-label` مختلف لكل واحد.

## try

ده منيو أفقي بسيط. جرّب تضيف رابط جديد، أو غيّر `aria-current` لرابط تاني.

```html
<style>
  nav ul { display: flex; gap: 12px; list-style: none; padding: 0; margin: 0;
           background: #111; padding: 10px; border-radius: 8px; }
  nav a { color: #fff; text-decoration: none; padding: 6px 12px; border-radius: 6px; }
  nav a[aria-current="page"] { background: #39ff14; color: #000; }
</style>
<nav aria-label="القايمة الرئيسية">
  <ul>
    <li><a href="#" aria-current="page">الرئيسية</a></li>
    <li><a href="#">الكورسات</a></li>
    <li><a href="#">المدونة</a></li>
    <li><a href="#">اتصل بينا</a></li>
  </ul>
</nav>
```

## syntax

```html nolive
<nav aria-label="القايمة الرئيسية">
  <ul>
    <li><a href="/">الرئيسية</a></li>
    <li><a href="/courses">الكورسات</a></li>
  </ul>
</nav>
```

- `<nav aria-label="…">` — **الوسم الافتتاحي**، و`aria-label` بيدّي القايمة اسم (واجب لو في أكتر من nav).
- `<ul>` و `<li>` — القايمة اللي جواه (عادةً).
- `<a href="…">` — روابط التنقل الفعلية.
- `</nav>` — **الوسم الختامي** إجباري.

## use

- لقايمة الموقع الرئيسية (الأشهر).
- لفهرس محتويات صفحة طويلة (روابط بتنط لأقسام نفس الصفحة).
- لمسار التنقل (Breadcrumb): «الرئيسية › الكورسات › HTML».
- لأرقام الصفحات (Pagination) في نتايج البحث والمدونات.
- لقايمة جانبية فيها روابط الأقسام الأساسية.

## avoid

- متلفّش **كل** مجموعة روابط في `<nav>`: روابط التذييل الصغيرة والروابط جوه نص الكلام ملهاش لزوم.
- متحطش أكتر من `<nav>` من غير `aria-label` مختلف.
- متستخدمهوش للتنقل بين أجزاء صفحة بالجافاسكربت بس (زي Tabs): ده شغل `role="tablist"`.
- متحطش جواه `<main>`: المحتوى الرئيسي مش جزء من التنقل.

## attributes

مالوش خصائص خاصة، لكن بيقبل **الخصائص العامة** ([[global-attributes]]) و**خصائص ARIA**.

### aria-label
بتدّي القايمة اسم بيتقرا لقارئ الشاشة، زي «القايمة الرئيسية» أو «مسار التنقل». **مهمة جداً** لو عندك أكتر من `<nav>` في الصفحة.

```html nolive
<nav aria-label="القايمة الرئيسية">…</nav>
<nav aria-label="مسار التنقل">…</nav>
```

### aria-labelledby
نفس فكرة `aria-label` بس بتاخد الاسم من عنصر تاني ظاهر في الصفحة (زي عنوان `<h2>`) بدل ما تكتبه.

```html nolive
<h2 id="toc">فهرس المحتويات</h2>
<nav aria-labelledby="toc">…</nav>
```

### class
اسم بنستهدفه بالـ CSS، زي `class="navbar"`.

### id
اسم فريد، بنستخدمه لو عايز رابط تخطّي (Skip link) أو تتحكم فيه بالجافاسكربت.

## examples

### 1) أبسط nav
مجرد روابط جوه `<nav>`. من غير CSS هتظهر كروابط عادية، بس قارئ الشاشة هيعتبرها منطقة تنقل.

```html
<nav>
  <a href="#">الرئيسية</a> |
  <a href="#">الكورسات</a> |
  <a href="#">اتصل بينا</a>
</nav>
```

- ده شغال، لكن الأحسن تلفّ الروابط في `<ul>`.

### 2) nav بقايمة (الشكل الصح)
الروابط جوه `<ul>` عشان قارئ الشاشة يعلن عددها.

```html
<nav aria-label="القايمة الرئيسية">
  <ul>
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">الكورسات</a></li>
    <li><a href="#">المدونة</a></li>
  </ul>
</nav>
```

- «قايمة من 3 عناصر» هو اللي قارئ الشاشة هيقوله.
- الشكل الافتراضي نقط ومسافة، والـ CSS بيشيلهم لو عايز.

### 3) تحويلها لمنيو أفقي بالـ CSS
نفس HTML بس بتنسيق مختلف: Flexbox وشيل النقط.

```html
<style>
  .menu { display: flex; gap: 6px; list-style: none; margin: 0; padding: 8px;
          background: #0f172a; border-radius: 10px; }
  .menu a { display: block; padding: 8px 14px; color: #e2e8f0; text-decoration: none; border-radius: 6px; }
  .menu a:hover { background: #1e293b; }
</style>
<nav aria-label="القايمة الرئيسية">
  <ul class="menu">
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">الكورسات</a></li>
    <li><a href="#">المدونة</a></li>
  </ul>
</nav>
```

- الـ `<nav>` نفسه ما اتغيّرش، التنسيق كله على `<ul>` و `<a>`.

### 4) إظهار الصفحة الحالية
بنستخدم `aria-current="page"` على رابط الصفحة اللي إنت فيها.

```html
<style>
  nav a { padding: 4px 10px; text-decoration: none; color: #2563eb; }
  nav a[aria-current="page"] { background: #2563eb; color: #fff; border-radius: 6px; }
</style>
<nav aria-label="القايمة الرئيسية">
  <a href="#">الرئيسية</a>
  <a href="#" aria-current="page">الكورسات</a>
  <a href="#">المدونة</a>
</nav>
```

- `aria-current="page"` بيقول لقارئ الشاشة «ده الرابط الحالي»، والـ CSS بيلوّنه للي بيشوف.
- متعتمدش على اللون لوحده (راجع قسم الوصولية).

### 5) مسار التنقل (Breadcrumb)
قايمة مرتبة `<ol>` لأن الترتيب مهم.

```html
<style>
  .bc { list-style: none; display: flex; gap: 6px; padding: 0; }
  .bc li + li::before { content: "›"; margin-inline-end: 6px; color: #888; }
</style>
<nav aria-label="مسار التنقل">
  <ol class="bc">
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">الكورسات</a></li>
    <li aria-current="page">HTML</li>
  </ol>
</nav>
```

- الـ `›` جاية من CSS (`::before`) مش مكتوبة في HTML، فقارئ الشاشة مش هيقراها.
- آخر عنصر هو الصفحة الحالية، من غير رابط.

### 6) أكتر من nav في الصفحة
لازم كل واحد ياخد اسم مختلف.

```html
<header>
  <nav aria-label="القايمة الرئيسية">
    <a href="#">الرئيسية</a> <a href="#">الكورسات</a>
  </nav>
</header>
<main>
  <nav aria-label="فهرس المقال">
    <ul>
      <li><a href="#s1">المقدمة</a></li>
      <li><a href="#s2">الأمثلة</a></li>
    </ul>
  </nav>
  <h2 id="s1">المقدمة</h2>
  <h2 id="s2">الأمثلة</h2>
</main>
```

- قارئ الشاشة هيعلن «تنقل: القايمة الرئيسية» و «تنقل: فهرس المقال»، فيعرف الفرق.

### 7) رابط تخطّي المنيو (Skip link)
رابط مخفي بيظهر لما تضغط Tab، بيوديك للمحتوى مباشرةً، وبيريّح اللي بيتنقل بالكيبورد.

```html
<style>
  .skip { position: absolute; top: -40px; right: 8px; background: #000; color: #fff; padding: 8px 12px; }
  .skip:focus { top: 8px; }
</style>
<a class="skip" href="#content">تخطّى للمحتوى</a>
<nav aria-label="القايمة الرئيسية">
  <a href="#">الرئيسية</a> <a href="#">الكورسات</a> <a href="#">المدونة</a>
</nav>
<main id="content">
  <p>جرّب اضغط Tab مرة واحدة في المعاينة وشوف الرابط بيظهر.</p>
</main>
```

- من غير الرابط ده مستخدم الكيبورد لازم يعدّي على كل روابط المنيو في كل صفحة.

### 8) منيو بتتفتح وتتقفل (من غير جافاسكربت)
بنستخدم `<details>` جوه الـ `<nav>` عشان منيو الموبايل.

```html
<nav aria-label="القايمة الرئيسية">
  <details>
    <summary>القايمة ☰</summary>
    <ul>
      <li><a href="#">الرئيسية</a></li>
      <li><a href="#">الكورسات</a></li>
      <li><a href="#">اتصل بينا</a></li>
    </ul>
  </details>
</nav>
```

- الضغط على `<summary>` بيفتح ويقفل القايمة بدون سطر JavaScript.
- ده حل بسيط لمنيو الموبايل، وفي مواقع كتير بتستخدم أزرار وجافاسكربت بدلاً منه.

## rules

- parents: أي عنصر بيقبل **Flow content**، وممكن يتحط جوه `<header>` أو `<footer>` أو `<aside>` أو `<section>` أو `<body>` (لكن مش جوه `<address>`).
- children: **Flow content**. ومينفعش يحتوي `<main>`.
- closing: الوسم الختامي `</nav>` إجباري.
- role: `navigation`.
- dom: `HTMLElement`.
- layout: `display: block`. وهو من عناصر الأقسام (Sectioning content).

## mistakes

### nav لكل مجموعة روابط
```html bad
<nav>
  <a href="/terms">الشروط</a>
  <a href="/privacy">الخصوصية</a>
</nav>
<p>اقرأ <nav><a href="/more">المزيد</a></nav> هنا.</p>
```
```html good
<footer>
  <a href="/terms">الشروط</a>
  <a href="/privacy">الخصوصية</a>
</footer>
<p>اقرأ <a href="/more">المزيد</a> هنا.</p>
```
ليه؟ الـ `<nav>` للتنقل الرئيسي. لو كل حاجة nav، الـ Landmark هيبقى كتير وقارئ الشاشة هيتخبّط. كمان `<nav>` عنصر Block وماينفعش يتحط جوه `<p>`.

### أكتر من nav من غير تسمية
```html bad
<nav><a href="/">الرئيسية</a></nav>
<nav><a href="#s1">المقدمة</a></nav>
```
```html good
<nav aria-label="القايمة الرئيسية"><a href="/">الرئيسية</a></nav>
<nav aria-label="فهرس المقال"><a href="#s1">المقدمة</a></nav>
```
ليه؟ قارئ الشاشة هيقول «تنقل» مرتين من غير ما يفرّق بينهم.

### استخدام div بدل nav
```html bad
<div class="nav">
  <a href="/">الرئيسية</a>
</div>
```
```html good
<nav>
  <a href="/">الرئيسية</a>
</nav>
```
ليه؟ الـ `<div>` مالوش معنى، ومحرك البحث وقارئ الشاشة مش هيعرفوا إنه تنقل.

## a11y

- الـ `<nav>` بيعمل Landmark بدور `navigation`. أكتر من واحد: **لازم** `aria-label` مختلف.
- متكتبش كلمة «قايمة» أو «تنقل» جوه الـ `aria-label` («قايمة تنقل رئيسية»): قارئ الشاشة بيقول «تنقل» لوحده، فهيتقرا «تنقل قايمة تنقل رئيسية».
- استخدم `aria-current="page"` للصفحة الحالية، ومتعتمدش على اللون لوحده للتفرقة.
- حط رابط تخطّي (Skip link) في أول الصفحة قبل المنيو الطويل.
- لو بتخبّي المنيو في الموبايل، متستخدمش `display:none` على الروابط لو عايزها تتقرا؛ `display:none` بيخبّيها عن الكل.

## tips

- المنيو الرئيسي عادةً جوه `<header>`، لكن مش شرط.
- لو المنيو هتتحول لقايمة منسدلة، خلّي الأساس `<ul>` في `<li>` والـ CSS يعمل الباقي.
- جرّب تقفل CSS وتشوف الصفحة: لو لسه منطقية، يبقى الـ HTML سليم.
- الروابط الداخلية في الفهرس بتنط لـ `id` في الصفحة، فخلّي الـ `id` فريدة.

## quiz

### إيه الدور (role) اللي المتصفح بيدّيه لـ `<nav>`؟
- [ ] `banner`
- [x] `navigation`
- [ ] `main`
- [ ] `menu`
الـ `<nav>` بياخد دور `navigation`، فبيبقى علامة طريق (Landmark) لقارئ الشاشة.

### عندك منيو رئيسي وفهرس للمقال. تعمل إيه؟
- [ ] تحط الاتنين في `<nav>` واحد
- [x] تعمل `<nav>` لكل واحد وتدّي كل واحد `aria-label` مختلف
- [ ] تستخدم `<div>` للتاني
- [ ] تحط واحد جوه التاني
كل منطقة تنقل لازم تتفرّق باسم مختلف.

### أنهي مجموعة روابط ملهاش لزوم تتلفّ في `<nav>`؟
- [ ] المنيو الرئيسي
- [ ] مسار التنقل
- [x] رابطين صغيرين جوه فقرة نص
- [ ] أرقام الصفحات
الـ `<nav>` للتنقل الرئيسي. الروابط العادية جوه نص الكلام ميتلفوش فيه.

## refs

- [MDN: nav](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
- [WHATWG: The nav element](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)
