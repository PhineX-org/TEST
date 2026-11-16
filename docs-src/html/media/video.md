---
id: video
kind: element
cat: media
tag: video
title: عنصر الفيديو
en: HTML video element
status: stable
display: inline
void: no
support: all
summary: بيشغّل فيديو جوه الصفحة بمشغّل جاهز بخاصية controls، مع صورة غلاف poster، وتشغيل تلقائي صامت، ومصادر متعددة بـ source، وترجمات بـ track، وتحكم كامل بجافاسكربت.
keywords: video, فيديو, mp4, webm, poster, controls, autoplay, muted, loop, playsinline, preload, ترجمة, مشغل, بث, source, track
related: audio, source, track, img, figure, iframe
---

## intro

زمان عشان تعرض فيديو في موقعك كنت محتاج إضافة (Flash أو QuickTime). دلوقتي العنصر `<video>` (اختصار **Video**) بيشغّل الفيديو **مباشرة في المتصفح**: مشغّل جاهز، تحكم بالكيبورد، ملء الشاشة، وترجمات، كل ده من غير مكتبات. والعنصر ده **أخو** [[audio]] في الاستخدام: نفس الخصائص تقريباً، بس بيزوّد حاجات خاصة بالصورة زي `poster` و`width` و`height`.

أبسط شكل: `<video src="movie.mp4" controls></video>`. الخاصية `controls` بتظهر المشغّل. ولو عايز تضمن إن الفيديو يتشغّل على كل المتصفحات، حط جواه أكتر من [[source]] (MP4 وWebM) والمتصفح ياخد أول صيغة يفهمها. والنص اللي بتكتبه جواه بيظهر احتياطي في المتصفحات القديمة.

وفيه خاصية مهمة جداً: **`poster`** وهي **صورة الغلاف** اللي بتظهر قبل التشغيل. من غيرها بتشوف إطار أسود أو أول لقطة. وكمان **`playsinline`** على الموبايل (خاصة iPhone): من غيرها الفيديو بيفتح ملء الشاشة أول ما تشغّله.

والتشغيل التلقائي (`autoplay`) بيتمنع في أغلب المتصفحات **إلا لو الفيديو `muted`** (صامت). عشان كده فيديوهات الخلفية في المواقع بتتكتب: `autoplay muted loop playsinline`. وللترجمة والـ Captions استخدم [[track]].

> [!analogy] `<video>` زي **شاشة تليفزيون صغيرة** في صفحتك: الفيديو هو الفيلم، والـ `poster` هو صورة الكفر اللي على العلبة، والـ `controls` هو الريموت.

> [!key] `<video controls poster>` + `<source>` متعددة + `<track>` للترجمة. `autoplay` يشتغل بس مع `muted`. على الموبايل ضيف `playsinline`.

## try

شغّل الفيديو، وجرّب تضيف `loop` أو `muted`.

```html
<video controls width="280" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%231e293b'/%3E%3Ctext x='160' y='98' font-size='26' text-anchor='middle' fill='%23f8fafc'%3EPoster%3C/text%3E%3C/svg%3E">
  <source src="sample.mp4" type="video/mp4">
  متصفحك مش بيدعم الفيديو.
</video>
```

## syntax

```html nolive
<video src="movie.mp4" controls width="640" height="360" poster="cover.jpg" preload="metadata">
  <track kind="subtitles" src="ar.vtt" srclang="ar" label="العربية" default>
  متصفحك مش بيدعم الفيديو.
</video>
```

- `<video ...>` — **الوسم الافتتاحي**.
- `src` — **ملف الفيديو** (أو `<source>` جواه).
- `controls` — **بيظهر المشغّل**.
- `width` و`height` — **مقاس الفيديو** بالبكسل.
- `poster` — **صورة الغلاف** قبل التشغيل.
- `<track>` — **ترجمة** أو وصف.
- `</video>` — **الوسم الختامي** إجباري.

## use

- لعرض دروس وشروحات داخل الموقع.
- لفيديو تسويقي أو عرض منتج.
- لفيديو خلفية صامت (`autoplay muted loop playsinline`).
- لفيديوهات قصيرة بديلة للـ GIF (حجم أصغر وجودة أعلى).
- للتحكم المخصص بجافاسكربت (مشغّل بتصميمك).

## avoid

