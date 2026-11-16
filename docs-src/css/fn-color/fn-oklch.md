---
id: fn-oklch
kind: function
cat: fn-color
chip: oklch()
title: دالة oklch(): ألوان متسقة إدراكياً
en: CSS oklch() function
status: stable
support: all
size: compact
mdn: color_value/oklch
summary: oklch() بتكوّن لون من إضاءة وكروما ودرجة بنظام مطابق لإدراك العين: درجات متساوية السطوع وألوان أنقى وأوسع.
keywords: oklch, oklab, perceptual, لون حديث, p3, wide gamut
related: fn-hsl, fn-color-mix, fn-color, colors-guide
---

## intro

الدالة `oklch()` هي نظام الألوان **الأحدث والأفضل** لمصممي الواجهات. بتوصف اللون بـ: **L** (Lightness = الإضاءة 0 لـ 1 أو %) و**C** (Chroma = كثافة اللون 0 لـ ~0.4) و**H** (Hue = الدرجة 0-360). الميزة الكبرى: **مطابقة لإدراك العين**: لو عملت لونين بنفس `L` بيبانوا **بنفس السطوع** فعلاً (عكس hsl اللي الأصفر فيه بيبان أسطع بكتير من الأزرق بنفس L!). وده بيخلّي مجموعات الألوان (palettes) متسقة وبيسهّل عمل **تباين وصولية** مضمون.

وكمان بتدعم **ألوان أوسع من sRGB** (شاشات P3 الحديثة بتعرض ألوان أنقى). مثال: `oklch(0.7 0.12 60)` برتقالي دافي. شفافية بـ `/`. مفيدة مع [[fn-color-mix]] لمزج ألوان طبيعي. دعمها موجود في كل المتصفحات الحديثة، ولو محتاج بديل قديم اكتب لون hex قبلها كـ fallback.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:oklch(0.45 0.09 60);color:#f3ede0">L .45</span><span class="s" style="background:oklch(0.65 0.12 60)">L .65</span><span class="s" style="background:oklch(0.85 0.06 60)">L .85</span><span class="s" style="background:oklch(0.7 0.1 150)">أخضر</span>
```

## syntax

```css nolive
color: oklch(0.7 0.12 60);
color: oklch(70% 0.12 60 / 0.5);
/* fallback */
color: #c9772f;
color: oklch(0.7 0.12 60);
```

- L من 0 لـ 1 (أو %).
- C تقريباً 0 لـ 0.4.
- H من 0 لـ 360.
- حط hex قبلها كبديل.

## use

- palettes متسقة السطوع.
- تباين وصولية مضمون.
- ألوان P3 الأوسع.

## avoid

- نسيان fallback للمتصفحات القديمة.
- chroma أكبر من اللازم (يتقص).

## examples

### 1) درجات متساوية
نفس L وH مختلفة.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:oklch(0.7 0.1 30)">30</span><span class="s" style="background:oklch(0.7 0.1 90)">90</span><span class="s" style="background:oklch(0.7 0.1 150)">150</span><span class="s" style="background:oklch(0.7 0.1 250)">250</span>
```



### 2) تدرج إضاءة
نفس اللون.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:oklch(0.4 0.1 60);color:#f3ede0">.4</span><span class="s" style="background:oklch(0.6 0.12 60)">.6</span><span class="s" style="background:oklch(0.8 0.08 60)">.8</span>
```



### 3) كروما
كثافة.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:oklch(0.7 0 60)">0</span><span class="s" style="background:oklch(0.7 0.06 60)">.06</span><span class="s" style="background:oklch(0.7 0.12 60)">.12</span>
```



### 4) مع fallback
سطرين.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:#c9772f;background:oklch(0.65 0.13 60)">fallback</span>
```



## mistakes

### نسيان fallback

```css bad
color:oklch(0.7 0.12 60);
```

```css good
color:#c9772f;
color:oklch(0.7 0.12 60);
```

للقديم.

## quiz

### ميزة oklch الأساسية؟
- [x] مطابقة لإدراك العين
- [ ] أقصر
- [ ] أقدم
- [ ] أسرع

سطوع إدراكي.

### L معناها؟
- [x] الإضاءة
- [ ] اللون
- [ ] الحجم
- [ ] الشفافية

Lightness.

## refs

- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
