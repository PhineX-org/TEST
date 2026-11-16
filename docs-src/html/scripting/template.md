---
id: template
kind: element
cat: scripting
tag: template
title: عنصر القالب
en: HTML template element
status: stable
display: none
void: no
support: all
summary: بيخزّن قطعة HTML جاهزة مش بتظهر ولا بتتنفّذ لحد ما تنسخها بالجافاسكربت. بتستخدمه لتكرار عناصر مثل الكروت والصفوف، وللـ Shadow DOM التصريحي بـ shadowrootmode.
keywords: template, قالب, clone, content, cloneNode, importNode, shadowrootmode, declarative shadow dom, web components, تكرار, قائمة, كرت, DocumentFragment
related: slot, script, div, table
---

## intro

كتير بتحتاج **تكرار نفس الشكل** كذا مرة: كرت منتج لكل منتج، صف في جدول لكل مستخدم، عنصر رسالة لكل رسالة. الطريقة الغلط إنك تكتب HTML كنص طويل جوه جافاسكربت (`'<div class="card">' + ...`): مرهقة ومعرّضة للأخطاء والثغرات. العنصر `<template>` (**قالب**) بيحل ده: بتكتب الـ HTML **مرة واحدة** جواه، وبتستنسخه بالجافاسكربت كل ما تحتاج.

المحتوى اللي جوه `<template>` **حي لكن خامل (Inert)**: المتصفح بيحلّله لعناصر حقيقية، لكن **مبيعرضوش**، ومبيحمّلش صوره، ومبينفّذش سكريبتاته، ومش بيظهر في `document.querySelector` العادي. هو مخزّن في `template.content` وهي **`DocumentFragment`**. لما تعمل `template.content.cloneNode(true)` بتاخد **نسخة** وبعدها تعدّلها وتحطها في الصفحة بـ `appendChild`، وساعتها تتفعّل وتظهر.

وفيه استخدام تاني متقدّم: **الـ Shadow DOM التصريحي** (Declarative Shadow DOM): لو حطيت `shadowrootmode="open"` على `<template>` جوه عنصر، المتصفح بيحوّله **Shadow Root** حقيقي لحظة التحليل، من غير جافاسكربت. وده أساس الـ **Web Components** (مع [[slot]]).

وميزة خاصة: `<template>` بيقدر يتحط في أماكن ممنوعة لعناصر تانية، زي جوه `<table>` أو `<select>` أو `<head>`، بدون ما المتصفح «يصلّح» HTML بتاعك.

> [!analogy] `<template>` زي **قالب كعك**: القالب نفسه مبيتاكلش (مش بيتعرض)، لكن كل ما تضغط بيه على العجينة بتطلع قطعة جديدة. القطعة الجاهزة هي النسخة اللي بتحطها في الصفحة.

> [!key] اكتب الشكل مرة في `<template>`، واستنسخه بـ `content.cloneNode(true)`. اللي جواه مخفي وخامل.

## try

اضغط الزرار عشان يضيف كرت جديد من القالب.

```html
<template id="card">
  <div style="border:1px solid #ccc; border-radius:8px; padding:8px; margin:6px 0">
    <strong class="t"></strong>
    <div class="d" style="color:#555"></div>
  </div>
</template>

<button id="add">أضف كرت</button>
<div id="box"></div>

<script>
  let i = 0;
  document.getElementById('add').onclick = () => {
    const node = document.getElementById('card').content.cloneNode(true);
    node.querySelector('.t').textContent = 'كرت رقم ' + (++i);
    node.querySelector('.d').textContent = 'اتعمل من القالب';
    document.getElementById('box').appendChild(node);
  };
</script>
```

## syntax

```html nolive
<template id="item">
  <li class="item"></li>
</template>

<script>
  const t = document.getElementById('item');
  const clone = t.content.cloneNode(true);
  document.querySelector('ul').appendChild(clone);
</script>
```

- `<template>` — **الحاوية** (مخفية وخاملة).
- المحتوى — **أي HTML** (بما فيه `<tr>` و`<td>`).
- `template.content` — **الـ DocumentFragment** اللي فيه المحتوى.
- `cloneNode(true)` — **نسخة عميقة** تتحط في الصفحة.
- `</template>` — **الوسم الختامي** إجباري.

## use

