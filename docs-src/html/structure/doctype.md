---
id: doctype
kind: doctype
cat: structure
label: !DOCTYPE
chip: <!DOCTYPE html>
title: إعلان نوع المستند
en: Document type declaration (DOCTYPE)
status: stable
support: all
support_note: كل المتصفحات بتفهم الـ DOCTYPE القصير وبتشغّل الصفحة بيه في وضع المعايير (Standards Mode).
summary: أول سطر في أي صفحة HTML؛ بيقول للمتصفح يقرا الصفحة بقواعد HTML الحديثة (Standards Mode) بدل وضع الأخطاء القديم (Quirks Mode).
keywords: دوكتايب, نوع المستند, إعلان, DOCTYPE, doctype, html5, quirks mode, standards mode, compatMode
related: html, head, body, comment, meta-charset
---

## intro

الـ `<!DOCTYPE html>` هو **أول سطر** في أي صفحة HTML، وهو مش عنصر (Element) زي `<p>` أو `<div>`؛ ده **إعلان** (Declaration). يعني مفيش وسم ختامي، ومفيش محتوى جواه، ومفيش خصائص (Attributes). هو بس جملة قصيرة بتتكتب بين `<!` و `>` وبتقول للمتصفح: «الصفحة دي مكتوبة بـ HTML الحديث».

ليه محتاجين جملة زي دي أصلاً؟ في التسعينات والألفينات كل متصفح كان بيفهم HTML و CSS بطريقته، ومئات الملايين من الصفحات اتكتبت على أساس الأخطاء دي. لما المتصفحات بدأت تلتزم بالمعايير الرسمية، كان لازم تفضل الصفحات القديمة شغّالة. فالمتصفحات عملت **وضعين**: **Quirks Mode** (وضع الأخطاء القديمة، بيحاكي المتصفحات القديمة) و **Standards Mode** (وضع المعايير الحديثة). والـ DOCTYPE هو المفتاح اللي بيقرر المتصفح هيدخل أنهي وضع.

القاعدة بسيطة: **لو كتبت `<!DOCTYPE html>` في أول الصفحة تدخل Standards Mode، ولو نسيته (أو كتبته غلط) تدخل Quirks Mode** وهتلاقي حاجات غريبة في الشكل والقياسات من غير ما تعرف السبب. ولأن HTML الحديث بقى «Living Standard» من غير أرقام نسخ، السطر ده **ثابت** ومش بيتغيّر مع كل إصدار، ومش بيتكتب فيه رقم زي `html5`.

الـ DOCTYPE القديم كان طويل ومخيف (بيشاور على ملف DTD على موقع W3C)، لكن المتصفحات الحديثة مش بتقرا أي DTD أصلاً، فالنسخة القصيرة هي اللي بتفضل. وكمان مش حساس لحالة الحروف: `<!doctype html>` و `<!DOCTYPE HTML>` معناهم واحد.

> [!analogy] تخيّل إنك بتسلّم ورقة امتحان وعليها ملاحظة في أول سطر: «الورقة دي بنظام التصحيح الجديد». من غير الملاحظة المصحّح هيفترض إن الورقة قديمة ويصحّحها بالنظام القديم المتساهل اللي بيعدّي أخطاء كتير. الـ DOCTYPE هو الملاحظة دي، والمتصفح هو المصحّح.

> [!key] اكتب `<!DOCTYPE html>` في أول سطر في كل ملف HTML، حرفياً قبل أي حاجة تانية، ومتفكرش فيه تاني.

## try

امسح السطر الأول من الكود وشوف الفرق (ملحوظة: المعاينة هنا بتشتغل جوه `<iframe>` فممكن تفضل بنفس النتيجة حتى من غير DOCTYPE؛ مثال 3 تحت بيثبت الفرق الحقيقي بطريقة تانية).

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>تجربة</title></head>
<body>
  <p id="out"></p>
  <script>
    document.getElementById("out").textContent =
      "وضع الصفحة: " + document.compatMode;
  </script>
