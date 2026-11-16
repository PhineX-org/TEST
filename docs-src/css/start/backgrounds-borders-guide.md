---
id: backgrounds-borders-guide
kind: guide
cat: start
title: الخلفيات والحدود والظلال
en: Backgrounds, borders and shadows
status: stable
summary: اتعلّم تزيّن العناصر: لون وصورة خلفية، حدود ودوائر وزوايا مدوّرة، وظلال وتدرجات لونية، لعمل كروت وأزرار شكلها محترف.
keywords: background, border, border-radius, box-shadow, gradient, خلفية, حدود, ظل, دائرة, تدرج, كارت, زوايا مدورة
related: background, border, border-radius, box-shadow, fn-linear-gradient, outline
---

## intro

دي الخصائص اللي بتحوّل `div` عادي لكارت أنيق.

**الخلفية ([[background]])**: `background-color` لون، و`background-image` صورة أو تدرج ([[fn-linear-gradient]])، و`background-size: cover` علشان الصورة تملأ المكان.

**الحدود ([[border]])**: الصيغة المختصرة: `border: 2px solid #7a4a1d` (سُمك + نوع + لون). وتقدر تحدد جانب واحد: `border-bottom`.

**الزوايا المدوّرة ([[border-radius]])**: `8px` زوايا ناعمة، و`50%` على مربع = **دايرة**، و`999px` = كبسولة.

**الظل ([[box-shadow]])**: `0 4px 12px rgba(0,0,0,.15)` = (إزاحة أفقية، إزاحة رأسية، تمويه، لون). الظل الخفيف بيدّي إحساس بالعمق.

**الخطوط الخارجية ([[outline]])**: زي الحد لكنه **مبيحتلش مساحة**، وبيتستخدم أساساً لإظهار التركيز (focus).

> [!tip] للقراءة المريحة: ظلال **خفيفة وناعمة** (شفافية 10–20%) أحسن من الظلال الغامقة. وحدود رفيعة بلون قريب من الخلفية.

> [!analogy] الكارت الحلو زي هدية متغلّفة: الخلفية ورق التغليف، الحد الشريط، الزوايا المدوّرة الحواف الناعمة، والظل بيخليها تبان مرفوعة عن الطاولة.

## try

```html
<style>
  .c { width:160px; padding:20px; background:#f3e6c9; color:#3d2c18; border:2px solid #c9772f;
       border-radius:14px; box-shadow:0 6px 16px rgba(60,40,20,.18); }
</style>
<div class="c">كارت أنيق</div>
```

## examples

### 1) زوايا مدوّرة
من مربع لدايرة لكبسولة.

```html
<style>
  div { display:inline-block; margin:6px; background:#7a4a1d; color:#f3ede0; text-align:center; line-height:70px; }
  .a { width:70px; height:70px; border-radius:10px; }
  .b { width:70px; height:70px; border-radius:50%; }
  .c { width:120px; height:44px; line-height:44px; border-radius:999px; }
</style>
<div class="a">10px</div><div class="b">50%</div><div class="c">كبسولة</div>
```



### 2) تدرج لوني
`linear-gradient` من لون للون.

```html
<style>
  .g { height:80px; background:linear-gradient(135deg,#c9772f,#3d7a5a); border-radius:10px; }
</style>
<div class="g"></div>
```

- الزاوية `135deg` بتحدد الاتجاه.

### 3) ظلال بمستويات
كل ما الظل أكبر وأنعم العنصر بيبان مرفوع أكتر.

```html
<style>
  .s { display:inline-block; width:80px; height:60px; margin:14px; background:#f3e6c9; border-radius:8px; }
  .s1 { box-shadow:0 1px 3px rgba(60,40,20,.25); }
  .s2 { box-shadow:0 6px 14px rgba(60,40,20,.22); }
  .s3 { box-shadow:0 14px 28px rgba(60,40,20,.25); }
</style>
<div class="s s1"></div><div class="s s2"></div><div class="s s3"></div>
```



### 4) حدود بأنواعها
solid وdashed وdotted وdouble.

```html
<style>
  div { padding:8px; margin:6px 0; border-color:#7a4a1d; border-width:3px; color:#3d2c18; }
</style>
<div style="border-style:solid">solid</div><div style="border-style:dashed">dashed</div>
<div style="border-style:dotted">dotted</div><div style="border-style:double">double</div>
```



## mistakes

### حد من غير نوع

```css bad
.a { border:2px #7a4a1d; }  /* مفيش حد! */
```

```css good
.a { border:2px solid #7a4a1d; }
```

لو نسيت النوع (`solid`) الحد مبيظهرش.

### ظل قاسي

```css bad
.a { box-shadow:0 0 0 black; }
```

```css good
.a { box-shadow:0 4px 12px rgba(60,40,20,.18); }
```

الظل الناعم الشفاف أريح للعين.

## quiz

### أنهي قيمة بتحوّل مربع لدايرة؟
- [ ] border-radius:0
- [x] border-radius:50%
- [ ] border:50%
- [ ] radius:round

50% نص الأبعاد.

### الفرق بين border و outline؟
- [ ] مفيش
- [x] outline مبيحتلش مساحة
- [ ] border مبيظهرش
- [ ] outline للصور

الـ outline بره الصندوق.

### الترتيب في box-shadow؟
- [ ] لون ثم أبعاد
- [x] إزاحة أفقية ورأسية ثم تمويه ثم لون
- [ ] تمويه فقط
- [ ] لون فقط

x y blur color.

## refs

- [MDN: Backgrounds and borders](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Backgrounds_and_borders)
