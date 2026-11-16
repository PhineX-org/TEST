---
id: script
kind: element
cat: scripting
tag: script
title: عنصر السكريبت
en: HTML script element
status: stable
display: none
void: no
support: all
summary: بيضيف كود جافاسكربت للصفحة، مكتوب جواها أو من ملف خارجي بـ src. بيدعم async وdefer والموديولات type=module، وبيستخدم كمان لتخزين بيانات JSON وخرايط الاستيراد.
keywords: script, سكريبت, جافاسكربت, javascript, src, async, defer, module, type, importmap, json, نص برمجي, integrity, crossorigin, nomodule
related: noscript, template, link, body, head
---

## intro

HTML بيبني الهيكل وCSS بيحدد الشكل، لكن **التفاعل** (الضغط، الحسابات، تغيير المحتوى، جلب بيانات) محتاج لغة برمجة: **جافاسكربت**. والعنصر اللي بيدخّلها الصفحة هو `<script>` (اسمه **Script**: نص برمجي). تقدر تكتب الكود **جواه مباشرة** (Inline)، أو تشاور على **ملف خارجي** بـ `src` (وده الأفضل في المشاريع الحقيقية).

الـ `<script>` عنصر **بيتنفّذ في الحال**: أول ما المتصفح يوصل له وهو بيقرا الصفحة، **بيوقف** قراءة الباقي (Parser blocking) لحد ما ينزّل الملف وينفّذه. وده سبب مشكلتين: بطء، وإن الكود ممكن ينفّذ **قبل ما العناصر اللي بيتعامل معاها تتعمل**. عشان كده فيه حلين: تحط السكريبت في **آخر `<body>`**، أو تستخدم **`defer`** (نزّله بالتوازي ونفّذه بعد ما الصفحة تخلص) أو **`async`** (نزّله بالتوازي ونفّذه فوراً أول ما يجهز بدون ترتيب).

وخاصية **`type`** بتغيّر معنى العنصر: `type="module"` يعني ملف ES Module (`import`/`export`، وبيتأجّل تلقائياً زي `defer`). `type="importmap"` يعرّف أسماء مختصرة للموديولات. وأي `type` تاني مش جافاسكربت (زي `application/json`) المتصفح **مبينفّذوش** بل بيعامله **بلوك بيانات** تقدر تقراه بجافاسكربت. 

والأمان: السكريبتات من مصادر خارجية (CDN) خطر لو اتعدّلت. فيه **`integrity`** (بصمة تأكد إن الملف ما اتغيّرش) و**`crossorigin`** و**`nonce`** (مع سياسة CSP). وتذكّر: أي سكريبت بتحطه بيعمل **كل حاجة** في صفحتك، فمتحطش كود من مصدر مش بتثق فيه.

> [!analogy] `<script>` زي **ورقة تعليمات لمنفّذ**: المتصفح بيقرا الصفحة سطر سطر، ولما يوصل لورقة التعليمات بيقف وينفّذها، وبعدين يكمّل. `defer` يعني «نفّذها بعد ما تخلص قراية الصفحة» و`async` يعني «نفّذها أول ما تجهز».

> [!key] `<script src defer>` في الـ `<head>` هو الأفضل. `type="module"` للموديولات. أي `type` مش جافاسكربت = بلوك بيانات مش بيتنفّذ.

## try

غيّر الكود وشوف النتيجة.

```html
<p id="out">لسه…</p>
<script>
  const out = document.getElementById('out');
  out.textContent = 'السكريبت اشتغل: ' + (2 + 3 * 4);
</script>
```

## syntax

```html nolive
<script src="app.js" defer></script>

<script>
  console.log('كود مكتوب جوه الصفحة');
</script>

<script type="module" src="main.js"></script>
```

- `<script ...>` — **الوسم الافتتاحي**.
- `src` — **ملف خارجي** (ولو موجود، المحتوى الداخلي بيتجاهل).
- `defer` / `async` / `type="module"` — **توقيت التنفيذ**.
- المحتوى — **كود جافاسكربت** (لو مفيش `src`).
- `</script>` — **الوسم الختامي** إجباري، حتى مع `src`.

## use

- لإضافة تفاعل: أزرار، قوائم، نماذج.
- لتحميل مكتبات (React، jQuery، ...).
- لتخزين بيانات JSON داخل الصفحة.
- لتعريف موديولات ES وخرايط استيراد.
- لتتبع الإحصائيات (Analytics).

## avoid

- متكتبش كود طويل inline: الصق في ملف خارجي.
- متحطش سكريبت من مصدر غريب من غير `integrity`.
- متنساش وسم الإغلاق `</script>` حتى مع `src`.
- متكتبش `document.write` في الكود الحديث: بيبوّظ الصفحة.
- متحطش سكريبت تقيل في أول `<head>` من غير `defer`: بيوقف عرض الصفحة.

## attributes

### src
**عنوان ملف الجافاسكربت.** لو موجود، أي كود مكتوب جوه الوسم بيتجاهل.

```html nolive
<script src="js/app.js"></script>
```

