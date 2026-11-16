---
id: outline-offset
kind: property
cat: borders-bg
chip: outline-offset
title: المسافة بين العنصر والـ outline
en: CSS outline-offset property
status: stable
support: all
size: compact
mdn: outline-offset
summary: outline-offset بتحدد المسافة بين حافة العنصر والـ outline. قيمة سالبة بتدخله جوه العنصر. بتحسّن مظهر focus ring.
keywords: outline-offset, مسافة outline, focus ring, offset, سالب
related: outline, border, focus-visible, box-shadow
---

## intro

الخاصية `outline-offset` بتحدد **المسافة بين حافة العنصر والـ [[outline]]** الراسم حواليه. الافتراضي `0` (ملزوق). قيمة موجبة (`4px`) بتبعد الإطار بره العنصر، وده بيخلّي **مؤشر التركيز** أوضح وأنضف. وقيمة **سالبة** بتدخل الإطار جوه العنصر (مفيدة لعناصر ملزوقة في حدود الحاوية). مبتتحرّكش بـ transition بسهولة جداً لكن بتتحرك فعلاً. مثالية مع `:focus-visible`.

## try

```html
<style>
  .o { outline:3px solid #c9772f; outline-offset:6px; padding:8px; background:#efe0bd; color:#3d2c18; margin:10px; display:inline-block; }
</style>
<div class="o">offset 6px</div>
```

## syntax

```css nolive
outline-offset: 4px;
outline-offset: -2px;
outline-offset: 0;
```

- **القيمة المبدئية**: `0`.
- السالب يدخل جوه.

## values

### `<length>`
مسافة موجبة بتبعد الإطار للخارج.

### negative
مسافة سالبة بتدخل الإطار جوه العنصر.

## use

- focus ring بمسافة أنظف.
- إطار داخلي بقيمة سالبة.

## avoid

- offset كبير جداً بيتقص مع overflow:hidden على الأب.

## examples

### 1) 4px
أنضف من اللزق.

```html
<style>
  a { display:inline-block; padding:8px 16px; background:#7a4a1d; color:#f3ede0; border-radius:8px; margin:8px; }
  a:focus-visible { outline:3px solid #c9772f; outline-offset:4px; }
</style>
<a href="#">Tab للتركيز</a>
```



### 2) سالب
الإطار جوه العنصر.

```html
<style>
  .o { outline:3px solid #3d7a5a; outline-offset:-8px; padding:16px; background:#efe0bd; color:#3d2c18; display:inline-block; }
</style>
<div class="o">offset -8px</div>
```



### 3) مقارنة
0 مقابل 8px.

```html
<style>
  .a, .b { outline:3px solid #c9772f; padding:6px; background:#efe0bd; color:#3d2c18; display:inline-block; margin:10px; }
  .b { outline-offset:8px; }
</style>
<div class="a">0</div><div class="b">8px</div>
```



## mistakes

### offset بدون outline

```css bad
.a { outline-offset:5px; }  /* مفيش outline يتحرك */
```

```css good
.a { outline:2px solid; outline-offset:5px; }
```

لازم outline مرسوم.

## quiz

### outline-offset سالب معناه؟
- [ ] يخفيه
- [x] يدخله جوه العنصر
- [ ] يلغيه
- [ ] يكبّره

للداخل.

### الافتراضي؟
- [ ] 4px
- [x] 0
- [ ] auto
- [ ] none

0.

## refs

- [MDN: outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)
