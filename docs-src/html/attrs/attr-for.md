---
id: attr-for
kind: attribute
cat: attrs
chip: for
title: خاصية الربط
en: HTML for attribute
status: stable
support: all
mdn: Attributes/for
summary: خاصية for على label بتربطه بحقل عن طريق id الحقل، فالضغط على النص يفوكس الحقل ويقراه قارئ الشاشة. وعلى output بتحدد العناصر اللي اتحسبت منها النتيجة.
keywords: for, label for, htmlFor, id, ربط label, output for, accessibility, فوكس, ضغط على النص, اسم الحقل
related: label, input, output, attr-id, input-checkbox, input-radio
---

## intro

الخاصية `for` على [[label]] بتربطه بحقل **بالـ `id`**: `<label for="email">` بتشاور على `<input id="email">`. النتيجة تلات فوايد: (1) الضغط على نص الـ label **يفوكس الحقل** (أو يعلّم الـ checkbox/radio)، فهدف الضغط يبقى كبير ومريح خصوصاً على الموبايل. (2) **قارئ الشاشة** بيقرا نص الـ label كـ**اسم** للحقل. (3) **أنظمة الإتاحة** والاختبار (مثل أدوات الاختبار الآلي) بتعتمد على الربط ده.

القيمة لازم تكون **`id` بالظبط** (حساسة لحالة الحروف) لعنصر قابل للتسمية: [[input]] و`select` و`textarea` و`button`. وفي JavaScript الخاصية اسمها **`htmlFor`** (لأن `for` كلمة محجوزة).

بديل أبسط: **لف الحقل جوه الـ label** (`<label>اسمك <input></label>`) ومفيش حاجة لـ `for` ولا `id`. الطريقتين صحيحة. استخدم `for` لما تصميمك بيفصل الـ label عن الحقل. وكمان `for` بتظهر على [[output]]: هناك بتكون **قايمة `id`s مفصولة بمسافة** للعناصر اللي النتيجة اتحسبت منها.

## try

```html
<label for="e">الإيميل (اضغط عليّا ✋):</label>
<input id="e" type="email" placeholder="name@example.com">
<br>
<input id="c" type="checkbox"> <label for="c">اضغط على النص يعلّم المربع</label>
```

## syntax

```html nolive
<label for="email">الإيميل</label>
<input id="email" type="email">

<!-- أو بالتغليف -->
<label>الإيميل <input type="email"></label>
```

- `for="id"` — بيشاور على `id` الحقل بالظبط.
- بديل: لف الحقل جوه الـ label.
- في JS: `label.htmlFor`.

## use

- ربط label بحقل بعيد عنه في الـ DOM.
- تكبير منطقة الضغط للـ checkbox والـ radio.
- إعطاء اسم للحقل لقارئ الشاشة.
- مع `output` لتحديد مصادر الحساب.

## avoid

- متكتبش `for` بقيمة id مش موجود.
- متكرّرش نفس الـ `id` في الصفحة.

## examples

### 1) كبّر منطقة الضغط
checkbox وlabel.

```html
<style>.row { display:flex; gap:8px; padding:10px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; align-items:center } .row input { width:20px; height:20px }</style>
<label class="row" for="a"><input id="a" type="checkbox"><span>اضغط في أي حتة في الصندوق</span></label>
```

- الـ label كله بقى هدف الضغط.
- مهم جداً على الموبايل.
- الكيبورد لسه بيشتغل.

### 2) for مع output
النتيجة محسوبة من حقلين.

```html
<form oninput="r.value = +a.value + +b.value">
  <input id="a" type="number" value="2"> + <input id="b" type="number" value="3"> =
  <output id="r" for="a b">5</output>
</form>
```

- `for="a b"` بتعدّد الـ ids.
- بتوصف علاقة النتيجة بالمدخلات.
- قارئ الشاشة بيستفيد منها.

### 3) htmlFor في JS
البرمجة.

```html
<label id="l" for="x">اسم</label> <input id="x">
<script>document.write('<p>' + l.htmlFor + ' → ' + (l.control === x) + '</p>')</script>
```

- `label.htmlFor` بتقرا القيمة.
- `label.control` بيرجّع الحقل المرتبط.
- مفيد في الاختبارات.

### 4) غلاف بدل for
الأبسط.

```html
<label>الاسم <input name="n"></label>
```

- مفيش `id` ولا `for`.
- الربط تلقائي بالتغليف.
- مناسب للفورمات البسيطة.

## mistakes

### for بـ id مش موجود
```html bad
<label for="mail">الإيميل</label><input id="email">
```
```html good
<label for="email">الإيميل</label><input id="email">
```
ليه؟ القيمة لازم تطابق id الحقل بالحرف.

### id مكرر
```html bad
<input id="x"><input id="x">
```
```html good
<input id="x1"><input id="x2">
```
ليه؟ الـ label هيرتبط بأول واحد بس.

## a11y

- كل حقل لازم ليه label (ظاهر).
- الـ label بيكبّر منطقة الضغط وبيسهّل على ذوي صعوبات الحركة.
- متحطش `for` على label من غير حقل.

## quiz

### قيمة `for`؟
- [x] `id` الحقل
- [ ] `name` الحقل
- [ ] نوع الحقل
- [ ] نص الـ label
بالـ id.

### في JS؟
- [x] `htmlFor`
- [ ] `for`
- [ ] `labelFor`
- [ ] `target`
`for` كلمة محجوزة.

### بديل `for`؟
- [x] تغليف الحقل جوه label
- [ ] `id` مكرر
- [ ] `name`
- [ ] مفيش
ربط ضمني.

## refs

- [MDN: for](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/for)
- [W3C WAI: Labeling controls](https://www.w3.org/WAI/tutorials/forms/labels/)
