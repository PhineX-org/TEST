---
id: meta
kind: element
cat: meta
tag: meta
title: عنصر البيانات الوصفية (meta)
en: HTML metadata element
status: stable
display: none
void: yes
support: all
summary: عنصر meta بيحط معلومات عن الصفحة للمتصفح ومحركات البحث ومواقع التواصل، زي الترميز والوصف وعرض الموبايل ولون الشريط، ومش بيتعرض جوه الصفحة.
keywords: meta, ميتا, بيانات وصفية, name, content, charset, http-equiv, viewport, description, robots, theme-color
related: head, title, link, meta-charset, meta-viewport, meta-description, meta-social
---

## intro

عنصر `<meta>` هو **ورقة معلومات صغيرة** بتحطها جوه `<head>`، وبتقول فيها حاجة عن الصفحة للمتصفح ولمحركات البحث ولمواقع التواصل الاجتماعي. الزائر ما بيشوفهاش، لكن اللي بيقراها بيستفيد منها: المتصفح بيعرف الترميز، وجوجل بيعرف وصف الصفحة، والموبايل بيعرف يعرض الصفحة صح.

العنصر ده بياخد كذا شكل حسب اللي عايز تقوله، لكن كلهم مبنيين على نفس الفكرة: **اسم + قيمة**. الشكل الأشهر: `name` (اسم المعلومة) و `content` (قيمتها). مثلاً `name="description" content="وصف الصفحة"`. ده معناه «معلومة اسمها description، وقيمتها كذا». وفيه أشكال تانية: `charset` لترميز الحروف، و `http-equiv` للتعليمات اللي بتشبه رؤوس HTTP.

كل `<meta>` بتشرح معلومة واحدة بس، فلو عندك خمس معلومات بتكتب خمس عناصر `<meta>` ورا بعض. وهو **عنصر فارغ (Void)**: من غير وسم إغلاق ومن غير محتوى جواه، كل اللي ليه في خصائصه.

علشان تتعلم العنصر ده صح، قسمناه لأربع أدلة منفصلة لأكتر استخداماته: [[meta-charset]] للترميز، و [[meta-viewport]] للموبايل، و [[meta-description]] للـ SEO، و [[meta-social]] للمشاركة على واتساب وفيسبوك وتويتر. الصفحة دي بتشرح العنصر نفسه وكل أشكاله.

> [!analogy] تخيّل علبة منتج في السوبر ماركت: على الوش في صورة وعنوان (ده `<body>` و `<title>`)، لكن على الجنب في ملصق صغير فيه «بلد الصنع، تاريخ الصلاحية، المكونات». ده الـ `<meta>`: معلومات للي بيشتغلوا على المنتج، مش للمشتري العادي.

> [!key] كل `<meta>` لازم يكون فيها **واحد** من: `name` + `content`، أو `http-equiv` + `content`، أو `charset`. الدمج الغلط بيعمل مشاكل.

## try

الـ `<meta>` مش بيظهر، فخلّينا نقرا قيمه من الجافاسكربت ونعرضها. غيّر `content` وشوف.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="description" content="مرجع HTML بالعربي للمبتدئين">
  <meta name="author" content="أحمد">
  <title>تجربة meta</title>
</head>
<body>
  <ul id="out"></ul>
  <script>
    document.querySelectorAll('meta[name]').forEach(m => {
      const li = document.createElement('li');
      li.textContent = m.name + ' = ' + m.content;
      document.getElementById('out').appendChild(li);
    });
  </script>
</body>
</html>
```

## syntax

```html nolive
<head>
  <meta charset="utf-8">
  <meta name="description" content="وصف الصفحة">
  <meta http-equiv="refresh" content="30">
