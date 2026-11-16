---
id: column-gap
kind: property
cat: flexbox
chip: column-gap
title: المسافة بين الأعمدة
en: CSS column-gap property
status: stable
support: all
size: compact
mdn: column-gap
summary: column-gap بتحدد المسافة الأفقية بين الأعمدة في Grid وFlexbox وmulti-column.
keywords: column-gap, مسافة اعمدة, grid, flex, multi-column, gap
related: gap, row-gap, columns, grid-guide
---

## intro

الخاصية `column-gap` بتحدد **المسافة بين الأعمدة** (الأفقية) في grid وflex، وكمان في **multi-column** ([[columns]]) حيث بتحدد المسافة بين الأعمدة النصية (والافتراضي هناك `1em`). هي نصف الاختصار [[gap]] (الجزء التاني)، ونصفه الأول [[row-gap]]. بتقبل أطوال ونسب.

> [!tip] لو عايز نفس المسافة للاتجاهين اكتب `gap` وخلاص؛ واستخدم `column-gap` لما تحتاج المسافة الأفقية لوحدها فقط.

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr 1fr; column-gap:24px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```

## syntax

```css nolive
column-gap: 16px;
column-gap: 2rem;
column-gap: normal;
```

- **القيمة المبدئية**: `normal` (0 في flex/grid، 1em في columns).

## values

### `<length>`
مسافة ثابتة.

### normal
الافتراضي.

## use

- مسافة أفقية بين أعمدة Grid.
- مسافة بين أعمدة النص.

## avoid

- استخدامها لو المسافتين نفس القيمة (استخدم gap).

## examples

### 1) أعمدة متباعدة
column-gap كبير.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr 1fr; column-gap:30px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



### 2) في flex
مسافة بين العناصر.

```html
<style>
  .f { display:flex; column-gap:20px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:8px 14px; }
</style>
<div class="f"><div>1</div><div>2</div></div>
```



### 3) في multi-column
مسافة بين أعمدة النص.

```html
<style>
  .t { columns:2; column-gap:40px; background:#efe0bd; color:#3d2c18; padding:8px; line-height:1.8; }
</style>
<div class="t">نص بيتقسّم على عمودين بمسافة واسعة بينهم. كمّل الكلام لحد ما يظهر العمود التاني.</div>
```



## mistakes

### توقع تأثير على الصفوف

```css bad
.g { column-gap:20px; }  /* الصفوف ملزوقة */
```

```css good
.g { gap:20px; }
```

column-gap للأعمدة فقط.

## quiz

### column-gap بتحدد؟
- [ ] مسافة الصفوف
- [x] مسافة الأعمدة
- [ ] الحد
- [ ] الحجم

بين الأعمدة.

### بتشتغل في multi-column؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط grid

أيوه.

## refs

- [MDN: column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
