---
id: selection
kind: pseudoelement
cat: pseudo-elements
chip: ::selection
title: النص المحدد
en: CSS ::selection pseudo-element
status: stable
support: all
mdn: ::selection
summary: العنصر الوهمي selection بينسّق النص اللي المستخدم بيحدده بالماوس: لون الخلفية والنص. تفصيلة بتدّي هوية.
keywords: ::selection, selection, تحديد النص, highlight, لون التحديد
related: color, background-color, text-shadow, pseudo-guide
---

## intro

`::selection` بتنسّق **الجزء من النص اللي المستخدم حدّده** (بالماوس أو الكيبورد). الافتراضي أزرق أو رمادي حسب المتصفح. تخصيصه تفصيلة صغيرة بتخلي موقعك بتاع هوية خاصة: لون تحديد دافئ يتماشى مع التصميم.

الخصائص المسموحة محدودة: [[color]] و`background-color` و`text-decoration` و`text-shadow`. مفيش `font-size` ولا هوامش.

**تنبيهات**:
- اتأكد من **التباين** بين لون النص المحدد وخلفية التحديد، وإلا النص يتعب العين.
- **متشيلش** التحديد تماماً (`background: transparent`)؛ المستخدم محتاج يشوفه.
- في Firefox القديم محتاج `::-moz-selection`.

وممكن تطبقها على الصفحة كلها: `::selection { ... }` أو على عناصر معينة (`code::selection`). وبما إن المستخدم بيحدد النص كتير عشان ينسخه أو يقراه، فلون تحديد مريح بيحسّن التجربة فعلاً، خصوصاً في الثيم الغامق.

## try

```html
<style>
  p { margin:0; font-size:1.3rem; color:#3d2c18; }
  ::selection { background:#c9772f; color:#f3ede0; }
</style>
<p>حدّد النص ده بالماوس وشوف اللون الدافئ</p>
```

## syntax

```css nolive
::selection { background: #c9772f; color: #f3ede0; }
code::selection { background: #3d7a5a; }
```

- خصائص محدودة.
- تباين كافي.

## use

- لون تحديد بهوية الموقع.
- تحديد مميز للأكواد.
- تحسين الراحة البصرية.

## avoid

- إخفاء التحديد.
- تباين ضعيف بين النص والخلفية.

## examples

### 1) لون دافئ
تحديد برتقالي.

```html
<style>
  p { margin:0; font-size:1.3rem; color:#3d2c18; }
  p::selection { background:#c9772f; color:#f3ede0; }
</style>
<p>حدّد جزء من الجملة دي</p>
```



### 2) تحديد للكود
ألوان مختلفة.

```html
<style>
  code { padding:6px 10px; background:#3d2c18; color:#f3ede0; border-radius:6px; direction:ltr; display:inline-block; }
  code::selection { background:#3d7a5a; color:#f3ede0; }
</style>
<code>const x = 10;</code>
```



### 3) خلفية بسيطة
وبدون تغيير النص.

```html
<style>
  p { margin:0; font-size:1.3rem; color:#3d2c18; }
  p::selection { background:#e4c490; }
</style>
<p>حدّد هنا</p>
```



### 4) ظل للنص المحدد
text-shadow مسموح.

```html
<style>
  p { margin:0; font-size:1.3rem; color:#3d2c18; }
  p::selection { background:#3d7a5a; color:#f3ede0; text-shadow:0 1px 0 rgba(0,0,0,.3); }
</style>
<p>حدّد هنا مرة تانية</p>
```



## mistakes

### إخفاء التحديد

```css bad
::selection { background:transparent; }
```

```css good
::selection { background:#c9772f; color:#f3ede0; }
```

المستخدم محتاج يشوفه.

### تباين ضعيف

```css bad
::selection { background:#efe0bd; color:#f3ede0; }
```

```css good
::selection { background:#c9772f; color:#f3ede0; }
```

لازم تباين.

## quiz

### selection بتنسّق؟
- [x] النص المحدد
- [ ] أول حرف
- [ ] أول سطر
- [ ] العنصر

اللي المستخدم حدده.

### الخصائص؟
- [x] محدودة
- [ ] كل شيء
- [ ] لا شيء
- [ ] الهوامش

لون وخلفية.

### خطأ شائع؟
- [x] إخفاء التحديد
- [ ] تغيير اللون
- [ ] ظل
- [ ] تباين

مشكلة وصولية.

## refs

- [MDN: ::selection](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection)
