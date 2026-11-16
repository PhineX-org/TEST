---
id: attr-itemscope
kind: attribute
cat: global-attrs
chip: itemscope
title: خاصية بداية العنصر المعرّف
en: HTML itemscope global attribute (microdata)
status: stable
support: all
size: compact
mdn: Global_attributes/itemscope
summary: خاصية itemscope هي بداية Microdata: بتعلن إن العنصر وكل اللي جواه بيوصفوا شيء واحد (منتج، شخص، مقال)، ومعاها itemtype وitemprop بتحدد نوعه وخصائصه لمحركات البحث.
keywords: itemscope, microdata, schema.org, itemtype, itemprop, بيانات منظمة, SEO, rich results, منتج
related: attr-itemtype, attr-itemprop, attr-itemid, attr-itemref, div
---

## intro

محركات البحث بتقرا نص صفحتك، لكنها مش دايماً بتفهم **إيه معناه**: هل الرقم ده سعر؟ هل «أحمد» ده اسم مؤلف؟ الـ **Microdata** طريقة إنك تعلّمها المعنى جوه HTML نفسه. أول خطوة: `itemscope` (خاصية منطقية) على العنصر اللي بيوصف **شيء واحد** (منتج مثلاً)، فكل الـ [[attr-itemprop]] اللي جواه بتبقى خصائص الشيء ده. وبعدها بتحدد نوعه بـ [[attr-itemtype]] (غالباً من schema.org). النتيجة ممكن تظهر في جوجل كـ **Rich Results** (نجوم تقييم، سعر). ملحوظة: جوجل بتفضّل JSON-LD دلوقتي، لكن Microdata لسه مدعومة.

## try

```html
<div itemscope itemtype="https://schema.org/Product">
  <h3 itemprop="name">كورس HTML</h3>
  <p>السعر: <span itemprop="price">0</span> جنيه</p>
</div>
<script>
  function dump(root) { return [...root.querySelectorAll('[itemprop]')].map(e => e.getAttribute('itemprop') + ' = ' + (e.content || e.textContent.trim())).join(' | '); }
</script>
<p id="o"></p>
<script>document.getElementById('o').textContent = dump(document);</script>
```

## syntax

```html nolive
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">اسم</span>
</div>
```

- `itemscope` — **خاصية منطقية** بتفتح نطاق عنصر.
- `itemtype` — **نوعه** (رابط مفردات).
- `itemprop` — **خصائصه** جواه.

## use

- وصف منتج أو مقال أو شخص لمحركات البحث.
- بيانات منظمة داخل HTML.

## avoid

- متحطّش بيانات مش ظاهرة للمستخدم في الصفحة (سياسة جوجل).

## examples

### 1) شخص
مثال على Person.

```html
<div itemscope itemtype="https://schema.org/Person">
  <b itemprop="name">أحمد الجوهري</b> —
  <span itemprop="jobTitle">مطوّر ويب</span>
</div>
```

- العنصر الخارجي بيحدد إنه «شخص».
- كل `itemprop` جواه خاصية للشخص.
- الاسم والوظيفة بيتفهموا لمحرك البحث.

### 2) عناصر متداخلة
item جوه item.

```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">قهوة</span>
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="price">25</span> <span itemprop="priceCurrency">EGP</span>
  </div>
</div>
```

- العرض (`Offer`) هو item داخل المنتج.
- `itemprop="offers"` بيربطه بالمنتج.
- التداخل بيمثّل علاقات حقيقية.

### 3) قراءة itemscope بجافاسكربت
مثال على el.itemScope.

```html
<div id="p" itemscope itemtype="https://schema.org/Thing"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'itemScope = ' + document.getElementById('p').itemScope;</script>
```

- خاصية منطقية في DOM.
- ممكن تتحقق منها بالكود.
- بتفيد مع أدوات تحليل.

## mistakes

### itemprop من غير itemscope
```html bad
<span itemprop="name">منتج</span>
```
```html good
<div itemscope itemtype="https://schema.org/Product"><span itemprop="name">منتج</span></div>
```
ليه؟ الـ itemprop لازم يكون جوه عنصر عليه itemscope.

## a11y

- Microdata ملهاش تأثير مباشر على الإتاحة.
- تأكد إن المعلومة ظاهرة للمستخدم أيضاً.

## quiz

### وظيفة `itemscope`؟
- [x] تبدأ نطاق عنصر Microdata
- [ ] تخفي العنصر
- [ ] تحذفه
- [ ] تلوّنه
بداية الشيء.

### نوعها؟
- [x] منطقية
- [ ] رقم
- [ ] رابط
- [ ] نص
وجودها كافي.

## refs

- [MDN: itemscope](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemscope)
- [Schema.org](https://schema.org/)
