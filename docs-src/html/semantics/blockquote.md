---
id: blockquote
kind: element
cat: semantics
tag: blockquote
title: عنصر الاقتباس الطويل (blockquote)
en: HTML block quotation element
status: stable
display: block
void: no
support: all
summary: عنصر blockquote بيلفّ اقتباس طويل من مصدر تاني (فقرة أو أكتر)، وبيتعرض بمسافة من الجنبين، وبيقبل cite لرابط المصدر، والنسب للمصدر بيتحط برّاه في figcaption أو cite.
keywords: blockquote, اقتباس, اقتباس طويل, quote, cite, مصدر, فقرة مقتبسة, citation, figure
related: q, cite, figure, figcaption, p, article
---

## intro

لما بتنقل كلام من مصدر تاني (كتاب، مقال، خطاب) وبيبقى **طويل** (فقرة أو أكتر)، بنعلّم عليه بـ `<blockquote>` (**Block Quotation**: اقتباس كتلة). المتصفح بيعرضه **بمسافة** من الجانبين (حوالي 40px) عشان يتميّز عن كلامك.

الفرق بينه وبين `<q>`: الـ `<q>` للاقتباس **القصير** جوه الجملة (Inline)، والـ `<blockquote>` للاقتباس **الطويل** المنفصل (Block). وتقدر تحط جوه الـ `<blockquote>` فقرات `<p>` وعناصر تانية.

وفيه نقطة مهمة جداً بيغلط فيها كتير: **اسم صاحب الاقتباس مش بيتحط جوه `<blockquote>`**. بتحطه برّاه. الطريقة المعتمدة: تلف الاقتباس والمصدر مع بعض في `<figure>`، وتحط المصدر في `<figcaption>`. وفي المصدر استخدم `<cite>` لعنوان العمل. أما خاصية `cite` على `<blockquote>` فهي **رابط URL** للمصدر الأصلي (للآلات، المتصفح مش بيعرضه).

كمان `<blockquote>` مش لتزويق الكلام أو عمل مسافة. لو عايز بس إزاحة بصرية، استخدم CSS. هو للاقتباس الحقيقي من مصدر تاني.

> [!analogy] تخيّل مقال في جرنال فيه صندوق مظلّل بعنوان صغير تحته «من خطاب الرئيس…». الصندوق ده هو الكلام المنقول، والعنوان اللي تحته هو المصدر. ده بالظبط `<figure>` و`<blockquote>` و`<figcaption>`.

> [!key] `<blockquote>` = اقتباس **طويل** منفصل. المصدر برّاه (في `<figcaption>`). خاصية `cite` = رابط المصدر.

## try

جرّب تغيّر المصدر أو تضيف فقرة تانية للاقتباس.

```html
<figure>
  <blockquote cite="https://example.com/speech">
    <p>التعليم هو أقوى سلاح تقدر تستخدمه لتغيير العالم.</p>
  </blockquote>
  <figcaption>— نيلسون مانديلا، <cite>خطاب عن التعليم</cite></figcaption>
</figure>
```

## syntax

```html nolive
<figure>
  <blockquote cite="https://example.com/source">
    <p>نص الاقتباس.</p>
  </blockquote>
  <figcaption>— المصدر، <cite>العنوان</cite></figcaption>
</figure>
```

- `<blockquote>` — **الوسم الافتتاحي**.
- `cite` — رابط المصدر (اختياري).
- المحتوى — فقرات الاقتباس.
- `</blockquote>` — **الوسم الختامي** إجباري.
- المصدر **برّه** في `<figcaption>` أو `<cite>`.

## use

- لاقتباس طويل (فقرة أو أكتر) من كتاب أو مقال أو خطاب.
- لتعليقات أو رسائل منقولة.
- لاقتباسات بارزة في مقال (Pull quotes لو منقولة من مصدر).
- لنقل كلام شخص في سياق تاني.

## avoid

- متستخدمهوش لعمل مسافة أو تنسيق: CSS.
- متحطش اسم القائل جواه.
- متستخدمهوش لاقتباس قصير جوه جملة: `<q>`.
- متستخدمهوش لكلامك أنت.

## attributes

### cite
رابط (URL) لمصدر الاقتباس الأصلي. بيتخزن في الـ DOM لكن المتصفح **مش بيعرضه**، فلو عايز المستخدم يشوف المصدر اعمل رابط `<a>` ظاهر.

```html nolive
<blockquote cite="https://example.com/article">…</blockquote>
```

### class
للتنسيق.

### lang
لو الاقتباس بلغة مختلفة.

## examples

### 1) أبسط blockquote
اقتباس بفقرة.

```html
<blockquote>
  <p>البرمجة هي فن حل المشاكل.</p>
</blockquote>
```

- المتصفح بيزحزح الاقتباس من الجنبين افتراضياً.
- ده كله من غير ما تكتب CSS.
- من غير مصدر الاقتباس ناقص، فالأفضل تضيفه.

### 2) اقتباس مع المصدر الصح
`<figure>` و`<figcaption>`.

