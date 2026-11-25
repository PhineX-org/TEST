---
id: dt-length
kind: datatype
cat: datatypes
chip: <length>
title: الأطوال
en: CSS <length> data type
status: stable
support: all
mdn: length
summary: نوع length هو أي قيمة طول في CSS: وحدات مطلقة (px) ونسبية (em وrem وvw وch وfr...). الصفر لا يحتاج وحدة.
keywords: length, px, rem, em, vw, vh, ch, وحدات الطول
related: units, dt-percentage, fn-calc, fn-clamp
---

## intro

النوع `<length>` هو **أي قيمة طول** بتتكتب في CSS: رقم + وحدة (مثل `16px`). هو نوع القيم المقبولة في `width` و`margin` و`font-size` و`border-width` وغيرهم. **الاستثناء الوحيد**: الصفر `0` مبيحتاجش وحدة.

نوعين من الوحدات:

**مطلقة**: `px` (بكسل، الأشهر)، `cm` و`mm` و`in` و`pt` (للطباعة).

**نسبية** (بتتغير حسب سياق):
- **`em`**: نسبة من حجم خط **العنصر** (أو الأب في font-size).
- **`rem`**: نسبة من حجم خط **الجذر** `html` (ثابتة وأفضل للتحكم).
- **`vw` و`vh`**: 1% من عرض/ارتفاع **نافذة العرض**. وفيه `dvh` و`svh` للموبايل.
- **`ch`**: عرض حرف `0` (مفيد لعرض النص: `max-width: 65ch`).
- **`%`** نسبة (نوع [[dt-percentage]] مرتبط لكن مختلف).
- **`cqw`**: نسبة من حاوية.

نصيحة: استخدم `rem` للخطوط والمسافات (يحترم إعدادات المستخدم)، و`px` للحدود الدقيقة، و`ch` لعرض القراءة، و`vw/vh` للتخطيطات بحجم الشاشة. وبتقدر تخلطهم بـ [[fn-calc]].

## try

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="width:100px">100px</div><div class="b" style="width:6rem">6rem</div><div class="b" style="width:20ch">20ch</div><div class="b" style="width:40%">40%</div></div>
```

## syntax

```css nolive
width: 200px;
font-size: 1.125rem;
max-width: 65ch;
height: 50vh;
margin: 0;   /* الصفر بدون وحدة */
```

- الصفر لا يحتاج وحدة.
- لازم وحدة لأي رقم غير الصفر.
- `rem` أفضل للوصولية.

## use

- `rem` للخطوط والمسافات.
- `ch` لعرض النص.
- `vh/vw` لتخطيطات بحجم الشاشة.

## avoid

- كتابة رقم بدون وحدة (غير الصفر).
- `px` للخطوط (تتجاهل إعدادات المستخدم).

## examples

### 1) وحدات متنوعة
نفس العرض تقريباً.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="width:100px">100px</div><div class="b" style="width:6rem">6rem</div><div class="b" style="width:20ch">20ch</div></div>
```



### 2) em مقابل rem
em بتتراكم.

```html
<style>
  .a { font-size:20px; background:#efe0bd; padding:6px; border-radius:8px; color:#3d2c18; }
  .a p { font-size:1.2em; margin:4px 0; }
  .a p p { margin:4px 0; }
</style>
<div class="a">أب 20px<p>1.2em = 24px<p>1.2em من 24 = 28.8px</p></p></div>
```



### 3) ch لعرض القراءة
65 حرف.

```html
<style>
  p { max-width:30ch; background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; }
</style>
<p>نص طويل بيتحدد عرضه بعدد الأحرف عشان القراءة تبقى مريحة للعين.</p>
```



### 4) vw وvh
نسبة من الشاشة.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r"><div class="b" style="width:30vw">30vw</div></div>
```



## mistakes

### رقم بدون وحدة

```css bad
.a { width:200; }  /* غير صالح */
```

```css good
.a { width:200px; }
```

وحدة إجبارية.

### px للخطوط

```css bad
body { font-size:16px; }
```

```css good
body { font-size:1rem; }
```

يحترم إعدادات المستخدم.

## quiz

### أي طول لا يحتاج وحدة؟
- [x] الصفر
- [ ] الواحد
- [ ] المئة
- [ ] الكل

0.

### rem نسبة من؟
- [x] خط الجذر html
- [ ] خط الأب
- [ ] الشاشة
- [ ] الصفحة

root.

### ch مفيدة لـ؟
- [x] عرض النص
- [ ] الألوان
- [ ] الحركة
- [ ] الصور

عدد الأحرف.

## refs

- [MDN: `<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
