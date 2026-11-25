---
id: login-page
type: project
title: صفحة تسجيل دخول
summary: بتبني صفحة تسجيل دخول متصمّمة بالكامل من ملف فاضي: كارت وفورم وحقول بـ placeholder و focus وزرار بحالاته وفاصل وشعار.
time: 45
level: مبتدئ
tags: css, form, hover, focus, pseudo-elements
---

## about

هتبني **صفحة تسجيل دخول** بشكل احترافي: كارت أبيض في نص الصفحة على خلفية تدرّج ناعمة، وفيه شعار وعنوان وحقلين (إيميل وكلمة سر) بتلميحات `placeholder` وإطار بيتغيّر لما الماوس يعدّي عليه أو تدوس جواه. وفيه زرار «تسجيل الدخول» بيتفاعل مع الماوس والكيبورد، ورابط «نسيت كلمة السر؟»، وفاصل «أو»، وزرار تاني لإنشاء حساب جديد.

المشروع ده هو التطبيق العملي لكل اللي اتعلمته في الـ selectors والـ pseudo-classes والـ pseudo-elements والـ cascade. هتبدأ من ملفين فاضيين (`index.html` و`style.css`) وتبني الصفحة خطوة خطوة، وفي كل خطوة بتشوف الشكل بيتحسّن قدامك. من غير Flexbox ولا Grid: بس `margin` و`padding` و`width` و`text-align`، والصفحة بتشتغل حلو على الموبايل.

## skills

- تحويل فورم HTML خام لواجهة متصمّمة: `label` و`input` و`button`
- حالات التفاعل `:hover` و`:focus` و`:active` و`:focus-visible` وإمتى تستخدم كل واحدة
- الـ pseudo-elements: `::placeholder` و`::before` و`::after` و`::selection`
- تصميم رابط يشتغل كزرار، وفخ الـ specificity بين `a:hover` والـ class
- كارت متوسّط بـ `max-width` و`margin: 0 auto`، وصفحة بتشتغل على الموبايل
- خلفية تدرّج وظلال وألوان متناسقة (palette)

## step: هيكل الصفحة والكارت

نبدأ من ملف `index.html` الفاضي. الهيكل اللي هتكتبه هو نفس هيكل أي صفحة اتعلمته، بس المرة دي فيه سطر زيادة مهم للموبايل. اكتب ده في `index.html`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تسجيل الدخول</title>
</head>
<body>
  <main class="card">
    <h1>أهلاً بعودتك</h1>
    <p class="subtitle">سجّل دخولك عشان تكمّل من آخر مكان وقفت عنده.</p>
  </main>
</body>
</html>
```

- `<meta name="viewport" ...>` بتقول للموبايل «اعرض الصفحة بعرض الشاشة الحقيقي». من غير السطر ده الموبايل بيعرض الصفحة كأنها صفحة كمبيوتر متصغّرة، وأي تصميم متجاوب بيبوظ. مش هتشوفه في الشكل، بس هو أساس أي صفحة بتشتغل على الموبايل.
- `<main class="card">` هو الصندوق اللي المحتوى كله هيتحط جواه. الـ «كارت» (card) هو الشكل المعروف لصفحات الدخول: صندوق أبيض بحواف مدوّرة في نص الصفحة. الـ class اسمه `card` وهنربط بيه الـ CSS بعد شوية، فاكتبه بالظبط كده.
- `<h1>` هو العنوان، و`<p class="subtitle">` هي الجملة اللي تحته.

لسه مفيش CSS خالص، فالصفحة هتظهر بالشكل الافتراضي بتاع المتصفح. ده طبيعي: هنلبّسها الشكل خطوة خطوة.

:::tests
الملف بيبدأ بـ DOCTYPE :: /^\s*<!doctype html>/i.test(src.main)
وسم html فيه lang="ar" و dir="rtl" :: document.documentElement.getAttribute('lang') === 'ar' && document.documentElement.getAttribute('dir') === 'rtl'
فيه meta viewport فيها device-width :: /device-width/.test(($('meta[name="viewport"]') || {}).content || '')
فيه meta charset وعنوان title فيه نص :: !!$('meta[charset]') && txt('title').length > 2
فيه main بالكلاس card وجواه h1 فيه نص :: !!$('main.card > h1') && txt('main.card > h1').length > 3
فيه فقرة بالكلاس subtitle بعد الـ h1 مباشرة :: !!$('main.card > h1 + p.subtitle') && txt('.subtitle').length > 10
:::
:::hint
الهيكل: `html` فيه `head` و`body`. جوه `head` حط `meta` للـ charset و`meta` للـ viewport و`title`. جوه `body` حط `main class="card"` وجواه الـ `h1` والفقرة.
:::

## step: الفورم

تحت الفقرة، جوه `<main>`، ضيف الفورم. كل حقل بيتحط في `<div class="field">` ومعاه الـ `<label>` بتاعه:

```html
    <form action="#" method="post">
      <div class="field">
        <label for="email">البريد الإلكتروني</label>
        <input type="email" id="email" name="email"
               placeholder="name@example.com"
               autocomplete="email" required>
      </div>
      <div class="field">
        <label for="password">كلمة السر</label>
        <input type="password" id="password" name="password"
               placeholder="اكتب كلمة السر"
               autocomplete="current-password" required>
      </div>
      <button type="submit">تسجيل الدخول</button>
    </form>
