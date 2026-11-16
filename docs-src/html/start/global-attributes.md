---
id: global-attributes
kind: guide
cat: start
title: الخصائص العامة (Global Attributes)
en: HTML global attributes
status: stable
summary: الخصائص اللي أي عنصر في HTML بيقبلها زي id و class و style و lang و hidden و tabindex و popover و data-*: كل واحدة بتعمل إيه وإمتى تستخدمها.
keywords: خصائص عامة, global attributes, id, class, style, title, lang, dir, translate, hidden, inert, tabindex, accesskey, autofocus, contenteditable, draggable, spellcheck, inputmode, popover, role, aria, data-*, dataset, onclick, microdata
related: anatomy, nesting-rules, semantic-html, div, span, button, input, a, p, attr-class, attr-id, attr-data
---

## intro

لما بتتعلم عنصر زي `<a>` أو `<img>` بتلاقي ليه خصائص مخصوصة بيه: `href` للرابط و `src` للصورة. لكن فيه مجموعة تانية من الخصائص **أي عنصر في HTML بيقبلها**، حتى لو العنصر ده `<span>` عادي أو `<div>` أو `<p>`. دي اسمها **الخصائص العامة** (Global Attributes). يعني تتعلم الخاصية مرة واحدة وتستخدمها على آلاف العناصر: `id` و `class` و `style` و `title` و `lang` و `hidden` وغيرهم. (لو مش فاكر يعني إيه «خاصية» ومكانها فين جوه الوسم، ارجع لـ [[anatomy]].)

الخصائص العامة بتتقسّم لتلات عيلات. **خصائص مفردة** ليها اسم ثابت زي `id` و `lang`. و**عيلة `data-*`** اللي إنت بتختار اسمها بنفسك (`data-price` و `data-user-id`…) عشان تخزّن معلومات خاصة بيك على العنصر. و**عيلة `aria-*`** اللي بتساعد قارئات الشاشة. وفوقهم **خصائص الأحداث** زي `onclick`. في الدليل ده هنمشي عليهم كلهم مجموعة مجموعة، ومع كل خاصية مثال تقدر تعدّله وتجرّبه.

فيه نقطة لازم تتفهم من الأول: «العنصر بيقبل الخاصية» مش معناها «ليها أثر مع كل عنصر». المتصفح مش هيزعّق لو كتبت `contenteditable` على `<meta>`، بس مش هيحصل حاجة لأن `<meta>` أصلاً مش بيظهر على الشاشة. وكمان في المقابل خصائص كتير بنشوفها كل يوم **مش** عامة: `src` و `href` و `alt` و `width` و `disabled` و `type` و `value`. دي ليها عناصر معينة بس (جرّب تكتب `disabled` على `<div>` وشوف مفيش حاجة بتحصل). عشان كده كل صفحة عنصر في التوثيق بتقولك «بياخد الخصائص العامة بالإضافة للخصائص الخاصة بيه».

> [!analogy] الخصائص العامة زي **بيانات البطاقة الشخصية**: كل مواطن عنده اسم ورقم قومي ولغة وعنوان، سواء كان دكتور أو سواق أو طالب. أما الخصائص الخاصة زي `href` فهي زي **كارنيه النقابة**: مخصوص لفئة معينة بس. ولو جيت تدوّر على كارنيه نقابة الأطباء عند حد مش دكتور مش هتلاقيه.

> [!key] لو شفت خاصية على عنصر ومش لاقيها في صفحته، غالباً هي خاصية عامة. وأي اسم يبدأ بـ `data-` أو `aria-` أو `on` هو من العيلات العامة كمان.

## section: خريطة سريعة: إيه اللي هنغطيه

عشان متتوهش وسط الأسماء، دي خريطة بالمجموعات اللي هتشوفها تحت:

- **هوية وتنسيق:** `id` و `class` و `style` و `title`.
- **لغة واتجاه:** `lang` و `dir` و `translate`.
- **سلوك العنصر:** `hidden` و `inert` و `tabindex` و `accesskey` و `autofocus` و `contenteditable` و `draggable` و `spellcheck` و `autocapitalize` و `enterkeyhint` و `inputmode` و `popover`.
- **بيانات وإتاحة:** `role` و `aria-*` و `data-*`.
- **متقدم:** `slot` و `is` و `nonce` و `part` و `exportparts`، وخصائص الأحداث (`onclick`…)، والـ Microdata.

كل خاصية فيهم مكتوبة في عنوان صغير بنفس اسمها، فتقدر تنط لها بسرعة من القايمة الجانبية.

## section: هوية وتنسيق: id و class و style و title

المجموعة دي هي أكتر حاجة هتكتبها في أي صفحة. بتديك **اسم** للعنصر، وبتخليك **تنسّقه**، وبتضيف عليه **تلميح**.

### `id` — اسم فريد للعنصر
الـ `id` (اختصار Identifier) هو **اسم فريد** للعنصر في الصفحة كلها. مفيش عنصرين ينفع ياخدوا نفس الـ `id`. بنستخدمه عشان نوصل للعنصر بالظبط: رابط يقفز له (`href="#about"`)، أو `<label>` يتربط بحقل (`for="name"`)، أو كود JavaScript يدوّر عليه، أو CSS يستهدفه.

- القيمة لازم تكون **حرف واحد على الأقل** ومن غير أي **مسافة**.
- بتفرّق بين الحروف الكبيرة والصغيرة: `Menu` غير `menu`.
- الأفضل تبدأ بحرف وتكمّل بحروف وأرقام وشرطة: `main-menu`.
- لازم يبقى **فريد**: لو اتكرر المتصفح هيشتغل، لكن الكود هيلاقي أول واحد بس.

```html live
<h2 id="about">عن الكورس</h2>
<p><a href="#about">الرابط ده بيودّيك للعنوان</a></p>
<label for="user">اسمك:</label>
<input id="user" type="text">
<script>
  var el = document.getElementById('about');
  console.log('found: ' + el.tagName);
</script>
```

دوس على كلمة «اسمك:» وشوف المؤشر بيروح للحقل لوحده: ده بسبب `for="user"` اللي بتشاور على `id="user"`.

### `class` — مجموعة تصنيفات للتنسيق
الـ `class` بيحط على العنصر **تصنيف** (أو أكتر) عشان تنسّق كل العناصر اللي ليها نفس التصنيف مرة واحدة. بعكس `id`، الـ `class` **ينفع يتكرر** على عناصر كتير، والعنصر الواحد ينفع ياخد كذا class بينهم **مسافة**.

- `class="card"` — تصنيف واحد.
- `class="card important"` — تصنيفين. العنصر بياخد تنسيق الاتنين.
- بيفرّق بين الحروف الكبيرة والصغيرة: `Card` غير `card`.
- في JavaScript بنتعامل معاه بـ `classList` (إضافة وحذف وتبديل).

```html live
<style>
  .card { border: 2px solid teal; padding: 8px; margin: 6px; }
  .important { background: #fff3bf; }
</style>
<p class="card">كارت عادي</p>
<p class="card important">كارت مهم (class اتنين)</p>
```

### `style` — تنسيق مباشر على العنصر
الـ `style` بتكتب فيه **قواعد CSS** مباشرة على العنصر الواحد: كل قاعدة بالشكل `الخاصية: القيمة;` والقواعد بينهم فاصلة منقوطة. التنسيق ده بيكسب غالباً على التنسيق اللي في الـ `<style>` أو ملف الـ CSS (لأن أولويته أعلى)، فهو مناسب للتعديل السريع أو للقيم اللي بتتحسب بالكود (زي عرض شريط تقدّم).

```html live
<p style="color: crimson; font-size: 20px;">أنا متنسّقة بالـ style</p>
<div style="width: 60%; height: 14px; background: teal;"></div>
```

لكن متستخدمهوش في كل حاجة: هيتعب لما تحب تغيّر الشكل في 50 مكان، ومش بيعمل Hover ولا استجابة لحجم الشاشة، وبعض المواقع بتمنعه بسياسة أمان (CSP). الأفضل تحط التنسيق في `class` وتكتب قواعده مرة واحدة.

