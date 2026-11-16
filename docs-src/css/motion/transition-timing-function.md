---
id: transition-timing-function
kind: property
cat: motion
chip: transition-timing-function
title: منحنى سرعة الانتقال
en: CSS transition-timing-function property
status: stable
support: all
size: compact
mdn: transition-timing-function
summary: transition-timing-function بتحدد منحنى السرعة: ease وlinear وease-in وease-out وease-in-out وcubic-bezier وsteps.
keywords: transition-timing-function, ease, linear, ease-in-out, cubic-bezier, steps, easing
related: transition, transition-duration, fn-cubic-bezier, fn-steps, dt-easing
---

## intro

الخاصية `transition-timing-function` بتحدد **ازاي السرعة بتتغير خلال المدة**: هل الحركة بتبدأ بطيئة وتزيد، ولا بتبدأ سريعة وتهدّي؟ الكلمات الجاهزة: **`ease`** (الافتراضي: بداية بطيئة وسط سريع نهاية بطيئة)، **`linear`** (سرعة ثابتة، ميكانيكية)، **`ease-in`** (تبدأ بطيئة)، **`ease-out`** (تنتهي بطيئة وهي الأنسب لدخول العناصر)، **`ease-in-out`** (بطيئة في الطرفين). وللتحكم الكامل: [[fn-cubic-bezier]] أو [[fn-steps]] للحركة بخطوات منفصلة. المنحنى الطبيعي بيدّي إحساس **واقعي** مش آلي. جزء من [[transition]].

## try

```html
<style>
  .t { width:60px; height:28px; background:#c9772f; border-radius:6px; margin:4px; transition:transform 1s; }
  .w:hover .t { transform:translateX(140px); }
</style>
<div class="w"><div class="t" style="transition-timing-function:linear"></div><div class="t" style="transition-timing-function:ease-in"></div><div class="t" style="transition-timing-function:ease-out"></div></div>
```

## syntax

```css nolive
transition-timing-function: ease;
transition-timing-function: linear;
transition-timing-function: ease-in-out;
transition-timing-function: cubic-bezier(.4, 0, .2, 1);
transition-timing-function: steps(4);
```

- **القيمة المبدئية**: `ease`.

## values

### ease
بطيء-سريع-بطيء (افتراضي).

### linear
سرعة ثابتة.

### ease-in / ease-out
بطيء في البداية/النهاية.

### cubic-bezier()
منحنى مخصص.

## use

- حركة طبيعية.
- ease-out لدخول العناصر.
- steps لحركات الإطارات.

## avoid

- linear لكل حاجة (ميكانيكي).

## examples

### 1) المقارنة
أربع منحنيات.

```html
<style>
  .t { width:50px; height:22px; background:#3d7a5a; border-radius:5px; margin:4px; transition:transform 1.2s; }
  .w:hover .t { transform:translateX(150px); }
</style>
<div class="w"><div class="t" style="transition-timing-function:linear"></div><div class="t" style="transition-timing-function:ease"></div><div class="t" style="transition-timing-function:ease-in"></div><div class="t" style="transition-timing-function:ease-out"></div></div>
```



### 2) cubic-bezier
منحنى ارتدادي.

```html
<style>
  .t { width:50px; height:30px; background:#c9772f; border-radius:6px; margin:10px; transition:transform .8s cubic-bezier(.34,1.56,.64,1); }
  .t:hover { transform:translateX(120px); }
</style>
<div class="t"></div>
```



### 3) steps
حركة بخطوات.

```html
<style>
  .t { width:50px; height:30px; background:#7a4a1d; border-radius:6px; margin:10px; transition:transform 1s steps(5); }
  .t:hover { transform:translateX(120px); }
</style>
<div class="t"></div>
```



## mistakes

### linear لكل حاجة

```css bad
.a { transition:transform .3s linear; }
```

```css good
.a { transition:transform .3s ease-out; }
```

الحركة الطبيعية أحلى.

## quiz

### الافتراضي؟
- [x] ease
- [ ] linear
- [ ] ease-in
- [ ] steps

ease.

### لدخول عنصر؟
- [x] ease-out
- [ ] ease-in
- [ ] linear
- [ ] steps

ينتهي بنعومة.

## refs

- [MDN: transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)
