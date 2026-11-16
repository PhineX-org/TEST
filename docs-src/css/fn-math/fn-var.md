---
id: fn-var
kind: function
cat: fn-math
chip: var()
title: دالة var(): استخدام متغير CSS
en: CSS var() function
status: stable
support: all
mdn: var
summary: var(--name, fallback) بتقرا قيمة متغير CSS مخصص. أساس الثيمات والقيم المتكررة.
keywords: var, custom properties, متغيرات css, --name, fallback, theme
related: variables-guide, at-property, fn-calc, fn-env
---

## intro

الدالة `var()` هي الطريقة اللي **بتقرا** بيها **متغير CSS مخصص** (`--اسم`). بتعرّف المتغير مرة: `:root { --brand: #c9772f; }` وبتستخدمه في أي مكان: `color: var(--brand);`. لو غيّرت قيمته في مكان واحد، **كل الاستخدامات بتتحدث** (وده أساس الثيمات: وضع داكن وفاتح بتبديل المتغيرات).

الصيغة: `var(--name, fallback)`. القيمة بعد الفاصلة **fallback** لو المتغير مش معرّف أو فاضي: `color: var(--brand, #333);`. وتقدر تتداخل: `var(--a, var(--b, red))`.

مميزات مقابل متغيرات Sass: **بتتغير وقت التشغيل** (JavaScript يقدر يعدّلها بـ `style.setProperty`) و**بتتوارث** وتتأثر بالـ cascade (تقدر تعيد تعريفها جوه عنصر معين). تقدر تحط جواها أي قيمة (لون، طول، نص، حتى جزء من قيمة مركّبة). ولو عايز المتغير يتحرك بنعومة، سجّله بـ [[at-property]].

## try

```html
<style>
  :root { --brand:#c9772f; --gap:10px; }
  .a { background:var(--brand); color:#f3ede0; padding:var(--gap); border-radius:8px; font-weight:bold; margin:4px 0; }
  .b { --brand:#3d7a5a; }
</style>
<div class="a">لون من المتغير</div><div class="a b">نفس الكود: المتغير اتبدّل محلياً</div>
```

## syntax

```css nolive
:root { --brand: #c9772f; --gap: 12px; }
.btn { background: var(--brand); padding: var(--gap); }
color: var(--text, #333);  /* fallback */
```

- الاسم يبدأ بـ `--`.
- القيمة الاحتياطية بعد الفاصلة.
- بتتوارث وتتأثر بالـ cascade.

## use

- ثيمات (فاتح/داكن).
- قيم متكررة (ألوان ومسافات).
- تحكم بـ JavaScript.

## avoid

- استخدام متغير غير معرّف بدون fallback.
- متغيرات في media queries (لا تُستخدم كشرط).

## examples

### 1) تعريف واستخدام
الأساس.

```html
<style>
  :root { --brand:#c9772f; --gap:10px; }
  .a { background:var(--brand); color:#f3ede0; padding:var(--gap); border-radius:8px; font-weight:bold; }
</style>
<div class="a">لون وحشو من متغيرات</div>
```



### 2) إعادة تعريف محلياً
ثيم مختلف لقسم.

```html
<style>
  :root { --bg:#efe0bd; --fg:#3d2c18; }
  .c { background:var(--bg); color:var(--fg); padding:10px; border-radius:8px; margin:4px 0; }
  .dark { --bg:#3d2c18; --fg:#f3ede0; }
</style>
<div class="c">فاتح</div><div class="c dark">غامق بنفس الكود</div>
```



### 3) fallback
قيمة بديلة.

```html
<style>
  .a { color:var(--missing, #b5551f); font-weight:bold; }
</style>
<p class="a">المتغير مش معرّف فاستخدم البديل</p>
```



### 4) تحكم JS
تغيير وقت التشغيل.

```html
<style>
  :root { --c:#c9772f; }
  .a { background:var(--c); color:#f3ede0; padding:10px; border-radius:8px; margin:4px 0; transition:background .3s; }
  button { padding:6px 12px; border:0; border-radius:6px; background:#7a4a1d; color:#f3ede0; }
</style>
<div class="a">لون متغير</div><button onclick="document.documentElement.style.setProperty('--c','#3d7a5a')">اتبدّل</button>
```



## mistakes

### نسيان --

```css bad
:root { brand:#c9772f; }  /* مش متغير */
```

```css good
--brand:#c9772f
```

لازم تبدأ بـ --.

### بدون fallback

```css bad
color:var(--text);  /* لو مش معرّف */
```

```css good
color:var(--text, #333);
```

قيمة احتياطية.

## quiz

### المتغير بيبدأ بـ؟
- [x] --
- [ ] $
- [ ] @
- [ ] #

شرطتين.

### القيمة الاحتياطية؟
- [x] بعد الفاصلة
- [ ] قبل الاسم
- [ ] بين أقواس منفصلة
- [ ] مش موجودة

var(--a, fallback).

### بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط :root

بتتوارث.

## refs

- [MDN: var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var)
