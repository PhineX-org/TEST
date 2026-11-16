---
id: input
kind: element
cat: forms
tag: input
title: عنصر الإدخال
en: HTML input element
status: stable
display: inline-block
void: yes
support: all
summary: أهم عنصر في الفورمز: حقل إدخال بياخد أكتر من 20 نوع حسب type، زي نص وإيميل ورقم وتاريخ ولون وملف وcheckbox وradio، مع تحقق تلقائي بـ required وpattern وmin وmax.
keywords: input, إدخال, حقل, text, email, password, number, range, date, time, color, file, checkbox, radio, search, tel, url, hidden, submit, placeholder, required, pattern, min, max, step, maxlength, autocomplete, disabled, readonly, datalist
related: label, form, button, textarea, select, datalist, fieldset, output
---

## intro

لو الفورم جسم، فالـ `<input>` هو **قلبه**. هو حقل بياخد من المستخدم معلومة: اسم، إيميل، رقم، تاريخ، لون، ملف، اختيار. وهو عنصر **فاضي (Void)**: مفيش وسم قفل ولا محتوى. وأغرب حاجة فيه: **عنصر واحد، أكتر من 20 شكل مختلف**، والفرق كله في خاصية واحدة: **`type`**.

الـ `type` بيحدد الحقل ده هيبقى إيه: `text` (نص عادي)، `email` (إيميل مع تحقق)، `password` (حروف مخفية)، `number` (رقم بأسهم)، `date` (منتقي تاريخ)، `color` (منتقي ألوان)، `file` (رفع ملف)، `checkbox` (مربع اختيار)، `radio` (اختيار واحد من مجموعة)، `range` (شريط تمرير)، `submit` (زرار إرسال)... وكل نوع بيدّيك **كيبورد مناسب على الموبايل وتحقق تلقائي وواجهة جاهزة** من غير جافاسكربت. لو كتبت نوع مش موجود، المتصفح بيعتبره `text`.

ولازم تعرف 3 خصائص أساسية لأي حقل: **`name`** (من غيره القيمة مبتتبعتش مع الفورم)، **`id`** (عشان تربطه بـ [[label]])، و**`value`** (القيمة الحالية/الافتراضية). وفيه خصائص التحقق: `required` (إجباري)، `min`/`max`، `minlength`/`maxlength`، `pattern` (تعبير نمطي).

والقاعدة الذهبية: **كل `<input>` له `<label>`** مربوط بيه. الـ `placeholder` تلميح مش بديل.

> [!analogy] الـ `<input>` زي **مفتاح كهربا متعدد الأشكال**: نفس المكان في الحيطة، لكن ممكن يبقى زرار، أو دمّر، أو مقبس، حسب النوع اللي تركّبه (`type`).

> [!key] `<input type name id>` + `<label>`. اختار النوع الصح (`email`, `tel`, `number`...) والمتصفح بيشتغل لك. `name` إجباري للإرسال.

## try

غيّر `type` لـ `email` أو `date` أو `color` وشوف الحقل بيتحول.

```html
<label>جرّب النوع: <input type="text" name="x" placeholder="اكتب هنا"></label>
```

## syntax

```html nolive
<label for="email">الإيميل</label>
<input type="email" id="email" name="email"
       placeholder="name@example.com" required autocomplete="email">
```

- `<input ...>` — وسم **واحد بس**، ومفيش `</input>`.
- `type` — **نوع الحقل**.
- `name` — **اسم القيمة** عند الإرسال.
- `id` — **للربط بالـ label**.
- `value` — **القيمة**.
- خصائص التحقق: `required`, `min`, `max`, `pattern`...

## use

- لأي بيانات مفردة من المستخدم: اسم، إيميل، رقم تليفون.
- لاختيارات: مربع (checkbox) أو اختيار واحد (radio).
- لتواريخ وأوقات وألوان وملفات.
- لأزرار إرسال وإعادة (`submit`, `reset`, `button`).
- لحقول مخفية تحمل بيانات (`hidden`).

## avoid

- متستخدمش `type="text"` لكل حاجة: استخدم النوع المناسب.
- متنساش `<label>` و`name`.
- متستخدمش `placeholder` كـ label.
- متعتمدش على التحقق في المتصفح وحده.
- متستخدمش `type="number"` لأرقام الهاتف والبطاقات: استخدم `tel` أو `text` مع `inputmode="numeric"`.

## attributes

### type
**نوع الحقل.** الافتراضي `text`. الأنواع الرئيسية في القايمة اللي بعد كده (والأمثلة بتغطيها).

