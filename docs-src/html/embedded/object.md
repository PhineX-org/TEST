---
id: object
kind: element
cat: embedded
tag: object
title: عنصر الكائن
en: HTML object element
status: stable
display: inline
void: no
support: all
summary: بيضمّن مورد خارجي زي PDF أو SVG أو صورة أو صفحة، ومعاه محتوى بديل جواه لو فشل التحميل. بياخد المصدر في data والنوع في type، وبيقبل param.
keywords: object, كائن, data, type, pdf, svg, fallback, param, تضمين, احتياطي, plugin, form, usemap
related: embed, iframe, img, param, picture
---

## intro

عنصر `<object>` هو **التضمين العام** في HTML: بيقدر يعرض صورة أو SVG أو PDF أو صفحة HTML أو (زمان) Flash، وكله بنفس الشكل. بتديله ملف في **`data`** (مش `src`!) ونوعه في **`type`** والمتصفح يتصرف حسب النوع.

الميزة الكبيرة عن [[embed]]: العنصر `<object>` **بيقبل محتوى جواه، ده المحتوى الاحتياطي (Fallback)**. لو الملف فشل تحميله أو المتصفح مش بيعرضه، بيتعرض اللي جواه بدله، زي صورة أو رابط تحميل. وممكن تتداخل: `<object>` جوه `<object>` كمستويات احتياطي متدرّجة.

وبيقبل عناصر [[param]] جواه لتمرير معاملات للمحتوى (كانت مهمة مع Flash). النهارده الاستخدام الأشهر: **عرض PDF** مع رابط تحميل بديل، و**تضمين SVG تفاعلي**.

> [!analogy] `<object>` زي **مطعم عنده خطة بديلة**: لو الطبق الأساسي (الملف في `data`) مش موجود، بيقدّم الطبق اللي جوّه (المحتوى الاحتياطي).

> [!key] `<object data type>` والمحتوى جواه بديل. الخاصية `data` مش `src`.

## try

الملف مش موجود، فبيظهر المحتوى الاحتياطي.

```html
<object data="not-found.png" type="image/png" width="200" height="80">
  <p style="border:1px dashed #888; padding:8px">مقدرتش أحمّل الصورة، ده المحتوى الاحتياطي.</p>
</object>
```

## syntax

```html nolive
<object data="file.pdf" type="application/pdf" width="600" height="400">
  <a href="file.pdf">حمّل الملف</a>
</object>
```

- `<object ...>` — **الوسم الافتتاحي**.
- `data` — **عنوان الملف** (مش `src`).
- `type` — **نوع الملف MIME**.
- `width` و`height` — **المقاس**.
- المحتوى جواه — **بديل** لو فشل.
- `</object>` — **الوسم الختامي** إجباري.

## use

- لعرض PDF مع رابط احتياطي.
- لتضمين SVG مع بديل `<img>`.
- لتضمين محتوى مع طبقات احتياطي.

## avoid

- متستخدمهوش لصور عادية: `<img>`.
- متنساش المحتوى الاحتياطي: ده سبب استخدامه.
- متستخدمش `src`: الصح `data`.

## attributes

### data
**عنوان الملف** المراد تضمينه. لازم يتحدد `data` أو `type` على الأقل.

### type
**نوع الملف MIME**، زي `application/pdf` و`image/svg+xml` و`text/html`.

### name
**اسم الكائن**، بيستخدمه الفورم أو `target`.

### width
**عرض** الكائن بالبكسل.

### height
**ارتفاع** الكائن بالبكسل.

### form
**id لفورم** مرتبط بالكائن (لو الكائن جزء من فورم).

### usemap
**ربط بخريطة** `<map>` لتقسيم الصورة لمناطق (لما تكون الصورة).

### typemustmatch {deprecated}
كانت بتشترط تطابق النوع. **قديمة** واتشالت.

### codebase {deprecated}
كانت بتحدد مسار أساس للأبليتات. **قديمة**.

## examples

### 1) محتوى احتياطي لصورة
`fallback` للصورة.

```html
<object data="missing.png" type="image/png" width="220" height="90">
  <img alt="صورة بديلة"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='90'%3E%3Crect width='220' height='90' fill='%23e5e7eb'/%3E%3Ctext x='110' y='52' font-size='16' text-anchor='middle' fill='%236b7280'%3EFallback%3C/text%3E%3C/svg%3E">
</object>
```

