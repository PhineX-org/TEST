---
id: scroll-snap-type
kind: property
cat: ui
chip: scroll-snap-type
title: التقاط التمرير
en: CSS scroll-snap-type property
status: stable
support: all
mdn: scroll-snap-type
summary: scroll-snap-type بتخلّي حاوية السكرول «تلتقط» عناصرها عند نقاط محددة (كاروسيل): x mandatory أو y proximity.
keywords: scroll-snap-type, scroll snap, carousel, x mandatory, سلايدر
related: scroll-snap-align, scroll-padding, overflow, scroll-behavior
---

## intro

الخاصية `scroll-snap-type` بتحوّل حاوية السكرول لـ **كاروسيل** (سلايدر) من غير JavaScript: لما المستخدم يسكرول، الحاوية **بتلتقط** العناصر (snap) وتوقف عند حدود كل عنصر بدل ما تقف في النص.

بتتحط على **الحاوية** (اللي `overflow: auto`) بصيغة: `scroll-snap-type: <axis> <strictness>`:
- **المحور**: `x` أو `y` أو `both` أو `inline`/`block`.
- **الصرامة**: **`mandatory`** (لازم يلتقط دايماً) أو **`proximity`** (يلتقط لو قريب بس، أرحم).

وكل **عنصر ابن** بنحدد له محاذاة بـ [[scroll-snap-align]] (`start` أو `center`). مثال: `.row { overflow-x: auto; scroll-snap-type: x mandatory; } .item { scroll-snap-align: start; }`.

نصائح: `mandatory` ممكن تزعج لو العنصر أكبر من الشاشة (المستخدم مش هيقدر يشوف كل محتواه)، فاستخدم `proximity` وقت الشك. ومعاها [[scroll-padding]] لو فيه header.

## try

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 120px; height:60px; background:#c9772f; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:start; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div><div class="i">5</div></div>
```

## syntax

```css nolive
.row { overflow-x: auto; scroll-snap-type: x mandatory; }
.item { scroll-snap-align: start; }
.col { scroll-snap-type: y proximity; }
```

- على الحاوية.
- الأبناء بـ scroll-snap-align.

## values

### x / y / both
المحور.

### mandatory
التقاط إجباري.

### proximity
التقاط لو قريب.

### none
بدون.

## use

- كاروسيل بدون JS.
- معارض صور.
- أقسام صفحة بكاملها.

## avoid

- mandatory مع عناصر أطول من الشاشة.
- نسيان scroll-snap-align في الأبناء.

## examples

### 1) كاروسيل أفقي
x mandatory.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 110px; height:54px; background:#3d7a5a; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:start; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div><div class="i">5</div></div>
```



### 2) رأسي
y proximity.

```html
<style>
  .c { height:80px; overflow-y:auto; scroll-snap-type:y proximity; background:#efe0bd; border-radius:8px; }
  .s { height:60px; scroll-snap-align:start; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#3d2c18; }
  .s:nth-child(odd) { background:#e4c490; }
</style>
<div class="c"><div class="s">أ</div><div class="s">ب</div><div class="s">ج</div></div>
```



### 3) محاذاة center
العنصر في النص.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 100px; height:50px; background:#7a4a1d; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:center; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```



### 4) بدون snap
للمقارنة.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 110px; height:54px; background:#b5551f; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```



## mistakes

### نسيان align على الأبناء

```css bad
.row { scroll-snap-type:x mandatory; }  /* مفيش نقاط التقاط */
```

```css good
.item { scroll-snap-align:start; }
```

لازم align.

### mandatory وعنصر طويل

```css bad
.col { scroll-snap-type:y mandatory; }  /* العنصر أطول من الشاشة */
```

```css good
.col { scroll-snap-type:y proximity; }
```

proximity أرحم.

## quiz

### scroll-snap-type بتتحط على؟
- [x] الحاوية
- [ ] العناصر
- [ ] body فقط
- [ ] img

الحاوية.

### mandatory معناها؟
- [x] التقاط إجباري
- [ ] اختياري
- [ ] لا التقاط
- [ ] للأعلى فقط

لازم يلتقط.

### الأبناء محتاجين؟
- [x] scroll-snap-align
- [ ] scroll-snap-type
- [ ] overflow
- [ ] float

نقطة محاذاة.

## refs

- [MDN: scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)