### `title` — تلميح بيظهر مع الماوس
الـ `title` بيحط **معلومة إضافية** عن العنصر بتظهر في مربع صغير (Tooltip) لما المستخدم يوقف الماوس عليه. بيتحط كتير مع `<abbr>` لشرح الاختصار، ومع `<img>` و `<a>` و `<iframe>`.

```html live
<p>
  مرّر الماوس على <abbr title="HyperText Markup Language">HTML</abbr>
  أو على <span title="ده تلميح تاني">الكلمة دي</span>.
</p>
```

خلّي بالك: التلميح **مش بيظهر على شاشات اللمس** ولا بالكيبورد، وقارئات الشاشة بتتعامل معاه بشكل مش ثابت. فمتحطش فيه معلومة أساسية؛ اكتبها في الصفحة نفسها. ومتخلطش بينه وبين عنصر `<title>` اللي جوه الـ head وبيحدد عنوان التبويب.

## section: لغة واتجاه: lang و dir و translate

اللغة والاتجاه مهمين أوي لو بتكتب بالعربي: بيأثروا على النطق في قارئ الشاشة، وعلى اتجاه النص، وعلى الترجمة الآلية.

### `lang` — لغة المحتوى
الـ `lang` بيقول **إيه لغة** محتوى العنصر. القيمة كود لغة (BCP 47): `ar` للعربية، `en` للإنجليزي، `fr` للفرنساوي. وتقدر تحدد المنطقة: `ar-EG` (عربي مصر) و `en-US`. أهم مكان تحطه فيه هو `<html lang="ar">`، وبعد كده لو فيه جزء بلغة تانية لفّه في `<span lang="en">`.

- قارئ الشاشة بيختار **النطق** المناسب للغة.
- المتصفح بيختار **علامات الاقتباس** المناسبة لـ `<q>`، وبيعرف يقسّم الكلمات ويسأل «تترجم الصفحة؟».
- محركات البحث بتفهم لغة الصفحة، وCSS بيقدر يستهدف اللغة بـ `:lang(en)`.

```html live
<style>
  :lang(en) { font-family: Georgia, serif; color: #0a7a5a; }
</style>
<p><q lang="en">Hello</q> — إنجليزي</p>
<p><q lang="fr">Bonjour</q> — فرنساوي</p>
<p><q lang="de">Hallo</q> — ألماني</p>
<p>جملة عربي فيها كلمة <span lang="en">JavaScript</span> إنجليزي.</p>
```

### `dir` — اتجاه النص
الـ `dir` بيحدد **اتجاه الكتابة** (Direction) للعنصر:

- `rtl` — من اليمين لليسار (عربي، عبري).
- `ltr` — من اليسار لليمين (إنجليزي).
- `auto` — المتصفح يبص على **أول حرف له اتجاه واضح** في المحتوى ويقرر. مفيد لما المحتوى جاي من مستخدم ومش عارف بأي لغة هيكتب.

```html live
<style> p { border: 1px dashed gray; padding: 4px; } </style>
<p dir="rtl">ده سطر عربي بيمشي من اليمين: (123) تمام!</p>
<p dir="ltr">This line goes left to right. ده كلام عربي</p>
<p dir="auto">hello بيبدأ بحرف إنجليزي، فالاتجاه LTR</p>
<p dir="auto">مرحبا hello بيبدأ بحرف عربي، فالاتجاه RTL</p>
```

حط `dir="rtl"` على `<html>` للصفحة العربية كلها (مع `lang="ar"`). وتقدر تغيّر الاتجاه لجزء صغير بس. وفيه عناصر خاصة للاتجاه زي `<bdi>` و `<bdo>`.

### `translate` — تترجم ولا لأ
الـ `translate` بيقول لأدوات الترجمة الآلية (زي ترجمة المتصفح) إن العنصر ده **يتترجم** (`yes`) أو **يتساب زي ما هو** (`no`). بتحطه على أسماء المنتجات والأكواد وأي حاجة ترجمتها هتبوّظها.

```html live
<p>
  بنستخدم لغة <span id="js" translate="no">JavaScript</span>
  في الموقع.
</p>
<script>
  var span = document.getElementById('js');
  console.log('translate property = ' + span.translate);
</script>
```

الأثر مش ظاهر على الشاشة، بيبان بس لما تفعّل الترجمة. لاحظ إن بعض الأدوات (زي جوجل) لسه بتحترم كمان `class="notranslate"` من أيام قبل ما `translate` ينتشر.

## section: سلوك (1): الإخفاء والتركيز

المجموعة دي بتتحكم في **ظهور** العنصر وهل المستخدم يقدر **يتفاعل** معاه، وهل بيتركّز عليه بالكيبورد.

### `hidden` — إخفاء العنصر
الـ `hidden` خاصية **منطقية** (Boolean): وجودها بس يخفي العنصر من الصفحة (المتصفح بيطبّق عليه `display: none`)، ويخفيه كمان عن قارئات الشاشة. بتستخدمها للحاجات اللي مش المفروض تظهر دلوقتي (رسالة خطأ، قسم هيتفتح بزرار).

```html live
<p>فقرة ظاهرة.</p>
<p hidden>فقرة مخفية: مش هتشوفها!</p>
<button id="b" type="button">اظهر / اخفي الفقرة</button>
<p id="secret" hidden>سر مخفي بيظهر بالزرار.</p>
<script>
  var s = document.getElementById('secret');
  document.getElementById('b').addEventListener('click', function () {
    s.hidden = !s.hidden;
    console.log('hidden = ' + s.hidden);
  });
</script>
```

- **كتابة `hidden="false"` مش بتظهر العنصر:** الخاصية المنطقية بتشتغل بمجرد وجودها، حتى لو القيمة `false`. لو عايز تظهر العنصر **شيل الخاصية** (في JavaScript: `el.hidden = false`).
- لو كتبت في CSS `display: flex` أو `display: block` على نفس العنصر، التنسيق ده **بيغلب** `hidden` والعنصر هيظهر. خلّي بالك.
- فيه قيمة أحدث: `hidden="until-found"` بتخلّي العنصر مخفي لكن **ينفع يتلاقى بالبحث في الصفحة**، وينفتح لوحده لو لقاه. دعمها لسه بيتوسّع في المتصفحات، فاتأكد قبل ما تعتمد عليها.

### `inert` — عنصر موجود لكن مجمّد
الـ `inert` خاصية منطقية بتخلّي العنصر **وكل اللي جواه** مجمّد: مبيتضغطش ومبياخدش تركيز بالكيبورد ومبيتحددش نصه، وقارئ الشاشة بيتجاهله. الفرق عن `hidden` إن العنصر **بيفضل ظاهر**. وهي مفيدة وقت الإرسال أو لما يتفتح مربع حوار (وفي `<dialog>` المودال المتصفح بيعمل ده للباقي أوتوماتيك).

```html live
<div id="box" style="border: 2px solid teal; padding: 8px;">
  <button type="button" id="inner">زرار جوه الصندوق</button>
  <a href="#x">رابط</a>
  <input placeholder="اكتب هنا">
</div>
<p><button id="t" type="button">فعّل / عطّل inert</button></p>
<script>
  var box = document.getElementById('box');
  document.getElementById('inner').addEventListener('click', function () {
    console.log('الزرار اتضغط');
  });
  document.getElementById('t').addEventListener('click', function () {
    box.inert = !box.inert;
    box.style.opacity = box.inert ? '0.4' : '1';
  });
</script>
```

لاحظ إن `inert` **مبيغيّرش الشكل**: إحنا اللي خلّينا الصندوق باهت بالكود. جرّب تدوس Tab وإنت مفعّل `inert`: مفيش حاجة جوه الصندوق بتتركّز.

### `tabindex` — ترتيب التركيز بالكيبورد
المستخدم اللي بيستخدم الكيبورد بيتنقل بين العناصر بزرار `Tab`. العناصر التفاعلية (`<a href>` و `<button>` و `<input>`…) بتتركّز لوحدها. الـ `tabindex` بيخليك تتحكم في ده على أي عنصر:

