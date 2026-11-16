---
id: attr-fetchpriority
kind: attribute
cat: attrs
chip: fetchpriority
title: خاصية أولوية التحميل
en: HTML fetchpriority attribute
status: stable
support: all
size: compact
mdn: Attributes/fetchpriority
summary: خاصية fetchpriority بتقترح على المتصفح أولوية تحميل مورد (high أو low أو auto) على img وlink وscript وiframe. مفيدة لصورة الـ LCP الرئيسية لتحسين السرعة.
keywords: fetchpriority, high, low, auto, LCP, تحسين الأداء, img, preload, loading, أولوية, Core Web Vitals
related: img, link, script, iframe, attr-src, attr-rel
---

## intro

المتصفح بيحدد لوحده أي مورد (صورة، سكربت) ياخد **أولوية أعلى** في التحميل. أحياناً بيغلط: يحمّل صورة صغيرة في الـ footer بنفس أولوية صورة الـ **Hero** الكبيرة. الخاصية `fetchpriority` بتديك **اقتراح** (مش أمر) للمتصفح: **`high`** (حمّله بدري)، **`low`** (مش مهم)، **`auto`** (الافتراضي). بتتكتب على [[img]] و[[link]] (مع `preload`) و[[script]] و[[iframe]]. الاستخدام الأشهر: `fetchpriority="high"` على **صورة الـ LCP** (أكبر عنصر ظاهر أول ما الصفحة تفتح) فتتحسّن سرعة الصفحة (Core Web Vitals). وماتستخدمهاش على كتير حاجات: لو كله high يبقى مفيش أولوية.

## try

```html
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;img src="hero.jpg" alt="…" fetchpriority="high"&gt;
&lt;img src="footer-logo.png" alt="…" fetchpriority="low" loading="lazy"&gt;</pre>
```

## syntax

```html nolive
<img src="hero.jpg" alt="" fetchpriority="high">
<link rel="preload" as="image" href="hero.jpg" fetchpriority="high">
```

- `high` — أولوية أعلى.
- `low` — أقل.
- `auto` — الافتراضي.

## use

- صورة الـ LCP الرئيسية: `high`.
- صور أسفل الصفحة: `low`.

## avoid

- متحطش `high` على كتير عناصر.

## examples

### 1) صورة LCP
مثال على high.

```html nolive
<img src="hero.jpg" alt="عنوان الصفحة" fetchpriority="high" width="1200" height="600">
```

- أكبر صورة ظاهرة أول ما الصفحة تفتح.
- متحطش `loading="lazy"` معاها.
- حدّد `width` و`height`.

### 2) صورة أقل أهمية
مثال على low.

```html nolive
<img src="avatar.jpg" alt="" fetchpriority="low" loading="lazy">
```

- مش مهمة للعرض الأول.
- مع `lazy` بيوفر باندويث.
- الأولوية اقتراح مش أمر.

### 3) preload
مثال على link.

```html nolive
<link rel="preload" as="image" href="hero.jpg" fetchpriority="high">
```

- بتحمّل الصورة بدري قبل الـ CSS.
- مع `as="image"`.
- استخدمها بحذر.

## mistakes

### كله high
```html bad
<img fetchpriority="high"><img fetchpriority="high"><img fetchpriority="high">
```
```html good
<img fetchpriority="high"><img><img fetchpriority="low">
```
ليه؟ لو كله high مفيش تمييز.

## a11y

- مالهاش تأثير مباشر على الإتاحة.
- تحميل أسرع بيفيد المستخدمين على اتصال بطيء.

## quiz

### هل هي أمر للمتصفح؟
- [x] لأ، اقتراح
- [ ] أيوه
- [ ] ملزمة
- [ ] بس في كروم
المتصفح ممكن يتجاهلها.

### تستخدم لـ؟
- [x] صورة LCP
- [ ] كل الصور
- [ ] الخطوط فقط
- [ ] الفيديو فقط
الصورة الأهم.

## refs

- [MDN: fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority)
- [web.dev: Fetch Priority](https://web.dev/articles/fetch-priority)
