---
id: code
kind: element
cat: code
tag: code
title: عنصر الكود (code)
en: HTML inline code element
status: stable
display: inline
void: no
support: all
summary: عنصر code بيعلّم على جزء من الكود البرمجي جوه الكلام، وبيعرضه بخط ثابت العرض (Monospace)، ولو الكود أكتر من سطر بنلفّه جوه pre.
keywords: code, كود, برمجة, monospace, سطر كود, inline code, pre, كتابة كود, خط ثابت العرض, تعليمات
related: pre, kbd, samp, var, span, p
---

## intro

لما بتكتب مقال أو درس عن البرمجة، هتحتاج تذكر أسماء أوامر (`console.log`) أو وسوم (`<div>`) أو متغيرات جوه الكلام العادي. لو كتبتهم بنفس الخط هيتلخبطوا مع باقي النص، ومش هيتفهم إن ده كود. العنصر `<code>` معمول لده بالظبط: بيعلّم على **جزء من كود الكمبيوتر**، والمتصفح بيعرضه بخط **ثابت العرض** (Monospace) كل حرف فيه بياخد نفس المساحة، وده الشكل المألوف للكود.

النقطة الأساسية: الـ `<code>` **Inline**، يعني مناسب للكود القصير جوه سطر أو فقرة: «استخدم دالة `parseInt()` لتحويل النص لرقم». أما لو عندك **كود من أكتر من سطر** وعايز المسافات وأسطره تفضل زي ما كتبتها، فاستخدم **`<pre><code>…</code></pre>`** مع بعض. الـ `<pre>` هو اللي بيحافظ على المسافات والأسطر، والـ `<code>` بيدّي المعنى.

وفيه مشكلة بيقع فيها كل مبتدئ: لو عايز تعرض وسم HTML زي `<div>` جوه `<code>` لازم تكتبه بـ **entities**: `&lt;div&gt;`، وإلا المتصفح هيفتكره وسم حقيقي وهينفّذه بدل ما يعرضه كنص. الـ `<` بتتكتب `&lt;` والـ `>` بتتكتب `&gt;` والـ `&` بتتكتب `&amp;` (راجع [[entities]]).

وبعض الناس بتضيف `class="language-js"` على الـ `<code>` عشان مكتبات التلوين (Syntax Highlighters) زي Prism أو highlight.js تعرف لغة الكود. ده مش جزء رسمي من HTML لكنه اتفاق منتشر.

> [!analogy] تخيّل في كتاب مدرسي، لما بيذكر معادلة أو رمز كيميائي بيكتبه بخط مختلف عشان تميّزه عن الكلام. الكود في البرمجة ليه نفس الاحتياج: بخط ثابت العرض عشان يتفرّق عن النص.

> [!key] `<code>` للكود القصير جوه السطر. للكود الطويل: `<pre><code>`. والـ `<` لازم تتكتب `&lt;`.

## try

جرّب تغيّر اسم الدالة، وجرّب تكتب `<div>` من غير entities وشوف إيه اللي بيحصل.

```html
<p>
  استخدم الدالة <code>console.log()</code> لطباعة رسالة،
  والوسم <code>&lt;div&gt;</code> لعمل صندوق.
</p>
```

## syntax

```html nolive
<p>استخدم <code>parseInt("42")</code> لتحويل النص.</p>
```

- `<code>` — **الوسم الافتتاحي**.
- النص — الكود (مع تحويل `<` لـ `&lt;`).
- `</code>` — **الوسم الختامي** إجباري.

## use

- لذكر أسماء دوال ومتغيرات وأوامر جوه نص.
- لعرض وسم أو خاصية HTML في شرح.
- لمقتطف كود قصير في سطر.
- جوه `<pre>` لعرض كود من أكتر من سطر.

## avoid

- متستخدمهوش لكود طويل من غير `<pre>`.
- متنساش تحوّل `<` لـ `&lt;`.
- متستخدمهوش للتنسيق بس: CSS.
- متستخدمهوش لاسم ملف: ممكن، لكن `<kbd>` أو `<samp>` أنسب لحاجات معينة.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
مهمة: غالباً بنضيف `class="language-xxx"` لتلوين الصيغة.

```html nolive
<code class="language-js">const x = 5;</code>
```

### lang
لو الكود فيه نص بلغة مختلفة.

## examples

### 1) كود في سطر
الاستخدام الأشهر.

