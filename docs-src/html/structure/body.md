---
id: body
kind: element
cat: structure
tag: body
title: عنصر الجسم (body)
en: HTML document body element
status: stable
display: block
void: no
support: all
summary: عنصر body هو المسرح الحقيقي للصفحة: كل النصوص والصور والروابط والأزرار اللي الزائر بيشوفها لازم تتكتب جواه، وفي صفحة واحدة ليه نسخة واحدة بس.
keywords: body, جسم, الجسم, محتوى الصفحة, محتوى مرئي, document.body, body element
related: html, head, header, main, footer, div, global-attributes
---

## intro

عنصر `<body>` هو **كل اللي الزائر بيشوفه** في الصفحة. أي نص بتقراه، أي صورة، أي زرار بتدوس عليه، أي فورم بتكتب فيه، كل ده مكتوب جوه الـ `<body>`. لو الصفحة بيت، فالـ `<head>` هو الأوراق والعقود اللي في الدُّرج (مش ظاهرة)، والـ `<body>` هو الصالة والأوض اللي الضيوف بيدخلوها.

مكانه في هيكل الصفحة: بييجي جوه `<html>` وبعد `<head>` على طول. ولازم يكون **عنصر واحد بس** في الصفحة. جواه بنحط العناصر اللي بتبني الصفحة زي `<header>` و `<main>` و `<footer>` و `<h1>` و `<p>` و `<img>` وغيرهم.

والمتصفح لما بيفتح الصفحة بيبني من الـ `<body>` شجرة كاملة اسمها **DOM**، وبعدين بيرسمها على الشاشة. وده اللي بيخلّي الجافاسكربت تقدر توصل لأي عنصر في الصفحة وتغيّره، لأن `document.body` بيرجعلك الجذر بتاع الشجرة المرئية كلها.

من أول يوم هتلاحظ حاجة: الـ `<body>` له **مسافة تلقائية حواليه** (حوالي 8 بكسل) من كل ناحية. دي مش غلط في الكود، ده الستايل الافتراضي اللي المتصفح بيحطه عشان النص ما يلزقش في حافة الشاشة.

> [!analogy] تخيّل مسرح بعد ما الستارة اتفتحت: كل الممثلين والديكور والإضاءة اللي الجمهور شايفها هي الـ `<body>`. اللي ورا الكواليس (الميكروفونات والتعليمات) هو الـ `<head>`.

> [!key] الـ `<body>` = **كل اللي بيتعرض**. لو حاجة مش ظاهرة للمستخدم (عنوان التبويب، الترميز، الستايل)، فمكانها `<head>`.

## try

غيّر لون الخلفية أو اكتب كلام جديد، وشوف إن أي حاجة بتكتبها جوه الـ body بتظهر للزائر على طول.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>جرّب الـ body</title>
</head>
<body style="background: #e8f5e9; font-family: sans-serif;">
  <h1>أهلاً بيك</h1>
  <p>كل الكلام ده جوه الـ body.</p>
  <button>اضغط عليّ</button>
</body>
</html>
```

## syntax

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <title>عنوان</title>
  </head>
  <body>
    <h1>محتوى الصفحة هنا</h1>
    <p>فقرة</p>
  </body>
</html>
```

- `<body>` — **الوسم الافتتاحي**: بيبدأ المحتوى المرئي. بييجي بعد `</head>`.
- كل اللي جواه: العناصر المرئية زي `<h1>` و `<p>` وغيرهم.
- `</body>` — **الوسم الختامي**: بيقفل المحتوى المرئي، وبعده `</html>`.

## use

- كل صفحة HTML لازم تحتوي على `<body>` واحد فيه المحتوى المرئي.
- لتحديد ستايل عام للصفحة كلها (خلفية، خط، لون النص) من خلال CSS.
- جوّاه بتحط الهيكل الدلالي: `<header>` و `<nav>` و `<main>` و `<footer>`.
- لتشغيل كود جافاسكربت لما الصفحة تتحمل أو تتقفل باستخدام خصائص الأحداث (Event Handlers) زي `onpageshow` (بس الأفضل `addEventListener`).
- كمكان لوضع السكربتات في آخر الصفحة (قبل `</body>`) لو مش بتستخدم `defer`.

