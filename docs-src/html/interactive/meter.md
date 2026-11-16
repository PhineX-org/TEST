---
id: meter
kind: element
cat: interactive
tag: meter
title: عداد القياس (meter)
en: HTML meter element
status: stable
display: inline-block
void: no
support: all
size: compact
summary: بيعرض قيمة قياس داخل مدى معروف: استهلاك قرص، تقييم، درجة اختبار. بياخد min وmax وvalue، وlow وhigh وoptimum بتلوّنه أخضر أو أصفر أو أحمر حسب المنطقة.
keywords: meter, عداد, قياس, gauge, value, min, max, low, high, optimum, مدى, تقييم, استهلاك, درجة
related: progress, label, output
---

## intro

الـ `<meter>` (**عداد**) بيعرض **قياس** داخل **مدى معروف**: «القرص مليان 75%»، «درجتك 8 من 10»، «البطارية 20%». هو مش مهمة بتتقدم (ده `<progress>`)، هو **مؤشر** بيوضّح مكان القيمة بين أقل وأكبر قيمة.

بياخد: `min` (الأقل، افتراضي 0) و`max` (الأعلى، افتراضي 1) و`value` (القيمة). والجميل: **`low`** و**`high`** و**`optimum`** بيقسّموا المدى لمناطق ويلوّنوا العداد **تلقائياً**: أخضر لو القيمة في المنطقة المثلى، أصفر لو متوسطة، أحمر لو سيئة. مثلاً القرص: `low=60 high=85 optimum=30`: القيمة 90 تطلع حمرا لأن «أقل أحسن».

وزي [[progress]]، النص جواه احتياطي، وقارئ الشاشة بيعلن القيمة.

> [!key] `<meter min max value low high optimum>` لقياس ثابت. اللون بيتغير حسب المنطقة.

## try

غيّر `value` وشوف اللون.

```html
<label>القرص: <meter min="0" max="100" low="60" high="85" optimum="30" value="90">90%</meter></label>
```

## syntax

```html nolive
<meter min="0" max="100" low="30" high="70" optimum="100" value="80">80</meter>
```

- `<meter ...>` — **الوسم الافتتاحي**.
- `min` و`max` — **المدى**.
- `value` — **القيمة**.
- `low` `high` `optimum` — **تقسيم المناطق**.
- `</meter>` — **الوسم الختامي** إجباري.

## use

- لاستهلاك مساحة أو ذاكرة.
- لتقييمات ودرجات.
- لمستوى بطارية أو إشارة.

## avoid

- متستخدمهوش لتقدّم مهمة: `<progress>`.
- متستخدمهوش لقيمة من غير مدى.

## attributes

### value
**القيمة الحالية.**

### min
**أقل قيمة** (افتراضي 0).

### max
**أعلى قيمة** (افتراضي 1).

### low
**حد المنطقة المنخفضة.**

### high
**حد المنطقة المرتفعة.**

### optimum
**القيمة المثلى**: بتحدد إذا كانت «العالي أحسن» أو «الواطي أحسن».

## examples

### 1) تقييم نجوم
أعلى أحسن.

```html
<label>التقييم: <meter min="0" max="5" low="2" high="4" optimum="5" value="4.5">4.5 من 5</meter></label>
```

- `optimum=5` يعني الأعلى هو الأحسن.
- 4.5 في المنطقة المرتفعة فهو أخضر.
- لو قيمته 1 هيبقى أحمر.

### 2) استهلاك قرص
أقل أحسن.

```html
<label>القرص: <meter min="0" max="100" low="60" high="85" optimum="20" value="92">92%</meter> 92%</label>
```

- `optimum=20` يعني الأقل هو الأحسن.
- 92 فوق `high=85` فهو أحمر (سيئ).
- نفس العنصر بمعنى معكوس بتغيير `optimum` بس.

### 3) مجموعة عدادات
مقارنة.

```html
<style>
  div { display: grid; grid-template-columns: 90px 1fr; gap: 6px; align-items: center; margin-bottom: 4px }
  meter { width: 100% }
</style>
<div>HTML <meter min="0" max="100" low="40" high="70" optimum="100" value="90"></meter></div>
<div>CSS <meter min="0" max="100" low="40" high="70" optimum="100" value="60"></meter></div>
<div>JS <meter min="0" max="100" low="40" high="70" optimum="100" value="25"></meter></div>
```

- نفس المدى والحدود لكل المهارات.
- اللون بيتغير حسب القيمة: أخضر وأصفر وأحمر.
- مناسب لعرض مستويات مهارة.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content** (من غير `<meter>` متداخل).
- closing: الوسم الختامي `</meter>` إجباري.
- role: `meter`.
- dom: `HTMLMeterElement`.
- layout: `display: inline-block`.

## mistakes

### meter لتقدّم
```html bad
<meter value="50" max="100"></meter> جاري الرفع
```
```html good
<progress value="50" max="100"></progress> جاري الرفع
```
ليه؟ الرفع مهمة بتتقدم.

## a11y

- حط `<label>` أو `aria-label`.
- متعتمدش على اللون بس: اكتب القيمة كنص كمان.

## tips

- اكتب القيمة بجواره كنص.
- اختبر `optimum` علشان اللون يطلع صح.

## quiz

### إيه اللي بيحدد لون `<meter>`؟
- [ ] `color`
- [x] `low` و`high` و`optimum`
- [ ] `max`
- [ ] `step`
بتقسّم المدى لمناطق.

### إمتى تستخدم `<meter>`؟
- [x] قياس ثابت داخل مدى
- [ ] تقدّم رفع
- [ ] تحميل
- [ ] عدّاد وقت
مثل القرص والتقييم.

## refs

- [MDN: meter](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter)
- [WHATWG: The meter element](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element)
