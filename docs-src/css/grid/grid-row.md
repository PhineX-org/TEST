---
id: grid-row
kind: property
cat: grid
chip: grid-row
title: امتداد العنصر على الصفوف
en: CSS grid-row property
status: stable
support: all
size: compact
mdn: grid-row
summary: grid-row اختصار لـ grid-row-start وgrid-row-end: بتحدد العنصر يبدأ وينتهي عند أنهي خطوط صفوف (أو span).
keywords: grid-row, span, صف, امتداد, grid-row-start, grid-row-end, شبكة
related: grid-row-start, grid-row-end, grid-column, grid-area, grid-guide
---

## intro

الخاصية `grid-row` هي نظيرة [[grid-column]] لكن على **محور الصفوف**، واختصار لـ [[grid-row-start]] و[[grid-row-end]]. `grid-row: 1 / 3` = من خط الصف 1 لخط الصف 3 (**يغطي صفين**)، و`grid-row: span 2` = يمتد صفين من مكانه. و`grid-row: 1 / -1` = كل الصفوف. مفيدة لعمل **كارت طويل** أو **جانبي بيمتد على صفوف**. والاختصار الشامل [[grid-area]].

> [!tip] لو عايز كارت يطلع أطول من جيرانه استخدم `grid-row: span 2`، وهيتحط تلقائي في أول مكان متاح.

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .t { grid-row:span 2; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div class="t">طويل</div><div>1</div><div>2</div></div>
```

## syntax

```css nolive
grid-row: 2;
grid-row: 1 / 3;
grid-row: span 2;
grid-row: 1 / -1;
```

- **القيمة المبدئية**: `auto`.

## values

### `<line>`
رقم الخط.

### `span <n>`
امتداد عدد صفوف.

### 1 / -1
كل الصفوف.

## use

- كارت طويل يغطي صفين.
- جانبي بارتفاع كل الشبكة.

## avoid

- خطوط خارج الشبكة (بتولّد صفوف ضمنية).

## examples

### 1) span 2
يمتد صفين.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .t { grid-row:span 2; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div class="t">صفين</div><div>1</div><div>2</div></div>
```



### 2) كل الصفوف
جانبي بارتفاع الشبكة.

```html
<style>
  .g { display:grid; grid-template-columns:60px 1fr; grid-template-rows:repeat(3,32px); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .s { grid-row:1 / -1; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div class="s">جانب</div><div>1</div><div>2</div><div>3</div></div>
```



### 3) من صف لصف
صف 2 لصف 4.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:repeat(4,28px); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:4px; text-align:center; }
  .m { grid-row:2 / 4; grid-column:2; background:#3d7a5a !important; color:#f3ede0 !important; }
</style>
<div class="g"><div>1</div><div class="m">2-3</div></div>
```



## mistakes

### عدّ الصفوف بدل الخطوط

```css bad
.a { grid-row:1 / 2; }  /* صف واحد */
```

```css good
.a { grid-row:1 / 3; }
```

لتغطية صفين: 1 / 3.

## quiz

### `grid-row: span 2` معناها؟
- [ ] الصف الثاني
- [x] يمتد صفين
- [ ] يخفي
- [ ] صف واحد

امتداد.

### `1 / -1` على الصفوف؟
- [ ] أول صف
- [x] كل الصفوف
- [ ] آخر صف
- [ ] لا شيء

كل الصفوف.

## refs

- [MDN: grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
