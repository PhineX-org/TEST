---
id: writing-mode
kind: property
cat: typography
chip: writing-mode
title: اتجاه الكتابة (أفقي/رأسي)
en: CSS writing-mode property
status: stable
support: all
size: compact
mdn: writing-mode
summary: writing-mode بتحدد هل النص بيتكتب أفقي أو رأسي (vertical-rl وvertical-lr). مفيدة لعناوين جانبية وللغات آسيوية.
keywords: writing-mode, vertical-rl, horizontal-tb, نص رأسي, sideways
related: direction, transform, inline-size, block-size
---

## intro

الخاصية `writing-mode` بتحدد **اتجاه تدفق النص**: **`horizontal-tb`** (الافتراضي: أفقي من فوق لتحت) أو **`vertical-rl`** و**`vertical-lr`** (رأسي). النص الرأسي مألوف في الصينية واليابانية، وبنستخدمه في العربي/الإنجليزي لعمل **عناوين جانبية** أو تسميات على الحافة.

مهم: لما بتغيّر `writing-mode` الأبعاد «المنطقية» بتتغيّر: `inline-size` مبقتش العرض بل الارتفاع. فمع الاتجاه الرأسي الأفضل استخدام الخصائص المنطقية ([[inline-size]] و[[block-size]]). والحروف العربية في الوضع الرأسي بتتلف 90 درجة.

## try

```html
<style>
  .v { writing-mode:vertical-rl; background:#c9772f; color:#f3ede0; padding:10px 8px; border-radius:6px; font-weight:bold; display:inline-block; }
</style>
<div class="v">نص رأسي</div>
```

## syntax

```css nolive
writing-mode: horizontal-tb;
writing-mode: vertical-rl;
writing-mode: vertical-lr;
```

- **القيمة المبدئية**: `horizontal-tb`.
- **بتتوارث؟** أيوه.

## values

### horizontal-tb
أفقي (الافتراضي).

### vertical-rl
رأسي والأسطر من اليمين لليسار.

### vertical-lr
رأسي والأسطر من اليسار لليمين.

## use

- عناوين جانبية.
- تسميات رأسية على الحافة.

## avoid

- نص رأسي لفقرات طويلة بالعربي.

## examples

### 1) عنوان جانبي
شريط جانبي رأسي.

```html
<style>
  .row { display:flex; gap:10px; align-items:stretch; }
  .tag { writing-mode:vertical-rl; background:#7a4a1d; color:#f3ede0; padding:8px 6px; border-radius:6px; font-weight:bold; }
  .box { background:#efe0bd; color:#3d2c18; padding:10px; flex:1; }
</style>
<div class="row"><div class="tag">القسم</div><div class="box">محتوى القسم</div></div>
```



### 2) الأنواع
أفقي ورأسي.

```html
<style>
  div { display:inline-block; margin:4px; background:#efe0bd; color:#3d2c18; padding:6px 10px; border-radius:6px; }
</style>
<div style="writing-mode:horizontal-tb">أفقي</div><div style="writing-mode:vertical-rl">رأسي rl</div><div style="writing-mode:vertical-lr">رأسي lr</div>
```



### 3) إنجليزي رأسي
الحروف بتتلف.

```html
<style>
  .v { writing-mode:vertical-rl; background:#3d7a5a; color:#f3ede0; padding:10px 6px; border-radius:6px; display:inline-block; letter-spacing:.1em; }
</style>
<div class="v">PhineX</div>
```



## mistakes

### width/height بعد التغيير

```css bad
.v { writing-mode:vertical-rl; width:200px; }
```

```css good
.v { writing-mode:vertical-rl; block-size:200px; }
```

الخصائص المنطقية بتتبع الاتجاه.

## quiz

### الافتراضي؟
- [x] horizontal-tb
- [ ] vertical-rl
- [ ] vertical-lr
- [ ] sideways

أفقي.

### استخدام شائع؟
- [x] عناوين جانبية رأسية
- [ ] تلوين
- [ ] قص
- [ ] ظل

تسميات رأسية.

## refs

- [MDN: writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
