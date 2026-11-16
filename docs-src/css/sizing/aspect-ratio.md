---
id: aspect-ratio
kind: property
cat: sizing
chip: aspect-ratio
title: نسبة العرض للارتفاع
en: CSS aspect-ratio property
status: stable
support: all
mdn: aspect-ratio
summary: aspect-ratio بتخلّي العنصر يحافظ على نسبة ثابتة بين عرضه وارتفاعه (16/9 مثلاً) من غير حسابات، مثالية للصور والفيديو والكروت.
keywords: aspect-ratio, نسبة, 16/9, 1/1, مربع, فيديو, صورة, responsive, نسبة الابعاد, ratio
related: width, height, object-fit, dt-ratio, grid-guide
---

## intro

زمان لو عايز صندوق بنسبة 16:9 (زي الفيديو) كنت بتستخدم حيلة الـ padding-top: 56.25% المعقدة. دلوقتي الخاصية **`aspect-ratio`** بتعمل الشغل ده بسطر واحد: بتحدد النسبة، وبتحدد عرض **أو** ارتفاع واحد، والمتصفح بيحسب التاني تلقائي.

الصيغة: `aspect-ratio: 16 / 9` (عرض / ارتفاع) ([[dt-ratio]]). ومربع: `1 / 1` أو `1`. وتقدر تكتب `auto` علشان تستخدم النسبة الطبيعية للصور.

الفايدة الكبيرة في **التصميم المتجاوب**: الكارت أو الفيديو ياخد `width: 100%` والارتفاع بيتحسب لوحده بالنسبة المطلوبة، فمتبقاش في «قفزة» وقت تحميل الصورة (Layout Shift). وبتشتغل ممتاز مع [[object-fit]] للصور.

> [!tip] لو حطيت `width` و`height` الاتنين، النسبة بتتجاهل (لأن الأبعاد محددة). النسبة بتحتاج بُعد واحد حر.

> [!analogy] زي إطار صورة بنسبة ثابتة: كبّره أو صغّره، شكله يفضل نفس النسبة.

## try

```html
<style>
  .v { width:100%; aspect-ratio:16/9; background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="v">16:9</div>
```

## syntax

```css nolive
aspect-ratio: 16 / 9;
aspect-ratio: 1;        /* مربع */
aspect-ratio: 4 / 3;
aspect-ratio: auto;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<ratio>`
نسبة عرض/ارتفاع مثل `16 / 9` أو `4 / 3` أو `1`.

### auto
النسبة الطبيعية للمحتوى (الصور مثلاً).

### `auto <ratio>`
النسبة الطبيعية لو موجودة، وإلا النسبة المكتوبة.

## use

- صناديق فيديو بنسبة 16/9.
- كروت مربعة (`1/1`) لمعارض الصور.
- منع الـ Layout Shift أثناء تحميل الصور.
- أفاتار دائري مع `border-radius:50%`.

## avoid

- تحديد `width` و`height` معاً مع aspect-ratio (بتتجاهل).
- استخدام حيل padding القديمة.

## examples

### 1) صندوق 16/9
بيتغيّر ارتفاعه مع العرض.

```html
<style>
  .v { width:80%; aspect-ratio:16/9; background:#3d7a5a; color:#f3ede0; display:grid; place-items:center; }
</style>
<div class="v">16 / 9</div>
```



### 2) مربعات
شبكة صور مربعة.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .g div { aspect-ratio:1; background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



### 3) أفاتار دائري
مربع + radius = دايرة.

```html
<style>
  .a { width:80px; aspect-ratio:1; border-radius:50%; background:#7a4a1d; color:#f3ede0; display:grid; place-items:center; }
</style>
<div class="a">أ</div>
```



### 4) بورتريه 3/4
نسبة طولية.

```html
<style>
  .p { width:100px; aspect-ratio:3/4; background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
</style>
<div class="p">3/4</div>
```



## mistakes

### تحديد الأبعاد معاً

```css bad
.v { width:300px; height:100px; aspect-ratio:16/9; }  /* النسبة اتجاهلت */
```

```css good
.v { width:300px; aspect-ratio:16/9; }
```

لازم تسيب بُعد واحد حر.

### كتابة النسبة بنقطتين

```css bad
.v { aspect-ratio:16:9; }
```

```css good
.v { aspect-ratio:16 / 9; }
```

الصيغة بشرطة مائلة `/` مش نقطتين.

## quiz

### `aspect-ratio:1` يعني؟
- [x] مربع
- [ ] دايرة
- [ ] طولي
- [ ] عرضي

نسبة 1:1.

### الصيغة الصحيحة؟
- [ ] 16:9
- [x] 16 / 9
- [ ] 16-9
- [ ] 16x9

`16 / 9`.

### لو حددت width وheight؟
- [ ] النسبة تشتغل
- [x] النسبة تتجاهل
- [ ] خطأ
- [ ] بتتضاعف

الأبعاد المحددة بتغلب.

## refs

- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
