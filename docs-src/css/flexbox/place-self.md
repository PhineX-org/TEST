---
id: place-self
kind: property
cat: flexbox
chip: place-self
title: اختصار محاذاة عنصر
en: CSS place-self property
status: stable
support: all
size: compact
mdn: place-self
summary: place-self اختصار لـ align-self وjustify-self. place-self:center بتوسّط ابن واحد في خليته.
keywords: place-self, center, align-self, justify-self, اختصار, توسيط عنصر
related: align-self, justify-self, place-items, grid-guide
---

## intro

`place-self` هي اختصار لـ [[align-self]] و[[justify-self]]: الأولى للرأسي والتانية للأفقي (ولو واحدة بتتطبق على الاتنين). بتتحط على **ابن واحد** في Grid علشان تعدّل محاذاته جوه خليته بغض النظر عن [[place-items]] على الحاوية. `place-self: center` بتوسّطه رأسياً وأفقياً.

> [!tip] لو عايز كل الأبناء يتوسّطوا حط `place-items: center` على الحاوية، ولو عايز واحد بس استخدم `place-self`. وهي مفيدة جداً لتوسيط أيقونة أو زر جوه كارت من غير حاوية إضافية.

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; height:100px; background:#efe0bd; padding:6px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:8px; }
  .x { place-self:center; background:#3d7a5a !important; }
</style>
<div class="g"><div>عادي</div><div class="x">وسط</div></div>
```

## syntax

```css nolive
place-self: center;
place-self: end start;
place-self: stretch;
```

- **القيمة المبدئية**: `auto`.

## values

### center
وسط.

### `<align> <justify>`
قيمتين.

## use

- استثناء محاذاة عنصر في Grid.
- توسيط عنصر واحد في خليته.

## avoid

- وضعها على الحاوية.

## examples

### 1) توسيط عنصر
واحد في نص الخلية.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; height:90px; background:#efe0bd; padding:6px; }
  .g div { background:#c9772f; color:#fff3e0; padding:6px; }
  .c { place-self:center; }
</style>
<div class="g"><div>1</div><div class="c">2</div></div>
```



### 2) ركن
أسفل-يمين.

```html
<style>
  .g { display:grid; height:90px; background:#efe0bd; padding:6px; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:6px; place-self:end; }
</style>
<div class="g"><div>ركن</div></div>
```



### 3) يغلب place-items
الحاوية start وواحد center.

```html
<style>
  .g { display:grid; place-items:start; grid-template-columns:1fr 1fr; gap:6px; height:90px; background:#efe0bd; padding:6px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; }
  .z { place-self:center; }
</style>
<div class="g"><div>start</div><div class="z">center</div></div>
```



## mistakes

### على الحاوية

```css bad
.g { place-self:center; }
```

```css good
.g { place-items:center; }
```

place-self للأبناء.

## quiz

### place-self بتأثر على؟
- [ ] الحاوية
- [x] ابن واحد
- [ ] الكل
- [ ] الصفحة

الابن.

### اختصار لـ؟
- [x] align/justify-self
- [ ] align/justify-items
- [ ] gap
- [ ] flex

self.

## refs

- [MDN: place-self](https://developer.mozilla.org/en-US/docs/Web/CSS/place-self)
