---
id: meta-viewport
kind: guide
cat: meta
title: عرض الموبايل (meta viewport)
en: Responsive layout with meta viewport
status: stable
summary: ليه صفحتك بتبان صغيرة ومش مقروءة على الموبايل، وإزاي سطر meta viewport واحد بيخلّي الصفحة تتعرض بعرض الشاشة الحقيقي، ومعاه إيه اللي لازم تتجنبه.
keywords: viewport, موبايل, responsive, متجاوب, device-width, initial-scale, تصغير, meta viewport, mobile
related: meta, head, meta-charset, html
---

## intro

لما بتفتح موقع على موبايل قديم الشكل ومش متظبّط، بتلاقي الصفحة صغيرة أوي ومحتاج تكبّر بصوابعك عشان تقرا. ليه ده بيحصل؟ لأن الموبايلات في الأول اتعملت عشان تعرض مواقع الكمبيوتر، فلما تفتح صفحة من غير تعليمات، الموبايل **بيتظاهر إن شاشته عريضة** (حوالي 980 بكسل) وبيعرض الصفحة عليها، وبعدين بيصغّرها لتناسب الشاشة الحقيقية الضيقة. النتيجة: كل حاجة بتبان دقيقة.

الـ **Viewport** هو المنطقة المرئية من الصفحة على شاشة الجهاز. وسطر `<meta name="viewport">` هو اللي بيقول للموبايل: «**متتظاهرش**، اعرض الصفحة بعرض الشاشة الحقيقي». الشكل المعتمد في كل موقع متجاوب:

```html nolive
<meta name="viewport" content="width=device-width, initial-scale=1">
```

القيمة `width=device-width` معناها «عرض الصفحة = عرض شاشة الجهاز بالظبط». و `initial-scale=1` معناها «مفيش تكبير أو تصغير في الأول». وبالسطر ده بس، لو الصفحة متصممة بـ CSS متجاوب (Responsive) هتتعرض كويس على أي جهاز.

مهم تعرف إن السطر ده **لوحده مش بيعمل الموقع متجاوب**. هو بس بيدّي الصفحة فرصة تتعرض بحجمها الطبيعي. التجاوب نفسه (إن المحتوى يتغيّر شكله حسب العرض) شغل CSS. لكن من غير السطر ده، حتى أحسن CSS متجاوب مش هيشتغل على الموبايل.

> [!analogy] تخيّل بتصوّر لوحة كبيرة بكاميرا موبايل. من غير ما تقرّب، اللوحة كلها بتدخل في الصورة وتبان صغيرة. `viewport` بيقول للكاميرا «قرّب على الحجم الحقيقي».

> [!key] حط `<meta name="viewport" content="width=device-width, initial-scale=1">` في **كل** صفحة، من غير تفكير.

## examples

### 1) الشكل الأساسي
ده السطر اللي بتحطه في كل صفحة. مفيش تأثير مرئي في المعاينة (لأنها مش موبايل)، لكنه بيشتغل على الجهاز الحقيقي.

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>موقعي</title>
</head>
<body>
  <h1>أهلاً</h1>
</body>
</html>
```

- `width=device-width`: عرض الصفحة يساوي عرض الشاشة.
- `initial-scale=1`: التكبير الأولي 100%.

### 2) الفرق بالصورة: بدون وبـ viewport
على الموبايل: الصفحة اللي من غير viewport بتبان بعرض 980px مصغّر، والتانية بعرض الشاشة فعلاً. المثال بيوضح الفكرة بتصميم.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    .phone { width: 150px; border: 3px solid #333; border-radius: 12px; padding: 6px; margin: 6px; display: inline-block; vertical-align: top; text-align: center; }
    .screen { background: #eee; height: 90px; overflow: hidden; font-size: 4px; line-height: 1.2; text-align: right; }
    .screen.ok { font-size: 12px; }
  </style>
</head>
<body>
  <div class="phone">
    <b>من غير viewport</b>
    <div class="screen">نص صغير جداً لأن الموبايل عرض الصفحة على شاشة وهمية عريضة وبعدين صغّرها فبقت دقيقة ومش مقروءة لازم تكبّر بصوابعك</div>
  </div>
  <div class="phone">
    <b>مع viewport</b>
    <div class="screen ok">نص بحجمه الطبيعي مقروء من غير تكبير</div>
  </div>
</body>
</html>
```

- ده تمثيل بالرسم، مش اختبار حقيقي. للاختبار الحقيقي استخدم وضع الموبايل في DevTools (Ctrl+Shift+M).

