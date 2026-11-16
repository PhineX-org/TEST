---
id: columns
kind: property
cat: layout
chip: columns
title: أعمدة النص (Multi-column)
en: CSS columns property
status: stable
support: all
mdn: columns
summary: columns بتقسّم المحتوى لعدة أعمدة زي الجرايد، النص بيتوزع تلقائي. اختصار لـ column-count وcolumn-width.
keywords: columns, column-count, column-width, اعمدة, جريدة, multi-column, column-gap, تقسيم النص
related: column-count, column-width, column-rule, column-gap, grid-guide
---

## intro

الخاصية `columns` بتقسّم محتوى عنصر لـ **أعمدة** زي الجرايد والمجلات، **والنص بيتوزع بين الأعمدة تلقائياً** (بيمشي من عمود لعمود). مش لازم تقسّم يدوي أو تعمل grid. ده بيسمّى **Multi-column Layout**.

هي اختصار لـ [[column-count]] (عدد الأعمدة) و[[column-width]] (عرض العمود المثالي): `columns: 3` أو `columns: 200px` أو `columns: 3 200px`.

الفرق: لو حددت **count** بيقسّم لعدد ثابت. ولو حددت **width** المتصفح بيحسب كام عمود يتسع بالعرض المتاح (**متجاوب تلقائي**). وتقدر تضيف المسافة بين الأعمدة بـ [[gap]]/`column-gap` وخط فاصل بـ [[column-rule]].

مناسب جداً للنصوص الطويلة وقوائم الاختيارات الكتيرة. ومش مناسب للتخطيط الكامل (استخدم Grid).

> [!analogy] زي مقال في جريدة: النص بيكمل من أعلى العمود الأول لتحت وبعدين يطلع العمود التاني.

> [!tip] لمنع عنصر من الانقسام بين عمودين: `break-inside: avoid`.

## try

```html
<style>
  .t { columns:3; column-gap:14px; column-rule:1px solid #7a4a1d; background:#efe0bd; color:#3d2c18;
       padding:10px; line-height:1.8; }
</style>
<div class="t">نص طويل هيتقسّم تلقائياً على تلات أعمدة زي الجرايد. كمل الكلام وشوف إزاي بيمشي من عمود للتاني بدون ما تعمل حاجة. ده بيوفر شغل كتير في المقالات الطويلة والقوائم.</div>
```

## syntax

```css nolive
columns: 3;
columns: 200px;
columns: 3 200px;
column-gap: 20px;
column-rule: 1px solid #999;
```

- **القيمة المبدئية**: `auto auto`.
- **بتتوارث؟** لأ.
- `columns: <count> || <width>`.

## values

### `<integer>`
عدد الأعمدة: `columns: 3`.

### `<length>`
عرض مثالي للعمود: `columns: 200px` (متجاوب).

### auto
المتصفح يقرر.

## use

- مقالات طويلة بأسلوب الجرايد.
- قوائم قصيرة بعدد كبير (دول، مدن) في أعمدة.
- نصوص قانونية أو شروط.

## avoid

- التخطيط الأساسي للصفحة (استخدم Grid/Flex).
- أعمدة في نص قصير (مفيش داعي).

## examples

### 1) 3 أعمدة
النص بيتوزع تلقائي.

```html
<style>
  .t { columns:3; column-gap:12px; background:#efe0bd; color:#3d2c18; padding:10px; line-height:1.8; }
</style>
<div class="t">نص طويل جداً بيتقسّم على تلات أعمدة بشكل تلقائي مع كل سطر جديد. الفكرة إن المتصفح بيوزّع الكلام بالتساوي بين الأعمدة بدون تدخل منك.</div>
```



### 2) عرض عمود مثالي
بيحسب عدد الأعمدة حسب العرض.

```html
<style>
  .t { columns:90px; column-gap:10px; background:#bcd4a8; color:#3d2c18; padding:10px; line-height:1.8; }
</style>
<div class="t">كل ما العرض يزيد بيزيد عدد الأعمدة، وكل ما يضيق بيقل. جرّب تغيّر عرض النافذة. ده بيخلّي النص متجاوب من غير media queries أبداً.</div>
```



### 3) فاصل بين الأعمدة
`column-rule` خط رفيع.

```html
<style>
  .t { columns:2; column-gap:20px; column-rule:2px dashed #c9772f; background:#efe0bd; color:#3d2c18; padding:10px; line-height:1.8; }
</style>
<div class="t">خط منقّط بين العمودين بيساعد في القراءة. القاعدة بتتحط في نص الفراغ بين الأعمدة وبتتحسب في الـ gap تلقائياً. جرّب غيّر الشكل واللون.</div>
```



### 4) منع الانقسام
`break-inside: avoid` على الكروت.

```html
<style>
  .t { columns:2; column-gap:10px; }
  .k { break-inside:avoid; background:#e4c490; color:#3d2c18; padding:8px; margin-bottom:8px; }
</style>
<div class="t"><div class="k">كارت 1<br>سطر</div><div class="k">كارت 2<br>سطر<br>سطر</div><div class="k">كارت 3</div></div>
```



## mistakes

### أعمدة لتخطيط الصفحة

```css bad
.page { columns:2; }  /* المحتوى هيتوزع بشكل غريب */
```

```css good
.page { display:grid; grid-template-columns:1fr 1fr; }
```

multi-column للنصوص مش للتخطيط.

### نسيان break-inside

```css bad
.card { }
```

```css good
.card { break-inside:avoid; }
```

من غير منع الكارت ممكن ينقسم بين عمودين.

## quiz

### `columns:3` معناها؟
- [x] 3 أعمدة
- [ ] عرض 3px
- [ ] 3 صفوف
- [ ] 3 خطوط

عدد أعمدة.

### لتجاوب تلقائي تستخدم؟
- [ ] columns:3
- [x] columns:200px
- [ ] columns:auto
- [ ] columns:0

العرض المثالي.

### الأنسب للتخطيط الكامل؟
- [ ] columns
- [x] Grid
- [ ] float
- [ ] position

Grid.

## refs

- [MDN: columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns)