### type
**نوع المحتوى.** الافتراضي جافاسكربت. `module` للموديولات، `importmap` لخريطة الاستيراد، `speculationrules` للتحميل المسبق. أي قيمة تانية = بلوك بيانات.

### async {boolean}
**نزّل بالتوازي ونفّذ فوراً** أول ما يجهز (من غير ترتيب). مناسب لسكريبتات مستقلة (إحصائيات).

### defer {boolean}
**نزّل بالتوازي ونفّذ بعد ما الصفحة تتحلّل بالكامل**، وبنفس الترتيب اللي كُتبوا بيه. الأنسب لأغلب السكريبتات. (بيتجاهل لو مفيش `src`.)

### crossorigin
**طلب الملف بإذن CORS** (`anonymous` أو `use-credentials`). مطلوب مع `integrity` من دومين تاني، ولعرض أخطاء السكريبت بتفاصيل.

### integrity
**بصمة (Hash) للملف**: المتصفح بيتأكد إن الملف المحمّل مطابق وإلا يرفضه. أمان لمكتبات الـ CDN.

```html nolive
<script src="https://cdn.example/lib.js"
        integrity="sha384-..." crossorigin="anonymous"></script>
```

### nomodule {boolean}
**المتصفحات اللي بتفهم الموديولات بتتجاهل السكريبت ده.** كان بيستخدم كاحتياطي للمتصفحات القديمة.

### referrerpolicy
**بيتحكم في معلومات المصدر** المبعوتة مع طلب الملف.

### fetchpriority
**أولوية الجلب**: `high` أو `low` أو `auto`.

### nonce
**رقم لمرة واحدة** بيستخدم مع سياسة CSP عشان تسمح بسكريبتات معينة بس.

### blocking {experimental}
**بيحدد الأشياء اللي السكريبت يوقفها** (مثل `render`). تجريبي.

### language {deprecated}
كانت بتحدد اللغة (`javascript`). **قديمة**، متستخدمهاش.

### charset {deprecated}
كانت بتحدد ترميز الملف. **قديمة**: اكتب الملفات UTF-8 وخلاص.

## examples

### 1) كود inline بسيط
جوه الصفحة.

```html
<button id="b">دوس عليا</button>
<p id="n">العدد: 0</p>
<script>
  let n = 0;
  document.getElementById('b').addEventListener('click', () => {
    n++;
    document.getElementById('n').textContent = 'العدد: ' + n;
  });
</script>
```

- السكريبت جاي **بعد** الزرار والفقرة، فالعناصر موجودة لما ينفّذ.
- `addEventListener` بيربط حدث الضغط.
- لو حطيت السكريبت **قبل** العناصر هيطلع خطأ لأن `getElementById` هيرجّع `null`.

### 2) موديول ES
`type="module"`.

```html
<p id="r">…</p>
<script type="module">
  const square = (x) => x * x;
  const total = [1, 2, 3, 4].map(square).reduce((a, b) => a + b, 0);
  document.getElementById('r').textContent = 'مجموع المربعات: ' + total;
  // الموديول مش بيسرّب متغيراته للـ window:
  console.log(typeof window.square);
</script>
```

- `type="module"` بيخلّي الكود في **نطاق خاص** (`square` مش ظاهر برّه).
- الموديولات **متأجّلة تلقائياً** (زي `defer`) وفي وضع `strict`.
- في الشغل الحقيقي بتستخدم `import { x } from './file.js'`.
- مفيش حاجة اسمها `this` = `window` في الموديول، فهو `undefined`.

### 3) بيانات JSON داخل الصفحة
مش بيتنفّذ.

```html
<script id="data" type="application/json">
  { "name": "فاينكس", "courses": ["HTML", "CSS", "JS"] }
</script>
<ul id="list"></ul>
<script>
  const data = JSON.parse(document.getElementById('data').textContent);
  document.getElementById('list').innerHTML =
    data.courses.map(c => '<li>' + c + '</li>').join('');
</script>
```

- `type="application/json"` بيخلّي المتصفح **ما ينفّذش** الكتلة، فبتبقى مخزن بيانات.
- بنقراها بـ `textContent` وبعدين `JSON.parse`.
- ده أسلوب شائع لتمرير بيانات من السيرفر للصفحة من غير طلب إضافي.

### 4) defer مقابل async
ترتيب التنفيذ.

```html nolive
<!-- بيتنفّذوا بنفس الترتيب بعد تحميل الصفحة -->
<script src="a.js" defer></script>
<script src="b.js" defer></script>

<!-- بيتنفّذوا بأي ترتيب أول ما يجهزوا -->
<script src="ads.js" async></script>
<script src="analytics.js" async></script>
```

- `defer` بيحافظ على الترتيب، فمناسب لسكريبتات بتعتمد على بعضها (مكتبة ثم كودك).
- `async` من غير ترتيب، فمناسب لسكريبتات مستقلة.
- الاتنين بينزّلوا بالتوازي مع قراءة الصفحة (من غير ما يوقفوها).
- من غير أي منهما، السكريبت **بيوقف** الصفحة لحد ما ينزل وينفّذ.

