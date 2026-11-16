---
id: background-blend-mode
kind: property
cat: borders-bg
chip: background-blend-mode
title: مزج طبقات الخلفية
en: CSS background-blend-mode property
status: stable
support: all
size: compact
mdn: background-blend-mode
summary: background-blend-mode بتمزج طبقات خلفية العنصر مع بعضها (multiply وscreen وoverlay…) زي برامج التصميم.
keywords: background-blend-mode, multiply, screen, overlay, مزج, blend, duotone, طبقات
related: mix-blend-mode, background, background-image, filter
---

## intro

الخاصية `background-blend-mode` بتخلّي **طبقات الخلفية** (صورة/تدرج/لون) **تتمازج مع بعض** بدل ما الأعلى تغطي الأسفل، زي أوضاع الدمج (Blend Modes) في Photoshop. القيم الشائعة: `multiply` (تغميق)، `screen` (تفتيح)، `overlay`، `darken`، `lighten`، `color-dodge`، `luminosity`… الحيلة الشهيرة **duotone**: صورة + لون خلفية بـ `multiply` تدّيك صورة بلون واحد. بتأثر على الطبقات **جوه نفس العنصر** بس؛ لو عايز تمزج العنصر نفسه مع اللي وراه استخدم [[mix-blend-mode]].

## try

```html
<style>
  .b { height:90px; border-radius:10px; background-image:linear-gradient(135deg,#efe0bd,#c9772f); background-color:#3d7a5a; background-blend-mode:multiply; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-blend-mode: multiply;
background-blend-mode: screen, overlay;
background-blend-mode: normal;
```

- **القيمة المبدئية**: `normal`.
- طبقات بفاصلة.

## values

### normal
بدون مزج.

### multiply
تغميق بضرب الألوان.

### screen
تفتيح.

### overlay
يزيد التباين.

## use

- صور بلون واحد (duotone).
- تأثيرات بصرية على الخلفيات.

## avoid

- الإفراط (بتصعّب قراءة النص فوقها).

## examples

### 1) multiply
تغميق.

```html
<style>
  .b { height:70px; background-image:linear-gradient(135deg,#efe0bd,#c9772f); background-color:#3d7a5a; background-blend-mode:multiply; }
</style>
<div class="b"></div>
```



### 2) screen
تفتيح.

```html
<style>
  .b { height:70px; background-image:linear-gradient(135deg,#7a4a1d,#3d7a5a); background-color:#c9772f; background-blend-mode:screen; }
</style>
<div class="b"></div>
```



### 3) normal
مقارنة بدون مزج.

```html
<style>
  .b { height:70px; background-image:linear-gradient(135deg,#efe0bd,#c9772f); background-color:#3d7a5a; background-blend-mode:normal; }
</style>
<div class="b"></div>
```



## mistakes

### توقع مزج مع الخلفية خلف العنصر

```css bad
.a { background-blend-mode:multiply; }  /* بتمزج طبقات العنصر بس */
```

```css good
.a { mix-blend-mode:multiply; }
```

لمزج العنصر مع اللي وراه استخدم mix-blend-mode.

## quiz

### بتمزج؟
- [x] طبقات خلفية نفس العنصر
- [ ] عنصرين
- [ ] النص
- [ ] الحدود

طبقات الخلفية.

### الافتراضي؟
- [ ] multiply
- [x] normal
- [ ] screen
- [ ] overlay

normal.

## refs

- [MDN: background-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode)
