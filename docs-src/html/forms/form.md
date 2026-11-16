---
id: form
kind: element
cat: forms
tag: form
title: عنصر الفورم
en: HTML form element
status: stable
display: block
void: no
support: all
summary: حاوية بتجمّع حقول إدخال وأزرار وبتبعت بياناتها لسيرفر بـ action وmethod. بتتحقق من القيم تلقائياً قبل الإرسال، وبتتحكم فيها بجافاسكربت عن طريق FormData وحدث submit.
keywords: form, فورم, نموذج, استمارة, action, method, get, post, enctype, novalidate, autocomplete, submit, FormData, تسجيل, إرسال, تحقق
related: input, label, button, textarea, select, fieldset, legend, output
---

## intro

كل مرة بتسجّل حساب، أو بتبحث في جوجل، أو بتبعت رسالة «اتصل بنا»، إنت بتتعامل مع **فورم** (Form). العنصر `<form>` هو **الحاوية** اللي بتلمّ كل حقول الإدخال ([[input]] و[[textarea]] و[[select]]) والأزرار ([[button]]) في «طلب» واحد، ولما المستخدم يدوس إرسال، المتصفح بيجمّع القيم اللي فيها وبيبعتها **للسيرفر**.

الفورم بيشتغل بخاصيتين أساسيتين: **`action`** (عنوان الصفحة اللي هتستقبل البيانات) و**`method`** (طريقة الإرسال). فيه طريقتين: `get` (البيانات بتتحط في عنوان الصفحة `?q=كلمة`: مناسبة للبحث) و`post` (البيانات في جسم الطلب: مناسبة لكلمات السر والبيانات الحساسة والملفات). الافتراضي `get`.

الفورم بيعمل **تحقق (Validation) تلقائي** قبل الإرسال: لو حقل `required` فاضي أو الإيميل مش على شكل إيميل، المتصفح بيوقف الإرسال ويعرض رسالة. وده من غير سطر جافاسكربت. وتقدر تقفله بـ `novalidate` لو هتعمل التحقق بنفسك.

ومهم: **كل حقل لازم يكون له `name`** عشان قيمته تتبعت. حقل من غير `name` بيتجاهله الفورم. وفي الواجهات الحديثة غالباً بنمنع الإرسال التقليدي بجافاسكربت (`event.preventDefault()`) ونبعت البيانات بـ `fetch` من غير ما الصفحة تتحمّل من جديد، ونقرا القيم بـ `new FormData(form)`.

> [!analogy] `<form>` زي **ظرف**: بتحط فيه ورقة (حقول) كلها مكتوبة، وبتكتب عليه العنوان (`action`)، وبتختار طريقة الإرسال (`method`): بطاقة مفتوحة (`get`) يشوفها الكل، أو مظروف مقفول (`post`).

> [!key] `<form action method>` + حقول ليها `name` + زرار `type="submit"`. التحقق التلقائي بـ `required` و`type`. `post` للبيانات الحساسة.

## try

اكتب اسمك واضغط. (الإرسال متوقف في المعاينة وبنعرض القيم بدله.)

```html
<form id="f">
  <label>الاسم: <input name="user" required></label>
  <button>ابعت</button>
</form>
<p id="o"></p>
<script>
  document.getElementById('f').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('o').textContent = 'اتبعت: ' + new FormData(e.target).get('user');
  });
</script>
```

## syntax

```html nolive
<form action="/register" method="post" autocomplete="on">
  <label for="e">الإيميل</label>
  <input id="e" name="email" type="email" required>
  <button type="submit">سجّل</button>
</form>
```

- `<form ...>` — **الوسم الافتتاحي**.
- `action` — **عنوان استقبال البيانات**.
- `method` — **`get` أو `post`**.
- الحقول — لازم لكل حقل **`name`**.
- زرار الإرسال — `<button>` أو `<input type="submit">`.
- `</form>` — **الوسم الختامي** إجباري.

## use

- لتسجيل الدخول والتسجيل.
- لنماذج الاتصال والاستبيانات.
- للبحث في الموقع.
- لأي إدخال بيانات من المستخدم.
- لتجميع حقول للتحكم فيها بـ FormData.

## avoid

- متنساش `name` على الحقول.
- متحطش فورم جوه فورم: غير مسموح.
- متبعتش كلمة سر بـ `get`: بتظهر في العنوان والسجل.
- متعتمدش على التحقق في المتصفح وحده: لازم تتحقق في السيرفر كمان.
- متستخدمش `<div>` وأحداث بدل الفورم: بتخسر لوحة المفاتيح (Enter) والتحقق والإتاحة.

