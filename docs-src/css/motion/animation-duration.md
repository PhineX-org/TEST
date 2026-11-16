---
id: animation-duration
kind: property
cat: motion
chip: animation-duration
title: مدة الأنيميشن
en: CSS animation-duration property
status: stable
support: all
size: compact
mdn: animation-duration
summary: animation-duration بتحدد المدة اللي الدورة الواحدة من الأنيميشن بتاخدها. الافتراضي صفر يعني مش هتشتغل.
keywords: animation-duration, مدة, s, ms, سرعة الأنيميشن
related: animation, animation-delay, animation-iteration-count, transition-duration
---

## intro

الخاصية `animation-duration` بتحدد **وقت الدورة الواحدة** من الأنيميشن، بالثواني (`2s`) أو ملّي ثانية (`500ms`). **الافتراضي `0s`** يعني الأنيميشن **مش هتشتغل ولا هتبان** حتى لو الاسم صح، فدي غلطة شائعة. وكل ما زادت المدة زادت الحركة بطئاً. تقدر تكتب مدد مختلفة لأكتر من أنيميشن. وفي الاختصار [[animation]] هي أول وقت بتكتبه (والتاني هو [[animation-delay]]). قيم مناسبة: 200–500ms لتفاعلات، وثانية أو اتنين للنبض والـ loaders.

## try

```html
<style>
  @keyframes mv { to { transform:translateX(110px); } }
  .b { width:34px; height:20px; background:#c9772f; border-radius:5px; margin:6px; animation-name:mv; animation-iteration-count:infinite; animation-direction:alternate; animation-timing-function:ease-in-out; }
</style>
<div class="b" style="animation-duration:.5s"></div><div class="b" style="animation-duration:1.5s"></div><div class="b" style="animation-duration:3s"></div>
```

## syntax

```css nolive
animation-duration: 1s;
animation-duration: 500ms;
animation-duration: 2s, 1s;
```

- **القيمة المبدئية**: `0s`.

## values

### `<time>`
المدة (s أو ms).

### 0s
لا حركة (الافتراضي).

## use

- ضبط سرعة الحركة.
- مدد مختلفة لأنيميشن متعدد.

## avoid

- نسيانها (الصفر لا يظهر الحركة).

## examples

### 1) 3 سرعات
سريع وبطيء.

```html
<style>
  @keyframes mv { to { transform:translateX(100px); } }
  .b { width:30px; height:18px; background:#3d7a5a; border-radius:5px; margin:6px; animation-name:mv; animation-iteration-count:infinite; animation-direction:alternate; animation-timing-function:ease-in-out; }
</style>
<div class="b" style="animation-duration:.4s"></div><div class="b" style="animation-duration:1.2s"></div><div class="b" style="animation-duration:2.5s"></div>
```



### 2) 0s
مبتشتغلش.

```html
<style>
  @keyframes mv { to { transform:translateX(100px); } }
  .b { width:30px; height:18px; background:#b5551f; border-radius:5px; margin:6px; animation-name:mv; animation-duration:0s; }
</style>
<div class="b"></div>
```



### 3) بالـ ms
500ms.

```html
<style>
  @keyframes mv { to { transform:translateX(100px); } }
  .b { width:30px; height:18px; background:#c9772f; border-radius:5px; margin:6px; animation:mv 500ms ease-in-out infinite alternate; }
</style>
<div class="b"></div>
```



## mistakes

### مدة صفر

```css bad
.a { animation-name:spin; }  /* مبتشتغلش */
```

```css good
.a { animation-name:spin; animation-duration:1s; }
```

لازم مدة.

## quiz

### الافتراضي؟
- [x] 0s
- [ ] 1s
- [ ] auto
- [ ] infinite

مفيش حركة.

### الوحدة؟
- [x] s أو ms
- [ ] px
- [ ] %
- [ ] deg

ثواني أو ms.

## refs

- [MDN: animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration)
