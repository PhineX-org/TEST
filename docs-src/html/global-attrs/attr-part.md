---
id: attr-part
kind: attribute
cat: global-attrs
chip: part
title: خاصية الجزء
en: HTML part global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/part
summary: خاصية part بتعلّم عنصر داخل Shadow DOM كجزء قابل للتنسيق من برّه بالـ pseudo-element ::part. بتسمح لمستخدم المكوّن يعدّل شكل أجزاء معينة منه.
keywords: part, ::part, shadow dom, web components, تنسيق من الخارج, exportparts, شكل مكوّن, theming
related: attr-exportparts, attr-slot, template, slot, attr-class
---

## intro

الـ Shadow DOM بيعزل تنسيق المكوّن: CSS الصفحة مبيوصلش للأجزاء الداخلية. وده كويس، لكن أحياناً **مصمّم المكوّن عايز يسمح** لمستخدمه يغيّر أجزاء معينة (لون الزرار مثلاً). هنا بتحط `part="اسم"` على العنصر الداخلي، والمستخدم من برّه ينسّقه بـ **`::part(اسم)`**. يعني انت بتعلن «الجزء ده متاح للتنسيق»، وبقية المكوّن يفضل محمي. ومن غير `part` أي تنسيق من برّه مش هيأثر خالص، فإنت اللي بتتحكم في اللي ينفع يتغيّر واللي ما ينفعش.

## try

```html
<style> my-btn::part(label) { color: #fff; background: #7c3aed; border-radius: 99px; padding: 6px 16px; } </style>
<my-btn></my-btn>
<script>
  customElements.define('my-btn', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<span part="label" style="background:#ddd;padding:6px">زرار</span>'; }
  });
</script>
```

## syntax

```html nolive
<!-- جوه الـ Shadow DOM -->
<span part="label">...</span>

/* من برّه */
my-component::part(label) { color: red; }
```

- `part="اسم"` — **يكشف** العنصر للتنسيق.
- `::part(اسم)` — **يستهدفه** من CSS الصفحة.

## use

- تصميم مكوّنات قابلة للتخصيص (ثيمات).
- السماح بتعديل أجزاء محددة فقط.

## avoid

- متكشفش كل شيء: كل `part` جزء من واجهة المكوّن العامة.

## examples

### 1) أكتر من part
أسماء بمسافة.

```html
<style> my-chip::part(box) { border: 2px solid #22c55e } my-chip::part(text) { font-weight: bold } </style>
<my-chip></my-chip>
<script>
  customElements.define('my-chip', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<span part="box" style="padding:4px 10px;border-radius:6px;display:inline-block"><span part="text">وسم</span></span>'; }
  });
</script>
```

- كل جزء ليه اسمه الخاص.
- ينفع عنصر واحد ياخد أكتر من اسم: `part="a b"`.
- التنسيق من برّه بيكسب على الداخلي غالباً.

### 2) مع حالة hover
::part مع pseudo-class.

```html
<style> x-b::part(btn):hover { background:#fde68a } </style>
<x-b></x-b>
<script>customElements.define('x-b', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<button part="btn">مرر عليّ</button>'; } });</script>
```

- ينفع تضيف `:hover` و`:focus` بعد `::part()`.
- لكن مش ينفع تنزل لأبناء الجزء (`::part(a) b` مش مسموح).
- اجعل الأجزاء صغيرة ومباشرة.

### 3) قراءة part بجافاسكربت
مثال على el.part.

```html
<div id="e" part="a b">x</div>
<p id="o"></p>
<script>document.getElementById('o').textContent = [...document.getElementById('e').part].join(' + ');</script>
```

- `el.part` قايمة (DOMTokenList) بأسماء الأجزاء.
- ينفع `add` و`remove` زي classList.
- بتتحدّث في HTML.

## mistakes

### تنسيق عنصر داخلي بدون part
```html bad
my-btn span { color: red }  /* مش هيشتغل: الـ Shadow DOM معزول */
```
```html good
my-btn::part(label) { color: red }
```
ليه؟ تنسيق الصفحة مبيعدّيش للـ Shadow DOM إلا عبر `::part`.

## a11y

- تغيير الشكل ميبوّظش الإتاحة: حافظ على التباين وحجم الخط.
- متغيّرش ترتيب القراءة بـ CSS بشكل يلخبط.

## quiz

### إزاي بتنسّق عنصر عليه `part="x"` من برّه؟
- [x] `::part(x)`
- [ ] `.x`
- [ ] `#x`
- [ ] `[x]`
pseudo-element خاص.

### الـ `part` بتتحط فين؟
- [x] جوه الـ Shadow DOM
- [ ] على `<html>`
- [ ] في CSS
- [ ] في JS فقط
على العنصر الداخلي.

## refs

- [MDN: part](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/part)
- [MDN: ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
