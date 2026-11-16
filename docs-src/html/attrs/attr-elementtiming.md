---
id: attr-elementtiming
kind: attribute
cat: attrs
chip: elementtiming
title: خاصية قياس العرض
en: HTML elementtiming attribute
status: stable
support: all
size: compact
mdn: Attributes/elementtiming
summary: خاصية elementtiming بتخلّي المتصفح يقيس وقت ظهور عنصر (صورة أو نص) عن طريق Element Timing API. بتحط اسماً للعنصر وبتقراه PerformanceObserver لتحسين الأداء.
keywords: elementtiming, Element Timing API, performance, PerformanceObserver, LCP, img, قياس الأداء, renderTime, تحسين السرعة
related: img, attr-fetchpriority, attr-src, p, h1
---

## intro

عايز تعرف **امتى بالظبط ظهرت** صورة الـ Hero أو عنوان الصفحة للمستخدم؟ الخاصية `elementtiming` (جزء من **Element Timing API**) بتخلّي المتصفح **يسجّل وقت عرض** عنصر معيّن. بتحط اسم اختياري (`elementtiming="hero"`) على [[img]] أو عناصر النص (`h1` و`p`…) أو الفيديو. وبعدين في JavaScript بتراقبها بـ **`PerformanceObserver`** من نوع `element` فتجيب `renderTime` و`loadTime` لكل عنصر. مفيدة في **مراقبة الأداء الحقيقي (RUM)** وقياس التحسينات. الدعم في متصفحات Chromium فقط تقريباً.

## try

```html
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;img src="hero.jpg" alt="…" elementtiming="hero"&gt;
&lt;script&gt;
new PerformanceObserver(list =&gt; {
  for (const e of list.getEntries()) console.log(e.identifier, e.renderTime);
}).observe({ type: 'element', buffered: true });
&lt;/script&gt;</pre>
```

## syntax

```html nolive
<img src="hero.jpg" alt="" elementtiming="hero">
<h1 elementtiming="title">عنوان</h1>
```

- `elementtiming="اسم"` — اسم القياس.
- القراءة بـ `PerformanceObserver` نوع `element`.
- للمتصفحات المبنية على Chromium.

## use

- قياس ظهور الصورة الرئيسية.
- مراقبة الأداء للمستخدمين الفعليين.

## avoid

- متحطش اسم مكرر لعناصر مختلفة بدون داعي.

## examples

### 1) قياس صورة
مثال على img.

```html nolive
<img src="hero.jpg" alt="" elementtiming="hero">
```

- `identifier` في الـ entry = `hero`.
- بنقرا `renderTime`.
- بنقارنه قبل وبعد التحسين.

### 2) قياس عنوان
مثال على h1.

```html nolive
<h1 elementtiming="main-title">عنوان الصفحة</h1>
```

- بيشتغل على عناصر النص.
- أول عرض للنص بيتسجل.
- مفيد لقياس الخطوط.

### 3) المراقب
مثال على PerformanceObserver.

```html nolive
new PerformanceObserver(l => l.getEntries().forEach(e => console.log(e.identifier, e.renderTime)))
  .observe({ type: 'element', buffered: true });
```

- `buffered:true` بيجيب القياسات السابقة.
- ابعتها لنظام تحليلات.
- اختبر الدعم أولاً.

## mistakes

### نسيان المراقب
```html bad
<img elementtiming="hero">  <!-- مفيش قراءة -->
```
```html good
<!-- ضيف PerformanceObserver لقراءة القياس -->
```
ليه؟ الخاصية وحدها مبتطبعش حاجة.

## a11y

- مالهاش علاقة بالإتاحة.
- تحسين الأداء بيفيد الجميع.

## quiz

### القياس بيتقرا بـ؟
- [x] `PerformanceObserver`
- [ ] `console.time`
- [ ] `Date.now`
- [ ] `fetch`
نوع element.

### الدعم؟
- [x] Chromium تقريباً
- [ ] كل المتصفحات
- [ ] سفاري فقط
- [ ] فايرفوكس فقط
تحقق قبل الاعتماد.

## refs

- [MDN: elementtiming](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/elementtiming)
- [MDN: Element Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming)
