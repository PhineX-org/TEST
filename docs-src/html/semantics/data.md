---
id: data
kind: element
cat: semantics
tag: data
title: عنصر البيانات (data)
en: HTML data element
status: stable
display: inline
void: no
support: all
summary: عنصر data بيربط نص بيظهر للمستخدم بقيمة تقدر الآلات تقراها، عن طريق خاصية value، زي اسم منتج مع رقمه (SKU)، ومفيد للسكربتات وأدوات البيانات.
keywords: data, value, بيانات, machine readable, قيمة قابلة للقراءة آلياً, SKU, رقم المنتج, time, microdata
related: time, span, meter, output, global-attributes
---

## intro

أوقات بتعرض للمستخدم نص (مثل اسم منتج «ساندوتش جبنة صغير») لكن للسكربت أو الأداة اللي بتقرا الصفحة محتاجة **رقم أو كود** يمثّل نفس الحاجة (مثلاً رقم المنتج 398). الـ `<data>` بيحل ده: بتكتب النص اللي يظهر، وبتحط القيمة الآلية في خاصية `value`.

مثال: `<data value="398">ساندوتش جبنة صغير</data>`. المستخدم هيشوف «ساندوتش جبنة صغير»، لكن لو سكربت قرا العنصر هياخد `398` من `value`. وده مفيد في الكتالوجات وقوائم المنتجات وأي بيانات هتتعالج بالكود.

لو القيمة **وقت أو تاريخ** استخدم `<time>` بدل `<data>` (ده الأكثر تخصصاً). ولو القيمة **قياس رقمي** على مقياس (زي درجة امتلاء) استخدم `<meter>`. أما `<data>` فهو **العام** لأي قيمة آلية.

وبيشبه خاصية `data-*` المخصصة (مثلاً `data-id="398"`) لكن الفرق إن `<data value>` عنصر بيتعرّف في المواصفة وبيتفهم كمعنى دلالي (Semantic)، أما `data-*` فمخصصة للسكربتات وملهاش معنى عام. ولو بس عايز تخزن معلومة للجافاسكربت على أي عنصر استخدم `data-*`، ولو عايز وصل بين نص وقيمة كمعنى، استخدم `<data>`.

> [!analogy] تخيّل قايمة أسعار في مطعم: المكتوب «وجبة الدجاج» والكاشير بيدخل رقمها 42 في السيستم. النص للعميل، والرقم للآلة. ده `<data>`: بيجمع الاتنين.

> [!key] `<data value="رقم">النص</data>`. للوقت: `<time>`. للقياس: `<meter>`.

## try

اضغط الزرار عشان السكربت يقرا قيمة `value` من العناصر.

```html
<ul id="menu">
  <li><data value="398">ساندوتش جبنة</data></li>
  <li><data value="399">ساندوتش لحمة</data></li>
  <li><data value="400">ساندوتش فراخ</data></li>
</ul>
<button onclick="
  out.textContent = [...document.querySelectorAll('data')].map(d => d.value).join(' ، ');
">اقرا الأكواد</button>
<p id="out"></p>
```

## syntax

```html nolive
<data value="398">ساندوتش جبنة</data>
```

- `<data>` — **الوسم الافتتاحي**.
- `value` — القيمة الآلية (مطلوبة).
- النص — اللي المستخدم هيشوفه.
- `</data>` — **الوسم الختامي** إجباري.

## use

- لربط اسم منتج بكوده (SKU).
- لعرض نص مع قيمته الرقمية للسكربتات.
- في صفحات بيانات منظمة (قوايم، كتالوج).
- لما `<time>` و `<meter>` مش مناسبين.

## avoid

- متستخدمهوش للتواريخ: `<time>`.
- متستخدمهوش لقياس بمدى: `<meter>`.
- متستخدمهوش من غير `value`.
- متستخدمهوش لتخزين معلومات سكربت عادية: `data-*`.

## attributes

### value {required}
القيمة الآلية المرتبطة بالنص. الأفضل تبقى رقم أو كود بسيط.

