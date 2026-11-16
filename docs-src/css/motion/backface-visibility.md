---
id: backface-visibility
kind: property
cat: motion
chip: backface-visibility
title: ظهور الوجه الخلفي
en: CSS backface-visibility property
status: stable
support: all
size: compact
mdn: backface-visibility
summary: backface-visibility بتحدد هل الوجه الخلفي للعنصر (لما يتلف 180 درجة) يظهر أو يختفي. أساس كروت بوجهين.
keywords: backface-visibility, hidden, visible, كارت بوجهين, flip card
related: transform-style, perspective, transform
---

## intro

لما تلف عنصر في 3D (`rotateY(180deg)`) بتشوف **ظهره**، أي صورته المعكوسة. الخاصية `backface-visibility` بتحدد **هل يظهر الوجه الخلفي ده** (`visible`، الافتراضي) **أو يختفي** (`hidden`). ده الأساس في **الكروت اللي بتنقلب** (Flip cards): بتحط وجهين فوق بعض، وكل وجه `backface-visibility: hidden`، والوجه الخلفي معمول له `rotateY(180deg)` مسبقاً، فلما الكارت يلف 180 بيظهر الوجه التاني بدل المعكوس. بتشتغل مع [[perspective]] و[[transform-style]].

## try

```html
<style>
  .s { width:120px; height:60px; perspective:400px; margin:10px auto; }
  .c { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .6s; }
  .s:hover .c { transform:rotateY(180deg); }
  .f, .b { position:absolute; inset:0; backface-visibility:hidden; display:flex; align-items:center; justify-content:center; border-radius:8px; color:#f3ede0; font-weight:bold; }
  .f { background:#c9772f; } .b { background:#3d7a5a; transform:rotateY(180deg); }
</style>
<div class="s"><div class="c"><div class="f">أمام</div><div class="b">خلف</div></div></div>
```

## syntax

```css nolive
backface-visibility: visible;
backface-visibility: hidden;
```

- **القيمة المبدئية**: `visible`.

## values

### visible
الوجه الخلفي ظاهر.

### hidden
الوجه الخلفي مخفي.

## use

- كروت بوجهين.
- لافتات تنقلب.

## avoid

- نسيان إخفاء الخلفي في الكروت.

## examples

### 1) visible
الظهر معكوس.

```html
<style>
  .s { perspective:400px; width:100px; margin:10px auto; }
  .c { padding:14px; text-align:center; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; transform:rotateY(180deg); backface-visibility:visible; }
</style>
<div class="s"><div class="c">نص معكوس</div></div>
```



### 2) hidden
الظهر مخفي.

```html
<style>
  .s { perspective:400px; width:100px; height:50px; margin:10px auto; }
  .c { padding:14px; text-align:center; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; transform:rotateY(180deg); backface-visibility:hidden; }
</style>
<div class="s"><div class="c">مخفي</div></div>
```



### 3) كارت يلف
بوجهين.

```html
<style>
  .s { width:110px; height:56px; perspective:400px; margin:10px auto; }
  .c { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .6s; }
  .s:hover .c { transform:rotateX(180deg); }
  .f, .b { position:absolute; inset:0; backface-visibility:hidden; display:flex; align-items:center; justify-content:center; border-radius:8px; color:#f3ede0; font-weight:bold; }
  .f { background:#7a4a1d; } .b { background:#3d7a5a; transform:rotateX(180deg); }
</style>
<div class="s"><div class="c"><div class="f">أمام</div><div class="b">خلف</div></div></div>
```



## mistakes

### الوجه الخلفي مش مقلوب مسبقاً

```css bad
.b { backface-visibility:hidden; }  /* الوجه الخلفي معكوس */
```

```css good
.b { backface-visibility:hidden; transform:rotateY(180deg); }
```

لف الوجه الخلفي مسبقاً.

## quiz

### hidden بتعمل؟
- [x] تخفي الوجه الخلفي
- [ ] تخفي الأمامي
- [ ] تحذف العنصر
- [ ] تكبّر

الخلفي.

### الاستخدام الأشهر؟
- [x] كروت تنقلب
- [ ] ألوان
- [ ] حدود
- [ ] نصوص

flip cards.

## refs

- [MDN: backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)
