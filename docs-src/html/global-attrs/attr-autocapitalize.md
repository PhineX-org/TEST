---
id: attr-autocapitalize
kind: attribute
cat: global-attrs
chip: autocapitalize
title: خاصية الحروف الكبيرة التلقائية
en: HTML autocapitalize global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/autocapitalize
summary: خاصية autocapitalize بتتحكم في تحويل الحروف الإنجليزية لكبيرة تلقائياً على لوحة المفاتيح الافتراضية (الموبايل): none أو sentences أو words أو characters.
keywords: autocapitalize, حروف كبيرة, لوحة المفاتيح الافتراضية, موبايل, sentences, words, characters, none, off
related: attr-inputmode, attr-enterkeyhint, input, textarea, attr-autocorrect
---

## intro

على الموبايل، لوحة المفاتيح الافتراضية بتحوّل أول حرف في الجملة **لكبير تلقائياً** (Hello). ده مناسب لكتابة جملة، لكنه مزعج في حقل **البريد الإلكتروني** أو **اسم المستخدم** (`Ahmed@gmail.com` بدل `ahmed@gmail.com`). الخاصية `autocapitalize` بتتحكم في ده على الأجهزة اللي فيها لوحة مفاتيح افتراضية.

القيم: **`none`** أو **`off`** (من غير تكبير)، **`sentences`** أو **`on`** (أول حرف في كل جملة)، **`words`** (أول حرف في كل كلمة، مناسب للأسماء)، **`characters`** (كل الحروف كبيرة). ولازم تعرف إنها **بتأثر على لوحة المفاتيح الافتراضية فقط**، مش الكيبورد الفعلي.

## try

```html
<input type="text" autocapitalize="none" placeholder="اسم المستخدم (من غير حروف كبيرة)" style="width:100%; padding:6px">
<input type="text" autocapitalize="words" placeholder="الاسم الكامل (كل كلمة بكبير)" style="width:100%; padding:6px; margin-top:6px">
```

## syntax

```html nolive
<input autocapitalize="none | sentences | words | characters">
```

- `none` — **مفيش** تكبير.
- `sentences` — **أول جملة**.
- `words` — **كل كلمة**.
- `characters` — **كل الحروف**.

## use

- حقل اسم المستخدم والإيميل: `none`.
- حقول الأسماء: `words`.

## avoid

- متعتمدش عليها على الكيبورد الفعلي: بتشتغل على الأجهزة اللمسية.

## examples

### 1) حقل بريد من غير تكبير
مثال على email.

```html
<input type="email" autocapitalize="none" placeholder="you@example.com" style="width:100%; padding:6px">
```

- الإيميلات بحروف صغيرة غالباً.
- بيمنع التكبير التلقائي على الموبايل.
- حقل `type="email"` غالباً بيعمل كده تلقائياً.

### 2) اسم كامل بكبير
مثال على words.

```html
<input autocapitalize="words" placeholder="Ahmed Elgohary" style="width:100%; padding:6px">
```

- كل كلمة بتبدأ بحرف كبير.
- مناسب للأسماء والعناوين.
- تأثيره على الحروف الإنجليزية (اللاتينية).

### 3) كل الحروف كبيرة
مثال على characters.

```html
<input autocapitalize="characters" placeholder="كود الخصم" style="width:100%; padding:6px">
```

- أكواد الخصم وأرقام الشحن غالباً بحروف كبيرة.
- التحويل في لوحة المفاتيح مش في القيمة (حوّلها بنفسك للتأكد).
- استخدم `text-transform` للعرض.

## mistakes

### الاعتماد عليها للتحقق
```html bad
<input autocapitalize="characters" name="code">
```
```html good
<input name="code" oninput="this.value=this.value.toUpperCase()">
```
ليه؟ مجرد تلميح للوحة المفاتيح، مش ضمان على القيمة.

## a11y

- الإيقاف على حقول البريد وأسماء المستخدم بيسهّل الكتابة.
- متبوّظش تجربة المستخدم بتكبير مش متوقع.

## quiz

### إيه القيمة اللي بتمنع التكبير؟
- [x] `none`
- [ ] `words`
- [ ] `on`
- [ ] `characters`
none أو off.

### بتشتغل على؟
- [x] لوحة المفاتيح الافتراضية
- [ ] الكيبورد الفعلي
- [ ] الماوس
- [ ] الطباعة
الأجهزة اللمسية.

## refs

- [MDN: autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocapitalize)
- [WHATWG: autocapitalize](https://html.spec.whatwg.org/multipage/interaction.html#autocapitalization)
