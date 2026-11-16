---
id: padding-left
kind: property
cat: spacing
chip: padding-left
title: حشو الشمال
en: CSS padding-left property
status: stable
support: all
size: compact
mdn: padding-left
summary: الخاصية padding-left بتحدد المسافة الداخلية بين المحتوى والحد على جهة الشمال.
keywords: padding-left, padding, حشو شمال, spacing
related: padding, margin, box-model, padding-inline, box-sizing
---

## intro

الخاصية `padding-left` بتحدد **الحشو على جهة الشمال** لوحدها. هي واحدة من أربع خصائص بتكوّن الاختصار [[padding]]، وبتستخدمها لما عايز تظبط جهة واحدة بس من غير ما تلمس الباقي. الحشو هو المسافة **جوه** العنصر بين المحتوى والحد، وبيتلوّن بـ `background` بتاع العنصر. وبيزوّد حجم العنصر الكلي إلا لو استخدمت [[box-sizing]]`: border-box`. ولو الصفحة عربية استخدم المنطقي `padding-inline-start` (إنجليزي) أو `padding-inline-end` (عربي) علشان يشتغل صح في أي اتجاه.

## try

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:3px solid #7a4a1d; padding-left:30px; }
</style>
<div class="a">غيّر padding-left</div>
```

## syntax

```css nolive
padding-left: 20px;
padding-left: 1.5rem;
padding-left: 5%;
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

### 1) حشو من الشمال
المسافة بين الحد الأيسر والمحتوى.

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; padding-left:40px; }
</style>
<div class="a">padding-left: 40px</div>
```



### 2) مسافة لعنصر قائمة
تحديد مكان للعلامة قبل النص.

```html
<style>
  ul { padding-left:30px; color:#3d2c18; background:#efe0bd; margin:0; }
</style>
<ul><li>نقطة 1</li><li>نقطة 2</li></ul>
```



### 3) منطقي أفضل
`padding-inline-end` للجهة المقابلة للبداية.

```html
<style>
  .a { padding-inline-end:30px; background:#bcd4a8; color:#3d2c18; margin:4px 0; }
</style>
<div class="a">عربي</div><div class="a" dir="ltr">English</div>
```



## mistakes

### قيمة سالبة

```css bad
.a { padding-left:-10px; }  /* مرفوضة */
```

```css good
.a { margin-left:-10px; }  /* السالب للهامش بس */
```

الحشو لازم يكون صفر أو موجب.

## quiz

### padding-left بتحدد؟
- [ ] مسافة خارجية
- [x] مسافة داخلية على جهة الشمال
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

- [MDN: padding-left](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left)
