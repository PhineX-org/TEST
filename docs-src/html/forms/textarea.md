---
id: textarea
kind: element
cat: forms
tag: textarea
title: عنصر منطقة النص
en: HTML textarea element
status: stable
display: inline-block
void: no
support: all
summary: حقل نص متعدد الأسطر للتعليقات والرسائل والمقالات. بياخد النص الافتراضي بين الوسمين، وبيتحكم في حجمه بـ rows وcols أو CSS، وبيدعم maxlength وwrap وspellcheck وتغيير الحجم.
keywords: textarea, منطقة نص, نص متعدد الأسطر, rows, cols, maxlength, wrap, resize, تعليق, رسالة, placeholder, spellcheck, contenteditable
related: input, label, form, fieldset, output
---

## intro

الـ `<input type="text">` بياخد سطر واحد بس. لما تحتاج المستخدم يكتب **فقرة أو أكتر**: تعليق، رسالة، وصف منتج، سيرة ذاتية، بتستخدم `<textarea>` (**منطقة نص**). هو حقل بيقبل أسطر متعددة، والـ Enter فيه بيعمل سطر جديد (مش بيبعت الفورم زي الـ input).

اللغز الأشهر: **القيمة الافتراضية بتتكتب بين الوسمين** مش في `value`: `<textarea>النص هنا</textarea>`. ومهم تعرف إن **كل مسافة وسطر جديد جوه الوسمين بتتحسب** (لأن المحتوى متعامل معاه كنص ثابت)، فمتحطش مسافات وإنزالات سطر زيادة بين `<textarea>` والنص.

حجمه بيتحدد بـ `rows` (عدد الأسطر الظاهرة) و`cols` (العرض بالحروف)، لكن الأفضل **CSS**: `width` و`height` و`min-height`. والمتصفح بيدّي المستخدم **مقبض تغيير الحجم** في ركن الحقل (`resize`)، وتقدر تتحكم فيه: `resize: vertical` (رأسي بس) أو `none`.

وبياخد خصائص زي `input`: `name` و`required` و`placeholder` و`maxlength` و`minlength` و`disabled` و`readonly`. ومعاهم: **`wrap`** (سلوك لف الأسطر عند الإرسال)، و**`spellcheck`** (تدقيق إملائي)، و**`autocomplete`**.

> [!analogy] `<input>` زي **ورقة بوست-إت صغيرة** (سطر)، و`<textarea>` زي **صفحة كراسة**: تكتب فيها براحتك على كذا سطر.

> [!key] `<textarea>`: القيمة الافتراضية بين الوسمين، `rows` للارتفاع، `resize` للتحكم، وله label زي أي حقل.

## try

اكتب أكتر من سطر.

```html
<label>تعليقك:<br>
  <textarea name="c" rows="4" cols="30" placeholder="اكتب رأيك هنا…"></textarea>
</label>
```

## syntax

```html nolive
<label for="msg">الرسالة</label>
<textarea id="msg" name="msg" rows="5" maxlength="500" required>
</textarea>
```

- `<textarea ...>` — **الوسم الافتتاحي**.
- `rows` — **عدد الأسطر الظاهرة**.
- `name` — **للإرسال**.
- المحتوى — **القيمة الافتراضية** (نص عادي).
- `</textarea>` — **الوسم الختامي** إجباري.

## use

- للتعليقات والمراجعات.
- لرسائل «اتصل بنا».
- للمقالات والأوصاف والسير الذاتية.
- لمحررات كود بسيطة.
- لأي إدخال نصي طويل.

## avoid

- متستخدمش `value` للقيمة الافتراضية: بين الوسمين.
- متحطش مسافات أو سطور زيادة بين الوسمين والنص.
- متستخدمش `<input>` لنص طويل.
- متنساش `<label>` و`name`.
- متسيبش `resize` مفتوح في كل اتجاه لو التصميم هيتكسر.

## attributes

### name
**اسم الحقل** للإرسال.

### rows
**عدد الأسطر الظاهرة** (الافتراضي 2). الأفضل `min-height` في CSS.

### cols
**عرض الحقل بعدد الحروف** (الافتراضي 20). الأفضل `width` في CSS.

### placeholder
**تلميح** بيظهر لما الحقل فاضي (مش بديل للـ label).

### required {boolean}
**إجباري.**

### maxlength
**أقصى عدد حروف.**

### minlength
**أقل عدد حروف.**

### readonly {boolean}
**للقراءة بس**: بيتبعت ومش بيتعدّل.

### disabled {boolean}
**معطّل**: مبيتبعتش ومش بيتفوكس.

### wrap
**لف النص عند الإرسال**: `soft` (افتراضي: بيلف في العرض بس)، `hard` (بيضيف أسطر جديدة في الإرسال، ويحتاج `cols`)، `off` (من غير لف).

### spellcheck
**تدقيق إملائي**: `true` أو `false`.

### autocomplete
**تلميح للإكمال التلقائي.**

### autofocus {boolean}
**ياخد الفوكس** عند التحميل.

### dirname
**اسم حقل إضافي** بيبعت اتجاه النص (`ltr` أو `rtl`) مع الفورم.

### form
**ربط الحقل بفورم** برّه.

## examples

### 1) قيمة افتراضية وحجم
بين الوسمين.

```html
<textarea name="bio" rows="4" style="width:100%; box-sizing:border-box; padding:8px">أنا مطوّر ويب بحب البرمجة.
وبتعلّم كل يوم حاجة جديدة.</textarea>
```