- لتكرار عناصر (كروت، صفوف، عناصر قائمة).
- لعرض بيانات جاية من API.
- لبناء Web Components.
- للـ Shadow DOM التصريحي (SSR).
- لتحضير محتوى حواري (مودال، توست) في الصفحة بدون إظهاره.

## avoid

- متستخدمهوش لمحتوى لازم يظهر فوراً أو يتفهرس: دايماً مخفي.
- متعدّلش `template.content` مباشرة بعد النسخ: اعمل نسخة الأول.
- متكتبش HTML كنص في جافاسكربت لو ينفع تعمل قالب.

## attributes

### shadowrootmode
**بيحوّل القالب لـ Shadow Root تصريحي** على العنصر الأب. القيم: `open` أو `closed`. من غير جافاسكربت.

```html nolive
<div><template shadowrootmode="open"><p>أنا داخل Shadow DOM</p></template></div>
```

### shadowrootdelegatesfocus {boolean}
**بيفوّض الفوكس** لأول عنصر قابل للتركيز جوه الـ Shadow Root.

### shadowrootclonable {boolean}
**بيخلّي الـ Shadow Root يتنسخ** مع العنصر لما تعمل `cloneNode`.

### shadowrootserializable {experimental}
**بيخلّي الـ Shadow Root يتحوّل لنص** عند `getHTML()`. دعمه محدود.

### id
**معرّف** القالب عشان تجيبه بالجافاسكربت.

## examples

### 1) قالب لعنصر قائمة
تكرار `li`.

```html
<ul id="list"></ul>
<template id="li-t"><li></li></template>
<script>
  const t = document.getElementById('li-t');
  ['HTML', 'CSS', 'JavaScript'].forEach(name => {
    const li = t.content.cloneNode(true);
    li.querySelector('li').textContent = name;
    document.getElementById('list').appendChild(li);
  });
</script>
```

- بنقرا `t.content` ونعمل نسخة لكل اسم.
- `querySelector('li')` بيلاقي العنصر جوه النسخة.
- النسخة بتتحط في القائمة بـ `appendChild`.

### 2) صفوف جدول
`tr` من غير مشاكل.

```html
<table border="1" cellpadding="6" style="border-collapse:collapse">
  <thead><tr><th>الاسم</th><th>السن</th></tr></thead>
  <tbody id="body"></tbody>
</table>
<template id="row"><tr><td class="n"></td><td class="a"></td></tr></template>
<script>
  const users = [{n:'أحمد', a:25}, {n:'سارة', a:22}, {n:'محمد', a:30}];
  const t = document.getElementById('row');
  users.forEach(u => {
    const r = t.content.cloneNode(true);
    r.querySelector('.n').textContent = u.n;
    r.querySelector('.a').textContent = u.a;
    document.getElementById('body').appendChild(r);
  });
</script>
```

- `<tr>` مسموح جوه `<template>`، رغم إنه ممنوع تحطه مباشرة في `<div>`.
- ده سبب إن `<template>` بيستخدم كتير مع الجداول.
- كل مستخدم بياخد صف جديد متعبّي من البيانات.

### 3) Shadow DOM تصريحي
`shadowrootmode`.

```html
<style> p { color: red } </style>
<p>فقرة برّه (حمرا)</p>
<div>
  <template shadowrootmode="open">
    <style> p { color: green } </style>
    <p>فقرة جوه Shadow DOM (خضرا)</p>
  </template>
</div>
```

- القالب بيتحوّل لـ Shadow Root على الـ `<div>` فورا.
- الـ CSS جوه الـ Shadow **معزول**: الفقرة الحمرا ما اتأثرتش بخضرا والعكس.
- ده أساس عزل الأنماط في الـ Web Components.
- لو متصفحك قديم ومش بيدعم، القالب مش هيظهر.

### 4) القالب خامل
مبيحمّلش حاجة.

```html
<template id="x">
  <p id="inside">أنا جوه القالب</p>
</template>
<p id="o"></p>
<script>
  const inDoc = document.getElementById('inside');
  const inTpl = document.getElementById('x').content.getElementById('inside');
  document.getElementById('o').textContent =
    'في الصفحة؟ ' + (inDoc ? 'أيوه' : 'لأ') + ' | في القالب؟ ' + (inTpl ? 'أيوه' : 'لأ');
</script>
```

- العنصر جوه القالب مش بيظهر في `document.getElementById` العادي.
- بيتلاقي بس جوه `template.content`.
- ده معنى «خامل»: موجود لكن مش جزء من شجرة الصفحة.

