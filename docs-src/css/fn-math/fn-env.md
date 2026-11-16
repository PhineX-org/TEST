---
id: fn-env
kind: function
cat: fn-math
chip: env()
title: دالة env(): متغيرات البيئة
en: CSS env() function
status: stable
support: all
size: compact
mdn: env
summary: env() بتقرا قيم بيئة المتصفح زي safe-area-inset (النتوءات في الموبايل) و titlebar-area. مهمة لتصميم الموبايل.
keywords: env, safe-area-inset, notch, iphone, viewport-fit, متغيرات البيئة
related: fn-var, fn-calc, padding
---

## intro

الدالة `env()` بتقرا **متغيرات بيئة بيعرّفها المتصفح/الجهاز** (مش إنت). الاستخدام الأشهر: **المناطق الآمنة (safe areas)** في الموبايلات اللي ليها **نتوء (notch)** أو حواف دائرية أو شريط تنقل: `env(safe-area-inset-top)` و`-right` و`-bottom` و`-left`. بتديك المسافة اللي لازم تبعد بيها عن الحافة عشان المحتوى ميتغطاش. مثال: `padding-bottom: env(safe-area-inset-bottom, 0px);` (القيمة التانية fallback). لازم تفعّل في `<meta name="viewport" content="..., viewport-fit=cover">` عشان تاخد قيم حقيقية. بتتشابه مع [[fn-var]] لكن القيمة من البيئة، وبتتكامل مع [[fn-calc]] و[[fn-max]].

## try

```html
<style>
  .a { padding:max(10px, env(safe-area-inset-top, 0px)) 10px 10px; background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">حشو أعلى = أكبر من 10px أو منطقة النتوء الآمنة</div>
```

## syntax

```css nolive
padding-bottom: env(safe-area-inset-bottom, 0px);
padding-top: max(12px, env(safe-area-inset-top));
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```

- فالباك بعد الفاصلة.
- محتاجة viewport-fit=cover.
- القيم: safe-area-inset-top/right/bottom/left.

## use

- شريط سفلي ثابت في موبايل.
- تجنب النتوء في الأجهزة.

## avoid

- نسيان fallback.
- توقع قيم في سطح المكتب (صفر).

## examples

### 1) حشو آمن
max مع env.

```html
<style>
  .a { padding:max(10px, env(safe-area-inset-top, 0px)) 10px 10px; background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">أمان من النتوء</div>
```



### 2) شريط سفلي
bottom آمن.

```html
<style>
  .bar { padding:10px 10px calc(10px + env(safe-area-inset-bottom, 0px)); background:#7a4a1d; color:#f3ede0; border-radius:8px; text-align:center; }
</style>
<div class="bar">شريط تنقل سفلي</div>
```



### 3) meta viewport
التفعيل.

```html nolive
<!-- في <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```



## mistakes

### بدون viewport-fit

```css bad
/* env بترجع 0 */
```

```css good
<meta ... viewport-fit=cover>
```

لازم لتفعيل القيم.

## quiz

### env() بتقرا؟
- [x] متغيرات من البيئة
- [ ] متغيرات --x
- [ ] ألوان
- [ ] خطوط

البيئة.

### الاستخدام الأشهر؟
- [x] safe-area-inset
- [ ] width
- [ ] color
- [ ] z-index

نتوء الموبايل.

## refs

- [MDN: env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
