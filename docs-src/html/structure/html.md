---
id: html
kind: element
cat: structure
tag: html
title: عنصر الجذر
en: HTML root element
status: stable
display: block
void: no
support: all
summary: العنصر الجذر اللي بيحتوي كل صفحة HTML؛ بنكتب عليه لغة الصفحة (lang) واتجاهها (dir) وللعربي بنستخدم ar و rtl.
keywords: جذر, الجذر, عنصر الجذر, html, root, lang, dir, rtl, ltr, لغة الصفحة, اتجاه الصفحة, documentElement
related: doctype, head, body, global-attributes, meta-charset, bdi
---

## intro

عنصر `<html>` هو **الجذر** (Root) بتاع أي صفحة ويب. يعني كل حاجة في الصفحة بتتحط جواه، ماعدا إعلان `<!DOCTYPE html>` ([[doctype]]) والتعليقات اللي ممكن تيجي قبله. هو العنصر الوحيد اللي ملوش أب غير المستند نفسه، وبيبقى بداية «شجرة» الصفحة اللي المتصفح بيبنيها (اسمها DOM). في JavaScript بتوصله بـ `document.documentElement`، وفي CSS بتشاور عليه بـ `:root`.

جواه **ابنين بس**، وبالترتيب ده: `<head>` الأول (المعلومات اللي مش بتظهر زي العنوان والترميز والستايلات)، وبعده `<body>` (المحتوى اللي المستخدم بيشوفه). أي حاجة تانية بتتحط جوه `<html>` بشكل مباشر هي غلط، والمتصفح هيصلّحها لوحده ويحطها في مكان تاني.

أهم حاجة بنكتبها على `<html>` هي خاصيتين: **`lang`** اللي بتقول لغة الصفحة، و **`dir`** اللي بتقول اتجاه الكتابة. بالنسبة لأي صفحة عربي، السطر ده هو الأساس: `<html lang="ar" dir="rtl">`. من غيره قارئ الشاشة ممكن ينطق الكلام العربي بنطق إنجليزي، وأدوات الترجمة والتدقيق الإملائي بتتلخبط، والصفحة بتتعرض من الشمال لليمين زي الإنجليزي.

خلّي بالك: `lang` **بتعرّف** اللغة بس، لكنها **مش بتقلب** الاتجاه. اللي بيقلب الصفحة لليمين هي `dir="rtl"`. ولو ناسي واحدة منهم هتلاقي صفحة عربي بتتعرض بشكل شمال-يمين غريب.

> [!analogy] تخيّل غلاف كتاب. على الغلاف مكتوب لغة الكتاب (عربي) واتجاه القراءة (من اليمين لليسار)، وجواه جزئين: صفحة بيانات الكتاب (`<head>`) والمحتوى نفسه (`<body>`). عنصر `<html>` هو الغلاف ده.

> [!key] `<html lang="ar" dir="rtl">` هو سطر لازم تكتبه في كل صفحة عربي. وعنصر `<html>` لازم يكون **واحد بس** في الصفحة.

## try

غيّر `dir="rtl"` لـ `dir="ltr"` وشوف الصفحة بتتقلب: المحاذاة بتروح لليسار وعلامات الترقيم (زي `!` و `.`) بتتنقل للجانب الغلط.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>تجربة</title></head>
<body>
  <h2>أهلاً بك في PhineX!</h2>
  <p>اتعلم HTML خطوة بخطوة (من الصفر).</p>
