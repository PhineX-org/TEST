---
id: iframe
kind: element
cat: embedded
tag: iframe
title: عنصر الإطار المضمّن
en: HTML inline frame element
status: stable
display: inline
void: no
support: all
summary: بيحط صفحة ويب كاملة جوه صفحتك في إطار مستقل، زي يوتيوب وخرايط جوجل. بياخد المصدر في src أو كود جاهز في srcdoc، ويتأمّن بـ sandbox وallow وtitle.
keywords: iframe, إطار, تضمين, embed, youtube, map, srcdoc, sandbox, allow, allowfullscreen, loading, lazy, title, postMessage, frame, يوتيوب, خريطة
related: embed, object, video, fencedframe, frame, script
---

## intro

تخيّل إنك عايز تحط **فيديو يوتيوب** أو **خريطة جوجل** أو **نموذج دفع** أو **صفحة تانية كاملة** جوه صفحتك. مينفعش تنسخ كودها (ده شغل غيرك وبيتغير)، فبتعمل **نافذة صغيرة** جوه صفحتك بتفتح فيها الصفحة التانية. النافذة دي هي `<iframe>` (اختصار **Inline Frame**: إطار داخل السطر).

الـ `<iframe>` بيعمل **سياق تصفح مستقل (Browsing Context)**: يعني جواه صفحة ليها `document` و`window` و CSS وجافاسكربت **خاصين بيها**. الستايل بتاعك مبيدخلش جواه، والستايل بتاعه مبيطلعش برّه. وده ميزة (عزل) وفي نفس الوقت مشكلة (مبتقدرش تتحكم في اللي جواه بسهولة لو من موقع تاني، بسبب سياسة **Same-Origin**).

الخاصية الأساسية: **`src`** لعنوان الصفحة. أو **`srcdoc`** لو عايز تكتب الـ HTML نفسه جوه الخاصية (مفيد جداً للتجارب ولعرض أكواد). ولازم دايماً **`title`** يوصف محتوى الإطار (إجباري للإتاحة)، وتحدد **`width`** و**`height`**.

الأمان هنا نقطة حرجة: صفحة غريبة جوه موقعك ممكن تعمل مشاكل (تحويل، نوافذ منبثقة، سرقة). عشان كده فيه **`sandbox`** بيقفل كل الصلاحيات ونفتح اللي محتاجينه واحدة واحدة. و**`allow`** بيتحكم في ميزات المتصفح (كاميرا، ملء شاشة...). و**`loading="lazy"`** يأجّل تحميل الإطار لحد ما تقرّب منه (يوتيوب تقيل).

> [!analogy] `<iframe>` زي **شباك في الحيطة** بيطلّ على بيت تاني. تشوف اللي جواه، لكن مش بتمسك حاجاته. و`sandbox` زي إنك تحط **زجاج مقفول** ما يخليش حد يعدّي من الشباك.

> [!key] `<iframe src title>` دايماً. لمحتوى غريب استخدم `sandbox`. `srcdoc` للـ HTML المكتوب جوه الخاصية. `loading="lazy"` للإطارات الثقيلة.

## try

غيّر الـ HTML اللي في `srcdoc`.

```html h=160
<iframe
  title="مثال إطار"
  width="100%" height="120"
  style="border:1px solid #888; border-radius:8px"
  srcdoc="<h3 style='font-family:sans-serif'>أنا صفحة جوه صفحة 👋</h3><p style='font-family:sans-serif'>الستايل بتاعي مستقل.</p>">
</iframe>
```

## syntax

```html nolive
<iframe
  src="https://example.com"
  title="وصف المحتوى"
  width="600" height="400"
  loading="lazy"
  sandbox="allow-scripts"
  allow="fullscreen"></iframe>
```

- `<iframe ...>` — **الوسم الافتتاحي**.
- `src` — **عنوان الصفحة** اللي هتتعرض.
- `title` — **وصف الإطار** (إجباري للإتاحة).
- `width` و`height` — **مقاس الإطار**.
- `loading="lazy"` — **تحميل كسول**.
- `sandbox` — **عزل أمني** (اختياري لكنه مهم).
- `</iframe>` — **الوسم الختامي** إجباري، حتى لو فاضي.

## use

