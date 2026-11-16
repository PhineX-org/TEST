---
id: input-button
kind: inputtype
cat: input-types
chip: type="button"
title: زرار عادي
en: <input type="button">
status: stable
support: all
mdn: Elements/input/button
summary: type="button" زرار من غير سلوك افتراضي: مبيبعتش الفورم ومبيعملش reset، بيشتغل بس بالجافاسكربت. النص من value. الأفضل غالباً عنصر button لأنه يقبل محتوى.
keywords: input button, زرار, value, onclick, بدون سلوك, button element, نص الزرار, زرار جافاسكربت
related: input, button, input-submit, input-reset, form, attr-events
---

## intro

ده زرار **بدون أي سلوك تلقائي**: لو ضغطت عليه مفيش إرسال فورم ولا مسح. هو مجرد زرار بيتنفّذ فيه **الكود اللي إنت تربطه بيه** بالجافاسكربت (`onclick` أو `addEventListener`). النص اللي عليه بيجي من الخاصية **`value`** (مش من محتوى العنصر، لأن `<input>` عنصر فاضي).

في الواقع الحديث، الغالب الناس بتستخدم **عنصر [[button]]** بدل `<input type="button">`، لأن `<button>` ليه محتوى (نص، أيقونة، HTML)، فبتقدر تنسّقه وتحط فيه أي حاجة، بينما `value` نص خام. لكن `type="button"` لسه صالح وبيظهر في كود قديم كتير. لو مستخدم `<button>` جوه فورم، لازم تكتب `type="button"` صراحةً، لأن الافتراضي `submit` (وده فخ مشهور بيخلّي الفورم يتبعت لوحده). وكمان الزرار ده بيتفوكس بالتاب ويشتغل بـ Enter وSpace من غير أي شغل إضافي منك، وده سبب إنه أحسن بكتير من `div` متحوّل لزرار.

## try

```html
<input type="button" value="اضغط عليّ" onclick="this.value = 'اتدوست ' + (this.n = (this.n || 0) + 1) + ' مرة'">
```

## syntax

```html nolive
<input type="button" value="احسب" onclick="calc()">
```

- `value` — النص اللي على الزرار.
- مفيش سلوك افتراضي (مش submit).
- `onclick` أو `addEventListener` — الكود بتاعك.

## use

- زراير تنفّذ جافاسكربت جوه فورم أو برّاه.
- كود قديم أو أمثلة بسيطة.
- لما محتاج زرار نصه خام بس.

## avoid

- الأفضل `<button type="button">` لو عايز تنسيق أو أيقونة.
- متتوقعش يبعت الفورم.

## examples

### 1) عدّاد
مثال على onclick.

```html
<input id="b" type="button" value="0" onclick="this.value = +this.value + 1">
```

- النص هو `value` فبيتغيّر مباشرة.
- `+this.value` بيحوله لرقم.
- مثال على تحديث نص الزرار.

### 2) جوه فورم من غير إرسال
مش submit.

```html
<form onsubmit="event.preventDefault(); o.textContent='اتبعت'">
  <input name="n" placeholder="اكتب">
  <input type="button" value="مسح الحقل" onclick="this.form.n.value = ''">
  <input type="submit" value="إرسال">
</form>
<p id="o"></p>
```

- زرار المسح مبيبعتش الفورم.
- `this.form` بيجيب الفورم الأب.
- زرار submit هو اللي بيبعت.

### 3) addEventListener
الأسلوب الأنضف.

```html
<input id="b" type="button" value="سلام">
<p id="o"></p>
<script>b.addEventListener('click', () => o.textContent = 'أهلاً من الجافاسكربت');</script>
```

- الكود بعيد عن الـ HTML.
- تقدر تضيف أكتر من مستمع.
- ده المفضّل في المشاريع.

### 4) تعطيل الزرار
مثال على disabled.

```html
<input id="b" type="button" value="ابعت" onclick="this.disabled = true; this.value = 'جاري…'">
```

- `disabled` بتمنع الضغط التاني.
- مفيدة لمنع الإرسال المتكرر.
- ارجّعه بعد ما الشغل يخلص.

## mistakes

### button جوه فورم من غير type
```html bad
<form><button onclick="clearAll()">مسح</button></form>
```
```html good
<form><button type="button" onclick="clearAll()">مسح</button></form>
```
ليه؟ الافتراضي submit: هيبعت الفورم. مع input type="button" الموضوع آمن.

### نص جوه input
```html bad
<input type="button">اضغط</input>
```
```html good
<input type="button" value="اضغط">
```
ليه؟ `<input>` عنصر فاضي: النص من `value`.

## a11y

- خلّي النص فعل واضح.
- لا تستخدم `div` كزرار.
- الفوكس والـ Enter والـ Space شغالين تلقائياً.

## quiz

### هل `type="button"` بيبعت الفورم؟
- [x] لأ
- [ ] أيوه
- [ ] لو فيه name
- [ ] لو جوه فورم
مفيش سلوك افتراضي.

### النص بيجي من؟
- [x] `value`
- [ ] محتوى العنصر
- [ ] `title`
- [ ] `name`
`<input>` فاضي.

### البديل الأقوى؟
- [x] `<button>`
- [ ] `<a>`
- [ ] `<div>`
- [ ] `<span>`
بيقبل HTML جواه.

## refs

- [MDN: button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/button)
- [WHATWG: Button state](https://html.spec.whatwg.org/multipage/input.html#button-state-(type=button))