</body>
</html>
```

## syntax

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

- `<!DOCTYPE html>` — الإعلان اللي بيسبق `<html>` وبيدخل المتصفح في وضع المعايير ([[doctype]]).
- `<html ...>` — **الوسم الافتتاحي**: بيبدأ الجذر، وبنكتب جواه الخصائص.
- `lang="ar"` — لغة الصفحة (`ar` عربي، `en` إنجليزي).
- `dir="rtl"` — اتجاه الكتابة (`rtl` يمين لشمال، `ltr` شمال ليمين).
- `<head>` — أول ابن: معلومات الصفحة ([[head]]).
- `<body>` — تاني ابن: المحتوى المرئي ([[body]]).
- `</html>` — **الوسم الختامي**: بيقفل الجذر في آخر الملف.

## use

- في **كل صفحة HTML** كجذر للصفحة، لازم يكون واحد وبس.
- لتحديد **لغة الصفحة** بـ `lang` عشان قارئات الشاشة وأدوات الترجمة والتدقيق الإملائي.
- لتحديد **اتجاه الصفحة** بـ `dir` (`rtl` للعربي والعبري والفارسي والأوردو).
- لو عايز تغيّر مظهر الموقع كله (مثلاً الوضع الليلي)، حط `class` أو `data-theme` على `<html>` وغيّرها بـ JavaScript.
- لتحديد خصائص الصفحة في CSS بالـ `:root` أو `html` (زي حجم الخط الأساسي).

## avoid

- متكتبش أكتر من `<html>` واحد في نفس المستند.
- متنساش `lang` و `dir`، خصوصاً في الصفحات العربي.
- متحطش أي محتوى جوه `<html>` غير `<head>` و `<body>`.
- متكتبش `lang` بقيمة مش صح زي `arabic` أو `eg`؛ استخدم كود لغة معتمد (`ar` أو `ar-EG`).
- متستخدمش `xmlns` ولا `manifest` ولا `version` في صفحاتك الجديدة؛ دي خصائص قديمة.
- متحطش محتوى مرئي (نصوص، صور) برا `<body>`.

## attributes

عنصر `<html>` بياخد كل [[global-attributes|الخصائص العامة]] (زي `class` و `id` و `data-*`)، وأهم اتنين فيهم هنا هما `lang` و `dir`. ومعاهم خصائص قديمة (`xmlns` و `manifest` و `version`) لازم تعرفها عشان تفهم الكود القديم، لكن متكتبهاش في أي صفحة جديدة.

### lang
بتحدد **لغة** محتوى الصفحة بكود لغة معتمد (BCP 47). مهمة لقارئ الشاشة (بيختار الصوت ونطق الحروف)، ولأدوات الترجمة، ولفحص الإملاء، وللـ CSS (`:lang()`). تقدر تكتبها على أي عنصر تاني لو في جزء بلغة مختلفة.

- `ar` — العربية بشكل عام (الأفضل غالباً).
- `ar-EG` — العربية كما تُستخدم في مصر.
- `en` — الإنجليزية، و `en-US` أو `en-GB` لو عايز تحدد النوع.
- `fr` و `de` و `es` — الفرنسية والألمانية والإسبانية.

```html nolive
<html lang="ar-EG" dir="rtl">
```

### dir
بتحدد **اتجاه** الكتابة والتخطيط في الصفحة. الافتراضي لو مكتبتهاش هو `ltr`، والمتصفح **مش** بيحدده من `lang` تلقائياً.

- `rtl` — من اليمين لليسار (عربي، عبري، فارسي، أوردو).
- `ltr` — من اليسار لليمين (إنجليزي وأغلب اللغات).
- `auto` — المتصفح يقرر من أول حرف قوي في النص. مفيدة للمحتوى اللي بيكتبه المستخدمين.

```html nolive
<html lang="ar" dir="rtl">
```

### xmlns {deprecated}
فضلت من أيام **XHTML** (HTML بصيغة XML)، وكانت بتحدد «مساحة الأسماء» (Namespace). القيمة الوحيدة المسموحة لو كتبتها هي `http://www.w3.org/1999/xhtml`، ومالهاش **أي تأثير** في HTML العادي. ممكن تقابلها في كود قديم، لكن متكتبهاش في صفحاتك.

### manifest {deprecated}
كانت بتشاور على ملف **Application Cache** اللي بيخلّي الصفحة تشتغل أوفلاين. الفكرة دي **اتلغت واتشالت** من المتصفحات بسبب مشاكلها. البديل الحديث هو الـ **Service Workers**، وملف Web App Manifest بيتربط بـ `<link rel="manifest">` جوه `<head>` (مش على `<html>`).

### version {deprecated}
كانت بتحدد نسخة HTML في الصفحات القديمة جداً (HTML 3.2 وبداية 4)، زي `version="-//W3C//DTD HTML 3.2 Final//EN"`. اتحذفت من المعايير ومتكتبهاش، وبدلها الـ DOCTYPE اللي بيعمل الوظيفة دي.

## examples

