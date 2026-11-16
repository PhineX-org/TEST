---
id: grid-template-rows
kind: property
cat: grid
chip: grid-template-rows
title: تعريف صفوف الشبكة
en: CSS grid-template-rows property
status: stable
support: all
mdn: grid-template-rows
summary: grid-template-rows بتحدد عدد الصفوف الصريحة وارتفاع كل واحد في Grid، بنفس صيغة الأعمدة.
keywords: grid-template-rows, صفوف, fr, repeat, minmax, auto, grid, ارتفاع الصف
related: grid-template-columns, grid-auto-rows, fn-repeat, fn-minmax, grid-guide
---

## intro

الخاصية `grid-template-rows` بتحدد **عدد الصفوف الصريحة** و**ارتفاع كل صف** في Grid، بنفس صيغة [[grid-template-columns]]: قائمة بمسافات. مثلاً `grid-template-rows: 60px 1fr 40px` = ثلاث صفوف: رأس 60px، محتوى مرن، وتذييل 40px.

الأهمية: لو متحددتش الصفوف، المتصفح بيولّدها تلقائي بحسب المحتوى (الصفوف الضمنية) وارتفاعها `auto`، ويمكنك التحكم فيها بـ [[grid-auto-rows]]. وعلشان `fr` يشتغل في الصفوف **لازم الحاوية يكون لها ارتفاع محدد** (`height` أو `min-height`) وإلا `1fr` = على قد المحتوى بس.

تقبل `px` و`%` و`fr` و`auto` و`minmax()` و`repeat()` وغيرهم. وممكن تسمّي الخطوط `[row-start]`.

> [!tip] تخطيط صفحة كلاسيكي: `grid-template-rows: auto 1fr auto; min-height: 100dvh` = رأس ومحتوى ياخد الباقي وفوتر لازق تحت.

## try

```html
<style>
  .g { display:grid; grid-template-rows:30px 1fr 30px; height:140px; gap:4px; }
  .g div { background:#7a4a1d; color:#f3ede0; text-align:center; padding:4px; }
  .g .m { background:#efe0bd; color:#3d2c18; }
</style>
<div class="g"><div>رأس</div><div class="m">محتوى مرن</div><div>تذييل</div></div>
```

## syntax

```css nolive
grid-template-rows: 60px 1fr 40px;
grid-template-rows: repeat(3, 100px);
grid-template-rows: auto 1fr auto;
```

- **القيمة المبدئية**: `none`.
- `fr` يحتاج ارتفاع محدد للحاوية.

## values

### `<length>`
ارتفاع ثابت.

### fr
جزء من الارتفاع الفاضي.

### auto
حسب المحتوى.

### minmax()
حد أدنى وأقصى.

## use

- تخطيط صفحة (رأس/محتوى/تذييل).
- صفوف بارتفاع محدد.
- ملء ارتفاع الشاشة.

## avoid

- `fr` من غير ارتفاع للحاوية.
- تحديد صفوف كتير لمحتوى ديناميكي (استخدم grid-auto-rows).

## examples

### 1) رأس ومحتوى وتذييل
`auto 1fr auto`.

```html
<style>
  .g { display:grid; grid-template-rows:auto 1fr auto; height:130px; gap:4px; }
  .g div { padding:6px; color:#3d2c18; }
  .h { background:#e4c490; } .m { background:#bcd4a8; } .f { background:#e4c490; }
</style>
<div class="g"><div class="h">رأس</div><div class="m">محتوى</div><div class="f">تذييل</div></div>
```



### 2) صفوف متساوية
`repeat(3, 1fr)` مع ارتفاع.

```html
<style>
  .g { display:grid; grid-template-rows:repeat(3,1fr); height:120px; gap:4px; }
  .g div { background:#c9772f; color:#fff3e0; padding:4px; }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div></div>
```



### 3) صف ثابت وصف مرن
`50px 1fr`.

```html
<style>
  .g { display:grid; grid-template-rows:50px 1fr; height:110px; gap:4px; }
  .g div { padding:6px; color:#f3ede0; background:#7a4a1d; }
  .g .m { background:#3d7a5a; }
</style>
<div class="g"><div>50px</div><div class="m">الباقي</div></div>
```



### 4) minmax للصفوف
الصف بيكبر مع المحتوى لكن بحد أدنى.

```html
<style>
  .g { display:grid; grid-template-rows:minmax(40px,auto); gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="g"><div>صف بحد أدنى 40px<br>ويكبر مع المحتوى</div></div>
```



## mistakes

### fr بدون ارتفاع

```css bad
.g { grid-template-rows:1fr 1fr; }  /* ارتفاع الحاوية auto */
```

```css good
.g { grid-template-rows:1fr 1fr; min-height:200px; }
```

لازم ارتفاع علشان fr يكون له معنى.

### تحديد صفوف كتير لمحتوى ديناميكي

```css bad
.g { grid-template-rows:60px 60px 60px 60px; }
```

```css good
.g { grid-auto-rows:60px; }
```

الأفضل تسيب الصفوف الإضافية تتولّد تلقائي.

## quiz

### grid-template-rows بتحدد؟
- [ ] الأعمدة
- [x] ارتفاعات الصفوف
- [ ] الألوان
- [ ] الخط

الصفوف الصريحة.

### fr في الصفوف محتاج؟
- [ ] عرض
- [x] ارتفاع محدد للحاوية
- [ ] مفيش
- [ ] float

ارتفاع محدد.

### لو متحددتش الصفوف؟
- [ ] مفيش صفوف
- [x] بتتولد تلقائي بحسب المحتوى
- [ ] خطأ
- [ ] بتتخفي

الصفوف الضمنية.

## refs

- [MDN: grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
