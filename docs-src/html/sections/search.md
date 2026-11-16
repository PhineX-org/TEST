---
id: search
kind: element
cat: sections
tag: search
title: عنصر البحث (search)
en: HTML search element
status: stable
display: block
void: no
support: all
support_note: ظهر في المتصفحات الحديثة في أواخر 2023 (Chrome و Edge و Firefox 118 و Safari 17)، فالمتصفحات القديمة جداً مش بتفهمه.
summary: عنصر search بيلفّ واجهة البحث أو الفلترة (حقل البحث وزرار وفلاتر) وبيتحول لمنطقة search بتساعد قارئ الشاشة ينط عليها، وهو بديل أنضف لـ role="search".
keywords: search, بحث, فلترة, حقل بحث, landmark, role search, form, filter, ابحث, search form
related: form, input, button, label, nav, header, main, datalist
---

## intro

كل موقع تقريباً فيه حتة للبحث: حقل بنكتب فيه وزرار «بحث». المنطقة دي ليها معنى خاص لقارئ الشاشة: لو عارف إنها منطقة بحث، يقدر ينط لها بضغطة من غير ما يمشي على المنيو والصفحة كلها. زمان كنا بنحقق ده بإننا نكتب `role="search"` على `<form>` أو `<div>`. دلوقتي فيه عنصر مخصوص اسمه `<search>`، وهو بيعمل نفس الشغل بشكل أنضف.

الـ `<search>` **حاوية** بس: ما بيرسمش حاجة ولا بيرسل بيانات. هو بيقول «اللي جوايا ده واجهة بحث أو فلترة». وجواه بنحط عادةً `<form>` فيه `<input type="search">` و`<button>`. وممكن يبقى فيه واجهة بحث بالجافاسكربت من غير `<form>` أصلاً (بحث لحظي بيفلتر قايمة وانت بتكتب)، والـ `<search>` بيناسب الحالة دي كمان.

خد بالك من نقطتين. **الأولى:** الـ `<search>` للـ **واجهة** (الحقل والفلاتر) مش لـ **النتايج**. نتايج البحث بتتحط برّاه في `<main>` أو في حتة منفصلة. **التانية:** لو حطيت `<form>` جوه `<search>` متحطش على الـ form `role="search"` تاني، لأن العنصر الأب بيعمله بالفعل، والتكرار بيعمل Landmark مزدوج.

وهو **حديث نسبياً** (اتدعم في المتصفحات الأساسية في أواخر 2023)، فلو بتدعم متصفحات قديمة جداً ممكن تستخدم الطريقة القديمة: `<form role="search">`.

> [!analogy] تخيّل مكتب الاستعلامات في مول: لافتة كبيرة مكتوب عليها «استعلامات». اللافتة مش بتجاوب بنفسها، لكنها بتقولك «هنا تسأل». ده الـ `<search>`: لافتة منطقة البحث، والحقل والزرار اللي جواه هما اللي بيعملوا الشغل.

> [!key] `<search>` = **منطقة** البحث أو الفلترة (Landmark). الفورم والحقل جواه، والنتايج برّاه.

## try

ده بحث بسيط. جرّب اكتب كلمة واضغط Enter (الفورم هيحاول يبعت لنفس الصفحة في المعاينة، فبنمنعه بجافاسكربت).

```html
<style>
  search { display: block; padding: 10px; background: #f1f5f9; border-radius: 10px; }
  input[type=search] { padding: 8px; width: 60%; }
  button { padding: 8px 14px; }
</style>
<search>
  <form onsubmit="event.preventDefault(); out.textContent = 'بتدوّر على: ' + q.value">
    <label for="q">ابحث في الكورسات</label><br>
    <input type="search" id="q" name="q" placeholder="مثلاً: HTML">
    <button>بحث</button>
  </form>
</search>
<p id="out"></p>
```

## syntax

```html nolive
<search>
  <form action="/search" method="get">
    <label for="q">ابحث</label>
    <input type="search" id="q" name="q">
    <button>بحث</button>
  </form>
</search>
```

