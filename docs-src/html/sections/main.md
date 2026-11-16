---
id: main
kind: element
cat: sections
tag: main
title: عنصر المحتوى الرئيسي (main)
en: HTML main content element
status: stable
display: block
void: no
support: all
summary: عنصر main بيلفّ المحتوى الأساسي والفريد للصفحة (من غير المنيو والتذييل)، ولازم يبقى واحد بس ظاهر في الصفحة، وبيدّي قارئ الشاشة اختصار يوصل للمحتوى فوراً.
keywords: main, المحتوى الرئيسي, محتوى أساسي, landmark, skip link, تخطي, main content, role main
related: header, nav, footer, article, section, aside, div, search
---

## intro

كل صفحة فيها حاجات **بتتكرر** في كل الصفحات: المنيو، اللوجو، التذييل. وفيها حاجة **فريدة** بتخص الصفحة دي بس: المقال اللي بتقراه، المنتج اللي بتشوفه، الفورم اللي بتملّاه. العنصر `<main>` معمول عشان يلفّ الحاجة الفريدة دي بس، وبيقول للمتصفح: «ده قلب الصفحة، باقي الحاجات حواليه».

الـ `<main>` له قاعدتين مهمين. **الأولى:** يبقى فيه `<main>` واحد بس **ظاهر** في الصفحة. لو عندك واجهة فيها أكتر من «شاشة» (تطبيق بيبدّل بين صفحات)، ممكن يبقى فيه أكتر من واحد في الكود لكن كلهم ما عدا واحد لازم يبقى عليهم خاصية `hidden`. **التانية:** مينفعش يتحط جوه `<article>` ولا `<aside>` ولا `<header>` ولا `<footer>` ولا `<nav>`، لأن ده لازم يبقى محتوى الصفحة كلها مش جزء منها.

زي `<nav>`، الـ `<main>` **Landmark**: له دور `main`، فقارئ الشاشة بيقدر يقفز له بضغطة بدل ما يسمع المنيو كل مرة. وكمان بيستخدم كهدف لرابط «تخطّى للمحتوى» اللي بيظهر في أول الصفحة.

بس لازم تعرف: `<main>` **مش بيأثر على هيكل الصفحة** (Outline) زي ما `<section>` بيعمل، ومش بيرسم أي شكل. هو علامة معنى بس. ومالوش خصائص خاصة. وده بيفرق عن `<div class="main">` لأن الـ div مالوش أي معنى.

> [!analogy] تخيّل مطعم: فيه الاستقبال (header)، ولوحة الإرشادات (nav)، والكاشير (footer). لكن **قاعة الأكل** هي اللي الناس جاية عشانها. ده الـ `<main>`.

> [!key] `<main>` واحد ظاهر بس في الصفحة، ومينفعش يتحط جوه `<article>` أو `<aside>` أو `<header>` أو `<footer>` أو `<nav>`.

## try

لوّنا الـ `<main>` بالأخضر عشان تشوفه. لاحظ إن الـ header والـ footer برّاه.

```html
<style>
  header, footer { background: #e2e8f0; padding: 8px; }
  main { background: #dcfce7; border: 2px solid #16a34a; padding: 12px; min-height: 80px; }
</style>
<header>الهيدر: شعار ومنيو</header>
<main>
  <h1>كورس HTML</h1>
  <p>ده المحتوى الأساسي للصفحة. بيتغيّر من صفحة لصفحة.</p>
</main>
<footer>الفوتر: حقوق النشر</footer>
```

## syntax

```html nolive
<body>
  <header>…</header>
  <main id="content">
    <h1>عنوان الصفحة</h1>
    …
  </main>
  <footer>…</footer>
</body>
```

- `<main>` — **الوسم الافتتاحي**، عادةً ابن مباشر لـ `<body>`.
- `id="content"` — اختياري، بنستخدمه كهدف لرابط التخطّي.
- `</main>` — **الوسم الختامي** إجباري.

## use

- للمحتوى الأساسي لأي صفحة: المقال، المنتج، الفورم، لوحة التحكم.
- كهدف لرابط «تخطّى للمحتوى».
- لتحديد المحتوى اللي هيتعمله فهرسة أو قراءة (Reader mode في المتصفحات بتدوّر عليه).

## avoid

- متحطش أكتر من `<main>` ظاهر في صفحة واحدة.
- متحطش جواه المنيو أو الهيدر أو الفوتر بتوع الموقع.
- متحطهوش جوه `<article>` أو `<section>` أو `<aside>`.
- متحطش `<div class="main">` لو تقدر تستخدم `<main>`.
- متعمل `<main>` لأجزاء صغيرة: مفيش غير واحد للصفحة.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]) فقط.

### id
أشهر استخدام: `id="content"` عشان رابط التخطّي يوصله.

### hidden
لو عندك أكتر من `<main>` في تطبيق من صفحة واحدة، كل واحد غير الحالي لازم يتحط عليه `hidden`.

```html nolive
<main id="home">…</main>
<main id="about" hidden>…</main>
```

## examples

### 1) الهيكل الأساسي للصفحة
أشهر استخدام: بين الهيدر والفوتر.

```html
<body>
  <header><h1>موقعي</h1></header>
  <main>
    <p>المحتوى الأساسي هنا.</p>
  </main>
  <footer><p>© 2026</p></footer>
</body>
```

- الـ header والـ footer بيتكرروا في كل الصفحات، والـ main بيتغيّر.

### 2) main مع article
المقال جوه الـ main (العكس ممنوع).

```html
<main>
  <article>
    <h1>إزاي تتعلم HTML</h1>
    <p>ابدأ بالأساسيات…</p>
  </article>
</main>
```

