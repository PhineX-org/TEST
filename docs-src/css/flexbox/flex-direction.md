---
id: flex-direction
kind: property
cat: flexbox
chip: flex-direction
title: اتجاه الـ flex
en: CSS flex-direction property
status: stable
support: all
mdn: flex-direction
summary: flex-direction بتحدد اتجاه المحور الرئيسي: row (صف) أو column (عمود) أو معكوسين. بتغيّر معاها معنى justify-content وalign-items.
keywords: flex-direction, row, column, row-reverse, column-reverse, اتجاه, محور رئيسي, عمود, flex
related: flex-wrap, flex-flow, justify-content, align-items, flexbox-guide
---

## intro

الخاصية `flex-direction` بتحدد **اتجاه المحور الرئيسي (main axis)** في الحاوية المرنة، يعني **الأبناء هيترصّوا في صف ولا في عمود**.

القيم:
- **`row`** (الافتراضي): صف أفقي، من بداية الاتجاه (يمين في العربي) لنهايته.
- **`row-reverse`**: صف معكوس.
- **`column`**: عمود رأسي من فوق لتحت.
- **`column-reverse`**: عمود معكوس.

**نقطة مهمة جداً**: لما تغيّر الاتجاه بتتبدّل أدوار الخصائص: [[justify-content]] دايماً بتشتغل على **المحور الرئيسي** (أفقي في row، رأسي في column)، و[[align-items]] على **العرضي**. يعني `justify-content: center` في column بتوسّط **رأسياً**!

في العربي (RTL) الـ `row` بيبدأ من **اليمين**. و`*-reverse` بتغيّر الترتيب البصري فقط، **مش ترتيب الـ DOM** (مهم لقارئ الشاشة والـ Tab).

> [!analogy] `row` زي طابور واقف جنب بعض، و`column` زي طابور فوق بعض. وبتبدّل الأدوار زي ما تلف الكاميرا.

## try

```html
<style>
  .f { display:flex; flex-direction:column; gap:6px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:8px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```

## syntax

```css nolive
flex-direction: row;
flex-direction: row-reverse;
flex-direction: column;
flex-direction: column-reverse;
```

- **القيمة المبدئية**: `row`.
- **بتتوارث؟** لأ.
- `flex-flow` اختصار مع `flex-wrap`.

## values

### row
صف أفقي (الافتراضي).

### row-reverse
صف معكوس.

### column
عمود رأسي.

### column-reverse
عمود معكوس.

## use

- `column` لقوائم وكروت رأسية.
- `row` لشريط تنقل.
- تغيير الاتجاه على الموبايل: `column` ثم `row` على الشاشات الكبيرة.

## avoid

- `*-reverse` مع محتوى مهم للكيبورد (الترتيب البصري يخالف الـ DOM).
- نسيان إن justify/align بيتبدلوا مع column.

## examples

### 1) row وcolumn
نفس الأولاد باتجاهين.

```html
<style>
  .f { display:flex; gap:4px; margin-bottom:8px; }
  .f div { background:#c9772f; color:#fff3e0; padding:8px 14px; }
</style>
<div class="f" style="flex-direction:row"><div>1</div><div>2</div><div>3</div></div>
<div class="f" style="flex-direction:column"><div>1</div><div>2</div><div>3</div></div>
```



### 2) reverse
الترتيب البصري عكس HTML.

```html
<style>
  .f { display:flex; flex-direction:row-reverse; gap:4px; }
  .f div { background:#3d7a5a; color:#f3ede0; padding:8px 14px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```

- شوف الترتيب مقلوب.

### 3) justify مع column
`justify-content:center` بيوسّط رأسياً.

```html
<style>
  .f { display:flex; flex-direction:column; justify-content:center; height:110px; background:#efe0bd; align-items:center; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:6px 14px; margin:2px; }
</style>
<div class="f"><div>1</div><div>2</div></div>
```



### 4) متجاوب
عمود على الضيق وصف على الأعرض.

```html
<style>
  .f { display:flex; flex-direction:column; gap:6px; }
  @media (min-width:360px) { .f { flex-direction:row; } }
  .f div { flex:1; background:#bcd4a8; color:#3d2c18; padding:10px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



## mistakes

### الخلط بين justify وalign في column

```css bad
.f { flex-direction:column; align-items:center; }  /* توسّط أفقي مش رأسي */
```

```css good
.f { flex-direction:column; justify-content:center; }  /* رأسي */
```

الأدوار بتتبدّل: justify للمحور الرئيسي.

### reverse مع tab

```css bad
.menu { flex-direction:row-reverse; }
```

```css good
/* خلّي ترتيب HTML هو الترتيب البصري */
```

الـ Tab بيمشي على ترتيب DOM مش البصري.

## quiz

### القيمة الافتراضية؟
- [ ] column
- [x] row
- [ ] row-reverse
- [ ] wrap

row.

### في column، justify-content بتتحكم في؟
- [ ] الأفقي
- [x] الرأسي
- [ ] الحجم
- [ ] اللون

المحور الرئيسي بقى رأسي.

### row في العربي بتبدأ من؟
- [ ] الشمال
- [x] اليمين
- [ ] النص
- [ ] فوق

RTL.

## refs

- [MDN: flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
