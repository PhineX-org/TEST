---
id: read-only
kind: pseudoclass
cat: pc-form
chip: :read-only
title: للقراءة فقط
en: CSS :read-only pseudo-class
status: stable
support: all
size: compact
mdn: :read-only
summary: الحالة read-only بتنطبق على العناصر اللي المستخدم مبيقدرش يعدّلها: حقول readonly أو disabled وأغلب العناصر العادية.
keywords: :read-only, read-only, للقراءة, readonly, حقل
related: read-write, disabled, enabled
---

## intro

`:read-only` بتنطبق على العناصر اللي **المستخدم مبيقدرش يعدّل محتواها**. ودي بتشمل: حقول `readonly` و`disabled`، وكمان **أغلب العناصر العادية** (فقرات، divs…) لأنها مش قابلة للتحرير أصلاً. لو عايز تنسق **الحقول** بس استخدم `input:read-only`. ومقابلها [[read-write]] (قابل للتعديل). مفيدة لتمييز الحقول اللي بتعرض بيانات محسوبة بشكل يوضح إنها مش للتعديل، ولتجنّب إن المستخدم يحاول يكتب فيها ويتلخبط.

## try

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:read-only { background:#e8dcc2; border-style:dashed; }
</style>
<input value="للقراءة فقط" readonly><input value="قابل للتعديل">
```

## syntax

```css nolive
input:read-only { background: #eee; }
input:read-write { background: #fff; }
```

- حقول readonly وdisabled.
- وكمان عناصر عادية.

## use

- تمييز الحقول المحسوبة.
- تنسيق البيانات غير القابلة للتعديل.

## avoid

- تطبيقها بدون تحديد input (بتشمل كل عنصر عادي).

## examples

### 1) حقل readonly
خلفية مميزة.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:read-only { background:#e8dcc2; }
</style>
<input value="مقروء فقط" readonly>
```



### 2) مقارنة
read-write مقابل read-only.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; color:#3d2c18; margin:3px; }
  input:read-only { background:#e8dcc2; } input:read-write { background:#f3ede0; }
</style>
<input value="مقروء" readonly><input value="قابل للتعديل">
```



### 3) حقل محسوب
إجمالي تلقائي.

```html
<style>
  input { padding:8px; border:2px dashed #bda27a; border-radius:6px; background:#efe7d4; color:#3d2c18; font-weight:bold; }
  input:read-only { cursor:default; }
</style>
<input value="الإجمالي: 350" readonly>
```



## mistakes

### عنصر عادي يتأثر

```css bad
*:read-only { background:red; }  /* كل الصفحة */
```

```css good
input:read-only { }
```

حدد input.

## quiz

### read-only بتشمل؟
- [x] readonly وعناصر عادية
- [ ] الأزرار فقط
- [ ] الصور
- [ ] الروابط

غير القابل للتعديل.

### مقابلها؟
- [x] read-write
- [ ] checked
- [ ] valid
- [ ] focus

read-write.

## refs

- [MDN: :read-only](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only)