### 1) أصغر صفحة كاملة
دي الهيكل الأساسي لأي صفحة. `<html>` فيه `lang` و `dir`، وجواه `<head>` للمعلومات (الترميز والعنوان) و `<body>` للمحتوى. ركّز على الترتيب: `<head>` قبل `<body>` دايماً.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي</title>
</head>
<body>
  <h1>مرحباً بالعالم</h1>
  <p>ده أصغر هيكل صفحة صح.</p>
</body>
</html>
```

- `<!DOCTYPE html>` أول سطر، وبعده `<html>` على طول.
- لو شلت `dir="rtl"` هتلاقي المحاذاة اتغيّرت للشمال.

### 2) لغة الصفحة بتبان للـ CSS
خاصية `lang` مش للتزيين بس: الـ CSS ممكن يختار العناصر حسب لغتها باستخدام `:lang()`. هنا كل لغة بلون مختلف، والفقرة الإنجليزي جواها `lang="en"` و `dir="ltr"` بتاعتها. ده دليل إن المتصفح بيعرف لغة كل جزء.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>lang في الـ CSS</title>
  <style>
    :lang(ar) { color: seagreen; }
    :lang(en) { color: royalblue; font-family: Georgia, serif; }
  </style>
</head>
<body>
  <p>ده نص عربي (أخضر).</p>
  <p lang="en" dir="ltr">This is English text (blue).</p>
</body>
</html>
```

- `:lang(ar)` بيطابق أي عنصر لغته عربي (وبيورّثها من `<html>`).
- الفقرة التانية غيّرت لغتها لـ `en` فمطابقها `:lang(en)`.

### 3) لو كتبت `lang` من غير `dir`
`lang="ar"` لوحدها **مبتقلبش** الاتجاه. الصفحة هتفضل شمال-يمين وعلامات الترقيم هتروح مكان غلط. السكربت تحت بيطبع الاتجاه الفعلي لـ `<body>`: هتلاقيه `ltr` رغم إن اللغة عربي.

```html
<!DOCTYPE html>
<html lang="ar">
<head><meta charset="UTF-8"><title>من غير dir</title></head>
<body>
  <h2>أهلاً بك في PhineX!</h2>
  <p>اتعلم HTML خطوة بخطوة (من الصفر).</p>
  <script>
    console.log("الاتجاه:", getComputedStyle(document.body).direction);
  </script>
</body>
</html>
```

- لاحظ «!» في آخر العنوان وأنت بتقرا من اليمين: هتلاقيه في الجنب الغلط.
- الحل: أضف `dir="rtl"` لـ `<html>`.

### 4) جزء بلغة تانية جوه صفحة عربي
لو الصفحة عربي وفيها جملة إنجليزي كاملة، حط `lang="en"` و `dir="ltr"` على العنصر اللي فيها. كده قارئ الشاشة ينطقها إنجليزي، وعلامات الترقيم تتحط صح. للكلمات القصيرة جوه السطر ممكن تستخدم `<bdi>` أو `<span>`.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>لغتين</title></head>
<body>
  <p>الشعار الرسمي بالإنجليزي:</p>
  <p lang="en" dir="ltr">Learn to code, step by step!</p>
  <p>ومعناه: «اتعلم البرمجة خطوة بخطوة».</p>
</body>
</html>
```

- الفقرة الإنجليزي اتحاذت لليسار وعلامة `!` في آخرها صح.
- باقي الصفحة فضلت عربي من اليمين.

### 5) عنصر الجذر من جوه الـ DOM
الـ `<html>` بتوصله من JavaScript بـ `document.documentElement`. السكربت ده بيطبع تاجه، لغته واتجاهه، وأبناءه، وبيثبت إنه أول عنصر تحت `document`.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>الجذر</title></head>
<body>
  <p>افتح الـ console تحت المعاينة.</p>
  <script>
    var root = document.documentElement;
    console.log("الوسم:", root.tagName);
    console.log("lang:", root.lang, "| dir:", root.dir);
    console.log("الأبناء:", root.children[0].tagName,
      "و", root.children[1].tagName);
    console.log("أبوه هو document؟", root.parentNode === document);
  </script>
</body>
</html>
```

