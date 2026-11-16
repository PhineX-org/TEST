---
id: at-font-face
kind: atrule
cat: at-rules
chip: @font-face
title: قاعدة @font-face: تحميل خط مخصص
en: CSS @font-face at-rule
status: stable
support: all
mdn: @font-face
summary: قاعدة @font-face بتعرّف خط مخصص تحمّله من ملف (woff2) وتديله اسم عشان تستخدمه في font-family.
keywords: @font-face, font-display, woff2, خط مخصص, تحميل خط, unicode-range
related: font-family, font-weight, font-style, at-import
---

## intro

القاعدة `@font-face` بتخلّيك **تحمّل خط مخصص** من ملف على السيرفر (أو من جهاز المستخدم) وتديله **اسم** تستخدمه في [[font-family]]، بدل ما تعتمد على خطوط الجهاز الموجودة.

الأوصاف الرئيسية جوه القاعدة:
- **`font-family`**: الاسم اللي إنت بتختاره (مثلاً `"Cairo"`).
- **`src`**: مصدر الملف: `url("cairo.woff2") format("woff2")`، وممكن قايمة مصادر احتياطية، أو `local("Cairo")` لو مثبّت عند المستخدم.
- **`font-weight`** و**`font-style`**: الوزن والميل اللي الملف بيمثّله (ممكن مدى للخطوط المتغيرة `200 900`).
- **`font-display`**: سلوك العرض أثناء التحميل: **`swap`** (اعرض خط بديل فوراً وبدّل لما يجهز: الأنسب غالباً) أو `block` أو `fallback` أو `optional`.
- **`unicode-range`**: تحمّل الملف بس لو الصفحة بتستخدم نطاق أحرف (مثلاً العربي) لتوفير الحجم.

نصايح: استخدم **`woff2`** (الأصغر والأوسع دعماً). وحمّل الخطوط من **نفس نطاقك** لو قدرت (أسرع وأخصوصية أحسن). وتجنب تحميل أوزان كتير. وللعربي: الخطوط الشهيرة زي Cairo وTajawal وAlmarai.

## try

```html
<style>
  @font-face { font-family:"MyGeorgia"; src:local("Georgia"), local("Times New Roman"); font-display:swap; }
  .f { font-family:"MyGeorgia", serif; font-size:1.3rem; color:#3d2c18; background:#efe0bd; padding:10px; border-radius:8px; }
</style>
<div class="f">The quick brown fox — خط معرّف بـ @font-face</div>
```

## syntax

```css nolive
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo.woff2") format("woff2");
  font-weight: 200 900;
  font-display: swap;
  unicode-range: U+0600-06FF;
}
body { font-family: "Cairo", system-ui, sans-serif; }
```

- `font-display: swap` الأنسب للويب.
- woff2 هو الصيغة الأفضل.
- حط خط احتياطي في font-family.

## use

- هوية بصرية بخط مخصص.
- خطوط عربية جميلة (Cairo, Tajawal).
- خط متغير (variable font) بمدى أوزان.

## avoid

- تحميل أوزان كتير (تبطّأ).
- نسيان الخط الاحتياطي.
- استخدام ttf/otf للويب بدل woff2.

## examples

### 1) التعريف الأساسي
خط وملف.

```html nolive
<style>
@font-face {
  font-family: "Cairo";
  src: url("fonts/cairo-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
body { font-family: "Cairo", system-ui, sans-serif; }
</style>
```



### 2) وزنين
عادي وعريض.

```html nolive
<style>
@font-face { font-family:"Cairo"; src:url("cairo-400.woff2") format("woff2"); font-weight:400; }
@font-face { font-family:"Cairo"; src:url("cairo-700.woff2") format("woff2"); font-weight:700; }
h1 { font-family:"Cairo"; font-weight:700; }
</style>
```



### 3) خط متغير
مدى أوزان.

```html nolive
<style>
@font-face {
  font-family: "CairoVar";
  src: url("cairo-var.woff2") format("woff2");
  font-weight: 200 900;   /* مدى */
}
p { font-family:"CairoVar"; font-weight:350; }
</style>
```



### 4) local كتشغيل حي
خط من جهازك.

```html
<style>
  @font-face { font-family:"MyMono"; src:local("Courier New"), local("Courier"); }
  .m { font-family:"MyMono", monospace; background:#efe0bd; color:#3d2c18; padding:10px; border-radius:8px; }
</style>
<div class="m">monospace via @font-face local()</div>
```



## mistakes

### بدون font-display

```css bad
@font-face { font-family:"X"; src:url(x.woff2); }  /* نص غير مرئي أثناء التحميل */
```

```css good
@font-face { ...; font-display:swap; }
```

swap يعرض بديل فوراً.

### بدون خط احتياطي

```css bad
body { font-family:"Cairo"; }
```

```css good
body { font-family:"Cairo", system-ui, sans-serif; }
```

لو فشل التحميل.

## quiz

### أفضل صيغة خط للويب؟
- [x] woff2
- [ ] ttf
- [ ] bmp
- [ ] pdf

الأصغر.

### font-display: swap تعني؟
- [x] اعرض بديل فوراً وبدّل لما يجهز
- [ ] اخفِ النص
- [ ] لا تحمّل
- [ ] حمّل لاحقاً

تجنب النص الغايب.

### الاسم اللي تستخدمه في font-family يجي من؟
- [x] font-family جوه @font-face
- [ ] src
- [ ] format
- [ ] unicode-range

إنت اللي بتختاره.

## refs

- [MDN: @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
