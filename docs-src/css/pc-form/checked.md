---
id: checked
kind: pseudoclass
cat: pc-form
chip: :checked
title: العنصر المحدد
en: CSS :checked pseudo-class
status: stable
support: all
mdn: :checked
summary: الحالة checked بتنطبق على checkbox وradio المحددين وعلى option المختار. أساس تصميم أزرار تبديل (toggle) وقوائم بدون JavaScript.
keywords: :checked, checked, checkbox, radio, toggle, switch, تحديد, حالة
related: disabled, required, appearance, accent-color, has, pseudo-guide
---

## intro

`:checked` بتنطبق على **عناصر الاختيار اللي حالتها «محددة»**: `<input type="checkbox">` لما تتعلّم، و`<input type="radio">` لما تتختار، و`<option>` المختار في القايمة. أول ما المستخدم يلغي التحديد الحالة بتروح.

دي من أقوى خصائص CSS لأنها بتخلّيك تعمل **تفاعل كامل بدون JavaScript**:
- **زرار تبديل (Toggle Switch)** بشكل مخصص: بتخفي الـ checkbox الأصلي (`appearance: none` أو `visibility`) وبترسم أنت الشكل، والحالة `:checked` هي اللي بتحرّك المقبض.
- **قوائم أكورديون و tabs** بحيلة الـ checkbox المخفي والمحدد الشقيق `~` أو `+`.
- **تمييز بطاقة الاختيار** اللي المستخدم اختارها (مع [[has]]: `label:has(input:checked)`).

نصيحة: لتغيير **لون** الـ checkbox الأصلي من غير تصميم مخصص، استخدم [[accent-color]]. ولو بتخفي الـ input لازم تفضل **قابل للوصول بالكيبورد** (متستخدمش `display: none` لأنه بيشيل التركيز؛ استخدم تقنية الإخفاء البصري).

> [!analogy] `:checked` زي مفتاح الإنارة: لما يتقلب لـ «شغّال» الغرفة كلها تنور (العناصر المرتبطة بيه).

## try

```html
<style>
  .sw { position:relative; display:inline-block; width:50px; height:28px; }
  .sw input { opacity:0; width:0; height:0; }
  .sl { position:absolute; inset:0; background:#bda27a; border-radius:28px; transition:.25s; cursor:pointer; }
  .sl::before { content:''; position:absolute; width:22px; height:22px; right:3px; top:3px; background:#f3ede0; border-radius:50%; transition:.25s; }
  input:checked + .sl { background:#3d7a5a; }
  input:checked + .sl::before { transform:translateX(-22px); }
</style>
<label class="sw"><input type="checkbox"><span class="sl"></span></label>
```

## syntax

```css nolive
input:checked { }
input:checked + label { color: #3d7a5a; }
input:checked ~ .panel { display: block; }
option:checked { }
```

- checkbox وradio وoption.
- تتعامل مع الشقيق `+` أو `~` لتأثير على عنصر تاني.

## use

- زرار تبديل (toggle) بدون JS.
- أكورديون وتبويبات بسيطة.
- تمييز بطاقات الاختيار.

## avoid

- `display:none` على الـ input (بيشيل الوصولية).
- نسيان إن الـ label لازم يكون مربوط بالـ input.

## examples

### 1) تغيير نص بجوار الـ checkbox
المحدد الشقيق +.

```html
<style>
  input:checked + span { color:#3d7a5a; font-weight:bold; }
  label { color:#3d2c18; font-size:1.1rem; cursor:pointer; }
</style>
<label><input type="checkbox"> <span>أوافق على الشروط</span></label>
```



### 2) radio كبطاقات
البطاقة المختارة تتلوّن.

```html
<style>
  label { display:inline-block; padding:8px 16px; margin:3px; border:2px solid #bda27a; border-radius:8px; color:#3d2c18; cursor:pointer; }
  input { position:absolute; opacity:0; }
  label:has(input:checked) { background:#c9772f; border-color:#7a4a1d; color:#f3ede0; }
</style>
<label><input type="radio" name="p" checked>مجاني</label><label><input type="radio" name="p">مدفوع</label>
```



### 3) أكورديون
checkbox مخفي يفتح اللوحة.

```html
<style>
  .a input { display:none; }
  .a label { display:block; padding:8px; background:#e4c490; color:#3d2c18; border-radius:6px; cursor:pointer; font-weight:bold; }
  .a .p { display:none; padding:8px; background:#efe0bd; color:#3d2c18; }
  .a input:checked ~ .p { display:block; }
</style>
<div class="a"><input type="checkbox" id="ac"><label for="ac">اضغط لفتح اللوحة</label><div class="p">محتوى اللوحة</div></div>
```



### 4) accent-color
أبسط طريقة لتلوين الأصلي.

```html
<style>
  input { accent-color:#c9772f; width:20px; height:20px; }
</style>
<input type="checkbox" checked> <input type="radio" checked>
```



## mistakes

### إخفاء الـ input بـ display:none

```css bad
input { display:none; }  /* مش قابل للتركيز */
```

```css good
input { position:absolute; opacity:0; }
```

خليه موجود للكيبورد.

### input وlabel مش مربوطين

```css bad
<input type="checkbox"><label>نص</label>
```

```css good
<input type="checkbox" id="a"><label for="a">نص</label>
```

الربط بـ for/id بيخلي الضغط على النص يشتغل.

## quiz

### checked بتنطبق على؟
- [x] checkbox وradio المحددين
- [ ] أي زرار
- [ ] input نصي
- [ ] img

العناصر المحددة.

### لتأثير على عنصر بعد الـ input؟
- [x] input:checked + .x
- [ ] input:hover
- [ ] input:checked::
- [ ] input:target

محدد شقيق.

### لتلوين بدون تصميم مخصص؟
- [x] accent-color
- [ ] color
- [ ] background
- [ ] filter

accent-color.

## refs

- [MDN: :checked](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked)
