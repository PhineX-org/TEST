---
id: transition-property
kind: property
cat: motion
chip: transition-property
title: أنهي خاصية تتحرك
en: CSS transition-property property
status: stable
support: all
size: compact
mdn: transition-property
summary: transition-property بتحدد أسماء الخصائص اللي هتتحرك: all أو اسم خاصية معيّنة أو قايمة منها. الأفضل تحدد بدل all.
keywords: transition-property, all, none, خاصية متحركة
related: transition, transition-duration, transition-timing-function, transition-delay
---

## intro

الخاصية `transition-property` بتحدد **أنهي الخصائص** هيتحركوا. القيمة `all` (الافتراضي) = **كل الخصائص القابلة للتحريك**، وده سهل لكنه ممكن يحرّك حاجات مش عايزها ويضر الأداء. الأفضل تكتب **الخصائص بالاسم**: `transition-property: background-color, transform;` (مفصولة بفاصلة) وقتها المدة والمنحنى الباقيين بيتطابقوا بالترتيب. و`none` بيمنع أي انتقال. تأكد إن الخاصية **قابلة للتحريك** (animatable): الألوان والأطوال والأرقام ينفعوا، لكن `display` مثلاً لأ. ضمن الاختصار [[transition]].

## try

```html
<style>
  .b { width:70px; height:50px; background:#c9772f; border-radius:8px; margin:10px; transition-property:background-color, transform; transition-duration:.4s; }
  .b:hover { background:#3d7a5a; transform:rotate(15deg); }
</style>
<div class="b"></div>
```

## syntax

```css nolive
transition-property: all;
transition-property: background-color;
transition-property: opacity, transform;
transition-property: none;
```

- **القيمة المبدئية**: `all`.

## values

### all
كل الخصائص.

### `<property>`
أسماء بفاصلة.

### none
بدون انتقال.

## use

- تحديد خصائص بعينها.
- تحسين الأداء.

## avoid

- all على عناصر تقيلة.

## examples

### 1) خاصية واحدة
اللون فقط.

```html
<style>
  .b { width:70px; height:40px; background:#c9772f; border-radius:8px; margin:10px; transition-property:background-color; transition-duration:.5s; }
  .b:hover { background:#3d7a5a; transform:rotate(15deg); }
</style>
<div class="b"></div>
```



### 2) اتنين
لون وتحريك.

```html
<style>
  .b { width:70px; height:40px; background:#c9772f; border-radius:8px; margin:10px; transition-property:background-color, transform; transition-duration:.4s; }
  .b:hover { background:#7a4a1d; transform:translateX(20px); }
</style>
<div class="b"></div>
```



### 3) none
بدون انتقال.

```html
<style>
  .b { width:70px; height:40px; background:#c9772f; border-radius:8px; margin:10px; transition-property:none; }
  .b:hover { background:#3d7a5a; }
</style>
<div class="b"></div>
```



## mistakes

### all على كل شيء

```css bad
* { transition:all .3s; }
```

```css good
.btn { transition:background-color .3s; }
```

حدد الخصائص.

## quiz

### الافتراضي؟
- [x] all
- [ ] none
- [ ] color
- [ ] opacity

all.

### الأفضل؟
- [x] تحديد الخصائص
- [ ] all دايماً
- [ ] none دايماً
- [ ] عشوائي

أداء وتحكم.

## refs

- [MDN: transition-property](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property)
