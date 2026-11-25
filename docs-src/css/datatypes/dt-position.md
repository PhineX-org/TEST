---
id: dt-position
kind: datatype
cat: datatypes
chip: <position>
title: المواضع
en: CSS <position> data type
status: stable
support: all
mdn: position
summary: نوع position هو موضع في صندوق بكلمات (top وcenter وleft) أو نسب أو أطوال: بيستخدم في background-position وobject-position وtransform-origin.
keywords: position, center, top left, background-position, object-position, transform-origin
related: object-position, transform-origin, dt-percentage, dt-length
---

## intro

النوع `<position>` بيحدد **نقطة جوه صندوق** (مرجعها ركن الصندوق). بيستخدم في [[object-position]] و`background-position` و[[transform-origin]] و`offset-position` و`at` جوه التدرجات الدائرية و`circle()`.

الأشكال:
- **كلمات**: `top` و`bottom` و`left` و`right` و`center`. مثال: `top left` (ركن علوي أيسر)، و`center` (النص).
- **نسب**: `50% 50%` (X ثم Y)، و`0 0` ركن، و`100% 100%` الركن المقابل.
- **أطوال**: `10px 20px`.
- **خليط**: `right 10px bottom 20px` (4 قيم: ابتعد 10px عن اليمين و20px عن الأسفل).

الترتيب: **أفقي ثم رأسي** (`x y`). لو كتبت قيمة واحدة (`left`) التانية بتبقى `center`. والكلمات تتبادل الأماكن (`top left` = `left top`)، لكن مع النسب لازم x ثم y. وفي RTL الكلمات `left`/`right` **فيزيائية** (مش منطقية). وبتفيد في «أي جزء من الصورة يفضل ظاهر» و«الدوران حوالين أي نقطة».

## try

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; color:#3d2c18; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<style>
  .p { width:150px; height:70px; border:2px solid #7a4a1d; border-radius:8px; background:#f3e6c9 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='14' fill='%23c9772f'/><rect x='0' y='0' width='10' height='10' fill='%233d7a5a'/></svg>") no-repeat; display:inline-block; margin:3px; }
</style>
<div class="p" style="background-position:top left"></div><div class="p" style="background-position:center"></div><div class="p" style="background-position:right 10px bottom 10px"></div>
```

## syntax

```css nolive
background-position: center;
background-position: top left;
background-position: 20% 80%;
background-position: right 10px bottom 10px;
transform-origin: 0 0;
```

- x ثم y.
- قيمة واحدة: التانية center.
- 4 قيم لإزاحة من حافتين.

## use

- تحديد جزء ظاهر من صورة.
- نقطة دوران مخصصة.
- مركز تدرج دائري.

## avoid

- افتراض إن left/right منطقية في RTL.
- نسيان الصورة بتتكرر (no-repeat) عند تحريك الموضع.

## examples

### 1) كلمات
top left وcenter.

```html
<style>
  .p { width:130px; height:64px; border:2px solid #7a4a1d; border-radius:8px; background:#f3e6c9 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='14' fill='%23c9772f'/><rect x='0' y='0' width='10' height='10' fill='%233d7a5a'/></svg>") no-repeat; display:inline-block; margin:3px; }
</style>
<div class="p" style="background-position:top left"></div><div class="p" style="background-position:center"></div>
```



### 2) نسب
x وy.

```html
<style>
  .p { width:130px; height:64px; border:2px solid #7a4a1d; border-radius:8px; background:#f3e6c9 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='14' fill='%23c9772f'/><rect x='0' y='0' width='10' height='10' fill='%233d7a5a'/></svg>") no-repeat; display:inline-block; margin:3px; }
</style>
<div class="p" style="background-position:20% 80%"></div><div class="p" style="background-position:100% 0"></div>
```



### 3) 4 قيم
إزاحة من الحافة.

```html
<style>
  .p { width:130px; height:64px; border:2px solid #7a4a1d; border-radius:8px; background:#f3e6c9 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='14' fill='%23c9772f'/><rect x='0' y='0' width='10' height='10' fill='%233d7a5a'/></svg>") no-repeat right 10px bottom 8px; }
</style>
<div class="p"></div>
```



### 4) نقطة دوران
transform-origin.

```html
<style>
  .a { width:50px; height:50px; background:#3d7a5a; border-radius:6px; transform-origin:top left; transform:rotate(25deg); margin:20px; }
</style>
<div class="a"></div>
```



## mistakes

### ترتيب y قبل x بالنسب

```css bad
background-position:80% 20%;  /* ظنك y,x */
```

```css good
/* دايماً x ثم y */
```

x ثم y.

### left في RTL

```css bad
background-position:left;  /* فيزيائي */
```

```css good
background-position:right;
```

لو عايز بداية السطر في RTL.

## quiz

### ترتيب النسب؟
- [x] x ثم y
- [ ] y ثم x
- [ ] عشوائي
- [ ] أي

أفقي ثم رأسي.

### center لوحدها تعني؟
- [x] 50% 50%
- [ ] 0 0
- [ ] 100% 100%
- [ ] top

منتصف.

### بتستخدم في؟
- [x] transform-origin وbackground-position
- [ ] color
- [ ] font
- [ ] z-index

مواضع.

## refs

- [MDN: `<position>`](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