- لتضمين فيديو يوتيوب أو Vimeo.
- لتضمين خرايط جوجل.
- لتضمين خدمات خارجية: دفع، تعليقات، ويدجت.
- لعرض معاينة كود حي (زي الموقع ده بالظبط).
- لتشغيل محتوى غير موثوق في صندوق معزول (`sandbox`).

## avoid

- متضمّنش أي موقع من غير إذنه: كتير بيمنع ده بـ `X-Frame-Options`.
- متستخدمهوش لتقسيم صفحتك لأجزاء: ده كان زمان بـ `<frame>` وهو قديم.
- متنساش `title`.
- متضمّنش محتوى غير موثوق من غير `sandbox`.
- متحطش أكتر من إطار تقيل من غير `loading="lazy"`.

## attributes

### src
**عنوان الصفحة** اللي هتتعرض. بعض المواقع بتمنع تضمينها (`X-Frame-Options` أو `frame-ancestors`)، فيظهر الإطار فاضي أو بخطأ.

```html nolive
<iframe src="https://www.example.com" title="مثال"></iframe>
```

### srcdoc
**كود HTML مكتوب جوه الخاصية** بدل ملف. بيتفوق على `src` لو الاتنين موجودين. لازم تهرّب علامات الاقتباس (`&quot;`) أو تستخدم اقتباس مختلف.

### title {required}
**وصف محتوى الإطار.** قارئ الشاشة بيعلنه، فاكتب «خريطة موقع الشركة» مش «iframe».

### width
**عرض الإطار** بالبكسل (الافتراضي 300).

### height
**ارتفاع الإطار** بالبكسل (الافتراضي 150).

### name
**اسم الإطار**، بيستخدمه `target` في الروابط عشان تفتح الرابط جواه.

```html nolive
<a href="page.html" target="frame1">افتح في الإطار</a>
<iframe name="frame1" title="عرض"></iframe>
```

### sandbox
**بيقفل كل الصلاحيات** على محتوى الإطار (سكريبتات، فورمز، نوافذ منبثقة...) ويفتح اللي تحدده بقيم زي `allow-scripts` و`allow-forms` و`allow-same-origin` و`allow-popups`. فاضي = أقصى عزل.

```html nolive
<iframe src="untrusted.html" title="محتوى" sandbox="allow-scripts"></iframe>
```

### allow
**سياسة الصلاحيات** (Permissions Policy): بتحدد الميزات المسموحة للإطار زي `fullscreen` و`camera` و`microphone` و`geolocation` و`autoplay`.

### allowfullscreen {boolean}
**بيسمح للإطار بملء الشاشة.** (النسخة القديمة من `allow="fullscreen"`).

### loading
**أسلوب التحميل**: `eager` (فوراً) أو `lazy` (لما تقرّب).

### referrerpolicy
**بيتحكم في معلومات المصدر** المبعوتة مع الطلب، مثلاً `no-referrer`.

### csp {experimental}
**سياسة أمان محتوى مفروضة** على الإطار (تجريبية، دعم محدود).

### credentialless {experimental}
**بيحمّل الإطار من غير بيانات اعتماد** (كوكيز) لعزل أعلى (تجريبية).

### frameborder {deprecated}
كانت بتتحكم في حدود الإطار. **قديمة**: استخدم `border` في CSS.

### scrolling {deprecated}
كانت بتتحكم في شريط التمرير. **قديمة**: استخدم `overflow` في CSS (على المحتوى).

### marginwidth {deprecated}
كانت بتحدد هامش الإطار الأفقي. **قديمة**: استخدم CSS على الصفحة اللي جواه.

## examples

### 1) إطار بـ srcdoc
HTML مباشر.

```html h=170
<iframe title="صفحة مصغّرة" width="100%" height="130"
  style="border:2px solid #0ea5e9; border-radius:10px"
  srcdoc="<body style='font-family:sans-serif; background:#f0f9ff; margin:0; padding:12px'><h3>أهلاً</h3><p>دي صفحة كاملة جوه إطار.</p></body>"></iframe>
```

- `srcdoc` بيحط الـ HTML مباشرة من غير ملف.
- الإطار صفحة مستقلة: ليها `body` و`background` خاصين بيها.
- `title` بيوصف الإطار لقارئ الشاشة.
- ده الأسلوب اللي بتستخدمه معاينة الكود في الموقع ده.

### 2) عزل مع sandbox
منع السكريبتات.

