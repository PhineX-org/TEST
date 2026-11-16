---
id: ul
kind: element
cat: lists
tag: ul
title: القايمة النقطية (ul)
en: HTML unordered list element
status: stable
display: block
void: no
support: all
summary: عنصر ul بيعمل قايمة غير مرتبة (نقط) بتتكوّن من عناصر li، وبنستخدمه لما ترتيب العناصر مش مهم، زي المميزات أو المشتريات أو روابط المنيو.
keywords: ul, قايمة, قايمة نقطية, unordered list, bullet, نقط, li, قايمة غير مرتبة, منيو, list-style
related: ol, li, menu, dl, nav
---

## intro

عندك مجموعة حاجات عايز تعرضها كـ **قايمة**: مميزات المنتج، مكونات وصفة، روابط المنيو، أو أسماء الفريق. لو **الترتيب مش مهم** (يعني ممكن تبدّل مكانهم من غير ما المعنى يتغير)، فالعنصر المناسب هو `<ul>` (اختصار **Unordered List**: قايمة غير مرتبة). بيعرض كل عنصر بنقطة قدامه افتراضياً.

الـ `<ul>` لوحده **حاوية** مالهاش معنى من غير عناصرها: كل عنصر في القايمة بيتكتب جوه `<li>` (**List Item**). وده أهم قاعدة: **الأبناء المباشرين للـ `<ul>` لازم يبقوا `<li>` بس** (مع السماح بعناصر الدعم زي `<script>` و`<template>`). يعني مينفعش تحط `<p>` أو `<div>` أو نص عادي مباشرةً جوه `<ul>`. لو عايز محتوى تاني، حطه **جوه** الـ `<li>`.

اختيارك بين `<ul>` و`<ol>` بيتحدد بسؤال واحد: «لو غيّرت ترتيب العناصر، هل المعنى بيتغير؟». لو لأ → `<ul>`. لو أيوه (خطوات وصفة، ترتيب سباق) → `<ol>`. وقوائم الروابط (المنيو) غالباً `<ul>` جوه `<nav>`.

وأجمل حاجة: الـ `<ul>` بيتحوّل بالـ CSS لأي شكل: منيو أفقي، بطاقات، شبكة، من غير ما تغيّر الـ HTML. لكن مهم تحافظ على القايمة كقايمة في الكود، لأن **قارئ الشاشة بيعلن «قايمة من 5 عناصر»** وده بيساعد المستخدم يفهم الحجم قبل ما يدخل فيها.

> [!analogy] تخيّل قايمة مشتريات للسوبرماركت: لبن، عيش، جبنة. مش فارق تشتري إيه الأول، فبتكتبها بنقط. بس لو كانت وصفة «اخلط، اخبز، قدّم»، الترتيب مهم فبتكتبها بأرقام. النقط = `<ul>`، الأرقام = `<ol>`.

> [!key] `<ul>` للترتيب **غير** المهم. أبناؤه المباشرين `<li>` بس. شكل النقط من CSS (`list-style`).

## try

جرّب تضيف عنصر جديد بـ `<li>`، وبدّل `ul` بـ `ol` وشوف الفرق.

```html
<h3>مميزات الكورس</h3>
<ul>
  <li>مجاني بالكامل</li>
  <li>بالعربي</li>
  <li>أمثلة تفاعلية</li>
</ul>
```

## syntax

```html nolive
<ul>
  <li>العنصر الأول</li>
  <li>العنصر التاني</li>
</ul>
```

- `<ul>` — **الوسم الافتتاحي** للقايمة.
- `<li>` — كل عنصر (ابن مباشر).
- `</ul>` — **الوسم الختامي** إجباري.

## use

- لمجموعة عناصر ترتيبها مش مهم (مميزات، مكونات، أسماء).
- لقوائم الروابط والمنيو (جوه `<nav>`).
- لتجميع عناصر متشابهة (بطاقات، تصنيفات، تاجات).
- كأساس لتصميمات شبكية وأفقية بالـ CSS.

## avoid

- متحطش جواه حاجة غير `<li>` مباشرةً.
- متستخدمهوش لو الترتيب مهم: `<ol>`.
- متستخدمهوش لعنصر واحد.
- متستخدمهوش لعمل مسافة أو إزاحة بس.

## attributes

مالوش خصائص خاصة حديثة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### compact {deprecated}
كانت بتصغّر المسافات بين العناصر. **قديمة**: استخدم CSS (`margin`/`line-height`).

### type {deprecated}
كانت بتحدد شكل النقطة (`disc` و`circle` و`square`). **قديمة**: استخدم `list-style-type` في CSS.

### class
للتنسيق.

### role
أحياناً بنضيف `role="list"` لو غيّرت `list-style: none` في Safari، لأنه بيشيل دلالة القايمة.

## examples

### 1) قايمة بسيطة
أبسط شكل.

```html
<ul>
  <li>تفاح</li>
  <li>موز</li>
  <li>برتقال</li>
</ul>
```

- كل `<li>` بيظهر بنقطة قدامه.
- المتصفح بيدّي القايمة مسافة من الجنب (padding) افتراضياً.
- ترتيب العناصر هنا ما بيفرقش في المعنى.

### 2) قايمة متداخلة
قايمة جوه عنصر في قايمة.

```html
<ul>
  <li>فواكه
    <ul>
      <li>تفاح</li>
      <li>موز</li>
    </ul>
  </li>
  <li>خضار
    <ul>
      <li>خيار</li>
      <li>جزر</li>
    </ul>
  </li>
</ul>
```

