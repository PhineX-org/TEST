---
id: animation-iteration-count
kind: property
cat: motion
chip: animation-iteration-count
title: عدد التكرار
en: CSS animation-iteration-count property
status: stable
support: all
size: compact
mdn: animation-iteration-count
summary: animation-iteration-count بتحدد كام مرة الأنيميشن تتكرر: رقم أو infinite للتكرار للأبد.
keywords: animation-iteration-count, infinite, تكرار, loop
related: animation, animation-direction, animation-duration
---

## intro

الخاصية `animation-iteration-count` بتحدد **عدد مرات تكرار الأنيميشن**. الافتراضي `1` (مرة واحدة). تقدر تكتب رقم صحيح (`3`) أو عشري (`1.5` = مرة ونص)، أو **`infinite`** للتكرار **للأبد** (spinners ونبض). مع [[animation-direction]] `alternate` بيحسب الذهاب والإياب كدورتين. وانتبه: الأنيميشن اللي بتتكرر للأبد على عناصر كتير بتستهلك طاقة، واحترم `prefers-reduced-motion`. مثال: `3` يعني الحركة تتعمل 3 مرات وتقف. جزء من [[animation]].

## try

```html
<style>
  @keyframes shake { 25% { transform:translateX(-8px); } 75% { transform:translateX(8px); } }
  .b { width:50px; height:34px; margin:16px; background:#c9772f; border-radius:6px; animation:shake .3s ease-in-out 3; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
animation-iteration-count: 1;
animation-iteration-count: 3;
animation-iteration-count: infinite;
animation-iteration-count: 1.5;
```

- **القيمة المبدئية**: `1`.

## values

### `<number>`
عدد المرات.

### infinite
للأبد.

## use

- اهتزاز لعدة مرات.
- دوران مستمر.

## avoid

- infinite على عناصر كتيرة.

## examples

### 1) 3 مرات
ثم يتوقف.

```html
<style>
  @keyframes shake { 25% { transform:translateX(-8px); } 75% { transform:translateX(8px); } }
  .b { width:50px; height:34px; margin:16px; background:#3d7a5a; border-radius:6px; animation:shake .3s ease-in-out; animation-iteration-count:3; }
</style>
<div class="b"></div>
```



### 2) infinite
للأبد.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:30px; height:30px; border:5px solid #efe0bd; border-top-color:#c9772f; border-radius:50%; margin:10px; animation:spin 1s linear; animation-iteration-count:infinite; }
</style>
<div class="s"></div>
```



### 3) 1.5
مرة ونص.

```html
<style>
  @keyframes mv { to { transform:translateX(100px); } }
  .b { width:30px; height:18px; margin:8px; background:#7a4a1d; border-radius:5px; animation:mv 1s linear; animation-iteration-count:1.5; animation-fill-mode:forwards; }
</style>
<div class="b"></div>
```



## mistakes

### ثابت لحد ما تحتاج infinite

```css bad
.s { animation:spin 1s; }  /* مرة واحدة */
```

```css good
.s { animation:spin 1s linear infinite; }
```

للأبد.

## quiz

### الافتراضي؟
- [x] 1
- [ ] infinite
- [ ] 0
- [ ] 2

مرة واحدة.

### للتكرار الأبدي؟
- [x] infinite
- [ ] forever
- [ ] loop
- [ ] 0

infinite.

## refs

- [MDN: animation-iteration-count](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
