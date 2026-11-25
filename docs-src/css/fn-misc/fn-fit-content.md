---
id: fn-fit-content
kind: function
cat: fn-misc
chip: fit-content()
title: على قد المحتوى بحد أقصى
en: CSS fit-content() function
status: stable
support: all
size: compact
mdn: fit-content_function
summary: fit-content(حد) بتخلّي المسار (عمود Grid) على قد المحتوى لكن ما يعديش الحد: grid-template-columns: fit-content(300px) 1fr.
keywords: fit-content, grid, width, max-content
related: fn-minmax, fn-repeat, width
---

## intro

الدالة `fit-content(<max>)` بتخلّي المسار (عمود أو صف في Grid) **على قد المحتوى**، لكن **بحد أقصى** ما يعديهوش. يعني: لو المحتوى أصغر من الحد بياخد حجم المحتوى، ولو أكبر بيقف عند الحد (والمحتوى بيلتف). مثال: `grid-template-columns: fit-content(300px) 1fr;` العمود الأول على قد محتواه بس مايزيدش عن 300px. وهي معادلة لـ `minmax(auto, max-content)` مع حد أقصى. كمان فيه الكلمة المفتاحية `fit-content` لـ `width` (من غير أقواس) بمعنى مشابه على العنصر نفسه.

## try

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:fit-content(110px) 1fr"><div>على قد المحتوى بحد أقصى</div><div>الباقي</div></div>
```

## syntax

```css nolive
grid-template-columns: fit-content(300px) 1fr;
width: fit-content;   /* كلمة مفتاحية */
```

- حد أقصى بين الأقواس.

## use

- عمود جانبي على قد محتواه.
- تسميات (labels) بحد أقصى.

## avoid

- نسيان الحد الأقصى.

## examples

### 1) عمود محدود
110px كحد.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:fit-content(110px) 1fr"><div>نص عمود أول طويل نسبياً</div><div>الباقي</div></div>
```



### 2) محتوى قصير
بياخد قد المحتوى.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:fit-content(200px) 1fr"><div>قصير</div><div>الباقي</div></div>
```



### 3) width: fit-content
على العنصر.

```html
<style>
  .b { width:fit-content; max-width:100%; background:#efe0bd; color:#3d2c18; padding:8px 14px; border-radius:8px; }
</style>
<div class="b">عنصر على قد محتواه</div>
```



## mistakes

### بدون حد

```css bad
grid-template-columns:fit-content 1fr;  /* غلط */
```

```css good
grid-template-columns:fit-content(300px) 1fr;
```

لازم حد بين الأقواس.

## quiz

### fit-content(300px)؟
- [x] قد المحتوى بحد أقصى 300
- [ ] 300 ثابت
- [ ] أدنى 300
- [ ] خطأ

محدود.

### مكافئة لـ؟
- [x] minmax(auto, max-content) مع حد
- [ ] 1fr
- [ ] auto
- [ ] min

تقريباً.

## refs

- [MDN: fit-content()](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content_function)
