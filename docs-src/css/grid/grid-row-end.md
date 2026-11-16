---
id: grid-row-end
kind: property
cat: grid
chip: grid-row-end
title: نهاية العنصر على الصفوف
en: CSS grid-row-end property
status: stable
support: all
size: compact
mdn: grid-row-end
summary: الخاصية grid-row-end بتحدد خط نهاية العنصر على محور الصفوف في Grid.
keywords: grid-row-end, شبكة, صف, خط, span
related: grid-row, grid-row-start, grid-area, grid-guide
---

## intro

الخاصية `grid-row-end` بتحدد **خط نهاية** العنصر على محور الصفوف في Grid. القيمة ممكن تكون **رقم خط** (`2`)، أو **اسم خط** لو سمّيته، أو **`span n`** (يمتد عدد الصفوف من الخط التاني)، أو `auto`. الأرقام بتشير **لخطوط الشبكة** مش للخلايا نفسها (3 أعمدة يعني 4 خطوط)، والأرقام السالبة بتعد من الآخر (`-1` آخر خط). غالباً هتكتبها من خلال الاختصار [[grid-row]] مع [[grid-row-start]]، أو الاختصار الأشمل [[grid-area]].

## try

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-end:2; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">grid-row-end: 2</div><div>3</div></div>
```

## syntax

```css nolive
grid-row-end: 2;
grid-row-end: span 2;
grid-row-end: -1;
grid-row-end: auto;
```

- **القيمة المبدئية**: `auto`.
- الأرقام = خطوط الشبكة.

## values

### `<line>`
رقم الخط.

### `span <n>`
امتداد عدد الصفوف.

### auto
تلقائي.

## use

- تحديد نهاية العنصر بدقة.
- استخدام span للامتداد.

## avoid

- الخلط بين رقم الخط ورقم الـصف.

## examples

### 1) رقم خط
العنصر بيبدأ/ينتهي عند خط معين.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-end:2; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div>1</div><div class="x">x</div></div>
```



### 2) span
يمتد عدد الصفوف.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-end:span 2; background:#3d7a5a !important; color:#f3ede0 !important; }
</style>
<div class="g"><div class="x">span 2</div><div>2</div><div>3</div></div>
```



### 3) مع الخط المقابل
الاتنين معاً بيحددوا الامتداد.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(4,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-start:2; grid-row-end:4; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">2-3</div></div>
```



## mistakes

### عدّ الصفوف بدل الخطوط

```css bad
.a { grid-row-start:1; grid-row-end:1; }  /* مفيش مساحة */
```

```css good
.a { grid-row-start:1; grid-row-end:3; }
```

خط النهاية لازم يكون بعد خط البداية.

## quiz

### الأرقام في grid-row-end تشير لـ؟
- [ ] الخلايا
- [x] خطوط الشبكة
- [ ] البكسل
- [ ] الأعمدة فقط

lines.

### `span 2` معناها؟
- [ ] خط رقم 2
- [x] يمتد صفين
- [ ] يخفي
- [ ] حد

امتداد.

## refs

- [MDN: grid-row-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)
