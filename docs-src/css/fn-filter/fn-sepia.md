---
id: fn-sepia
kind: function
cat: fn-filter
chip: sepia()
title: دالة sepia(): لون بني قديم
en: CSS sepia() function
status: stable
support: all
size: compact
mdn: filter-function/sepia
summary: sepia(n) بتدّي الصورة لون بني دافي زي الصور القديمة: 0 كما هو و1 سيبيا كامل. مناسبة لوضع قراءة دافي.
keywords: sepia, filter, سيبيا, صور قديمة, دافي
related: fn-grayscale, fn-saturate, filter
---

## intro

الدالة `sepia()` (داخل [[filter]]) بتدّي العنصر **لون بني دافي** زي الصور القديمة (سيبيا): **0** كما هو، **1** سيبيا كامل. مثالية لتأثير **«ذكريات»** أو **«ورق قديم»**. وكمان تقدر تستخدم نفس الفكرة لعمل **وضع قراءة دافي** يريّح العين (زي ثيم «sepia» بتاع الموقع ده): `filter: sepia(.3)` على المحتوى بتدّفي الألوان. ولو عايز لون معيّن بعد السيبيا استخدم `hue-rotate` و`saturate`.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:sepia(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:sepia(1)"><br>1</figure>
```

## syntax

```css nolive
filter: sepia(1);
filter: sepia(.3);
filter: sepia(.6) hue-rotate(-10deg);
```

- 0 كما هو، 1 سيبيا كامل.

## use

- تأثير صور قديمة.
- تدفئة الألوان.

## avoid

- سيبيا على صور المنتجات (تضلل اللون).

## examples

### 1) 3 نسب
0 و.5 و1.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:sepia(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:sepia(1)"><br>1</figure>
```



### 2) تدفئة خفيفة
sepia(.25).

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:sepia(.25)"><br>.25</figure>
```



### 3) hover
يرجّع الألوان.

```html
<style>
  img { width:110px; height:77px; border-radius:8px; filter:sepia(1); transition:filter .3s; }
  img:hover { filter:sepia(0); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



## mistakes

### سيبيا على منتجات

```css bad
.product img { filter:sepia(1); }
```

```css good
/* خليها بلونها الحقيقي */
```

تضلل المشتري.

## quiz

### sepia بتدّي؟
- [x] لون بني دافي
- [ ] أزرق
- [ ] أخضر
- [ ] أحمر

صور قديمة.

### 0؟
- [x] كما هو
- [ ] بني كامل
- [ ] أسود
- [ ] أبيض

بدون تأثير.

## refs

- [MDN: sepia()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia)
