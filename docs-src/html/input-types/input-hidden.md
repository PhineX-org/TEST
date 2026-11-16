---
id: input-hidden
kind: inputtype
cat: input-types
chip: type="hidden"
title: الحقل المخفي
en: <input type="hidden">
status: stable
support: all
mdn: Elements/input/hidden
summary: type="hidden" حقل مش بيظهر للمستخدم لكن قيمته بتتبعت مع الفورم: لإرسال معرّفات أو tokens. مش سرّي ولا آمن: أي حد يقدر يشوفه ويعدّله من DevTools.
keywords: input hidden, حقل مخفي, CSRF token, id, معرّف, form data, DevTools, أمان, name value
related: input, form, attr-name, attr-value, button
---

## intro

حقل **مش بيظهر خالص** في الصفحة (مفيش مربع ولا label)، لكن `name` و`value` بتاعته **بتتبعت مع الفورم** زي أي حقل. بتستخدمه لما تحتاج تبعت معلومة **المستخدم مش محتاج يشوفها أو يعدّلها**: رقم المنتج اللي بيتعدّل، معرّف الصفحة، أو **CSRF token** (رمز بيحمي من هجمات تزوير الطلبات).

التحذير الأهم: **الحقل المخفي مش آمن ولا سرّي**. أي مستخدم يفتح DevTools يشوف القيمة ويعدّلها قبل الإرسال. فمتحطش فيه كلمات سر، أسعار تثق فيها (السعر لازم السيرفر يحسبه)، أو صلاحيات. القاعدة: **متثقش في أي قيمة جاية من العميل** حتى لو كانت في حقل مخفي، وتحقق منها في السيرفر. ومفيش داعي لـ `label` أو `required` أو `autocomplete` عليه.

> [!warn] الحقل المخفي **مش** مكان للأسرار. أي حد يقدر يعدّل قيمته من أدوات المطوّر. السيرفر لازم يتحقق من كل حاجة.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <input type="hidden" name="product_id" value="42">
  <input type="text" name="qty" value="1" size="3">
  <button>أضف للسلة</button>
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<input type="hidden" name="product_id" value="42">
```

- `name` و`value` بيتبعتوا، لكن مش بيظهروا.
- مش بياخد فوكس ولا بيتفحص.
- القيمة تتعدّل من JS أو DevTools.

## use

- معرّف سجل بيتعدّل.
- CSRF token (يولّده السيرفر).
- إرسال حالة بسيطة بين خطوات فورم.

## avoid

- متحطش أسرار أو أسعار أو صلاحيات فيه.
- متتوقعش إن المستخدم مش هيعدّلها.

## examples

### 1) معرّف سجل
تعديل بيانات.

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <input type="hidden" name="id" value="17">
  <input name="title" value="عنوان قديم">
  <button>حفظ</button>
</form>
<p id="o" dir="ltr"></p>
```

- الـ id بيوصل للسيرفر عشان يعرف أي سجل.
- المستخدم بيعدّل العنوان بس.
- السيرفر لازم يتأكد إنه يملك صلاحية على السجل 17.

### 2) CSRF token
مثال على token.

```html
<form method="post" action="/transfer" onsubmit="event.preventDefault(); o.textContent = this.csrf.value">
  <input type="hidden" name="csrf" value="a8f3c0e1d2b94c77">
  <button>تحويل</button>
</form>
<p id="o"></p>
```

- الـ token بيتولّد على السيرفر لكل جلسة.
- السيرفر بيرفض الطلب لو غلط.
- بيحمي من تزوير الطلبات من مواقع تانية.

### 3) تعبئة بالجافاسكربت
value من JS.

```html
<form onsubmit="event.preventDefault(); o.textContent = this.ts.value">
  <input type="hidden" name="ts">
  <button>ابعت</button>
</form>
<script>document.querySelector('[name=ts]').value = new Date().toISOString();</script>
<p id="o"></p>
```

- القيمة بتتحط وقت التحميل.
- ممكن تبعت وقت أو لغة المتصفح.
- برضه: السيرفر مبيثقش فيها.

### 4) ظاهر في DOM
مش مخفي من الكود.

```html
<input id="h" type="hidden" value="سرّي؟">
<button onclick="o.textContent = 'أي حد يقرا: ' + h.value">اعرض القيمة بالكود</button>
<p id="o"></p>
```

- الحقل مخفي بصرياً بس.
- القيمة متاحة لأي سكربت أو DevTools.
- دي نقطة الأمان الأساسية.

## mistakes

### سعر في حقل مخفي
```html bad
<input type="hidden" name="price" value="100">
```
```html good
<input type="hidden" name="product_id" value="42">
```
ليه؟ المستخدم يقدر يغيّر السعر. ابعت المعرّف بس وخلّي السيرفر يحسب السعر.

### سر في الحقل
```html bad
<input type="hidden" name="api_key" value="sk-123">
```
```html good
<!-- المفتاح على السيرفر فقط -->
```
ليه؟ أي حد يشوف الصفحة يشوف المفتاح.

## a11y

- مش بيظهر لقارئ الشاشة، فمتحطش فيه معلومة المستخدم محتاجها.
- مفيش داعي لـ label.
- لو محتاج المستخدم يشوف القيمة، استخدم حقل `readonly` مش `hidden`.

## quiz

### هل `hidden` آمن؟
- [x] لأ، يتعدّل من DevTools
- [ ] أيوه
- [ ] لو فيه token
- [ ] لو POST
متثقش في العميل.

### بيتبعت مع الفورم؟
- [x] أيوه name وvalue
- [ ] لأ
- [ ] بس لو required
- [ ] بس مع GET
زي أي حقل.

### استخدامه الشائع؟
- [x] معرّف سجل أو CSRF token
- [ ] كلمة سر
- [ ] السعر
- [ ] بيانات البطاقة
بيانات مش حساسة.

## refs

- [MDN: hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden)
- [WHATWG: Hidden state](https://html.spec.whatwg.org/multipage/input.html#hidden-state-(type=hidden))
