---
id: source
kind: element
cat: media
tag: source
title: عنصر المصدر
en: HTML source element
status: stable
display: none
void: yes
support: all
summary: بيحدد مصدر ملف بديل جوه picture أو video أو audio، والمتصفح يختار أول مصدر ينفع حسب الصيغة type أو شرط media أو الحجم.
keywords: source, مصدر, srcset, type, media, sizes, picture, video, audio, صيغة, mp4, webm, mp3, ogg, احتياطي
related: picture, video, audio, img, track
---

## intro

الـ `<source>` عنصر صغير بس مهم جداً: هو **بيقول للمتصفح «عندك ملف بديل ممكن تستخدمه»**. بيتحط جوه ثلاثة عناصر: [[picture]] وبـ [[video]] وبـ [[audio]]. في كل مرة بتحط أكتر من `<source>` جوه نفس الحاوية، المتصفح بيعدّي عليهم **بالترتيب** وأول واحد يعرف يتعامل معاه (يفهم الصيغة وتنطبق شروطه) بياخده، وبيتجاهل الباقي.

لأن الصيغ مش كلها مدعومة في كل المتصفحات (WebM مش زي MP4، وOGG مش زي MP3...)، `<source>` هو الحل: بتديهم النسخ كلها، وكل متصفح يختار اللي يفهمه. وده بيشتغل بالخاصية **`type`** (نوع الملف MIME).

الخصائص بتختلف حسب الأب. جوه `<video>` و`<audio>` بتستخدم **`src`** و**`type`**. وجوه `<picture>` بتستخدم **`srcset`** و**`sizes`** و**`media`** و**`type`** (و`width`/`height` اختيارية). الخاصية `src` في `<source>` جوه `<picture>` مش مسموحة، لازم `srcset`.

والـ `<source>` **عنصر فاضي (Void)** من غير وسم قفل، وبيتعرض `display: none` أصلاً يعني ملوش شكل بنفسه. بس هو **بيشتغل في الخلفية** عشان يقول للأب «امسك ده».

> [!analogy] `<source>` زي **أرقام تليفون بديلة** لنفس الشخص: بتجرّب الأول، لو مردش بتجرّب التاني، وهكذا. أول رقم بيرد هو اللي بتكلمه.

> [!key] `<source>` ملوش شكل. بيتحط جوه `picture` / `video` / `audio`، ومتصفح بيجرّب من فوق لتحت ويختار أول واحد مناسب.

## try

الصوت بيشتغل بملف MP3 بعد ما المتصفح يتخطى الصيغة اللي ميعرفهاش.

```html
<audio controls>
  <source src="not-supported.xyz" type="audio/x-unknown">
  <source src="sample.mp3" type="audio/mpeg">
  متصفحك مش بيدعم الصوت.
</audio>
```

## syntax

```html nolive
<video controls>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
</video>

<picture>
  <source srcset="a.webp" type="image/webp" media="(min-width: 600px)">
  <img src="a.jpg" alt="...">
</picture>
```

- `<source ...>` — وسم **واحد بس**، ومفيش `</source>`.
- `src` — **مسار الملف** (جوه `<video>` و`<audio>` بس).
- `srcset` — **قايمة الصور** (جوه `<picture>` بس).
- `type` — **نوع الملف (MIME)** عشان المتصفح يتخطّاه لو مش فاهمه من غير ما يحمّله.
- `media` — **شرط Media Query** (للصور بس).

## use

- جوه `<video>` لتقديم MP4 وWebM وغيرهم.
- جوه `<audio>` لتقديم MP3 وOGG وغيرهم.
- جوه `<picture>` للصور المتجاوبة أو الصيغ الحديثة.
- لما عايز تتأكد إن كل المتصفحات هتلاقي ملف تشتغل بيه.

## avoid

- متستخدمهوش برّه `picture` أو `video` أو `audio`: مالوش معنى.
- متنساش `type`: من غيره المتصفح هيحمّل الملف عشان يعرف نوعه.
- متحطش `src` جوه `<source>` اللي في `<picture>`: لازم `srcset`.
- متحطش `<source>` بعد `<img>` في `<picture>`.