```html h=190
<iframe title="مثال sandbox" width="100%" height="150" sandbox
  srcdoc="<p id='p'>السكريبت اتمنع</p><script>document.getElementById('p').textContent='السكريبت اشتغل!'<\/script>"></iframe>
<p style="font:13px sans-serif">بما إن <code>sandbox</code> فاضي، النص فضل «السكريبت اتمنع».</p>
```

- `sandbox` من غير قيم بيمنع كل حاجة، ومنها تنفيذ الجافاسكربت.
- جرّب تكتب `sandbox="allow-scripts"` وشوف النص يتغيّر.
- ده الأمان: تقدر تعرض محتوى غير موثوق من غير ما يأذيك.
- لازم نكتب `<\/script>` بالشكل ده جوه الخاصية عشان ما يقفلش الـ script اللي برّه بالغلط.

### 3) فتح رابط داخل إطار
`name` و`target`.

```html h=180
<p style="font:14px sans-serif">
  <a href="data:text/html,<h2 style='font-family:sans-serif'>الصفحة 1</h2>" target="viewer">صفحة 1</a> |
  <a href="data:text/html,<h2 style='font-family:sans-serif'>الصفحة 2</h2>" target="viewer">صفحة 2</a>
</p>
<iframe name="viewer" title="عارض الصفحات" width="100%" height="90" style="border:1px solid #999"></iframe>
```

- الإطار له `name="viewer"`.
- الروابط ليها `target="viewer"` فبتفتح جواه بدل ما تنقل الصفحة كلها.
- ده أسلوب قديم لعمل «عارض» مع قايمة، وبيفيد في الأمثلة البسيطة.
- بعض المتصفحات بتمنع التنقل لـ `data:` URLs لأسباب أمنية، فلو مظهرتش الصفحة جرّب في ملف على سيرفر.

### 4) تواصل بين الصفحة والإطار
`postMessage`.

```html h=190
<iframe id="f" title="إطار بيرد" width="100%" height="70" style="border:1px solid #999"
  srcdoc="<p id='o' style='font-family:sans-serif'>مستني رسالة…</p><script>addEventListener('message',e=>{document.getElementById('o').textContent='وصلتني: '+e.data;e.source.postMessage('تمام من الإطار','*')})<\/script>"></iframe>
<button onclick="document.getElementById('f').contentWindow.postMessage('أهلاً يا إطار','*')">ابعت رسالة</button>
<span id="r"></span>
<script>
  addEventListener('message', e => { if (e.data === 'تمام من الإطار') document.getElementById('r').textContent = ' ← الرد: ' + e.data; });
</script>
```

- الصفحة بتبعت رسالة للإطار بـ `postMessage`.
- الإطار بيستقبلها بالحدث `message` وبيرد على المرسل.
- ده الأسلوب الآمن للتواصل بين صفحتين من أصلين مختلفين.
- في الشغل الحقيقي لازم تتأكد من `e.origin` وتحدد `targetOrigin` بدل `'*'`.

### 5) تضمين فيديو يوتيوب
الشكل الشائع.

```html nolive
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="شرح الدرس الأول"
  loading="lazy"
  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
  allowfullscreen></iframe>
```

- ده الكود اللي يوتيوب بيدّيهولك في «Share → Embed».
- `title` بيوصف الفيديو، وغيّره لاسم حقيقي.
- `loading="lazy"` مهم لأن يوتيوب تقيل ولو في الآخر مش لازم يتحمّل بدري.
- `allowfullscreen` بيسمح بزرار ملء الشاشة.

### 6) إطار متجاوب
بنسبة ثابتة.

```html h=200
<style>
  .frame { position: relative; width: 100%; aspect-ratio: 16 / 9; }
  .frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; border-radius: 10px; }
</style>
<div class="frame">
  <iframe title="إطار متجاوب"
    srcdoc="<body style='margin:0;display:grid;place-items:center;height:100vh;background:#1e293b;color:#fff;font-family:sans-serif'><h2>16:9</h2></body>"></iframe>
</div>
```

