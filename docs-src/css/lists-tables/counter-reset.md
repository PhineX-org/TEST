---
id: counter-reset
kind: property
cat: lists-tables
chip: counter-reset
title: تصفير العدّاد
en: CSS counter-reset property
status: stable
support: all
size: compact
mdn: counter-reset
summary: counter-reset بتنشئ عدّاد CSS وتبدأه من رقم معين (الافتراضي صفر). جزء من ترقيم العناوين والخطوات بدون HTML.
keywords: counter-reset, عداد, counter, ترقيم, css counters
related: counter-increment, content, fn-counter, list-style-type
---

## intro

الخاصية `counter-reset` بتنشئ **عدّاد CSS** (متغير رقمي مخفي) وبتحدد **قيمته الابتدائية** (الافتراضي 0): `counter-reset: step;` أو `counter-reset: step 5;`. بتتحط على **الحاوية** اللي عايز تعدّ جواها (زي `body` أو `ol`). وبعدها [[counter-increment]] بتزوّد العداد على كل عنصر، و[[content]] مع `counter(step)` بتعرضه. ثلاثتهم مع بعض هما نظام **الترقيم التلقائي**: ترقيم عناوين (1.، 1.1) أو خطوات أو بطاقات. وتقدر تعمل أكتر من عدّاد: `counter-reset: h2 h3;`.

## try

```html
<style>
  .l { counter-reset: step; }
  .l p { counter-increment: step; margin:4px 0; color:#3d2c18; }
  .l p::before { content:"خطوة " counter(step) ": "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>افتح الملف</p><p>اكتب الكود</p><p>جرّب</p></div>
```

## syntax

```css nolive
body { counter-reset: section; }
ol { counter-reset: item 5; }
.x { counter-reset: a b; }
```

- **القيمة المبدئية**: `none`.
- على الحاوية.

## values

### `<name>`
اسم العدّاد (والبداية صفر).

### `<name> <number>`
اسم وقيمة البداية.

### none
بدون.

## use

- ترقيم خطوات وعناوين.
- أكتر من عدّاد.

## avoid

- نسيان التصفير فتكمل الأرقام من قسم لقسم تاني.

## examples

### 1) ترقيم خطوات
الأساسي.

```html
<style>
  .l { counter-reset: s; }
  .l p { counter-increment: s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s) ". "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>أول خطوة</p><p>تاني خطوة</p><p>تالت خطوة</p></div>
```



### 2) بداية من 5
قيمة ابتدائية.

```html
<style>
  .l { counter-reset: s 4; }
  .l p { counter-increment: s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s) ". "; color:#3d7a5a; font-weight:bold; }
</style>
<div class="l"><p>تبدأ من 5</p><p>6</p></div>
```



### 3) تصفير لكل قسم
عدّاد متكرر.

```html
<style>
  section { counter-reset: n; margin:4px 0; padding:6px; background:#efe0bd; color:#3d2c18; border-radius:8px; }
  section p { counter-increment: n; margin:2px 0; }
  section p::before { content:counter(n) "- "; color:#b5551f; }
</style>
<section><p>أ</p><p>ب</p></section><section><p>أ</p><p>ب</p></section>
```



## mistakes

### نسيان التصفير

```css bad
/* مفيش counter-reset */
```

```css good
.l { counter-reset: s; }
```

يبدأ من 0 ويكمل.

## quiz

### counter-reset بتعمل؟
- [x] تنشئ العدّاد وتحدد بدايته
- [ ] تزوّده
- [ ] تعرضه
- [ ] تخفيه

تنشئه.

### البداية الافتراضية؟
- [x] 0
- [ ] 1
- [ ] -1
- [ ] 10

صفر.

## refs

- [MDN: counter-reset](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset)
