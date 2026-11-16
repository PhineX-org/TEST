---
id: grid-row-start
kind: property
cat: grid
chip: grid-row-start
title: بداية العنصر على الصفوف
en: CSS grid-row-start property
status: stable
support: all
size: compact
mdn: grid-row-start
summary: الخاصية grid-row-start بتحدد خط بداية العنصر على محور الصفوف في Grid.
keywords: grid-row-start, شبكة, صف, خط, span
related: grid-row, grid-row-end, grid-area, grid-guide
---

## intro

الخاصية `grid-row-start` بتحدد **خط بداية** العنصر على محور الصفوف في Grid. القيمة ممكن تكون **رقم خط** (`2`)، أو **اسم خط** لو سمّيته، أو **`span n`** (يمتد عدد الصفوف من الخط التاني)، أو `auto`. الأرقام بتشير **لخطوط الشبكة** مش للخلايا نفسها (3 أعمدة يعني 4 خطوط)، والأرقام السالبة بتعد من الآخر (`-1` آخر خط). غالباً هتكتبها من خلال الاختصار [[grid-row]] مع [[grid-row-end]]، أو الاختصار الأشمل [[grid-area]].

## try

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-start:2; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">grid-row-start: 2</div><div>3</div></div>
```

## syntax

```css nolive
grid-row-start: 2;
grid-row-start: span 2;
grid-row-start: -1;
grid-row-start: auto;
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

- تحديد بداية العنصر بدقة.
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
  .x { grid-row-start:2; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div>1</div><div class="x">x</div></div>
```



### 2) span
يمتد عدد الصفوف.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); grid-auto-columns:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-row-start:span 2; background:#3d7a5a !important; color:#f3ede0 !important; }
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

### الأرقام في grid-row-start تشير لـ؟
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

- [MDN: grid-row-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)
