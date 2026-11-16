---
id: unicode-bidi
kind: property
cat: typography
chip: unicode-bidi
title: تحكم النص ثنائي الاتجاه
en: CSS unicode-bidi property
status: stable
support: all
size: compact
mdn: unicode-bidi
summary: unicode-bidi بتتحكم في خوارزمية الاتجاه الثنائي عند خلط RTL وLTR. isolate وbidi-override أهم قيمتين.
keywords: unicode-bidi, bidi, isolate, bidi-override, عربي وإنجليزي, خلط الاتجاهات
related: direction, writing-mode, text-align, margin-inline
---

## intro

الخاصية `unicode-bidi` متخصصة في حالة **خلط النص العربي (RTL) والإنجليزي (LTR)** في نفس الجملة. المتصفح بيطبّق «خوارزمية الاتجاه الثنائي» لتحديد ترتيب العرض، وأحياناً النتيجة بتلخبط (علامات ترقيم في مكان غلط، أرقام وكلمات إنجليزية بتتبدل أماكنها).

القيم المفيدة: **`isolate`** (يعزل العنصر عن اللي حواليه فمبيتأثرش بالاتجاه المحيط)، و**`bidi-override`** (يفرض اتجاه `direction` على كل الحروف حتى لو لغتها عكس)، و`embed` و`plaintext`. الأفضل في HTML استخدام وسم `<bdi>` اللي بيعمل isolate تلقائياً لأسماء مستخدمين غير معروفة الاتجاه. ولو مبتجمعش اللغتين، مش محتاجها.

## try

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
  .u { unicode-bidi:isolate; direction:ltr; color:#b5551f; font-weight:bold; }
</style>
<p>المستخدم: <span class="u">John (admin)!</span> دخل الموقع</p>
```

## syntax

```css nolive
unicode-bidi: normal;
unicode-bidi: isolate;
unicode-bidi: bidi-override;
unicode-bidi: plaintext;
```

- **القيمة المبدئية**: `normal`.
- تحتاج direction معاها.

## values

### normal
سلوك افتراضي.

### isolate
يعزل العنصر.

### bidi-override
يفرض الاتجاه.

## use

- أسماء إنجليزية وسط جملة عربية.
- عرض بيانات مستخدمين متنوعة اللغة.

## avoid

- استخدامها بدون سبب في نص عربي بحت.

## examples

### 1) isolate
يحمي ترتيب الكلام.

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
  .u { unicode-bidi:isolate; direction:ltr; color:#b5551f; font-weight:bold; }
</style>
<p>الاسم: <span class="u">Ahmed (PhineX)</span>، مرحباً</p>
```



### 2) bidi-override
عكس النص بالقوة.

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
  .o { unicode-bidi:bidi-override; direction:rtl; }
</style>
<p class="o">PhineX Academy</p>
```



### 3) bdi
وسم HTML جاهز.

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
</style>
<p>المستخدم <bdi>Ahmed (admin)</bdi> نشط</p>
```



## mistakes

### نص مختلط بدون عزل

```css bad
<p>الاسم: John (admin)!</p>
```

```css good
<p>الاسم: <bdi>John (admin)</bdi>!</p>
```

عزل الجزء الأجنبي.

## quiz

### isolate بتعمل؟
- [x] تعزل العنصر عن اتجاه المحيط
- [ ] تخفي
- [ ] تكبّر
- [ ] تلوّن

عزل.

### وسم HTML الجاهز؟
- [x] bdi
- [ ] span
- [ ] em
- [ ] mark

bdi.

## refs

- [MDN: unicode-bidi](https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi)
