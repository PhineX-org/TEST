---
id: acronym
kind: element
cat: old-text
tag: acronym
title: الاختصار القديم (acronym)
en: HTML acronym element (deprecated)
status: deprecated
display: inline
void: no
support: all
size: compact
summary: عنصر acronym كان بيعرّف اختصارات زي HTML وNASA مع شرحها في title. اتشال من HTML5 وحلّ محله abbr اللي بيعمل نفس الشغل للاختصارات كلها.
keywords: acronym, اختصار, abbr, title, HTML4, قديم, deprecated, NASA, مختصر
related: abbr, dfn, cite, small
---

## intro

في HTML4 كان فيه عنصرين شبه بعض: `<abbr>` للاختصارات العادية (زي «د.» و«كم») و`<acronym>` للاختصارات اللي بتتنطق ككلمة (زي NASA وراديو «ليزر»). التفرقة دي كانت مربكة ومحدش كان بيلتزم بيها، فـ HTML5 شالت `<acronym>` وخلّت `<abbr>` هو الوحيد لكل أنواع الاختصارات.

المتصفحات لسه بتعرض `<acronym>` عادي (بتحط خط منقّط تحته وبتظهر الشرح في `title` لما تقف عليه بالماوس)، لكنه **مش جزء من المعيار** ومحذوف من المواصفات. لو لقيته في كود قديم، بدّله بـ `<abbr>` وخلاص: نفس الشكل ونفس الخاصية ونفس المعنى.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<acronym title="…">` اتحذف. استخدم `<abbr title="…">` لكل الاختصارات.

## try

```html
<p>موقعنا مبني بـ <acronym title="HyperText Markup Language">HTML</acronym>.</p>
```

## syntax

```html nolive
<acronym title="الشرح الكامل">NASA</acronym>
```

- `<acronym>` — **الوسم الافتتاحي** (قديم).
- `title` — **الشرح الكامل** للاختصار.
- `</acronym>` — **الوسم الختامي**.

## use

- موجود في كود قديم محتاج تفهمه أو تحدّثه.
- للتعرّف على الفرق بين HTML4 وHTML5.

## avoid

- متكتبوش في أي كود جديد: `<abbr>` هو الصح.

## instead

استخدم `<abbr>` مع `title` لأي اختصار. هو بيشتغل بنفس الشكل في كل المتصفحات وبيتفهم من قارئات الشاشة ومحركات البحث.

```html
<p>موقعنا مبني بـ <abbr title="HyperText Markup Language">HTML</abbr>.</p>
```

## examples

### 1) القديم والحديث
نفس النتيجة بعنصرين.

```html
<p>القديم: <acronym title="National Aeronautics and Space Administration">NASA</acronym></p>
<p>الحديث: <abbr title="National Aeronautics and Space Administration">NASA</abbr></p>
```

- الاتنين بيظهروا بخط منقّط والشرح بيطلع عند الوقوف بالماوس.
- الفرق الوحيد إن `<acronym>` اتشال من المعيار و`<abbr>` هو الباقي.
- الانتقال سهل: غيّر اسم الوسم بس.

### 2) تنسيق الاختصار
بـ CSS.

```html
<style>
  abbr { text-decoration: underline dotted; cursor: help; }
</style>
<p>الـ <abbr title="Cascading Style Sheets">CSS</abbr> بتنسّق الصفحة.</p>
```

- `text-decoration: underline dotted` بيرسم الخط المنقّط بنفسك.
- `cursor: help` بيغيّر شكل المؤشر لعلامة استفهام.
- ده بيشتغل على `<abbr>` وعلى أي عنصر تاني.

## mistakes

### استخدام acronym في صفحة جديدة
```html bad
<acronym title="Hypertext Markup Language">HTML</acronym>
```
```html good
<abbr title="HyperText Markup Language">HTML</abbr>
```
ليه؟ العنصر محذوف من المعيار وممكن يتشال من المتصفحات في أي وقت.

## quiz

### إيه بديل `<acronym>` الحديث؟
- [x] `<abbr>`
- [ ] `<small>`
- [ ] `<cite>`
- [ ] `<dfn>`
الـ `<abbr>` بيغطي كل الاختصارات.

### هل `<acronym>` لسه جزء من HTML5؟
- [ ] أيوه
- [x] لأ، اتحذف
- [ ] أيوه بشروط
- [ ] مش معروف
اتشال من المواصفات.

## refs

- [MDN: acronym](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/acronym)
