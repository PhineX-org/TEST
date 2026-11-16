---
id: attr-id
kind: attribute
cat: global-attrs
chip: id
title: خاصية المُعرّف
en: HTML id global attribute
status: stable
support: all
mdn: Global_attributes/id
summary: خاصية id بتدّي العنصر اسم فريد في الصفحة كلها. بتستخدمها للروابط الداخلية، وربط label بالحقل، والوصول بجافاسكربت. لازم تكون مميّزة ومن غير مسافات.
keywords: id, معرّف, فريد, unique, getElementById, #id, رابط داخلي, anchor, fragment, label for
related: attr-class, label, a, attr-for
---

## intro

الـ `id` معناها **هوية** العنصر: اسم **فريد** مفيش عنصر تاني في الصفحة بيشاركه فيه، زي رقم البطاقة. مفيش اتنين في الصفحة ياخدوا نفس الـ `id`. وعشان كده بتستخدمه لما تحتاج تشاور على **عنصر واحد معيّن** بالظبط.

استخداماته الأساسية: **(1)** الروابط الداخلية: `<a href="#contact">` بتنقلك للعنصر اللي `id="contact"`. **(2)** ربط [[label]] بحقل الإدخال. **(3)** الوصول بجافاسكربت: `document.getElementById("x")`. **(4)** الربط في الإتاحة (`aria-labelledby` و`aria-describedby`). وفي CSS بتكتب الـ id بـ **علامة #** (`#contact`) لكن الأفضل في التنسيق تستخدم [[attr-class]] لأن الـ id ليه أولوية عالية بتصعّب التعديل بعدين.

> [!analogy] الـ `id` زي **رقم الموبايل**: واحد بس لكل شخص. والـ `class` زي **الوظيفة**: كذا واحد ممكن يبقوا «مهندسين».

> [!warn] تكرار نفس الـ id في الصفحة **غلط**: المتصفح هيشتغل لكن الروابط وجافاسكربت هيرجّعوا أول عنصر بس.

## try

دوس على الرابط وشوف الصفحة بتنزل للعنصر.

```html
<a href="#target">روح للعنصر اللي تحت</a>
<div style="height:60px"></div>
<p id="target" style="background:#fef3c7; padding:8px">أنا العنصر اللي id بتاعه target</p>
```

## syntax

```html nolive
<element id="اسم-فريد">...</element>

<a href="#اسم-فريد">رابط</a>
<script>
  document.getElementById("اسم-فريد");
</script>
```

- `id="…"` — **الاسم الفريد** من غير مسافات.
- `href="#…"` — **رابط** بيروح للعنصر.
- `getElementById` — **بيلاقي** العنصر بالـ id.

## use

- روابط داخل الصفحة (فهرس، «ارجع لفوق»).
- ربط `<label for>` بالـ input.
- الوصول لعنصر واحد معيّن بجافاسكربت.
- علاقات الإتاحة (`aria-labelledby`).

## avoid

- متكرّرش نفس الـ id في نفس الصفحة.
- متنسّقش بالـ id لو تقدر تستخدم class (الأولوية العالية بتعمل مشاكل).

## section: قواعد قيمة الـ id

- لازم تكون **فريدة** في المستند كله.
- متحتويش على **مسافات** (`my id` غلط).
- الأفضل تبدأ بحرف: `section-1` أحسن من `1-section`.
- حساسة لحالة الأحرف: `Top` غير `top`.

## examples

### 1) رابط داخلي (فهرس)
href بـ #.

```html
<nav><a href="#s1">القسم 1</a> | <a href="#s2">القسم 2</a></nav>
<h3 id="s1">القسم 1</h3><p>محتوى القسم الأول…</p>
<h3 id="s2">القسم 2</h3><p>محتوى القسم التاني…</p>
```

- الرابط `#s2` بيروح للعنصر اللي `id="s2"`.
- مفيش تحميل صفحة جديدة: بس تمرير.
- الـ URL بيتغيّر وبيبقى فيه `#s2` عشان تشاركه.

### 2) ربط label بحقل
for و id.

```html
<label for="nm">الاسم:</label>
<input id="nm" type="text">
```

- `for="nm"` بيشاور على `id="nm"`.
- لما تضغط على الكلمة، الحقل ياخد الفوكس.
- لازم نفس القيمة بالظبط.

### 3) الوصول بجافاسكربت
مثال على getElementById.

```html
<p id="msg">النص القديم</p>
<button onclick="document.getElementById('msg').textContent='اتغيّر!'">غيّر</button>
```

- `getElementById` بترجّع **عنصر واحد** (أو `null`).
- بتنفع لما تعرف الـ id بالظبط.
- لو الـ id مكرر هترجع أول واحد بس.

### 4) تنسيق بالـ id (ومشكلته)
العلامة # في CSS.

```html
<style>
  #hero { background: #dbeafe; padding: 12px; }
  .box  { background: #fecaca; }
</style>
<div id="hero" class="box">أنا فيه id وclass؛ لون الـ id هو اللي كسب</div>
```

- الـ id أقوى من الـ class في الأولوية.
- ده معناه صعوبة تعديل الشكل بعدين.
- استخدم class للتنسيق وخلّي id للمرجعية.

### 5) كشف التكرار
تأكد إن الـ id فريد.

```html
<p id="x">1</p><p id="x">2</p>
<p id="o"></p>
<script>
  const n = document.querySelectorAll('[id="x"]').length;
  document.getElementById('o').textContent = 'عدد العناصر بنفس الـ id: ' + n + (n > 1 ? ' (غلط!)' : '');
</script>
```

- `[id="x"]` بيجمع كل العناصر اللي بنفس الـ id.
- أي رقم أكبر من 1 يعني خطأ.
- أدوات التحقق (validator) بتكشف ده.

## mistakes

### تكرار الـ id
```html bad
<div id="card">1</div>
<div id="card">2</div>
```
```html good
<div class="card">1</div>
<div class="card">2</div>
```
ليه؟ الـ id لازم يبقى فريد. للتكرار استخدم class.

### مسافة جوه id
```html bad
<div id="main box">...</div>
```
```html good
<div id="main-box">...</div>
```
ليه؟ المسافة غير مسموحة في الـ id؛ استخدم شرطة.

## a11y

- `label for` + `id` من أهم ما يخلّي الحقول قابلة للقراءة من قارئ الشاشة.
- الـ id بيربط `aria-labelledby` و`aria-describedby` بنصوص الشرح.
- الروابط الداخلية بتساعد مستخدمي الكيبورد على تخطّي أجزاء (زي «تخطّى للمحتوى»).

## quiz

### كام عنصر ينفع ياخدوا نفس الـ id في صفحة؟
- [x] واحد بس
- [ ] اتنين
- [ ] أي عدد
- [ ] عشرة
الـ id فريد.

### إزاي بتكتب id في CSS؟
- [x] `#اسم`
- [ ] `.اسم`
- [ ] `@اسم`
- [ ] `$اسم`
علامة # قبل الاسم.

### إيه اللي بيربط `label` بالـ input؟
- [x] `for` = قيمة `id`
- [ ] `name`
- [ ] `class`
- [ ] `href`
for بتشاور على id.

## refs

- [MDN: id](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/id)
- [WHATWG: The id attribute](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)
