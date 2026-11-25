---
id: margin-inline-end
kind: property
cat: logical
chip: margin-inline-end
title: margin نهاية السطر
en: CSS margin-inline-end property
status: stable
support: all
size: compact
mdn: margin-inline-end
summary: margin-inline-end margin في نهاية السطر: شمال في العربي ويمين في الإنجليزي. أشهر استخدام: مسافة بين أيقونة والنص.
keywords: margin-inline-end, نهاية, rtl, هامش
related: margin-inline-start, margin-inline, margin-left, margin-right
---

## intro

الخاصية `margin-inline-end` بتحط margin **عند نهاية السطر**: شمال في العربي (RTL) ويمين في الإنجليزي (LTR). الاستخدام الأشهر: **مسافة بين أيقونة ونصها**. الأيقونة بتيجي قبل النص، فالمسافة بتبقى «بعد» الأيقونة: `.icon { margin-inline-end: 8px; }` وبتشتغل صح في العربي والإنجليزي بنفس الكود. وهي عكس [[margin-inline-start]] وجزء من [[margin-inline]]. وفي flex، `margin-inline-end: auto` بتدفع باقي العناصر لبداية السطر.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><span class="i" style="margin-inline-end:30px">أيقونة</span>نص بعدها</div>
<div dir="ltr" class="w"><span class="i" style="margin-inline-end:30px">icon</span>text after</div>
```

## syntax

```css nolive
margin-inline-end: 8px;
margin-inline-end: auto;
```

- **القيمة المبدئية**: `0`.

## values

### `<length>`
مسافة.

### auto
يدفع العناصر الأخرى.

## use

- فاصل بعد أيقونة.
- دفع عناصر لجهة البداية بـ auto.

## avoid

- margin-left ثابتة لنفس الغرض.

## examples

### 1) أيقونة ونص
الأشهر.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><span class="i" style="margin-inline-end:10px">★</span>نص بعد الأيقونة</div>
```



### 2) RTL مقابل LTR
نفس الكود.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><span class="i" style="margin-inline-end:24px">عربي</span>نص</div><div dir="ltr" class="w"><span class="i" style="margin-inline-end:24px">EN</span>text</div>
```



### 3) auto في flex
يدفع للبداية.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="display:flex"><div class="i" style="margin-inline-end:auto">أول</div><div class="i">آخر</div></div>
```



## mistakes

### left ثابتة

```css bad
.icon { margin-left:8px; }
```

```css good
.icon { margin-inline-end:8px; }
```

للتوافق مع RTL.

## quiz

### end في RTL هي؟
- [x] الشمال
- [ ] اليمين
- [ ] فوق
- [ ] تحت

شمال.

### الاستخدام الأشهر؟
- [x] مسافة بعد أيقونة
- [ ] لون
- [ ] خط
- [ ] حد

بعد الأيقونة.

## refs

- [MDN: margin-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end)
