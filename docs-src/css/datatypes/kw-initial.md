---
id: kw-initial
kind: datatype
cat: datatypes
chip: initial
title: الكلمة initial: القيمة الابتدائية
en: CSS initial keyword
status: stable
support: all
size: compact
mdn: initial
summary: initial بترجّع الخاصية لقيمتها الابتدائية في المواصفات (مش لقيمة المتصفح)، فتلغي أي ستايل تاني.
keywords: initial, reset, القيمة الابتدائية, css-wide keyword
related: kw-inherit, kw-unset, kw-revert, all
---

## intro

الكلمة `initial` هي واحدة من **الكلمات المفتاحية العامة (CSS-wide keywords)** اللي بتتقبل في **أي خاصية**. بترجّع الخاصية لـ **قيمتها الابتدائية** (initial value) **المعرّفة في مواصفات CSS** لتلك الخاصية، مش لستايل المتصفح الافتراضي! مثال: القيمة الابتدائية لـ `display` هي `inline` (حتى لو العنصر `div` اللي المتصفح بيدّيله block). فلو كتبت `div { display: initial; }` الـ div هيبقى inline! ولـ `color` الابتدائية بتعتمد على المتصفح (عادةً أسود)، ولـ `margin` هي `0`. استخدامها: تلغي ستايل موروث أو مكتوب قبلها بكلمة واحدة، لكن خد بالك من المفاجأة دي؛ لو عايز ترجع لشكل المتصفح استخدم [[kw-revert]].

## try

```html
<style>
  .p { color:#b5551f; font-weight:bold; }
  .p span { color:initial; }
</style>
<div class="p">لون برتقالي <span>وده بقى initial (الأسود)</span></div>
```

## syntax

```css nolive
color: initial;
display: initial;   /* inline حتى لو div */
margin: initial;    /* 0 */
```

- القيمة الابتدائية من المواصفات.
- مختلفة عن ستايل المتصفح.

## use

- إلغاء ستايل موروث.
- إرجاع خاصية لافتراضياتها.

## avoid

- الخلط بين initial وrevert.

## examples

### 1) إلغاء لون
يرجع للأصل.

```html
<style>
  .p { color:#b5551f; font-weight:bold; }
  .p span { color:initial; }
</style>
<div class="p">لون برتقالي <span>initial</span></div>
```



### 2) display: initial
مفاجأة inline.

```html
<style>
  div { background:#e4c490; color:#3d2c18; margin:3px 0; }
  .i { display:initial; }
</style>
<div>div عادي (block)</div><div class="i">div بـ initial (بقى inline)</div><div class="i">بجانبه</div>
```



### 3) margin: initial
صفر.

```html
<style>
  p { margin:20px; background:#efe0bd; color:#3d2c18; padding:4px; }
  .z { margin:initial; }
</style>
<p>هامش 20</p><p class="z">initial = صفر</p>
```



## mistakes

### ظن initial = ستايل المتصفح

```css bad
div { display:initial; }  /* بقى inline مش block */
```

```css good
div { display:revert; }  /* block */
```

revert لستايل المتصفح.

## quiz

### initial ترجّع لـ؟
- [x] القيمة الابتدائية في المواصفات
- [ ] ستايل المتصفح
- [ ] الأب
- [ ] الصفر دايماً

spec.

### display: initial على div؟
- [x] inline
- [ ] block
- [ ] flex
- [ ] none

مفاجأة.

## refs

- [MDN: initial](https://developer.mozilla.org/en-US/docs/Web/CSS/initial)
