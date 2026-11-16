---
id: figure
kind: element
cat: media
tag: figure
title: عنصر الشكل التوضيحي
en: HTML figure element
status: stable
display: block
void: no
support: all
summary: بيلفّ محتوى مستقل زي صورة أو رسم أو كود أو اقتباس، ومعاه شرح اختياري في figcaption. المحتوى ده مرتبط بالنص بس ممكن يتشال أو ينقل من غير ما المعنى يتأثر.
keywords: figure, شكل, صورة مع تعليق, توضيح, figcaption, caption, رسم, كود, اقتباس, معرض صور, مستقل
related: figcaption, img, pre, blockquote, picture, table
---

## intro

كتير بنحط صورة في مقال ونكتب تحتها «شكل 1: مخطط الشبكة». أو بنعرض مثال كود ونكتب عنوانه فوقه. المحتوى ده ليه **اسم ووصف** وبيتشاور عليه من النص («زي ما في الشكل 1»)، لكنه **مستقل**: لو نقلته لآخر الصفحة أو لملحق، المقال هيفضل مفهوم. العنصر المخصوص ده هو `<figure>` (اختصار **Figure** يعني «شكل توضيحي»).

الـ `<figure>` بيلفّ **محتوى مستقل (Self-contained)** زي: صورة، رسم بياني، مثال كود، قصيدة، اقتباس، جدول، فيديو. وجواه ممكن تحط **عنصر [[figcaption]] واحد** كعنوان أو شرح للمحتوى. الـ `<figcaption>` بيكون **أول ابن أو آخر ابن** بس، مش في النص.

الفرق بينه وبين `<div>` عادي: `<figure>` **بيقول معنى**: «ده شكل توضيحي مرتبط بالمحتوى». ومحركات البحث وقارئات الشاشة بتستفيد من الدلالة دي (قارئ الشاشة بيعلن «Figure» وبيربط الشرح بالمحتوى).

متستخدمهوش لكل صورة: صور الزينة أو اللوجو أو الأيقونات مش `<figure>`. استخدمه لما يكون فيه فعلاً **تعليق أو إشارة من النص** للمحتوى ده.

> [!analogy] `<figure>` زي **لوحة في متحف** معاها كارت صغير تحتها فيه اسم اللوحة وتفاصيلها. اللوحة (المحتوى) والكارت (`figcaption`) بيتحركوا سوا لو نقلت اللوحة لغرفة تانية.

> [!key] `<figure>` = محتوى مستقل + `<figcaption>` اختياري (أول أو آخر ابن). مش لكل صورة، بس للي بيتشاور عليه ومحتاج شرح.

## try

شيل الـ `figcaption` أو غيّر نصه، وجرب تحط كود بدل الصورة.

```html
<figure style="margin:0">
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='130'%3E%3Crect width='260' height='130' rx='10' fill='%23bae6fd'/%3E%3Ccircle cx='200' cy='38' r='20' fill='%23fbbf24'/%3E%3Cpath d='M0 130 L70 50 L130 100 L180 70 L260 130Z' fill='%2316a34a'/%3E%3C/svg%3E"
    alt="جبال خضرا وشمس" width="260" height="130">
  <figcaption>شكل 1: منظر جبلي وقت الضهر</figcaption>
</figure>
```

## syntax

```html nolive
<figure>
  <img src="chart.png" alt="رسم بياني للمبيعات">
  <figcaption>شكل 1: المبيعات الشهرية</figcaption>
</figure>
```

- `<figure>` — **الحاوية**، بتلفّ المحتوى المستقل.
- المحتوى — صورة أو كود أو جدول أو أي حاجة مستقلة.
- `<figcaption>` — **الشرح** (اختياري)، أول أو آخر ابن بس.
- `</figure>` — **الوسم الختامي** إجباري.

## use

- لصورة في مقال ليها تعليق أو رقم («شكل 3»).
- لمثال كود ليه عنوان: `<figure>` فيه `<pre>` و`<figcaption>`.
- لاقتباس أو قصيدة مع اسم صاحبها.
- لجدول أو رسم بياني مستقل مع شرحه.
- لمعرض صور: كل صورة في `<figure>` بتعليقها.

