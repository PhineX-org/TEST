---
id: grid-auto-rows
kind: property
cat: grid
chip: grid-auto-rows
title: ارتفاع الصفوف التلقائية
en: CSS grid-auto-rows property
status: stable
support: all
size: compact
mdn: grid-auto-rows
summary: grid-auto-rows بتحدد ارتفاع الصفوف اللي بتتولد تلقائياً (خارج grid-template-rows)، مثلاً minmax(100px, auto).
keywords: grid-auto-rows, صفوف تلقائية, implicit rows, minmax, auto, شبكة
related: grid-template-rows, grid-auto-columns, grid-auto-flow, grid-guide
---

## intro

لما محتواك بيزيد عن الصفوف اللي عرّفتها بـ [[grid-template-rows]] (أو مفيش تعريف أصلاً)، المتصفح بيولّد **صفوف ضمنية (implicit)** تلقائياً، وارتفاعها افتراضياً `auto` (على قد المحتوى). الخاصية `grid-auto-rows` بتحدد **ارتفاع الصفوف دي**: مثلاً `grid-auto-rows: 100px` = كل صف جديد 100px، أو `minmax(100px, auto)` = 100px على الأقل ويكبر مع المحتوى. مفيدة جداً للشبكات الديناميكية (قوائم منتجات). والمقابل للأعمدة [[grid-auto-columns]].

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(2,1fr); grid-auto-rows:minmax(40px,auto); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2<br>سطرين</div><div>3</div><div>4</div></div>
```

## syntax

```css nolive
grid-auto-rows: 100px;
grid-auto-rows: minmax(80px, auto);
grid-auto-rows: auto;
```

- **القيمة المبدئية**: `auto`.

## values

### `<length>`
ارتفاع ثابت للصفوف الجديدة.

### minmax()
حد أدنى ويكبر.

### auto
حسب المحتوى.

## use

- قوائم منتجات ديناميكية.
- كروت بحد أدنى للارتفاع.

## avoid

- ارتفاع ثابت صغير مع محتوى متغير.

## examples

### 1) ارتفاع ثابت
كل الصفوف 40px.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(2,1fr); grid-auto-rows:40px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 2) minmax
حد أدنى 40px ويكبر.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(2,1fr); grid-auto-rows:minmax(40px,auto); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="g"><div>1</div><div>سطر<br>سطر<br>سطر</div><div>3</div></div>
```



### 3) مع rows صريحة
الأول صريح والباقي تلقائي.

```html
<style>
  .g { display:grid; grid-template-columns:1fr; grid-template-rows:50px; grid-auto-rows:30px; gap:4px; }
  .g div { background:#7a4a1d; color:#f3ede0; display:grid; place-items:center; }
</style>
<div class="g"><div>صريح 50</div><div>تلقائي 30</div><div>تلقائي 30</div></div>
```



## mistakes

### توقع إن template-rows تحكم الباقي

```css bad
.g { grid-template-rows:50px; }  /* الباقي auto */
```

```css good
.g { grid-template-rows:50px; grid-auto-rows:50px; }
```

الصفوف الإضافية محتاجة grid-auto-rows.

## quiz

### grid-auto-rows بتتحكم في؟
- [ ] الصفوف الصريحة
- [x] الصفوف الضمنية
- [ ] الأعمدة
- [ ] الخطوط

implicit rows.

### الافتراضي؟
- [ ] 0
- [x] auto
- [ ] 1fr
- [ ] none

auto.

## refs

- [MDN: grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