- `aspect-ratio` بيحافظ على نسبة 16:9 مهما كان العرض.
- الإطار بياخد كل الحاوية بـ `position: absolute` و`inset: 0`.
- من غير الحيلة دي الإطار بيبقى عرض ثابت ومش بيتجاوب مع الموبايل.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **مفيش محتوى مرئي** (النص جواه تجاهله المتصفحات الحديثة).
- closing: الوسم الختامي `</iframe>` إجباري.
- role: `generic` (ومع `title` بيتعلن).
- dom: `HTMLIFrameElement`.
- layout: `display: inline`، Replaced Element بمقاس 300×150 افتراضياً.

## mistakes

### نسيان title
```html bad
<iframe src="https://maps.example.com/embed"></iframe>
```
```html good
<iframe src="https://maps.example.com/embed" title="خريطة موقع الشركة"></iframe>
```
ليه؟ قارئ الشاشة مش هيعرف الإطار ده فيه إيه، وبيتنقل فيه من غير سياق.

### تضمين موقع بيمنع التضمين
```html bad
<iframe src="https://github.com" title="جيت هاب"></iframe>
```
```html good
<a href="https://github.com">افتح جيت هاب</a>
```
ليه؟ مواقع كتير بتبعت `X-Frame-Options: DENY` أو `frame-ancestors` فالإطار بيطلع فاضي. لو الموقع مش بيسمح، اعمل رابط.

### محتوى غريب من غير sandbox
```html bad
<iframe src="https://unknown-site.example/widget" title="ويدجت"></iframe>
```
```html good
<iframe src="https://unknown-site.example/widget" title="ويدجت"
  sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe>
```
ليه؟ من غير `sandbox` الصفحة الغريبة ليها صلاحيات كاملة تقريباً (نوافذ منبثقة، تحويل، ...).

### استخدام allow-scripts مع allow-same-origin لمحتوى مش موثوق
```html bad
<iframe sandbox="allow-scripts allow-same-origin" src="/user-content" title="محتوى المستخدم"></iframe>
```
```html good
<iframe sandbox="allow-scripts" src="https://user-content.example/page" title="محتوى المستخدم"></iframe>
```
ليه؟ لو الإطار من نفس موقعك، الجمع بين القيمتين بيخلّي السكريبت يشيل الـ `sandbox` بنفسه. حط المحتوى على دومين تاني.

## a11y

- **`title` إجباري**: قارئ الشاشة بيعلن اسم الإطار قبل ما يدخله.
- متحطش إطارات كتير: كل واحد نقطة تنقل إضافية للكيبورد.
- المحتوى جوه الإطار لازم يكون متاح بنفسه (alt، عناوين، تباين).
- `allowfullscreen` مهم للفيديو عشان المستخدم يكبّره.

## tips

- `loading="lazy"` على أي إطار تحت الشاشة الأولى، خاصةً يوتيوب.
- لو الموقع مش بيسمح بالتضمين، اعمل رابط أو استخدم API بتاعهم.
- في الأمان استخدم `sandbox` بأقل صلاحيات، وأضف اللي محتاجه بس.
- لتضمين يوتيوب بدون كوكيز: `youtube-nocookie.com`.
- تقدر تتحكم في المحتوى من نفس الأصل بـ `iframe.contentDocument`.

## quiz

### إيه الخاصية اللي بتخلّيك تكتب HTML مباشرة جوه الإطار من غير ملف؟
- [ ] `src`
- [x] `srcdoc`
- [ ] `html`
- [ ] `content`
الـ `srcdoc` بياخد كود HTML كنص.

### إيه وظيفة `sandbox`؟
- [ ] تحسين الأداء
- [x] عزل الإطار وتقييد صلاحياته
- [ ] تغيير الألوان
- [ ] إخفاء الإطار
بيقفل السكريبتات والنوافذ والفورمز، وبتفتح اللي محتاجه.

### ليه الإطار ممكن يظهر فاضي لما تضمّن موقع معين؟
- [ ] لأن `iframe` مش بيدعم المواقع
- [x] الموقع بيمنع التضمين بـ `X-Frame-Options` أو `frame-ancestors`
- [ ] بسبب الألوان
- [ ] لأنه مجاني
القرار بيد صاحب الموقع.

### إيه أهم خاصية إتاحة في `<iframe>`؟
- [ ] `name`
- [x] `title`
- [ ] `width`
- [ ] `id`
بتوصف محتوى الإطار لقارئ الشاشة.

## refs

- [MDN: iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [WHATWG: The iframe element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)
- [MDN: Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
