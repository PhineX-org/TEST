---
id: attr-accept
kind: attribute
cat: attrs
chip: accept
title: خاصية الأنواع المقبولة
en: HTML accept attribute
status: stable
support: all
size: compact
mdn: Attributes/accept
summary: خاصية accept على input type=file بتفلتر أنواع الملفات في نافذة الاختيار (image/*, .pdf, audio/mp3). تسهيل للمستخدم فقط ومش حماية: افحص النوع على السيرفر.
keywords: accept, file input, MIME type, image/*, .pdf, امتداد, فلترة ملفات, رفع ملفات, نوع الملف
related: input-file, attr-multiple, attr-capture, form, input
---

## intro

في [[input-file]]، الخاصية `accept` بتقول للمتصفح **أنهي ملفات تظهر** في نافذة الاختيار. القيمة قايمة **مفصولة بفاصلة** من: **أنواع MIME** (`image/png` أو `image/*` لكل الصور أو `video/*` أو `audio/*`) و/أو **امتدادات** تبدأ بنقطة (`.pdf` و`.docx`). مثال: `accept="image/*,.pdf"`. المستخدم لسه **يقدر يختار «كل الملفات»** ويتخطّاها، فهي **تسهيل مش حماية**: لازم تفحص نوع وحجم الملف على **السيرفر**.

## try

```html
<label>صورة بس: <input type="file" accept="image/*" onchange="o.textContent = this.files[0] ? this.files[0].type : ''"></label>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<input type="file" accept="image/*">
<input type="file" accept=".pdf,.docx">
<input type="file" accept="audio/mpeg,.mp3">
```

- `image/*` — كل الصور.
- `.pdf` — بامتداد.
- قيم متعددة بفاصلة.

## use

- حصر الاختيار لصور أو PDF.
- تقليل أخطاء المستخدم.

## avoid

- متعتمدش عليها كحماية: السيرفر يتحقق.

## examples

### 1) صور وPDF
قيمة مختلطة.

```html
<input type="file" accept="image/*,.pdf">
```

- كل الصور + ملفات PDF.
- بتظهر نافذة مفلترة.
- قابلة للتجاوز.

### 2) فحص النوع بعد الاختيار
مثال على JS.

```html
<input type="file" accept="image/png,image/jpeg" onchange="const f = this.files[0]; o.textContent = f && !/^image\/(png|jpeg)$/.test(f.type) ? 'نوع غير مدعوم ❌' : 'تمام ✅'">
<p id="o"></p>
```

- تحقق مرة تانية في JS.
- وبعدين في السيرفر.
- ثلاث طبقات للأمان.

### 3) مع multiple
عدة ملفات.

```html
<input type="file" accept="video/*" multiple>
```

- عدة فيديوهات.
- نفس الفلترة لكل ملف.
- احسب الحجم الإجمالي.

## mistakes

### اعتبارها حماية
```html bad
<input type="file" accept=".jpg">  <!-- الرفع آمن؟ -->
```
```html good
<!-- السيرفر بيفحص النوع الفعلي والحجم -->
```
ليه؟ المستخدم يتخطّاها بسهولة.

## a11y

- اشرح الأنواع المقبولة في نص ظاهر.
- اعرض رسالة واضحة لو النوع غلط.

## quiz

### كل الصور؟
- [x] `image/*`
- [ ] `*.img`
- [ ] `image`
- [ ] `pics`
MIME عام.

### هل هي حماية؟
- [x] لأ، تسهيل فقط
- [ ] أيوه
- [ ] مع https
- [ ] مع multiple
السيرفر يفحص.

## refs

- [MDN: accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept)
- [MDN: file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept)
