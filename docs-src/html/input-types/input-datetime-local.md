---
id: input-datetime-local
kind: inputtype
cat: input-types
chip: type="datetime-local"
title: حقل التاريخ والوقت
en: <input type="datetime-local">
status: stable
support: all
mdn: Elements/input/datetime-local
summary: type="datetime-local" بيجمع التاريخ والوقت في حقل واحد بدون منطقة زمنية، والقيمة بصيغة YYYY-MM-DDTHH:MM. مناسب لمواعيد وأحداث بتوقيت المستخدم المحلي.
keywords: input datetime-local, تاريخ ووقت, موعد, YYYY-MM-DDTHH:MM, valueAsNumber, منطقة زمنية, حدث, حجز
related: input, input-date, input-time, input-month, attr-min, attr-max
---

## intro

حقل **تاريخ + وقت** مع بعض: موعد طبيب، بداية حدث، وقت تسليم. كلمة «local» معناها **بدون منطقة زمنية**: القيمة هي بالظبط اللي المستخدم شافها، من غير ما تعرف لو هو في القاهرة أو لندن. ده مناسب لمواعيد «محلية» (الاجتماع الساعة 5 مساءً بتوقيت اللي بيحضر).

القيمة بصيغة **`YYYY-MM-DDTHH:MM`** (الحرف `T` بيفصل التاريخ عن الوقت)، مثلاً `2026-11-06T14:30`. لو الحدث بين ناس في مناطق زمنية مختلفة، لازم تخزّن المنطقة الزمنية بنفسك (في حقل تاني أو على السيرفر) وتحوّل لـ UTC. وتقدر تحدد [[attr-min]] و[[attr-max]] بنفس الصيغة. وفي الجافاسكربت `valueAsNumber` بترجّعلك الوقت بالملي ثانية، فتقدر تحسب الفرق بين موعدين بسهولة.

## try

```html
<label>موعد الحجز: <input id="d" type="datetime-local" value="2026-11-06T14:30" onchange="o.textContent = 'القيمة: ' + this.value"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="datetime-local" name="when" min="2026-11-06T09:00" value="2026-11-06T14:30">
```

- القيمة `YYYY-MM-DDTHH:MM` (فيه `T` بين الاتنين).
- مفيش منطقة زمنية (local).
- `min` و`max` بنفس الصيغة.

## use

- مواعيد وحجوزات محلية.
- بداية ونهاية أحداث.
- جدولة مهام.

## avoid

- متتوقعش إنه بيخزّن منطقة زمنية.
- متكتبش `value` بمسافة بدل `T` (بتشتغل في بعض المتصفحات بس).

## examples

### 1) الوقت الحالي كمبدئي
مثال على JS.

```html
<input id="d" type="datetime-local">
<script>
  const n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset());
  d.value = n.toISOString().slice(0, 16);
</script>
```

- نعدّل للتوقيت المحلي قبل `toISOString`.
- `slice(0,16)` بيقص لـ `YYYY-MM-DDTHH:MM`.
- ده فخ شائع.

### 2) تحويل لـ Date
مثال على new Date(value).

```html
<input id="d" type="datetime-local" value="2026-11-06T14:30">
<button onclick="o.textContent = new Date(d.value).toLocaleString('ar-EG')">اعرض</button>
<p id="o"></p>
```

- `new Date(value)` بيفسّرها كتوقيت محلي.
- `toLocaleString` بيعرضها بشكل مألوف.
- لو محتاج UTC استخدم `toISOString()`.

### 3) منع الماضي
min ديناميكي.

```html
<input id="d" type="datetime-local">
<script>
  const n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset());
  d.min = n.toISOString().slice(0, 16);
</script>
```

- الحجز لازم يكون بعد دلوقتي.
- `min` بيتحدّث بالكود.
- اتأكد من السيرفر.

### 4) فرق بين وقتين
مثال على valueAsNumber.

```html
<input id="a" type="datetime-local" value="2026-11-06T10:00">
<input id="b" type="datetime-local" value="2026-11-06T12:30">
<button onclick="o.textContent = (b.valueAsNumber - a.valueAsNumber) / 36e5 + ' ساعة'">احسب</button>
<p id="o"></p>
```

- `valueAsNumber` بالملي ثانية.
- ÷ 3600000 = ساعات.
- مناسب لحساب المدة.

## mistakes

### الخلط مع منطقة زمنية
```html bad
<input type="datetime-local" value="2026-11-06T14:30Z">
```
```html good
<input type="datetime-local" value="2026-11-06T14:30">
```
ليه؟ مفيش `Z` ولا فرق توقيت هنا.

### استخدام text لتاريخ ووقت
```html bad
<input type="text" placeholder="2026-11-06 14:30">
```
```html good
<input type="datetime-local">
```
ليه؟ النوع المخصّص بيدّي منتقي وفحص.

## a11y

- اربطه بـ label يوضّح المنطقة الزمنية المقصودة لو مهمة.
- اتأكد إن لوحة المفاتيح بتتحرك بين الأجزاء.
- وفّر بديل نصي للمتصفحات القديمة.

## quiz

### معنى local؟
- [x] بدون منطقة زمنية
- [ ] بتوقيت UTC
- [ ] بتوقيت القاهرة
- [ ] بتوقيت السيرفر
القيمة بالضبط زي ما اتكتبت.

### الفاصل بين التاريخ والوقت؟
- [x] الحرف `T`
- [ ] مسافة
- [ ] فاصلة
- [ ] شرطة
`YYYY-MM-DDTHH:MM`.

### لمواعيد بين مناطق زمنية؟
- [x] خزّن المنطقة الزمنية بنفسك
- [ ] استخدم datetime-local وخلاص
- [ ] استخدم date
- [ ] استخدم time
الحقل لا يحمل منطقة زمنية.

## refs

- [MDN: datetime-local](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local)
- [WHATWG: Local date and time state](https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type=datetime-local))
