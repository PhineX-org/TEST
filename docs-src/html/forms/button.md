---
id: button
kind: element
cat: forms
tag: button
title: عنصر الزرار
en: HTML button element
status: stable
display: inline-block
void: no
support: all
summary: زرار قابل للضغط بيبعت فورم أو يعمل Reset أو يشغّل جافاسكربت. بيقبل أي محتوى جواه نص وأيقونات، وبيتحكم فيه type وdisabled وform وformaction، وأفضل من input للأزرار.
keywords: button, زرار, زر, submit, reset, type, disabled, onclick, formaction, أيقونة, popovertarget, commandfor, اضغط
related: input, form, a, details, dialog
---

## intro

الـ `<button>` (**زرار**) هو العنصر اللي المستخدم بيضغط عليه عشان **يعمل حاجة**: يبعت فورم، يفتح قايمة، يضيف لسلة، يشغّل فيديو. وده بيختلف عن الرابط `<a>` اللي بينقلك لمكان تاني (**الرابط = تنقل، الزرار = فعل**). ولو استخدمت `<div>` كزرار هتخسر: لوحة المفاتيح (Tab وEnter وSpace) وقارئ الشاشة وحالة التعطيل، فاستخدم `<button>` دايماً.

مقارنة بـ `<input type="button">`: الـ `<button>` **بيقبل محتوى جواه** (نص منسّق، أيقونة، صورة، `<span>`)، فهو أقوى وأسهل في التصميم. أما الـ `<input>` فبياخد نص بس في `value`. ده السبب إن `<button>` هو المفضّل.

أهم خاصية: **`type`**. الافتراضي جوه الفورم هو **`submit`** (بيبعت الفورم)! ده بيسبب أخطاء كتير: زرار «إلغاء» أو «إضافة عنصر» جوه فورم بيبعت الفورم من غير ما تقصد. فاكتب **`type="button"`** للأزرار اللي مش للإرسال. القيم: `submit` و`reset` و`button`.

وفيه خاصية **`disabled`** لتعطيل الزرار (مبيتضغطش ومبيتفوكسش). وكمان خصائص `form*` (`formaction`, `formmethod`...) لتغيير إعدادات الفورم لزرار بعينه، و`popovertarget` لفتح popover من غير جافاسكربت.

> [!analogy] الـ `<button>` زي **زرار المصعد**: بتدوس عليه عشان يحصل فعل. أما `<a>` فزي **لافتة اتجاه**: بتوريك ناحية فين تمشي.

> [!key] `<button type="button">` لأي زرار مش للإرسال. الافتراضي جوه الفورم `submit`! استخدم `<button>` مش `<div>`.

## try

دوس على الزرار، وجرّب `disabled`.

```html
<button type="button" onclick="this.textContent = 'اتضغط ' + (this.n = (this.n||0)+1) + ' مرة'">اضغط عليا</button>
```

## syntax

```html nolive
<button type="submit">إرسال</button>
<button type="button" onclick="doSomething()">فعل</button>
<button type="reset">مسح</button>
<button disabled>معطّل</button>
```

- `<button ...>` — **الوسم الافتتاحي**.
- `type` — **`submit` (افتراضي في الفورم) أو `button` أو `reset`**.
- المحتوى — **نص أو أيقونة**.
- `disabled` — **للتعطيل**.
- `</button>` — **الوسم الختامي** إجباري.

## use

- لإرسال الفورمز.
- لتشغيل دوال جافاسكربت (فتح قايمة، إضافة للسلة).
- لتفاعلات الواجهة: تبويبات، قوايم منسدلة، مودال.
- لأزرار فيها أيقونة ونص.
- لفتح `<dialog>` أو popover.

## avoid

- متستخدمش `<div>` أو `<span>` كزرار.
- متستخدمش `<button>` لتنقل بين صفحات: `<a>`.
- متنساش `type="button"` للأزرار اللي جوه فورم ومش للإرسال.
- متحطش عناصر تفاعلية (رابط، حقل) جوه الزرار.

## attributes

### type
**نوع الزرار**: `submit` (بيبعت الفورم، افتراضي)، `reset` (بيرجّع الحقول)، `button` (مفيش سلوك افتراضي، للجافاسكربت).

```html nolive
<form><button type="button">مش هيبعت</button><button>هيبعت</button></form>
```

### disabled {boolean}
**يعطّل الزرار**: مبيتضغطش ومبيتبعتش مع الفورم ومبياخدش فوكس.

