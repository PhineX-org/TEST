---
id: attr-rel
kind: attribute
cat: attrs
chip: rel
title: خاصية العلاقة
en: HTML rel attribute
status: stable
support: all
mdn: Attributes/rel
summary: خاصية rel بتحدد علاقة الرابط أو الملف المربوط بالصفحة: stylesheet, icon, preload, canonical، ومع a: noopener وnoreferrer وnofollow وsponsored وugc.
keywords: rel, relationship, stylesheet, icon, preload, canonical, noopener, noreferrer, nofollow, sponsored, ugc, prefetch, SEO, link
related: a, link, area, attr-href, attr-target, attr-crossorigin
---

## intro

الخاصية `rel` (اختصار relationship = العلاقة) بتشرح **علاقة الشيء المربوط بالصفحة الحالية**. بتتكتب على [[a]] و[[link]] و[[area]]، وقيمتها كلمة أو أكتر مفصولة بمسافة.

**على [[link]] (في `<head>`):** `stylesheet` (ملف CSS)، `icon` (أيقونة الصفحة)، `preload` (حمّل الملف بدري)، `prefetch` (للصفحة الجاية)، `preconnect` (افتح الاتصال بسيرفر بدري)، `canonical` (الرابط الأساسي للصفحة لمحركات البحث)، `alternate` (نسخة بلغة أو صيغة تانية)، `manifest` (تطبيق ويب).

**على [[a]] (الروابط):** `noopener` (امنع الصفحة المفتوحة من التحكم فيك)، `noreferrer` (متبعتش مصدر الزيارة)، **`nofollow`** (محركات البحث متتبعش الرابط)، **`sponsored`** (رابط إعلان أو شراكة مدفوعة)، **`ugc`** (محتوى كتبه مستخدمين، زي التعليقات).

أهم قاعدة عملية: مع [[attr-target]] `_blank` اكتب `rel="noopener noreferrer"`. ومع روابط الإعلانات اكتب `sponsored`، ومع روابط التعليقات `ugc nofollow`.

## try

```html
<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">رابط خارجي آمن</a></p>
<p><a href="https://ad.example.com" rel="sponsored nofollow">إعلان مدفوع</a></p>
<p style="color:#64748b">ومن غير rel في الـ head: <code dir="ltr">&lt;link rel="stylesheet" href="style.css"&gt;</code></p>
```

## syntax

```html nolive
<link rel="stylesheet" href="style.css">
<link rel="icon" href="favicon.ico">
<a href="…" target="_blank" rel="noopener noreferrer">رابط</a>
<a href="…" rel="sponsored nofollow">إعلان</a>
```

- `rel="..."` — علاقة (كلمة أو أكتر بمسافة).
- على `link`: stylesheet وicon وpreload وcanonical.
- على `a`: noopener وnoreferrer وnofollow وsponsored وugc.

## use

- ربط CSS وأيقونة وخطوط (`link`).
- تحسين الأداء (`preload`/`preconnect`).
- أمان الروابط الخارجية (`noopener`).
- SEO: `canonical` و`nofollow` و`sponsored`.

## avoid

- متنساش `rel="stylesheet"` مع `<link>` للـ CSS.
- متحطش `nofollow` على روابطك الداخلية المهمة.

## section: أهم القيم

- **على link:** `stylesheet` `icon` `preload` `prefetch` `preconnect` `canonical` `alternate` `manifest`.
- **على a:** `noopener` `noreferrer` `nofollow` `sponsored` `ugc` `external` `author`.
- **مجتمعة:** `rel="noopener noreferrer nofollow"`.

## examples

### 1) الصفحة الأساسية
مثال على canonical.

```html nolive
<!-- في <head> -->
<link rel="canonical" href="https://example.com/page">
```

- بتقول لجوجل «ده الرابط الأساسي».
- بتمنع مشكلة المحتوى المكرر.
- حطها في كل صفحة.

### 2) تحميل مبكر
preload وpreconnect.

```html nolive
<!-- في <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="hero.webp" as="image">
```

- `preconnect` بيفتح الاتصال بدري.
- `preload` بيحمّل مورد مهم الأول.
- `as` لازم مع preload.

### 3) روابط مستخدمين
مثال على ugc.

```html
<a href="https://user-site.com" rel="ugc nofollow noopener" target="_blank">موقع صاحب التعليق</a>
```

- `ugc` = من المستخدمين.
- `nofollow` ميدّيش سمعة.
- القيم تتجمّع بمسافة.

### 4) قراءة rel بالجافاسكربت
مثال على relList.

```html
<a id="a" href="#" rel="noopener noreferrer">رابط</a>
<script>document.write('<p>' + [...a.relList].join(' + ') + ' | فيه noopener؟ ' + a.relList.contains('noopener') + '</p>')</script>
```

- `relList` شبه قايمة.
- `contains` و`add` و`remove`.
- أسهل من التعامل مع نص.

## mistakes

### link من غير rel
```html bad
<link href="style.css">
```
```html good
<link rel="stylesheet" href="style.css">
```
ليه؟ من غير rel المتصفح مبيعرفش وظيفته.

### _blank بدون rel
```html bad
<a href="https://x.com" target="_blank">رابط</a>
```
```html good
<a href="https://x.com" target="_blank" rel="noopener noreferrer">رابط</a>
```
ليه؟ أمان وخصوصية.

## a11y

- rel مبيأثرش مباشرةً على الإتاحة.
- لكن `noopener` بيحمي المستخدم من التلاعب.
- اذكر في نص الرابط إنه بيفتح خارجياً.

## quiz

### لملف CSS؟
- [x] `rel="stylesheet"`
- [ ] `rel="css"`
- [ ] `rel="style"`
- [ ] `rel="link"`
على `link`.

### لرابط إعلان مدفوع؟
- [x] `sponsored`
- [ ] `ad`
- [ ] `paid`
- [ ] `noads`
بتنبّه محركات البحث.

### الصفحة الأساسية؟
- [x] `canonical`
- [ ] `main`
- [ ] `primary`
- [ ] `root`
لمنع التكرار.

## refs

- [MDN: rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel)
- [Google: rel attributes](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
