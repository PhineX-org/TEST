---
id: attr-name
kind: attribute
cat: attrs
chip: name
title: خاصية الاسم
en: HTML name attribute
status: stable
support: all
mdn: Elements/input#name
summary: خاصية name بتحدد اسم الحقل اللي بيتبعت مع الفورم (name=value). من غيرها الحقل مبيتبعتش. بتجمّع radio في مجموعة، وبتتستخدم في meta وiframe وmap كمان.
keywords: name, اسم الحقل, form data, name=value, radio group, meta name, iframe name, FormData, حقل, إرسال فورم
related: input, form, select, textarea, attr-value, attr-id
---

## intro

فيه خاصيتين بتتلخبط على المبتدئين: **`id`** و**`name`**. الـ `id` لتعريف العنصر في الصفحة (CSS وجافاسكربت وروابط)، أما **`name` فهو اسم البيان اللي بيتبعت مع الفورم**. لما تضغط إرسال، المتصفح بيبعت قايمة `name=value` لكل حقل. **حقل من غير `name` مبيتبعتش خالص**، حتى لو المستخدم كتب فيه.

يعني لو عندك `<input name="email" value="a@b.com">` السيرفر هيستقبل `email=a@b.com`. وبتستخدم نفس الاسم لأكتر من حقل في حالتين: **[[input-radio]]** (نفس الاسم = مجموعة واحدة)، و**[[input-checkbox]]** (نفس الاسم = قيم متعددة).

الخاصية بتظهر كمان في أماكن تانية بمعاني مختلفة: [[meta]] (`name="viewport"` اسم الإعداد)، و[[iframe]] (اسم الإطار عشان `target` يشاور عليه)، و[[map]] (اسم الخريطة). وفي JavaScript بتقدر توصل للحقول بالاسم: `form.elements.email` أو `form.email`.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <input name="user" placeholder="user" value="ahmed">
  <input placeholder="من غير name" value="مش هيتبعت">
  <button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<form>
  <input name="email" type="email">
  <input type="radio" name="level" value="1">
  <input type="radio" name="level" value="2">
</form>
```

- `name` — **المفتاح** في `name=value`.
- حقل من غير name = ميتبعتش.
- نفس الاسم لـ radio = مجموعة، ولـ checkbox = قايمة.

## use

- تسمية كل حقل في فورم.
- تجميع أزرار radio.
- اسم إعداد في `<meta>`.
- اسم iframe كهدف لـ `target`.

## avoid

- متنساش `name` على الحقول المهمة.
- متستخدمش مسافات أو رموز غريبة في الاسم.

## examples

### 1) قراءة FormData
الأسماء مفاتيح.

```html
<form onsubmit="event.preventDefault(); const d = Object.fromEntries(new FormData(this)); o.textContent = JSON.stringify(d)">
  <input name="first" value="أحمد">
  <input name="last" value="الجوهري">
  <button>اجمع</button>
</form>
<p id="o" dir="ltr"></p>
```

- `Object.fromEntries(new FormData(form))` بيحوّلها لـ object.
- الأسماء هي المفاتيح.
- مفيش name = مفيش مفتاح.

### 2) مجموعة radio
نفس الاسم.

```html
<label><input type="radio" name="size" value="S"> صغير</label>
<label><input type="radio" name="size" value="L" checked> كبير</label>
```

- نفس `name` بيخلّي واحد بس يتعلّم.
- الـ `value` بيتحدد القيمة المبعوتة.
- غير الاسم تنفصل المجموعة.

### 3) checkbox متعددة
قيم متكررة.

```html
<form onsubmit="event.preventDefault(); o.textContent = new FormData(this).getAll('hobby').join(', ') || 'ولا حاجة'">
  <label><input type="checkbox" name="hobby" value="قراءة"> قراءة</label>
  <label><input type="checkbox" name="hobby" value="برمجة"> برمجة</label>
  <button>اعرض</button>
</form>
<p id="o"></p>
```

- `getAll("hobby")` بترجّع كل القيم.
- الـ checkbox غير المتعلّم مبيتبعتش.
- السيرفر بيستقبل hobby أكتر من مرة.

### 4) الوصول عن طريق الاسم
مثال على form.elements.

```html
<form id="f"><input name="city" value="القاهرة"></form>
<button onclick="o.textContent = f.elements.city.value">اقرا city</button>
<p id="o"></p>
```

- `form.elements.name` أو `form.name`.
- بيشتغل لو الاسم صالح كمعرّف.
- بديل لـ `getElementById`.

## mistakes

### حقل من غير name
```html bad
<input id="email" type="email">
```
```html good
<input id="email" name="email" type="email">
```
ليه؟ الـ id مش بيتبعت: لازم name.

### خلط id وname
```html bad
<label for="e">إيميل</label><input name="e" type="email">
```
```html good
<label for="e">إيميل</label><input id="e" name="email" type="email">
```
ليه؟ الـ `for` بيشاور على id مش name.

## a11y

- الاسم ملهوش علاقة بقارئ الشاشة: الاسم الظاهر من الـ label.
- استخدم `autocomplete` مع الاسم الصح لتسهيل التعبئة.
- أسماء واضحة تسهّل صيانة الكود.

## quiz

### حقل من غير `name`؟
- [x] مبيتبعتش مع الفورم
- [ ] بيتبعت باسم فاضي
- [ ] بيتبعت باسم id
- [ ] بيتبعت دايماً
لازم name.

### أزرار radio في نفس المجموعة؟
- [x] نفس `name`
- [ ] نفس `id`
- [ ] نفس `class`
- [ ] نفس `value`
الاسم المشترك.

### الفرق بين id وname؟
- [x] id للتعريف، name للإرسال
- [ ] نفس الشيء
- [ ] name للـ CSS
- [ ] id للإرسال
وظايف مختلفة.

## refs

- [MDN: name](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#name)
- [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
