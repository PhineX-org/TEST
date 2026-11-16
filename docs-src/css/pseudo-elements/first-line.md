---
id: first-line
kind: pseudoelement
cat: pseudo-elements
chip: ::first-line
title: أول سطر
en: CSS ::first-line pseudo-element
status: stable
support: all
size: compact
mdn: ::first-line
summary: العنصر الوهمي first-line بينسّق أول سطر من النص في عنصر block. مجموعة محدودة من الخصائص مسموحة.
keywords: ::first-line, first-line, أول سطر, تنسيق صحفي
related: first-letter, selection, font, color
---

## intro

`::first-line` بتنسّق **أول سطر ظاهر من النص** داخل عنصر block (فقرة مثلاً)، وبتتحدد **ديناميكياً** حسب عرض الشاشة (لو الصندوق ضاق، السطر الأول بيقصر). مستخدمة في **التنسيق الصحفي** (أول سطر بخط أكبر أو بنمط مختلف). بتدعم **خصائص محدودة** فقط: الخط والألوان والخلفية و`text-transform` و`letter-spacing` و`word-spacing`. مبتدعمش الهوامش والأبعاد. وبتشتغل على عناصر block فقط. يعني لو غيّرت عرض النافذة، الكلام اللي بيتنسّق بيتغير معاها لأن «أول سطر» بيتحدد وقت العرض.

## try

```html
<style>
  p { margin:0; width:240px; color:#3d2c18; line-height:1.7; }
  p::first-line { font-weight:bold; color:#b5551f; font-size:1.1rem; }
</style>
<p>أول سطر من الفقرة بيتنسّق بشكل مختلف، وباقي الأسطر بتكمل عادي بدون تغيير في التنسيق.</p>
```

## syntax

```css nolive
p::first-line { font-weight: bold; color: #b5551f; }
```

- عناصر block فقط.
- خصائص محدودة.

## use

- تنسيق صحفي لأول سطر.
- تمييز بداية الفقرة.

## avoid

- استخدام خصائص غير مدعومة (margin).

## examples

### 1) أول سطر غامق
لون وسُمك.

```html
<style>
  p { margin:0; width:230px; color:#3d2c18; line-height:1.7; }
  p::first-line { font-weight:bold; color:#7a4a1d; }
</style>
<p>أول سطر من الفقرة بيبان بشكل مميز وبعدها باقي الكلام بشكل عادي.</p>
```



### 2) يتأثر بالعرض
لو الصندوق ضاق السطر يقصر.

```html
<style>
  p { margin:0; color:#3d2c18; line-height:1.7; }
  p::first-line { color:#b5551f; font-weight:bold; }
  .w { width:150px; }
</style>
<p class="w">سطر أول قصير بسبب العرض الضيق وبعده باقي الأسطر.</p>
```



### 3) حروف كبيرة
text-transform.

```html
<style>
  p { margin:0; width:220px; color:#3d2c18; line-height:1.7; direction:ltr; text-align:left; }
  p::first-line { text-transform:uppercase; letter-spacing:.05em; font-weight:bold; }
</style>
<p>First line is uppercase while the rest of the paragraph stays normal.</p>
```



## mistakes

### خصائص غير مدعومة

```css bad
p::first-line { margin-top:20px; }  /* مبتشتغلش */
```

```css good
p::first-line { font-weight:bold; }
```

الخصائص محدودة.

## quiz

### first-line بتنسّق؟
- [x] أول سطر ظاهر
- [ ] أول كلمة
- [ ] أول حرف
- [ ] أول فقرة

أول سطر.

### بتتغير مع؟
- [x] عرض الصندوق
- [ ] اللون
- [ ] الخط فقط
- [ ] لا شيء

ديناميكية.

## refs

- [MDN: ::first-line](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line)