## avoid

- متحطش جواه `<head>` ولا عناصر الـ head زي `<title>` و `<meta>`، دي مكانها الـ `<head>`.
- متعملش أكتر من `<body>` واحد.
- متستخدمش الخصائص القديمة زي `bgcolor` و `text` و `link` للتنسيق، استخدم CSS بدالها.
- متحطش النص مباشرة في الـ body من غير عنصر (زي `<p>`)، ده شغال بس بيعمل مشاكل في الهيكل ولا يوصف المعنى.

## attributes

الـ `<body>` بيقبل **الخصائص العامة** (زي `id` و `class` و `style` و `lang`). اقرا عنها في [[global-attributes]]. وفيه كمان **خصائص الأحداث** اللي بتشتغل على النافذة كلها.

### onbeforeunload
بيشتغل قبل ما المستخدم يقفل الصفحة أو يروح لصفحة تانية. بيستخدموه عشان يحذّروا لو فيه بيانات مش محفوظة. المتصفحات الحديثة بتعرض رسالة جاهزة بتاعتها، مش النص اللي انت بتكتبه.

### onhashchange
بيشتغل لما الجزء اللي بعد `#` في الرابط يتغيّر (زي من `#a` لـ `#b`). مفيد في الصفحات اللي بتتنقل جواها من غير ما تتحمّل من جديد.

### ononline
بيشتغل لما الجهاز يتوصل بالإنترنت تاني بعد ما كان مقطوع. تقدر تعرض رسالة «رجع الاتصال».

### onoffline
بيشتغل لما الاتصال بالإنترنت ينقطع. تقدر تعرض رسالة «انت دلوقتي أوفلاين».

### onpageshow
بيشتغل لما الصفحة تتعرض، حتى لو رجعت لها بزر الرجوع (المتصفح ساعات بيحتفظ بالصفحة في الذاكرة).

### onpagehide
بيشتغل لما الصفحة تتخفي أو المستخدم يسيبها. أحسن من `onunload` لأنه أكتر ثباتاً.

### onresize
بيشتغل لما حجم النافذة يتغيّر. (لو بتحتاج تغيّر الشكل حسب العرض فالأفضل CSS.)

### onmessage
بيشتغل لما الصفحة تستقبل رسالة من نافذة تانية أو إطار `<iframe>` باستخدام `postMessage`.

### onstorage
بيشتغل لما محتوى `localStorage` يتغيّر من نافذة تانية للموقع نفسه.

### onpopstate
بيشتغل لما المستخدم يدوس رجوع أو أمام وفيه تاريخ اتضاف بـ `history.pushState`.

### onunload
بيشتغل أثناء مغادرة الصفحة. **متعتمدش عليه** لأنه مش مضمون ومتصفحات كتير بتتجاهله، استخدم `pagehide` أو `visibilitychange` بدله.

### bgcolor {deprecated}
كان بيحدد لون خلفية الصفحة (مثلاً `bgcolor="#ffffcc"`). **قديمة**: استخدم CSS: `background-color`.

### text {deprecated}
كان بيحدد لون النص الافتراضي. **قديمة**: استخدم CSS: `color`.

### link {deprecated}
كان بيحدد لون الروابط العادية اللي لسه ما اتزارتش. **قديمة**: استخدم CSS على `<a>`.

### vlink {deprecated}
كان بيحدد لون الروابط اللي اتزارت قبل كده. **قديمة**: استخدم CSS على الروابط `<a>` بالحالة `:visited`.

### alink {deprecated}
كان بيحدد لون الرابط وقت الضغط عليه. **قديمة**: استخدم CSS.

### background {deprecated}
كان بيحدد صورة خلفية للصفحة. **قديمة**: استخدم CSS: `background-image`.

## examples