- نصوص: [[input-text|text]], [[input-search|search]], [[input-email|email]], [[input-url|url]], [[input-tel|tel]], [[input-password|password]]
- أرقام: [[input-number|number]], [[input-range|range]]
- تواريخ: [[input-date|date]], [[input-time|time]], [[input-datetime-local|datetime-local]], [[input-month|month]], [[input-week|week]]
- اختيارات: [[input-checkbox|checkbox]], [[input-radio|radio]]
- ملفات وألوان: [[input-file|file]], [[input-color|color]]
- أزرار: [[input-submit|submit]], [[input-reset|reset]], [[input-button|button]], [[input-image|image]]
- مخفي: [[input-hidden|hidden]]

كل نوع ليه صفحة مستقلة في تصنيف «أنواع حقل input».

### name
**اسم الحقل** اللي بيتبعت مع القيمة. إجباري عملياً (وللـ radio، نفس الاسم بيجمّع المجموعة).

### value
**القيمة الحالية أو الافتراضية.** للـ checkbox والـ radio هي القيمة اللي بتتبعت لو اتعلّمت.

### placeholder
**تلميح** بيظهر لما الحقل فاضي. مش بديل للـ label.

### required {boolean}
**إجباري**: الفورم مش بيتبعت لو فاضي.

### disabled {boolean}
**معطّل**: مش بيتقبل تفاعل ومش بيتبعت مع الفورم.

### readonly {boolean}
**للقراءة بس**: مش بيتعدّل لكن بيتبعت مع الفورم.

### checked {boolean}
**معلّم مسبقاً** (للـ checkbox والـ radio).

### min
**أقل قيمة** (للأرقام والتواريخ).

### max
**أعلى قيمة** (للأرقام والتواريخ).

### step
**حجم الخطوة** للأرقام والتواريخ (مثلاً `0.01` أو `5`). القيمة `any` بتسمح بأي قيمة.

### minlength
**أقل عدد حروف** للنص.

### maxlength
**أقصى عدد حروف** للنص.

### pattern
**تعبير نمطي (Regex)** لازم القيمة تطابقه، مثلاً `[0-9]{11}`.

```html nolive
<input pattern="01[0-9]{9}" title="رقم موبايل مصري" required>
```

### autocomplete
**تلميح للإكمال التلقائي**: `name`, `email`, `tel`, `username`, `current-password`, `new-password`, `off`...

### autofocus {boolean}
**ياخد الفوكس** أول ما الصفحة تفتح (استخدمه بحذر).

### multiple {boolean}
**يسمح بأكتر من قيمة** في `email` و`file`.

### accept
**أنواع الملفات المسموحة** في `type="file"`، زي `image/*` أو `.pdf`.

### list
**`id` لـ `<datalist>`** فيه اقتراحات.

### size
**عرض الحقل بعدد الحروف** (للنص).

### inputmode
**نوع كيبورد الموبايل**: `numeric`, `decimal`, `tel`, `email`, `url`, `search`.

### form
**ربط الحقل بفورم** برّه اللي هو جواه.

### formaction
**عنوان إرسال بديل** (لأزرار `submit` و`image`).

### alt
**نص بديل** لـ `type="image"`.

### src
**صورة الزرار** لـ `type="image"`.

### align {deprecated}
كانت بتحاذي حقل الصورة. **قديمة**: CSS.

### usemap {deprecated}
كانت بتربط الحقل بخريطة صورة. **قديمة**.

## examples

### 1) أنواع النصوص
`text` و`email` و`password` و`url` و`tel` و`search`.

```html
<style> label { display:block; margin:6px 0 } input { padding:5px; width:210px } </style>
<label>نص <input type="text" name="a"></label>
<label>إيميل <input type="email" name="b" placeholder="a@b.com"></label>
<label>كلمة سر <input type="password" name="c"></label>
<label>رابط <input type="url" name="d" placeholder="https://"></label>
<label>تليفون <input type="tel" name="e" placeholder="010…"></label>
<label>بحث <input type="search" name="f"></label>
```

- كل نوع بيفتح كيبورد مناسب على الموبايل (`email` فيه `@`، و`tel` أرقام).
- `password` بيخفي الحروف بنقط.
- `email` و`url` بيتحققوا من الشكل تلقائياً عند الإرسال.
- `search` شبه `text` لكن بزرار مسح في بعض المتصفحات.

### 2) الأرقام والشريط
`number` و`range`.

```html
<label>العمر: <input type="number" name="age" min="1" max="120" step="1" value="25"></label>
<br><br>
<label>الصوت: <input type="range" name="v" min="0" max="100" value="40"
  oninput="document.getElementById('rv').textContent = this.value"></label>
<output id="rv">40</output>
```

