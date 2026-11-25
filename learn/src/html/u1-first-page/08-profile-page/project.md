---
id: profile-page
type: project
title: صفحتي الشخصية
summary: أول مشروع ليك: بتبني صفحة تعريف شخصية كاملة من ملف فاضي، وانت بتستخدم كل اللي اتعلمته في أول وحدة.
time: 25
level: مبتدئ
tags: html, h1, p, ul, ol, a
---

## about

هتبني **صفحة تعريف شخصية** (Profile Page) فيها اسمك ونبذة عنك ومهاراتك وخطتك في التعلّم وروابط للتواصل.

المشروع ده بسيط بس مهم: هتكتب الصفحة **من الصفر** خطوة بخطوة، وفي كل خطوة المنصة بتجرّب كودك وتقولك صح ولا لأ. في الآخر هتبقى معاك صفحة حقيقية تقدر تفتحها في أي متصفح.

## skills

- هيكل صفحة HTML كامل (`DOCTYPE` و`html` و`head` و`body`)
- العناوين `<h1>` و`<h2>` والفقرات `<p>`
- القوائم المرتّبة وغير المرتّبة `<ol>` و`<ul>`
- الروابط `<a>` وفتحها في تاب جديد
- تمييز الكلام بـ `<strong>` و`<em>` والخط الفاصل `<hr>`

## step: هيكل الصفحة

أي صفحة HTML بتبدأ بنفس الهيكل. اكتبه كله في الملف `index.html`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي الشخصية</title>
</head>
<body>
</body>
</html>
```

- `<!DOCTYPE html>` بتقول للمتصفح «ده HTML الحديث».
- `lang="ar"` لغة الصفحة، و`dir="rtl"` اتجاه الكتابة من اليمين لليسار.
- `<meta charset="UTF-8">` علشان الحروف العربي تظهر سليمة.
- `<title>` الاسم اللي بيظهر على تاب المتصفح.

:::tests
الملف بيبدأ بـ DOCTYPE :: /^\s*<!doctype html>/i.test(src.main)
وسم html فيه lang="ar" :: document.documentElement.getAttribute('lang') === 'ar'
وسم html فيه dir="rtl" :: document.documentElement.getAttribute('dir') === 'rtl'
فيه meta charset :: !!$('meta[charset]')
فيه title مكتوب جواه نص :: txt('title').length > 2
:::
:::hint
الهيكل: html بيحتوي head و body. جوه head بنحط meta و title.
:::

## step: العنوان الرئيسي

دلوقتي هنكتب اسمك جوه `<body>`. الاسم هو أهم عنوان في الصفحة، فهنستخدم `<h1>`.

```html
<h1>أحمد علي</h1>
```

غيّر الاسم لاسمك انت. افتكر: `<h1>` **مرة واحدة** بس في الصفحة.

:::tests
فيه عنوان h1 واحد بس :: $$('h1').length === 1
الـ h1 جوه الـ body :: !!$('body > h1')
الـ h1 فيه اسم (أكتر من حرفين) :: txt('h1').length > 2
:::
:::hint
حطه بين `<body>` و`</body>`.
:::

## step: نبذة تعريفية

تحت العنوان نكتب فقرة قصيرة بتعرّف بيها نفسك. الفقرة بتبقى في وسم `<p>`.

```html
<p>
  أنا مبرمج مبتدئ من القاهرة، بتعلّم تطوير الويب من الصفر
  وهدفي أبني مواقع حقيقية.
</p>
```

اكتب نبذة بكلامك، أي حاجة أطول من ١٥ حرف.

:::tests
فيه فقرة p جوه الـ body :: !!$('body > p')
الفقرة بعد الـ h1 :: !!($('h1').compareDocumentPosition($('p')) & Node.DOCUMENT_POSITION_FOLLOWING)
الفقرة فيها نص مفيد (15 حرف على الأقل) :: txt('p').length >= 15
:::
:::hint
`<p>` بتتكتب بعد `</h1>` وقبل `</body>`.
:::

## step: قسم المهارات

دلوقتي هنعمل أول قسم: عنوان فرعي `<h2>` وتحته **قائمة نقطية** `<ul>` بمهاراتك. كل عنصر في القائمة بيبقى في `<li>`.

```html
<h2>مهاراتي</h2>
<ul>
  <li>HTML</li>
  <li>CSS (لسه بتعلّم)</li>
  <li>حل المشكلات</li>
  <li>الصبر</li>
