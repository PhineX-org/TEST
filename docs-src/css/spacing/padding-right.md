---
id: padding-right
kind: property
cat: spacing
chip: padding-right
title: padding من اليمين
en: CSS padding-right property
status: stable
support: all
size: compact
mdn: padding-right
summary: الخاصية padding-right بتحدد المسافة الداخلية بين المحتوى والحد على جهة اليمين.
keywords: padding-right, padding, حشو يمين, spacing
related: padding, margin, box-model, padding-inline, box-sizing
---

## intro

الخاصية `padding-right` بتحدد **الـ padding على جهة اليمين** لوحدها. هي واحدة من أربع خصائص بتكوّن الاختصار [[padding]]، وبتستخدمها لما عايز تظبط جهة واحدة بس من غير ما تلمس الباقي. الـ padding هو المسافة **جوه** العنصر بين المحتوى والحد، وبيتلوّن بـ `background` بتاع العنصر. وبيزوّد حجم العنصر الكلي إلا لو استخدمت [[box-sizing]]`: border-box`. ولو الصفحة عربية استخدم المنطقي `padding-inline-end` (إنجليزي) أو `padding-inline-start` (عربي) علشان يشتغل صح في أي اتجاه.

## try

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:3px solid #7a4a1d; padding-right:30px; }
</style>
<div class="a">غيّر padding-right</div>
```

## syntax

```css nolive
padding-right: 20px;
padding-right: 1.5rem;
padding-right: 5%;
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

### 1) padding من اليمين
المسافة بين الحد الأيمن والمحتوى.

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; padding-right:40px; }
</style>
<div class="a">padding-right: 40px</div>
```



### 2) مسافة لأيقونة
نسيب مكان للأيقونة على اليمين.

```html
<style>
  .f { position:relative; }
  .f input { padding-right:36px; padding-top:8px; padding-bottom:8px; width:180px;
             border:2px solid #c9772f; background:#f3e6c9; color:#3d2c18; }
  .f i { position:absolute; right:10px; top:50%; transform:translateY(-50%); font-style:normal; }
</style>
<div class="f"><input placeholder="بحث"><i>🔍</i></div>
```



### 3) منطقي أفضل
`padding-inline-start` بيراعي اتجاه اللغة.

```html
<style>
  .a { padding-inline-start:30px; background:#bcd4a8; color:#3d2c18; margin:4px 0; }
</style>
<div class="a">عربي</div><div class="a" dir="ltr">English</div>
```



## mistakes

### قيمة سالبة

```css bad
.a { padding-right:-10px; }  /* مرفوضة */
```

```css good
.a { margin-right:-10px; }  /* السالب للـ margin بس */
```

الـ padding لازم يكون صفر أو موجب.

## quiz

### padding-right بتحدد؟
- [ ] مسافة خارجية
- [x] مسافة داخلية على جهة اليمين
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

- [MDN: padding-right](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right)
