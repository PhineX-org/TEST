---
id: attr-hidden
kind: attribute
cat: global-attrs
chip: hidden
title: خاصية الإخفاء
en: HTML hidden global attribute
status: stable
support: all
mdn: Global_attributes/hidden
summary: خاصية hidden بتخفي العنصر من الصفحة وقارئ الشاشة معاً. بتتكتب من غير قيمة، ولها قيمة خاصة until-found بتخلي البحث في الصفحة يفتح المحتوى المخفي.
keywords: hidden, إخفاء, display none, until-found, boolean, element.hidden, beforematch, إظهار, تبديل
related: attr-style, attr-inert, details, dialog, attr-class
---

## intro

الـ `hidden` بتقول للمتصفح: «**العنصر ده مش مناسب يتعرض دلوقتي**»، فبيخفيه من الصفحة. وهي **خاصية منطقية (Boolean)**: وجودها بس هو اللي بيفرق، مش قيمتها. يعني `<p hidden>` و`<p hidden="">` و`<p hidden="false">` **كلهم مخفيين**؛ عشان تظهره لازم **تشيل الخاصية بالكامل**.

وراها ورقة تنسيق المتصفح اللي بتحط `display: none` على أي عنصر عليه `hidden`. وده معناه إن العنصر بيتشال من **الصفحة ومن شجرة الإتاحة** كمان (قارئ الشاشة مش هيقراه). وفي جافاسكربت بتتحكم فيها بـ `element.hidden = true/false`، وده أبسط طريقة لإخفاء وإظهار حاجة. فيه قيمة خاصة: **`hidden="until-found"`** بتخلي العنصر مخفي لكن لو المستخدم بحث عن نص جواه بـ «بحث في الصفحة» (Ctrl+F) المتصفح **يفتحه** تلقائي.

> [!warn] لو كتبت في CSS `display: flex` أو `grid` على نفس العنصر، هيكسب على `hidden` والعنصر هيظهر! استخدم `[hidden] { display: none !important; }` لو واجهتك المشكلة دي.

## try

دوس على الزرار.

```html
<p hidden>أنا مخفي</p>
<p>أنا ظاهر.</p>
<button onclick="document.querySelector('[data-t]').hidden = !document.querySelector('[data-t]').hidden">أظهر / أخفي</button>
<p data-t hidden style="background:#dcfce7; padding:8px">كنت مخفي وظهرت!</p>
```

## syntax

```html nolive
<element hidden>...</element>
<element hidden="until-found">...</element>
```

- `hidden` — **بيخفي** العنصر (خاصية منطقية).
- `hidden="until-found"` — **مخفي** لكن البحث في الصفحة بيفتحه.
- لإظهاره: **شيل** الخاصية، مش `hidden="false"`.

## use

- إخفاء أقسام لسه مش جاهزة (تبويبات، رسائل خطأ).
- محتوى بيظهر بعد فعل المستخدم بجافاسكربت.
- أقسام قابلة للطي بالبحث (`until-found`).
- إخفاء من الإتاحة محتوى ملوش فايدة أو متكرر.

## avoid

- متكتبش `hidden="false"` فاكر إنها هتظهره: هو لسه مخفي.
- متستخدمش `hidden` لحاجة عايزها قارئ الشاشة يقراها: استخدم class إخفاء بصري.

## section: القيم

- من غير قيمة (أو أي قيمة): **مخفي بالكامل**.
- `until-found`: مخفي، لكن يظهر لما تلاقيه بحث الصفحة أو رابط `#fragment` يشاور عليه.

## examples

### 1) إخفاء عنصر
الأساسي.

```html
<p>السطر الأول</p>
<p hidden>السطر التاني (مخفي)</p>
<p>السطر التالت</p>
```

- السطر التاني مش بيظهر ومش بياخد مكان.
- مفيش قيمة مطلوبة.
- قارئ الشاشة كمان مش هيقراه.

### 2) تبديل الظهور بجافاسكربت
مثال على element.hidden.

```html
<button id="b">إظهار الحل</button>
<p id="ans" hidden style="background:#fef3c7; padding:8px">الحل: 42</p>
<script>
  const ans = document.getElementById('ans'), b = document.getElementById('b');
  b.onclick = () => { ans.hidden = !ans.hidden; b.textContent = ans.hidden ? 'إظهار الحل' : 'إخفاء الحل'; };
</script>
```

