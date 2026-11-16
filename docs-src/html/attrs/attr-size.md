---
id: attr-size
kind: attribute
cat: attrs
chip: size
title: خاصية العرض المرئي
en: HTML size attribute
status: stable
support: all
size: compact
mdn: Attributes/size
summary: خاصية size بتحدد عرض حقل input بعدد الحروف (الافتراضي 20)، وفي select multiple بتحدد عدد الأسطر الظاهرة. مش بتحدد أقصى طول: ده maxlength.
keywords: size, عرض الحقل, input size, select size, maxlength, عدد الأسطر, حروف ظاهرة, width
related: input-text, select, attr-maxlength, attr-multiple, attr-minlength
---

## intro

`size` بتتحكم في **الحجم المرئي** للعنصر، من غير ما تحدّ مما يكتبه المستخدم. في [[input-text]] وما شابهه: عدد **الحروف** اللي العرض بيتّسع لها (الافتراضي **20**). فـ `size="5"` بتعمل حقل صغير لكن لسه يقدر يكتب أكتر (الكلام بيتحرك جواه). عشان تحدّد أقصى كتابة استخدم [[attr-maxlength]]. وفي [[select]] لما تضيف `multiple` أو تكتب `size="4"` القايمة بتتحول لمربع بيعرض **4 أسطر**. والأفضل اليوم تظبط العرض بـ CSS (`width`)، و`size` بتفيد للتقريب السريع بدون ستايل.

## try

```html
<input size="5" placeholder="5"> <input size="12" placeholder="12"> <input size="30" placeholder="30 حرف"><br>
<select size="3"><option>أ</option><option>ب</option><option>ج</option><option>د</option></select>
```

## syntax

```html nolive
<input size="10">
<select size="4"><option>…</option></select>
```

- `input size` — العرض بعدد الحروف (الافتراضي 20).
- `select size` — عدد الأسطر الظاهرة.
- مش حد للكتابة: ده `maxlength`.

## use

- حقل رمز بريدي أو سنة بعرض مناسب.
- قايمة بعدة أسطر ظاهرة.

## avoid

- الأفضل CSS `width` للتحكم الدقيق.

## examples

### 1) عرض مناسب لمحتوى قصير
الرمز البريدي.

```html
<input size="6" maxlength="5" placeholder="12345">
```

- `size` للشكل و`maxlength` للحد.
- الاتنين مع بعض ممتازين.
- العرض بيتأثر بنوع الخط.

### 2) قائمة بأسطر
مثال على select size.

```html
<select size="3"><option>HTML</option><option>CSS</option><option>JS</option><option>Python</option></select>
```

- 3 أسطر ظاهرة مع تمرير.
- من غير multiple بتختار واحد.
- أوضح من القايمة المنسدلة أحياناً.

### 3) size مقابل CSS width
مقارنة.

```html
<input size="10" placeholder="size=10"> <input style="width:200px" placeholder="width:200px">
```

- `size` بتعتمد على الخط.
- `width` ثابتة بالبكسل.
- الأفضل CSS في التصميم.

## mistakes

### size بدل maxlength
```html bad
<input size="5">  <!-- ظنّ إنها بتحدد أقصى حروف -->
```
```html good
<input size="5" maxlength="5">
```
ليه؟ `size` للعرض فقط والمستخدم لسه يقدر يكتب أكتر.

## a11y

- حقل أضيق من المحتوى بيصعّب المراجعة.
- للحقول الطويلة (إيميل) خلّيه عريض كفاية.

## quiz

### `size` في input؟
- [x] عرض بعدد الحروف
- [ ] أقصى حروف
- [ ] ارتفاع
- [ ] حجم الخط
شكل مش حد.

### في select؟
- [x] عدد الأسطر الظاهرة
- [ ] عدد الخيارات
- [ ] عرضه
- [ ] لا شيء
مع/بدون multiple.

## refs

- [MDN: size](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/size)
- [WHATWG: size](https://html.spec.whatwg.org/multipage/input.html#attr-input-size)
