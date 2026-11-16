---
id: attr-class
kind: attribute
cat: global-attrs
chip: class
title: خاصية التصنيف
en: HTML class global attribute
status: stable
support: all
mdn: Global_attributes/class
summary: خاصية class بتدّي العنصر اسم تصنيف أو أكتر عشان تنسّقه بـ CSS أو تلاقيه بجافاسكربت. نفس الكلاس ينفع يتكرر على عناصر كتير، والأسماء بتتفصل بمسافة.
keywords: class, كلاس, تصنيف, classList, CSS selector, .class, نقطة, اسم الكلاس, تنسيق, className
related: attr-id, attr-style, div, span, attr-data
---

## intro

الـ `class` هي أشهر خاصية في HTML كلها. فكرتها بسيطة: بتديك **اسم** (أو كذا اسم) للعنصر، وبعدين تستخدم الاسم ده عشان **تنسّق** كل العناصر اللي ليها نفس الاسم مرة واحدة بـ CSS، أو **تدوّر عليها** وتتحكم فيها بجافاسكربت. يعني بدل ما تكتب لون وحجم وإطار على كل زرار لوحده، بتكتب كلاس `btn` وتنسّقه مرة واحدة، وكل زرار بيبقى ليه نفس الشكل.

أهم حاجتين تفهمهم: **(1)** الكلاس **بيتكرر**: عشرة عناصر ينفع يبقى ليهم نفس الكلاس، عكس [[attr-id]] اللي لازم يبقى مميّز. **(2)** العنصر الواحد ينفع ياخد **أكتر من كلاس** بتفصلهم بـ **مسافة**: `class="btn btn-big active"`، وكل واحد بيدّيه صفة. وفي CSS بتكتب الكلاس بـ **نقطة قبله** (`.btn`)، لكن في HTML من غير نقطة.

> [!analogy] الكلاس زي **الزي الموحّد**: كل اللي لابسين «قميص أزرق» بيتعاملوا بنفس الشكل. والعنصر ممكن يلبس أكتر من قطعة: `btn` و`big` و`active` مع بعض.

> [!key] في HTML: `class="name1 name2"` من غير نقطة. في CSS: `.اسم1` بنقطة. الأسماء بتتفصل بمسافة مش فاصلة.

## try

غيّر اسم كلاس واحد وشوف الشكل بيتغيّر إزاي.

```html
<style>
  .card { border: 2px solid #0ea5e9; border-radius: 10px; padding: 10px; margin: 6px 0; }
  .hot  { background: #fef3c7; }
</style>
<div class="card">كارت عادي</div>
<div class="card hot">كارت مميّز (كلاس card وكمان hot)</div>
```

## syntax

```html nolive
<element class="اسم1 اسم2 اسم3">المحتوى</element>

<style>
  .اسم1 { /* تنسيق */ }
</style>
```

- `class="…"` — **الخاصية** وقيمتها قايمة أسماء.
- الأسماء — **بتتفصل بمسافة** (مفيش فواصل).
- `.اسم1` في CSS — **النقطة** بتعني «كلاس».

## use

- تنسيق مجموعة عناصر بنفس الشكل بـ CSS.
- تلاقي عناصر بجافاسكربت: `querySelectorAll(".اسم")`.
- تبديل حالة العنصر (active، open، hidden) بـ `classList`.
- بناء مكوّنات قابلة للتكرار: كارت، زرار، تنبيه.

## avoid

- متكتبش نقطة قبل الاسم في HTML (`class=".card"`).
- متسمّيش الكلاس بالشكل (`red-text`)؛ سمّيه بالدور (`warning`).
- متحطّش مسافات جوه الاسم الواحد: `my class` هتبقى كلاسين.

## section: قواعد تسمية الكلاس

- الحروف الإنجليزية والأرقام والشرطة `-` والشرطة السفلية `_`.
- الأحسن يبدأ بحرف مش برقم (CSS مش بيحب `.1box` من غير escape).
- الحروف **حساسة لحالة الأحرف**: `Card` غير `card`.
- الأسلوب الشائع: `kebab-case` زي `main-title`، أو BEM زي `card__title--big`.

## examples

### 1) تنسيق مشترك لعناصر كتير
كلاس واحد على كذا عنصر.

```html
<style>
  .tag { background: #e0f2fe; color: #075985; padding: 2px 10px; border-radius: 99px; margin-inline-end: 4px; }
</style>
<span class="tag">HTML</span>
<span class="tag">CSS</span>
<span class="tag">JS</span>
```

- تلات عناصر خدوا نفس الشكل من قاعدة CSS واحدة.
- لو عدّلت `.tag` مرة واحدة كلهم بيتغيّروا.
- ده الفرق بين الكلاس و`style` المكتوب على كل عنصر.

