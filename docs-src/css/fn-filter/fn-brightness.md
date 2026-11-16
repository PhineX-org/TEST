---
id: fn-brightness
kind: function
cat: fn-filter
chip: brightness()
title: دالة brightness(): السطوع
en: CSS brightness() function
status: stable
support: all
size: compact
mdn: filter-function/brightness
summary: brightness(n) بتغيّر سطوع العنصر: 1 الأصلي، 0 أسود، أكبر من 1 أفتح. filter: brightness(1.2).
keywords: brightness, filter, سطوع, hover
related: fn-contrast, fn-saturate, filter
---

## intro

الدالة `brightness()` (داخل [[filter]]) بتغيّر **سطوع** العنصر: **1** (أو 100%) = الأصلي، **0** = أسود تماماً، **أقل من 1** = أغمق، **أكبر من 1** = أفتح (مثلاً `1.2`). استخدام شائع: **hover على صور** تبقى أفتح شوية، أو **تغميق صورة خلفية** عشان النص عليها يبان: `filter: brightness(.6)`. وتشتغل على الصورة والنص والعنصر كله. وبتتجمع مع باقي الفلاتر في نفس الخاصية: `filter: brightness(.9) contrast(1.1);` (الترتيب بيفرق).

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:brightness(.6)"><br>.6</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:brightness(1.3)"><br>1.3</figure>
```

## syntax

```css nolive
filter: brightness(1.2);
filter: brightness(60%);
filter: brightness(0);
```

- 1 = الأصلي.
- تقبل نسب (120%).

## use

- تغميق صورة تحت نص.
- hover أفتح.

## avoid

- سطوع شديد بيحرق التفاصيل.

## examples

### 1) 3 قيم
أغمق وأفتح.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:brightness(.6)"><br>.6</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:brightness(1.3)"><br>1.3</figure>
```



### 2) hover
يفتح.

```html
<style>
  img { width:120px; height:84px; border-radius:8px; transition:filter .3s; }
  img:hover { filter:brightness(1.2); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



### 3) تغميق تحت نص
overlay.

```html
<style>
  .h { position:relative; width:180px; height:90px; border-radius:10px; overflow:hidden; background:#e4c490; }
  .h img { width:100%; height:100%; object-fit:cover; filter:brightness(.55); }
  .h span { position:absolute; inset:auto 10px 8px; color:#f3ede0; font-weight:bold; }
</style>
<div class="h"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>"><span>نص واضح</span></div>
```



## mistakes

### صفر = أسود

```css bad
filter:brightness(0);  /* مفيش صورة */
```

```css good
filter:brightness(.6);
```

قيم وسطى.

## quiz

### brightness(1)؟
- [x] الأصلي
- [ ] أسود
- [ ] أبيض
- [ ] أغمق

1 = الأصلي.

### أغمق؟
- [x] أقل من 1
- [ ] أكبر من 1
- [ ] 1
- [ ] سالب

أقل من 1.

## refs

- [MDN: brightness()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness)