- `number` بيقبل أرقام بس، ومعاه أسهم زيادة ونقصان.
- `min` و`max` و`step` بيحددوا النطاق والخطوة.
- `range` شريط تمرير، وبنعرض قيمته بـ `oninput`.
- الـ `range` ممكن تعمله ملصقات بـ `datalist`.

### 3) التواريخ والأوقات
`date` و`time` وغيرها.

```html
<style> label { display:block; margin:6px 0 } </style>
<label>التاريخ <input type="date" name="d" value="2026-10-31"></label>
<label>الوقت <input type="time" name="t" value="14:30"></label>
<label>تاريخ ووقت <input type="datetime-local" name="dt"></label>
<label>الشهر <input type="month" name="m"></label>
<label>الأسبوع <input type="week" name="w"></label>
```

- المتصفح بيعرض منتقي تواريخ جاهز (تقويم).
- القيمة بصيغة ثابتة (`2026-10-31`) بغض النظر عن لغة العرض.
- `min` و`max` بتحدّد النطاق المسموح.
- في المتصفحات القديمة أو بعض الحالات بيتحوّل لحقل نص عادي.

### 4) Checkbox وradio
اختيارات.

```html
<fieldset style="border:1px solid #cbd5e1; border-radius:8px; margin-bottom:10px">
  <legend>اللغات اللي بتعرفها (متعدد)</legend>
  <label><input type="checkbox" name="lang" value="html" checked> HTML</label>
  <label><input type="checkbox" name="lang" value="css"> CSS</label>
</fieldset>
<fieldset style="border:1px solid #cbd5e1; border-radius:8px">
  <legend>المستوى (واحد بس)</legend>
  <label><input type="radio" name="lvl" value="b" checked> مبتدئ</label>
  <label><input type="radio" name="lvl" value="m"> متوسط</label>
</fieldset>
```

- الـ checkbox مستقل: كل واحد تعلّمه أو تشيله.
- الـ radio بنفس `name` بيكوّنوا مجموعة، تختار واحد بس.
- القيمة اللي بتتبعت هي `value` للمعلَّم.
- جمّعناهم في `<fieldset>` و`<legend>` للإتاحة.

### 5) ملف ولون
`file` و`color`.

```html
<label>صورة: <input type="file" name="img" accept="image/*"></label>
<br><br>
<label>اللون المفضّل: <input type="color" name="c" value="#39ff14"></label>
<br><br>
<label>عدة ملفات: <input type="file" name="many" multiple></label>
```

- `file` بيفتح نافذة اختيار ملف، و`accept` بيحدد النوع.
- `multiple` بيسمح بأكتر من ملف.
- `color` بيفتح منتقي ألوان، وقيمته `#rrggbb`.
- لازم الفورم `enctype="multipart/form-data"` عشان الملف يتبعت.

### 6) التحقق التلقائي
`required` و`pattern`.

```html
<form onsubmit="event.preventDefault(); this.querySelector('output').textContent = '✔ كل القيم صحيحة'">
  <p><label>موبايل مصري:
    <input name="m" pattern="01[0-9]{9}" title="11 رقم يبدأ بـ 01" required inputmode="numeric" maxlength="11">
  </label></p>
  <p><label>الباسورد:
    <input type="password" name="p" minlength="8" required>
  </label></p>
  <button>تحقق</button> <output></output>
</form>
```

- `pattern` بيطابق القيمة بتعبير نمطي، و`title` بيشرح الشرط لو فشل.
- `minlength` و`required` بيمنعوا الإرسال.
- المتصفح بيعرض رسالة الخطأ تلقائياً ويركّز على الحقل الغلط.
- `inputmode="numeric"` بيفتح لوحة أرقام على الموبايل.

### 7) اقتراحات بـ datalist
`list`.

```html
<label>المدينة:
  <input list="cities" name="city" placeholder="ابدأ اكتب…">
</label>
<datalist id="cities">
  <option value="القاهرة">
  <option value="الإسكندرية">
  <option value="الأقصر">
  <option value="أسوان">
</datalist>
```

- `list` بيشاور على `id` الـ `<datalist>`.
- المستخدم يكتب ويظهر له اقتراحات، لكن لسه ممكن يكتب قيمة تانية.
- ده وسط بين `text` و`<select>`.

### 8) حقل مخفي وأزرار
`hidden` و`submit` و`reset`.

```html
<form onsubmit="event.preventDefault(); this.querySelector('output').textContent = 'token=' + this.token.value + ', name=' + this.nm.value">
  <input type="hidden" name="token" value="abc123">
  <input name="nm" placeholder="اسمك">
  <input type="submit" value="إرسال">
  <input type="reset" value="مسح">
  <output></output>
</form>
```

