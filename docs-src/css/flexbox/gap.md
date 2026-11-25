---
id: gap
kind: property
cat: flexbox
chip: gap
title: المسافة بين العناصر
en: CSS gap property
status: stable
support: all
mdn: gap
summary: gap بتحدد المسافة بين الصفوف والأعمدة في Flexbox وGrid وmulti-column. أنضف بكتير من margin علشان مبتحطش مسافة على الأطراف.
keywords: gap, row-gap, column-gap, مسافة بين العناصر, grid gap, flex gap, spacing
related: row-gap, column-gap, flexbox-guide, grid-guide, margin
---

## intro

الخاصية `gap` بتحدد **المسافة بين العناصر** جوه حاوية flex أو grid (أو multi-column)، وهي اختصار لـ [[row-gap]] (بين الصفوف) و[[column-gap]] (بين الأعمدة). `gap: 16px` = 16px للاتنين، و`gap: 10px 20px` = 10 بين الصفوف و20 بين الأعمدة.

الميزة الكبيرة عن `margin`: الـ `gap` **بتحط المسافة بين العناصر بس**، ومبتحطش أي مسافة على الأطراف الخارجية. يعني مش محتاج تعمل `:first-child` أو `:last-child` علشان تتخلص من margin زيادة. وبتشتغل **تلقائياً** مع الـ wrap وعدد الأعمدة المتغير.

قديماً كانت `grid-gap`، والاسم القديم لسه شغال، لكن `gap` هو الأحدث والأفضل. وبتدعم كل وحدات الأطوال والنسب (`%` نسبة من حجم الحاوية)، و`calc()`.

> [!analogy] `gap` زي المسافة بين الكراسي في صف: بين كل كرسي وكرسي بس، مش قبل الأول ولا بعد الأخير.

> [!tip] في Flexbox الحديث، متستخدمش margin بين العناصر. استخدم `gap`.

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:10px 20px; }
  .g div { background:#c9772f; color:#fff3e0; padding:10px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```

## syntax

```css nolive
gap: 16px;
gap: 10px 20px;      /* صف عمود */
gap: 1rem;
gap: 5%;
```

- **القيمة المبدئية**: `normal` (0 في flex/grid).
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.
- قيمة واحدة = للاتنين.

## values

### `<length>`
مسافة ثابتة `16px`.

### `<percentage>`
نسبة من حجم الحاوية.

### `<row> <column>`
قيمتين: صفوف ثم أعمدة.

### normal
الافتراضي (صفر في flex/grid).

## use

- مسافات بين كروت Grid.
- مسافات بين أزرار/وسوم في Flex.
- بديل نظيف عن margin.

## avoid

- الجمع بين gap وmargin لنفس الغرض.
- نسيان إن gap بين العناصر بس (مش حوالين الحاوية).

## examples

### 1) gap في flex
مسافات متساوية بدون margin.

```html
<style>
  .f { display:flex; gap:12px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:10px 16px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



### 2) gap في grid
صفوف وأعمدة بمسافات مختلفة.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:8px 24px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:10px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) gap مع wrap
المسافات بتفضل ثابتة مهما نزلت العناصر.

```html
<style>
  .f { display:flex; flex-wrap:wrap; gap:8px; width:200px; }
  .f div { background:#c9772f; color:#fff3e0; padding:8px 14px; }
</style>
<div class="f"><div>HTML</div><div>CSS</div><div>JS</div><div>Python</div><div>React</div></div>
```



### 4) مقارنة مع margin
الـ margin بيعمل مسافة زيادة على الأطراف، gap لأ.

```html
<style>
  .a, .b { display:flex; background:#efe0bd; margin-bottom:8px; }
  .a div { margin:6px; background:#e4a090; color:#3d2c18; padding:6px; }
  .b { gap:12px; } .b div { background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="a"><div>margin</div><div>margin</div></div><div class="b"><div>gap</div><div>gap</div></div>
```



## mistakes

### margin بدل gap

```css bad
.item { margin-right:10px; }  /* آخر عنصر بيعمل مسافة زيادة */
```

```css good
.parent { display:flex; gap:10px; }
```

gap بتحط المسافة بين العناصر بس.

### gap على عنصر عادي

```css bad
.box { gap:10px; }  /* مفيش أثر لو display:block */
```

```css good
.box { display:flex; gap:10px; }
```

لازم الحاوية flex أو grid.

## quiz

### gap بتشتغل في؟
- [ ] block
- [x] flex وgrid
- [ ] inline
- [ ] table فقط

Flexbox وGrid.

### gap:10px 20px معناها؟
- [x] صف 10 وعمود 20
- [ ] عمود 10 وصف 20
- [ ] 10 للكل
- [ ] 20 للكل

row ثم column.

### الميزة عن margin؟
- [ ] أسرع
- [x] مفيش مسافة على الأطراف
- [ ] ألوان
- [ ] أقوى

بين العناصر بس.

## refs

- [MDN: gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
