---
id: contain
kind: property
cat: layout
chip: contain
title: عزل العنصر لتحسين الأداء
en: CSS contain property
status: stable
support: all
size: compact
mdn: contain
summary: contain بتقول للمتصفح إن العنصر معزول عن الباقي (حجم، تخطيط، رسم) فيقدر يحسّن الأداء ويتجنب إعادة الحساب.
keywords: contain, layout, paint, size, style, strict, content, أداء, عزل
related: content-visibility, isolation, overflow, will-change
---

## intro

الخاصية `contain` بتديك طريقة تقول للمتصفح: «التغييرات جوه العنصر ده **مش هتأثر** على اللي برّه». فيقدر يتجنب إعادة حساب التخطيط للصفحة كلها لو حاجة جواه اتغيّرت، وده يحسّن الأداء في المكونات الكتيرة.

القيم:
- **`layout`**: التخطيط جوه معزول.
- **`paint`**: ما يترسمش برّه حدوده (زي overflow:hidden).
- **`size`**: حجمه مبيعتمدش على اللي جواه.
- **`style`**: العدادات والـ quotes معزولة.
- **`content`**: اختصار لـ layout + paint + style.
- **`strict`**: اختصار لـ size + layout + paint + style.

استخدمها في مكونات مستقلة متكررة (كروت في قائمة طويلة). وبتأثر على التخطيط (مثلاً `paint` بتقص المحتوى الطالع برّه).

## try

```html
<style>
  .c { contain:content; background:#efe0bd; color:#3d2c18; padding:10px; border:2px solid #7a4a1d; }
</style>
<div class="c">مكوّن معزول</div>
```

## syntax

```css nolive
contain: layout;
contain: paint;
contain: content;
contain: strict;
contain: none;
```

- **القيمة المبدئية**: `none`.

## values

### content
layout + paint + style.

### strict
size + layout + paint + style.

### layout
تخطيط معزول.

### paint
مفيش رسم برّه الحدود.

## use

- كروت في قائمة طويلة.
- ويدجت مستقلة.

## avoid

- `size` من غير حجم محدد (العنصر هيتقلص لصفر).

## examples

### 1) content
عزل مكوّن.

```html
<style>
  .c { contain:content; background:#bcd4a8; color:#3d2c18; padding:8px; margin:4px 0; }
</style>
<div class="c">كارت 1</div><div class="c">كارت 2</div>
```



### 2) paint بيقص
الطالع برّه بيتقص.

```html
<style>
  .p { contain:paint; width:100px; height:40px; background:#efe0bd; color:#3d2c18; }
  .p span { position:absolute; margin-top:20px; background:#c9772f; color:#fff3e0; padding:6px 20px; }
</style>
<div class="p">حدود<span>طالع برّه</span></div>
```



### 3) size مع أبعاد
لازم حجم صريح.

```html
<style>
  .s { contain:size; width:120px; height:40px; background:#e4c490; color:#3d2c18; }
</style>
<div class="s">حجم ثابت</div>
```



## mistakes

### size بدون أبعاد

```css bad
.x { contain:size; }  /* هيتقلص لصفر */
```

```css good
.x { contain:size; width:200px; height:100px; }
```

size بيمنع الحجم من الاعتماد على المحتوى.

## quiz

### contain:content بتجمع؟
- [ ] size+layout
- [x] layout+paint+style
- [ ] paint فقط
- [ ] style فقط

اختصار ثلاثي.

### الفايدة؟
- [ ] زخرفة
- [x] تحسين الأداء
- [ ] تلوين
- [ ] حركة

عزل التغييرات.

## refs

- [MDN: contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
