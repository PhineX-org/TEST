---
id: basefont
kind: element
cat: old-text
tag: basefont
title: الخط الأساسي القديم (basefont)
en: HTML basefont element (obsolete)
status: obsolete
display: inline
void: yes
support: none
size: compact
summary: عنصر basefont كان بيحدد الخط الافتراضي واللون والحجم للصفحة. اتشال من المتصفحات، والبديل CSS على body أو html: font-family وfont-size وcolor.
keywords: basefont, الخط الأساسي, font, body, font-family, font-size, color, قديم, obsolete, افتراضي
related: font, body, style
---

## intro

`<basefont>` كان عنصر فاضي (من غير محتوى) بتحطه في بداية الصفحة عشان يحدد **الخط الافتراضي** لكل النص بعده: `<basefont face="Arial" size="4" color="navy">`. الفكرة حلوة: تعريف مرة واحدة لكل الصفحة.

لكنه كان محدود (بيتجاهله ناس كتير) واتشال من HTML5 ومن المتصفحات الحديثة: **مفيش أي تأثير** لو كتبته. الحل الصح هو **CSS على `body` أو `html`**: `font-family` و`font-size` و`color`، وبكده كل العناصر بتورّث الخط تلقائياً.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<basefont>` اتشال. حدد الخط الأساسي بـ CSS على `body`.

## instead

حدد الخط الأساسي بـ CSS على `body` (أو `html`): `font-family` و`font-size` و`color`. كل العناصر جواه هتورّثها تلقائياً.

```html
<style>
  body { font-family: Cairo, Arial, sans-serif; font-size: 18px; color: navy; }
</style>
<p>كل النص هنا بياخد الخط الأساسي.</p>
```

## examples

### 1) الكود القديم (مش شغال)
متجاهَل.

```html nolive
<basefont face="Arial" size="4" color="navy">
<p>كان المفروض ده يتأثر بالخط الأساسي.</p>
```

- المتصفحات بتتجاهل `<basefont>` تماماً.
- ده عنصر فاضي: مفيش وسم ختامي.
- النتيجة: النص بياخد الشكل الافتراضي للمتصفح.

### 2) الخط الأساسي بـ CSS
على body.

```html
<style>
  body { font-family: Georgia, serif; color: #0f3d6b; }
  h3 { margin: 0 0 6px }
</style>
<h3>عنوان</h3>
<p>الفقرة دي بتورّث الخط واللون من body.</p>
```

- الخصائص بتتوارث لأي عنصر جوه `body`.
- تقدر تغيّر عنصر بعينه بقاعدة أخص.
- ده المكان الوحيد المعتمد لتحديد الخط الأساسي.

### 3) متغيّر CSS للخط
طريقة منظمة.

```html
<style>
  :root { --base-font: Cairo, Arial, sans-serif; --base-size: 17px }
  body { font: var(--base-size) var(--base-font); }
</style>
<p>خط الصفحة من متغيّر واحد.</p>
```

- `:root` بيحدد المتغيّرات في مكان واحد.
- الاختصار `font` بيجمع الحجم والعائلة.
- تغيير المتغيّر بيغيّر الصفحة كلها.

## refs

- [MDN: basefont](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/basefont)