## attributes

### src {required}
**مسار الملف** (جوه `<video>` و`<audio>`). لازم يتكتب هنا مش `srcset`.

```html nolive
<source src="movie.mp4" type="video/mp4">
```

### srcset {required}
**قايمة الصور** (جوه `<picture>`). نفس صيغة `srcset` في `<img>`: `a.jpg 1x, a-2x.jpg 2x` أو `a-400.jpg 400w`.

### type
**نوع الملف MIME**، زي `video/mp4` و`video/webm` و`audio/mpeg` و`audio/ogg` و`image/webp` و`image/avif`. المتصفح بيستخدمه عشان يتخطّى اللي ميفهمهوش من غير ما يحمّله.

### media
**شرط Media Query**، زي `(min-width: 600px)`. بيتطبّق **جوه `<picture>` بس**.

### sizes
**بيقول عرض الصورة بالنسبة للشاشة**، بيشتغل مع `srcset` بوحدات `w` (جوه `<picture>`).

### width
**عرض الصورة** بالبكسل (جوه `<picture>`)، لحجز المكان.

### height
**ارتفاع الصورة** بالبكسل (جوه `<picture>`)، لحجز المكان.

## examples

### 1) صوت بصيغتين
MP3 وOGG.

```html
<audio controls>
  <source src="sample.ogg" type="audio/ogg">
  <source src="sample.mp3" type="audio/mpeg">
  متصفحك مش بيدعم الصوت.
</audio>
```

- المتصفح بيجرّب `ogg` الأول، ولو مش موجود أو مش مدعوم بيروح للتاني.
- الـ `type` بيخلّيه يتخطّى الملف من غير ما يحمّله لو مش فاهم الصيغة.
- الجملة اللي بعد الـ `<source>` هي **المحتوى الاحتياطي** للمتصفحات القديمة جداً.

### 2) فيديو بصيغتين
WebM وMP4.

```html
<video controls width="280">
  <source src="sample.webm" type="video/webm">
  <source src="sample.mp4" type="video/mp4">
  متصفحك مش بيدعم الفيديو.
</video>
```

- WebM أصغر وأحدث، وMP4 الأكتر دعماً.
- الأولى الأفضل والأخيرة الأضمن.
- لاحظ إن الملف الأول مش موجود هنا، فالمتصفح بيرجع للتاني تلقائياً.

### 3) صيغة حديثة في picture
`type` مع `srcset`.

```html nolive
<picture>
  <source type="image/avif" srcset="p.avif">
  <source type="image/webp" srcset="p.webp">
  <img src="p.jpg" alt="..." width="600" height="400">
</picture>
```

- الأحدث الأول عشان لو المتصفح فاهمه ياخده فوراً.
- اللي ميفهمش AVIF بيرجع لـ WebP، واللي ميفهمش الاتنين بيرجع لـ JPG.
- جوه `<picture>` بنستخدم `srcset` مش `src`.

### 4) شرط على حجم الشاشة
`media` جوه picture.

```html
<picture>
  <source media="(max-width: 399px)"
    srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23fecaca'/%3E%3Ctext x='100' y='58' font-size='20' text-anchor='middle'%3EPhone%3C/text%3E%3C/svg%3E">
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23bbf7d0'/%3E%3Ctext x='100' y='58' font-size='20' text-anchor='middle'%3EDesktop%3C/text%3E%3C/svg%3E"
    alt="اختلاف حسب الشاشة">
</picture>
```

- لو عرض النافذة أقل من 400 بكسل بتظهر نسخة «Phone»، وإلا «Desktop».
- الشرط في `media` هو نفس Media Query بتاعة CSS بالظبط.
- الـ `<source>` ملوش مظهر، التأثير بيظهر في الصورة اللي بتتحمّل.

### 5) ترتيب المصادر وأثره
أول واحد ينفع بيكسب.

