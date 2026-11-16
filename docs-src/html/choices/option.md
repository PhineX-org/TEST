---
id: option
kind: element
cat: choices
tag: option
title: عنصر الاختيار (option)
en: HTML option element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر option هو اختيار واحد جوه select أو optgroup أو datalist. بياخد value للإرسال ونص للعرض، وselected للاختيار الافتراضي، وdisabled للتعطيل، وlabel لنص بديل.
keywords: option, اختيار, select, optgroup, datalist, value, selected, disabled, label, عنصر قايمة
related: select, optgroup, datalist
---

## intro

الـ `<option>` هو **اختيار واحد** جوه قايمة [[select]] أو [[optgroup]] أو اقتراح جوه [[datalist]]. النص بين الوسمين هو **اللي المستخدم يشوفه**، والخاصية **`value`** هي **اللي بتتبعت للسيرفر** (لو مفيش `value` بيتبعت النص نفسه). يعني ممكن تعرض «القاهرة» وتبعت `cairo`.

وفيه `selected` (الاختيار الافتراضي)، و`disabled` (ظاهر لكن مش قابل للاختيار)، و`label` (نص بديل بيظهر بدل المحتوى). والـ option مبيقبلش جواه عناصر HTML، **نص فقط**.

> [!key] `<option value="للسيرفر">نص للعرض</option>`. `selected` و`disabled` للتحكم.

## try

```html
<select>
  <option value="1">واحد</option>
  <option value="2" selected>اتنين (افتراضي)</option>
  <option value="3" disabled>تلاتة (معطّل)</option>
</select>
```

## syntax

```html nolive
<option value="cairo" selected>القاهرة</option>
```

- `<option ...>` — **الوسم الافتتاحي**.
- `value` — **القيمة المتبعتة**.
- النص — **اللي بيظهر**.
- `</option>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لكل اختيار في قايمة.
- لاقتراحات في `<datalist>`.

## avoid

- متحطش HTML جوه الـ option: نص فقط.

## attributes

### value
**القيمة اللي بتتبعت.** لو مش موجودة بتتبعت النص.

### selected {boolean}
**الاختيار الافتراضي.**

### disabled {boolean}
**معطّل**: ظاهر لكن مش قابل للاختيار.

### label
**نص بديل** بيظهر بدل المحتوى.

## examples

### 1) value مختلف عن النص
الفرق.

```html
<select name="gov" onchange="document.getElementById('o').textContent = this.value">
  <option value="CAI">القاهرة</option>
  <option value="GZ">الجيزة</option>
</select>
<p>اللي هيتبعت: <b id="o">CAI</b></p>
```

- المستخدم بيشوف «القاهرة»، والسيرفر بياخد `CAI`.
- ده بيخلّي السيرفر يشتغل بأكواد ثابتة مهما اتغير النص.
- لو شلت `value`، هيتبعت النص «القاهرة».

### 2) اختيار افتراضي ومعطّل
`selected` و`disabled`.

```html
<select>
  <option value="" disabled selected>اختار…</option>
  <option value="a">اختيار أ</option>
  <option value="b" disabled>اختيار ب (غير متاح)</option>
</select>
```

- أول اختيار بيظهر كتلميح ومينفعش يتختار تاني.
- التاني معطّل: ظاهر باهت.
- ده نمط شائع في الفورمز.

### 3) option جوه datalist
اقتراحات.

```html
<input list="d" placeholder="اكتب لغة">
<datalist id="d">
  <option value="HTML">
  <option value="CSS" label="أوراق الأنماط">
  <option value="JS">
</datalist>
```

- في `<datalist>` الـ option مش بياخد نص جواه، بس `value`.
- `label` بيظهر كنص مساعد في بعض المتصفحات.
- ده اقتراح مش إجبار.

## rules

- parents: [[select]] أو [[optgroup]] أو [[datalist]].
- children: **نص فقط**.
- closing: الوسم الختامي `</option>` (يفضّل تكتبه).
- role: `option`.
- dom: `HTMLOptionElement`.
- layout: `display: block`.

## mistakes

### HTML جوه option
```html bad
<option><b>مهم</b></option>
```
```html good
<option>مهم</option>
```
ليه؟ الـ option بيقبل نص فقط، والباقي بيتجاهل.

## a11y

- نص الـ option لازم يكون واضح وفريد.
- لا تعتمد على اللون فقط.

## tips

- حط `value` دايماً.
- `option.selected = true` بالجافاسكربت.

## quiz

### إيه اللي بيتبعت للسيرفر؟
- [ ] النص دايماً
- [x] `value` (أو النص لو مفيش)
- [ ] `label`
- [ ] `id`
القيمة الرسمية.

### ينفع نحط `<b>` جوه `<option>`؟
- [ ] أيوه
- [x] لأ، نص فقط
- [ ] أيوه بشروط
- [ ] أيوه مع `style`
بيتجاهل الوسم.

## refs

- [MDN: option](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option)
- [WHATWG: The option element](https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element)