- `tabindex="0"` — العنصر يدخل **في ترتيب الـ Tab الطبيعي**.
- `tabindex="-1"` — العنصر ينفع يتركّز عليه **بالكود** (`el.focus()`) أو بالضغط عليه، لكن مش بيتزار بالـ Tab.
- أرقام موجبة (`tabindex="3"`) — **تجنّبها**: بتعمل ترتيب مخصوص بيلخبط المستخدمين، وبتصعّب الصيانة.

```html live
<style>
  .box { display: inline-block; padding: 10px; margin: 4px;
         border: 2px solid gray; }
  .box:focus { outline: 3px solid orange; background: #fff3bf; }
</style>
<p>دوس جوه المعاينة وبعدين Tab عدة مرات:</p>
<div class="box" tabindex="0">tabindex=0</div>
<div class="box">من غير tabindex (بيتخطّاه)</div>
<div class="box" id="m" tabindex="-1">tabindex=-1</div>
<p><button id="go" type="button">ركّز على اللي -1 بالكود</button></p>
<script>
  document.getElementById('go').addEventListener('click', function () {
    document.getElementById('m').focus();
  });
</script>
```

### `accesskey` — اختصار كيبورد للعنصر
الـ `accesskey` بيحط **اختصار** يركّز على العنصر أو يفعّله. بتكتب حرف (`accesskey="s"`) والمستخدم بيدوس الحرف مع زراير تعديل بتختلف حسب المتصفح والنظام: عادةً `Alt` في Chrome على ويندوز، و `Alt + Shift` في Firefox، و `Control + Option` على الماك.

```html nolive
<button type="submit" accesskey="s">حفظ</button>
<a href="search.html" accesskey="f">بحث</a>
```

عملياً **قليل جداً بنستخدمه**: الاختصارات بتتعارض مع اختصارات المتصفح وقارئات الشاشة، والمستخدم ميعرفش إنها موجودة أصلاً. لو احتجت اختصارات للتطبيق بتاعك، الأفضل تعملها بـ JavaScript وتعرّفها للمستخدم.

### `autofocus` — ركّز تلقائي
الـ `autofocus` خاصية منطقية بتخلّي العنصر **ياخد التركيز أول ما الصفحة تفتح**. مناسبة مثلاً لحقل البحث في صفحة هدفها البحث، أو لزرار جوه مربع حوار.

```html nolive
<form action="/search">
  <input type="search" name="q" autofocus>
  <button type="submit">بحث</button>
</form>
```

- استخدمها مع **عنصر واحد بس** في الصفحة؛ لو كتبت أكتر من واحد، المتصفح بيركّز على أول واحد.
- على الموبايل بتفتح الكيبورد فوراً وده مزعج.
- لقارئ الشاشة بتنقله لنص الصفحة وبيفوّت اللي قبله. استخدمها بحذر.

## section: سلوك (2): التحرير والسحب

### `contenteditable` — نص قابل للتعديل
الـ `contenteditable` بيخلّي المستخدم **يكتب ويعدّل** جوه أي عنصر مباشرة في الصفحة، من غير `<input>` ولا `<textarea>`. دي أساس محررات النصوص على الويب.

- `contenteditable="true"` (أو بس `contenteditable`) — قابل للتعديل.
- `contenteditable="false"` — مش قابل (ينفع جوه أب قابل للتعديل).
- `contenteditable="plaintext-only"` — تعديل نص عادي بس، من غير تنسيق (زي Bold) أو لصق عناصر.

```html live
<p contenteditable="true"
   style="border: 2px dashed teal; padding: 8px;">
  اضغط هنا وعدّل النص مباشرة!
</p>
<p contenteditable="plaintext-only"
   style="border: 2px dashed orange; padding: 8px;">
  ده نص عادي بس.
</p>
```

التعديل بيتم في المتصفح بس ومبيتحفظش: لو عملت Refresh هيرجع زي ما كان. عشان تحفظه لازم تقراه بـ JavaScript وتبعته أو تخزّنه (شوف المثال بتاع عدّاد الحروف تحت).

### `draggable` — قابل للسحب
الـ `draggable` بيحدد هل العنصر ينفع **يتسحب بالماوس**. القيمة **مش منطقية**: لازم تكتب `true` أو `false` صريحة. الصور والروابط والنص المحدد بيتسحبوا لوحدهم (حالة `auto`). لكن السحب لوحده معملش حاجة: لازم تكتب كود يستقبل الأحداث (`dragstart` و `dragover` و `drop`).

```html live
<style>
  .item { display: inline-block; padding: 8px 14px; margin: 4px;
          background: #e8f5f0; border: 1px solid teal; cursor: grab; }
  #zone { min-height: 50px; border: 2px dashed gray; margin-top: 10px;
          padding: 8px; }
  #zone.over { background: #fff3bf; }
</style>
<span class="item" draggable="true" id="d1">اسحبني 1</span>
<span class="item" draggable="true" id="d2">اسحبني 2</span>
<div id="zone">سيب العنصر هنا</div>
<script>
  var zone = document.getElementById('zone');
  document.querySelectorAll('.item').forEach(function (it) {
    it.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', it.id);
    });
  });
  zone.addEventListener('dragover', function (e) {
    e.preventDefault();
    zone.classList.add('over');
  });
  zone.addEventListener('dragleave', function () {
    zone.classList.remove('over');
  });
  zone.addEventListener('drop', function (e) {
    e.preventDefault();
    zone.classList.remove('over');
    var id = e.dataTransfer.getData('text/plain');
    zone.appendChild(document.getElementById(id));
    console.log('dropped: ' + id);
  });
</script>
```

السحب والإفلات على شاشات اللمس دعمه أضعف، فلو التطبيق مهم للموبايل جرّب كويس.

### `spellcheck` — فحص الإملاء
الـ `spellcheck` بيشغّل أو يطفّي **فحص الإملاء** (الخط الأحمر المتعرّج تحت الكلمات الغلط). قيمه `true` و `false`. بيشتغل على النصوص القابلة للتعديل: `<textarea>` وحقول النص وأي عنصر `contenteditable`. بنطفّيه في حقول الأكواد وأسماء المستخدمين، وبنفعّله في الرسايل والمقالات.

```html live
<p>اكتب كلمة غلط زي helllo في الاتنين:</p>
<textarea spellcheck="true" rows="2" style="width: 90%;">wrold</textarea>
<textarea spellcheck="false" rows="2" style="width: 90%;">wrold</textarea>
```

الخط المتعرّج بيظهر (حسب المتصفح واللغة المثبّتة) لما تدوس جوه الحقل وتعدّل. لو مش ظاهر عندك مش مشكلة: السلوك الافتراضي بيختلف من متصفح لمتصفح.

## section: سلوك (3): لوحة المفاتيح على الموبايل

التلات خصائص دي بتأثر على **الكيبورد الافتراضي** (اللي بيطلع على شاشة الموبايل) مش على كيبورد اللاب توب. على الكمبيوتر مش هتشوف أي فرق.

### `inputmode` — شكل الكيبورد
الـ `inputmode` بيقول للموبايل **أي كيبورد يفتح**: `numeric` (أرقام) و `decimal` (أرقام مع فاصلة عشرية) و `tel` (كيبورد تليفون) و `email` و `url` و `search` و `text` (العادي) و `none` (من غير كيبورد). الميزة إنه **مبيغيّرش نوع الحقل ولا التحقق**، بس شكل الكيبورد. مفيد أوي لكود التفعيل أو الرقم القومي، حيث `type="number"` بيضيف أسهم زيادة ونقصان وبيعامل القيمة كرقم، وده مش مناسب لكود فيه أصفار في الأول.

### `autocapitalize` — الحروف الكبيرة التلقائية
الـ `autocapitalize` بيتحكم في تكبير الحروف الإنجليزي تلقائي على الكيبورد الافتراضي: `off` (أو `none`) و `sentences` (أول كل جملة) و `words` (أول كل كلمة) و `characters` (كل الحروف كبيرة). بتحط `off` على أسماء المستخدمين والإيميلات، و `words` على حقل الاسم الكامل.

