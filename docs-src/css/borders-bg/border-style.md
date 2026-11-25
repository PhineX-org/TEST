---
id: border-style
kind: property
cat: borders-bg
chip: border-style
title: نوع الـ border
en: CSS border-style property
status: stable
support: all
size: compact
mdn: border-style
summary: border-style بتحدد شكل الحد: solid وdashed وdotted وdouble وgroove وridge وinset وoutset وnone وhidden.
keywords: border-style, solid, dashed, dotted, double, groove, ridge, inset, outset, نوع الحد
related: border, border-width, border-color, outline
---

## intro

الخاصية `border-style` بتحدد **شكل خط الحد**، وهي **الشرط الأساسي** لظهور أي حد (الافتراضي `none`). القيم: `solid` (خط متصل، الأشهر)، `dashed` (شرط)، `dotted` (نقط)، `double` (خطين)، `groove` و`ridge` و`inset` و`outset` (تأثيرات ثلاثية الأبعاد قديمة)، `none` (بدون حد)، و`hidden` (زي none لكنه بيكسب في تعارض حدود الجداول). زي `margin` تقدر تكتب 1-4 قيم لجهات مختلفة. تختصرها في [[border]] مع [[border-width]] و[[border-color]].

## try

```html
<style>
  .b { border-width:4px; border-color:#7a4a1d; border-style:dotted; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">غيّر النوع</div>
```

## syntax

```css nolive
border-style: solid;
border-style: dashed dotted;
border-style: double;
border-style: none;
```

- **القيمة المبدئية**: `none`.
- 1-4 قيم.

## values

### solid
خط متصل.

### dashed
شرط.

### dotted
نقط.

### double
خطين (يحتاج 3px+).

### none
بدون حد.

## use

- `solid` للحدود العادية.
- `dashed` للتمييز أو upload zones.
- `dotted` لروابط ثانوية.

## avoid

- الأنواع المجسّمة (groove/ridge/inset/outset) لأنها قديمة المظهر.

## examples

### 1) كل الأنواع
مقارنة سريعة.

```html
<style>
  div { border-width:4px; border-color:#7a4a1d; padding:4px 8px; margin:4px 0; color:#3d2c18; background:#efe0bd; }
</style>
<div style="border-style:solid">solid</div><div style="border-style:dashed">dashed</div>
<div style="border-style:dotted">dotted</div><div style="border-style:double">double</div>
```



### 2) أنواع مختلفة لكل جهة
1-4 قيم.

```html
<style>
  .b { border-width:4px; border-color:#3d7a5a; border-style:solid dashed dotted double; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">فوق/يمين/تحت/شمال</div>
```



### 3) upload zone
dashed للمنطقة.

```html
<style>
  .u { border:3px dashed #c9772f; border-radius:10px; padding:18px; text-align:center; color:#3d2c18; background:#f3e6c9; }
</style>
<div class="u">اسحب الملف هنا</div>
```



## mistakes

### double بسُمك رفيع

```css bad
.a { border:1px double; }  /* تظهر خط واحد */
```

```css good
.a { border:4px double #7a4a1d; }
```

double محتاج سُمك 3px على الأقل.

## quiz

### الافتراضي؟
- [ ] solid
- [x] none
- [ ] dashed
- [ ] hidden

none.

### أشهر نوع؟
- [ ] groove
- [x] solid
- [ ] ridge
- [ ] outset

solid.

## refs

- [MDN: border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)
