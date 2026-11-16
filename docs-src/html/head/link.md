---
id: link
kind: element
cat: head
tag: link
title: عنصر الربط بملفات خارجية (link)
en: HTML external resource link element
status: stable
display: none
void: yes
support: all
summary: عنصر link بيربط الصفحة بملفات أو موارد خارجية زي ملف الستايل وأيقونة الموقع والخطوط، وبيقول للمتصفح العلاقة (rel) بين الصفحة والملف ده.
keywords: link, ربط ملف, stylesheet, ستايل خارجي, favicon, أيقونة الموقع, rel, preload, canonical, preconnect
related: style, a, head, meta, script, base
---

## intro

عنصر `<link>` بيقول للمتصفح: «الصفحة دي ليها علاقة بملف تاني، روح هاته». الاستخدام الأشهر ليه إنه يربط الصفحة بملف **الستايل** (`style.css`)، فبدل ما تكتب كل التنسيق جوه الصفحة، تكتبه في ملف لوحده وتستدعيه بسطر واحد. لكنه بيعمل حاجات تانية كتير: أيقونة التبويب (favicon)، تحميل الخطوط بسرعة، تحديد الرابط الأصلي للصفحة لمحركات البحث، وغيرهم.

سر `<link>` كله في خاصية **`rel`** (اختصار *relationship* يعني العلاقة). هي اللي بتقول المتصفح «الملف ده بالنسبة للصفحة دي إيه؟». لو `rel="stylesheet"` فده ملف ستايل. لو `rel="icon"` فده أيقونة. لو `rel="canonical"` فده الرابط الأصلي للصفحة. نفس العنصر، وظايف مختلفة بس بتغيير `rel`.

لازم تعرف الفرق بينه وبين `<a>`: الاتنين بيعملوا «رابط»، لكن `<a>` بيظهر للزائر وهو اللي بيدوس عليه وينتقل. أما `<link>` فهو **مخفي**، وبيتحط في الـ `<head>` ومالوش علاقة بالضغط: ده اتصال بين الصفحة والملفات اللي هي محتاجاها.

وكمان فيه فرق بينه وبين `<style>`: الـ `<style>` بتكتب التنسيق جواه، أما `<link>` فبيشاور على ملف التنسيق. ومعظم المشاريع الحقيقية بتفضّل `<link>` لأن الملف بيتخزّن في الـ cache وبيتستخدم في كل الصفحات.

> [!analogy] تخيّل إنك بتكتب بحث وفي الهامش كتبت «شوف المرجع رقم 3» و«الصورة في الملحق». `<link>` هو الهامش ده: مش جزء من الكلام، لكنه بيقول للقارئ إيه الملفات التانية اللي لازم تتفتح معاه.

> [!key] `<link>` عنصر **فارغ (Void)**: من غير وسم إغلاق. أهم خاصيتين: `rel` (إيه العلاقة) و `href` (الملف فين).

## try

الكود ده بيربط الصفحة بستايل. مفيش ملفات خارجية متاحة في المعاينة، فاستخدمنا رابط من نوع `data:` يحتوي على ستايل جاهز عشان تشوف تأثير `<link>` فعلاً. جرّب تغيّر اللون.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet"
        href="data:text/css,p{color:%23c2185b;font-size:22px}">
</head>
<body>
  <p>الستايل بتاع الفقرة دي جاي من عنصر link.</p>
</body>
</html>
```

## syntax

```html nolive
<head>
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="favicon.png" type="image/png">
  <link rel="canonical" href="https://example.com/page">
