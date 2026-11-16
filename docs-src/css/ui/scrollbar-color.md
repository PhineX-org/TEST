---
id: scrollbar-color
kind: property
cat: ui
chip: scrollbar-color
title: لون شريط التمرير
en: CSS scrollbar-color property
status: stable
support: all
size: compact
mdn: scrollbar-color
summary: scrollbar-color بتلوّن شريط التمرير: لون المقبض ولون المسار. مثلاً scrollbar-color: #c9772f #efe0bd.
keywords: scrollbar-color, لون الشريط, thumb, track
related: scrollbar-width, color-scheme, accent-color
---

## intro

الخاصية `scrollbar-color` بتلوّن شريط التمرير بقيمتين: **لون المقبض (thumb)** ثم **لون المسار (track)**: `scrollbar-color: #c9772f #efe0bd;`. القيمة `auto` (الافتراضي) بيستخدم ألوان النظام. بتتحط على العنصر ذو `overflow` (أو `html` للصفحة كلها) وبتتوارث. وهي الطريقة **القياسية** الحديثة بدل `::-webkit-scrollbar` القديمة. مفيدة لتتماشى ألوان الشريط مع ثيم الموقع الدافئ (dusk/paper/sepia)، ومع [[color-scheme]] أحياناً يكفي للغامق. مع [[scrollbar-width]] تتحكم في الشكل كامل.

## try

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-color:#c9772f #efe0bd; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6<br>7</div>
```

## syntax

```css nolive
scrollbar-color: #c9772f #efe0bd;
scrollbar-color: auto;
html { scrollbar-color: #7a4a1d #f3ede0; }
```

- thumb ثم track.
- **القيمة المبدئية**: `auto`.

## values

### `<color> <color>`
المقبض ثم المسار.

### auto
ألوان النظام.

## use

- ألوان تناسب الثيم.
- شريط ناعم للعين.

## avoid

- تباين ضعيف بين المقبض والمسار.

## examples

### 1) ألوان دافئة
مقبض برتقالي.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-color:#c9772f #efe0bd; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 2) ثيم غامق
مسار غامق.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-color:#c9772f #3d2c18; background:#3d2c18; color:#f3ede0; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 3) للصفحة كلها
على html.

```html
<style>
  html { scrollbar-color:#7a4a1d #efe0bd; }
  .c { padding:6px; color:#3d2c18; }
</style>
<div class="c">على الصفحة</div>
```



## mistakes

### تباين ضعيف

```css bad
.c { scrollbar-color:#efe0bd #f3e6c9; }
```

```css good
.c { scrollbar-color:#c9772f #efe0bd; }
```

المقبض لازم يبان.

## quiz

### أول لون في scrollbar-color؟
- [x] المقبض
- [ ] المسار
- [ ] الخلفية
- [ ] الحد

thumb.

### البديل القياسي لـ؟
- [x] ::-webkit-scrollbar
- [ ] ::before
- [ ] ::marker
- [ ] ::selection

الأقدم.

## refs

- [MDN: scrollbar-color](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color)