## attributes

### action
**عنوان استقبال البيانات.** لو فاضي بيتبعت لنفس الصفحة.

### method
**طريقة الإرسال**: `get` (الافتراضي، في العنوان) أو `post` (في الجسم) أو `dialog` (لإغلاق `<dialog>` جواه).

```html nolive
<form action="/search" method="get"><input name="q"></form>
```

### enctype
**نوع ترميز البيانات** مع `post`: `application/x-www-form-urlencoded` (افتراضي)، `multipart/form-data` (**لازم** مع رفع الملفات)، `text/plain`.

```html nolive
<form method="post" enctype="multipart/form-data"><input type="file" name="photo"></form>
```

### target
**مكان عرض الرد**: `_self` (افتراضي) أو `_blank` (تبويب جديد) أو اسم إطار.

### novalidate {boolean}
**يوقف التحقق التلقائي** عند الإرسال.

### autocomplete
**السماح بالإكمال التلقائي**: `on` أو `off` للفورم كله.

### name
**اسم الفورم**، بتوصله من `document.forms.name`.

### accept-charset
**ترميزات الحروف المقبولة** (نادراً، الافتراضي UTF-8).

### rel
**علاقة** الفورم بالمورد (زي `noopener` مع `target="_blank"`).

### autocapitalize
**تفعيل الحروف الكبيرة** تلقائياً على الموبايل للفورم كله.

## examples

### 1) فورم تسجيل بسيط
حقول وزرار.

```html
<form onsubmit="event.preventDefault(); this.querySelector('output').textContent = 'تم الإرسال ✔'" style="max-width:300px">
  <p><label>الاسم<br><input name="name" required style="width:100%"></label></p>
  <p><label>الإيميل<br><input name="email" type="email" required style="width:100%"></label></p>
  <button>سجّل</button> <output></output>
</form>
```

- `required` بيمنع الإرسال لو الحقل فاضي.
- `type="email"` بيتحقق من شكل الإيميل تلقائياً.
- الضغط على Enter جوه أي حقل بيبعت الفورم (ده من مزايا `<form>`).
- `preventDefault` هنا بس عشان المعاينة متنقلش من الصفحة.

### 2) GET وPOST
الفرق.

```html nolive
<!-- GET: البيانات في الرابط: /search?q=html -->
<form action="/search" method="get">
  <input name="q" type="search">
  <button>بحث</button>
</form>

<!-- POST: البيانات في جسم الطلب -->
<form action="/login" method="post">
  <input name="user">
  <input name="pass" type="password">
  <button>دخول</button>
</form>
```

- `get` للبحث والتصفية: الرابط قابل للمشاركة والحفظ.
- `post` للدخول والتسجيل وتعديل البيانات: البيانات مش بتظهر في الرابط.
- `get` متتبعش به بيانات حساسة، ومحدود الطول.

### 3) قراءة القيم بـ FormData
بالجافاسكربت.

```html
<form id="f2">
  <input name="city" value="القاهرة">
  <label><input type="checkbox" name="tag" value="html" checked> HTML</label>
  <label><input type="checkbox" name="tag" value="css"> CSS</label>
  <button>اعرض</button>
</form>
<pre id="o2"></pre>
<script>
  document.getElementById('f2').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    document.getElementById('o2').textContent =
      'city = ' + fd.get('city') + '\ntags = ' + fd.getAll('tag').join(', ');
  });
</script>
```

- `new FormData(form)` بيجمّع كل قيم الحقول اللي ليها `name`.
- `getAll` بتجيب كل القيم لنفس الاسم (زي الـ checkboxes).
- الـ checkbox غير المختارة مبتتبعتش خالص.
- بعد كده تقدر تبعتها بـ `fetch(url, {method:'POST', body: fd})`.

### 4) رفع ملف
`enctype`.

```html nolive
<form action="/upload" method="post" enctype="multipart/form-data">
  <label>صورتك: <input type="file" name="avatar" accept="image/*"></label>
  <button>ارفع</button>
</form>
```

- من غير `enctype="multipart/form-data"` الملف مش هيتبعت (هيتبعت اسمه بس).
- لازم `method="post"` مع رفع الملفات.
- `accept` بتحدد أنواع الملفات المسموحة في نافذة الاختيار.

### 5) حقل برّه الفورم
خاصية `form`.

