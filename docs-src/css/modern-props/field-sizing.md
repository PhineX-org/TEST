---
id: field-sizing
kind: property
cat: modern-props
chip: field-sizing
title: تحجيم الحقول حسب المحتوى
en: CSS field-sizing property
status: stable
support: all
size: compact
mdn: field-sizing
summary: field-sizing: content بتخلّي textarea وinput وselect يكبروا تلقائياً حسب المحتوى بدون JavaScript. (دعم محدود: Chromium).
keywords: field-sizing, content, textarea, auto-grow, حقل يكبر
related: resize, width, height, appearance
---

## intro

الخاصية `field-sizing` بتخلّي **حقول النماذج** (`textarea` و`input` و`select`) **تكبر وتصغر تلقائياً حسب المحتوى** من غير أي JavaScript. الافتراضي **`fixed`**: الحقل بحجم ثابت زي ما هو معتاد. و**`content`**: الحقل بيتحجم على قد اللي مكتوب فيه، فـ `textarea` بتطوّل مع كل سطر جديد! كانت قبل كده تحتاج كود JS. مثال: `textarea { field-sizing: content; min-block-size: 3lh; }`. نبهة: الدعم بدأ في **Chromium** (Chrome وEdge) وتأخر في غيره، فاستخدمه كـ **تحسين تدريجي** (progressive enhancement): الحقل يشتغل عادي في المتصفحات القديمة.

## try

```html
<style>
  textarea { field-sizing:content; min-height:2.2em; max-height:8em; width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<textarea>اكتب هنا وهتشوف الحقل بيكبر (في Chrome وEdge)</textarea>
```

## syntax

```css nolive
textarea { field-sizing: content; }
input { field-sizing: content; min-inline-size: 6ch; }
```

- **القيمة المبدئية**: `fixed`.
- دعم Chromium أولاً.
- حط min/max للتحكم.

## values

### content
الحقل يتحجم حسب المحتوى.

### fixed
حجم ثابت (الافتراضي).

## use

- textarea بتكبر مع الكتابة.
- input بعرض على قد النص.

## avoid

- الاعتماد عليها كوظيفة أساسية في كل المتصفحات.

## examples

### 1) textarea بتكبر
content.

```html
<style>
  textarea { field-sizing:content; min-height:2.4em; max-height:9em; width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<textarea>اكتب كذا سطر...</textarea>
```



### 2) input بعرض المحتوى
عرض متغير.

```html
<style>
  input { field-sizing:content; min-inline-size:6ch; padding:6px 10px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<input value="اكتب اسمك">
```



### 3) ثابت للمقارنة
fixed.

```html
<style>
  textarea { field-sizing:fixed; width:90%; height:3em; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; }
</style>
<textarea>حجم ثابت</textarea>
```



## mistakes

### بدون حدود

```css bad
textarea { field-sizing:content; }  /* ممكن يطول جداً */
```

```css good
textarea { field-sizing:content; max-height:12em; }
```

حط max.

## quiz

### field-sizing: content بتعمل؟
- [x] الحقل يتحجم حسب المحتوى
- [ ] يثبت الحجم
- [ ] يخفي الحقل
- [ ] يلوّنه

تلقائي.

### الدعم؟
- [x] Chromium أولاً
- [ ] كل المتصفحات
- [ ] Safari فقط
- [ ] لا أحد

محدود.

## refs

- [MDN: field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing)