</head>
```

- `<link>` — عنصر **فارغ (Void)**، من غير وسم إغلاق، ومكانه جوه `<head>`.
- `rel="..."` — بتحدد نوع العلاقة (ستايل، أيقونة، ...). **أهم خاصية.**
- `href="..."` — مكان الملف (رابط مطلق أو نسبي).
- باقي الخصائص (`type`, `media`, `as`, `crossorigin`, ...) اختيارية حسب نوع `rel`.

## use

- لربط ملف CSS خارجي (`rel="stylesheet"`): الاستخدام الأكتر.
- لتحديد أيقونة الموقع في التبويب (`rel="icon"`).
- لتحسين الأداء: تحميل الخطوط والصور مقدماً (`preload`) أو الاتصال بسيرفر خارجي بدري (`preconnect`).
- للـ SEO: تحديد الرابط الأصلي للصفحة (`rel="canonical"`) أو نسخها بلغات تانية (`rel="alternate"`).
- لتعريف PWA (تطبيق ويب) بملف manifest (`rel="manifest"`).
- لتفعيل ستايل حسب نوع الجهاز بخاصية `media` (طباعة، موبايل، ...).

## avoid

- متستخدمش `<link>` في الـ body عشان تعمل رابط للمستخدم: ده شغل `<a>`.
- متربطش ملفات CSS كتير زيادة عن اللزوم، لأن كل ملف طلب (Request) إضافي. دمّجهم قدر الإمكان.
- لو الستايل صغير جداً وخاص بصفحة واحدة ممكن `<style>` يكون أبسط.
- متنساش `rel`، من غيره `<link>` ما بيعملش حاجة.

## attributes

بيقبل `<link>` **الخصائص العامة** (راجع [[global-attributes]]) بالإضافة للخصائص دي:

### href {required}
عنوان الملف أو المورد. ممكن يكون رابط مطلق (`https://...`) أو نسبي (`css/style.css`). في أغلب الأنواع لازم `href` يكون موجود.

```html nolive
<link rel="stylesheet" href="css/style.css">
```

### rel {required}
**العلاقة** بين الصفحة والملف. أشهر القيم:

- `stylesheet` — ملف ستايل CSS.
- `icon` — أيقونة التبويب (favicon).
- `apple-touch-icon` — أيقونة لما تضيف الصفحة لشاشة أجهزة آبل.
- `canonical` — الرابط الأصلي للصفحة (لمحركات البحث).
- `alternate` — نسخة بديلة (لغة تانية، RSS، نسخة للطباعة).
- `preload` — حمّل الملف ده بدري لأني هحتاجه قريب.
- `prefetch` — حمّله في الوقت الفاضي لأني ممكن أحتاجه في الصفحة الجاية.
- `preconnect` — افتح اتصال بالسيرفر ده بدري.
- `dns-prefetch` — اعمل بحث DNS بدري للدومين ده.
- `modulepreload` — حمّل موديول جافاسكربت بدري.
- `manifest` — ملف manifest للتطبيقات (PWA).

```html nolive
<link rel="icon" href="favicon.png">
<link rel="canonical" href="https://example.com/page">
```

### type
نوع الملف (MIME type) زي `text/css` أو `image/png`. للستايل مش لازم تكتبه لأن المتصفح بيفهم. بيفيد مع الأيقونات (`image/svg+xml`) وللمتصفح يعرف يتخطى الملفات اللي مش بيدعمها.

### media
شرط على الجهاز عشان الملف يتطبق، زي `print` أو `(max-width: 600px)`. المتصفح بيحمّل الملف دايماً لكنه بيطبقه بس لما الشرط يتحقق.

```html nolive
<link rel="stylesheet" href="print.css" media="print">
<link rel="stylesheet" href="mobile.css" media="(max-width: 600px)">
```

### as
بتستخدم مع `rel="preload"` عشان تقول نوع الملف: `style` أو `script` أو `font` أو `image` أو `fetch` أو `video` أو `audio` أو `document` أو `track`. المتصفح بيحتاجها عشان يحدد أولوية الملف.

```html nolive
<link rel="preload" href="font.woff2" as="font"
      type="font/woff2" crossorigin>
```

### crossorigin
بتحدد إزاي يتحمّل الملف من دومين تاني: `anonymous` (من غير كوكيز) أو `use-credentials` (مع الكوكيز). الخطوط لازم تتحمّل بـ `crossorigin` حتى لو من دومين تاني.

### integrity
بصمة (Hash) الملف للتأكد إنه ما اتغيّرش. بتستخدمها مع ملفات الـ CDN للأمان (Subresource Integrity).

```html nolive
<link rel="stylesheet" href="https://cdn.example.com/lib.css"
      integrity="sha384-..." crossorigin="anonymous">
```

### hreflang
لغة المورد اللي الرابط بيشاور عليه. بتستخدم مع `rel="alternate"` للنسخ بلغات مختلفة.

### sizes
أحجام الأيقونة (للأيقونات): زي `32x32` أو `192x192` أو `any`.

### imagesrcset
بتستخدم مع `rel="preload" as="image"` لتحميل صورة متجاوبة بدري، زي خاصية `srcset` في `<img>` بالظبط.

### imagesizes
زوج `imagesrcset`: بتحدد عرض الصورة بالنسبة للشاشة، زي `sizes` في `<img>`.

