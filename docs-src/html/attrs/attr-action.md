---
id: attr-action
kind: attribute
cat: attrs
chip: action
title: خاصية وجهة الفورم
en: HTML action attribute
status: stable
support: all
mdn: Elements/form#action
summary: خاصية action على form بتحدد الـ URL اللي بتتبعت له بيانات الفورم لما يتبعت. لو فاضية أو مكتوبة بتبعت لنفس الصفحة. ممكن زرار submit يتخطّاها بـ formaction.
keywords: action, form action, formaction, إرسال, submit, URL, method, POST, GET, سيرفر, معالجة, endpoint
related: form, attr-method, input-submit, button, attr-target, attr-name
---

## intro

لما المستخدم يضغط إرسال في [[form]]، المتصفح بيجمّع كل الحقول (اللي ليها `name`) ويبعتها **لمكان**. المكان ده هو `action`: **URL** بتاع السكربت أو الصفحة أو الـ API اللي بتستقبل وتعالج البيانات على السيرفر: `action="/login"` أو `action="https://api.example.com/subscribe"`.

لو **مكتبتش action خالص** أو كانت فاضية، الفورم بيتبعت **لنفس URL الصفحة الحالية**. وبتتكامل مع [[attr-method]] (طريقة الإرسال: GET أو POST) و[[attr-target]] (فين يظهر الرد).

ميزة مهمة: الزرار نفسه يقدر يتخطّى الـ action بـ **`formaction`** على [[input-submit]] أو [[button]]، فنفس الفورم يبعت لوجهتين مختلفتين حسب الزرار («حفظ» و«حفظ كمسودة»). ولو الفورم بيتعالج بالجافاسكربت (fetch) مش محتاج action حقيقي، لكن اعمل `event.preventDefault()` علشان الصفحة متتحمّلش.

## try

```html
<form action="/subscribe" method="post" onsubmit="event.preventDefault(); o.textContent = 'هيبعت إلى: ' + this.getAttribute('action') + ' بطريقة ' + this.method.toUpperCase()">
  <input name="email" type="email" placeholder="إيميلك" required>
  <button>اشترك</button>
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<form action="/subscribe" method="post">
  <input name="email">
  <button>اشترك</button>
  <button formaction="/draft">مسودة</button>
</form>
```

- `action="/path"` — وجهة الإرسال.
- من غيرها بتبعت لنفس الصفحة.
- `formaction` على الزرار بيتخطّاها.

## use

- تحديد سكربت السيرفر اللي يعالج الفورم.
- أكتر من وجهة لنفس الفورم بـ `formaction`.
- إرسال لـ API خارجي.

## avoid

- متبعتش بيانات حساسة لـ URL غير آمن (http).
- متعتمدش على action فاضية في فورم بيتولّد ديناميكياً: حدّد المكان.

## examples

### 1) نفس الصفحة
من غير action.

```html
<form method="get" onsubmit="event.preventDefault(); o.textContent = 'لو مفيش action هيروح: ' + location.pathname.split('/').pop()">
  <input name="q" placeholder="بحث">
  <button>ابحث</button>
</form>
<p id="o" dir="ltr"></p>
```

- الصفحة بتبعت لنفسها.
- بيستخدم في صفحات بتعالج الإرسال بنفسها.
- ممكن يتحط الـ `?q=` في الـ URL مع GET.

### 2) أزرار بوجهات مختلفة
مثال على formaction.

```html
<form action="/publish" onsubmit="event.preventDefault(); o.textContent = event.submitter.getAttribute('formaction') || this.getAttribute('action')">
  <input name="title" value="عنوان">
  <button>نشر</button>
  <button formaction="/draft">مسودة</button>
</form>
<p id="o" dir="ltr"></p>
```

- الزرار التاني بيروح `/draft`.
- الأول بيروح `/publish`.
- نفس الحقول بتتبعت للاتنين.

### 3) أكتر من لغة
action نسبي.

```html nolive
<form action="../api/contact" method="post">…</form>
```

- المسار النسبي بيتحسب من الصفحة.
- المطلق `/api/contact` من جذر الموقع.
- URL كامل لموقع تاني ممكن.

### 4) قراءة action
مثال على form.action.

```html
<form id="f" action="/join"></form>
<button onclick="o.textContent = f.action">اقرا</button>
<p id="o" dir="ltr"></p>
```

- `form.action` بترجع URL مطلق.
- `getAttribute` بترجع الكتوب.
- ممكن تغيّره قبل الإرسال.

## mistakes

### نسيان method=post لبيانات حساسة
```html bad
<form action="/login"><input type="password" name="pw"></form>
```
```html good
<form action="/login" method="post"><input type="password" name="pw"></form>
```
ليه؟ GET بيحط البيانات في الـ URL: الباسورد هيبان.

### action لـ http غير آمن
```html bad
<form action="http://site.com/pay" method="post">
```
```html good
<form action="https://site.com/pay" method="post">
```
ليه؟ البيانات هتتبعت غير مشفّرة.

## a11y

- ردّ السيرفر لازم يوضّح نجح/فشل بنص واضح.
- متعملش إعادة توجيه مفاجئة من غير إخبار المستخدم.
- لو بتعالج بـ JS خلّي الفورم شغال حتى من غير JS.

## quiz

### لو مفيش action؟
- [x] بتبعت لنفس الصفحة
- [ ] مبيبعتش
- [ ] خطأ
- [ ] لـ /
URL الحالي.

### إزاي زرار يبعت لمكان مختلف؟
- [x] `formaction`
- [ ] `action` على الزرار
- [ ] `goto`
- [ ] `dest`
خاصية على الزرار.

### بيانات حساسة؟
- [x] POST وHTTPS
- [ ] GET
- [ ] من غير method
- [ ] HTTP
متحطش في الـ URL.

## refs

- [MDN: action](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#action)
- [WHATWG: Form submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-2)