### 5) خريطة استيراد
`importmap`.

```html nolive
<script type="importmap">
  { "imports": { "confetti": "https://cdn.jsdelivr.net/npm/canvas-confetti@1/+esm" } }
</script>
<script type="module">
  import confetti from 'confetti';
  confetti();
</script>
```

- الخريطة بتخلّي `import 'confetti'` يشتغل باسم مختصر بدل عنوان طويل.
- لازم تتحط **قبل** أي `type="module"`.
- بتسمح بالموديولات من غير أداة بناء (bundler).

### 6) قراءة السكريبت نفسه
`currentScript`.

```html
<script data-msg="أنا بياناتك" id="me">
  document.write('');
  const s = document.currentScript;
  console.log(s.id, s.dataset.msg);
</script>
<p>افتح الكونسول (Console) وشوف الناتج.</p>
```

- `document.currentScript` بيرجّع عنصر السكريبت اللي بيتنفّذ دلوقتي.
- ممكن تستخدمه لقراءة `data-*` أو تحط مخرجات جنبه.
- مش بيشتغل جوه الموديولات أو بعد انتهاء التنفيذ (بيرجع `null`).

## rules

- parents: أي عنصر بيقبل **Metadata** أو **Phrasing** (الأشهر `<head>` و`<body>`).
- children: كود النص (أو مفيش مع `src`).
- closing: الوسم الختامي `</script>` إجباري.
- role: مفيش.
- dom: `HTMLScriptElement`.
- layout: `display: none`.

## mistakes

### نسيان وسم الإغلاق مع src
```html bad
<script src="app.js" />
```
```html good
<script src="app.js"></script>
```
ليه؟ `<script>` مش void، والـ `/>` مبيقفلوش. المتصفح هيعتبر كل اللي بعده جزء من السكريبت.

### سكريبت قبل العناصر
```html bad
<script>
  document.getElementById('btn').onclick = () => alert('hi');
</script>
<button id="btn">دوس</button>
```
```html good
<button id="btn">دوس</button>
<script>
  document.getElementById('btn').onclick = () => alert('hi');
</script>
```
ليه؟ السكريبت اتنفّذ قبل ما الزرار يتعمل فـ `getElementById` رجّع `null`. حطه بعده أو استخدم `defer`.

### async لسكريبتات بتعتمد على بعضها
```html bad
<script src="jquery.js" async></script>
<script src="my-code.js" async></script>
```
```html good
<script src="jquery.js" defer></script>
<script src="my-code.js" defer></script>
```
ليه؟ مع `async` ممكن `my-code.js` يخلص الأول وينفّذ قبل المكتبة. `defer` بيضمن الترتيب.

### إغلاق script جوه نص
```html bad
<script>
  const s = "</script>";
</script>
```
```html good
<script>
  const s = "<\/script>";
</script>
```
ليه؟ المتصفح بيقفل السكريبت عند أول `</script>` حتى لو جوه نص. اهرب الشرطة المائلة.

## a11y

- ما تعتمدش على الجافاسكربت لوظائف أساسية: وفّر بديل بـ [[noscript]] أو تدرّج (Progressive Enhancement).
- لو التفاعل بيغيّر المحتوى، استخدم `aria-live` أو تحكم في الفوكس.
- متعطّلش الكيبورد: أي حدث ماوس لازم يبقى له مقابل كيبورد.

## tips

- استخدم `defer` كإعداد افتراضي.
- اتحقق من `integrity` لأي ملف CDN.
- فصّل الكود في ملفات، وخلّي HTML نضيف.
- استخدم الكونسول (`F12`) لمتابعة الأخطاء.
- `type="module"` بيمنع تلوّث النطاق العام.

## quiz

### إيه الفرق بين `defer` و`async`؟
- [ ] مفيش فرق
- [x] `defer` بيحافظ على الترتيب وينفّذ بعد تحليل الصفحة، و`async` ينفّذ فور الجاهزية
- [ ] `async` أبطأ
- [ ] `defer` للصور
`defer` أنسب لسكريبتات مترابطة.

### إيه اللي بيحصل لو حطيت `type="application/json"`؟
- [ ] بيتنفّذ كجافاسكربت
- [x] بيتحول لبلوك بيانات مش بيتنفّذ
- [ ] بيحصل خطأ
- [ ] بيتخفى الصفحة
تقدر تقراه بـ `textContent`.

### ليه الأفضل تحط السكريبت في آخر `<body>` أو بـ `defer`؟
- [ ] لتغيير اللون
- [x] عشان العناصر تكون اتعملت قبل التنفيذ ومايوقفش عرض الصفحة
- [ ] عشان يبقى مخفي
- [ ] عشان يتكرر
بيتفادى `null` وبيسرّع الظهور.

### إيه فايدة `integrity`؟
- [ ] تسريع التحميل
- [x] التأكد إن الملف الخارجي ما اتعدّلش
- [ ] ضغط الملف
- [ ] تلوين الكود
بصمة Hash بيتحقق منها المتصفح.

## refs

- [MDN: script](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- [WHATWG: The script element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
