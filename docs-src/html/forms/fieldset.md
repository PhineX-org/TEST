---
id: fieldset
kind: element
cat: forms
tag: fieldset
title: عنصر مجموعة الحقول
en: HTML fieldset element
status: stable
display: block
void: no
support: all
summary: بيجمّع حقول فورم مرتبطة في مجموعة واحدة بإطار وعنوان legend، وبيسهّل تعطيل المجموعة كلها بـ disabled، وبيدّي قارئ الشاشة سياق للـ radio والـ checkbox.
keywords: fieldset, مجموعة حقول, legend, تجميع, disabled, radio group, checkbox group, فورم, إطار, إتاحة
related: legend, form, input, label, details
---

## intro

فورم طويل فيه عشرين حقل بيتعب المستخدم. لو قسّمته لمجموعات منطقية: «بيانات شخصية»، «عنوان الشحن»، «طريقة الدفع»: بيبقى أوضح وأسهل. العنصر `<fieldset>` (**مجموعة حقول**) بيعمل ده: بيلف مجموعة حقول مرتبطة ويرسم حواليها **إطار**، ومعاه [[legend]] كعنوان للمجموعة.

لكن فايدته الحقيقية **أكبر من الشكل**. أولاً: **الإتاحة**. لما عندك مجموعة radio («اختار مستواك: مبتدئ / متوسط / محترف») من غير `<fieldset>`، قارئ الشاشة بيقول «مبتدئ، زرار راديو» من غير ما يعرف إن السؤال «اختار مستواك». مع `<fieldset>` و`<legend>` بيقول «اختار مستواك، مجموعة، مبتدئ، زرار راديو». وده سياق ضروري.

ثانياً: **التعطيل الجماعي**. لو حطيت `disabled` على `<fieldset>`، **كل الحقول اللي جواه بتتعطّل** مرة واحدة (إلا اللي جوه الـ `<legend>` الأول). مفيد لما قسم كامل مش مفعّل (مثلاً «بيانات الشركة» بتتعطّل لو اخترت «فرد»).

والشكل الافتراضي إطار رفيع حوالين المجموعة والـ legend على الحد العلوي. وتقدر تشيله بـ CSS: `border: 0; padding: 0; margin: 0`.

> [!analogy] `<fieldset>` زي **كراسة بفواصل**: كل فاصل ليه عنوان وفيه صفحات مرتبطة. ولو شيلت فاصل كامل (`disabled`) كل صفحاته بتتشال معاه.

> [!key] `<fieldset><legend>العنوان</legend>…حقول…</fieldset>`. أساسي لمجموعات radio وcheckbox. `disabled` بيعطّل كل جواه.

## try

عطّل المجموعة وشوف الحقول.

```html
<fieldset>
  <legend>بيانات الدخول</legend>
  <label>الاسم <input name="u"></label><br>
  <label>الباسورد <input type="password" name="p"></label>
</fieldset>
```

## syntax

```html nolive
<fieldset>
  <legend>العنوان</legend>
  <label>حقل 1 <input name="a"></label>
  <label>حقل 2 <input name="b"></label>
</fieldset>
```

- `<fieldset ...>` — **الوسم الافتتاحي**.
- `<legend>` — **العنوان** (أول ابن).
- الحقول — **المحتوى**.
- `disabled` — **تعطيل المجموعة**.
- `</fieldset>` — **الوسم الختامي** إجباري.

## use

- لتجميع radio وcheckbox المرتبطين.
- لتقسيم فورم طويل لأقسام.
- لتعطيل قسم كامل مرة واحدة.
- لإعطاء سياق إتاحة لمجموعة حقول.

## avoid

- متحطش `<fieldset>` حوالين حقل واحد من غير داعي.
- متنساش `<legend>`.
- متستخدمهوش للتنسيق بس: `<div>` أنسب.

## attributes

### disabled {boolean}
**يعطّل كل الحقول** اللي جواه (ماعدا اللي في أول `<legend>`).

```html nolive
<fieldset disabled><input name="a"><button>ابعت</button></fieldset>
```

### form
**ربط المجموعة بفورم** برّه.

### name
**اسم المجموعة** عشان توصله بالجافاسكربت (`form.elements.name`).

## examples

### 1) مجموعة radio
الاستخدام الأهم.

```html
<fieldset style="border:1px solid #cbd5e1; border-radius:8px">
  <legend>مستواك في البرمجة</legend>
  <label><input type="radio" name="lvl" value="b" checked> مبتدئ</label><br>
  <label><input type="radio" name="lvl" value="m"> متوسط</label><br>
  <label><input type="radio" name="lvl" value="p"> محترف</label>
</fieldset>
```

- `<legend>` هو السؤال، والـ radio هي الاختيارات.
- قارئ الشاشة بيقول السؤال قبل كل اختيار.
- من غير `<fieldset>` الإتاحة بتتأثر بشدة.

### 2) أقسام فورم
أكتر من مجموعة.

```html
<style>
  fieldset { border:1px solid #cbd5e1; border-radius:8px; margin-bottom:10px }
  legend { font-weight:bold; padding:0 6px }
  label { display:block; margin:4px 0 }
</style>
<form onsubmit="return false">
  <fieldset>
    <legend>بياناتك</legend>
    <label>الاسم <input name="n"></label>
    <label>الإيميل <input name="e" type="email"></label>
  </fieldset>
  <fieldset>
    <legend>العنوان</legend>
    <label>المدينة <input name="c"></label>
    <label>الشارع <input name="s"></label>
  </fieldset>
</form>
```

