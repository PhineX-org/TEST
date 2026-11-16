---
id: justify-self
kind: property
cat: flexbox
chip: justify-self
title: محاذاة عنصر أفقياً في خليته
en: CSS justify-self property
status: stable
support: all
size: compact
mdn: justify-self
summary: justify-self بتحدد محاذاة ابن واحد أفقياً جوه خليته في Grid، بتغلب justify-items الحاوية.
keywords: justify-self, grid, محاذاة افقية, استثناء, center, end
related: justify-items, align-self, place-self, grid-guide
---

## intro

الخاصية `justify-self` بتتحط على **ابن واحد** في Grid، وبتحدد **محاذاته أفقياً جوه خليته**، متجاهلة [[justify-items]] اللي على الحاوية. القيم: `auto`، `stretch`، `start`، `end`، `center`. ومفيش `justify-self` في Flexbox (بتستخدم هوامش `auto`). الاختصار مع `align-self` هو [[place-self]]، وللمحاذاة الرأسية [[align-self]].

> [!tip] في Flexbox مفيش `justify-self`، فاستخدم `margin-inline-start: auto` علشان تدفع عنصر لآخر الصف. وبتشتغل `justify-self` على العناصر اللي بتتمدّد جوه خلية، فلو الخلية ضيقة على قد العنصر مش هتشوف فرق.

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:8px; }
  .x { justify-self:end; background:#3d7a5a !important; }
</style>
<div class="g"><div>عادي</div><div class="x">end</div></div>
```

## syntax

```css nolive
justify-self: auto;
justify-self: center;
justify-self: end;
justify-self: stretch;
```

- **القيمة المبدئية**: `auto`.
- للـ Grid.

## values

### center
وسط الخلية.

### end
نهاية الخلية.

### start
بداية الخلية.

### stretch
يملأ.

## use

- استثناء محاذاة عنصر واحد في Grid.
- تجاوز justify-items.

## avoid

- استخدامها في Flexbox.

## examples

### 1) end لعنصر
عنصر بس في آخر الخلية.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; width:fit-content; }
  .e { justify-self:end; }
</style>
<div class="g"><div>1</div><div class="e">2</div></div>
```



### 2) center لعنصر
واحد وسط.

```html
<style>
  .g { display:grid; grid-template-columns:1fr; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:8px; width:fit-content; }
  .c { justify-self:center; }
</style>
<div class="g"><div>عادي</div><div class="c">وسط</div></div>
```



### 3) يغلب justify-items
الحاوية start لكن واحد end.

```html
<style>
  .g { display:grid; grid-template-columns:1fr; justify-items:start; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; width:fit-content; }
  .z { justify-self:end; }
</style>
<div class="g"><div>start</div><div class="z">end</div></div>
```



## mistakes

### على الحاوية

```css bad
.g { justify-self:center; }
```

```css good
.g { justify-items:center; }
```

justify-self للأبناء.

## quiz

### justify-self بتأثر على؟
- [ ] الحاوية
- [x] ابن واحد
- [ ] كل الأبناء
- [ ] الصفحة

الابن نفسه.

### متاحة في Flexbox؟
- [ ] أيوه
- [x] لأ (Grid)
- [ ] أحياناً
- [ ] فقط column

للـ Grid.

## refs

- [MDN: justify-self](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self)
