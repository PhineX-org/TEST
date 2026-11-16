---
id: row-gap
kind: property
cat: flexbox
chip: row-gap
title: المسافة بين الصفوف
en: CSS row-gap property
status: stable
support: all
size: compact
mdn: row-gap
summary: row-gap بتحدد المسافة الرأسية بين الصفوف في Grid وFlexbox (مع wrap).
keywords: row-gap, مسافة صفوف, grid, flex wrap, gap
related: gap, column-gap, grid-guide, flexbox-guide
---

## intro

الخاصية `row-gap` بتحدد **المسافة بين الصفوف** (الرأسية) في حاوية grid، أو بين سطور flex لما `flex-wrap: wrap` ومفيش غير سطر واحد مبتشوفش أثرها. هي نصف الاختصار [[gap]] (الجزء الأول)، والنصف التاني [[column-gap]]. بتقبل أطوال ونسب. استخدمها لما عايز مسافات الصفوف مختلفة عن مسافات الأعمدة.

> [!tip] مثال عملي: كروت قريبة جنب بعض أفقياً (`column-gap: 8px`) لكن بينها مسافة أكبر رأسياً (`row-gap: 24px`) علشان كل صف يبان منفصل.

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; row-gap:20px; column-gap:4px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```

## syntax

```css nolive
row-gap: 16px;
row-gap: 1rem;
row-gap: 2%;
```

- **القيمة المبدئية**: `normal`.

## values

### `<length>`
مسافة ثابتة.

### `<percentage>`
نسبة من الحاوية.

## use

- مسافة رأسية مختلفة بين الصفوف.
- أقسام فورم مرصوصة بـ grid.

## avoid

- كتابتها لو عايز نفس المسافة للاتنين (استخدم gap).

## examples

### 1) صفوف متباعدة
row-gap كبير.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; row-gap:24px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) مع column-gap
مختلفين.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; row-gap:6px; column-gap:30px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) flex wrap
بين السطور.

```html
<style>
  .f { display:flex; flex-wrap:wrap; row-gap:14px; column-gap:4px; width:150px; }
  .f div { width:60px; background:#3d7a5a; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



## mistakes

### توقع تأثير على الأعمدة

```css bad
.g { row-gap:20px; }  /* الأعمدة ملزوقة */
```

```css good
.g { gap:20px; }
```

row-gap للصفوف بس.

## quiz

### row-gap بتحدد؟
- [x] مسافة الصفوف
- [ ] مسافة الأعمدة
- [ ] العرض
- [ ] الألوان

بين الصفوف.

### اختصارها؟
- [x] gap
- [ ] margin
- [ ] padding
- [ ] inset

gap.

## refs

- [MDN: row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
