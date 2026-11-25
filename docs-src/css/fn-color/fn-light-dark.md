---
id: fn-light-dark
kind: function
cat: fn-color
chip: light-dark()
title: لون للفاتح ولون للغامق
en: CSS light-dark() function
status: stable
support: all
size: compact
mdn: color_value/light-dark
summary: light-dark(فاتح, غامق) بتختار لون حسب ثيم الصفحة (color-scheme) فتدعم الوضعين بسطر واحد.
keywords: light-dark, color-scheme, dark mode, الوضع الداكن, ثيم
related: color-scheme, fn-color-mix, at-media, colors-guide
---

## intro

الدالة `light-dark()` بتبسّط **الوضع الداكن** جداً: بتاخد **لونين** (الأول للوضع الفاتح والتاني للغامق) وبتختار المناسب تلقائياً: `color: light-dark(#3d2c18, #f3ede0);`. بدل ما تكتب `@media (prefers-color-scheme: dark)` وتكرر الخصائص. **شرط**: لازم تفعّل دعم الوضعين بـ [[color-scheme]]: `:root { color-scheme: light dark; }`، وبعدين الدالة تتبع تفضيل المستخدم. وتقدر تفرض وضع معين على قسم: `.card { color-scheme: dark; }` فالدالة جواه تدّي القيمة الغامقة. بتشتغل مع **الألوان فقط** (مش أي قيمة). مثالية لثيمات الموقع. دعمها حديث (2024+) فحط fallback قبلها لو لزم.

## try

```html
<style>
  :root { color-scheme: light dark; }
  .a { background:light-dark(#efe0bd, #3d2c18); color:light-dark(#3d2c18, #f3ede0); padding:10px; border-radius:8px; margin:4px 0; }
  .force { color-scheme:dark; }
</style>
<div class="a">يتبع تفضيل جهازك</div><div class="a force">مفروض غامق</div>
```

## syntax

```css nolive
:root { color-scheme: light dark; }
body {
  background: light-dark(#f3ede0, #3d2c18);
  color: light-dark(#3d2c18, #f3ede0);
}
```

- الأول فاتح والتاني غامق.
- لازم color-scheme.
- للألوان فقط.

## use

- دعم الوضعين بدون media query.
- ثيمات بسيطة.

## avoid

- نسيان color-scheme.
- استخدامها لقيم غير الألوان.

## examples

### 1) تلقائي
تفضيل الجهاز.

```html
<style>
  :root { color-scheme: light dark; }
  .a { background:light-dark(#efe0bd, #3d2c18); color:light-dark(#3d2c18, #f3ede0); padding:10px; border-radius:8px; }
</style>
<div class="a">يتبع جهازك</div>
```



### 2) فرض الغامق
لقسم واحد.

```html
<style>
  .a { background:light-dark(#efe0bd, #3d2c18); color:light-dark(#3d2c18, #f3ede0); padding:10px; border-radius:8px; margin:4px 0; }
  .d { color-scheme:dark; }
  .l { color-scheme:light; }
</style>
<div class="a l">فاتح</div><div class="a d">غامق</div>
```



### 3) متغيرات
ثيم كامل.

```html
<style>
  :root { color-scheme:light dark; --bg:light-dark(#f3ede0,#3d2c18); --fg:light-dark(#3d2c18,#f3ede0); }
  .a { background:var(--bg); color:var(--fg); padding:10px; border-radius:8px; }
</style>
<div class="a">من متغيرات</div>
```



## mistakes

### بدون color-scheme

```css bad
body { color:light-dark(black, white); }  /* دايماً فاتح */
```

```css good
:root { color-scheme:light dark; }
```

لازم تفعّل.

## quiz

### light-dark بتحتاج؟
- [x] color-scheme
- [ ] position
- [ ] display
- [ ] z-index

تفعيل الوضعين.

### الأول؟
- [x] فاتح
- [ ] غامق
- [ ] الاتنين
- [ ] لا شيء

light أولاً.

## refs

- [MDN: light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