- النص الافتراضي مكتوب **بين الوسمين** مباشرة من غير مسافات زيادة.
- الأسطر بتتحفظ زي ما هي.
- `rows="4"` بيحدد ارتفاع أربع أسطر، و`width:100%` عرض كامل.
- لو كتبت `value="..."` مش هيشتغل: دي مش خاصية هنا.

### 2) عداد حروف
`maxlength` وحدث `input`.

```html
<textarea id="t" maxlength="100" rows="3" style="width:100%; box-sizing:border-box" placeholder="اكتب (100 حرف بحد أقصى)"></textarea>
<small>باقي <b id="c">100</b> حرف</small>
<script>
  const t = document.getElementById('t');
  t.addEventListener('input', () => {
    document.getElementById('c').textContent = t.maxLength - t.value.length;
  });
</script>
```

- `maxlength` بيمنع الكتابة بعد الحد.
- الحدث `input` بيشتغل مع كل حرف، فبنحدّث العداد.
- `t.value.length` عدد الحروف الحالي.
- العداد بيحسّن تجربة المستخدم أكتر من الرفض المفاجئ.

### 3) التحكم في تغيير الحجم
`resize`.

```html
<style>
  textarea { width: 100%; box-sizing: border-box; padding: 8px; margin-bottom: 8px; }
  .v { resize: vertical; }
  .n { resize: none; }
</style>
<textarea class="v" rows="2" placeholder="رأسي فقط"></textarea>
<textarea class="n" rows="2" placeholder="مفيش تغيير حجم"></textarea>
```

- `resize: vertical` بيسمح بالتمدد لتحت بس (الأنسب غالباً).
- `resize: none` بيمنعه تماماً لو التصميم ثابت.
- القيم التانية: `horizontal` و`both`.

### 4) ارتفاع تلقائي
بيكبر مع الكتابة.

```html
<textarea id="auto" rows="1" style="width:100%; box-sizing:border-box; padding:8px; overflow:hidden; resize:none" placeholder="اكتب وشوف الحجم بيزيد"></textarea>
<script>
  const a = document.getElementById('auto');
  a.addEventListener('input', () => { a.style.height = 'auto'; a.style.height = a.scrollHeight + 'px'; });
</script>
```

- بنرجّع الارتفاع `auto` وبعدين نحطه على `scrollHeight` (ارتفاع المحتوى الكامل).
- بيخلّي الحقل يكبر مع الكتابة من غير شريط تمرير.
- في المتصفحات الحديثة فيه `field-sizing: content` بيعمل ده بـ CSS لوحده.

### 5) النص العربي واتجاهه
`dir`.

```html
<label>رسالة (اتجاه تلقائي):<br>
  <textarea dir="auto" rows="3" style="width:100%; box-sizing:border-box" placeholder="اكتب بالعربي أو English"></textarea>
</label>
```

- `dir="auto"` بيحدد الاتجاه حسب أول حرف: العربي يمين، والإنجليزي شمال.
- مفيد لحقول التعليقات المختلطة.
- `dirname` ممكن تبعت الاتجاه المحدد للسيرفر.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **نص فقط** (المحتوى الافتراضي).
- closing: الوسم الختامي `</textarea>` إجباري.
- role: `textbox` (متعدد الأسطر).
- dom: `HTMLTextAreaElement`.
- layout: `display: inline-block`، مع مقبض تغيير الحجم.

## mistakes

### استخدام value
```html bad
<textarea value="النص الافتراضي"></textarea>
```
```html good
<textarea>النص الافتراضي</textarea>
```
ليه؟ `<textarea>` مفيهوش خاصية `value`، النص بين الوسمين.

### مسافات زيادة
```html bad
<textarea>
    النص بمسافات
</textarea>
```
```html good
<textarea>النص بدون مسافات زيادة</textarea>
```
ليه؟ المسافات والسطور بين الوسمين بتتحسب كجزء من القيمة.

### وسم قفل ذاتي
```html bad
<textarea name="a" />
```
```html good
<textarea name="a"></textarea>
```
ليه؟ `<textarea>` مش void، لازم وسم قفل، وإلا باقي الصفحة هتتحول لمحتواه.

## a11y

- كل `<textarea>` لازم له `<label>`.
- اكتب تلميحات الحد الأقصى بـ `aria-describedby` وعدّاد قابل للإعلان بـ `aria-live="polite"`.
- متمنعش التكبير: خلّي `resize` مفعّل أو الارتفاع كافي.
- تباين النص والحدود واضح.

## tips

- استخدم `field-sizing: content` للارتفاع التلقائي في المتصفحات الحديثة.
- `textarea.value` للقراءة والكتابة، و`select()` لتحديد كل النص.
- لو محتاج تنسيق نص غني استخدم `contenteditable` أو محرر جاهز، مش `<textarea>`.
- `spellcheck="false"` للأكواد والأسماء.

## quiz

### فين بتتكتب القيمة الافتراضية للـ `<textarea>`؟
- [ ] في `value`
- [x] بين الوسمين
- [ ] في `placeholder`
- [ ] في `text`
مفيش `value` للـ textarea.

### إيه اللي بيحصل لو ضغطت Enter في `<textarea>`؟
- [ ] بيبعت الفورم
- [x] بيعمل سطر جديد
- [ ] بيمسح
- [ ] مفيش
ده الفرق عن `<input>`.

### إزاي تمنع تغيير حجم الـ textarea؟
- [x] `resize: none`
- [ ] `fixed`
- [ ] `lock`
- [ ] `readonly`
خاصية CSS.

## refs

- [MDN: textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea)
- [WHATWG: The textarea element](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)
