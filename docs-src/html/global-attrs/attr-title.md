---
id: attr-title
kind: attribute
cat: global-attrs
chip: title
title: خاصية العنوان الإرشادي
en: HTML title global attribute
status: stable
support: all
mdn: Global_attributes/title
summary: خاصية title بتضيف معلومة إضافية عن العنصر، وغالباً بتظهر كـ tooltip لما تقف عليه بالماوس. مش بتظهر على اللمس والكيبورد، فمتحطش فيها معلومة أساسية.
keywords: title, tooltip, تلميح, معلومة إضافية, hover, عنوان, accessible name, iframe title, abbr title
related: attr-class, abbr, iframe, a, title
---

## intro

الـ `title` خاصية تقدر تحطها على **أي عنصر** عشان تكتب **معلومة إضافية** عنه. أشهر استخدام: لما توقف الماوس على العنصر وتستنى ثانية، بيطلع **تلميح صغير (Tooltip)** فيه النص ده. زي ما بتشوف لما تقف على أيقونة وتطلع «حفظ».

لكن لازم تعرف حدودها: **(1)** الـ tooltip **مش بيظهر على الموبايل** (مفيش hover). **(2)** مستخدمي **الكيبورد** مش بيشوفوه عادةً. **(3)** قارئات الشاشة **مش دايماً** بتقراه. عشان كده **متحطش فيها معلومة أساسية**؛ الأساسي يبقى نص ظاهر. لكن في عناصر الـ `title` ليها **دور رسمي**: على [[iframe]] هي الـ **اسم المتاح** المطلوب، وعلى [[abbr]] بتشرح الاختصار. وفي `<head>` فيه **عنصر** `<title>` بيحط عنوان الصفحة؛ ده حاجة مختلفة عن الخاصية.

> [!warn] الـ `title` **مش بديل** عن النص الظاهر ولا عن `alt` للصورة: المعلومة المهمة تبقى ظاهرة للكل.

## try

```html
<button title="بيحفظ التغييرات في الملف" style="padding:8px 16px">💾 حفظ</button>
<p>وقّف الماوس على الزرار وشوف التلميح.</p>
```

## syntax

```html nolive
<element title="نص التلميح">المحتوى</element>
```

- `title="…"` — **نص التلميح**.
- بيتعرض عادةً بعد وقوف الماوس ثانية.
- ممكن يحتوي سطور بـ `&#10;`.

## use

- شرح اختصار على `<abbr>`.
- تسمية `<iframe>` علشان قارئ الشاشة يعرف محتواه.
- تلميح بسيط لأيقونة (مع نص بديل متاح كمان).
- معلومة ثانوية غير ضرورية.

## avoid

- متحطش فيها معلومة أساسية: مش بتظهر على الموبايل والكيبورد.
- متكرّرش نفس نص العنصر في الـ title (مفيش فايدة).

## examples

### 1) تلميح على أيقونة
tooltip بسيط.

```html
<span title="نسخ الرابط" style="cursor:help; font-size:24px">📋</span>
```

- الأيقونة لوحدها غير واضحة، والتلميح بيشرحها.
- ضيف نص بديل متاح (`aria-label`) كمان للأزرار الأيقونية.
- `cursor: help` بيعطي إشارة إن فيه معلومة.

### 2) شرح اختصار
abbr مع title.

```html
<p>موقعنا مبني بـ <abbr title="HyperText Markup Language">HTML</abbr>.</p>
```

- الـ `title` في `<abbr>` هو الشرح الكامل للاختصار.
- المتصفح بيرسم خط منقّط تحت الاختصار.
- ده استخدام رسمي مقصود للخاصية.

### 3) اسم لـ iframe
للإتاحة.

```html
<iframe title="خريطة موقع الشركة" style="width:100%;height:80px;border:1px solid #cbd5e1"
  srcdoc="<p style='font-family:sans-serif'>خريطة</p>"></iframe>
```

- قارئ الشاشة بيعلن `title` عشان يقول إيه الـ iframe ده.
- من غيره المستخدم يسمع «إطار» بس.
- ده من أهم استخدامات الـ title.

### 4) تلميح بأكتر من سطر
&#10; للسطر الجديد.

```html
<span title="سطر أول&#10;سطر تاني&#10;سطر تالت" style="border-bottom:1px dotted; cursor:help">وقّف هنا</span>
```

- `&#10;` بيدخل سطر جديد داخل قيمة الخاصية.
- بيشتغل في أغلب المتصفحات.
- متكتّرش في النص: التلميح لازم يبقى قصير.

### 5) قراءة الـ title بجافاسكربت
مثال على element.title.

```html
<a href="#" id="l" title="صفحة الاتصال">اتصل بينا</a>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'تلميح الرابط: ' + document.getElementById('l').title;
</script>
```

- الخاصية متاحة كـ `element.title`.
- ينفع تغيّرها: `el.title = "جديد"`.
- أحياناً بتحتاج تحدّثها حسب حالة العنصر.

## mistakes

### معلومة أساسية في title بس
```html bad
<input type="text" title="اكتب رقم الموبايل">
```
```html good
<label for="m">رقم الموبايل</label>
<input id="m" type="text">
```
ليه؟ التلميح مش بيظهر على الموبايل والكيبورد. الشرح المهم لازم يبقى `label` ظاهر.

### صورة من غير alt بدعوى إن فيها title
```html bad
<img src="a.jpg" title="صورة فريق العمل">
```
```html good
<img src="a.jpg" alt="صورة فريق العمل">
```
ليه؟ الـ `alt` هو النص البديل المطلوب، والـ `title` إضافة اختيارية.

## a11y

- على `<iframe>` الـ `title` مطلوب: بيدّي الإطار اسم.
- الـ tooltip مش بيظهر على اللمس ومعظم مستخدمي الكيبورد: متعتمدش عليه.
- لا تحطها بديل لـ `label` في الحقول أو `alt` في الصور.

## quiz

### أيهما صحيح بخصوص `title`؟
- [x] بتظهر tooltip بالماوس وممكن تفوت اللمس
- [ ] بتظهر دايماً على الموبايل
- [ ] بتعمل عنوان الصفحة
- [ ] مطلوبة على كل عنصر
مش مضمونة على اللمس.

### إيه دور `title` على `<iframe>`؟
- [x] اسم متاح لقارئ الشاشة
- [ ] لون الإطار
- [ ] عرضه
- [ ] الرابط
بيعرّف المحتوى.

### هل `title` بديل لـ `alt`؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] للصور الكبيرة
alt هو المطلوب للصور.

## refs

- [MDN: title](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/title)
- [WHATWG: The title attribute](https://html.spec.whatwg.org/multipage/dom.html#attr-title)
