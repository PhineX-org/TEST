---
id: not
kind: pseudoclass
cat: pc-logical
chip: :not
title: عكس الشرط
en: CSS :not() pseudo-class
status: stable
support: all
mdn: :not
summary: الدالة not بتختار العناصر اللي مش بتطابق المحدد جواها: li:not(:last-child) أو a:not([href]). بتقبل قايمة محددات.
keywords: :not, not, نفي, استثناء, exclude, li:not(.active)
related: is, where, has, specificity, selectors-guide
---

## intro

`:not()` هي **أداة النفي**: بتختار كل العناصر **اللي مش** بتطابق المحدد اللي جواها. يعني `li:not(.active)` = كل الـ `li` اللي ملهاش class `active`. ممتازة لـ**الاستثناءات** بدل ما تكتب قاعدة للكل وبعدين تلغيها.

أمثلة شائعة:
- `li:not(:last-child) { border-bottom: 1px solid; }`: فاصل بين العناصر ماعدا الأخير.
- `a:not([href]) { color: gray; }`: وسوم a من غير href.
- `input:not([type="checkbox"]):not([type="radio"])`: كل الحقول ماعدا checkbox وradio.
- `:not(:first-child)`.

في المعيار الحديث بتقبل **قايمة** مفصولة بفاصلة: `:not(.a, .b)` = مش `.a` ومش `.b` (ولاحظ هي AND بين النفيين). وتقدر تدمج مع [[is]] و[[has]].

**الـ specificity**: بتاخد **specificity أعلى محدد جواها** (زي `:is`)، مش `:not` نفسها. فـ `:not(#id)` بوزن id.

تنبيه: متفرطش في تركيب النفيات؛ ممكن تصعّب القراءة. ولا يمكنك تداخل `:not()` جوه `:not()` في القديم، لكن بيتدعم حالياً.

> [!tip] `:not()` بتخلّي الكود **أقصر وأنضف** لما تعبّر عن «كله ماعدا ده».

## try

```html
<style>
  li { list-style:none; padding:6px 10px; background:#efe0bd; color:#3d2c18; }
  li:not(:last-child) { border-bottom:2px solid #bda27a; }
  li:not(.off) { font-weight:bold; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li class="off">ب (off)</li><li>ج</li></ul>
```

## syntax

```css nolive
li:not(:last-child) { }
a:not([href]) { }
input:not([type=checkbox], [type=radio]) { }
:not(.a, .b) { }
```

- بتنفي المحدد.
- بتقبل قايمة.
- specificity = أعلى محدد جواها.

## use

- استثناء حالات من قاعدة عامة.
- فواصل بين العناصر.
- تنسيق الحقول ماعدا نوع معين.

## avoid

- تركيب نفيات كتير (يصعّب القراءة).
- توقع إن specificity بتاعتها صفر.

## examples

### 1) فاصل بين العناصر
ماعدا الأخير.

```html
<style>
  li { list-style:none; padding:6px; background:#efe0bd; color:#3d2c18; }
  li:not(:last-child) { border-bottom:2px solid #bda27a; }
</style>
<ul style="padding:0;margin:0"><li>1</li><li>2</li><li>3</li></ul>
```



### 2) استثناء class
كله ماعدا .skip.

```html
<style>
  p { margin:3px 0; color:#3d2c18; padding:4px 8px; }
  p:not(.skip) { background:#bcd4a8; }
</style>
<p>فقرة</p><p class="skip">فقرة skip</p><p>فقرة</p>
```



### 3) حقول ماعدا checkbox
باستخدام attribute.

```html
<style>
  input:not([type=checkbox]) { padding:6px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:2px; }
</style>
<input placeholder="نص"><input type="checkbox">
```



### 4) قايمة داخل not
مش a ومش b.

```html
<style>
  span { display:inline-block; padding:4px 10px; margin:2px; background:#efe0bd; color:#3d2c18; border-radius:4px; }
  span:not(.a, .b) { background:#c9772f; color:#f3ede0; }
</style>
<span class="a">a</span><span class="b">b</span><span>c</span><span>d</span>
```



## mistakes

### قاعدة ثم إلغاء

```css bad
li { border-bottom:1px solid; }
li:last-child { border-bottom:0; }
```

```css good
li:not(:last-child) { border-bottom:1px solid; }
```

أنضف.

### نفي معقد

```css bad
a:not(.x):not(.y):not(.z):not(.w) { }
```

```css good
a:not(.x, .y, .z, .w) { }
```

قايمة داخل not.

## quiz

### not() بتعمل؟
- [x] تنفي المحدد
- [ ] تؤكد
- [ ] تنسخ
- [ ] تحذف العنصر

اختيار اللي مش مطابق.

### specificity بتاعتها؟
- [x] أعلى محدد جواها
- [ ] صفر
- [ ] 1
- [ ] 10

زي is.

### li:not(:last-child)؟
- [x] كل li ماعدا الأخير
- [ ] الأخير فقط
- [ ] أول li
- [ ] كل li

ماعدا الأخير.

## refs

- [MDN: :not](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)
