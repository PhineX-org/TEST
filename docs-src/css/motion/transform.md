---
id: transform
kind: property
cat: motion
chip: transform
title: التحويلات (تحريك وتدوير وتكبير)
en: CSS transform property
status: stable
support: all
mdn: transform
summary: transform بتحرّك العنصر أو تدوّره أو تكبّره أو تميله بدون ما تأثر على باقي الصفحة. الأساس لكل الحركات الخفيفة.
keywords: transform, translate, rotate, scale, skew, تحريك, تدوير, تكبير, matrix
related: transform-origin, transition, translate, scale, rotate, fn-translate, fn-rotate
---

## intro

الخاصية `transform` بتعمل **تحويلات هندسية** للعنصر: **تحريك** (`translate`)، **تدوير** (`rotate`)، **تكبير/تصغير** (`scale`)، **إمالة** (`skew`). والمهم: التحويل بيتم **بصرياً فقط**، يعني العنصر بيفضل **ياخد مكانه الأصلي** في التخطيط، وباقي العناصر **مبتتحركش**. ده السبب إنها **سريعة جداً** وهي الخيار الأول للحركات الناعمة (بتتنفذ على كارت الرسوميات GPU).

الصيغة: `transform: translateX(20px) rotate(10deg) scale(1.2);`. تقدر تكتب **أكتر من دالة** مفصولة بمسافة، و**الترتيب مهم**: بتتنفذ من **اليمين للشمال** (آخر دالة تتطبق أولاً على المحاور). مثلاً `translateX(100px) rotate(45deg)` مختلفة عن `rotate(45deg) translateX(100px)`.

الدوال الأساسية: [[fn-translate]] و[[fn-rotate]] و[[fn-scale]] و[[fn-skew]] و[[fn-matrix]] وفي 3D: `rotateX/Y/Z` و`translate3d` و[[fn-perspective]].

نقاط مهمة:
- **نقطة الأصل** (من أنهي نقطة التحويل يحصل): [[transform-origin]] (الافتراضي مركز العنصر).
- التحويلات **بتعمل stacking context** جديد.
- **العناصر inline** مبتتأثرش بـ transform؛ لازم `display: inline-block` أو block.
- للتحويلات المنفصلة الحديثة استخدم [[translate]] و[[scale]] و[[rotate]] كخصائص مستقلة.

> [!analogy] `transform` زي لما تحرك ورقة على سطح مكتبك: الورقة نفسها اتحركت، لكن مكانها «الأصلي» لسه محجوز على الترتيب للباقيين.

## try

```html
<style>
  .b { display:inline-block; padding:10px 18px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; margin:18px; transition:transform .3s; }
  .b:hover { transform:rotate(-8deg) scale(1.15); }
</style>
<div class="b">مرّر عليّ</div>
```

## syntax

```css nolive
transform: translateX(20px);
transform: rotate(45deg);
transform: scale(1.5);
transform: skewX(15deg);
transform: translate(10px, 20px) rotate(10deg) scale(1.1);
transform: none;
```

- **القيمة المبدئية**: `none`.
- **بتتحرك؟** أيوه.
- العنصر بيفضل ياخد مكانه.
- الترتيب مهم.

## values

### translate()
تحريك.

### rotate()
تدوير بالدرجات.

### scale()
تكبير/تصغير.

### skew()
إمالة.

### none
بدون تحويل.

## use

- تأثيرات hover (رفع وتكبير).
- حركات خفيفة بـ transition.
- توسيط بـ translate(-50%,-50%).

## avoid

- transform لتحريك التخطيط (استخدم margin أو grid).
- نسيان inline-block مع العناصر inline.

## examples

### 1) تحريك
translate.

```html
<style>
  .b { display:inline-block; width:50px; height:50px; background:#bcd4a8; border-radius:8px; }
  .m { background:#c9772f; transform:translate(30px, 10px); }
</style>
<div class="b"></div><div class="b m"></div>
```



### 2) تدوير وتكبير
rotate وscale.

```html
<style>
  .b { display:inline-block; width:50px; height:50px; margin:14px; background:#c9772f; border-radius:8px; }
</style>
<div class="b" style="transform:rotate(25deg)"></div><div class="b" style="transform:scale(1.4)"></div><div class="b" style="transform:skewX(20deg)"></div>
```



### 3) الترتيب مهم
نفس الدوال بترتيب مختلف.

```html
<style>
  .b { display:inline-block; width:40px; height:40px; background:#3d7a5a; margin:30px 60px; border-radius:6px; }
</style>
<div class="b" style="transform:translateX(60px) rotate(45deg)"></div><div class="b" style="transform:rotate(45deg) translateX(60px)"></div>
```



### 4) توسيط مطلق
translate(-50%,-50%).

```html
<style>
  .p { position:relative; height:90px; background:#efe0bd; border-radius:8px; }
  .c { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); padding:8px 14px; background:#7a4a1d; color:#f3ede0; border-radius:6px; }
</style>
<div class="p"><div class="c">في النص</div></div>
```



## mistakes

### inline بدون inline-block

```css bad
span { transform:rotate(10deg); }  /* مبتشتغلش على inline */
```

```css good
span { display:inline-block; transform:rotate(10deg); }
```

العنصر لازم block أو inline-block.

### تحريك بدل التخطيط

```css bad
.a { transform:translateY(100px); }  /* مكانه محجوز */
```

```css good
.a { margin-top:100px; }
```

transform بصري فقط.

## quiz

### transform بتأثر على التخطيط؟
- [x] لأ بصرياً فقط
- [ ] أيوه
- [ ] أحياناً
- [ ] دايماً

المكان الأصلي محجوز.

### الترتيب في transform؟
- [x] مهم
- [ ] غير مهم
- [ ] عشوائي
- [ ] لا شيء

يختلف الناتج.

### الدالة للتدوير؟
- [x] rotate
- [ ] scale
- [ ] skew
- [ ] translate

rotate.

## refs

- [MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
