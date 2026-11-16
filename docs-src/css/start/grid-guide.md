---
id: grid-guide
kind: guide
cat: start
title: CSS Grid: التخطيط بالشبكة
en: CSS Grid layout guide
status: stable
summary: Grid هو نظام الشبكة ثنائي الأبعاد: صفوف وأعمدة مع بعض. اتعلّم تقسّم الصفحة وتعمل معرض صور وتخطيط كامل بكام سطر.
keywords: grid, شبكة, grid-template-columns, fr, repeat, gap, تخطيط, layout, areas, معرض, responsive, minmax
related: grid-template-columns, grid-template-rows, grid-template-areas, gap, fn-repeat, fn-minmax, flexbox-guide
---

## intro

لو **Flexbox** بيرتّب في اتجاه واحد (صف أو عمود)، فـ **Grid** بيرتّب في **اتجاهين مع بعض**: صفوف وأعمدة، زي جدول لكن للتصميم. مثالي لتخطيط الصفحة الكاملة، ومعارض الصور، والكروت.

تبدأ بـ `display: grid` على الأب، وبعدين بتحدد الأعمدة بـ [[grid-template-columns]]:
- `grid-template-columns: 200px 1fr 1fr` = ثلاث أعمدة، الأول ثابت والباقيين بيقسموا الباقي.
- **وحدة `fr`** = «جزء من المساحة المتاحة». `1fr 2fr` = التاني ضعف الأول.
- الدالة [[fn-repeat]]: `repeat(3, 1fr)` = ثلاث أعمدة متساوية.
- [[gap]] للمسافات بين الخلايا.
- أقوى سطر: **`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`** = شبكة **متجاوبة تلقائياً** من غير media queries! ([[fn-minmax]]).

ولو عايز عنصر ياخد أكتر من خلية: [[grid-column]] و[[grid-row]] (`grid-column: span 2`). أو سمّي المناطق بـ [[grid-template-areas]] وارسم التخطيط بالنص.

> [!analogy] Grid زي ورقة مربعات (كراسة حساب): بتقسم الصفحة لمربعات، وتقول كل عنصر ياخد أنهي مربعات.

> [!tip] إمتى أستخدم أنهي؟ **Flexbox** لصف أو عمود واحد (قائمة، navbar). **Grid** لتخطيط ثنائي (صفحة، معرض).

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:16px; text-align:center; border-radius:6px; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```

## examples

### 1) ثلاث أعمدة متساوية
`repeat(3, 1fr)` = أعمدة متساوية.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:14px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

- الصف الثاني بيتكوّن تلقائي.

### 2) نسب مختلفة
عمود جانبي ثابت، ومحتوى بيتمدد.

```html
<style>
  .g { display:grid; grid-template-columns:120px 1fr; gap:8px; }
  .side { background:#7a4a1d; color:#f3ede0; padding:12px; }
  .main { background:#efe0bd; color:#3d2c18; padding:12px; }
</style>
<div class="g"><div class="side">جانبي</div><div class="main">المحتوى الأساسي بياخد الباقي</div></div>
```



### 3) شبكة متجاوبة
بتتحول تلقائي لأعمدة أقل لما الشاشة تضيق، من غير media query.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(auto-fit,minmax(110px,1fr)); gap:8px; }
  .g div { background:#c9772f; color:#f3ede0; padding:20px 8px; text-align:center; border-radius:6px; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```

- غيّر عرض الـ iframe/الموبايل وجرّب.

### 4) مناطق مسمّاة
تخطيط صفحة كامل برسم نصي.

```html
<style>
  .page { display:grid; gap:6px; grid-template-columns:100px 1fr;
          grid-template-areas:"h h" "s m" "f f"; }
  .page > div { padding:10px; color:#3d2c18; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; }
  .m { grid-area:m; background:#efe0bd; } .f { grid-area:f; background:#e4c490; }
</style>
<div class="page"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div><div class="f">تذييل</div></div>
```

- التخطيط مرسوم كأنه خريطة.

## mistakes

### نسيان display:grid

```css bad
.g { grid-template-columns:1fr 1fr; }  /* مفيش تأثير */
```

```css good
.g { display:grid; grid-template-columns:1fr 1fr; }
```

كل خصائص grid محتاجة `display: grid` على الأب.

### استخدام width بالنسب مع gap

```css bad
.c { width:33.3%; }  /* مع gap هيزيد عن 100% */
```

```css good
.g { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
```

وحدة `fr` بتحسب الـ gap تلقائياً.

## quiz

### `1fr 2fr` معناها؟
- [ ] عمودين متساويين
- [x] التاني ضعف الأول
- [ ] الأول ثابت
- [ ] عمود واحد

التاني يأخد ضعف المساحة.

### أنهي أنسب لتخطيط صفحة كاملة؟
- [ ] float
- [x] Grid
- [ ] inline
- [ ] table

Grid ممتاز للتخطيطات ثنائية الأبعاد.

### `repeat(auto-fit, minmax(200px, 1fr))` بتعمل؟
- [x] شبكة متجاوبة تلقائياً
- [ ] عمود واحد
- [ ] تخفي العناصر
- [ ] تلغي gap

بتغيّر عدد الأعمدة حسب العرض.

## refs

- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)