</head>
```

- `<meta charset="utf-8">` — الشكل الأول: ترميز الحروف.
- `<meta name="..." content="...">` — الشكل التاني: معلومة باسم وقيمة.
- `<meta http-equiv="..." content="...">` — الشكل التالت: تعليمة شبيهة برأس HTTP.
- مفيش وسم إغلاق، ولازم يتحط في `<head>`.

## use

- لتحديد ترميز الحروف `UTF-8` عشان العربي يظهر صح.
- لتظبيط الصفحة على الموبايل بـ `viewport`.
- لكتابة وصف الصفحة (`description`) اللي بيظهر في نتايج البحث.
- لتحديد لون شريط المتصفح على الموبايل (`theme-color`).
- لتحكم محركات البحث في الفهرسة (`robots`).
- لتحسين شكل المشاركة على السوشيال ميديا (Open Graph و Twitter Cards).

## avoid

- متعتمدش على `keywords`: جوجل بيتجاهلها من سنين.
- متستخدمش `refresh` لتحويل المستخدم لصفحة تانية: أفضل تعمل redirect من السيرفر.
- متحطش `<meta>` في الـ body (إلا بـ `itemprop` للـ Microdata).
- متكتبش معلومات سرية في `<meta>`: أي حد يقدر يشوف الـ Source.

## attributes

بيقبل الخصائص العامة ([[global-attributes]]) والخصائص دي:

### name
اسم المعلومة اللي بتحطها. الأشهر:

- `description` — وصف الصفحة لمحركات البحث.
- `viewport` — طريقة عرض الصفحة على الموبايل.
- `robots` — تعليمات لمحركات البحث (`index`, `noindex`, `follow`, `nofollow`).
- `author` — اسم الكاتب.
- `generator` — الأداة اللي ولّدت الصفحة.
- `theme-color` — لون شريط المتصفح على الموبايل.
- `color-scheme` — الوضع المفضل للصفحة (`light` أو `dark` أو الاتنين).
- `referrer` — سياسة إرسال رابط الصفحة السابقة.
- `keywords` — كلمات مفتاحية: قديمة وجوجل بيتجاهلها.

```html nolive
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0d47a1">
```

### content
قيمة المعلومة. بتتكتب مع `name` أو `http-equiv`. شكلها بيعتمد على الاسم، مثلاً `width=device-width, initial-scale=1` مع `viewport`.

### charset {required}
ترميز الحروف. القيمة الوحيدة المسموحة عملياً هي `utf-8`. لازم تكون في أول 1024 بايت من الصفحة. اقرا [[meta-charset]].

```html nolive
<meta charset="utf-8">
```

### http-equiv
بيحاكي رأس HTTP (HTTP header) من جوه الصفحة. القيم المقبولة:

- `content-security-policy` — سياسة أمان المحتوى.
- `content-type` — شكل قديم لتحديد الترميز (الأفضل `charset`).
- `default-style` — اسم الستايل الافتراضي من بين الستايلات البديلة.
- `refresh` — تحديث الصفحة أو التحويل بعد وقت (مش بيتنصح بيه).
- `x-ua-compatible` — كان لمتصفح Internet Explorer، دلوقتي مالوش لازمة.

```html nolive
<meta http-equiv="refresh" content="30">
<meta http-equiv="content-security-policy"
      content="default-src 'self'">
```

### media
بتستخدم مع `name="theme-color"` بس، عشان تحدد لون مختلف حسب الوضع، مثلاً `(prefers-color-scheme: dark)`.

```html nolive
<meta name="theme-color" content="#ffffff"
      media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000"
      media="(prefers-color-scheme: dark)">
```

### itemprop
بتستخدم مع Microdata عشان تضيف معلومة مخفية لوصف المحتوى لمحركات البحث (زي سعر المنتج). عادة بتشتغل في الـ body.

### property
**خلّي بالك:** `property` مش خاصية قياسية في HTML. بتتكتب في بيانات Open Graph (`og:title`) وبتستخدمها فيسبوك وغيره (RDFa). المتصفح بيتجاهلها، لكن مواقع المشاركة بتقراها. اقرا [[meta-social]].

```html nolive
<meta property="og:title" content="كورس HTML">
```

## examples

### 1) ترميز الحروف
أهم `<meta>` عندك. بتحطها أول حاجة في الـ head.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>ترميز</title>
</head>
<body>
  <p>مرحباً! الحروف العربي ظاهرة صح بفضل UTF-8.</p>
</body>
</html>
```

- لو شلت `<meta charset>` وفتحت الملف من الجهاز ممكن تظهر رموز غريبة (حسب إعدادات المتصفح).
- تفاصيل أكتر في [[meta-charset]].

### 2) وصف الصفحة والكاتب
بتحط معلومات عن الصفحة. الكود بيقراها ويعرضها.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="description" content="شرح العنصر meta بالعربي">
  <meta name="author" content="فريق PhineX">
</head>
<body>
  <p id="d"></p>
  <p id="a"></p>
  <script>
    const get = n => document.querySelector('meta[name=' + n + ']').content;
    document.getElementById('d').textContent = 'الوصف: ' + get('description');
    document.getElementById('a').textContent = 'الكاتب: ' + get('author');
  </script>
</body>
</html>
```

- `querySelector('meta[name=description]')` بيدوّر على `<meta>` اللي اسمها `description`.
- `.content` بيرجّع قيمتها.

### 3) viewport للموبايل
عشان الصفحة تتعرض بحجم الشاشة الحقيقي على الموبايل.

```html nolive
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

- `width=device-width` معناها «عرض الصفحة = عرض شاشة الجهاز».
- `initial-scale=1` معناها «مفيش تكبير أو تصغير في الأول».
- من غيرها الموبايل بيعرض الصفحة كأنها على شاشة كمبيوتر ويصغّرها.

