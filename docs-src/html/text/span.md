---
id: span
kind: element
cat: text
tag: span
title: عنصر الحاوية الداخلية (span)
en: HTML content span element
status: stable
display: inline
void: no
support: all
summary: عنصر span هو حاوية عامة جوه السطر من غير أي معنى، بنستخدمه نلف كلمة أو جزء من جملة عشان ننسّقه أو نتعامل معاه من غير ما نكسر السطر.
keywords: span, حاوية داخلية, inline, تلوين كلمة, تنسيق جزء من نص, generic inline container
related: div, strong, em, mark, b, i, p, a
---

## intro

عنصر `<span>` هو **أخو الـ `<div>` الصغير**. زي الـ `<div>` بالظبط، هو عنصر عام ما لوش أي معنى لوحده، بس الفرق إنه **Inline**: يعني بيمشي مع الكلام في نفس السطر ومش بيكسره. هو بياخد على قد الكلام اللي جواه بس، مش عرض السطر كله.

بتستخدمه لما تحب تلف **كلمة أو جزء من جملة** عشان تنسّقها بشكل مختلف أو تتعامل معاها بالجافاسكربت، من غير ما تكسر الجملة. مثلاً عندك جملة «السعر 50 جنيه» وعايز كلمة «50» تبقى حمرا وكبيرة. بتلفها في `<span>` وتدّيها ستايل.

بس خلّي بالك: `<span>` مالوش معنى. لو عايز تقول إن الكلمة «مهمة» فاستخدم `<strong>`. لو «تأكيد» فـ `<em>`. لو «مظلّلة للفت الانتباه» فـ `<mark>`. لو «كود» فـ `<code>`. استخدم `<span>` **لما مفيش عنصر** بيعبّر عن اللي عايزه، وكل غرضك هو التنسيق.

وقاعدة التداخل: `<span>` جوه `<p>` أو جوه أي عنصر نصي مسموح بكل بساطة. لكن مينفعش تحط جواه عناصر Block زي `<div>` أو `<p>` (غير صالح).

> [!analogy] تخيّل قلم الهايلايت (Highlighter) بتمرّره على كلمة في كتاب: بيلوّنها من غير ما يغيّر مكانها ولا يبدّل الجملة. الـ `<span>` هو القلم ده: بيمرّ على جزء من النص ويديه ستايل.

> [!key] `<div>` = صندوق Block **بيكسر السطر**. `<span>` = صندوق Inline **جوه السطر**.

## try

غيّر لون الكلمة اللي في الـ `<span>` أو ضيف `<span>` تاني حوالين كلمة تانية.

```html
<p>
  السعر النهائي هو
  <span style="color: crimson; font-size: 24px; font-weight: bold;">50</span>
  جنيه فقط.
</p>
```

## syntax

```html nolive
<p>جملة فيها <span class="highlight">كلمة مميزة</span> جوه السطر.</p>
```

- `<span ...>` — **الوسم الافتتاحي**، وبنضيف عليه غالباً `class` أو `style`.
- `كلمة مميزة` — النص (أو العناصر Inline) اللي بنلفّه.
- `</span>` — **الوسم الختامي** إجباري.

## use

- لتلوين أو تكبير أو تنسيق كلمة جوه جملة.
- لتحديد جزء من النص عشان تستهدفه بالجافاسكربت (عداد، رقم بيتغيّر).
- لتحديد لغة أو اتجاه جزء معيّن بـ `lang` أو `dir` (زي كلمة إنجليزي وسط جملة عربي).
- لتجميع أيقونة مع نص جوه زرار أو رابط.
- لما محتاج `class` أو `id` على جزء من السطر ومفيش عنصر دلالي مناسب.

## avoid

- متستخدمهوش مكان `<strong>` أو `<em>` لو معنى الكلمة «مهم» أو «تأكيد».
- متستخدمهوش مكان `<code>` لو الكلام كود.
- متحطش جواه `<div>` أو `<p>` أو `<h1>` (عناصر Block).
- متلفّش فقرة كاملة في `<span>`: استخدم `<p>`.
- متستخدمهوش للتخطيط (Layout) الكبير: ده شغل `<div>`.

