---
id: base
kind: element
cat: head
tag: base
title: عنصر الرابط الأساسي (base)
en: HTML base element
status: stable
display: none
void: yes
support: all
summary: عنصر base بيحدد الرابط الأساسي اللي كل الروابط النسبية في الصفحة بتتحسب منه، وبيحدد كمان المكان الافتراضي لفتح الروابط (target).
keywords: base, رابط اساسي, base url, href, target, روابط نسبية, relative url
related: a, link, head, script, img, form
---

## intro

كل ما بتكتب رابط نسبي زي `<a href="about.html">` أو صورة `<img src="logo.png">`، المتصفح محتاج يعرف **المسار الكامل** للملف ده. الأصل إنه بيحسبه من مكان الصفحة الحالية. يعني لو الصفحة على `https://site.com/blog/post.html` فالرابط `about.html` بيتحول لـ `https://site.com/blog/about.html`.

عنصر `<base>` بيغيّر القاعدة دي: بيقول للمتصفح «لما تحسب الروابط النسبية، **ابدأ من العنوان ده** بدل عنوان الصفحة». فلو كتبت `<base href="https://cdn.example.com/files/">` فكل رابط نسبي في الصفحة هيتحسب من العنوان ده.

كمان `<base>` بيقدر يحدد **الـ target الافتراضي**: يعني الروابط والفورمات تتفتح فين لو ما كتبتش `target`. مثلاً `<base target="_blank">` بيخلّي كل روابط الصفحة تتفتح في تبويب جديد.

الكلام ده قوي، لكن **خطر شوية**: أي رابط نسبي في الصفحة بيتأثر، حتى الروابط اللي بتبدأ بـ `#` (زي `href="#top"`) وبعض الصور والسكربتات. علشان كده بيتحط في الموقع الصغير بس لو فعلاً محتاجه، ولازم تكون حذر.

> [!analogy] تخيّل إنك بتدّي حد عنوان بقولك «اتجه يمين من المحطة». من غير ما تقول إنت واقف فين، الكلمة مالهاش معنى. `<base>` هو اللي بيقول «المحطة» مكانها فين، وكل الاتجاهات النسبية بتتحسب منها.

> [!warn] `<base>` بيأثّر على **كل** الروابط النسبية في الصفحة، بما فيها `href="#section"`. لو حطيته غلط ممكن الروابط الداخلية تبوظ.

## try

الروابط النسبية اتحولت لعنوان كامل بسبب `<base>`. الكود بيقرا العنوان الكامل بتاع الرابط ويكتبه جوه الصفحة. غيّر `href` في `<base>` وشوف الناتج.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <base href="https://example.com/courses/">
</head>
<body>
  <a id="l" href="html/intro.html">درس المقدمة</a>
  <p id="out"></p>
  <script>
    document.getElementById('out').textContent =
      'العنوان الكامل: ' + document.getElementById('l').href;
  </script>
</body>
</html>
```

## syntax

```html nolive
<head>
  <base href="https://example.com/app/" target="_blank">
</head>
```

- `<base>` — عنصر **فارغ (Void)**: من غير وسم إغلاق ومن غير محتوى.
- `href="..."` — العنوان الأساسي اللي كل الروابط النسبية هتتحسب منه.
- `target="_blank"` — المكان الافتراضي لفتح الروابط (اختياري).
- لازم يكون **جوه `<head>`** وفي صفحة واحدة بس **عنصر واحد** منه.

## use

- لما تكون صفحاتك كلها بتحمّل ملفاتها من مجلد واحد بعيد (CDN مثلاً) وعايز تكتب الروابط مختصرة.
- لو الموقع ملفاته على مسار فرعي (زي `/my-app/`) وعايز كل المسارات النسبية تشتغل من هناك.
- لما عايز كل روابط الصفحة تتفتح في تبويب جديد من غير ما تكتب `target` على كل واحد.
- في الصفحات اللي بتتولّد برمجياً وبتتحمل من أماكن مختلفة وعايز مسارات ثابتة.

## avoid

- لو شغال على صفحة عادية بروابط بسيطة: مش محتاجه، وبيعقّد الدنيا.
- مع الروابط الداخلية `href="#section"`: هتتحول لروابط للعنوان الأساسي مش للصفحة الحالية، وده بيخلّي القفز جوه الصفحة يبوظ.
- لو بتستخدم Framework بيتحكم في الـ routing (React Router وأمثاله)، ممكن يتعارض معاه.
- متحطهوش بعد أي عنصر بيستخدم رابط (`<link>` أو `<script>` أو `<a>`) لأنه هيتجاهله.

## attributes

عنصر `<base>` ليه خاصيتين بس (ولازم واحدة منهم على الأقل)، وبيقبل كمان الخصائص العامة (راجع [[global-attributes]]).

### href
العنوان الأساسي اللي بتتحسب منه كل الروابط النسبية في الصفحة. ممكن يكون عنوان كامل (مطلق) أو نسبي لمكان الصفحة.

- `https://example.com/files/` — عنوان كامل (مطلق). الأشهر.
- `/app/` — مسار نسبي من جذر الموقع.