### 4) منع الفهرسة بـ robots
لو الصفحة خاصة (زي لوحة تحكم) وعايز جوجل ما يضمّهاش في نتايج البحث.

```html nolive
<head>
  <meta name="robots" content="noindex, nofollow">
</head>
```

- `noindex` — متضيفش الصفحة لنتايج البحث.
- `nofollow` — متتبعش الروابط اللي في الصفحة.

### 5) لون الشريط على الموبايل
بيلوّن شريط المتصفح في موبايل أندرويد (وبعض المتصفحات) بلون موقعك.

```html nolive
<head>
  <meta name="theme-color" content="#0d47a1">
</head>
```

- بيدّي تجربة أقرب للتطبيق.

### 6) تحديث تلقائي (مش بيتنصح بيه)
الصفحة هتتحمّل تاني كل 30 ثانية. مفيد في شاشات العرض فقط.

```html nolive
<head>
  <meta http-equiv="refresh" content="30">
</head>
```

- لو حطيت `content="5; url=https://example.com"` هيحوّل بعد 5 ثواني، لكن ده مش بيتنصح بيه لأنه سيء للـ SEO وللوصولية.

### 7) تفضيل الوضع الداكن
بتقول للمتصفح الصفحة بتدعم الوضع الفاتح والداكن عشان يظبّط عناصره (زي الـ scrollbar).

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light dark">
</head>
<body>
  <p>لو جهازك على الوضع الداكن، هتلاقي الخلفية والنص اتظبطوا تلقائياً.</p>
  <button>زرار</button>
  <input placeholder="اكتب هنا">
</body>
</html>
```

- `color-scheme: light dark` بتسمح للمتصفح يلوّن العناصر الافتراضية حسب وضع الجهاز.

## rules

- parents: `<head>`، وكمان `<noscript>` جوه الـ head، وجوه أي عنصر لو استخدمت `itemprop`.
- children: مفيش (Void).
- closing: مفيش وسم إغلاق.
- role: مفيش.
- dom: `HTMLMetaElement`.
- layout: `display: none`.

## mistakes

### كتابة name من غير content
```html bad
<meta name="description">
```
```html good
<meta name="description" content="وصف الصفحة">
```
ليه؟ `name` لوحدها بلا معنى، لازم `content` عشان القيمة تتحدد.

### خلط أكتر من شكل في عنصر واحد
```html bad
<meta charset="utf-8" name="description" content="وصف">
```
```html good
<meta charset="utf-8">
<meta name="description" content="وصف">
```
ليه؟ كل `<meta>` تعمل شغلة واحدة. الدمج بيعمل كود غير صالح.

### نسيان الـ viewport
```html bad
<head>
  <title>موقع</title>
</head>
```
```html good
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>موقع</title>
</head>
```
ليه؟ من غير viewport الموبايل هيعرض الصفحة بعرض 980px تقريباً ويصغّرها فتبان دقيقة.

## a11y

- متستخدمش `user-scalable=no` أو `maximum-scale=1` في الـ viewport: بتمنع الناس من تكبير الصفحة.
- لا تستخدم `refresh` لتحديث تلقائي، لأنه بيلخبط قارئ الشاشة وبيقاطع المستخدم.
- استخدم `<meta name="color-scheme">` لو الصفحة بتدعم الوضع الداكن، عشان تساعد ناس بتتعب من الإضاءة.

## tips

- افتح "View Source" لأي موقع كبير وشوف الـ `<meta>` بتاعته، هتتعلم كتير.
- أدوات زي معاينة المشاركة بتوريك شكل الرابط على السوشيال قبل ما تنشره.
- ترتيب الـ meta: `charset` ثم `viewport` ثم باقي المعلومات.
- لو بتستخدم Framework، الـ `<meta>` بتتولّد غالباً من مكونات مخصوصة (زي Head).

## quiz

### إيه الشكل الصح لـ meta الوصف؟
- [ ] `<meta description="..." content="...">`
- [x] `<meta name="description" content="...">`
- [ ] `<meta name="description">...</meta>`
- [ ] `<meta content="description">`
الوصف بيتكتب بـ `name` اسم المعلومة و `content` قيمتها، ومن غير وسم إغلاق.

### إيه الخاصية الوحيدة اللازمة لـ `<meta>` الخاصة بالترميز؟
- [x] `charset`
- [ ] `name`
- [ ] `content`
- [ ] `lang`
الترميز بيتكتب `<meta charset="utf-8">` من غير `name` ولا `content`.

### أنهي اسم meta بيتجاهله جوجل؟
- [ ] description
- [ ] robots
- [x] keywords
- [ ] viewport
جوجل مبقاش يستخدم `keywords` في الترتيب من سنين، لكن الباقي مهمين.

## refs

- [MDN: meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)
- [MDN: أسماء meta القياسية](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name)
- [WHATWG: The meta element](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)
