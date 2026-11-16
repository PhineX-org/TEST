---
id: label
kind: element
cat: forms
tag: label
title: عنصر الليبل
en: HTML label element
status: stable
display: inline
void: no
support: all
summary: بيربط نص وصف بحقل إدخال، فالضغط على النص يركّز الحقل أو يفعّل الـ checkbox، وقارئ الشاشة بيقرا الوصف مع الحقل. بتربطه بـ for وid أو بتلفّ الحقل جواه.
keywords: label, ليبل, تسمية, for, id, حقل, checkbox, radio, إتاحة, وصف الحقل, input, placeholder, control
related: input, form, textarea, select, button, fieldset, legend
---

## intro

حقل إدخال من غير وصف زي باب من غير لافتة: المستخدم ميعرفش يكتب فيه إيه. وكتير بيكتبوا الوصف في `placeholder` وده **غلط** لأنه بيختفي أول ما تكتب، ومبيتقراش صح في قارئات الشاشة. الحل الصح هو عنصر `<label>` (**ليبل**: لافتة أو تسمية) اللي **بيربط** نص الوصف **بحقل معين**.

بتربطه بطريقتين: **صريحة** بـ `for` و`id`: `<label for="email">` والحقل `<input id="email">` (بنفس القيمة)، أو **ضمنية** بإنك **تلف الحقل جوه الـ label** `<label>الاسم <input></label>`. والاتنين شغالين، والأولى أوضح ومرنة أكتر في التصميم.

والميزة الكبيرة: **الضغط على الـ label بيفعّل الحقل**. تدوس على كلمة «موافق» بيتعلّم الـ checkbox. تدوس على «ذكر» بيتعلّم الـ radio. تدوس على «الاسم» ينزل المؤشر في حقل الاسم. ده بيكبّر منطقة الضغط وده مهم جداً على الموبايل. كمان قارئ الشاشة بيقرا نص الـ label لما يوصل للحقل، وبكده المكفوف يعرف الحقل ده إيه.

> [!analogy] `<label>` زي **الاسم المكتوب على درج في مكتب**: «فواتير». من غيره لازم تفتح كل درج وتشوف جواه إيه. ولما تدوس على الاسم بيفتح لك الدرج.

> [!key] كل حقل = `<label>` مربوط بيه (`for` + `id` أو بلف الحقل). `placeholder` مش بديل.

## try

دوس على النص وشوف الـ checkbox بيتعلّم.

```html
<p><label><input type="checkbox"> أنا موافق على الشروط</label></p>
<p>
  <label for="n">الاسم:</label>
  <input id="n" name="n">
</p>
```

## syntax

```html nolive
<label for="email">الإيميل</label>
<input id="email" name="email" type="email">

<label>
  كلمة السر
  <input type="password" name="pass">
</label>
```

- `<label ...>` — **الوسم الافتتاحي**.
- `for` — **`id` الحقل** المرتبط.
- أو **لف الحقل** جوه الـ label.
- النص — **وصف الحقل**.
- `</label>` — **الوسم الختامي** إجباري.

## use

- لوصف كل حقل إدخال (نص، إيميل، كلمة سر).
- لنص الـ checkbox والـ radio (بيكبّر منطقة الضغط).
- لوصف `<select>` و`<textarea>`.

## avoid

- متستخدمش `placeholder` بدل الـ label.
- متحطش `<label>` من غير حقل مربوط.
- متكررش `id` في الصفحة: الربط هيتلخبط.
- متحطش أكتر من حقل تفاعلي جوه نفس الـ label.

## attributes

### for
**`id` الحقل** اللي الـ label بيوصفه. لازم يطابق `id` موجود وفريد في الصفحة.

```html nolive
<label for="age">السن</label>
<input id="age" type="number">
```

### form
**ربط الـ label بفورم** معين (نادراً).

### class
للتنسيق.

## examples

### 1) ربط بـ for وid
الأوضح.

```html
<style> label { display:block; font-weight:bold; margin-bottom:4px } input { padding:6px; margin-bottom:10px } </style>
<label for="u">اسم المستخدم</label>
<input id="u" name="u">
<label for="p">كلمة السر</label>
<input id="p" name="p" type="password">
```

- `for="u"` بيشاور على `id="u"`.
- دوسة على «اسم المستخدم» بتحط المؤشر في الحقل.
- قارئ الشاشة بيقول «اسم المستخدم، حقل نص» لما يوصل للحقل.

### 2) الحقل جوه الليبل
ربط ضمني.

```html
<label style="display:block; margin-bottom:8px">
  الاسم الأول
  <input name="fn">
</label>
<label style="display:block">
  اسم العيلة
  <input name="ln">
</label>
```

- من غير `for` ولا `id`، الربط بيتم لأن الحقل جوه الـ label.
- ده أسهل وبيتجنب مشاكل تكرار الـ `id`.
- عيبه إن التصميم بيتقيد بلفّ الحقل جوه الـ label.

