---
id: attr-multiple
kind: attribute
cat: attrs
chip: multiple
title: خاصية التعدد
en: HTML multiple attribute
status: stable
support: all
mdn: Attributes/multiple
summary: خاصية multiple منطقية بتسمح بأكتر من قيمة: في input file اختيار عدة ملفات، وفي email عدة إيميلات بفاصلة، وفي select اختيار عدة خيارات بـ Ctrl أو Shift.
keywords: multiple, اختيار متعدد, file multiple, select multiple, email multiple, files, selectedOptions, Ctrl, Shift, عدة ملفات
related: input-file, input-email, select, option, attr-size, attr-accept
---

## intro

`multiple` (منطقية) بتسمح للمستخدم يدخل **أكتر من قيمة** في الحقل. بتشتغل على تلات حالات بسلوك مختلف:

**في [[input-file]]:** المستخدم يقدر **يختار عدة ملفات** مرة واحدة (بـ Ctrl/Shift أو تحديد متعدد في النافذة)، وبتقراهم من `input.files` (قايمة). **في [[input-email]]:** بتقبل **عدة إيميلات مفصولة بفاصلة**، والمتصفح بيفحص كل واحد. **في [[select]]:** بتحوّل القايمة المنسدلة لـ **قايمة متعددة الاختيار** (مربع بسطور) تختار منها أكتر من خيار بـ Ctrl (أو Cmd) أو Shift. القيم المختارة بتتبعت كلها بنفس الـ `name`، وفي JS بتجيبها من `select.selectedOptions`.

نصيحة UX: الـ `select multiple` غير مألوفة للمستخدمين العاديين (محتاجة ضغط Ctrl مش واضحة)، فلو الخيارات قليلة استخدم **مجموعة [[input-checkbox]]** بدلها، وهي أوضح بكتير. والـ `size` بتتحكم في عدد الأسطر الظاهرة في `select multiple`.

## try

```html
<label>ملفات: <input type="file" multiple onchange="o.textContent = this.files.length + ' ملف: ' + [...this.files].map(f => f.name).join(', ')"></label>
<p id="o"></p>
<label>إيميلات: <input type="email" multiple placeholder="a@x.com, b@y.com"></label>
```

## syntax

```html nolive
<input type="file" multiple>
<input type="email" multiple>
<select multiple size="4"><option>أ</option><option>ب</option></select>
```

- `multiple` — boolean: عدة قيم.
- file: عدة ملفات، email: بفاصلة، select: قايمة متعددة.
- خيارات قليلة؟ استخدم checkboxes.

## use

- رفع عدة صور/ملفات مرة واحدة.
- إدخال عدة إيميلات (مشاركة).
- اختيار أكتر من مهارة/تصنيف من قايمة طويلة.

## avoid

- متستخدمش `select multiple` لو الخيارات قليلة: checkboxes أوضح.
- متنساش `size` مع `select multiple`.

## examples

### 1) select متعددة
مثال على selectedOptions.

```html
<select id="s" multiple size="4" style="min-width:140px">
  <option value="html">HTML</option><option value="css">CSS</option><option value="js">JavaScript</option><option value="py">Python</option>
</select>
<button onclick="o.textContent = [...s.selectedOptions].map(x => x.value).join(', ') || 'ولا حاجة'">اعرض المختار</button>
<p id="o"></p>
```

- Ctrl/Cmd أو Shift للاختيار المتعدد.
- `selectedOptions` بترجّع قايمة المختار.
- `size` عدد الأسطر الظاهرة.

### 2) معاينة صور متعددة
مثال على files + URL.createObjectURL.

```html
<input type="file" accept="image/*" multiple onchange="p.innerHTML = ''; [...this.files].forEach(f => { const i = new Image(); i.src = URL.createObjectURL(f); i.width = 60; i.alt = f.name; p.append(i) })">
<div id="p" style="display:flex; gap:6px; margin-top:8px"></div>
```

- كل ملف ليه URL مؤقت.
- بنعرضهم كصور صغيرة.
- افحص نوع وحجم الملفات في السيرفر.

### 3) إيميلات متعددة
مثال على validity.

```html
<input id="e" type="email" multiple value="a@x.com, nope">
<button onclick="o.textContent = e.checkValidity() ? 'صح ✅' : 'فيه إيميل غلط ❌'">افحص</button>
<p id="o"></p>
```

- المتصفح بيفحص كل إيميل.
- الفاصلة هي الفاصل.
- المسافات حواليها مقبولة.

### 4) بديل: مجموعة checkboxes
أوضح للمستخدم.

```html
<fieldset><legend>المهارات</legend>
  <label><input type="checkbox" name="s" value="html"> HTML</label>
  <label><input type="checkbox" name="s" value="css"> CSS</label>
  <label><input type="checkbox" name="s" value="js"> JS</label>
</fieldset>
```

- مفيش حاجة اسمها Ctrl: كل واحد بيضغط على اللي عايزه.
- أوضح على الموبايل.
- مناسب لعدد خيارات قليل.

## mistakes

### نسيان name للقيم المتعددة
```html bad
<select multiple><option>أ</option><option>ب</option></select>
```
```html good
<select name="skills" multiple><option>أ</option><option>ب</option></select>
```
ليه؟ من غير name مفيش حاجة تتبعت للسيرفر.

### select multiple من غير size
```html bad
<select multiple>…</select>
```
```html good
<select multiple size="5">…</select>
```
ليه؟ من غير size المتصفح بيحدد ارتفاع افتراضي صغير.

## a11y

- اشرح إزاي يختار أكتر من واحد (Ctrl).
- checkboxes أسهل للمستخدمين والتقنيات المساعدة.
- اعرض عدد الملفات/الاختيارات المختارة.

## quiz

### نوع الخاصية؟
- [x] boolean
- [ ] نص
- [ ] رقم
- [ ] قايمة
وجودها كافي.

### الفاصل في email multiple؟
- [x] فاصلة
- [ ] مسافة
- [ ] سطر جديد
- [ ] شرطة
a@x.com, b@y.com.

### قراءة الملفات المختارة؟
- [x] `input.files`
- [ ] `input.value`
- [ ] `input.items`
- [ ] `input.list`
قايمة كائنات File.

## refs

- [MDN: multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/multiple)
- [MDN: select multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select#multiple)
