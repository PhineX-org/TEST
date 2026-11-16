---
id: place-items
kind: property
cat: flexbox
chip: place-items
title: اختصار محاذاة العناصر
en: CSS place-items property
status: stable
support: all
size: compact
mdn: place-items
summary: place-items اختصار لـ align-items وjustify-items. place-items:center بتوسّط كل الأبناء رأسياً وأفقياً في Grid.
keywords: place-items, center, توسيط, grid, align-items, justify-items, اختصار
related: align-items, justify-items, place-content, place-self
---

## intro

`place-items` هي **اختصار** بيجمع [[align-items]] و[[justify-items]]: القيمة الأولى للرأسي (align) والتانية للأفقي (justify)، ولو كتبت قيمة واحدة بتتطبق على الاتنين. أشهر استخدام: **`display: grid; place-items: center`** = **أسهل توسيط في CSS** (أفقي ورأسي) بسطرين. بتشتغل كمان في Flexbox (الجزء بتاع align). الاختصارات الشقيقة [[place-content]] و[[place-self]].

> [!tip] أقصر توسيط في CSS: `display: grid; place-items: center`.

## try

```html
<style>
  .c { display:grid; place-items:center; height:100px; background:#efe0bd; }
  .c div { background:#7a4a1d; color:#f3ede0; padding:10px 20px; }
</style>
<div class="c"><div>في النص</div></div>
```

## syntax

```css nolive
place-items: center;
place-items: start end;
place-items: stretch;
```

- **القيمة المبدئية**: `normal`.
- `align justify`.

## values

### center
توسيط كامل.

### `<align> <justify>`
قيمتين: رأسي ثم أفقي.

## use

- توسيط كامل بسطرين.
- محاذاة موحدة لخلايا Grid.

## avoid

- توقع سلوك justify في Flexbox.

## examples

### 1) توسيط كامل
أشهر حيلة.

```html
<style>
  .c { display:grid; place-items:center; height:100px; background:#bcd4a8; }
  .c span { background:#7a4a1d; color:#f3ede0; padding:8px 18px; }
</style>
<div class="c"><span>وسط</span></div>
```



### 2) قيمتين
رأسي start وأفقي end.

```html
<style>
  .c { display:grid; place-items:start end; height:90px; background:#efe0bd; }
  .c span { background:#c9772f; color:#fff3e0; padding:6px 14px; }
</style>
<div class="c"><span>ركن</span></div>
```



### 3) عدة خلايا
كل خلية بتوسّط ما جواها.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; place-items:center; gap:6px; background:#efe0bd; padding:6px; height:90px; }
  .g span { background:#3d7a5a; color:#f3ede0; padding:6px 14px; }
</style>
<div class="g"><span>1</span><span>2</span></div>
```



## mistakes

### نسيان display:grid

```css bad
.c { place-items:center; }
```

```css good
.c { display:grid; place-items:center; }
```

محتاج حاوية grid/flex.

## quiz

### place-items:center بتعمل؟
- [ ] أفقي بس
- [ ] رأسي بس
- [x] توسيط كامل
- [ ] لا شيء

align + justify.

### اختصار لـ؟
- [ ] align-content و justify-content
- [x] align-items و justify-items
- [ ] gap
- [ ] order

items.

## refs

- [MDN: place-items](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)