### `enterkeyhint` — شكل زرار Enter
الـ `enterkeyhint` بيغيّر **اسم أو أيقونة زرار Enter** على الكيبورد الافتراضي: `enter` و `done` و `go` و `next` و `previous` و `search` و `send`. بتخلي المستخدم يفهم الضغطة هتعمل إيه: «بحث» في حقل البحث، «إرسال» في الشات، «التالي» في فورم من خطوات.

```html live
<p>افتح الصفحة دي على موبايل وشوف الكيبورد:</p>
<p><input inputmode="numeric" placeholder="كود التفعيل (أرقام)"></p>
<p><input inputmode="email" autocapitalize="off" placeholder="الإيميل"></p>
<p><input enterkeyhint="search" type="search" placeholder="ابحث..."></p>
<p><input enterkeyhint="send" autocapitalize="sentences"
          placeholder="اكتب رسالة..."></p>
```

## section: سلوك (4): النوافذ المنبثقة

### `popover` — عنصر منبثق من غير JavaScript
الـ `popover` بيحوّل أي عنصر لـ **نافذة منبثقة** (Popover): بتظهر **فوق كل الصفحة** (في طبقة اسمها top layer) من غير ما تحتاج z-index ولا JavaScript. بتتفتح وتتقفل بزرار بيشاور عليها بخاصية `popovertarget` (على `<button>` أو `<input>` زرار)، والمتصفح بيهتم بالـ Esc وبالإتاحة.

- `popover` أو `popover="auto"` — بتتقفل لما تدوس **برّاها** أو تدوس Esc، وبتقفل أي popover تاني مفتوح.
- `popover="manual"` — مبتتقفلش لوحدها؛ إنت اللي تقفلها بزرار أو بالكود.
- فيه قيمة أحدث `popover="hint"` للتلميحات، دعمها لسه محدود.
- الأزرار بتاخد `popovertargetaction`: `show` أو `hide` أو `toggle` (الافتراضي).
- بالكود: `el.showPopover()` و `el.hidePopover()` و `el.togglePopover()`.

```html live h=220
<style>
  #tip { padding: 14px; border: 2px solid teal; border-radius: 8px; }
</style>
<button type="button" popovertarget="tip">افتح الـ popover</button>
<div id="tip" popover>
  <p>أنا popover! دوس برّاي أو دوس Esc عشان أتقفل.</p>
</div>
```

الـ popover اتضاف للمتصفحات الرئيسية من فترة قريبة (2024)، فهو شغّال في النسخ الحديثة بس.

## section: بيانات وإتاحة: role و aria-* و data-*

### `role` — دور العنصر لقارئ الشاشة
الـ `role` بيقول لتقنيات المساعدة (زي قارئ الشاشة) **العنصر ده بيمثّل إيه**: `button` و `navigation` و `alert` و `status` و `dialog` و `tab`… أغلب العناصر ليها دور ضمني: `<button>` دوره `button` و `<nav>` دوره `navigation`، فمش محتاج تكتبه. القاعدة الذهبية: **لو في عنصر HTML جاهز بيعمل المطلوب، استخدمه** بدل `<div role="button">`.

```html live
<button id="save" type="button">احفظ</button>
<p id="msg" role="status"></p>
<script>
  document.getElementById('save').addEventListener('click', function () {
    document.getElementById('msg').textContent = 'تم الحفظ بنجاح';
  });
</script>
```

الفقرة `role="status"` بتخلّي قارئ الشاشة **ينطق الرسالة** أول ما تظهر من غير ما المستخدم يركّز عليها.

### `aria-*` — معلومات إضافية للإتاحة
عيلة `aria-*` (من ARIA: Accessible Rich Internet Applications) هي خصائص بتوصف للتقنيات المساعدة **حالة العنصر وعلاقته** بحاجات تانية. أشهرهم:

- `aria-label` — اسم مقروء للعنصر لما مفيش نص ظاهر (زرار أيقونة).
- `aria-labelledby` — نفس الفكرة، لكن بتشاور على `id` عنصر تاني نصه هو الاسم.
- `aria-describedby` — بتشاور على وصف إضافي (مثلاً رسالة خطأ تحت الحقل).
- `aria-expanded` — القايمة أو القسم مفتوح (`true`) ولا مقفول (`false`).
- `aria-current` — العنصر الحالي، زي `aria-current="page"` للصفحة اللي واقف فيها.
- `aria-hidden="true"` — اخفي العنصر عن قارئ الشاشة بس (لكنه يفضل ظاهر على الشاشة).
- `aria-live` — منطقة بيتغير نصها وقارئ الشاشة ينطق التغيير.

```html live
<button type="button" id="mb" aria-expanded="false" aria-controls="mn">
  القايمة
</button>
<ul id="mn" hidden>
  <li>الرئيسية</li>
  <li>الكورسات</li>
</ul>
<button type="button" aria-label="اقفل">X</button>
<script>
  var mb = document.getElementById('mb');
  var mn = document.getElementById('mn');
  mb.addEventListener('click', function () {
    mn.hidden = !mn.hidden;
    mb.setAttribute('aria-expanded', String(!mn.hidden));
  });
</script>
```

> [!warn] ARIA مش بيضيف سلوك، بيوصف بس. لو حطيت `role="button"` على `<div>` لازم إنت تعمله `tabindex="0"` وتكتب كود الضغط بـ Enter و Space. أسهل بكتير تستخدم `<button>`. وكمان متحطش `aria-hidden="true"` على عنصر المستخدم بيقدر يركّز عليه.

### `data-*` — بيانات مخصصة بأسمائك
عيلة `data-*` بتخليك **تخزّن أي معلومة** على العنصر بأي اسم تختاره بعد `data-`: `data-price` و `data-user-id` و `data-state`. الصفحة مبتعرضهاش، لكن JavaScript و CSS بيقدروا يقروها. ده بديل نضيف بدل ما تخترع خصائص من دماغك (اللي مش في المواصفة).

- الاسم لازم يبدأ بـ `data-` وبعده **حرف واحد على الأقل**، وبالحروف الصغيرة (المتصفح بيحوّل الاسم لصغير).
- في JavaScript بتقراها من `el.dataset`، وبتتحوّل الشرطة لحرف كبير: `data-user-id` يبقى `dataset.userId`.
- القيمة دايماً **نص** (String)، حتى لو كتبت رقم أو `false`.
- في CSS بتستخدمها كـ Selector: `[data-state="open"]`.

```html live
<style>
  li[data-in-stock="false"] { color: gray; text-decoration: line-through; }
</style>
<ul>
  <li data-id="101" data-price="50" data-in-stock="true">قلم</li>
  <li data-id="102" data-price="120" data-in-stock="false">كراسة</li>
</ul>
<script>
  document.querySelectorAll('li').forEach(function (li) {
    console.log(li.textContent + ': id=' + li.dataset.id +
      ', price=' + li.dataset.price +
      ', inStock=' + li.dataset.inStock);
  });
</script>
```

لاحظ إن `data-in-stock="false"` بتتقرا كنص `"false"`، ودا في JavaScript **معتبر true** لأنه نص مش فاضي! لازم تقارنه بالنص: `el.dataset.inStock === "true"`. ومتخزنش في `data-*` حاجات سرية؛ أي حد بيفتح DevTools بيشوفها.

## section: متقدم: خصائص للمحترفين

الخصائص دي هتقابلها لما تتعامل مع Web Components أو أمان المواقع أو تحسين البحث. ما تحفظهاش دلوقتي، بس اعرف إنها موجودة.

### `slot` — مكان الإدخال في Web Components
الـ `slot` بيحط العنصر جوه **فتحة مسمّاة** (`<slot name="...">`) في Shadow DOM لعنصر مخصص. يعني تكتب `<h2 slot="title">` والمكوّن هو اللي يقرر يحطه فين.

```html nolive
<my-card>
  <h2 slot="title">عنوان الكارت</h2>
  <p>المحتوى العادي.</p>
</my-card>
```

### `is` — توسيع عنصر موجود
الـ `is` بيعمل **عنصر مدمج مخصص** (Customized built-in): `<button is="fancy-button">` يعني زرار عادي لكن بسلوك من كودك. Safari مبيدعمهاش، فاستخدم عناصر مخصصة عادية بدلها لو محتاج دعم كامل.