```

- `<div class="field">` بيلمّ الـ label مع الـ input في مجموعة واحدة. ده هيفيدنا في الـ CSS: هنتحكم في المسافة بين الحقول من مكان واحد.
- `for="email"` في الـ label لازم يطابق `id="email"` في الـ input. الربط ده معناه إن الضغط على الكلمة يودّيك للحقل، وقارئ الشاشة يعرف الحقل ده بتاع إيه. اكتب الـ id بالظبط `email` و`password` لأننا هنستخدمهم في الاختبارات.
- `placeholder` تلميح رمادي بيختفي لما تكتب. هو مكمّل للـ label مش بديل ليه.
- `autocomplete` بيخلّي المتصفح ومدير الباسوردات يملّوا الحقل لوحدهم، و`required` معناها إن الحقل إجباري.
- الزرار `type="submit"` هو اللي بيبعت الفورم.

الصفحة دلوقتي شكلها خام ومش متنسّق. عادي جداً: دي حالة «قبل»، والجمال كله جاي في الخطوات الجاية.

:::tests
فيه form جوه الـ main.card :: !!$('main.card form')
فيه حقلين جوه div بالكلاس field :: $$('form .field').length >= 2
حقل الإيميل (id="email" و type="email") ومربوط بـ label :: !!$('input#email[type="email"]') && !!$('label[for="email"]')
حقل كلمة السر (id="password" و type="password") ومربوط بـ label :: !!$('input#password[type="password"]') && !!$('label[for="password"]')
الحقلين فيهم placeholder و name :: $('#email').placeholder.length > 0 && $('#password').placeholder.length > 0 && !!$('#email').name && !!$('#password').name
فيه زرار submit فيه نص :: const b = $('form button'); return !!b && b.type === 'submit' && txt(b).length > 2
:::
:::hint
كل حقل: `div.field` وجواه `label for="..."` و`input id="..."` بنفس القيمة. والزرار `button type="submit"` بعد الحقلين جوه الـ `form`.
:::

## step: ربط الـ CSS وأساس الصفحة

الخطوة دي فيها حاجتين: نربط ملف الـ CSS بالصفحة، ونكتب الأساس اللي التصميم كله هيتبني عليه.

**أولاً: الربط.** ضيف السطر ده في `index.html` جوه `<head>` بعد `<title>`:

```html
  <link rel="stylesheet" href="style.css">
```

الملف `style.css` موجود، بس المتصفح مش شايفه لحد ما تربطه. لو كتبت CSS ومفيش أي حاجة اتغيّرت، أول حاجة تشيّك عليها هي الربط.

**ثانياً: الأساس.** اكتب ده في `style.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 48px 16px;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Arial, sans-serif;
  line-height: 1.6;
  color: #0f172a;
  background: linear-gradient(135deg, #e0e7ff, #fce7f3);
}
```

- `* { box-sizing: border-box; }`: النجمة بتختار كل العناصر. الـ `border-box` معناها إن الـ `width` بتحسب الـ `padding` والـ `border` جواها. من غيرها، لو عملت حقل `width: 100%` وحطيت له `padding`، هيطلع أعرض من الكارت.
- `margin: 0`: المتصفح بيحط للـ `body` `margin` 8px من نفسه. بنصفّره عشان نتحكم في المسافات بنفسنا.
- `padding: 48px 16px`: 48px فوق وتحت، و16px يمين وشمال. الـ 16px دي اللي هتخلّي الكارت ميلزقش في حرف الشاشة على الموبايل.
- `min-height: 100vh`: أقل طول للـ `body` هو طول الشاشة كلها. ده بيخلّي الخلفية تملا الشاشة حتى لو المحتوى قصير، ولو المحتوى طويل الـ `body` بيكبر عادي (ده الفرق بينها وبين `height`).
- `font-family`: أول خط في القايمة هو المفضّل، ولو مش موجود على الجهاز المتصفح بيجرّب اللي بعده، وآخر واحد `sans-serif` هو الضمان.
- `line-height: 1.6`: مسافة مريحة بين السطور، والعربي بالذات محتاج مسافة أكبر شوية.
- `color: #0f172a`: لون النص الأساسي. أزرق غامق جداً بدل الأسود الصريح، وده أريح للعين وأشيك.
- `background: linear-gradient(135deg, #e0e7ff, #fce7f3)`: تدرّج بزاوية 135 درجة من بنفسجي فاتح لوردي فاتح.

> [!tip] الـ palette
> كل ألوان المشروع من عيلتين بس: درجات الـ slate (رمادي مزرق) للنصوص والحدود، ودرجات الـ indigo (نيلي) للزرار والروابط. استخدام عيلتين بس هو سر إن الصفحة تبان متناسقة.