```html nolive
<data value="42">وجبة الدجاج</data>
```

### class
للتنسيق.

### lang
لو النص بلغة مختلفة.

## examples

### 1) منتج وكوده
الاستخدام الأساسي.

```html
<p>اشتريت <data value="398">ساندوتش جبنة</data> امبارح.</p>
```

- النص بيظهر عادي للمستخدم.
- الكود 398 مخزّن في الخاصية `value`.
- بتقدر تقراه بالجافاسكربت: `el.value`.

### 2) قائمة منتجات
كتالوج بسيط.

```html
<ul>
  <li><data value="101">قلم</data></li>
  <li><data value="102">كراسة</data></li>
  <li><data value="103">ممحاة</data></li>
</ul>
```

- كل منتج ليه كود.
- لو عملت بحث أو تصدير بيانات من الصفحة، الأكواد جاهزة.

### 3) قراءة value بالجافاسكربت
الخاصية `value` متاحة كـ property.

```html
<data id="p" value="398">ساندوتش</data>
<p id="o"></p>
<script>
  o.textContent = 'الكود: ' + p.value + ' / النص: ' + p.textContent;
</script>
```

- `p.value` بترجع «398»، و`p.textContent` بترجع «ساندوتش».
- ده الفرق الأساسي: القيمة مفصولة عن النص.

### 4) تغيير النص مع بقاء القيمة
الترجمة مثلاً.

```html
<p lang="ar"><data value="398">ساندوتش جبنة</data></p>
<p lang="en"><data value="398">Cheese sandwich</data></p>
```

- النص بيتغيّر مع اللغة والقيمة ثابتة.
- ده مفيد لما نفس العنصر بيتعرض بلغات مختلفة.

### 5) data مقابل time
اختيار العنصر المناسب.

```html
<p>
  رقم المنتج: <data value="398">ساندوتش</data><br>
  موعد التسليم: <time datetime="2026-11-01">الأول من نوفمبر</time>
</p>
```

- `<data>` للقيمة العامة، و`<time>` للتاريخ.
- كل عنصر مناسب لنوع البيانات.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</data>` إجباري.
- role: `generic`.
- dom: `HTMLDataElement`.
- layout: `display: inline`.

## mistakes

### نسيان value
```html bad
<data>ساندوتش</data>
```
```html good
<data value="398">ساندوتش</data>
```
ليه؟ من غير `value` مفيش داعي للعنصر.

### data لتاريخ
```html bad
<data value="2026-10-29">29 أكتوبر</data>
```
```html good
<time datetime="2026-10-29">29 أكتوبر</time>
```
ليه؟ التاريخ ليه عنصر `<time>`.

### data لتخزين حالة سكربت
```html bad
<data value="open" id="state">قايمة</data>
```
```html good
<div id="menu" data-state="open">قايمة</div>
```
ليه؟ حالة السكربت مكانها `data-*`.

## a11y

- قارئ الشاشة مش بيقرا `value`، بيقرا النص بس.
- لو `value` مهم للمستخدم، اعرضه كنص كمان.

## tips

- لو بتبني كتالوج: `<data value="SKU">` وسّع.
- استخدم `data-*` للسكربتات، و`<data>` للمعنى.
- راجع `<time>` و`<meter>` الأول.

## quiz

### أنهي خاصية بتحمل القيمة الآلية؟
- [ ] `title`
- [x] `value`
- [ ] `datetime`
- [ ] `href`
`value` في `<data>`.

### أنهي أنسب لتاريخ؟
- [ ] `<data>`
- [x] `<time>`
- [ ] `<span>`
- [ ] `<meter>`
`<time>` للتواريخ.

### الفرق عن `data-*`؟
- [x] `<data>` عنصر دلالي، و`data-*` خاصية سكربت عامة
- [ ] مفيش فرق
- [ ] `data-*` أقدم
- [ ] `<data>` للصور
`data-*` على أي عنصر للسكربتات.

## refs

- [MDN: data](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/data)
- [WHATWG: The data element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-data-element)
