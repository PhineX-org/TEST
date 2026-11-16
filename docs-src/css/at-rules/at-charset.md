---
id: at-charset
kind: atrule
cat: at-rules
chip: @charset
title: قاعدة @charset: ترميز ملف CSS
en: CSS @charset at-rule
status: stable
support: all
size: compact
mdn: @charset
summary: قاعدة @charset بتحدد ترميز ملف CSS (غالباً UTF-8). لازم تكون أول حاجة في الملف، وغالباً مش محتاجها.
keywords: @charset, utf-8, ترميز, encoding, css
related: at-import, at-font-face
---

## intro

القاعدة `@charset` بتعرّف **ترميز الأحرف (encoding)** اللي ملف CSS مكتوب بيه، وده الشكل الوحيد المسموح: `@charset "UTF-8";`. لازم تكون **أول حاجة في الملف** تماماً (حتى قبل المسافات والتعليقات) وبعلامات تنصيص مزدوجة. وهي مهمة بس لو الملف فيه **أحرف عربية أو غير لاتينية** والسيرفر مش بيبعت الترميز الصح في الهيدر. عملياً: معظم السيرفرات والمتصفحات الحديثة بتفترض UTF-8 فبتشتغل من غير `@charset`. استخدمها لو ظهرت عندك رموز مشوّهة (ظهور «ÙØ§Ø¨» بدل العربي) في `content` أو أسماء الخطوط. وتتجاهل لو الملف داخل `<style>` في HTML لأن الصفحة نفسها بتحدد الترميز (`<meta charset="utf-8">`).

## try

```html
<style>
  @charset "UTF-8";
  .t::before { content:"★ ✓ عربي سليم "; color:#c9772f; }
  .t { background:#efe0bd; color:#3d2c18; padding:10px; border-radius:8px; font-weight:bold; }
</style>
<div class="t">الأحرف ظاهرة صح بفضل UTF-8</div>
```

## syntax

```css nolive
@charset "UTF-8";
/* لازم أول سطر، حتى قبل التعليقات */
```

- أول شيء في الملف.
- علامات تنصيص مزدوجة فقط.
- UTF-8 هو الاستخدام الواقعي.

## use

- ملف CSS فيه عربي وسيرفر مش بيحدد الترميز.
- تفادي تشوه رموز content.

## avoid

- وضعها بعد أي سطر أو تعليق.
- استخدام علامات مفردة.

## examples

### 1) الشكل الصحيح
أول سطر.

```html nolive
<style>
@charset "UTF-8";
.title::before { content: "★ "; }
</style>
```



### 2) خطأ: تعليق قبلها
هتتجاهل.

```html nolive
<style>
/* ملف الستايل */
@charset "UTF-8";   /* ❌ متجاهلة لأنها مش الأولى */
</style>
```



### 3) داخل style
مش مفيدة.

```html nolive
<style>
@charset "UTF-8";   /* بتتجاهل داخل صفحة HTML */
body { font-family: sans-serif; }
</style>
<!-- الأفضل: <meta charset="utf-8"> في head -->
```



## mistakes

### مسافة قبلها

```css bad
  @charset "UTF-8";  /* مسافة قبلها */
```

```css good
@charset "UTF-8";  /* أول بايت */
```

لازم أول شيء.

## quiz

### @charset لازم تكون؟
- [x] أول شيء في الملف
- [ ] آخره
- [ ] في النص
- [ ] بعد @import

أول شيء.

### الترميز الشائع؟
- [x] UTF-8
- [ ] ASCII
- [ ] Latin-1
- [ ] UTF-16

UTF-8.

## refs

- [MDN: @charset](https://developer.mozilla.org/en-US/docs/Web/CSS/@charset)
