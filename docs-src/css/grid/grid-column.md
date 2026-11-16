---
id: grid-column
kind: property
cat: grid
chip: grid-column
title: امتداد العنصر على الأعمدة
en: CSS grid-column property
status: stable
support: all
size: compact
mdn: grid-column
summary: grid-column اختصار لـ grid-column-start وgrid-column-end: بتحدد العنصر يبدأ وينتهي عند أنهي خطوط أعمدة (أو span).
keywords: grid-column, span, عمود, امتداد, grid-column-start, grid-column-end, شبكة
related: grid-column-start, grid-column-end, grid-row, grid-area, grid-guide
---

## intro

الخاصية `grid-column` بتحدد **مكان العنصر على محور الأعمدة**، وهي اختصار لـ [[grid-column-start]] و[[grid-column-end]]. صيغتها `start / end`: `grid-column: 1 / 3` يعني العنصر من خط العمود 1 لخط العمود 3 (**يغطي عمودين**). وأسهل: **`grid-column: span 2`** = يمتد عمودين من مكانه الطبيعي. `grid-column: 1 / -1` = من أول خط لآخر خط = **كل الأعمدة** (الـ `-1` معناها آخر خط). نظيرتها للصفوف [[grid-row]]، والاختصار الشامل [[grid-area]].

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .w { grid-column:1 / -1; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div class="w">كل الأعمدة</div><div>1</div><div>2</div><div>3</div></div>
```

## syntax

```css nolive
grid-column: 2;
grid-column: 1 / 3;
grid-column: span 2;
grid-column: 1 / -1;
```

- **القيمة المبدئية**: `auto`.
- `-1` = آخر خط.

## values

### `<line>`
رقم الخط.

### `span <n>`
امتداد عدد أعمدة.

### 1 / -1
كل الأعمدة.

## use

- عنوان يغطي كل الأعمدة.
- كارت أعرض من باقي الكروت.

## avoid

- خطوط خارج الشبكة الصريحة (بتولّد أعمدة ضمنية).

## examples

### 1) span 2
عنصر ياخد عمودين.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .s { grid-column:span 2; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div class="s">span 2</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) كل الأعمدة
`1 / -1`.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .h { grid-column:1 / -1; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div class="h">رأس بعرض الشبكة</div><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) من خط لخط
عمود 2 لعمود 4.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .m { grid-column:2 / 4; background:#3d7a5a !important; color:#f3ede0 !important; }
</style>
<div class="g"><div>1</div><div class="m">2-3</div><div>4</div></div>
```



## mistakes

### عدّ الأعمدة بدل الخطوط

```css bad
.a { grid-column:1 / 2; }  /* عمود واحد فقط */
```

```css good
.a { grid-column:1 / 3; }
```

لتغطية عمودين: ابدأ 1 وانتهي 3.

## quiz

### `grid-column: span 2` معناها؟
- [ ] خط رقم 2
- [x] يمتد عمودين
- [ ] العمود الثاني
- [ ] يخفي

امتداد عمودين.

### `1 / -1` معناها؟
- [ ] أول عمود
- [x] كل الأعمدة
- [ ] آخر عمود
- [ ] لا شيء

من أول خط لآخر خط.

## refs

- [MDN: grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
