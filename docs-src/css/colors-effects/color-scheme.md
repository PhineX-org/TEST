---
id: color-scheme
kind: property
cat: colors-effects
chip: color-scheme
title: ثيم فاتح/غامق للمتصفح
en: CSS color-scheme property
status: stable
support: all
size: compact
mdn: color-scheme
summary: color-scheme بتعرّف المتصفح إن الصفحة بتدعم ثيم فاتح أو غامق، فيلوّن عناصر الفورم والسكرول والخلفية الافتراضية تلقائياً.
keywords: color-scheme, dark mode, light, dark, ثيم غامق, prefers-color-scheme, light-dark
related: fn-light-dark, accent-color, at-media, color
---

## intro

الخاصية `color-scheme` بتقول للمتصفح: «الصفحة دي بتدعم ثيم **فاتح** و/أو **غامق**». فالمتصفح يضبط **عناصره الافتراضية** (شريط السكرول، خلفية وحقول الفورم، لون الروابط الافتراضي) عشان تتماشى مع الثيم. `color-scheme: light dark` يعني «ادعم الاتنين وتبع إعداد النظام».

مهمة مع [[fn-light-dark]] اللي بتختار لون حسب الثيم الحالي: `color: light-dark(#3d2c18, #f3ede0)`. وتتكتب غالباً على `:root`. بتتوارث. وتتكامل مع `@media (prefers-color-scheme: dark)` ([[at-media]]).

> [!tip] ضيفها دايماً لو عندك ثيم غامق، وإلا السكرول وحقول الفورم هتفضل فاتحة مش متناسقة.

## try

```html
<style>
  .dark { color-scheme:dark; background:#2f2820; color:#f3ede0; padding:10px; border-radius:8px; }
</style>
<div class="dark">حقل فورم غامق: <input value="نص"></div>
```

## syntax

```css nolive
:root { color-scheme: light dark; }
.dark { color-scheme: dark; }
.light { color-scheme: light; }
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### light
ثيم فاتح.

### dark
ثيم غامق.

### light dark
يدعم الاتنين ويتبع النظام.

### normal
بدون تحديد.

## use

- دعم الوضع الغامق للعناصر الافتراضية.
- مع light-dark() للألوان.

## avoid

- نسيانها فتظهر عناصر فاتحة في صفحة غامقة.

## examples

### 1) light مقابل dark
نفس الحقل بثيمين.

```html
<style>
  .a { color-scheme:light; background:#f3ede0; color:#2f2820; padding:8px; margin:4px 0; }
  .b { color-scheme:dark; background:#2f2820; color:#f3ede0; padding:8px; margin:4px 0; }
</style>
<div class="a">فاتح <input value="حقل"></div><div class="b">غامق <input value="حقل"></div>
```



### 2) light-dark()
لون حسب الثيم.

```html
<style>
  :root { color-scheme:light dark; }
  .t { color:light-dark(#3d2c18,#f3ede0); background:light-dark(#efe0bd,#3d2c18); padding:10px; border-radius:6px; }
</style>
<div class="t">لون يتغيّر مع الثيم</div>
```



### 3) على :root
يتوارث للصفحة كلها.

```html
<style>
  :root { color-scheme:light dark; }
  .box { padding:8px; border:2px solid #7a4a1d; border-radius:6px; background:Canvas; color:CanvasText; }
</style>
<div class="box">Canvas / CanvasText بيتبعوا الثيم <input value="حقل"></div>
```



## mistakes

### ثيم غامق بدون color-scheme

```css bad
body { background:#2f2820; }  /* حقول فاتحة */
```

```css good
body { background:#2f2820; color-scheme:dark; }
```

المتصفح يلوّن عناصره.

## quiz

### color-scheme: light dark معناها؟
- [ ] فاتح فقط
- [x] يدعم الاتنين
- [ ] غامق فقط
- [ ] خطأ

الاتنين.

### بتأثر على؟
- [x] عناصر المتصفح الافتراضية
- [ ] الخط
- [ ] الـ margins
- [ ] الحجم

السكرول والفورم.

## refs

- [MDN: color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
