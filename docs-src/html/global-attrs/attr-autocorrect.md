---
id: attr-autocorrect
kind: attribute
cat: global-attrs
chip: autocorrect
title: خاصية التصحيح التلقائي
en: HTML autocorrect global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/autocorrect
summary: خاصية autocorrect بتحدد هل المتصفح أو لوحة المفاتيح تصحّح الإملاء والترقيم تلقائياً أثناء الكتابة. القيم on أو off، ومفيدة لتعطيله في الأكواد والأسماء.
keywords: autocorrect, تصحيح تلقائي, إملاء, ترقيم, on, off, textarea, contenteditable, كتابة, كود
related: attr-spellcheck, attr-autocapitalize, textarea, attr-contenteditable, input
---

## intro

التصحيح التلقائي هو لما بتكتب «اسمي احمد» وتلاقي الجهاز غيّرها لـ «اسمي أحمد»، أو يحوّل كلمة غلط لصح من غير ما تطلب. الخاصية `autocorrect` بتتحكم فيه: **`on`** (أو القيمة الفاضية) يفعّله، و**`off`** يوقفه.

بتنطبق على الحقول القابلة للتعديل: `<textarea>` وحقول `<input>` النصية (من غير password وemail وurl) وأي عنصر [[attr-contenteditable]]. الافتراضي هو التفعيل. اقفلها في حقول **الكود** و**الأسماء** و**كلمات السر** عشان الجهاز ميغيّرش حاجة مقصودة. وفرقها عن [[attr-spellcheck]]: الـ spellcheck بيرسم **خط تحت الغلط** بس، والـ autocorrect **بيغيّر الكلمة فعلاً**.

## try

```html
<textarea autocorrect="off" rows="2" style="width:100%" placeholder="من غير تصحيح تلقائي (جرّب من الموبايل)"></textarea>
```

## syntax

```html nolive
<textarea autocorrect="on | off"></textarea>
```

- `on` — **تصحيح** تلقائي (الافتراضي).
- `off` — **مفيش** تصحيح.

## use

- إيقاف التصحيح في حقول الكود والأسماء.
- تفعيله في حقول الكتابة الحرة.

## avoid

- متعطّلهوش من غير سبب: بيساعد معظم المستخدمين.

## examples

### 1) حقل كود من غير تصحيح
مثال على off.

```html
<textarea autocorrect="off" spellcheck="false" rows="2" style="width:100%; font-family:monospace">const x = 5;</textarea>
```

- الكود مش لازم يتصحح.
- مع `spellcheck="false"` بتشيل الخط الأحمر كمان.
- ده الأسلوب المعتاد في محررات الكود.

### 2) تفعيل صريح
مثال على on.

```html
<textarea autocorrect="on" rows="2" style="width:100%" placeholder="اكتب رسالة"></textarea>
```

- القيمة `on` هي الافتراضي.
- مفيش داعي تكتبها لو عايز الافتراضي.
- تفيد لو الأب (form) معطّلها.

### 3) توريث من form
الأب بيحدد.

```html
<form autocorrect="off">
  <input placeholder="اسم (من غير تصحيح)">
  <textarea placeholder="كمان من غير تصحيح"></textarea>
</form>
```

- العناصر جوه form بترث القيمة منه.
- تقدر تعمل override على عنصر واحد.
- ده بيقلل التكرار.

## mistakes

### قيمة غير صحيحة
```html bad
<textarea autocorrect="false"></textarea>
```
```html good
<textarea autocorrect="off"></textarea>
```
ليه؟ القيم الصحيحة هي `on` و`off`.

## a11y

- التصحيح التلقائي بيفيد ناس كتير: متعطّلهوش على الحقول العامة.
- في الأكواد والأسماء اقفله لتجنب تغيير غير مقصود.

## quiz

### أنهي قيمة توقف التصحيح؟
- [x] `off`
- [ ] `false`
- [ ] `no`
- [ ] `stop`
on/off.

### الفرق عن spellcheck؟
- [x] autocorrect بيغيّر النص فعلاً
- [ ] مفيش فرق
- [ ] spellcheck بيغيّر
- [ ] autocorrect للصور
spellcheck بيعلّم بس.

## refs

- [MDN: autocorrect](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocorrect)
- [WHATWG: autocorrect](https://html.spec.whatwg.org/multipage/interaction.html#autocorrection)
