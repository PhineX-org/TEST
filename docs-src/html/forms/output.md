---
id: output
kind: element
cat: forms
tag: output
title: عنصر الناتج (output)
en: HTML output element
status: stable
display: inline
void: no
support: all
size: compact
summary: عنصر output بيعرض نتيجة حساب أو إجراء داخل الفورم، وبيرتبط بالحقول المؤثرة بـ for، وبيتعلن لقارئ الشاشة تلقائياً كمنطقة حية، وبيتبعت مع الفورم بـ name.
keywords: output, ناتج, نتيجة, حساب, for, form, name, aria-live, حاسبة, range, oninput
related: input, form, label, progress, meter
---

## intro

لما بتعمل فورم فيه حساب: شريط تمرير بيتحكم في قيمة، أو حاسبة بتجمع رقمين، أو معاينة مباشرة، محتاج مكان تعرض فيه **النتيجة**. بدل `<span>` عادي فيه عنصر مخصوص: `<output>` (**ناتج**). هو **نتيجة** مرتبطة بحقول الفورم: بتشاور على الحقول المؤثرة بـ `for` (قايمة `id`)، وبيتعلن **تلقائياً** لقارئ الشاشة لما يتغيّر (دوره `status` ومعاه `aria-live="polite"` ضمنياً).

ممكن كمان تديله `name` فقيمته تتبعت مع الفورم، وبيتصفّر لما الفورم يعمل `reset`. وبتحدّث محتواه بالجافاسكربت (`output.value = ...` أو `textContent`).

> [!key] `<output for="a b" name="r">` لنتيجة حساب في الفورم، وبيتعلن لقارئ الشاشة.

## try

حرّك الشريط.

```html
<label>الصوت: <input type="range" id="r" value="30" oninput="o.value = this.value"></label>
<output id="o" for="r">30</output>
```

## syntax

```html nolive
<form oninput="sum.value = Number(a.value) + Number(b.value)">
  <input type="number" id="a"> + <input type="number" id="b"> =
  <output name="sum" for="a b">0</output>
</form>
```

- `<output ...>` — **الوسم الافتتاحي**.
- `for` — **`id`s الحقول المؤثرة**.
- `name` — **الاسم** (لو عايز ينتبعت).
- المحتوى — **النتيجة**.
- `</output>` — **الوسم الختامي** إجباري.

## use

- لعرض نتيجة حساب في فورم.
- لعرض قيمة شريط التمرير.
- لمعاينة مباشرة لإدخال المستخدم.

## avoid

- متستخدمهوش لمحتوى مش مرتبط بحقول (استخدم `<p>` أو `<span>`).

## attributes

### for
**قايمة `id` (مفصولة بمسافات)** للحقول المؤثرة على النتيجة.

### form
**ربط الناتج بفورم** برّه.

### name
**اسم الناتج**: بتوصله بالجافاسكربت ويتبعت مع الفورم.

## examples

### 1) حاسبة جمع
oninput على الفورم.

```html
<form oninput="sum.value = Number(a.value) + Number(b.value)" style="font-size:18px">
  <input type="number" id="a" value="5" style="width:60px"> +
  <input type="number" id="b" value="7" style="width:60px"> =
  <output name="sum" for="a b">12</output>
</form>
```

- الحدث `oninput` على الفورم بيتنفّذ عند أي تغيير في أي حقل.
- بنوصل للحقول بـ `name` أو `id` مباشرة.
- `output.value` بيحدّث النتيجة.
- `for="a b"` بيوضّح للمتصفح وقارئ الشاشة إيه الحقول المؤثرة.

### 2) قيمة شريط بنسبة
range.

```html
<form oninput="pct.value = rng.value + '%'">
  <label>التقدّم: <input type="range" name="rng" value="60"></label>
  <output name="pct" for="rng">60%</output>
</form>
```

- بنكتب القيمة مع علامة النسبة.
- ده بيحل مشكلة إن الشريط وحده مبيعرضش رقم.
- بيتحدّث مع كل حركة للشريط.

### 3) معاينة مباشرة
نص بيتكرر.

```html
<label>اكتب اسمك: <input id="nm" oninput="hi.value = 'أهلاً يا ' + this.value + ' 👋'"></label>
<p><output id="hi" for="nm"></output></p>
```

- النتيجة بتتحدّث مع كل حرف.
- قارئ الشاشة بيعلنها لما تتغيّر (من غير ما تكتب aria-live).
- مناسب لمعاينات النماذج والبحث.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</output>` إجباري.
- role: `status`.
- dom: `HTMLOutputElement`.
- layout: `display: inline`.

## mistakes

### نسيان for
```html bad
<output id="o"></output>
```
```html good
<output id="o" for="a b"></output>
```
ليه؟ `for` بيربط النتيجة بالحقول (مفيد للإتاحة والتوثيق).

## a11y

- دوره `status` فبيتعلن تلقائياً (منطقة حية مهذبة).
- متحدّثهوش بسرعة كبيرة (كل ضغطة مفتاح) لو النتيجة مزعجة لقارئ الشاشة.

## tips

- استخدم `oninput` على الفورم عشان تتابع كل الحقول مرة واحدة.
- قيمته بتتصفّر مع `reset`.

## quiz

### إيه فايدة `<output>`؟
- [ ] لإدخال نص
- [x] لعرض نتيجة حساب في الفورم وبتتعلن لقارئ الشاشة
- [ ] لرفع ملف
- [ ] للروابط
بيرتبط بالحقول بـ `for`.

### إيه الدور الضمني للـ `<output>`؟
- [x] `status`
- [ ] `button`
- [ ] `link`
- [ ] `img`
فبيتعلن عند التغيير.

## refs

- [MDN: output](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output)
- [WHATWG: The output element](https://html.spec.whatwg.org/multipage/form-elements.html#the-output-element)
