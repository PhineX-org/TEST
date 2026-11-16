---
id: legend
kind: element
cat: forms
tag: legend
title: عنوان المجموعة (legend)
en: HTML legend element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر legend هو عنوان مجموعة الحقول جوه fieldset، وبيتحط أول ابن، وبيتعرض على حد الإطار، وبيتقري كاسم للمجموعة. بيستخدم كمان في بداية details قديماً.
keywords: legend, عنوان مجموعة, fieldset, تسمية, سؤال, radio group, إتاحة
related: fieldset, label, input, details
---

## intro

الـ `<legend>` (**ليجند**: دليل أو عنوان) هو **اسم** مجموعة الحقول في [[fieldset]]. لازم يتحط **أول ابن** جواه. المتصفح بيرسمه **على حد الإطار** العلوي («بيقطع» الخط). وقارئ الشاشة بيقراه **كاسم المجموعة**: «مستواك في البرمجة، مجموعة» وبعدين كل اختيار.

بيقبل **Phrasing content** (نص وعناصر inline) ومعاه ممكن عناوين `<h1>`–`<h6>`. وبيتنسّق بـ CSS عادي: لون وخط وحشو. ولو عايز تشيله بصرياً مع الحفاظ على الإتاحة استخدم أسلوب `sr-only`.

> [!key] `<legend>` أول ابن في `<fieldset>`، وهو عنوان/سؤال المجموعة.

## try

```html
<fieldset>
  <legend>المفضّل عندك؟</legend>
  <label><input type="radio" name="x"> HTML</label>
  <label><input type="radio" name="x"> CSS</label>
</fieldset>
```

## syntax

```html nolive
<fieldset>
  <legend>عنوان المجموعة</legend>
  ...
</fieldset>
```

- `<legend>` — **الوسم الافتتاحي**، أول ابن.
- النص — **عنوان أو سؤال**.
- `</legend>` — **الوسم الختامي** إجباري.

## use

- كعنوان لمجموعة حقول.
- كسؤال لمجموعة radio أو checkbox.

## avoid

- متستخدمهوش برّه `<fieldset>`.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### align {deprecated}
كانت بتحدد محاذاة العنوان. **قديمة**: CSS.

### class
للتنسيق.

## examples

### 1) عنوان بسيط
الأساسي.

```html
<fieldset style="border:1px solid #94a3b8; border-radius:8px">
  <legend>بيانات الاتصال</legend>
  <label>الهاتف <input type="tel"></label>
</fieldset>
```

- العنوان بيظهر على الحد العلوي للإطار.
- بيتقري كاسم للمجموعة.
- النص الافتراضي بيبقى عادي من غير تنسيق خاص.

### 2) تنسيق العنوان
CSS.

```html
<style>
  legend { background:#0f172a; color:#fff; padding:4px 14px; border-radius:99px; font-size:14px }
  fieldset { border:2px solid #0f172a; border-radius:12px }
</style>
<fieldset>
  <legend>الدفع</legend>
  <label><input type="radio" name="p"> كاش</label>
  <label><input type="radio" name="p"> كارت</label>
</fieldset>
```

- الـ `<legend>` بيتنسّق زي أي عنصر.
- الخلفية والحواف المدورة بتخليه شبه «تاج».
- التصميم مختلف لكن الدلالة هي هي.

### 3) legend مخفي بصرياً
لإتاحة بس.

```html
<style>
  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap }
  fieldset { border:0; padding:0 }
</style>
<fieldset>
  <legend class="sr-only">اختار اللغة</legend>
  <label><input type="radio" name="l" checked> عربي</label>
  <label><input type="radio" name="l"> English</label>
</fieldset>
```

- لما التصميم مش عايز عنوان ظاهر، بنخفيه بصرياً بس.
- قارئ الشاشة لسه بيقراه ويعرف السؤال.
- متستخدمش `display:none` لأنه بيشيله من قارئ الشاشة.

## rules

- parents: [[fieldset]] (أول ابن) أو `<details>` (قديماً في بعض الحالات).
- children: **Phrasing content** (ومعاه عناوين).
- closing: الوسم الختامي `</legend>` إجباري.
- role: مفيش (اسم للمجموعة).
- dom: `HTMLLegendElement`.
- layout: `display: block`، بيظهر على حد الإطار.

## mistakes

### legend برّه fieldset
```html bad
<legend>عنوان</legend><input>
```
```html good
<fieldset><legend>عنوان</legend><input></fieldset>
```
ليه؟ مالوش معنى من غير `<fieldset>`.

## a11y

- اكتب نص واضح ومستقل (سؤال أو اسم مجموعة).
- متخفيهوش بـ `display:none`: استخدم `sr-only`.

## tips

- خليه قصير ووصفي.
- استخدمه كسؤال لـ radio group.

## quiz

### فين بيتحط `<legend>`؟
- [ ] آخر `<fieldset>`
- [x] أول ابن في `<fieldset>`
- [ ] في `<head>`
- [ ] جوه `<input>`
هو العنوان فلازم الأول.

### إزاي تخفي `<legend>` ويفضل متاح؟
- [x] `sr-only` (إخفاء بصري)
- [ ] `display:none`
- [ ] `visibility:hidden`
- [ ] تحذفه
الإخفاء البصري بيحافظ على الإتاحة.

## refs

- [MDN: legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend)
- [WHATWG: The legend element](https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element)