### 3) Checkbox وradio
منطقة ضغط أكبر.

```html
<style>
  label.opt { display:flex; gap:8px; align-items:center; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; margin-bottom:6px; cursor:pointer }
  label.opt:has(input:checked) { background:#dcfce7; border-color:#16a34a }
</style>
<label class="opt"><input type="radio" name="g" checked> ذكر</label>
<label class="opt"><input type="radio" name="g"> أنثى</label>
<label class="opt"><input type="checkbox"> اشترك في النشرة</label>
```

- الصندوق كله (مش دايرة صغيرة بس) بيستجيب للضغط.
- `:has(input:checked)` بيلوّن الـ label لما الحقل بداخله يتعلّم.
- ده تحسين كبير لتجربة الموبايل.

### 4) نص إضافي ومساعدة
مع `aria-describedby`.

```html
<label for="pw">كلمة السر</label>
<input id="pw" type="password" aria-describedby="hint" minlength="8">
<small id="hint" style="display:block; color:#64748b">لازم 8 حروف على الأقل.</small>
```

- الـ label هو الاسم، والملاحظة في `aria-describedby` هي الوصف.
- قارئ الشاشة بيقرا الاتنين: «كلمة السر... لازم 8 حروف على الأقل».
- التفرقة مهمة: الاسم قصير، والتلميحات في الوصف.

### 5) label مخفي بصرياً
لبحث بزرار.

```html
<style>
  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap }
</style>
<form onsubmit="return false">
  <label for="q" class="sr-only">ابحث في الموقع</label>
  <input id="q" type="search" placeholder="ابحث…">
  <button>🔍</button>
</form>
```

- لو التصميم مفيهوش مكان لنص الـ label (حقل بحث)، تخفيه بصرياً بس يفضل متاح لقارئ الشاشة.
- ماتستخدمش `display:none` لأنه بيشيله من قارئ الشاشة.
- الـ `placeholder` هنا إضافة مش بديل.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content** (ومعاه حقل واحد على الأكتر، ومن غير `<label>` تاني).
- closing: الوسم الختامي `</label>` إجباري.
- role: مفيش (بيدّي اسم للحقل).
- dom: `HTMLLabelElement`.
- layout: `display: inline`.

## mistakes

### placeholder بدل label
```html bad
<input placeholder="الإيميل">
```
```html good
<label for="e">الإيميل</label>
<input id="e" placeholder="name@example.com">
```
ليه؟ الـ `placeholder` بيختفي وقت الكتابة وقارئ الشاشة مش دايماً بيقراه كاسم.

### for ما بيطابقش id
```html bad
<label for="mail">الإيميل</label>
<input id="email">
```
```html good
<label for="email">الإيميل</label>
<input id="email">
```
ليه؟ الاسمين مختلفين فمفيش ربط، والضغط على الـ label مش بيعمل حاجة.

### id مكرر
```html bad
<input id="x"><label for="x">أ</label>
<input id="x"><label for="x">ب</label>
```
```html good
<input id="x1"><label for="x1">أ</label>
<input id="x2"><label for="x2">ب</label>
```
ليه؟ الـ `id` لازم يكون فريد، وإلا كل الـ labels هتشاور على أول حقل.

## a11y

- ده أهم عنصر إتاحة في الفورمز: قارئ الشاشة بيستخدمه كاسم للحقل.
- نص الـ label لازم يكون واضح ومستقل («الإيميل» مش «هنا»).
- لو خبّيته بصرياً استخدم `sr-only` مش `display:none`.
- فكّر في `aria-label` فقط لما مفيش طريقة تانية.

## tips

- اربط الـ checkbox والـ radio بـ label عشان تكبّر منطقة الضغط.
- حط الـ label قبل الحقل في الغالب (وبعد الـ checkbox والـ radio).
- `label:has(:required)::after { content: " *" }` بيعلّم الحقول الإجبارية.

## quiz

### إزاي تربط label بحقل؟
- [ ] `name` و`value`
- [x] `for` + `id` أو لفّ الحقل جواه
- [ ] `class`
- [ ] `href`
الطريقتين شغالين.

### إيه اللي بيحصل لما تدوس على label مربوط بـ checkbox؟
- [ ] مفيش
- [x] الـ checkbox بيتعلّم أو بيتشال
- [ ] الصفحة بتتحدّث
- [ ] بيتحذف
ده من مزايا الربط.

### ليه `placeholder` مش بديل للـ label؟
- [x] بيختفي لما تكتب ومش دايماً بيتقري كاسم
- [ ] لأنه بطيء
- [ ] لأنه غامق
- [ ] مفيش سبب
الـ label دايماً ظاهر ومتاح.

## refs

- [MDN: label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)
- [WHATWG: The label element](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
- [W3C WAI: Form labels](https://www.w3.org/WAI/tutorials/forms/labels/)