</body>
</html>
```

## syntax

```html nolive
<!DOCTYPE html>
```

- `<!` — بداية **الإعلان**. علامة التعجب هي اللي بتفرّقه عن الوسم العادي؛ لو نسيتها (`<DOCTYPE html>`) المتصفح هيعتبره وسم عادي مش معروف.
- `DOCTYPE` — الكلمة المفتاحية. مش حساسة لحالة الحروف: `doctype` و `Doctype` و `DOCTYPE` كلهم شغالين.
- `html` — **اسم نوع المستند**. لازم يكون `html` بالظبط (برضه مش حساس لحالة الحروف). أي كلمة تانية زي `html5` بتدخل المتصفح في Quirks Mode.
- `>` — نهاية الإعلان. مفيش وسم ختامي (`</!DOCTYPE>` ملوش وجود).
- مكانه: **أول حاجة** في الملف. المسافات والأسطر الفاضية قبله مش بتأثر، لكن أي نص أو عنصر قبله بيبوّظ الدنيا.

## use

- في **أول سطر في كل صفحة** `.html` بتعملها، من غير استثناء.
- في ملف القالب الأساسي (Layout) لو بتستخدم PHP أو Node أو أي لغة سيرفر؛ بيتكتب مرة واحدة في القالب اللي بيلفّ كل الصفحات.
- لما تحب الـ CSS يتصرف بنفس الطريقة في كل المتصفحات (حسابات العرض والارتفاع والمسافات تبقى متوقعة).
- لما بتقيس أبعاد الصفحة بـ JavaScript (زي `document.documentElement.clientHeight` و `scrollTop`)، لأن Quirks Mode بيغيّر نتايج بعضها.
- لما تعوز صفحتك تعدّي من أدوات الفحص زي W3C Validator و Lighthouse، اللي بتحذّرك لو الـ DOCTYPE ناقص.

## avoid

- متكتبش DOCTYPE القديم الطويل (HTML 4.01 أو XHTML) في أي صفحة جديدة؛ ده للتاريخ بس، والقصير أنضف وأضمن.
- متكتبش رقم نسخة زي `<!DOCTYPE html5>` أو `<!DOCTYPE html 5>`؛ ده بيدخلك Quirks Mode.
- متحطش أي نص أو عنصر أو أي مخرجات (زي رسالة debug من السيرفر) قبل الـ DOCTYPE.
- متكرّرهوش جوه الصفحة: لو بتبعت **جزء** HTML هيتحط جوه صفحة تانية (Partial / Fragment)، الجزء ده مفيهوش DOCTYPE خالص.
- متتوقعش منه إنه يحدد الترميز (encoding) أو اللغة؛ دول شغل `<meta charset>` ([[meta-charset]]) وخاصية `lang` على `<html>`.

## attributes

الـ DOCTYPE مش عنصر، فـ **مفيش ليه أي خصائص (Attributes)** خالص، ولا حتى [[global-attributes|الخصائص العامة]] زي `class` و `id`؛ يعني `<!DOCTYPE html class="x">` ملوش معنى. اللي ممكن تشوفه جواه مجرد **أجزاء** من الإعلان نفسه، مش خصائص. الأجزاء دي تحت للفهم، خصوصاً لو قابلت كود قديم.

### html {required}
اسم نوع المستند، وهو الجزء الوحيد المطلوب في الـ DOCTYPE الحديث. لازم يكون الكلمة `html` (بأي حالة حروف). لو كتبت اسم تاني المتصفح بيدخل Quirks Mode.

```html nolive
<!DOCTYPE html>
```

### PUBLIC {deprecated}
كانت بتيجي بعد الاسم في الـ DOCTYPE القديم، وبعدها **المعرّف العام** (Public Identifier) اللي بيقول أنهي نسخة من HTML. مثلاً `PUBLIC "-//W3C//DTD HTML 4.01//EN"`. اتحذفت من الشكل الحديث لأن المتصفحات مش بتستخدم DTD، لكن لسه بتقراها عشان تقرر الوضع لو لقيتها في صفحة قديمة.

### SYSTEM {deprecated}
معرّف نظام (System Identifier)، عبارة عن عنوان (URL) لملف الـ DTD، مثل `"http://www.w3.org/TR/html4/strict.dtd"`. الاستخدام الوحيد المسموح بيه دلوقتي في HTML هو الشكل الخاص `<!DOCTYPE html SYSTEM "about:legacy-compat">` اللي بتستخدمه بعض أدوات توليد الصفحات القديمة (بتحتاج صيغة XML)، وأي متصفح بيعامله زي `<!DOCTYPE html>` بالظبط. أنت مش محتاجه.

## examples

### 1) أصغر صفحة صحيحة
أي صفحة محترمة بتبدأ بـ `<!DOCTYPE html>` وبعدها `<html>` وجواها `<head>` و `<body>`. ده الهيكل الأساسي اللي هتكرره آلاف المرات. المتصفح هنا يعرض الصفحة في Standards Mode ومفيش أي مفاجآت.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي الأولى</title>
</head>
<body>
  <h1>أهلاً بيك</h1>
  <p>الصفحة دي بدأت بـ DOCTYPE صح.</p>
</body>
</html>
```

