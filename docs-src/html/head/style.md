---
id: style
kind: element
cat: head
tag: style
title: عنصر الستايل (style)
en: HTML style information element
status: stable
display: none
void: no
support: all
summary: عنصر style بيخليك تكتب كود CSS جوه الصفحة نفسها عشان تنسّق شكل العناصر من غير ما تحتاج ملف خارجي.
keywords: style, ستايل, css داخلي, internal css, تنسيق, embedded styles, media, nonce
related: link, head, script, div, p
---

## intro

عنصر `<style>` هو المكان اللي بتكتب فيه **تنسيق الصفحة** (بلغة CSS) جوه ملف الـ HTML نفسه. لو عايز كل الفقرات تبقى حمرا، أو الخلفية تبقى بيج، بتكتب القواعد دي جوه `<style>`، والمتصفح بيطبّقها على الصفحة.

ببساطة فيه تلات طرق لتنسيق العناصر: تكتب الستايل **جوه العنصر نفسه** بخاصية `style=""` (ده اسمه Inline)، أو تكتبه **في عنصر `<style>`** في الصفحة (Internal)، أو تحطه **في ملف لوحده** وتربطه بـ `<link>` (External). عنصر `<style>` هو الطريقة الوسط: ينفع للصفحة الواحدة أو للأمثلة التجريبية، لكن في المشاريع الكبيرة الأفضل ملف خارجي.

جواه بتكتب كود CSS عادي، يعني **قاعدة** زي `p { color: red; }` معناها «كل فقرة `<p>` لونها أحمر». العنصر نفسه مش بيتعرض للزائر (زي أي عنصر في الـ head)، لكن تأثيره بيظهر على باقي الصفحة.

المكان الطبيعي ليه هو جوه `<head>`. وفي الواقع المتصفحات بتقبله جوه `<body>` كمان وبتطبّقه، لكن ده مش بيتنصح بيه لأنه بيبوّظ ترتيب الكود وممكن يعمل وميض (flash) قبل ما الستايل يتطبق. الأحسن تحطه دايماً في الـ head.

> [!analogy] تخيّل إنك بتزوّق شقة. الطريقة الأولى: كل ما تيجي تدهن حيطة تمسك الفرشة وتدهن بإيدك (Inline). الطريقة التانية: تكتب ورقة تعليمات على باب الشقة «كل الحيطان بيج» (`<style>`). التالتة: تسيب الورقة دي في مكتب تاني وكل شقق العمارة ترجع لها (`<link>`).

## try