### name
**اسم الزرار** عند الإرسال (بيتبعت مع قيمته لو هو اللي ضغط).

### value
**قيمة الزرار** اللي بتتبعت مع `name`.

### form
**ربط الزرار بفورم** برّه اللي هو جواه.

### formaction
**عنوان إرسال بديل** لهذا الزرار بس.

### formmethod
**طريقة إرسال بديلة** (`get` أو `post`) لهذا الزرار بس.

### formenctype
**ترميز إرسال بديل** لهذا الزرار.

### formtarget
**هدف عرض بديل** لهذا الزرار.

### formnovalidate {boolean}
**بيتخطى التحقق** عند ضغط الزرار ده (مفيد لزرار «حفظ كمسودة»).

### popovertarget
**`id` لعنصر popover** يفتحه الزرار ويقفله من غير جافاسكربت.

### popovertargetaction
**الفعل**: `show` أو `hide` أو `toggle` (افتراضي).

### commandfor {experimental}
**`id` لعنصر يستقبل أمر** من الزرار (مثل فتح `<dialog>`). تجريبي حديث.

### command {experimental}
**الأمر** اللي يتنفّذ على العنصر الهدف (`show-modal`, `close`...). تجريبي.

### autofocus {boolean}
**ياخد الفوكس** عند تحميل الصفحة.

## examples

### 1) أنواع الأزرار
submit وreset وbutton.

```html
<form onsubmit="event.preventDefault(); document.getElementById('o').textContent='اتبعت الفورم'">
  <input name="x" placeholder="اكتب حاجة" style="padding:5px">
  <button type="submit">إرسال</button>
  <button type="reset">مسح</button>
  <button type="button" onclick="document.getElementById('o').textContent='زرار عادي، مبعتش'">فعل</button>
</form>
<p id="o"></p>
```

- `submit` بيبعت الفورم (واحنا مانعين الإرسال الحقيقي هنا).
- `reset` بيرجّع الحقل لقيمته الأصلية.
- `button` مبيعملش حاجة بنفسه، إنت اللي بتديه سلوك بالجافاسكربت.
- لو شلت `type` من الزرار الأخير هيتحول لـ `submit`.

### 2) زرار بأيقونة ونص
محتوى غني.

```html
<style>
  .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border:0; border-radius:10px;
         background:#0f172a; color:#fff; font:inherit; cursor:pointer; transition:transform .15s, background .15s }
  .btn:hover { background:#1e293b; transform:translateY(-1px) }
  .btn:active { transform:translateY(1px) }
  .btn:focus-visible { outline:3px solid #39ff14; outline-offset:2px }
</style>
<button type="button" class="btn"><span aria-hidden="true">🛒</span> أضف للسلة</button>
```

- الزرار بيقبل أيقونة (`span`) ونص جواه، وده مش ممكن مع `<input>`.
- `aria-hidden="true"` على الأيقونة عشان قارئ الشاشة يقرا النص بس.
- `:focus-visible` مهم: بيظهر مؤشر الفوكس لمستخدمي الكيبورد.
- `:hover` و`:active` بيدّوا إحساس بالضغط.

### 3) زرار معطّل
`disabled`.

```html
<button type="button" disabled>ماينفعش تضغط</button>
<button type="button" id="b" onclick="this.disabled = true; this.textContent = 'جاري الإرسال…'">ابعت</button>
```

- الأول معطّل من الأساس: مفيش ضغط ولا فوكس.
- التاني بيتعطّل بعد أول ضغطة عشان يمنع الإرسال المزدوج.
- ده نمط شائع بعد الضغط على «إرسال».
- تأكد تبيّن للمستخدم ليه معطّل (رسالة أو تلميح).

### 4) أزرار بإجراءات مختلفة
`formaction`.

```html
<form action="/save" method="post" onsubmit="event.preventDefault(); document.getElementById('r').textContent = event.submitter.formAction.split('/').pop() || 'save'">
  <textarea name="t" rows="2" style="width:100%">مسودة…</textarea>
  <button>نشر</button>
  <button formaction="/draft" formnovalidate>حفظ كمسودة</button>
</form>
<p>المسار: <b id="r"></b></p>
```

- الزرار التاني بيبعت لنفس الفورم لكن لعنوان مختلف `/draft`.
- `formnovalidate` بيسمح بحفظ المسودة حتى لو فيه حقول ناقصة.
- `event.submitter` بيقولك أنهي زرار اتضغط.

### 5) تبديل حالة
`aria-pressed`.

