---
id: caret-color
kind: property
cat: colors-effects
chip: caret-color
title: لون مؤشر الكتابة
en: CSS caret-color property
status: stable
support: all
size: compact
mdn: caret-color
summary: caret-color بتغيّر لون مؤشر الكتابة (|) في حقول النصوص. تفصيلة صغيرة بتحسّن الهوية.
keywords: caret-color, مؤشر, caret, input, textarea, لون المؤشر
related: color, accent-color, outline, color-scheme
---

## intro

الخاصية `caret-color` بتغيّر **لون المؤشر الوامض** (الشرطة `|` اللي بتظهر وأنت بتكتب) في [[color]] حقول `input` و`textarea` والعناصر القابلة للتحرير (`contenteditable`). الافتراضي بيتبع لون النص (`auto`). تقدر تخلّيه بلون الهوية، أو شفاف لإخفائه.

تفصيلة صغيرة لكنها بتدي إحساس بالاحتراف والتناسق مع الثيم. تأكد إن اللون **ظاهر على خلفية الحقل** (تباين كافي)، خاصة في الثيم الغامق.

## try

```html
<style>
  input { caret-color:#c9772f; padding:8px; border:2px solid #7a4a1d; border-radius:6px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<input value="اضغط واكتب" autofocus>
```

## syntax

```css nolive
caret-color: #c9772f;
caret-color: auto;
caret-color: transparent;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** أيوه.

## values

### `<color>`
لون المؤشر.

### auto
لون النص (الافتراضي).

### transparent
يخفي المؤشر.

## use

- مؤشر بلون الهوية.
- تباين أحسن في الثيم الغامق.

## avoid

- لون مبهت على نفس الخلفية.
- إخفاء المؤشر في حقل لازم يتكتب فيه.

## examples

### 1) ألوان
لكل حقل مؤشر مختلف.

```html
<style>
  input { display:block; margin:4px 0; padding:6px; border:2px solid #7a4a1d; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<input value="مؤشر برتقالي" style="caret-color:#c9772f"><input value="مؤشر أخضر" style="caret-color:#3d7a5a">
```



### 2) textarea
نفس الفكرة.

```html
<style>
  textarea { caret-color:#b5551f; padding:8px; border:2px solid #7a4a1d; border-radius:6px; background:#f3ede0; color:#3d2c18; width:90%; }
</style>
<textarea rows="2">اكتب هنا</textarea>
```



### 3) contenteditable
حتى النص القابل للتحرير.

```html
<style>
  .e { caret-color:#3d7a5a; padding:8px; border:2px dashed #7a4a1d; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<div class="e" contenteditable>اضغط هنا واكتب</div>
```



## mistakes

### مؤشر مخفي

```css bad
input { caret-color:transparent; }  /* المستخدم تايه */
```

```css good
input { caret-color:#c9772f; }
```

المؤشر مهم للإرشاد.

## quiz

### caret-color بتغيّر؟
- [ ] لون النص
- [x] لون مؤشر الكتابة
- [ ] لون الحد
- [ ] الخلفية

المؤشر.

### الافتراضي؟
- [x] auto
- [ ] red
- [ ] none
- [ ] black

auto.

## refs

- [MDN: caret-color](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color)
