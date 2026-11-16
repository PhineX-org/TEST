---
id: grid-column-end
kind: property
cat: grid
chip: grid-column-end
title: نهاية العنصر على الأعمدة
en: CSS grid-column-end property
status: stable
support: all
size: compact
mdn: grid-column-end
summary: الخاصية grid-column-end بتحدد خط نهاية العنصر على محور الأعمدة في Grid.
keywords: grid-column-end, شبكة, عمود, خط, span
related: grid-column, grid-column-start, grid-area, grid-guide
---

## intro

الخاصية `grid-column-end` بتحدد **خط نهاية** العنصر على محور الأعمدة في Grid. القيمة ممكن تكون **رقم خط** (`2`)، أو **اسم خط** لو سمّيته، أو **`span n`** (يمتد عدد الأعمدة من الخط التاني)، أو `auto`. الأرقام بتشير **لخطوط الشبكة** مش للخلايا نفسها (3 أعمدة يعني 4 خطوط)، والأرقام السالبة بتعد من الآخر (`-1` آخر خط). غالباً هتكتبها من خلال الاختصار [[grid-column]] مع [[grid-column-start]]، أو الاختصار الأشمل [[grid-area]].

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-column-end:2; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">grid-column-end: 2</div><div>3</div></div>
```

## syntax

```css nolive
grid-column-end: 2;
grid-column-end: span 2;
grid-column-end: -1;
grid-column-end: auto;
```

- **القيمة المبدئية**: `auto`.
- الأرقام = خطوط الشبكة.

## values

### `<line>`
رقم الخط.

### `span <n>`
امتداد عدد الأعمدة.

### auto
تلقائي.

## use

- تحديد نهاية العنصر بدقة.
- استخدام span للامتداد.

## avoid

- الخلط بين رقم الخط ورقم الـعمود.

## examples

### 1) رقم خط
العنصر بيبدأ/ينتهي عند خط معين.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-column-end:2; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div>1</div><div class="x">x</div></div>
```



### 2) span
يمتد عدد الأعمدة.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-column-end:span 2; background:#3d7a5a !important; color:#f3ede0 !important; }
</style>
<div class="g"><div class="x">span 2</div><div>2</div><div>3</div></div>
```



### 3) مع الخط المقابل
الاتنين معاً بيحددوا الامتداد.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:34px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; text-align:center; }
  .x { grid-column-start:2; grid-column-end:4; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">2-3</div></div>
```



## mistakes

### عدّ الأعمدة بدل الخطوط

```css bad
.a { grid-column-start:1; grid-column-end:1; }  /* مفيش مساحة */
```

```css good
.a { grid-column-start:1; grid-column-end:3; }
```

خط النهاية لازم يكون بعد خط البداية.

## quiz

### الأرقام في grid-column-end تشير لـ؟
- [ ] الخلايا
- [x] خطوط الشبكة
- [ ] البكسل
- [ ] الأعمدة فقط

lines.

### `span 2` معناها؟
- [ ] خط رقم 2
- [x] يمتد عمودين
- [ ] يخفي
- [ ] حد

امتداد.

## refs

- [MDN: grid-column-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)
