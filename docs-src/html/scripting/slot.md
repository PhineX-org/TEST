---
id: slot
kind: element
cat: scripting
tag: slot
title: عنصر الفتحة (slot)
en: HTML slot element
status: stable
display: contents
void: no
support: all
summary: بيعمل فتحة جوه Shadow DOM بتتحط فيها العناصر اللي بتكتبها بين وسمي الـ Custom Element. بيدعم الفتحات المسمّاة name ومحتوى افتراضي، وهو أساس Web Components.
keywords: slot, فتحة, shadow dom, web components, custom element, name, slotchange, assignedNodes, ::slotted, قالب, عنصر مخصص
related: template, div, span, script
---

## intro

الـ **Web Components** بتخليك تعمل عناصرك الخاصة، زي `<user-card>` أو `<my-button>`. وجوه العنصر ده، بتحط هيكل ثابت (إطار، عنوان، ستايل) في **Shadow DOM** (عالم معزول). لكن السؤال: ازاي المستخدم يحط **محتواه** جوه الهيكل ده؟ مثلاً `<user-card>أحمد</user-card>` والاسم «أحمد» يظهر في المكان الصح. هنا بييجي عنصر `<slot>` (**فتحة**).

الـ `<slot>` بيتحط جوه **الـ Shadow DOM**، وهو **ثقب** بيقول: «أي حاجة بيكتبها المستخدم جوه العنصر الأصلي هتتعرض هنا». المحتوى اللي بيكتبه المستخدم (اسمه **Light DOM**) بيتعرض **في مكان الفتحة** من غير ما يتنقل فعلياً في الـ DOM. وبكده المكوّن بيبقى مرن: الهيكل من عندك، والمحتوى من عند المستخدم.

وفيه نوعين: **فتحة افتراضية** (من غير `name`) بتاخد كل المحتوى اللي من غير `slot=""`، و**فتحات مسمّاة** (`<slot name="title">`) بتاخد العناصر اللي ليها `slot="title"`. ولو مفيش محتوى متحط، بيظهر **المحتوى الافتراضي (Fallback)** اللي جوه وسم `<slot>` نفسه.

واللي بره الـ Shadow DOM بيتنسّق بـ CSS الصفحة العادي، واللي جوه الـ Shadow بيتنسّق بـ CSS بتاعه. والعناصر المتعبّية في الفتحة ممكن تتنسّق من جوه الـ Shadow بـ `::slotted()`.

> [!analogy] `<slot>` زي **فتحة صندوق البريد**: الصندوق (الـ Shadow DOM) شكله ثابت، والخطابات (المحتوى) بتدخل من الفتحة. ولو الفتحة اسمها «جرايد» مش هتدخل فيها «خطابات».

> [!key] `<slot>` جوه Shadow DOM بس. من غير `name` = افتراضية. بـ `name` = مسمّاة وبتستقبل `slot="الاسم"`. المحتوى جوه `<slot>` = احتياطي.

## try

غيّر الاسم أو احذفه وشوف المحتوى الافتراضي.

```html
<user-card>
  <span slot="name">أحمد الجوهري</span>
  <span slot="role">مطوّر ويب</span>
</user-card>

<script>
  customElements.define('user-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          .box { border:2px solid #39ff14; border-radius:10px; padding:10px 14px; font-family:sans-serif; display:inline-block }
          .name { font-weight:bold; font-size:18px }
          .role { color:#64748b }
        </style>
        <div class="box">
          <div class="name"><slot name="name">اسم مجهول</slot></div>
          <div class="role"><slot name="role">وظيفة غير محددة</slot></div>
        </div>`;
    }
  });
</script>
```

## syntax

```html nolive
<!-- جوه Shadow DOM -->
<slot name="title">عنوان افتراضي</slot>
<slot></slot>

<!-- في الصفحة -->
<my-card>
  <h2 slot="title">العنوان</h2>
  <p>محتوى عادي (للفتحة الافتراضية)</p>