### referrerpolicy
بتحدد معلومات الـ Referer اللي تتبعت مع طلب الملف، زي `no-referrer` و `origin`.

### fetchpriority
تلميح للمتصفح عن أولوية التحميل: `high` أو `low` أو `auto`. (متاحة في المتصفحات الحديثة.)

### blocking
تلميح بإن الملف يعطّل العرض لحد ما يتحمّل. القيمة الحالية المعروفة `render` وبتتفعّل في المتصفحات الحديثة. استخدمها بحذر.

### title
بتستخدم مع الستايل البديل (Alternate Stylesheets): اسم يظهر للمستخدم عشان يختار الستايل. نادرة الاستخدام.

### disabled {deprecated}
كان بيتحط على `<link>` عشان يوقف ملف الستايل. مش جزء من المعيار الحالي كخاصية HTML، لكن بتلاقي `link.disabled` كخاصية جافاسكربت بتقدر تضبطها من السكربت.

### charset {deprecated}
كان بيحدد ترميز الملف المربوط. **قديمة**: خلّي الملف نفسه UTF-8 وخلّي السيرفر يبعت الترميز صح.

### rev {deprecated}
كانت بتحدد العلاقة العكسية (من الملف للصفحة). **قديمة** ومش بتستخدم.

### target {deprecated}
كانت بتحدد مكان تطبيق الرابط. **قديمة** ومالهاش أي استخدام دلوقتي.

## examples

### 1) ربط ملف ستايل (الاستخدام الأشهر)
في أي مشروع حقيقي بتحط التنسيق في ملف `style.css` وتربطه بـ `<link>`. الكود ده `nolive` لأن الملف مش موجود هنا.

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>صفحتي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>أهلاً</h1>
</body>
</html>
```

- `rel="stylesheet"` بيقول للمتصفح «الملف ده تنسيق».
- `href="style.css"` هو اسم الملف (في نفس مجلد الصفحة).
- المتصفح بيحمّل الملف ويطبّق التنسيق على الصفحة قبل ما يعرضها.

### 2) ستايل بـ data URI عشان تشوف التأثير
في المعاينة مفيش ملفات، فبنستخدم `data:` عشان الستايل يتكتب جوه الرابط نفسه. نفس الفكرة بالظبط.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet"
        href="data:text/css,h1{color:%231565c0}p{background:%23e3f2fd;padding:6px}">
</head>
<body>
  <h1>عنوان أزرق</h1>
  <p>فقرة بخلفية زرقاء فاتحة</p>
</body>
</html>
```

- `%23` هي طريقة كتابة علامة `#` جوه الرابط (ما ينفعش تكتبها عادي).
- تقدر تغيّر الألوان وتشوف النتيجة على طول.

### 3) أكتر من ملف ستايل
تقدر تربط أكتر من ملف، والملف اللي بعده بيغلب اللي قبله لو فيه تعارض.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="data:text/css,p{color:red;font-size:20px}">
  <link rel="stylesheet" href="data:text/css,p{color:green}">
</head>
<body>
  <p>لوني أخضر (الملف التاني غلب)، وحجمي 20px (من الملف الأول).</p>
</body>
</html>
```

- الملف التاني غيّر اللون لأخضر، لكن حجم الخط فضل من الأول.
- في المشاريع الكبيرة بنفصل الملفات: ستايل أساسي وستايل لكل صفحة.

### 4) ستايل للطباعة بـ media
بتقدر تحدد إن ملف معين يتطبق في حالة معينة. الكود ده يخفي الأزرار لما المستخدم يطبع.

```html nolive
<head>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="print.css" media="print">
</head>
```

- الأول بيشتغل دايماً.
- التاني بيشتغل بس لما المستخدم يدوس طباعة (Ctrl+P).

### 5) أيقونة الموقع (favicon)
الأيقونة الصغيرة اللي في التبويب جنب العنوان. بتتحط بـ `rel="icon"`.

```html nolive
<head>
  <link rel="icon" href="favicon.ico" sizes="32x32">
  <link rel="icon" href="icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="apple-icon-180.png">
</head>
```

- ممكن تحط أكتر من أيقونة بأحجام مختلفة والمتصفح يختار المناسب.
- `apple-touch-icon` للأجهزة بتاعة آبل لما تضيف الصفحة للشاشة الرئيسية.

### 6) تحسين الأداء: preconnect و preload
الخطوط والملفات المهمة ممكن تتحمّل بدري عشان الصفحة تظهر أسرع.

```html nolive
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="hero.jpg" as="image">
  <link rel="stylesheet" href="style.css">
