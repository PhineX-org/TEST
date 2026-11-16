---
id: attr-href
kind: attribute
cat: attrs
chip: href
title: خاصية الرابط
en: HTML href attribute
status: stable
support: all
mdn: Elements/a#href
summary: خاصية href بتحدد وجهة الرابط في a وarea وlink وbase: صفحة، ملف، قسم داخل الصفحة (#id)، أو mailto وtel. من غيرها العنصر a مش بيبقى رابط حقيقي.
keywords: href, رابط, hyperlink, a, anchor, mailto, tel, #id, URL مطلق, URL نسبي, link, اتجاه
related: a, link, area, base, attr-target, attr-rel
---

## intro

`href` اختصار «Hypertext REFerence»، وهي **أهم خاصية في الويب**: هي اللي بتقول للمتصفح «لما يضغط، روح فين؟». من غيرها عنصر [[a]] بيبقى مجرد نص من غير سلوك (مش بياخد فوكس بالتاب ومش بيتعامل كرابط). قيمتها بتتحدد بـ **URL**، وله أشكال:

**مطلق** (فيه البروتوكول والدومين): `https://example.com/page`. **نسبي** (بالنسبة لمكان الصفحة الحالية): `about.html` أو `/courses/html` أو `../img/a.png`. **قسم داخل نفس الصفحة**: `#section2` (بيروح للعنصر اللي `id="section2"`). وفي بروتوكولات خاصة: `mailto:a@b.com` يفتح برنامج الإيميل، `tel:+201012345678` يفتح الاتصال.

الخاصية بتشتغل كمان على [[link]] (ربط ملفات CSS وأيقونات) و[[area]] (مناطق في خريطة صورة) و[[base]] (الأساس لكل الروابط النسبية). وبتتكامل مع [[attr-target]] (فين يفتح) و[[attr-rel]] (علاقة الرابط).

## try

```html
<p><a href="https://developer.mozilla.org" target="_blank" rel="noopener">رابط خارجي</a> —
<a href="#down">رابط لقسم تحت</a> —
<a href="mailto:hello@example.com">ابعتلنا إيميل</a></p>
<div style="height:40px"></div>
<h4 id="down">القسم اللي تحت ✅</h4>
```

## syntax

```html nolive
<a href="https://example.com">مطلق</a>
<a href="/courses/html">نسبي من الجذر</a>
<a href="#section2">قسم في الصفحة</a>
<a href="mailto:a@b.com">إيميل</a>
```

- `https://…` — مطلق، `/path` — من جذر الموقع، `file.html` — نسبي.
- `#id` — قسم داخل الصفحة.
- `mailto:` و`tel:` — بروتوكولات خاصة.

## use

- الربط بين صفحات الموقع وصفحات خارجية.
- روابط داخلية لأقسام الصفحة (فهرس).
- تنزيل ملف أو فتح تطبيق (`mailto`، `tel`).
- ربط ملفات CSS في `<link>`.

## avoid

- متستخدمش `href="#"` كرابط وهمي لزرار: استخدم `<button>`.
- متستخدمش `javascript:` في href: سيء للأمان والإتاحة.

## examples

### 1) رابط داخلي (فهرس)
مثال على #id.

```html
<nav><a href="#a">الدرس 1</a> · <a href="#b">الدرس 2</a></nav>
<div style="height:60px"></div>
<h4 id="a">الدرس 1</h4>
<div style="height:60px"></div>
<h4 id="b">الدرس 2</h4>
```

- `#a` بيروح للعنصر اللي `id="a"`.
- مفيش تحميل صفحة جديدة.
- مفيد للفهرس والـ "العودة لأعلى".

### 2) mailto وtel
بروتوكولات خاصة.

```html
<a href="mailto:hi@example.com?subject=أهلاً&body=مرحبا">راسلنا</a><br>
<a href="tel:+201012345678">اتصل بينا</a>
```

- `?subject=` و`&body=` بتجهّز الإيميل.
- `tel:` على الموبايل بيفتح الاتصال.
- على الكمبيوتر ممكن مايعملش حاجة.

### 3) نسبي مقابل مطلق
مقارنة.

```html
<ul dir="ltr">
  <li><code>about.html</code> ← نفس المجلد</li>
  <li><code>/about.html</code> ← من جذر الموقع</li>
  <li><code>../about.html</code> ← مجلد فوق</li>
  <li><code>https://site.com/about.html</code> ← مطلق</li>
</ul>
```

- النسبي بيسهّل نقل الموقع.
- المطلق لمواقع تانية.
- ابدأ بـ `/` لو عايز من الجذر.

### 4) قراءة href بالجافاسكربت
مثال على el.href.

```html
<a id="l" href="/docs/guide">الدليل</a>
<script>document.write('<p dir="ltr">' + l.getAttribute('href') + ' → ' + l.href + '</p>')</script>
```

- `getAttribute` بيرجّع اللي كتبته.
- `el.href` بيرجّع URL مطلق كامل.
- اختار حسب احتياجك.

### 5) ربط ملف CSS
مثال على link.

```html nolive
<!-- في <head> -->
<link rel="stylesheet" href="style.css">
```

- `href` هنا مكان الملف.
- مع `rel` بتحدد نوع العلاقة.
- نفس الخاصية، وظيفة مختلفة.

## mistakes

### رابط وهمي كزرار
```html bad
<a href="#" onclick="save()">حفظ</a>
```
```html good
<button type="button" onclick="save()">حفظ</button>
```
ليه؟ الرابط للتنقل، والزرار للإجراءات.

### نسيان البروتوكول
```html bad
<a href="www.google.com">جوجل</a>
```
```html good
<a href="https://www.google.com">جوجل</a>
```
ليه؟ من غير `https://` المتصفح بيعتبره مسار نسبي داخل موقعك.

## a11y

- نص الرابط لازم يوضّح الوجهة ("اقرأ عن كذا" مش "اضغط هنا").
- الرابط اللي بيفتح ملف (PDF) وضّح نوعه وحجمه.
- متشيلش الـ underline أو اللون المميّز من غير بديل.

## quiz

### من غير `href` عنصر `<a>` بيبقى؟
- [x] مش رابط حقيقي (مش بياخد فوكس)
- [ ] رابط عادي
- [ ] زرار
- [ ] صورة
محتاجها.

### الرابط لقسم داخل الصفحة؟
- [x] `href="#id"`
- [ ] `href="id"`
- [ ] `href="@id"`
- [ ] `href="/id"`
بيروح للعنصر ذو الـ id.

### إيه المشكلة في `href="javascript:..."`؟
- [x] سيء للأمان والإتاحة
- [ ] ممنوع تماماً
- [ ] أسرع
- [ ] مفيش مشكلة
استخدم button.

## refs

- [MDN: href](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href)
- [WHATWG: Links](https://html.spec.whatwg.org/multipage/links.html)
