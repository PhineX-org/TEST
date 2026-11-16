---
id: input-text
kind: inputtype
cat: input-types
chip: type="text"
title: حقل نص عادي
en: <input type="text">
status: stable
support: all
mdn: Elements/input/text
summary: type="text" هو النوع الافتراضي لـ input: سطر واحد لنص حر (اسم، عنوان، بحث بسيط). بيدعم placeholder وmaxlength وpattern وlist، ومش بيتحقق من الشكل.
keywords: input text, حقل نص, single line, placeholder, maxlength, pattern, size, list, datalist, spellcheck, نص
related: input, label, attr-maxlength, attr-pattern, attr-placeholder, datalist
---

## intro

ده أبسط وأشهر حقل في HTML: **سطر واحد بيقبل أي نص**. لو كتبت `<input>` من غير `type` أصلاً، المتصفح بيعتبره `type="text"`. بتستخدمه للاسم، العنوان، اسم المستخدم، أي حاجة قصيرة. المتصفح **مش بيتحقق** من اللي اتكتب (مفيش قواعد على شكل النص)، فلو عايز قيود زودها بـ [[attr-maxlength]] و[[attr-pattern]] و[[attr-required]].

حاجة مهمة: لازم يكون ليه **اسم** (`name`) عشان قيمته تتبعت مع الفورم، ولازم `<label>` مربوط بيه. ولو النص فيه أكتر من سطر، استخدم [[textarea]] بدل ما تحاول تعمل سطر طويل. وتذكّر إن كل قيمة بتكتبها في الحقل بتوصل للسيرفر كنص، حتى لو كانت أرقام، فلو عايز رقم بالتحديد فيه نوع مخصّص ليه.

## try

```html
<label>اسمك: <input type="text" name="name" placeholder="اكتب اسمك" oninput="o.textContent = 'اللي كتبته: ' + this.value"></label>
<p id="o" style="color:#475569"></p>
```

## syntax

```html nolive
<label for="n">الاسم</label>
<input type="text" id="n" name="name" placeholder="مثلاً: أحمد" maxlength="40" required>
```

- `type="text"` — سطر نص حر (والافتراضي).
- `name` — اسم الحقل في البيانات المبعوتة.
- `maxlength` و`pattern` و`required` — قيود اختيارية.

## use

- الاسم، اسم المستخدم، العنوان القصير.
- بحث بسيط من غير ميزات خاصة.
- أي إدخال نصي من سطر واحد.

## avoid

- متستخدمهوش لنص طويل: استخدم `textarea`.
- متستخدمهوش للإيميل أو الرقم: النوع المخصّص بيدّي كيبورد وفحص أحسن.

## examples

### 1) حقل مع تلميح وعدّاد
placeholder وmaxlength.

```html
<input id="t" type="text" maxlength="20" placeholder="لحد 20 حرف" oninput="c.textContent = this.value.length + ' / 20'">
<span id="c">0 / 20</span>
```

- `maxlength` بيمنع الكتابة بعد الحد.
- العدّاد بيتحدّث مع كل حرف.
- الـ `placeholder` تلميح مش بديل للـ label.

### 2) حقل بقيود (pattern)
حروف إنجليزية فقط.

```html
<form onsubmit="event.preventDefault(); o.textContent='تمام ✅'">
  <label>اسم مستخدم: <input type="text" pattern="[A-Za-z0-9_]{3,12}" title="3 إلى 12 حرف إنجليزي أو رقم" required></label>
  <button>تسجيل</button>
</form>
<p id="o"></p>
```

- `pattern` تعبير نمطي (Regex) لازم يطابق كل القيمة.
- `title` بيظهر في رسالة الخطأ.
- الفحص بيحصل عند الإرسال.

### 3) اقتراحات بـ datalist
مثال على list.

```html
<input type="text" list="c" placeholder="اختار مدينة أو اكتب">
<datalist id="c"><option value="القاهرة"><option value="الإسكندرية"><option value="أسوان"></datalist>
```

- الـ `list` بتشاور على `id` الـ `datalist`.
- المستخدم ممكن يختار أو يكتب حاجة تانية.
- ده مش `select`: القيمة حرة.

### 4) قراءة القيمة وتغييرها
مثال على value.

```html
<input id="i" type="text" value="PhineX">
<button onclick="i.value = i.value.toUpperCase()">كبّر الحروف</button>
```

- `value` في الـ HTML هو القيمة المبدئية.
- `input.value` في JS هي القيمة الحالية.
- تعديلها بالكود بيغيّر اللي ظاهر.

### 5) قراءة فقط وتعطيل
readonly مقابل disabled.

```html
<input type="text" value="قراءة فقط" readonly>
<input type="text" value="معطّل" disabled>
```

- `readonly` بيتبعت مع الفورم ويتاخد فوكس.
- `disabled` مبيتبعتش ومبياخدش فوكس.
- اختار حسب الحاجة.

## mistakes

### حقل من غير name
```html bad
<input type="text">
```
```html good
<input type="text" name="username">
```
ليه؟ من غير `name` القيمة مش بتتبعت مع الفورم.

### placeholder بدل label
```html bad
<input type="text" placeholder="الاسم">
```
```html good
<label>الاسم <input type="text" name="n"></label>
```
ليه؟ التلميح بيختفي عند الكتابة وقارئ الشاشة مش بيعتمد عليه.

## a11y

- اربط كل حقل بـ `<label>` ظاهر.
- متعتمدش على `placeholder` كاسم للحقل.
- اكتب رسائل خطأ واضحة (`title` أو نص مجاور).

## quiz

### إيه النوع الافتراضي لـ `<input>`؟
- [x] `text`
- [ ] `email`
- [ ] `search`
- [ ] `submit`
من غير type المتصفح بيعتبره text.

### إزاي تحدّد أقصى عدد حروف؟
- [x] `maxlength`
- [ ] `max`
- [ ] `size`
- [ ] `limit`
`maxlength` للنصوص.

### لنص من عدة أسطر؟
- [x] `textarea`
- [ ] `input text`
- [ ] `input long`
- [ ] `select`
textarea.

## refs

- [MDN: text](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/text)
- [WHATWG: Text state](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search))