### 1) أبسط body ممكن
أبسط صفحة: body فيه نص بس. جرّب تكتب أي حاجة وتشوفها على الشاشة.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>أبسط body</title></head>
<body>
  أنا نص مكتوب مباشرة في الـ body.
</body>
</html>
```

- النص بيظهر، لكن الأفضل دايماً تحط النص جوه عنصر مناسب زي `<p>`.

### 2) body فيه هيكل الصفحة الأساسي
الصفحة الحقيقية بتتقسّم لأجزاء: رأس ومحتوى وتذييل. بنستخدم العناصر الدلالية عشان المتصفح وقارئ الشاشة يفهموا المعنى.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>هيكل الصفحة</title>
  <style>
    header, main, footer { padding: 10px; margin: 6px 0; }
    header { background: #e3f2fd; }
    main   { background: #fffde7; }
    footer { background: #e8f5e9; }
  </style>
</head>
<body>
  <header>الرأس: اللوجو والقائمة</header>
  <main>المحتوى الرئيسي بتاع الصفحة</main>
  <footer>التذييل: حقوق النشر</footer>
</body>
</html>
```

- `<header>` و `<main>` و `<footer>` كلهم جوه الـ `<body>` وبنفس المستوى.
- التلوين ده تجريبي عشان تشوف الأقسام.

