---
id: in-range
kind: pseudoclass
cat: pc-form
chip: :in-range
title: داخل النطاق
en: CSS :in-range pseudo-class
status: stable
support: all
size: compact
mdn: :in-range
summary: الحالة in-range بتنطبق على حقول الأرقام والتواريخ اللي قيمتها داخل min وmax.
keywords: :in-range, in-range, نطاق, min, max, number
related: out-of-range, valid, invalid
---

## intro

`:in-range` بتنطبق على حقول (`type="number"` و`range` و`date`…) اللي ليها `min` و/أو `max` **وقيمتها داخل النطاق**. هي عكس [[out-of-range]]. بتستخدمها لإظهار **تأكيد** أن القيمة مقبولة. مهمة عشان تعمل تغذية راجعة فورية في مدخلات رقمية. وتحتاج إن الحقل فيه `min` أو `max` أصلاً، وإلا مبتنطبقش. مثال بسيط: حقل «العمر» بين 18 و60؛ لو كتب 25 يبقى داخل النطاق، ولو كتب 70 يبقى خارجه. والمتصفح بيحدد الحالة تلقائياً وإنت بس بتنسّق.

## try

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:in-range { border-color:#3d7a5a; }
  input:out-of-range { border-color:#b5551f; }
</style>
<input type="number" min="1" max="10" value="5">
```

## syntax

```css nolive
input:in-range { border-color: #3d7a5a; }
```

- محتاجة min أو max.

## use

- تأكيد قيمة مقبولة.
- تنسيق مدخلات رقمية.

## avoid

- استخدامها بدون min/max.

## examples

### 1) رقم
داخل النطاق.

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:in-range { border-color:#3d7a5a; background:#e6f0dc; }
</style>
<input type="number" min="1" max="10" value="7">
```



### 2) تاريخ
في فترة.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:in-range { border-color:#3d7a5a; }
</style>
<input type="date" min="2026-01-01" max="2026-12-31" value="2026-06-01">
```



### 3) بدون min/max
مبتنطبقش.

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; background:#f3ede0; color:#3d2c18; }
  input:in-range { border-color:#3d7a5a; }
</style>
<input type="number" value="7">
```



## mistakes

### بدون min/max

```css bad
input:in-range { }  /* مفيش نطاق */
```

```css good
<input type="number" min="1" max="10">
```

لازم نطاق.

## quiz

### in-range محتاجة؟
- [x] min أو max
- [ ] required
- [ ] pattern
- [ ] href

نطاق.

### عكسها؟
- [x] out-of-range
- [ ] valid
- [ ] checked
- [ ] empty

out-of-range.

## refs

- [MDN: :in-range](https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range)