لو الرابط في الصفحة مطلق (`https://...`) فـ `<base>` ما بيأثرش عليه.

```html nolive
<base href="https://example.com/files/">
<a href="report.pdf">التقرير</a>
```

### target
الاسم الافتراضي لمكان فتح الروابط (`<a>` و `<area>` و `<form>`) لو ما حددتش `target` على العنصر نفسه.

- `_self` — في نفس التبويب (الافتراضي المعتاد).
- `_blank` — في تبويب أو نافذة جديدة.
- `_parent` — في الإطار الأب لو الصفحة جوه إطار.
- `_top` — في أعلى مستوى للنافذة.
- اسم إطار `<iframe>` معيّن.

```html nolive
<base target="_blank">
<a href="https://example.com">هيتفتح في تبويب جديد</a>
```

## examples

### 1) base بعنوان كامل
لما تحط `<base href>` بعنوان كامل، الرابط النسبي `page.html` بيتحول لعنوان كامل. شوف الناتج.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <base href="https://example.com/blog/">
</head>
<body>
  <a id="a1" href="post1.html">المقال الأول</a>
  <p id="r"></p>
  <script>
    document.getElementById('r').textContent =
      document.getElementById('a1').href;
  </script>
</body>
</html>
```

- `href="post1.html"` هو رابط نسبي، والناتج هو `https://example.com/blog/post1.html`.

### 2) الرابط المطلق ما بيتأثرش
لو الرابط بيبدأ بـ `https://` فهو كامل وما بيتغيرش.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <base href="https://example.com/blog/">
</head>
<body>
  <a id="a1" href="https://google.com/search">رابط مطلق</a>
  <a id="a2" href="/about">رابط من الجذر</a>
  <ul id="r"></ul>
  <script>
    ['a1', 'a2'].forEach(id => {
      const li = document.createElement('li');
      li.textContent = document.getElementById(id).href;
      document.getElementById('r').appendChild(li);
    });
  </script>
</body>
</html>
```

- الأول فضل زي ما هو. التاني (`/about`) بيبدأ من جذر الموقع اللي في `<base>` يعني `https://example.com/about`.

### 3) مجلد فرعي بدل الجذر
لو الـ `href` بتاع `<base>` فيه مسار، فالروابط بتتحسب من المسار ده.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <base href="https://example.com/a/b/">
</head>
<body>
  <a id="x" href="c.html">c.html</a><br>
  <a id="y" href="../d.html">../d.html</a>
  <ul id="r"></ul>
  <script>
    ['x', 'y'].forEach(id => {
      const li = document.createElement('li');
      li.textContent = document.getElementById(id).href;
      document.getElementById('r').appendChild(li);
    });
  </script>
</body>
</html>
```

- `../d.html` بيطلع مجلد واحد لفوق، فالنتيجة `https://example.com/a/d.html`.
- لازم يخلص بـ `/` لو هو مجلد، وإلا آخر جزء بيتشال.

### 4) target افتراضي لكل الروابط
لو كل روابط الصفحة المفروض تتفتح في تبويب جديد (زي صفحة روابط خارجية)، بدل ما تكتب `target="_blank"` على كل رابط اكتبها مرة واحدة في `<base>`. المثال `nolive` لأن فتح التبويبات مش هيظهر جوه المعاينة.

```html nolive
<head>
  <base target="_blank">
</head>
<body>
  <a href="https://example.com/1">رابط 1</a>
  <a href="https://example.com/2">رابط 2</a>
  <a href="https://example.com/3">رابط 3</a>
</body>
```

- التلات روابط هيتفتحوا كل واحد في تبويب جديد من غير ما تكتب `target` عليهم.
- خلّي بالك: لو قرأت `link.target` من الجافاسكربت هتلاقيها فاضية، لأن القيمة بتتورّث وقت الضغط على الرابط بس، مش بتتكتب على العنصر.

### 5) تخطي target لرابط معيّن
لو عايز استثناء، اكتب `target` على الرابط نفسه، هو أقوى من `<base>`.

