---
id: attr-src
kind: attribute
cat: attrs
chip: src
title: خاصية مصدر الملف
en: HTML src attribute
status: stable
support: all
mdn: Elements/img#src
summary: خاصية src بتحدد مكان الملف المراد تحميله وعرضه في img وvideo وaudio وscript وiframe وsource وtrack وinput type=image. هي «العنوان» اللي المتصفح بيجيب منه المحتوى.
keywords: src, مصدر, source, img, script, iframe, video, audio, مسار, URL, تحميل ملف, lazy, srcset
related: img, video, audio, script, iframe, attr-alt
---

## intro

لما بتحط صورة أو فيديو أو سكربت في الصفحة، المتصفح محتاج يعرف **منين يجيب الملف**. الخاصية `src` (اختصار source = المصدر) هي اللي بتقوله. قيمتها **URL** زي `href` بالظبط: مسار نسبي (`img/logo.png`) أو من الجذر (`/img/logo.png`) أو مطلق (`https://…`)، وكمان **data URI** بيحط الملف نفسه جوه الكود (مفيد للصور الصغيرة جداً).

الفرق عن [[attr-href]]: الـ `href` بتشاور على مكان **تروح له** (رابط)، والـ `src` بتشاور على ملف **بيتحمّل ويتعرض داخل الصفحة نفسها**. بتتستخدم مع [[img]] و[[video]] و[[audio]] و[[script]] و[[iframe]] و`source` و`track` و`embed`.

لو المسار غلط الصورة بتظهر مكسورة (🖼️) والسكربت مبيشتغلش، فاتأكد من الحروف الكبيرة/الصغيرة في المسار (السيرفرات بتفرّق) ومن الامتداد. ولا تنسى [[attr-alt]] مع الصور.

## try

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='70'%3E%3Crect width='120' height='70' rx='10' fill='%2338bdf8'/%3E%3Ccircle cx='60' cy='35' r='20' fill='%23fff'/%3E%3C/svg%3E" alt="مستطيل أزرق بدايرة بيضا" width="120" height="70">
<p>وعلى طول بتتحمّل من الـ URL ده.</p>
```

## syntax

```html nolive
<img src="images/logo.png" alt="الشعار">
<script src="app.js"></script>
<iframe src="https://example.com" title="موقع"></iframe>
```

- `src` — **مكان الملف اللي هيتحمّل**.
- مسار نسبي أو مطلق أو data URI.
- مع `img` ضيف `alt`، ومع `iframe` ضيف `title`.

## use

- عرض صورة أو فيديو أو صوت.
- تحميل ملف جافاسكربت.
- تضمين صفحة بـ `iframe`.
- صور inline صغيرة بـ data URI.

## avoid

- متستخدمش `src` للروابط العادية: ده `href`.
- متسيبش `src=""` فاضية (بتطلب الصفحة نفسها).

## examples

### 1) صورة بـ data URI
من غير ملف.

```html
<img alt="نقطة خضرا" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%2322c55e'/%3E%3C/svg%3E">
```

- الصورة جوه الـ URL نفسه.
- مناسب للأيقونات الصغيرة جداً.
- متستخدمهوش للصور الكبيرة (بيكبّر الصفحة).

### 2) فيديو وصوت
src في الوسائط.

```html
<video src="sample.mp4" controls width="240"></video>
<audio src="sample.mp3" controls></audio>
```

- الوسائط بتاخد `src` زي الصور.
- `controls` بيعرض أزرار التشغيل.
- للأكتر من صيغة استخدم `<source>`.

### 3) معالجة فشل التحميل
مثال على onerror.

```html
<img alt="مش موجودة" src="nope.png" onerror="this.onerror = null; this.alt = 'الصورة مش موجودة'; this.style.outline = '2px dashed red'">
```

- `onerror` بيتطلق لو التحميل فشل.
- `this.onerror = null` بيمنع التكرار.
- ممكن تحط صورة بديلة.

### 4) src ديناميكي
مثال على JS.

```html
<img id="i" alt="صورة" width="80">
<button onclick="i.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'40\'><rect width=\'80\' height=\'40\' fill=\'hsl(' + Math.round(Math.random()*360) + ',70%,60%)\'/></svg>')">غيّر الصورة</button>
```

- تغيير `src` بيحمّل صورة جديدة.
- مفيد في المعارض والـ sliders.
- استخدم `encodeURIComponent` مع data URI.

## mistakes

### مسار غلط (حروف)
```html bad
<img src="Images/Logo.PNG" alt="">
```
```html good
<img src="images/logo.png" alt="">
```
ليه؟ المسارات بتفرّق بين الكبير والصغير على أغلب السيرفرات.

### src فاضية
```html bad
<img src="" alt="صورة">
```
```html good
<img src="photo.jpg" alt="صورة">
```
ليه؟ القيمة الفاضية بتخلّي المتصفح يطلب الصفحة نفسها.

## a11y

- مع `img` لازم `alt`، ومع `iframe` لازم `title`.
- الفيديو/الصوت محتاج ترجمة ونص بديل.
- حدّد `width` و`height` عشان الصفحة متقفزش أثناء التحميل.

## quiz

### الفرق بين `src` و`href`؟
- [x] `src` بتحمّل داخل الصفحة، `href` رابط تروح له
- [ ] لا فرق
- [ ] `href` للصور فقط
- [ ] `src` للروابط
تحميل مقابل تنقّل.

### لو المسار غلط في صورة؟
- [x] بتظهر مكسورة
- [ ] بتتحمّل عادي
- [ ] الصفحة بتقف
- [ ] بتتحول لنص
وفّر alt.

### أنهي عناصر بتاخد `src`؟
- [x] `img` و`script` و`iframe`
- [ ] `a` فقط
- [ ] `p` و`div`
- [ ] `form` فقط
عناصر تحميل.

## refs

- [MDN: src](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#src)
- [WHATWG: Embedded content](https://html.spec.whatwg.org/multipage/embedded-content.html)
