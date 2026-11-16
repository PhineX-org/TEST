---
id: at-import
kind: atrule
cat: at-rules
chip: @import
title: قاعدة @import: استيراد ملف CSS
en: CSS @import at-rule
status: stable
support: all
mdn: @import
summary: قاعدة @import بتستورد ملف CSS تاني جوه ملفك. لازم تيجي الأول. بتبطّأ التحميل فاستخدم link أو bundler بدلها غالباً.
keywords: @import, import css, layer, ملفات css, استيراد
related: at-layer, at-media, adding-css, at-supports
---

## intro

القاعدة `@import` بتخلّيك **تستورد ملف CSS تاني** جوه ملف CSS بتاعك: `@import url("reset.css");` أو `@import "theme.css";`. الستايلات المستوردة بتتطبّق كأنها مكتوبة مكان السطر ده.

**قواعد مهمة:**
- لازم تتكتب **في أول الملف**، قبل أي قاعدة تانية (ما عدا `@charset` و`@layer` الفاضية)، وإلا بتتجاهل.
- ممكن تضيف **شرط وسائط**: `@import url("print.css") print;` أو `@import "wide.css" (min-width: 900px);`.
- ممكن تحط الاستيراد في **طبقة**: `@import url("lib.css") layer(vendor);` ([[at-layer]]).
- وممكن شرط دعم: `supports(display: grid)`.

**التحذير**: كل `@import` بيعمل **طلب شبكة متسلسل** (المتصفح لازم يحمّل الملف الأول عشان يكتشف الاستيراد، وبعدين يحمّل المستورد)، وده بيبطّأ الصفحة. فالأفضل: عدة `<link>` في HTML، أو أداة بناء (bundler) تدمج الملفات. استخدم `@import` للاستيراد بالطبقات، أو في ملفات صغيرة/تطوير.

## try

```html
<style>
  @import url("data:text/css;charset=utf-8,.imp%7Bcolor%3A%23b5551f%3Bfont-weight%3Abold%7D");
  .box { background:#efe0bd; padding:10px; border-radius:8px; color:#3d2c18; }
</style>
<div class="box"><span class="imp">النص ده اتلوّن من ملف مستورد</span></div>
```

## syntax

```css nolive
@import url("reset.css");
@import "theme.css";
@import url("print.css") print;
@import url("lib.css") layer(vendor);
@import url("wide.css") (min-width: 900px);
```

- لازم في أول الملف.
- ممكن شرط media أو layer() أو supports().
- كل @import = طلب شبكة إضافي.

## use

- استيراد ملفات داخل طبقات @layer.
- ملفات CSS صغيرة أو تطوير.
- استيراد ستايل طباعة بشرط.

## avoid

- استخدامها بكثرة في موقع إنتاج (تبطّأ).
- كتابتها بعد قواعد تانية (بتتجاهل).

## examples

### 1) الاستيراد الأساسي
أول الملف قبل أي قاعدة.

```html nolive
<style>
@import url("reset.css");
@import url("components/buttons.css");

body { font-family: system-ui; }
</style>
```



### 2) مع شرط وسائط
ملف للطباعة بس.

```html nolive
<style>
@import url("print.css") print;
@import url("wide.css") (min-width: 900px);
</style>
```



### 3) داخل طبقة
layer().

```html nolive
<style>
@layer reset, vendor, app;
@import url("normalize.css") layer(reset);
@import url("library.css") layer(vendor);
</style>
```



### 4) تشغيل حي
باستخدام data URL.

```html
<style>
  @import url("data:text/css;charset=utf-8,.imp%7Bcolor%3A%237a4a1d%3Bfont-weight%3Abold%7D");
</style>
<p style="color:#3d2c18"><span class="imp">ملف مستورد اشتغل</span> وده نص عادي.</p>
```



## mistakes

### @import بعد قواعد

```css bad
body { margin:0; }
@import url("a.css");  /* بتتجاهل */
```

```css good
@import url("a.css");
body { margin:0; }
```

لازم في الأول.

### سلسلة استيرادات

```css bad
/* a يستورد b يستورد c */
```

```css good
<link> متعددة أو bundler
```

الطلبات المتسلسلة بتبطّأ.

## quiz

### @import لازم تتكتب؟
- [x] في أول الملف
- [ ] في آخره
- [ ] في أي مكان
- [ ] داخل body

أول الملف.

### عيبها الأساسي؟
- [x] بتبطّأ التحميل
- [ ] مبتشتغلش
- [ ] بتخرّب الألوان
- [ ] لازم JS

طلبات متسلسلة.

### بتحطها في طبقة بـ؟
- [x] layer()
- [ ] group()
- [ ] scope()
- [ ] layers:

layer(name).

## refs

- [MDN: @import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)
