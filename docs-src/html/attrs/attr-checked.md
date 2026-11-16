---
id: attr-checked
kind: attribute
cat: attrs
chip: checked
title: خاصية التحديد
en: HTML checked attribute
status: stable
support: all
mdn: Elements/input#checked
summary: خاصية checked منطقية بتخلّي checkbox أو radio متعلّم مبدئياً. حالته الحالية في JS هي input.checked، والخاصية في HTML بتحدد الأصل فقط (defaultChecked).
keywords: checked, checkbox, radio, defaultChecked, :checked, boolean attribute, متعلّم, تحديد مبدئي, input.checked
related: input-checkbox, input-radio, input, attr-selected, attr-value
---

## intro

الخاصية `checked` **منطقية (boolean)**: وجودها بس كفاية، من غير قيمة (`<input type="checkbox" checked>`). معناها: «ابدأ الصفحة والمربع ده متعلّم». بتشتغل مع [[input-checkbox]] و[[input-radio]] بس. وفي مجموعة radio (نفس `name`) واحد بس يكون `checked` (التاني يتشال تلقائياً).

الفرق المهم اللي بيلخبط المبتدئين: **خاصية HTML بتمثّل الحالة الأصلية فقط**. لما المستخدم يضغط ويتعلّم أو يتشال، **الخاصية في الـ HTML مبتتغيّرش**. الحالة الحالية موجودة في **خاصية الـ DOM `input.checked`** (true/false). فاستخدمها لما تقرا أو تغيّر الحالة من JavaScript. أما `defaultChecked` فهي تعكس خاصية HTML (وبتستخدم في الـ reset). وفي CSS الـ selector **`:checked`** بيطابق العنصر المتعلّم حالياً، وده أساس حِيَل الـ CSS زي أزرار التبديل والتبويبات بدون JS.

ولا تكتب `checked="false"`: أي وجود للخاصية = متعلّم! لإلغاء التحديد احذف الخاصية.

## try

```html
<label><input id="a" type="checkbox" checked> متعلّم من الأول</label><br>
<label><input id="b" type="checkbox"> مش متعلّم</label>
<button onclick="o.textContent = 'a=' + a.checked + ' (الأصل ' + a.defaultChecked + ') | b=' + b.checked">اقرا الحالة</button>
<p id="o"></p>
```

## syntax

```html nolive
<input type="checkbox" checked>
<input type="radio" name="lvl" value="1" checked>
```

- `checked` — boolean: وجودها = متعلّم.
- الحالة الحالية: `input.checked` (JS).
- في CSS: `:checked`.

## use

- اختيار افتراضي منطقي (مثلاً "اشترك في النشرة").
- radio: الخيار الأكثر شيوعاً مبدئياً.
- استرجاع حالة محفوظة.

## avoid

- متكتبش `checked="false"`: دي معناها متعلّم!
- متعلّمش مربع الموافقة على الشروط تلقائياً.

## examples

### 1) radio مبدئي
الخيار الأول.

```html
<label><input type="radio" name="p" value="m" checked> شهري</label>
<label><input type="radio" name="p" value="y"> سنوي</label>
```

- الواحد اللي عليه checked هو المبدئي.
- لو مفيش واحد، ولا واحد مختار.
- خيار افتراضي منطقي يوفّر وقت.

### 2) أنماط بـ :checked
مثال على CSS.

```html
<style>
  .t input:checked + span { background:#22c55e; color:#000 }
  .t span { padding:6px 12px; border-radius:20px; background:#e2e8f0; cursor:pointer }
  .t input { position:absolute; opacity:0 }
</style>
<label class="t"><input type="checkbox"><span>مفعّل؟</span></label>
```

- `:checked + span` بيلوّن اللي جنب المربع.
- من غير جافاسكربت.
- الـ input لسه بيشتغل بالكيبورد.

### 3) تغيير بالكود
مثال على .checked.

```html
<label><input id="c" type="checkbox"> خيار</label>
<button onclick="c.checked = !c.checked">اقلب</button>
<button onclick="c.checked = c.defaultChecked">رجّع الأصل</button>
```

- `c.checked = true/false`.
- مفيش داعي `setAttribute`.
- `defaultChecked` للأصل.

### 4) تحديد الكل
مثال على forEach.

```html
<button onclick="document.querySelectorAll('.k').forEach(c => c.checked = true)">حدّد الكل</button>
<label><input class="k" type="checkbox"> أ</label>
<label><input class="k" type="checkbox"> ب</label>
```

- نمر على كل المربعات.
- نضبط `checked` لكل واحد.
- تقدر تضيف `indeterminate` للمربع الأب.

## mistakes

### checked="false"
```html bad
<input type="checkbox" checked="false">
```
```html good
<input type="checkbox">
```
ليه؟ وجود الخاصية = متعلّم، بغض النظر عن القيمة.

### setAttribute لتغيير الحالة
```html bad
<script>c.setAttribute('checked', '')</script>
```
```html good
<script>c.checked = true</script>
```
ليه؟ بعد ما المستخدم يلمس المربع، الخاصية مبتأثرش على الحالة الحالية.

## a11y

- مربع الموافقة ما يبقاش متعلّماً مسبقاً.
- اربط كل مربع بـ label.
- لو بتغيّر الحالة بالكود، قارئ الشاشة بيعلن التغيير تلقائياً.

## quiz

### نوع الخاصية `checked`؟
- [x] boolean
- [ ] نص
- [ ] رقم
- [ ] رابط
وجودها كافي.

### الحالة الحالية؟
- [x] `input.checked`
- [ ] خاصية HTML `checked`
- [ ] `input.value`
- [ ] `input.on`
DOM.

### `checked="false"` معناها؟
- [x] متعلّم
- [ ] مش متعلّم
- [ ] خطأ
- [ ] لا شيء
لأن الوجود يكفي.

## refs

- [MDN: checked](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#checked)
- [MDN: :checked](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked)
