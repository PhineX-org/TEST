---
id: math
kind: element
cat: embedded
tag: math
title: المعادلات الرياضية (math)
en: MathML math element
status: stable
display: inline
void: no
support: all
summary: بيكتب معادلات رياضية بصيغة MathML داخل الصفحة: كسور وأسس وجذور ومصفوفات بنص حقيقي قابل للقراءة بقارئ الشاشة والتكبير، من غير صور ولا مكتبات.
keywords: math, mathml, معادلة, رياضيات, كسر, أس, جذر, mfrac, msup, msqrt, mrow, mi, mn, mo, مصفوفة, تكامل, قانون
related: svg, canvas, sup, sub, var
---

## intro

عشان تكتب معادلة زي x² + 3x − 5 = 0 في الصفحة، ممكن تكتبها كنص عادي (x2 + 3x - 5 = 0)، وده مش واضح. أو تحط صورة (بتتشوه وقارئ الشاشة ميعرفهاش). أو تستخدم مكتبة (KaTeX/MathJax). **أو** تستخدم **MathML** (**Mathematical Markup Language**) وهي لغة ترميز مدمجة في المتصفح لوصف المعادلات.

العنصر `<math>` هو **جذر المعادلة**، وجواه عناصر وصف التركيب: `<mi>` (متغير: identifier)، `<mn>` (رقم)، `<mo>` (عامل: +, −, =)، `<mfrac>` (كسر)، `<msup>` (أس)، `<msub>` (دليل سفلي)، `<msqrt>` (جذر تربيعي)، `<mrow>` (تجميع)، `<mtable>` (مصفوفة أو جدول معادلات). **كل جزء بيوصف دوره**، فالمتصفح يرسمها صح، والقارئ يقراها.

المتصفحات الحديثة كلها (Chrome 109+, Firefox, Safari) بتدعم **MathML Core**. والنص فيها حقيقي: تقدر تحدده وتنسخه وتكبّره وتتنسّق بـ CSS. وللتحكم في العرض: `display="block"` لمعادلة في سطر لوحدها، والافتراضي `inline` جوه النص.

> [!analogy] `<math>` زي **كتابة معادلة بالمعمار**: بدل ما ترسم صورة للكسر، بتقول «ده كسر: بسطه كذا ومقامه كذا» والمتصفح يرسمه.

> [!key] `<math>` + `<mfrac>` و`<msup>` و`<msqrt>` و`<mrow>`... `display="block"` للمعادلة المنفصلة. نص حقيقي، مش صورة.

## try

غيّر الأرقام وشوف المعادلة.

```html
<p>الحل: 
  <math>
    <mi>x</mi><mo>=</mo>
    <mfrac>
      <mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow>
      <mrow><mn>2</mn><mi>a</mi></mrow>
    </mfrac>
  </math>
</p>
```

## syntax

```html nolive
<math display="block">
  <mfrac>
    <mn>1</mn>
    <mn>2</mn>
  </mfrac>
</math>
```

- `<math>` — **جذر المعادلة**.
- `display="block"` — **تعرض في سطر مستقل** (اختياري).
- `<mi>` `<mn>` `<mo>` — **متغير، رقم، عامل**.
- `<mfrac>` `<msup>` `<msqrt>` `<mrow>` — **تراكيب**.
- `</math>` — **الوسم الختامي** إجباري.

## use

- لكتابة معادلات وقوانين في الدروس.
- لإظهار كسور وأسس وجذور بشكل رياضي سليم.
- لمصفوفات وتكاملات ومجاميع.
- لمحتوى تعليمي لازم قارئ الشاشة يقراه.

## avoid

- متحطش معادلة كصورة: بتتشوه ومش متاحة.
- متستخدمش `<sup>` لمعادلات معقدة: MathML أدق.
- متنسّقش المعادلات الكبيرة جداً بالإيد: ممكن تستخدم مكتبة تحوّل LaTeX لـ MathML.

## attributes

### display
**طريقة العرض**: `inline` (الافتراضي، جوه سطر النص) أو `block` (في سطر مستقل ومتوسّط).

### xmlns
**مساحة الأسماء** `http://www.w3.org/1998/Math/MathML`. اختيارية جوه HTML.

### displaystyle
**بيحدد حجم رموز معينة** (زي المجموع والتكامل): `true` يكبّرها كأنها معادلة منفصلة.

### scriptlevel
**مستوى الحجم** للأس والأدلة (يصغّر الحجم). بيتحكم فيه المتصفح غالباً.

### mathvariant {deprecated}
كانت بتغيّر شكل الحروف (مثلاً مائل أو أسود). **قديمة** في MathML Core ما عدا `normal`.

## examples

### 1) الكسر والأس
أبسط التراكيب.

```html
<p>
  <math>
    <mfrac><mn>1</mn><mn>2</mn></mfrac>
  </math>
  ،
  <math>
    <msup><mi>x</mi><mn>2</mn></msup>
  </math>
  ،
  <math>
    <msub><mi>a</mi><mn>1</mn></msub>
  </math>
</p>
```

- `<mfrac>` ياخد ابنين: البسط ثم المقام.
- `<msup>` ياخد القاعدة ثم الأس.
- `<msub>` ياخد القاعدة ثم الدليل السفلي.
- كل معادلة جوه سطر النص لأنها `inline`.

### 2) الجذر والتجميع
`msqrt` و`mrow`.

