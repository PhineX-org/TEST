---
id: background-size
kind: property
cat: borders-bg
chip: background-size
title: حجم الخلفية
en: CSS background-size property
status: stable
support: all
mdn: background-size
summary: background-size بتتحكم في حجم صورة الخلفية: cover بتغطي العنصر، وcontain بتظهر كلها، أو أبعاد محددة. أهم خاصية لصور الغلاف.
keywords: background-size, cover, contain, حجم الخلفية, auto, صورة غلاف, hero, تكبير
related: background, background-position, background-repeat, object-fit, aspect-ratio
---

## intro

الخاصية `background-size` بتحدد **حجم صورة الخلفية** جوه العنصر. من غيرها الصورة بتظهر بحجمها الطبيعي (`auto`) وممكن تتقص أو تتكرر. القيم المهمة:
- **`cover`**: **تكبّر الصورة** (مع الحفاظ على النسبة) لحد ما **تغطي العنصر كله**، وممكن يتقص جزء منها. الأشهر لصور الغلاف.
- **`contain`**: **تظهر الصورة كلها** من غير قص، وممكن يفضل فراغ.
- **أبعاد**: `100px 50px` أو `50% auto`.
- **`auto`**: الحجم الطبيعي.

بتتكتب في الاختصار [[background]] بعد `/` (`center / cover`). وللتحكم في الجزء الظاهر استخدم [[background-position]]. ومع `<img>` المقابل هو [[object-fit]].

> [!analogy] `cover` زي تغطية الحيطة بتابلوه بحجم يغطيها كلها حتى لو ضاع جزء من الأطراف. و`contain` زي تعليق التابلوه كله ويفضل جزء من الحيطة ظاهر.

> [!key] لصورة غلاف: `background: url(x.jpg) center / cover no-repeat`.

## try

```html
<style>
  .b { height:90px; border-radius:10px; background:linear-gradient(135deg,#c9772f,#3d7a5a); background-size:cover; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-size: cover;
background-size: contain;
background-size: 100px 50px;
background-size: 50% auto;
```

- **القيمة المبدئية**: `auto`.
- **بتتحرك؟** أيوه.

## values

### cover
تغطي العنصر كله (ممكن تتقص).

### contain
تظهر كلها (ممكن يفضل فراغ).

### `<length-percentage>`
أبعاد محددة.

### auto
الحجم الطبيعي.

## use

- صور غلاف hero (`cover`).
- أيقونات خلفية (`contain`).
- نمط متكرر بحجم محدد.

## avoid

- `cover` مع نص مهم على حافة الصورة (ممكن يتقص).
- نسيان no-repeat مع contain.

## examples

### 1) cover
بيغطي الصندوق.

```html
<style>
  .b { width:180px; height:70px; background:linear-gradient(135deg,#c9772f,#3d7a5a); background-size:cover; }
</style>
<div class="b"></div>
```



### 2) أحجام النمط
حجم النقطة بيتحكم فيه size.

```html
<style>
  .b { height:70px; background:radial-gradient(#7a4a1d 35%,transparent 36%), #efe0bd; }
  .s { background-size:12px 12px; } .l { background-size:30px 30px; }
</style>
<div class="b s"></div><div class="b l" style="margin-top:6px"></div>
```



### 3) contain
الصورة كلها ظاهرة.

```html
<style>
  .b { width:180px; height:80px; background:radial-gradient(#c9772f 60%,transparent 61%) no-repeat center, #efe0bd; background-size:contain; }
</style>
<div class="b"></div>
```



### 4) أبعاد صريحة
عرض 50% وارتفاع تلقائي.

```html
<style>
  .b { height:70px; background:linear-gradient(#3d7a5a,#3d7a5a) no-repeat left, #efe0bd; background-size:50% 40%; }
</style>
<div class="b"></div>
```



## mistakes

### cover وتوقع إن الصورة كلها هتبان

```css bad
.hero { background-size:cover; }  /* الأطراف بتتقص */
```

```css good
.hero { background-size:contain; background-repeat:no-repeat; }
```

cover بتقص عشان تغطي.

### نسيان الحجم

```css bad
.icon { background:url(i.png); }  /* حجم أصلي وبيتكرر */
```

```css good
.icon { background:url(i.png) no-repeat center / contain; }
```

حدد الحجم والتكرار.

## quiz

### أنهي بيغطي العنصر كله؟
- [ ] contain
- [x] cover
- [ ] auto
- [ ] 100%

cover.

### contain بيعمل؟
- [ ] يقص
- [x] يظهر الصورة كلها
- [ ] يكرر
- [ ] يخفي

من غير قص.

### الافتراضي؟
- [ ] cover
- [x] auto
- [ ] contain
- [ ] 100%

auto.

## refs

- [MDN: background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
