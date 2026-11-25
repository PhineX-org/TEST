---
id: dt-easing
kind: datatype
cat: datatypes
chip: <easing-function>
title: دوال التوقيت
en: CSS <easing-function> data type
status: stable
support: all
mdn: easing-function
summary: نوع easing هو دالة بتحدد سرعة الحركة عبر الزمن: ease وlinear وease-in-out وcubic-bezier() وsteps() وlinear().
keywords: easing, ease, linear, ease-in, ease-out, timing function, transition-timing-function
related: fn-cubic-bezier, fn-steps, transition, animation, transitions-animations-guide
---

## intro

النوع `<easing-function>` هو **الطريقة اللي بتتغير بيها سرعة الحركة** على مدار مدتها. بيستخدم في `transition-timing-function` و`animation-timing-function` (واختصاراتهم). القيم:

- **كلمات جاهزة**: **`ease`** (الافتراضي: يبدأ بطيء ويسرع وبعدين يهدّى)، **`linear`** (سرعة ثابتة، مناسبة للدوران المستمر)، **`ease-in`** (يبدأ بطيء ويسرع)، **`ease-out`** (يبدأ سريع ويهدّى: **الأفضل للحركات الداخلة** لأنه يبان طبيعي)، **`ease-in-out`** (بطيء في الأول والآخر).
- **[[fn-cubic-bezier]]**: منحنى مخصص بنقطتين تحكم، وممكن يعمل ارتداد.
- **[[fn-steps]]**: خطوات منفصلة.
- **`linear()`**: دالة حديثة بتعرّف منحنى بنقاط كتير (تقليد زنبرك أو ارتداد حقيقي).

نصيحة عملية: لو الحركة بتاعة **ظهور** استخدم `ease-out`، ولو **اختفاء** استخدم `ease-in`، ولو **حركة مستمرة** (دوران) استخدم `linear`. ومتخلّيش كل حاجة `ease` الافتراضي من غير تفكير، لأن الاختيار الصح بيخلّي الواجهة تحس «طبيعية».

## try

```html
<style>
  .t { background:#efe0bd; border-radius:8px; padding:8px; }
  .b { width:30px; height:30px; border-radius:8px; margin:5px 0; background:#c9772f; transition:transform 1.2s; }
  .t:hover .b { transform:translateX(150px); }
  .l1 { transition-timing-function:linear; } .l2 { transition-timing-function:ease-in; } .l3 { transition-timing-function:ease-out; } .l4 { transition-timing-function:steps(5); }
</style>
<div class="t"><div class="b l1"></div><div class="b l2"></div><div class="b l3"></div><div class="b l4"></div></div>
```

## syntax

```css nolive
transition: transform .3s ease-out;
animation-timing-function: linear;
transition-timing-function: cubic-bezier(.4, 0, .2, 1);
animation-timing-function: steps(4);
```

- الافتراضي `ease`.
- ease-out للظهور وease-in للاختفاء.
- linear للدوران.

## use

- ease-out للحركات الداخلة.
- linear للدوران المستمر.
- cubic-bezier لشخصية مخصصة.

## avoid

- ترك الافتراضي بدون تفكير في كل حركة.
- ease-in للحركات الداخلة.

## examples

### 1) مقارنة
مرّر على الخلفية.

```html
<style>
  .t { background:#efe0bd; border-radius:8px; padding:8px; }
  .b { width:30px; height:30px; border-radius:8px; margin:5px 0; background:#c9772f; transition:transform 1.2s; }
  .t:hover .b { transform:translateX(140px); }
  .l1 { transition-timing-function:linear; } .l2 { transition-timing-function:ease-in; } .l3 { transition-timing-function:ease-out; } .l4 { transition-timing-function:steps(5); }
</style>
<div class="t"><div class="b l1"></div><div class="b l2"></div><div class="b l3"></div><div class="b l4"></div></div>
```



### 2) ease-out للظهور
يبدأ سريع.

```html
<style>
  .c { width:120px; padding:10px; background:#bcd4a8; color:#3d2c18; border-radius:8px; transform:translateY(-14px); opacity:0; animation:in .5s ease-out forwards; }
  @keyframes in { to { transform:none; opacity:1; } }
</style>
<div class="c">دخلت بنعومة</div>
```



### 3) linear للدوران
سرعة ثابتة.

```html
<style>
  @keyframes sp { to { transform:rotate(1turn); } }
  .s { width:34px; height:34px; border:5px solid #e4c490; border-top-color:#b5551f; border-radius:50%; animation:sp 1s linear infinite; }
</style>
<div class="s"></div>
```



### 4) ارتداد
cubic-bezier.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
  button:hover { transform:scale(1.15); }
</style>
<button>مرّر</button>
```



## mistakes

### linear للواجهة

```css bad
.menu { transition:transform .3s linear; }  /* آلي */
```

```css good
.menu { transition:transform .3s ease-out; }
```

طبيعية أكتر.

### نفس المنحنى للدخول والخروج

```css bad
.a { transition:opacity .3s ease; }
```

```css good
.a { transition:opacity .25s ease-out; } .a.out { transition-timing-function:ease-in; }
```

حسب الاتجاه.

## quiz

### الافتراضي؟
- [x] ease
- [ ] linear
- [ ] ease-in
- [ ] steps

ease.

### الأنسب للظهور؟
- [x] ease-out
- [ ] ease-in
- [ ] linear
- [ ] steps

يبدأ سريع.

### للدوران المستمر؟
- [x] linear
- [ ] ease
- [ ] ease-in
- [ ] ease-out

سرعة ثابتة.

## refs

- [MDN: `<easing-function>`](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)
