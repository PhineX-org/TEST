---
id: wbr
kind: element
cat: text
tag: wbr
title: عنصر فرصة كسر الكلمة (wbr)
en: HTML line break opportunity element
status: stable
display: inline
void: yes
support: all
summary: عنصر wbr بيقول للمتصفح «لو محتاج تكسر السطر هنا، اكسر»، وبيفيد مع الكلمات والروابط الطويلة جداً اللي بتخرج برّه حدود الصندوق.
keywords: wbr, كسر الكلمة, word break, رابط طويل, line break opportunity, soft break
related: br, p, span, code
size: compact
---

## intro

فيه كلمات أو روابط طويلة جداً بتعمل مشكلة في الشاشات الضيقة: مفيش مسافات فيها، فالمتصفح مش لاقي مكان يكسرها فيه، فبتخرج برّه الصندوق أو بتعمل scroll أفقي. العنصر `<wbr>` (اختصار **Word Break Opportunity**) بيحلّ المشكلة: بتحطه في مكان معيّن جوه الكلمة، وبتقول للمتصفح «لو السطر ضاق، **مسموح** تكسر هنا».

الفرق بينه وبين `<br>` مهم: `<br>` بيكسر السطر **دايماً** بغض النظر عن العرض. أما `<wbr>` فبيكسر **بس لو لازم**. لو الكلمة ناسبت السطر، `<wbr>` مش بيعمل حاجة ومش بيظهر.

> [!analogy] `<br>` هو لما بتقول «انزل سطر دلوقتي حتى لو في مكان فاضي». و `<wbr>` هو لما بتقول «لو الورقة خلصت، اقطع هنا بدل ما تقطع في نص الحرف».

## try

الكلمة الطويلة في الصندوق الضيق بتخرج برّه. جرّب تضيف `<wbr>` في أماكن من عندك في الكلمة وشوف.

```html
<div style="width: 140px; border: 2px solid #1565c0; padding: 6px;">
  <p>من غير wbr: https://example.com/a/very/long/path/to/page</p>
  <p>مع wbr: https://example.com<wbr>/a<wbr>/very<wbr>/long<wbr>/path<wbr>/page</p>
</div>
```

## syntax

```html nolive
<p>https://example.com/<wbr>very/<wbr>long/<wbr>path</p>
```

- `<wbr>` — عنصر **فارغ (Void)** من غير وسم إغلاق ومن غير محتوى.
- بتحطه **جوه** الكلمة في المكان اللي ينفع المتصفح يكسر عنده.

## use

- مع الروابط الطويلة جداً اللي مفيهاش مسافات.
- مع الكلمات الطويلة (أسماء ملفات، معرّفات، مصطلحات فنية).
- في الجداول والأعمدة الضيقة على الموبايل.

## avoid

- متحطش `<wbr>` في كل حرف: هتبوّظ القراءة.
- مش بديل لـ CSS `overflow-wrap` لو عايز المتصفح يكسر أي كلمة تلقائياً، لكن `<wbr>` بيديك تحكم دقيق.
- متحطش `<br>` مكانه لو مش عايز إجبار كسر.

## attributes

مالوش خصائص خاصة، بيقبل الخصائص العامة ([[global-attributes]]) فقط.

## examples

### 1) الفرق بين br و wbr
`<br>` بيكسر دايماً، و `<wbr>` بيكسر لو لازم بس.

```html
<div style="width: 400px">
  <p>br: ABC<br>DEF (كسر دايماً)</p>
  <p>wbr: ABC<wbr>DEF (كسر لو الصندوق ضيق)</p>
</div>
```

- الأولى انكسرت لأن `<br>` أمر. التانية ما انكسرتش لأن العرض كفاية.

### 2) كسر رابط طويل
بتحط `<wbr>` بعد كل `/` عشان الكسر يبقى في مكان منطقي.

```html
<div style="width: 180px; border: 1px dashed #888; padding: 6px;">
  <a href="#">https://example.com/<wbr>courses/<wbr>html/<wbr>introduction/<wbr>tags</a>
</div>
```

- لاحظ إن الكسر حصل بعد `/` مش في نص كلمة.

### 3) كلمة فنية طويلة
بتكسر حسب المقاطع.

```html
<div style="width: 150px; border: 1px dashed #888; padding: 6px;">
  <p>super<wbr>cali<wbr>fragilistic<wbr>expiali<wbr>docious</p>
</div>
```

- بتحدد انت المقاطع اللي ينفع الكسر عندها.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: مفيش (Void).
- closing: مفيش وسم إغلاق.
- role: مفيش.
- dom: `HTMLElement`.
- layout: فرصة كسر سطر، مفيش عرض مرئي.

## mistakes

### استخدامه كأنه br
```html bad
<p>سطر أول<wbr>سطر تاني</p>
```
```html good
<p>سطر أول<br>سطر تاني</p>
```
ليه؟ `<wbr>` مش بيجبر الكسر، فلو الصندوق عريض الكلمتين هيتلزقوا.

## a11y

- `<wbr>` مش بيتنطق ولا بيظهر، فقارئ الشاشة بيقرا الكلمة كأنها كلمة واحدة بدون توقف.
- متكسرش الكلمات العربية في نص الحرف أو في مكان بيغيّر شكل الحروف المتصلة؛ اكسر عند حدود المقاطع الواضحة.

## tips

- في الروابط، حط `<wbr>` بعد `/` وقبل `?` و `&` و `#`.
- لو عايز كسر تلقائي لأي كلمة في الصندوق من غير ما تعدّل الـ HTML، جرّب `overflow-wrap: anywhere` في CSS.

## quiz

### إيه الفرق بين `<br>` و `<wbr>`؟
- [ ] نفس الشيء
- [x] `<br>` بيكسر دايماً، و `<wbr>` بيكسر لو لازم بس
- [ ] `<wbr>` بيكسر دايماً
- [ ] `<br>` للكلمات الطويلة
`<wbr>` مجرد اقتراح بمكان كسر محتمل.

### أنهي الأنسب لـ `<wbr>`؟
- [ ] فقرة قصيرة
- [x] رابط طويل من غير مسافات
- [ ] عنوان
- [ ] قائمة
الكلمات الطويلة من غير مسافات هي اللي محتاجة أماكن كسر.

## refs

- [MDN: wbr](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/wbr)
- [WHATWG: The wbr element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-wbr-element)
