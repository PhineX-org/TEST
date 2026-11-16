---
id: read-write
kind: pseudoclass
cat: pc-form
chip: :read-write
title: قابل للتعديل
en: CSS :read-write pseudo-class
status: stable
support: all
size: compact
mdn: :read-write
summary: الحالة read-write بتنطبق على العناصر القابلة للتعديل: حقول الكتابة العادية وعناصر contenteditable.
keywords: :read-write, read-write, تعديل, contenteditable, input
related: read-only, focus, enabled
---

## intro

`:read-write` بتنطبق على **العناصر اللي المستخدم يقدر يعدّل محتواها**: حقول `input` و`textarea` العادية (غير readonly وغير disabled)، وأي عنصر عليه **`contenteditable`**. هي عكس [[read-only]]. بتفيد لتنسيق **محررات النصوص** وحقول الإدخال بشكل يوحي بإمكانية التعديل (حد خفيف، مؤشر نص). والعناصر العادية (فقرة، عنوان) مبتبقاش read-write إلا لو ضفت `contenteditable`، وده بيحوّل أي عنصر لمحرر مصغّر.

## try

```html
<style>
  div[contenteditable]:read-write { border:2px dashed #3d7a5a; padding:8px; background:#f3ede0; color:#3d2c18; border-radius:6px; }
</style>
<div contenteditable>اضغط واكتب هنا</div>
```

## syntax

```css nolive
input:read-write { border-color: #3d7a5a; }
[contenteditable]:read-write { outline: 1px dashed; }
```

- input/textarea وcontenteditable.

## use

- تنسيق محرر نصوص.
- حدود لحقول قابلة للتعديل.

## avoid

- افتراض إنها بتشمل readonly.

## examples

### 1) contenteditable
حد مميز.

```html
<style>
  .e { padding:8px; border-radius:6px; color:#3d2c18; background:#f3ede0; border:2px solid transparent; }
  .e:read-write { border-color:#3d7a5a; }
</style>
<div class="e" contenteditable>عدّل هنا</div>
```



### 2) input
الحقل العادي.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:read-write { border-color:#3d7a5a; }
</style>
<input value="قابل للتعديل"><input value="readonly" readonly>
```



### 3) textarea
نفس الفكرة.

```html
<style>
  textarea { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  textarea:read-write { border-color:#c9772f; }
</style>
<textarea rows="2">قابل للتعديل</textarea>
```



## mistakes

### حقل disabled

```css bad
input:read-write { }  /* مبتنطبقش على disabled */
```

```css good
input:read-write:enabled { }
```

disabled مش read-write.

## quiz

### read-write بتنطبق على؟
- [x] عناصر قابلة للتعديل
- [ ] readonly
- [ ] الصور
- [ ] الروابط

قابلة للتحرير.

### مقابلها؟
- [x] read-only
- [ ] checked
- [ ] focus
- [ ] link

read-only.

## refs

- [MDN: :read-write](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-write)