### `nonce` — تصريح للسكريبتات
الـ `nonce` قيمة عشوائية بتتحط على `<script>` و `<style>` عشان تسمح بيهم سياسة أمان المحتوى (Content Security Policy) من غير ما تفتح الباب لأي سكريبت. السيرفر هو اللي بيولّد القيمة مع كل طلب.

### `part` و `exportparts` — تنسيق جوه Shadow DOM
الـ `part` بيسمّي عنصر جوه Shadow DOM عشان تنسقه من برا بـ `::part(الاسم)`. و `exportparts` بيعدّي الأجزاء دي لمستوى أعلى لما المكونات تتداخل.

### خصائص الأحداث (`onclick` وأخواتها)
أي عنصر بيقبل خصائص بتبدأ بـ `on` زي `onclick` و `oninput` و `onchange` و `onsubmit` و `onkeydown` و `onmouseover` و `onfocus` و `onblur`. قيمتها **كود JavaScript** بيشتغل لما الحدث يحصل.

```html live
<button type="button" onclick="this.textContent = 'اتضغطت!'">دوس عليا</button>
```

ده شغّال، لكن **الأفضل `addEventListener`** من الـ JavaScript لأسباب:

- بيفصل HTML عن الكود فتبقى الصفحة أنضف وأسهل في الصيانة.
- بتقدر تضيف أكتر من مستمع على نفس الحدث.
- سياسات الأمان (CSP) الصارمة **بتمنع** الخصائص دي.
- لو حطيت فيها بيانات جاية من مستخدم بيتفتح باب ثغرة XSS.

```html live
<button id="btn" type="button">دوس عليا</button>
<script>
  document.getElementById('btn').addEventListener('click', function (e) {
    e.target.textContent = 'اتضغطت!';
  });
</script>
```

### الـ Microdata — بيانات منظمة لمحركات البحث
خصائص `itemscope` و `itemtype` و `itemprop` و `itemid` و `itemref` بتعلّم أجزاء من الصفحة بمعنى منظم (كتاب، منتج، شخص) باستخدام مفردات موقع schema.org، عشان محركات البحث تفهم المحتوى. النظام ده لسه شغّال، لكن أغلب المواقع الجديدة بتفضّل صيغة JSON-LD.

```html nolive
<div itemscope itemtype="https://schema.org/Book">
  <span itemprop="name">تعلّم HTML</span>
  بقلم <span itemprop="author">أحمد</span>
</div>
```

### خصائص تجريبية أو محدودة الدعم
ممكن تقابل في الشغل خصائص جديدة زي `autocorrect` و `writingsuggestions` و `virtualkeyboardpolicy`. دعمها **بيختلف جداً** بين المتصفحات (بعضها في Chromium بس أو Safari بس)، فمتبنيش عليها وظيفة أساسية قبل ما تراجع جدول الدعم.

## section: مرجع سريع: كل الخصائص العامة في سطر

ورقة غش تراجع عليها بسرعة:

- `id` — اسم فريد، من غير مسافات.
- `class` — تصنيفات للتنسيق، بينها مسافة.
- `style` — CSS مباشر على العنصر.
- `title` — تلميح بالماوس.
- `lang` — لغة المحتوى (`ar`, `en`).
- `dir` — اتجاه النص (`rtl`, `ltr`, `auto`).
- `translate` — `yes` أو `no` للترجمة الآلية.
- `hidden` — منطقية: إخفاء (و `until-found`).
- `inert` — منطقية: تجميد العنصر وأولاده.
- `tabindex` — `0` أو `-1` (تجنّب الموجب).
- `accesskey` — اختصار كيبورد (نادر).
- `autofocus` — منطقية: تركيز تلقائي.
- `contenteditable` — `true` أو `false` أو `plaintext-only`.
- `draggable` — `true` أو `false` (مش منطقية).
- `spellcheck` — `true` أو `false`.
- `autocapitalize` — `off` و `sentences` و `words` و `characters`.
- `enterkeyhint` — اسم زرار Enter على الموبايل.
- `inputmode` — نوع الكيبورد على الموبايل.
- `popover` — `auto` و `manual`.
- `role` — الدور لقارئ الشاشة.
- `aria-*` — حالة ووصف للإتاحة.
- `data-*` — بياناتك الخاصة.
- `slot` و `part` و `exportparts` و `is` و `nonce` — للمتقدمين.
- `on*` — خصائص الأحداث.
- `itemscope` و `itemtype` و `itemprop` و `itemid` و `itemref` — Microdata.

## section: كل خاصية في صفحة مستقلة

لو عايز تغوص في خاصية معيّنة بأمثلة أكتر واختبار وأخطاء شائعة، كل خاصية ليها صفحة لوحدها في تصنيف «الخصائص العامة»:

- **هوية وتنسيق:** [[attr-id|id]] و[[attr-class|class]] و[[attr-style|style]] و[[attr-title|title]] و[[attr-data|data-*]].
- **لغة واتجاه:** [[attr-lang|lang]] و[[attr-dir|dir]] و[[attr-translate|translate]].
- **إخفاء وتركيز:** [[attr-hidden|hidden]] و[[attr-inert|inert]] و[[attr-tabindex|tabindex]] و[[attr-accesskey|accesskey]] و[[attr-autofocus|autofocus]].
- **تحرير وسحب:** [[attr-contenteditable|contenteditable]] و[[attr-draggable|draggable]] و[[attr-spellcheck|spellcheck]].
- **الموبايل:** [[attr-inputmode|inputmode]] و[[attr-enterkeyhint|enterkeyhint]] و[[attr-autocapitalize|autocapitalize]] و[[attr-autocorrect|autocorrect]] و[[attr-virtualkeyboardpolicy|virtualkeyboardpolicy]] و[[attr-writingsuggestions|writingsuggestions]].
- **نوافذ منبثقة:** [[attr-popover|popover]] و[[attr-anchor|anchor]].
- **إتاحة وأحداث:** [[attr-role|role]] و[[attr-aria|aria-*]] و[[attr-events|on*]].
- **Web Components:** [[attr-slot|slot]] و[[attr-part|part]] و[[attr-exportparts|exportparts]] و[[attr-is|is]] و[[attr-nonce|nonce]].
- **Microdata:** [[attr-itemscope|itemscope]] و[[attr-itemtype|itemtype]] و[[attr-itemprop|itemprop]] و[[attr-itemid|itemid]] و[[attr-itemref|itemref]].
- **تجريبية:** [[attr-headingoffset|headingoffset]] و[[attr-headingreset|headingreset]] و[[attr-containertiming|containertiming]] و[[attr-containertimingignore|containertimingignore]].

ولخصائص العناصر الشائعة (`href` و`src` و`required` وغيرهم) شوف تصنيف «خصائص العناصر الشائعة»، ولأنواع الحقول تصنيف «أنواع حقل input».

## examples

### 1) بطاقة تعريف: id و class و title و lang مع بعض
أول مثال بيجمع أكتر الخصائص استخداماً على عنصر واحد: الـ `<article>` ليه `id` و `class` و `lang`، والكلمة جواه ليها `title`، وكلمة إنجليزي ليها `lang` و `translate`. بعدها سكريبت صغير يقرا الخصائص دي ويطبعها.

```html
<style>
  .card { border: 2px solid teal; border-radius: 8px; padding: 10px;
          max-width: 260px; }
  .badge { background: gold; padding: 1px 8px; border-radius: 10px; }
</style>
<article id="student-1" class="card" lang="ar">
  <h3>أحمد علي</h3>
  <p>المستوى: <span class="badge" title="مستوى متقدم">متقدم</span></p>
  <p>بيحب <span lang="en" translate="no">JavaScript</span>.</p>
</article>
<script>
  var c = document.getElementById('student-1');
  console.log('class = ' + c.className);
  console.log('lang  = ' + c.lang);
</script>
```