- متعتمدش على `autoplay` من غير `muted`.
- متحمّلش فيديو ضخم من غير `preload="metadata"` أو `none`.
- لفيديو YouTube استخدم [[iframe]] مش `<video>` (إلا لو عندك الملف).
- متنساش الترجمة لو الكلام مهم: مش كل الناس بتسمع.

## attributes

### src
**مسار ملف الفيديو.** لو محتاج أكتر من صيغة استخدم `<source>` جواه.

### controls {boolean}
**بتظهر المشغّل.** من غيرها مفيش أزرار.

### poster
**صورة الغلاف** اللي بتظهر قبل التشغيل أو لو الفيديو ماتحمّلش.

```html nolive
<video src="v.mp4" controls poster="cover.jpg"></video>
```

### width
**عرض الفيديو** بالبكسل. حدّده عشان تحجز المكان.

### height
**ارتفاع الفيديو** بالبكسل.

### autoplay {boolean}
**تشغيل تلقائي.** غالباً بيشتغل بس مع `muted`.

### muted {boolean}
**يبدأ من غير صوت.** شرط عملي للـ `autoplay`.

### loop {boolean}
**يعيد التشغيل** بعد النهاية.

### preload
**قد إيه يحمّل مقدماً**: `none` أو `metadata` أو `auto`.

### playsinline {boolean}
**يشتغل جوه الصفحة** على الموبايل بدل ملء الشاشة التلقائي (مهم على iOS).

### crossorigin
**طلب الفيديو بإذن CORS** من دومين تاني.

### controlslist
**تلميح لإخفاء أزرار** زي `nodownload` و`nofullscreen`.

### disablepictureinpicture {boolean}
**يمنع** وضع الصورة داخل الصورة (PiP).

### disableremoteplayback {boolean}
**يمنع** إرسال الفيديو لأجهزة خارجية (Cast).

## examples

### 1) فيديو أساسي بمشغّل
`controls`.

```html
<video src="sample.mp4" controls width="280">
  متصفحك مش بيدعم الفيديو.
</video>
```

- `controls` بتظهر المشغّل الجاهز.
- `width="280"` بيحدد العرض، والارتفاع بيتحسب بالنسبة الطبيعية للفيديو.
- النص جواه احتياطي للمتصفحات القديمة جداً.

### 2) صورة غلاف
`poster`.

```html
<video src="sample.mp4" controls width="280"
  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%2339ff14'/%3E%3Ctext x='160' y='100' font-size='28' text-anchor='middle' fill='%23050508'%3E▶ دوس للتشغيل%3C/text%3E%3C/svg%3E">
</video>
```

- الصورة بتظهر قبل ما المستخدم يضغط تشغيل.
- من غيرها بتشوف إطار أسود أو أول لقطة حسب المتصفح.
- ممكن تحط أي صورة: لقطة شاشة أو تصميم مخصص بزرار تشغيل.

### 3) أكتر من صيغة
`<source>`.

```html
<video controls width="280">
  <source src="sample.webm" type="video/webm">
  <source src="sample.mp4" type="video/mp4">
  متصفحك مش بيدعم الفيديو.
</video>
```

- المتصفح بيجرّب WebM الأول، وملفه مش موجود هنا، فبيرجع لـ MP4.
- ده بيضمن إن الفيديو يشتغل على أكبر عدد من الأجهزة.
- الـ `type` بيمنع تحميل الصيغة اللي مش مدعومة.

### 4) فيديو خلفية صامت
`autoplay muted loop playsinline`.

```html
<video autoplay muted loop playsinline width="280" style="border-radius:12px">
  <source src="sample.mp4" type="video/mp4">
</video>
```

- `muted` هو اللي بيسمح للمتصفح بالتشغيل التلقائي.
- `loop` بيعيد الفيديو من الأول لما يخلص.
- `playsinline` ضروري على iPhone عشان ما يفتحش ملء الشاشة.
- مفيش `controls` لإنه خلفية، مش مشغّل للمستخدم.

### 5) ترجمة بـ track
نص مصاحب.

```html
<video controls width="280">
  <source src="sample.mp4" type="video/mp4">
  <track kind="subtitles" src="sample.vtt" srclang="ar" label="العربية" default>
</video>
```

- `<track>` بيضيف ترجمة من ملف `.vtt` بتظهر على الفيديو.
- `default` بيفعّلها تلقائياً، والمستخدم يقدر يطفيها من المشغّل.
- لو الفيديو فيه كلام، الترجمة مش رفاهية، دي إتاحة.

