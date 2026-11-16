---
id: fn-color
kind: function
cat: fn-color
chip: color()
title: دالة color(): فضاءات ألوان محددة
en: CSS color() function
status: stable
support: all
size: compact
mdn: color_value/color
summary: color() بتحدد لون في فضاء معين مثل display-p3 أو srgb-linear، لألوان أنقى وأوسع من sRGB.
keywords: color, display-p3, wide gamut, srgb-linear, rec2020
related: fn-oklch, fn-rgb, fn-hsl, colors-guide
---

## intro

الدالة `color()` بتحدد لون في **فضاء ألوان معيّن** تختاره بنفسك: `color(display-p3 0.8 0.45 0.15)`. أشهر استخدام: **display-p3**، فضاء بيغطي ألوان **أوسع بنحو 25%** من sRGB المعتاد، وبتعرضه شاشات أجهزة أبل والشاشات الحديثة. بتدّيك ألوان **أنقى وأزهى** (خصوصاً الأخضر والبرتقالي). القنوات هنا أرقام من 0 لـ 1 (أو نسب). فضاءات تانية: `srgb-linear` و`rec2020` و`xyz`. الشفافية بـ `/`. لو الشاشة مش بتدعم فضاء P3 بيتحول للأقرب. اكتب لون sRGB احتياطي قبلها. عملياً [[fn-oklch]] بيدّيك نفس الألوان الواسعة بطريقة أسهل للتفكير.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:#c9772f;background:color(display-p3 0.85 0.45 0.1)">p3</span><span class="s" style="background:color(srgb 0.79 0.47 0.18)">srgb</span>
```

## syntax

```css nolive
color: color(display-p3 0.85 0.45 0.1);
color: color(srgb 0.79 0.47 0.18 / 0.5);
/* fallback */
color: #c9772f;
color: color(display-p3 0.85 0.45 0.1);
```

- القنوات من 0 لـ 1.
- اكتب fallback بسيط قبلها.
- الفضاء بعد color(.

## use

- ألوان أنقى على شاشات P3.
- هوية بصرية بألوان زاهية على الأجهزة الحديثة.

## avoid

- نسيان fallback.

## examples

### 1) p3 مع fallback
سطرين.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:#c9772f;background:color(display-p3 0.85 0.45 0.1)">p3</span>
```



### 2) srgb
نفس rgb لكن بمدى 0-1.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:color(srgb 0.79 0.47 0.18)">srgb</span>
```



### 3) شفافية
alpha.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<div style="background:#efe0bd;padding:6px;border-radius:8px"><span class="s" style="background:color(display-p3 0.85 0.45 0.1 / .5)">50%</span></div>
```



## mistakes

### قنوات بنطاق 255

```css bad
color(srgb 201 119 47)  /* غلط */
```

```css good
color(srgb 0.79 0.47 0.18)
```

المدى 0-1.

## quiz

### display-p3 بيدّي؟
- [x] ألوان أوسع من sRGB
- [ ] ألوان أقل
- [ ] أبيض وأسود فقط
- [ ] خطوط

gamut أوسع.

### مدى القنوات؟
- [x] 0 لـ 1
- [ ] 0 لـ 255
- [ ] 0 لـ 360
- [ ] 0 لـ 100

عشري.

## refs

- [MDN: color()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)
