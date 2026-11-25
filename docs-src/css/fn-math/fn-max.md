---
id: fn-max
kind: function
cat: fn-math
chip: max()
title: الأكبر
en: CSS max() function
status: stable
support: all
size: compact
mdn: max
summary: max() بترجع أكبر قيمة من قايمة: font-size: max(1rem, 2vw) يعني «2vw بس مايقلش عن 1rem».
keywords: max, أكبر قيمة, min-width, حد أدنى
related: fn-min, fn-clamp, fn-calc, min-width
---

## intro

الدالة `max()` عكس [[fn-min]]: بتاخد قايمة قيم وبترجّع **أكبرهم**. مفيدة كـ **حد أدنى** (زي `min-width`) في سطر واحد: `font-size: max(1rem, 2vw);` يعني الخط يكبر مع الشاشة (`2vw`) لكن **مايبقاش أصغر من `1rem`** أبداً. وكمان لو عايز مسافة جانبية: `padding-inline: max(16px, 5vw);` فتبقى على الأقل 16px. تقبل حسابات وأنواع وحدات مختلفة. وجمع [[fn-min]] و`max` في [[fn-clamp]]. تخيّل إنك بتقول لنفسك: «خد الأكبر بين المقاسين دول»؛ فمهما صغرت الشاشة، الحد الأدنى هو اللي هيمنع القيمة إنها تصغر أكتر من اللازم.

## try

```html
<style>
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:max(40%, 160px); font-weight:bold; }
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
</style>
<div class="p"><div class="a">max(40%, 160px)</div></div>
```

## syntax

```css nolive
font-size: max(1rem, 2vw);
width: max(40%, 200px);
padding-inline: max(16px, 5vw);
```

- بتختار الأكبر.

## use

- حد أدنى لخط أو عرض.
- مسافات لا تقل عن قيمة.

## avoid

- الخلط مع min.

## examples

### 1) عرض بحد أدنى
40% أو 160 أيهما أكبر.

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:max(40%, 160px); font-weight:bold; }
</style>
<div class="p"><div class="a">max(40%, 160px)</div></div>
```



### 2) خط لا يصغر
1rem كحد أدنى.

```html
<style>
  h4 { font-size:max(1rem, 2.5vw); color:#7a4a1d; margin:6px 0; }
</style>
<h4>خط مرن بحد أدنى</h4>
```



### 3) padding جانبي
16px على الأقل.

```html
<style>
  .a { padding-inline:max(16px, 5vw); padding-block:8px; background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">padding جانبي مرن</div>
```



## mistakes

### الخلط مع min

```css bad
width:max(90%,600px);  /* على شاشة كبيرة ممكن يوسّع جداً */
```

```css good
width:min(90%,600px);
```

حدد الهدف: أدنى أم أقصى.

## quiz

### max(1rem, 2vw)؟
- [x] الأكبر منهم
- [ ] الأصغر
- [ ] المجموع
- [ ] الفرق

الأكبر.

### بتشبه؟
- [x] min-width
- [ ] max-width
- [ ] width
- [ ] gap

حد أدنى.

## refs

- [MDN: max()](https://developer.mozilla.org/en-US/docs/Web/CSS/max)