:::tests
فيه link جوه الـ head بيربط ملف style.css :: /<head[\s\S]*<link\b(?=[^>]*rel\s*=\s*["']?stylesheet)(?=[^>]*href\s*=\s*["']?(?:\.\/)?style\.css)[^>]*>[\s\S]*<\/head>/i.test(src.main)
كل العناصر بقت box-sizing border-box :: ['body', 'main', 'h1', 'input'].every(s => css(s, 'box-sizing') === 'border-box')
الـ body من غير margin وفيه padding جانبي :: css('body', 'margin-top') === '0px' && parseFloat(css('body', 'padding-left')) >= 8
الـ body طوله على الأقل طول الشاشة (min-height) :: rect('body').height >= win.innerHeight - 1
الخط sans-serif بدل الخط الافتراضي :: /sans-serif|segoe|tahoma|arial/i.test(css('body', 'font-family'))
خلفية الصفحة تدرّج لوني (gradient) :: /gradient/.test(css('body', 'background-image'))
:::
:::hint
في `index.html` السطر `<link rel="stylesheet" href="style.css">` بعد `<title>`. وفي `style.css` قاعدة للنجمة `*` وقاعدة للـ `body`.
:::

## step: الكارت والعنوان

دلوقتي نحوّل الـ `main` لكارت حقيقي، ونظبّط العنوان والجملة اللي تحته. ضيف في آخر `style.css`:

```css
.card {
  max-width: 420px;
  margin: 0 auto;
  padding: 36px 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
  line-height: 1.3;
  text-align: center;
}

.subtitle {
  margin: 0 0 28px;
  color: #475569;
  text-align: center;
}
```

- `max-width: 420px`: أقصى عرض للكارت. ليه `max-width` مش `width`؟ لأن `width: 420px` عرض ثابت، فعلى موبايل عرضه 360px الكارت هيطلع برّه الشاشة. أما `max-width` فمعناها «خد عرضك الطبيعي بس متعدّاش 420»: على الموبايل الكارت بيصغر مع الشاشة، وعلى الكمبيوتر بيقف عند 420.
- `margin: 0 auto`: فوق وتحت صفر، ويمين وشمال `auto` يعني «وزّع المساحة الفاضية بالتساوي»، فالكارت بيتوسّط. الـ `auto` بتشتغل لما العنصر عرضه أصغر من أبوه، وده اللي `max-width` ضمنه.
- `padding: 36px 32px`: مسافة بين حرف الكارت والمحتوى اللي جواه. من غيرها الكلام هيلزق في الحافة.
- `border-radius: 20px`: حواف مدوّرة. كل ما كبّرت الرقم الحواف بقت أنعم.
- `box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12)`: صفر إزاحة أفقية، و20px لتحت، و45px تغبيش، ولون غامق شفاف جداً (12%). الظل الناعم هو اللي بيحسّس إن الكارت طاير فوق الخلفية. لو غمّقت اللون الظل هيبقى تقيل وهيبوّظ الشكل.
- الـ `h1`: بنصفّر الـ `margin` الافتراضي اللي المتصفح بيحطه ونسيب 8px تحت بس. و`line-height: 1.3` أقل من الفقرات لأن العنوان كبير وغالباً سطر واحد.
- `.subtitle`: لون رمادي أفتح من العنوان (`#475569`) عشان ينزل درجة في الأهمية، والـ `margin-bottom: 28px` بيفصله عن الفورم.

> [!key] الأهم يبان أكتر
> التدرّج في الحجم واللون هو اللي بيوجّه عين القارئ: عنوان كبير وغامق، وتحته جملة أخف. لو كل النصوص بنفس الحجم واللون الصفحة هتبقى مملة ومحدش هيعرف يبدأ منين.

:::tests
الكارت عرضه محدود (بين 300 و 480 على شاشة كبيرة) :: rect('.card').width > 300 && rect('.card').width <= 480
الكارت متوسّط في الصفحة (margin يمين وشمال متساويين) :: parseFloat(css('.card', 'margin-left')) > 0 && css('.card', 'margin-left') === css('.card', 'margin-right')
الكارت أبيض بحواف مدوّرة وظل وpadding جواه :: colorIs('.card', 'background-color', '#ffffff') && parseFloat(css('.card', 'border-top-left-radius')) >= 10 && css('.card', 'box-shadow') !== 'none' && parseFloat(css('.card', 'padding-top')) >= 16
الـ h1 في النص وحجمه حوالي 28px :: css('h1', 'text-align') === 'center' && parseFloat(css('h1', 'font-size')) >= 24 && parseFloat(css('h1', 'font-size')) <= 30
الـ subtitle في النص ولونه مختلف عن لون العنوان :: css('.subtitle', 'text-align') === 'center' && css('.subtitle', 'color') !== css('h1', 'color')
على موبايل 360px الكارت جوه الشاشة من غير scroll أفقي @360 :: doc.documentElement.scrollWidth <= doc.documentElement.clientWidth && rect('.card').width > 250 && rect('.card').width < 360
:::
:::hint
القاعدة `.card` فيها `max-width` و`margin: 0 auto`. لو الكارت لسه واخد عرض الصفحة كله يبقى الـ `max-width` ناقص.
:::

## step: الـ labels والحقول

الفورم دلوقتي بالشكل الافتراضي للمتصفح: حقول صغيرة وإطار رفيع وخط مختلف. هنظبّطها. ضيف في آخر `style.css`:

```css
.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #334155;
}

.field input {
  display: block;
  width: 100%;
  padding: 13px 16px;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  color: #0f172a;
  font-family: inherit;
  font-size: 16px;
}
```

- `.field { margin-bottom: 18px }`: المسافة بين كل حقل والتاني. حطيناها على الـ `.field` (الصندوق) مش على الـ input، عشان الـ label والحقل يتحركوا مع بعض.
- `.field label`: ده selector بمسافة بين اتنين (descendant)، معناه «أي label جوه عنصر `.field`». الـ label عنصر inline بطبيعته، فـ `display: block` بتخلّيه ياخد سطر لوحده فوق الحقل، و`margin-bottom` بيدّي مسافة بينه وبين الحقل.
- `display: block` و`width: 100%` على الـ input: الحقل بطبيعته inline-block، فبنخليه block وعرضه 100% عشان يملا عرض الكارت. وفاكر `box-sizing: border-box` من الخطوة ٣؟ هو اللي ضامن إن الـ 100% دي تشمل الـ `padding` والـ `border` وإن الحقل ميطلعش برّه الكارت.
- `padding: 13px 16px`: مساحة مريحة جوه الحقل. الحقل الكبير أسهل في الضغط بالصباع على الموبايل.
- `border: 2px solid #cbd5e1` و`border-radius: 12px`: إطار رمادي فاتح وحواف مدوّرة. لون الإطار ده هو اللي هنغيّره في الـ hover والـ focus بعد شوية.
- `background: #f8fafc`: خلفية رمادي فاتح جداً بتفرّق الحقل عن الكارت الأبيض.
- `font-size: 16px`: على iPhone لو حجم الخط جوه الحقل أقل من 16px المتصفح بيعمل zoom تلقائي أول ما تدوس على الحقل. الـ 16px بتمنع ده.

> [!warn] ليه `font-family: inherit`؟
> الـ `input` والـ `button` مش بيورّثوا الخط من الصفحة زي باقي العناصر: المتصفح بيدّيهم خط النظام بتاعه. فبنكتب `inherit` يعني «خد خط أبوك». افتكر درس الـ cascade: الكلمة دي بتجبر الخاصية تاخد قيمتها من العنصر الأب. من غيرها هتلاقي الحقول بخط والصفحة بخط تاني.

:::tests
كل label بقت block وخطها عريض (600 أو أكتر) :: $$('.field label').length >= 2 && $$('.field label').every(l => getComputedStyle(l).display === 'block' && +getComputedStyle(l).fontWeight >= 600)
الحقول واخدة عرض الكارت من جوه (width: 100%) :: const c = rect('.card'), p = parseFloat(css('.card', 'padding-left')) + parseFloat(css('.card', 'padding-right')); return $$('.field input').length >= 2 && $$('.field input').every(i => Math.abs(i.getBoundingClientRect().width - (c.width - p)) < 2)
الحقول فيها padding وإطار (border) وحواف مدوّرة :: const s = getComputedStyle($('#email')); return parseFloat(s.paddingTop) >= 8 && parseFloat(s.paddingLeft) >= 10 && parseFloat(s.borderTopWidth) >= 1 && parseFloat(s.borderTopLeftRadius) >= 6
الحقول بتورّث خط الصفحة وحجمه 16px :: css('#email', 'font-family') === css('body', 'font-family') && css('#email', 'font-size') === '16px'
خلفية الحقل مش أبيض صريح :: !colorIs('#email', 'background-color', '#ffffff')
فيه مسافة بين كل حقل والتاني (margin-bottom) :: parseFloat(css('.field', 'margin-bottom')) >= 10
:::
:::hint
`.field input` لازم يبقى `display: block` و`width: 100%` ومعاهم `padding` و`border` و`border-radius` و`font-family: inherit`.
:::

## step: الـ placeholder والـ hover والـ focus

دلوقتي الحقول محتاجة تتجاوب مع المستخدم: تلميح بلون مقروء، وتغيّر لما الماوس يعدّي، وعلامة واضحة لما تدوس جواها. ضيف في آخر `style.css`:

```css
.field input::placeholder {
  color: #64748b;
  opacity: 1;
}

.field input:hover {
  border-color: #94a3b8;
}

.field input:focus {
  outline: 3px solid rgba(79, 70, 229, 0.25);
  border-color: #4f46e5;
  background: #ffffff;
}
```

- `::placeholder` بيختار نص التلميح اللي جوه الحقل، مش الحقل نفسه (ده pseudo-element، علامتين `::`). اللون `#64748b` غامق كفاية إنه يتقرا، وأفتح من النص اللي المستخدم هيكتبه (`#0f172a`) عشان يبان إنه تلميح مش قيمة. و`opacity: 1` لأن بعض المتصفحات بتخلّي الـ placeholder نصف شفاف من نفسها، فبنثبّتها عشان اللون يبان زي ما اخترته في كل المتصفحات.
- `:hover` بتشتغل لما المؤشر يعدّي فوق الحقل. غمّقنا الإطار شوية، وده بيقول للمستخدم «ده حقل تقدر تدوس عليه».
- `:focus` بتشتغل لما المستخدم يدوس جوه الحقل أو يوصله بزرار Tab. دي أهم حالة في الفورم لأنها بتعرّف المستخدم هو بيكتب فين. غيّرنا لون الإطار للنيلي، ورسمنا حوالين الحقل حلقة (`outline`) نيلي شفافة، وخلّينا الخلفية بيضا.

> [!warn] متشيلش الـ outline من غير بديل
> كتير بيكتبوا `outline: none` عشان الإطار الافتراضي مش عاجبهم، وبيسيبوا الحقل من غير أي علامة لما يتفوكس. اللي بيتنقّل بالكيبورد هيتوه. لو شلت الـ outline لازم تحط بديل واضح. إحنا هنا غيّرناه لحلقة أشيك، مش شلناه.

> [!key] الترتيب مهم
> `.field input:hover` و`.field input:focus` ليهم نفس الـ specificity. لما الاتنين يحصلوا مع بعض (الماوس فوق الحقل وهو متفوكس) اللي مكتوبة **آخر** هي اللي تكسب. عشان كده كتبنا `:hover` الأول و`:focus` بعده: الـ focus لازم يكسب.

:::tests
قاعدة الـ placeholder بتحدد color وopacity بقيمة 1 :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /input[^,]*placeholder/.test(r.selectorText || '') && !!r.style.color && /^(1|100%)$/.test(r.style.opacity))
لون الـ placeholder أفتح من لون النص اللي المستخدم بيكتبه :: const n = c => (rgb(c).match(/\d+/g) || []).slice(0, 3).reduce((a, b) => a + +b, 0); return n(getComputedStyle($('#email'), '::placeholder').color) > n(css('#email', 'color')) + 60
قاعدة :hover على الحقل بتغيّر الإطار (أو الخلفية) :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /input[^,]*:hover/.test(r.selectorText || '') && !!(r.style.borderColor || r.style.border || r.style.backgroundColor || r.style.boxShadow))
قاعدة :focus على الحقل بتغيّر لون الإطار وبترسم حلقة واضحة (outline أو box-shadow) :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /input[^,]*:focus\b/.test(r.selectorText || '') && !!(r.style.borderColor || r.style.border) && ((!!r.style.boxShadow && r.style.boxShadow !== 'none') || (!!r.style.outline && !/\bnone\b/.test(r.style.outline))))
قاعدة :hover مكتوبة قبل قاعدة :focus (عشان الـ focus يكسب) :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); const i = R.findIndex(r => /input[^,]*:hover/.test(r.selectorText || '')); const j = R.findIndex(r => /input[^,]*:focus\b/.test(r.selectorText || '')); return i > -1 && j > i
:::
:::hint
التلميح: `.field input::placeholder` (اللون و`opacity: 1`)، وبعدها `.field input:hover` وبعدها `.field input:focus`. الترتيب ده بالظبط.
:::

