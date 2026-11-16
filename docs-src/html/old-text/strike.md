---
id: strike
kind: element
cat: old-text
tag: strike
title: الشطب القديم (strike)
en: HTML strike element (deprecated)
status: deprecated
display: inline
void: no
support: all
size: compact
summary: عنصر strike كان بيشطب النص بخط في النص. اتحذف، والبديل s للنص اللي ما بقاش صحيح أو del للمحذوف مع تتبّع التعديل، أو CSS text-decoration line-through.
keywords: strike, شطب, خط في النص, line-through, s, del, قديم, deprecated, محذوف, تنسيق
related: s, del, ins, b
---

## intro

`<strike>` (و`<s>` اختصاره القديم) كان بيرسم خط في نص الكلام: «~~500~~». استخدامه الأشهر: شطب السعر القديم في عروض التخفيضات. اتحذف `<strike>` من HTML5 لأنه تنسيق بحت، وفضل `<s>` لكن بمعنى جديد: **«محتوى لم يعد صحيحاً أو ذا صلة»**.

والاختيار بحسب المعنى: [[s]] لسعر قديم أو معلومة ما بقتش صالحة، و[[del]] لنص اتحذف من مستند بتتبّع التعديلات (مع `<ins>` للإضافة). ولو الغرض شكلي بحت: CSS `text-decoration: line-through`.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<strike>` اتحذف. استخدم `<s>` لمعلومة قديمة، أو `<del>` لحذف موثّق، أو CSS للشكل.

## try

```html
<p>السعر: <strike>500</strike> 350 جنيه</p>
```

## syntax

```html nolive
<strike>نص مشطوب</strike>
```

- `<strike>` — **الوسم الافتتاحي** (قديم).
- النص — **اللي بيتشطب**.
- `</strike>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة.
- لفهم الفرق بين `s` و`del`.

## avoid

- متستخدمهوش: `<s>` أو `<del>` بحسب المعنى.

## instead

استخدم [[s]] لمعلومة ما بقتش صالحة (زي سعر قديم)، و[[del]] لحذف موثّق، أو `text-decoration: line-through` للشكل فقط.

```html
<p>السعر: <s>500</s> 350 جنيه</p>
```

## examples

### 1) سعر قبل وبعد
s بدل strike.

```html
<p>القديم: <strike>500</strike> 350</p>
<p>الحديث: <s>500</s> 350</p>
```

- الاتنين بيرسموا خط في نص الرقم.
- `<s>` معناه «ما بقاش صحيح» وده بالظبط معنى السعر القديم.
- الانتقال مباشر: غيّر الاسم.

### 2) حذف موثّق
del مع ins.

```html
<p>الموعد: <del datetime="2026-10-01">الأحد</del> <ins datetime="2026-10-02">الاثنين</ins></p>
```

- `<del>` للنص المحذوف، و`<ins>` للنص المضاف.
- `datetime` بيسجّل وقت التعديل (اختياري).
- مناسب لسجل تعديلات المستند.

### 3) الشطب الشكلي
CSS فقط.

```html
<style>.gone { text-decoration: line-through; color:#94a3b8 }</style>
<p class="gone">خطوة مكتملة</p>
```

- لو الشطب للشكل بس (مهمة اتعملت في قايمة) استخدم CSS.
- مفيش معنى دلالي مطلوب هنا.
- ممكن تخفّض اللون مع الشطب لتأثير أوضح.

## mistakes

### استخدام strike للسعر
```html bad
<strike>500</strike> 350
```
```html good
<s>500</s> 350
```
ليه؟ `<strike>` محذوف من المعيار، و`<s>` بنفس المعنى.

## quiz

### إيه البديل الأنسب لشطب سعر قديم؟
- [x] `<s>`
- [ ] `<u>`
- [ ] `<mark>`
- [ ] `<ins>`
معلومة ما بقتش صالحة.

### إيه العنصر لحذف موثّق مع تاريخ؟
- [x] `<del>`
- [ ] `<s>`
- [ ] `<b>`
- [ ] `<em>`
مع `<ins>` لتتبع التعديل.

## refs

- [MDN: strike](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strike)
