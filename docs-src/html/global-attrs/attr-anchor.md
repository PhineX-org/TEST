---
id: attr-anchor
kind: attribute
cat: global-attrs
chip: anchor
title: خاصية الربط بمرساة
en: HTML anchor global attribute (experimental)
status: experimental
support: limited
support_note: تجريبية وغير معيارية؛ الطريقة المعتمدة هي CSS anchor positioning بـ anchor-name وposition-anchor.
size: compact
mdn: Global_attributes/anchor
summary: خاصية anchor تجريبية بتربط عنصر مُموضَع بعنصر مرساة (anchor) بقيمة id، علشان تثبّت tooltip أو قايمة جنب عنصر. البديل المعتمد هو CSS anchor positioning.
keywords: anchor, مرساة, anchor positioning, anchor-name, position-anchor, tooltip, popover, تجريبي, ربط عناصر
related: attr-popover, attr-id, dialog, attr-style, attr-hidden
---

## intro

الـ **CSS Anchor Positioning** ميزة بتخلّيك تثبّت عنصر (tooltip أو قايمة) **جنب عنصر تاني** بالمقارنة، من غير ما تحسب المسافات بجافاسكربت. الطريقة المعتمدة بالـ CSS: عنصر المرساة ياخد `anchor-name: --a`، والعنصر المُموضَع ياخد `position-anchor: --a`. والخاصية `anchor` في HTML كانت **اقتراح تجريبي وغير معياري** يربط الاتنين بـ `id` من غير CSS. دعمها محدود جداً، فاستخدم أسلوب الـ CSS المعتمد ولو عايز لعب HTML بس جرّب الخاصية للتعلّم فقط.

## try

```html h=120
<style>
  .anc { anchor-name: --a; display:inline-block; padding:8px 14px; background:#bae6fd; border-radius:8px }
  .tip { position: fixed; position-anchor: --a; top: anchor(bottom); left: anchor(left); margin-top: 6px; background:#0f172a; color:#fff; padding:6px 10px; border-radius:6px }
</style>
<span class="anc">مرساة</span>
<div class="tip">تلميح متثبّت (CSS)</div>
```

## syntax

```html nolive
<div id="a">المرساة</div>
<div anchor="a">عنصر مثبّت (تجريبي)</div>
```

- `anchor="id"` — **تجريبية**: id المرساة.
- البديل المعتمد: `anchor-name` و`position-anchor` في CSS.

## use

- تعلّم فكرة الربط بين عناصر.
- تجارب على متصفحات تدعمها.

## avoid

- متعتمدش عليها في إنتاج: استخدم CSS anchor positioning.

## examples

### 1) الطريقة المعتمدة بالـ CSS
مثال على anchor-name.

```html
<style>
  #btn { anchor-name: --btn }
  #menu { position: fixed; position-anchor: --btn; top: anchor(bottom); left: anchor(left); background:#fff; border:1px solid #cbd5e1; padding:6px 10px; border-radius:6px }
</style>
<button id="btn">قائمة</button>
<div id="menu">عنصر 1<br>عنصر 2</div>
```

- العنصر المُموضَع بيمشي مع المرساة.
- الدوال `anchor()` بتجيب حدود المرساة.
- مدعومة في متصفحات كروم حديثة.

### 2) خاصية HTML التجريبية
مثال على anchor=id.

```html nolive
<div id="target">المرساة</div>
<div anchor="target" style="position:fixed">أنا مثبّت جنب target</div>
```

- دي الصيغة التجريبية.
- لو الدعم مش موجود مفيش تأثير.
- اعتمد على CSS لو عايز نتيجة مضمونة.

### 3) مع popover
ربط نافذة منبثقة.

```html h=140
<style> #t { anchor-name: --t } #p { position-anchor: --t; top: anchor(bottom); left: anchor(left); margin:0 } </style>
<button id="t" popovertarget="p">افتح</button>
<div id="p" popover>أنا جنب الزرار</div>
```

- مزيج مثالي مع `popover`.
- النافذة بتتثبّت جنب الزرار من غير JS.
- تستخدم في tooltips وقوائم.

## mistakes

### الاعتماد على الخاصية في الإنتاج
```html bad
<div anchor="a">...</div>
```
```html good
/* CSS */ #el { position-anchor: --a; }
```
ليه؟ الخاصية غير معيارية. استعمل CSS anchor positioning.

## a11y

- التموضع البصري لا يغيّر ترتيب القراءة: حافظ على علاقة منطقية بين المرساة والعنصر.
- للتلميحات استخدم `aria-describedby` لربط المعنى.

## quiz

### الطريقة المعتمدة للتثبيت؟
- [x] `anchor-name` و`position-anchor` في CSS
- [ ] `anchor=` في HTML
- [ ] `z-index`
- [ ] `float`
CSS anchor positioning.

### حالة الخاصية `anchor`؟
- [x] تجريبية
- [ ] مستقرة
- [ ] قديمة
- [ ] إجبارية
غير معيارية.

## refs

- [MDN: anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/anchor)
- [MDN: CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