## step: الزرار وحالاته

الزرار هو أهم عنصر في الصفحة، فمحتاج شكل واضح وحالات بتحسّس المستخدم إنه حي. ضيف في آخر `style.css`:

```css
button {
  display: block;
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #ffffff;
  font-family: inherit;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.3);
}

button:hover {
  background: #4338ca;
  box-shadow: 0 10px 22px rgba(67, 56, 202, 0.4);
}

button:active {
  background: #3730a3;
}

button:focus-visible {
  outline: 3px solid #a5b4fc;
  outline-offset: 3px;
}
```

- **الأساس:** `display: block` و`width: 100%` عشان الزرار ياخد عرض الحقول بالظبط. `border: none` بتشيل إطار المتصفح الافتراضي وبنعمل خلفية ملوّنة بدله. `font-family: inherit` زي الحقول بالظبط (الزرار كمان مش بيورّث الخط). `cursor: pointer` بتحوّل المؤشر ليد، وده اللي بيقول «اضغط هنا». و`box-shadow` ظل نيلي خفيف بيدّي الزرار عمق.
- `:hover`: لما الماوس يعدّي، اللون بيغمّق درجة والظل بيكبر شوية. الإحساس إن الزرار «بيرتفع» ناحيتك.
- `:active`: أثناء الضغط الفعلي (من ما تدوس لحد ما تسيب)، اللون بيغمّق أكتر. ده اللي بيدّي إحساس الضغطة.
- `:focus-visible`: بتشتغل لما توصل للزرار بالكيبورد (Tab) بس، ومش بتشتغل لما تضغط عليه بالماوس. ده بالظبط المطلوب: اللي بيستخدم الكيبورد يشوف حلقة واضحة تعرّفه هو فين، واللي بالماوس ميشوفش إطار مش محتاجه. `outline-offset: 3px` بتبعد الحلقة عن الزرار شوية عشان تبان.

