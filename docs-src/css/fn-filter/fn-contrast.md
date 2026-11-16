---
id: fn-contrast
kind: function
cat: fn-filter
chip: contrast()
title: دالة contrast(): التباين
en: CSS contrast() function
status: stable
support: all
size: compact
mdn: filter-function/contrast
summary: contrast(n) بتغيّر التباين: 1 الأصلي، أقل يبهّت، أكتر يقوّي الفرق بين الفاتح والغامق.
keywords: contrast, filter, تباين
related: fn-brightness, fn-saturate, filter
---

## intro

الدالة `contrast()` (داخل [[filter]]) بتغيّر **التباين**: الفرق بين الأجزاء الفاتحة والغامقة. **1** = الأصلي، **أقل من 1** = باهت ورمادي، **أكبر من 1** = تباين أقوى (الغامق أغمق والفاتح أفتح). `filter: contrast(1.2);` يدّي الصورة حيوية. مفيدة مع `brightness` لتحسين صور باهتة. حذر: التباين العالي جداً بيفقد التفاصيل. تخيّل ضبط تباين التلفزيون: لو رفعته كتير الأبيض يحرق والأسود يطمس، فاضبطه بهدوء لحد ما الصورة تبان واضحة من غير مبالغة.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:contrast(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:contrast(1.6)"><br>1.6</figure>
```

## syntax

```css nolive
filter: contrast(1.2);
filter: contrast(150%);
```

- 1 = الأصلي.

## use

- تحسين صور باهتة.
- تباين أقل لتأثير حالم.

## avoid

- تباين مفرط.

## examples

### 1) 3 قيم
باهت وقوي.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:contrast(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:contrast(1.6)"><br>1.6</figure>
```



### 2) مع brightness
دمج.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:brightness(1.1) contrast(1.2)"><br>دمج</figure>
```



### 3) hover
تقوية.

```html
<style>
  img { width:120px; height:84px; border-radius:8px; transition:filter .3s; filter:contrast(.8); }
  img:hover { filter:contrast(1.2); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



## mistakes

### تباين مفرط

```css bad
filter:contrast(3);
```

```css good
filter:contrast(1.2);
```

قيم معتدلة.

## quiz

### contrast(1)؟
- [x] الأصلي
- [ ] باهت
- [ ] أقوى
- [ ] أسود

الأصلي.

### أكبر من 1؟
- [x] تباين أقوى
- [ ] أبهت
- [ ] أغمق فقط
- [ ] أفتح فقط

أقوى.

## refs

- [MDN: contrast()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast)
