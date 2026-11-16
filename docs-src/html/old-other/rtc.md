---
id: rtc
kind: element
cat: old-other
tag: rtc
title: حاوية نص الروبي (rtc)
en: HTML rtc element (deprecated)
status: deprecated
display: ruby-text-container
void: no
support: limited
support_note: دعمه ضعيف جداً ومحذوف من المعيار؛ الأفضل تلميح واحد بـ rt أو CSS.
size: compact
summary: عنصر rtc كان بيجمّع أكتر من تلميح فوق النص الأساسي في ruby (نطق وترجمة مثلاً). محذوف من المعيار وضعيف الدعم، والبديل rt واحد أو تكرار ruby متداخل.
keywords: rtc, ruby text container, روبي, نطق, ترجمة, rt, ruby, قديم, deprecated, annotation
related: ruby, rt, rb, rp
---

## intro

`<rtc>` (**Ruby Text Container**) كان بيحاول يحل مشكلة: لو عايز **تلميحين** على نفس الحرف، مثلاً النطق **فوق** والترجمة **تحت**؟ كنت تلف التلميحات في `<rtc>` واحد لكل مستوى، وكل تلميح جواه `<rt>`.

الفكرة جميلة لكنها **ضعيفة الدعم** (متصفح واحد دعمها بشكل ناقص) واتحذفت من المعيار. لو محتاج تلميحين، استخدم **[[ruby]] متداخل** أو عبّر عن التلميح التاني بطريقة تانية (نص عادي جنب الحرف مثلاً)، وللأغلب كفاية [[rt]] واحد للنطق.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<rtc>` ضعيف الدعم. استخدم `<rt>` واحد، أو ruby متداخل لتلميحين.

## try

```html
<ruby>漢<rt>kan</rt></ruby> <ruby>字<rt>ji</rt></ruby>
```

## syntax

```html nolive
<ruby>
  漢
  <rtc><rt>kan</rt></rtc>
  <rtc><rt>الحرف</rt></rtc>
</ruby>
```

- `<rtc>` — **حاوية** لمستوى تلميح (قديم).
- `<rt>` — **التلميح** جواه.
- كل `<rtc>` = **مستوى** (فوق أو تحت).

## use

- لفهم مواصفات Ruby القديمة.

## avoid

- متستخدمهوش: دعمه ضعيف.

## instead

استخدم تلميح [[rt]] واحد، ولو محتاج مستويين اعمل [[ruby]] داخل [[ruby]] أو اكتب التلميح التاني كنص عادي بـ CSS.

```html
<ruby>
  <ruby>漢<rt>kan</rt></ruby>
  <rt>الحرف</rt>
</ruby>
```

## examples

### 1) rtc الأصلي
مستويين.

```html nolive
<ruby>
  漢字
  <rtc><rt>kan</rt><rt>ji</rt></rtc>
  <rtc><rt colspan="2">كلمة</rt></rtc>
</ruby>
```

- `<rtc>` الأول للنطق فوق.
- `<rtc>` التاني للترجمة تحت.
- ضعيف الدعم فمش هيظهر زي المتوقع في أغلب المتصفحات.

### 2) تلميح واحد
الأغلب.

```html
<ruby>漢<rt>kan</rt></ruby>
```

- أبسط وأكثر دعماً.
- التلميح بيظهر فوق الحرف.
- كفاية لمعظم الاستخدامات.

### 3) مستويين بتداخل ruby
بديل عملي.

```html
<ruby>
  <ruby>漢<rt>kan</rt></ruby>
  <rt>حرف</rt>
</ruby>
```

- الـ ruby الداخلي للنطق.
- الخارجي بيضيف تلميح تاني.
- دعمه أفضل من `<rtc>` لكن شكله بيختلف بين المتصفحات.

## mistakes

### الاعتماد على rtc في موقع للجميع
```html bad
<ruby>漢<rtc><rt>kan</rt></rtc></ruby>
```
```html good
<ruby>漢<rt>kan</rt></ruby>
```
ليه؟ `<rtc>` ضعيف الدعم؛ `<rt>` وحده مدعوم في كل المتصفحات الحديثة.

## quiz

### إيه فكرة `<rtc>`؟
- [x] حاوية لمستويات تلميح متعددة
- [ ] الحرف الأساسي
- [ ] الأقواس
- [ ] عنوان
مستويين أو أكتر.

### الأفضل عملياً؟
- [x] `<rt>` واحد
- [ ] `<rtc>` دايماً
- [ ] `<rb>`
- [ ] `<br>`
مدعوم أكتر.

## refs

- [MDN: rtc](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rtc)
