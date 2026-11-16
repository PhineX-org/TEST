---
id: container-type
kind: property
cat: modern-props
chip: container-type
title: تحويل العنصر لحاوية استعلام
en: CSS container-type property
status: stable
support: all
size: compact
mdn: container-type
summary: container-type بتخلّي العنصر «حاوية» تقدر الأبناء يستعلموا عن حجمها بـ @container: size أو inline-size.
keywords: container-type, container queries, inline-size, size, حاوية
related: container-name, container, at-container
---

## intro

الخاصية `container-type` بتحوّل عنصر لـ **حاوية استعلام (query container)**، فتقدر **أبناءه** يغيّروا شكلهم حسب **حجم الحاوية نفسها** مش حجم الشاشة. ده بيخلّي المكوّن «ذكي» ويتصرف صح في أي مكان تحطه فيه (شريط جانبي ضيق أو منطقة رئيسية واسعة). القيم: **`inline-size`** (الأشهر: بتتابع العرض فقط) و**`size`** (العرض والارتفاع، وبيتطلب أبعاد ثابتة) و**`normal`** (مش حاوية). بعد كده تكتب [[at-container]] زي `@container (min-width: 400px) { ... }`. نبهة: بتطبق «containment» على العنصر، فحجمه لازم ميعتمدش على محتواه في الاتجاه المقيس.

## try

```html
<style>
  .c { container-type:inline-size; resize:horizontal; overflow:auto; width:260px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .k { background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 240px) { .k { background:#bcd4a8; } .k::after { content:" (واسع)"; } }
</style>
<div class="c"><div class="k">بطاقة</div></div>
```

## syntax

```css nolive
.card-wrap { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; }
}
```

- **القيمة المبدئية**: `normal`.
- inline-size هي الأشهر.
- محتاج @container.

## values

### inline-size
تتابع العرض.

### size
العرض والارتفاع.

### normal
مش حاوية.

## use

- مكونات قابلة لإعادة الاستخدام.
- بطاقات تتغير حسب مكانها.

## avoid

- `size` بدون أبعاد ثابتة.

## examples

### 1) بطاقة متجاوبة
حسب الحاوية.

```html
<style>
  .w { container-type:inline-size; resize:horizontal; overflow:auto; width:280px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .k { display:grid; gap:6px; background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 260px) { .k { grid-template-columns:1fr 1fr; } }
</style>
<div class="w"><div class="k"><span>أ</span><span>ب</span></div></div>
```



### 2) تغيير اللون
عتبة العرض.

```html
<style>
  .w { container-type:inline-size; width:200px; border:2px dashed #bda27a; padding:6px; resize:horizontal; overflow:auto; max-width:100%; }
  .k { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 180px) { .k { background:#bcd4a8; } }
</style>
<div class="w"><div class="k">اسحب الركن لتغيير الحجم</div></div>
```



### 3) بدون container-type
الاستعلام مبيشتغلش.

```html
<style>
  .w { width:300px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .k { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 100px) { .k { background:#bcd4a8; } }
</style>
<div class="w"><div class="k">لسه بنفس اللون: مفيش حاوية</div></div>
```



## mistakes

### نسيان container-type

```css bad
@container (min-width:400px) { ... }  /* مفيش حاوية */
```

```css good
.wrap { container-type:inline-size; }
```

لازم تعرّف الحاوية.

## quiz

### container-type بتعمل؟
- [x] تعرّف حاوية للاستعلام
- [ ] تلون
- [ ] تحرك
- [ ] تخفي

حاوية.

### الأشهر؟
- [x] inline-size
- [ ] size
- [ ] normal
- [ ] block

العرض فقط.

## refs

- [MDN: container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type)
