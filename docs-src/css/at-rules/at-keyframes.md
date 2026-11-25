---
id: at-keyframes
kind: atrule
cat: at-rules
chip: @keyframes
title: تعريف الأنيميشن
en: CSS @keyframes at-rule
status: stable
support: all
mdn: @keyframes
summary: قاعدة @keyframes بتعرّف خطوات أنيميشن (من-إلى أو بنسب مئوية) تدّيها اسم وتشغّلها بـ animation.
keywords: @keyframes, animation, from, to, percent, حركة, أنيميشن
related: animation, animation-name, animation-duration, transition
---

## intro

القاعدة `@keyframes` هي **السيناريو** بتاع الأنيميشن: بتعرّف **الخطوات (المفاتيح)** اللي العنصر هيمرّ بيها وتديها اسم. وبعدين بتشغّلها على أي عنصر بـ [[animation-name]] أو اختصار [[animation]].

الصيغة: 
```
@keyframes اسم {
  from { ...ستايل البداية... }
  to   { ...ستايل النهاية... }
}
```
أو بنسب لخطوات كتير: `0% { }  50% { }  100% { }`. المتصفح بيحسب **الفريمات اللي بين المفاتيح** لوحده (interpolation).

نقاط مهمة:
- لو حذفت `from` المتصفح بيستخدم ستايل العنصر الحالي كبداية.
- الأنيميشن مبيشتغلش إلا لو العنصر ليه `animation-duration` أكبر من صفر.
- مش كل الخصائص قابلة للتحريك؛ الأفضل `transform` و`opacity` لأداء ممتاز.
- ممكن تكتب `0%, 100% { ... }` لمفتاحين بنفس الستايل (حركة دورية).
- احترم `prefers-reduced-motion` للحساسين للحركة.

## try

```html
<style>
  @keyframes pulse { 0%,100% { transform:scale(1); background:#c9772f; } 50% { transform:scale(1.2); background:#e4c490; } }
  .p { width:60px; height:60px; border-radius:50%; margin:14px; animation:pulse 1.6s ease-in-out infinite; }
</style>
<div class="p"></div>
```

## syntax

```css nolive
@keyframes slide {
  from { transform: translateX(0); }
  to   { transform: translateX(100px); }
}
.box { animation: slide 2s ease infinite alternate; }
```

- مفاتيح `from/to` أو نسب مئوية.
- الاسم حساس لحالة الأحرف.
- لازم duration > 0.

## use

- أنيميشن تحميل (spinner).
- حركة جذب انتباه.
- حركة دخول العناصر.

## avoid

- تحريك width/height/top (تقيل).
- أنيميشن لا نهائي مزعج من غير تحكم.

## examples

### 1) من وإلى
أبسط شكل.

```html
<style>
  @keyframes slide { from { transform:translateX(0); } to { transform:translateX(120px); } }
  .b { width:40px; height:40px; background:#3d7a5a; border-radius:8px; animation:slide 1.5s ease-in-out infinite alternate; }
</style>
<div class="b"></div>
```



### 2) نسب مئوية
خطوات متعددة.

```html
<style>
  @keyframes pulse { 0%,100% { transform:scale(1); background:#c9772f; } 50% { transform:scale(1.25); background:#e4c490; } }
  .p { width:50px; height:50px; border-radius:50%; margin:10px; animation:pulse 1.6s ease-in-out infinite; }
</style>
<div class="p"></div>
```



### 3) Spinner
دوران.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:36px; height:36px; border:5px solid #e4c490; border-top-color:#b5551f; border-radius:50%; animation:spin .9s linear infinite; margin:8px; }
</style>
<div class="s"></div>
```



### 4) احترام تقليل الحركة
reduced-motion.

```html
<style>
  @keyframes bounce { 50% { transform:translateY(-14px); } }
  .b { width:34px; height:34px; background:#c9772f; border-radius:50%; margin:18px; animation:bounce 1s ease infinite; }
  @media (prefers-reduced-motion: reduce) { .b { animation:none; } }
</style>
<div class="b"></div>
```



## mistakes

### نسيان duration

```css bad
.a { animation-name:x; }  /* مبتتحركش */
```

```css good
.a { animation:x 1s; }
```

duration مطلوب.

### تحريك خصائص تقيلة

```css bad
@keyframes m { to { left:100px; } }
```

```css good
@keyframes m { to { transform:translateX(100px); } }
```

transform أسلس.

## quiz

### @keyframes بتعمل؟
- [x] تعرّف خطوات الأنيميشن
- [ ] تشغّله
- [ ] توقفه
- [ ] تلوّنه

تعريف.

### الأنيميشن بيتشغّل بـ؟
- [x] animation
- [ ] transition
- [ ] transform
- [ ] @media

animation.

### الأفضل أداءً للتحريك؟
- [x] transform وopacity
- [ ] width
- [ ] left
- [ ] margin

GPU.

## refs

- [MDN: @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