- السطر الأول هو الـ DOCTYPE، وبعده مباشرة `<html>` ([[html]]).
- جوه `<html>` فيه حتة `<head>` ([[head]]) للمعلومات، وحتة `<body>` ([[body]]) للمحتوى المرئي.

### 2) حالة الحروف مش فارقة
الـ DOCTYPE **مش حساس لحالة الحروف**: ممكن تكتبه كبير أو صغير أو خليط. الكل بيدخل Standards Mode. الأشهر في الأدوات الحديثة هو `<!DOCTYPE html>` بحروف كبيرة، لكن `<!doctype html>` بحروف صغيرة مستخدم برضه كتير. المهم تلتزم بشكل واحد في مشروعك.

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>حروف صغيرة</title></head>
<body>
  <p>كتبت DOCTYPE بحروف صغيرة.</p>
  <script>
    console.log("الاسم:", document.doctype.name);
    console.log("الوضع:", document.compatMode);
  </script>
</body>
</html>
```

- `document.doctype` هو الكائن اللي بيمثّل الـ DOCTYPE في الصفحة، و `name` بيرجّع `html` مهما كانت حالة الحروف.
- الـ console تحت المعاينة هتطبع `html` ثم `CSS1Compat`.

### 3) الدليل العملي على Quirks مقابل Standards
الخاصية `document.compatMode` بتقولك المتصفح دخل أنهي وضع: `CSS1Compat` يعني Standards Mode، و `BackCompat` يعني Quirks Mode. هنا بنستخدم `DOMParser` عشان نقرا نفس الجملة مرتين: مرة **بـ DOCTYPE** ومرة **من غيره**، ونقارن.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>المقارنة</title></head>
<body>
  <p>افتح الـ console تحت المعاينة.</p>
  <script>
    var parser = new DOMParser();
    var withDt = parser.parseFromString(
      "<!DOCTYPE html><p>أهلاً</p>", "text/html");
    var withoutDt = parser.parseFromString(
      "<p>أهلاً</p>", "text/html");
    console.log("بـ DOCTYPE:", withDt.compatMode);
    console.log("من غير DOCTYPE:", withoutDt.compatMode);
  </script>
</body>
</html>
```

- النتيجة: `CSS1Compat` للأولى و `BackCompat` للتانية.
- نفس الجملة بالظبط، والفرق الوحيد هو سطر الـ DOCTYPE. ده معناه إن النسخة التانية هتتعرض بقواعد المتصفحات القديمة.
- في صفحتك الحقيقية اكتب `document.compatMode` في الـ console بتاع المتصفح (DevTools) وهتعرف وضع صفحتك.

### 4) أنهي DOCTYPE بيدخّلك أنهي وضع
مش أي حاجة بتتكتب في الأول بتنفع. هنا بنجرّب عدة أشكال ونطبع الوضع لكل واحد. خد بالك من النتايج: الصيغة الحديثة والقديمة الكاملة بتدخل Standards، لكن رقم نسخة غلط أو غياب الـ DOCTYPE أو كلام قبله بيدخل Quirks.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>الأشكال المختلفة</title></head>
<body>
  <p>النتيجة في الـ console تحت المعاينة.</p>
  <script>
    var strict4 = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" ' +
      '"http://www.w3.org/TR/html4/strict.dtd">';
    var trans4 = '<!DOCTYPE HTML PUBLIC ' +
      '"-//W3C//DTD HTML 4.01 Transitional//EN">';
    var cases = [
      ["الحديث", "<!DOCTYPE html>"],
      ["بحروف صغيرة", "<!doctype html>"],
      ["مفيش DOCTYPE", ""],
      ["html5 (غلط)", "<!DOCTYPE html5>"],
      ["نص قبله", "مرحبا <!DOCTYPE html>"],
      ["أسطر فاضية قبله", "\n\n <!DOCTYPE html>"],
      ["HTML 4.01 Strict", strict4],
      ["4.01 Transitional بدون URL", trans4]
    ];
    cases.forEach(function (c) {
      var d = new DOMParser().parseFromString(c[1] + "<p>x</p>", "text/html");
      console.log(c[0] + " => " + d.compatMode);
    });
  </script>