- `hidden` بيشيل بيانات مش ظاهرة (رقم المستخدم مثلاً)، لكن مش آمن: أي حد يقدر يشوفه ويعدّله.
- `submit` بيبعت الفورم، و`reset` بيرجّع الحقول للقيم الأصلية.
- بدل `<input type="submit">` الأفضل `<button>` عشان تحط محتوى جواه.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **مفيش**. عنصر فاضي (Void).
- closing: **مفيش وسم قفل**.
- role: بيتغير حسب `type` (`textbox`, `checkbox`, `radio`, `spinbutton`, `slider`, `button`, `searchbox`...).
- dom: `HTMLInputElement`.
- layout: `display: inline-block`، Replaced-like element.

## mistakes

### input من غير name
```html bad
<input type="email" id="e">
```
```html good
<input type="email" id="e" name="email">
```
ليه؟ من غير `name` القيمة مش بتتبعت مع الفورم.

### نوع غلط للرقم
```html bad
<input type="number" name="phone">
```
```html good
<input type="tel" name="phone" inputmode="tel" autocomplete="tel">
```
ليه؟ رقم الهاتف مش رقم حسابي: ممكن يبدأ بصفر وفيه `+`. و`number` بيحذف الأصفار وبيعمل أسهم مالهاش لازمة.

### radio من غير نفس الاسم
```html bad
<input type="radio" name="a"> <input type="radio" name="b">
```
```html good
<input type="radio" name="lvl" value="a"> <input type="radio" name="lvl" value="b">
```
ليه؟ الـ radio مجموعة بتتحدد بالاسم. أسماء مختلفة = مجموعات مختلفة وتقدر تختار الاتنين.

### وسم قفل
```html bad
<input type="text"></input>
```
```html good
<input type="text">
```
ليه؟ `<input>` فاضي ومالوش وسم قفل.

### placeholder كبديل للعنوان
```html bad
<input type="text" placeholder="الاسم">
```
```html good
<label for="n">الاسم</label>
<input id="n" type="text" placeholder="مثلاً: أحمد">
```
ليه؟ الـ `placeholder` بيختفي وبيصعّب القراءة. استخدم `<label>`.

## a11y

- كل حقل **لازم له `<label>`** (أو `aria-label` كحل أخير).
- `required` ممكن يتكمّل بـ `aria-required` لو بتتحقق بنفسك.
- جمّع الـ radio والـ checkbox المرتبطين في [[fieldset]] و[[legend]].
- حط `autocomplete` المناسب عشان يساعد المستخدم (خاصة ذوي الإعاقات الحركية).
- رسائل الخطأ تتربط بالحقل بـ `aria-describedby` وتتعلن.
- تباين اللون والحدود لازم يكون واضح، ومتخفيش مؤشر الفوكس.

## tips

- استخدم `type="search"` و`enterkeyhint` لتحسين الموبايل.
- `autocomplete="new-password"` لحقل تسجيل كلمة سر جديدة.
- ماتستخدمش `maxlength` للحدود الأمنية: التحقق في السيرفر.
- لتغيير شكل الـ checkbox والـ radio استخدم `accent-color`.
- `input.value` و`input.checked` بيقروا ويكتبوا القيمة بالجافاسكربت.
- `input.setCustomValidity('رسالة')` لرسائل تحقق مخصصة.

## quiz

### إيه الخاصية اللي بتغيّر شكل `<input>`؟
- [ ] `kind`
- [x] `type`
- [ ] `style`
- [ ] `mode`
`type` بيحدد الحقل ده نص ولا رقم ولا تاريخ...

### ليه الحقل ما اتبعتش مع الفورم؟
- [ ] لأنه صغير
- [x] غالباً من غير `name`
- [ ] لأنه `text`
- [ ] لأن له `id`
الاسم شرط الإرسال.

### إزاي تعمل مجموعة radio؟
- [ ] نفس الـ `id`
- [x] نفس الـ `name`
- [ ] نفس الـ `value`
- [ ] نفس الـ `class`
بنفس الاسم بتختار واحد بس.

### أنهي أنسب لرقم تليفون؟
- [ ] `type="number"`
- [x] `type="tel"`
- [ ] `type="range"`
- [ ] `type="date"`
بيفتح لوحة أرقام ومبيحذفش الأصفار.

### إيه الفرق بين `readonly` و`disabled`؟
- [x] `readonly` بيتبعت ومش بيتعدّل، و`disabled` مش بيتبعت
- [ ] مفيش فرق
- [ ] `disabled` بيتبعت
- [ ] `readonly` بيخفي
ده فرق مهم في الإرسال.

## refs

- [MDN: input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
- [WHATWG: The input element](https://html.spec.whatwg.org/multipage/input.html)
- [MDN: HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types)
