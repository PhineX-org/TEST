---
id: inline-size
kind: property
cat: logical
chip: inline-size
title: الحجم في اتجاه السطر (منطقي)
en: CSS inline-size property
status: stable
support: all
mdn: inline-size
summary: inline-size بتحدد حجم العنصر في اتجاه الكتابة: يساوي width في الكتابة الأفقية، وheight في الرأسية.
keywords: inline-size, width, logical, writing-mode, حجم منطقي
related: block-size, width, height, logical-properties-guide
---

## intro

الخاصية `inline-size` هي النسخة **المنطقية** من `width`. **inline** هو اتجاه **الكتابة على السطر**: في الكتابة الأفقية العادية (عربي/إنجليزي) هو **العرض** `width`، لكن لو غيّرت `writing-mode` لرأسي بيبقى هو **الارتفاع** `height` الفعلي. يعني `inline-size` بيعرف «طول العنصر على امتداد السطر» مهما كان اتجاه الكتابة. نظيرها [[block-size]] (للارتفاع). وكمان فيه `min-inline-size` و`max-inline-size`. في موقع عادي بالعربي بتساوي `width` بالظبط، فاستخدامها اختياري، بس مفيدة لو بتبني مكونات (components) يُعاد استخدامها مع أي اتجاه كتابة. قيمها نفس `width`: `px` و`%` و`auto` و`fit-content`. تخيّل خط القطار: «inline» هو طول القطار على السكة، سواء السكة أفقية ولا رأسية؛ فالخاصية دي بتقيس الطول على السكة مش «العرض» بمعناه الحرفي.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="inline-size:180px">inline-size: 180px</div></div>
<div class="w" style="writing-mode:vertical-rl;height:110px"><div class="i" style="inline-size:90px">رأسي: الطول</div></div>
```

## syntax

```css nolive
inline-size: 200px;
max-inline-size: 60ch;
inline-size: 100%;
```

- **القيمة المبدئية**: `auto`.
- تساوي width أفقياً.

## values

### `<length>`
قيمة ثابتة.

### `<percentage>`
نسبة.

### auto
تلقائي.

### fit-content
على قد المحتوى.

## use

- مكونات تدعم أكثر من اتجاه كتابة.
- max-inline-size لعرض قراءة مريح.
- مكتبات UI عامة تتحمل أي لغة.

## avoid

- خلط width وinline-size على نفس العنصر.
- نسيان إن المعنى بيتغير مع writing-mode.

## examples

### 1) أفقي
نفس width.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="inline-size:200px">200</div></div>
```



### 2) رأسي
بيبقى ارتفاع.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="writing-mode:vertical-rl;height:120px"><div class="i" style="inline-size:100px">رأسي</div></div>
```



### 3) عرض قراءة
max-inline-size.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><p style="max-inline-size:20ch;margin:0">نص طويل بيتحدد عرضه بعدد الأحرف عشان القراءة تبقى مريحة.</p></div>
```



### 4) نسبة
50%.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="inline-size:50%">50%</div></div>
```



## mistakes

### الخلط

```css bad
.a { width:200px; inline-size:100px; }
```

```css good
.a { inline-size:200px; }
```

الأخيرة بتكسب فاختار واحدة.

### ظن إنها ارتفاع دايماً

```css bad
.a { inline-size:100px; }  /* ارتفاع؟ */
```

```css good
.a { block-size:100px; }
```

الارتفاع هو block-size.

## quiz

### inline-size في الكتابة الأفقية؟
- [x] width
- [ ] height
- [ ] margin
- [ ] gap

العرض.

### مع writing-mode رأسي بتبقى؟
- [x] الارتفاع الفعلي
- [ ] العرض
- [ ] المسافة
- [ ] اللون

اتجاه السطر.

### نظيرها للارتفاع؟
- [x] block-size
- [ ] line-height
- [ ] min-height
- [ ] size

block-size.

## refs

- [MDN: inline-size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size)
