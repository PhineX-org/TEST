---
id: fn-cubic-bezier
kind: function
cat: fn-misc
chip: cubic-bezier()
title: منحنى سرعة مخصص
en: CSS cubic-bezier() function
status: stable
support: all
mdn: easing-function
summary: cubic-bezier(x1,y1,x2,y2) بتعرّف منحنى سرعة مخصص للانتقالات والأنيميشن: transition: transform .4s cubic-bezier(.2,.8,.2,1).
keywords: cubic-bezier, easing, timing function, منحنى, bounce, ease
related: fn-steps, dt-easing, transition, animation, transitions-animations-guide
---

## intro

الدالة `cubic-bezier(x1, y1, x2, y2)` بتعرّف **منحنى السرعة** (easing) بدقة: **إزاي بتتغيّر سرعة الحركة** على مدار الوقت. الكلمات الجاهزة (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`) هي في الحقيقة منحنيات `cubic-bezier` محددة. لما بتكتب منحنى بنفسك بتتحكم في «شخصية» الحركة.

المنحنى بيبدأ من (0,0) وينتهي في (1,1)، ونقطتي التحكم هما (x1,y1) و(x2,y2). **x** لازم بين 0 و1، لكن **y** ممكن يطلع برّه المدى فتعمل **ارتداد (overshoot)**: `cubic-bezier(.34, 1.56, .64, 1)` الحركة بتعدّي نقطة النهاية شوية وترجع (حركة «مرِحة»).

أمثلة معروفة: `cubic-bezier(.4, 0, .2, 1)` (Material، سلس)، `cubic-bezier(.2, .8, .2, 1)` (يبدأ سريع ويهدّى بنعومة). نصيحة: الحركات **الداخلة** تبقى `ease-out` (تبدأ سريعة وتهدّى) والخارجة `ease-in`. وأدوات مثل cubic-bezier.com أو أدوات المطور بتخليك ترسم المنحنى بالماوس. ومع [[at-keyframes]] ممكن تحدد easing لكل خطوة.

## try

```html
<style>
  .t { background:#efe0bd; border-radius:8px; padding:8px; }
  .b { width:34px; height:34px; border-radius:8px; margin:6px 0; background:#c9772f; transition:transform 1s; }
  .t:hover .b { transform:translateX(160px); }
  .l { transition-timing-function:linear; } .e { transition-timing-function:ease; } .o { transition-timing-function:cubic-bezier(.34,1.56,.64,1); }
</style>
<div class="t"><div class="b l"></div><div class="b e"></div><div class="b o"></div></div>
```

## syntax

```css nolive
transition: transform .4s cubic-bezier(.2, .8, .2, 1);
animation-timing-function: cubic-bezier(.34, 1.56, .64, 1);  /* ارتداد */
```

- 4 أرقام: x1 y1 x2 y2.
- x بين 0 و1.
- y ممكن يطلع برّه المدى (ارتداد).

## use

- حركات بشخصية مخصصة.
- ارتداد خفيف للأزرار.
- انتقالات سلسة (Material).

## avoid

- x خارج 0-1 (غير صالح).
- ارتداد مبالغ في الواجهات الجادة.

## examples

### 1) مقارنة منحنيات
مرّر على المربع.

```html
<style>
  .t { background:#efe0bd; border-radius:8px; padding:8px; }
  .b { width:34px; height:34px; border-radius:8px; margin:6px 0; background:#c9772f; transition:transform 1s; }
  .t:hover .b { transform:translateX(150px); }
  .l { transition-timing-function:linear; } .e { transition-timing-function:ease-in-out; } .o { transition-timing-function:cubic-bezier(.34,1.56,.64,1); }
</style>
<div class="t"><div class="b l"></div><div class="b e"></div><div class="b o"></div></div>
```



### 2) زرار بارتداد
مرّر عليه.

```html
<style>
  button { padding:10px 20px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
  button:hover { transform:scale(1.15); }
</style>
<button>ارتداد</button>
```



### 3) Material
سلس.

```html
<style>
  .c { width:130px; padding:12px; background:#efe0bd; color:#3d2c18; border-radius:10px; transition:transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s cubic-bezier(.4,0,.2,1); }
  .c:hover { transform:translateY(-4px); box-shadow:0 10px 16px rgba(61,44,24,.25); }
</style>
<div class="c">بطاقة</div>
```



### 4) keyframes
لكل خطوة easing.

```html
<style>
  @keyframes jump { 0% { transform:translateY(0); animation-timing-function:cubic-bezier(.2,.8,.4,1); } 50% { transform:translateY(-30px); animation-timing-function:cubic-bezier(.6,0,.8,.4); } 100% { transform:translateY(0); } }
  .j { width:34px; height:34px; border-radius:50%; background:#c9772f; margin:36px 20px 6px; animation:jump 1.2s infinite; }
</style>
<div class="j"></div>
```



## mistakes

### x برّه المدى

```css bad
cubic-bezier(1.5, 0, 0.5, 1)  /* غير صالح */
```

```css good
cubic-bezier(.5, 0, .5, 1.5)  /* y فقط */
```

x بين 0 و1.

### ارتداد في كل شيء

```css bad
* { transition-timing-function:cubic-bezier(.34,1.56,.64,1); }
```

```css good
/* للأزرار والعناصر المرحة فقط */
```

حرّكة مناسبة للمحتوى.

## quiz

### cubic-bezier بتحدد؟
- [x] منحنى السرعة
- [ ] المدة
- [ ] اللون
- [ ] المكان

easing.

### y أكبر من 1؟
- [x] ارتداد overshoot
- [ ] خطأ
- [ ] أبطأ
- [ ] لا شيء

يعدّي النهاية.

### ease-out للحركات؟
- [x] الداخلة
- [ ] الخارجة فقط
- [ ] الدائرية
- [ ] الثابتة

تبدأ سريعة وتهدّى.

## refs

- [MDN: cubic-bezier()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)
