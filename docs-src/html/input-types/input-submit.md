---
id: input-submit
kind: inputtype
cat: input-types
chip: type="submit"
title: زرار الإرسال
en: <input type="submit">
status: stable
support: all
mdn: Elements/input/submit
summary: type="submit" زرار بيبعت الفورم لما تضغط عليه (أو Enter في حقل). النص من value. ممكن formaction وformmethod تغيّر الوجهة، وبيبعت name=value لو له name.
keywords: input submit, إرسال فورم, formaction, formmethod, formnovalidate, value, submit button, button type submit, Enter
related: input, input-reset, input-button, button, form, input-image
---

## intro

الزرار اللي **بيبعت الفورم**. لما تضغط عليه (أو تدوس Enter وإنت في حقل نصي) المتصفح بيفحص الحقول (`required` و`pattern`…) ولو تمام بيبعت البيانات للمكان المحدد في `action` بتاع [[form]]. النص عليه من `value`، ولو مكتبتش `value` المتصفح بيكتب نص افتراضي (Submit / إرسال حسب اللغة).

فيه خصائص قوية على الزرار نفسه بتغيّر سلوك الفورم لما **هو** اللي يتضغط: `formaction` (وجهة تانية)، `formmethod` (get/post)، `formtarget`، و`formnovalidate` (إرسال من غير فحص: مفيد لزرار «حفظ كمسودة»). وبـ `name` و`value` الزرار نفسه بيتبعت (بيفيد لو في أكتر من زرار إرسال والسيرفر عايز يعرف مين اللي اتضغط). زي [[input-button]]، الأحدث إنك تستخدم `<button type="submit">` لو عايز تنسيق أو أيقونة جواه.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اتبعت: ' + new URLSearchParams(new FormData(this, event.submitter)).toString()">
  <input name="q" placeholder="اكتب" required>
  <input type="submit" name="act" value="بحث">
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<form action="/save" method="post">
  <input name="title" required>
  <input type="submit" value="حفظ">
  <input type="submit" value="مسودة" formnovalidate formaction="/draft">
</form>
```

- `value` — النص (الافتراضي بيجي من المتصفح).
- `formaction` و`formmethod` — يغيّروا وجهة الفورم لو الزرار ده اتضغط.
- `formnovalidate` — بيتخطّى الفحص.

## use

- إرسال فورم.
- أكتر من زرار إرسال بوجهات أو سلوك مختلف.
- مسودة بدون فحص (`formnovalidate`).

## avoid

- متحطش زرار submit جوه فورم لو مش عايز إرسال: استخدم `type="button"`.
- الأفضل `<button>` لو عايز محتوى غني.

## examples

### 1) أكتر من زرار إرسال
name وvalue.

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اللي اتضغط: ' + event.submitter.value">
  <input name="t" placeholder="عنوان">
  <input type="submit" name="a" value="حفظ">
  <input type="submit" name="a" value="حفظ ونشر">
</form>
<p id="o"></p>
```

- `event.submitter` بيدّيك الزرار اللي اتضغط.
- السيرفر كمان بيستقبل `a=حفظ ونشر`.
- مفيد لتمييز الإجراء.

### 2) مسودة بدون فحص
مثال على formnovalidate.

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اتبعت: ' + event.submitter.value">
  <input required placeholder="مطلوب">
  <input type="submit" value="نشر">
  <input type="submit" value="مسودة" formnovalidate>
</form>
<p id="o"></p>
```

- «نشر» بيفحص `required`.
- «مسودة» بيتخطّى الفحص.
- نفس الفورم، سلوكين.

### 3) وجهة مختلفة
مثال على formaction.

```html
<form action="/send" onsubmit="event.preventDefault(); o.textContent = event.submitter.getAttribute('formaction') || this.getAttribute('action')">
  <input type="submit" value="ابعت">
  <input type="submit" value="ابعت للمراجعة" formaction="/review">
</form>
<p id="o"></p>
```

- الزرار التاني بيروح `/review`.
- الأول بيفضل على `action` الفورم.
- مفيش داعي لفورمين.

### 4) منع الإرسال المتكرر
disabled عند الإرسال.

```html
<form onsubmit="event.preventDefault(); const b = this.b; b.disabled = true; b.value = 'جاري الإرسال…'; setTimeout(() => { b.disabled = false; b.value = 'إرسال' }, 1500)">
  <input name="x" placeholder="اكتب">
  <input name="b" type="submit" value="إرسال">
</form>
```

- تعطيل الزرار بيمنع الضغط المضاعف.
- ارجّعه بعد الرد.
- التعطيل لازم يكون في `submit` مش `click`.

## mistakes

### زرار ملهوش وظيفة إرسال جوه فورم
```html bad
<form><input type="submit" value="مسح" onclick="clearAll()"></form>
```
```html good
<form><input type="button" value="مسح" onclick="clearAll()"></form>
```
ليه؟ submit هيبعت الفورم رغم إنك عايز مسح بس.

### تعطيل في click
```html bad
<input type="submit" onclick="this.disabled = true">
```
```html good
<form onsubmit="this.b.disabled = true"><input name="b" type="submit"></form>
```
ليه؟ التعطيل وقت click بيمنع الإرسال نفسه في بعض المتصفحات.

## a11y

- اكتب نص واضح ("احجز الآن" مش "OK").
- ما تعطّلش الزرار من غير سبب مفهوم للمستخدم.
- Enter في الحقول لازم يرسل الفورم.

## quiz

### إيه اللي بيبعت الفورم؟
- [x] submit
- [ ] button
- [ ] reset
- [ ] hidden
زرار الإرسال.

### إرسال من غير فحص؟
- [x] `formnovalidate`
- [ ] `novalidate` على الزرار
- [ ] `skip`
- [ ] `noval`
على الزرار نفسه.

### من اللي اتضغط؟
- [x] `event.submitter`
- [ ] `event.button`
- [ ] `event.source`
- [ ] `event.target.form`
في حدث submit.

## refs

- [MDN: submit](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/submit)
- [WHATWG: Submit Button state](https://html.spec.whatwg.org/multipage/input.html#submit-button-state-(type=submit))