- مرّر الماوس على كلمة «متقدم» وشوف التلميح (`title`).
- `id` فريد للكارت ده، و `class="card"` ممكن تكرره على كروت تانية.
- جرّب تضيف `class="card dark"` وتكتب `.dark` بتنسيق جديد.

### 2) قواعد الـ id: ليه نبدأ بحرف
الـ `id` اللي بيبدأ برقم مسموح في HTML الحديث، لكن بيعمل مشكلة في CSS و `querySelector`. المثال بيجرّب نفس الاسم بطريقتين، ويوريك إن `getElementById` بيلاقيه عادي لكن `querySelector` بيرمي خطأ.

```html
<div id="1st">id بيبدأ برقم</div>
<div id="first">id بيبدأ بحرف</div>
<script>
  console.log('getElementById: ' + !!document.getElementById('1st'));
  try {
    document.querySelector('#1st');
  } catch (e) {
    console.log('querySelector #1st: خطأ (' + e.name + ')');
  }
  console.log('querySelector #first: ' +
    !!document.querySelector('#first'));
</script>
```

- الرقم في الأول مش ممنوع من HTML، لكن الـ Selector `#1st` مش صالح في CSS.
- الحل السهل: ابدأ دايماً بحرف وكمّل بحروف وأرقام وشرطة.
- جرّب تغيّر `1st` لـ `first` في الأول وشوف الخطأ بيختفي.

### 3) أسئلة شائعة بـ hidden و data-* و aria-expanded
مثال عملي: كل زرار فيه `data-target` بيشاور على `id` الإجابة المخفية. لما تدوس، السكريبت بيبدّل `hidden` وبيحدّث `aria-expanded` عشان قارئ الشاشة يعرف الحالة.

```html
<style>
  .q { display: block; width: 100%; text-align: start; padding: 8px;
       margin-top: 6px; }
  .a { padding: 8px; background: #eef; margin: 0; }
</style>
<button class="q" type="button" aria-expanded="false" data-target="a1">
  إيه هو الـ HTML؟
</button>
<p class="a" id="a1" hidden>لغة بتوصف هيكل الصفحة ومحتواها.</p>
<button class="q" type="button" aria-expanded="false" data-target="a2">
  إيه هي الخصائص العامة؟
</button>
<p class="a" id="a2" hidden>خصائص بتتحط على أي عنصر.</p>
<script>
  document.querySelectorAll('.q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.dataset.target);
      panel.hidden = !panel.hidden;
      btn.setAttribute('aria-expanded', String(!panel.hidden));
    });
  });
</script>
```

- `btn.dataset.target` بتقرا قيمة `data-target` (النص `a1` أو `a2`).
- الإجابة بتظهر وتختفي بتبديل `hidden`.
- لو في الـ CSS كتبت `.a { display: block; }` هتلاحظ إن الإجابات ظهرت من الأول! لأن التنسيق بيغلب `hidden`.

### 4) فلتر بـ data-*: إظهار وإخفاء بالتصنيف
كل عنصر في القايمة ليه `data-cat`، وكل زرار ليه `data-filter`. السكريبت بيقارن الاتنين ويخفي اللي مش مطابق. الزرار النشط بيتعلّم بـ `aria-pressed` والـ CSS بيلوّنه من نفس الخاصية.

```html
<style>
  button[aria-pressed="true"] { background: teal; color: white; }
  li { margin: 4px 0; }
</style>
<p>
  <button type="button" data-filter="all" aria-pressed="true">الكل</button>
  <button type="button" data-filter="fruit" aria-pressed="false">فاكهة</button>
  <button type="button" data-filter="veg" aria-pressed="false">خضار</button>
</p>
<ul id="list">
  <li data-cat="fruit">تفاح</li>
  <li data-cat="veg">خيار</li>
  <li data-cat="fruit">موز</li>
  <li data-cat="veg">جزر</li>
</ul>
<script>
  var btns = document.querySelectorAll('[data-filter]');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter;
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      document.querySelectorAll('#list li').forEach(function (li) {
        li.hidden = f !== 'all' && li.dataset.cat !== f;
      });
    });
  });
</script>
```

- مفيش حاجة اتحفظت في متغيرات: كل المعلومات جوه الـ HTML نفسه في `data-*`.
- `[data-filter]` و `[aria-pressed="true"]` أمثلة على استخدام الخصائص كـ Selectors.
- جرّب تضيف تصنيف جديد: عنصر `data-cat="dairy"` وزرار `data-filter="dairy"` من غير ما تغيّر السكريبت.

### 5) رابط تخطّي المحتوى: tabindex في الواقع
مواقع كتير بتحط رابط مخفي بيظهر أول ما تدوس Tab، عشان مستخدم الكيبورد يتخطى القايمة ويروح للمحتوى. الـ `<main>` ليه `tabindex="-1"` عشان ياخد التركيز لما نروحله بالرابط.

```html h=260
<style>
  .skip { position: absolute; inset-inline-start: -9999px; }
  .skip:focus { position: static; display: inline-block;
                background: gold; padding: 6px; }
  nav a { margin-inline-end: 12px; }
  main:focus { outline: 3px solid orange; }
</style>
<a class="skip" href="#main">تخطّى للمحتوى</a>
<nav>
  <a href="#x">الرئيسية</a>
  <a href="#y">الكورسات</a>
  <a href="#z">اتصل بينا</a>
</nav>
<main id="main" tabindex="-1">
  <h2>المحتوى الرئيسي</h2>
  <p>دوس جوه المعاينة وبعدين Tab: أول حاجة هتظهر رابط التخطّي.</p>
</main>
```

- الرابط بيبقى برا الشاشة، وأول ما ياخد التركيز (`:focus`) بيظهر.
- `tabindex="-1"` على `<main>` معناها: ينفع نركّز عليه بالكود أو بالرابط، لكن مش بيزحم ترتيب الـ Tab.
- دوس Enter على رابط التخطّي وشوف الإطار البرتقالي حوالين `<main>`.

### 6) محرر ملاحظة بـ contenteditable
بنحوّل `<div>` عادي لمحرر بـ `contenteditable`. الحدث `input` بيتشغل مع كل حرف تكتبه، فبنحدّث عدّاد الحروف في `<output>`. وطفّينا `spellcheck` عشان مفيش خطوط حمراء.

```html
<style>
  #note { border: 2px dashed teal; padding: 10px; min-height: 60px; }
  #note:focus { outline: 3px solid orange; }
</style>
<p>اكتب ملاحظتك (جرّب تمسح الكلام وتكتب من جديد):</p>
<div id="note" contenteditable="true" spellcheck="false">
  ملاحظة قابلة للتعديل...
</div>
<p>عدد الحروف: <output id="count">0</output></p>
<script>
  var note = document.getElementById('note');
  var out = document.getElementById('count');
  function update() { out.textContent = note.textContent.trim().length; }
  note.addEventListener('input', update);
  update();
</script>
```

- `note.textContent` بيدّيك النص الحالي بعد تعديل المستخدم.
- العنصر نفسه بقى ياخد تركيز لأن `contenteditable` بيخليه قابل للتركيز تلقائي.
- لو عايز تحفظ الملاحظة لازم تبعتها لسيرفر أو تخزنها؛ التعديل لوحده بيضيع مع Refresh.

### 7) اللغة والاتجاه: قلب الاتجاه بالـ dir
صف فيه تلات خانات جوه `display: flex`. ترتيب الخانات بيتبع قيمة `dir`: في `rtl` الخانة 1 على اليمين، وفي `ltr` على الشمال. تحت الصف حقل بـ `dir="auto"` بيحدد اتجاهه من أول حرف تكتبه.

```html
<style>
  .row { display: flex; gap: 8px; }
  .row span { background: #e8f5f0; padding: 6px 14px;
              border: 1px solid teal; }
</style>
<div id="box" class="row" dir="rtl">
  <span>1</span><span>2</span><span>3</span>
</div>
<p>
  <button id="flip" type="button">بدّل الاتجاه</button>
  الاتجاه الحالي: <output id="cur">rtl</output>
</p>
<p>اكتب بالعربي ثم بالإنجليزي:</p>
<input dir="auto" placeholder="Name / الاسم" style="width: 90%;">
<script>
  var box = document.getElementById('box');
  document.getElementById('flip').addEventListener('click', function () {
    box.dir = box.dir === 'rtl' ? 'ltr' : 'rtl';
    document.getElementById('cur').textContent = box.dir;
  });
</script>
```

