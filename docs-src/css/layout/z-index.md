---
id: z-index
kind: property
cat: layout
chip: z-index
title: ترتيب الطبقات
en: CSS z-index property
status: stable
support: all
mdn: z-index
summary: z-index بتحدد مين فوق مين لما عناصر تتداخل. بتشتغل على positioned وflex/grid items، وبتتأثر بسياقات التراص (stacking context).
keywords: z-index, طبقات, فوق, تحت, stacking context, تراص, overlap, modal, dropdown, طبقة
related: position, isolation, positioning-guide, top, opacity
---

## intro

لما عنصرين يتداخلوا (واحد فوق التاني)، فيه سؤال: «مين اللي يبان فوق؟». الإجابة الافتراضية: **اللي جه بعد في HTML**. لكن `z-index` بتديك تحكم يدوي: **الرقم الأكبر فوق**.

الشروط:
- بتشتغل على عناصر **positioned** (relative/absolute/fixed/sticky)، أو على **أبناء flex/grid** مباشرة.
- القيم أرقام صحيحة (موجبة أو سالبة أو صفر) أو `auto`.

أصعب نقطة: **Stacking Context** (سياق التراص). لما عنصر يعمل سياق جديد (مثلاً `position` مع `z-index`، أو `opacity < 1`، أو `transform`، أو `isolation: isolate`)، فكل أولاده بيترتبوا **جواه** ومحدش منهم يقدر يطلع فوق عنصر برّه السياق ده، مهما كان z-index عالي. لو الظاهرة «z-index:9999 مبيشتغلش» فغالباً العيب في سياق تراص أب. وعلشان تعزل عنصر عن غيره استخدم [[isolation]]`: isolate`.

> [!analogy] `z-index` زي ترتيب الأوراق في كومة: الأعلى بتغطي. لكن كل «مجلد» (سياق تراص) بيرتّب أوراقه جواه، والمجلد كله اللي بيتحط فوق أو تحت مجلد تاني.

> [!tip] استخدم أرقام صغيرة ومنظمة (1، 10، 100) بدل 9999، وسجّلها في متغيّرات CSS.

## try

```html
<style>
  .w { position:relative; height:130px; }
  .s { position:absolute; width:90px; height:80px; padding:6px; color:#3d2c18; }
  .a { background:#efe0bd; top:10px; right:10px; z-index:1; }
  .b { background:#bcd4a8; top:40px; right:55px; z-index:3; }
  .c { background:#e4c490; top:20px; right:100px; z-index:2; }
</style>
<div class="w"><div class="s a">1</div><div class="s b">3</div><div class="s c">2</div></div>
```

## syntax

```css nolive
z-index: auto;
z-index: 1;
z-index: 100;
z-index: -1;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه (عدد صحيح).
- لازم positioned أو flex/grid item.

## values

### auto
نفس ترتيب HTML (ولا يعمل سياق تراص جديد).

### `<integer>`
عدد صحيح: الأكبر فوق، السالب تحت.

### 0
سياق جديد على الطبقة 0.

## use

- dropdown وmodal فوق الصفحة.
- عنصر خلفية تحت المحتوى (`z-index:-1`).
- ترتيب عناصر متداخلة بشكل محسوب.

## avoid

- أرقام ضخمة (9999) بدون نظام.
- z-index على عنصر static (مالهوش أثر).

## examples

### 1) الأكبر فوق
التلات مربعات بترتيب z-index.

```html
<style>
  .w { position:relative; height:120px; }
  .s { position:absolute; width:80px; height:70px; padding:6px; color:#3d2c18; }
  .a { background:#efe0bd; top:6px; right:6px; z-index:3; }
  .b { background:#bcd4a8; top:30px; right:46px; z-index:2; }
  .c { background:#e4c490; top:50px; right:86px; z-index:1; }
</style>
<div class="w"><div class="s a">3</div><div class="s b">2</div><div class="s c">1</div></div>
```



### 2) بدون position مفيش أثر
z-index على static مبيعملش حاجة.

```html
<style>
  .a { z-index:10; background:#e4a090; color:#3d2c18; padding:8px; }
  .b { margin-top:-12px; background:#bcd4a8; color:#3d2c18; padding:8px; position:relative; }
</style>
<div class="a">z-index:10 بس static</div><div class="b">relative: فوقه</div>
```



### 3) سياق تراص
الابن z-index عالي لكن محبوس في سياق الأب.

```html
<style>
  .w { position:relative; height:120px; }
  .p1 { position:absolute; top:0; right:0; width:150px; height:80px; background:#efe0bd; z-index:1; color:#3d2c18; }
  .p1 .k { position:absolute; top:40px; right:20px; width:100px; height:40px; background:#c9772f; z-index:999; color:#fff3e0; }
  .p2 { position:absolute; top:30px; right:60px; width:120px; height:70px; background:#3d7a5a; z-index:2; color:#f3ede0; }
</style>
<div class="w"><div class="p1">أب 1<div class="k">999</div></div><div class="p2">أب 2</div></div>
```

- الابن 999 لسه تحت الأب 2.

### 4) isolation:isolate
لعمل سياق تراص من غير z-index.

```html
<style>
  .c { isolation:isolate; position:relative; background:#efe0bd; padding:10px; color:#3d2c18; }
  .c::before { content:""; position:absolute; inset:0; background:#bcd4a8; z-index:-1; }
</style>
<div class="c">الخلفية الخضراء جوه الكارت</div>
```



## mistakes

### 9999 على كل حاجة

```css bad
.modal { z-index:99999; }
.toast { z-index:999999; }
```

```css good
/* نظام ثابت */
:root { --z-modal:100; --z-toast:200; }
.modal { z-index:var(--z-modal); }
```

أرقام عشوائية بتخلق حرب طبقات.

### نسيان position

```css bad
.a { z-index:5; }
```

```css good
.a { position:relative; z-index:5; }
```

بيشتغل على positioned أو flex/grid items.

## quiz

### الأعلى z-index؟
- [ ] تحت
- [x] فوق
- [ ] نفس المستوى
- [ ] يختفي

الأكبر فوق.

### ليه z-index:9999 ممكن مينفعش؟
- [ ] خطأ صياغة
- [x] الأب في سياق تراص أقل
- [ ] مدعومش
- [ ] الرقم كبير

محبوس في سياق الأب.

### أنهي بيعمل سياق تراص؟
- [ ] color
- [x] opacity:0.9
- [ ] padding
- [ ] margin

opacity < 1.

## refs

- [MDN: z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
