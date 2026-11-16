---
id: optional
kind: pseudoclass
cat: pc-form
chip: :optional
title: حقل اختياري
en: CSS :optional pseudo-class
status: stable
support: all
size: compact
mdn: :optional
summary: الحالة optional بتنطبق على حقول النموذج اللي مش عليها required. عكس required.
keywords: :optional, optional, اختياري, نموذج
related: required, valid, invalid
---

## intro

`:optional` بتنطبق على **حقول النموذج الغير إجبارية** (اللي مش عليها `required`). هي عكس [[required]]. مفيدة لتمييز الحقول الاختيارية بنص خفيف زي «(اختياري)» أو لون أهدى، بحيث المستخدم يعرف إنها ممكن يتخطّاها ويركّز على الإجباري. غالباً هتستخدم تنسيق الأساس للعنصر وتضيف الاستثناء للـ required بدل الاعتماد على optional. وفي النماذج الطويلة، تسمية «(اختياري)» بتريّح المستخدم وتقلل تسرّبه من النموذج.

## try

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:optional { border-style:dashed; }
</style>
<input required placeholder="إجباري"><input placeholder="اختياري">
```

## syntax

```css nolive
input:optional { border-style: dashed; }
label:has(input:optional)::after { content: ' (اختياري)'; }
```

- عكس :required.

## use

- تمييز الحقول الاختيارية.
- نص «اختياري» تلقائي.

## avoid

- الاعتماد عليها بدل required للتصميم الأساسي.

## examples

### 1) نص اختياري
بجوار التسمية.

```html
<style>
  label { display:block; margin:6px 0; color:#3d2c18; }
  label:has(input:optional)::after { content:' (اختياري)'; color:#8a7a62; font-size:.85em; }
  input { padding:6px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; }
</style>
<label>الاسم <input required></label><label>الهاتف <input></label>
```



### 2) حد متقطع
للاختياري.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:optional { border-style:dashed; }
</style>
<input required placeholder="إجباري"><input placeholder="اختياري">
```



### 3) خلفية أهدى
تمييز بلون.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; color:#3d2c18; margin:3px; background:#f3ede0; }
  input:optional { background:#efe7d4; }
</style>
<input placeholder="اختياري"><input required placeholder="إجباري">
```



## mistakes

### عدم توضيح الاختياري

```css bad
<input>  /* المستخدم مش عارف يتخطاه */
```

```css good
label:has(input:optional)::after { content:" (اختياري)"; }
```

يوضّح للمستخدم.

## quiz

### optional عكس؟
- [x] required
- [ ] valid
- [ ] checked
- [ ] disabled

required.

### بتنطبق على؟
- [x] حقول بدون required
- [ ] كل الأزرار
- [ ] الصور
- [ ] الروابط

غير الإجباري.

## refs

- [MDN: :optional](https://developer.mozilla.org/en-US/docs/Web/CSS/:optional)