> [!note] ترتيب الحالات
> كتبنا الأساس ثم `:hover` ثم `:active`. السبب نفسه اللي فات: لما الماوس فوق الزرار وانت ضاغط عليه، الحالتين بيحصلوا مع بعض ونفس الـ specificity، فاللي بعد في الكود (`:active`) هي اللي بتكسب.

لاحظ إن التغيير بيحصل فجأة من غير حركة. الانتقال الناعم بين الحالات اسمه transition وهتتعلّمه في وحدة لاحقة.

:::tests
الزرار واخد عرض الحقول كله :: Math.abs(rect('form button').width - rect('#email').width) < 2
خلفية الزرار غامقة (لون البراند) ولون الكلام أبيض :: const m = (rgb(css('form button', 'background-color')).match(/\d+/g) || []).map(Number); return m.length >= 3 && m[0] + m[1] + m[2] < 450 && colorIs('form button', 'color', '#ffffff')
الزرار من غير border وبحواف مدوّرة ومؤشره إيد (pointer) :: parseFloat(css('form button', 'border-top-width')) === 0 && parseFloat(css('form button', 'border-top-left-radius')) >= 6 && css('form button', 'cursor') === 'pointer'
الزرار بيورّث خط الصفحة وخطه عريض وحجمه 16px أو أكتر :: css('form button', 'font-family') === css('body', 'font-family') && +css('form button', 'font-weight') >= 600 && parseFloat(css('form button', 'font-size')) >= 16
فيه :hover و :active للزرار وكل واحدة بتغيّر الخلفية :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return ['hover', 'active'].every(st => R.some(r => new RegExp('button[^,]*:' + st + '\\b').test(r.selectorText || '') && !!(r.style.backgroundColor || r.style.background)))
فيه :focus-visible للزرار بيرسم outline واضح :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /button[^,]*:focus-visible/.test(r.selectorText || '') && !!r.style.outline && !/\bnone\b/.test(r.style.outline))
:::
:::hint
ابدأ بقاعدة `button` (الأساس)، وبعدها `button:hover` ثم `button:active` ثم `button:focus-visible`، بالترتيب ده.
:::

