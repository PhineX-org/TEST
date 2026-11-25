---
id: list-style-image
kind: property
cat: lists-tables
chip: list-style-image
title: صورة علامة القائمة
en: CSS list-style-image property
status: stable
support: all
size: compact
mdn: list-style-image
summary: list-style-image بتستخدم صورة كعلامة للقائمة: list-style-image: url(star.svg). تحكمها في الحجم محدود، فكتير بنستخدم marker أو before.
keywords: list-style-image, url, علامة صورة, قوائم
related: list-style, list-style-type, marker, before
---

## intro

الخاصية `list-style-image` بتخلّيك تستخدم **صورة** (أيقونة صغيرة) بدل النقطة: `list-style-image: url(check.svg);` ولو الصورة مش اتحمّلت بيرجع للنوع [[list-style-type]]، فيستحسن تحدد `list-style-type` احتياطي. العيب الكبير: **مفيش تحكم حقيقي في حجم الصورة أو محاذاتها**، وهي بتظهر بحجمها الأصلي. علشان كده في الحقيقة معظم المطورين الحاليين بيفضلوا يستخدموا [[before]] مع `content`، أو `::marker`، أو `background-image` على الـ `li` مع padding. استخدمها لو الصورة صغيرة جاهزة المقاس وعايز حل بسيط. وممكن تستخدم تدرج `linear-gradient()` كمان في المتصفحات الحديثة.

## try

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; padding:10px 30px 10px 10px;
       list-style-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><circle cx='7' cy='7' r='6' fill='%23c9772f'/></svg>"); }
</style>
<ul><li>علامة صورة</li><li>العنصر التاني</li></ul>
```

## syntax

```css nolive
list-style-image: url(check.svg);
list-style-image: none;
```

- **القيمة المبدئية**: `none`.
- حدد list-style-type احتياطي.

## values

### url()
صورة العلامة.

### none
بدون صورة (الافتراضي).

## use

- أيقونة صغيرة جاهزة المقاس.
- حل سريع لقايمة بسيطة من غير CSS معقد.

## avoid

- صور كبيرة (مفيش تحكم في الحجم).

## examples

### 1) صورة SVG
دايرة برتقالي.

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; padding:10px 30px 10px 10px;
       list-style-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14'><rect width='14' height='14' rx='3' fill='%233d7a5a'/></svg>"); }
</style>
<ul><li>مربع أخضر</li><li>التاني</li></ul>
```



### 2) البديل الأفضل
before مع content.

```html
<style>
  ul { list-style:none; margin:0; padding:10px; background:#efe0bd; color:#3d2c18; border-radius:8px; }
  li { padding-inline-start:22px; position:relative; margin:4px 0; }
  li::before { content:"★"; position:absolute; inset-inline-start:0; color:#c9772f; }
</style>
<ul><li>نجمة بتحكم كامل</li><li>التاني</li></ul>
```



### 3) احتياطي
type مع image.

```html
<style>
  ul { color:#3d2c18; background:#f3e6c9; border-radius:8px; padding:10px 30px 10px 10px; list-style-type:square; list-style-image:url(missing.png); }
</style>
<ul><li>الصورة مش موجودة فبيظهر المربع</li></ul>
```



## mistakes

### صورة بدون احتياطي

```css bad
ul { list-style-image:url(x.png); }
```

```css good
ul { list-style:square; list-style-image:url(x.png); }
```

لو الصورة فشلت.

## quiz

### عيب list-style-image الأساسي؟
- [x] مفيش تحكم في الحجم
- [ ] بطيئة
- [ ] مبتشتغلش
- [ ] لازم JS

الحجم أصلي.

### بديل أنضف؟
- [x] ::before مع content
- [ ] float
- [ ] z-index
- [ ] clear

تحكم كامل.

## refs

- [MDN: list-style-image](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image)
