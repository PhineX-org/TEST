---
id: progress
kind: element
cat: interactive
tag: progress
title: شريط التقدّم (progress)
en: HTML progress element
status: stable
display: inline-block
void: no
support: all
summary: شريط بيعرض تقدّم مهمة: رفع ملف، تحميل، خطوات تسجيل. بياخد value وmax، ومن غير value بيبقى حالة غير محددة (loading). بيتقري لقارئ الشاشة، وبيتنسّق بـ CSS.
keywords: progress, شريط تقدم, progress bar, value, max, indeterminate, تحميل, رفع, loading, نسبة, مهمة
related: meter, label, output, button
---

## intro

الـ `<progress>` (**تقدّم**) هو **شريط** بيوضّح إن مهمة شغّالة ووصلت لحد فين: رفع ملف 60%، خطوة 3 من 5، تحميل بيانات. بياخد خاصيتين: **`value`** (المنجز لحد دلوقتي) و**`max`** (الكل، الافتراضي 1). يعني `value="30" max="100"` = 30%.

لو **مفيش `value`**، الشريط بيبقى في حالة **غير محددة (Indeterminate)**: بيظهر بحركة مستمرة (animation) معناها «بنشتغل ومش عارفين كام فاضل». ده مناسب للتحميل لما مدته مجهولة.

وفرقه عن [[meter]]: **`progress` لمهمة بتتقدّم عبر الزمن** (رفع، تحميل)، أما **`meter` لقيمة قياس ثابتة في مدى** (استهلاك القرص 70%، تقييم 4 من 5). متستخدمهمش بالتبادل.

والنص جواه (`<progress>60%</progress>`) هو **احتياطي** للمتصفحات القديمة جداً، وقارئ الشاشة بيعلن النسبة تلقائياً. وبيتنسّق بـ CSS (`::-webkit-progress-bar` و`::-moz-progress-bar`) لو عايز شكل خاص.

> [!analogy] `<progress>` زي **شريط تحميل الفيلم**: بيمشي من الأول للآخر مع الوقت. أما `<meter>` فزي **عداد البنزين**: بيوضّح المستوى الحالي مش تقدّم.

> [!key] `<progress value max>` لمهمة بتتقدم. من غير `value` = غير محدد. للقياس استخدم `<meter>`.

## try

غيّر `value`.

```html
<label>رفع الملف: <progress value="65" max="100">65%</progress></label>
```

## syntax

```html nolive
<label for="p">التقدّم</label>
<progress id="p" value="40" max="100">40%</progress>
```

- `<progress ...>` — **الوسم الافتتاحي**.
- `value` — **المنجز**.
- `max` — **الكل** (افتراضي 1).
- النص — **احتياطي**.
- `</progress>` — **الوسم الختامي** إجباري.

## use

- لرفع الملفات وتحميلها.
- لخطوات متعددة (Wizard).
- لتقدّم دورة أو درس.
- لحالة «جاري التحميل» (غير محدد).

## avoid

- متستخدمهوش لقياس ثابت (مساحة، درجة): `<meter>`.
- متنساش وصف نصي (label).
- متحطش `value` أكبر من `max`.

## attributes

### value
**القيمة الحالية** (من 0 لـ `max`). لو مش موجودة: حالة غير محددة.

### max
**القيمة القصوى** (الافتراضي 1). لازم أكبر من 0.

```html nolive
<progress value="3" max="5">3 من 5</progress>
```

## examples

### 1) شريط بنسبة
الأساسي.

```html
<progress value="70" max="100" style="width:100%">70%</progress>
<p>70% منجز</p>
```

- `value/max` بيحسبوا النسبة تلقائياً.
- الشكل الافتراضي من المتصفح.
- اكتب النسبة كنص مجاور للمستخدم.

### 2) حالة غير محددة
بدون value.

```html
<label>جاري التحميل… <progress></progress></label>
```

- من غير `value` الشريط بيعمل حركة مستمرة.
- مناسب لما مدة العملية مجهولة.
- لما تعرف النسبة ضيف `value`.

### 3) تقدّم بالجافاسكربت
محاكاة.

