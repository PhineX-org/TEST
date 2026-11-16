---
id: attr-nonce
kind: attribute
cat: global-attrs
chip: nonce
title: خاصية رقم الاستخدام الواحد
en: HTML nonce global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/nonce
summary: خاصية nonce بتحط قيمة عشوائية فريدة على script وstyle عشان سياسة أمان المحتوى (CSP) تسمح بيهم بس. بتتغيّر مع كل طلب، ومش بتتخزّن ولا بتتكرر.
keywords: nonce, CSP, Content-Security-Policy, أمان, XSS, script nonce, style nonce, قيمة عشوائية, سياسة أمان
related: script, style, attr-id, template, link
---

## intro

**CSP (Content Security Policy)** سياسة أمان بتحمي موقعك من هجمات XSS: بتقول للمتصفح «شغّل بس الأكواد اللي مسموحة». ومنع كل الـ inline scripts مفيد أمنياً لكنه صعب عملياً. الـ **nonce** (اختصار number used once) حل وسط: السيرفر بيولّد **قيمة عشوائية جديدة مع كل طلب**، بيحطها في الهيدر `script-src 'nonce-abc123'` **وكمان** على كل `<script nonce="abc123">` الشرعية. المتصفح بيشغّل بس السكريبتات اللي ليها نفس القيمة، وأي سكريبت بيتحقن من مهاجم (من غير nonce) بيتحجب.

**أهم قاعدة:** القيمة تتولّد **جديدة مع كل طلب**، عشوائية وصعبة التخمين. لو ثابتة تفقد فايدتها.

## try

```html nolive
<!-- مثال توضيحي (مش بيتنفّذ هنا) -->
<!-- Header: Content-Security-Policy: script-src 'nonce-r4nd0m123' -->
<script nonce="r4nd0m123">console.log('مسموح');</script>
<script>console.log('محجوب بدون nonce');</script>
```

## syntax

```html nolive
<script nonce="r4nd0m123">...</script>
<style nonce="r4nd0m123">...</style>
<!-- Content-Security-Policy: script-src 'nonce-r4nd0m123' -->
```

- `nonce="…"` — **قيمة عشوائية** لكل طلب.
- نفس القيمة في هيدر CSP وفي العنصر.

## use

- السماح بـ inline scripts معينة تحت CSP.
- حماية من XSS مع كود inline ضروري.

## avoid

- متستخدمش قيمة ثابتة أو قابلة للتخمين.
- متكتبش nonce في الـ HTML بالجافاسكربت بدون حذر.

## examples

### 1) هيدر CSP مع nonce
من جهة السيرفر.

```html nolive
<!-- السيرفر بيولّد nonce جديد لكل طلب -->
<!-- Content-Security-Policy: script-src 'nonce-2726c7f26c' 'strict-dynamic' -->
<script nonce="2726c7f26c" src="/app.js"></script>
```

- القيمة بتتولّد لكل استجابة.
- السكريبتات الشرعية بس هي اللي ليها الـ nonce.
- `strict-dynamic` بتسمح للسكريبت الموثوق يحمّل غيره.

### 2) nonce على style
للـ CSS الـ inline.

```html nolive
<!-- Content-Security-Policy: style-src 'nonce-abc123' -->
<style nonce="abc123">body { margin: 0 }</style>
```

- الـ nonce بيشتغل مع `<style>` كمان.
- بيمنع حقن CSS ضار.
- ممكن مع `<link>` برضو.

### 3) قراءة nonce بجافاسكربت
مثال على el.nonce.

```html
<script id="s" nonce="demo123">/* x */</script>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'nonce = ' + (document.getElementById('s').nonce || '(مخفية)');</script>
```

- المتصفح بيخفي الخاصية من DOM للحماية، لكن `el.nonce` بتقراها.
- ممكن ترجع فاضي حسب المتصفح.
- متنسخهاش لعناصر جاية من مصدر غير موثوق.

## mistakes

### nonce ثابتة
```html bad
<script nonce="12345">...</script>   <!-- نفس القيمة كل مرة -->
```
```html good
<script nonce="<%= randomPerRequest %>">...</script>
```
ليه؟ القيمة الثابتة بتخلي المهاجم يكرّرها. لازم عشوائية لكل طلب.

## a11y

- خاصية أمان مالهاش تأثير مباشر على الإتاحة.
- الأمان الجيد جزء من تجربة مستخدم موثوقة.

## quiz

### كل قد إيه بتتغيّر قيمة nonce؟
- [x] مع كل طلب
- [ ] مرة في السنة
- [ ] مرة واحدة
- [ ] يوم
عشوائية لكل استجابة.

### بتستخدم nonce مع؟
- [x] CSP لتأمين inline scripts
- [ ] تنسيق
- [ ] الصور
- [ ] الروابط
XSS.

## refs

- [MDN: nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/nonce)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
