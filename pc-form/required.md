---
id: required
kind: pseudoclass
cat: pc-form
chip: :required
title: حقل إجباري
en: CSS :required pseudo-class
status: stable
support: all
mdn: :required
summary: الحالة required بتنطبق على حقول النموذج اللي عليها الخاصية required. لتمييز الحقول الإجبارية بعلامة نجمة أو لون.
keywords: :required, required, إجباري, نموذج, form, نجمة
related: optional, valid, invalid, placeholder-shown, pseudo-guide
---

## intro

`:required` بتنطبق على **حقول النموذج** (`input` و`select` و`textarea`) **اللي عليها الخاصية `required`** يعني لازم المستخدم يملاها قبل الإرسال. بتستخدمها لتمييز الحقول الإجبارية بصرياً، مثلاً بإضافة **نجمة حمراء (\*)** جنب الاسم، أو بلون حد مختلف.

عشان تحط نجمة جنب الـ label بنستخدم حيلة: `label:has(+ input:required)::after { content: " *"; }` ([[has]]). ولو الحقل جوه الـ label مباشرة: `label:has(input:required)::after`.

مقابلها [[optional]] (غير إجباري). وبتتكامل مع [[valid]] و[[invalid]] اللي بيتحكموا في شكل الحقل حسب صلاحية القيمة. وده بيخلّي نموذجك واضح من أول نظرة: الإجباري ظاهر، والاختياري هادي.

> [!tip] متعتمدش على اللون للنجمة فقط؛ قول في النص «حقل إجباري» أو استخدم `aria-required` لقارئ الشاشة.

## try

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:required { border-inline-start:5px solid #b5551f; }
</style>
<input required placeholder="إجباري"><input placeholder="اختياري">
```

## syntax

```css nolive
input:required { border-color: #b5551f; }
label:has(input:required)::after { content: ' *'; color: #b5551f; }
```

- الحقل لازم عليه required.
- مقابلها :optional.

## use

- علامة نجمة للحقول الإجبارية.
- لون حد مميز.
- تنسيق مختلف حسب الحالة.

## avoid

- الاعتماد على اللون وحده.
- تنسيق required بدون توضيح نصي للمستخدم.

## examples

### 1) حد جانبي
تمييز الإجباري.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; display:block; }
  input:required { border-inline-start:5px solid #b5551f; }
</style>
<input required placeholder="الاسم (إجباري)"><input placeholder="الهاتف (اختياري)">
```



### 2) نجمة بعد التسمية
باستخدام has.

```html
<style>
  label { display:block; margin:6px 0; color:#3d2c18; }
  label:has(input:required)::after { content:' *'; color:#b5551f; font-weight:bold; }
  input { padding:6px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; }
</style>
<label>الاسم <input required></label><label>ملاحظات <input></label>
```



### 3) خلفية مميزة
لون خفيف.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; color:#3d2c18; margin:3px; display:block; background:#f3ede0; }
  input:required { background:#fbeed0; }
</style>
<input required placeholder="إجباري"><input placeholder="عادي">
```



### 4) select وtextarea
مش input بس.

```html
<style>
  select, textarea { padding:6px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; display:block; margin:3px; }
  :required { border-color:#b5551f; }
</style>
<select required><option>اختر</option></select><textarea required placeholder="إجباري"></textarea>
```



## mistakes

### الاعتماد على اللون

```css bad
input:required { border-color:red; }  /* وحده */
```

```css good
label:has(input:required)::after { content:" *"; }
```

ضيف نجمة ونص.

### required على عنصر غير مدعوم

```css bad
div:required { }
```

```css good
input:required { }
```

لعناصر النموذج فقط.

## quiz

### required بتنطبق على؟
- [x] حقول عليها required
- [ ] كل الحقول
- [ ] الأزرار
- [ ] الصور

الإجبارية.

### لنجمة جنب label؟
- [x] label:has(input:required)::after
- [ ] input::before
- [ ] label:hover
- [ ] p::after

has مع after.

### عكسها؟
- [x] optional
- [ ] valid
- [ ] invalid
- [ ] checked

optional.

## refs

- [MDN: :required](https://developer.mozilla.org/en-US/docs/Web/CSS/:required)
