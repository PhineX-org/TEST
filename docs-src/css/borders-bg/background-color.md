---
id: background-color
kind: property
cat: borders-bg
chip: background-color
title: لون الخلفية
en: CSS background-color property
status: stable
support: all
mdn: background-color
summary: background-color بتحدد لون خلفية العنصر (محتوى و padding وحد). تقبل hex وrgb وhsl وtransparent، والافتراضي شفاف.
keywords: background-color, لون الخلفية, background, hex, rgb, hsl, transparent, alpha
related: background, color, opacity, colors-guide, dt-color
---

## intro

الخاصية `background-color` بتحدد **لون خلفية** العنصر. الخلفية بتغطي **المحتوى والـ padding** وبتمتد **تحت الحد** كمان (افتراضياً)، لكن **مش الـ margin**. الافتراضي `transparent` (شفاف) يعني بتشوف خلفية الأب.

بتقبل أي صيغة لون ([[colors-guide]]): `#efe0bd` أو `rgb(239 224 189)` أو `hsl(40 50% 85%)` أو اسم، وبتقبل **الشفافية**: `rgb(0 0 0 / 0.3)`. فيها فرق مهم عن [[opacity]]: شفافية الخلفية **مبتأثرش** على النص، أما `opacity` فبتخلي العنصر كله (نص وخلفية) شفاف.

**للقراءة المريحة**: تجنّب الأبيض الصريح مع الأسود الصريح؛ استخدم خلفية كريمية دافئة (`#f1e9d9`) مع نص بني غامق (`#2f2820`). وتأكد من **تباين 4.5:1** على الأقل.

> [!tip] لو حطيت لون خلفية، حط معاه `color` للنص بشكل صريح علشان تضمن التباين.

## try

```html
<style>
  .b { background-color:#efe0bd; color:#3d2c18; padding:14px; border:4px solid #7a4a1d; }
</style>
<div class="b">الخلفية تحت الحد كمان</div>
```

## syntax

```css nolive
background-color: #efe0bd;
background-color: rgb(239 224 189 / .5);
background-color: transparent;
background-color: currentColor;
```

- **القيمة المبدئية**: `transparent`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<color>`
أي لون: hex أو rgb أو hsl أو اسم.

### transparent
شفاف (الافتراضي).

### currentcolor
لون النص.

## use

- ألوان خلفيات الأقسام والكروت.
- خلفية شفافة فوق صورة.
- لون hover للأزرار.

## avoid

- تباين ضعيف مع النص.
- أبيض/أسود صريح لنصوص طويلة (مجهد).

## examples

### 1) ألوان خلفية
أمثلة بألوان هادية.

```html
<style>
  div { padding:8px; margin:4px 0; color:#3d2c18; }
</style>
<div style="background-color:#efe0bd">كريمي</div><div style="background-color:#bcd4a8">أخضر فاتح</div><div style="background-color:#e4c490">رملي</div>
```



### 2) شفافية الخلفية
النص مش شفاف مع alpha.

```html
<style>
  .p { background:linear-gradient(90deg,#3d7a5a,#c9772f); padding:14px; }
  .g { background-color:rgb(243 233 217 / .6); color:#2f2820; padding:10px; border-radius:8px; }
</style>
<div class="p"><div class="g">خلفية شفافة والنص واضح</div></div>
```



### 3) تحت الحد
الخلفية بتمتد تحت الحد المتقطع.

```html
<style>
  .b { background-color:#bcd4a8; color:#3d2c18; border:8px dashed #7a4a1d; padding:10px; }
</style>
<div class="b">شوف اللون تحت الشرط</div>
```



### 4) hover
لون خلفية بيتغيّر.

```html
<style>
  .b { background-color:#7a4a1d; color:#f3ede0; padding:8px 16px; display:inline-block; border-radius:8px; transition:background-color .25s; }
  .b:hover { background-color:#3d7a5a; }
</style>
<div class="b">مرّر</div>
```



## mistakes

### opacity بدل alpha

```css bad
.glass { background:#000; opacity:.5; }  /* النص بقى باهت كمان */
```

```css good
.glass { background:rgb(0 0 0 / .5); }
```

alpha على الخلفية بس.

### نسيان لون النص

```css bad
.dark { background-color:#1d1916; }  /* النص أسود على غامق */
```

```css good
.dark { background-color:#1d1916; color:#eadfce; }
```

لازم تباين كافي.

## quiz

### الافتراضي؟
- [ ] white
- [x] transparent
- [ ] black
- [ ] inherit

شفاف.

### الخلفية بتغطي؟
- [ ] المحتوى فقط
- [x] المحتوى والـ padding (وتحت الحد)
- [ ] الـ margin
- [ ] الظل

مش الـ margin.

### الأفضل لشفافية الخلفية فقط؟
- [ ] opacity
- [x] rgb(... / alpha)
- [ ] visibility
- [ ] filter

القناة الرابعة.

## refs

- [MDN: background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
