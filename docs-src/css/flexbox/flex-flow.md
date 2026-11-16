---
id: flex-flow
kind: property
cat: flexbox
chip: flex-flow
title: اختصار الاتجاه واللف
en: CSS flex-flow property
status: stable
support: all
size: compact
mdn: flex-flow
summary: flex-flow اختصار لـ flex-direction وflex-wrap في سطر واحد، مثلاً row wrap.
keywords: flex-flow, row wrap, flex-direction, flex-wrap, اختصار
related: flex-direction, flex-wrap, flexbox-guide, gap
---

## intro

`flex-flow` هي **اختصار** بيجمع [[flex-direction]] و[[flex-wrap]] في سطر واحد. بتكتب الاتجاه وبعده اللف: `flex-flow: row wrap`. وممكن تكتب واحد منهم بس: `flex-flow: column` أو `flex-flow: wrap` والتاني ياخد قيمته الافتراضية. الترتيب مش مهم. مفيدة لتقليل الكود في الحاويات الكتيرة.

> [!tip] لو كتبت `flex-flow: wrap` بس، الاتجاه هيفضل `row` (الافتراضي). ولو كتبت `column` بس، اللف هيفضل `nowrap`. فاكتب القيمتين لو عايز تتأكد من النتيجة.

## try

```html
<style>
  .f { display:flex; flex-flow:row wrap; gap:6px; width:200px; }
  .f div { flex:0 0 80px; background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```

## syntax

```css nolive
flex-flow: row wrap;
flex-flow: column;
flex-flow: wrap-reverse;
```

- **القيمة المبدئية**: `row nowrap`.

## values

### `<direction>`
row أو column وعكسهم.

### `<wrap>`
nowrap أو wrap أو wrap-reverse.

## use

- اختصار الاتجاه واللف.
- حاويات متجاوبة بسطر واحد.

## avoid

- نسيان إن القيمة المفردة بتخلي التاني افتراضي.

## examples

### 1) row wrap
صف بيلف.

```html
<style>
  .f { display:flex; flex-flow:row wrap; gap:4px; width:180px; }
  .f div { flex:0 0 70px; background:#7a4a1d; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



### 2) column
عمود فقط.

```html
<style>
  .f { display:flex; flex-flow:column; gap:4px; }
  .f div { background:#3d7a5a; color:#f3ede0; padding:6px; }
</style>
<div class="f"><div>1</div><div>2</div></div>
```



### 3) column wrap
أعمدة بتلف.

```html
<style>
  .f { display:flex; flex-flow:column wrap; gap:4px; height:90px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:6px; width:60px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



## mistakes

### فاصلة بين القيمتين

```css bad
.f { flex-flow:row, wrap; }
```

```css good
.f { flex-flow:row wrap; }
```

القيمتين بمسافة مش فاصلة.

## quiz

### flex-flow اختصار لـ؟
- [x] direction وwrap
- [ ] grow وshrink
- [ ] align وjustify
- [ ] gap

اتجاه ولف.

### الافتراضي؟
- [ ] column wrap
- [x] row nowrap
- [ ] row wrap
- [ ] nowrap

row nowrap.

## refs

- [MDN: flex-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow)
