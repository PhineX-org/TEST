---
id: select
kind: element
cat: choices
tag: select
title: عنصر القايمة المنسدلة
en: HTML select element
status: stable
display: inline-block
void: no
support: all
summary: قايمة اختيارات منسدلة (Dropdown) أو صندوق قايمة. بتحتوي option وoptgroup، وبتسمح باختيار واحد أو أكتر بـ multiple، وبتتحكم في الحجم بـ size، وقيمتها بتتبعت مع الفورم.
keywords: select, قايمة منسدلة, dropdown, option, optgroup, multiple, size, اختيار, combobox, listbox, selectedIndex, value, change, اختار
related: option, optgroup, datalist, input, label, form, selectedcontent
---

## intro

لما عندك اختيارات كتيرة (محافظات، سنين، دول) ومش هتحط لكل واحد radio، بتستخدم `<select>`: **قايمة منسدلة** بتتفتح لما تدوس عليها وتختار واحد. هو الحاوية، وكل اختيار جواه عنصر [[option]]، وممكن تجمّع الاختيارات في [[optgroup]]. وبيوفّر مساحة كبيرة: كل الاختيارات مخفية لحد ما تفتحها.

القيمة اللي بتتبعت مع الفورم هي **`value` الـ `<option>` المختار** (أو النص لو مفيش `value`). فيه **ثلاثة أشكال**: **قايمة منسدلة عادية** (افتراضي: اختيار واحد)، **متعددة الاختيار** بـ `multiple` (بتتحول لصندوق بتختار منه بـ Ctrl/Shift)، و**صندوق مفتوح** بـ `size` (بيعرض أكتر من اختيار مرة واحدة).

وبالجافاسكربت: `select.value` للقيمة المختارة، `select.selectedIndex` لترتيبه، `select.options` لكل الاختيارات، `select.selectedOptions` للمختارين في الـ multiple، وحدث **`change`** لما المستخدم يختار.

والـ `<select>` ملهوش شكل واحد: بيتعرض بشكل المتصفح/النظام، وده بيخلّي تنسيقه صعب شوية. لكن المتصفحات الحديثة بتدعم `appearance: base-select` لتخصيصه بالكامل (بالـ [[selectedcontent]]).

> [!analogy] الـ `<select>` زي **قايمة الطعام في مطعم**: بتفتحها وتختار طبق واحد (أو أكتر لو الطلب مفتوح). و`<option>` هو الطبق، و`<optgroup>` هو القسم («مقبّلات»، «أطباق رئيسية»).

> [!key] `<select name>` + `<option value>`. `multiple` لأكتر من اختيار، `size` لصندوق مفتوح. لازم `<label>`.

## try

اختار وشوف القيمة.

```html
<label>المحافظة:
  <select name="gov" onchange="document.getElementById('o').textContent = this.value">
    <option value="cairo">القاهرة</option>
    <option value="giza">الجيزة</option>
    <option value="alex">الإسكندرية</option>
  </select>
</label>
<p>القيمة: <b id="o">cairo</b></p>
```

## syntax

```html nolive
<label for="c">الدولة</label>
<select id="c" name="country" required>
  <option value="">اختار…</option>
  <option value="eg">مصر</option>
  <option value="sa" selected>السعودية</option>
</select>
```

- `<select ...>` — **الوسم الافتتاحي**.
- `name` — **اسم القيمة** عند الإرسال.
- `<option>` — **كل اختيار**.
- `multiple` / `size` — **تغيير الشكل**.
- `</select>` — **الوسم الختامي** إجباري.

## use

- لاختيار من قايمة طويلة (بلاد، سنين، فئات).
- لخيارات ثابتة محدودة بمساحة صغيرة.
- لاختيار أكتر من قيمة بـ `multiple`.
- لفلاتر وترتيب في صفحات المنتجات.

## avoid

- متستخدمهوش لـ 2–4 اختيارات: radio أوضح.
- متستخدمهوش لقوايم ضخمة جداً (آلاف): ابحث بـ `<input list>`.
- متنساش `<label>` و`name`.
- متستخدمش `<select>` للتنقل بين صفحات من غير زرار: بيبوّظ الكيبورد وقارئ الشاشة.

## attributes

### name
**اسم الحقل** للإرسال.

### multiple {boolean}
**يسمح بأكتر من اختيار** (بيتحول لصندوق قايمة).

### size
**عدد الاختيارات الظاهرة** (الافتراضي 1، وأكتر من 1 = صندوق مفتوح).

### required {boolean}
**إجباري**: لازم اختيار لا قيمته فاضية.

### disabled {boolean}
**معطّل**.

### autocomplete
**تلميح للإكمال التلقائي**، زي `country` أو `off`.

### autofocus {boolean}
**ياخد الفوكس** عند التحميل.

### form
**ربط بفورم** برّه.

## examples

### 1) قايمة أساسية مع placeholder
أول اختيار فاضي.

```html
<label>الدولة:
  <select name="country" required>
    <option value="" disabled selected>اختار دولتك…</option>
    <option value="eg">مصر</option>
    <option value="sa">السعودية</option>
    <option value="ae">الإمارات</option>
  </select>
</label>
```

- أول `<option>` بـ `value=""` وبـ `disabled selected` بيشتغل كنص «اختار…».
- مع `required` المستخدم لازم يختار حاجة حقيقية.
- `disabled` عشان ميبقاش اختيار صالح بعد ما يفتحها.

### 2) تجميع بـ optgroup
أقسام.

```html
<select name="car">
  <optgroup label="ألماني">
    <option>مرسيدس</option>
    <option>بي إم دبليو</option>
  </optgroup>
  <optgroup label="ياباني">
    <option>تويوتا</option>
    <option>هوندا</option>
  </optgroup>
</select>
```

