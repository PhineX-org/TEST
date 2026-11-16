---
id: input-month
kind: inputtype
cat: input-types
chip: type="month"
title: حقل الشهر
en: <input type="month">
status: stable
support: all
mdn: Elements/input/month
summary: type="month" بيختار شهر وسنة فقط (من غير يوم)، والقيمة بصيغة YYYY-MM. مناسب لتاريخ انتهاء بطاقة أو تقرير شهري. دعمه محدود في فايرفوكس وسفاري على الكمبيوتر.
keywords: input month, شهر, سنة, YYYY-MM, تاريخ انتهاء, تقرير شهري, دعم المتصفحات, fallback
related: input, input-date, input-week, attr-min, attr-max, input-datetime-local
---

## intro

حقل بيختار **شهر وسنة** من غير يوم: تاريخ انتهاء بطاقة، فترة تقرير شهري، شهر الاشتراك. القيمة بصيغة **`YYYY-MM`** (مثلاً `2026-11`) ويقدر تحدد [[attr-min]] و[[attr-max]] بنفس الصيغة.

**تحذير دعم المتصفحات:** `month` شغّال كويس في كروم وإيدج، لكن **مش مدعوم كمنتقي** في فايرفوكس وسفاري على الكمبيوتر (بيتحوّل لحقل نص). عشان كده لو هتستخدمه جهّز **بديل**: حقل نص مع `pattern="[0-9]{4}-[0-9]{2}"` وتلميح بالصيغة. المتصفح اللي مش بيدعم النوع بيعامله كـ `type="text"` تلقائياً، فالفورم ما بيكسرش لكن المستخدم مش هيشوف منتقي.

> [!warn] دعم `month` ضعيف في فايرفوكس وسفاري (سطح المكتب): دايماً حط `pattern` وتلميح بالصيغة `YYYY-MM` كبديل.

## try

```html
<label>شهر الاشتراك: <input id="m" type="month" value="2026-11" pattern="[0-9]{4}-[0-9]{2}" placeholder="YYYY-MM" onchange="o.textContent = 'القيمة: ' + this.value"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="month" name="m" min="2026-01" max="2027-12" value="2026-11" pattern="[0-9]{4}-[0-9]{2}">
```

- القيمة `YYYY-MM`.
- `min` و`max` بنفس الصيغة.
- `pattern` بديل للمتصفحات الغير داعمة.

## use

- تاريخ انتهاء بطاقة.
- تقارير وفواتير شهرية.
- اختيار فترة بدون يوم.

## avoid

- متعتمدش عليه وحده لو جمهورك على سفاري/فايرفوكس.
- متكتبش `value` بصيغة تانية.

## examples

### 1) نطاق شهور
min وmax.

```html
<input type="month" min="2026-01" max="2026-12" value="2026-06">
```

- كل 2026 بس.
- الشهور برّه النطاق بتتمنع.
- نفس صيغة القيمة.

### 2) قراءة السنة والشهر
مثال على split.

```html
<input id="m" type="month" value="2026-11">
<button onclick="const [y, mo] = m.value.split('-'); o.textContent = 'سنة ' + y + ' شهر ' + +mo">اعرض</button>
<p id="o"></p>
```

- `split("-")` بيفصل السنة عن الشهر.
- `+mo` بيحول "11" لـ 11.
- ممكن تتحقق إنها مش فاضية.

### 3) بديل نصي آمن
مثال على pattern.

```html
<input type="month" pattern="[0-9]{4}-(0[1-9]|1[0-2])" placeholder="YYYY-MM" title="اكتب السنة والشهر: 2026-11">
```

- لو المتصفح مش بيدعم هيظهر كحقل نص.
- الـ `pattern` بيفحص الصيغة.
- الـ `title` بيشرح للمستخدم.

### 4) اسم الشهر بالعربي
عرض الشهر.

```html
<input id="m" type="month" value="2026-11" onchange="o.textContent = new Date(this.value + '-01T00:00:00Z').toLocaleDateString('ar-EG', {month:'long', year:'numeric', timeZone:'UTC'})">
<p id="o"></p>
```

- نضيف `-01` علشان نقدر نعمل Date.
- نعرض الشهر والسنة بالعربي.
- مفيد لتأكيد اختيار المستخدم.

## mistakes

### الاعتماد على الدعم الكامل
```html bad
<input type="month" name="exp">
```
```html good
<input type="month" name="exp" pattern="[0-9]{4}-[0-9]{2}" placeholder="YYYY-MM">
```
ليه؟ من غير pattern المتصفح اللي مش بيدعم مش هيفحص.

### صيغة قيمة غلط
```html bad
<input type="month" value="11/2026">
```
```html good
<input type="month" value="2026-11">
```
ليه؟ القيمة لازم `YYYY-MM`.

## a11y

- اكتب الصيغة المطلوبة في label أو نص مجاور.
- وفّر بديل للكتابة اليدوية.
- تأكد من تجربة الكيبورد.

## quiz

### صيغة `value` للشهر؟
- [x] `YYYY-MM`
- [ ] `MM/YYYY`
- [ ] `YYYY-MM-DD`
- [ ] اسم الشهر
ثابتة.

### فين دعمه ضعيف؟
- [x] فايرفوكس وسفاري سطح المكتب
- [ ] كروم
- [ ] إيدج
- [ ] كلهم
بيتحول لنص.

### الحل لو الدعم ناقص؟
- [x] `pattern` وتلميح
- [ ] متستخدمهوش خالص
- [ ] JavaScript فقط
- [ ] استخدم date
بديل نصي مفحوص.

## refs

- [MDN: month](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/month)
- [WHATWG: Month state](https://html.spec.whatwg.org/multipage/input.html#month-state-(type=month))
