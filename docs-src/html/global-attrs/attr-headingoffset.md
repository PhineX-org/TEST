---
id: attr-headingoffset
kind: attribute
cat: global-attrs
chip: headingoffset
title: خاصية إزاحة مستوى العناوين
en: HTML headingoffset global attribute (experimental)
status: experimental
support: limited
size: compact
mdn: Global_attributes/headingoffset
summary: خاصية headingoffset تجريبية بتزوّد مستوى العناوين المحسوب داخل العنصر، فنفس المكوّن بعناوين h1 ينفع يتحط على أي عمق من الصفحة من غير تعديل عناوينه.
keywords: headingoffset, headingreset, مستوى العنوان, heading level, h1, مكوّن, إتاحة, تجريبي, outline
related: h1, h2, hgroup, attr-headingreset, section
---

## intro

قارئ الشاشة بيستخدم **مستوى العنوان** (h1…h6) عشان يوضّح هيكل الصفحة. المشكلة: لو عندك **مكوّن** (مقال، كارت) عنوانه `<h2>` ولقيته مرة متداخل جوه قسم تاني، المفروض عنوانه يبقى `<h3>`. تغيير الأرقام يدوياً صعب. الخاصية `headingoffset` بتحل ده: بتقول «**زوّد مستوى كل عناوين جوايا بقدر كذا**». يعني `headingoffset="1"` على قسم يخلي `<h1>` جواه يتحسب مستوى 2 لقارئ الشاشة (من غير تغيير شكله في CSS). القيمة من `0` لـ `8`. **تجريبية**، فمتعتمدش عليها لوحدها.

## try

```html nolive
<h1>دليل الحشرات</h1>
<article>
  <h1>مقال عام</h1>
</article>
<section headingoffset="1">
  <article><h1>مقال فرعي (يتحسب مستوى 2)</h1></article>
</section>
```

## syntax

```html nolive
<section headingoffset="1">
  <h1>يتحسب كـ h2 لقارئ الشاشة</h1>
</section>
```

- `headingoffset="n"` — **زيادة** مستوى العناوين جواه بـ n (0–8).
- بتأثر على **المستوى المحسوب** بس، مش الشكل ولا اسم العنصر.

## use

- مكوّنات بتتحط على أعماق مختلفة.
- محتوى مضمّن من مصدر خارجي.

## avoid

- متعتمدش عليها لوحدها: المتصفحات القديمة هتتجاهلها.

## examples

### 1) نفس المكوّن بعمقين
مقال في مكانين.

```html nolive
<h1>المدونة</h1>
<article><h1>مقال 1</h1></article>

<section headingoffset="1">
  <h1>الأرشيف</h1>
  <article><h1>مقال قديم (يتحسب مستوى 3)</h1></article>
</section>
```

- نفس الـ HTML للمقال بيشتغل في المكانين.
- الإزاحة بتتراكم مع الآباء.
- مفيش تغيير في الشكل: CSS بيشتغل بنفس الأسماء.

### 2) إزاحة على العنوان نفسه
h1 مع offset.

```html nolive
<h1 headingoffset="2">عنوان بيتحسب مستوى 3</h1>
```

- الإزاحة على العنصر نفسه بتتحسب برضو.
- الحد الأقصى للمستوى 9.
- القيم الخاطئة بتتحسب 0.

### 3) العنوان بدون دعم
مثال على fallback.

```html
<section headingoffset="1"><h1>عنوان</h1></section>
<p>في متصفح مبيدعمهاش العنوان بيفضل h1 لقارئ الشاشة، فاعمل HTML منطقي من غيرها.</p>
```

- الخاصية تحسين: مش بتبوّظ حاجة لو مش مدعومة.
- اكتب الهيكل بحيث يبقى مفهوم من غير الإزاحة.
- اختبر بقارئ شاشة.

## mistakes

### توقع تغيير الشكل
```html bad
<section headingoffset="2"><h1>هيبقى صغير؟</h1></section>
```
```html good
<section headingoffset="2"><h1 style="font-size:1.3em">نسّقه بنفسك</h1></section>
```
ليه؟ الإزاحة بتغيّر المستوى المحسوب فقط. الحجم والشكل بيتحكموا فيهم CSS.

## a11y

- بتخلي هيكل العناوين متسق لقارئ الشاشة في المكوّنات.
- متعتمدش عليها بدون اختبار لأنها تجريبية.

## quiz

### بتغيّر إيه؟
- [x] مستوى العنوان المحسوب
- [ ] حجم الخط
- [ ] اسم العنصر
- [ ] لون النص
لقارئ الشاشة.

### أعلى قيمة مسموحة؟
- [x] 8
- [ ] 3
- [ ] 6
- [ ] 99
من 0 لـ 8.

## refs

- [MDN: headingoffset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset)
- [WHATWG: headingoffset](https://html.spec.whatwg.org/multipage/dom.html#attr-headingoffset)
