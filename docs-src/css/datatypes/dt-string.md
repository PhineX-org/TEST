---
id: dt-string
kind: datatype
cat: datatypes
chip: <string>
title: نوع القيمة string: النصوص
en: CSS <string> data type
status: stable
support: all
size: compact
mdn: string
summary: نوع string هو نص بين علامات تنصيص مفردة أو مزدوجة: content: "★" وquotes وfont-family: "Cairo".
keywords: string, نص, content, quotes, تنصيص
related: content, fn-attr, at-charset
---

## intro

النوع `<string>` هو **نص** بين علامات تنصيص (`"..."` أو `'...'`). بيستخدم في [[content]] (`content: "★ "`) وفي `quotes` وفي أسماء الخطوط اللي فيها مسافات (`font-family: "Times New Roman"`) وفي `@import "file.css"` و`list-style-type: "✓ "`. الهروب: لو النص فيه علامة التنصيص نفسها استخدم `\` قبلها، أو بدّل النوع. ولطباعة رموز خاصة اكتب كود يونيكود بعد `\`: `content: "\2605"` (★)، وده مفيد لرموز الأيقونات. وعلامة سطر جديد `\A` مع `white-space: pre`. تخيّل النص زي «شنطة» بتحط فيها الكلام بين علامتين تنصيص، وبعد كده CSS بتطلّعه زي ما هو.

## try

```html
<style>
  .a::before { content:"★ "; color:#c9772f; }
  .b::before { content:"\2713 "; color:#3d7a5a; font-weight:bold; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<p class="a">نص بنجمة</p><p class="b">نص بعلامة صح</p>
```

## syntax

```css nolive
content: "★ ";
content: "\2605";        /* كود يونيكود */
font-family: "Times New Roman", serif;
quotes: "«" "»";
```

- تنصيص مفرد أو مزدوج.
- `\\` لكود يونيكود.

## use

- نص جوه content.
- أسماء خطوط بمسافات.

## avoid

- نسيان التنصيص.

## examples

### 1) content
نص مولّد.

```html
<style>
  .a::before { content:"★ "; color:#c9772f; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<p class="a">نص بنجمة</p>
```



### 2) كود يونيكود
رمز بكود.

```html
<style>
  .b::before { content:"\2713 "; color:#3d7a5a; font-weight:bold; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<p class="b">علامة صح</p>
```



### 3) quotes
علامات اقتباس عربية.

```html
<style>
  q { quotes:"«" "»"; color:#7a4a1d; font-weight:bold; }
</style>
<q>اقتباس</q>
```



## mistakes

### بدون تنصيص

```css bad
content: ★;  /* غلط */
```

```css good
content: "★";
```

النص بين تنصيص.

## quiz

### النص في CSS بين؟
- [x] علامات تنصيص
- [ ] أقواس
- [ ] شرطات
- [ ] مفيش

" أو '.

### الرمز بالكود؟
- [x] \2605
- [ ] 2605
- [ ] #2605
- [ ] &2605

backslash.

## refs

- [MDN: `<string>`](https://developer.mozilla.org/en-US/docs/Web/CSS/string)