## avoid

- متلفّش كل صورة في `<figure>` من غير داعي.
- متستخدمهوش للتنسيق بس: استخدم `<div>`.
- متحطش `<figcaption>` في نص المحتوى: لازم يبقى أول أو آخر ابن.
- متحطش أكتر من `<figcaption>` واحد في نفس الـ `<figure>`.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق، زي تحديد عرض الشكل أو محاذاته.

### id
لو عايز تشير للشكل من النص بـ `<a href="#fig1">`.

## examples

### 1) صورة مع تعليق
الاستخدام الأشهر.

```html
<figure style="margin:0; max-width:260px">
  <img style="width:100%; height:auto; display:block"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='120'%3E%3Crect width='260' height='120' fill='%23fde68a'/%3E%3Ctext x='130' y='70' font-size='22' text-anchor='middle'%3EDiagram%3C/text%3E%3C/svg%3E"
    alt="مخطط تجريبي أصفر">
  <figcaption>شكل 1: مخطط تجريبي</figcaption>
</figure>
```

- الصورة والتعليق بيتحركوا كوحدة واحدة.
- `<figcaption>` تحت الصورة لأنه آخر ابن.
- الـ `alt` بيوصف الصورة، والـ `figcaption` بيشرح سياقها. الاتنين مكمّلين لبعض مش بديلين.

### 2) كود مع عنوان
`<pre>` جوه figure.

```html
<figure style="margin:0">
  <figcaption style="font-weight:bold; margin-bottom:4px">ملف index.html</figcaption>
  <pre style="background:#0f172a; color:#e2e8f0; padding:12px; border-radius:8px; direction:ltr; text-align:left"><code>&lt;h1&gt;أهلاً&lt;/h1&gt;</code></pre>
</figure>
```

- هنا الـ `<figcaption>` أول ابن، وده مسموح.
- الشكل ده بيعلّم القارئ إن الكود ده «ملف» له اسم.
- `<pre>` و`<code>` بيحافظوا على المسافات ويعرضوه ككود.
- الـ `&lt;` بتتكتب بدل `<` عشان المتصفح مايفهمهاش وسم.

### 3) اقتباس مع مصدره
بدل `<cite>` العشوائي.

```html
<figure style="margin:0">
  <blockquote style="margin:0 0 6px; border-right:4px solid #39ff14; padding-right:10px">
    <p>التعليم هو أقوى سلاح تقدر تستخدمه لتغيير العالم.</p>
  </blockquote>
  <figcaption>— نيلسون مانديلا</figcaption>
</figure>
```

- `<blockquote>` للاقتباس، و`<figcaption>` بيعرض المصدر.
- ده الشكل الأنسب لاقتباس مستقل ومعاه صاحبه.
- الشرطة قبل الاسم بتبقى في الـ `figcaption` عادة.

### 4) معرض صور
أكتر من `<figure>`.

```html
<div style="display:flex; gap:10px; flex-wrap:wrap">
  <figure style="margin:0; text-align:center">
    <img width="110" height="70" alt="مربع أحمر"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='70'%3E%3Crect width='110' height='70' fill='%23fca5a5'/%3E%3C/svg%3E">
    <figcaption>أحمر</figcaption>
  </figure>
  <figure style="margin:0; text-align:center">
    <img width="110" height="70" alt="مربع أزرق"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='70'%3E%3Crect width='110' height='70' fill='%2393c5fd'/%3E%3C/svg%3E">
    <figcaption>أزرق</figcaption>
  </figure>
</div>
```

- كل صورة في `<figure>` لوحدها بتعليقها.
- `<div>` بتلفّهم وتعمل لهم تخطيط `flex`.
- `<figure>` ليه margin افتراضي كبير من المتصفح، فبنصفّره عشان الشكل يبقى مضبوط.

### 5) جدول مع عنوان
محتوى مستقل.