## attributes

مالوش خصائص خاصة، لكنه بيقبل **الخصائص العامة** ([[global-attributes]]):

### class
اسم نستهدفه بالـ CSS. أشهر خاصية بتتحط على `<span>`.

### id
اسم فريد للوصول للـ span من الجافاسكربت.

### style
تنسيق مباشر على الـ span (لأمثلة بسيطة).

### lang
بتحدد لغة النص اللي جواه، عشان قارئ الشاشة ينطقه صح. مفيدة لما تكتب كلمة إنجليزي وسط جملة عربي.

```html nolive
<p>اسم المكتبة هو <span lang="en">React</span> وهي مشهورة.</p>
```

### dir
بتحدد اتجاه النص (`ltr` أو `rtl`) جوه الـ span، فبتضبط ترتيب الحروف والعلامات لو الكلمة بلغة اتجاهها مختلف.

```html nolive
<p>اسم المكتبة هو <span lang="en" dir="ltr">React</span> وهي مشهورة.</p>
```

## examples

### 1) أبسط span
الـ `<span>` من غير ستايل مش بيغيّر حاجة، الكلام بيمشي عادي.

```html
<p>أنا <span>جوه سطر</span> واحد، ومفيش كسر.</p>
```

- لو حطيت `<div>` بدل `<span>` الكلمة هتنزل سطر لوحدها.

### 2) تلوين كلمة
أشهر استخدام: تلوين جزء من الجملة.

```html
<p>
  اللون <span style="color: red;">الأحمر</span> بيلفت الانتباه،
  واللون <span style="color: green;">الأخضر</span> بيريّح العين.
</p>
```

- كل كلمة اتلفت في `<span>` بلون مختلف.

### 3) باستخدام class
بدل ما تكرر `style` في كل مكان، بنسمّي النوع ونكتب الستايل مرة.

```html
<style>
  .price { color: #2e7d32; font-weight: bold; }
  .old   { color: #888; text-decoration: line-through; }
</style>
<p>
  السعر قبل: <span class="old">100</span> جنيه،
  دلوقتي: <span class="price">70</span> جنيه.
</p>
```

- `.price` و `.old` أسماء احنا اخترناها، والستايل متكتب مرة واحدة.

### 4) كلمة إنجليزي وسط جملة عربي
بنحدد لغة واتجاه الكلمة عشان تتنطق وتتعرض صح.

```html
<p>
  إحنا بنتعلم لغة <span lang="en" dir="ltr">HTML5</span>
  ونستخدم إطار عمل <span lang="en" dir="ltr">React</span> بعدها.
</p>
```

- `lang="en"` بيخلّي قارئ الشاشة ينطق الكلمة بالإنجليزي.
- `dir="ltr"` بيضمن إن اتجاه الكلمة صح.

### 5) span مع الجافاسكربت
بنستخدمه كمكان للرقم اللي بيتغيّر.

```html
<p>عدد الضغطات: <span id="n">0</span></p>
<button onclick="
  const s = document.getElementById('n');
  s.textContent = Number(s.textContent) + 1;
">اضغط</button>
```

- الـ `<span id="n">` بيحتوي الرقم، والزرار بيغيّره.
- ما يهمّناش شكل الـ span، بنستخدمه كعنوان للوصول للرقم.

### 6) أيقونة مع نص في زرار
بنلف الأيقونة في `<span>` عشان نتحكم فيها لوحدها.

```html
<button style="padding:8px 14px;font-size:16px">
  <span aria-hidden="true">🛒</span>
  <span>أضف للسلة</span>
</button>
```

- `aria-hidden="true"` بيخلّي قارئ الشاشة يتجاهل الأيقونة الزخرفية.
- النص الحقيقي في `<span>` تاني.

### 7) div مقابل span
نفس الصندوق بنوعين. لاحظ الفرق.

