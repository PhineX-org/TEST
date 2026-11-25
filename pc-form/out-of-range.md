---
id: out-of-range
kind: pseudoclass
cat: pc-form
chip: :out-of-range
title: خارج النطاق
en: CSS :out-of-range pseudo-class
status: stable
support: all
size: compact
mdn: :out-of-range
summary: الحالة out-of-range بتنطبق على حقول الأرقام والتواريخ اللي قيمتها خارج min وmax.
keywords: :out-of-range, out-of-range, نطاق, min, max, خطأ
related: in-range, invalid, valid
---

## intro

`:out-of-range` بتنطبق على حقل رقمي أو تاريخ **قيمته خارج النطاق** المحدد بـ `min` و`max`. مثلاً حقل `min=1 max=10` والمستخدم كتب `20`. بتستخدمها لإظهار **تحذير** (حد أحمر وتلميح). وعكسها [[in-range]]. وزي [[invalid]]، لازم تضيف **رسالة نصية** مش اللون فقط للوصولية. وبتنطبق مع حقول الأرقام والتواريخ والوقت والـ range لو فيها `min` أو `max`، وفي الحقول من غير نطاق مبتنطبقش أبداً.

## try

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:out-of-range { border-color:#b5551f; background:#fbe3d4; }
</style>
<input type="number" min="1" max="10" value="20">
```

## syntax

```css nolive
input:out-of-range { border-color: #b5551f; }
```

- عكس :in-range.

## use

- تحذير قيمة خارج النطاق.
- تلوين حقول التواريخ المرفوضة.

## avoid

- الاعتماد على اللون وحده.

## examples

### 1) رقم زايد
بيتلوّن أحمر.

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:out-of-range { border-color:#b5551f; background:#fbe3d4; }
</style>
<input type="number" min="1" max="10" value="15">
```



### 2) رسالة تحذير
تظهر مع الحالة.

```html
<style>
  .w { display:none; color:#b5551f; font-size:.9rem; }
  input:out-of-range + .w { display:block; }
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<input type="number" min="1" max="10" value="15"><div class="w">القيمة بين 1 و10</div>
```



### 3) تاريخ برّه
خارج الفترة.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:out-of-range { border-color:#b5551f; }
</style>
<input type="date" min="2026-01-01" max="2026-12-31" value="2027-01-01">
```



## mistakes

### اللون فقط

```css bad
input:out-of-range { border-color:red; }
```

```css good
input:out-of-range + .msg { display:block; }
```

ضيف رسالة.

## quiz

### out-of-range بتنطبق على؟
- [x] قيمة خارج min/max
- [ ] قيمة صحيحة
- [ ] نص
- [ ] زرار

خارج النطاق.

### عكسها؟
- [x] in-range
- [ ] invalid
- [ ] target
- [ ] link

in-range.

## refs

- [MDN: :out-of-range](https://developer.mozilla.org/en-US/docs/Web/CSS/:out-of-range)
