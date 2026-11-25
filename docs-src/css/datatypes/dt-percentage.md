---
id: dt-percentage
kind: datatype
cat: datatypes
chip: <percentage>
title: النسب المئوية
en: CSS <percentage> data type
status: stable
support: all
mdn: percentage
summary: نوع percentage هو رقم متبوع بـ %: النسبة بتتحسب من حاجة مختلفة حسب الخاصية (عرض الأب للعرض، حجم الخط للخط...).
keywords: percentage, %, نسبة مئوية, relative
related: dt-length, fn-calc, width, units
---

## intro

النوع `<percentage>` هو **رقم + `%`** (مثل `50%`). السر: **النسبة بتتحسب من حاجة مختلفة حسب الخاصية**، ودي أكبر نقطة ارتباك:

- **`width`**: من **عرض الأب** (content box).
- **`height`**: من **ارتفاع الأب** (ولازم الأب ليه ارتفاع محدد وإلا بتتجاهل).
- **`margin` و`padding`** (كل الجهات): من **عرض** الأب (حتى لو رأسي!).
- **`font-size`**: من **حجم خط الأب**.
- **`line-height`**: من حجم خط العنصر نفسه.
- **`top/left`** (مع position): من أبعاد **الكتلة المحتوية**.
- **`transform: translate(50%)`**: من حجم **العنصر نفسه**.
- **`background-position`**: من (حجم الحاوية − حجم الصورة).

تنبيه: بتقدر تخلط النسبة مع الطول بـ [[fn-calc]]: `calc(100% - 20px)`. ولو الأب مفيش له قياس واضح (زي `height: 50%` وأبوه `height: auto`) مش هتشتغل. فكّر دايماً: «٪ من إيه؟».

## try

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r" style="width:200px"><div class="b" style="width:50%">50% من 200</div><div class="b" style="width:25%">25%</div><div class="b" style="padding-inline:10%">padding 10% من العرض</div></div>
```

## syntax

```css nolive
width: 50%;
margin-inline: 10%;     /* من عرض الأب */
font-size: 120%;        /* من خط الأب */
transform: translateX(50%);  /* من العنصر نفسه */
```

- المرجع بيختلف حسب الخاصية.
- height % يحتاج أب بارتفاع محدد.
- padding/margin % من العرض دايماً.

## use

- عروض مرنة.
- مسافات متناسبة مع العرض.
- تحريك بالنسبة لحجم العنصر.

## avoid

- height: % بدون ارتفاع للأب.
- نسيان إن padding-top % من العرض.

## examples

### 1) نسبة من الأب
عرض 200.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r" style="width:200px"><div class="b" style="width:50%">50%</div><div class="b" style="width:25%">25%</div></div>
```



### 2) padding بالنسبة
من العرض.

```html
<style>
  .r { background:#efe0bd; padding:6px; border-radius:8px; margin:4px 0; }
  .b { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; margin:3px 0; }
</style>
<div class="r" style="width:200px"><div class="b" style="padding-block:10%">padding-block 10% = 20px</div></div>
```



### 3) translate بالنسبة
من العنصر نفسه.

```html
<style>
  .p { background:#efe0bd; padding:10px; border-radius:8px; }
  .b { width:60px; height:40px; background:#3d7a5a; border-radius:6px; transform:translateX(100%); }
</style>
<div class="p"><div class="b"></div></div>
```



### 4) height % لا تشتغل
أب بدون ارتفاع.

```html
<style>
  .p { background:#efe0bd; padding:10px; border-radius:8px; }
  .b { height:50%; background:#c9772f; color:#f3ede0; padding:6px; border-radius:6px; }
</style>
<div class="p"><div class="b">height:50% لكن الأب auto: بتتجاهل</div></div>
```



## mistakes

### height % بدون ارتفاع للأب

```css bad
.child { height:50%; }  /* الأب height:auto */
```

```css good
.parent { height:300px; } .child { height:50%; }
```

الأب لازم ارتفاع.

### ظن padding-top % من الارتفاع

```css bad
.a { padding-top:10%; }  /* من عرض الأب */
```

```css good
/* افهم إنه من العرض */
```

دايماً من العرض.

## quiz

### width: 50% من؟
- [x] عرض الأب
- [ ] عرض الشاشة
- [ ] عرض العنصر
- [ ] حجم الخط

الأب.

### padding-top: 10% من؟
- [x] عرض الأب
- [ ] ارتفاعه
- [ ] الشاشة
- [ ] الخط

العرض.

### translate(50%) من؟
- [x] العنصر نفسه
- [ ] الأب
- [ ] الصفحة
- [ ] الشاشة

حجمه.

## refs

- [MDN: `<percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)
