---
id: selectedcontent
kind: element
cat: choices
tag: selectedcontent
title: محتوى المختار (selectedcontent)
en: HTML selectedcontent element
status: experimental
display: contents
void: no
support: limited
support_note: تجريبي، متاح في المتصفحات المبنية على Chromium الحديثة مع select القابل للتخصيص (appearance: base-select).
size: compact
summary: عنصر تجريبي جوه زرار select القابل للتخصيص، بينسخ تلقائياً محتوى الـ option المختار حالياً (بما فيه الصور والتنسيق) ويعرضه في زرار القايمة المغلقة.
keywords: selectedcontent, select مخصص, base-select, customizable select, option, button, appearance, تجريبي, زرار القايمة
related: select, option, button
---

## intro

الـ `<select>` العادي بيعرض **نص** الاختيار المختار فقط في شكله المقفول. حتى لو الـ `<option>` فيه أيقونة وصورة وتنسيق، الزرار المقفول مبيعرضهمش. المتصفحات الحديثة جاية بـ **select قابل للتخصيص** (Customizable Select) بتفعّله بـ CSS: `appearance: base-select`، وبيسمح لك تحط **أي HTML** جوه الـ `<option>`.

والـ `<selectedcontent>` عنصر **تجريبي** بتحطه جوه **`<button>`** اللي بتحطه كأول ابن في `<select>`: وظيفته **ينسخ تلقائياً محتوى الـ `<option>` المختار** ويعرضه في الزرار. يعني لو الـ option فيه صورة علم ونص «مصر»، الزرار المقفول يعرض العلم والنص كمان.

> [!warn] **تجريبي**: الشكل والسلوك لسه بيتغيّر والدعم محدود. جرّبه في Chrome الحديث ومتعتمدش عليه في الإنتاج.

> [!key] `<select><button><selectedcontent></selectedcontent></button>…options…</select>` مع `select { appearance: base-select }`.

## try

مثال توضيحي (تجريبي، ممكن مايظهرش في كل المتصفحات).

```html nolive
<style>
  select, ::picker(select) { appearance: base-select; }
</style>
<select>
  <button><selectedcontent></selectedcontent></button>
  <option value="eg">🇪🇬 مصر</option>
  <option value="sa">🇸🇦 السعودية</option>
</select>
```

## syntax

```html nolive
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <option>…</option>
</select>
```

- `<button>` — **أول ابن** في `<select>`، بيصير زرار القايمة.
- `<selectedcontent>` — **بينسخ** محتوى الاختيار المختار.
- `appearance: base-select` — **بيفعّل** النمط القابل للتخصيص.

## use

- لقوايم منسدلة بصور وأيقونات في الزرار المقفول.
- لتخصيص كامل لمظهر الـ select.

## avoid

- متعتمدش عليه في موقع إنتاج حالياً.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class {experimental}
للتنسيق (تجريبي مثل العنصر نفسه).

## examples

### 1) قايمة أعلام
أيقونة ونص.

```html nolive
<style>
  select, ::picker(select) { appearance: base-select; }
  option { display: flex; gap: 8px; align-items: center; }
</style>
<select>
  <button><selectedcontent></selectedcontent></button>
  <option value="eg"><img src="eg.svg" alt="" width="20"> مصر</option>
  <option value="sa"><img src="sa.svg" alt="" width="20"> السعودية</option>
</select>
```

- الصورة جوه الـ `<option>` مسموحة مع `base-select` (على عكس النمط القديم).
- الـ `<selectedcontent>` بينسخ الصورة والنص للزرار المقفول.
- من غيره الزرار كان هيعرض نص الاختيار بس.

### 2) تنسيق الزرار
CSS.

```html nolive
<style>
  select { appearance: base-select; }
  select button { padding: 8px 14px; border: 2px solid #39ff14; border-radius: 10px; background: #0b0b10; color: #fff; }
</style>
<select>
  <button><selectedcontent></selectedcontent></button>
  <option>HTML</option>
  <option>CSS</option>
</select>
```

- الزرار دلوقتي عنصر عادي تقدر تنسّقه بالكامل.
- ده مستحيل مع الـ select القديم.
- ممكن كمان تنسّق القايمة المنسدلة نفسها بـ `::picker(select)`.

### 3) اختبار الدعم
CSS `@supports`.

```html nolive
<style>
  @supports (appearance: base-select) {
    select { appearance: base-select; }
  }
</style>
<select>
  <button><selectedcontent></selectedcontent></button>
  <option>خيار</option>
</select>
```

- `@supports` بيطبّق التخصيص بس في المتصفحات المدعومة.
- في المتصفحات غير المدعومة الـ select يشتغل بشكله العادي (المتصفح بيتجاهل `<button>` الغريب جواه).
- ده الأسلوب الآمن لتجربة الميزات التجريبية.

## rules

- parents: [[button]] اللي هو أول ابن في [[select]].
- children: **مفيش** (بيتملى تلقائياً).
- closing: الوسم الختامي `</selectedcontent>` إجباري.
- role: مفيش.
- dom: `HTMLSelectedContentElement` (تجريبي).
- layout: `display: contents`.

## mistakes

### استخدامه برّه select
```html bad
<div><selectedcontent></selectedcontent></div>
```
```html good
<select><button><selectedcontent></selectedcontent></button><option>أ</option></select>
```
ليه؟ بيشتغل بس جوه زرار الـ select القابل للتخصيص.

## a11y

- المحتوى المنسوخ لازم يكون متاح (صور بـ `alt` أو `alt=""` لو زينة).
- اتأكد إن الـ select لسه بيشتغل بالكيبورد بعد التخصيص.

## tips

- جرّبه بـ `@supports`.
- تابع توثيق Chrome لحالة الميزة.

## quiz

### إيه وظيفة `<selectedcontent>`؟
- [ ] إضافة اختيار جديد
- [x] عرض محتوى الاختيار المختار داخل زرار الـ select
- [ ] حذف اختيار
- [ ] ترتيب القايمة
بينسخه تلقائياً.

### إيه الخاصية اللي بتفعّل الـ select القابل للتخصيص؟
- [x] `appearance: base-select`
- [ ] `custom-select`
- [ ] `select: true`
- [ ] `display: select`
خاصية CSS.

## refs

- [MDN: selectedcontent](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/selectedcontent)
- [Chrome: Customizable select](https://developer.chrome.com/blog/rfc-customizable-select)
