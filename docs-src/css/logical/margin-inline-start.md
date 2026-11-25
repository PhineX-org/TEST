---
id: margin-inline-start
kind: property
cat: logical
chip: margin-inline-start
title: margin بداية السطر
en: CSS margin-inline-start property
status: stable
support: all
size: compact
mdn: margin-inline-start
summary: margin-inline-start margin في بداية السطر: يمين في العربي وشمال في الإنجليزي. بديل ذكي لـ margin-right.
keywords: margin-inline-start, بداية, rtl, هامش
related: margin-inline-end, margin-inline, margin-right, margin-left
---

## intro

الخاصية `margin-inline-start` بتحط margin **عند بداية السطر** فقط. في العربي (RTL) البداية = **يمين**، وفي الإنجليزي (LTR) = **شمال**. بدل ما تكتب كودين (`margin-right` للعربي و`margin-left` للإنجليزي) تكتب سطر واحد وهو بيتصرف صح لوحده. مثال كلاسيكي: أيقونة قبل النص: `.icon { margin-inline-end: 8px; }` تفصل الأيقونة عن النص في أي لغة. وهي جزء من عائلة [[margin-inline]]. زي ما بنقول: «سيب مسافة من جهة البداية» من غير ما تفكر في الاتجاه.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="margin-inline-start:70px">بداية = يمين في RTL</div></div>
<div dir="ltr" class="w"><div class="i" style="margin-inline-start:70px">start = left in LTR</div></div>
```

## syntax

```css nolive
margin-inline-start: 20px;
margin-inline-start: auto;  /* دفع العنصر لنهاية السطر */
```

- **القيمة المبدئية**: `0`.
- بتتقلب مع الاتجاه.

## values

### `<length>`
مسافة.

### auto
تدفع العنصر للجهة التانية.

## use

- مسافة جانب أيقونة.
- دفع عنصر لنهاية السطر بـ auto.

## avoid

- margin-right ثابتة في موقع RTL/LTR.

## examples

### 1) بداية RTL
يمين.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="margin-inline-start:60px">عنصر</div></div>
```



### 2) بداية LTR
شمال.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="ltr" class="w"><div class="i" style="margin-inline-start:60px">item</div></div>
```



### 3) auto في flex
يدفع للنهاية.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="display:flex"><div class="i">أول</div><div class="i" style="margin-inline-start:auto">آخر</div></div>
```



## mistakes

### margin-right لأيقونة

```css bad
.icon { margin-right:8px; }
```

```css good
.icon { margin-inline-end:8px; }
```

بتتقلب لوحدها.

## quiz

### start في RTL هي؟
- [x] اليمين
- [ ] الشمال
- [ ] فوق
- [ ] تحت

يمين.

### auto مع start في flex؟
- [x] يدفع العنصر للنهاية
- [ ] يخفيه
- [ ] يكبره
- [ ] يوسطه

دفع.

## refs

- [MDN: margin-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start)