</body>
</html>
```

- الأشكال الصحيحة بتطبع `CSS1Compat`، أما `html5` والنص قبل الـ DOCTYPE وغيابه فبتطبع `BackCompat`.
- الأسطر الفاضية قبل الـ DOCTYPE **مش مشكلة**؛ المشكلة في الكلام والعناصر.
- الـ DOCTYPE القديم `Transitional` من غير عنوان الـ URL بيدخل Quirks Mode، لكن لو معاه العنوان بيدخل «شبه المعايير» (Almost Standards) اللي `compatMode` بيعرضه برضه `CSS1Compat`.

### 5) الـ DOCTYPE في الـ DOM: عقدة مش عنصر
المتصفح بيحوّل الصفحة لشجرة اسمها **DOM**. الـ DOCTYPE بيدخل الشجرة كـ **عقدة من نوع خاص** (`DocumentType`) مش كعنصر. كل نوع عقدة له رقم: العناصر رقمها `1`، والـ DOCTYPE رقمه `10`. وهو أول ابن لـ `document` قبل `<html>`.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>عقدة DOCTYPE</title></head>
<body>
  <p>شوف الـ console تحت المعاينة.</p>
  <script>
    var dt = document.doctype;
    console.log("nodeType:", dt.nodeType);
    console.log("الاسم:", dt.name);
    console.log("publicId:", JSON.stringify(dt.publicId));
    console.log("أول ابن للصفحة هو الـ DOCTYPE؟",
      document.childNodes[0] === dt);
  </script>
</body>
</html>
```

- `publicId` فاضي لأن الـ DOCTYPE الحديث مفيهوش معرّف عام.
- لو الصفحة من غير DOCTYPE، `document.doctype` بترجّع `null`.

### 6) الـ DOCTYPE القديم (للتاريخ فقط)
ممكن تقابل الأشكال دي في مشاريع عمرها 15 سنة أو أكتر. الطويل بيقول «أنا HTML 4.01 Strict» وبيشاور على ملف DTD، والتاني لـ XHTML. **مش هتكتبهم في أي صفحة جديدة**، لكن لازم تعرفهم عشان متتلخبطش لما تشوفهم.

```html nolive
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- `PUBLIC` بعده **المعرّف العام**: اسم النسخة (مثلاً HTML 4.01) والمنظمة (W3C).
- النص اللي بين علامتي التنصيص التانيين هو **عنوان ملف DTD**: ملف بيشرح قواعد النسخة دي (المتصفحات مش بتحمّله فعلياً).
- الاتنين بيدخلوا Standards Mode، لكن الشكل ده كله اتبدّل بـ `<!DOCTYPE html>` اللي بيعمل نفس الشغل بدون كل التعقيد.

### 7) قالب جاهز تبدأ بيه كل صفحة
دي صفحة صغيرة كاملة بتبدأ بالـ DOCTYPE وبعدها كل الأساسيات: اللغة والاتجاه، الترميز، إعداد الموبايل، العنوان، ستايل بسيط، ومحتوى فيه `<header>` و `<main>` و `<footer>`. انسخها كبداية لأي مشروع.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>قالب البداية</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: auto; }
    header, footer { background: #eef; padding: 8px 16px; }
  </style>
</head>
<body>
  <header><h1>موقعي</h1></header>
  <main><p>هنا محتوى الصفحة الأساسي.</p></main>
  <footer><small>جميع الحقوق محفوظة</small></footer>
</body>
</html>
```

- السطر الأول `<!DOCTYPE html>`، ثم `<html>` بخاصيتي `lang` و `dir`.
- `<meta charset="UTF-8">` أول حاجة في `<head>` عشان العربي يظهر صح.
- في VS Code اكتب `!` واضغط `Tab` وهيولّد لك قالب شبه ده تلقائياً.

## section: وضع Quirks مقابل Standards

ممكن تقول إن فيه **تلات أوضاع** مش اتنين، لكن اتنين منهم قريبين جداً:

- **Standards Mode** (No-Quirks): الوضع الصح. المتصفح بيتبع المعايير الحديثة بالظبط. بتدخله بـ `<!DOCTYPE html>`.
- **Quirks Mode**: وضع الأخطاء. بيحاكي سلوك متصفحات التسعينات. بتدخله لو نسيت الـ DOCTYPE أو كتبته غلط.
- **Almost Standards Mode** (Limited-Quirks): تقريباً زي Standards بس مع اختلاف واحد قديم خاص بارتفاع السطور حوالين الصور جوه خلايا الجداول. بتدخله مع بعض الـ DOCTYPE القديمة (XHTML 1.0 Transitional مثلاً).

