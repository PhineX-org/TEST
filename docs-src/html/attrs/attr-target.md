---
id: attr-target
kind: attribute
cat: attrs
chip: target
title: خاصية مكان الفتح
en: HTML target attribute
status: stable
support: all
mdn: Elements/a#target
summary: خاصية target بتحدد فين يفتح الرابط أو الفورم: _self نفس التبويب، _blank تبويب جديد، _parent/_top، أو اسم iframe. ومع _blank ضيف rel=noopener للأمان.
keywords: target, _blank, _self, _parent, _top, noopener, noreferrer, تبويب جديد, iframe, a, form, base
related: a, form, base, iframe, attr-href, attr-rel
---

## intro

لما تضغط رابط، المتصفح بيفتح الصفحة الجديدة **فين؟** الخاصية `target` هي اللي بتقرر. الافتراضي **`_self`**: في نفس التبويب والنافذة. مع **`_blank`** بيفتح في **تبويب (أو نافذة) جديد**. وفيه `_parent` (الإطار الأب لو انت داخل iframe) و`_top` (النافذة الكاملة). وكمان تقدر تكتب **اسم** `iframe` أو نافذة معيّنة (`target="myframe"`) فيفتح فيه بالظبط.

بتتكتب على [[a]] و[[form]] (فين يظهر رد الإرسال) و[[area]]، وعلى [[base]] لو عايز تخلّي كل الروابط تفتح في تبويب جديد افتراضياً.

**فخ أمان قديم:** قبل سنين، الصفحة اللي اتفتحت بـ `_blank` كانت تقدر تتحكم في الصفحة الأصلية عن طريق `window.opener`. المتصفحات الحديثة بتعتبر `_blank` فيها `noopener` تلقائي، لكن الأحسن تكتب **`rel="noopener noreferrer"`** بإيدك مع `_blank` خصوصاً لما الرابط خارجي. وفكّر كمان في تجربة المستخدم: فتح تبويب جديد بدون ما يطلب بيضايق ناس كتير، فاستخدمه بس للأسباب الواضحة (مستند طويل، مغادرة فورم نص مكتمل).

## try

```html
<p><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">يفتح في تبويب جديد</a></p>
<p><a href="#x" target="_self">نفس التبويب</a></p>
<iframe name="f" title="إطار" style="width:100%; height:50px; border:1px dashed #94a3b8" srcdoc="<p style='font-family:sans-serif'>الإطار فاضي</p>"></iframe>
<p><a href="data:text/html;charset=utf-8,%3Cp%20style%3D%22font-family%3Asans-serif%22%3E%D9%81%D8%AA%D8%AD%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A5%D8%B7%D8%A7%D8%B1%3C%2Fp%3E" target="f">افتح جوه الإطار اللي فوق</a></p>
```

## syntax

```html nolive
<a href="…" target="_blank" rel="noopener noreferrer">رابط</a>
<form action="…" target="resultFrame">…</form>
```

- `_self` (افتراضي) — نفس التبويب.
- `_blank` — تبويب جديد (ومعاه `rel="noopener"`).
- اسم iframe — يفتح جواه.

## use

- فتح رابط خارجي في تبويب جديد.
- عرض نتيجة فورم في iframe.
- تقدر تطبقها على كل روابط الصفحة بـ `<base target>`.

## avoid

- متفتحش كل الروابط في تبويبات جديدة من غير سبب.
- متنساش `rel="noopener noreferrer"` مع `_blank` لروابط خارجية.

## section: القيم

- `_self` — نفس السياق (الافتراضي).
- `_blank` — تبويب/نافذة جديدة.
- `_parent` — السياق الأب.
- `_top` — أعلى سياق (النافذة الكاملة).
- أي اسم — iframe أو نافذة بنفس الاسم.

## examples

### 1) رابط خارجي آمن
_blank مع rel.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">example.com ↗</a>
```

- `noopener` بيمنع الصفحة الجديدة من الوصول لك.
- `noreferrer` مبيبعتش مصدر الزيارة.
- علامة ↗ بتنبّه إنه هيفتح في تبويب جديد.

### 2) نتيجة فورم في إطار
مثال على form target.

```html
<form action="data:text/html;charset=utf-8,%3Cp%3E%D8%AA%D9%85%D8%A7%D9%85%3C/p%3E" method="get" target="out">
  <button>ابعت</button>
</form>
<iframe name="out" title="النتيجة" style="width:100%; height:50px; border:1px dashed #94a3b8"></iframe>
```

- رد الفورم بيظهر في الـ iframe.
- الصفحة الأصلية متتحرّكش.
- اسم الإطار لازم يطابق `target`.

### 3) target في base
افتراضي للكل.

```html nolive
<!-- في <head> -->
<base target="_blank">
<!-- كل الروابط تفتح في تبويب جديد، إلا اللي ليها target مخصّص -->
```

- `<base target>` بتطبّق على كل الروابط.
- الرابط ممكن يتخطّاها بـ `target` خاص.
- استخدمها بحذر.

### 4) _top للهروب من إطار
مثال على _top.

```html
<a href="https://example.com" target="_top">يفتح في النافذة الكاملة حتى لو جوه iframe</a>
```

- مفيد لو صفحتك بتتفتح جوه إطار.
- `_parent` بيطلع مستوى واحد بس.
- نادر الاستخدام.

## mistakes

### _blank من غير rel
```html bad
<a href="https://x.com" target="_blank">رابط</a>
```
```html good
<a href="https://x.com" target="_blank" rel="noopener noreferrer">رابط</a>
```
ليه؟ للأمان والخصوصية مع الروابط الخارجية.

### فتح كل حاجة في تبويب جديد
```html bad
<a href="/about" target="_blank">من نحن</a>
```
```html good
<a href="/about">من نحن</a>
```
ليه؟ الروابط الداخلية الأفضل تفتح في نفس التبويب.

## a11y

- نبّه المستخدم لو الرابط بيفتح تبويب جديد (نص أو أيقونة بـ `aria-label`).
- متفتحش نوافذ منبثقة مفاجئة.
- المستخدم يقدر يختار بنفسه (Ctrl+Click).

## quiz

### قيمة target لتبويب جديد؟
- [x] `_blank`
- [ ] `_new`
- [ ] `_tab`
- [ ] `_open`
مع rel=noopener.

### لازم rel مع `_blank` إمتى؟
- [x] للروابط الخارجية
- [ ] كل الأوقات
- [ ] لو إيميل
- [ ] مفيش
أمان وخصوصية.

### فورم يظهر رده في إطار؟
- [x] `target="اسم-الإطار"`
- [ ] `frame="…"`
- [ ] `output`
- [ ] `into`
بنفس الاسم.

## refs

- [MDN: target](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target)
- [MDN: rel noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener)
