---
id: attr-translate
kind: attribute
cat: global-attrs
chip: translate
title: خاصية الترجمة
en: HTML translate global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/translate
summary: خاصية translate بتحدد هل المحتوى يتترجم لما المتصفح أو أداة الترجمة تترجم الصفحة. translate=no بيمنع ترجمة أسماء العلامات والكود وأسماء الأشخاص.
keywords: translate, ترجمة, notranslate, yes, no, اسم العلامة, كود, Google Translate, محتوى
related: attr-lang, code, attr-dir, abbr, span
---

## intro

متصفحات كتير (زي كروم) بتقدّم **ترجمة تلقائية للصفحة**. ومعظم الوقت ده كويس، لكن في حاجات **مينفعش تتترجم**: اسم شركتك (PhineX هتتحوّل لحاجة غريبة)، أو **كود** (`console.log`)، أو اسم شخص، أو مصطلح تقني. الخاصية `translate="no"` بتقول لأداة الترجمة «**سيبه زي ما هو**»، و`translate="yes"` (الافتراضي) يعني ينفع يتترجم.

بتتورّث للأبناء، يعني لو حطيتها على `<code>` أو على `<body>` تحمي كل اللي جواه. وكتير من الأدوات بتفهم كمان class اسمه `notranslate`.

## try

```html
<p>مرحباً بيك في <span translate="no">PhineX Academy</span> حيث تتعلم البرمجة.</p>
<p>اكتب الأمر: <code translate="no">npm start</code></p>
```

## syntax

```html nolive
<span translate="no">اسم لا يُترجم</span>
```

- `translate="no"` — **متترجمش**.
- `translate="yes"` — **ينفع تترجم** (الافتراضي).

## use

- أسماء العلامات التجارية والمنتجات.
- الكود والأوامر والمصطلحات التقنية.

## avoid

- متحطّش `translate="no"` على الصفحة كلها من غير داعي: بتحرم الزوّار من الترجمة.

## examples

### 1) حماية اسم علامة
مثال على span.

```html
<p>جرّب <strong translate="no">X-Library</strong> النهارده.</p>
```

- الاسم هيفضل زي ما هو بعد الترجمة.
- بتتورّث لأبناء العنصر.
- مناسبة للأسماء والشعارات النصية.

### 2) حماية مقطع كود
code و pre.

```html
<pre translate="no"><code>function hello() { return "hi"; }</code></pre>
```

- الكود لو اتترجم هيبوّظ.
- حطها على `<pre>` عشان تحمي الكتلة كلها.
- لازم تفضل في كل أمثلة الكود.

### 3) القيمة في جافاسكربت
مثال على el.translate.

```html
<span id="s" translate="no">PhineX</span>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'translate = ' + document.getElementById('s').translate;
</script>
```

- `el.translate` منطقية: `false` لو `no`.
- قابلة للتعديل برمجياً.
- بترجع `true` كافتراضي.

## mistakes

### قيمة غير صحيحة
```html bad
<span translate="false">PhineX</span>
```
```html good
<span translate="no">PhineX</span>
```
ليه؟ القيم الصحيحة `yes` و`no` في HTML (الـ DOM property هي اللي منطقية).

## a11y

- الترجمة بتساعد ناس كتير: متمنعهاش على نصوص كاملة من غير داعي.
- حافظ على `lang` الصح مع `translate`.

## quiz

### إزاي تمنع ترجمة اسم علامة؟
- [x] `translate="no"`
- [ ] `translate="false"`
- [ ] `notrans`
- [ ] `lang="no"`
no.

### هل بتتورّث؟
- [x] أيوه للأبناء
- [ ] لأ
- [ ] بس للأخوات
- [ ] بس للـ body
بتنطبق على الأبناء.

## refs

- [MDN: translate](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/translate)
- [WHATWG: translate](https://html.spec.whatwg.org/multipage/dom.html#attr-translate)