### 5) استخدام importNode
بديل `cloneNode`.

```html
<template id="t"><b class="y"></b></template>
<div id="d"></div>
<script>
  const n = document.importNode(document.getElementById('t').content, true);
  n.querySelector('.y').textContent = 'اتعمل بـ importNode';
  document.getElementById('d').appendChild(n);
</script>
```

- `importNode` بيحوّل المحتوى لمستند الصفحة الحالي ويفعّل العناصر المخصصة.
- `cloneNode(true)` كافي في أغلب الحالات.
- الفرق بيهم لو بتتعامل مع Custom Elements.

## rules

- parents: أي عنصر بيقبل **Metadata** أو **Phrasing** أو **Flow** أو **Script-supporting** (جوه `<head>` و`<body>` و`<table>` و`<select>`).
- children: **أي محتوى** (بيتحط في `content`).
- closing: الوسم الختامي `</template>` إجباري.
- role: مفيش.
- dom: `HTMLTemplateElement`.
- layout: `display: none`.

## mistakes

### البحث عن عنصر جوه قالب بـ document
```html nolive bad
<template id="t"><p id="a">أهلاً</p></template>
<script>
  document.getElementById('a').textContent = 'تغيّر'; // null!
</script>
```
```html nolive good
<template id="t"><p id="a">أهلاً</p></template>
<script>
  const c = document.getElementById('t').content.cloneNode(true);
  c.getElementById('a').textContent = 'تغيّر';
  document.body.appendChild(c);
</script>
```
ليه؟ العناصر اللي جوه القالب مش جزء من الصفحة. لازم تنسخ `content` وبعدين تدوّر فيه.

### نسيان cloneNode
```html nolive bad
document.body.appendChild(template.content); // بينقل المحتوى مرة واحدة بس
```
```html nolive good
document.body.appendChild(template.content.cloneNode(true));
```
ليه؟ `appendChild` على الـ `content` نفسه بينقل محتوى القالب (بيفضّيه). لازم نسخة لكل استخدام.

### نسيان true في cloneNode
```html nolive bad
const c = template.content.cloneNode(); // فاضي تقريباً
```
```html nolive good
const c = template.content.cloneNode(true); // نسخة عميقة كاملة
```
ليه؟ من غير `true` بتنسخ الحاوية بس من غير أولادها.

## a11y

- المحتوى المنسوخ لازم يكون متاح زي أي محتوى عادي (عناوين، `alt`، تسميات).
- لما تضيف عناصر ديناميكياً، فكّر في `aria-live` أو نقل الفوكس لو مهم.
- الـ Shadow DOM التصريحي بيحافظ على الإتاحة طالما الـ HTML سليم.

## tips

- استخدم `textContent` مش `innerHTML` لتعبئة البيانات عشان تتفادى ثغرات XSS.
- ممكن تحط `<template>` في أي مكان، وبيتضبط تلقائياً.
- مع Web Components: `<template>` + `<slot>` + `attachShadow`.
- لو القالب كبير، اتأكد إنك مش بتنسخه آلاف المرات في الحلقة بدون داعي (استخدم Fragment واحد).

## quiz

### فين بيتخزّن محتوى `<template>`؟
- [ ] في `document.body`
- [x] في `template.content` (DocumentFragment)
- [ ] في `innerHTML` بس
- [ ] في `localStorage`
خامل ومعزول عن الصفحة.

### إزاي تستخدم القالب؟
- [ ] تعرضه مباشرة
- [x] تنسخه بـ `cloneNode(true)` وتضيفه للصفحة
- [ ] تغيّر لونه
- [ ] تحذفه
النسخة هي اللي بتتفعّل.

### ليه `<template>` مناسب للجداول؟
- [x] بيقبل `<tr>` و`<td>` من غير ما المتصفح يعدّل الهيكل
- [ ] لأنه أسرع
- [ ] لأنه بيلوّن
- [ ] مش مناسب
الأماكن الممنوعة لعناصر تانية مسموحة له.

### إيه الخاصية اللي بتحوّل القالب لـ Shadow DOM؟
- [ ] `shadow`
- [x] `shadowrootmode`
- [ ] `mode`
- [ ] `attach`
قيمتها `open` أو `closed`.

## refs

- [MDN: template](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template)
- [WHATWG: The template element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)