## step: رابط «نسيت كلمة السر؟» وحالات الروابط

أولاً في `index.html` ضيف الرابط بعد `</form>` وقبل `</main>`:

```html
    <p class="forgot"><a href="#forgot">نسيت كلمة السر؟</a></p>
```

وبعدين في آخر `style.css`:

```css
.forgot {
  margin: 18px 0 0;
  font-size: 15px;
  text-align: center;
}

a {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
}

a:hover {
  color: #3730a3;
  text-decoration: underline;
}

a:focus-visible {
  outline: 3px solid rgba(79, 70, 229, 0.35);
  outline-offset: 3px;
}
```

- `.forgot`: الفقرة في النص وخطها أصغر شوية (15px) لأن الرابط ده ثانوي، مش لازم ينافس الزرار.
- `a`: بنغيّر شكل **كل** الروابط في الصفحة: لون نيلي، وخط عريض، وبنشيل الخط اللي تحتها (`text-decoration: none`) لأننا هنرجّعه في الـ hover. الـ `border-radius: 4px` بتخلّي الحلقة اللي حوالين الرابط وقت الـ focus حوافها ناعمة، لأن الـ outline في المتصفحات الحديثة بيمشي مع حواف الـ `border-radius`.
- `a:hover`: لما الماوس يعدّي، اللون بيغمّق ويظهر الخط تحت الرابط. كده الرابط بيعرّف نفسه لما المستخدم يقرّب منه.
- `a:focus-visible`: نفس فكرة حلقة الكيبورد اللي عملناها للزرار.

> [!warn] قاعدة `a` بتأثر على كل رابط
> القاعدة اللي كتبناها على `a` مش خاصة بالرابط ده بس. أي رابط هنضيفه بعد كده هياخد نفس الستايل. ده مفيد، بس ممكن يعمل مفاجأة. هنشوفها بالظبط في الخطوة اللي جاية.

