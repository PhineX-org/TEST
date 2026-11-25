---
id: fn-color-mix
kind: function
cat: fn-color
chip: color-mix()
title: مزج لونين
en: CSS color-mix() function
status: stable
support: all
mdn: color_value/color-mix
summary: color-mix() بتمزج لونين بنسبة معينة في فضاء لوني: color-mix(in srgb, #c9772f 60%, #efe0bd). تعمل درجات وhover من غير حساب.
keywords: color-mix, مزج الألوان, in srgb, in oklch, hover, درجات
related: fn-oklch, fn-hsl, fn-var, colors-guide, fn-light-dark
---

## intro

الدالة `color-mix()` بتمزج **لونين** بنسبة بتحددها وبترجّع لون جديد، **بدون ما تحسب القيم بنفسك**. الصيغة: `color-mix(in <space>, <color1> <pct?>, <color2> <pct?>)`.

مثال: `color-mix(in srgb, #c9772f 60%, #efe0bd)` = 60% برتقالي + 40% بيج. لو ما كتبتش نسب، بيبقى 50/50.

استخدامات ممتازة:
- **حالات hover/active**: `background: color-mix(in srgb, var(--brand), black 15%)` أغمق شوية من اللون الأساسي، فمتحتاجش تحدد لون جديد لكل حالة.
- **تفتيح/تغميق** بخلطه مع أبيض/أسود/شفاف: `color-mix(in srgb, var(--brand), transparent 70%)` يعمل نسخة شفافة.
- **ثيمات ديناميكية**: كل الألوان من لون أساسي واحد.

**فضاء الألوان** (`srgb`, `oklch`, `hsl`...) بيأثر على النتيجة: `in oklch` عادة بيدّي نتايج أنعم وأطبع. وبتقبل ألوان من متغيرات CSS. دعمها جيد في المتصفحات الحديثة.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:#c9772f">أ</span><span class="s" style="background:color-mix(in srgb,#c9772f 70%,#efe0bd)">70%</span><span class="s" style="background:color-mix(in srgb,#c9772f 40%,#efe0bd)">40%</span><span class="s" style="background:#efe0bd">ب</span>
```

## syntax

```css nolive
background: color-mix(in srgb, #c9772f 60%, #efe0bd);
background: color-mix(in oklch, var(--brand), black 20%);
background: color-mix(in srgb, var(--brand), transparent 70%);
```

- `in <فضاء>` إجباري.
- النسب اختيارية (50/50 افتراضي).
- `transparent` للشفافية.

## use

- حالات hover وactive.
- تفتيح وتغميق من لون أساسي.
- ألوان ثيم ديناميكية.

## avoid

- نسيان `in <فضاء>`.
- نسب مجموعها صفر.

## examples

### 1) مزج لونين
برتقالي وبيج.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:#c9772f">أ</span><span class="s" style="background:color-mix(in srgb,#c9772f 70%,#efe0bd)">70</span><span class="s" style="background:color-mix(in srgb,#c9772f 40%,#efe0bd)">40</span><span class="s" style="background:#efe0bd">ب</span>
```



### 2) hover من لون واحد
أغمق بالمزج.

```html
<style>
  :root { --brand:#c9772f; }
  button { background:var(--brand); color:#f3ede0; border:0; padding:8px 18px; border-radius:8px; font-weight:bold; transition:background .2s; }
  button:hover { background:color-mix(in srgb, var(--brand), #3d2c18 25%); }
</style>
<button>مرّر عليّا</button>
```



### 3) شفافية
مع transparent.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<div style="background:#efe0bd;padding:6px;border-radius:8px"><span class="s" style="background:color-mix(in srgb,#7a4a1d,transparent 70%)">30%</span></div>
```



### 4) فضاءات مختلفة
srgb مقابل oklch.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:color-mix(in srgb,#3d7a5a,#c9772f)">srgb</span><span class="s" style="background:color-mix(in oklch,#3d7a5a,#c9772f)">oklch</span>
```



## mistakes

### نسيان الفضاء

```css bad
color-mix(#c9772f, #efe0bd)  /* غلط */
```

```css good
color-mix(in srgb, #c9772f, #efe0bd)
```

in <فضاء> إجباري.

### نسب مجموعها صفر

```css bad
color-mix(in srgb, red 0%, blue 0%)  /* غير صالح */
```

```css good
color-mix(in srgb, red 60%, blue)
```

لازم نسبة واحدة على الأقل موجبة.

## quiz

### color-mix بتمزج؟
- [x] لونين
- [ ] 3 ألوان
- [ ] صورة
- [ ] خطين

لونين.

### الاستخدام العملي؟
- [x] hover من لون واحد
- [ ] تحريك
- [ ] خط
- [ ] حجم

تفتيح/تغميق.

### الفضاء بيتحدد بـ؟
- [x] in
- [ ] at
- [ ] on
- [ ] with

in srgb.

## refs

- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
