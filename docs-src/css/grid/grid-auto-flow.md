---
id: grid-auto-flow
kind: property
cat: grid
chip: grid-auto-flow
title: اتجاه توزيع العناصر التلقائي
en: CSS grid-auto-flow property
status: stable
support: all
mdn: grid-auto-flow
summary: grid-auto-flow بتحدد إزاي المتصفح يوزع العناصر اللي ملهاش مكان محدد في الشبكة: صف صف (row) أو عمود عمود (column)، وdense لسد الفراغات.
keywords: grid-auto-flow, row, column, dense, auto placement, توزيع تلقائي, شبكة, سد الفراغات
related: grid, grid-auto-rows, grid-auto-columns, grid-template-columns, grid-guide
---

## intro

لما بتحط عناصر في Grid ومبتحددش لكل واحد مكانه، المتصفح بيوزّعهم **تلقائياً** (Auto-placement) خلية خلية. الخاصية `grid-auto-flow` بتتحكم في **اتجاه** التوزيع ده:

- **`row`** (الافتراضي): بيملا الصف الأول من اليمين لليسار (في RTL)، وبعدين ينزل لصف جديد.
- **`column`**: بيملا العمود الأول من فوق لتحت، وبعدين عمود جديد (مفيد في قوائم بتتوزع رأسياً).
- **`dense`**: بتضيفها (`row dense`) علشان المتصفح **يرجع ويسد الفراغات** بعناصر أصغر جت بعدها. بيغيّر الترتيب البصري عن ترتيب HTML (وده ممكن يلخبط الـ Tab)، لكنه بيعمل شبكة معرض صور بدون ثقوب.

الصفوف/الأعمدة الجديدة اللي بتتولّد تلقائياً حجمها بيتحدد بـ [[grid-auto-rows]] و[[grid-auto-columns]]. ولو عايز تحدد مكان عنصر بعينه، استخدم [[grid-area]].

> [!analogy] زي توزيع طلبة على كراسي في قاعة: `row` يملوا الصف ويبدأوا صف جديد، `column` يملوا العمود، و`dense` يدوّر على أي كرسي فاضي يقعد عليه واحد صغير.

> [!warn] `dense` ممكن يخلّي الترتيب البصري مختلف عن ترتيب HTML، فاستخدمه للمحتوى غير التفاعلي (صور مثلاً).

## try

```html
<style>
  .g { display:grid; grid-template-rows:repeat(2,34px); grid-auto-flow:column; grid-auto-columns:50px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

## syntax

```css nolive
grid-auto-flow: row;
grid-auto-flow: column;
grid-auto-flow: row dense;
grid-auto-flow: column dense;
```

- **القيمة المبدئية**: `row`.
- **بتتوارث؟** لأ.
- `dense` بيسد الفراغات.

## values

### row
يملا صفوف (الافتراضي).

### column
يملا أعمدة.

### dense
يرجع يسد الفراغات بعناصر أصغر.

## use

- قوائم بتتوزع على أعمدة (`column`).
- معرض صور بدون فراغات (`dense`).
- توزيع تلقائي بسيط.

## avoid

- `dense` مع عناصر تفاعلية (يلخبط Tab).
- نسيان تحديد `grid-template-rows` مع `column`.

## examples

### 1) row (الافتراضي)
صف ثم صف.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 2) column
عمود ثم عمود.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(2,34px); grid-auto-flow:column; grid-auto-columns:50px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) row dense
العنصر الصغير بيسد الفراغ.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-flow:row dense; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .w { grid-column:span 2; background:#e4c490 !important; }
</style>
<div class="g"><div>1</div><div class="w">عريض</div><div class="w">عريض</div><div>صغير</div></div>
```



### 4) مقارنة بدون dense
فراغ بيفضل.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; text-align:center; }
  .w { grid-column:span 2; background:#e4c490 !important; }
</style>
<div class="g"><div>1</div><div class="w">عريض</div><div class="w">عريض</div><div>صغير</div></div>
```



## mistakes

### column من غير تحديد الصفوف

```css bad
.g { display:grid; grid-auto-flow:column; }  /* كله في صف واحد */
```

```css good
.g { display:grid; grid-template-rows:repeat(3,auto); grid-auto-flow:column; }
```

لازم تحدد عدد الصفوف علشان يتحوّل لأعمدة.

### dense لمحتوى متسلسل

```css bad
.steps { grid-auto-flow:dense; }
```

```css good
.steps { grid-auto-flow:row; }
```

الترتيب البصري هيخالف المنطقي.

## quiz

### الافتراضي؟
- [ ] column
- [x] row
- [ ] dense
- [ ] none

row.

### dense بيعمل؟
- [ ] يلغي العناصر
- [x] يسد الفراغات
- [ ] يكبّر
- [ ] يخفي

بيملأ الثقوب.

### column بيملأ؟
- [ ] الصفوف
- [x] الأعمدة أولاً
- [ ] عشوائي
- [ ] لا شيء

عمود ثم عمود.

## refs

- [MDN: grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