- `<search>` — **الوسم الافتتاحي**، بيعلن منطقة البحث.
- `<form>` — الفورم اللي بيبعت كلمة البحث (اختياري لو البحث بالجافاسكربت).
- `<label>` و `<input type="search">` — حقل البحث ووصفه.
- `<button>` — زرار البحث.
- `</search>` — **الوسم الختامي** إجباري.

## use

- لمنطقة البحث في الموقع (جوه الهيدر أو بجانب المنيو).
- لفلاتر قايمة المنتجات (سعر، تصنيف، ترتيب).
- لبحث لحظي (Live search) من غير `<form>`.
- لأي واجهة بتفلتر أو بتدوّر في محتوى.

## avoid

- متحطش نتايج البحث جواه: النتايج برّاه.
- متحطش `role="search"` على `<form>` جواه (تكرار).
- متستخدمهوش لحقل إدخال عادي مش للبحث (مثلاً تسجيل دخول).
- متحطش أكتر من واحد من غير `aria-label` يفرّق بينهم.
- متفترضش إنه شغال في متصفحات قديمة جداً من غير حل بديل.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]) و**ARIA**.

### aria-label
لو عندك أكتر من منطقة بحث في الصفحة (مثلاً بحث الموقع وبحث جوه جدول)، اديهم أسماء مختلفة.

```html nolive
<search aria-label="بحث في الموقع">…</search>
<search aria-label="فلترة المنتجات">…</search>
```

### id
اسم فريد، بنستخدمه كهدف لرابط تخطّي أو للجافاسكربت.

## examples

### 1) أبسط search
حقل وزرار جوه `<search>`.

```html
<search>
  <form action="#">
    <input type="search" name="q" aria-label="بحث">
    <button>بحث</button>
  </form>
</search>
```

- `aria-label` على الحقل لأن مفيش `<label>` ظاهر.
- الـ `<search>` لوحده ما بيعملش حاجة مرئية: الشكل من الحقل والزرار.
- لما الفورم يتبعت، الكلمة بتتحط في الرابط كـ `?q=…`.

### 2) بحث بـ label ظاهر
الأفضل دايماً يبقى فيه `<label>` ظاهر.

```html
<search>
  <form action="#">
    <label for="s1">ابحث في الكورسات:</label>
    <input type="search" id="s1" name="q">
    <button>بحث</button>
  </form>
</search>
```

- الـ `<label>` بيتربط بالحقل بـ `for` و `id`، فضغطة على الكلمة بتفتح الحقل.
- قارئ الشاشة بيقرا «ابحث في الكورسات: حقل بحث».

### 3) بحث لحظي بالجافاسكربت
من غير `<form>`: بنفلتر قايمة وإنت بتكتب.

```html
<search>
  <label for="f">فلتر:</label>
  <input type="search" id="f" placeholder="اكتب جزء من اسم">
</search>
<ul id="list">
  <li>HTML</li><li>CSS</li><li>JavaScript</li><li>Python</li><li>React</li>
</ul>
<script>
  f.addEventListener('input', () => {
    const t = f.value.toLowerCase();
    document.querySelectorAll('#list li').forEach(li => {
      li.hidden = !li.textContent.toLowerCase().includes(t);
    });
  });
</script>
```

- الـ `<search>` بيلفّ الواجهة (الحقل)، والقايمة (النتايج) برّاه.
- كل ضغطة حرف بتخفي العناصر اللي مش متطابقة بـ `hidden`.
- ده مثال على إن `<search>` مش لازم يحتوي `<form>`.

### 4) فلاتر منتجات
`<search>` بيلفّ مجموعة فلاتر.

```html
<search aria-label="فلترة المنتجات">
  <form>
    <label>التصنيف
      <select name="cat">
        <option>الكل</option><option>كورسات</option><option>قوالب</option>
      </select>
    </label>
    <label>
      <input type="checkbox" name="free"> مجاني فقط
    </label>
    <button>طبّق</button>
  </form>
</search>
```

- البحث هنا فلترة مش كلمة، لكن الواجهة كلها بتستحق Landmark.
- `aria-label` بيدّي المنطقة اسم مميز لو في بحث تاني في الصفحة.