```html
<progress id="p" value="0" max="100" style="width:100%"></progress>
<p id="t">0%</p>
<button onclick="
  const p = document.getElementById('p'); p.value = 0;
  const id = setInterval(() => {
    p.value += 10;
    document.getElementById('t').textContent = p.value + '%';
    if (p.value >= 100) clearInterval(id);
  }, 200);
">ابدأ</button>
```

- `progress.value` قابلة للكتابة.
- بنحدّث الشريط والنص كل 200ms.
- في الشغل الحقيقي القيمة بتيجي من حدث `progress` في الـ XHR أو `fetch` بالـ streams.

### 4) تنسيق مخصص
CSS.

```html
<style>
  progress { appearance: none; width: 100%; height: 16px; border-radius: 99px; overflow: hidden; }
  progress::-webkit-progress-bar { background: #e2e8f0; }
  progress::-webkit-progress-value { background: linear-gradient(90deg,#39ff14,#0ea5e9); border-radius: 99px; }
  progress::-moz-progress-bar { background: linear-gradient(90deg,#39ff14,#0ea5e9); }
</style>
<progress value="55" max="100"></progress>
```

- `appearance: none` بيشيل الشكل الافتراضي.
- كل متصفح له pseudo-elements لتنسيق الشريط والقيمة.
- لازم تكتب القاعدتين (WebKit وMozilla).

### 5) خطوات تسجيل
3 من 5.

```html
<p id="lbl">الخطوة 1 من 5</p>
<progress id="st" value="1" max="5" aria-labelledby="lbl" style="width:100%"></progress>
<button onclick="
  const p = document.getElementById('st');
  p.value = p.value % 5 + 1;
  document.getElementById('lbl').textContent = 'الخطوة ' + p.value + ' من 5';
">التالي</button>
```

- `max="5"` و`value` رقم الخطوة الحالية: الشريط بيتحسب لوحده.
- `aria-labelledby` بيربطه بنص الخطوة عشان قارئ الشاشة يعلن «الخطوة 1 من 5».
- لما نوصل 5 بنرجع لـ 1 (للتجربة بس).
- ده الأنسب لمعالجات متعددة الخطوات (Wizard).

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content** (من غير `<progress>` متداخل).
- closing: الوسم الختامي `</progress>` إجباري.
- role: `progressbar`.
- dom: `HTMLProgressElement`.
- layout: `display: inline-block`.

## mistakes

### progress لقياس ثابت
```html bad
<progress value="7" max="10"></progress> تقييم
```
```html good
<meter value="7" max="10">7 من 10</meter>
```
ليه؟ التقييم قياس ثابت مش مهمة بتتقدم.

### value أكبر من max
```html bad
<progress value="150" max="100"></progress>
```
```html good
<progress value="100" max="100"></progress>
```
ليه؟ المتصفح بيتجاهل القيمة غير الصالحة.

## a11y

- حط `<label>` أو `aria-label` يوضح الشريط بيقيس إيه.
- قارئ الشاشة بيعلن النسبة تلقائياً.
- لو بتتحدّث بسرعة، متعلنش كل تغيير.

## tips

- `aria-busy="true"` على المنطقة اللي بتتحمّل.
- للـ indeterminate متنساش وصف نصي («جاري التحميل»).

## quiz

### إيه اللي بيحصل لو شلت `value`؟
- [ ] بيتخفى
- [x] بيبقى غير محدد وبيعمل حركة
- [ ] بيرجع صفر
- [ ] بيحصل خطأ
مناسب لتحميل مدته مجهولة.

### الفرق بين `<progress>` و`<meter>`؟
- [x] progress لتقدّم مهمة، وmeter لقياس ثابت
- [ ] مفيش فرق
- [ ] meter أسرع
- [ ] progress للألوان
حسب المعنى.

### إيه الدور الإتاحي لـ `<progress>`؟
- [ ] `button`
- [x] `progressbar`
- [ ] `slider`
- [ ] `status`
قارئ الشاشة بيعلنه كشريط تقدّم ومعاه النسبة.

## refs

- [MDN: progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress)
- [WHATWG: The progress element](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element)