### 6) تحكم مخصص بجافاسكربت
أزرار خاصة.

```html
<video id="v" src="sample.mp4" width="240" muted></video>
<div>
  <button onclick="document.getElementById('v').play()">▶</button>
  <button onclick="document.getElementById('v').pause()">⏸</button>
  <button onclick="document.getElementById('v').playbackRate = 2">2x</button>
</div>
```

- `play()` و`pause()` دوال العنصر.
- `playbackRate` بيغيّر السرعة (1 عادي، 2 ضعف السرعة).
- ده أساس أي مشغّل فيديو مخصص: العنصر بيعمل الشغل والواجهة من عندك.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: صفر أو أكتر من [[source]]، وبعدهم [[track]]، وبعدهم محتوى احتياطي.
- closing: الوسم الختامي `</video>` إجباري.
- role: مفيش دور محدد.
- dom: `HTMLVideoElement`.
- layout: `display: inline`، وهو Replaced Element.

## mistakes

### autoplay من غير muted
```html bad
<video src="bg.mp4" autoplay loop></video>
```
```html good
<video src="bg.mp4" autoplay muted loop playsinline></video>
```
ليه؟ المتصفحات بتمنع التشغيل التلقائي لو الفيديو بصوت. `muted` هو اللي بيسمح.

### نسيان controls
```html bad
<video src="lesson.mp4"></video>
```
```html good
<video src="lesson.mp4" controls></video>
```
ليه؟ من غير `controls` المستخدم مايقدرش يشغّل أو يوقف.

### فيديو من غير مقاس
```html bad
<video src="lesson.mp4" controls></video>
```
```html good
<video src="lesson.mp4" controls width="640" height="360"></video>
```
ليه؟ من غير مقاس الصفحة بتنط لما الفيديو يتحمّل، وبتتحسب مساحة غلط.

### استخدام video لفيديو يوتيوب
```html bad
<video src="https://www.youtube.com/watch?v=xxxx" controls></video>
```
```html good
<iframe src="https://www.youtube.com/embed/xxxx" title="شرح الدرس"
  allowfullscreen width="560" height="315"></iframe>
```
ليه؟ رابط صفحة يوتيوب مش ملف فيديو. بتحتاج التضمين عبر `<iframe>`.

## a11y

- وفّر **ترجمة نصية** (`<track kind="subtitles">`) لكل فيديو فيه كلام.
- للفيديو اللي بيحتاج وصف للمشاهد استخدم `<track kind="descriptions">` أو نسخة نصية.
- متشغّلش صوت تلقائي: بيعطّل قارئ الشاشة.
- فيديوهات الخلفية اللي بتتحرك: وفّر زرار إيقاف مؤقت (WCAG 2.2.2).
- المشغّل الجاهز (`controls`) متاح بالكيبورد: مسافة للتشغيل والأسهم للتقديم.

## tips

- استخدم `preload="metadata"` عشان توفّر داتا.
- MP4 (H.264) هو الأضمن، وWebM احتياطي أو أصغر حجم.
- ضيّق الفيديو قبل الرفع: ملف 100 ميجا يخلّي الصفحة تزحف.
- لو الفيديو طويل أو عايز بث، فكّر في خدمة استضافة فيديو بدل السيرفر العادي.

## quiz

### إيه الخاصية اللي بتظهر صورة قبل التشغيل؟
- [ ] `cover`
- [x] `poster`
- [ ] `thumb`
- [ ] `image`
الـ `poster` هو صورة الغلاف.

### إمتى بيشتغل `autoplay` غالباً؟
- [ ] دايماً
- [x] مع `muted`
- [ ] مع `loop`
- [ ] مع `controls`
المتصفحات بتسمح بالتشغيل التلقائي للفيديو الصامت بس.

### ليه بنحط `playsinline`؟
- [ ] لتكبير الفيديو
- [x] عشان يشتغل جوه الصفحة على الموبايل بدل ملء الشاشة
- [ ] لإضافة صوت
- [ ] للترجمة
خصوصاً على iPhone.

### إزاي تضيف ترجمة؟
- [ ] `<caption>`
- [x] `<track>` جوه `<video>`
- [ ] `<text>`
- [ ] `<sub>`
بملف `.vtt` وخاصية `kind="subtitles"`.

## refs

- [MDN: video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)
- [WHATWG: The video element](https://html.spec.whatwg.org/multipage/media.html#the-video-element)
