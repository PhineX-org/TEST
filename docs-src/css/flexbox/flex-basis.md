---
id: flex-basis
kind: property
cat: flexbox
chip: flex-basis
title: الحجم المبدئي للعنصر المرن
en: CSS flex-basis property
status: stable
support: all
size: compact
mdn: flex-basis
summary: flex-basis بتحدد الحجم المبدئي للعنصر المرن على المحور الرئيسي قبل ما يتمدد أو يتقلص. بتغلب width في flex.
keywords: flex-basis, حجم مبدئي, basis, flex, width, auto, content
related: flex, flex-grow, flex-shrink, width
---

## intro

الخاصية `flex-basis` بتحدد **الحجم المبدئي** للعنصر المرن على **المحور الرئيسي** (العرض في `row`، الارتفاع في `column`) **قبل** ما `flex-grow` و`flex-shrink` يشتغلوا. هي في الحقيقة شبه `width` لكن بتحترم اتجاه flex، وبتغلب `width` لو الاتنين اتحددوا. القيمة `auto` (الافتراضي) يعني استخدم `width` أو حجم المحتوى. والقيمة `0` معناها «ابدأ من الصفر وقسّم كل المساحة» (زي `flex:1`). و`content` يعني حجم المحتوى. الاختصار [[flex]].

## try

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#c9772f; color:#fff3e0; padding:8px; }
  .b { flex-basis:140px; background:#3d7a5a !important; }
</style>
<div class="f"><div class="b">basis 140</div><div>عادي</div></div>
```

## syntax

```css nolive
flex-basis: auto;
flex-basis: 200px;
flex-basis: 30%;
flex-basis: 0;
flex-basis: content;
```

- **القيمة المبدئية**: `auto`.
- بتغلب `width`.

## values

### auto
يستخدم width أو حجم المحتوى.

### `<length>`
حجم مبدئي ثابت `200px`.

### `<percentage>`
نسبة من الحاوية.

### 0
يبدأ من صفر ويقتسم المساحة.

## use

- عرض مبدئي للكروت (`flex: 1 1 250px`).
- ارتفاع مبدئي في column.

## avoid

- الخلط بينها وبين width من غير ما تعرف الأولوية.

## examples

### 1) basis ثابت
العنصر بيبدأ بـ 120px.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:8px; }
  .a { flex-basis:120px; }
</style>
<div class="f"><div class="a">120px</div><div>تاني</div></div>
```



### 2) basis مع grow
كل عنصر ببدأ بـ 80px وبياخد جزء من الباقي.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { flex:1 1 80px; background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



### 3) basis بيغلب width
width:300px لكن basis:100px فالأخير هو اللي بيشتغل.

```html
<style>
  .f { display:flex; }
  .f div { width:300px; flex-basis:100px; flex-shrink:0; background:#e4c490; color:#3d2c18; padding:8px; }
</style>
<div class="f"><div>100px مش 300</div></div>
```



## mistakes

### width مع flex:1

```css bad
.c { flex:1; width:200px; }  /* width بتتجاهل */
```

```css good
.c { flex:1 1 200px; }
```

`flex:1` بتصفّر basis.

## quiz

### flex-basis بتحدد؟
- [x] الحجم المبدئي
- [ ] اللون
- [ ] المسافة
- [ ] الاتجاه

قبل التمدد والتقلص.

### لو basis وwidth معاً؟
- [ ] width بتكسب
- [x] basis بتكسب
- [ ] بتتجمع
- [ ] خطأ

basis الأقوى في flex.

## refs

- [MDN: flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis)
