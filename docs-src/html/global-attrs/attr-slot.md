---
id: attr-slot
kind: attribute
cat: global-attrs
chip: slot
title: خاصية الفتحة
en: HTML slot global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/slot
summary: خاصية slot بتحدد اسم الفتحة (slot) اللي هيتحط فيها العنصر جوه Shadow DOM لعنصر مخصّص. بتتطابق مع name في العنصر slot، وبتتعامل مع Web Components.
keywords: slot, فتحة, shadow dom, web components, named slot, custom element, light dom, light dom, تضمين
related: slot, template, attr-part, attr-exportparts, attr-is
---

## intro

لما بتعمل **مكوّن مخصّص (Web Component)** وعايز المستخدم يحط محتوى جواه (زي عنوان وزر في كارت)، بتستخدم عنصر [[slot]] جوه الـ Shadow DOM كـ«فتحة». والخاصية `slot` على العنصر اللي بتحطه **جوه المكوّن** بتقول له: «**روح لفتحة اسمها كذا**». يعني `<h3 slot="title">` بيروح لـ `<slot name="title">`. العناصر اللي من غير `slot` بتروح للفتحة الافتراضية (من غير اسم). وده بيخلّي المكوّن مرن: المستخدم بيكتب HTML عادي، والمكوّن هو اللي بيقرّر يرتّبه فين جواه.

## try

```html
<fancy-card>
  <h3 slot="title">عنوان الكارت</h3>
  <p>محتوى عادي بيروح للفتحة الافتراضية.</p>
</fancy-card>
<script>
  customElements.define('fancy-card', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML =
      '<div style="border:2px solid #0ea5e9;border-radius:10px;padding:10px"><div style="color:#0369a1"><slot name="title"></slot></div><hr><slot></slot></div>'; }
  });
</script>
```

## syntax

```html nolive
<my-component>
  <span slot="اسم">...</span>
</my-component>
```

- `slot="اسم"` — **اسم الفتحة** المستهدفة.
- بتتطابق مع `name` في `<slot name="اسم">`.

## use

- بناء مكوّنات قابلة لإعادة الاستخدام (كارت، تبويبات).
- تحديد أماكن متعددة لمحتوى المستخدم.

## avoid

- متحطّش `slot` على عنصر مش ابن مباشر للمكوّن: مش هيتحط.

## examples

### 1) أكتر من فتحة
عنوان وتذييل.

```html
<info-box>
  <b slot="head">تنبيه</b>
  <span slot="foot">— فريق الدعم</span>
  رسالة في الوسط
</info-box>
<script>
  customElements.define('info-box', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML =
      '<div style="border:1px solid #94a3b8;padding:8px;border-radius:8px"><slot name="head"></slot><hr><slot></slot><hr><slot name="foot"></slot></div>'; }
  });
</script>
```

- كل عنصر راح لفتحته حسب `slot`.
- النص من غير عنصر راح للفتحة الافتراضية.
- ترتيب كتابة الأبناء مش مهم.

### 2) قراءة الفتحة بجافاسكربت
مثال على el.slot.

```html
<span id="s" slot="title">x</span>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'اسم الفتحة: ' + document.getElementById('s').slot;</script>
```

- `el.slot` بترجّع اسم الفتحة.
- ينفع تغيّرها برمجياً.
- العنصر نفسه مش بيتحرك من مكانه في DOM.

### 3) الفتحة الافتراضية
من غير slot.

```html
<wrap-it>أي محتوى بيروح للفتحة الافتراضية</wrap-it>
<script>
  customElements.define('wrap-it', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<div style="border:2px dashed #7c3aed;padding:8px"><slot></slot></div>'; }
  });
</script>
```

- من غير `slot` الأبناء بيروحوا للفتحة اللي من غير اسم.
- لو مفيش فتحة افتراضية، المحتوى مش بيظهر.
- ده الاستخدام الأبسط.

## mistakes

### اسم فتحة لا يطابق
```html bad
<my-card><h3 slot="titel">عنوان</h3></my-card>
```
```html good
<my-card><h3 slot="title">عنوان</h3></my-card>
```
ليه؟ لو الاسم غلط مش بيتحط في أي فتحة. لازم يطابق `name` بالظبط.

## a11y

- المحتوى بيتقري من قارئ الشاشة بترتيبه في الـ DOM الأصلي.
- حافظ على ترتيب منطقي للأبناء.

## quiz

### بتطابق `slot` مع إيه؟
- [x] `name` في عنصر `<slot>`
- [ ] `id`
- [ ] `class`
- [ ] `href`
الاسم نفسه.

### لو مفيش `slot`؟
- [x] بيروح للفتحة الافتراضية
- [ ] بيتحذف
- [ ] خطأ
- [ ] بيتخفي
الفتحة من غير اسم.

## refs

- [MDN: slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/slot)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)
