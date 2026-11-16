---
id: dt-number
kind: datatype
cat: datatypes
chip: <number>
title: نوع القيمة number: الأرقام
en: CSS <number> data type
status: stable
support: all
size: compact
mdn: number
summary: نوع number هو رقم عشري بدون وحدة: line-height: 1.6 وopacity: .5 وflex-grow: 2 وscale(1.2).
keywords: number, رقم, line-height, opacity, flex-grow, z-index
related: dt-length, dt-percentage, opacity, line-height
---

## intro

النوع `<number>` هو **رقم بدون وحدة** (عشري أو صحيح، موجب أو سالب أحياناً): `1.6` و`0.5` و`2` و`-1`. بتتقبل في خصائص كتير: **`line-height: 1.6`** (من غير وحدة تتناسب مع حجم الخط وبتتوارث صح)، و**`opacity: 0.5`**، و**`flex-grow: 2`**، و**`z-index: 10`** (عدد صحيح)، و**`scale(1.2)`**، و**`font-weight: 700`**. فرق عن [[dt-length]]: الرقم بدون وحدة، والطول لازم وحدة (إلا الصفر). والنقطة العشرية بدون صفر في الأول مسموحة (`.5`). وفيه `<integer>` (عدد صحيح فقط). الأرقام **بدون وحدة** في `line-height` أفضل من `1.6em` لأنها تتوارث كمعامل مش قيمة نهائية.

## try

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="opacity:.4">opacity .4</div><div class="b" style="opacity:1">opacity 1</div><div class="b" style="line-height:2">line-height: 2<br>سطرين</div></div>
```

## syntax

```css nolive
line-height: 1.6;
opacity: .5;
flex-grow: 2;
z-index: 10;
font-weight: 700;
```

- بدون وحدة.
- الصفر الأول اختياري: `.5`.

## use

- line-height بدون وحدة.
- opacity وflex-grow.

## avoid

- إضافة وحدة لخاصية تتوقع رقماً.

## examples

### 1) opacity
رقم من 0 لـ 1.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="opacity:.4">.4</div><div class="b" style="opacity:.7">.7</div><div class="b">1</div></div>
```



### 2) line-height
بدون وحدة.

```html
<style>
  p { background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; margin:4px 0; }
</style>
<p style="line-height:1.2">سطر ضيق<br>سطر تاني</p><p style="line-height:2">سطر واسع<br>سطر تاني</p>
```



### 3) flex-grow
نسب النمو.

```html
<style>
  .f { display:flex; gap:4px; background:#efe0bd; padding:6px; border-radius:8px; }
  .f div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; }
</style>
<div class="f"><div style="flex-grow:1">1</div><div style="flex-grow:2">2</div></div>
```



## mistakes

### وحدة في opacity

```css bad
opacity:50%;  /* مقبولة حديثاً لكن */
```

```css good
opacity:.5;
```

الرقم أوضح.

## quiz

### line-height: 1.6؟
- [x] رقم بدون وحدة
- [ ] طول
- [ ] نسبة
- [ ] لون

number.

### الفرق عن length؟
- [x] بدون وحدة
- [ ] أكبر
- [ ] أسرع
- [ ] ملوّن

لا وحدة.

## refs

- [MDN: `<number>`](https://developer.mozilla.org/en-US/docs/Web/CSS/number)