:::tests
فيه فقرة بالكلاس forgot بعد الفورم وفيها رابط :: !!$('.forgot a[href]') && !!($('form').compareDocumentPosition($('.forgot')) & Node.DOCUMENT_POSITION_FOLLOWING)
الرابط من غير خط تحته وبلونه الخاص (مش الأزرق الافتراضي) وخطه عريض :: css('.forgot a', 'text-decoration-line') === 'none' && css('.forgot a', 'color') !== 'rgb(0, 0, 238)' && +css('.forgot a', 'font-weight') >= 600
الفقرة في النص وخطها أصغر من 16px :: css('.forgot', 'text-align') === 'center' && parseFloat(css('.forgot', 'font-size')) < 16
قاعدة a:hover بتغيّر اللون وبترجّع الخط تحت الرابط (underline) :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /(^|[\s,>+~])a:hover/.test(r.selectorText || '') && !!r.style.color && /underline/.test(String(r.style.textDecoration) + String(r.style.textDecorationLine)))
قاعدة a:focus-visible بترسم outline واضح :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /(^|[\s,>+~])a:focus-visible/.test(r.selectorText || '') && !!r.style.outline && !/\bnone\b/.test(r.style.outline))
:::
:::hint
في الـ HTML: `p class="forgot"` وجواه `a href="#forgot"`. وفي الـ CSS: `.forgot` وبعدها `a` وبعدها `a:hover` وبعدها `a:focus-visible`.
:::

## step: الفاصل وزرار «إنشاء حساب جديد»

في `index.html` ضيف السطرين دول بعد فقرة `.forgot` وقبل `</main>`:

```html
    <p class="divider">أو</p>
    <a class="btn-outline" href="#signup">إنشاء حساب جديد</a>
```

وفي آخر `style.css`:

```css
.divider {
  margin: 26px 0;
  color: #64748b;
  font-size: 14px;
  text-align: center;
}

.divider::before,
.divider::after {
  content: "";
  display: inline-block;
  width: 28%;
  height: 1px;
  margin: 0 12px;
  background: #cbd5e1;
  vertical-align: middle;
}

.btn-outline {
  display: block;
  padding: 12px 16px;
  border: 2px solid #c7d2fe;
  border-radius: 12px;
  color: #4338ca;
  text-align: center;
}

.btn-outline:hover {
  background: #eef2ff;
  border-color: #4f46e5;
  text-decoration: none;
}
```

**الفاصل.** عايزين شكل «خط، أو، خط». بدل ما نكتب عنصرين HTML للخطين، هنخلّي الـ CSS يرسمهم بـ `::before` و`::after`:

- `::before` و`::after` بيعملوا عنصر وهمي قبل محتوى العنصر وبعده من غير ما نكتب أي HTML.
- `content: ""`: لازم تتكتب حتى لو فاضية، لأن من غيرها المتصفح مبيعملش العنصر الوهمي أصلاً.
- `display: inline-block`: العنصر الوهمي بيطلع inline (زي الكلام)، والـ inline بيتجاهل `width` و`height`. الـ `inline-block` بيخليه يقعد جنب الكلمة في نفس السطر ويقبل عرض وارتفاع.
- `width: 28%` (نسبة من عرض الفقرة) مع `height: 1px` بيعملوا خط رفيع، والـ `background` هو لونه.
- `vertical-align: middle`: خاصية جديدة هنشرحها بالتفصيل بعدين. هي هنا بترفع الخط لنص ارتفاع الكلمة، من غيرها الخط بيقعد على خط الكتابة تحت.

**الزرار التاني.** «إنشاء حساب» مش بيبعت فورم، هو بيودّيك لصفحة تانية، فالمفروض يبقى رابط `<a>` مش `<button>`. بس عايزينه يبان زرار:

- `display: block` بيخلّي الرابط ياخد السطر كله ويقبل الـ `padding` من فوق وتحت. و`text-align: center` بيوسّط الكلام.
- مكتبناش `text-decoration` ولا `font-weight` هنا لأنهم جايين لوحدهم من قاعدة `a` اللي كتبناها في الخطوة اللي فاتت.

> [!key] فخ الـ specificity
> قاعدة `a:hover` ليها specificity أعلى من `.btn-outline` لوحدها: الأولى (صفر، واحد، واحد) لأن فيها pseudo-class وtype، والتانية (صفر، واحد، صفر) لأن فيها class بس. يعني لو مكتبناش `.btn-outline:hover`، ساعة الـ hover قاعدة `a:hover` هي اللي هتكسب وهيظهر خط تحت الكلام جوه الزرار. عشان كده كتبنا `.btn-outline:hover` (صفر، اتنين، صفر، يعني أقوى من الاتنين) وكتبنا فيها `text-decoration: none` صراحةً.

