---
id: input-radio
kind: inputtype
cat: input-types
chip: type="radio"
title: زرار الاختيار الواحد
en: <input type="radio">
status: stable
support: all
mdn: Elements/input/radio
summary: type="radio" مجموعة اختيارات يتعلّم منها واحد بس: الأزرار اللي ليها نفس name بتبقى مجموعة. مفيش طريقة لإلغاء التحديد من غير JS، ولازم value لكل زرار.
keywords: input radio, زرار اختيار, name group, checked, required, fieldset, legend, اختيار واحد, خيارات
related: input, input-checkbox, label, fieldset, legend, select
---

## intro

مجموعة دوائر صغيرة **تقدر تختار واحدة بس منها**. السر في الاسم: كل الأزرار اللي ليها **نفس `name`** بتبقى **مجموعة واحدة**، ولما تختار واحد التاني بيتشال تلقائياً. الاسم ده هو اللي بيتبعت مع الفورم، و**`value` بتاعت الزرار المختار** هي القيمة. فلازم لكل زرار `value` مختلفة.

مهم: بمجرد ما تختار واحد، **مفيش طريقة لإلغاء الاختيار** من غير جافاسكربت (عكس checkbox). فلو الاختيار اختياري وعايز تسيب إمكانية «ولا حاجة»، ضيف زرار «لا شيء». و[[attr-required]] على أي زرار في المجموعة بتجبر المستخدم يختار واحد. وللمجموعة كلها استخدم [[fieldset]] مع [[legend]] عشان قارئ الشاشة يقرا السؤال. لو الاختيارات كتير (أكتر من 5 أو 6) فكّر في [[select]].

## try

```html
<fieldset><legend>مستواك؟</legend>
  <label><input type="radio" name="lvl" value="beginner" checked onchange="o.textContent = this.value"> مبتدئ</label>
  <label><input type="radio" name="lvl" value="mid" onchange="o.textContent = this.value"> متوسط</label>
  <label><input type="radio" name="lvl" value="pro" onchange="o.textContent = this.value"> محترف</label>
</fieldset>
<p>القيمة المختارة: <b id="o">beginner</b></p>
```

## syntax

```html nolive
<fieldset>
  <legend>الدفع</legend>
  <label><input type="radio" name="pay" value="cash" required> كاش</label>
  <label><input type="radio" name="pay" value="card"> كارت</label>
</fieldset>
```

- نفس `name` = مجموعة واحدة.
- `value` مختلفة لكل زرار.
- `fieldset` و`legend` لتسمية المجموعة.

## use

- اختيار واحد من 2–6 خيارات (النوع، المستوى).
- أسئلة الاختيار من متعدد.
- الخيارات اللازم تكون ظاهرة قدام المستخدم.

## avoid

- متنساش `name` المشترك: من غيره كل زرار مستقل.
- متستخدمهوش لعدد كبير من الخيارات.

## examples

### 1) قراءة المختار
مثال على checked.

```html
<label><input type="radio" name="c" value="red"> أحمر</label>
<label><input type="radio" name="c" value="blue"> أزرق</label>
<button onclick="const r = document.querySelector('[name=c]:checked'); o.textContent = r ? r.value : 'لسه ما اخترتش'">اعرض</button>
<p id="o"></p>
```

- `:checked` بيجيب الزرار المختار.
- لو مفيش اختيار بيرجّع `null`.
- لازم تتحقق قبل قراءة `.value`.

### 2) إلزامي
مثال على required.

```html
<form onsubmit="event.preventDefault(); o.textContent='تمام ✅'">
  <label><input type="radio" name="g" value="m" required> ذكر</label>
  <label><input type="radio" name="g" value="f"> أنثى</label>
  <button>إرسال</button>
</form>
<p id="o"></p>
```

- `required` على واحد بتطبّق على المجموعة.
- بيمنع الإرسال من غير اختيار.
- عادةً بنكتبها على الكل للوضوح.

### 3) خيارات كبيرة بالكروت
مثال على CSS :has.

```html
<style>
  .opt { display:inline-block; padding:10px 16px; border:2px solid #cbd5e1; border-radius:10px; cursor:pointer }
  .opt:has(input:checked) { border-color:#22c55e; background:#dcfce7 }
  .opt input { position:absolute; opacity:0 }
</style>
<label class="opt"><input type="radio" name="p" value="a" checked> الخطة المجانية</label>
<label class="opt"><input type="radio" name="p" value="b"> الخطة المدفوعة</label>
```

- الـ `label` بيبقى الكارت.
- `:has(input:checked)` بيلوّن المختار.
- الـ input متخبّي بصرياً لكن لسه بيتقري بالكيبورد.

### 4) خيار "ولا حاجة"
إلغاء الاختيار.

```html
<label><input type="radio" name="x" value="" checked> من غير</label>
<label><input type="radio" name="x" value="a"> خيار أ</label>
<label><input type="radio" name="x" value="b"> خيار ب</label>
```

- مفيش إلغاء من الواجهة.
- زرار "من غير" بيحل المشكلة.
- قيمته فاضية.

## mistakes

### أسماء مختلفة
```html bad
<input type="radio" name="a" value="1"> <input type="radio" name="b" value="2">
```
```html good
<input type="radio" name="a" value="1"> <input type="radio" name="a" value="2">
```
ليه؟ من غير نفس الاسم مفيش مجموعة: تقدر تختار الاتنين.

### من غير value
```html bad
<input type="radio" name="p">
```
```html good
<input type="radio" name="p" value="cash">
```
ليه؟ من غير value بتتبعت "on" لكل الأزرار فمفيش فرق بينهم.

## a11y

- لفّ المجموعة في `fieldset` مع `legend` بسؤال واضح.
- كل زرار ليه label.
- الأسهم بتتنقل بين الأزرار في المجموعة تلقائياً.

## quiz

### إيه بيربط أزرار radio ببعض؟
- [x] نفس `name`
- [ ] نفس `id`
- [ ] نفس `value`
- [ ] نفس `class`
الاسم المشترك.

### إلغاء الاختيار؟
- [x] مفيش من غير JS
- [ ] بالضغط تاني
- [ ] بـ Esc
- [ ] بـ Delete
ضيف خيار "لا شيء".

### اختيارات كتير؟
- [x] `select`
- [ ] radio برضه
- [ ] checkbox
- [ ] text
أنسب لعدد كبير.

## refs

- [MDN: radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio)
- [WHATWG: Radio button state](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio))