غيّر لون الفقرة أو لون العنوان، وشوف كيف قاعدة واحدة في `<style>` بتغيّر شكل كل العناصر من النوع ده.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    h1 { color: #00695c; }
    p  { color: #c62828; font-size: 20px; }
  </style>
</head>
<body>
  <h1>عنوان أخضر</h1>
  <p>فقرة حمرا.</p>
  <p>فقرة حمرا تانية، من نفس القاعدة.</p>
</body>
</html>
```

## syntax

```html nolive
<head>
  <style>
    selector {
      property: value;
    }
  </style>
</head>
```

- `<style>` — **الوسم الافتتاحي**: بيبدأ منطقة كود CSS.
- `selector` — **المحدّد**: بيقول القاعدة هتتطبق على أنهي عناصر (زي `p` أو `.card` أو `#main`).
- `property: value;` — **الإعلان**: اسم الخاصية وقيمتها، وبينهم نقطتين وفي الآخر فاصلة منقوطة.
- `</style>` — **الوسم الختامي** إجباري.

## use

- لتنسيق صفحة واحدة بسيطة من غير ما تعمل ملف CSS لوحده.
- في الأمثلة التعليمية وتجارب الأكواد (زي اللي في الموقع ده).
- للتنسيق الحرج (Critical CSS) اللي لازم يتحمل مع الصفحة نفسها لسرعة أول عرض.
- لتغيير ستايل بسيط حسب نوع الجهاز بخاصية `media`.
- في رسايل الإيميل HTML (لأن الملفات الخارجية بتتحجب أحياناً).

## avoid

- متكتبش ستايل المشروع كله جوه `<style>` في كل صفحة: هتكرر الكود ومش هيتخزن في الـ cache. استخدم ملف خارجي بـ `<link>`.
- متحطوش جوه `<body>` لو تقدر: مكانه الصح الـ head.
- مش بديل لـ `style=""` لما محتاج تغيّر عنصر واحد بس بشكل مؤقت، لكن حتى كده الأفضل class.
- متستخدمش الخصائص القديمة (زي `bgcolor`) لما `<style>` متاح.

## attributes

بالإضافة للخصائص العامة ([[global-attributes]])، عنصر `<style>` ليه الخصائص دي:

### media
شرط (Media Query) بيحدد إمتى الستايل يتطبق. مثلاً `print` لما يطبع، أو `(max-width: 600px)` للشاشات الصغيرة. لو ما كتبتهاش الستايل بيتطبق دايماً.

```html nolive
<style media="print">
  .no-print { display: none; }
</style>
<style media="(max-width: 600px)">
  body { font-size: 14px; }
</style>
```

### nonce
قيمة عشوائية بتستخدم مع سياسة الأمان (CSP) عشان تسمح لـ `<style>` معين يشتغل لو الموقع بيمنع الستايل الداخلي. معظم المبتدئين مش هيحتاجوها.

### title
بتستخدم مع الستايل البديل (Alternate stylesheet). نادرة جداً.

### blocking
تلميح بإن الستايل ده يعطّل العرض لحد ما يتحلل (`blocking="render"`). متاحة في المتصفحات الحديثة وبتستخدم بحذر.

### type {deprecated}
كانت بتكتب `type="text/css"` في الماضي. **مش مطلوبة** دلوقتي: لو كتبتها ومعاها قيمة غير `text/css` المتصفح هيتجاهل الستايل كله. الأفضل متكتبهاش أبداً.

## examples

### 1) أول قاعدة CSS
أبسط حاجة: قاعدة واحدة بتلوّن كل `<p>`.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    p { color: royalblue; }
  </style>
</head>
<body>
  <p>فقرة زرقا.</p>
  <p>فقرة زرقا تانية.</p>
</body>
</html>
```

- `p` هو المحدد، و `color: royalblue;` هو الإعلان. أي `<p>` في الصفحة هيتأثر.

### 2) أكتر من خاصية وأكتر من محدد
تقدر تحط خصائص كتير في قاعدة واحدة، وتكتب قواعد لعناصر مختلفة.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    body { background: #f5f5f5; font-family: Tahoma, sans-serif; }
    h1   { color: #1b5e20; border-bottom: 3px solid #1b5e20; }
    p    { line-height: 2; background: white; padding: 8px; }
  </style>
</head>
<body>
  <h1>مقال تجريبي</h1>
  <p>فقرة بتنسيق بسيط.</p>
</body>
</html>
```

- كل سطر فيه قاعدة جديدة لعنصر مختلف.
- لاحظ إن `<style>` بيتحط مرة واحدة وفيه كل القواعد.

### 3) الكلاس (class) لتنسيق جزء معيّن
بدل ما تنسّق كل الفقرات، تقدر تدّي بعضها اسم (class) وتنسّق الاسم ده بس.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    .important { background: #fff3cd; border-right: 5px solid orange; padding: 8px; }
  </style>
</head>
<body>
  <p>فقرة عادية.</p>
  <p class="important">فقرة مهمة بتنسيق مميز.</p>
</body>
</html>
```

- النقطة قبل الاسم (`.important`) معناها «العناصر اللي class بتاعها important».
- في HTML بنكتب `class="important"`. اقرا عن `class` في [[global-attributes]].

### 4) Inline مقابل style
نفس النتيجة بطريقتين: جوه العنصر مباشرة، وجوه `<style>`. الأفضل الاستخدام الثاني للاستخدام المتكرر.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    .box { padding: 10px; background: #e1f5fe; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div style="padding:10px;background:#e1f5fe;margin-bottom:8px">Inline</div>
  <div class="box">من style</div>
  <div class="box">وكمان من style</div>
</body>
</html>
```

- الأول مكتوب جوه العنصر، لو عندك 10 عناصر هتكرره 10 مرات.
- الاتنين التانيين بيستخدموا نفس القاعدة اللي في `<style>`.

### 5) media: ستايل حسب الشاشة
الـ `<style>` ممكن يتطبق في حالة معينة. هنا الخلفية بتتغير حسب عرض نافذة المعاينة.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    body { background: #e8f5e9; }
  </style>
  <style media="(max-width: 500px)">
    body { background: #fce4ec; }
  </style>
</head>
<body>
  <p>خلفيتي خضرا على الشاشة الكبيرة، ووردي على الشاشة الأصغر من 500px.</p>
</body>
</html>
```

- غيّر عرض المتصفح (أو افتح المثال على الموبايل) هتلاحظ التغيير.

### 6) ترتيب القواعد: الأخير بيغلب
لو قاعدتين لنفس العنصر، اللي بتيجي **بعد** بتغلب (لو نفس الأهمية).

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    p { color: red; }
    p { color: blue; }
  </style>
</head>
<body>
  <p>أنا أزرق (التاني غلب).</p>
</body>
</html>
```

- في الواقع الأمر بيعتمد على قواعد أعمق (الأولوية Specificity)، لكن كبداية افتكر إن الأحدث بيغلب لو الباقي متساوي.

## rules

- parents: عادةً `<head>`. وبيشتغل كمان جوه `<body>` لكن الأفضل لأ.
- children: **نص فقط** (كود CSS).
- closing: الوسم الختامي `</style>` إجباري.
- role: مفيش.
- dom: `HTMLStyleElement`.
- layout: `display: none`.

## mistakes

### نسيان وسم الإغلاق
```html bad
<style>
  p { color: red; }
<p>فقرة</p>
```
```html good
<style>
  p { color: red; }
</style>
<p>فقرة</p>
```
ليه؟ من غير `</style>` المتصفح هيعتبر الصفحة كلها كود CSS.

### كتابة HTML جوه style
```html bad
<style>
  <p style="color:red">فقرة</p>
</style>
```
```html good
<style>
  p { color: red; }
</style>
```
ليه؟ جوه `<style>` بتكتب CSS بس، مش HTML.

### نسيان الفاصلة المنقوطة
```html bad
<style>
  p { color: red font-size: 20px }
</style>
```
```html good
<style>
  p { color: red; font-size: 20px; }
</style>
```
ليه؟ الفاصلة المنقوطة بتفصل بين الخصائص. من غيرها المتصفح بيتلخبط ويتجاهل الإعلانات.

## a11y

- اتأكد من التباين الكافي بين لون النص والخلفية.
- متعتمدش على اللون بس لنقل معلومة: اكتب النص كمان.
- ما تخفيش المحتوى المهم بـ `display: none` لو عايز قارئ الشاشة يقراه.
- احترم تفضيلات المستخدم زي `prefers-reduced-motion` و `prefers-color-scheme` باستخدام `media`.

## tips

- في الأمثلة الصغيرة `<style>` ممتاز. في المشاريع الحقيقية استخدم ملف خارجي بـ `<link>`.
- لو الستايل جوه الصفحة ومش بيتطبق، اتأكد إن مفيش خطأ في الفاصلة والأقواس.
- افتح DevTools وشوف الأنماط المطبقة على أي عنصر، وهتعرف الـ `<style>` بتاعك اشتغل ولا لأ.
- ممكن تتحكم في `<style>` بالجافاسكربت: `document.querySelector('style').textContent`.

## quiz

### أنهي عنصر بنكتب جواه كود CSS في الصفحة؟
- [ ] `<css>`
- [x] `<style>`
- [ ] `<script>`
- [ ] `<link>`
`<style>` هو اللي بيحتوي كود CSS. `<link>` بيربط ملف خارجي بس.

### مين الأفضل لموقع كبير فيه 50 صفحة؟
- [ ] نكتب `<style>` في كل صفحة
- [x] ملف CSS واحد بنربطه بـ `<link>`
- [ ] `style` على كل عنصر
- [ ] مفيش فرق
الملف الخارجي بيتحمّل مرة واحدة ويتخزّن، وبتعدل في مكان واحد.

### إيه الغلط؟ `<style type="text/javascript"> p { color: red } </style>`
- [ ] مفيش غلط
- [x] النوع مش `text/css` فالمتصفح هيتجاهل الستايل
- [ ] لازم يتكتب في body
- [ ] لازم نضيف `<p>` جواه
لو حطيت `type` وكانت قيمته غير `text/css` المتصفح مش هيطبّق الستايل. والأفضل ما تكتبش `type` أصلاً.

## refs

- [MDN: style](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style)
- [WHATWG: The style element](https://html.spec.whatwg.org/multipage/semantics.html#the-style-element)
