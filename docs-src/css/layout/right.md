---
id: right
kind: property
cat: layout
chip: right
title: إزاحة اليمين
en: CSS right property
status: stable
support: all
mdn: right
summary: الخاصية right بتحدد مسافة العنصر الـ positioned من الحافة اليمنى للمرجع بتاعه.
keywords: right, تموضع, إزاحة, position, absolute, fixed, sticky, inset
related: position, inset, z-index, positioning-guide, margin
---

## intro

الخاصية `right` بتحدد **كام بُعد العنصر عن الحافة اليمنى** للمرجع بتاعه، وبتشتغل **بس مع العناصر الـ positioned** (يعني `position` غير `static`). المرجع بيختلف حسب القيمة:
- مع `absolute`: أقرب أب positioned.
- مع `fixed`: نافذة المتصفح.
- مع `relative`: مكانه الأصلي (وبتزحزحه).
- مع `sticky`: بتحدد الحد اللي يلزق عنده أثناء السكرول.

القيمة ممكن تكون طول أو نسبة (من أبعاد المرجع) أو `auto`. ولو حطيت `right` و`left` مع بعض على عنصر absolute وسبت `height`/`width` auto، العنصر بيتمدد بينهم (حيلة مفيدة للـ overlays). والاختصار لكل الجهات الأربع هو [[inset]]. تفاصيل التموضع في [[positioning-guide]] و[[position]].

> [!warn] من غير `position` مناسب الخاصية دي **مالهاش أي أثر**.

> [!tip] في الصفحات العربية (RTL) فكّر في الخصائص المنطقية [[inset-inline-start]] علشان التصميم يعمل في أي اتجاه.

## try

```html
<style>
  .p { position:relative; height:100px; background:#efe0bd; }
  .c { position:absolute; right:10px; top:10px; background:#b5551f; color:#f3ede0; padding:6px 12px; }
</style>
<div class="p"><div class="c">right: 10px</div></div>
```

## syntax

```css nolive
right: 20px;
right: 10%;
right: 0;
right: auto;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.
- لازم `position` غير static.

## values

### `<length>`
مسافة ثابتة `20px`.

### `<percentage>`
نسبة من أبعاد المرجع (ارتفاع أو عرض حسب الجهة).

### auto
المتصفح يحسب (الافتراضي).

### 0
لصق في الحافة.

## use

- شارة في ركن كارت.
- عنصر ثابت في ركن الشاشة (`fixed`).
- تمطيط overlay بين حافتين.
- حد `top:0` لـ sticky header.

## avoid

- استخدامها على عنصر static (مفيش أثر).
- قيم كبيرة بتخرج العنصر من الشاشة.

## examples

### 1) right على absolute
العنصر ملزوق في الحافة جوه الأب relative.

```html
<style>
  .p { position:relative; height:100px; background:#efe0bd; }
  .c { position:absolute; right:0; top:0; background:#3d7a5a; color:#f3ede0; padding:4px 10px; }
</style>
<div class="p"><div class="c">right: 0</div></div>
```



### 2) زحزحة بـ relative
العنصر relative بيتحرك من مكانه.

```html
<style>
  .b { background:#efe0bd; color:#3d2c18; padding:8px; margin:4px 0; }
  .m { position:relative; right:14px; background:#bcd4a8; }
</style>
<div class="b">قبل</div><div class="b m">right: 14px</div><div class="b">بعد</div>
```



### 3) مع حافتين مقابلتين
تمطيط بين حافتين من غير width.

```html
<style>
  .p { position:relative; height:80px; background:#efe0bd; }
  .c { position:absolute; left:10px; right:10px; top:20px; height:30px; background:#c9772f; }
</style>
<div class="p"><div class="c"></div></div>
```



### 4) بالنسبة المئوية
`right: 50%` بالنسبة للأب.

```html
<style>
  .p { position:relative; height:100px; background:#efe0bd; }
  .c { position:absolute; right:50%; background:#7a4a1d; color:#f3ede0; padding:4px 10px; }
</style>
<div class="p"><div class="c">right: 50%</div></div>
```



## mistakes

### نسيان position

```css bad
.b { right:10px; }  /* مفيش أثر */
```

```css good
.b { position:relative; right:10px; }
```

الخاصية بتشتغل على positioned فقط.

### نسيان أب relative

```css bad
.badge { position:absolute; right:0; }  /* بالنسبة للصفحة */
```

```css good
.card { position:relative; }
.badge { position:absolute; right:0; }
```

لازم أب positioned عشان المرجع.

## quiz

### `right` بتشتغل مع؟
- [ ] static فقط
- [x] أي positioned
- [ ] float فقط
- [ ] flex فقط

position غير static.

### مع absolute المرجع؟
- [ ] الصفحة دايماً
- [x] أقرب أب positioned
- [ ] الأخ
- [ ] النافذة فقط

أقرب جد positioned.

### القيمة المبدئية؟
- [ ] 0
- [x] auto
- [ ] none
- [ ] 100%

auto.

## refs

- [MDN: right](https://developer.mozilla.org/en-US/docs/Web/CSS/right)
