---
id: transform-origin
kind: property
cat: motion
chip: transform-origin
title: نقطة أصل التحويل
en: CSS transform-origin property
status: stable
support: all
size: compact
mdn: transform-origin
summary: transform-origin بتحدد النقطة اللي التدوير والتكبير بيحصل حواليها: المركز افتراضياً، وتقدر تخليها زاوية أو أي نقطة.
keywords: transform-origin, نقطة الأصل, pivot, مركز التدوير, 50% 50%
related: transform, rotate, scale, transition
---

## intro

الخاصية `transform-origin` بتحدد **نقطة الارتكاز (pivot)** اللي التحويل بيحصل حواليها. الافتراضي **مركز العنصر** (`50% 50%`). يعني لما تعمل `rotate(45deg)` العنصر بيلف حوالين مركزه. لو غيّرت الأصل لـ `top left` بيلف حوالين زاويته العلوية اليسرى زي باب بيلف على مفصلاته.

بتاخد قيمتين (أفقي ثم رأسي): كلمات (`left` و`center` و`right` و`top` و`bottom`) أو نسب أو أطوال. وفي 3D ممكن قيمة تالتة للعمق. مثال: `transform-origin: bottom center;` مناسبة لتأثير «عقرب الساعة» أو القوائم المنسدلة اللي بتتكبّر من فوق لتحت. وتؤثر على [[transform]] فقط.

## try

```html
<style>
  .b { display:inline-block; width:60px; height:60px; margin:24px; background:#c9772f; border-radius:6px; }
  .o { transform-origin:top right; transform:rotate(30deg); }
</style>
<div class="b"></div><div class="b o"></div>
```

## syntax

```css nolive
transform-origin: center;
transform-origin: top left;
transform-origin: 50% 100%;
transform-origin: 10px 20px;
```

- **القيمة المبدئية**: `50% 50%`.

## values

### keywords
left وright وtop وbottom وcenter.

### `<percentage>`
نسبة من العنصر.

### `<length>`
قيمة ثابتة.

## use

- باب يلف على مفصله.
- عقارب ساعة.
- قايمة بتتفتح من فوق.

## avoid

- تغيير الأصل أثناء الحركة (بيعمل قفزة).

## examples

### 1) زاوية علوية
تدوير حوالين الزاوية.

```html
<style>
  .b { display:inline-block; width:60px; height:60px; margin:24px; background:#c9772f; border-radius:4px; transform:rotate(25deg); }
</style>
<div class="b" style="transform-origin:center"></div><div class="b" style="transform-origin:top left"></div><div class="b" style="transform-origin:bottom right"></div>
```



### 2) تكبير من تحت
scale من الأسفل.

```html
<style>
  .b { width:80px; height:40px; background:#3d7a5a; margin:12px; transform-origin:bottom center; transition:transform .3s; border-radius:4px; }
  .b:hover { transform:scaleY(2); }
</style>
<div class="b"></div>
```



### 3) عقرب
يلف حوالين طرفه.

```html
<style>
  .c { position:relative; width:90px; height:90px; border:4px solid #7a4a1d; border-radius:50%; background:#efe0bd; }
  .h { position:absolute; top:50%; left:50%; width:3px; height:36px; background:#b5551f; transform-origin:bottom center; transform:translate(-50%,-100%) rotate(45deg); }
</style>
<div class="c"><div class="h"></div></div>
```



## mistakes

### نسيان الأصل

```css bad
.door { transform:rotate(30deg); }  /* بيلف حوالين المركز */
```

```css good
.door { transform-origin:left center; transform:rotate(30deg); }
```

حدد المفصل.

## quiz

### الافتراضي؟
- [x] center (50% 50%)
- [ ] top left
- [ ] bottom
- [ ] 0 0

المركز.

### بتأثر على؟
- [x] transform
- [ ] color
- [ ] margin
- [ ] float

transform.

## refs

- [MDN: transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
