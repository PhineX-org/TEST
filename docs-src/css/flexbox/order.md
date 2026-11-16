---
id: order
kind: property
cat: flexbox
chip: order
title: ترتيب العناصر المرنة
en: CSS order property
status: stable
support: all
size: compact
mdn: order
summary: order بتغيّر الترتيب البصري للأبناء في flex وgrid من غير ما تغيّر HTML. الأصغر الأول، والافتراضي صفر.
keywords: order, ترتيب, flex order, تغيير الترتيب, visual order, accessibility
related: flex, flex-direction, grid-area, align-self
---

## intro

الخاصية `order` بتغيّر **الترتيب البصري** للأبناء المرنة (flex أو grid) **من غير ما تلمس HTML**. كل ابن عنده `order: 0` افتراضياً، والترتيب **من الأصغر للأكبر**، وبعدين بحسب الترتيب في HTML لو اتساووا. تقدر تدّي `-1` علشان عنصر يطلع الأول أو رقم كبير علشان يطلع آخر شيء. 

⚠️ **مهم للوصولية**: `order` بتغيّر الترتيب **البصري فقط**، فالـ Tab وقارئ الشاشة بيمشوا على ترتيب HTML، وده ممكن يلخبط. استخدمها بحذر، وفضّل ترتيب HTML المنطقي.

## try

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:10px 16px; }
  .x { order:-1; background:#3d7a5a !important; }
</style>
<div class="f"><div>1</div><div>2</div><div class="x">3 (order:-1)</div></div>
```

## syntax

```css nolive
order: 0;
order: -1;
order: 5;
```

- **القيمة المبدئية**: `0`.
- عدد صحيح (حتى سالب).

## values

### 0
الافتراضي.

### `<integer>`
الأصغر الأول.

## use

- نقل عنصر لأول أو آخر على الموبايل.
- إعادة ترتيب الأعمدة حسب الشاشة.

## avoid

- تغيير ترتيب عناصر تفاعلية (يلخبط Tab).

## examples

### 1) نقل لأول
`order:-1`.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:10px 16px; }
  .a { order:-1; background:#e4c490 !important; }
</style>
<div class="f"><div>1</div><div>2</div><div class="a">3</div></div>
```



### 2) نقل لآخر
`order:9`.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#c9772f; color:#fff3e0; padding:10px 16px; }
  .a { order:9; background:#3d7a5a !important; }
</style>
<div class="f"><div class="a">1</div><div>2</div><div>3</div></div>
```



### 3) ترتيب متجاوب
الشريط الجانبي ينزل بعد المحتوى على الضيق.

```html
<style>
  .f { display:flex; flex-wrap:wrap; gap:4px; }
  .s { flex:1 1 100px; background:#7a4a1d; color:#f3ede0; padding:8px; order:2; }
  .m { flex:2 1 160px; background:#efe0bd; color:#3d2c18; padding:8px; order:1; }
</style>
<div class="f"><div class="s">جانبي</div><div class="m">المحتوى</div></div>
```



## mistakes

### order على عناصر تفاعلية

```css bad
.btn2 { order:-1; }  /* Tab يمشي بترتيب HTML */
```

```css good
/* رتّب HTML بنفس الترتيب البصري */
```

ترتيب بصري مختلف عن ترتيب Tab بيلخبط المستخدم.

## quiz

### القيمة الافتراضية؟
- [x] 0
- [ ] 1
- [ ] -1
- [ ] auto

0.

### order بتأثر على؟
- [ ] ترتيب DOM
- [x] الترتيب البصري فقط
- [ ] الاتنين
- [ ] الحجم

البصري.

## refs

- [MDN: order](https://developer.mozilla.org/en-US/docs/Web/CSS/order)