- `box.dir` هو نفس خاصية `dir` من JavaScript.
- ده السبب إن موقع عربي صح لازم يتكتب بـ `dir="rtl"`: كل الترتيب بيتقلب تلقائي من غير ما تعدّل في كل عنصر.
- اكتب أول حرف في الحقل بالإنجليزي وشوف النص بيتجه لليسار، وأول حرف عربي وشوفه بيتجه لليمين.

### 8) إرسال فورم مع inert
وقت إرسال الفورم بنعطّله عشان المستخدم ميدوسش مرتين. بدل ما نعمل `disabled` لكل حقل، بنحط `inert` على الفورم كله مرة واحدة. الـ `<p>` اللي بـ `role="status"` بتنطق الحالة لقارئ الشاشة.

```html
<style>
  form[inert] { opacity: 0.5; }
</style>
<form id="f">
  <label>الاسم: <input type="text" required></label>
  <button type="submit">أرسل</button>
</form>
<p id="s" role="status"></p>
<script>
  var f = document.getElementById('f');
  var s = document.getElementById('s');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    f.inert = true;
    s.textContent = 'جاري الإرسال...';
    setTimeout(function () {
      f.inert = false;
      s.textContent = 'تم الإرسال';
    }, 1500);
  });
</script>
```

- اكتب اسم ودوس «أرسل»: الفورم بيبهت وكله بيتجمّد لثانية ونص.
- `form[inert]` سلكتور CSS بيلوّن الفورم لما الخاصية موجودة.
- جرّب تسيب الحقل فاضي: رسالة التحقق بتظهر قبل ما الفورم يتجمّد، لأن `required` بيشتغل قبل حدث `submit`.

### 9) popover: قايمة وإشعار من غير مكتبات
أول نافذة منبثقة بتتفتح بزرار فيه `popovertarget` وبتتقفل بزرار تاني فيه `popovertargetaction="hide"`. والتانية `popover="manual"` بنتحكم فيها بالكود: بتظهر عند حفظ وتختفي لوحدها بعد ثانية ونص.

```html h=260
<style>
  #menu { padding: 12px; border: 2px solid teal; border-radius: 8px; }
  #menu a { display: block; margin: 4px 0; }
  #toast { padding: 10px 16px; background: #d8f3dc; border: 0;
           border-radius: 8px; }
</style>
<button type="button" popovertarget="menu">القايمة</button>
<nav id="menu" popover>
  <a href="#home">الرئيسية</a>
  <a href="#courses">الكورسات</a>
  <button type="button" popovertarget="menu"
          popovertargetaction="hide">اقفل</button>
</nav>
<button type="button" id="save">احفظ</button>
<div id="toast" popover="manual" role="status">تم الحفظ</div>
<script>
  var t = document.getElementById('toast');
  document.getElementById('save').addEventListener('click', function () {
    if (!t.matches(':popover-open')) t.showPopover();
    setTimeout(function () {
      if (t.matches(':popover-open')) t.hidePopover();
    }, 1500);
  });
</script>
```

- القايمة `popover` عادية: بتتقفل بضغطة بره أو Esc.
- الإشعار `popover="manual"` مبيتقفلش لوحده: إحنا قفلناه بـ `hidePopover()`.
- `:popover-open` Selector بيسأل: هل الـ popover مفتوح دلوقتي؟

### 10) فاحص الخصائص: كل خاصية ليها property
كل خاصية عامة تقريباً ليها **اسم مقابل في JavaScript**. المثال بيعمل عنصر بخصائص كتير وبيطبعها بالأسماء الجديدة. لاحظ الفروق: `class` بقت `className`، و `tabindex` بقت `tabIndex`، و `data-level` بقت `dataset.level`.

```html
<p id="demo" class="note big" title="مثال" lang="ar" dir="rtl"
   tabindex="0" draggable="true" spellcheck="false" translate="no"
   data-level="3">فقرة بخصائص كتير</p>
<script>
  var p = document.getElementById('demo');
  console.log('attributes: ' + p.getAttributeNames().join(', '));
  console.log('className: ' + p.className);
  console.log('classList: ' + p.classList.length + ' classes');
  console.log('hidden: ' + p.hidden);
  console.log('tabIndex: ' + p.tabIndex);
  console.log('draggable: ' + p.draggable);
  console.log('spellcheck: ' + p.spellcheck);
  console.log('translate: ' + p.translate);
  console.log('dataset.level: ' + p.dataset.level);
</script>
```

- `getAttributeNames()` بترجّع أسماء كل الخصائص المكتوبة على العنصر.
- الخصائص المنطقية بتتحوّل لـ `true`/`false` في الـ property.
- `data-level` اتقرت `"3"` كنص، مش رقم.

## mistakes

### تكرار نفس الـ id
```html bad
<button id="save">حفظ المقال</button>
<button id="save">حفظ الصورة</button>
```
```html good
<button id="save-article">حفظ المقال</button>
<button id="save-photo">حفظ الصورة</button>
```
ليه ده غلط؟ لأن الـ `id` لازم يكون **فريد** في الصفحة. لو اتكرر، `getElementById` و `href="#save"` هيلاقوا **أول واحد بس** والتاني هيتجاهله. لو عايز تنسّق أو تختار مجموعة عناصر استخدم `class` بدل `id`.

### id فيه مسافة أو بيبدأ برقم
```html bad
<section id="main menu">...</section>
<section id="2nd-part">...</section>
```
```html good
<section id="main-menu">...</section>
<section id="part-2">...</section>
```
المسافة ممنوعة في الـ `id` لأنها بتخليه يتحسب كذا كلمة. والرقم في الأول مسموح تقنياً في HTML الحديث، لكن `#2nd-part` مش Selector صالح في CSS ولا في `querySelector` من غير ما تعمل له escape. فالأسهل تبدأ بحرف وتفصل بشرطة.

### كتابة class مرتين
```html bad
<p class="card" class="important">فقرة</p>
```
```html good
<p class="card important">فقرة</p>
```
لو كتبت نفس الخاصية مرتين على العنصر، المتصفح بياخد **الأولى بس** ويتجاهل التانية. الـ class الواحد بيستحمل كذا قيمة بمسافة بينهم، مش فواصل ولا خاصية جديدة.

### استخدام style لكل حاجة
```html bad
<p style="color: teal; font-size: 18px; margin: 8px;">فقرة 1</p>
<p style="color: teal; font-size: 18px; margin: 8px;">فقرة 2</p>
<p style="color: teal; font-size: 18px; margin: 8px;">فقرة 3</p>
```
```html good
<style>
  .note { color: teal; font-size: 18px; margin: 8px; }
</style>
<p class="note">فقرة 1</p>
<p class="note">فقرة 2</p>
<p class="note">فقرة 3</p>
```
لو عايز تغيّر اللون بعد كده هتغيّره في **تلات أماكن** بدل واحد. وبالتنسيق المباشر مفيش Hover ولا استجابة لحجم الشاشة، وكمان بيصعّب الصيانة. خلّي `style` للقيم اللي بتتغير بالكود، وخلّي الباقي في `class`.

### hidden="false" وهمّا فاكرين إنه يظهر العنصر
```html bad
<p hidden="false">المفروض تظهر؟ لأ، هي مخفية!</p>
```
```html good
<p>دي فقرة ظاهرة (شلنا الخاصية).</p>
```
`hidden` خاصية **منطقية** (Boolean): وجودها هو اللي بيفعّلها مهما كانت القيمة (`true` أو `false` أو أي حاجة). عشان تظهر العنصر شيل الخاصية نفسها، أو من JavaScript اكتب `el.hidden = false`. نفس الكلام على `inert` و `autofocus`.

