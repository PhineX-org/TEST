---
id: attr-containertimingignore
kind: attribute
cat: global-attrs
chip: containertimingignore
title: خاصية استثناء من توقيت الحاوية
en: HTML containertimingignore global attribute (experimental)
status: experimental
support: limited
support_note: جزء من Container Timing API التجريبي.
size: compact
mdn: Global_attributes/containertimingignore
summary: خاصية containertimingignore تجريبية منطقية بتستثني عنصر وأبناءه من حساب توقيت أي حاوية أعلى منه معلّمة بـ containertiming. مفيدة لتجاهل الإعلانات والمحتوى المتأخر.
keywords: containertimingignore, containertiming, استثناء, أداء, performance, Container Timing API, إعلانات, تجريبي
related: attr-containertiming, attr-id, div, section, img
---

## intro

مع [[attr-containertiming]] بتقيس قد إيه ياخد قسم من صفحتك عشان يتحمّل. لكن أحياناً جوه القسم ده **حاجات مش عايزها تدخل في القياس**: إعلان بيتحمّل متأخر، أو ودجت من طرف تالت. الخاصية المنطقية `containertimingignore` بتقول: «العنصر ده **وكل اللي جواه** سيبه برّه حساب الحاوية الأعلى». فالرقم النهائي بيمثّل المحتوى المهم بس. يعني بتركّز القياس على اللي يهمك فعلاً من غير ما عناصر جانبية تبوّظ الرقم وتدّيك صورة مضللة عن الأداء.

## try

```html nolive
<section containertiming="hero">
  <img src="hero.jpg" alt="">
  <div containertimingignore>إعلان بيتحمّل متأخر (بيتجاهل)</div>
</section>
```

## syntax

```html nolive
<div containertimingignore>...</div>
```

- `containertimingignore` — **خاصية منطقية**.
- بتستثني العنصر وأحفاده من حساب الحاوية الأعلى.

## use

- تجاهل إعلانات وودجت خارجية.
- قياس دقيق للمحتوى الأساسي.

## avoid

- متحطّهاش على المحتوى الأساسي اللي عايز تقيسه.

## examples

### 1) استثناء إعلان
داخل hero.

```html nolive
<section containertiming="hero">
  <h1>عنوان</h1>
  <div containertimingignore><iframe src="ad.html"></iframe></div>
</section>
```

- الإعلان مش بيدخل في توقيت `hero`.
- العنوان بيتحسب عادي.
- الاستثناء بيشمل الأبناء.

### 2) استثناء قسم متأخر
محتوى بيتحمّل بعد.

```html nolive
<div containertiming="feed">
  <article>…</article>
  <div containertimingignore id="late"></div>
</div>
```

- المحتوى المتأخر مش بيبوّظ رقم الأداء.
- ينفع تضيفه ديناميكياً.
- مفيد لواجهات بتحمّل تدريجياً.

### 3) القراءة من DOM
مثال على el.containerTimingIgnore.

```html
<div id="x" containertimingignore></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'موجودة: ' + document.getElementById('x').hasAttribute('containertimingignore');</script>
```

- الخاصية منطقية: وجودها يكفي.
- `hasAttribute` بتتحقق منها.
- في المتصفحات الداعمة فيه property مرادفة.

## mistakes

### استثناء المحتوى الأساسي
```html bad
<div containertiming="hero"><div containertimingignore><h1>العنوان</h1></div></div>
```
```html good
<div containertiming="hero"><h1>العنوان</h1><div containertimingignore>إعلان</div></div>
```
ليه؟ استثنِ بس اللي مش عايزه يتحسب.

## a11y

- خاصية أداء فقط.
- مفيش تأثير على قارئات الشاشة.

## quiz

### بتعمل إيه؟
- [x] تستثني عنصر من توقيت الحاوية
- [ ] تخفي العنصر
- [ ] تحذفه
- [ ] تعطّله
مع containertiming.

### نوعها؟
- [x] منطقية
- [ ] رقم
- [ ] نص
- [ ] قايمة
وجودها كافي.

## refs

- [MDN: containertimingignore](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/containertimingignore)
- [MDN: PerformanceContainerTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceContainerTiming)
