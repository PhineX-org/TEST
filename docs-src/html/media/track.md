---
id: track
kind: element
cat: media
tag: track
title: عنصر المسار النصي
en: HTML track element
status: stable
display: none
void: yes
support: all
summary: بيضيف مسار نصي لفيديو أو صوت: ترجمة subtitles أو captions أو وصف descriptions أو فصول chapters، من ملف WebVTT، ومعاه لغة وعنوان واختيار افتراضي.
keywords: track, ترجمة, subtitles, captions, vtt, webvtt, srclang, label, kind, default, chapters, descriptions, نص مصاحب, إتاحة
related: video, audio, source
---

## intro

الفيديو من غير ترجمة بيضيّع ناس كتير: الصم وضعاف السمع، واللي في مكان هادي ومش قادر يشغّل صوت، واللي بيتعلم لغة، واللي لغته الأصلية مختلفة. وعشان كده فيه عنصر `<track>` (اختصار **Text Track**) اللي بيربط **ملف نصي** بالفيديو أو الصوت: بيعرض الكلام المترجم مع التوقيت المضبوط.

الـ `<track>` بيتحط **جوه [[video]] أو [[audio]]** وبعد عناصر [[source]]. وهو **عنصر فاضي (Void)** من غير وسم قفل. بيشاور على ملف بصيغة **WebVTT** (امتداد `.vtt`)، وهي صيغة نصية بسيطة: فيها توقيت كل جملة وبعده الجملة.

الخاصية **`kind`** بتحدد نوع المسار: `subtitles` (ترجمة لحوار بلغة تانية)، `captions` (نص كامل للحوار والمؤثرات الصوتية للصم)، `descriptions` (وصف المشاهد للمكفوفين)، `chapters` (عناوين فصول للتنقل)، `metadata` (بيانات للسكريبت بس). و**`srclang`** لغة المسار، و**`label`** الاسم اللي هيظهر للمستخدم في القايمة، و**`default`** بيفعّله تلقائياً.

ملف الـ WebVTT لازم يبدأ بسطر `WEBVTT`، وبعده جمل بالشكل `00:00.000 --> 00:02.000` وتحتها النص. والملف لازم يتحمّل من **نفس الدومين** (أو بإذن CORS)، ولو بتجرّب من `file://` ممكن بعض المتصفحات تمنعه.

> [!analogy] `<track>` زي **سطور الترجمة المطبوعة على شريط السينما**. الفيلم (`video`) شغّال، والترجمة (`track`) ملف منفصل بيتزامن معاه بالتوقيت.

> [!key] `<track kind srclang label src default>` جوه `<video>`، وبيشاور على ملف `.vtt`. للإتاحة مش رفاهية.

## try

الترجمة هتظهر على الفيديو (فعّلها من قايمة CC لو مظهرتش).

```html
<video controls width="280">
  <source src="sample.mp4" type="video/mp4">
  <track kind="subtitles" src="sample.vtt" srclang="ar" label="العربية" default>
</video>
```

## syntax

```html nolive
<video controls src="movie.mp4">
  <track kind="subtitles" src="ar.vtt" srclang="ar" label="العربية" default>
  <track kind="subtitles" src="en.vtt" srclang="en" label="English">
</video>
```

- `<track ...>` — وسم **واحد بس**، ومفيش `</track>`.
- `kind` — **نوع المسار** (`subtitles` أو `captions` وغيرهم).
- `src` — **ملف WebVTT** (إجباري).
- `srclang` — **لغة المسار** بصيغة BCP 47 (`ar`, `en`).
- `label` — **الاسم الظاهر** في قايمة المشغّل.
- `default` — **يتفعّل تلقائياً** (واحد بس).

## use

- لترجمة فيديو بلغات مختلفة.
- لتوفير نص كامل للصم (captions) بما فيه الأصوات.
- لوصف المشاهد للمكفوفين (descriptions).
- لعمل فصول تنقل داخل فيديو طويل (chapters).
- لإرسال بيانات توقيت للجافاسكربت (metadata).

## avoid

- متستخدمهوش برّه `<video>` أو `<audio>`.
- متحطش `default` على أكتر من مسار لنفس النوع.
- متنساش `srclang` و`label` مع `kind="subtitles"`.
- متحطش ملف VTT من دومين تاني من غير CORS.

## attributes

### src {required}
**مسار ملف WebVTT** (`.vtt`). لازم يبقى من نفس الأصل (Same-origin) أو CORS.

### kind
**نوع المسار**: `subtitles` (الافتراضي)، `captions`، `descriptions`، `chapters`، `metadata`.

### srclang
**لغة المسار** (`ar`, `en`, `fr`). **إجباري** مع `kind="subtitles"`.

### label
**اسم المسار** للمستخدم في قايمة الترجمة، زي «العربية».

### default {boolean}
**يتفعّل تلقائياً** لو مفيش اختيار تاني من المستخدم. واحد بس لكل `kind`.

## examples

### 1) ترجمة عربية للفيديو
المثال الأساسي.

```html
<video controls width="280">
  <source src="sample.mp4" type="video/mp4">
  <track kind="subtitles" src="sample.vtt" srclang="ar" label="العربية" default>
</video>
```

- `default` بيفعّل الترجمة أول ما الفيديو يشتغل.
- لو شلت `default` المستخدم يفعّلها يدوياً من زرار CC.
- الملف `sample.vtt` فيه جملتين بتوقيتهم.

### 2) أكتر من لغة
مسارين.