</my-card>
```

- `<slot>` — **الفتحة**، جوه الـ Shadow DOM.
- `name` — **اسم الفتحة** (اختياري).
- المحتوى جواه — **احتياطي** لو مفيش محتوى متحط.
- `slot="..."` — **على العنصر المراد وضعه** (في الـ Light DOM).
- `</slot>` — **الوسم الختامي** إجباري.

## use

- لبناء مكوّنات قابلة لإعادة الاستخدام (كروت، مودال، تبويبات).
- لتركيب محتوى المستخدم داخل هيكل ثابت.
- لمكتبات UI معتمدة على Web Components.

## avoid

- متستخدمهوش برّه Shadow DOM: مش هيعمل حاجة.
- متحطش `<slot>` متكررة بنفس الاسم بدون قصد: بتاخد أول واحد بس.
- متعتمدش على `<slot>` في صفحات بسيطة: `<div>` كفاية.

## attributes

### name
**اسم الفتحة.** العناصر اللي ليها `slot="اسم"` بتتحط هنا. من غير `name` بتبقى الفتحة الافتراضية.

```html nolive
<slot name="footer"></slot>
```

### slot
**ده بيتحط على العنصر الموضوع** (مش على `<slot>` نفسه) لتحديد الفتحة اللي هيروح لها. هي خاصية عامة.

## examples

### 1) فتحة افتراضية
بتاخد أي محتوى.

```html
<fancy-box>أهلاً من جوه الصندوق!</fancy-box>
<script>
  customElements.define('fancy-box', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <div style="border:3px dashed #6366f1; padding:12px; border-radius:10px; font-family:sans-serif">
          <slot></slot>
        </div>`;
    }
  });
</script>
```

- الكلام اللي كتبته بين `<fancy-box>` و`</fancy-box>` اتعرض مكان `<slot>`.
- الإطار المتقطّع من الـ Shadow DOM، والنص من المستخدم.
- ده أبسط استخدام للفتحة.

### 2) فتحات مسمّاة ومحتوى افتراضي
`name`.

```html
<info-card>
  <h3 slot="title">عنوان الكرت</h3>
  <p>ده المحتوى الأساسي.</p>
</info-card>
<info-card>
  <p>كرت من غير عنوان.</p>
</info-card>
<script>
  customElements.define('info-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>.c{border:1px solid #cbd5e1;border-radius:8px;padding:8px;margin:6px 0;font-family:sans-serif}</style>
        <div class="c">
          <header><slot name="title"><em>(بدون عنوان)</em></slot></header>
          <slot></slot>
        </div>`;
    }
  });
</script>
```

- العنصر اللي عليه `slot="title"` راح للفتحة المسمّاة.
- الباقي راح للفتحة الافتراضية.
- الكرت التاني مفيهوش عنوان فبيظهر المحتوى الافتراضي «(بدون عنوان)».

### 3) تنسيق المحتوى بـ ::slotted
من جوه الـ Shadow.

```html
<tag-list>
  <span>HTML</span>
  <span>CSS</span>
  <span>JS</span>
</tag-list>
<script>
  customElements.define('tag-list', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          ::slotted(span) { background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:99px; margin:2px; display:inline-block; font-family:sans-serif }
        </style>
        <slot></slot>`;
    }
  });
</script>
```

- `::slotted(span)` بيستهدف العناصر اللي اتحطت في الفتحة.
- الستايل جاي من الـ Shadow، لكنه بيأثر على عناصر الـ Light DOM.
- القيود: بيستهدف العناصر المباشرة بس (مش أولادها).

### 4) تتبع تغيّر المحتوى
`slotchange`.

```html
<watch-box>
  <span>واحد</span>
</watch-box>
<button onclick="document.querySelector('watch-box').appendChild(Object.assign(document.createElement('span'),{textContent:' واحد تاني'}))">أضف عنصر</button>
<p id="log"></p>
<script>
  customElements.define('watch-box', class extends HTMLElement {
    constructor() {
      super();
      const s = this.attachShadow({ mode: 'open' });
      s.innerHTML = '<slot></slot>';
      s.querySelector('slot').addEventListener('slotchange', e => {
        document.getElementById('log').textContent =
          'عدد العناصر في الفتحة: ' + e.target.assignedNodes().length;
      });
    }
  });
</script>
```

- `slotchange` بيتنفّذ كل ما محتوى الفتحة يتغيّر.
- `assignedNodes()` بترجّع العناصر الموضوعة في الفتحة.
- مفيد لما المكوّن محتاج يتفاعل مع محتوى المستخدم (عدّ، تحقق، إلخ).

### 5) مكوّن بثلاث فتحات
هيدر ومحتوى وفوتر.

```html
<app-panel>
  <b slot="header">إعدادات الحساب</b>
  <p>هنا محتوى اللوحة الأساسي.</p>
  <button slot="footer">حفظ</button>
</app-panel>
<script>
  customElements.define('app-panel', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          .p { border:1px solid #94a3b8; border-radius:10px; overflow:hidden; font-family:sans-serif; max-width:280px }
          .h { background:#0f172a; color:#fff; padding:8px 12px }
          .b { padding:10px 12px }
          .f { background:#f1f5f9; padding:8px 12px; text-align:left }
        </style>
        <div class="p">
          <div class="h"><slot name="header">بدون عنوان</slot></div>
          <div class="b"><slot></slot></div>
          <div class="f"><slot name="footer"></slot></div>
        </div>`;
    }
  });
