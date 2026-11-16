---
id: attr-required
kind: attribute
cat: attrs
chip: required
title: خاصية الحقل الإلزامي
en: HTML required attribute
status: stable
support: all
mdn: Attributes/required
summary: خاصية required منطقية بتجبر المستخدم يملأ الحقل أو يختار قبل إرسال الفورم، والمتصفح بيعرض رسالة خطأ. بتشتغل على input وselect وtextarea، وتتجاوز بـ novalidate.
keywords: required, حقل إلزامي, validation, form validation, :required, :invalid, valueMissing, aria-required, novalidate, مطلوب
related: input, select, textarea, form, attr-pattern, attr-disabled, input-checkbox
---

## intro

الخاصية `required` (منطقية) بتقول للمتصفح: «**الحقل ده لازم يتملّي** قبل ما الفورم يتبعت». لو المستخدم ضغط إرسال والحقل فاضي، المتصفح **بيوقف الإرسال** ويعرض رسالة بالـ **فوكس** على أول حقل ناقص («املأ هذا الحقل»). كل ده من غير سطر جافاسكربت.

بتشتغل على [[input]] (أغلب الأنواع) و[[select]] و[[textarea]]. وبتفرق حسب النوع: في النص «مش فاضي»، وفي [[input-checkbox]] «لازم يتعلّم» (مثالي لمربع الموافقة)، وفي [[input-radio]] «لازم يتختار واحد من المجموعة»، وفي [[input-file]] «لازم يتحدد ملف». وبتتكامل مع [[attr-pattern]] وغيرها من قيود الفحص.

حاجات مهمة: (1) **الفحص في المتصفح تسهيل مش أمان**: ممكن يتجاوزه أي حد، فالسيرفر لازم يفحص برضه. (2) في CSS تقدر تنسّق الحقول الإلزامية بـ `:required` وغير الصحيحة بـ `:invalid`. (3) `required` بتبعت لقارئ الشاشة إن الحقل إلزامي تلقائياً، فمفيش داعي لـ `aria-required`. (4) لو عايز تعطّل الفحص لفورم كامل استخدم `novalidate` على الـ form.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'عدّى الفحص ✅'">
  <label>الاسم * <input name="n" required></label><br>
  <label>الإيميل <input name="e" type="email"></label><br>
  <label><input type="checkbox" required> موافق على الشروط *</label><br>
  <button>إرسال</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input name="email" type="email" required>
<select name="c" required>…</select>
<textarea name="msg" required></textarea>
```

- `required` — boolean: حقل إلزامي.
- checkbox: لازم يتعلّم. radio: واحد من المجموعة.
- CSS: `:required` و`:invalid`.

## use

- الحقول الأساسية (الإيميل، الاسم).
- مربع الموافقة على الشروط.
- اختيار إلزامي من قايمة أو مجموعة radio.

## avoid

- متخليش كل حقول الفورم إلزامية: بس الضروري.
- متعتمدش عليها كحماية: السيرفر لازم يفحص.

## examples

### 1) تنسيق الإلزامي
:required و:invalid.

```html
<style>
  input:required { border:2px solid #94a3b8 }
  input:required:invalid:not(:placeholder-shown) { border-color:#ef4444 }
  input:required:valid { border-color:#22c55e }
</style>
<input required placeholder="اكتب هنا">
```

- الحدود بتتغيّر حسب الحالة.
- `:placeholder-shown` بيمنع الأحمر قبل الكتابة.
- من غير JS.

### 2) نجمة جنب الـ label
مثال على ::after.

```html
<style>label:has(input:required)::after { content:" *"; color:#ef4444 }</style>
<label>الاسم <input required></label>
```

- `:has(input:required)` بيلاقي الـ label.
- نضيف علامة النجمة.
- وضّح معناها للمستخدم.

### 3) فحص بالجافاسكربت
مثال على validity.

```html
<input id="i" required>
<button onclick="o.textContent = i.validity.valueMissing ? 'مطلوب ❌' : 'تمام ✅'">افحص</button>
<p id="o"></p>
```

- `validity.valueMissing` = حقل إلزامي فاضي.
- `checkValidity()` بيرجّع true/false.
- `reportValidity()` بيعرض الرسالة.

### 4) رسالة مخصّصة
مثال على setCustomValidity.

```html
<input id="i" required oninvalid="this.setCustomValidity('من فضلك اكتب اسمك')" oninput="this.setCustomValidity('')">
<button onclick="i.reportValidity()">افحص</button>
```

- `oninvalid` بتغيّر الرسالة.
- امسحها في `oninput` وإلا تفضل خطأ.
- الرسالة لازم تكون واضحة.

## mistakes

### إلزامي بدون علامة
```html bad
<label>الاسم <input required></label>
```
```html good
<label>الاسم (مطلوب) <input required></label>
```
ليه؟ وضّح للمستخدم إن الحقل مطلوب قبل الخطأ.

### الاعتماد على required فقط
```html bad
<!-- لا فحص في السيرفر -->
```
```html good
<!-- السيرفر بيفحص برضه -->
```
ليه؟ أي حد يقدر يبعت طلب من غير الفحص.

## a11y

- `required` بتخلّي قارئ الشاشة يعلن إن الحقل إلزامي.
- وضّح بصرياً (نجمة + نص "مطلوب").
- رسائل الخطأ بنص واضح ومربوطة بالحقل (`aria-describedby`).

## quiz

### نوع الخاصية؟
- [x] boolean
- [ ] نص
- [ ] رقم
- [ ] رابط
وجودها كافي.

### في checkbox معناها؟
- [x] لازم يتعلّم
- [ ] لازم يتشال
- [ ] مفيش تأثير
- [ ] اختياري
مثالي للموافقة.

### تعطيل الفحص لفورم؟
- [x] `novalidate`
- [ ] `required="false"`
- [ ] `skip`
- [ ] `nocheck`
على الـ form.

## refs

- [MDN: required](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required)
- [MDN: Form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