```html
<figure>
  <blockquote cite="https://example.com">
    <p>ابدأ من حيث أنت، واستخدم ما لديك، وافعل ما تستطيع.</p>
  </blockquote>
  <figcaption>— آرثر آش، <cite>اقتباس شهير</cite></figcaption>
</figure>
```

- المصدر خارج `<blockquote>` وجوه `<figcaption>`.
- ده النمط المعتمد في المواصفة: `<figure>` بيجمّع الاقتباس ومصدره كوحدة واحدة.
- الـ `<cite>` جوه `<figcaption>` بيعلّم على عنوان العمل مش على اسم الشخص.
- لو شلت `<figure>` ممكن تحط المصدر في فقرة تحت الاقتباس، لكن الربط بيبقى أضعف.

### 3) اقتباس بفقرتين
أكتر من فقرة.

```html
<blockquote>
  <p>الفقرة الأولى من الاقتباس.</p>
  <p>الفقرة التانية من نفس المصدر.</p>
</blockquote>
```

- الاقتباس ممكن يبقى طويل جداً فيه فقرات متعددة.
- كل فقرة في `<p>` داخل `<blockquote>`.

### 4) تنسيق بصري
شكل الاقتباس المعتاد.

```html
<style>
  blockquote { margin: 12px 0; padding: 10px 16px; border-right: 5px solid #39ff14; background: #f8fafc; color: #334155; }
</style>
<blockquote><p>الكود الجيد بيتقرا كأنه نص عادي.</p></blockquote>
```

- الخط الأخضر الجانبي والخلفية الفاتحة تنسيق شائع.
- ده كله CSS، والـ HTML لسه `<blockquote>`.

### 5) رابط المصدر ظاهر
`cite` مش بيظهر، فنضيف رابط.

```html
<blockquote cite="https://example.com/source">
  <p>اقتباس من المصدر.</p>
</blockquote>
<p>المصدر: <a href="https://example.com/source">اقرأ المقال الأصلي</a></p>
```

- الخاصية `cite` للآلات، والرابط `<a>` للناس.
- المستخدم عايز يشوف ويضغط، فلازم رابط ظاهر.

### 6) اقتباس متداخل
اقتباس جوه اقتباس.

```html
<blockquote>
  <p>قال لي صاحبي:</p>
  <blockquote>
    <p>المثابرة هي السر.</p>
  </blockquote>
</blockquote>
```

- ده مسموح لكنه نادر.
- الاقتباس الداخلي بيتزحزح أكتر.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: **Flow content**.
- closing: الوسم الختامي `</blockquote>` إجباري.
- role: `blockquote`.
- dom: `HTMLQuoteElement`.
- layout: `display: block`، و`margin: 1em 40px`.

## mistakes

### اسم القائل جوه blockquote
```html bad
<blockquote>
  <p>الكلام ده مهم.</p>
  <p>— أحمد</p>
</blockquote>
```
```html good
<figure>
  <blockquote><p>الكلام ده مهم.</p></blockquote>
  <figcaption>— أحمد</figcaption>
</figure>
```
ليه؟ المصدر جزء من السياق مش من الاقتباس.

### blockquote للمسافة
```html bad
<blockquote>
  <p>فقرة عادية عايز أزحزحها.</p>
</blockquote>
```
```html good
<p style="margin-right: 40px">فقرة عادية.</p>
```
ليه؟ `<blockquote>` اقتباس حقيقي، مش أداة تنسيق.

### نص عادي بدون p
```html bad
<blockquote>نص مباشرة</blockquote>
```
```html good
<blockquote><p>نص جوه فقرة</p></blockquote>
```
ليه؟ الأفضل تلف النص في `<p>` عشان يبقى منظم.

## a11y

- قارئ الشاشة بيعلن «اقتباس» وبيساعد المستخدم يفهم الكلام ده من مصدر تاني.
- تأكد إن المصدر واضح للقارئ.
- لو الاقتباس بلغة مختلفة حط `lang`.

## tips

- اربط المصدر بـ `<a>` ظاهر.
- متضيفش علامات تنصيص يدوية: التنسيق بيعمل المسافة.
- لو الاقتباس مشهور، اذكر المصدر دايماً.

## quiz

### أنهي المكان الصح لاسم القائل؟
- [ ] جوه `<blockquote>`
- [x] برّه في `<figcaption>` أو `<cite>`
- [ ] في `cite` attribute
- [ ] في `title`
المصدر خارج الاقتباس.

### الـ `cite` attribute على `<blockquote>`؟
- [ ] نص بيظهر
- [x] رابط مصدر الاقتباس (للآلات)
- [ ] اسم القائل
- [ ] تاريخ
URL مش ظاهر للمستخدم.

### الاقتباس القصير جوه جملة؟
- [ ] `<blockquote>`
- [x] `<q>`
- [ ] `<cite>`
- [ ] `<em>`
`<q>` للقصير.

## refs

- [MDN: blockquote](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote)
- [WHATWG: The blockquote element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element)
