---
id: attr-lang
kind: attribute
cat: global-attrs
chip: lang
title: خاصية اللغة
en: HTML lang global attribute
status: stable
support: all
mdn: Global_attributes/lang
summary: خاصية lang بتحدد لغة محتوى الصفحة أو أي جزء منها بكود زي ar أو en. بتساعد قارئ الشاشة في النطق، ومحركات البحث والترجمة، وتنسيق CSS حسب اللغة.
keywords: lang, لغة, language, ar, ar-EG, en, BCP 47, :lang, نطق, ترجمة, html lang, xml:lang
related: attr-dir, html, attr-translate, q, bdi
---

## intro

الـ `lang` بتقول للمتصفح وللأدوات **اللغة اللي المحتوى مكتوب بيها**. أهم مكان تحطها فيه هو وسم `<html>` اللي في أول الصفحة: `<html lang="ar">`. بالنسبة لصفحاتنا العربية دي أهم سطر لازم يبقى موجود.

ليه مهمة؟ قارئ الشاشة بيستخدمها عشان يختار **النطق الصح** (لو غابت ممكن يقرا العربي بنطق إنجليزي!)، ومتصفحات الترجمة بتعرف اللغة المصدر، ومحركات البحث بتفهرس صح، وبتأثر على **علامات الاقتباس** و**الـ hyphenation** وبعض **الخطوط**، وفي CSS تقدر تنسّق باللغة بـ `:lang(ar)`. القيمة هي **كود اللغة (BCP 47)**: `ar` للعربي، و`en` للإنجليزي، ولو عايز تحدد اللهجة/البلد: `ar-EG` (مصر)، `ar-SA` (السعودية)، `en-US`، `en-GB`. وتقدر تغيّرها **على جزء** من الصفحة لو فيه جملة بلغة تانية.

> [!tip] لو كتبت جملة إنجليزية جوه صفحة عربية: لفّها بـ `<span lang="en">` عشان قارئ الشاشة ينطقها صح.

## try

```html
<p lang="ar">أهلاً بيك في الموقع.</p>
<p lang="en">Welcome to the site.</p>
<p>والجملة دي: <span lang="en">Hello world</span> بالإنجليزي جوه جملة عربي.</p>
```

## syntax

```html nolive
<html lang="ar">
<p lang="en">English text</p>
```

- `lang="ar"` — **كود اللغة** الأساسي.
- `lang="ar-EG"` — **اللغة + البلد/اللهجة**.
- على أي عنصر **بيغيّر** اللغة لمحتواه بس.

## use

- على `<html>` لتحديد لغة الصفحة (لازم).
- على جمل بلغة مختلفة جوه الصفحة.
- تنسيق CSS حسب اللغة بـ `:lang()`.
- مساعدة أدوات الترجمة ومحركات البحث.

## avoid

- متكتبش اسم اللغة كامل (`lang="arabic"`): استخدم الكود `ar`.
- متنساش `lang` على `<html>`: ده أهم مكان.

## section: أشهر الأكواد

- `ar` عربي، `ar-EG` عربي مصري، `ar-SA` عربي سعودي.
- `en` إنجليزي، `en-US` أمريكي، `en-GB` بريطاني.
- `fr` فرنسي، `de` ألماني، `es` إسباني، `tr` تركي.
- `ur` أوردو، `fa` فارسي: لغات بتتكتب من اليمين لليسار برضو.

## examples

### 1) لغة الصفحة كلها
على html.

```html nolive
<!-- أول الصفحة بتبدأ كده -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head><meta charset="UTF-8"><title>موقعي</title></head>
  <body>...</body>
</html>
```

- `lang="ar"` بتعرّف الصفحة كلها كعربية.
- ضيف معاها `dir="rtl"` لاتجاه الكتابة.
- ده أول شيء بيتحط في أي صفحة عربية.

### 2) كلمة بلغة تانية
span مع lang.

```html
<p>المصطلح بالإنجليزي: <span lang="en" dir="ltr">Responsive Design</span> يعني تصميم متجاوب.</p>
```

- قارئ الشاشة هيبدّل لنطق إنجليزي للجزء ده.
- `dir="ltr"` بيضبط ترتيب الكلمات الإنجليزية.
- مهم لأسماء المنتجات والمصطلحات.

### 3) تنسيق حسب اللغة
:lang() في CSS.

```html
<style>
  :lang(ar) { font-family: Cairo, Tahoma, sans-serif; color: #0f766e; }
  :lang(en) { font-family: Georgia, serif; color: #7c3aed; letter-spacing: .5px; }
</style>
<p lang="ar">فقرة عربية</p>
<p lang="en">English paragraph</p>
```

- `:lang(ar)` بيطابق أي عنصر لغته `ar` (حتى بالوراثة).
- ينفع تغيّر الخط حسب اللغة.
- بيشتغل مع `ar-EG` لأنه يطابق البادئة.

### 4) علامات الاقتباس تتغيّر باللغة
q و lang.

```html
<p lang="en">He said <q>hello</q>.</p>
<p lang="fr">Il a dit <q>bonjour</q>.</p>
<p lang="ar">قال <q>أهلاً</q>.</p>
```

- العنصر `<q>` بيحط علامات اقتباس حسب لغة السياق.
- الإنجليزي “ ” والفرنسي « » وهكذا.
- من غير `lang` المتصفح مش بيعرف يختار.

### 5) قراءة اللغة بجافاسكربت
مثال على document.documentElement.lang.

```html
<p id="o"></p>
<p lang="en" id="p">English</p>
<script>
  const o = document.getElementById('o'), p = document.getElementById('p');
  o.textContent = 'لغة الفقرة: ' + p.lang + ' | لغة الصفحة: ' + (document.documentElement.lang || '(مش متحددة)');
</script>
```

- `el.lang` بترجّع كود اللغة للعنصر.
- ممكن تبدّل لغة الصفحة وتغيّر `document.documentElement.lang`.
- مفيدة في مواقع متعددة اللغات.

## mistakes

### اسم لغة بدل كود
```html bad
<html lang="arabic">
```
```html good
<html lang="ar">
```
ليه؟ القيمة لازم تكون كود BCP 47 (زي `ar`)، مش اسم اللغة.

### نسيان lang على html
```html bad
<html>
<body>مرحباً</body></html>
```
```html good
<html lang="ar" dir="rtl">
<body>مرحباً</body></html>
```
ليه؟ من غيرها قارئ الشاشة والمترجم بيخمّنوا اللغة ويغلطوا.

## a11y

- `lang` على `<html>` شرط أساسي (WCAG): قارئ الشاشة بيختار النطق منها.
- لفّ العبارات الأجنبية بـ `lang` الصحيح عشان تتنطق صح.
- لما تغيّر لغة الواجهة بجافاسكربت، حدّث `lang` كمان.

## quiz

### أهم مكان تحط فيه `lang`؟
- [x] وسم `<html>`
- [ ] وسم `<br>`
- [ ] وسم `<hr>`
- [ ] وسم `<meta>`
بتعرّف لغة الصفحة كلها.

### إيه كود العربي المصري؟
- [x] `ar-EG`
- [ ] `eg`
- [ ] `arabic`
- [ ] `ar_eg_x`
لغة-بلد.

### إزاي بتنسّق العناصر بالعربي في CSS؟
- [x] `:lang(ar)`
- [ ] `.ar`
- [ ] `#ar`
- [ ] `@lang`
مطابقة على lang.

## refs

- [MDN: lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang)
- [W3C: Language tags in HTML](https://www.w3.org/International/questions/qa-html-language-declarations)
