---
id: abbr
kind: element
cat: semantics
tag: abbr
title: عنصر الاختصار (abbr)
en: HTML abbreviation element
status: stable
display: inline
void: no
support: all
summary: عنصر abbr بيعلّم على اختصار أو اسم مختصر (زي HTML أو م.) وبيقبل title بيشرح الشكل الكامل كتلميح لما تحط الماوس عليه، لكن التلميح مش بيشتغل على اللمس.
keywords: abbr, اختصار, abbreviation, acronym, title, تلميح, الشكل الكامل, HTML, حروف مختصرة
related: dfn, acronym, span, cite, global-attributes
---

## intro

في كل مجال بتلاقي اختصارات: HTML و CSS و USB و WHO وفي العربي «م.» لمهندس و«د.» لدكتور. الاختصار ده بيوفّر مساحة، لكنه بيلخبط اللي مش عارفه. العنصر `<abbr>` (اختصار **Abbreviation**) بيعلّم على الاختصار ده في HTML ويديك فرصة تشرح معناه الكامل.

الطريقة: بتلف الاختصار في `<abbr>` وبتحط الشكل الكامل في `title`. لما المستخدم يوقف بالماوس على الاختصار بيظهر تلميح (Tooltip) فيه الشرح. والمتصفحات غالباً بتعرض الاختصار بخط تحته نقط متقطّعة عشان تقولك «فيه شرح هنا».

لكن فيه نقطتين لازم تعرفهم. **الأولى:** الـ `title` **مش بيظهر على اللمس** (الموبايل والتابلت) ولا بيتقرا كويس بقارئ الشاشة. فمتعتمدش عليه وحده. **التانية:** القاعدة الذهبية في الكتابة: **أول مرة** تذكر الاختصار في النص، اكتب الشكل الكامل وبعده الاختصار بين قوسين: «لغة ترميز النص التشعبي (HTML)». ولما يتكرر بعد كده، الاختصار لوحده كفاية.

وفيه عنصر قديم اسمه `<acronym>` كان بيُستخدم للاختصارات اللي بتتنطق ككلمة (زي NASA)، لكنه **اتشال** من HTML5. دلوقتي `<abbr>` بيغطي الاتنين.

> [!analogy] تخيّل كلمة مختصرة على لافتة مطعم «بوفيه م.ض.» وتحتها بخط صغير «مفتوح طول الأسبوع». `<abbr>` هو ربط الاختصار بشرحه.

> [!key] `<abbr title="الشكل الكامل">اختصار</abbr>`. الـ `title` مش كفاية على الموبايل، فاشرح الاختصار في النص أول مرة.

## try

حط الماوس على الاختصارات. جرّب تضيف اختصار جديد بـ `title`.

```html
<p>
  بنتعلم <abbr title="HyperText Markup Language">HTML</abbr>
  و<abbr title="Cascading Style Sheets">CSS</abbr> في
  <abbr title="أكاديمية فينكس">PhineX</abbr>.
</p>
```

## syntax

```html nolive
<abbr title="World Health Organization">WHO</abbr>
```

- `<abbr>` — **الوسم الافتتاحي**.
- `title` — الشكل الكامل للاختصار (اختياري لكنه مفيد).
- النص — الاختصار نفسه.
- `</abbr>` — **الوسم الختامي** إجباري.

## use

- للاختصارات التقنية (HTML، API، USB).
- لأسماء المنظمات المختصرة (WHO، UN).
- للألقاب والاختصارات في العربي («د.»، «م.»).
- لتوضيح اختصار لأول مرة بتذكره.

## avoid

- متعتمدش على `title` وحده: مش بيظهر على اللمس.
- متستخدمهوش لكلمة مش اختصار.
- متكررش شرح نفس الاختصار كل مرة.
- متستخدمهوش للتعريف الرسمي: ده `<dfn>`.

## attributes

### title
الشكل الكامل للاختصار. بيظهر كتلميح عند الوقوف بالماوس. لو الاختصار واضح من السياق ممكن تتجاهله.

```html nolive
<abbr title="Application Programming Interface">API</abbr>
```

### lang
لو الاختصار بلغة مختلفة عن الصفحة.

### class
للتنسيق.

## examples

### 1) أبسط abbr
اختصار مع شرحه.

```html
<p><abbr title="HyperText Markup Language">HTML</abbr> هي لغة الويب.</p>
```

- الـ `title` بيظهر لما تحط الماوس على الكلمة.
- المتصفحات بترسم خط منقّط تحت الاختصار.
- من غير `title` العنصر بيفضل صالح لكنه أقل فايدة.

### 2) اختصار عربي
ألقاب ومختصرات.

