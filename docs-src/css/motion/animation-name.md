---
id: animation-name
kind: property
cat: motion
chip: animation-name
title: اسم الأنيميشن
en: CSS animation-name property
status: stable
support: all
size: compact
mdn: animation-name
summary: animation-name بتربط العنصر بتعريف @keyframes بالاسم. تقدر تربط أكتر من أنيميشن بفاصلة.
keywords: animation-name, keyframes, اسم, none
related: animation, at-keyframes, animation-duration
---

## intro

الخاصية `animation-name` بتحدد **اسم الـ `@keyframes`** اللي هيتشغّل على العنصر. لازم الاسم يطابق بالظبط اللي كتبته في [[at-keyframes]]. وتقدر تربط **أكتر من أنيميشن** معاً بفاصلة: `animation-name: spin, fade;` ومعاها قيم متقابلة للمدة والباقي. القيمة `none` (الافتراضي) = بدون أنيميشن. لوحدها مبتشتغلش لأن [[animation-duration]] الافتراضي صفر، فلازم تحدد مدة. غالباً هتكتبها ضمن الاختصار [[animation]].

## try

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .b { width:40px; height:40px; background:#c9772f; border-radius:8px; margin:16px; animation-name:spin; animation-duration:2s; animation-iteration-count:infinite; animation-timing-function:linear; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
animation-name: spin;
animation-name: spin, fade;
animation-name: none;
```

- **القيمة المبدئية**: `none`.
- لازم @keyframes بنفس الاسم.

## values

### `<name>`
اسم @keyframes.

### none
بدون أنيميشن.

## use

- ربط حركة بعنصر.
- دمج أكتر من حركة.

## avoid

- خطأ إملائي في الاسم.

## examples

### 1) اسم واحد
spin.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .b { width:36px; height:36px; background:#3d7a5a; border-radius:8px; margin:14px; animation-name:spin; animation-duration:1.5s; animation-iteration-count:infinite; animation-timing-function:linear; }
</style>
<div class="b"></div>
```



### 2) اتنين معاً
spin وfade.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes fade { 50% { opacity:.3; } }
  .b { width:36px; height:36px; background:#c9772f; border-radius:8px; margin:14px; animation-name:spin, fade; animation-duration:2s, 1s; animation-iteration-count:infinite; animation-timing-function:linear; }
</style>
<div class="b"></div>
```



### 3) none
إيقاف.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .b { width:36px; height:36px; background:#7a4a1d; border-radius:8px; margin:14px; animation-name:none; animation-duration:1s; }
</style>
<div class="b"></div>
```



## mistakes

### اسم غير مطابق

```css bad
.a { animation-name:Spin; }  /* الاسم حساس لحالة الأحرف */
```

```css good
.a { animation-name:spin; }
```

الاسم حساس.

## quiz

### animation-name بتربط بـ؟
- [x] @keyframes
- [ ] @media
- [ ] @font-face
- [ ] @import

اسم الإطارات.

### القيمة المبدئية؟
- [x] none
- [ ] spin
- [ ] auto
- [ ] 0

none.

## refs

- [MDN: animation-name](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name)
