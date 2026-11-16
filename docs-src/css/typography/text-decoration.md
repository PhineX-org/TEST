---
id: text-decoration
kind: property
cat: typography
chip: text-decoration
title: زخرفة النص (خط تحت/فوق)
en: CSS text-decoration property
status: stable
support: all
mdn: text-decoration
summary: text-decoration بتضيف خط تحت (underline) أو فوق (overline) أو في النص (line-through) مع لون وشكل وسُمك. الروابط ليها underline افتراضي.
keywords: text-decoration, underline, line-through, overline, wavy, خط تحت, شطب, روابط
related: text-decoration-thickness, text-underline-offset, color, text-transform
---

## intro

الخاصية `text-decoration` بتضيف **خطوط زخرفية** على النص: **`underline`** (خط تحت)، **`overline`** (خط فوق)، **`line-through`** (شطب في النص). وهي اختصار لـ: `text-decoration: [line] [style] [color] [thickness]` يعني ممكن تكتب `underline wavy #c9772f 2px` وتجيب خط متموج بلون مخصص وسُمك.

الأنماط (`style`): `solid` (عادي) و`double` و`dotted` و`dashed` و`wavy` (متموج، زي تحت كلمات الخطأ الإملائي).

الاستخدام الشائع جداً: **إزالة** الخط التحتاني من الروابط بـ `text-decoration: none`. لكن **حذر وصولية**: خط الروابط بيساعد الناس اللي عندها عمى ألوان على التعرف عليها، فلو شلته من الروابط جوه النص، لازم تميّزها بطريقة تانية (لون وتباين عالي أو سُمك).

للتحكم في سُمك الخط وبعده عن النص شوف [[text-decoration-thickness]] و[[text-underline-offset]].

## try

```html
<style>
  p { margin:5px 0; color:#3d2c18; font-size:1.2rem; }
</style>
<p style="text-decoration:underline">خط تحت underline</p>
<p style="text-decoration:overline">خط فوق overline</p>
<p style="text-decoration:line-through">شطب line-through</p>
<p style="text-decoration:underline wavy #b5551f">خط متموج wavy</p>
```

## syntax

```css nolive
text-decoration: none;
text-decoration: underline;
text-decoration: underline dotted #c9772f;
text-decoration: line-through 2px;
text-decoration: underline wavy red 1px;
```

- **القيمة المبدئية**: `none` (والروابط underline افتراضياً).
- **بتتوارث؟** لأ (بترسم على الأولاد).
- **اختصار لـ**: line + style + color + thickness.

## values

### none
بدون خط.

### underline
خط تحت.

### overline
خط فوق.

### line-through
شطب في المنتصف.

## use

- إزالة خط الروابط في القوائم.
- شطب سعر قديم.
- خط متموج للتنبيه.

## avoid

- إزالة underline من روابط داخل نص بدون تمييز بديل.
- underline لنص مش رابط (بيلخبط المستخدم).

## examples

### 1) الأنماط
solid و double و dotted و dashed و wavy.

```html
<style>
  p { margin:3px 0; color:#3d2c18; font-size:1.1rem; }
</style>
<p style="text-decoration:underline solid">solid</p><p style="text-decoration:underline double">double</p><p style="text-decoration:underline dotted">dotted</p><p style="text-decoration:underline dashed">dashed</p><p style="text-decoration:underline wavy #b5551f">wavy</p>
```



### 2) سعر قديم
line-through للسعر المشطوب.

```html
<style>
  .old { text-decoration:line-through; color:#8a7a62; margin-inline-end:8px; }
  .new { color:#3d7a5a; font-weight:bold; font-size:1.3rem; }
</style>
<span class="old">500 جنيه</span><span class="new">350 جنيه</span>
```



### 3) رابط بدون خط
وتمييزه بلون وسُمك.

```html
<style>
  a { color:#b5551f; font-weight:700; text-decoration:none; font-size:1.2rem; }
  a:hover { text-decoration:underline; }
</style>
<a href="#">رابط (مرّر الماوس)</a>
```



### 4) خط بلون وسُمك
اختصار كامل.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.4rem; text-decoration:underline wavy #c9772f 2px; }
</style>
<p>نص بخط متموج برتقالي</p>
```



## mistakes

### إزالة خط كل الروابط

```css bad
a { text-decoration:none; }  /* وفي النص مش باينة */
```

```css good
a { text-decoration:underline; }
nav a { text-decoration:none; }
```

روابط النص لازم تتميّز.

### underline لنص عادي

```css bad
.important { text-decoration:underline; }  /* المستخدم يظنه رابط */
```

```css good
.important { font-weight:700; color:#b5551f; }
```

الخط التحتاني للروابط.

## quiz

### line-through بتعمل؟
- [ ] خط تحت
- [x] شطب في المنتصف
- [ ] خط فوق
- [ ] لا شيء

شطب.

### لإزالة خط الرابط؟
- [x] text-decoration:none
- [ ] color:none
- [ ] border:none
- [ ] display:none

none.

### wavy معناها؟
- [x] خط متموج
- [ ] خط غامق
- [ ] خط منقط
- [ ] بدون خط

متموج.

## refs

- [MDN: text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)
