---
id: direction
kind: property
cat: typography
chip: direction
title: اتجاه الكتابة
en: CSS direction property
status: stable
support: all
size: compact
mdn: direction
summary: direction بتحدد اتجاه النص: rtl لليمين لليسار (عربي) وltr للعكس. الأفضل تستخدم الخاصية dir في HTML.
keywords: direction, rtl, ltr, اتجاه النص, عربي, dir
related: unicode-bidi, text-align, writing-mode, margin-inline
---

## intro

الخاصية `direction` بتحدد **اتجاه الكتابة**: `rtl` (من اليمين لليسار، للعربي والعبري) أو `ltr` (من اليسار لليمين، للإنجليزي). وبتأثر على ترتيب العناصر الـ inline، ومكان بداية السطر، وسلوك `text-align: start`، وترتيب أعمدة الجداول.

**نصيحة مهمة**: الأفضل تحدد الاتجاه في **HTML** بالخاصية `dir="rtl"` على `<html>` بدل CSS، لأنها بتتعرف عليها المتصفحات وقارئات الشاشة في كل الأحوال (حتى لو CSS اتعطل). واستخدم CSS لحالات استثنائية زي كود إنجليزي داخل صفحة عربية (`direction: ltr`).

ولتصميم يدعم الاتجاهين، استخدم الخصائص **المنطقية** ([[margin-inline]] و`padding-inline`) و`text-align: start`. وبتتوارث.

## try

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
</style>
<p style="direction:rtl">rtl: (a) عربي 123</p>
<p style="direction:ltr">ltr: (a) عربي 123</p>
```

## syntax

```css nolive
direction: rtl;
direction: ltr;
/* الأفضل في HTML */
<html dir="rtl">
```

- **القيمة المبدئية**: `ltr`.
- **بتتوارث؟** أيوه.
- الأفضل: dir في HTML.

## values

### rtl
من اليمين لليسار.

### ltr
من اليسار لليمين.

## use

- كود إنجليزي داخل صفحة عربية.
- حقل إدخال رقم/إيميل ltr.

## avoid

- direction في CSS بدل dir في HTML للصفحة كلها.

## examples

### 1) كود ltr في صفحة rtl
الكود متراص صح.

```html
<style>
  code { display:block; direction:ltr; text-align:left; background:#3d2c18; color:#f3ede0; padding:8px 12px; border-radius:6px; font-family:monospace; }
</style>
<code>const x = 10;</code>
```



### 2) علامات الترقيم
الاتجاه بيغيّر مكانها.

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
</style>
<p style="direction:rtl">Hello! مرحبا.</p><p style="direction:ltr">Hello! مرحبا.</p>
```



### 3) حقل ايميل
دايماً ltr.

```html
<style>
  input { direction:ltr; text-align:left; padding:6px; border:2px solid #7a4a1d; border-radius:6px; background:#f3ede0; color:#3d2c18; width:90%; }
</style>
<input type="email" value="user@phinex.com">
```



## mistakes

### direction بدل dir للصفحة

```css bad
body { direction:rtl; }
```

```css good
<html lang="ar" dir="rtl">
```

dir أقوى وأدق في الوصولية.

## quiz

### rtl معناها؟
- [x] من اليمين لليسار
- [ ] من اليسار لليمين
- [ ] من أعلى لأسفل
- [ ] عمودي

عربي.

### الأفضل تحديد الاتجاه في؟
- [ ] CSS فقط
- [x] dir في HTML
- [ ] JS
- [ ] لا يهم

dir.

## refs

- [MDN: direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