- `root.children[0]` هو `<head>` و `root.children[1]` هو `<body>`.
- `root.lang` و `root.dir` بترجّع القيم المكتوبة في الخصائص.

### 6) المتصفح بيبني الهيكل لوحده
حتى لو نسيت `<html>` و `<head>` و `<body>`، المتصفح مش هيقف. هو بيكمّل الهيكل لوحده في الـ DOM: العناصر اللي تخص الـ head (زي `<meta>` و `<title>`) بتتحط في `<head>`، والباقي في `<body>`. ده بيحصل فعلاً، لكن **متعتمدش عليه**؛ اكتب الهيكل كامل.

```html
<!DOCTYPE html>
<meta charset="UTF-8">
<title>من غير html و head و body</title>
<p>فقرة من غير أي وسم هيكل.</p>
<script>
  console.log("الجذر:", document.documentElement.tagName);
  console.log("أبناء head:", document.head.children.length);
  console.log("أبناء body:", document.body.children.length);
</script>
```

- المتصفح عمل `<html>` و `<head>` و `<body>` من نفسه.
- `<meta>` و `<title>` راحوا للـ head، و `<p>` و `<script>` راحوا للـ body.

### 7) تبديل اللغة والاتجاه بالـ JavaScript
موقع بلغتين بيغيّر `lang` و `dir` على `<html>` لما المستخدم يضغط الزرار. اضغط واتفرّج على الصفحة بتتقلب، وشوف الـ console.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>تبديل</title></head>
<body>
  <button id="b">Switch to English</button>
  <p id="msg">أهلاً بك في موقعنا.</p>
  <script>
    var root = document.documentElement;
    document.getElementById("b").addEventListener("click", function () {
      var wasAr = root.lang === "ar";
      root.lang = wasAr ? "en" : "ar";
      root.dir = wasAr ? "ltr" : "rtl";
      this.textContent = wasAr ? "التبديل للعربي" : "Switch to English";
      document.getElementById("msg").textContent =
        wasAr ? "Welcome to our site." : "أهلاً بك في موقعنا.";
      console.log("lang =", root.lang, "| dir =", root.dir);
    });
  </script>
</body>
</html>
```

- لازم تغيّر `lang` و `dir` **مع بعض** مش واحدة بس.
- في موقع حقيقي بيتبدّل المحتوى كله، مش فقرة واحدة.

### 8) الوضع الليلي بـ `data-theme` على `<html>`
عشان `<html>` فوق كل العناصر، بنحط عليه خاصية بتتحكم في شكل الموقع كله. هنا `data-theme` بيتبدّل بين `light` و `dark` والـ CSS بيستجيب. ده نمط بيستخدمه مواقع كتير.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="UTF-8">
  <title>الوضع الليلي</title>
  <style>
    body { font-family: sans-serif; padding: 16px; }
    html[data-theme="light"] body { background: #fff; color: #222; }
    html[data-theme="dark"] body { background: #1c1c28; color: #eee; }
  </style>
</head>
<body>
  <p>غيّر شكل الصفحة بالزرار.</p>
  <button id="t">بدّل الوضع</button>
  <script>
    var root = document.documentElement;
    document.getElementById("t").onclick = function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    };
  </script>
</body>
</html>
```

- `data-theme` خاصية من نوع `data-*`؛ تقدر تكتب أي اسم بعد `data-`.
- `root.dataset.theme` بيقرا ويكتب قيمتها من JavaScript.