### 2) أكتر من كلاس على العنصر
نفصلهم بمسافة.

```html
<style>
  .btn   { padding: 8px 16px; border: 0; border-radius: 8px; cursor: pointer; }
  .green { background: #22c55e; color: #fff; }
  .big   { font-size: 1.3em; }
</style>
<button class="btn green">عادي</button>
<button class="btn green big">كبير</button>
```

- الزرار التاني ليه 3 كلاسات: `btn` و`green` و`big`.
- كل كلاس بيضيف صفة، والشكل النهائي بيتجمّع.
- ده أساس تفكير Tailwind وBootstrap.

### 3) تبديل كلاس بجافاسكربت
مثال على classList.toggle.

```html
<style>
  .box { padding: 14px; border: 2px dashed #94a3b8; border-radius: 10px; transition: .2s; }
  .box.on { background: #dcfce7; border-color: #22c55e; border-style: solid; }
</style>
<div class="box" id="b">اضغط على الزرار</div>
<button onclick="document.getElementById('b').classList.toggle('on')">تبديل</button>
```

- `classList.toggle("on")` بيضيف الكلاس لو مش موجود وبيشيله لو موجود.
- الحالة بتتحكم فيها بالكلاس، والشكل بيتحكم فيه الـ CSS.
- التوابع التانية: `add` و`remove` و`contains`.

### 4) إيجاد العناصر بالكلاس
مثال على querySelectorAll.

```html
<ul>
  <li class="done">ذاكرت HTML</li>
  <li>ذاكرت CSS</li>
  <li class="done">اتعلّمت الفورمز</li>
</ul>
<p id="o"></p>
<script>
  const n = document.querySelectorAll('.done').length;
  document.getElementById('o').textContent = 'عدد المهام المنجزة: ' + n;
</script>
```

- في الـ selector بنكتب النقطة: `".done"`.
- النتيجة قايمة (NodeList) فيها العناصر كلها.
- `length` بيدّيك العدد.

### 5) أسماء بمعنى (BEM)
تسمية منظمة.

```html
<style>
  .alert { padding: 10px 14px; border-radius: 8px; margin: 6px 0; }
  .alert--ok { background: #dcfce7; }
  .alert--error { background: #fee2e2; }
  .alert__title { font-weight: bold; }
</style>
<div class="alert alert--ok"><span class="alert__title">تمام:</span> الحفظ نجح.</div>
<div class="alert alert--error"><span class="alert__title">خطأ:</span> اكتب الاسم.</div>
```

- `alert` هو الـ block، و`alert__title` جزء جواه، و`alert--error` نسخة معدّلة.
- الأسماء بتوصف **الدور** مش اللون.
- لو غيّرت لون الخطأ لبنفسجي، الاسم يفضل منطقي.

## mistakes

### نقطة جوه HTML
```html bad
<div class=".card">...</div>
```
```html good
<div class="card">...</div>
```
ليه؟ النقطة بتتكتب في CSS بس (`.card`). في HTML الاسم لوحده.

### فواصل بدل مسافات
```html bad
<p class="note,big">نص</p>
```
```html good
<p class="note big">نص</p>
```
ليه؟ الفاصلة بتبقى جزء من الاسم. الكلاسات بتتفصل بمسافة.

## a11y

- اسم الكلاس مش بيوصل لقارئ الشاشة: متعتمدش عليه في توصيل معنى.
- لو بتخفي حاجة بكلاس (visually-hidden)، اتأكد إنها تفضل متاحة لقارئ الشاشة لو مقصودة.
- تغيير الشكل بكلاس لازم يصاحبه تغيير في الحالة (زي `aria-expanded`) لو العنصر تفاعلي.

## tips

- استخدم `classList` بدل ما تكتب `className = ...` علشان متمسحش الكلاسات التانية.
- خلّي الكلاسات قليلة ومعبّرة، واعمل منها مكوّنات.

## quiz

### إزاي بتكتب كلاسين على نفس العنصر؟
- [x] `class="a b"` (بمسافة)
- [ ] `class="a,b"`
- [ ] `class="a.b"`
- [ ] مينفعش
المسافة هي الفاصل.

### إزاي بتنسّق كلاس اسمه `note` في CSS؟
- [x] `.note { }`
- [ ] `#note { }`
- [ ] `note { }`
- [ ] `@note { }`
النقطة قبل الاسم.

### هل نفس الكلاس ينفع يتكرر؟
- [x] أيوه على عناصر كتير
- [ ] لأ مرة واحدة بس
- [ ] بس على الـ div
- [ ] بس في الـ body
ده الفرق مع id.

## refs

- [MDN: class](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/class)
- [WHATWG: The class attribute](https://html.spec.whatwg.org/multipage/dom.html#classes)
