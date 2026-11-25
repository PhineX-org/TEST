---
id: padding-top
kind: property
cat: spacing
chip: padding-top
title: padding من فوق
en: CSS padding-top property
status: stable
support: all
size: compact
mdn: padding-top
summary: الخاصية padding-top بتحدد المسافة الداخلية بين المحتوى والحد على جهة الفوق.
keywords: padding-top, padding, حشو فوق, spacing
related: padding, margin, box-model, padding-inline, box-sizing
---

## intro

الخاصية `padding-top` بتحدد **الـ padding على جهة الفوق** لوحدها. هي واحدة من أربع خصائص بتكوّن الاختصار [[padding]]، وبتستخدمها لما عايز تظبط جهة واحدة بس من غير ما تلمس الباقي. الـ padding هو المسافة **جوه** العنصر بين المحتوى والحد، وبيتلوّن بـ `background` بتاع العنصر. وبيزوّد حجم العنصر الكلي إلا لو استخدمت [[box-sizing]]`: border-box`. ولو الصفحة عربية استخدم المنطقي `padding-block-start` علشان يشتغل صح في أي اتجاه.

## try

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:3px solid #7a4a1d; padding-top:30px; }
</style>
<div class="a">غيّر padding-top</div>
```

## syntax

```css nolive
padding-top: 20px;
padding-top: 1.5rem;
padding-top: 5%;
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** لأ.
- **القيم السالبة** غير مسموحة.

## values

### `<length>`
قيمة ثابتة: `20px` أو `1rem`.

### `<percentage>`
نسبة من **عرض** الأب.

## use

- ظبط padding جهة واحدة بدقة.
- تعويض مسافة لأيقونة أو عنصر مثبّت.

## avoid

- استخدام قيمة سالبة (غير صالحة).

## examples

### 1) padding فوق النص
المسافة بين حد العنصر وأول سطر.

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; padding-top:30px; }
</style>
<div class="a">padding-top: 30px</div>
```

- الخلفية بتملا الـ padding.

### 2) تحت عنوان ثابت
نسيب مكان للـ header الثابت.

```html
<style>
  .hd { background:#7a4a1d; color:#f3ede0; padding:8px; }
  .ct { padding-top:24px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="hd">رأس</div><div class="ct">المحتوى بعيد عن الرأس</div>
```



### 3) مقارنة مع margin-top
الفرق: الـ padding جوه الخلفية والـ margin برّاها.

```html
<style>
  .p { padding-top:20px; background:#bcd4a8; color:#3d2c18; margin-bottom:10px; }
  .m { margin-top:20px; background:#bcd4a8; color:#3d2c18; }
  body { background:#efe0bd; }
</style>
<div class="p">padding-top</div><div class="m">margin-top</div>
```



## mistakes

### قيمة سالبة

```css bad
.a { padding-top:-10px; }  /* مرفوضة */
```

```css good
.a { margin-top:-10px; }  /* السالب للـ margin بس */
```

الـ padding لازم يكون صفر أو موجب.

## quiz

### padding-top بتحدد؟
- [ ] مسافة خارجية
- [x] مسافة داخلية على جهة الفوق
- [ ] عرض الحد
- [ ] لون

padding جهة واحدة.

### هل الـ padding بياخد لون الخلفية؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط مع border

الخلفية بتمتد تحت الـ padding.

## refs

- [MDN: padding-top](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top)
