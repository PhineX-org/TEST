---
id: margin-inline
kind: property
cat: logical
chip: margin-inline
title: margin الاتجاه الأفقي (منطقي)
en: CSS margin-inline property
status: stable
support: all
mdn: margin-inline
summary: margin-inline بتحط margin على جانبي العنصر في اتجاه الكتابة (بداية ونهاية). بتتقلب لوحدها في العربي RTL بدل margin-left وmargin-right.
keywords: margin-inline, logical properties, rtl, margin, هامش, بداية ونهاية
related: margin-block, margin-inline-start, margin-inline-end, margin, logical-properties-guide
---

## intro

الخاصية `margin-inline` هي النسخة **المنطقية** من `margin-left` و`margin-right` مع بعض. بدل ما تقول «يمين» و«شمال»، بتقول **«بداية» و«نهاية» السطر** حسب اتجاه الكتابة. ده بيفرق جداً في المواقع العربية: في صفحة عربية (RTL) البداية هي اليمين والنهاية هي الشمال، وفي الإنجليزي (LTR) العكس. لو كتبت `margin-left: 20px` هتفضل شمال حتى لو الصفحة اتقلبت، لكن `margin-inline-start: 20px` هتتقلب **لوحدها** مع اتجاه الصفحة.

الصيغ:
- `margin-inline: 16px;` الـ margin للبداية والنهاية بنفس القيمة.
- `margin-inline: 8px 24px;` الأولى للبداية والتانية للنهاية.
- **`margin-inline: auto;`** لتوسيط الصندوق أفقياً (الأشهر!) مع `width` أو `max-width`.

زي ما تتخيل الكتاب: ناس بتفتحه من اليمين وناس من الشمال، لكن «الـ margin جنب الكعب» (الداخلي) هو هو بغض النظر عن الاتجاه. ده المقصود بـ start وend. الدعم ممتاز في كل المتصفحات الحديثة، فابدأ استخدمه كعادة، خصوصاً لو موقعك بيدعم لغتين.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="margin-inline:10px 60px">RTL: بداية 10 ونهاية 60</div></div>
<div dir="ltr" class="w"><div class="i" style="margin-inline:10px 60px">LTR: start 10 end 60</div></div>
```

## syntax

```css nolive
margin-inline: 16px;
margin-inline: 8px 24px;   /* بداية ثم نهاية */
margin-inline: auto;       /* توسيط */
```

- **القيمة المبدئية**: `0`.
- القيمة الأولى بداية والتانية نهاية.
- بتتقلب مع `dir` و`direction`.

## values

### `<length>`
مسافة ثابتة.

### `<percentage>`
نسبة من عرض الأب.

### auto
margin تلقائي (للتوسيط).

## use

- `margin-inline: auto` لتوسيط صندوق له عرض.
- مواقع بتدعم العربي والإنجليزي.
- بدل `margin-left` و`margin-right` المتساويين.

## avoid

- استخدام `margin-left` في موقع بيتقلب RTL/LTR.
- نسيان تحديد `width` مع `auto` فلا يحصل توسيط.

## examples

### 1) توسيط صندوق
auto على الجانبين.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="width:140px;margin-inline:auto;text-align:center">في النص</div></div>
```



### 2) بداية ونهاية في RTL
الأولى بداية (يمين).

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="margin-inline:0 80px">بداية 0 / نهاية 80</div></div>
```



### 3) نفس الكود في LTR
البداية بقت شمال.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="ltr" class="w"><div class="i" style="margin-inline:0 80px">start 0 / end 80</div></div>
```



### 4) مقارنة مع margin-left
left مبتتقلبش.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="margin-left:60px">margin-left: ثابت شمال</div></div>
<div dir="rtl" class="w"><div class="i" style="margin-inline-start:60px">inline-start: يمين</div></div>
```



## mistakes

### left وright في موقع ثنائي الاتجاه

```css bad
.card { margin-left:20px; }  /* غلط لو الصفحة RTL */
```

```css good
.card { margin-inline-start:20px; }
```

المنطقي بيتقلب مع الاتجاه.

### auto بدون عرض

```css bad
.box { margin-inline:auto; }  /* مفيش توسيط لأن العنصر عريض */
```

```css good
.box { width:200px; margin-inline:auto; }
```

لازم width أو max-width.

## quiz

### أشهر استخدام لـ margin-inline؟
- [x] auto لتوسيط صندوق
- [ ] تلوين
- [ ] تكبير النص
- [ ] إخفاء

margin-inline: auto.

### القيمة الأولى بتمثل؟
- [x] البداية
- [ ] اليمين دايماً
- [ ] الأعلى
- [ ] النهاية

start ثم end.

### في RTL البداية هي؟
- [x] اليمين
- [ ] الشمال
- [ ] الأعلى
- [ ] الأسفل

اليمين.

## refs

- [MDN: margin-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)
