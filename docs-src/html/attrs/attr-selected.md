---
id: attr-selected
kind: attribute
cat: attrs
chip: selected
title: خاصية الاختيار المبدئي
en: HTML selected attribute
status: stable
support: all
size: compact
mdn: Elements/option#selected
summary: خاصية selected منطقية على option بتخلّيه الخيار المختار مبدئياً في select. الحالة الحالية في JS هي option.selected، ومع multiple ممكن أكتر من خيار.
keywords: selected, option, select, defaultSelected, خيار مبدئي, قايمة منسدلة, selectedIndex, multiple
related: option, select, attr-checked, attr-value, attr-multiple
---

## intro

`selected` خاصية **منطقية** بتتحط على [[option]] جوه [[select]] عشان تخلّيه **الخيار المختار من أول ما الصفحة تفتح**. لو معملتش كده، المتصفح بيختار أول خيار تلقائياً. زي [[attr-checked]] بالظبط: الخاصية في الـ HTML بتمثّل **الحالة الأصلية**، أما الحالة الحالية فهي `option.selected` أو `select.value` في JavaScript. وفي `select multiple` ممكن أكتر من `option` يبقى `selected`. ولو عايز تفرض إن المستخدم يختار بنفسه، سيب أول خيار فاضي (`<option value="">اختار…</option>`) وضيف [[attr-required]] على الـ select.

## try

```html
<select id="s" onchange="o.textContent = 'اخترت: ' + this.value">
  <option value="">اختار…</option>
  <option value="eg" selected>مصر</option>
  <option value="sa">السعودية</option>
</select>
<p id="o">اخترت: eg</p>
```

## syntax

```html nolive
<select name="country">
  <option value="eg" selected>مصر</option>
  <option value="sa">السعودية</option>
</select>
```

- `selected` على `option` — الاختيار المبدئي.
- الحالة الحالية: `option.selected`.
- مع `multiple`: ممكن أكتر من واحد.

## use

- تحديد بلد أو لغة افتراضية.
- استرجاع اختيار محفوظ.

## avoid

- متكتبش `selected="false"`: وجودها = مختار.

## examples

### 1) اختيار مبدئي
مثال على selected.

```html
<select><option>أ</option><option selected>ب (مبدئي)</option><option>ج</option></select>
```

- الخيار «ب» ظاهر من البداية.
- من غير selected الأول هو المختار.
- خيار واحد يكفي في select العادي.

### 2) تغيير بالكود
.value وselectedIndex.

```html
<select id="s"><option value="a">أ</option><option value="b">ب</option><option value="c">ج</option></select>
<button onclick="s.value = 'c'">اختار ج</button> <button onclick="s.selectedIndex = 0">الأول</button>
```

- `select.value` الأسهل.
- `selectedIndex` بالترتيب.
- مفيش داعي `setAttribute`.

### 3) متعددة
مثال على multiple + selected.

```html
<select multiple size="3"><option selected>HTML</option><option selected>CSS</option><option>JS</option></select>
```

- اتنين مختارين مبدئياً.
- Ctrl لتغيير الاختيار.
- اقرا بـ `selectedOptions`.

## mistakes

### selected="false"
```html bad
<option selected="false">أ</option>
```
```html good
<option>أ</option>
```
ليه؟ وجود الخاصية = مختار.

## a11y

- الخيار المبدئي لازم يكون منطقي مش مضلّل.
- خلّي أول خيار "اختار…" لو مفيش افتراضي مناسب.

## quiz

### نوعها؟
- [x] boolean
- [ ] نص
- [ ] رقم
- [ ] رابط
وجودها كافي.

### الحالة الحالية؟
- [x] `option.selected` أو `select.value`
- [ ] خاصية HTML
- [ ] `option.checked`
- [ ] `select.on`
DOM.

## refs

- [MDN: selected](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#selected)
- [WHATWG: option](https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element)