- الصورة الأساسية مش موجودة، فالمتصفح عرض الـ `<img>` اللي جوه.
- ده بيخلّي `<object>` أمن في الاستخدام: دايماً في خطة بديلة.
- الـ `type` بيقول للمتصفح ينتظر صورة.

### 2) عرض SVG
تضمين ملف SVG.

```html
<object type="image/svg+xml" width="160" height="80"
  data="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80'%3E%3Cellipse cx='80' cy='40' rx='70' ry='30' fill='%23a78bfa'/%3E%3C/svg%3E">
  متصفحك مش بيعرض SVG.
</object>
```

- SVG بيتحمّل كمستند مستقل، وليه سكريبته وستايله.
- لو فشل، النص بيظهر.
- ده مفيد لو محتاج SVG تفاعلي (بسكريبت) وكمان بديل.

### 3) عرض PDF مع رابط تحميل
الاستخدام الشائع.

```html nolive
<object data="report.pdf" type="application/pdf" width="100%" height="500">
  <p>متصفحك مش بيعرض PDF. <a href="report.pdf">حمّل الملف</a></p>
</object>
```

- لو المتصفح يقدر يعرض PDF، بيعرضه.
- لو لأ (غالباً على الموبايل) بيظهر رابط التحميل.
- ده أحسن من `<embed>` اللي مالوش بديل.

### 4) احتياطي متدرّج
`object` جوه `object`.

```html
<object data="a.webm" type="video/webm" width="200" height="60">
  <object data="a.mp4" type="video/mp4" width="200" height="60">
    <p style="margin:0">مفيش فيديو مدعوم.</p>
  </object>
</object>
```

- المتصفح بيجرّب الأول، ولو فشل بيروح للي جواه.
- ده أسلوب قديم قبل `<video>` و`<source>`.
- النهارده بنستخدم `<video>` لكن الفكرة توضح قوة الاحتياطي.

### 5) تضمين صفحة HTML
زي `iframe`.

```html h=140
<object type="text/html" width="100%" height="100"
  data="data:text/html,<h3 style='font-family:sans-serif'>صفحة جوه object</h3>">
  متصفحك مش بيدعم.
</object>
```

- `<object>` ممكن يعرض صفحة HTML كاملة زي `<iframe>`.
- في الواقع `<iframe>` هو المعتمد والأسهل، وفيه `sandbox` وأمان أحسن.
- الأمثلة دي للمعرفة بس.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: عناصر [[param]] أولاً، وبعدها **محتوى احتياطي** (Transparent).
- closing: الوسم الختامي `</object>` إجباري.
- role: مفيش (أو `img` لو صورة).
- dom: `HTMLObjectElement`.
- layout: `display: inline`، Replaced Element.

## mistakes

### استخدام src بدل data
```html bad
<object src="file.pdf" type="application/pdf"></object>
```
```html good
<object data="file.pdf" type="application/pdf"></object>
```
ليه؟ `<object>` مفيهوش `src`، الصح `data`.

### نسيان المحتوى الاحتياطي
```html bad
<object data="file.pdf" type="application/pdf"></object>
```
```html good
<object data="file.pdf" type="application/pdf">
  <a href="file.pdf">حمّل الملف</a>
</object>
```
ليه؟ من غيره المستخدم هيشوف مساحة فاضية لو المتصفح مش بيعرض الملف.

## a11y

- المحتوى الاحتياطي بيمثّل البديل النصي، فاكتبه مفهوم.
- وفّر رابط تحميل مع أي ملف مضمّن.
- ممكن تضيف `aria-label` أو `title` لوصف الكائن.

## tips

- لعرض ملفات PDF النهارده بعض المتصفحات على الموبايل ما بتعرضهاش: وفّر رابط.
- لو الملف صورة، استخدم `<img>`.
- SVG بسيط؟ `<img>` أو inline SVG أحسن.

## quiz

### إيه الخاصية اللي بتحدد ملف `<object>`؟
- [ ] `src`
- [x] `data`
- [ ] `href`
- [ ] `file`
`<object>` بيستخدم `data`.

### إيه ميزة `<object>` على `<embed>`؟
- [x] محتوى احتياطي جواه
- [ ] أسرع
- [ ] أصغر
- [ ] مفيش
بيعرض المحتوى البديل لو فشل.

### إيه نوع MIME بتاع PDF؟
- [ ] `text/pdf`
- [x] `application/pdf`
- [ ] `image/pdf`
- [ ] `file/pdf`
النوع الرسمي هو `application/pdf`.

## refs

- [MDN: object](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object)
- [WHATWG: The object element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element)
