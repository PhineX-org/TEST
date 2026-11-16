---
id: mix-blend-mode
kind: property
cat: colors-effects
chip: mix-blend-mode
title: مزج العنصر مع اللي وراه
en: CSS mix-blend-mode property
status: stable
support: all
size: compact
mdn: mix-blend-mode
summary: mix-blend-mode بتمزج العنصر نفسه مع اللي وراه (multiply وscreen وdifference…) بدل ما يغطيه.
keywords: mix-blend-mode, multiply, screen, difference, مزج, blend, overlay
related: background-blend-mode, isolation, opacity, filter
---

## intro

الخاصية `mix-blend-mode` بتخلّي **العنصر كله يتمازج مع اللي وراه** زي أوضاع الدمج في Photoshop: `multiply` (تغميق)، `screen` (تفتيح)، `overlay`، `difference` (فرق الألوان)، `luminosity`… مختلفة عن [[background-blend-mode]] اللي بتمزج **طبقات خلفية نفس العنصر** بس.

لو عايز تحصر المزج جوه عنصر معين من غير ما يأثر على اللي برّاه استخدم [[isolation]] `isolation: isolate` على الأب. استخدامات: نص بيتغيّر لونه حسب الخلفية، تغطية صور بلون، تأثيرات تصميم.

## try

```html
<style>
  .bg { background:linear-gradient(90deg,#c9772f,#3d7a5a); padding:18px; border-radius:10px; }
  .t { font-size:1.8rem; font-weight:900; color:#efe0bd; mix-blend-mode:multiply; }
</style>
<div class="bg"><div class="t">PhineX</div></div>
```

## syntax

```css nolive
mix-blend-mode: normal;
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: difference;
```

- **القيمة المبدئية**: `normal`.

## values

### normal
بدون مزج.

### multiply
تغميق.

### screen
تفتيح.

### difference
فرق الألوان.

## use

- نص ملوّن بتأثير مع الصورة.
- تغطية صور بلون.
- أنماط تصميم إبداعية.

## avoid

- عزل مفقود فالمزج يتسرب لعناصر تانية.
- تأثير مبالغ يصعّب القراءة.

## examples

### 1) multiply
تغميق مع الخلفية.

```html
<style>
  .bg { background:#efe0bd; padding:14px; border-radius:8px; }
  .c { width:70px; height:50px; background:#c9772f; mix-blend-mode:multiply; display:inline-block; }
  .d { width:70px; height:50px; background:#3d7a5a; mix-blend-mode:multiply; display:inline-block; margin-right:-30px; }
</style>
<div class="bg"><div class="d"></div><div class="c"></div></div>
```



### 2) screen
تفتيح.

```html
<style>
  .bg { background:#3d2c18; padding:14px; border-radius:8px; }
  .c { width:70px; height:50px; background:#c9772f; mix-blend-mode:screen; display:inline-block; }
</style>
<div class="bg"><div class="c"></div></div>
```



### 3) isolation
المزج جوه الصندوق فقط.

```html
<style>
  .bg { background:linear-gradient(90deg,#c9772f,#3d7a5a); padding:12px; border-radius:8px; }
  .iso { isolation:isolate; background:#efe0bd; padding:10px; }
  .t { background:#b5551f; color:#f3ede0; padding:8px; mix-blend-mode:multiply; }
</style>
<div class="bg"><div class="iso"><div class="t">معزول</div></div></div>
```



## mistakes

### مزج مع الصفحة كلها

```css bad
.badge { mix-blend-mode:multiply; }
```

```css good
.card { isolation:isolate; }
.badge { mix-blend-mode:multiply; }
```

عزل بالأب.

## quiz

### mix-blend-mode بتمزج؟
- [x] العنصر مع اللي وراه
- [ ] طبقات الخلفية فقط
- [ ] النص
- [ ] الحدود

العنصر مع اللي خلفه.

### لعزل المزج؟
- [ ] z-index
- [x] isolation:isolate
- [ ] opacity
- [ ] display

isolation.

## refs

- [MDN: mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