```html
<p>اكتب <code>alert("مرحباً")</code> عشان تعرض رسالة.</p>
```

- الكود بيظهر بخط ثابت العرض ومميز عن النص.
- من غير `<code>` كان هيتلخبط مع الكلام.
- لو الكود فيه `<` لازم تحوّلها.

### 2) وسوم HTML
لازم entities.

```html
<p>الفقرة بتتكتب <code>&lt;p&gt;نص&lt;/p&gt;</code> والعنوان <code>&lt;h1&gt;</code>.</p>
```

- `&lt;` و`&gt;` بيظهروا كـ `<` و`>` في الصفحة.
- لو كتبت `<p>` مباشرة جوه `<code>` هيتنفّذ كوسم حقيقي.

### 3) كود متعدد الأسطر
`<pre>` مع `<code>`.

```html
<pre><code>function hello() {
  console.log("مرحباً");
}
hello();</code></pre>
```

- الـ `<pre>` بيحافظ على المسافات والأسطر.
- الـ `<code>` بيدّي المعنى «ده كود».
- ده النمط المعتاد لعرض الكود.

### 4) تنسيق code
شكل مألوف.

```html
<style>
  code { background: #f1f5f9; color: #be185d; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
</style>
<p>اكتب <code>let x = 10;</code> لتعريف متغير.</p>
```

- الخلفية الفاتحة واللون الوردي أسلوب شائع في المدونات.
- الخط ثابت العرض بيجي من المتصفح.

### 5) class للغة
علشان مكتبات التلوين.

```html
<pre><code class="language-html">&lt;h1&gt;أهلاً&lt;/h1&gt;
&lt;p&gt;نص&lt;/p&gt;</code></pre>
```

- `class="language-html"` اتفاق بتفهمه مكتبات زي Prism.
- من غير المكتبة مش هتتلوّن لكنه بيفضل صالح.

### 6) نسخ الكود بالجافاسكربت
زرار نسخ بسيط.

```html
<pre><code id="c">npm install express</code></pre>
<button onclick="navigator.clipboard.writeText(c.textContent).then(() => o.textContent='اتنسخ ✓')">انسخ</button>
<span id="o"></span>
```

- `textContent` بيرجّع الكود كنص عادي (من غير entities).
- ده نمط معتاد في صفحات التوثيق.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</code>` إجباري.
- role: `code`.
- dom: `HTMLElement`.
- layout: `display: inline`، و`font-family: monospace`.

## mistakes

### نسيان entities
```html bad
<code><div>صندوق</div></code>
```
```html good
<code>&lt;div&gt;صندوق&lt;/div&gt;</code>
```
ليه؟ المتصفح هيشوفه وسم حقيقي وهينفّذه.

### كود طويل من غير pre
```html bad
<code>
function a() {
  return 1;
}
</code>
```
```html good
<pre><code>function a() {
  return 1;
}</code></pre>
```
ليه؟ `<code>` وحده بيدمج المسافات والأسطر.

### code للتنسيق
```html bad
<p>اسمي <code>أحمد</code> وبشتغل مبرمج.</p>
```
```html good
<p>اسمي أحمد وبشتغل مبرمج.</p>
```
ليه؟ الاسم مش كود.

## a11y

- قارئ الشاشة بيعلن «كود» أحياناً، وبيقرا الرموز بشكل متفاوت.
- اكتب شرح الكود في نص عادي كمان.
- حافظ على تباين الألوان في خلفية الكود.

## tips

- لتلوين الصيغة استخدم Prism أو highlight.js.
- لو بتعرض كود كتير، جرّب زرار نسخ.
- حول `<` لـ `&lt;` تلقائياً في الأدوات اللي بتولّد الصفحة.

## quiz

### أنهي أنسب لكود من 10 أسطر؟
- [ ] `<code>` وحده
- [x] `<pre><code>`
- [ ] `<p>`
- [ ] `<span>`
الـ `<pre>` بيحافظ على الأسطر.

### إزاي تعرض `<div>` كنص جوه `<code>`؟
- [ ] `<div>`
- [x] `&lt;div&gt;`
- [ ] `\<div>`
- [ ] مش ممكن
الـ entities.

### إيه الخط الافتراضي لـ `<code>`؟
- [ ] عريض
- [x] ثابت العرض (monospace)
- [ ] مائل
- [ ] مخفي
Monospace.

## refs

- [MDN: code](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code)
- [WHATWG: The code element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-code-element)
