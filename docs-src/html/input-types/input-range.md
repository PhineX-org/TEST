---
id: input-range
kind: inputtype
cat: input-types
chip: type="range"
title: شريط التمرير
en: <input type="range">
status: stable
support: all
mdn: Elements/input/range
summary: type="range" شريط تمرير (slider) لاختيار رقم تقريبي بين min وmax بالسحب. مناسب لو الدقة مش مهمة (الصوت، السطوع)، وبيحتاج عرض القيمة بنفسك.
keywords: input range, slider, شريط تمرير, min, max, step, list, datalist, الصوت, السطوع, output
related: input, input-number, output, attr-min, attr-max, attr-step
---

## intro

شريط تمرير تسحب فيه **المقبض (thumb)** لتختار قيمة بين [[attr-min]] و[[attr-max]]. مناسب جداً للإعدادات اللي الدقة فيها **مش حرجة**: مستوى الصوت، السطوع، السعر التقريبي في فلتر. المستخدم مبيحتاجش يكتب رقم، يسحب بس.

نقطتين لازم تعرفهم: الأولى، الشريط **مش بيعرض القيمة الحالية**: لازم تعرضها بنفسك، وأفضل عنصر لده هو [[output]]. التانية، لو محتاج **رقم دقيق** (مثلاً 37 بالظبط) السحب مش مناسب، استخدم [[input-number]]. القيم الافتراضية: `min=0` و`max=100` و`step=1`، والقيمة المبدئية في النص. وممكن تحط علامات على الشريط بـ `list` و`datalist`.

## try

```html
<label>الصوت: <input id="r" type="range" min="0" max="100" value="40" oninput="o.value = this.value"></label>
<output id="o">40</output>%
```

## syntax

```html nolive
<input type="range" id="v" min="0" max="100" step="5" value="50">
<output for="v">50</output>
```

- `min` و`max` و`step` — الحدود والخطوة.
- `value` — القيمة المبدئية.
- `output` — بيعرض القيمة الحالية.

## use

- الصوت والسطوع والتكبير.
- نطاق سعر تقريبي.
- إعدادات الدقة فيها غير مهمة.

## avoid

- متستخدمهوش لو محتاج رقم دقيق.
- متنساش تعرض القيمة للمستخدم.

## examples

### 1) عرض القيمة
مثال على output.

```html
<input id="r" type="range" min="10" max="50" value="20" oninput="o.value = this.value + 'px'">
<output id="o">20px</output>
```

- حدث `input` بيتطلق أثناء السحب.
- `output` بيتحدّث لحظياً.
- اللي بيتبعت هو قيمة الـ range مش الـ output.

### 2) تغيير حجم نص
ربط بالتصميم.

```html
<input type="range" min="12" max="40" value="18" oninput="p.style.fontSize = this.value + 'px'">
<p id="p" style="font-size:18px">حجم الخط بيتغيّر</p>
```

- السحب بيغيّر `font-size` مباشرة.
- نمط شائع في الإعدادات.
- نفس الفكرة للسطوع واللون.

### 3) علامات على الشريط
مثال على datalist.

```html
<input type="range" min="0" max="100" step="25" list="m">
<datalist id="m"><option value="0"><option value="25"><option value="50"><option value="75"><option value="100"></datalist>
```

- علامات تظهر على الشريط في بعض المتصفحات.
- `step="25"` بيخلّي المقبض يقفز عليها.
- الشكل بيختلف بين المتصفحات.

### 4) شريط رأسي
orient بـ CSS.

```html
<input type="range" min="0" max="100" value="60" style="writing-mode: vertical-lr; direction: rtl; height:120px">
```

- الشريط الأفقي هو الافتراضي.
- الرأسي بيتعمل بـ CSS.
- اختبره في المتصفحات.

## mistakes

### شريط من غير عرض القيمة
```html bad
<input type="range" min="0" max="100">
```
```html good
<input type="range" min="0" max="100" oninput="o.value=this.value"> <output id="o">50</output>
```
ليه؟ المستخدم مبيعرفش القيمة بالظبط من غير عرضها.

### range لرقم دقيق
```html bad
<input type="range" name="age" min="0" max="120">
```
```html good
<input type="number" name="age" min="0" max="120">
```
ليه؟ السحب مش دقيق: العمر نكتبه.

## a11y

- اربطه بـ label يوضح اللي بيتحكم فيه.
- الشريط بيشتغل بأسهم الكيبورد افتراضياً.
- استخدم `aria-valuetext` لو القيمة تحتاج وصف نصي (مثلاً "متوسط").

## quiz

### هل الشريط بيعرض قيمته؟
- [x] لأ، لازم تعرضها بـ output
- [ ] أيوه
- [ ] في كروم بس
- [ ] لو فيه label
من غير عرض المستخدم مبيعرفش.

### الافتراضيات؟
- [x] min=0 وmax=100 وstep=1
- [ ] min=1 وmax=10
- [ ] min=0 وmax=1
- [ ] من غير قيم
معياري.

### لرقم دقيق؟
- [x] `number`
- [ ] `range`
- [ ] `slider`
- [ ] `text`
الكتابة أدق.

## refs

- [MDN: range](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range)
- [WHATWG: Range state](https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range))
