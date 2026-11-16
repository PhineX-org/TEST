---
id: grid
kind: property
cat: grid
chip: grid
title: اختصار الشبكة
en: CSS grid property
status: stable
support: all
mdn: grid
summary: grid اختصار كبير بيجمع grid-template-* وgrid-auto-*. غالباً بنستخدم الخصائص المفردة لأوضح، لكن الاختصار بيوفر أسطر.
keywords: grid, shorthand, grid-template, grid-auto-flow, اختصار, شبكة, display grid
related: grid-template-columns, grid-template-rows, grid-template-areas, grid-auto-flow, grid-guide
---

## intro

الخاصية `grid` هي **اختصار ضخم** بيجمع كل خصائص الشبكة الصريحة والضمنية في سطر واحد: [[grid-template-rows]] و[[grid-template-columns]] و[[grid-template-areas]] و`grid-auto-rows` و`grid-auto-columns` و`grid-auto-flow`. بس **مش هي اللي بتفعّل الـ Grid**؛ اللي بتفعله هو `display: grid` ([[display]]).

أشكال الصيغة:
- `grid: auto-flow / 1fr 1fr` (ضمني: الصفوف تتوّلد تلقائي، وعمودين).
- `grid: 100px 1fr / auto-flow` (صفوف صريحة، أعمدة ضمنية).
- أو شكل الـ areas: `grid: "h h" 50px "s m" 1fr / 100px 1fr` (صفوف مسمّاة بالأحجام وأعمدة بعد `/`).

**نصيحة المحترفين**: لأن الاختصار بيصفّر أي خاصية مش مكتوبة وبيصعّب القراءة، الأفضل في المشاريع الواقعية تكتب الخصائص **مفردة** (`grid-template-columns` إلخ) للوضوح، وتستخدم `grid` للحالات الصغيرة أو لعمل شبكة سريعة.

> [!warn] الاختصار `grid` بيرجّع كل الخصائص الفرعية لقيمها المبدئية لو مذكرتهاش.

> [!analogy] `grid` زي «الطلب الكامل في مطعم» بتطلب كل حاجة في جملة واحدة، لكن لو عايز تعدّل حاجة بتفضّل تطلب كل صنف لوحده.

## try

```html
<style>
  .g { display:grid; grid:auto-flow 40px / 1fr 1fr 1fr; gap:6px; }
  .g div { background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

## syntax

```css nolive
grid: auto-flow 40px / 1fr 1fr 1fr;
grid: 100px 1fr / auto-flow;
grid: "h h" 50px
      "s m" 1fr / 100px 1fr;
```

- **القيمة المبدئية**: `none`.
- لازم `display:grid`.
- بيصفّر أي خاصية فرعية مش مذكورة.

## values

### `<rows> / <columns>`
صفوف وأعمدة صريحة، وبينهم `/`.

### auto-flow
توليد صفوف أو أعمدة تلقائياً.

### `"areas" <row-size>`
مناطق مسمّاة وأحجام الصفوف بعدها.

## use

- شبكة سريعة بسطر واحد.
- تعريف areas مع أحجام الصفوف والأعمدة.
- أمثلة ونماذج سريعة (prototypes) من غير كتابة كل الخصائص.

## avoid

- استخدامه في تخطيطات معقدة (الخصائص المفردة أوضح).
- نسيان إن الاختصار بيصفّر الباقي.

## examples

### 1) أعمدة وصفوف
`rows / columns`.

```html
<style>
  .g { display:grid; grid:60px 60px / 1fr 1fr 1fr; gap:6px; }
  .g div { background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```



### 2) auto-flow
صفوف بتتولد لوحدها.

```html
<style>
  .g { display:grid; grid:auto-flow 40px / 1fr 1fr; gap:6px; }
  .g div { background:#7a4a1d; color:#f3ede0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 3) areas في الاختصار
تخطيط صفحة بسطرين.

```html
<style>
  .g { display:grid; grid:"h h" 36px "s m" 60px / 70px 1fr; gap:4px; }
  .g > div { color:#3d2c18; padding:6px; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; } .m { grid-area:m; background:#efe0bd; }
</style>
<div class="g"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div></div>
```



### 4) أعمدة تلقائية
`auto-flow` على الأعمدة: كل عنصر عمود جديد.

```html
<style>
  .g { display:grid; grid:50px / auto-flow 60px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



## mistakes

### نسيان display:grid

```css bad
.g { grid:auto-flow / 1fr 1fr; }
```

```css good
.g { display:grid; grid:auto-flow / 1fr 1fr; }
```

الاختصار ما بيفعّلش الـ Grid.

### تصفير غير مقصود

```css bad
.g { grid-auto-flow:column; grid:none; }
```

```css good
.g { grid:none; grid-auto-flow:column; }
```

الاختصار بيصفّر اللي قبله.

## quiz

### grid بتفعّل الـ Grid؟
- [ ] أيوه
- [x] لأ، display:grid هي اللي بتفعّل
- [ ] أحياناً
- [ ] فقط مع areas

لازم display:grid.

### الأفضل للمشاريع الكبيرة؟
- [ ] الاختصار دايماً
- [x] الخصائص المفردة
- [ ] inline style
- [ ] float

للوضوح.

### الفاصل بين الصفوف والأعمدة في الاختصار؟
- [x] / (شرطة مائلة)
- [ ] , (فاصلة)
- [ ] ; (فاصلة منقوطة)
- [ ] | (خط)

`rows / columns`.

## refs

- [MDN: grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)
