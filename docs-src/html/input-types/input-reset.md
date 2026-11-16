---
id: input-reset
kind: inputtype
cat: input-types
chip: type="reset"
title: زرار المسح
en: <input type="reset">
status: stable
support: all
mdn: Elements/input/reset
summary: type="reset" بيرجّع كل حقول الفورم لقيمها الأصلية اللي في HTML. بيمسح اللي كتبه المستخدم من غير تأكيد، فبيتسبب في فقدان بيانات: استخدمه بحذر أو متستخدمهوش.
keywords: input reset, مسح فورم, reset, form.reset, القيم الافتراضية, defaultValue, فقدان بيانات, UX
related: input, input-submit, input-button, button, form
---

## intro

الزرار ده بيرجّع **كل حقول الفورم لقيمها الأصلية** (اللي كانت مكتوبة في `value` و`checked` و`selected` في الـ HTML وقت التحميل). يعني لو الحقل كان فاضي بيفضى، ولو كان فيه `value="أحمد"` بيرجع «أحمد». مفيش إرسال ولا اتصال بالسيرفر، كله محلي في المتصفح.

**نصيحة UX مهمة:** استخدامه **ضرر أكتر من نفع** في أغلب الأحيان. السبب: ضغطة بالغلط (جنب زرار الإرسال) بتمسح كل اللي المستخدم كتبه من غير تأكيد ولا تراجع. عشان كده معظم المواقع الحديثة **مبتحطش زرار reset**. لو لازم، حطه بعيد عن زرار الإرسال وبشكل مختلف، أو اسأل «متأكد؟» بـ `onclick="return confirm('...')"`. وبالجافاسكربت `form.reset()` بتعمل نفس الشيء. في JS الحدث `reset` بيحصل قبل المسح وتقدر تمنعه بـ `preventDefault()`.

> [!warn] ضغطة بالغلط على reset بتمسح كل حاجة من غير تراجع. اسأل المستخدم أو متستخدمهوش أصلاً.

## try

```html
<form>
  <input name="n" value="أحمد" placeholder="اسمك">
  <input name="m" placeholder="رسالة">
  <input type="reset" value="رجّع الأصل">
</form>
<p style="color:#64748b">عدّل الحقول بعدين اضغط الزرار.</p>
```

## syntax

```html nolive
<form>
  <input name="n" value="قيمة أصلية">
  <input type="reset" value="إعادة ضبط">
</form>
```

- `value` — النص على الزرار.
- بيرجّع القيم الأصلية في HTML (مش بيفضّيها دايماً).
- `form.reset()` — نفس الشيء بالجافاسكربت.

## use

- فورم فيه حقول كتير وفلاتر محتاجة «ابدأ من جديد».
- أدوات بحث متقدمة.
- بشكل مدروس ومع تأكيد.

## avoid

- متحطهوش جنب زرار الإرسال بنفس الشكل.
- متستخدمهوش من غير تأكيد في فورم طويل.

## examples

### 1) مع تأكيد
مثال على confirm.

```html
<form onreset="if (!confirm('تمسح كل حاجة؟')) event.preventDefault()">
  <input name="a" placeholder="اكتب">
  <input type="reset" value="مسح">
</form>
```

- حدث `reset` بيحصل قبل المسح.
- `preventDefault()` بيلغيه.
- التأكيد بيحمي من الغلط.

### 2) القيم الأصلية
مثال على defaultValue.

```html
<form id="f">
  <input name="n" value="الأصل">
  <input type="reset" value="رجّع">
</form>
<button onclick="o.textContent = f.n.defaultValue + ' / الحالية: ' + f.n.value">قارن</button>
<p id="o"></p>
```

- `defaultValue` هو قيمة HTML الأصلية.
- `value` هي الحالية.
- reset بيرجّع الأولى.

### 3) reset بالجافاسكربت
مثال على form.reset().

```html
<form id="f"><input name="x" value="مبدئي"></form>
<button onclick="f.reset()">إعادة ضبط</button>
```

- بدون زرار reset.
- بتتحكم في التوقيت.
- بيطلق حدث `reset` برضه.

### 4) زرار "مسح الفلاتر"
مثال استخدام معقول.

```html
<form id="f" onsubmit="event.preventDefault()">
  <label><input type="checkbox" name="a" checked> متاح</label>
  <label><input type="checkbox" name="b"> جديد</label>
  <button type="reset" style="background:none; border:0; color:#2563eb; cursor:pointer">مسح الفلاتر</button>
</form>
```

- شكله مختلف عن الإرسال (رابط).
- مناسب للفلاتر مش لفورم بيانات.
- القيم المبدئية بترجع.

## mistakes

### reset جنب submit بنفس الشكل
```html bad
<input type="submit" value="إرسال"><input type="reset" value="مسح">
```
```html good
<input type="submit" value="إرسال">
```
ليه؟ الضغط بالغلط بيمسح شغل المستخدم.

### توقّع التفريغ الكامل
```html bad
<!-- هل reset هيفضّي حقل فيه value="x"؟ -->
```
```html good
<!-- reset هيرجّع value="x" مش هيفضّيه -->
```
ليه؟ بيرجع للقيمة الأصلية في HTML.

## a11y

- وضّح إن الزرار بيمسح كل حاجة.
- اعمل تأكيد قبل المسح في الفورم الطويل.
- متحطهوش في أول مكان بيوصله الفوكس.

## quiz

### إيه اللي بيعمله reset؟
- [x] بيرجّع القيم الأصلية في HTML
- [ ] بيبعت الفورم
- [ ] بيحذف الصفحة
- [ ] بيعمل refresh
محلي فقط.

### مشكلته؟
- [x] بيمسح من غير تراجع
- [ ] بطيء
- [ ] مش بيشتغل
- [ ] محتاج سيرفر
خطأ ضغطة بيضيّع شغل.

### بالجافاسكربت؟
- [x] `form.reset()`
- [ ] `form.clear()`
- [ ] `form.empty()`
- [ ] `form.restore()`
نفس الأثر.

## refs

- [MDN: reset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/reset)
- [WHATWG: Reset Button state](https://html.spec.whatwg.org/multipage/input.html#reset-button-state-(type=reset))
