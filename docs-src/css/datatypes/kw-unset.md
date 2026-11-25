---
id: kw-unset
kind: datatype
cat: datatypes
chip: unset
title: وارث أو ابتدائي
en: CSS unset keyword
status: stable
support: all
size: compact
mdn: unset
summary: unset بتتصرف كـ inherit لو الخاصية متوارثة وكـ initial لو لأ. مفيدة لإلغاء ستايل بذكاء.
keywords: unset, reset, inherit, initial, all: unset
related: kw-initial, kw-inherit, kw-revert, all
---

## intro

الكلمة `unset` هي **«ذكية»** بين [[kw-inherit]] و[[kw-initial]]: لو الخاصية **متوارثة بطبيعتها** (زي `color`) بتتصرف كـ `inherit` (ترث من الأب)، ولو **مش متوارثة** (زي `margin`) بتتصرف كـ `initial` (ترجع للقيمة الابتدائية). ده معناه إنها بترجع الخاصية «للحالة الطبيعية لو مكانش فيه أي ستايل». أشهر استخدام: **`all: unset;`** لتفريغ زرار قبل ما تصممه من الصفر: `button { all: unset; }`. وبتتفرق عن [[kw-revert]] إن `unset` بتتجاهل ستايل المتصفح (الزرار هيبقى inline عادي بدون شكل)، لكن `revert` بترجع لستايل المتصفح.

## try

```html
<style>
  .p { color:#b5551f; margin:0; }
  .p span { color:unset; margin:unset; }
  .b { all:unset; cursor:pointer; padding:8px 16px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; }
</style>
<div class="p">لون الأب <span>unset: ورث لون الأب</span></div><button class="b">زرار من الصفر</button>
```

## syntax

```css nolive
color: unset;
button { all: unset; }
```

- موروثة ⇒ inherit.
- غير موروثة ⇒ initial.

## use

- تفريغ الأزرار: all: unset.
- إلغاء ستايل مع الاحتفاظ بالوراثة.

## avoid

- استخدامها لو عايز ستايل المتصفح (revert).

## examples

### 1) موروثة
color: unset.

```html
<style>
  .p { color:#b5551f; }
  .p span { color:#3d7a5a; }
  .p span.u { color:unset; }
</style>
<div class="p">أب <span>أخضر</span> <span class="u">unset: لون الأب</span></div>
```



### 2) غير موروثة
margin: unset.

```html
<style>
  p { margin:20px; background:#efe0bd; color:#3d2c18; padding:4px; }
  .u { margin:unset; }
</style>
<p>margin 20</p><p class="u">unset = صفر</p>
```



### 3) تفريغ زرار
all: unset.

```html
<style>
  .b { all:unset; cursor:pointer; padding:8px 16px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; }
</style>
<button class="b">زرار من الصفر</button>
```



## mistakes

### ظن unset ترجع لستايل المتصفح

```css bad
button { all:unset; }  /* بدون ستايل أصلاً */
```

```css good
button { all:revert; }
```

revert لستايل المتصفح.

## quiz

### unset على color؟
- [x] ترث من الأب
- [ ] تصفّر
- [ ] تبقى
- [ ] تخفي

متوارثة.

### unset على margin؟
- [x] القيمة الابتدائية
- [ ] ترث
- [ ] خطأ
- [ ] أسود

initial.

## refs

- [MDN: unset](https://developer.mozilla.org/en-US/docs/Web/CSS/unset)
