---
id: attr-itemid
kind: attribute
cat: global-attrs
chip: itemid
title: خاصية معرّف العنصر العالمي
en: HTML itemid global attribute (microdata)
status: stable
support: all
size: compact
mdn: Global_attributes/itemid
summary: خاصية itemid بتدّي عنصر Microdata معرّف عالمي فريد (غالباً URL أو ISBN) يتعرّف بيه الشيء من أي مكان. بتتحط على عنصر فيه itemscope وitemtype.
keywords: itemid, microdata, معرّف, URL, ISBN, itemscope, itemtype, schema.org, فريد
related: attr-itemscope, attr-itemtype, attr-itemprop, attr-itemref, div
---

## intro

بعض الأشياء ليها **معرّف عالمي** معروف: كتاب برقم ISBN، شخص بصفحة ويكيبيديا، منتج برقم GTIN. الخاصية `itemid` بتحط المعرّف ده على عنصر [[attr-itemscope]] فيتعرّف الشيء بدقة ويتربط بالأشياء نفسها في مصادر تانية. القيمة لازم تكون **URL** (مثلاً `urn:isbn:978-...`). ومتتحطّش إلا على عنصر فيه `itemscope` و`itemtype` معاً. يعني `itemid` اختيارية ونادراً ما تحتاجها، لكنها مفيدة لو الشيء ليه هوية معروفة عالمياً زي كتاب أو منتج أو شخص مشهور.

## try

```html
<div itemscope itemtype="https://schema.org/Book" itemid="urn:isbn:9780141439518">
  <b itemprop="name">Pride and Prejudice</b>
</div>
```

## syntax

```html nolive
<div itemscope itemtype="https://schema.org/Book" itemid="urn:isbn:9780141439518">
```

- `itemid` — **معرّف** عالمي كـ URL أو URN.
- يتحط مع `itemscope` و`itemtype`.

## use

- ربط الشيء بمصدر خارجي موثوق.
- تعريف كتب بـ ISBN أو منتجات برقم تعريف.

## avoid

- متحطّش معرّف غير فريد أو مزيّف.

## examples

### 1) كتاب بـ ISBN
مثال على urn:isbn.

```html
<div itemscope itemtype="https://schema.org/Book" itemid="urn:isbn:9780140449136">
  <span itemprop="name">The Odyssey</span>
</div>
```

- الـ URN `urn:isbn:…` معرّف معياري.
- بيسهّل ربط الكتاب بمصادر تانية.
- نفس الكتاب في صفحات مختلفة له نفس المعرّف.

### 2) شخص بـ URL
رابط صفحة.

```html
<div itemscope itemtype="https://schema.org/Person" itemid="https://example.com/people/ahmed">
  <span itemprop="name">أحمد</span>
</div>
```

- الـ URL بيعرّف الشخص.
- ممكن يشاور على صفحة مرجعية.
- ثابت ومتغيّرش.

### 3) قراءة itemid
مثال على getAttribute.

```html
<div id="b" itemscope itemtype="https://schema.org/Thing" itemid="urn:x:1"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = document.getElementById('b').getAttribute('itemid');</script>
```

- بتقراها كأي خاصية.
- ممكن تستخدمها في مطابقة البيانات.
- اتأكد من فرادتها.

## mistakes

### itemid من غير itemscope
```html bad
<div itemid="urn:x:1">...</div>
```
```html good
<div itemscope itemtype="https://schema.org/Thing" itemid="urn:x:1">...</div>
```
ليه؟ لازم تتحط مع itemscope وitemtype.

## a11y

- مالهاش تأثير مباشر على الإتاحة.
- تأكد إن المعلومة ظاهرة ومفهومة للمستخدم أيضاً.

## quiz

### قيمة `itemid`؟
- [x] URL أو URN فريد
- [ ] اسم عادي
- [ ] لون
- [ ] رقم الصفحة
معرّف عالمي.

### بتتحط على؟
- [x] عنصر فيه itemscope وitemtype
- [ ] أي عنصر
- [ ] script
- [ ] head
معاهم.

## refs

- [MDN: itemid](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemid)
- [WHATWG: Microdata](https://html.spec.whatwg.org/multipage/microdata.html)
