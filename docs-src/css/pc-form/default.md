---
id: default
kind: pseudoclass
cat: pc-form
chip: :default
title: العنصر الافتراضي
en: CSS :default pseudo-class
status: stable
support: all
size: compact
mdn: :default
summary: الحالة default بتنطبق على زرار الإرسال الافتراضي في النموذج وعلى radio وcheckbox المحددة مبدئياً.
keywords: :default, default, افتراضي, submit, checked
related: checked, required, optional
---

## intro

`:default` بتنطبق على **العناصر اللي هي الاختيار الافتراضي** في مجموعتها: زرار **الإرسال الافتراضي** في النموذج (أول زرار submit)، وعلى `checkbox` و`radio` اللي عليها `checked` **في الـ HTML الأصلي** (مش اللي المستخدم حدّدها). مفيدة لتمييز «الاختيار الموصى به». وعكس `:checked` بتفضل ثابتة لو المستخدم غيّر الاختيار. يعني لو عندك خيارين والأول `checked` في الـ HTML، يفضل الأول `:default` حتى لو المستخدم اختار التاني.

## try

```html
<style>
  input:default + span { font-weight:bold; color:#3d7a5a; }
  label { color:#3d2c18; margin:0 6px; }
</style>
<label><input type="radio" name="x" checked><span>الخيار الأساسي</span></label><label><input type="radio" name="x"><span>خيار آخر</span></label>
```

## syntax

```css nolive
input:default { }
button:default { box-shadow: 0 0 0 2px #c9772f; }
```

- من الـ HTML الأصلي.
- تفضل ثابتة لو المستخدم غيّر.

## use

- تمييز الخيار الموصى به.
- تمييز زرار الإرسال الأساسي.

## avoid

- الخلط مع :checked.

## examples

### 1) radio افتراضي
يتميز بخط عريض.

```html
<style>
  input:default + span { font-weight:bold; color:#3d7a5a; }
  label { color:#3d2c18; margin:0 6px; }
</style>
<label><input type="radio" name="y" checked><span>موصى به</span></label><label><input type="radio" name="y"><span>عادي</span></label>
```



### 2) زرار إرسال
الافتراضي.

```html
<style>
  button:default { box-shadow:0 0 0 3px rgba(201,119,47,.5); }
  button { padding:8px 16px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; font-weight:bold; margin:3px; }
</style>
<form onsubmit="return false"><button type="submit">إرسال</button><button type="button">إلغاء</button></form>
```



### 3) مقابل checked
default ثابتة.

```html
<style>
  input:default { outline:2px solid #c9772f; }
  input:checked { accent-color:#3d7a5a; }
</style>
<input type="checkbox" checked> <input type="checkbox">
```



## mistakes

### الخلط مع checked

```css bad
input:default { }  /* مبتتغيرش مع المستخدم */
```

```css good
input:checked { }
```

checked للحالة الحالية.

## quiz

### default بتنطبق على؟
- [x] الاختيار الافتراضي الأصلي
- [ ] أي حقل
- [ ] الصور
- [ ] الروابط

من HTML.

### تتغيّر لو المستخدم غيّر؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] فقط radio

ثابتة.

## refs

- [MDN: :default](https://developer.mozilla.org/en-US/docs/Web/CSS/:default)
