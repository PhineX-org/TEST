---
id: attr-readonly
kind: attribute
cat: attrs
chip: readonly
title: خاصية القراءة فقط
en: HTML readonly attribute
status: stable
support: all
mdn: Attributes/readonly
summary: خاصية readonly منطقية بتمنع المستخدم من تعديل قيمة الحقل لكنه لسه بياخد فوكس وبيتبعت مع الفورم وينفع ينسخ منه. بتشتغل على input وtextarea بس.
keywords: readonly, قراءة فقط, input readonly, textarea readonly, disabled, :read-only, نسخ, قيمة ثابتة, لا تعديل
related: input, textarea, attr-disabled, attr-required, input-text, form
---

## intro

`readonly` (خاصية منطقية) بتخلّي حقل النص **للعرض فقط**: المستخدم يشوف القيمة ويقدر يحدّدها وينسخها، لكن **مش يقدر يكتب أو يمسح**. بتشتغل على [[input]] (أنواع النص والأرقام والتواريخ…) و[[textarea]]. لا بتشتغل على الـ checkbox أو الـ radio أو الأزرار.

القيمة هنا **بتتبعت مع الفورم** والحقل **بياخد فوكس** بالتاب، وده الفرق الجوهري عن [[attr-disabled]]. فاستخدم `readonly` لما تعرض قيمة محسوبة أو ثابتة (رقم الطلب، السعر الإجمالي، رابط مشاركة) وتحب المستخدم يقدر ينسخها أو تتبعت للسيرفر. واستخدم `disabled` لما عايز الحقل «يختفي» وظيفياً.

ملحوظات: (1) في CSS الـ `:read-only` بيطابق حقول `readonly` وكمان عناصر مش قابلة للتعديل أصلاً. (2) `required` مبتشتغلش مع `readonly` (مفيش طريقة للمستخدم يملّيه). (3) القيمة ممكن تتغيّر من JavaScript، وممكن المستخدم يعدّلها من DevTools: فالسيرفر مبيثقش فيها.

## try

```html
<label>رقم الطلب: <input value="ORD-2026-1042" readonly></label>
<label>إجمالي: <input id="t" value="250" readonly> جنيه</label>
<button onclick="t.value = +t.value + 50">زوّد 50 (من الكود)</button>
```

## syntax

```html nolive
<input name="order_id" value="ORD-1042" readonly>
<textarea readonly>نص للقراءة فقط</textarea>
```

- `readonly` — boolean: مفيش تعديل.
- بيتبعت وبياخد فوكس وينفع ينسخ.
- مش بتشتغل على checkbox/radio/button.

## use

- عرض قيمة محسوبة (إجمالي، رقم طلب).
- رابط أو كود للنسخ.
- بيانات المستخدم مش مسموح يعدّلها.

## avoid

- متفتكرش إنها أمان: القيمة تتعدّل من DevTools.
- متستخدمش `readonly` على checkbox (مفيش تأثير).

## examples

### 1) رابط للنسخ
نسخ بزرار.

```html
<input id="l" value="https://phinex.com/ref/ahmed" readonly size="30" onclick="this.select()">
<button onclick="navigator.clipboard?.writeText(l.value); this.textContent = 'اتنسخ ✅'">انسخ</button>
```

- الـ select بيحدد النص كله.
- readonly بيمنع التعديل بس.
- `navigator.clipboard` محتاج سياق آمن.

### 2) readonly مقابل disabled
الإرسال.

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this))">
  <input name="r" value="قراءة" readonly>
  <input name="d" value="تعطيل" disabled>
  <button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

- `r` بيتبعت و`d` لأ.
- الأول بياخد فوكس.
- الثاني مش في ترتيب التاب.

### 3) تنسيق :read-only
مثال على CSS.

```html
<style>input:read-only { background:#f1f5f9; color:#475569 }</style>
<input value="قراءة فقط" readonly> <input value="قابل للتعديل">
```

- `:read-only` بيطابق الحقول المقفولة.
- خلفية رمادية تدّي إشارة.
- متخليهوش شبه معطّل.

### 4) قفل بعد الحفظ
مثال على JS.

```html
<input id="i" value="مسودة">
<button onclick="i.readOnly = !i.readOnly; this.textContent = i.readOnly ? 'فك القفل' : 'اقفل'">اقفل</button>
```

- الخاصية في JS اسمها `readOnly` (O كبيرة).
- بتتبدّل بسهولة.
- مفيدة لوضع «تعديل/عرض».

## mistakes

### readonly مع required
```html bad
<input readonly required>
```
```html good
<input readonly>
```
ليه؟ المستخدم مش هيقدر يملّيه فهيمنع الإرسال.

### توقع قفل حقيقي
```html bad
<input name="price" value="100" readonly>
```
```html good
<!-- السيرفر بيحسب السعر بنفسه -->
```
ليه؟ المستخدم يقدر يعدّل ويبعت.

## a11y

- readonly بيتقري كـ "للقراءة فقط" في قارئات الشاشة.
- خلّي شكله واضح إنه مش قابل للتعديل.
- متقفلش حقل بدون سبب واضح.

## quiz

### الفرق عن disabled؟
- [x] readonly بيتبعت وبياخد فوكس
- [ ] نفس الشيء
- [ ] disabled بيتبعت
- [ ] readonly للصور
الإرسال والفوكس.

### على checkbox؟
- [x] مفيش تأثير
- [ ] بيشتغل
- [ ] بيعطّله
- [ ] بيخفيه
للنصوص فقط.

### هل هي أمان؟
- [x] لأ، تتعدّل من DevTools
- [ ] أيوه
- [ ] لو POST
- [ ] مع HTTPS
السيرفر يتحقق.

## refs

- [MDN: readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/readonly)
- [MDN: :read-only](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only)