### إيه اللي بيتغيّر في Quirks Mode؟
المتصفح بيعمل حاجات مش بتحصل في الوضع العادي. أهمها اللي اتأكدنا منه:

- **الجداول مش بتورّث حجم الخط**: لو ضبطت `font-size` كبير على `<body>`، النص جوه `<table>` بيفضل بالحجم الافتراضي الصغير (16px مثلاً) بدل ما يورّث الحجم الكبير.
- **الأرقام من غير وحدة بتتقبل**: في الـ CSS لو كتبت `width: 100` المتصفح يعتبرها `100px`، وفي Standards القيمة دي بتتجاهل.
- **الألوان من غير #**: `color: ff0000` شغّالة في Quirks فقط.
- **الـ body بتملى الشاشة**: `<body>` و `<html>` بياخدوا ارتفاع الشاشة كلها حتى لو المحتوى قليل. في Standards ارتفاعهم بيعتمد على المحتوى بس.
- **JavaScript بيتصرف مختلف**: `document.scrollingElement` بيرجّع `<body>` في Quirks و `<html>` في Standards، فأكواد قياس التمرير (Scroll) بتدي نتايج مختلفة.
- حسابات ارتفاع السطور والخلايا وعرضها بتختلف شوية.

الخلاصة: **متدخلش Quirks Mode إلا لو بتصلح صفحة قديمة جداً ومقصود إنها كده**. أي صفحة جديدة ابدأها بـ Standards.

## rules

- parents: مفيش. الـ DOCTYPE بيتكتب في **أول المستند** قبل `<html>`، وقبله مسموح بس مسافات أو أسطر فاضية أو تعليق `<!-- -->` (الأفضل متحطش حتى التعليق).
- children: مفيش. ملوش محتوى ولا عناصر جواه، هو سطر واحد.
- closing: مفيش وسم ختامي؛ بينتهي بـ `>` وخلاص.
- role: مفيش، لأنه مش عنصر ومش بيظهر في شجرة الـ accessibility.
- dom: `DocumentType` (عقدة رقم 10)، وبتوصلها من `document.doctype`.
- layout: مش بيتعرض خالص، ومش بيشغل أي مساحة في الصفحة.

## mistakes

### نسيان علامة التعجب
```html bad
<doctype html>
<html lang="ar">
```
```html good
<!DOCTYPE html>
<html lang="ar">
```
من غير `!` المتصفح مش بيشوفه إعلان، بيشوفه **وسم عادي مش معروف** اسمه `doctype`. النتيجة: مفيش DOCTYPE حقيقي، والصفحة تدخل Quirks Mode، وكمان العنصر الغريب ده بيتحط جوه الـ `<body>`.

### كتابة رقم نسخة
```html bad
<!DOCTYPE html5>
<html lang="ar">
```
```html good
<!DOCTYPE html>
<html lang="ar">
```
الاسم لازم يكون `html` بالظبط. كتير من المبتدئين بيكتبوا `html5` أو `HTML 5` عشان سمعوا اسم «HTML5»، لكن ده بيخلّي المتصفح يعتبر الإعلان غير معروف فيدخل Quirks Mode. الاسم الرسمي للمعيار الحالي مفيهوش رقم أصلاً.

### كلام أو مخرجات قبل الـ DOCTYPE
```html bad
مرحبا
<!DOCTYPE html>
<html lang="ar">
```
```html good
<!DOCTYPE html>
<html lang="ar">
```
أي نص أو عنصر قبل الـ DOCTYPE بيخلّي المتصفح يتجاهله ويدخل Quirks Mode. بيحصل كتير مع كود السيرفر (PHP مثلاً) لما يطبع رسالة أو مسافة أو حتى علامة BOM مخفية قبل أول سطر. اتأكد إن الـ DOCTYPE هو أول حاجة بتخرج من الملف.

### نسخ DOCTYPE قديم ناقص
```html bad
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
```
```html good
<!DOCTYPE html>
```
الـ DOCTYPE القديم من نوع `Transitional` من غير عنوان الـ DTD (الـ URL) بيدخل Quirks Mode، وده غالباً بيحصل لما حد ينسخ كود قديم ناقص من موقع قديم. الحل أبسط: استخدم القصير الحديث وارتاح.

## a11y