```html
<math display="block">
  <msqrt>
    <mrow>
      <msup><mi>a</mi><mn>2</mn></msup>
      <mo>+</mo>
      <msup><mi>b</mi><mn>2</mn></msup>
    </mrow>
  </msqrt>
</math>
```

- `<mrow>` بيجمّع عناصر عشان تتعامل كوحدة (هنا: a² + b²).
- `<msqrt>` بيرسم الجذر على المجموعة كلها.
- `display="block"` بتخلّي المعادلة في سطرها وتتوسّط.

### 3) قانون كامل
قانون نيوتن وقانون الطاقة.

```html
<math display="block">
  <mi>E</mi><mo>=</mo><mi>m</mi>
  <msup><mi>c</mi><mn>2</mn></msup>
</math>
<math display="block">
  <mi>F</mi><mo>=</mo><mi>m</mi><mo>⋅</mo><mi>a</mi>
</math>
```

- `<mi>` للحروف، و`<mo>` للعوامل زي `=` و`⋅`.
- المتصفح بيحط المسافات الصح حوالين العوامل تلقائياً.
- ممكن تكتب كذا معادلة، كل واحدة في `<math>`.

### 4) المجموع والتكامل
رموز كبيرة.

```html
<math display="block">
  <munderover>
    <mo>∑</mo>
    <mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow>
    <mi>n</mi>
  </munderover>
  <msub><mi>x</mi><mi>i</mi></msub>
</math>
```

- `<munderover>` بيحط حاجة تحت وحاجة فوق الرمز (حدود المجموع).
- `<mo>∑</mo>` رمز المجموع.
- ده مجموع قيم x من i=1 لـ n.

### 5) مصفوفة
`mtable`.

```html
<math display="block">
  <mrow>
    <mo>[</mo>
    <mtable>
      <mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr>
      <mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr>
    </mtable>
    <mo>]</mo>
  </mrow>
</math>
```

- `<mtable>` جدول، و`<mtr>` صف، و`<mtd>` خلية.
- الأقواس `[` و`]` بتتحط كـ `<mo>` حوالين الجدول.
- بنفس الأسلوب تقدر تعمل مصفوفات أكبر ومعادلات متراصّة.

### 6) تنسيق بـ CSS
لون وحجم.

```html
<style>
  math { font-size: 1.6em; color: #0ea5e9; }
  mi { color: #f97316; }
</style>
<math>
  <mi>y</mi><mo>=</mo><mi>m</mi><mi>x</mi><mo>+</mo><mi>c</mi>
</math>
```

- المعادلة نص حقيقي فبتتنسّق بـ CSS زي أي نص.
- `mi` للمتغيرات بتتلوّن بلون مختلف.
- ده مستحيل مع الصور.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: عناصر MathML (`mrow`, `mi`, `mn`, `mo`, `mfrac`, `msup`...).
- closing: الوسم الختامي `</math>` إجباري.
- role: `math`.
- dom: `MathMLElement`.
- layout: `display: inline math` (أو `block math` مع `display="block"`).

## mistakes

### كتابة معادلة كنص عادي
```html bad
<p>x2 + 3x - 5 = 0</p>
```
```html good
<math>
  <msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mo>=</mo><mn>0</mn>
</math>
```
ليه؟ النص العادي مش بيبيّن الأس ولا بيدّي دلالة رياضية.

### كسر بدون mfrac
```html bad
<math><mn>1</mn><mo>/</mo><mn>2</mn></math>
```
```html good
<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math>
```
ليه؟ الشرطة المائلة نص مش كسر. `<mfrac>` بيرسم كسر حقيقي.

### نسيان mrow في البسط
```html bad
<math><mfrac><mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi></mfrac></math>
```
```html good
<math><mfrac><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow><mi>c</mi></mfrac></math>
```
ليه؟ `<mfrac>` بياخد ابنين بس. لو البسط أكتر من عنصر لفّه في `<mrow>`.

## a11y

- قارئات الشاشة الحديثة بتقرا MathML (NVDA وVoiceOver وغيرهم).
- لو معادلة مهمة، فكّر تضيف نص يشرحها بالكلام قدامها أو بعدها.
- متستخدمش صورة للمعادلة، ولو اضطريت اكتب `alt` وصفي.

## tips

- لو بتكتب LaTeX، فيه مكتبات (Temml, KaTeX) بتحوّل LaTeX لـ MathML.
- حدد خط رياضي (زي Latin Modern Math) لو عايز شكل أحسن.
- افحص إن المتصفح بيدعم: `CSS.supports('display','math')`.

## quiz

### إيه العنصر اللي بيرسم كسر؟
- [ ] `<mrow>`
- [x] `<mfrac>`
- [ ] `<msup>`
- [ ] `<mn>`
بياخد البسط ثم المقام.

### إزاي تخلّي المعادلة في سطر لوحدها؟
- [ ] `<br>`
- [x] `display="block"`
- [ ] `align="center"`
- [ ] `<hr>`
الخاصية دي على `<math>`.

### إيه ميزة MathML على الصورة؟
- [x] نص حقيقي قابل للقراءة والتكبير والنسخ
- [ ] أسرع بالضرورة
- [ ] أصغر دايماً
- [ ] مفيش ميزة
قارئ الشاشة بيفهمه.

## refs

- [MDN: math](https://developer.mozilla.org/en-US/docs/Web/MathML/Reference/Element/math)
- [MDN: MathML tutorial](https://developer.mozilla.org/en-US/docs/Web/MathML/Tutorials)
- [WHATWG: MathML in HTML](https://html.spec.whatwg.org/multipage/embedded-content-other.html#mathml)
