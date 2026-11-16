---
id: input-email
kind: inputtype
cat: input-types
chip: type="email"
title: حقل الإيميل
en: <input type="email">
status: stable
support: all
mdn: Elements/input/email
summary: type="email" بيتحقق إن القيمة شكلها إيميل (فيها @) ويفتح كيبورد مناسب على الموبايل. بيدعم multiple لعدة إيميلات، ومش بيتأكد إن الإيميل حقيقي.
keywords: input email, إيميل, validation, multiple, autocomplete, validity, typeMismatch, كيبورد, بريد إلكتروني
related: input, input-text, attr-multiple, attr-autocomplete, attr-required, form
---

## intro

ده حقل مخصّص للبريد الإلكتروني. فايدتين كبار: الأولى، المتصفح **بيتحقق من الشكل** لما تبعت الفورم: لازم يكون فيه حاجة قبل `@` وحاجة بعدها (مثلاً `a@b`)، ولو الشكل غلط بيظهر رسالة خطأ. التانية، على الموبايل بيفتح **كيبورد فيه `@` و`.`** قدام إيدك فتكتب أسرع.

لكن خد بالك: التحقق **شكلي فقط**. المتصفح مبيعرفش لو الإيميل **حقيقي** أو لسه شغّال. يعني `x@y` يعدّي (حسب مواصفات HTML). عشان تتأكد فعلاً لازم تبعت إيميل تأكيد من السيرفر. وبخاصية [[attr-multiple]] تقدر تقبل **قايمة إيميلات** مفصولة بفاصلة. كمان المتصفح بيشيل المسافات الزيادة من أول وآخر القيمة تلقائياً قبل الفحص.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اتقبل: ' + e.value">
  <label>الإيميل: <input id="e" type="email" name="email" autocomplete="email" required placeholder="name@example.com"></label>
  <button>تأكيد</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input type="email" name="email" autocomplete="email" required>
```

- `type="email"` — فحص الشكل وكيبورد الإيميل.
- `autocomplete="email"` — تعبئة تلقائية.
- `multiple` — عدة إيميلات بفاصلة.

## use

- التسجيل وتسجيل الدخول.
- القوائم البريدية والتواصل.
- مشاركة لعدة أشخاص (`multiple`).

## avoid

- متفتكرش إنه بيتأكد إن الإيميل حقيقي.
- متعملش Regex معقّد بنفسك: اللي في المتصفح كفاية للشكل.

## examples

### 1) رسالة خطأ بتاعتك
validity وsetCustomValidity.

```html
<input id="e" type="email" placeholder="إيميلك" oninput="this.setCustomValidity(this.validity.typeMismatch ? 'اكتب إيميل صحيح' : '')">
<button onclick="e.reportValidity()">فحص</button>
```

- `validity.typeMismatch` بيبقى true لو الشكل غلط.
- `setCustomValidity` بتخصّص الرسالة.
- `reportValidity()` بتظهر الرسالة.

### 2) عدة إيميلات
مثال على multiple.

```html
<input type="email" multiple placeholder="a@x.com, b@y.com" size="30">
```

- افصل بفاصلة.
- المتصفح بيفحص كل واحد.
- القيمة بتتبعت كنص واحد فيه الفواصل.

### 3) تلميحات التعبئة
مثال على autocomplete.

```html
<input type="email" name="email" autocomplete="email" placeholder="المتصفح هيقترح إيميلك">
```

- `autocomplete="email"` بيسهّل على المستخدم.
- بيشتغل مع بيانات المتصفح المحفوظة.
- مهم لتجربة الموبايل.

### 4) تقييد النطاق
مثال على pattern.

```html
<input type="email" pattern=".+@phinex\.com" title="لازم إيميل PhineX" placeholder="you@phinex.com">
```

- `pattern` بتضيّق عالنطاق.
- بيتطبّق مع فحص `email`.
- ما تعتمدش عليه وحده في الأمان.

## mistakes

### type="text" للإيميل
```html bad
<input type="text" name="email">
```
```html good
<input type="email" name="email">
```
ليه؟ من غير النوع الصح مفيش فحص ولا كيبورد مناسب.

### الاعتماد على الفحص كإثبات
```html bad
<input type="email" name="email">
<!-- نعتبر الإيميل حقيقي لمجرد إنه عدّى الفحص -->
```
```html good
<input type="email" name="email">
<!-- السيرفر يبعت رابط تأكيد قبل تفعيل الحساب -->
```
ليه؟ الفحص شكلي فقط: التأكد الحقيقي بإرسال رابط تأكيد.

## a11y

- اربطه بـ `label` ("البريد الإلكتروني").
- رسالة الخطأ لازم تكون نص مقروء لا لون بس.
- `autocomplete="email"` بيساعد ذوي صعوبات الكتابة.

## quiz

### هل بيتأكد إن الإيميل حقيقي؟
- [x] لأ، فحص الشكل بس
- [ ] أيوه
- [ ] أحياناً
- [ ] لو فيه .com
لازم إيميل تأكيد.

### عدة إيميلات؟
- [x] `multiple`
- [ ] `many`
- [ ] `list`
- [ ] `array`
خاصية multiple.

### الكيبورد على الموبايل؟
- [x] فيه @ و .
- [ ] أرقام بس
- [ ] عادي
- [ ] إيموجي
بيتغيّر تلقائياً.

## refs

- [MDN: email](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email)
- [WHATWG: Email state](https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email))