- الـ `<article>` جوه `<main>` ده الصح: المقال جزء من محتوى الصفحة الرئيسي.
- العكس (`<main>` جوه `<article>`) ممنوع، لأن الـ `<main>` لازم يمثّل الصفحة كلها مش مقال واحد منها.
- الـ `<h1>` جوه المقال هو عنوان المقال وهو كمان عنوان الصفحة في الحالة دي.

### 3) main مع قايمة جانبية
الـ `<aside>` ممكن يبقى جوه الـ main لو متصل بالمحتوى، أو جنبه.

```html
<style>
  .wrap { display: flex; gap: 12px; }
  main { flex: 1; background: #dcfce7; padding: 8px; }
  aside { width: 120px; background: #fef9c3; padding: 8px; }
</style>
<div class="wrap">
  <main><p>المحتوى الأساسي</p></main>
  <aside><p>جانبي</p></aside>
</div>
```

- الـ aside جنب الـ main مش جواه، وده شائع في التخطيطات.

### 4) رابط تخطّى للمحتوى
الـ `<main id="content">` هو الهدف.

```html
<style>
  .skip { position: absolute; top: -40px; right: 8px; background: #000; color: #fff; padding: 8px; }
  .skip:focus { top: 8px; }
</style>
<a class="skip" href="#content">تخطّى للمحتوى</a>
<nav><a href="#">الرئيسية</a> <a href="#">الكورسات</a></nav>
<main id="content" tabindex="-1">
  <h1>المحتوى</h1>
</main>
```

- `tabindex="-1"` بيخلّي الـ main ياخد التركيز لما الرابط يتضغط (بعض المتصفحات القديمة محتاجاه).

### 5) تطبيق من أكتر من شاشة
واحد ظاهر والباقي `hidden`.

```html
<main id="s1">
  <h1>الشاشة الأولى</h1>
  <button onclick="s1.hidden=true; s2.hidden=false">التالي</button>
</main>
<main id="s2" hidden>
  <h1>الشاشة التانية</h1>
  <button onclick="s2.hidden=true; s1.hidden=false">السابق</button>
</main>
```

- الزرار بيبدّل `hidden` بين الشاشتين، فمفيش في أي لحظة غير `<main>` واحد ظاهر.
- قارئ الشاشة بيتجاهل العنصر اللي عليه `hidden` تماماً، فبيقرا المحتوى الحالي بس.
- ده نفس أسلوب التطبيقات اللي من صفحة واحدة (SPA) لكن بأبسط شكل ممكن.

### 6) main كامل مع عناوين وأقسام
مثال صفحة واقعية.

```html
<main>
  <h1>الكورسات</h1>
  <section>
    <h2>للمبتدئين</h2>
    <p>HTML و CSS.</p>
  </section>
  <section>
    <h2>للمتقدمين</h2>
    <p>JavaScript و React.</p>
  </section>
</main>
```

- الـ `<h1>` جوه الـ main عادةً بيمثّل عنوان الصفحة.

## rules

- parents: `<body>` أو `<div>` أو أي عنصر Flow، لكن **مش** جوه `<article>` أو `<aside>` أو `<header>` أو `<footer>` أو `<nav>`.
- children: **Flow content**.
- closing: الوسم الختامي `</main>` إجباري.
- role: `main`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### أكتر من main ظاهر
```html bad
<main>صفحة 1</main>
<main>صفحة 2</main>
```
```html good
<main>صفحة 1</main>
<main hidden>صفحة 2</main>
```
ليه؟ لازم واحد بس ظاهر عشان قارئ الشاشة يعرف المحتوى الرئيسي.

### main جوه article
```html bad
<article>
  <main>المحتوى</main>
</article>
```
```html good
<main>
  <article>المحتوى</article>
</main>
```
ليه؟ الـ `<main>` لازم يبقى محتوى الصفحة كلها مش جزء منها.

### حط المنيو جوه main
```html bad
<main>
  <nav>…</nav>
  <article>…</article>
</main>
```
```html good
<nav>…</nav>
<main>
  <article>…</article>
</main>
```
ليه؟ المنيو بيتكرر في كل صفحة فمش من المحتوى الفريد.

## a11y

- الـ `<main>` Landmark بدور `main`: قارئ الشاشة بيقفز له بضغطة.
- استخدمه كهدف لرابط التخطّى.
- لو بتستخدم `<div role="main">` استبدله بـ `<main>`.

## tips

- افتح الصفحة بـ Tab: أول رابط يبقى «تخطّى للمحتوى» وبعد الضغط عليه الفوكس بيروح للـ main.
- لو عندك تطبيق Single Page، بدّل `hidden` بين الـ `<main>`ات.
- مفيش خصائص خاصة، فمش محتاج تحفظ حاجة غير المكان الصح.

## quiz

### كام `<main>` ظاهر ينفع في الصفحة؟
- [ ] أي عدد
- [x] واحد بس
- [ ] اتنين
- [ ] واحد لكل قسم
لازم يبقى واحد ظاهر بس.

### أنهي مكان ممنوع فيه `<main>`؟
- [ ] جوه `<body>`
- [ ] جوه `<div>`
- [x] جوه `<article>`
- [ ] بعد `<header>`
الـ `<main>` لازم يبقى المحتوى الرئيسي للصفحة كلها.

### إيه الدور (role) بتاع `<main>`؟
- [ ] `banner`
- [x] `main`
- [ ] `navigation`
- [ ] `article`
الـ `<main>` له دور `main` وبيعمل Landmark.

## refs

- [MDN: main](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main)
- [WHATWG: The main element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element)