```html
<button type="button" aria-pressed="false" id="fav"
  onclick="const on = this.getAttribute('aria-pressed') === 'true'; this.setAttribute('aria-pressed', !on); this.textContent = on ? '☆ أضف للمفضلة' : '★ في المفضلة'">
  ☆ أضف للمفضلة
</button>
```

- `aria-pressed` بيعرّف قارئ الشاشة إن الزرار «تبديل» وحالته إيه.
- بنغيّر الحالة والنص مع كل ضغطة.
- لزرار فتح/إغلاق قايمة استخدم `aria-expanded`.

### 6) فتح popover بدون جافاسكربت
`popovertarget`.

```html h=150
<button popovertarget="tip">معلومة</button>
<div id="tip" popover style="padding:12px; border-radius:8px; border:1px solid #94a3b8">ده popover بيفتح من غير سكريبت!</div>
```

- الزرار بيشاور على `id` العنصر اللي فيه خاصية `popover`.
- المتصفح بيفتح ويقفل (حتى بـ Esc أو الضغط برّه) تلقائياً.
- دعم المتصفحات الحديثة، ولو مش مدعوم لازم بديل.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content** (من غير عناصر تفاعلية زي `<a>` و`<button>` و`<input>`).
- closing: الوسم الختامي `</button>` إجباري.
- role: `button`.
- dom: `HTMLButtonElement`.
- layout: `display: inline-block`.

## mistakes

### نسيان type جوه فورم
```html bad
<form>
  <button onclick="addItem()">أضف عنصر</button>
</form>
```
```html good
<form>
  <button type="button" onclick="addItem()">أضف عنصر</button>
</form>
```
ليه؟ الافتراضي `submit` فالضغطة هتبعت الفورم وتعمل إعادة تحميل.

### div كزرار
```html bad
<div class="btn" onclick="save()">حفظ</div>
```
```html good
<button type="button" class="btn" onclick="save()">حفظ</button>
```
ليه؟ الـ `<div>` مش بيتفوكس بالكيبورد ومش بيتعلن كزرار، ومش بيستجيب لـ Enter وSpace.

### رابط جوه زرار
```html bad
<button><a href="/page">اذهب</a></button>
```
```html good
<a href="/page" class="btn">اذهب</a>
```
ليه؟ عناصر تفاعلية متداخلة بتتصارع. لو بتنقل صفحة، استخدم `<a>` مصمم كزرار.

## a11y

- استخدم `<button>` الحقيقي: بياخد فوكس وEnter وSpace مجاناً.
- نص الزرار لازم يكون واضح («احذف الحساب» مش «اضغط هنا»).
- زرار الأيقونة بس محتاج `aria-label`.
- مؤشر الفوكس لازم يبان (`:focus-visible`).
- لو الزرار تبديل: `aria-pressed`. لو بيفتح قايمة: `aria-expanded`.
- الحد الأدنى لمنطقة الضغط على الموبايل حوالي 44×44 بكسل.

## tips

- اكتب `type` صريح دايماً.
- لمنع الإرسال المزدوج: عطّل الزرار بعد الضغط.
- `button.click()` بيشغّل الضغطة بالجافاسكربت.
- استخدم `<button>` مع `<dialog>` و`popover` بدل تكتب سكريبت.
- للأزرار اللي شكلها رابط: ممكن تنسّق الزرار بـ CSS ليظهر زي نص.

## quiz

### إيه نوع الزرار الافتراضي جوه الفورم؟
- [ ] `button`
- [x] `submit`
- [ ] `reset`
- [ ] `link`
عشان كده بنكتب `type="button"` لو مش للإرسال.

### ليه `<button>` أحسن من `<input type="button">`؟
- [ ] أسرع
- [x] بيقبل محتوى جواه زي أيقونات ونص منسّق
- [ ] أصغر
- [ ] مفيش فرق
الـ input بياخد نص بس.

### إيه الفرق بين الرابط والزرار؟
- [x] الرابط للتنقل والزرار لتنفيذ فعل
- [ ] مفيش فرق
- [ ] الرابط أسرع
- [ ] الزرار للصور
اختار حسب المعنى.

### إيه اللي بيحصل لو عطّلت الزرار بـ `disabled`؟
- [ ] بيتخفى
- [x] مبيتضغطش ومبياخدش فوكس ومبيتبعتش
- [ ] بيتغير لونه بس
- [ ] بيتحذف
تعطيل كامل.

## refs

- [MDN: button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
- [WHATWG: The button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
- [W3C WAI: Buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