```html
<figure style="margin:0">
  <table border="1" cellpadding="6" style="border-collapse:collapse">
    <tr><th>الكورس</th><th>المدة</th></tr>
    <tr><td>HTML</td><td>أسبوع</td></tr>
    <tr><td>CSS</td><td>أسبوعين</td></tr>
  </table>
  <figcaption>جدول 1: مدة الكورسات</figcaption>
</figure>
```

- `<figure>` مش للصور بس. أي محتوى مستقل ينفع.
- الجدول هنا بقى له اسم ورقم نقدر نشير له من النص.
- لو الجدول ليه عنوان، فيه بديل أقرب هو `<caption>` جوه الجدول نفسه.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: **Flow content**، ومعاه [[figcaption]] اختياري واحد، لازم أول أو آخر ابن.
- closing: الوسم الختامي `</figure>` إجباري.
- role: `figure`.
- dom: `HTMLElement`.
- layout: `display: block` ومعاه margin افتراضي كبير (مسافة من الجوانب).

## mistakes

### figcaption في النص
```html bad
<figure>
  <img src="a.jpg" alt="...">
  <p>نص</p>
  <figcaption>شرح</figcaption>
  <p>نص تاني</p>
</figure>
```
```html good
<figure>
  <img src="a.jpg" alt="...">
  <figcaption>شرح</figcaption>
</figure>
```
ليه؟ الـ `<figcaption>` لازم يبقى **أول أو آخر** ابن للـ `<figure>`.

### figure لكل صورة زينة
```html bad
<figure><img src="divider.png" alt=""></figure>
```
```html good
<img src="divider.png" alt="">
```
ليه؟ صور الزينة مش محتوى مستقل ومحتاج شرح، فالـ `<figure>` هنا بيضيف دلالة غلط.

### أكتر من figcaption
```html bad
<figure>
  <img src="a.jpg" alt="...">
  <figcaption>تعليق 1</figcaption>
  <figcaption>تعليق 2</figcaption>
</figure>
```
```html good
<figure>
  <img src="a.jpg" alt="...">
  <figcaption>تعليق 1، وتعليق 2</figcaption>
</figure>
```
ليه؟ مسموح بـ `<figcaption>` واحد بس جوه كل `<figure>`.

## a11y

- قارئ الشاشة بيعلن «Figure» وبيقرا الـ `figcaption` كاسم للشكل.
- الـ `figcaption` **مكمّل** للـ `alt` مش بديل له: اكتب `alt` وصفي للصورة، و`figcaption` للسياق.
- لو الصورة معقدة (رسم بياني)، اشرحها في النص القريب أو في الـ `figcaption`.
- متكررش نفس الجملة في `alt` و`figcaption`: قارئ الشاشة هيقراها مرتين.

## tips

- اربط الشكل بالنص: حط `id` على الـ `<figure>` واعمل رابط `<a>` بيشاور عليه (`href="#fig1"`) في الجملة اللي بتذكره.
- صفّر الـ `margin` الافتراضي لو عايز تحكم أكتر في المسافات.
- ممكن تحط أكتر من صورة في `<figure>` واحد لو هما مجموعة مرتبطة.
- `<figure>` مع `<pre>` ممتاز لعرض كود مع اسم الملف.

## quiz

### أنهي مكان الصح لـ `<figcaption>` جوه `<figure>`؟
- [ ] في أي مكان
- [x] أول ابن أو آخر ابن
- [ ] جوه `<img>`
- [ ] برّه `<figure>`
لازم يكون في الطرف: الأول أو الآخر.

### إمتى نستخدم `<figure>`؟
- [ ] لكل صورة في الصفحة
- [x] لمحتوى مستقل بيتشاور عليه ومعاه شرح
- [ ] للتنسيق
- [ ] للروابط
بيدّي دلالة «شكل توضيحي».

### هل بيشترط إن جوه `<figure>` تكون صورة؟
- [x] لأ، أي محتوى مستقل زي كود أو جدول
- [ ] أيوه، صورة بس
- [ ] أيوه، فيديو بس
- [ ] مفيش محتوى مسموح
الدلالة هي «محتوى مستقل»، مش «صورة».

## refs

- [MDN: figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure)
- [WHATWG: The figure element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element)
