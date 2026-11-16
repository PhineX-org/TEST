---
id: hyphens
kind: property
cat: typography
chip: hyphens
title: الواصلة التلقائية
en: CSS hyphens property
status: stable
support: all
size: compact
mdn: hyphens
summary: hyphens بتخلّي المتصفح يقطّع الكلمات الطويلة بواصلة (-) عند آخر السطر. بتحتاج lang على الصفحة، وللعربي مش مستخدمة.
keywords: hyphens, واصلة, auto, manual, soft hyphen, shy
related: word-break, overflow-wrap, text-align, white-space
---

## intro

الخاصية `hyphens` بتتحكم في **كسر الكلمات بواصلة** (`-`) لما الكلمة تتقسم على سطرين. القيم: **`manual`** (الافتراضي: يكسر بس عند علامات الواصلة اللي كتبتها بنفسك `&shy;`)، **`auto`** (المتصفح يحدد أماكن الكسر لوحده حسب قواميس اللغة)، **`none`** (ممنوع).

شرط مهم: لازم تحدد لغة الصفحة بـ `lang` (مثل `<html lang="en">`) عشان المتصفح يعرف قواعد اللغة. وهي مفيدة غالباً **للغات اللاتينية** في أعمدة ضيقة. **للعربي مبتستخدمش**؛ مفيش تقطيع كلمات بواصلة في الكتابة العربية.

## try

```html
<style>
  p { width:110px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; text-align:justify; direction:ltr; }
</style>
<p lang="en" style="hyphens:auto">Internationalization and extraordinarily long words</p>
```

## syntax

```css nolive
hyphens: manual;
hyphens: auto;
hyphens: none;
```

- **القيمة المبدئية**: `manual`.
- محتاجة lang.

## values

### manual
عند &shy; فقط.

### auto
تلقائي حسب اللغة.

### none
ممنوع.

## use

- أعمدة إنجليزية ضيقة.
- نص justify لتقليل الفراغات.

## avoid

- hyphens على العربي.
- نسيان lang.

## examples

### 1) auto
المتصفح يحدد.

```html
<style>
  p { width:110px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; text-align:justify; direction:ltr; }
</style>
<p lang="en" style="hyphens:auto">Internationalization is extraordinarily important</p>
```



### 2) none
بدون واصلات.

```html
<style>
  p { width:110px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; direction:ltr; hyphens:none; }
</style>
<p lang="en">Internationalization is extraordinarily important</p>
```



### 3) manual مع shy
نقطة كسر محددة.

```html
<style>
  p { width:100px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; direction:ltr; hyphens:manual; }
</style>
<p lang="en">Inter&shy;nationali&shy;zation</p>
```



## mistakes

### نسيان lang

```css bad
p { hyphens:auto; }  /* من غير lang مفيش تقطيع */
```

```css good
<html lang="en">  p { hyphens:auto; }
```

المتصفح يحتاج اللغة.

## quiz

### hyphens:auto تحتاج؟
- [x] lang
- [ ] z-index
- [ ] width:auto
- [ ] position

تحديد اللغة.

### تُستخدم للعربي؟
- [ ] أيوه كتير
- [x] لأ
- [ ] دايماً
- [ ] فقط في الجداول

مش مستخدمة.

## refs

- [MDN: hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)