```html
<p>
  قابلت <abbr title="دكتور">د.</abbr> أحمد و<abbr title="مهندس">م.</abbr> سارة.
</p>
```

- الاختصارات العربية بتحتاج شرح برضه.
- ده مفيد لقارئات الشاشة اللي ممكن تقراها بشكل مختلف.

### 3) النمط الصح: الشكل الكامل أول مرة
بدل الاعتماد على `title`.

```html
<p>
  تتكوّن الصفحة بـ لغة ترميز النص التشعبي (<abbr>HTML</abbr>).
  وبعد كده نكتب <abbr>HTML</abbr> بس.
</p>
```

- أول مرة بنكتب الشكل الكامل في النص، فمفيش اعتماد على `title`.
- ده حل مضمون على اللمس وقارئ الشاشة.

### 4) تنسيق abbr
شكل مخصص.

```html
<style>
  abbr[title] { text-decoration: underline dotted #0ea5e9; cursor: help; text-underline-offset: 3px; }
</style>
<p>استخدم <abbr title="Application Programming Interface">API</abbr> للتواصل.</p>
```

- `cursor: help` بيغيّر شكل المؤشر لعلامة استفهام.
- الخط المنقّط الملوّن بيلفت النظر.

### 5) abbr مع lang
اختصار بلغة تانية.

```html
<p>الأمم المتحدة (<abbr lang="en" title="United Nations">UN</abbr>).</p>
```

- `lang="en"` بيقول إن الاختصار إنجليزي فيتنطق صح.
- `title` شرح الاختصار بالإنجليزي، وممكن تكتبه بالعربي.

### 6) اختصار يظهر بالـ JavaScript على اللمس
حل بسيط للموبايل: نكتب الشرح لما يتضغط.

```html
<p>
  <abbr title="Cascading Style Sheets" id="a1" style="cursor:pointer">CSS</abbr>
  <span id="exp" style="color:#0ea5e9"></span>
</p>
<script>
  a1.addEventListener('click', () => { exp.textContent = ' = ' + a1.title; });
</script>
```

- الضغط على الاختصار بيكتب شرحه جنبه، فبيشتغل على اللمس.
- ده تعويض عن ضعف `title` على الموبايل.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</abbr>` إجباري.
- role: `generic`.
- dom: `HTMLElement`.
- layout: `display: inline`، وغالباً `text-decoration: underline dotted`.

## mistakes

### الاعتماد على title وحده
```html bad
<p>اتعلم <abbr title="HyperText Markup Language">HTML</abbr>.</p>
```
```html good
<p>اتعلم لغة ترميز النص التشعبي (<abbr>HTML</abbr>).</p>
```
ليه؟ الـ `title` مش بيظهر على الموبايل، فالشرح الكامل في النص مضمون.

### استخدام acronym
```html bad
<acronym title="North Atlantic Treaty Organization">NATO</acronym>
```
```html good
<abbr title="North Atlantic Treaty Organization">NATO</abbr>
```
ليه؟ `<acronym>` اتشال من HTML5.

### abbr لكلمة عادية
```html bad
<p>الـ <abbr title="مبرمج">programmer</abbr> شاطر.</p>
```
```html good
<p>الـ programmer شاطر.</p>
```
ليه؟ الكلمة مش اختصار.

## a11y

- قارئ الشاشة مش بيقرا `title` دايماً، فالشرح في النص أضمن.
- لو الاختصار بيتنطق حرف حرف (USB)، متحتاجش حاجة إضافية. لو بيتنطق ككلمة (NASA) المتصفح بيتصرف حسب الإعداد.
- حدد `lang` للاختصارات الأجنبية.

## tips

- اكتب الشكل الكامل أول مرة والاختصار بعده بين قوسين.
- استخدم `<abbr>` لأول ظهور بس لو الصفحة طويلة.
- جرّب CSS `cursor: help` لتلميح بصري.

## quiz

### إيه الخاصية اللي بتشرح الاختصار؟
- [ ] `alt`
- [x] `title`
- [ ] `href`
- [ ] `lang`
`title` فيه الشكل الكامل.

### ليه `title` وحده مش كفاية؟
- [ ] لأنه بيبطّئ
- [x] لأنه مش بيظهر على اللمس
- [ ] لأنه بيغيّر الشكل
- [ ] لأنه قديم
الموبايل مفيهوش hover.

### إيه بديل `<acronym>`؟
- [x] `<abbr>`
- [ ] `<dfn>`
- [ ] `<cite>`
- [ ] `<i>`
`<abbr>` بيغطي الاتنين.

## refs

- [MDN: abbr](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr)
- [WHATWG: The abbr element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-abbr-element)
