---
id: fn-grayscale
kind: function
cat: fn-filter
chip: grayscale()
title: دالة grayscale(): تدرجات الرمادي
en: CSS grayscale() function
status: stable
support: all
size: compact
mdn: filter-function/grayscale
summary: grayscale(n) بتحوّل الألوان لرمادي: 0 كما هو، 1 رمادي كامل. مفيدة للحالات المعطلة وhover.
keywords: grayscale, filter, رمادي, أبيض وأسود
related: fn-sepia, fn-saturate, filter
---

## intro

الدالة `grayscale()` (داخل [[filter]]) بتشيل الألوان وتحوّل العنصر لـ **تدرجات الرمادي**: **0** = كما هو، **1** (أو 100%) = رمادي كامل، وأي قيمة بينهم = نسبة. استخدامات: عناصر **معطّلة**، **لوجوهات شركاء** رمادية بتتلوّن عند hover، أو تأثير «ذكريات». كمان `filter: grayscale(1)` على الصفحة كلها لاختبار تباين الألوان (هل التصميم واضح من غير ألوان؟). ده اختبار سريع بيفيد جداً لمصممي الوصولية، لأن فيه ناس بتشوف الألوان بشكل مختلف.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:grayscale(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:grayscale(1)"><br>1</figure>
```

## syntax

```css nolive
filter: grayscale(1);
filter: grayscale(50%);
```

- 0 كما هو، 1 رمادي.

## use

- عناصر معطّلة.
- لوجوهات رمادية بـ hover.

## avoid

- إخفاء معلومة بتعتمد على اللون.

## examples

### 1) 3 نسب
0 و.5 و1.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:grayscale(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:grayscale(1)"><br>1</figure>
```



### 2) hover بيلوّن
لوجو.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; filter:grayscale(1); transition:filter .3s; }
  img:hover { filter:grayscale(0); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



### 3) اختبار التباين
كل الصفحة.

```html
<style>
  .t { filter:grayscale(1); display:inline-flex; gap:6px; padding:8px; background:#efe0bd; border-radius:8px; }
  .t span { width:34px; height:34px; border-radius:6px; }
</style>
<div class="t"><span style="background:#c9772f"></span><span style="background:#3d7a5a"></span><span style="background:#7a4a1d"></span></div>
```



## mistakes

### الاعتماد على اللون فقط

```css bad
.disabled { filter:grayscale(1); }  /* مفيش إشارة تانية */
```

```css good
.disabled { filter:grayscale(1); cursor:not-allowed; } + disabled
```

ضيف مؤشر غير لوني.

## quiz

### grayscale(1)؟
- [x] رمادي كامل
- [ ] كما هو
- [ ] أسود
- [ ] أبيض

رمادي.

### مفيدة لـ؟
- [x] عناصر معطّلة
- [ ] تكبير
- [ ] دوران
- [ ] حركة

تعطيل بصري.

## refs

- [MDN: grayscale()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale)
