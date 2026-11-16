---
id: meta-description
kind: guide
cat: meta
title: وصف الصفحة ومحركات البحث (meta description و robots)
en: Page description and search engine meta tags
status: stable
summary: إزاي تكتب وصف الصفحة اللي بيظهر في جوجل تحت العنوان، وتتحكم في الفهرسة بـ robots، ومعاهم author و theme-color و color-scheme، وإيه اللي بقى مالوش لازمة زي keywords.
keywords: description, وصف الصفحة, seo, robots, noindex, جوجل, محركات البحث, meta description, keywords, theme-color
related: meta, title, meta-social, head
---

## intro

لما بتدوّر على حاجة في جوجل، كل نتيجة بتتكون من تلات حاجات: **العنوان** الأزرق (ده `<title>`)، والرابط الأخضر، وتحتهم **سطرين وصف** رمادي. السطرين دول هم اللي بيقنعوك تدوس على النتيجة دي ولا اللي بعدها. ومصدرهم الأساسي هو `<meta name="description">` اللي بتكتبه انت.

الوصف الحلو بيلخّص الصفحة في جملة أو اتنين، بشكل يخلّي الشخص يقول «ده اللي أنا بدوّر عليه». هو **مش** بيرفع ترتيب صفحتك في جوجل بشكل مباشر، لكنه بيرفع **نسبة الضغط** (يعني ناس أكتر بتدوس على نتيجتك)، وده بيفيدك فعلياً.

خلّي بالك من حاجة: جوجل **مش ملزم** يعرض وصفك. ساعات بيستبدله بجزء من نص الصفحة لو شايف إنه أنسب لسؤال الباحث. لكن لازم تكتب وصف كويس لكل صفحة، وهو بيتعرض في معظم الحالات.

وفي نفس الفصل ده هنتعلم كمان `robots` اللي بتتحكم في فهرسة الصفحة، وكام معلومة تانية بتتحط في `<meta>` وبتفيد: `author` و `theme-color` و `color-scheme`.

> [!analogy] تخيّل واجهة محل كتب. العنوان على اللافتة (`<title>`)، والوصف هو الملصق الصغير في الفترينة اللي بيقول «رواية مشوّقة عن ...». اللافتة بتشدّك، والملصق بيقنعك تدخل.

> [!key] اكتب وصف **مختلف لكل صفحة**، حوالي 120–160 حرف (مفيش رقم رسمي، ده تقدير)، فيه الفكرة الرئيسية وكلمة تحفيز.

## examples

### 1) أبسط وصف
وصف عادي في الـ head. الكود بيعرضه جوه الصفحة عشان تشوفه.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>تعلّم HTML من الصفر | PhineX</title>
  <meta name="description"
        content="كورس HTML بالعربي للمبتدئين: شرح مبسط وأمثلة تفاعلية ومشاريع.">
</head>
<body>
  <p id="d"></p>
  <script>
    document.getElementById('d').textContent =
      document.querySelector('meta[name=description]').content;
  </script>
</body>
</html>
```

- `name="description"` معناها «ده وصف الصفحة».
- `content` فيه الوصف الفعلي.

### 2) شكل نتيجة جوجل
المثال ده رسم بالـ HTML بيوريك إزاي `<title>` و `<meta description>` بيظهروا للباحث.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    .r { font-family: Arial, sans-serif; max-width: 460px; }
    .r .u { color: #188038; font-size: 13px; }
    .r .t { color: #1a0dab; font-size: 19px; margin: 2px 0; }
    .r .d { color: #4d5156; font-size: 14px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="r">
    <div class="u">phinex.academy › html</div>
    <div class="t">تعلّم HTML من الصفر | PhineX</div>
    <div class="d">كورس HTML بالعربي للمبتدئين: شرح مبسط وأمثلة تفاعلية
      ومشاريع حقيقية.</div>
  </div>
</body>
</html>
```

- الأزرق هو `<title>`، والرمادي هو `<meta name="description">`.
- لو الوصف طويل أوي جوجل بيقصّه بـ «...».

### 3) وصف ضعيف مقابل وصف قوي
مقارنة بتوضح الفرق.

```html nolive
<!-- ضعيف: عام ومالوش معنى -->
<meta name="description" content="مرحباً بكم في موقعنا">

<!-- ضعيف: كلمات مكررة (Keyword stuffing) -->
<meta name="description" content="html html css css تعلم html مجانا html">

<!-- قوي: محدد، فيه الفايدة، وفيه تحفيز -->
<meta name="description"
      content="اتعلّم HTML خطوة بخطوة بأمثلة تفاعلية تجرّبها بنفسك. مجاناً وبالعربي.">
```

- الوصف القوي بيقول للباحث إيه اللي هيلاقيه وليه يدوس.

### 4) robots: التحكم في الفهرسة
لو صفحة ما تحبش جوجل يضيفها لنتايج البحث (صفحة شكر، لوحة تحكم).

```html nolive
<head>
  <meta name="robots" content="noindex, nofollow">
</head>
```

- القيم الشائعة: `index` / `noindex` (فهرس / متفهرسش)، `follow` / `nofollow` (اتبع الروابط / متتبعش)، `noarchive` (متحفظش نسخة مخبأة)، `nosnippet` (متعرضش مقتطف).
- الافتراضي `index, follow`: يعني مش محتاج تكتبه.
- مهم: `robots` مجرد طلب مهذب، مش حماية. لو عايز صفحة سرية فعلاً، احمها بكلمة سر.