</script>
```

- المكوّن بيحدد الشكل (هيدر غامق، محتوى، فوتر رمادي) والمستخدم يحط المحتوى.
- كل عنصر راح لفتحته: `slot="header"` للهيدر و`slot="footer"` للزرار، والفقرة للافتراضية.
- ده نفس الأسلوب اللي بتبني بيه مكتبات الـ UI (كروت ومودال وتبويبات).
- الستايل جوه الـ Shadow معزول فمش بيأثر على باقي الصفحة.

## rules

- parents: جوه **Shadow DOM** (أي عنصر بيقبل Phrasing).
- children: **محتوى احتياطي** (أي HTML).
- closing: الوسم الختامي `</slot>` إجباري.
- role: مفيش.
- dom: `HTMLSlotElement`.
- layout: `display: contents` (مش بيعمل صندوق).

## mistakes

### slot برّه Shadow DOM
```html bad
<div><slot name="x">مش هيشتغل</slot></div>
```
```html good
<script>
  this.attachShadow({mode:'open'}).innerHTML = '<slot name="x">شغّال</slot>';
</script>
```
ليه؟ `<slot>` من غير Shadow DOM مجرد عنصر عادي من غير وظيفة.

### slot على العنصر الغلط
```html bad
<my-card><slot name="title">عنوان</slot></my-card>
```
```html good
<my-card><h2 slot="title">عنوان</h2></my-card>
```
ليه؟ جوه الصفحة بنحط `slot="الاسم"` كخاصية على العنصر. الـ `<slot>` نفسه جوه الـ Shadow بس.

### اسم فتحة غلط
```html bad
<my-card><h2 slot="titel">عنوان</h2></my-card>
```
```html good
<my-card><h2 slot="title">عنوان</h2></my-card>
```
ليه؟ لو الاسم ما طابقش `name` الفتحة، العنصر **مش بيتعرض خالص**. راجع الإملاء.

## a11y

- الـ `<slot>` بيحافظ على شجرة الإتاحة بتاعة المحتوى: قارئ الشاشة بيقراه في مكانه.
- لو مكوّنك بيعمل عناصر تفاعلية، اتأكد من الـ `role` والـ `tabindex` والفوكس.
- الـ `delegatesFocus` بيساعد في إدارة الفوكس جوه Shadow DOM.

## tips

- حط محتوى افتراضي مفيد في كل `<slot>`.
- استخدم `::slotted()` بحذر: بيأثر على العناصر المباشرة بس.
- جرّب في DevTools: بتشوف `#shadow-root` وبتلاقي `<slot>` والعناصر المخصصة.
- لو مش مرتاح للـ JS، شوف مكتبات زي Lit بتبسّط الكتابة.

## quiz

### فين بيتحط `<slot>`؟
- [ ] في `<head>`
- [x] جوه Shadow DOM لعنصر مخصص
- [ ] في أي مكان
- [ ] في CSS
بدون Shadow DOM مالوش وظيفة.

### إزاي تحط عنصر في فتحة مسمّاة؟
- [ ] `name="x"` على العنصر
- [x] `slot="x"` على العنصر
- [ ] `id="x"`
- [ ] `class="x"`
والفتحة نفسها `name="x"`.

### إيه اللي بيظهر لو مفيش محتوى للفتحة؟
- [x] المحتوى الافتراضي اللي جوه `<slot>`
- [ ] خطأ
- [ ] صفحة فاضية
- [ ] مفيش حاجة
اللي جواه هو الاحتياطي.

### إيه الـ selector اللي بينسّق محتوى الفتحة؟
- [ ] `:slot`
- [x] `::slotted()`
- [ ] `:host`
- [ ] `::shadow`
بيشتغل من جوه الـ Shadow DOM.

## refs

- [MDN: slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)
- [WHATWG: The slot element](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)