### 9) قالب كامل جاهز للنسخ
ده القالب اللي هتبدأ بيه معظم مشاريعك: `<html>` بالـ `lang` والـ `dir`، وفي `<head>` الترميز وإعداد الموبايل والعنوان والوصف وملف الستايل، وفي `<body>` المحتوى. مش بيتعرض هنا لأنه بيحمّل ملفات خارجية.

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>عنوان الصفحة | اسم الموقع</title>
  <meta name="description" content="وصف قصير للصفحة.">
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```

- الترتيب الشائع في `<head>`: الترميز، ثم الـ viewport، ثم العنوان، ثم الباقي.
- `defer` بتخلّي السكربت يشتغل بعد ما الصفحة تتحمل.

## section: ليه لغة الصفحة مهمة؟

الخاصية `lang` على `<html>` بتبان صغيرة، لكن تأثيرها كبير:

- **قارئات الشاشة** بتستخدمها عشان تختار الصوت والنطق الصح. من غيرها ممكن تقرا الكلام العربي بنطق إنجليزي فتطلع كلمات مش مفهومة.
- **أدوات الترجمة** (زي ترجمة المتصفح) بتعرف إن الصفحة عربي وتعرض لك اقتراح الترجمة لو لغتك مختلفة.
- **التدقيق الإملائي** بيستخدم قاموس اللغة الصح.
- **الـ CSS** بيقدر يميّز اللغات بـ `:lang()` ويستخدم خطوط وتقطيع كلمات (Hyphenation) مناسب لكل لغة.
- **محركات البحث**: جوجل بتقول إنها بتحدد لغة الصفحة من محتواها نفسه ومش بتعتمد على `lang`، فمتتوقعش تحسين في الـ SEO من الخاصية دي لوحدها. للنسخ المتعددة اللغات استخدم `hreflang` على الروابط.
- **معايير الإتاحة** (WCAG) بتطلب تحديد لغة الصفحة كمعيار أساسي (Level A).

### لغات بتتكتب من اليمين لليسار
العربية (`ar`) والعبرية (`he`) والفارسية (`fa`) والأوردو (`ur`) كلها بتحتاج `dir="rtl"`. باقي اللغات الشائعة (الإنجليزية والفرنسية والألمانية والإسبانية والتركية) بتتكتب `ltr`.

## rules

- parents: مفيش؛ هو **الجذر**، وأبوه الوحيد هو المستند نفسه (`document`). بيجي بعد `<!DOCTYPE html>`.
- children: بالظبط `<head>` وبعده `<body>`. بينفع بينهم مسافات وتعليقات، لكن مفيش أي عنصر تاني.
- closing: `</html>` في آخر الملف. تقنياً ممكن يتشال في بعض الحالات، لكن اكتبه دايماً.
- role: `document`
- dom: `HTMLHtmlElement`، وبتوصله من `document.documentElement`.
- layout: `block` (بيتحط عليه ستايل الصفحة، وبيعمل كـ «القماشة» الأساسية للعرض).

## mistakes

### نسيان lang
```html bad
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>موقعي</title></head>
```
```html good
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>موقعي</title></head>
```
من غير `lang` قارئ الشاشة مش عارف لغة الصفحة، وأدوات الترجمة والتدقيق الإملائي بتتلخبط. كمان من غير `dir="rtl"` الصفحة العربي بتتعرض شمال-يمين. اكتب الاتنين دايماً على `<html>`.

### lang من غير dir في صفحة عربي
```html bad
<html lang="ar">
<body><h1>أهلاً!</h1></body>
</html>
```
```html good
<html lang="ar" dir="rtl">
<body><h1>أهلاً!</h1></body>
</html>
```
`lang="ar"` بتقول إن اللغة عربي، لكنها **مش بتحدد الاتجاه**. اللي بيحدده هو `dir`. ناقص `dir="rtl"` فالصفحة بتفضل شمال-يمين.

### كود لغة غير معتمد
```html bad
<html lang="arabic" dir="rtl">
<html lang="eg" dir="rtl">
```
```html good
<html lang="ar" dir="rtl">
<html lang="ar-EG" dir="rtl">
```
قيمة `lang` لازم تكون كود لغة معتمد (BCP 47). `arabic` مش كود، و `eg` ده كود **دولة** (مصر) مش لغة. الصح `ar` للعربية و `ar-EG` للعربية المصرية.

### محتوى بعد `</html>` أو أكتر من `<html>`
```html bad
<html lang="ar" dir="rtl">
<head>...</head>
<body>...</body>
</html>
<p>فقرة بعد النهاية</p>
```
```html good
<html lang="ar" dir="rtl">
<head>...</head>
<body>
  ...
  <p>فقرة جوه الـ body</p>
