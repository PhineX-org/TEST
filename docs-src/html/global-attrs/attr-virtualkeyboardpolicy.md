---
id: attr-virtualkeyboardpolicy
kind: attribute
cat: global-attrs
chip: virtualkeyboardpolicy
title: خاصية سياسة لوحة المفاتيح
en: HTML virtualkeyboardpolicy global attribute (experimental)
status: experimental
support: limited
support_note: مدعومة في متصفحات كروميوم على أجهزة فيها لوحة مفاتيح افتراضية فقط.
size: compact
mdn: Global_attributes/virtualkeyboardpolicy
summary: خاصية virtualkeyboardpolicy تجريبية بتتحكم في ظهور لوحة المفاتيح الافتراضية عند الفوكس على عنصر قابل للتعديل: auto تظهر تلقائياً، وmanual بتفصل الفوكس عن اللوحة.
keywords: virtualkeyboardpolicy, لوحة مفاتيح افتراضية, VirtualKeyboard API, manual, auto, contenteditable, موبايل, تجريبي
related: attr-inputmode, attr-contenteditable, attr-enterkeyhint, input, textarea
---

## intro

على الموبايل، لما تدوس على حقل نص بتظهر **لوحة المفاتيح الافتراضية** تلقائياً. أحياناً (في تطبيقات بتعمل لوحة مفاتيح مخصّصة أو محرر نصوص متقدّم) عايز **تتحكم أنت** في ظهورها. الخاصية `virtualkeyboardpolicy` على عنصر قابل للتعديل (`input` أو `textarea` أو [[attr-contenteditable]]): **`auto`** (أو فاضي) لوحة تظهر لما العنصر ياخد الفوكس أو يتدوس، و**`manual`** يفصل الفوكس عن اللوحة، وإنت تعرضها بنفسك بـ **VirtualKeyboard API** (`navigator.virtualKeyboard.show()`). تجريبية ومحدودة الدعم.

## try

```html
<div contenteditable virtualkeyboardpolicy="manual" style="border:2px dashed #94a3b8; padding:10px; min-height:40px">لوحة المفاتيح مش بتفتح تلقائياً (على أجهزة تدعم)</div>
<button onclick="navigator.virtualKeyboard && navigator.virtualKeyboard.show()">أظهر اللوحة يدوياً</button>
```

## syntax

```html nolive
<div contenteditable virtualkeyboardpolicy="manual"></div>
<script>navigator.virtualKeyboard.show();</script>
```

- `auto` — **تلقائي** عند الفوكس.
- `manual` — **يدوي**: إنت اللي بتظهرها.

## use

- محررات نصوص بلوحة مفاتيح مخصّصة.
- تطبيقات بتتحكم يدوياً في اللوحة.

## avoid

- متعتمدش عليها: محدودة الدعم.

## examples

### 1) محرر بلوحة يدوية
مثال على manual.

```html
<div contenteditable virtualkeyboardpolicy="manual" id="ed" style="border:1px solid #94a3b8; padding:8px; min-height:40px"></div>
<button onclick="if (navigator.virtualKeyboard) navigator.virtualKeyboard.show(); else alert('غير مدعوم هنا')">أظهر</button>
```

- الفوكس على المحرر مش بيفتح اللوحة.
- الزرار بيظهرها عن طريق API.
- فحص `navigator.virtualKeyboard` ضروري.

### 2) السلوك التلقائي
مثال على auto.

```html
<input virtualkeyboardpolicy="auto" placeholder="اللوحة بتظهر عند الفوكس" style="width:100%; padding:6px">
```

- ده السلوك الافتراضي.
- مش لازم تكتبها.
- استخدمها لإعادة التفعيل لو الأب منعها.

### 3) قراءة القيمة
مثال على el.virtualKeyboardPolicy.

```html
<div id="d" contenteditable virtualkeyboardpolicy="manual"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'القيمة: ' + (document.getElementById('d').virtualKeyboardPolicy || '—');</script>
```

- الخاصية متاحة في DOM في المتصفحات الداعمة.
- قد تكون `undefined`.
- اعتمد على فحص الدعم.

## mistakes

### نسيان فحص الدعم
```html bad
navigator.virtualKeyboard.show()
```
```html good
if (navigator.virtualKeyboard) navigator.virtualKeyboard.show();
```
ليه؟ الـ API مش موجودة في كل المتصفحات.

## a11y

- لا تمنع اللوحة بدون بديل واضح: ممكن المستخدم ميعرفش يكتب.
- وفّر زرار ظاهر لإظهار اللوحة في وضع manual.

## quiz

### أنهي قيمة بتفصل الفوكس عن اللوحة؟
- [x] `manual`
- [ ] `auto`
- [ ] `none`
- [ ] `off`
يدوي.

### بتظهر اللوحة يدوياً بـ؟
- [x] `navigator.virtualKeyboard.show()`
- [ ] `window.keyboard()`
- [ ] `el.keyboard`
- [ ] `document.kb()`
VirtualKeyboard API.

## refs

- [MDN: virtualkeyboardpolicy](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/virtualkeyboardpolicy)
- [MDN: VirtualKeyboard API](https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API)
