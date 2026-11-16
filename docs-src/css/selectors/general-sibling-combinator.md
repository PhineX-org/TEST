---
id: general-sibling-combinator
kind: selector
cat: selectors
chip: A ~ B
title: محدد كل الإخوة التالين (A ~ B)
en: Subsequent-sibling combinator
status: stable
support: all
mdn: Subsequent-sibling_combinator
summary: العلامة ~ بتختار كل B جاية بعد A (مش بالضرورة مباشرة) وليهم نفس الأب. مفيدة لحالات الـ checkbox والتنسيق الشرطي.
keywords: general sibling, subsequent sibling, ~, الاخوة التالين, checkbox hack, h2 ~ p, sibling selector
related: adjacent-sibling-combinator, child-combinator, selectors-guide, checked
---

## intro

علامة `~` (التيلدا) بين محددين `A ~ B` بتختار **كل** العناصر `B` اللي بتيجي **بعد** `A` وليهم **نفس الأب**، حتى لو في حاجات تانية بينهم.

الفرق عن `+` (الأخ التالي المباشر): `+` بيختار **واحد بس** (اللي جنبه على طول)، أما `~` فبيختار **كل** اللي بعده من نفس النوع المطلوب.

مثلاً: `h2 ~ p` = كل الفقرات اللي بعد أول `h2` (في نفس الأب). ولو كان بينهم `div`، لسه الفقرات بتتحدد.

استخدامات:
- **`input:checked ~ .panel`**: لما الـ checkbox يتفعّل تظهر **أي** عنصر بعده، حتى لو مش جنبه مباشرة. أساس الـ accordions والـ tabs من غير JS.
- **تنسيق شرطي** لكل ما بعد عنصر معين (مثلاً كل الفقرات بعد التحذير).

ملاحظة: زي `+` بيشتغل **للأمام فقط** (اللي بعد)، مبيشوفش اللي قبل. وده أيضاً سبب إن `:has()` ([[has]]) أقوى، لأنها بتقدر تختار بناءً على اللي بعده وتعدّل الأب.

> [!analogy] `~` زي «كل اللي ورايا في الطابور»، مش بس اللي ورايا على طول.

## try

```html
<style>
  h4 ~ p { color:#3d7a5a; font-weight:bold; }
</style>
<p style="color:#3d2c18">قبل (مش متأثرة)</p><h4>عنوان</h4><p>1</p><div>div بينهم</div><p>2</p>
```

## syntax

```css nolive
h2 ~ p { color: green; }
input:checked ~ .panel { display: block; }
```

- كل الإخوة اللي بعده، مش المباشر بس.
- نفس الأب والاتجاه للأمام بس.

## use

- حالات الـ checkbox/radio اللي بتأثر على عناصر بعيدة شوية.
- تنسيق كل العناصر بعد تحذير أو عنوان.
- أكورديون بسيط بدون JS.

## avoid

- لو محتاج الأخ المباشر بس (`+`).
- لو محتاج اختيار الأب (استخدم `:has`).

## examples

### 1) كل الفقرات بعد العنوان
حتى لو في div بينهم.

```html
<style>
  h4 ~ p { color:#3d7a5a; font-weight:bold; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<p>قبل</p><h4>عنوان</h4><p>1</p><div>div</div><p>2</p>
```



### 2) + مقابل ~
الأخضر مع `+` (واحد)، المسطّر مع `~` (الكل).

```html
<style>
  h4 + p { color:#3d7a5a; font-weight:bold; }
  h4 ~ p { text-decoration:underline; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<h4>عنوان</h4><p>1</p><p>2</p><p>3</p>
```



### 3) toggle مع عنصر بعيد
الـ checkbox بيظهر الصندوق اللي بعد الـ label.

```html
<style>
  .panel { display:none; padding:8px; background:#bcd4a8; color:#3d2c18; margin-top:6px; }
  #c1:checked ~ .panel { display:block; }
  label { background:#7a4a1d; color:#f3ede0; padding:6px 12px; border-radius:8px; cursor:pointer; }
</style>
<input type="checkbox" id="c1" hidden><label for="c1">إظهار/إخفاء</label><div class="panel">المحتوى</div>
```



### 4) تنسيق كل ما بعد تحذير
أي عنصر بعد التحذير بياخد خلفية مختلفة، حتى لو بينهم عناصر تانية.

```html
<style>
  .warn ~ * { background:#efe0bd; color:#3d2c18; padding:6px; margin:4px 0; }
  .warn { background:#a63b2f; color:#f3ede0; padding:6px; }
</style>
<div>قبل التحذير</div><div class="warn">تحذير</div><p>بعده 1</p><span style="display:block">بعده 2</span>
```

- `~ *` = كل الإخوة التاليين من أي نوع.

## mistakes

### الخلط مع +

```css bad
h2 ~ p { }  /* تتوقع واحدة فقط */
```

```css good
h2 + p { }
```

`~` بيشمل كل اللي بعده.

### توقع اللي قبل

```css bad
p ~ h2 { }  /* بيختار h2 اللي بعد p فقط */
```

```css good
h2:has(~ p) { }
```

الأخوة السابقين محتاجين `:has`.

## quiz

### `h2 ~ p` بيختار؟
- [ ] p الأول فقط
- [x] كل p بعد h2 في نفس الأب
- [ ] p جوه h2
- [ ] p قبل h2

كل الإخوة التاليين.

### الفرق بينه وبين +؟
- [ ] مفيش
- [x] ~ كل التاليين و+ المباشر
- [ ] ~ للأبناء
- [ ] + للأحفاد

العدد.

### بيشتغل لـ؟
- [ ] الإخوة قبله وبعده
- [x] الإخوة اللي بعده بس
- [ ] الأب
- [ ] الأبناء

للأمام فقط.

## refs

- [MDN: A ~ B](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator)
- [MDN: Subsequent-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator)
