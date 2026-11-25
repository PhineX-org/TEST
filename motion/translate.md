---
id: translate
kind: property
cat: motion
chip: translate
title: تحريك مستقل
en: CSS translate property
status: stable
support: all
size: compact
mdn: translate
summary: translate خاصية مستقلة لتحريك العنصر بدون ما تلمس transform. مفيدة لتحريك منفصل عن التدوير والتكبير.
keywords: translate, تحريك, individual transforms, x y
related: transform, scale, rotate, fn-translate
---

## intro

الخاصية `translate` هي النسخة **المستقلة الحديثة** لـ `transform: translate()`. بدل ما تكتب `transform: translate(20px, 10px) rotate(10deg)`، تكتب `translate: 20px 10px; rotate: 10deg;` **كل واحدة لوحدها**. الميزة الكبيرة: تقدر **تحرك كل تحويل بشكل مستقل** في [[transition]] أو animation من غير ما تعيد كتابة باقي الدوال. بتقبل قيمة أو اتنين أو تلاتة (x و y و z). وبتتطبق **قبل** [[transform]] في الترتيب. ومكمّلتها [[scale]] و[[rotate]].

## try

```html
<style>
  .b { display:inline-block; padding:10px 18px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; margin:10px; transition:translate .3s; }
  .b:hover { translate:0 -8px; }
</style>
<div class="b">مرّر</div>
```

## syntax

```css nolive
translate: 20px;
translate: 20px 10px;
translate: 0 0 50px;
translate: none;
```

- **القيمة المبدئية**: `none`.
- مستقلة عن transform.

## values

### `<length> x [y [z]]`
تحريك على المحاور.

### none
بدون.

## use

- transition لتحريك فقط.
- تحريك منفصل.

## avoid

- خلطها مع transform: translate على نفس العنصر بلا داعي.

## examples

### 1) تحريك مستقل
x وy.

```html
<style>
  .b { display:inline-block; width:50px; height:50px; background:#bcd4a8; border-radius:6px; }
  .m { background:#c9772f; translate:30px 10px; }
</style>
<div class="b"></div><div class="b m"></div>
```



### 2) مع transition
ناعم.

```html
<style>
  .b { width:60px; height:40px; background:#3d7a5a; border-radius:6px; transition:translate .3s; margin:20px; }
  .b:hover { translate:40px 0; }
</style>
<div class="b"></div>
```



### 3) مع rotate مستقل
كل واحدة لوحدها.

```html
<style>
  .b { width:50px; height:50px; background:#c9772f; border-radius:6px; margin:24px; translate:20px 0; rotate:30deg; }
</style>
<div class="b"></div>
```



## mistakes

### تكرار بدون فايدة

```css bad
.a { transform:translate(10px); translate:10px; }  /* هيتجمعوا */
```

```css good
.a { translate:10px; }
```

استخدم واحدة.

## quiz

### translate مستقلة عن؟
- [x] transform
- [ ] color
- [ ] display
- [ ] float

تحريك مستقل.

### ميزتها؟
- [x] تحريك منفصل في transition
- [ ] أسرع
- [ ] أقل كود
- [ ] لا شيء

تحكم مستقل.

## refs

- [MDN: translate](https://developer.mozilla.org/en-US/docs/Web/CSS/translate)
