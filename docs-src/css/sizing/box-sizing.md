---
id: box-sizing
kind: property
cat: sizing
chip: box-sizing
title: طريقة حساب الأبعاد
en: CSS box-sizing property
status: stable
support: all
mdn: box-sizing
summary: box-sizing بتحدد هل width وheight بيشملوا الحشو والحد (border-box) ولا بيحسبوا المحتوى بس (content-box). أهم سطر في أي reset.
keywords: box-sizing, border-box, content-box, حساب العرض, حشو, حد, reset, box model
related: box-model, width, height, padding, border, universal-selector
---

## intro

الخاصية `box-sizing` بتجاوب على سؤال: **«لما أكتب `width: 200px`، الـ 200 دي بتشمل إيه؟»**

- **`content-box`** (الافتراضي): الـ `width` للمحتوى **بس**. الحشو والحد بيتضافوا برّه. يعني `width: 200px` + `padding: 20px` + `border: 5px` = عرض فعلي **250px**.
- **`border-box`**: الـ `width` يشمل **المحتوى + الحشو + الحد**. يعني `width: 200px` = 200px كلهم مهما كان الحشو، والمحتوى هو اللي بيضيق.

الأكثر استخداماً هو `border-box` لأنه **أسهل في الحساب**: لو عايز عمودين 50% جنب بعض وحطيت padding، هيفضلوا 50% بالظبط ومش هيعدّوا 100%.

علشان كده أول سطر في أي ملف CSS حديث:
`*, *::before, *::after { box-sizing: border-box; }` ([[universal-selector]]).

> [!analogy] `content-box` زي حجز طاولة لـ 4 أفراد بس الكراسي والمخدات بيتضافوا. `border-box` زي حجز المكان كله شامل كل حاجة.

> [!key] الخاصية دي **مبتتوارثش** لذلك بنستخدم النجمة `*` علشان نطبّقها على الكل.

## try

```html
<style>
  .a, .b { width:200px; padding:20px; border:5px solid #7a4a1d; background:#efe0bd; color:#3d2c18; margin:6px 0; }
  .a { box-sizing:content-box; }
  .b { box-sizing:border-box; }
</style>
<div class="a">content-box: 250px</div><div class="b">border-box: 200px</div>
```

## syntax

```css nolive
box-sizing: content-box;   /* الافتراضي */
box-sizing: border-box;    /* الأسهل */
*, *::before, *::after { box-sizing: border-box; }
```

- **القيمة المبدئية**: `content-box`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** لأ.

## values

### content-box
`width`/`height` بيحسبوا المحتوى بس، والحشو والحد بيتضافوا.

### border-box
`width`/`height` بيشملوا الحشو والحد. أسهل في التخطيط.

### padding-box
قيمة قديمة (Firefox فقط) وانتهت. متستخدمهاش.

## use

- `*, *::before, *::after { box-sizing: border-box }` في أول أي مشروع.
- أعمدة بنسب مئوية مع حشو.
- حقول إدخال `width: 100%` مع padding.

## avoid

- خلط الاتنين في نفس التخطيط (بيلخبط الحسابات).
- الاعتماد على content-box في تخطيطات النسب.

## examples

### 1) الفرق في العرض
نفس الأرقام، نتيجة مختلفة. الشريط الأخضر = 200px.

```html
<style>
  .r { width:200px; height:6px; background:#3d7a5a; margin:4px 0; }
  .a, .b { width:200px; padding:20px; border:5px solid #7a4a1d; background:#efe0bd; color:#3d2c18; }
  .a { box-sizing:content-box; } .b { box-sizing:border-box; margin-top:6px; }
</style>
<div class="r"></div><div class="a">content-box</div><div class="r"></div><div class="b">border-box</div>
```

- الأول أعرض من الشريط.

### 2) عمودين 50%
مع `border-box` بيفضلوا جنب بعض.

```html
<style>
  * { box-sizing:border-box; }
  .row { display:flex; }
  .col { width:50%; padding:20px; border:3px solid #7a4a1d; background:#efe0bd; color:#3d2c18; }
</style>
<div class="row"><div class="col">عمود 1</div><div class="col">عمود 2</div></div>
```



### 3) حقل إدخال 100%
الحقل مش هيعدّي الصندوق.

```html
<style>
  .p { width:220px; background:#efe0bd; padding:6px; }
  input { width:100%; padding:10px; border:2px solid #c9772f; background:#f3e6c9; color:#3d2c18; box-sizing:border-box; }
</style>
<div class="p"><input placeholder="width:100%"></div>
```



### 4) الـ reset الشهير
`*` + pseudo-elements.

```html
<style>
  *, *::before, *::after { box-sizing:border-box; }
  .x { width:150px; padding:15px; border:5px solid #3d7a5a; background:#efe0bd; color:#3d2c18; }
  .x::before { content:"قبل"; display:block; width:100%; padding:6px; background:#bcd4a8; }
</style>
<div class="x">150px بالظبط</div>
```



## mistakes

### نسيان border-box مع 100%

```css bad
input { width:100%; padding:10px; }  /* بتعدّي */
```

```css good
input { width:100%; padding:10px; box-sizing:border-box; }
```

من غيرها العنصر بيعدّي الأب.

### تطبيقها على body بس

```css bad
body { box-sizing:border-box; }  /* مبتتوارثش */
```

```css good
*, *::before, *::after { box-sizing:border-box; }
```

الخاصية مبتتوارثش، لازم تطبّقها على الكل.

## quiz

### `width:200px; padding:20px` مع content-box، العرض الكلي؟
- [ ] 200
- [ ] 220
- [x] 240
- [ ] 260

200 + 20 + 20.

### مع border-box نفس الأرقام؟
- [x] 200
- [ ] 220
- [ ] 240
- [ ] عشوائي

العرض يشمل الحشو.

### الخاصية بتتوارث؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط للحدود

لازم نستخدم `*`.

## refs

- [MDN: box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
