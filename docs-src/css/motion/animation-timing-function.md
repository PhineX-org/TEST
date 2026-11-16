---
id: animation-timing-function
kind: property
cat: motion
chip: animation-timing-function
title: منحنى سرعة الأنيميشن
en: CSS animation-timing-function property
status: stable
support: all
size: compact
mdn: animation-timing-function
summary: animation-timing-function بتحدد منحنى السرعة داخل كل إطار أو كل دورة: ease وlinear وcubic-bezier وsteps.
keywords: animation-timing-function, ease, linear, cubic-bezier, steps
related: animation, transition-timing-function, fn-cubic-bezier, fn-steps, dt-easing
---

## intro

الخاصية `animation-timing-function` بتتحكم في **توزيع السرعة** على الحركة. نفس القيم بتاعة [[transition-timing-function]]: `ease` (الافتراضي) و`linear` و`ease-in` و`ease-out` و`ease-in-out` و[[fn-cubic-bezier]] و[[fn-steps]]. فرق مهم: في الأنيميشن المنحنى بيتطبق **بين كل إطارين متتاليين** (بين كل keyframe والتاني)، مش على الدورة كلها. فلو عايز حركة مستمرة سلسة (زي spinner) استخدم `linear`. وتقدر تضبط منحنى مختلف جوه كل keyframe نفسه. جزء من [[animation]].

## try

```html
<style>
  @keyframes mv { to { transform:translateX(130px); } }
  .t { width:40px; height:22px; background:#c9772f; border-radius:5px; margin:4px; animation:mv 1.5s infinite alternate; }
</style>
<div class="t" style="animation-timing-function:linear"></div><div class="t" style="animation-timing-function:ease-in"></div><div class="t" style="animation-timing-function:ease-out"></div>
```

## syntax

```css nolive
animation-timing-function: ease;
animation-timing-function: linear;
animation-timing-function: cubic-bezier(.4,0,.2,1);
animation-timing-function: steps(8, end);
```

- **القيمة المبدئية**: `ease`.
- بتتطبق بين كل إطارين.

## values

### ease
الافتراضي.

### linear
سرعة ثابتة.

### cubic-bezier()
مخصص.

### steps()
خطوات.

## use

- linear لـ spinner.
- steps لحركة إطارات.

## avoid

- ease لدوران مستمر (يبان متقطع).

## examples

### 1) مقارنة
ثلاث منحنيات.

```html
<style>
  @keyframes mv { to { transform:translateX(120px); } }
  .t { width:38px; height:20px; background:#3d7a5a; border-radius:5px; margin:4px; animation:mv 1.5s infinite alternate; }
</style>
<div class="t" style="animation-timing-function:linear"></div><div class="t" style="animation-timing-function:ease"></div><div class="t" style="animation-timing-function:ease-in-out"></div>
```



### 2) steps
حركة متقطعة.

```html
<style>
  @keyframes mv { to { transform:translateX(120px); } }
  .t { width:38px; height:22px; background:#7a4a1d; border-radius:5px; margin:8px; animation:mv 2s steps(6) infinite alternate; }
</style>
<div class="t"></div>
```



### 3) spinner linear
دوران ناعم.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:32px; height:32px; border:5px solid #efe0bd; border-top-color:#c9772f; border-radius:50%; margin:10px; animation:spin 1s linear infinite; }
</style>
<div class="s"></div>
```



## mistakes

### ease في spinner

```css bad
.s { animation:spin 1s infinite; }  /* ease بيبطّئ كل دورة */
```

```css good
.s { animation:spin 1s linear infinite; }
```

linear للدوران.

## quiz

### الافتراضي؟
- [x] ease
- [ ] linear
- [ ] steps
- [ ] ease-in

ease.

### لدوران مستمر؟
- [x] linear
- [ ] ease
- [ ] ease-in
- [ ] steps(1)

سرعة ثابتة.

## refs

- [MDN: animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
