---
id: attr-containertiming
kind: attribute
cat: global-attrs
chip: containertiming
title: خاصية توقيت الحاوية
en: HTML containertiming global attribute (experimental)
status: experimental
support: limited
support_note: جزء من Container Timing API التجريبي وبيشتغل في كروم تجريبياً.
size: compact
mdn: Global_attributes/containertiming
summary: خاصية containertiming تجريبية بتعلّم عنصر كجذر حاوية لقياس وقت رسم محتواه الجديد عبر PerformanceContainerTiming. بتاخد اسم نصي يحدد الحاوية في التقارير.
keywords: containertiming, أداء, performance, PerformanceObserver, Container Timing API, حاوية, رسم, LCP, تجريبي
related: attr-containertimingignore, attr-id, section, div, img
---

## intro

بتحب تعرف **قد إيه ياخد قسم من صفحتك عشان يترسم**؟ مثلاً بطل الصفحة (hero) أو قايمة المنتجات. الـ **Container Timing API** (تجريبي) بيدّيك ده لـ«حاويات» إنت بتحددها. الخاصية `containertiming="اسم"` بتعلّم العنصر كـ **جذر حاوية**، وكل رسم جديد جواه بيتحسب. وبتقرا النتايج بـ `PerformanceObserver` من نوع `container`. القيمة هي الاسم اللي هيظهر في التقرير (`identifier`). الرسم داخل العنصر نفسه مش بيتحسب، وبتتوقف التقارير لما المستخدم يتفاعل أو يعمل scroll.

## try

```html nolive
<section containertiming="hero">
  <h1>البطل</h1>
  <p>المحتوى بتاع القسم ده بيتتبّع وقت رسمه.</p>
</section>
<div containertiming="product-list">قايمة المنتجات</div>
```

## syntax

```html nolive
<section containertiming="hero">...</section>
<script>
  new PerformanceObserver(list => list.getEntries().forEach(e => console.log(e.identifier, e.startTime)))
    .observe({ type: 'container', buffered: true });
</script>
```

- `containertiming="اسم"` — **يعلّم** الحاوية باسم.
- بتقراها بـ `PerformanceObserver` نوع `container`.

## use

- قياس سرعة رسم أقسام مهمة.
- تحسين الأداء (performance).

## avoid

- متعتمدش عليها في إنتاج: تجريبية.

## examples

### 1) تعليم حاويتين
hero وlist.

```html nolive
<section containertiming="hero">
  <h1>أهلاً</h1><img src="hero.jpg" alt="">
</section>
<div containertiming="product-list">…</div>
```

- كل حاوية ليها اسم مختلف.
- الأسماء بتظهر في تقرير الأداء.
- الرسم الجديد داخل الحاوية هو اللي بيتحسب.

### 2) قراءة النتائج
مثال على PerformanceObserver.

```html nolive
<script>
  if (PerformanceObserver.supportedEntryTypes.includes('container')) {
    new PerformanceObserver(list => {
      for (const e of list.getEntries()) console.log(e.identifier, e.startTime);
    }).observe({ type: 'container', buffered: true });
  }
</script>
```

- افحص الدعم قبل الاستخدام.
- `identifier` هو قيمة الخاصية.
- `startTime` وقت الرسم.

### 3) الخاصية في DOM
مثال على el.containerTiming.

```html
<div id="c" containertiming="demo"></div>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'القيمة: ' + (document.getElementById('c').containerTiming || document.getElementById('c').getAttribute('containertiming'));</script>
```

- منعكسة في DOM كـ `containerTiming`.
- قد تكون `undefined` في المتصفحات غير الداعمة.
- استخدم `getAttribute` كبديل.

## mistakes

### تسمية متكررة
```html bad
<div containertiming="box"></div><div containertiming="box"></div>
```
```html good
<div containertiming="box-1"></div><div containertiming="box-2"></div>
```
ليه؟ الأسماء الفريدة بتسهل قراءة التقارير.

## a11y

- خاصية أداء فقط ومالهاش تأثير على الإتاحة.
- تحسين السرعة بيفيد كل المستخدمين.

## quiz

### بتستخدم containertiming لـ؟
- [x] قياس وقت رسم حاوية
- [ ] تنسيق
- [ ] إخفاء
- [ ] ربط
Container Timing API.

### بتقرا النتايج بـ؟
- [x] `PerformanceObserver`
- [ ] `fetch`
- [ ] `XMLHttpRequest`
- [ ] `localStorage`
نوع container.

## refs

- [MDN: containertiming](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/containertiming)
- [MDN: PerformanceContainerTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceContainerTiming)
