---
id: fn-hwb
kind: function
cat: fn-color
chip: hwb()
title: دالة hwb(): درجة وبياض وسواد
en: CSS hwb() function
status: stable
support: all
size: compact
mdn: color_value/hwb
summary: hwb() بتكوّن لون من الدرجة ونسبة البياض ونسبة السواد: بديل بديهي لـ hsl بيحاكي خلط الدهانات.
keywords: hwb, hue whiteness blackness, ألوان, خلط
related: fn-hsl, fn-rgb, fn-oklch, colors-guide
---

## intro

الدالة `hwb()` بتوصف اللون بـ: **H** (درجة اللون زي hsl) و**W** (Whiteness = كمية البياض اللي بتضيفه) و**B** (Blackness = كمية السواد). فكرتها تقليد **الرسام**: بتبدأ بلون نقي وبتضيف له **أبيض** يفتّحه أو **أسود** يغمّقه. مثال: `hwb(30 20% 10%)`. لو W وB صفر = لون نقي. ولو مجموعهم 100% أو أكتر بتبقى درجة رمادي. بعض الناس بيلاقوها **أسهل من hsl** لاختيار «نفس اللون لكن أفتح/أغمق». بتقبل شفافية بعد `/`. دعمها جيد في المتصفحات الحديثة. وهي قريبة من [[fn-hsl]] في الفكرة.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hwb(30 0% 0%)">نقي</span><span class="s" style="background:hwb(30 30% 0%)">+أبيض</span><span class="s" style="background:hwb(30 0% 40%);color:#f3ede0">+أسود</span><span class="s" style="background:hwb(30 40% 40%)">رمادي</span>
```

## syntax

```css nolive
color: hwb(30 20% 10%);
color: hwb(30 20% 10% / 0.5);
```

- W وB نسب مئوية.
- مجموعهم ≥100% = رمادي.

## use

- خلط لون مع أبيض/أسود بسهولة.
- تفكير بطريقة الرسام في الدرجات.

## avoid

- مجموع W+B فوق 100% بدون قصد.

## examples

### 1) نقي وبياض وسواد
3 حالات.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hwb(30 0% 0%)">نقي</span><span class="s" style="background:hwb(30 40% 0%)">+أبيض</span><span class="s" style="background:hwb(30 0% 50%);color:#f3ede0">+أسود</span>
```



### 2) درجات الأخضر
نفس H.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hwb(140 10% 40%);color:#f3ede0">أغمق</span><span class="s" style="background:hwb(140 30% 20%)">وسط</span><span class="s" style="background:hwb(140 60% 5%)">أفتح</span>
```



### 3) شفافية
alpha.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<div style="background:#efe0bd;padding:6px;border-radius:8px"><span class="s" style="background:hwb(30 10% 10% / .5)">50%</span></div>
```



## mistakes

### مجموع فوق 100

```css bad
hwb(30 70% 70%)  /* رمادي */
```

```css good
hwb(30 20% 20%)
```

قلل W وB.

## quiz

### hwb تعني؟
- [x] درجة وبياض وسواد
- [ ] أحمر أخضر أزرق
- [ ] درجة وتشبّع وإضاءة
- [ ] لون وحجم

Hue Whiteness Blackness.

### W وB صفر؟
- [x] لون نقي
- [ ] رمادي
- [ ] أسود
- [ ] أبيض

نقي.

## refs

- [MDN: hwb()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb)
