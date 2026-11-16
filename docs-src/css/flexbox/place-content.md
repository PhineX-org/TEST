---
id: place-content
kind: property
cat: flexbox
chip: place-content
title: اختصار توزيع المحتوى
en: CSS place-content property
status: stable
support: all
size: compact
mdn: place-content
summary: place-content اختصار لـ align-content وjustify-content. place-content:center بتوسّط المحتوى كله في الحاوية.
keywords: place-content, center, align-content, justify-content, اختصار, توزيع
related: align-content, justify-content, place-items, grid-guide
---

## intro

`place-content` هي اختصار لـ [[align-content]] و[[justify-content]]: القيمة الأولى للرأسي، والتانية للأفقي (ولو واحدة بتتطبق على الاتنين). بتوزّع **مجموعة المحتوى كلها** (الصفوف والأعمدة أو السطور) جوه الحاوية، مش كل عنصر في خليته ([[place-items]] بتعمل ده). `place-content: center` بتوسّط الشبكة/المحتوى كله في الحاوية.

> [!note] لو الشبكة بتملا الحاوية كلها (`1fr`) مش هتشوف أي أثر للخاصية دي، لأن مفيش مساحة فاضية تتوزّع.

## try

```html
<style>
  .g { display:grid; grid-template-columns:60px 60px; place-content:center; gap:6px; height:110px; background:#efe0bd; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div></div>
```

## syntax

```css nolive
place-content: center;
place-content: space-between center;
place-content: start;
```

- **القيمة المبدئية**: `normal`.

## values

### center
وسط.

### space-between
أطراف ومسافات.

### `<align> <justify>`
قيمتين.

## use

- توسيط شبكة أصغر من حاويتها.
- توزيع سطور وأعمدة معاً.

## avoid

- خلطها مع place-items.

## examples

### 1) توسيط الشبكة
الشبكة كلها في نص الحاوية.

```html
<style>
  .g { display:grid; grid-template-columns:50px 50px; gap:4px; place-content:center; height:100px; background:#efe0bd; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) space-between
الأطراف.

```html
<style>
  .g { display:grid; grid-template-columns:50px 50px; place-content:space-between; height:100px; background:#efe0bd; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) في flex متعدد السطور
التوزيع على السطور.

```html
<style>
  .f { display:flex; flex-wrap:wrap; place-content:center; height:100px; width:130px; background:#bcd4a8; gap:4px; }
  .f div { width:50px; background:#c9772f; color:#fff3e0; padding:6px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



## mistakes

### الخلط مع place-items

```css bad
.g { place-content:center; }  /* يوسّط المجموعة مش كل خلية */
```

```css good
.g { place-items:center; }
```

content للمجموعة، items لكل خلية.

## quiz

### place-content بتوزّع؟
- [ ] عنصر واحد
- [x] المحتوى كله في الحاوية
- [ ] الألوان
- [ ] الحدود

المجموعة.

### اختصار لـ؟
- [x] align/justify-content
- [ ] align/justify-items
- [ ] gap
- [ ] order

content.

## refs

- [MDN: place-content](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content)
