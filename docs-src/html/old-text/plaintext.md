---
id: plaintext
kind: element
cat: old-text
tag: plaintext
title: النص الصريح (plaintext)
en: HTML plaintext element (deprecated)
status: deprecated
display: block
void: no
support: limited
support_note: بيشتغل في المتصفحات لكن بيحوّل باقي الصفحة لنص خام ومفيش طريقة تقفله.
size: compact
summary: عنصر plaintext بيحوّل كل حاجة بعده في الصفحة لنص خام من غير ما يتقفل. اتحذف لأنه خطير وغير قابل للإغلاق، والبديل pre مع code أو تهريب العلامات.
keywords: plaintext, نص خام, plain text, بدون إغلاق, xmp, pre, خطير, قديم, deprecated, تهريب
related: xmp, pre, code
---

## intro

`<plaintext>` أغرب عنصر في HTML: أول ما المتصفح يلاقيه، **كل اللي بعده** في الملف (بما فيه `</body>` و`</html>`) بيتعامل معاه كـ **نص عادي**، ومفيش وسم ختامي بيقفله. يعني لو حطيته في النص، باقي الصفحة كلها هتبقى نص خام.

كان بيتستخدم لعرض ملف نصي كامل. لكنه **خطير** (بيبوّظ الصفحة) و**محذوف من المعيار**. الصح لو عايز تعرض نص خام: [[pre]] مع [[code]] وتهريب `<` و`>`، أو تعرض الملف كـ `text/plain` من السيرفر نفسه (Content-Type).

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<plaintext>` مالوش إغلاق وبيحوّل باقي الصفحة لنص. استخدم `<pre><code>`.

## try

```html
<iframe style="width:100%;height:90px;border:1px solid #cbd5e1" srcdoc="<plaintext><b>مرحبا</b> كل اللي بعد الوسم ده نص خام وحتى هذا السطر."></iframe>
```

## syntax

```html nolive
<plaintext>
أي حاجة هنا نص خام حتى آخر الملف.
```

- `<plaintext>` — **الوسم الافتتاحي** (قديم).
- اللي بعده — **كله نص خام** حتى نهاية الملف.
- مفيش وسم ختامي بيشتغل.

## use

- لفهم تاريخ HTML.
- لتعرف ليه الأفضل الابتعاد عنه.

## avoid

- متستخدمهوش أبداً: بيبوّظ باقي الصفحة.

## instead

استخدم [[pre]] مع [[code]] وهرّب `<` و`>`. أو قدّم الملف كـ `text/plain` من السيرفر لو عايز تعرض ملف نصي كامل.

```html
<pre><code>&lt;b&gt;مرحبا&lt;/b&gt; نص خام بشكل آمن.</code></pre>
```

## examples

### 1) تأثير plaintext (معزول)
iframe بيحتويه.

```html
<iframe style="width:100%;height:100px;border:1px solid #cbd5e1"
  srcdoc="<h3>عنوان</h3><plaintext><h3>ده كمان نص</h3> <p>وده برضو</p>"></iframe>
```

- العنوان الأول اتفسّر عادي لأنه قبل `<plaintext>`.
- كل اللي بعده ظهر بوسومه كنص خام.
- عزلناه في iframe عشان ميبوّظش صفحة الشرح.

### 2) البديل الآمن
pre وcode.

```html
<pre><code>&lt;h3&gt;عنوان&lt;/h3&gt;
&lt;p&gt;فقرة&lt;/p&gt;</code></pre>
```

- بنهرّب العلامات ونعرضها جوه `<pre>`.
- الباقي من الصفحة بيفضل سليم.
- ده الأسلوب المعتمد لعرض الكود.

## mistakes

### plaintext في صفحة عادية
```html bad
<plaintext>
<p>باقي الصفحة...</p>
```
```html good
<pre><code>&lt;p&gt;نص خام&lt;/p&gt;</code></pre>
```
ليه؟ العنصر مالوش إغلاق: بيحوّل كل اللي بعده لنص.

## quiz

### إيه المشكلة الأساسية في `<plaintext>`؟
- [x] مفيش وسم ختامي وبيحوّل الباقي لنص
- [ ] بطيء
- [ ] غالي
- [ ] مش بيدعم عربي
مش بيتقفل.

### إيه البديل الآمن؟
- [x] `<pre><code>` مع التهريب
- [ ] `<div>`
- [ ] `<br>`
- [ ] `<span>`
مع `&lt;` و`&gt;`.

## refs

- [MDN: plaintext](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/plaintext)
