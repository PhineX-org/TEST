---
id: adjacent-sibling-combinator
kind: selector
cat: selectors
chip: A + B
title: محدد الأخ التالي (A + B)
en: Next-sibling combinator
status: stable
support: all
mdn: Next-sibling_combinator
summary: العلامة + بتختار B اللي جاية مباشرة بعد A وليهم نفس الأب. مفيدة لتحكم في مسافات واستثناءات زي أول عنصر.
keywords: adjacent sibling, next sibling, +, الأخ التالي, اخوة, h2 + p, spacing, lobotomized owl
related: general-sibling-combinator, child-combinator, selectors-guide, not
---

## intro

علامة `+` بين محددين `A + B` بتختار العنصر `B` اللي **بييجي بعد `A` على طول** (الأخ التالي المباشر)، وبشرط يكونوا **أبناء نفس الأب**. يعني مفيش حاجة بينهم.

مثلاً `h2 + p` = الفقرة اللي بعد العنوان **مباشرة** (الأولى بس، مش كل الفقرات).

استخداماته:
- **تنسيق أول عنصر بعد عنوان**: فقرة مقدمة بخط أكبر.
- **المسافات الذكية**: `* + * { margin-top: 1rem }` («البومة المخبولة»): بتحط هامش فوق **كل عنصر ما عدا الأول**، فمبتحتاجش `:first-child` استثناء.
- **حالات الفورم**: `input:checked + label` علشان تنسّق الـ label لما الـ checkbox يتفعّل (أساس الـ toggles من غير JS).

ملاحظة: مبيرجعش **لورا**؛ بيشوف الإخوة اللي **بعده** بس. ولو عايز كل الإخوة اللي بعده (مش أول واحد بس) استخدم [[general-sibling-combinator]].

> [!analogy] `+` زي «اللي واقف جنبك على طول في الطابور»، مش كل اللي وراك.

> [!key] `input:checked + label` من أقوى حيل CSS: بتعمل switches وtabs من غير JavaScript.

## try

```html
<style>
  h4 + p { color:#b5551f; font-weight:bold; }
</style>
<h4>عنوان</h4><p>الفقرة دي مباشرة بعده (متلوّنة)</p><p>دي لأ</p>
```

## syntax

```css nolive
h2 + p { font-size: 1.2em; }
* + * { margin-top: 1rem; }
input:checked + label { color: green; }
```

- الاتنين لازم يكونوا في نفس الأب.
- بيشتغل للأمام بس (اللي بعد).

## use

- تنسيق أول عنصر بعد عنوان.
- مسافات «* + *» من غير استثناء أول عنصر.
- `input:checked + label` للـ toggles.

## avoid

- لو بينهم عنصر تاني، المحدد مش بيشتغل.
- توقع إنه بيشوف الأخ اللي قبله.

## examples

### 1) الفقرة بعد العنوان
أول فقرة بس هي اللي بتتأثر.

```html
<style>
  h4 + p { color:#b5551f; font-weight:bold; }
  p { color:#3d2c18; margin:4px 0; }
</style>
<h4>عنوان</h4><p>مقدمة</p><p>فقرة عادية</p>
```



### 2) مسافة بين كل العناصر
`* + *` بتحط هامش فوق كل عنصر ما عدا الأول.

```html
<style>
  .stack > * + * { margin-top:12px; }
  .stack > * { background:#efe0bd; color:#3d2c18; padding:8px; }
</style>
<div class="stack"><div>1</div><div>2</div><div>3</div></div>
```

- مفيش هامش زيادة فوق الأول.

### 3) toggle بدون JS
لما الـ checkbox يتفعّل الـ label بيتغيّر.

```html
<style>
  input:checked + label { background:#3d7a5a; color:#f3ede0; }
  label { padding:6px 12px; background:#efe0bd; color:#3d2c18; border-radius:14px; cursor:pointer; }
</style>
<input type="checkbox" id="t1"><label for="t1">اضغط عليّ</label>
```

- ده أساس تقنية «checkbox hack».

### 4) لو في عنصر بينهم
المحدد مش بيشتغل لأن مش جنب بعض على طول.

```html
<style>
  h4 + p { color:#a63b2f; }
</style>
<h4>عنوان</h4><div>div بينهم</div><p style="color:#3d2c18">مش متلوّنة</p>
```



## mistakes

### توقع كل الفقرات

```css bad
h2 + p { color:red; }  /* أول واحدة بس */
```

```css good
h2 ~ p { color:red; }
```

`+` أخ مباشر واحد. `~` كل الإخوة اللي بعده.

### نسيان الأب المشترك

```css bad
.a + .b { }  /* لو في أبوين مختلفين لا يعمل */
```

```css good
.wrap > .a + .b { }
```

لازم يكونوا في نفس الأب.

## quiz

### `h2 + p` بيختار؟
- [ ] كل p جوه h2
- [x] أول p بعد h2 مباشرة
- [ ] كل p بعد h2
- [ ] p قبل h2

أخ تالي مباشر.

### `* + *` بتعمل؟
- [ ] بتختار الأول
- [x] بتختار كل عنصر ما عدا الأول
- [ ] بتلغي الهوامش
- [ ] بتخفي

كل عنصر له أخ قبله.

### `input:checked + label` مفيد في؟
- [ ] الصور
- [x] toggles بدون JS
- [ ] الخطوط
- [ ] الجداول

ربط الحالة بتنسيق الـ label.

## refs

- [MDN: A + B](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator)
- [MDN: Next-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator)