- الـ DOCTYPE نفسه **مش بيظهر** لقارئ الشاشة (Screen Reader) ولا للتقنيات المساعدة، لكنه بيأثر بشكل غير مباشر: Standards Mode بيخلّي الشكل متوقع على كل المتصفحات والأجهزة، وده بيحافظ على أحجام الخطوط والمسافات اللي أنت قصدتها (في Quirks مثلاً الجداول بتتجاهل حجم الخط اللي ضبطته).
- الصفحات في Quirks Mode أصعب في التكبير والـ Responsive، وده بيأثر على ناس بتكبّر الصفحة أو بتستخدم شاشات صغيرة.
- أدوات الفحص زي Lighthouse و W3C Validator بتحذّرك لو الـ DOCTYPE مفقود؛ استخدمها كجزء من مراجعة الجودة قبل النشر.
- الـ DOCTYPE لا يحدد لغة الصفحة؛ قارئ الشاشة بيعتمد على خاصية `lang` في [[html|عنصر `<html>`]]، فاكتبها دايماً جنب الـ DOCTYPE.

## tips

- شغّل الـ DevTools واكتب `document.compatMode` في الـ Console: لو طلع `CSS1Compat` فصفحتك في Standards، ولو `BackCompat` فهي في Quirks.
- لو صفحتك بتتصرف بغرابة (مسافات مش مفهومة، خطوط مختلفة جوه الجداول، ارتفاع الـ body غريب) **أول حاجة تتأكد منها** هي الـ DOCTYPE.
- محرّرات الكود الحديثة (VS Code بـ Emmet) بتكتب القالب الأساسي لما تكتب `!` وتدوس `Tab`.
- الصفحات اللي بتتقدّم كـ XML (`application/xhtml+xml`) مش بتدخل Quirks Mode أصلاً، لكن ده نادر للمبتدئين.
- فكّر في الـ DOCTYPE كـ «توقيع» ثابت في بداية كل ملف: متعدّلوش ومتدخلش فيه.

## quiz

### إيه الشكل الصحيح للـ DOCTYPE في HTML الحديث؟
- [ ] `<!DOCTYPE html5>`
- [ ] `<doctype html>`
- [x] `<!DOCTYPE html>`
- [ ] `<!DOCTYPE HTML 5.0>`

الشكل الصحيح هو `<!DOCTYPE html>` بدون رقم نسخة. غير كده المتصفح يعتبره إعلان غير معروف ويدخل Quirks Mode.

### إيه اللي بيحصل لو نسيت الـ DOCTYPE خالص؟
- [ ] الصفحة مش بتتفتح
- [x] المتصفح بيدخل Quirks Mode ويحاكي سلوك المتصفحات القديمة
- [ ] المتصفح بيحط DOCTYPE تلقائياً ويشتغل عادي في Standards Mode
- [ ] الصفحة بتتعرض من غير ألوان

الصفحة بتتفتح، لكن المتصفح بيدخل **Quirks Mode** وبيطبق قواعد قديمة، فتشوف اختلافات غريبة في الأحجام والمسافات وسلوك الجداول.

### ينفع نكتب `<!doctype html>` بحروف صغيرة؟
- [x] أيوه، الـ DOCTYPE مش حساس لحالة الحروف
- [ ] لأ، لازم حروف كبيرة وإلا Quirks Mode
- [ ] أيوه، لكن في Chrome بس
- [ ] لأ، لازم تكتب `html` بحروف كبيرة

الكلمة `DOCTYPE` واسم النوع `html` مش حساسين لحالة الحروف في HTML، فالشكلين `<!DOCTYPE html>` و `<!doctype html>` بيدخّلوك Standards Mode.

### إيه المشكلة في الكود ده؟ `مرحبا <!DOCTYPE html>`
- [ ] مفيش مشكلة
- [ ] المشكلة إنه لازم يتكتب بحروف صغيرة
- [x] فيه نص قبل الـ DOCTYPE، فالمتصفح بيتجاهله ويدخل Quirks Mode
- [ ] المشكلة إن الكلمة «مرحبا» عربي

الـ DOCTYPE لازم يكون **أول حاجة** في الملف. أي نص أو عنصر قبله بيخلّي المتصفح يدخل Quirks Mode. المسافات والأسطر الفاضية بس هي اللي مسموحة.

## refs

- [MDN: Doctype (Glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Doctype)
- [MDN: Quirks mode and standards mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)
- [WHATWG: The DOCTYPE](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype)
- [WHATWG: Quirks Mode Standard](https://quirks.spec.whatwg.org/)