- القايمة الداخلية جوه `<li>` مش جوه `<ul>` مباشرةً (ده المهم).
- المتصفح بيغيّر شكل النقطة تلقائياً في المستوى الداخلي.

### 3) تغيير شكل النقطة
بالـ CSS.

```html
<style>
  ul.sq { list-style-type: square; }
  ul.none { list-style: none; padding: 0; }
  ul.emoji { list-style: "✅ "; }
</style>
<ul class="sq"><li>مربع</li><li>مربع</li></ul>
<ul class="none"><li>من غير نقط</li><li>من غير نقط</li></ul>
<ul class="emoji"><li>إيموجي</li><li>إيموجي</li></ul>
```

- `list-style-type` بيغيّر شكل النقطة، و`list-style: none` بيشيلها.
- `list-style` بيقبل نص أو إيموجي كعلامة.

### 4) منيو أفقي
نفس القايمة بتنسيق مختلف.

```html
<style>
  nav ul { display:flex; gap:10px; list-style:none; padding:0; margin:0; }
  nav a { padding:6px 12px; background:#0f172a; color:#fff; border-radius:6px; text-decoration:none; }
</style>
<nav>
  <ul>
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">الكورسات</a></li>
    <li><a href="#">اتصل بينا</a></li>
  </ul>
</nav>
```

- المنيو في الحقيقة قايمة روابط، فالأنسب `<ul>` جوه `<nav>`.
- الـ Flexbox حوّلها لأفقي من غير تغيير الـ HTML.

### 5) قايمة بعناصر غنية
جوه `<li>` ممكن تحط أي حاجة.

```html
<ul style="list-style:none; padding:0">
  <li style="border:1px solid #ddd; border-radius:8px; padding:8px; margin:6px 0">
    <h4 style="margin:0">HTML</h4>
    <p style="margin:4px 0 0">أساس الويب.</p>
  </li>
  <li style="border:1px solid #ddd; border-radius:8px; padding:8px; margin:6px 0">
    <h4 style="margin:0">CSS</h4>
    <p style="margin:4px 0 0">الشكل والتنسيق.</p>
  </li>
</ul>
```

- كل `<li>` بقى كارت فيه عنوان وفقرة.
- ده أشهر نمط لقوائم المنتجات والمقالات.

### 6) توليد قايمة بالجافاسكربت
من مصفوفة.

```html
<ul id="list"></ul>
<script>
  const items = ['HTML', 'CSS', 'JavaScript'];
  items.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    list.append(li);
  });
</script>
```

- بنعمل `<li>` لكل عنصر ونضيفه للـ `<ul>`.
- `textContent` آمن مع بيانات المستخدم.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: صفر أو أكتر `<li>` (وعناصر الدعم `<script>` و`<template>`).
- closing: الوسم الختامي `</ul>` إجباري.
- role: `list`.
- dom: `HTMLUListElement`.
- layout: `display: block`، مع `padding-inline-start` و`list-style-type: disc`.

## mistakes

### عنصر غير li جوه ul
```html bad
<ul>
  <p>عنصر</p>
  <div>عنصر</div>
</ul>
```
```html good
<ul>
  <li>عنصر</li>
  <li>عنصر</li>
</ul>
```
ليه؟ الأبناء المباشرين للـ `<ul>` لازم يبقوا `<li>`.

### قايمة متداخلة في المكان الغلط
```html bad
<ul>
  <li>فواكه</li>
  <ul>
    <li>تفاح</li>
  </ul>
</ul>
```
```html good
<ul>
  <li>فواكه
    <ul>
      <li>تفاح</li>
    </ul>
  </li>
</ul>
```
ليه؟ القايمة الفرعية لازم تبقى جوه `<li>` مش جنبه.

### ul للإزاحة
```html bad
<ul>
  <ul>
    <li>نص مزاح</li>
  </ul>
</ul>
```
```html good
<p style="margin-right: 40px">نص مزاح</p>
```
ليه؟ الإزاحة شغل CSS.

## a11y

- قارئ الشاشة بيعلن «قايمة من N عناصر»: ده بيساعد المستخدم.
- لو شلت النقط بـ `list-style: none` في Safari، ضيف `role="list"` عشان تفضل قايمة.
- قوائم الروابط جوه `<nav>` مع `aria-label`.

## tips

- لو الترتيب مهم استخدم `<ol>`.
- حافظ على القايمة كقايمة حتى لو شكلها اتغير.
- لو قايمة طويلة جداً فكّر في تقسيمها أو ترقيم الصفحات.

## quiz

### إمتى تستخدم `<ul>`؟
- [ ] لما الترتيب مهم
- [x] لما الترتيب مش مهم
- [ ] للجداول
- [ ] للعناوين
`<ul>` للقوائم غير المرتبة.

### أنهي الأبناء المباشرين المسموحين؟
- [ ] `<p>`
- [ ] `<div>`
- [x] `<li>`
- [ ] `<span>`
`<li>` بس.

### أنهي أنسب لروابط المنيو؟
- [x] `<nav>` فيه `<ul>`
- [ ] `<div>` فيه `<br>`
- [ ] `<table>`
- [ ] `<ol>` دايماً
قايمة روابط جوه nav.

## refs

- [MDN: ul](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul)
- [WHATWG: The ul element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element)
