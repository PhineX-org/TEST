---
id: fn-scale
kind: function
cat: fn-transform
chip: scale()
title: دالة scale(): تكبير وتصغير
en: CSS scale() function
status: stable
support: all
mdn: transform-function/scale
summary: scale(n) بتكبّر أو بتصغّر العنصر بمعامل (1 = الحجم الأصلي): transform: scale(1.2). scale(-1) بتعمل انعكاس.
keywords: scale, scaleX, scaleY, transform, تكبير, تصغير, hover
related: transform, scale, fn-translate, fn-rotate
---

## intro

الدالة `scale()` (داخل [[transform]]) بتغيّر **حجم العنصر بالمعامل**: **1** = الحجم الأصلي، **1.2** = أكبر 20%، **0.5** = نص الحجم، **0** = اختفى. `transform: scale(1.1);` أشهر تأثير hover للبطاقات والصور. بتقبل قيمتين لـ X وY منفصلين: `scale(1.5, 0.8)`، أو `scaleX(2)` و`scaleY(0.5)`. **قيمة سالبة** بتعمل **انعكاس (mirror)**: `scaleX(-1)` تقلب العنصر أفقياً (مفيد لأيقونات الأسهم في RTL!).

زي `translate`: **ما بتأثرش على التخطيط** (باقي العناصر مبتتحركش) ومعالجتها على GPU فهي سلسة. التكبير بيحصل من **مركز العنصر** افتراضياً، وممكن تغيّر نقطة الأصل بـ `transform-origin`. وفيه خاصية [[scale]] مستقلة: `scale: 1.2;`. تنبيه: تكبير الصور بعد الحجم الأصلي ممكن يعمل ضبابية.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx">1</div><div class="bx" style="transform:scale(1.4)">1.4</div><div class="bx" style="transform:scale(.6)">.6</div></div>
```

## syntax

```css nolive
transform: scale(1.2);
transform: scale(1.5, 0.8);
transform: scaleX(-1);  /* انعكاس */
```

- 1 = الحجم الأصلي.
- سالب = انعكاس.
- من المركز افتراضياً.

## use

- تكبير hover للبطاقات.
- انعكاس بـ scaleX(-1).
- نبض (pulse).

## avoid

- تكبير الصور فوق حجمها الأصلي.
- نسيان إن التخطيط بيفضل ثابت.

## examples

### 1) 3 أحجام
1 و1.4 و.6.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx">1</div><div class="bx" style="transform:scale(1.4)">1.4</div><div class="bx" style="transform:scale(.6)">.6</div></div>
```



### 2) hover بطاقة
تكبير خفيف.

```html
<style>
  .c { width:120px; padding:14px; background:#efe0bd; color:#3d2c18; border-radius:10px; transition:transform .25s; text-align:center; }
  .c:hover { transform:scale(1.08); }
</style>
<div class="c">مرّر عليّا</div>
```



### 3) انعكاس
scaleX(-1).

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx">◀</div><div class="bx" style="transform:scaleX(-1)">◀</div></div>
```



### 4) X وY مختلفين
تمدد.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="bx" style="transform:scale(1.6,.6)">مد</div></div>
```



## mistakes

### ظن التكبير بيحرك الجيران

```css bad
.a { transform:scale(2); }  /* الجيران ثابتين */
```

```css good
/* غيّر width/height لو عايز التخطيط يتغيّر */
```

التخطيط ثابت.

### 0 بيخفي

```css bad
.a { transform:scale(0); }
```

```css good
.a { transform:scale(.001); } أو opacity
```

حذر.

## quiz

### scale(1) بتعمل؟
- [x] الحجم الأصلي
- [ ] تكبير
- [ ] تصغير
- [ ] اختفاء

1 = الأصلي.

### scaleX(-1)؟
- [x] انعكاس أفقي
- [ ] تصغير
- [ ] تكبير
- [ ] لا شيء

mirror.

### بتأثر على التخطيط؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] دايماً

مش بتأثر.

## refs

- [MDN: scale()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale)
