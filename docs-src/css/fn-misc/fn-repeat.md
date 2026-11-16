---
id: fn-repeat
kind: function
cat: fn-misc
chip: repeat()
title: دالة repeat(): تكرار مسارات Grid
en: CSS repeat() function
status: stable
support: all
mdn: repeat
summary: repeat(n, حجم) بتكرر تعريف أعمدة أو صفوف Grid: repeat(3, 1fr) = ثلاث أعمدة متساوية. وauto-fit وauto-fill لعدد تلقائي.
keywords: repeat, grid, auto-fit, auto-fill, أعمدة متساوية
related: fn-minmax, fn-fit-content, grid-template-columns, grid-guide
---

## intro

الدالة `repeat()` بتختصر **تكرار** تعريف أعمدة أو صفوف Grid: بدل `1fr 1fr 1fr 1fr` تكتب `repeat(4, 1fr)`. الصيغة: `repeat(<count or auto-fit/auto-fill>, <size or size list>)`.

- **عدد ثابت**: `repeat(3, 1fr)` ثلاث أعمدة متساوية.
- **نمط متكرر**: `repeat(2, 100px 1fr)` = `100px 1fr 100px 1fr`.
- **عدد تلقائي**: **`auto-fill`** بيحط أكبر عدد أعمدة تساع **ويسيب المسارات الفاضية** (لو العناصر أقل)، و**`auto-fit`** بيعمل نفس الشيء لكن **بيطوي المسارات الفاضية** فالأعمدة الموجودة تتمدد تملا الصف.

الاستخدام الأقوى مع [[fn-minmax]]: `repeat(auto-fit, minmax(150px, 1fr))` شبكة متجاوبة بدون media queries. الفرق العملي بين `auto-fit` و`auto-fill`: لما عندك عناصر قليلة، `auto-fit` بيمدّدها، و`auto-fill` بيسيب فراغ. وممكن تتكتب جوه `grid-template-columns` أو `rows` أو `grid-auto-columns`، وممكن تدمجها مع أحجام عادية: `100px repeat(3, 1fr) 100px`.

## try

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(4,1fr)"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```

## syntax

```css nolive
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(2, 100px 1fr);
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
grid-template-columns: 100px repeat(3, 1fr) 100px;
```

- `auto-fit` يطوي الفاضي.
- `auto-fill` يسيب الفاضي.
- ممكن تدمجها مع أحجام عادية.

## use

- أعمدة متساوية بسطر قصير.
- شبكة متجاوبة.
- نمط متكرر.

## avoid

- خلط auto-fit مع حجم `fr` كحد أدنى.
- استخدام repeat داخل repeat.

## examples

### 1) 4 أعمدة متساوية
الأبسط.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(4,1fr)"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) نمط متكرر
ثابت ومرن.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(2,50px 1fr)"><div>50</div><div>1fr</div><div>50</div><div>1fr</div></div>
```



### 3) auto-fit مقابل auto-fill
عناصر قليلة.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(auto-fit,minmax(50px,1fr))"><div>fit 1</div><div>fit 2</div></div>
<div class="g" style="grid-template-columns:repeat(auto-fill,minmax(50px,1fr));margin-top:6px"><div>fill 1</div><div>fill 2</div></div>
```



### 4) مع أحجام عادية
عمودين جانبيين.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:50px repeat(3,1fr) 50px"><div>أ</div><div>1</div><div>2</div><div>3</div><div>ب</div></div>
```



## mistakes

### تكرار يدوي

```css bad
grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
```

```css good
grid-template-columns:repeat(6, 1fr);
```

أقصر.

### auto-fit بدون minmax

```css bad
repeat(auto-fit, 1fr)  /* غير صالح */
```

```css good
repeat(auto-fit, minmax(150px, 1fr))
```

لازم حجم له حد أدنى.

## quiz

### repeat(3, 1fr) تعني؟
- [x] 3 أعمدة متساوية
- [ ] عمود واحد
- [ ] 3 صفوف فقط
- [ ] خطأ

تكرار.

### auto-fit بيعمل؟
- [x] يطوي المسارات الفاضية
- [ ] يسيبها
- [ ] يلغي grid
- [ ] يخفي

التمدد.

### أشهر استخدام للاتنين؟
- [x] شبكة متجاوبة
- [ ] حركة
- [ ] لون
- [ ] خط

مع minmax.

## refs

- [MDN: repeat()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
