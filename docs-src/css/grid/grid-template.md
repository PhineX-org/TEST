---
id: grid-template
kind: property
cat: grid
chip: grid-template
title: اختصار صفوف وأعمدة ومناطق
en: CSS grid-template property
status: stable
support: all
size: compact
mdn: grid-template
summary: grid-template اختصار لـ grid-template-rows وgrid-template-columns وgrid-template-areas في سطر واحد، من غير ما يمس الخصائص الضمنية.
keywords: grid-template, areas, rows, columns, اختصار, شبكة, تخطيط
related: grid-template-columns, grid-template-rows, grid-template-areas, grid, grid-guide
---

## intro

الخاصية `grid-template` هي اختصار بيجمع [[grid-template-rows]] و[[grid-template-columns]] و[[grid-template-areas]]. أكتر صيغة مفيدة بتخليك ترسم المناطق وأحجام الصفوف في نفس المكان، والأعمدة بعد شرطة مائلة:

```
grid-template:
  "header header" 50px
  "sidebar main"  1fr  / 100px 1fr;
```

هنا كل سطر فيه اسم المناطق وارتفاع الصف، وبعد `/` عروض الأعمدة. الفرق عن [[grid]]: `grid-template` **مبتصفّرش** الخصائص الضمنية (`grid-auto-*`) فهي أأمن.

> [!tip] لو عايز ترسم مناطق وتحدد أحجامها في نفس الوقت، ده أنسب اختصار.

## try

```html
<style>
  .g { display:grid; gap:4px; grid-template:"h h" 30px "s m" 60px / 70px 1fr; }
  .g > div { padding:6px; color:#3d2c18; text-align:center; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; } .m { grid-area:m; background:#efe0bd; }
</style>
<div class="g"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div></div>
```

## syntax

```css nolive
grid-template: 100px 1fr / 1fr 2fr;
grid-template:
  "a a" 40px
  "b c" 1fr / 100px 1fr;
```

- **القيمة المبدئية**: `none`.
- `rows / columns`.

## values

### `<rows> / <columns>`
صفوف وأعمدة بشرطة مائلة.

### `"area" <size>`
مناطق مع ارتفاع الصف.

## use

- تعريف تخطيط كامل بسطر.
- رسم مناطق مع الأحجام.

## avoid

- الاختصار في ملفات تحتاج وضوح (استخدم المفردة).

## examples

### 1) rows / columns
صفوف وأعمدة.

```html
<style>
  .g { display:grid; grid-template:40px 40px / 1fr 2fr; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) مناطق وأحجام
رسم التخطيط.

```html
<style>
  .g { display:grid; gap:4px; grid-template:"a b" 40px "c c" 40px / 1fr 1fr; }
  .g > div { color:#3d2c18; display:grid; place-items:center; }
  .a { grid-area:a; background:#e4c490; } .b { grid-area:b; background:#bcd4a8; } .c { grid-area:c; background:#efe0bd; }
</style>
<div class="g"><div class="a">a</div><div class="b">b</div><div class="c">c</div></div>
```



### 3) بدون areas
أعمدة مختلفة.

```html
<style>
  .g { display:grid; grid-template:auto / 80px 1fr 80px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



## mistakes

### الخلط مع grid

```css bad
.g { grid-template:auto-flow / 1fr; }  /* auto-flow مش مسموح هنا */
```

```css good
.g { grid:auto-flow / 1fr; }
```

`auto-flow` ينفع مع `grid` بس.

## quiz

### الفاصل بين الصفوف والأعمدة؟
- [x] /
- [ ] ,
- [ ] ;
- [ ] |

شرطة مائلة.

### الفرق عن grid؟
- [ ] مفيش
- [x] grid-template ما بيصفّرش auto
- [ ] أسرع
- [ ] للفلكس

ما بيصفّرش الخصائص الضمنية.

## refs

- [MDN: grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)
