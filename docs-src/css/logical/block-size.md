---
id: block-size
kind: property
cat: logical
chip: block-size
title: الحجم في اتجاه الكتل (منطقي)
en: CSS block-size property
status: stable
support: all
size: compact
mdn: block-size
summary: block-size بتحدد حجم العنصر في اتجاه تراص الكتل: يساوي height في الكتابة الأفقية.
keywords: block-size, height, logical, ارتفاع منطقي
related: inline-size, height, min-height, logical-properties-guide
---

## intro

الخاصية `block-size` هي النسخة المنطقية من `height`: حجم العنصر في **اتجاه تراص الكتل** (فوق لتحت في الكتابة الأفقية). في الكتابة العادية = `height`. ومع `writing-mode` رأسي بتبقى هي العرض الفعلي. بتكمل [[inline-size]]. وفيها `min-block-size` و`max-block-size`. استخدمها لو بتبني مكونات تتحمل أكتر من اتجاه كتابة، وإلا فـ `height` كفاية. تخيّل الكتل زي الأدوار في عمارة: block-size هو ارتفاع الدور الواحد في اتجاه التراص، وده بيتقاس من «بداية الكتلة» لـ«نهايتها».

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="block-size:60px;inline-size:160px">block-size 60</div></div>
```

## syntax

```css nolive
block-size: 120px;
min-block-size: 100vh;
block-size: auto;
```

- **القيمة المبدئية**: `auto`.
- تساوي height أفقياً.

## values

### `<length>`
قيمة ثابتة.

### auto
حسب المحتوى.

## use

- ارتفاع مكونات متعددة الاتجاه.
- min-block-size: 100vh لصفحة كاملة.

## avoid

- الخلط مع height.

## examples

### 1) أفقي
نفس height.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="block-size:56px">56</div></div>
```



### 2) رأسي
بيبقى عرض.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="writing-mode:vertical-rl;height:110px"><div class="i" style="block-size:60px">رأسي</div></div>
```



### 3) أقل ارتفاع
min-block-size.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="min-block-size:70px">أقل ارتفاع 70</div></div>
```



## mistakes

### الخلط

```css bad
.a { height:50px; block-size:80px; }
```

```css good
.a { block-size:80px; }
```

واحدة بس.

## quiz

### block-size أفقياً؟
- [x] height
- [ ] width
- [ ] margin
- [ ] top

الارتفاع.

### نظيرها؟
- [x] inline-size
- [ ] z-index
- [ ] gap
- [ ] order

inline-size.

## refs

- [MDN: block-size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size)
