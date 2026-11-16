---
id: font
kind: element
cat: old-text
tag: font
title: الخط القديم (font)
en: HTML font element (deprecated)
status: deprecated
display: inline
void: no
support: all
size: compact
summary: عنصر font كان بيغيّر لون وحجم ونوع الخط بخصائص color وsize وface. اتحذف، والصح استخدام CSS: color وfont-size وfont-family.
keywords: font, خط, لون, حجم, face, size, color, font-family, font-size, قديم, deprecated, تنسيق
related: span, style, b, i
---

## intro

في أيام HTML الأولى، عشان تغيّر لون كلمة أو حجمها كنت بتلفّها بـ `<font color="red" size="5" face="Arial">`. كان بسيط وكل الصفحات اللي ليها طابع «قديم» مليانة منه. المشكلة إنه بيخلط الشكل بالمحتوى، ولو عايز تغيّر لون كل العناوين لازم تعدّل ألف مكان.

الحل الحديث هو CSS: `color` و`font-size` و`font-family` في ملف تنسيق واحد يتحكم في الصفحة كلها. الـ `<font>` اتحذف من HTML5 (لكن المتصفحات لسه بتعرضه). ولو محتاج تلفّ نص عشان تنسّقه من غير معنى معين، استخدم [[span]] مع class.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<font color size face>` = `color` و`font-size` و`font-family` في CSS.

## try

```html
<p>كلمة <font color="red" size="5" face="Arial">حمرا كبيرة</font> في جملة.</p>
```

## syntax

```html nolive
<font color="red" size="5" face="Arial">نص</font>
```

- `color` — **لون** النص.
- `size` — **حجم** من 1 لـ 7.
- `face` — **نوع الخط**.
- `</font>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة محتاج تفهمها.
- للتعرّف على تاريخ التنسيق.

## avoid

- متستخدمهوش: CSS بيعمل أكتر وأنضف.

## instead

استخدم CSS: `color` و`font-size` و`font-family`، على [[span]] أو أي عنصر. والأفضل تحط class وتنسّقه من ملف CSS.

```html
<style>
  .hl { color: red; font-size: 1.5em; font-family: Arial, sans-serif; }
</style>
<p>كلمة <span class="hl">حمرا كبيرة</span> في جملة.</p>
```

## examples

### 1) font مقابل CSS
نفس الأثر.

```html
<p><font color="blue" size="4">القديم: أزرق</font></p>
<p><span style="color:blue; font-size:1.2em">الحديث: أزرق</span></p>
```

- `size` في `<font>` من 1 لـ 7 (قيم مبهمة)، وفي CSS تحدد الحجم بدقة.
- الألوان في CSS تدعم `hex` و`rgb` و`hsl`، وأسماء الألوان.
- الحديث أسهل في التعديل من مكان واحد.

### 2) تنسيق بـ class
الأسلوب الصح.

```html
<style>
  .warning { color: #b91c1c; font-weight: bold; }
  .note { color: #0369a1; font-style: italic; }
</style>
<p><span class="warning">تحذير:</span> متنساش النسخ الاحتياطي.</p>
<p><span class="note">ملحوظة:</span> الخطوة اختيارية.</p>
```

- الـ class بيدّي الاسم معنى، والستايل في مكان واحد.
- لو غيّرت `.warning` كل التحذيرات بتتغيّر.
- ده مستحيل مع `<font>` المنتشر في الصفحة.

## mistakes

### تنسيق عنوان بـ font
```html bad
<font size="6"><b>عنوان</b></font>
```
```html good
<h1>عنوان</h1>
```
ليه؟ العنوان لازم عنصر عنوان حقيقي، والحجم من CSS.

## quiz

### إيه بديل `<font color>`؟
- [x] `color` في CSS
- [ ] `<paint>`
- [ ] `<tint>`
- [ ] `bg`
خاصية CSS.

### ليه اتحذف `<font>`؟
- [ ] بطيء
- [x] تنسيق بحت والـ CSS أقوى
- [ ] مش بيدعم العربي
- [ ] كبير
الفصل بين الشكل والمعنى.

## refs

- [MDN: font](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/font)
