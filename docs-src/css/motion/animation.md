---
id: animation
kind: property
cat: motion
chip: animation
title: الأنيميشن (حركة بإطارات)
en: CSS animation property
status: stable
support: all
mdn: animation
summary: animation بتشغّل حركة معرّفة بـ @keyframes: اسم ومدة ومنحنى وتأخير وعدد تكرار واتجاه. بتشتغل تلقائياً من غير حدث.
keywords: animation, keyframes, أنيميشن, حركة, loop, infinite, spinner
related: at-keyframes, transition, animation-name, animation-duration, animation-iteration-count, transitions-animations-guide
---

## intro

الخاصية `animation` بتشغّل **حركة مكتوبة بـ `@keyframes`**. الفرق عن [[transition]]: الـ transition بتحتاج **حدث** (hover) وبتروح من حالة لحالة، أما الـ animation فبتشتغل **لوحدها** (عند تحميل الصفحة مثلاً)، وتقدر تعمل **مراحل متعددة** (0% و50% و100%)، وتكرارها **للأبد**.

**الخطوة 1: عرّف الإطارات** بـ [[at-keyframes]]:

```
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
```

**الخطوة 2: طبّقها** على العنصر: `animation: pulse 1.5s ease-in-out infinite;`.

الاختصار بيجمع (بالترتيب المعتاد): **name** [[animation-name]] و**duration** [[animation-duration]] و**timing-function** [[animation-timing-function]] و**delay** [[animation-delay]] و**iteration-count** [[animation-iteration-count]] و**direction** [[animation-direction]] و**fill-mode** [[animation-fill-mode]] و**play-state** [[animation-play-state]]. الاسم والمدة هما الأهم.

نصائح:
- حرّك `transform` و`opacity` للأداء الأفضل.
- استخدم `animation-fill-mode: forwards` لو عايز العنصر يفضل في آخر إطار.
- **احترم المستخدمين الحساسين للحركة**: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`.
- الأنيميشن اللي بتلف للأبد (infinite) على أكتر من عنصر ممكن تستهلك البطارية.

> [!analogy] `@keyframes` زي سيناريو فيلم (المشاهد المهمة)، والـ `animation` هي «شغّل الفيلم بالسرعة دي وكرّره كذا مرة».

## try

```html
<style>
  @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.2); } }
  .d { width:50px; height:50px; background:#c9772f; border-radius:50%; margin:20px; animation:pulse 1.2s ease-in-out infinite; }
</style>
<div class="d"></div>
```

## syntax

```css nolive
animation: pulse 1.5s ease-in-out infinite;
animation: slide .6s ease-out forwards;
animation: spin 1s linear infinite, fade 2s ease;
animation: none;
```

- **القيمة المبدئية**: `none`.
- لازم @keyframes بنفس الاسم.
- اسم ومدة على الأقل.

## values

### name
اسم الـ @keyframes.

### duration
المدة (إجبارية).

### timing-function
المنحنى.

### iteration-count
التكرار (رقم أو infinite).

## use

- spinner تحميل.
- نبض وتنبيهات.
- ظهور تدريجي عند التحميل.

## avoid

- تحريك width/height (أداء).
- infinite على عناصر كتير.
- تجاهل prefers-reduced-motion.

## examples

### 1) نبض
scale بتكرار لا نهائي.

```html
<style>
  @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.25); } }
  .d { width:44px; height:44px; background:#c9772f; border-radius:50%; margin:18px; animation:pulse 1.2s ease-in-out infinite; }
</style>
<div class="d"></div>
```



### 2) Spinner
دوران مستمر.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:36px; height:36px; border:5px solid #efe0bd; border-top-color:#3d7a5a; border-radius:50%; margin:14px; animation:spin .9s linear infinite; }
</style>
<div class="s"></div>
```



### 3) ظهور من الأسفل
مرة واحدة مع forwards.

```html
<style>
  @keyframes up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  .c { padding:12px 18px; background:#efe0bd; color:#3d2c18; border-radius:8px; animation:up .7s ease-out both; }
</style>
<div class="c">بطاقة ظهرت</div>
```



### 4) مراحل متعددة
أكتر من نقطة.

```html
<style>
  @keyframes mv { 0% { transform:translateX(0); background:#c9772f; } 50% { transform:translateX(100px); background:#3d7a5a; } 100% { transform:translateX(0); background:#c9772f; } }
  .b { width:40px; height:40px; border-radius:8px; margin:10px; animation:mv 3s ease-in-out infinite; }
</style>
<div class="b"></div>
```



## mistakes

### اسم keyframes غلط

```css bad
.a { animation:pulse 1s; }  /* مفيش @keyframes pulse */
```

```css good
@keyframes pulse { ... }
.a { animation:pulse 1s; }
```

لازم نفس الاسم.

### نسيان المدة

```css bad
.a { animation-name:pulse; }  /* المدة 0 */
```

```css good
.a { animation:pulse 1s; }
```

لازم duration.

## quiz

### الأنيميشن بتحتاج؟
- [x] @keyframes
- [ ] hover
- [ ] JS
- [ ] float

تعريف الإطارات.

### الفرق عن transition؟
- [x] بتشتغل لوحدها وبمراحل
- [ ] أبطأ
- [ ] أقدم
- [ ] لا فرق

مستقلة عن الأحداث.

### لتكرار للأبد؟
- [x] infinite
- [ ] forever
- [ ] loop
- [ ] repeat

infinite.

## refs

- [MDN: animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
