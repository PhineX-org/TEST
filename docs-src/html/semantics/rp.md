---
id: rp
kind: element
cat: semantics
tag: rp
title: عنصر أقواس الـ ruby (rp)
en: HTML ruby fallback parenthesis element
status: stable
display: none
void: no
support: all
size: compact
summary: عنصر rp بيحط أقواس حوالين نص ruby الصغير، لكنها مخفية في المتصفحات اللي بتدعم ruby، وبتظهر بس في المتصفحات القديمة عشان المعنى ماضيعش.
keywords: rp, ruby parenthesis, أقواس, fallback, بديل, ruby, rt, توافق
related: ruby, rt
---

## intro

الـ `<ruby>` بيعرض النص الصغير فوق النص الأساسي، لكن في المتصفحات القديمة اللي **مش بتفهم ruby** هيظهر النص الصغير ملزوق في النص الأساسي من غير أي فصل: «漢字kanji» وده مش مفهوم. هنا بيجي دور `<rp>` (**Ruby Parenthesis**: أقواس ruby): بنحط جواه قوس فتح وقوس إغلاق حوالين `<rt>`.

في المتصفحات **الحديثة** الـ `<rp>` **مخفي تماماً** (`display: none`) فمبتشوفش الأقواس والنص الصغير بيظهر فوق. وفي المتصفحات **القديمة** اللي بتتجاهل `<ruby>` الأقواس بتظهر، فتشوف «漢字(kanji)» وده مفهوم. يعني `<rp>` هو **شبكة أمان** (Fallback).

الشكل الكامل: `<ruby>الأساس<rp>(</rp><rt>الشرح</rt><rp>)</rp></ruby>`. والمتصفحات الحالية كلها بتدعم ruby، فالـ `<rp>` بقى أقل أهمية، لكنه لسه مفيد للتوافق ولأدوات تانية بتعرض النص بدون تنسيق (زي قارئات الصفحات المبسّطة).

> [!key] `<rp>(</rp>` قبل `<rt>` و`<rp>)</rp>` بعده. مخفي في الحديث، ظاهر في القديم.

## try

```html
<p style="font-size:28px; line-height:2.4">
  <ruby>
    HTML<rp>(</rp><rt>إتش تي إم إل</rt><rp>)</rp>
  </ruby>
</p>
```

## syntax

```html nolive
<ruby>
  الأساس<rp>(</rp><rt>الشرح</rt><rp>)</rp>
</ruby>
```

- `<rp>(</rp>` — قوس افتتاحي.
- `<rt>…</rt>` — النص الصغير.
- `<rp>)</rp>` — قوس ختامي.

## use

- مع كل `<ruby>` عشان التوافق مع القديم.
- لما الصفحة بتتعرض في أدوات بتشيل التنسيق.

## avoid

- متحطش جواه نص غير الأقواس.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) الشكل الكامل
مع الأقواس.

```html
<p style="font-size:28px; line-height:2.4">
  <ruby>漢字<rp>(</rp><rt>kanji</rt><rp>)</rp></ruby>
</p>
```

- في متصفح حديث بتشوف «kanji» فوق الكلمة من غير أقواس.
- الأقواس في الكود بس للأمان.
- لو الأقواس ظهرت يبقى المتصفح بيتجاهل ruby.

### 2) محاكاة المتصفح القديم
نخلّي `<ruby>` عادي لنشوف الأقواس.

```html
<style>
  ruby, rt { display: inline; }
  rp { display: inline; }
</style>
<p style="font-size:24px">
  <ruby>漢字<rp>(</rp><rt>kanji</rt><rp>)</rp></ruby>
</p>
```

- لما رجّعنا `rp` لـ `inline` ظهرت الأقواس.
- ده اللي بيحصل في متصفح قديم: المعنى لسه مفهوم بفضل الأقواس.

### 3) أقواس مخصصة
ممكن تستخدم رموز تانية.

```html
<p style="font-size:28px; line-height:2.4">
  <ruby>Cairo<rp> [</rp><rt>القاهرة</rt><rp>] </rp></ruby>
</p>
```

- مفيش إلزام إنها أقواس عادية: ممكن أقواس مربعة.
- الأهم إنها بتفصل بين الأساسي والنطق في القديم.

## rules

- parents: `<ruby>`.
- children: نص فقط (عادةً قوس).
- closing: الوسم الختامي `</rp>` (يفضّل تكتبه).
- role: `generic`.
- dom: `HTMLElement`.
- layout: `display: none`.

## mistakes

### rp لشرح
```html bad
<ruby>HTML<rp>لغة ترميز</rp><rt>نطق</rt></ruby>
```
```html good
<ruby>HTML<rp>(</rp><rt>إتش تي إم إل</rt><rp>)</rp></ruby>
```
ليه؟ الـ `<rp>` للأقواس فقط والشرح في `<rt>`.

## a11y

- مخفي، فقارئ الشاشة بيتجاهله.
- مفيد لأدوات القراءة اللي بتشيل التنسيق.

## tips

- استخدمه دايماً مع الـ `<ruby>` الأساسية.
- متحطش مسافات زيادة جواه.

## quiz

### فين بيظهر `<rp>` فعلياً؟
- [ ] في كل المتصفحات
- [x] في المتصفحات اللي مش بتدعم ruby
- [ ] في الموبايل بس
- [ ] مش بيظهر خالص
مخفي في الداعمة.

### إيه الشكل الصح؟
- [x] `<rp>(</rp><rt>…</rt><rp>)</rp>`
- [ ] `<rp>…</rp>` بس
- [ ] `<rt>(</rt>`
- [ ] `<ruby>(</ruby>`
أقواس حوالين `<rt>`.

## refs

- [MDN: rp](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rp)
- [WHATWG: The rp element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-rp-element)
