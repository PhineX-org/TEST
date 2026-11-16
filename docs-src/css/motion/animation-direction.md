---
id: animation-direction
kind: property
cat: motion
chip: animation-direction
title: اتجاه الأنيميشن
en: CSS animation-direction property
status: stable
support: all
size: compact
mdn: animation-direction
summary: animation-direction بتحدد اتجاه تشغيل الإطارات: normal وreverse وalternate (ذهاب وإياب) وalternate-reverse.
keywords: animation-direction, alternate, reverse, ذهاب وإياب
related: animation, animation-iteration-count, animation-fill-mode
---

## intro

الخاصية `animation-direction` بتحدد **اتجاه تشغيل الإطارات** في كل دورة. **`normal`** (الافتراضي): من 0% لـ 100% ثم يرجع للبداية فجأة. **`reverse`**: من 100% لـ 0%. **`alternate`**: الدورة الأولى عادية والتانية معكوسة وهكذا (**ذهاب وإياب** ناعم، مناسب للنبض والتأرجح). **`alternate-reverse`**: نفس الفكرة بس تبدأ معكوسة. مع [[animation-iteration-count]] `infinite` بتدّي حركة مستمرة بدون قفزة عند التكرار. جزء من [[animation]].

## try

```html
<style>
  @keyframes mv { to { transform:translateX(120px); } }
  .b { width:34px; height:20px; margin:6px; background:#c9772f; border-radius:5px; animation:mv 1.2s ease-in-out infinite; }
</style>
<div class="b" style="animation-direction:normal"></div><div class="b" style="animation-direction:alternate"></div><div class="b" style="animation-direction:reverse"></div>
```

## syntax

```css nolive
animation-direction: normal;
animation-direction: reverse;
animation-direction: alternate;
animation-direction: alternate-reverse;
```

- **القيمة المبدئية**: `normal`.

## values

### normal
عادي ثم يقفز للبداية.

### reverse
معكوس.

### alternate
ذهاب وإياب.

### alternate-reverse
ذهاب وإياب معكوس.

## use

- تأرجح وذهاب وإياب.
- نبض ناعم.

## avoid

- normal مع تكرار لما تحتاج حركة سلسة.

## examples

### 1) الأنواع
ثلاث اتجاهات.

```html
<style>
  @keyframes mv { to { transform:translateX(120px); } }
  .b { width:30px; height:18px; margin:6px; background:#3d7a5a; border-radius:5px; animation:mv 1.2s ease-in-out infinite; }
</style>
<div class="b"></div><div class="b" style="animation-direction:alternate"></div><div class="b" style="animation-direction:reverse"></div>
```



### 2) تأرجح
alternate.

```html
<style>
  @keyframes sw { from { transform:rotate(-15deg); } to { transform:rotate(15deg); } }
  .p { width:6px; height:50px; background:#7a4a1d; margin:10px 60px; transform-origin:top; animation:sw 1s ease-in-out infinite alternate; }
</style>
<div class="p"></div>
```



### 3) reverse
من النهاية.

```html
<style>
  @keyframes mv { from { transform:translateX(0); } to { transform:translateX(100px); } }
  .b { width:30px; height:18px; margin:8px; background:#c9772f; border-radius:5px; animation:mv 1.5s linear infinite reverse; }
</style>
<div class="b"></div>
```



## mistakes

### قفزة عند التكرار

```css bad
.b { animation:mv 1s infinite; }
```

```css good
.b { animation:mv 1s infinite alternate; }
```

alternate بيمنع القفزة.

## quiz

### alternate معناه؟
- [x] ذهاب وإياب
- [ ] للأمام فقط
- [ ] عكس فقط
- [ ] توقف

تبديل الاتجاه.

### الافتراضي؟
- [x] normal
- [ ] alternate
- [ ] reverse
- [ ] none

normal.

## refs

- [MDN: animation-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)
