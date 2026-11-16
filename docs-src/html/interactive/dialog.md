---
id: dialog
kind: element
cat: interactive
tag: dialog
title: عنصر النافذة المنبثقة
en: HTML dialog element
status: stable
display: block
void: no
support: all
summary: نافذة حوار منبثقة (مودال أو عادية) بتتفتح بـ showModal وshow وتتقفل بـ close. المودال بيحجب الصفحة ويحبس الفوكس ويقفل بـ Esc، وبيدعم form method=dialog وتنسيق ::backdrop.
keywords: dialog, مودال, modal, نافذة, popup, showModal, show, close, backdrop, form method dialog, returnValue, Esc, closedby, حوار, تأكيد, top layer
related: button, form, details, div, summary
---

## intro

كل موقع محتاج نافذة منبثقة: «هل أنت متأكد من الحذف؟»، «سجّل دخولك»، «تفاصيل المنتج». زمان كنا بنعملها بـ `<div>` و`position: fixed` وخلفية سودا وسكريبتات تحبس الفوكس وتقفل بـ Esc: شغل كتير وأخطاء إتاحة. الـ `<dialog>` (**حوار**) عنصر جاهز بيعمل كل ده.

بيشتغل بطريقتين: **مودال** (`dialog.showModal()`): بيتعرض في **الطبقة العليا (Top Layer)** فوق كل حاجة، بخلفية معتمة `::backdrop`، **بيحجب الصفحة** (inert) ويحبس الفوكس جواه، وبيتقفل بـ **Esc**. و**غير مودال** (`dialog.show()`): بيظهر جنب المحتوى من غير ما يحجب باقي الصفحة. وتقفله بـ `dialog.close()`.

وخاصية **`open`** بتعرضه، لكن **الأفضل** تستخدم `showModal()` مش `open` المباشرة (لأن `open` من غير `showModal` بيعمله غير مودال ومن غير backdrop). ومميزة جداً: **`<form method="dialog">`** جوه الـ dialog: لما تدوس زرار الإرسال، الـ dialog **بيتقفل** من غير جافاسكربت، و`value` الزرار بيتحط في `dialog.returnValue`.

والـ `<dialog>` مخفي افتراضياً (`display: none`) لحد ما يتفتح. وبيتنسّق بـ CSS (الحجم، الحواف، الخلفية)، وبيتنسّق الغطاء بـ `::backdrop`.

> [!analogy] الـ `<dialog>` المودال زي **شباك خدمة في بنك**: بيطلع قدامك، الباقي بيتغطّي، وإنت لازم تخلّص معاه (أو تدوس Esc) قبل ما ترجع للباقي.

> [!key] `dialog.showModal()` للمودال، `close()` للقفل، `<form method="dialog">` للأزرار. Esc بيقفله تلقائياً.

## try

افتح المودال وقفله بـ Esc أو الزرار.

```html h=300
<button onclick="document.getElementById('d').showModal()">افتح النافذة</button>
<dialog id="d" style="border:0; border-radius:12px; padding:20px; box-shadow:0 10px 40px #0006">
  <h3 style="margin-top:0">أهلاً 👋</h3>
  <p>دي نافذة مودال حقيقية.</p>
  <form method="dialog"><button>إغلاق</button></form>
</dialog>
```

## syntax

```html nolive
<dialog id="d">
  <p>محتوى</p>
  <form method="dialog">
    <button value="ok">موافق</button>
    <button value="cancel">إلغاء</button>
  </form>
</dialog>
<script>
  document.getElementById('d').showModal();
</script>
```

- `<dialog ...>` — **الوسم الافتتاحي**.
- `showModal()` — **فتح مودال**، و`show()` غير مودال.
- `<form method="dialog">` — **قفل بزرار**.
- `close()` — **القفل بالكود**.
- `</dialog>` — **الوسم الختامي** إجباري.

## use

- لتأكيد إجراء («هل تريد الحذف؟»).
- لنماذج منبثقة (تسجيل دخول، إضافة عنصر).
- لعرض تفاصيل أو صورة مكبّرة.
- لرسائل مهمة تحتاج انتباه.
- لقوايم جانبية (drawer) بتنسيق مخصص.

## avoid

