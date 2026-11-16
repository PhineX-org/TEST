---
id: xmp
kind: element
cat: old-text
tag: xmp
title: عرض الكود الخام (xmp)
en: HTML xmp element (deprecated)
status: deprecated
display: block
void: no
support: all
size: compact
summary: عنصر xmp كان بيعرض اللي جواه كنص خام بخط ثابت من غير ما يفسّر وسوم HTML. اتحذف، والبديل pre مع code وتهريب علامات أصغر وأكبر بـ lt وgt.
keywords: xmp, example, نص خام, عرض كود, pre, code, escape, &lt;, قديم, deprecated, listing
related: pre, code, plaintext, samp
---

## intro

`<xmp>` (من **example**) كان له وظيفة واحدة: يعرض اللي جواه **كما هو**، بما فيه وسوم HTML، من غير ما المتصفح يفسّرها. يعني تقدر تكتب جواه `<b>مرحبا</b>` ويظهر النص حرفياً بعلامات `<b>`. ومعاه خط ثابت العرض وكأنه `<pre>`.

سهل، لكنه **اتحذف** لأنه بيكسر قواعد الـ parser (إيه اللي بيقفله؟ أي `</xmp>` جواه). والطريقة الصح الدلوقتي: [[pre]] مع [[code]] **وتهريب (Escape)** علامات الوسوم: `&lt;` بدل `<` و`&gt;` بدل `>`. أول ما تتعوّد على التهريب هتلاقيه أضمن من `<xmp>`.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<xmp>` = عرض خام. استخدم `<pre><code>` مع `&lt;` و`&gt;`.

## try

```html
<xmp><b>ده مش بيتفسّر</b> بيظهر حرفياً</xmp>
```

## syntax

```html nolive
<xmp>
<h1>الوسم ده هيظهر كنص</h1>
</xmp>
```

- `<xmp>` — **الوسم الافتتاحي** (قديم).
- المحتوى — **بيظهر حرفياً**.
- `</xmp>` — **الوسم الختامي**، وده الوحيد اللي بيتفسّر.

## use

- موجود في صفحات قديمة.
- لفهم فكرة الـ escaping.

## avoid

- متستخدمهوش: `<pre><code>` مع تهريب العلامات.

## instead

اكتب الكود جوه [[pre]] و[[code]]، واستبدل `<` بـ `&lt;` و`>` بـ `&gt;`. كده المتصفح يعرضها كنص بدون ما يفسّرها.

```html
<pre><code>&lt;b&gt;ده مش بيتفسّر&lt;/b&gt; بيظهر حرفياً</code></pre>
```

## examples

### 1) xmp مقابل pre وcode
نفس النتيجة.

```html
<xmp><p>فقرة</p></xmp>
<pre><code>&lt;p&gt;فقرة&lt;/p&gt;</code></pre>
```

- الاتنين بيعرضوا `<p>فقرة</p>` كنص خام.
- التهريب بالـ `&lt;` و`&gt;` هو الأسلوب المعتمد.
- `<pre>` بيحافظ على المسافات والأسطر.

### 2) عرض كود HTML كامل
pre مع code.

```html
<pre style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;direction:ltr"><code>&lt;ul&gt;
  &lt;li&gt;واحد&lt;/li&gt;
  &lt;li&gt;اتنين&lt;/li&gt;
&lt;/ul&gt;</code></pre>
```

- بنهرّب كل `<` و`>` جوه الكود.
- `direction:ltr` عشان الكود الإنجليزي يتعرض صح.
- الأدوات (زي محررات الكود) بتعمل التهريب ده تلقائياً.

## mistakes

### كتابة وسوم HTML جوه code من غير تهريب
```html bad
<code><b>نص</b></code>
```
```html good
<code>&lt;b&gt;نص&lt;/b&gt;</code>
```
ليه؟ من غير تهريب المتصفح بيفسّر الوسم ومش بيعرضه كنص.

## quiz

### إيه بديل `<xmp>`؟
- [x] `<pre><code>` مع التهريب
- [ ] `<b>`
- [ ] `<br>`
- [ ] `<div>`
مع `&lt;` و`&gt;`.

### ليه اتحذف `<xmp>`؟
- [ ] بطيء
- [x] بيتعارض مع قواعد الـ parser وبديله أضمن
- [ ] مش بيدعم عربي
- [ ] مش شغال
التهريب أضمن.

## refs

- [MDN: xmp](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/xmp)
