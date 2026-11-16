---
id: input-week
kind: inputtype
cat: input-types
chip: type="week"
title: حقل الأسبوع
en: <input type="week">
status: stable
support: all
mdn: Elements/input/week
summary: type="week" بيختار رقم أسبوع في السنة (ISO 8601)، والقيمة بصيغة YYYY-Www مثل 2026-W45. نادر الاستخدام ودعمه محدود في فايرفوكس وسفاري على الكمبيوتر.
keywords: input week, أسبوع, ISO week, YYYY-Www, رقم الأسبوع, جدول أسبوعي, دعم المتصفحات
related: input, input-month, input-date, attr-min, attr-max, attr-step
---

## intro

حقل بيختار **أسبوع من السنة** حسب معيار **ISO 8601**: السنة + رقم الأسبوع (1 إلى 52 أو 53). القيمة بصيغة **`YYYY-Www`** (مثلاً `2026-W45`: الأسبوع 45 من 2026). الأسبوع في ISO بيبدأ يوم **الإثنين**، وأول أسبوع في السنة هو اللي فيه أول يوم خميس.

ده من أقل أنواع input استخداماً، ومناسب لحاجات زي **جداول أسبوعية** أو **تقارير الأسبوع** في الشركات اللي بتعتمد ترقيم ISO. ودعمه زي `month`: **شغّال في كروم وإيدج بس**، وفي فايرفوكس وسفاري على الكمبيوتر بيتحول لحقل نص. فلازم تحط [[attr-pattern]] بديل (`[0-9]{4}-W[0-9]{2}`) وتلميح بالصيغة. ولو الجمهور بتاعك بيفكر بتواريخ مش بأرقام أسابيع، استخدم [[input-date]] أحسن.

> [!warn] دعم `week` ضعيف مثل `month`. وكمان الناس مش متعودة على رقم الأسبوع: فكّر لو [[input-date]] أنسب لجمهورك.

## try

```html
<label>أسبوع التقرير: <input id="w" type="week" value="2026-W45" pattern="[0-9]{4}-W[0-9]{2}" placeholder="YYYY-Www" onchange="o.textContent = 'القيمة: ' + this.value"></label>
<p id="o"></p>
```

## syntax

```html nolive
<input type="week" name="w" min="2026-W01" max="2026-W52" value="2026-W45" pattern="[0-9]{4}-W[0-9]{2}">
```

- القيمة `YYYY-Www`.
- الأسبوع يبدأ الإثنين (ISO 8601).
- `pattern` بديل للمتصفحات الغير داعمة.

## use

- جداول وتقارير أسبوعية.
- تخطيط أسبوعي.
- أنظمة بتعتمد ترقيم ISO.

## avoid

- متستخدمهوش لو جمهورك مش فاهم أرقام الأسابيع.
- متعتمدش عليه من غير بديل نصي.

## examples

### 1) نطاق أسابيع
min وmax.

```html
<input type="week" min="2026-W01" max="2026-W52" value="2026-W20">
```

- كل أسابيع 2026.
- القيم برّه النطاق مرفوضة.
- بنفس الصيغة.

### 2) قراءة السنة والأسبوع
مثال على split.

```html
<input id="w" type="week" value="2026-W45">
<button onclick="const [y, k] = w.value.split('-W'); o.textContent = 'سنة ' + y + ' أسبوع ' + +k">اعرض</button>
<p id="o"></p>
```

- `split("-W")` بيفصل الجزأين.
- الرقم بيتحول بـ `+k`.
- تقدر تعمل منه تاريخ بحساب بسيط.

### 3) بديل نصي
مثال على pattern.

```html
<input type="week" pattern="[0-9]{4}-W(0[1-9]|[1-4][0-9]|5[0-3])" placeholder="2026-W45" title="الصيغة: السنة-Wرقم الأسبوع">
```

- لو المتصفح مش بيدعم هيبقى نص.
- الـ `pattern` بيفحص رقم الأسبوع.
- التلميح بيشرح الصيغة.

### 4) الأسبوع الحالي
حساب بالكود.

```html
<input id="w" type="week">
<script>
  const d = new Date(); const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const n = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - n);
  const y = t.getUTCFullYear(); const k = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
  w.value = y + '-W' + String(k).padStart(2, '0');
</script>
```

- حساب رقم أسبوع ISO بالكود.
- مش بسيط: عشان كده الحقل مفيد.
- استخدم مكتبة لو محتاج دقة أعلى.

## mistakes

### صيغة غلط
```html bad
<input type="week" value="2026-45">
```
```html good
<input type="week" value="2026-W45">
```
ليه؟ لازم حرف W قبل رقم الأسبوع.

### من غير بديل
```html bad
<input type="week" name="w">
```
```html good
<input type="week" name="w" pattern="[0-9]{4}-W[0-9]{2}" placeholder="2026-W45">
```
ليه؟ سفاري وفايرفوكس بيعاملوه كنص.

## a11y

- اشرح الصيغة والمقصود برقم الأسبوع.
- وفّر بديل للتواريخ العادية.
- اتأكد من الكيبورد.

## quiz

### صيغة `value` للأسبوع؟
- [x] `YYYY-Www`
- [ ] `YYYY-WW`
- [ ] `W-YYYY`
- [ ] رقم فقط
مثال: 2026-W45.

### أول يوم في الأسبوع ISO؟
- [x] الإثنين
- [ ] السبت
- [ ] الأحد
- [ ] الجمعة
معيار ISO 8601.

### الدعم؟
- [x] كروم وإيدج فقط تقريباً
- [ ] كل المتصفحات
- [ ] لا أحد
- [ ] سفاري فقط
الباقي بيتحول لنص.

## refs

- [MDN: week](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/week)
- [WHATWG: Week state](https://html.spec.whatwg.org/multipage/input.html#week-state-(type=week))
