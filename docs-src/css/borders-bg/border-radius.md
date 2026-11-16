---
id: border-radius
kind: property
cat: borders-bg
chip: border-radius
title: الزوايا المدوّرة
en: CSS border-radius property
status: stable
support: all
mdn: border-radius
summary: border-radius بتدوّر زوايا العنصر: 8px زوايا ناعمة، 50% دايرة، 999px كبسولة، وتقدر تحدد كل زاوية لوحدها أو شكل بيضاوي.
keywords: border-radius, زوايا مدورة, دايرة, كبسولة, rounded, pill, circle, ellipse, حواف
related: border, box-shadow, overflow, aspect-ratio, background
---

## intro

الخاصية `border-radius` بتخلّي **زوايا العنصر مدوّرة** بدل ما تبقى حادة. القيمة هي **نصف قطر** الدايرة اللي بتقص الزاوية: كل ما كبرت، كل ما الزاوية بقت أكتر استدارة.

الاستخدامات:
- **`8px`–`16px`**: كروت وأزرار بزوايا ناعمة (الأشهر).
- **`50%`** على عنصر **مربع** = **دايرة** تماماً (أفاتار). وعلى مستطيل = شكل بيضاوي.
- **`999px`** (أو `9999px`) = **كبسولة** (زرار بنهايات نص دايرية).
- **أربع قيم**: `border-radius: 10px 20px 30px 40px` بترتيب (أعلى-بداية، أعلى-نهاية، أسفل-نهاية، أسفل-بداية)، أو زاوية واحدة: `border-top-left-radius`.
- **شكل بيضاوي**: `border-radius: 50px / 20px` (الأفقي / الرأسي).

التدوير بيقص **الخلفية والحد** لكنه **مبيقصش المحتوى** الطالع (علشان كده مع صور بتحتاج `overflow: hidden`). وبيشتغل مع [[box-shadow]] وبيتبع شكل الزاوية.

> [!analogy] زي ما تدوّر زاوية ورقة بمقص: كل ما قصّيت أكتر بقت الزاوية أنعم.

> [!tip] للأزرار الكبسولة استخدم `border-radius: 999px` بدل ما تحسب النص.

## try

```html
<style>
  .b { width:100px; height:100px; background:#c9772f; color:#fff3e0; display:grid; place-items:center; border-radius:20px; }
</style>
<div class="b">20px</div>
```

## syntax

```css nolive
border-radius: 8px;
border-radius: 50%;              /* دايرة */
border-radius: 999px;            /* كبسولة */
border-radius: 10px 30px;        /* قطري */
border-radius: 10px 20px 30px 40px;
border-radius: 50px / 20px;      /* بيضاوي */
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<length>`
نصف قطر بالبكسل `8px`.

### `<percentage>`
نسبة من أبعاد العنصر `50%`.

### a b c d
أربع زوايا: أعلى-بداية، أعلى-نهاية، أسفل-نهاية، أسفل-بداية.

### x / y
نصفا القطر الأفقي والرأسي (بيضاوي).

## use

- كروت وأزرار ناعمة.
- أفاتار دايري `50%`.
- أزرار كبسولة `999px`.
- قص صور بزوايا ناعمة مع overflow:hidden.

## avoid

- نصف قطر كبير على عنصر صغير بشكل مبالغ.
- نسيان `overflow:hidden` مع الصور داخل أب مدوّر.

## examples

### 1) مقارنة القيم
من حادة لدايرة.

```html
<style>
  div { display:inline-grid; place-items:center; width:70px; height:70px; margin:4px; background:#7a4a1d; color:#f3ede0; }
</style>
<div style="border-radius:0">0</div><div style="border-radius:12px">12px</div><div style="border-radius:50%">50%</div>
```



### 2) كبسولة
`999px` بتدّي نهايات دايرية.

```html
<style>
  .p { display:inline-block; padding:8px 24px; background:#3d7a5a; color:#f3ede0; border-radius:999px; }
</style>
<span class="p">زرار كبسولة</span>
```



### 3) زوايا مختلفة
كل زاوية بقيمة.

```html
<style>
  .c { width:150px; height:70px; background:#c9772f; border-radius:30px 0 30px 0; }
</style>
<div class="c"></div>
```



### 4) قص صورة
overflow:hidden بيقص المحتوى.

```html
<style>
  .f { width:130px; height:80px; border-radius:20px; overflow:hidden; }
  .i { width:200px; height:120px; background:linear-gradient(135deg,#c9772f,#3d7a5a); }
</style>
<div class="f"><div class="i"></div></div>
```



## mistakes

### 50% على مستطيل

```css bad
.avatar { width:100px; height:60px; border-radius:50%; }  /* بيضاوي */
```

```css good
.avatar { width:100px; aspect-ratio:1; border-radius:50%; }
```

الدايرة محتاجة عنصر مربع.

### نسيان overflow

```css bad
.card { border-radius:20px; }  /* الصورة بتطلع بزوايا حادة */
```

```css good
.card { border-radius:20px; overflow:hidden; }
```

التدوير مبيقصش الأولاد.

## quiz

### أنهي بيعمل دايرة من مربع؟
- [ ] border-radius:0
- [x] border-radius:50%
- [ ] border-radius:1px
- [ ] radius:round

50% من الأبعاد.

### للكبسولة؟
- [x] 999px
- [ ] 0
- [ ] 1px
- [ ] auto

نصف قطر كبير.

### 4 قيم بتمثل؟
- [ ] فوق/يمين/تحت/شمال
- [x] الزوايا الأربع
- [ ] الحدود
- [ ] الظلال

الزوايا الأربع.

## refs

- [MDN: border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