```html
<style>
  .b { background: #ffe082; padding: 4px; }
</style>
<p>
  قبل <div class="b">div</div> بعد
</p>
<p>
  قبل <span class="b">span</span> بعد
</p>
```

- الـ `<div>` كسر السطر (والمتصفح قفل الفقرة قبله بسبب التداخل غير الصحيح)، أما `<span>` فمشي مع الكلام.
- لاحظ إن المثال الأول بيوضّح بالظبط ليه `<div>` جوه `<p>` غلط.

## rules

- parents: أي عنصر بيقبل **Phrasing content** زي `<p>` و `<li>` و `<td>` و `<h1>` و `<a>` و `<button>` و `<label>`.
- children: Phrasing content فقط (نص وعناصر Inline).
- closing: الوسم الختامي `</span>` إجباري.
- role: `generic`.
- dom: `HTMLSpanElement`.
- layout: `display: inline`.

## mistakes

### div جوه span
```html bad
<span>
  <div>صندوق</div>
</span>
```
```html good
<div>
  <span>نص</span>
</div>
```
ليه؟ الـ `<span>` Inline مينفعش يحتوي Block. الصح تحط `<span>` جوه `<div>` مش العكس.

### span لتأكيد مهم
```html bad
<p>قراءة التعليمات <span style="font-weight:bold">إجبارية</span>.</p>
```
```html good
<p>قراءة التعليمات <strong>إجبارية</strong>.</p>
```
ليه؟ `<strong>` بيعبّر عن الأهمية لقارئ الشاشة ومحركات البحث، أما `<span>` فبيغيّر الشكل بس.

### زرار من span
```html bad
<span onclick="send()">إرسال</span>
```
```html good
<button type="button" onclick="send()">إرسال</button>
```
ليه؟ الـ `<span>` مش بيتركّز بالكيبورد ومش بيتقري زرار. الـ `<button>` بيعمل ده كله تلقائياً.

## a11y

- الـ `<span>` ما لوش معنى لقارئ الشاشة، فهو بيقرا النص اللي جواه عادي.
- متخليش `<span>` يتصرف زي زرار أو رابط من غير `role` و `tabindex` ومعالجة لوحة المفاتيح: الأفضل `<button>` و `<a>`.
- لو الـ `<span>` فيه أيقونة زخرفية فقط، استخدم `aria-hidden="true"`.
- حدّد `lang` لأي كلمة بلغة تانية.

## tips

- قبل ما تكتب `<span>` اسأل: «هل فيه `<strong>` أو `<em>` أو `<mark>` أو `<code>` يعمل المطلوب؟».
- سمّي الـ class حسب الوظيفة: `price`, `badge`, `muted`.
- لو لقيت نفسك بتلف كل كلمة في span، غالباً فيه طريقة أبسط بـ CSS.
- لتحديد لغة أو اتجاه جزء من جملة عربي، `<span lang dir>` هو الحل.

## quiz

### إيه الفرق الأساسي بين `<span>` و `<div>`؟
- [ ] الـ span أكبر
- [x] الـ span Inline بيمشي مع السطر، والـ div Block بياخد سطر لوحده
- [ ] الـ div مش بيقبل ستايل
- [ ] مفيش فرق
الفرق هو نوع العرض: Inline لـ span و Block لـ div.

### أنهي الاختيار الأفضل لكلمة «مهمة جداً»؟
- [ ] `<span style="font-weight:bold">`
- [x] `<strong>`
- [ ] `<div>`
- [ ] `<b>` دايماً
`<strong>` بيدّي المعنى الدلالي (أهمية)، أما `<span>` مجرد تنسيق.

### أي كود غلط؟
- [ ] `<p>أنا <span>كلمة</span></p>`
- [x] `<span><div>صندوق</div></span>`
- [ ] `<div><span>نص</span></div>`
- [ ] `<li><span>عنصر</span></li>`
Block (`<div>`) مينفعش يتحط جوه Inline (`<span>`).

## refs

- [MDN: span](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span)
- [WHATWG: The span element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element)