</ul>
```

`<ul>` هي «الصندوق» و`<li>` هما العناصر اللي جواه. متحطش نص مباشر جوه `<ul>` من غير `<li>`.

:::tests
فيه h2 فيه كلمة «مهارات» :: $$('h2').some(e => e.textContent.includes('مهارات'))
فيه قائمة ul :: !!$('ul')
في الـ ul تلات عناصر li على الأقل :: $$('ul > li').length >= 3
كل li فيه نص :: $$('ul > li').every(e => e.textContent.trim().length > 0)
:::
:::hint
اكتب `<h2>مهاراتي</h2>` وتحتها `<ul>` وجواها `<li>` لكل مهارة.
:::

## step: خطة التعلّم

القوائم المرتّبة (اللي ليها أرقام) بتتعمل بـ `<ol>`. بنستخدمها لما الترتيب مهم، زي خطة تتنفّذ خطوة ورا خطوة.

```html
<h2>خطتي في التعلّم</h2>
<ol>
  <li>أخلّص كورس HTML</li>
  <li>أتعلّم CSS</li>
  <li>أبني أول موقع</li>
</ol>
```

الفرق الوحيد بين `<ul>` و`<ol>` هو إن التانية بتعرض أرقام تلقائي.

:::tests
فيه h2 فيه كلمة «خطتي» :: $$('h2').some(e => e.textContent.includes('خطت'))
فيه قائمة مرتّبة ol :: !!$('ol')
في الـ ol تلات عناصر li على الأقل :: $$('ol > li').length >= 3
:::
:::hint
نفس فكرة القائمة اللي فاتت لكن بـ `<ol>`.
:::

## step: روابط التواصل

الرابط بيتعمل بوسم `<a>` (من anchor) والخاصية `href` فيها العنوان. هنعمل رابطين:

```html
<h2>تواصل معايا</h2>
<p>
  <a href="mailto:ahmed@example.com">ابعتلي إيميل</a><br>
  <a href="https://github.com" target="_blank" rel="noopener">حسابي على GitHub</a>
</p>
```

- `mailto:` بتفتح برنامج الإيميل.
- `target="_blank"` بتفتح الرابط في تاب جديد.
- `rel="noopener"` أمان إضافي مع التاب الجديد. اتعود تكتبها.

:::tests
فيه h2 فيه كلمة «تواصل» :: $$('h2').some(e => e.textContent.includes('تواصل'))
فيه رابط إيميل (mailto:) :: !!$('a[href^="mailto:"]')
فيه رابط خارجي (https://) :: !!$('a[href^="https://"]')
الرابط الخارجي بيفتح في تاب جديد :: $('a[href^="https://"]').getAttribute('target') === '_blank'
الرابط الخارجي فيه rel="noopener" :: ($('a[href^="https://"]').getAttribute('rel') || '').includes('noopener')
:::
:::hint
`<a href="https://github.com" target="_blank" rel="noopener">النص</a>`
:::

## step: اللمسات الأخيرة

آخر خطوة: هنفصل نبذتك عن باقي الأقسام بخط، وهنبرز كلمة مهمة. نفصل بـ `<hr>` (من غير وسم قفل) بعد الفقرة الأولى:

```html
<hr>
```

وفي النبذة بدّل الكلمات المهمة بـ `<strong>` (غامق للأهمية) أو `<em>` (مائل للتشديد). مثلاً:

```html
<p>
  أنا <strong>مبرمج مبتدئ</strong> من القاهرة،
  وهدفي أبني <em>مواقع حقيقية</em>.
</p>
```

:::tests
فيه خط فاصل hr :: !!$('hr')
الخط الفاصل بعد الفقرة الأولى وقبل أول h2 :: !!($('p').compareDocumentPosition($('hr')) & Node.DOCUMENT_POSITION_FOLLOWING) && !!($('hr').compareDocumentPosition($('h2')) & Node.DOCUMENT_POSITION_FOLLOWING)
فيه strong أو em في الصفحة :: !!$('strong, em')
:::
:::hint
ضيف `<hr>` بين الفقرة الأولى وأول `<h2>`، وغلّف كلمتين بـ `<strong>` أو `<em>`.
:::
