---
id: attr-exportparts
kind: attribute
cat: global-attrs
chip: exportparts
title: خاصية تصدير الأجزاء
en: HTML exportparts global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/exportparts
summary: خاصية exportparts بتصدّر أجزاء (part) من Shadow DOM متداخل لمستوى أعلى، علشان تقدر تنسّقها بـ ::part من برّه المكوّن الخارجي. بتقبل قايمة أسماء مفصولة بفاصلة.
keywords: exportparts, تصدير, part, ::part, shadow dom, مكوّن متداخل, web components, theming
related: attr-part, attr-slot, template, slot, attr-class
---

## intro

لو عندك مكوّن جواه مكوّن تاني (nested) وفي المكوّن الداخلي عناصر عليها `part`، الصفحة من برّه مش هتقدر تعمل `::part` عليها لأنها «مخفية» جوه مستويين Shadow. الحل: على المكوّن الداخلي (جوه Shadow المكوّن الخارجي) اكتب `exportparts="label"` عشان **يعيد تصدير** الأجزاء لمستوى الخارج. وتقدر تغيّر الاسم: `exportparts="inner-name: outer-name"`. ده مفيد جداً في مكتبات المكوّنات الكبيرة اللي بتركّب مكوّنات صغيرة جوه بعض وعايزة تفضل قابلة للتخصيص.

## try

```html
<style> outer-box::part(txt) { color: crimson; font-weight: bold } </style>
<outer-box></outer-box>
<script>
  customElements.define('inner-box', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<span part="txt">نص جوّه</span>'; } });
  customElements.define('outer-box', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<inner-box exportparts="txt"></inner-box>'; } });
</script>
```

## syntax

```html nolive
<!-- جوه Shadow المكوّن الخارجي -->
<inner-component exportparts="part1, part2: newname"></inner-component>
```

- `exportparts="a, b"` — **يصدّر** الأجزاء بنفس أسمائها.
- `inner: outer` — **يصدّرها** باسم جديد.

## use

- مكوّنات متداخلة محتاجة تخصيص من برّه.
- مكتبات UI بمكوّنات مركّبة.

## avoid

- متصدّرش كل شيء: صدّر اللي المستخدم محتاجه بس.

## examples

### 1) تصدير باسم جديد
مثال على inner: outer.

```html
<style> w-b::part(title) { color:#0369a1; font-size:20px } </style>
<w-b></w-b>
<script>
  customElements.define('w-i', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<b part="heading">عنوان</b>'; } });
  customElements.define('w-b', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<w-i exportparts="heading: title"></w-i>'; } });
</script>
```

- الجزء الداخلي `heading` اتصدّر باسم `title`.
- الصفحة بتستهدفه بـ `::part(title)`.
- بيخفي تفاصيل التنفيذ الداخلية.

### 2) قراءة exportparts
مثال على el.exportparts.

```html
<div id="e" exportparts="a, b"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = document.getElementById('e').getAttribute('exportparts');</script>
```

- الخاصية قيمتها نص بالقايمة.
- تقدر تقراها بـ `getAttribute`.
- مفيش DOM property مخصوصة لها.

### 3) جزء بدون تصدير
مش بيوصل.

```html
<style> n-o::part(txt) { color:red } </style>
<n-o></n-o>
<script>
  customElements.define('n-i', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<i part="txt">من غير تصدير</i>'; } });
  customElements.define('n-o', class extends HTMLElement { constructor(){ super(); this.attachShadow({mode:'open'}).innerHTML='<n-i></n-i>'; } });
</script>
```

- من غير `exportparts` الجزء مش متاح من برّه.
- اللون الأحمر مش هيطبّق.
- ده سبب وجود الخاصية.

## mistakes

### نسيان التصدير في المتداخل
```html bad
<inner-box></inner-box>   /* من غير exportparts */
```
```html good
<inner-box exportparts="txt"></inner-box>
```
ليه؟ الأجزاء في مستوى متداخل مش بتبان للصفحة إلا لو صدّرتها.

## a11y

- التخصيص من برّه لازم ميؤثرش على التباين والإتاحة.
- وثّق الأجزاء المصدّرة للمستخدمين.

## quiz

### وظيفة `exportparts`؟
- [x] تصدير أجزاء لمستوى Shadow أعلى
- [ ] تصدير ملفات
- [ ] تحميل CSS
- [ ] إخفاء الأجزاء
للتخصيص عبر المستويات.

### إزاي تغيّر اسم الجزء المصدّر؟
- [x] `inner: outer`
- [ ] `inner=outer`
- [ ] `inner->outer`
- [ ] مش ممكن
بنقطتين.

## refs

- [MDN: exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/exportparts)
- [MDN: CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts)