```html
<form id="main" onsubmit="event.preventDefault(); document.getElementById('r').textContent = new FormData(this).get('extra')">
  <input name="a" placeholder="جوه الفورم">
  <button>ابعت</button>
</form>
<input form="main" name="extra" placeholder="برّه الفورم بس تابع له" value="قيمة برّه">
<p id="r"></p>
```

- الحقل التاني خارج الوسم `<form>` لكن `form="main"` بيربطه بيه.
- مفيد لما التخطيط ما بيسمحش تحط الحقل جوه الفورم.
- بيشتغل على الحقول والأزرار.

### 6) إيقاف التحقق التلقائي
`novalidate`.

```html
<form novalidate onsubmit="event.preventDefault(); this.querySelector('output').textContent = this.checkValidity() ? 'صالح' : 'فيه أخطاء (بتتحقق إنت)'">
  <input type="email" name="e" required placeholder="إيميل">
  <button>اختبر</button> <output></output>
</form>
```

- `novalidate` بيمنع المتصفح من عرض رسائله وإيقاف الإرسال.
- مفيد لما تعمل واجهة تحقق مخصصة بالجافاسكربت.
- لسه تقدر تستخدم `checkValidity()` و`reportValidity()` يدوياً.

## rules

- parents: أي عنصر بيقبل **Flow content** (غير `<form>` تاني).
- children: **Flow content** (من غير `<form>` متداخل).
- closing: الوسم الختامي `</form>` إجباري.
- role: `form` (لو ليه اسم).
- dom: `HTMLFormElement`.
- layout: `display: block`.

## mistakes

### نسيان name
```html bad
<form><input type="text"><button>ابعت</button></form>
```
```html good
<form><input type="text" name="user"><button>ابعت</button></form>
```
ليه؟ الحقل من غير `name` بيتجاهله الفورم ومبيتبعتش.

### كلمة سر بـ GET
```html bad
<form method="get"><input type="password" name="p"></form>
```
```html good
<form method="post"><input type="password" name="p"></form>
```
ليه؟ `get` بيحط كلمة السر في عنوان الصفحة والسجل.

### رفع ملف من غير enctype
```html bad
<form method="post"><input type="file" name="f"></form>
```
```html good
<form method="post" enctype="multipart/form-data"><input type="file" name="f"></form>
```
ليه؟ من غير `multipart/form-data` محتوى الملف مبيتبعتش.

### فورم جوه فورم
```html bad
<form><form></form></form>
```
```html good
<form></form>
<form></form>
```
ليه؟ الفورم المتداخل غير مسموح، والمتصفح بيتجاهل الداخلي.

## a11y

- كل حقل محتاج [[label]] مربوط بيه.
- جمّع الحقول المرتبطة في [[fieldset]] و[[legend]].
- رسائل الخطأ لازم تتقري (`aria-describedby` أو `aria-live`).
- متحذفش مؤشر الفوكس، ورتّب الحقول منطقياً.
- حط `autocomplete` مناسب (`email`, `name`, `current-password`) لتسهيل الملء.

## tips

- استخدم الأنواع الصح (`email` و`tel` و`number`): بتفتح الكيبورد المناسب على الموبايل.
- دايماً تحقق في السيرفر: التحقق في المتصفح ممكن يتجاوزه أي حد.
- لإرسال بدون إعادة تحميل: `fetch` مع `FormData`.
- `form.reset()` بيرجّع الحقول لقيمها الأصلية.
- `form.elements` بتدّيك كل الحقول.

## quiz

### إيه الفرق بين `get` و`post`؟
- [ ] مفيش فرق
- [x] `get` بيحط البيانات في الرابط، و`post` في جسم الطلب
- [ ] `post` أسرع
- [ ] `get` أحدث
`post` للبيانات الحساسة.

### ليه الحقل مش بيتبعت؟
- [ ] لأنه صغير
- [x] غالباً من غير `name`
- [ ] لأنه `placeholder`
- [ ] لأنه `id`
`name` شرط أساسي.

### إيه اللي لازم تضيفه لرفع ملف؟
- [ ] `type="file"` بس
- [x] `method="post"` و`enctype="multipart/form-data"`
- [ ] `action` فاضي
- [ ] `novalidate`
عشان الملف يتبعت فعلاً.

### إيه وظيفة `novalidate`؟
- [x] إيقاف التحقق التلقائي
- [ ] إيقاف الإرسال
- [ ] تشفير البيانات
- [ ] حذف الحقول
بتعمل التحقق بنفسك.

## refs

- [MDN: form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- [WHATWG: The form element](https://html.spec.whatwg.org/multipage/forms.html#the-form-element)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