### 5) author و generator
معلومات إضافية عن الصفحة. بتفيد بعض الأدوات.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="author" content="أحمد الجوهري">
  <meta name="generator" content="PhineX Builder 1.0">
</head>
<body>
  <ul id="o"></ul>
  <script>
    ['author', 'generator'].forEach(n => {
      const li = document.createElement('li');
      li.textContent = n + ': ' + document.querySelector('meta[name=' + n + ']').content;
      document.getElementById('o').appendChild(li);
    });
  </script>
</body>
</html>
```

- `author` للكاتب، و `generator` للأداة اللي عملت الصفحة (زي WordPress).
- ما بيأثروش على ترتيب الصفحة في جوجل.

### 6) theme-color
بيغيّر لون شريط المتصفح على الموبايل ليتماشى مع هوية موقعك.

```html nolive
<head>
  <meta name="theme-color" content="#0d47a1">
  <!-- لون مختلف في الوضع الداكن -->
  <meta name="theme-color" content="#000000"
        media="(prefers-color-scheme: dark)">
</head>
```

- `content` لون بصيغة CSS (`#rrggbb` مثلاً).
- بتشتغل في متصفحات كتير على الموبايل (Chrome أندرويد وSafari حديث).

### 7) color-scheme
بتقول للمتصفح إن صفحتك بتدعم الوضع الفاتح والداكن، فيلوّن عناصره الافتراضية بالوضع المناسب.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light dark">
</head>
<body>
  <p>عناصر الفورم والـ scrollbar بتتظبط حسب وضع جهازك.</p>
  <input placeholder="اكتب هنا"> <button>زرار</button>
</body>
</html>
```

- جرّب تغيّر وضع جهازك بين الفاتح والداكن.

## use

- في **كل** صفحة عامة عايزها تظهر في جوجل: `description` فريد ومقنع.
- `robots` مع `noindex` للصفحات الخاصة أو المكررة.
- `theme-color` لتجربة موبايل أنضف.
- `color-scheme` لو الموقع بيدعم الوضعين.

## avoid

- متستخدمش `keywords`: جوجل مبقاش يعتمد عليها من حوالي 2009. ملهاش لازمة.
- متكتبش نفس الوصف لكل الصفحات.
- متحشيش الوصف بالكلمات المفتاحية (Keyword stuffing).
- متعتمدش على `noindex` لإخفاء معلومات سرية.
- متكتبش وصف طويل أوي (هيتقصّ) أو قصير أوي (مش مفيد).

## mistakes

### وصف مكرر لكل الصفحات
```html bad
<meta name="description" content="موقع PhineX">
```
```html good
<meta name="description" content="شرح عنصر video في HTML: الخصائص والأمثلة والأخطاء الشائعة.">
```
ليه؟ كل صفحة ليها غرض، والوصف لازم يعبّر عنه. الوصف المكرر بيضيّع فرصتك.

### نسيان content
```html bad
<meta name="description">
```
```html good
<meta name="description" content="وصف مفيد للصفحة">
```
ليه؟ من غير `content` مفيش وصف.

### استخدام robots لحماية صفحة سرية
```html bad
<!-- معتمد على إن جوجل ما يشوفهاش -->
<meta name="robots" content="noindex">
<p>رقم الحساب: 1234</p>
```
```html good
<!-- الحماية الحقيقية من السيرفر: تسجيل دخول + صلاحيات -->
```
ليه؟ `noindex` بيمنع الظهور في جوجل، لكن أي حد معاه الرابط يقدر يفتح الصفحة.

## tips

- اكتب الوصف كأنك بتكلم الباحث: ابدأ بالفايدة، واختم بدعوة خفيفة.
- حط الكلمة المهمة في أول الجملة، لأن جوجل بيظهّر كلمات البحث بالخط الغامق في الوصف.
- لو الصفحة صفحات كتير (مدونة) ولّد الوصف من أول جملة في المقال.
- أدوات زي Google Search Console بتوريك شكل صفحتك في البحث.

## quiz

### مين اللي بيتحكم في شكل الوصف النهائي في جوجل؟
- [ ] انت بس
- [x] جوجل، وممكن يستخدم وصفك أو يستبدله بنص من الصفحة
- [ ] المتصفح
- [ ] مفيش وصف
وصفك مجرد اقتراح قوي، وجوجل بيقرر الأنسب للسؤال.

### أي `<meta>` مالهوش تأثير على جوجل تقريباً؟
- [x] `keywords`
- [ ] `description`
- [ ] `robots`
- [ ] `viewport`
`keywords` اتجاهلها جوجل من سنين، والباقي ليه استخدام.

### إيه معنى `noindex`؟
- [ ] متتبعش الروابط
- [x] متضيفش الصفحة لنتايج البحث
- [ ] احذف الصفحة
- [ ] اخفي الصفحة عن المستخدم
`noindex` بتطلب من محرك البحث ما يفهرسش الصفحة، مش بتخفيها عن حد.

## refs

- [MDN: meta name](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name)
- [Google: عن وصف الصفحة (snippets)](https://developers.google.com/search/docs/appearance/snippet)
