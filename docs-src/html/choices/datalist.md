---
id: datalist
kind: element
cat: choices
tag: datalist
title: قايمة الاقتراحات (datalist)
en: HTML datalist element
status: stable
display: none
void: no
support: all
size: compact
summary: عنصر datalist بيوفّر قايمة اقتراحات لحقل input عبر خاصية list، فالمستخدم يكتب بحرية أو يختار اقتراح. مش إجباري زي select، وبيدعم text وrange وcolor وغيرها.
keywords: datalist, اقتراحات, autocomplete, input list, option, إكمال, قايمة اقتراح, combobox, color, range
related: input, option, select
---

## intro

الـ `<select>` بيجبرك تختار من القايمة بس. والـ `<input>` بيخليك تكتب أي حاجة من غير مساعدة. لو عايز **الوسط**: حقل بيقترح لما تكتب لكن لسه تقدر تكتب حاجة تانية، بتستخدم `<datalist>` (**قايمة بيانات**). بتعرّفه في أي مكان بـ `id`، وبتربط الـ [[input]] بيه بـ `list="الـid"`.

داخله [[option]] بـ `value` (والنص اختياري). المتصفح بيعرض الاقتراحات المطابقة لما المستخدم يكتب. بيشتغل مع `text` و`email` و`url` و`search` و`number` و`date`، وكمان بيعمل **علامات** على `range` وألوان مقترحة على `color`.

والـ `<datalist>` نفسه **مخفي** (`display: none`)، هو بس مصدر بيانات للـ input.

> [!key] `<input list="id">` + `<datalist id="id"><option value="…">`. اقتراحات من غير إجبار.

## try

```html
<input list="langs" placeholder="اكتب لغة">
<datalist id="langs">
  <option value="HTML"><option value="CSS"><option value="JavaScript"><option value="Python">
</datalist>
```

## syntax

```html nolive
<input list="cities" name="city">
<datalist id="cities">
  <option value="القاهرة">
  <option value="الإسكندرية">
</datalist>
```

- `<datalist id>` — **مصدر الاقتراحات**.
- `<option value>` — **الاقتراحات**.
- `list` على الـ input — **الربط بالـ id**.
- `</datalist>` — **الوسم الختامي** إجباري.

## use

- لإكمال تلقائي للمدن والأسماء والعلامات.
- لاقتراح قيم شائعة لكن مسموح غيرها.
- لعلامات على شريط `range`.

## avoid

- متستخدمهوش لو لازم قيمة من القايمة بالظبط: `<select>`.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]). أهم خاصية `id` اللي الـ input بيشاور عليه.

### id {required}
**معرّف القايمة**، اللي بيربط بيه `list` في الـ input.

## examples

### 1) اقتراحات نصية
الأشهر.

```html
<label>المدينة:
  <input list="c" name="city" placeholder="ابدأ اكتب…">
</label>
<datalist id="c">
  <option value="القاهرة"><option value="الإسكندرية"><option value="الأقصر"><option value="أسوان">
</datalist>
```

- اكتب «ال» تظهر لك الاقتراحات.
- لو كتبت مدينة تانية مش في القايمة مسموح.
- الخاصية `list` بتشاور على `id` الـ datalist.

### 2) علامات على range
`list` مع range.

```html
<label>التقييم:
  <input type="range" min="0" max="100" step="25" list="marks">
</label>
<datalist id="marks">
  <option value="0" label="0%"><option value="50" label="50%"><option value="100" label="100%">
</datalist>
```

- الـ datalist بيرسم علامات على الشريط.
- `label` بيظهر كنص تحت العلامة (حسب المتصفح).
- ده استخدام مش معروف لكن مفيد.

### 3) ألوان مقترحة
`type="color"`.

```html
<label>لون: <input type="color" list="cols" value="#39ff14"></label>
<datalist id="cols">
  <option value="#39ff14"><option value="#0ea5e9"><option value="#f97316">
</datalist>
```

- المتصفح بيعرض الألوان المقترحة جوه المنتقي.
- لسه المستخدم يقدر يختار أي لون.
- بيشتغل في المتصفحات المدعومة.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: [[option]] أو **Phrasing content**.
- closing: الوسم الختامي `</datalist>` إجباري.
- role: `listbox`.
- dom: `HTMLDataListElement`.
- layout: `display: none`.

## mistakes

### list ما بيطابقش id
```html bad
<input list="a"><datalist id="b"></datalist>
```
```html good
<input list="b"><datalist id="b"></datalist>
```
ليه؟ الربط بالـ `id` بالظبط.

## a11y

- ما تعتمدش على الـ datalist كطريقة وحيدة لتوصيل الخيارات: دعم قارئات الشاشة متفاوت.
- اكتب `label` للـ input برضه.

## tips

- لقوايم كبيرة ديناميكية حدّث الـ option بالجافاسكربت.
- شكل الاقتراحات بيعتمد على المتصفح ومش بتتنسّق.

## quiz

### إزاي بتربط `<input>` بـ `<datalist>`؟
- [ ] `for`
- [x] `list="id"`
- [ ] `name`
- [ ] `href`
الخاصية على الـ input.

### الفرق عن `<select>`؟
- [x] بيسمح بكتابة قيمة خارج القايمة
- [ ] أسرع
- [ ] أجمل
- [ ] مفيش
اقتراحات مش إجبار.

## refs

- [MDN: datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist)
- [WHATWG: The datalist element](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element)