### 3) initial-scale وإعدادات إضافية
تقدر تضيف قيم تانية، لكن اتأكد إنك محتاجها فعلاً.

```html nolive
<meta name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover">
```

- `viewport-fit=cover`: بيخلّي الصفحة تغطي الشاشة كلها حتى حوالين الـ notch (الحفرة في شاشات آيفون).
- بعد كده بتستخدم CSS `env(safe-area-inset-top)` عشان المحتوى ما يختفيش تحت الـ notch.

### 4) عرض ثابت (مش بيتنصح بيه)
ممكن تحدد عرض بالبكسل، لكن مش متجاوب لأنه هيكون نفس العرض على كل الأجهزة.

```html nolive
<!-- مش متجاوب: عرض ثابت 600 بكسل -->
<meta name="viewport" content="width=600">
```

- لو الشاشة 360px هيتصغّر. لو 800px هيتكبّر. معظم الوقت مش مناسب.

### 5) منع التكبير (متعملوش)
فيه مواقع بتحاول تمنع المستخدم من التكبير. ده **ضد الوصولية** وبيضر المستخدم.

```html nolive
<!-- لا تستخدم! بيمنع ضعاف النظر من تكبير الصفحة -->
<meta name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

- `user-scalable=no` و `maximum-scale=1` بيمنعوا التكبير.
- متصفحات حديثة كتير (خصوصاً آيفون) بتتجاهلهم لأسباب الوصولية، لكن الأفضل ما تكتبهمش.

## use

- في **كل** صفحة ويب بتتفتح على الموبايل.
- لما تستخدم تصميم متجاوب (Responsive) بـ CSS و Media Queries.
- لما تحتاج تتحكم في تغطية الشاشة حوالين الـ notch بـ `viewport-fit`.

## avoid

- متستخدمش `user-scalable=no` ولا `maximum-scale=1`: بتضر الوصولية.
- متحطش عرض ثابت بالبكسل لو عايز موقع متجاوب.
- متنساش تكتبه، من غيره التصميم المتجاوب مش هيشتغل على الموبايل.

## mistakes

### نسيان الـ viewport
```html bad
<head>
  <meta charset="utf-8">
  <title>موقعي</title>
</head>
```
```html good
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>موقعي</title>
</head>
```
ليه؟ الصفحة هتتعرض مصغّرة على الموبايل ومش هتشتغل Media Queries صح.

### كتابة قيمة غلط
```html bad
<meta name="viewport" content="width=device, initial-scale=1.0">
```
```html good
<meta name="viewport" content="width=device-width, initial-scale=1">
```
ليه؟ الاسم `device-width` بالظبط. لو غلطت فيه المتصفح بيتجاهل القيمة.

### وضعها في body
```html bad
<body>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</body>
```
```html good
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```
ليه؟ مكان `<meta>` في `<head>`. جوه الـ body مش هيتفعّل.

## tips

- اختبر موقعك في **وضع الجهاز** (Device Mode) في DevTools. جرّب أحجام شاشات مختلفة.
- Media Queries بتعتمد على عرض الـ viewport: `@media (max-width: 600px)`. من غير `<meta viewport>` على الموبايل الحقيقي هتعتبر العرض 980px.
- لو عايز تحدد الاتجاه أو حاجة متقدمة، فيه قيم زي `interactive-widget` (بتتحكم في سلوك الكيبورد الافتراضي)، لكنها لسه مش مدعومة في كل المتصفحات.

## quiz

### إيه فايدة `width=device-width`؟
- [ ] بتكبّر الصفحة
- [x] بتخلّي عرض الصفحة يساوي عرض شاشة الجهاز
- [ ] بتغيّر لون الصفحة
- [ ] بتمنع التكبير
القيمة دي بتخلّي الموبايل يعرض الصفحة بعرضها الحقيقي.

### إيه المشكلة في `user-scalable=no`؟
- [ ] مفيش مشكلة
- [x] بتمنع ضعاف النظر من تكبير الصفحة
- [ ] بتبطّئ الصفحة
- [ ] مش معروفة للمتصفحات
منع التكبير بيضر الوصولية، فمنصوح تتجنبه.

### الـ viewport لوحده بيعمل الموقع متجاوب؟
- [ ] آه
- [x] لأ، لازم كمان CSS متجاوب
- [ ] آه على الكمبيوتر بس
- [ ] لأ بس مع JavaScript
الـ viewport بيدّي الصفحة العرض الصح، لكن التجاوب بيتعمل بالـ CSS.

## refs

- [MDN: Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Viewport_meta_element)
- [MDN: meta name viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)