```html nolive
<head>
  <base target="_blank">
</head>
<body>
  <a href="a.html">يتفتح في تبويب جديد</a>
  <a href="b.html" target="_self">يتفتح في نفس التبويب</a>
</body>
```

- الرابط الأول بيورّث `_blank` من `<base>`.
- الرابط التاني بيكتب `target="_self"` فبيتجاهل `<base>`.

### 6) مشكلة الروابط الداخلية #
دي أشهر مشكلة. الرابط `#footer` هيتحسب من العنوان الأساسي، فبدل ما يروح لتحت في الصفحة هيحاول يفتح صفحة تانية.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <base href="https://example.com/docs/">
</head>
<body>
  <a id="a" href="#footer">انزل للفوتر</a>
  <p id="r"></p>
  <script>
    document.getElementById('r').textContent =
      document.getElementById('a').href;
  </script>
</body>
</html>
```

- العنوان الكامل بيطلع `https://example.com/docs/#footer`: يعني خروج من صفحتك الحالية! الحل: متستخدمش `<base>` لو الصفحة فيها روابط `#`، أو اكتب الرابط كامل.

## rules

- parents: `<head>` بس.
- children: مفيش (عنصر فارغ).
- closing: مفيش وسم إغلاق (Void element).
- role: مفيش.
- dom: `HTMLBaseElement`.
- layout: `display: none`.

## mistakes

### وضعه بعد عناصر فيها روابط
```html bad
<head>
  <link rel="stylesheet" href="style.css">
  <base href="https://example.com/">
</head>
```
```html good
<head>
  <base href="https://example.com/">
  <link rel="stylesheet" href="style.css">
</head>
```
ليه؟ لازم `<base>` ييجي **قبل** أي عنصر بيستخدم رابط، وإلا المتصفح ممكن يحسب الروابط اللي قبله من غير ما ياخده في اعتباره.

### وضع أكتر من base
```html bad
<head>
  <base href="https://a.com/">
  <base href="https://b.com/">
</head>
```
```html good
<head>
  <base href="https://a.com/">
</head>
```
ليه؟ المتصفح بيستخدم **أول** `<base>` له `href` وبيتجاهل الباقي.

### نسيان الشرطة المائلة في آخر المجلد
```html bad
<base href="https://example.com/files">
```
```html good
<base href="https://example.com/files/">
```
ليه؟ من غير `/` في الآخر المتصفح بيعتبر `files` اسم ملف مش مجلد، وبيحذفه لما يحسب الروابط.

## a11y

- الروابط الداخلية (Skip links) اللي بتبدأ بـ `#` بتبوظ مع `<base>`، وده بيأثّر على مستخدمي لوحة المفاتيح وقارئ الشاشة. اتأكد منها.
- لو غيّرت `target` لـ `_blank` لكل الروابط، المستخدم ممكن يتلخبط من التبويبات الجديدة، وقارئ الشاشة مش بيعرف يقول له. حط تنبيه نصي في الروابط اللي بتفتح تبويب جديد.

## tips

- لو بتتعامل مع Framework أو أداة بناء (Webpack, Vite) غالباً مش محتاج `<base>` لأنها بتتعامل مع المسارات.
- استخدم `document.baseURI` من الجافاسكربت عشان تعرف العنوان الأساسي الفعلي للصفحة.
- بدل `<base>` للمواقع الصغيرة، الأفضل تستخدم مسارات تبدأ بـ `/` (من جذر الموقع).

## quiz

### إيه اللي بيعمله `<base>`؟
- [ ] بيربط ملف CSS
- [x] بيحدد العنوان الأساسي للروابط النسبية
- [ ] بيحدد عنوان الصفحة
- [ ] بيحط ترميز الحروف
`<base>` بيغيّر المكان اللي المتصفح بيحسب منه الروابط النسبية.

### كام `<base>` مسموح في الصفحة؟
- [ ] أي عدد
- [x] واحد بس
- [ ] اتنين
- [ ] واحد في الـ head وواحد في الـ body
مسموح بعنصر `<base>` واحد فقط، وفي الـ `<head>`.

### إيه مشكلة `<base href="https://example.com/">` مع الرابط `<a href="#top">`؟
- [ ] مفيش مشكلة
- [x] الرابط هيتحول لـ `https://example.com/#top` ومش هيقفز جوه الصفحة الحالية
- [ ] الرابط هيتمسح
- [ ] الصفحة هتقفل
الروابط اللي بتبدأ بـ `#` بتتحسب من `<base>` برضه، فبتعمل تنقل للعنوان الأساسي.

## refs

- [MDN: base](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base)
- [WHATWG: The base element](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element)
