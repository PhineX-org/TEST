---
id: transition-duration
kind: property
cat: motion
chip: transition-duration
title: مدة الانتقال
en: CSS transition-duration property
status: stable
support: all
size: compact
mdn: transition-duration
summary: transition-duration بتحدد المدة اللي التغيير بيستغرقها بالثواني أو ملّي ثانية. الافتراضي صفر يعني فجأة.
keywords: transition-duration, مدة, seconds, ms, سرعة الانتقال
related: transition, transition-timing-function, transition-delay, transition-property
---

## intro

الخاصية `transition-duration` بتحدد **كام وقت** الانتقال بياخد من الحالة الأولى للتانية. القيمة بالثواني (`0.3s`) أو بالملّي ثانية (`300ms`). **الافتراضي `0s`** يعني التغيير فوري. القيم المريحة للواجهات: من **150ms لـ 400ms** لتفاعلات الأزرار، و**300–500ms** للحركات الأكبر. أقل من 100ms بتبان لحظية ومبتتحسش، وأكتر من 600ms بتحسسها بطيئة ومزعجة في الواجهات اليومية. وتقدر تحط قيم مختلفة لكل خاصية بفاصلة. جزء من [[transition]].

## try

```html
<style>
  .b { width:60px; height:40px; background:#c9772f; border-radius:8px; margin:6px; }
  .b:hover { transform:translateX(60px); }
</style>
<div class="b" style="transition-duration:.15s"></div><div class="b" style="transition-duration:.6s"></div><div class="b" style="transition-duration:1.2s"></div>
```

## syntax

```css nolive
transition-duration: 0.3s;
transition-duration: 300ms;
transition-duration: .2s, .5s;
```

- **القيمة المبدئية**: `0s`.
- بالثواني أو ms.

## values

### `<time>`
مدة (s أو ms).

### 0s
بدون حركة (الافتراضي).

## use

- ضبط سرعة الحركة.
- قيم مختلفة لكل خاصية.

## avoid

- مدد طويلة جداً في الواجهات.

## examples

### 1) سريع وبطيء
مقارنة.

```html
<style>
  .b { width:50px; height:30px; background:#3d7a5a; border-radius:6px; margin:6px; transition-property:transform; }
  .b:hover { transform:translateX(70px); }
</style>
<div class="b" style="transition-duration:.1s"></div><div class="b" style="transition-duration:.5s"></div><div class="b" style="transition-duration:1.5s"></div>
```



### 2) بالـ ms
نفس الفكرة.

```html
<style>
  .b { width:60px; height:30px; background:#c9772f; border-radius:6px; margin:10px; transition:transform 300ms; }
  .b:hover { transform:scale(1.4); }
</style>
<div class="b"></div>
```



### 3) مدة لكل خاصية
قيمتين.

```html
<style>
  .b { width:60px; height:40px; background:#c9772f; border-radius:6px; margin:10px; transition-property:background-color, transform; transition-duration:.2s, .8s; }
  .b:hover { background:#3d7a5a; transform:rotate(30deg); }
</style>
<div class="b"></div>
```



## mistakes

### مدة صفر

```css bad
.b { transition-property:color; }  /* المدة 0 */
```

```css good
.b { transition-property:color; transition-duration:.3s; }
```

لازم مدة.

## quiz

### الافتراضي؟
- [x] 0s
- [ ] 1s
- [ ] .3s
- [ ] auto

فوري.

### مدة مناسبة لزرار؟
- [x] 150–400ms
- [ ] 5s
- [ ] 0ms
- [ ] 10s

سريعة ومحسوسة.

## refs

- [MDN: transition-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)