- `<optgroup>` بيعمل عنوان غامق وبيرتّب الاختيارات تحته.
- العنوان نفسه مش قابل للاختيار.
- مفيد جداً لقوايم طويلة منظّمة.

### 3) اختيار متعدد
`multiple`.

```html
<label>اللغات (Ctrl للمتعدد):<br>
  <select name="langs" multiple size="4" id="m" onchange="document.getElementById('o').textContent = [...this.selectedOptions].map(o => o.value).join(', ')">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="py">Python</option>
  </select>
</label>
<p>المختار: <b id="o"></b></p>
```

- `multiple` بيحوّل القايمة لصندوق، والاختيار المتعدد بـ Ctrl أو Shift.
- `selectedOptions` بترجّع كل المختارين، وبنحوّلهم لمصفوفة.
- على الموبايل بيظهر بشكل مختلف (منتقي).
- لو الاختيار المتعدد أساسي، الـ checkboxes ممكن تكون أوضح.

### 4) تغيير بالجافاسكربت
`value` وselectedIndex.

```html
<select id="s">
  <option value="a">أ</option>
  <option value="b">ب</option>
  <option value="c">ج</option>
</select>
<button onclick="document.getElementById('s').value = 'c'">اختار ج</button>
<button onclick="document.getElementById('s').selectedIndex = 0">أول واحد</button>
```

- كتابة `select.value` بتختار الـ option اللي قيمته كده.
- `selectedIndex` بيختار بالترتيب (من صفر).
- بيطلق حدث `change` لما المستخدم يختار، لكن مش لما تغيّر بالكود.

### 5) إضافة اختيارات ديناميكياً
`new Option`.

```html
<select id="d"></select>
<script>
  const cities = { cairo: 'القاهرة', giza: 'الجيزة', alex: 'الإسكندرية' };
  const sel = document.getElementById('d');
  for (const [v, t] of Object.entries(cities)) sel.add(new Option(t, v));
</script>
```

- `new Option(text, value)` بيعمل اختيار جديد.
- `select.add()` بيضيفه للقايمة.
- مفيد لما الاختيارات بتيجي من API أو متغيّرة.

### 6) قايمتين مترابطتين
مدينة بحسب دولة.

```html
<select id="co" onchange="fill()">
  <option value="eg">مصر</option>
  <option value="sa">السعودية</option>
</select>
<select id="ci"></select>
<script>
  const data = { eg: ['القاهرة','الإسكندرية'], sa: ['الرياض','جدة'] };
  function fill() {
    const ci = document.getElementById('ci');
    ci.replaceChildren(...data[document.getElementById('co').value].map(c => new Option(c)));
  }
  fill();
</script>
```

- لما الدولة تتغير بنعيد ملء قايمة المدن.
- `replaceChildren` بيستبدل كل الاختيارات مرة واحدة.
- ده نمط شائع (Dependent dropdowns) في الفورمز.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: [[option]] و[[optgroup]] (وعناصر السكريبت).
- closing: الوسم الختامي `</select>` إجباري.
- role: `combobox` (أو `listbox` مع `multiple`/`size>1`).
- dom: `HTMLSelectElement`.
- layout: `display: inline-block`.

## mistakes

### نسيان name أو label
```html bad
<select><option>مصر</option></select>
```
```html good
<label for="c">الدولة</label>
<select id="c" name="country"><option value="eg">مصر</option></select>
```
ليه؟ من غير `name` مش هيتبعت، ومن غير label قارئ الشاشة مش هيعرف هو إيه.

### استخدام select كقايمة تنقل
```html bad
<select onchange="location = this.value">
  <option value="/a">أ</option><option value="/b">ب</option>
</select>
```
```html good
<nav><a href="/a">أ</a> <a href="/b">ب</a></nav>
```
ليه؟ التنقل بالكيبورد بيحصل مع كل سهم قبل ما يقرر المستخدم، وده بيبوّظ التجربة. الروابط الحقيقية أحسن.

### حذف قيمة الـ option
```html bad
<select name="a"><option>1</option><option></option></select>
```
```html good
<select name="a"><option value="1">1</option><option value="">—</option></select>
```
ليه؟ الـ option من غير نص أو قيمة مبيعلّمش المستخدم بحاجة.

## a11y

- لازم `<label>` مربوط (`for`/`id`).
- أول `<option>` فاضي مع `required` عشان ميتختارش بالغلط.
- المنتقي الأصلي (Native) أحسن من الـ select المخصص بالـ div: لو هتخصّصه، حافظ على السلوك.
- في `multiple`، وضّح للمستخدم إزاي يختار أكتر من واحد.

## tips

- `appearance: base-select` في المتصفحات الحديثة لتخصيص كامل.
- لقوايم كبيرة وبحث، استخدم `<input list>` أو مكتبة.
- حدّث `selectedIndex` أو `value` بدل ما تلعب في `selected`.
- `select.addEventListener('change', …)` بدل `onchange` المضمّنة.

## quiz

### إيه الخاصية اللي بتسمح بأكتر من اختيار؟
- [ ] `many`
- [x] `multiple`
- [ ] `size`
- [ ] `more`
بتحوّل القايمة لصندوق.

### فين بتتحدّد القيمة اللي بتتبعت؟
- [ ] في `<select>` مباشرة
- [x] في `value` الـ `<option>` المختار
- [ ] في `name`
- [ ] في `label`
وإن مفيش `value` بتتبعت النص.

### إزاي تقرا القيمة المختارة بالجافاسكربت؟
- [x] `select.value`
- [ ] `select.text`
- [ ] `select.selected`
- [ ] `select.pick`
أو `selectedIndex`.

## refs

- [MDN: select](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)
- [WHATWG: The select element](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [MDN: Customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
