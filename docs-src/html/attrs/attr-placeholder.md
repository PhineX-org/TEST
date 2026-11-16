---
id: attr-placeholder
kind: attribute
cat: attrs
chip: placeholder
title: خاصية النص التلميحي
en: HTML placeholder attribute
status: stable
support: all
mdn: Attributes/placeholder
summary: خاصية placeholder بتعرض نص تلميحي باهت داخل الحقل الفاضي (مثال للإدخال) وبيختفي عند الكتابة. مش بديل عن label، ولون النص الافتراضي ممكن يكون ضعيف التباين.
keywords: placeholder, تلميح, hint, ::placeholder, :placeholder-shown, label, مثال, input, textarea, تباين
related: input, textarea, label, attr-required, attr-pattern, input-text
---

## intro

`placeholder` نص **باهت** بيظهر جوه الحقل **وهو فاضي**، ويختفي أول ما المستخدم يكتب. استخدامه الصح: **مثال أو تلميح للشكل** (`placeholder="name@example.com"` أو `placeholder="01XXXXXXXXX"`). بتشتغل على [[input]] (الأنواع النصية) و[[textarea]].

**أكبر غلطة في الفورمات: استخدامه بدل [[label]].** ليه ده غلط؟ (1) **بيختفي** لما تكتب، فالمستخدم ينسى الحقل ده بتاع إيه، خصوصاً لو بيراجع. (2) لونه **باهت** افتراضياً فتباينه ضعيف وصعب القراءة لناس كتير. (3) قارئات شاشة كتير بتتعامل معاه كتلميح مش كاسم. (4) المستخدم ممكن يفتكر إن الحقل متملّي فعلاً! فالقاعدة: **الـ label للاسم الدائم، والـ placeholder للمثال فقط**.

بتقدر تنسّق شكله بـ `::placeholder` في CSS، وتفحص إنه ظاهر بـ `:placeholder-shown` (مفيدة لتنسيق «label عائم» أو إظهار الخطأ بعد الكتابة بس). وقيمته لازم تكون **نص عادي** (مفيش HTML جواه).

## try

```html
<label>الإيميل<br><input type="email" placeholder="name@example.com"></label>
<p><label>رقم الموبايل<br><input type="tel" placeholder="01XXXXXXXXX"></label></p>
```

## syntax

```html nolive
<label for="e">الإيميل</label>
<input id="e" type="email" placeholder="name@example.com">
```

- `placeholder="مثال"` — بيظهر والحقل فاضي.
- مش بديل عن `<label>`.
- CSS: `::placeholder` و`:placeholder-shown`.

## use

- مثال لشكل الإدخال (صيغة إيميل/تليفون).
- تلميح قصير لحقل البحث.
- بجانب `label` وليس بدلاً منه.

## avoid

- متخليهوش بديل عن الـ label.
- متحطش معلومة مهمة فيه (بتختفي).

## examples

### 1) تنسيق النص
مثال على ::placeholder.

```html
<style>.p::placeholder { color:#94a3b8; font-style:italic }</style>
<input class="p" placeholder="اكتب هنا">
```

- `::placeholder` بيستهدف النص التلميحي.
- خلّي التباين مقبول (4.5:1).
- متخلّيهوش أفتح من اللازم.

### 2) label عائم
مثال على :placeholder-shown.

```html
<style>
  .f { position:relative; display:inline-block; margin-top:14px }
  .f input { padding:14px 8px 4px }
  .f span { position:absolute; right:8px; top:4px; font-size:11px; color:#64748b; transition:.15s }
  .f input:placeholder-shown + span { top:14px; font-size:14px }
</style>
<label class="f"><input placeholder=" "><span>الاسم</span></label>
```

- `placeholder=" "` (مسافة) بتفعّل `:placeholder-shown` بدون تلميح ظاهر.
- الـ label بيتحرك لما تكتب.
- الـ label الحقيقي لسه موجود.

### 3) textarea
نص متعدد الأسطر.

```html
<textarea rows="3" placeholder="اكتب رسالتك هنا…&#10;ممكن في أكتر من سطر"></textarea>
```

- `&#10;` سطر جديد.
- بيتعامل زي input.
- بيختفي مع أول حرف.

### 4) خطأ بعد الكتابة بس
:placeholder-shown مع :invalid.

```html
<style>input:invalid:not(:placeholder-shown) { border-color:#ef4444; outline-color:#ef4444 }</style>
<input type="email" placeholder="name@example.com" required>
```

- الحقل الفاضي مش أحمر.
- يبقى أحمر بعد ما تكتب إيميل غلط.
- تجربة أنعم للمستخدم.

## mistakes

### placeholder بدل label
```html bad
<input placeholder="الاسم">
```
```html good
<label>الاسم <input></label>
```
ليه؟ بيختفي مع الكتابة ومش دايماً بيتقري كاسم.

### معلومة مهمة جواه
```html bad
<input placeholder="لازم 8 حروف على الأقل">
```
```html good
<input aria-describedby="h"><p id="h">لازم 8 حروف على الأقل</p>
```
ليه؟ التعليمات المهمة لازم تفضل ظاهرة.

## a11y

- لازم label ظاهر: الـ placeholder مش كفاية.
- اللون الباهت بيفشل في التباين: اتأكد من 4.5:1.
- اشرح التنسيق في نص مساعد لو معقد.

## quiz

### هل placeholder بديل للـ label؟
- [x] لأ
- [ ] أيوه
- [ ] لو قصير
- [ ] لو مفيش label
بيختفي وضعيف إتاحة.

### تنسيق نصه؟
- [x] `::placeholder`
- [ ] `:placeholder`
- [ ] `::hint`
- [ ] `.placeholder`
pseudo-element.

### إمتى يظهر؟
- [x] والحقل فاضي
- [ ] دايماً
- [ ] عند الفوكس
- [ ] بعد الكتابة
يختفي مع أول حرف.

## refs

- [MDN: placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/placeholder)
- [MDN: ::placeholder](https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder)