- `ans.hidden = false` بيشيل الخاصية.
- ده أبسط من التلاعب بـ `style.display`.
- بنغيّر نص الزرار عشان يوضح الحالة.

### 3) until-found مع البحث
يظهر بالبحث.

```html
<div hidden="until-found" style="background:#dbeafe; padding:8px">
  سر مخفي: كلمة الباسورد هي «نجمة».
</div>
<p>جرّب Ctrl+F وابحث عن كلمة «نجمة» (في كروم).</p>
```

- العنصر مخفي بس المتصفح بيعرف محتواه للبحث.
- لما تلاقي النص بيتفتح العنصر تلقائياً.
- مدعوم في كروم وإيدج حالياً، والباقي بيتعامل معاه كمخفي عادي.

### 4) مشكلة display مع hidden
الفخ الشائع.

```html
<style>
  .row { display: flex; gap: 8px; }
  [hidden] { display: none !important; }
</style>
<div class="row" hidden>أنا flex بس مخفي بفضل الحل</div>
<p>لو شلت قاعدة <code>[hidden]</code> هيظهر الـ div.</p>
```

- قاعدة `.row` بتحط `display: flex` فتتغلّب على ورقة المتصفح.
- قاعدة `[hidden] { display:none !important }` بترجّع السلوك المتوقع.
- كتير من الـ resets (زي Tailwind) فيها القاعدة دي.

### 5) الفرق بين hidden وغيرها
ثلاث طرق للإخفاء.

```html
<style> .box { padding:6px; border:1px dashed #94a3b8; margin:4px 0 } </style>
<div class="box">1) عادي</div>
<div class="box" hidden>2) hidden: مش ظاهر ومش بياخد مكان</div>
<div class="box" style="visibility:hidden">3) visibility:hidden: مش ظاهر بس بياخد مكان</div>
<div class="box" style="opacity:0">4) opacity:0: شفاف وبياخد مكان وممكن يتدوس عليه</div>
```

- `hidden` بيشيل العنصر من التخطيط والإتاحة.
- `visibility: hidden` بيخفيه لكن بيسيب مكانه.
- `opacity: 0` بيخليه شفاف بس لسه موجود وبيتفاعل.

## mistakes

### الاعتقاد إن hidden="false" بتظهر العنصر
```html bad
<p hidden="false">هيفضل مخفي</p>
```
```html good
<p>هيظهر (من غير hidden)</p>
```
ليه؟ الخاصية المنطقية وجودها هو المهم. لإظهار العنصر شيل الخاصية أو اعمل `el.hidden = false`.

### hidden على عنصر بيتنسّق بـ display
```html bad
<style>.card { display:flex }</style>
<div class="card" hidden>لسه ظاهر!</div>
```
```html good
<style>.card { display:flex } [hidden] { display:none !important }</style>
<div class="card" hidden>مخفي فعلاً</div>
```
ليه؟ أي `display` صريح في CSS بيغلب على ورقة المتصفح. زوّد قاعدة `[hidden]`.

## a11y

- `hidden` بيشيل العنصر من شجرة الإتاحة: قارئ الشاشة مش هيقراه.
- لو عايز تخفي حاجة بصرياً بس وتخلّيها مقروءة، استخدم class (visually-hidden) مش `hidden`.
- لما تظهر محتوى بجافاسكربت، فكّر تنقل الفوكس أو تعلن التغيير (`aria-live`).

## quiz

### إزاي تظهر عنصر عليه `hidden`؟
- [x] تشيل الخاصية
- [ ] تكتب `hidden="false"`
- [ ] تكتب `hidden="0"`
- [ ] تكتب `show`
الخاصية المنطقية بتتشال.

### إيه بيعمله `hidden="until-found"`؟
- [x] يخفيه لكن البحث في الصفحة بيفتحه
- [ ] بيحذفه
- [ ] بيخليه شفاف
- [ ] بيمنع الكلك
مناسب للأقسام القابلة للطي.

### ليه ممكن عنصر `hidden` يظهر؟
- [x] لأن CSS فيه display صريح بيغلب
- [ ] لأن الخاصية خربانة
- [ ] لأن المتصفح قديم
- [ ] لازم قيمة
الأولوية لقاعدة المطوّر.

## refs

- [MDN: hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden)
- [WHATWG: The hidden attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute)
