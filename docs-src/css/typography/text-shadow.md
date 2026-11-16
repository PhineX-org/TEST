---
id: text-shadow
kind: property
cat: typography
chip: text-shadow
title: ظل النص
en: CSS text-shadow property
status: stable
support: all
mdn: text-shadow
summary: text-shadow بتضيف ظل للنص: إزاحة أفقية ورأسية وتمويه ولون. ممكن تحط أكتر من ظل لتأثير توهج أو حدود.
keywords: text-shadow, ظل النص, glow, توهج, blur, outline text
related: box-shadow, color, filter, font-weight
---

## intro

الخاصية `text-shadow` بتضيف **ظل للنص** نفسه (مش للصندوق). الصيغة: `text-shadow: x y blur color` يعني: **الإزاحة الأفقية** ثم **الإزاحة الرأسية** ثم **التمويه** (اختياري) ثم **اللون**. مثلاً `text-shadow: 2px 2px 4px rgba(0,0,0,.3)`.

- قيمة موجبة في x بتحرّك الظل **لليمين** (وسالبة لليسار)، وموجبة في y بتنزّله **لتحت**.
- التمويه `0` = ظل حاد، وكل ما زاد بيبقى أنعم وأوسع.
- تقدر تحط **أكتر من ظل** مفصولين بفاصلة لتأثير توهج (glow) أو حد حول الحروف.

نصائح للراحة البصرية: استخدم ظل **خفيف وشفاف** (مثلاً `rgba(0,0,0,.25)`) مش ظل أسود قوي. وظل ناعم تحت نص فاتح على صورة بيحسّن القراءة. وللعربي مفيش مشكلة. الظل بيتأثر بـ [[color]] لو مكتبتش لون (بياخد currentcolor). وبتتوارث.

> [!tip] لو النص على صورة، ضيف ظل خفيف عشان يتقري حتى لو الخلفية فاتحة في مكان.

## try

```html
<style>
  h3 { margin:0; font-size:2rem; color:#b5551f; text-shadow:2px 3px 4px rgba(61,44,24,.35); }
</style>
<h3>نص بظل ناعم</h3>
```

## syntax

```css nolive
text-shadow: 2px 2px 4px rgba(0,0,0,.3);
text-shadow: 0 0 8px #c9772f;
text-shadow: 1px 1px 0 #fff, -1px -1px 0 #000;
text-shadow: none;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** أيوه.
- **الترتيب**: x y blur color.

## values

### offset-x offset-y
الإزاحة الأفقية والرأسية.

### blur-radius
التمويه (اختياري).

### color
لون الظل (اختياري).

### none
بدون ظل.

## use

- تحسين قراءة نص فوق صورة.
- تأثير توهج للعناوين.
- حد حول الحروف بظلين.

## avoid

- ظل قوي أسود على نص صغير.
- ظلال كتيرة على نص طويل (أداء).

## examples

### 1) ظل ناعم
إزاحة وتمويه.

```html
<style>
  h3 { margin:0; font-size:2rem; color:#7a4a1d; text-shadow:2px 3px 5px rgba(61,44,24,.35); }
</style>
<h3>ظل ناعم</h3>
```



### 2) توهج
ظل بدون إزاحة.

```html
<style>
  .b { background:#3d2c18; padding:14px; border-radius:8px; }
  h3 { margin:0; font-size:2rem; color:#f0c987; text-shadow:0 0 10px #c9772f, 0 0 20px #c9772f; }
</style>
<div class="b"><h3>توهج دافئ</h3></div>
```



### 3) حد حول النص
ظلال في 4 اتجاهات.

```html
<style>
  h3 { margin:0; font-size:2rem; color:#f3ede0; text-shadow:-1px -1px 0 #7a4a1d, 1px -1px 0 #7a4a1d, -1px 1px 0 #7a4a1d, 1px 1px 0 #7a4a1d; background:#c9772f; padding:8px; }
</style>
<h3>نص بحد</h3>
```



### 4) بارز (Letterpress)
تأثير حفر.

```html
<style>
  .b { background:#efe0bd; padding:12px; }
  h3 { margin:0; font-size:2rem; color:#c9a66b; text-shadow:0 1px 0 rgba(255,244,214,.8); }
</style>
<div class="b"><h3>حفر خفيف</h3></div>
```



## mistakes

### ظل أسود قوي

```css bad
.t { text-shadow:3px 3px 0 #000; }
```

```css good
.t { text-shadow:2px 2px 4px rgba(0,0,0,.25); }
```

الظل القوي بيتعب العين.

### نسيان الوحدات

```css bad
.t { text-shadow:2 2 4 #000; }
```

```css good
.t { text-shadow:2px 2px 4px #000; }
```

الوحدات إجبارية (ماعدا 0).

## quiz

### أول قيمتين في text-shadow؟
- [x] الإزاحة الأفقية والرأسية
- [ ] اللون والتمويه
- [ ] التمويه واللون
- [ ] الحجم

x وy.

### لعمل توهج؟
- [x] ظل بدون إزاحة وبتمويه
- [ ] ظل إزاحة كبيرة
- [ ] border
- [ ] outline

0 0 blur color.

### الافتراضي؟
- [x] none
- [ ] 1px
- [ ] black
- [ ] blur

none.

## refs

- [MDN: text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
