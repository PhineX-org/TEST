---
id: grid-template-columns
kind: property
cat: grid
chip: grid-template-columns
title: تعريف أعمدة الشبكة
en: CSS grid-template-columns property
status: stable
support: all
mdn: grid-template-columns
summary: grid-template-columns بتحدد عدد الأعمدة وعرض كل واحد في Grid: px وfr وauto وrepeat وminmax. أهم خاصية في الـ Grid.
keywords: grid-template-columns, اعمدة, fr, repeat, minmax, auto-fit, auto-fill, شبكة, grid
related: grid-template-rows, gap, fn-repeat, fn-minmax, grid-guide, grid-template-areas
---

## intro

الخاصية `grid-template-columns` هي **أهم خاصية في Grid**: بتحدد **كام عمود** عندك و**عرض كل واحد**، بقائمة من القيم مفصولة بمسافات. مثلاً `grid-template-columns: 200px 1fr 1fr` = تلات أعمدة: الأول 200px والاتنين التانيين بيقتسموا الباقي بالتساوي.

الوحدات والدوال:
- **طول ثابت**: `200px`، **نسبة**: `30%`.
- **`fr`**: «جزء من المساحة الفاضية». `1fr 2fr` = التاني ضعف الأول.
- **`auto`**: على قد المحتوى (ويتمدد لو في مساحة).
- **[[fn-repeat]]**: لتكرار: `repeat(3, 1fr)` = `1fr 1fr 1fr`.
- **[[fn-minmax]]**: حد أدنى وأقصى: `minmax(200px, 1fr)`.
- **`auto-fill` / `auto-fit`**: `repeat(auto-fit, minmax(200px, 1fr))` = **شبكة متجاوبة** (عدد الأعمدة بيتغيّر حسب العرض) من غير media query.
- **`min-content` / `max-content` / `fit-content()`**.

وممكن تسمّي خطوط الشبكة: `[start] 1fr [end]`. والصفوف بتتحدد بـ [[grid-template-rows]]، وإلا بتتولّد تلقائي بحسب المحتوى.

> [!key] أشهر سطر في CSS الحديث: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`. بتديك معرض متجاوب كامل.

> [!analogy] زي ما تقسّم ورقة بالطول: «عمود 200 ملي، والباقي نقسّمه نص ونص».

## try

```html
<style>
  .g { display:grid; grid-template-columns:80px 1fr 2fr; gap:6px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:10px; text-align:center; }
</style>
<div class="g"><div>80px</div><div>1fr</div><div>2fr</div></div>
```

## syntax

```css nolive
grid-template-columns: 200px 1fr 1fr;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-template-columns: [full-start] 1fr [full-end];
grid-template-columns: none;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.
- لازم `display:grid`.

## values

### `<length>`
عرض ثابت `200px`.

### `<percentage>`
نسبة من عرض الحاوية.

### fr
جزء من المساحة الفاضية `1fr`.

### auto
حسب المحتوى والمساحة.

### repeat()
تكرار نمط الأعمدة.

### minmax()
حد أدنى وأقصى.

### subgrid
يستعير خطوط الشبكة من الأب (حديثة).

## use

- تخطيط صفحة (جانبي + محتوى).
- معرض صور متجاوب بـ auto-fit.
- فورم بعمودين.
- لوحات وكروت متساوية.

## avoid

- حسابات النسب مع gap (استخدم fr).
- تحديد عدد أعمدة كبير على الموبايل (استخدم auto-fit).

## examples

### 1) أعمدة متساوية
`repeat(3, 1fr)`.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:10px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



### 2) جانبي ثابت ومحتوى مرن
`200px 1fr`.

```html
<style>
  .g { display:grid; grid-template-columns:90px 1fr; gap:6px; }
  .s { background:#7a4a1d; color:#f3ede0; padding:10px; }
  .m { background:#efe0bd; color:#3d2c18; padding:10px; }
</style>
<div class="g"><div class="s">جانبي</div><div class="m">المحتوى</div></div>
```



### 3) متجاوب بـ auto-fit
عدد الأعمدة حسب العرض.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(auto-fit,minmax(90px,1fr)); gap:6px; }
  .g div { background:#c9772f; color:#fff3e0; padding:14px 6px; text-align:center; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

- غيّر عرض النافذة.

### 4) نسب fr
1fr و3fr.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 3fr; gap:6px; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:10px; text-align:center; }
</style>
<div class="g"><div>1fr</div><div>3fr</div></div>
```



## mistakes

### نسيان display:grid

```css bad
.g { grid-template-columns:1fr 1fr; }
```

```css good
.g { display:grid; grid-template-columns:1fr 1fr; }
```

لازم تفعّل الـ Grid.

### نسب مئوية مع gap

```css bad
.g { grid-template-columns:50% 50%; gap:10px; }  /* بتعدّي 100% */
```

```css good
.g { grid-template-columns:1fr 1fr; gap:10px; }
```

`fr` بتحسب الـ gap تلقائياً.

## quiz

### `1fr 2fr` معناها؟
- [ ] متساويين
- [x] التاني ضعف الأول
- [ ] ثابتين
- [ ] عمود واحد

جزء من الفاضي.

### أحسن حل لشبكة متجاوبة؟
- [x] repeat(auto-fit, minmax(200px,1fr))
- [ ] width:33%
- [ ] float
- [ ] flex

بتتأقلم تلقائياً.

### القيمة الافتراضية؟
- [ ] auto
- [ ] 1fr
- [x] none
- [ ] 0

none.

## refs

- [MDN: grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
