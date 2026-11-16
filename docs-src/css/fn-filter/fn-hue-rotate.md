---
id: fn-hue-rotate
kind: function
cat: fn-filter
chip: hue-rotate()
title: دالة hue-rotate(): لف درجة اللون
en: CSS hue-rotate() function
status: stable
support: all
size: compact
mdn: filter-function/hue-rotate
summary: hue-rotate(زاوية) بتلف درجات الألوان على عجلة الألوان: فتحوّل الأحمر لأخضر مثلاً.
keywords: hue-rotate, filter, درجة اللون, hue
related: fn-saturate, fn-sepia, filter
---

## intro

الدالة `hue-rotate()` (داخل [[filter]]) بتلف **كل ألوان** العنصر على **عجلة الألوان** بزاوية: `filter: hue-rotate(90deg);` فالبرتقالي يتحول لأخضر مثلاً، والأخضر لأزرق، وهكذا. 0 = كما هو و360deg = دورة كاملة. مفيدة لعمل **نسخ ملوّنة** من صورة أو أيقونة بدل ما تعمل ملف لكل لون، أو **أنيميشن ألوان** (مع keyframes). ملحوظة: بتلف **كل** الألوان بنفس القدر فالنتائج ممكن تكون غير متوقعة على الصور المركبة. الألوان المحايدة (رمادي) متتأثرش.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:hue-rotate(90deg)"><br>90</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:hue-rotate(180deg)"><br>180</figure>
```

## syntax

```css nolive
filter: hue-rotate(90deg);
filter: hue-rotate(.25turn);
```

- 0 = كما هو.
- الرماديات مش بتتأثر.

## use

- نسخ ملوّنة من صورة.
- أنيميشن ألوان.

## avoid

- صور مركّبة (نتيجة غير متوقعة).

## examples

### 1) 3 زوايا
0 و90 و180.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:hue-rotate(90deg)"><br>90</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:hue-rotate(180deg)"><br>180</figure>
```



### 2) أنيميشن
دورة ألوان.

```html
<style>
  @keyframes hr { to { filter:hue-rotate(360deg); } }
  img { width:110px; height:77px; border-radius:8px; animation:hr 6s linear infinite; }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



### 3) أيقونة بألوان
نسختين.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>أصلي</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:hue-rotate(60deg)"><br>بديل</figure>
```



## mistakes

### توقع تغيير رمادي

```css bad
filter:hue-rotate(90deg);  /* الرمادي ثابت */
```

```css good
/* استخدم sepia/saturate لو عايز تلوين */
```

الرماديات مش بتتأثر.

## quiz

### hue-rotate بتلف؟
- [x] درجة اللون
- [ ] السطوع
- [ ] التباين
- [ ] الحجم

عجلة الألوان.

### 360deg؟
- [x] دورة كاملة (نفس اللون)
- [ ] أسود
- [ ] أبيض
- [ ] رمادي

رجعت.

## refs

- [MDN: hue-rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate)
