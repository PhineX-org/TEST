---
id: dd
kind: element
cat: lists
tag: dd
title: تعريف الوصف (dd)
en: HTML description details element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر dd هو التعريف أو القيمة أو الجواب جوه قايمة الوصف dl، وبييجي بعد dt، وبيتعرض بإزاحة افتراضياً، وبيقبل أي محتوى Flow.
keywords: dd, description details, تعريف, قيمة, جواب, dl, dt, glossary, إزاحة
related: dl, dt, dfn, li
---

## intro

الـ `<dd>` (**Description Details**) هو **الشرح** اللي بييجي بعد المصطلح `<dt>` جوه `<dl>`: تعريف الكلمة، قيمة الخاصية، جواب السؤال. المتصفح بيعرضه **بإزاحة** (margin من الجنب، 40px افتراضياً) عشان يبان إنه تابع للمصطلح اللي قبله.

وعلى عكس `<dt>`، الـ `<dd>` بيقبل **أي Flow content**: فقرات وقوايم وصور وروابط وحتى `<dl>` متداخلة. يعني تعريف طويل بفقرتين أو قايمة نقاط في الجواب، كله مسموح. وممكن يبقى لـ `<dt>` واحد أكتر من `<dd>`.

> [!key] `<dd>` = التعريف/القيمة/الجواب. بعد `<dt>`، وبإزاحة، وبيقبل أي محتوى.

## try

```html
<dl>
  <dt>HTML</dt>
  <dd>
    <p>لغة ترميز الويب.</p>
    <ul><li>بتبني الهيكل</li><li>بتتجاور مع CSS</li></ul>
  </dd>
</dl>
```

## syntax

```html nolive
<dl>
  <dt>المصطلح</dt>
  <dd>التعريف</dd>
</dl>
```

- `<dd>` — **الوسم الافتتاحي**.
- `</dd>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لتعريف مصطلح.
- لقيمة خاصية.
- لجواب سؤال.

## avoid

- متحطش `<dd>` من غير `<dt>` قبله.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) تعريف بسيط
نص عادي.

```html
<dl>
  <dt>DOM</dt>
  <dd>تمثيل الصفحة كشجرة من العناصر.</dd>
</dl>
```

- التعريف بيظهر بإزاحة تحت المصطلح.
- ده الشكل الأساسي.

### 2) تعريف متعدد الفقرات
محتوى غني.

```html
<dl>
  <dt>الإنترنت</dt>
  <dd><p>شبكة عالمية من الأجهزة.</p><p>بتتصل ببعض عبر بروتوكولات.</p></dd>
</dl>
```

- `<dd>` فيه فقرتين `<p>`، ومسموح لأنه بيقبل Flow content.
- ده مفيد للشرح الطويل اللي محتاج تقسيمه لأجزاء.
- تقدر كمان تحط جواه قايمة أو صورة أو رابط.

### 3) إلغاء الإزاحة
بالـ CSS.

```html
<style>
  dd { margin: 0; padding-right: 0; }
</style>
<dl>
  <dt>الاسم</dt><dd>أحمد</dd>
  <dt>المدينة</dt><dd>القاهرة</dd>
</dl>
```

- شلنا الإزاحة الافتراضية.
- الأزواج دلوقتي ملزوقة تحت بعض.

## rules

- parents: `<dl>` (أو `<div>` جوه `<dl>`).
- children: **Flow content**.
- closing: الوسم الختامي `</dd>` (يفضّل تكتبه).
- role: `definition`.
- dom: `HTMLElement`.
- layout: `display: block`، و`margin-inline-start: 40px`.

## mistakes

### dd من غير dt
```html bad
<dl><dd>تعريف</dd></dl>
```
```html good
<dl><dt>مصطلح</dt><dd>تعريف</dd></dl>
```
ليه؟ كل `<dd>` لازم يبقى له `<dt>`.

## a11y

- دور `definition` بيساعد قارئ الشاشة يعرف إن النص ده تعريف للمصطلح اللي قبله.
- لو حطيت جواه قوايم أو فقرات، هتتقرا زي أي محتوى عادي جوه التعريف.

## tips

- اشرح بجمل كاملة.
- متحطش محتوى طويل جداً.

## quiz

### إيه المحتوى المسموح في `<dd>`؟
- [ ] نص بس
- [x] أي Flow content
- [ ] `<li>` بس
- [ ] مفيش
بيقبل فقرات وقوايم وغيرهم.

### إيه الإزاحة الافتراضية؟
- [x] بتتحط على اليمين/البداية
- [ ] مفيش
- [ ] فوق
- [ ] تحت
`margin-inline-start: 40px`.

## refs

- [MDN: dd](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dd)
- [WHATWG: The dd element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dd-element)