### 5) بحث في الهيدر
المكان الأشهر.

```html
<style>
  header { display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #fff; padding: 8px 12px; }
  search input { padding: 6px; }
</style>
<header>
  <strong>موقعي</strong>
  <search>
    <form action="#">
      <input type="search" name="q" aria-label="ابحث في الموقع" placeholder="ابحث…">
    </form>
  </search>
</header>
```

- الـ `<search>` جنب الشعار في الهيدر.
- مفيش زرار: ضغطة Enter بتبعت الفورم.
- لازم `aria-label` لأن مفيش `<label>` ظاهر.

### 6) الطريقة القديمة (Fallback)
للمتصفحات اللي ما بتفهمش `<search>`.

```html
<form role="search" action="#">
  <input type="search" name="q" aria-label="بحث">
  <button>بحث</button>
</form>
```

- `role="search"` على الـ form بيدّي نفس الـ Landmark.
- مش لازم تعمل الاتنين: اختار واحد.

## rules

- parents: أي عنصر بيقبل **Flow content** (زي `<header>` و `<body>` و `<main>` و `<aside>`).
- children: **Flow content**.
- closing: الوسم الختامي `</search>` إجباري.
- role: `search`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### نتايج البحث جوه search
```html bad
<search>
  <input type="search" name="q">
  <ul><li>نتيجة 1</li><li>نتيجة 2</li></ul>
</search>
```
```html good
<search>
  <input type="search" name="q">
</search>
<ul><li>نتيجة 1</li><li>نتيجة 2</li></ul>
```
ليه؟ الـ `<search>` للواجهة، والنتايج مكانها تاني.

### role="search" على form جواه
```html bad
<search>
  <form role="search">…</form>
</search>
```
```html good
<search>
  <form>…</form>
</search>
```
ليه؟ الـ `<search>` بيدّي الدور بالفعل، فالتكرار بيعمل Landmark مزدوج.

### search من غير تسمية لحقله
```html bad
<search>
  <input type="search">
</search>
```
```html good
<search>
  <label for="q">بحث</label>
  <input type="search" id="q">
</search>
```
ليه؟ الحقل من غير اسم مش مفهوم لقارئ الشاشة.

## a11y

- الـ `<search>` Landmark بدور `search`، فقارئ الشاشة بينط له بسرعة.
- كل حقل بحث لازم يبقى له `<label>` أو `aria-label`.
- لو أكتر من `<search>` في الصفحة، `aria-label` مختلف لكل واحد.
- لو بتخفي زرار البحث، خلّي Enter يشتغل.
- أعلن للمستخدم عن النتايج (مثلاً بـ `aria-live` أو عنوان) لو بتتحدّث لحظياً.

## tips

- لو بتدعم متصفحات قديمة جداً، استخدم `<form role="search">` لوحده.
- `<input type="search">` في بعض المتصفحات بيعرض زرار مسح (×) تلقائي.
- خلّي حقل البحث في مكان ثابت ومتوقع (أعلى الصفحة).
- جرّب `autocomplete="off"` لو عندك اقتراحات خاصة بيك.

## quiz

### أنهي الدور (role) اللي بيدّيه `<search>`؟
- [ ] `form`
- [x] `search`
- [ ] `navigation`
- [ ] `main`
الـ `<search>` بياخد دور `search` فيبقى Landmark.

### فين نتايج البحث بالنسبة لـ `<search>`؟
- [ ] جواه
- [x] برّاه
- [ ] في الـ head
- [ ] مفيش نتايج
الـ `<search>` للواجهة، والنتايج بتتحط برّاه.

### لو الفورم جوه `<search>`، تحط `role="search"` عليه؟
- [ ] أيوه دايماً
- [x] لأ، العنصر الأب بيعمل ده
- [ ] بس في الموبايل
- [ ] لازم
الـ `<search>` بيدّي الدور، فمتكرّرهوش.

## refs

- [MDN: search](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search)
- [WHATWG: The search element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element)
