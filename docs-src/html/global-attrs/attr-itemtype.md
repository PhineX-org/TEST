---
id: attr-itemtype
kind: attribute
cat: global-attrs
chip: itemtype
title: خاصية نوع العنصر المعرّف
en: HTML itemtype global attribute (microdata)
status: stable
support: all
size: compact
mdn: Global_attributes/itemtype
summary: خاصية itemtype بتحدد نوع الشيء في Microdata بعنوان مفردات (vocabulary) زي https://schema.org/Product، وبتتحط مع itemscope على نفس العنصر.
keywords: itemtype, schema.org, microdata, itemscope, vocabulary, نوع, Product, Person, Article, مفردات
related: attr-itemscope, attr-itemprop, attr-itemid, attr-itemref, div
---

## intro

بعد ما بتفتح نطاق بـ [[attr-itemscope]]، لازم تقول **نوع الشيء**. الخاصية `itemtype` قيمتها **رابط (URL)** لمفردات معروفة، وأشهرها **schema.org**: `https://schema.org/Product` للمنتج، و`/Person` للشخص، و`/Article` للمقال، و`/Recipe` للوصفة، و`/Event` للحدث. المفردات دي بتعرّف الخصائص المتاحة لكل نوع (`name` و`price` و`image`…)، فمحركات البحث تفهم بالظبط تقصد إيه. بتتكتب على نفس عنصر `itemscope`. لو غلطت في الرابط أو كتبت نوع مش موجود، محرك البحث ببساطة هيتجاهل البيانات، فخلّي بالك من الإملاء والحروف الكبيرة.

## try

```html
<article itemscope itemtype="https://schema.org/Article">
  <h3 itemprop="headline">اتعلّم HTML</h3>
  <p>بقلم <span itemprop="author">أحمد</span></p>
</article>
```

## syntax

```html nolive
<element itemscope itemtype="https://schema.org/النوع">
```

- `itemtype` — **رابط** المفردات والنوع.
- لازم مع `itemscope` على نفس العنصر.

## use

- تحديد نوع (منتج، مقال، شخص، حدث).
- تحسين ظهور الصفحة في نتائج البحث.

## avoid

- متخترعش رابط من عندك: استخدم مفردات معروفة (schema.org).

## examples

### 1) وصفة
مثال على Recipe.

```html
<div itemscope itemtype="https://schema.org/Recipe">
  <h3 itemprop="name">كشري</h3>
  <span itemprop="cookTime" content="PT30M">30 دقيقة</span>
</div>
```

- `Recipe` عنده خصائص زي `cookTime`.
- القيمة الآلية في `content` والنص الظاهر للقارئ.
- جوجل بتعرض الوصفة بشكل غني.

### 2) حدث
مثال على Event.

```html
<div itemscope itemtype="https://schema.org/Event">
  <b itemprop="name">ورشة HTML</b> في <span itemprop="location">القاهرة</span>
</div>
```

- الحدث عنده اسم ومكان وتاريخ.
- بيظهر في نتائج الأحداث.
- استخدم خصائص النوع الصحيح.

### 3) قراءة itemType
مثال على el.itemType.

```html
<div id="x" itemscope itemtype="https://schema.org/Thing https://schema.org/Product"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = [...document.getElementById('x').itemType].join(' + ');</script>
```

- القيمة ممكن تحتوي أكتر من نوع بمسافة.
- `el.itemType` قايمة.
- كل الأنواع لازم من نفس المفردات.

## mistakes

### itemtype من غير itemscope
```html bad
<div itemtype="https://schema.org/Product">...</div>
```
```html good
<div itemscope itemtype="https://schema.org/Product">...</div>
```
ليه؟ الـ itemtype مش بيشتغل من غير itemscope.

## a11y

- مالهاش تأثير مباشر على الإتاحة.
- الصحة هنا جزء من جودة البيانات.

## quiz

### قيمة `itemtype`؟
- [x] رابط URL لمفردات
- [ ] اسم عادي
- [ ] رقم
- [ ] لون
زي schema.org/Product.

### بتتحط على؟
- [x] نفس عنصر itemscope
- [ ] أي عنصر
- [ ] head فقط
- [ ] body فقط
معاه.

## refs

- [MDN: itemtype](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemtype)
- [Schema.org](https://schema.org/docs/full.html)