### tabindex بقيمة موجبة
```html bad
<a href="#a" tabindex="3">رابط 1</a>
<a href="#b" tabindex="1">رابط 2</a>
<a href="#c" tabindex="2">رابط 3</a>
```
```html good
<a href="#a">رابط 1</a>
<a href="#b">رابط 2</a>
<a href="#c">رابط 3</a>
```
الأرقام الموجبة بتعمل ترتيب تاني غير ترتيب الصفحة، فالمستخدم بيتنقل بشكل مش متوقع ولازم تفضل تحدّث الأرقام لما تضيف عنصر. الروابط أصلاً بتتركّز لوحدها بترتيب ظهورها. استخدم `0` و `-1` بس، وخلّي الترتيب يجي من ترتيب الـ HTML نفسه.

### الاعتماد على title وحده
```html bad
<button type="button" title="حذف الملف">X</button>
```
```html good
<button type="button" aria-label="حذف الملف" title="حذف الملف">
  X
</button>
```
الـ `title` مبيظهرش على الموبايل ولا للي بيستخدم الكيبورد، وقارئات الشاشة مش بتعتمد عليه ثابت. لو الزرار أيقونة بس، اديله اسم بـ `aria-label` (أو نص مخفي بصرياً)، وخلّي `title` تلميح إضافي لو حبيت.

### استخدام disabled على عنصر مش عنصر فورم
```html bad
<div disabled>أنا مجمّد... ولا لأ؟</div>
```
```html good
<div inert>أنا مجمّد فعلاً</div>
```
`disabled` **مش خاصية عامة**: بتشتغل على `<button>` و `<input>` و `<select>` و `<textarea>` وبعض عناصر الفورم بس. على `<div>` المتصفح هيتجاهلها. لتجميد عنصر عادي استخدم `inert`.

### أسماء data-* بحروف كبيرة
```html bad
<li data-userId="7">أحمد</li>
<!-- el.dataset.userId  => undefined -->
```
```html good
<li data-user-id="7">أحمد</li>
<!-- el.dataset.userId  => "7" -->
```
المتصفح بيحوّل أسماء الخصائص في HTML لحروف صغيرة، فـ `data-userId` بتبقى `data-userid`، وفي JavaScript بتتقرا `dataset.userid` مش `userId`. اكتب الاسم بحروف صغيرة وافصل الكلمات بشرطة، وهو هيتحوّل لـ camelCase في `dataset`.

## tips

- **ابدأ بـ `lang` و `dir` على `<html>`:** `<html lang="ar" dir="rtl">` أول سطر تكتبه في أي صفحة عربية؛ بيفيد قارئ الشاشة والترجمة ومحركات البحث والمتصفح.
- **`id` للأسماء الفريدة و `class` للتصنيفات:** لو لقيت نفسك محتاج تكرر `id`، غالباً المطلوب هو `class`.
- **استخدم `data-*` بدل ما تخترع خصائص:** أي اسم من عندك زي `price="50"` مش في المواصفة وممكن يتعارض مع خاصية رسمية في المستقبل.
- **اعمل اختبار بالكيبورد:** ادخل صفحتك واستخدم `Tab` و `Enter` و `Esc` بس. لو ما قدرتش تعمل حاجة، غالباً محتاج `tabindex` أو عنصر تفاعلي صح.
- **العنصر الجاهز أحسن من ARIA:** `<button>` و `<nav>` و `<dialog>` بيجيبوا الدور والتركيز والكيبورد مجاناً.
- **اتأكد من الدعم لأي حاجة جديدة:** `popover` و `hidden="until-found"` و `inert` و `plaintext-only` اتوسّع دعمهم في السنين الأخيرة، لكن راجع جدول الدعم لو لازم تدعم متصفحات قديمة.
- **افتح DevTools:** لوحة Elements بتورّيك كل خصائص العنصر، وبتخليك تضيف وتعدّل وتشيل خاصية تجرّب أثرها فوراً.
- **متحطش `on*` في كل حتة:** ابدأ بـ `addEventListener`؛ ده الأسلوب اللي بيشتغل مع أي سياسة أمان ومع الصيانة.

## quiz

### أي خاصية من دول **عامة** ينفع تتحط على أي عنصر؟
- [ ] `href`
- [x] `class`
- [ ] `src`
- [ ] `disabled`

الـ `class` خاصية عامة بتتحط على أي عنصر. أما `href` فخاصة بـ `<a>` وأخواتها، و `src` بالصور والسكربتات، و `disabled` بعناصر الفورم.

### إيه اللي بيحصل للفقرة `<p hidden="false">`؟
- [ ] بتظهر عادي لأن القيمة `false`
- [x] بتفضل مخفية لأن وجود الخاصية هو اللي بيفعّلها
- [ ] المتصفح بيطلّع خطأ
- [ ] بتظهر بس على الموبايل

`hidden` خاصية منطقية؛ مجرد وجودها بيخفي العنصر مهما كانت قيمتها. عشان تظهره شيل الخاصية.

### عايز `<div>` عادي ياخد التركيز بزرار Tab بالترتيب الطبيعي. تكتب إيه؟
- [ ] `tabindex="-1"`
- [ ] `tabindex="99"`
- [x] `tabindex="0"`
- [ ] `focusable="true"`

القيمة `0` بتدخل العنصر في ترتيب الـ Tab الطبيعي. أما `-1` فبتخليه ياخد التركيز بالكود بس، والأرقام الموجبة بتلخبط الترتيب، و `focusable` مش خاصية في HTML.

### إزاي تقرا قيمة `data-user-id="7"` من JavaScript؟
- [ ] `el.data-user-id`
- [ ] `el.dataset.user-id`
- [x] `el.dataset.userId`
- [ ] `el.userId`

الـ `dataset` بيحوّل الشرطة وحرف بعدها لحرف كبير (camelCase)، فـ `data-user-id` بتبقى `dataset.userId`، والقيمة نص `"7"`.

### إيه الفرق بين `hidden` و `inert`؟
- [ ] مفيش فرق
- [ ] `inert` بيخفي العنصر و `hidden` بيجمّده
- [x] `hidden` بيخفي العنصر، و `inert` بيسيبه ظاهر لكن مجمّد (مبيتضغطش ولا بيتركّز)
- [ ] الاتنين بيخفوا العنصر لكن عن قارئ الشاشة بس

`hidden` بيشيل العنصر من الشاشة. أما `inert` فالعنصر بيفضل ظاهر لكن مبيقبلش ضغط ولا تركيز وبيتخفى عن التقنيات المساعدة.

### إيه الأفضل بدل `onclick="..."` المكتوبة في الـ HTML؟
- [ ] نكتب كل الكود في خاصية `style`
- [x] `addEventListener` من كود JavaScript منفصل
- [ ] نكرر الخاصية كذا مرة على نفس العنصر
- [ ] مفيش بديل

`addEventListener` بيفصل الكود عن الـ HTML، وبيسمح بكذا مستمع، وبيشتغل مع سياسات الأمان اللي بتمنع الخصائص المضمّنة.

### إيه المشكلة في `<p class="a" class="b">`؟
- [ ] مفيش مشكلة، العنصر بياخد الاتنين
- [x] المتصفح بياخد أول `class` بس ويتجاهل التاني؛ المفروض `class="a b"`
- [ ] المتصفح بيطلّع خطأ ويوقف الصفحة
- [ ] المتصفح بياخد التاني ويتجاهل الأول

لو الخاصية اتكررت، الأولى بتكسب والتانية بتتجاهل. للجمع بين تصنيفين اكتبهم في قيمة واحدة بمسافة.

### `dir="auto"` بيعمل إيه؟
- [ ] بيقلب الاتجاه كل ثانية
- [ ] بيجبر الاتجاه يبقى `rtl` دايماً
- [x] المتصفح بيحدد الاتجاه من أول حرف له اتجاه واضح في المحتوى
- [ ] بيطفّي الاتجاه خالص

الـ `auto` مناسب للمحتوى اللي جاي من مستخدمين وإنت مش عارف هيكتبوا بإيه: لو أول حرف عربي بيبقى `rtl`، ولو إنجليزي بيبقى `ltr`.

## refs

- [MDN: Global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes)
- [MDN: popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
- [MDN: data-*](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/data-*)
- [WHATWG: Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