```html
<video controls width="280">
  <source src="sample.mp4" type="video/mp4">
  <track kind="subtitles" src="sample.vtt" srclang="ar" label="العربية" default>
  <track kind="subtitles" src="sample.vtt" srclang="en" label="English">
</video>
```

- كل مسار له `srclang` و`label` مختلفين.
- المستخدم يختار من قايمة CC في المشغّل.
- (هنا استخدمنا نفس الملف للتجربة بس. في الواقع كل لغة ملف مستقل.)

### 3) شكل ملف WebVTT
الصيغة نفسها.

```html nolive
WEBVTT

00:00.000 --> 00:02.000
مرحباً بيك في الدرس

00:02.000 --> 00:05.000
النهارده هنتعلم HTML
```

- أول سطر لازم يبقى `WEBVTT`.
- كل جملة: سطر توقيت `start --> end` وتحته النص.
- بين كل جملة وجملة سطر فاضي.
- التوقيت بصيغة `mm:ss.ttt` أو `hh:mm:ss.ttt`.

### 4) قراءة الترجمة بالجافاسكربت
`cuechange`.

```html
<video id="v" controls width="280">
  <source src="sample.mp4" type="video/mp4">
  <track id="tr" kind="metadata" src="sample.vtt" srclang="ar" default>
</video>
<p id="out" style="min-height:1.5em">…</p>
<script>
  const t = document.getElementById('tr').track;
  t.mode = 'hidden';
  t.addEventListener('cuechange', () => {
    const c = t.activeCues[0];
    document.getElementById('out').textContent = c ? c.text : '…';
  });
</script>
```

- `kind="metadata"` مش بيتعرض على الفيديو، السكريبت بيقراه.
- `cuechange` بيتنفّذ كل ما جملة جديدة تبدأ أو تنتهي.
- `activeCues` بتدينا الجمل الشغالة دلوقتي.
- ممكن تستخدمها لعمل ترجمة بشكلك أو نص تفاعلي جنب الفيديو.

### 5) فصول للفيديو
`kind="chapters"`.

```html nolive
<video controls src="course.mp4">
  <track kind="chapters" src="chapters.vtt" srclang="ar" label="الفصول" default>
</video>
```

- ملف الفصول فيه عناوين وتوقيتات.
- بتستخدمه علشان تبني قايمة تنقل داخل فيديو طويل بالجافاسكربت.
- المتصفح مش بيعرضه بنفسه، فبنحتاج واجهة من عندنا.

## rules

- parents: [[video]] أو [[audio]] (بعد عناصر [[source]]).
- children: **مفيش**. عنصر فاضي (Void).
- closing: **مفيش وسم قفل**.
- role: مفيش (مش بيتعرض بنفسه).
- dom: `HTMLTrackElement`.
- layout: `display: none`.

## mistakes

### نسيان srclang
```html bad
<track kind="subtitles" src="ar.vtt" label="العربية">
```
```html good
<track kind="subtitles" src="ar.vtt" srclang="ar" label="العربية">
```
ليه؟ `srclang` إجباري لـ `subtitles`، من غيره المسار مش بيشتغل صح.

### ملف مش VTT
```html bad
<track kind="subtitles" src="subs.srt" srclang="ar">
```
```html good
<track kind="subtitles" src="subs.vtt" srclang="ar">
```
ليه؟ المتصفحات بتدعم WebVTT بس. ملفات `.srt` لازم تتحوّل.

### أكتر من default
```html bad
<track kind="subtitles" src="ar.vtt" srclang="ar" default>
<track kind="subtitles" src="en.vtt" srclang="en" default>
```
```html good
<track kind="subtitles" src="ar.vtt" srclang="ar" default>
<track kind="subtitles" src="en.vtt" srclang="en">
```
ليه؟ مسموح بـ `default` واحد بس لكل نوع.

## a11y

- `captions` بتشمل الأصوات والمؤثرات، وهي الأنسب للصم. `subtitles` للترجمة اللغوية بس.
- حط `label` مفهوم وبلغة المسار نفسها.
- وفّر ترجمة لأي فيديو فيه كلام: ده شرط إتاحة أساسي (WCAG).
- استخدم `descriptions` أو نسخة صوتية بديلة للمكفوفين لو الفيديو بصري.

## tips

- اختبر الملف على السيرفر مش `file://`، لأن بعض المتصفحات بتمنعه.
- حوّل ملفات SRT لـ VTT بأدوات مجانية أو بتعديل بسيط (فاصلة `,` تتحول `.`).
- ممكن تنسّق الترجمة بـ `::cue` في CSS.
- مفيش حاجة اسمها `</track>`.

## quiz

### أنهي صيغة ملف الترجمة اللي المتصفح بيدعمها؟
- [ ] SRT
- [x] WebVTT
- [ ] DOCX
- [ ] PDF
ملف `.vtt` بيبدأ بـ `WEBVTT`.

### إيه الفرق بين `captions` و`subtitles`؟
- [ ] مفيش فرق
- [x] captions بتشمل المؤثرات للصم، وsubtitles لترجمة الحوار
- [ ] captions للصور
- [ ] subtitles للصوت بس
captions أشمل للإتاحة.

### فين بيتحط `<track>`؟
- [ ] جوه `<img>`
- [x] جوه `<video>` أو `<audio>`
- [ ] جوه `<head>`
- [ ] جوه `<p>`
بعد عناصر `<source>`.

## refs

- [MDN: track](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track)
- [WHATWG: The track element](https://html.spec.whatwg.org/multipage/media.html#the-track-element)
- [MDN: WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