</body>
</html>
```
أي حاجة بعد `</html>` المتصفح بيسحبها تلقائياً جوه `<body>`، فالشغل بيمشي لكن الكود بقى غير صحيح ومكان العناصر مش واضح. كمان `<html>` تانية في نفس الصفحة بتتجاهل. حط كل المحتوى جوه `<body>` قبل `</body>`.

## a11y

- **`lang` على `<html>` شرط أساسي** (WCAG 3.1.1، Level A): قارئ الشاشة بيستخدمها لاختيار الصوت والنطق. لو غلطت (مثلاً `lang="en"` على صفحة عربي) هتتقرا بنطق إنجليزي ومش هتفهم.
- لو في **جزء بلغة تانية** جوه الصفحة، حط `lang` على العنصر ده (WCAG 3.1.2، Level AA) عشان قارئ الشاشة يبدّل النطق.
- **`dir` بيحدد ترتيب القراءة** بالنسبة لقارئ الشاشة وحركة الـ Tab والتركيز. اكتبه على `<html>` بدل ما تعتمد على CSS `direction` وحده، عشان المعنى يكون في الـ HTML نفسه.
- ضيف `<title>` واضح ومميّز في `<head>` لكل صفحة؛ ده أول حاجة بيسمعها المستخدم لما الصفحة تتفتح (راجع [[head]]).
- استخدم `dir="auto"` على المحتوى اللي بيكتبه المستخدمين عشان اتجاه كل نص يتحدد صح.

## tips

- في VS Code اكتب `!` ثم `Tab` وهيطلع لك هيكل الصفحة كامل، بس غيّر `lang="en"` الافتراضي لـ `ar` وضيف `dir="rtl"`.
- استخدم `ar` للعربية العامة، و `ar-EG` لو عايز تحدد المصرية فعلاً. اللغة الأساسية (`ar`) كفاية في أغلب المواقع.
- الـ `:root` في CSS بيشاور على `<html>` نفسه لكن بأولوية أعلى من `html` العادي، وبيستخدم كتير لتعريف متغيرات الألوان.
- لو الصفحة بتتقلب بين لغتين بـ JavaScript، غيّر `lang` و `dir` مع بعض دايماً.
- متحطش `<html>` جوه `<body>` ولا `<body>` برا `<html>`؛ الترتيب: `<html>` ثم `<head>` ثم `<body>`.

## quiz

### إيه السطر الصح لبداية صفحة عربي؟
- [ ] `<html lang="arabic">`
- [ ] `<html language="ar">`
- [x] `<html lang="ar" dir="rtl">`
- [ ] `<html dir="ar">`

لازم `lang` بكود اللغة (`ar`) و `dir="rtl"` لاتجاه الكتابة. القيمة `arabic` مش كود معتمد، و `language` مش خاصية أصلاً.

### لو كتبت `<html lang="ar">` من غير `dir`، إيه اللي بيحصل؟
- [ ] الصفحة بتتعرض يمين لشمال تلقائياً
- [x] الصفحة بتفضل شمال لليمين لأن `lang` مش بتحدد الاتجاه
- [ ] المتصفح بيعرض خطأ
- [ ] الصفحة مش بتتعرض

`lang` بتعرّف اللغة بس، لكن الاتجاه بتحدده `dir`. من غير `dir="rtl"` الصفحة بتفضل `ltr` بشكل افتراضي.

### كام عنصر `<html>` ممكن يكون في الصفحة الواحدة؟
- [ ] اتنين: واحد للعربي وواحد للإنجليزي
- [ ] أي عدد
- [x] واحد بس
- [ ] واحد لكل قسم

`<html>` هو الجذر ولازم يكون واحد بس. باقي الأقسام بتتحط جوه `<body>` بعناصر تانية.

### إيه المشكلة في الكود ده؟ `<html><body>...</body><head>...</head></html>`
- [ ] مفيش مشكلة، الترتيب مش مهم
- [x] `<head>` لازم يجي قبل `<body>`
- [ ] لازم نشيل `<head>` خالص
- [ ] `<html>` لازم يكون جوه `<body>`

الترتيب الصحيح هو `<head>` الأول وبعده `<body>`. أما `<head>` اللي بعد `<body>` فالمتصفح بيتجاهل وسمه، فمحتواه مش بيشتغل في مكانه الصح.

## refs

- [MDN: عنصر `<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html)
- [MDN: خاصية lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang)
- [MDN: خاصية dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir)
- [WHATWG: The html element](https://html.spec.whatwg.org/multipage/semantics.html#the-html-element)
