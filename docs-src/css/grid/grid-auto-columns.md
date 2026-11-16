---
id: grid-auto-columns
kind: property
cat: grid
chip: grid-auto-columns
title: عرض الأعمدة التلقائية
en: CSS grid-auto-columns property
status: stable
support: all
size: compact
mdn: grid-auto-columns
summary: grid-auto-columns بتحدد عرض الأعمدة اللي بتتولد تلقائياً (خارج grid-template-columns)، خصوصاً مع grid-auto-flow:column.
keywords: grid-auto-columns, اعمدة تلقائية, implicit columns, minmax, auto-flow column
related: grid-template-columns, grid-auto-rows, grid-auto-flow, grid-guide
---

## intro

الخاصية `grid-auto-columns` بتحدد **عرض الأعمدة الضمنية (implicit)** اللي بتتولد تلقائياً، سواء لأن عناصرك زادت عن [[grid-template-columns]] أو لأنك مستخدم `grid-auto-flow: column` ([[grid-auto-flow]]). مثلاً `grid-auto-columns: 100px` = كل عمود جديد 100px، أو `minmax(100px, 1fr)`. بتُستخدم كتير في **السلايدرات الأفقية** (عناصر في صف واحد بتتمدد بالعرض). والمقابل للصفوف [[grid-auto-rows]].

> [!tip] لو عايز كل الأعمدة الجديدة تتقسّم المساحة بالتساوي استخدم `grid-auto-columns: 1fr`.

## try

```html
<style>
  .g { display:grid; grid-auto-flow:column; grid-auto-columns:70px; gap:4px; overflow-x:auto; }
  .g div { background:#c9772f; color:#fff3e0; padding:10px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

## syntax

```css nolive
grid-auto-columns: 100px;
grid-auto-columns: minmax(100px, 1fr);
grid-auto-columns: auto;
```

- **القيمة المبدئية**: `auto`.

## values

### `<length>`
عرض ثابت للأعمدة الجديدة.

### minmax()
حد أدنى ويتمدد.

### auto
حسب المحتوى.

## use

- سلايدر أفقي بـ auto-flow:column.
- أعمدة ديناميكية.

## avoid

- عرض ثابت صغير مع محتوى متغير.

## examples

### 1) سلايدر أفقي
أعمدة تلقائية بعرض ثابت.

```html
<style>
  .g { display:grid; grid-auto-flow:column; grid-auto-columns:80px; gap:4px; overflow-x:auto; width:220px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:10px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) أعمدة متساوية
`1fr` للأعمدة الجديدة.

```html
<style>
  .g { display:grid; grid-auto-flow:column; grid-auto-columns:1fr; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



### 3) مع أعمدة صريحة
الأول صريح والباقي تلقائي.

```html
<style>
  .g { display:grid; grid-template-columns:80px; grid-auto-flow:column; grid-auto-columns:50px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div>صريح</div><div>2</div><div>3</div></div>
```



## mistakes

### نسيان auto-flow

```css bad
.g { grid-auto-columns:80px; }  /* مفيش أعمدة تلقائية */
```

```css good
.g { grid-auto-flow:column; grid-auto-columns:80px; }
```

الأعمدة الضمنية بتتولد مع flow:column أو لما العناصر تعدّي الصريحة.

## quiz

### grid-auto-columns بتتحكم في؟
- [ ] الأعمدة الصريحة
- [x] الأعمدة الضمنية
- [ ] الصفوف
- [ ] الخط

implicit columns.

### أشهر استخدام؟
- [x] سلايدر أفقي
- [ ] طباعة
- [ ] جداول
- [ ] خطوط

مع auto-flow:column.

## refs

- [MDN: grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
