---
id: attr-capture
kind: attribute
cat: attrs
chip: capture
title: خاصية الالتقاط
en: HTML capture attribute
status: stable
support: all
size: compact
mdn: Attributes/capture
summary: خاصية capture على input type=file على الموبايل بتفتح الكاميرا أو الميكروفون مباشرة بدل اختيار ملف: user للكاميرا الأمامية وenvironment للخلفية. تتطلب accept.
keywords: capture, camera, environment, user, كاميرا, input file, موبايل, accept, ميكروفون, التقاط صورة
related: input-file, attr-accept, attr-multiple, input, form
---

## intro

لما `<input type="file" accept="image/*">` بيتفتح على الموبايل بتظهر قايمة: «التقط صورة» أو «اختر من المعرض». الخاصية `capture` بتخلّيه **يفتح الكاميرا (أو الميكروفون) مباشرةً**. القيم: **`user`** (الكاميرا الأمامية/السيلفي) و**`environment`** (الخلفية). لازم معاها [[attr-accept]] بنوع الوسائط (`image/*` أو `video/*` أو `audio/*`). على الكمبيوتر غالباً **بتتجاهلها** وتفتح اختيار ملف عادي. والدعم بيختلف من موبايل لموبايل، فاختبر.

## try

```html
<input type="file" accept="image/*" capture="environment">
<p style="color:#64748b">على الموبايل بيفتح الكاميرا الخلفية، وعلى الكمبيوتر بيفتح اختيار ملف عادي.</p>
```

## syntax

```html nolive
<input type="file" accept="image/*" capture="environment">
<input type="file" accept="video/*" capture="user">
```

- `capture="environment"` — الكاميرا الخلفية.
- `capture="user"` — الأمامية.
- لازم `accept` بنوع وسائط.

## use

- تصوير مستند أو إيصال.
- سيلفي لبروفايل.

## avoid

- متفترضش إنها شغالة على الكمبيوتر.

## examples

### 1) تصوير مستند
الكاميرا الخلفية.

```html
<input type="file" accept="image/*" capture="environment">
```

- بتفتح الكاميرا على طول.
- مناسبة لصور الإيصالات.
- اختبرها على الموبايل.

### 2) سيلفي
مثال على user.

```html
<input type="file" accept="image/*" capture="user">
```

- الكاميرا الأمامية.
- للبروفايل والتحقق.
- لازم موافقة المستخدم.

### 3) فيديو
مثال على video/*.

```html
<input type="file" accept="video/*" capture>
```

- بتفتح تسجيل فيديو.
- من غير قيمة = الافتراضي.
- احسب حجم الملف.

## mistakes

### capture من غير accept
```html bad
<input type="file" capture="environment">
```
```html good
<input type="file" accept="image/*" capture="environment">
```
ليه؟ المتصفح محتاج يعرف نوع الوسائط.

## a11y

- وفّر بديل اختيار من المعرض لمن لا يستطيع التصوير.
- اشرح ليه محتاج الكاميرا.

## quiz

### الكاميرا الخلفية؟
- [x] `environment`
- [ ] `user`
- [ ] `back`
- [ ] `rear`
user للأمامية.

### بتشتغل على الكمبيوتر؟
- [x] غالباً بتتجاهل
- [ ] أيوه
- [ ] دايماً
- [ ] في كروم فقط
للموبايل.

## refs

- [MDN: capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture)
- [W3C: HTML Media Capture](https://www.w3.org/TR/html-media-capture/)
