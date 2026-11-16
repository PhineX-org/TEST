---
id: input-color
kind: inputtype
cat: input-types
chip: type="color"
title: منتقي الألوان
en: <input type="color">
status: stable
support: all
mdn: Elements/input/color
summary: type="color" بيفتح منتقي ألوان من المتصفح، والقيمة دايماً لون hex بصيغة #rrggbb بحروف صغيرة. مفيش شفافية في النسخة الأساسية، ولو مفيش قيمة بيبقى #000000.
keywords: input color, منتقي ألوان, color picker, hex, #rrggbb, لون, eyedropper, اختيار لون, theme
related: input, input-range, attr-value, datalist, span
---

## intro

حقل بيفتح **منتقي ألوان** (لوحة ألوان) من المتصفح أو نظام التشغيل: المستخدم بيختار لون بالضغط، من غير ما يعرف أكواد الألوان. شكله مربع صغير بلون الاختيار الحالي. تستخدمه في أدوات التصميم، تخصيص الثيم، ألوان الرسم، أو أي إعداد لوني.

القيمة (`value`) دايماً **لون hex بصيغة `#rrggbb`** بحروف صغيرة (مثلاً `#39ff14`). مفيش أسماء ألوان (`red`) ولا `rgb()` ولا شفافية في الاستخدام العادي. ولو معملتش `value` المبدئية، القيمة الافتراضية **`#000000`** (أسود) مش فاضية، فمفيش طريقة تقول «ما اخترتش لون» من غير ما تعمل ده بنفسك. وبتقدر تقرا التغيير بحدث `input` (أثناء الاختيار) أو `change` (لما يقفل المنتقي).

## try

```html
<label>لون الخلفية: <input id="c" type="color" value="#39ff14" oninput="b.style.background = this.value; o.textContent = this.value"></label>
<div id="b" style="margin-top:8px; padding:20px; border-radius:10px; background:#39ff14; color:#000">صندوق بيتلوّن</div>
<p id="o">#39ff14</p>
```

## syntax

```html nolive
<input type="color" name="theme" value="#39ff14">
```

- `value="#rrggbb"` — hex بحروف صغيرة.
- الافتراضي `#000000` (أسود).
- حدث `input` أثناء الاختيار، و`change` عند الإغلاق.

## use

- تخصيص ألوان الثيم أو الواجهة.
- أدوات رسم وتصميم.
- اختيار لون تصنيف أو علامة.

## avoid

- متكتبش `value="red"` أو `rgb()`: لازم `#rrggbb`.
- متعتمدش عليه لو محتاج شفافية (alpha).

## examples

### 1) تغيير لون النص
ربط بالتصميم.

```html
<input type="color" value="#2563eb" oninput="t.style.color = this.value">
<p id="t" style="font-size:1.4em; color:#2563eb">نص بيتلوّن</p>
```

- `oninput` بيحدّث اللون لحظياً.
- `this.value` بيرجّع hex.
- نفس الفكرة لـ `background` و`border-color`.

### 2) من hex لـ RGB
تحويل بالكود.

```html
<input id="c" type="color" value="#39ff14" oninput="const h = this.value; o.textContent = 'rgb(' + [1,3,5].map(i => parseInt(h.slice(i, i+2), 16)).join(', ') + ')'">
<p id="o">rgb(57, 255, 20)</p>
```

- `slice` بيقص كل قناة (رأس-أخضر-أزرق).
- `parseInt(…, 16)` بيحول hex لرقم.
- مفيد لو محتاج RGB.

### 3) ألوان مقترحة
list وdatalist.

```html
<input type="color" list="p" value="#ef4444">
<datalist id="p"><option value="#ef4444"><option value="#22c55e"><option value="#3b82f6"><option value="#eab308"></datalist>
```

- الـ `list` بيحط ألوان جاهزة في المنتقي (حسب المتصفح).
- مش كل المتصفحات بتعرضها.
- المستخدم لسه يقدر يختار أي لون.

### 4) تخزين الاختيار
مثال على localStorage.

```html
<input id="c" type="color" value="#39ff14" onchange="try { localStorage.setItem('pick', this.value) } catch (e) {}; o.textContent = 'اتحفظ ' + this.value">
<p id="o"></p>
```

- `change` بيحصل لما يقفل المنتقي.
- التخزين اختياري ولازم `try/catch`.
- ممكن تستخدمه لتذكر ثيم المستخدم.

## mistakes

### اسم لون بدل hex
```html bad
<input type="color" value="green">
```
```html good
<input type="color" value="#008000">
```
ليه؟ القيمة لازم `#rrggbb` وإلا بترجع للأسود.

### توقّع قيمة فاضية
```html bad
<input type="color" name="c">  <!-- يعني "مفيش لون"؟ -->
```
```html good
<input type="color" name="c" value="#ffffff">
```
ليه؟ القيمة الافتراضية `#000000` دايماً: مفيش "فاضي".

## a11y

- اربطه بـ label يوضح الاستخدام.
- متعتمدش على اللون وحده لنقل معلومة.
- اعرض كود اللون كنص جنبه.

## quiz

### صيغة `value` للون؟
- [x] `#rrggbb`
- [ ] `rgb(…)`
- [ ] اسم اللون
- [ ] أي صيغة CSS
hex بس.

### القيمة الافتراضية؟
- [x] `#000000`
- [ ] فاضية
- [ ] `#ffffff`
- [ ] `null`
أسود.

### هل فيه شفافية؟
- [x] لأ في الاستخدام العادي
- [ ] أيوه
- [ ] بـ alpha دايماً
- [ ] بـ opacity
hex من 6 خانات.

## refs

- [MDN: color](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color)
- [WHATWG: Color state](https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color))
