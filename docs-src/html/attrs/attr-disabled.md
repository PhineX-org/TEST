---
id: attr-disabled
kind: attribute
cat: attrs
chip: disabled
title: خاصية التعطيل
en: HTML disabled attribute
status: stable
support: all
mdn: Attributes/disabled
summary: خاصية disabled منطقية بتعطّل عنصر فورم: مبيتضغطش ولا ياخد فوكس ومبيتبعتش مع الفورم، وبيظهر باهت. الفرق عن readonly إن الأخير بيتبعت ويقبل فوكس.
keywords: disabled, تعطيل, readonly, :disabled, fieldset disabled, button disabled, form control, غير متاح, هاب
related: input, button, select, textarea, fieldset, attr-readonly, attr-required
---

## intro

الخاصية `disabled` (منطقية) بتخلّي عنصر الفورم **غير متاح**: [[button]] أو [[input]] أو [[select]] أو [[textarea]] أو [[fieldset]] (وبتعطّل كل اللي جواه). عنصر معطّل: **مبيتضغطش، مبياخدش فوكس بالتاب، مبيتبعتش مع الفورم أصلاً**، وبيظهر باهت (رمادي) في أغلب المتصفحات. وفي CSS تنسّقه بـ `:disabled`.

الاستخدامات الشائعة: تعطيل زرار «إرسال» لحد ما الفورم يكتمل، أو أثناء الإرسال لمنع الضغط المتكرر، أو حقل مش متاح لسبب معيّن (خيار تاني لازم يتحدد الأول).

الفرق المهم مع [[attr-readonly]]: **`readonly`**: المستخدم مش بيقدر يعدّل لكن الحقل **بياخد فوكس وبيتبعت**. **`disabled`**: لا فوكس ولا إرسال. فلو عايز المستخدم يشوف القيمة ويبعتها من غير تعديل استخدم `readonly`، ولو عايز العنصر «مش موجود» وظيفياً استخدم `disabled`.

مهم للإتاحة: العنصر المعطّل بيختفي من ترتيب التاب، فالمستخدم بالكيبورد مش هيعرف إنه موجود. وضّح السبب في نص جنبه.

## try

```html
<input id="e" type="email" placeholder="إيميل" oninput="b.disabled = !this.validity.valid || !this.value">
<button id="b" disabled>اشترك</button>
<input value="معطّل" disabled>
<p style="color:#64748b">الزرار بيشتغل لما تكتب إيميل صح.</p>
```

## syntax

```html nolive
<button disabled>غير متاح</button>
<input disabled value="…">
<fieldset disabled>…</fieldset>
```

- `disabled` — boolean: معطّل.
- مبيتبعتش، مبياخدش فوكس.
- `fieldset disabled` بيعطّل كل اللي جواه.

## use

- زرار إرسال لحد ما الفورم يتكمّل.
- منع الضغط المتكرر أثناء الإرسال.
- حقول مش منطقية في حالة معيّنة.
- تعطيل مجموعة كاملة بـ `fieldset`.

## avoid

- متعطّلش حاجة من غير ما تشرح ليه.
- متستخدمش disabled لو عايز القيمة تتبعت: استخدم `readonly`.

## examples

### 1) منع الإرسال المتكرر
disabled أثناء الإرسال.

```html
<form onsubmit="event.preventDefault(); const b = this.b; b.disabled = true; b.textContent = 'جاري الإرسال…'; setTimeout(() => { b.disabled = false; b.textContent = 'إرسال' }, 1500)">
  <input name="x" placeholder="اكتب" required>
  <button name="b">إرسال</button>
</form>
```

- الزرار بيتعطّل لحظة الإرسال.
- نرجّعه بعد الرد.
- بيمنع طلبات مكررة.

### 2) تعطيل مجموعة
مثال على fieldset.

```html
<label><input id="on" type="checkbox" onchange="f.disabled = !this.checked"> فعّل الإعدادات</label>
<fieldset id="f" disabled>
  <legend>إعدادات متقدمة</legend>
  <label>أ <input></label> <label>ب <input></label>
</fieldset>
```

- حقل واحد بيعطّل كل اللي جوه.
- الـ `legend` الأول مستثنى.
- مفيد لأقسام شرطية.

### 3) تنسيق :disabled
مثال على CSS.

```html
<style>button:disabled { opacity:.5; cursor:not-allowed }</style>
<button disabled>معطّل</button> <button>شغّال</button>
```

- `:disabled` للمعطّل.
- `cursor:not-allowed` بيوضّح.
- خلّي التباين مقروء.

### 4) readonly مقابل disabled
الفرق.

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this))">
  <input name="a" value="readonly" readonly>
  <input name="b" value="disabled" disabled>
  <button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

- `a` بيتبعت (readonly).
- `b` مبيتبعتش (disabled).
- اختار حسب هدفك.

## mistakes

### disabled="false"
```html bad
<button disabled="false">ابعت</button>
```
```html good
<button>ابعت</button>
```
ليه؟ وجود الخاصية = معطّل مهما كانت القيمة.

### تعطيل بدون سبب واضح
```html bad
<button disabled>إرسال</button>
```
```html good
<button disabled aria-describedby="why">إرسال</button><p id="why">أكمل الحقول المطلوبة أولاً.</p>
```
ليه؟ المستخدم محتاج يعرف ليه الزرار مش شغّال.

## a11y

- العنصر المعطّل بيخرج من ترتيب التاب: وضّح السبب في نص.
- خلّي التباين كافي للقراءة حتى وهو باهت.
- لو الزرار ممكن يتعطّل، استخدم `aria-disabled` لو عايزه يفضل في التاب مع رسالة توضيح.

## quiz

### هل المعطّل بيتبعت؟
- [x] لأ
- [ ] أيوه
- [ ] لو required
- [ ] مع GET
مبيتبعتش.

### عايز القيمة تتبعت ومتتعدّلش؟
- [x] `readonly`
- [ ] `disabled`
- [ ] `hidden`
- [ ] `locked`
readonly بتتبعت.

### تعطيل مجموعة؟
- [x] `fieldset disabled`
- [ ] `group disabled`
- [ ] `div disabled`
- [ ] `form off`
كل اللي جواه.

## refs

- [MDN: disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled)
- [MDN: :disabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled)
