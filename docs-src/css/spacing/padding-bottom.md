---
id: padding-bottom
kind: property
cat: spacing
chip: padding-bottom
title: حشو التحت
en: CSS padding-bottom property
status: stable
support: all
size: compact
mdn: padding-bottom
summary: الخاصية padding-bottom بتحدد المسافة الداخلية بين المحتوى والحد على جهة التحت.
keywords: padding-bottom, padding, حشو تحت, spacing
related: padding, margin, box-model, padding-inline, box-sizing
---

## intro

الخاصية `padding-bottom` بتحدد **الحشو على جهة التحت** لوحدها. هي واحدة من أربع خصائص بتكوّن الاختصار [[padding]]، وبتستخدمها لما عايز تظبط جهة واحدة بس من غير ما تلمس الباقي. الحشو هو المسافة **جوه** العنصر بين المحتوى والحد، وبيتلوّن بـ `background` بتاع العنصر. وبيزوّد حجم العنصر الكلي إلا لو استخدمت [[box-sizing]]`: border-box`. ولو الصفحة عربية استخدم المنطقي `padding-block-end` علشان يشتغل صح في أي اتجاه.

## try

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:3px solid #7a4a1d; padding-bottom:30px; }
</style>
<div class="a">غيّر padding-bottom</div>
```

## syntax

```css nolive
padding-bottom: 20px;
padding-bottom: 1.5rem;
padding-bottom: 5%;
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

- ظبط حشو جهة واحدة بدقة.
- تعويض مسافة لأيقونة أو عنصر مثبّت.

## avoid

- استخدام قيمة سالبة (غير صالحة).

## examples

### 1) حشو تحت النص
مسافة تحت المحتوى قبل الحد.

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; padding-bottom:30px; }
</style>
<div class="a">padding-bottom: 30px</div>
```



### 2) زرار بحشو غير متماثل
حشو تحت أكبر لعمل شكل «بارز».

```html
<style>
  .btn { background:#7a4a1d; color:#f3ede0; padding:10px 22px 16px; border-radius:8px; display:inline-block; }
</style>
<span class="btn">زرار</span>
```



### 3) حشو تحت الكارت
مساحة فاضية أسفل المحتوى.

```html
<style>
  .card { background:#f3e6c9; color:#3d2c18; padding:12px; padding-bottom:36px; border-radius:10px; }
</style>
<div class="card">كارت بمساحة تحت</div>
```



## mistakes

### قيمة سالبة

```css bad
.a { padding-bottom:-10px; }  /* مرفوضة */
```

```css good
.a { margin-bottom:-10px; }  /* السالب للهامش بس */
```

الحشو لازم يكون صفر أو موجب.

## quiz

### padding-bottom بتحدد؟
- [ ] مسافة خارجية
- [x] مسافة داخلية على جهة التحت
- [ ] عرض الحد
- [ ] لون

حشو جهة واحدة.

### هل الحشو بياخد لون الخلفية؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط مع border

الخلفية بتمتد تحت الحشو.

## refs

- [MDN: padding-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom)
