---
id: input-checkbox
kind: inputtype
cat: input-types
chip: type="checkbox"
title: مربع الاختيار
en: <input type="checkbox">
status: stable
support: all
mdn: Elements/input/checkbox
summary: type="checkbox" مربع تفعيل/إلغاء مستقل: كل مربع ليه حالته. لو متعلّم بيتبعت name=value، ولو لأ مبيتبعتش حاجة. بيدعم checked وindeterminate، ويتربط بـ label.
keywords: input checkbox, مربع اختيار, checked, indeterminate, name, value, label, اختيارات متعددة, موافقة, toggle
related: input, input-radio, label, fieldset, attr-checked, attr-required
---

## intro

مربع صغير تضغط عليه يتعلّم أو يتشال العلامة. **كل مربع مستقل عن التاني**، فتقدر تختار أكتر من واحد (عكس [[input-radio]] اللي بيختار واحد بس). بتستخدمه للموافقة على الشروط، تفعيل إعداد (تذكّرني)، أو اختيار عدة عناصر من قايمة.

فيه نقطة بتلخبط المبتدئين: **لو المربع مش متعلّم، مبيتبعتش في الفورم أصلاً** (مش هيجي `name=false`). بس المتعلّم بيتبعت كـ `name=value` (والـ `value` الافتراضي هو `"on"`). وعلشان تعرف حالته في JS استخدم `input.checked` (true/false) مش `value`. وفيه حالة تالتة **`indeterminate`** (شرطة وسط) بتتحط بالجافاسكربت بس، بتستخدم لمربع «تحديد الكل» لما بعض الفرعيات متعلّمة. وعشان المساحة اللي تضغط عليها تبقى كبيرة، اربطه بـ [[label]].

## try

```html
<label><input id="a" type="checkbox" name="agree" onchange="o.textContent = this.checked ? 'موافق ✅' : 'مش موافق ❌'"> موافق على الشروط</label>
<p id="o">مش موافق ❌</p>
```

## syntax

```html nolive
<label><input type="checkbox" name="news" value="yes" checked> اشترك في النشرة</label>
```

- `checked` — متعلّم مبدئياً.
- `name` و`value` — بيتبعتوا لو متعلّم.
- `input.checked` — الحالة في JS.

## use

- الموافقة على شروط أو سياسة.
- تفعيل/إلغاء إعداد.
- اختيار عدة عناصر من قايمة.

## avoid

- متستخدمهوش لاختيار واحد من عدّة (استخدم radio).
- متنساش label، وإلا الهدف صغير جداً.

## examples

### 1) اختيارات متعددة
قايمة مواد.

```html
<fieldset><legend>اهتماماتك</legend>
  <label><input type="checkbox" name="i" value="html" checked> HTML</label>
  <label><input type="checkbox" name="i" value="css"> CSS</label>
  <label><input type="checkbox" name="i" value="js"> JavaScript</label>
</fieldset>
<button onclick="o.textContent = [...document.querySelectorAll('[name=i]:checked')].map(c => c.value).join(', ') || 'مفيش'">اعرض المختار</button>
<p id="o"></p>
```

- نفس الـ `name` لأكتر من مربع = قايمة قيم.
- `:checked` في الـ selector بيجيب المتعلّم.
- الـ `fieldset` بيجمعهم لقارئ الشاشة.

### 2) تحديد الكل (indeterminate)
الحالة التالتة.

```html
<label><input id="all" type="checkbox"> الكل</label><br>
<label><input class="s" type="checkbox"> أ</label>
<label><input class="s" type="checkbox"> ب</label>
<label><input class="s" type="checkbox"> ج</label>
<script>
  const s = [...document.querySelectorAll('.s')];
  all.onchange = () => s.forEach(c => c.checked = all.checked);
  s.forEach(c => c.onchange = () => {
    const n = s.filter(x => x.checked).length;
    all.checked = n === s.length; all.indeterminate = n > 0 && n < s.length;
  });
</script>
```

- `indeterminate` من JS بس.
- بيبان كشرطة لما بعض الفرعيات متعلّمة.
- مش قيمة بتتبعت: مجرد شكل.

### 3) مفتاح تشغيل (switch)
مثال على role=switch.

```html
<label><input id="s" type="checkbox" role="switch" onchange="o.textContent = this.checked ? 'شغّال' : 'مقفول'"> الإشعارات</label>
<p id="o">مقفول</p>
```

- `role="switch"` بيخلّي القارئ يعلن «تشغيل/إيقاف».
- الشكل بيتغيّر بـ CSS.
- معناه مختلف شوية عن checkbox.

### 4) موافقة مطلوبة
مثال على required.

```html
<form onsubmit="event.preventDefault(); o.textContent='اتبعت ✅'">
  <label><input type="checkbox" required> قرأت الشروط</label>
  <button>متابعة</button>
</form>
<p id="o"></p>
```

- `required` بتمنع الإرسال لو مش متعلّم.
- رسالة الخطأ من المتصفح.
- اتأكد من السيرفر كمان.

## mistakes

### من غير label
```html bad
<input type="checkbox" name="agree"> موافق
```
```html good
<label><input type="checkbox" name="agree"> موافق</label>
```
ليه؟ من غير label الضغط على النص مبيعلّمش المربع.

### قراءة value بدل checked
```html bad
<script>if (c.value) { /* متعلّم؟ */ }</script>
```
```html good
<script>if (c.checked) { /* متعلّم */ }</script>
```
ليه؟ `value` ثابتة ("on") سواء متعلّم أو لأ. الحالة في `checked`.

## a11y

- اربط كل مربع بـ label (يتكبّر الهدف).
- اجمع المربعات المرتبطة في `fieldset` و`legend`.
- متشيلش outline الفوكس.

## quiz

### لو المربع مش متعلّم، بيتبعت؟
- [x] لأ، مبيتبعتش
- [ ] name=false
- [ ] name=off
- [ ] name=
بس المتعلّم.

### الحالة في JS؟
- [x] `checked`
- [ ] `value`
- [ ] `state`
- [ ] `on`
true أو false.

### الحالة التالتة؟
- [x] `indeterminate` من JS
- [ ] `maybe`
- [ ] `half`
- [ ] `partial` من HTML
شكلها فقط.

## refs

- [MDN: checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox)
- [WHATWG: Checkbox state](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox))
