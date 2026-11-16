---
id: dt
kind: element
cat: lists
tag: dt
title: مصطلح الوصف (dt)
en: HTML description term element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر dt هو المصطلح أو الاسم أو السؤال جوه قايمة الوصف dl، وبييجي قبل عنصر dd اللي بيحتوي التعريف أو القيمة أو الجواب.
keywords: dt, description term, مصطلح, اسم, سؤال, dl, dd, glossary, قاموس
related: dl, dd, dfn, li
---

## intro

الـ `<dt>` (**Description Term**) هو **النص الأول** في الزوج داخل `<dl>`: المصطلح في القاموس، أو اسم الخاصية في مواصفات منتج، أو السؤال في FAQ. بييجي دايماً قبل `<dd>` اللي بيشرحه. المتصفح بيعرضه بدون إزاحة (على عكس `<dd>` اللي بيتزاح).

بيقبل جواه **Flow content** لكن **من غير عناصر الأقسام والعناوين** (`<header>` و`<footer>` و`<h1>` وغيرهم). غالباً هتحط نص بسيط أو `<dfn>` أو `<strong>`. وممكن تحط أكتر من `<dt>` ورا بعض لنفس `<dd>` (أكتر من اسم لنفس القيمة).

> [!key] `<dt>` = المصطلح/الاسم/السؤال. بييجي قبل `<dd>` وجوه `<dl>`.

## try

```html
<dl>
  <dt><dfn>API</dfn></dt>
  <dd>واجهة برمجية بتخلّي برنامجين يتكلموا.</dd>
</dl>
```

## syntax

```html nolive
<dl>
  <dt>المصطلح</dt>
  <dd>التعريف</dd>
</dl>
```

- `<dt>` — **الوسم الافتتاحي**.
- `</dt>` — **الوسم الختامي** (ممكن يتحذف لكن اكتبه).

## use

- لمصطلح في قاموس.
- لاسم خاصية في مواصفات.
- لسؤال في قايمة FAQ.

## avoid

- متحطش جواه عناوين أو أقسام.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) مصطلح بسيط
زوج عادي.

```html
<dl>
  <dt>مبرمج</dt>
  <dd>شخص بيكتب كود.</dd>
</dl>
```

- `<dt>` هو الكلمة، و`<dd>` شرحها.
- الشكل افتراضياً: الكلمة من غير إزاحة والشرح بإزاحة.

### 2) أكتر من dt لنفس dd
أسماء متعددة لقيمة واحدة.

```html
<dl>
  <dt>HTML</dt>
  <dt>HyperText Markup Language</dt>
  <dd>لغة ترميز بتبني الصفحات.</dd>
</dl>
```

- اسمين لنفس الشيء، وتعريف واحد.
- ده مسموح ومفيد للاختصار والاسم الكامل.

### 3) تنسيق dt
شكل مميز.

```html
<style>
  dt { font-weight: bold; color: #0ea5e9; margin-top: 8px; }
  dd { margin: 0 20px 0 0; color: #475569; }
</style>
<dl>
  <dt>CSS</dt><dd>لغة التنسيق.</dd>
  <dt>JS</dt><dd>لغة التفاعل.</dd>
</dl>
```

- لوّنا المصطلحات بالأزرق وخليناها بخط عريض عشان تبان.
- أزحنا التعريفات `<dd>` على جنب وخلينا لونها رمادي هادي.
- التنسيق كله بالـ CSS، والـ HTML فضل زي ما هو.

## rules

- parents: `<dl>` (أو `<div>` جوه `<dl>`).
- children: **Flow content** (من غير `<header>` و`<footer>` وعناوين وأقسام).
- closing: الوسم الختامي `</dt>` (يفضّل تكتبه).
- role: `term`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### dt برّه dl
```html bad
<dt>مصطلح</dt>
```
```html good
<dl><dt>مصطلح</dt><dd>تعريف</dd></dl>
```
ليه؟ لازم جوه `<dl>`.

## a11y

- دور `term` بيساعد قارئ الشاشة يفهم إن النص ده مصطلح له تعريف.
- خلّي كل `<dt>` ملازم لـ `<dd>` بعده عشان العلاقة تبان في شجرة الإتاحة.

## tips

- استخدم `<dfn>` جوه `<dt>` في القواميس.

## quiz

### فين بيتحط `<dt>`؟
- [ ] جوه `<ul>`
- [x] جوه `<dl>`
- [ ] جوه `<ol>`
- [ ] برّه
جوه قايمة الوصف.

### إيه علاقته بـ `<dd>`؟
- [x] المصطلح وبعده التعريف
- [ ] نفس الشيء
- [ ] بعد `<dd>`
- [ ] مفيش
`<dt>` قبل `<dd>`.

## refs

- [MDN: dt](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dt)
- [WHATWG: The dt element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dt-element)