- متستخدمش `open` المباشرة للمودال: `showModal()`.
- متفتحش نوافذ منبثقة بدون سبب: بتضايق المستخدم.
- متنساش طريقة للإغلاق (زرار وEsc).
- متحطش محتوى طويل جداً من غير تمرير.

## attributes

### open {boolean}
**الحوار مفتوح (غير مودال).** بتتحط بالمتصفح عند `show()` و`showModal()`. الأفضل متكتبهاش بإيدك للمودال.

### closedby {experimental}
**بيحدد إزاي يتقفل**: `any` (بالضغط برّه أو Esc) أو `closerequest` (Esc بس) أو `none` (بالكود فقط). حديثة ودعمها محدود.

```html nolive
<dialog closedby="any">يتقفل بالضغط برّه</dialog>
```

### class
للتنسيق.

## examples

### 1) تأكيد حذف
مع `form method="dialog"`.

```html h=330
<button onclick="document.getElementById('c').showModal()">احذف الحساب</button>
<p id="r"></p>
<dialog id="c" style="border:0; border-radius:12px; padding:20px; max-width:280px">
  <form method="dialog">
    <p><b>هل أنت متأكد؟</b><br>العملية دي مش بترجع.</p>
    <button value="cancel">إلغاء</button>
    <button value="delete" style="background:#dc2626;color:#fff;border:0;padding:6px 12px;border-radius:6px">احذف</button>
  </form>
</dialog>
<script>
  const c = document.getElementById('c');
  c.addEventListener('close', () => {
    document.getElementById('r').textContent = 'النتيجة: ' + c.returnValue;
  });
</script>
```

- زرار داخل `<form method="dialog">` بيقفل الـ dialog من غير جافاسكربت.
- `value` الزرار بيتحط في `dialog.returnValue`.
- حدث `close` بيتنفّذ بعد القفل وبنقرا منه النتيجة.
- Esc بيقفل برضه، و`returnValue` ساعتها بيفضل القيمة القديمة.

### 2) تنسيق الخلفية
`::backdrop`.

```html h=300
<style>
  #m { border: 0; border-radius: 16px; padding: 24px; width: 80%; max-width: 300px; }
  #m::backdrop { background: rgba(15, 23, 42, .6); backdrop-filter: blur(4px); }
</style>
<button onclick="m.showModal()">افتح</button>
<dialog id="m">
  <h3 style="margin-top:0">خلفية ضبابية</h3>
  <p>الخلفية معتمة ومغبّشة.</p>
  <form method="dialog"><button>تمام</button></form>
</dialog>
```

- `::backdrop` هو الطبقة اللي ورا المودال، وبتنسّقها بـ CSS.
- `backdrop-filter: blur` بيعمل تغبيش.
- الـ backdrop موجود بس مع `showModal()`.

### 3) إغلاق بالضغط على الخلفية
click خارج المحتوى.

```html h=300
<button onclick="dlg.showModal()">افتح</button>
<dialog id="dlg" style="border:0; border-radius:12px; padding:0">
  <div style="padding:20px">اضغط برّه المربع ده يقفل.</div>
</dialog>
<script>
  const dlg = document.getElementById('dlg');
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
</script>
```

- الضغط على الـ backdrop بيحسب كضغط على الـ `dialog` نفسه (مش على محتواه).
- لو الضغط على المحتوى، `e.target` بيبقى عنصر داخلي.
- ده بيعمل الإغلاق بالضغط برّه من غير `closedby`.
- حطينا الحشو في `div` داخلي علشان نفرّق بين الحالتين.

### 4) نافذة غير مودال
`show()`.

```html h=220
<button onclick="n.show()">اعرض إشعار</button>
<button onclick="n.close()">أخفي</button>
<p>الصفحة لسه تفاعلية وإنت فاتح الإشعار.</p>
<dialog id="n" style="position:static; border:1px solid #16a34a; border-radius:8px; background:#f0fdf4">
  ✅ تم الحفظ بنجاح
</dialog>
```

- `show()` بيفتحه من غير حجب الصفحة وبدون backdrop.
- مناسب للإشعارات والبالونات.
- لازم تقفله بنفسك: مفيش Esc تلقائي.

### 5) نموذج بيرجّع قيمة
`returnValue`.