:::tests
فيه فقرة بالكلاس divider فيها كلمة «أو» بعد الـ forgot :: !!$('.divider') && txt('.divider').includes('أو') && !!($('.forgot').compareDocumentPosition($('.divider')) & Node.DOCUMENT_POSITION_FOLLOWING)
الخطين على جنب «أو» اتعملوا بـ before و after وليهم content وعرض وارتفاع رفيع :: const d = $('.divider'); if (!d) return false; return ['::before', '::after'].every(p => { const s = getComputedStyle(d, p); return s.content !== 'none' && s.content !== 'normal' && parseFloat(s.width) > 20 && parseFloat(s.height) >= 1 && parseFloat(s.height) <= 3 })
الفاصل «أو» فضل في سطر واحد حتى على موبايل 360px @360 :: !!$('.divider') && rect('.divider').height < 40
رابط إنشاء الحساب بيتصرّف كزرار: block بعرض الزرار وكلامه في النص :: !!$('a.btn-outline') && css('.btn-outline', 'display') === 'block' && Math.abs(rect('.btn-outline').width - rect('form button').width) < 2 && css('.btn-outline', 'text-align') === 'center'
الرابط ليه إطار وحواف مدوّرة ومن غير خط تحته :: parseFloat(css('.btn-outline', 'border-top-width')) >= 1 && parseFloat(css('.btn-outline', 'border-top-left-radius')) >= 6 && css('.btn-outline', 'text-decoration-line') === 'none'
قاعدة .btn-outline:hover بتغيّر الخلفية ومش بترجّع الـ underline :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /\.btn-outline:hover/.test(r.selectorText || '') && !!(r.style.backgroundColor || r.style.background) && /none/.test(String(r.style.textDecoration) + String(r.style.textDecorationLine)))
:::
:::hint
الفاصل: `.divider` وبعدها `.divider::before, .divider::after` (مهم `content` و`display: inline-block`). والزرار: `.btn-outline` وبعدها `.btn-outline:hover` وفيها `text-decoration: none`.
:::

## step: الشعار واللمسات الأخيرة

آخر خطوة: هنحط شعار فوق العنوان، ونغيّر لون تحديد الكلام. في `index.html` ضيف السطر ده أول حاجة جوه `<main>` (قبل الـ `<h1>`):

```html
    <div class="logo" aria-hidden="true">ت</div>
```

وفي آخر `style.css`:

```css
.logo {
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #4338ca);
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
  line-height: 56px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.35);
}

::selection {
  background: #c7d2fe;
  color: #1e1b4b;
}
```

- الشعار مربع `56px` متدوّر الحواف، وبتدرّج نيلي. الـ `margin: 0 auto 18px` بتوسّطه أفقياً (عشان عرضه محدّد) وبتسيب 18px تحته.
- `line-height: 56px`: حيلة بسيطة، لو الـ `line-height` بتساوي الارتفاع والكلام سطر واحد، الحرف بيتوسّط رأسياً من غير أي حاجة تانية. و`text-align: center` بتوسّطه أفقياً.
- `aria-hidden="true"` بتقول لقارئ الشاشة (اللي بيقرا الصفحة للمكفوفين) يتجاهل الشعار لأنه زخرفة بس.
- `::selection` بيختار الكلام اللي المستخدم بيحدّده بالماوس. المتصفح بيلوّنه بالأزرق الافتراضي، وإحنا غيّرناه للنيلي الفاتح عشان يتماشى مع باقي الألوان. الـ `::selection` بتقبل خصائص قليلة زي `color` و`background`.

> [!tip] خلّصت المشروع
> جرّب دلوقتي: دوس Tab كذا مرة وشوف الحلقة بتتنقّل بين الحقول والزرار والروابط. حدّد كلام بالماوس وشوف لونه. ضيّق عرض المعاينة وشوف الكارت بيتصرّف إزاي. الصفحة بتشتغل على الموبايل لوحدها لأننا استخدمنا `max-width` و`padding` بدل عروض ثابتة.

:::tests
فيه div بالكلاس logo أول حاجة جوه الكارت وفيه حرف :: !!$('main.card > .logo') && $('main.card').firstElementChild === $('.logo') && txt('.logo').length >= 1
الشعار مربع (عرضه = طوله) ومتوسّط في الكارت :: const l = $('.logo'); if (!l) return false; const a = l.getBoundingClientRect(), c = rect('.card'); return a.width >= 40 && a.width <= 100 && Math.abs(a.width - a.height) < 1 && Math.abs((a.left + a.right) / 2 - (c.left + c.right) / 2) < 2
خلفية الشعار تدرّج وحوافه مدوّرة :: /gradient/.test(css('.logo', 'background-image')) && parseFloat(css('.logo', 'border-top-left-radius')) >= 8
الحرف جوه الشعار أبيض وكبير وفي نص المربع :: colorIs('.logo', 'color', '#ffffff') && parseFloat(css('.logo', 'font-size')) >= 20 && css('.logo', 'text-align') === 'center'
فيه قاعدة لتحديد الكلام (selection) بتغيّر لون الخلفية :: const R = [...doc.styleSheets].flatMap(s => [...s.cssRules]); return R.some(r => /selection/.test(r.selectorText || '') && !!r.style.backgroundColor)
على موبايل 360px مفيش scroll أفقي والشعار والزرار ظاهرين @360 :: !!$('.logo') && doc.documentElement.scrollWidth <= doc.documentElement.clientWidth && rect('form button').width > 200
:::
:::hint
في الـ HTML: `div class="logo"` أول عنصر في `main`. وفي الـ CSS: `.logo` (عرض وارتفاع متساويين و`line-height` بنفس الارتفاع) وبعدها قاعدة `::selection`.
:::
