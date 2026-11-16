---
id: cascade-inheritance
kind: guide
cat: start
title: الـ Cascade والوراثة
en: Cascade and inheritance
status: stable
summary: إزاي المتصفح يحسم لما قواعد كتير تتعارض (الـ Cascade)، وإزاي بعض الخصائص بتتوارث من الأب للابن (Inheritance)، وكلمات initial وinherit وunset وrevert.
keywords: cascade, inheritance, وراثة, توارث, initial, inherit, unset, revert, الاب والابن, القيمة المبدئية, computed value
related: specificity, kw-initial, kw-inherit, kw-unset, kw-revert, all
---

## intro

فيه سؤالين بيتحكموا في شكل أي عنصر: **«أنهي قاعدة تنطبق؟»** و**«لو مفيش قاعدة، القيمة تيجي منين؟»**. الإجابة على الأول هي الـ **Cascade**، وعلى التاني هي **الوراثة (Inheritance)**.

**الـ Cascade**: لما قواعد كتير تتعارض على نفس الخاصية، المتصفح بيرتّبها بالترتيب ده: (1) مين صاحب القاعدة (المتصفح/المستخدم/صاحب الموقع) و`!important`، (2) الـ [[layers-guide|Layers]]، (3) الـ [[specificity]]، (4) **الترتيب** (الأحدث يكسب).

**الوراثة**: بعض الخصائص (زي `color` و`font-family` و`line-height`) بتتوارث تلقائي من العنصر الأب لأولاده، فمتحتاجش تكرّرها. وخصائص تانية (زي `margin` و`border` و`padding` و`background`) **مبتتوارثش**، لأنها منطقياً بتخص العنصر نفسه.

ولو عايز تتحكم يدوي: `inherit` ([[kw-inherit]]) ياخد قيمة الأب، `initial` ([[kw-initial]]) يرجع للمبدئي، `unset` ([[kw-unset]]) يتصرف كـ inherit للخصائص الموروثة وكـ initial لغيرها، و`revert` ([[kw-revert]]) يرجع لستايل المتصفح.

> [!analogy] الوراثة زي لهجة العيلة: الأولاد بيتكلموا لهجة أهلهم تلقائي، لكن ملامح الوش (الحدود والخلفية) كل واحد له الخاص بيه.

## try

```html
<style>
  .parent { color: #b5551f; border: 2px solid #7a4a1d; padding: 10px; }
</style>
<div class="parent">لون الأب بيتوارث <p>الفقرة دي ورثت اللون، لكن مورّثتش الحد</p></div>
```

## examples

### 1) خصائص بتتوارث
`color` على الأب اتورّث لكل الأولاد من غير ما نكتبه.

```html
<style>
  .family { color:#3d7a5a; font-weight:bold; }
</style>
<div class="family">أب<p>ابن</p><span>حفيد</span></div>
```

- `color` و`font-weight` اتوارثوا.

### 2) خصائص مبتتوارثش
الحد (`border`) بتاع الأب ماتورّثش للابن.

```html
<style>
  .p { border:3px solid #7a4a1d; padding:10px; }
</style>
<div class="p">أب بحد<p>ابن من غير حد</p></div>
```

- الحد بيخص العنصر نفسه.

### 3) inherit لإجبار الوراثة
الابن مبيورّثش `border`، بس نقدر نجبره بـ `inherit`.

```html
<style>
  .p { border:3px dashed #3d7a5a; padding:10px; }
  .p span { border:inherit; display:block; margin-top:6px; }
</style>
<div class="p">أب<span>ابن بنفس الحد</span></div>
```

- `border: inherit` ياخد حد الأب بالظبط.

### 4) initial و unset
`initial` بيرجّع للقيمة المبدئية للخاصية، مش لقيمة الأب.

```html
<style>
  .p { color:#3d7a5a; }
  .p b { color: initial; }   /* مبدئي = لون المتصفح */
  .p i { color: unset; }     /* موروث → زي الأب */
</style>
<div class="p">أخضر <b>initial</b> <i>unset</i></div>
```

- `unset` على خاصية موروثة = inherit.

## mistakes

### انتظار وراثة margin

```css bad
.box { margin:20px; }
.box p { /* متوقع هياخد margin */ }
```

```css good
.box { margin:20px; }
.box p { margin:20px; }
```

`margin` مبتتوارثش. اكتبه على العنصر اللي عايزه.

## quiz

### أنهي خاصية بتتوارث تلقائي؟
- [ ] `margin`
- [ ] `border`
- [x] `color`
- [ ] `padding`

`color` و`font-*` بتتوارث، والصندوق (`margin/border/padding`) لأ.

### `unset` على `color` بتتصرف كـ؟
- [ ] initial
- [x] inherit
- [ ] revert
- [ ] none

`color` موروثة، فـ unset = inherit.

### أول حاجة بتتحسم بيها المنافسة بين قاعدتين؟
- [ ] الترتيب
- [x] الأصل والأهمية (origin & !important)
- [ ] طول المحدد
- [ ] أبجدياً

بعدها layers، بعدين specificity، وأخيراً الترتيب.

## refs

- [MDN: Cascade و Inheritance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_and_inheritance)