```html h=330
<button onclick="f.showModal()">اسمك إيه؟</button>
<p id="o"></p>
<dialog id="f" style="border:0; border-radius:12px; padding:20px">
  <form method="dialog">
    <label>الاسم: <input name="n" id="nm" autofocus></label><br><br>
    <button value="cancel">إلغاء</button>
    <button id="ok" value="default">تمام</button>
  </form>
</dialog>
<script>
  const f = document.getElementById('f');
  document.getElementById('ok').addEventListener('click', () => {
    document.getElementById('ok').value = document.getElementById('nm').value;
  });
  f.addEventListener('close', () => {
    document.getElementById('o').textContent = f.returnValue === 'cancel' ? 'اتلغى' : 'أهلاً يا ' + f.returnValue;
  });
</script>
```

- قبل القفل بنحط قيمة الحقل في `value` الزرار.
- `returnValue` بتوصلنا لقيمة الزرار اللي قفل الـ dialog.
- `autofocus` بيحط المؤشر في الحقل لما يفتح.
- بدون أي طلب للسيرفر.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: **Flow content**.
- closing: الوسم الختامي `</dialog>` إجباري.
- role: `dialog`.
- dom: `HTMLDialogElement`.
- layout: `display: block` عند الفتح (و`none` مقفول)، وفي الـ Top Layer مع المودال.

## mistakes

### فتح المودال بـ open
```html bad
<dialog id="d" open>…</dialog>
```
```html good
<dialog id="d">…</dialog>
<script>document.getElementById('d').showModal();</script>
```
ليه؟ `open` بيفتحه غير مودال: من غير backdrop ولا حبس فوكس ولا Esc.

### dialog من غير طريقة قفل
```html bad
<dialog id="d"><p>محتوى</p></dialog>
```
```html good
<dialog id="d"><p>محتوى</p><form method="dialog"><button>إغلاق</button></form></dialog>
```
ليه؟ المودال بيحجب الصفحة. لو مفيش زرار، المستخدم هيعتمد على Esc بس (ومش كل الأجهزة فيها Esc).

### بناء مودال بـ div
```html bad
<div class="modal" style="position:fixed">…</div>
```
```html good
<dialog>…</dialog>
```
ليه؟ الـ `<dialog>` بيدّيك حبس الفوكس وEsc والـ backdrop والإتاحة مجاناً.

## a11y

- المودال بيحبس الفوكس وبيحجب الصفحة (inert) تلقائياً.
- بيرجّع الفوكس للعنصر اللي فتحه بعد القفل.
- اديه اسم بـ `aria-labelledby` يشاور على العنوان.
- `autofocus` على أهم عنصر جواه (أو الزرار الآمن).
- متعطّلش Esc.

## tips

- `dialog:modal` و`dialog[open]` لتنسيق الحالات.
- `dialog::backdrop` للخلفية.
- لتحريك الفتح والقفل استخدم `@starting-style` و`transition-behavior: allow-discrete`.
- `body:has(dialog:modal) { overflow: hidden }` لمنع تمرير الخلفية.
- في المتصفحات الحديثة `closedby="any"` بيقفل بالضغط برّه.

## quiz

### أنهي طريقة لفتح مودال؟
- [ ] `dialog.open = true`
- [x] `dialog.showModal()`
- [ ] `dialog.display()`
- [ ] `dialog.popup()`
`showModal()` بيدّي backdrop وحبس فوكس.

### إيه اللي بيعمله `<form method="dialog">`؟
- [ ] بيبعت للسيرفر
- [x] بيقفل الـ dialog ويحط قيمة الزرار في `returnValue`
- [ ] بيمسح الصفحة
- [ ] بيفتح تاني
من غير جافاسكربت.

### إزاي تنسّق الخلفية المعتمة؟
- [ ] `.backdrop`
- [x] `::backdrop`
- [ ] `:overlay`
- [ ] `dialog-bg`
عنصر زائف خاص بالمودال.

### إيه اللي بيقفل المودال تلقائياً؟
- [x] ضغطة Esc
- [ ] ضغطة Enter
- [ ] الانتظار
- [ ] التمرير
وده سلوك مجاني.

## refs

- [MDN: dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [WHATWG: The dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [MDN: HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)
