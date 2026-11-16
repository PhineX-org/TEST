---
id: embed
kind: element
cat: embedded
tag: embed
title: عنصر التضمين
en: HTML embed element
status: stable
display: inline
void: yes
support: all
size: compact
summary: عنصر embed بيضمّن محتوى خارجي زي PDF أو SVG أو وسائط في الصفحة. بياخد المصدر في src والنوع في type. ملوش محتوى بديل، فالأفضل غالباً object أو img أو iframe.
keywords: embed, تضمين, plugin, pdf, svg, src, type, flash, محتوى خارجي, object
related: object, iframe, img, video
---

## intro

الـ `<embed>` عنصر قديم نسبياً كان مخصوص لتضمين **المحتوى اللي بيحتاج إضافة (Plugin)** زي Flash. دلوقتي الإضافات ماتت، لكن العنصر لسه بيشتغل مع **ملفات PDF** و**SVG** وأنواع وسائط يعرفها المتصفح. هو **عنصر فاضي (Void)** من غير وسم قفل ومن غير محتوى بديل، وده أكبر عيب فيه.

بياخد `src` (الملف) و`type` (نوع الملف MIME) و`width` و`height`. ولأنه من غير محتوى احتياطي لو فشل التحميل، الأفضل في أغلب الحالات: [[img]] للصور، [[video]] و[[audio]] للوسائط، [[iframe]] للصفحات، و[[object]] لما تحتاج محتوى احتياطي.

> [!key] `<embed src type>` لتضمين ملف خارجي، لكن غالباً تلاقي بديل أنسب.

## try

```html
<embed
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23fde68a'/%3E%3Ctext x='100' y='58' font-size='22' text-anchor='middle'%3EEmbed%3C/text%3E%3C/svg%3E"
  type="image/svg+xml" width="200" height="100">
```

## syntax

```html nolive
<embed src="file.pdf" type="application/pdf" width="600" height="400">
```

- `<embed ...>` — وسم **واحد بس**، ومفيش `</embed>`.
- `src` — **عنوان الملف**.
- `type` — **نوع الملف MIME**.
- `width` و`height` — **المقاس**.

## use

- لعرض ملف PDF جوه الصفحة.
- لتضمين SVG أو وسائط يفهمها المتصفح.

## avoid

- متستخدمهوش لـ Flash أو Java: ماتوا.

## attributes

### src {required}
**عنوان الملف** المراد تضمينه.

### type
**نوع الملف MIME** مثل `application/pdf`. بيساعد المتصفح يختار المعالج الصح.

### width
**عرض** المحتوى بالبكسل.

### height
**ارتفاع** المحتوى بالبكسل.

## examples

### 1) تضمين PDF
الاستخدام الشائع.

```html nolive
<embed src="report.pdf" type="application/pdf" width="100%" height="500">
```

- المتصفح بيعرض الـ PDF بالمشغّل المدمج بتاعه.
- الموبايل أحياناً مبيعرضوش، فوفّر رابط تحميل.
- ده مناسب لعرض سريع بدون تحميل.

### 2) تضمين SVG
صورة متجهية.

```html
<embed
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80'%3E%3Ccircle cx='40' cy='40' r='30' fill='%23f97316'/%3E%3Crect x='90' y='15' width='55' height='50' fill='%2338bdf8'/%3E%3C/svg%3E"
  type="image/svg+xml" width="160" height="80">
```

- SVG بيتعرض كمحتوى مضمّن.
- لكن `<img>` أبسط وأسرع لصور SVG العادية.
- `<embed>` ليه فايدة لو محتاج SVG تفاعلي بسكريبته.

### 3) رابط احتياطي بجانبه
لأن مفيش محتوى بديل.

```html nolive
<embed src="report.pdf" type="application/pdf" width="100%" height="400">
<p><a href="report.pdf">لو مظهرش، حمّل الملف من هنا</a></p>
```

- بما إن `<embed>` مالوش محتوى احتياطي، بنحط رابط جنبه.
- ده بيضمن إن المستخدم يوصل للملف لو مفيش مشغّل.
- لو محتاج احتياطي مدمج استخدم `<object>`.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **مفيش**. عنصر فاضي (Void).
- closing: **مفيش وسم قفل**.
- role: `generic` (أو `presentation`).
- dom: `HTMLEmbedElement`.
- layout: `display: inline`.

## mistakes

### محتوى جوه embed
```html bad
<embed src="a.pdf">لو ما اشتغلش اضغط هنا</embed>
```
```html good
<object data="a.pdf" type="application/pdf">لو ما اشتغلش اضغط هنا</object>
```
ليه؟ `<embed>` عنصر فاضي، أي محتوى جواه بيتجاهل. للاحتياطي استخدم `<object>`.

## a11y

- من غير محتوى بديل لازم توفّر رابط أو نص قريب للملف.
- أضف `title` أو `aria-label` يوصف المضمّن.

## tips

- لو بتبني حاجة جديدة، فكّر الأول في `<iframe>` أو `<object>` أو `<img>`.
- دايماً اكتب `type` عشان المتصفح مايخمّنش.

## quiz

### إيه عيب `<embed>` الأساسي؟
- [ ] بطيء
- [x] مالوش محتوى احتياطي
- [ ] مش بيدعم PDF
- [ ] ملوش `src`
عنصر فاضي، فمفيش fallback.

### إمتى تفضّل `<object>` على `<embed>`؟
- [x] لما تحتاج محتوى بديل لو فشل التحميل
- [ ] لما تعوز صورة
- [ ] لما تعوز نص
- [ ] أبداً
`<object>` بيقبل محتوى احتياطي جواه.

## refs

- [MDN: embed](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed)
- [WHATWG: The embed element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element)