### 3) الهامش الافتراضي للـ body
المتصفح بيدي الـ body مسافة تلقائية. لو عايز تشيلها لازم تعمل ده من CSS.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    body { background: #fce4ec; }
    p { background: white; margin: 0; }
  </style>
</head>
<body>
  <p>لاحظ المسافة الوردي حوالين الفقرة: دي هامش الـ body الافتراضي (8px).</p>
</body>
</html>
```

- الخلفية الوردي بتغطي الصفحة كلها، لكن الفقرة بتبعد شوية عن الحواف.
- خلّي بالك إن خلفية الـ body بتتمدد لتغطي الصفحة كلها حتى لو المحتوى قليل.

### 4) تغيير ستايل الصفحة كلها من الـ body
أي خاصية CSS بتحطها على الـ body بتنتقل (بالوراثة) للعناصر اللي جواه، زي نوع الخط ولونه.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Tahoma, sans-serif;
      color: #1b5e20;
      line-height: 2;
    }
  </style>
</head>
<body>
  <h1>عنوان أخضر</h1>
  <p>فقرة بنفس الخط واللون من غير ما نكتب أي ستايل عليها.</p>
</body>
</html>
```

- اللون والخط اتحددوا مرة واحدة على الـ body، وكل العناصر اللي جواه ورثتهم.

### 5) الجافاسكربت والـ body
من السكربت بنوصل للـ body بـ `document.body` وبنضيف له عناصر جديدة. ده بيوريك إن الـ body هو جذر المحتوى المرئي.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>DOM</title></head>
<body>
  <p>فقرة أصلية.</p>
  <script>
    const p = document.createElement('p');
    p.textContent = 'أنا اتضفت من الجافاسكربت على الـ body!';
    p.style.color = 'crimson';
    document.body.appendChild(p);
    console.log(document.body.tagName);
  </script>
</body>
</html>
```

- `document.body.appendChild` ضاف الفقرة في آخر الـ body.
- `console.log` بيطبع اسم الوسم `BODY` في الـ console اللي تحت المعاينة.

### 6) حدث onpageshow وتحديد خصائص على الـ body
ممكن تحط معالج حدث مباشرة على الـ body، لكن في المشاريع الحقيقية بنفضّل `addEventListener` من السكربت.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>حدث</title></head>
<body onpageshow="document.getElementById('s').textContent = 'الصفحة اتعرضت!'">
  <p id="s">لسه...</p>
</body>
</html>
```

- لما الصفحة تتعرض الحدث `pageshow` بيشتغل ويغيّر النص.

## rules

- parents: عنصر `<html>` بس، وبييجي بعد `<head>`.
- children: أي **Flow content**: كل العناصر المرئية تقريباً زي `<header>` و `<main>` و `<footer>` و `<div>` و `<p>` و `<h1>` و `<img>`.
- closing: الوسم الختامي `</body>` اختياري تقنياً لكن اكتبه دايماً.
- role: `generic` (مفيش دور خاص لقارئ الشاشة).
- dom: `HTMLBodyElement`، وبتوصله بـ `document.body`.
- layout: `display: block` وفيه `margin: 8px` تلقائي من المتصفح.

## mistakes

### نسيان الـ body أو وضع المحتوى في الـ html مباشرة
```html bad
<html>
<head><title>صفحة</title></head>
<h1>أهلاً</h1>
</html>
```
```html good
<html>
<head><title>صفحة</title></head>
<body>
  <h1>أهلاً</h1>
</body>
</html>
```
ليه؟ المتصفح هيعمل `<body>` تلقائياً، لكن كتابته بنفسك بتخلي الكود واضح وبتخليك تتحكم في الخصائص.

### body جوه body
```html bad
<body>
  <body>
    <p>مرحباً</p>
  </body>
</body>
```
```html good
<body>
  <p>مرحباً</p>
</body>
```
ليه؟ مسموح بجسم واحد بس. المتصفح هيتجاهل التاني وبيضيف خصائصه للأول، ودي حاجة بتلخبط الكود.

### استخدام bgcolor بدل CSS
```html bad
<body bgcolor="#ffeeee" text="#333333">
  <p>نص</p>
</body>
```
```html good
<body style="background:#ffeeee; color:#333;">
  <p>نص</p>
</body>
```
ليه؟ الخصائص القديمة دي اتشالت من المعيار، والأحسن دايماً تحط الستايل في ملف CSS منفصل.

## a11y

- حط `lang` على `<html>` عشان قارئ الشاشة يقرا بلغة الصفحة الصح.
- ابني الـ body بهيكل واضح (`<header>` و `<nav>` و `<main>` و `<footer>`) عشان مستخدمي قارئ الشاشة يقفزوا بين الأقسام بسرعة.
- أول عنصر في الـ body يفضل يكون رابط «تخطّي للمحتوى» (Skip link) لو الصفحة فيها قائمة طويلة.
- متمنعش التكبير، ومتخليش لون النص قريب من الخلفية.

## tips

- في المتصفح، افتح DevTools ودوس على `<body>` وهتشوف الـ margin الأصفر بتاعه (8px).
- `document.body` ممكن يبقى `null` لو السكربت اشتغل في الـ head قبل ما الـ body يتحمل، علشان كده استخدم `defer`.
- لو بتستخدم Framework زي React، العنصر `<body>` عادة بيكون فيه `<div id="root">` وبتتحكم فيه من هناك.

## quiz

### أي عنصر بيحتوي على كل المحتوى المرئي في الصفحة؟
- [ ] `<head>`
- [x] `<body>`
- [ ] `<html>`
- [ ] `<main>`
الـ `<body>` هو اللي فيه المحتوى المرئي. الـ `<html>` حاوي لكل حاجة بما فيها الـ head، و `<main>` جزء من الـ body مش بديل ليه.

### كام `<body>` ممكن يكون في صفحة؟
- [ ] اتنين
- [ ] أي عدد
- [x] واحد بس
- [ ] ولا واحد، المتصفح بيعمله لوحده
المسموح عنصر `<body>` واحد في الصفحة، ولو ما كتبتوش المتصفح بيعمله لوحده، لكن الأفضل تكتبه.

### إيه الأسلوب الأحسن لتغيير لون خلفية الصفحة كلها؟
- [ ] `<body bgcolor="red">`
- [x] CSS: `body { background: red; }`
- [ ] `<background color="red">`
- [ ] مفيش طريقة
الخاصية `bgcolor` قديمة. الطريقة الحديثة والصح هي CSS.

## refs

- [MDN: body](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body)
- [WHATWG: The body element](https://html.spec.whatwg.org/multipage/sections.html#the-body-element)
