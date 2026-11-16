---
id: attr-itemref
kind: attribute
cat: global-attrs
chip: itemref
title: خاصية مرجع العناصر الخارجية
en: HTML itemref global attribute (microdata)
status: stable
support: all
size: compact
mdn: Global_attributes/itemref
summary: خاصية itemref بتضم عناصر من برّه نطاق itemscope إلى نفس الشيء في Microdata، بقايمة id مفصولة بمسافة، لما الخصائص مش جوه العنصر الأب في الـ HTML.
keywords: itemref, microdata, itemscope, itemprop, ids, عناصر خارجية, ربط, schema.org, نطاق
related: attr-itemscope, attr-itemprop, attr-itemtype, attr-itemid, attr-id
---

## intro

قاعدة [[attr-itemscope]]: الخصائص (`itemprop`) لازم تكون **جوه** العنصر. لكن أحياناً تصميم الصفحة بيفرض إن خاصية في **مكان تاني بعيد** (زي سعر المنتج في الشريط الجانبي). هنا بتيجي `itemref="id1 id2"`: بتقول للمتصفح/محرك البحث «اعتبر العناصر دي (بالـ id) جزء من الشيء ده». القيمة قايمة `id`s مفصولة بمسافة. الخاصية دي نادرة الاستخدام، بس مهمة لما تصميم الصفحة بيفصل أجزاء الشيء الواحد عن بعض (عمود جانبي، فوتر، صندوق سعر) ومش عايز تكرر البيانات.

## try

```html
<div itemscope itemtype="https://schema.org/Product" itemref="price-box">
  <b itemprop="name">سماعة</b>
</div>
<aside id="price-box"><span itemprop="price">350</span> جنيه</aside>
```

## syntax

```html nolive
<div itemscope itemref="id1 id2">...</div>
<span id="id1" itemprop="x">...</span>
```

- `itemref="id1 id2"` — **قايمة** معرّفات عناصر خارجية.
- العناصر دي بتتحسب كجزء من الشيء.

## use

- خصائص موزّعة في أماكن مختلفة بالتصميم.
- مشاركة نفس القيمة بين أكتر من شيء.

## avoid

- لو الخصائص جوه العنصر أصلاً مفيش داعي لها.

## examples

### 1) سعر في الشريط الجانبي
مثال على itemref.

```html
<article itemscope itemtype="https://schema.org/Product" itemref="p">
  <h3 itemprop="name">كاميرا</h3>
</article>
<div id="p"><span itemprop="price">2000</span></div>
```

- السعر برّه `article` لكنه جزء من المنتج.
- `itemref` بيشاور على `id="p"`.
- التصميم حر من قيود HTML.

### 2) مشاركة قيمة
نفس العنصر لأكتر من item.

```html
<div itemscope itemref="shared"></div>
<div itemscope itemref="shared"></div>
<span id="shared" itemprop="brand">PhineX</span>
```

- العنصر `shared` بيتعدّ للشيئين.
- بتوفر التكرار.
- نادراً ما تحتاجه.

### 3) قراءة itemref
مثال على el.itemRef.

```html
<div id="a" itemscope itemref="x y"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = [...document.getElementById('a').itemRef].join(', ');</script>
```

- `itemRef` قايمة معرّفات.
- بتشتغل مع أدوات تحليل.
- تأكد إن المعرّفات موجودة.

## mistakes

### id مش موجود
```html bad
<div itemscope itemref="nothing"></div>
```
```html good
<div itemscope itemref="price-box"></div><div id="price-box" itemprop="price">1</div>
```
ليه؟ لازم المعرّف يطابق عنصر موجود فعلاً.

## a11y

- مالهاش تأثير مباشر على الإتاحة.
- تأكد إن المعلومة ظاهرة ومفهومة للمستخدم أيضاً.

## quiz

### وظيفة `itemref`؟
- [x] تضم عناصر خارجية لنطاق itemscope
- [ ] تحذف عناصر
- [ ] تلوّن
- [ ] تخفي
بالـ ids.

### قيمتها؟
- [x] ids بمسافة
- [ ] URL
- [ ] رقم
- [ ] لون
قايمة معرّفات.

## refs

- [MDN: itemref](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemref)
- [WHATWG: Microdata](https://html.spec.whatwg.org/multipage/microdata.html#attr-itemref)