- كل قسم مجموعة بعنوانها.
- ده بيخلّي الفورم الطويل أسهل قراية.
- ممكن تنسّق كل `<fieldset>` كبطاقة.

### 3) تعطيل قسم بشرط
`disabled`.

```html
<label><input type="checkbox" id="chk" onchange="document.getElementById('fs').disabled = !this.checked"> عندي شركة</label>
<fieldset id="fs" disabled style="margin-top:8px">
  <legend>بيانات الشركة</legend>
  <label>اسم الشركة <input name="co"></label><br>
  <label>الرقم الضريبي <input name="tax"></label>
</fieldset>
```

- القسم معطّل في الأول.
- لما تعلّم الـ checkbox بنشيل `disabled` من الـ `fieldset` كله.
- سطر واحد بدل تعطيل كل حقل لوحده.

### 4) إزالة الإطار
تنسيق نظيف.

```html
<style>
  fieldset.plain { border: 0; padding: 0; margin: 0 0 12px; min-width: 0 }
  fieldset.plain legend { padding: 0; font-weight: bold; margin-bottom: 4px }
</style>
<fieldset class="plain">
  <legend>اختار لونك</legend>
  <label><input type="radio" name="c" checked> أخضر</label>
  <label><input type="radio" name="c"> أزرق</label>
</fieldset>
```

- شيلنا الإطار والحشو لكن فضل الـ `<fieldset>` موجود دلالياً.
- `min-width: 0` بيحل مشكلة الـ fieldset اللي بيرفض يضيق على الموبايل.
- ده الأسلوب الشائع في التصميم الحديث.

### 5) قراءة اختيار المجموعة
بالجافاسكربت.

```html
<form id="f" onsubmit="event.preventDefault(); document.getElementById('o').textContent = 'اخترت: ' + this.elements.lvl.value">
  <fieldset>
    <legend>مستواك؟</legend>
    <label><input type="radio" name="lvl" value="مبتدئ" checked> مبتدئ</label>
    <label><input type="radio" name="lvl" value="محترف"> محترف</label>
  </fieldset>
  <button>اعرض</button>
</form>
<p id="o"></p>
```

- `form.elements.lvl` بيرجّع مجموعة الـ radio بنفس الاسم.
- خاصية `.value` عليها بترجّع قيمة الاختيار المعلَّم مباشرة.
- ده أسهل من البحث عن `:checked` يدوياً.
- الـ `<fieldset>` نفسه بيظهر في `form.elements` كمان باسمه لو حطيت له `name`.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: [[legend]] اختياري (أول ابن)، ثم **Flow content**.
- closing: الوسم الختامي `</fieldset>` إجباري.
- role: `group`.
- dom: `HTMLFieldSetElement`.
- layout: `display: block`، مع إطار وحشو افتراضي.

## mistakes

### legend مش أول ابن
```html bad
<fieldset>
  <input name="a">
  <legend>عنوان</legend>
</fieldset>
```
```html good
<fieldset>
  <legend>عنوان</legend>
  <input name="a">
</fieldset>
```
ليه؟ الـ `<legend>` لازم يكون أول ابن لـ `<fieldset>`.

### radio من غير مجموعة
```html bad
<p>مستواك؟</p>
<input type="radio" name="l"> مبتدئ
<input type="radio" name="l"> محترف
```
```html good
<fieldset>
  <legend>مستواك؟</legend>
  <label><input type="radio" name="l"> مبتدئ</label>
  <label><input type="radio" name="l"> محترف</label>
</fieldset>
```
ليه؟ من غير `fieldset` السؤال مش مرتبط بالاختيارات لقارئ الشاشة.

## a11y

- ضروري لمجموعات radio وcheckbox: بيدّي سؤال المجموعة.
- `<legend>` بيتقري كاسم المجموعة.
- المجموعات الكبيرة جداً يفضّل تقسيمها لأقسام أصغر.

## tips

- لو التصميم مش عايز إطار، شيله بـ CSS مش بحذف `<fieldset>`.
- `min-width: 0` لو الـ fieldset بيعمل تمرير أفقي في الموبايل.
- `fieldset:disabled` بتستخدمه في CSS لتنسيق الحالة.

## quiz

### فين لازم يتحط `<legend>`؟
- [ ] آخر الـ fieldset
- [x] أول ابن
- [ ] برّه
- [ ] في أي مكان
هو عنوان المجموعة.

### إيه اللي بيعمله `disabled` على `<fieldset>`؟
- [ ] بيخفيه
- [x] بيعطّل كل الحقول اللي جواه
- [ ] بيمسحه
- [ ] مفيش
تعطيل جماعي.

### ليه `<fieldset>` مهم لمجموعات radio؟
- [x] بيدّي قارئ الشاشة سؤال المجموعة
- [ ] بيلوّنها
- [ ] بيسرّعها
- [ ] مش مهم
السياق للمكفوفين.

## refs

- [MDN: fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset)
- [WHATWG: The fieldset element](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element)
- [W3C WAI: Grouping controls](https://www.w3.org/WAI/tutorials/forms/grouping/)
