---
id: attr-itemprop
kind: attribute
cat: global-attrs
chip: itemprop
title: خاصية اسم الخاصية المعرّفة
en: HTML itemprop global attribute (microdata)
status: stable
support: all
size: compact
mdn: Global_attributes/itemprop
summary: خاصية itemprop بتحدد اسم خاصية داخل Microdata (name وprice وimage مثلاً) والقيمة بتتاخد من محتوى العنصر أو خاصية معيّنة حسب نوعه.
keywords: itemprop, microdata, property, name, price, content, schema.org, خاصية, قيمة, SEO
related: attr-itemscope, attr-itemtype, attr-itemid, attr-itemref, span
---

## intro

جوه نطاق [[attr-itemscope]]، كل معلومة بتوصف الشيء بتتعلّم بـ `itemprop="اسم-الخاصية"`. القيمة بتتاخد حسب نوع العنصر: **النص** جوه العنصر (للأغلب)، أو خاصية `content` (للـ `<meta>`)، أو `href` (للروابط)، أو `src` (للصور)، أو `datetime` (للـ `<time>`). يعني لو عايز قيمة غير اللي ظاهرة (زي رقم بدل «30 دقيقة»)، استخدم `<meta itemprop="x" content="...">`. ودي الفكرة كلها: كل معلومة مهمة في الصفحة (الاسم، السعر، الصورة، الرابط) بتاخد اسم من المفردات، فمحرك البحث يعرف إن «350» ده سعر مش مجرد رقم.

## try

```html
<div itemscope itemtype="https://schema.org/Product">
  <b itemprop="name">لابتوب</b>
  <meta itemprop="sku" content="LP-100">
  <a itemprop="url" href="#">تفاصيل</a>
</div>
```

## syntax

```html nolive
<span itemprop="name">القيمة</span>
<meta itemprop="sku" content="123">
<a itemprop="url" href="…">رابط</a>
```

- `itemprop="اسم"` — **اسم الخاصية** من المفردات.
- القيمة من النص أو `content` أو `href` أو `src` حسب العنصر.

## use

- وصف خصائص منتج أو شخص أو مقال.
- تعريف قيم آلية مختلفة عن النص الظاهر.

## avoid

- متحطّش اسم خاصية مش موجود في المفردات.

## examples

### 1) قيمة من href وsrc
رابط وصورة.

```html
<div itemscope itemtype="https://schema.org/Product">
  <img itemprop="image" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'/>" alt="">
  <a itemprop="url" href="#">صفحة المنتج</a>
</div>
```

- قيمة `image` من `src`، و`url` من `href`.
- مش لازم نص ظاهر.
- العنصر يحدد من أين تتاخد القيمة.

### 2) قيمة آلية بـ meta
مثال على content.

```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="price" content="499.00">499 جنيه</span>
</div>
```

- النص ظاهر للمستخدم و`content` للآلة.
- مفيد لتنسيق الأرقام والتواريخ.
- لازم تتطابق القيمتين منطقياً.

### 3) أكتر من اسم خاصية
قيمة لعدة خصائص.

```html
<span itemscope itemtype="https://schema.org/Thing"><span itemprop="name alternateName">PhineX</span></span>
```

- القيمة ممكن تنتمي لأكتر من خاصية بمسافة.
- الأسماء من نفس المفردات.
- نادراً ما تحتاجه.

## mistakes

### خاصية بدون itemscope
```html bad
<span itemprop="price">25</span>
```
```html good
<div itemscope itemtype="https://schema.org/Offer"><span itemprop="price">25</span></div>
```
ليه؟ itemprop لازم داخل نطاق itemscope.

## a11y

- القيم الآلية (`content`) مش بتتقرا لقارئ الشاشة: لازم النص الظاهر مفهوم.
- Microdata مالهاش تأثير مباشر على الإتاحة، فمتعتمدش عليها بدل النص.

## quiz

### من أين تتاخد قيمة `itemprop` على الرابط؟
- [x] من `href`
- [ ] من النص دايماً
- [ ] من `class`
- [ ] من `id`
حسب نوع العنصر.

### إزاي تحط قيمة آلية مختلفة؟
- [x] `content`
- [ ] `value`
- [ ] `data`
- [ ] `alt`
مع meta أو span.

## refs

- [MDN: itemprop](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemprop)
- [Schema.org](https://schema.org/)
