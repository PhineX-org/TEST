---
id: attr-headingreset
kind: attribute
cat: global-attrs
chip: headingreset
title: خاصية إعادة مستوى العناوين
en: HTML headingreset global attribute (experimental)
status: experimental
support: limited
size: compact
mdn: Global_attributes/headingreset
summary: خاصية headingreset تجريبية بتوقف تراكم headingoffset من الآباء، فعناوين العنصر بتاخد مستوى اسمها العادي. مفيدة للنوافذ والمحتوى المدخل من مصدر تاني.
keywords: headingreset, headingoffset, إعادة ضبط, heading level, dialog, popover, محتوى مدخل, تجريبي, مستوى العنوان
related: attr-headingoffset, h1, dialog, hgroup, section
---

## intro

بعد ما بتستخدم [[attr-headingoffset]] على الأقسام، بتتراكم الإزاحة على كل العناوين اللي جوّاها. أحياناً في جزء **مش جزء من هيكل المستند**: نافذة [[dialog]] أو popover أو محتوى بيتحقن من مصدر تاني. المفروض عناوينه تبدأ من جديد. الخاصية `headingreset` (منطقية) بتقول: «**وقّف تراكم الإزاحة من الآباء هنا**»، فعناوين الجزء ده بتاخد مستوى اسمها العادي (`h1` = مستوى 1). لو العنصر عليه الاتنين، إزاحته هو بتتطبّق وكل اللي فوقه بيتلغي.

## try

```html nolive
<section headingoffset="2">
  <h1>مستوى 3</h1>
  <dialog headingreset open>
    <h1>مستوى 1: الإزاحة مش بتوصل هنا</h1>
  </dialog>
</section>
```

## syntax

```html nolive
<dialog headingreset>
  <h1>مستوى 1 مهما كان فوقه</h1>
</dialog>
```

- `headingreset` — **خاصية منطقية**.
- بتوقف إزاحة الآباء عن العناوين جواها.

## use

- النوافذ والـ popovers.
- محتوى مدخل من مصدر آخر (تعليقات، إعلانات).

## avoid

- متعتمدش عليها بدون اختبار: تجريبية.

## examples

### 1) نافذة بعناوينها الخاصة
مثال على dialog.

```html nolive
<main headingoffset="1">
  <h1>الصفحة (مستوى 2)</h1>
  <dialog headingreset>
    <h1>نافذة (مستوى 1)</h1>
  </dialog>
</main>
```

- النافذة بتبدأ هيكلها من الأول.
- قارئ الشاشة بيعلن العنوان كمستوى 1 جواها.
- بتفصل هيكل المستند الرئيسي عن النافذة.

### 2) الاتنين على نفس العنصر
offset مع reset.

```html nolive
<div headingoffset="3">
  <aside headingoffset="1" headingreset>
    <h1>مستوى 2 (إزاحة العنصر فقط)</h1>
  </aside>
</div>
```

- إزاحة الأب (3) بتتلغي.
- إزاحة العنصر نفسه (1) هي اللي بتتطبّق.
- النتيجة: مستوى 2.

### 3) محتوى من خارجي
تعليقات.

```html
<div headingreset><h2>تعليقات المستخدمين</h2><p>…</p></div>
<p>العناوين جوه بتبدأ حسب اسمها العادي.</p>
```

- مناسبة لمحتوى لا تتحكم فيه.
- متأثرش بالإزاحات اللي فوق.
- تحسين تدريجي.

## mistakes

### headingreset من غير ضرورة
```html bad
<article headingreset><h1>...</h1></article>
```
```html good
<article><h1>...</h1></article>
```
ليه؟ لو الإزاحة اللي فوق مطلوبة، متقطعهاش.

## a11y

- بتحافظ على هيكل عناوين منطقي للأجزاء المستقلة.
- اختبرها مع قارئ شاشة حقيقي.

## quiz

### وظيفتها؟
- [x] توقف تراكم headingoffset من الآباء
- [ ] تحذف العناوين
- [ ] تكبّر العناوين
- [ ] تخفي العناوين
بتعيد الضبط.

### نوعها؟
- [x] منطقية (boolean)
- [ ] رقم
- [ ] نص
- [ ] قايمة
وجودها كافي.

## refs

- [MDN: headingreset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingreset)
- [WHATWG: headingreset](https://html.spec.whatwg.org/multipage/dom.html#attr-headingreset)