```html
<audio controls>
  <source src="sample.mp3" type="audio/mpeg">
  <source src="never-used.ogg" type="audio/ogg">
  متصفحك مش بيدعم الصوت.
</audio>
```

- المتصفح بيبدأ من `sample.mp3` وبيلاقيه مناسب، فبيستخدمه فوراً.
- الـ `never-used.ogg` مش هيتحمّل خالص لأن اللي قبله نفع.
- عشان كده الترتيب هو اللي بيحدد النتيجة: حط الأفضل أولاً والأضمن آخر حاجة.
- لو الأول فشل في التشغيل (ملف تالف مثلاً) المتصفح بيكمل للتالي تلقائياً.

## rules

- parents: [[picture]] أو [[video]] أو [[audio]].
- children: **مفيش**. عنصر فاضي (Void).
- closing: **مفيش وسم قفل**.
- role: `generic` (ملوش دور عرض).
- dom: `HTMLSourceElement`.
- layout: `display: none`.

## mistakes

### source برّه حاوية
```html bad
<source src="a.mp4" type="video/mp4">
```
```html good
<video controls>
  <source src="a.mp4" type="video/mp4">
</video>
```
ليه؟ `<source>` بيخدم الأب بتاعه، ومن غيره مالوش وظيفة.

### src بدل srcset في picture
```html bad
<picture>
  <source src="a.webp" type="image/webp">
  <img src="a.jpg" alt="...">
</picture>
```
```html good
<picture>
  <source srcset="a.webp" type="image/webp">
  <img src="a.jpg" alt="...">
</picture>
```
ليه؟ جوه `<picture>` الخاصية الصح هي `srcset`، و`src` بيتجاهل.

### نسيان type
```html bad
<video controls>
  <source src="a.webm">
  <source src="a.mp4">
</video>
```
```html good
<video controls>
  <source src="a.webm" type="video/webm">
  <source src="a.mp4" type="video/mp4">
</video>
```
ليه؟ من غير `type` المتصفح لازم يبدأ يحمّل الملف عشان يعرف إذا كان يقدر يشغّله، وده بيضيّع وقت وداتا.

## a11y

- `<source>` نفسه ملوش تأثير على الإتاحة. الإتاحة بتتحط على الأب: `alt` في `<img>`، و`<track>` في الفيديو.
- لو بتقدّم فيديو، وفّر ترجمة بـ [[track]] مهما كانت الصيغة.
- النص اللي بعد `<source>` جوه `<video>` و`<audio>` هو احتياطي لمتصفحات قديمة جداً.

## tips

- رتّب `<source>` من الأفضل للأضمن.
- اكتب `type` دايماً، ويفضّل تضيف الـ codec لو محتاج: `video/mp4; codecs="avc1.42E01E"`.
- لو ملفاتك اتعدّلت، المتصفح ممكن يحتفظ بنسخة قديمة: غيّر الاسم أو أضف `?v=2`.

## quiz

### إيه اللي بيحصل لو حطيت أكتر من `<source>` جوه `<video>`؟
- [ ] بيشغّلهم كلهم مع بعض
- [x] بيجرّب بالترتيب ويستخدم أول واحد يفهمه
- [ ] بيشغّل آخر واحد
- [ ] بيطلع خطأ
الأول المناسب بيكسب والباقي بيتجاهل.

### أنهي خاصية بتستخدمها في `<source>` جوه `<picture>`؟
- [ ] `src`
- [x] `srcset`
- [ ] `href`
- [ ] `data`
جوه `<picture>` بنستخدم `srcset` (وممكن `media` و`type`).

### ليه بنكتب `type` على `<source>`؟
- [ ] للتنسيق
- [x] عشان المتصفح يتخطّى الصيغة اللي ميفهمهاش من غير تحميل
- [ ] عشان نغيّر لون الملف
- [ ] مش مهم
بيوفر تحميل ملفات مش هتتشغّل.

## refs

- [MDN: source](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source)
- [WHATWG: The source element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element)
