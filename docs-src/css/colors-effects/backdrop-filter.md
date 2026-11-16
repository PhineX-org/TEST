---
id: backdrop-filter
kind: property
cat: colors-effects
chip: backdrop-filter
title: فلتر اللي ورا العنصر
en: CSS backdrop-filter property
status: stable
support: all
mdn: backdrop-filter
summary: backdrop-filter بتطبّق فلتر (غالباً blur) على اللي ورا العنصر، وده أساس تأثير الزجاج المصنفر (Glassmorphism). محتاجة خلفية شبه شفافة.
keywords: backdrop-filter, blur, glassmorphism, زجاج, frosted glass, تمويه الخلفية
related: filter, fn-blur, opacity, background-color, position
---

## intro

الخاصية `backdrop-filter` شبه [[filter]] بالظبط، لكن بدل ما تطبّق الفلتر على **العنصر نفسه**، بتطبّقه على **اللي ظاهر من ورا العنصر**. يعني تقدر تعمل **زجاج مصنفر**: لوحة شبه شفافة بتموّه الخلفية اللي وراها (`backdrop-filter: blur(10px)`). ده شكل الـ Glassmorphism المشهور في شرايط التنقل والبطاقات العائمة.

شرط عشان تبان: لازم يكون العنصر **نفسه شبه شفاف** (خلفية بـ alpha مثلاً `rgb(243 237 224 / .5)`)، وإلا الخلفية المموّهة مش هتبان. وهي بتقبل نفس دوال الفلتر: [[fn-blur]] و[[fn-brightness]] و[[fn-saturate]]… وممكن تتجمع. وبتستهلك أداء، فاستخدمها على مساحات صغيرة.

> [!tip] للتوافق مع Safari القديم ضيف `-webkit-backdrop-filter` بجانبها.

## try

```html
<style>
  .bg { background:linear-gradient(90deg,#c9772f,#3d7a5a); padding:26px; border-radius:12px; }
  .g { padding:14px; border-radius:10px; background:rgb(243 237 224 / .35); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); color:#2f2820; font-weight:bold; }
</style>
<div class="bg"><div class="g">زجاج مصنفر</div></div>
```

## syntax

```css nolive
backdrop-filter: blur(10px);
backdrop-filter: blur(8px) saturate(1.2);
backdrop-filter: none;
```

- **القيمة المبدئية**: `none`.
- لازم العنصر يكون شبه شفاف.

## values

### blur()
تمويه اللي ورا العنصر.

### saturate() / brightness()
تعديل ألوان الخلفية المرئية.

### none
بدون فلتر.

## use

- شريط تنقل زجاجي.
- بطاقات عائمة فوق صور.
- نوافذ modal بخلفية مموّهة.

## avoid

- خلفية معتمة (التأثير مش هيبان).
- مساحات ضخمة (أداء).

## examples

### 1) زجاج فوق خلفية ملوّنة
التمويه واضح على الدوائر.

```html
<style>
  .bg { position:relative; height:110px; background:#efe0bd; border-radius:12px; overflow:hidden; }
  .c { position:absolute; width:60px; height:60px; border-radius:50%; }
  .g { position:absolute; inset:25px 30px; border-radius:10px; background:rgb(243 237 224 / .35); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; color:#3d2c18; font-weight:bold; }
</style>
<div class="bg"><div class="c" style="background:#c9772f;left:20px;top:10px"></div><div class="c" style="background:#3d7a5a;right:30px;top:35px"></div><div class="g">زجاج</div></div>
```



### 2) بدون شفافية
العنصر معتم فالتأثير مش باين.

```html
<style>
  .bg { background:linear-gradient(90deg,#c9772f,#3d7a5a); padding:20px; border-radius:12px; }
  .g { padding:12px; background:#f3ede0; backdrop-filter:blur(8px); color:#2f2820; border-radius:8px; }
</style>
<div class="bg"><div class="g">معتم، مفيش تأثير</div></div>
```



### 3) قيم مختلفة
blur صغير وكبير.

```html
<style>
  .bg { background:repeating-linear-gradient(45deg,#c9772f 0 12px,#efe0bd 12px 24px); padding:14px; border-radius:12px; display:flex; gap:10px; }
  .g { flex:1; padding:12px; border-radius:8px; background:rgb(243 237 224 / .3); color:#2f2820; text-align:center; font-weight:bold; }
</style>
<div class="bg"><div class="g" style="backdrop-filter:blur(2px)">2px</div><div class="g" style="backdrop-filter:blur(10px)">10px</div></div>
```



### 4) تمويه مع تشبّع
blur مع saturate لزجاج أغنى لوناً.

```html
<style>
  .bg { background:repeating-linear-gradient(90deg,#c9772f 0 20px,#3d7a5a 20px 40px); padding:18px; border-radius:12px; }
  .g { padding:12px; border-radius:10px; background:rgb(243 237 224 / .3); -webkit-backdrop-filter:blur(6px) saturate(1.4); backdrop-filter:blur(6px) saturate(1.4); color:#2f2820; font-weight:bold; text-align:center; }
</style>
<div class="bg"><div class="g">blur + saturate</div></div>
```



## mistakes

### خلفية معتمة

```css bad
.nav { background:#f3ede0; backdrop-filter:blur(10px); }
```

```css good
.nav { background:rgb(243 237 224 / .6); backdrop-filter:blur(10px); }
```

لازم alpha عشان التمويه يبان.

### نسيان prefix سفاري

```css bad
.nav { backdrop-filter:blur(8px); }  /* Safari القديم */
```

```css good
.nav { -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); }
```

ضيف -webkit- للتوافق.

## quiz

### backdrop-filter بتأثر على؟
- [ ] العنصر نفسه
- [x] اللي ورا العنصر
- [ ] الأولاد فقط
- [ ] الحدود

اللي وراه.

### شرط ظهورها؟
- [x] خلفية شبه شفافة
- [ ] حد سميك
- [ ] position:fixed
- [ ] z-index

alpha في الخلفية.

### الاستخدام الأشهر؟
- [x] زجاج مصنفر (Glassmorphism)
- [ ] تلوين النص
- [ ] تكبير
- [ ] طباعة

blur على اللي ورا.

## refs

- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
