---
id: fn-invert
kind: function
cat: fn-filter
chip: invert()
title: دالة invert(): عكس الألوان
en: CSS invert() function
status: stable
support: all
size: compact
mdn: filter-function/invert
summary: invert(n) بتعكس الألوان: 1 عكس كامل (سلبي الصورة). مفيدة لعكس أيقونات داكنة في الوضع الغامق.
keywords: invert, filter, عكس الألوان, negative, dark mode
related: fn-grayscale, fn-brightness, filter
---

## intro

الدالة `invert()` (داخل [[filter]]) بتعكس ألوان العنصر زي **نيجاتيف الصورة**: **0** كما هو، **1** عكس كامل (الأبيض أسود والعكس والألوان مقابلاتها)، و**0.5** رمادي متوسط تقريباً. استخدام عملي: **أيقونات سوداء** تتحول لبيضاء في **الوضع الداكن** بسطر واحد: `@media (prefers-color-scheme: dark) { .icon { filter: invert(1); } }`. كمان لتأثيرات خاصة. تنبيه: عكس الصور الفوتوغرافية بيدّي نتايج غريبة فاستخدمها للأيقونات والرسومات البسيطة.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:invert(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:invert(1)"><br>1</figure>
```

## syntax

```css nolive
filter: invert(1);
filter: invert(100%);
@media (prefers-color-scheme: dark) { .icon { filter: invert(1); } }
```

- 1 = عكس كامل.

## use

- أيقونات للوضع الداكن.
- تأثيرات خاصة.

## avoid

- عكس صور فوتوغرافية.

## examples

### 1) 3 قيم
نسب العكس.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:invert(.5)"><br>.5</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:invert(1)"><br>1</figure>
```



### 2) أيقونة للغامق
invert.

```html
<style>
  .d { display:inline-block; padding:10px; background:#3d2c18; border-radius:8px; }
  .i { font-size:1.6rem; color:#3d2c18; filter:invert(1) sepia(1) saturate(0.3) brightness(1.4); }
</style>
<div class="d"><span class="i">★</span></div>
```



### 3) hover
عكس عند المرور.

```html
<style>
  img { width:110px; height:77px; border-radius:8px; transition:filter .3s; }
  img:hover { filter:invert(1); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



## mistakes

### عكس صورة فوتوغرافية

```css bad
img.photo { filter:invert(1); }
```

```css good
/* ستايل غامق مخصص للصورة */
```

نتيجة غريبة.

## quiz

### invert(1)؟
- [x] عكس كامل
- [ ] كما هو
- [ ] رمادي
- [ ] أغمق

نيجاتيف.

### استخدام عملي؟
- [x] أيقونات الوضع الداكن
- [ ] حجم
- [ ] موضع
- [ ] خط

قلب اللون.

## refs

- [MDN: invert()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert)