</head>
```

- `preconnect` بيفتح الاتصال بالسيرفر قبل ما تحتاج الملف نفسه.
- `preload` بيقول «الصورة دي لازم تظهر أول ما الصفحة تفتح، حمّلها دلوقتي».

### 7) الرابط الأصلي ولغات تانية للـ SEO
بتقول لجوجل إيه النسخة الأصلية من الصفحة، والنسخ بلغات تانية.

```html nolive
<head>
  <link rel="canonical" href="https://example.com/html-course">
  <link rel="alternate" hreflang="en" href="https://example.com/en/html-course">
  <link rel="alternate" hreflang="ar" href="https://example.com/html-course">
</head>
```

- `canonical` بيمنع تكرار الصفحة في نتايج البحث لو ليها أكتر من رابط.
- `alternate` + `hreflang` بيساعد جوجل يعرض الصفحة بلغة الزائر.

## rules

- parents: `<head>`، وأنواع معينة (زي `rel="stylesheet"` و `preload`) مسموحة كمان جوه `<body>`.
- children: مفيش (عنصر فارغ).
- closing: مفيش وسم إغلاق (Void).
- role: مفيش.
- dom: `HTMLLinkElement`.
- layout: `display: none`.

## mistakes

### نسيان rel
```html bad
<link href="style.css">
```
```html good
<link rel="stylesheet" href="style.css">
```
ليه؟ من غير `rel` المتصفح مش عارف الملف ده إيه، فبيتجاهله ومفيش تنسيق هيتطبق.

### كتابة وسم إغلاق
```html bad
<link rel="stylesheet" href="style.css"></link>
```
```html good
<link rel="stylesheet" href="style.css">
```
ليه؟ `<link>` عنصر فارغ مفيش له وسم إغلاق. الكتابة الصحيحة سطر واحد.

### استخدام link كرابط للمستخدم
```html bad
<body>
  <link rel="stylesheet" href="page2.html">
</body>
```
```html good
<body>
  <a href="page2.html">الصفحة التانية</a>
</body>
```
ليه؟ `<link>` مخفي ومش بيتضغط. اللي المستخدم يضغط عليه هو `<a>`.

## a11y

- ملف الستايل الخارجي لو فشل في التحميل الصفحة تفضل مقروءة. اكتب HTML بمعنى سليم ومن غير الاعتماد على الستايل.
- لو بتغيّر لون النص بالستايل، اتأكد من التباين الكافي (Contrast).
- ممكن تستخدم `media="(prefers-reduced-motion: reduce)"` لإعطاء ستايل أهدأ للي بيفضّلوا حركة أقل.

## tips

- ضيف `rel="preconnect"` لأي دومين خارجي (زي الخطوط) عشان تكسب بعض الملي ثانية.
- متحملش خطوط كتيرة أوي: كل خط بيبطّئ الصفحة.
- في تبويب Network في DevTools تقدر تشوف الملفات اللي `<link>` حمّلها.
- لو اتغيّر ملف CSS والمتصفح لسه بيعرض القديم، ضيف رقم نسخة: `style.css?v=2`.

## quiz

### إيه الخاصية اللي بتحدد نوع الملف اللي `<link>` بيربطه؟
- [ ] `href`
- [x] `rel`
- [ ] `type`
- [ ] `src`
`rel` بتحدد العلاقة (ستايل، أيقونة...). `href` هو مكان الملف بس.

### أي سطر بيربط ملف ستايل صح؟
- [ ] `<link src="style.css">`
- [ ] `<link href="style.css"></link>`
- [x] `<link rel="stylesheet" href="style.css">`
- [ ] `<style href="style.css">`
الصح لازم يكون فيه `rel="stylesheet"` و `href`، ومن غير وسم إغلاق.

### الفرق بين `<link>` و `<a>`؟
- [ ] نفس الشيء
- [x] `<link>` مخفي بيربط ملفات، و `<a>` ظاهر وبيدوس عليه المستخدم
- [ ] `<a>` بيربط الستايل
- [ ] `<link>` بيتحط في الـ body بس
`<link>` للربط بين الصفحة والملفات المساعدة، و `<a>` للتنقل.

## refs

- [MDN: link](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)
- [MDN: rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel)
- [WHATWG: The link element](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)
