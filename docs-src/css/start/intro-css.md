---
id: intro-css
kind: guide
cat: start
title: إيه هو CSS؟
en: What is CSS? Cascading Style Sheets
status: stable
summary: CSS هي لغة التنسيق اللي بتخلّي صفحة HTML شكلها حلو: ألوان وخطوط ومسافات وترتيب. HTML بيقول «إيه المحتوى» وCSS بتقول «شكله إيه».
keywords: css, سي اس اس, تنسيق, تصميم, ستايل, style, الوان, خطوط, مقدمة, من الصفر, cascading style sheets
related: adding-css, css-syntax, selectors-guide, box-model, flexbox-guide, grid-guide
---

## intro

لو بنيت صفحة بـ HTML بس هتلاقيها شكلها زي مستند Word قديم: كلام أسود على خلفية بيضا وكل حاجة فوق بعض. HTML بتقول **«ده عنوان، ودي فقرة، وده زرار»** لكنها مبتقولش **«العنوان لونه إيه، والزرار مدوّر ولا مربع، والصفحة في النص ولا على جنب»**. ده شغل CSS.

كلمة CSS اختصار **Cascading Style Sheets**، يعني **«أوراق الأنماط المتتالية»**. «Style Sheets» معناها ملف فيه قواعد تنسيق، و«Cascading» معناها إن المتصفح بيمشي على القواعد دي زي الشلال، وكل ما قاعدتين يتعارضوا فيه ترتيب واضح بيحدد مين اللي يكسب (هنشرحه في [[specificity]] و[[cascade-inheritance]]).

الشغل كله بيمشي كده: بتكتب **قاعدة** بتقول «اختار العناصر دي» (**المحدد** Selector)، وبعدين «طبّق عليها الخصائص دي» (**الإعلانات** Declarations). المتصفح بيقرا الصفحة، يلاقي العناصر اللي بتطابق المحدد، ويلوّنها ويرتّبها بالشكل اللي طلبته. وأي حاجة مكتوبة في CSS مش بتغيّر المحتوى نفسه، بس شكله.

> [!analogy] تخيّل بيت: **HTML** هو الهيكل الخرساني (الأوض والأبواب والشبابيك)، و**CSS** هي الدهان والأثاث والإضاءة وترتيب الأوض. نفس الهيكل ممكن تغيّر شكله بالكامل من غير ما تهدّ حيطة.

> [!key] HTML = **إيه** المحتوى (المعنى والهيكل). CSS = **شكله إيه** (الألوان والمسافات والترتيب). ومعاهم JavaScript = **بيتصرف إزاي**.

## try

```html
<style>
  h2 { color: #b5551f; border-bottom: 3px solid #c9772f; padding-bottom: 6px; }
  p  { background: #efe0bd; color: #4a3520; padding: 10px 14px; border-radius: 10px; }
</style>
<h2>عنوان بتنسيق CSS</h2>
<p>الفقرة دي ليها خلفية ولون وحواف مدوّرة، والفضل لـ CSS.</p>
```

## examples

### 1) نفس الـ HTML بشكلين
الصندوقين دول نفس الـ HTML بالظبط. الأول من غير أي CSS، والتاني اتنسّق. لاحظ إن المحتوى ما اتغيّرش، بس الشكل.

```html
<style>
  .raw { margin-bottom: 14px; }
  .styled h3 { color: #b5551f; margin: 0 0 6px; }
  .styled { background: #efe0bd; border: 2px solid #7a4a1d; border-radius: 14px; padding: 14px 18px; color: #3d2c18; }
  .styled button { background: #3d7a5a; color: #f3ede0; border: 0; padding: 8px 18px; border-radius: 20px; }
</style>
<div class="raw"><h3>كورس CSS</h3><p>اتعلّم التنسيق من الصفر.</p><button>سجّل</button></div>
<div class="styled"><h3>كورس CSS</h3><p>اتعلّم التنسيق من الصفر.</p><button>سجّل</button></div>
```

- الأول: شكل المتصفح المبدئي (Default).
- التاني: نفس العناصر بس بقواعد CSS.
- HTML ثابت، والمتغيّر هو CSS.

### 2) قاعدة واحدة بتأثّر على عناصر كتير
قاعدة `li { ... }` بتطبّق على كل عناصر القايمة مرة واحدة. ده سر قوة CSS: تكتب مرة وتتطبق في كل حتة.

```html
<style>
  li { background: #d8b878; margin: 4px 0; padding: 6px 12px; border-radius: 8px; list-style: none; color: #3d2c18; }
</style>
<ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>
```

- كل `<li>` اتلوّن واتدوّر من قاعدة واحدة.
- لو غيّرت القاعدة هتتغيّر القايمة كلها.
- دي فايدة فصل الشكل عن المحتوى.

### 3) نفس الكلمة بقواعد مختلفة
بنفس الـ HTML نقدر نغيّر الهوية بالكامل بتغيير قيمتين. جرّب تغيّر `--main` لأي لون وشوف.

```html
<style>
  .badge { --main: #3d7a5a; background: var(--main); color: #f3ede0; padding: 6px 16px; border-radius: 30px; display: inline-block; }
  .badge.alt { --main: #b5551f; }
</style>
<span class="badge">ناجح</span> <span class="badge alt">محتاج مراجعة</span>
```

- اللون اتخزّن في متغيّر `--main` (CSS Variables).
- الكلاس `.alt` غيّر المتغيّر بس.

## mistakes

### الاعتماد على HTML للتنسيق

```html bad
<font color="red">تحذير</font>
<center>نص في النص</center>
```

```html good
<style>
  .warn { color: #a63b2f; }
  .mid  { text-align: center; }
</style>
<p class="warn">تحذير</p>
<p class="mid">نص في النص</p>
```

الوسوم القديمة زي `<font>` و`<center>` اتشالت من HTML، والتنسيق بيتعمل بـ CSS علشان تفصل الشكل عن المحتوى وتغيّره من مكان واحد.

## quiz

### إيه الفرق بين HTML و CSS؟
- [ ] HTML للتنسيق وCSS للمحتوى
- [x] HTML للمحتوى والهيكل وCSS للشكل والتنسيق
- [ ] الاتنين نفس الحاجة
- [ ] CSS بتعمل الحركة بس

HTML بتقول إيه موجود في الصفحة، وCSS بتقول شكله إيه.

### كلمة Cascading في CSS معناها إيه تقريباً؟
- [ ] الحركة
- [x] القواعد المتتالية اللي ليها ترتيب أولويات لما تتعارض
- [ ] الألوان المتدرّجة
- [ ] سرعة التحميل

لما قاعدتين يتعارضوا المتصفح بيتبع ترتيب واضح (specificity والترتيب) يحدد مين يكسب.

### هل CSS بتغيّر النص اللي في الصفحة؟
- [ ] أيوه بتكتبه
- [x] لأ، بتغيّر شكله بس
- [ ] أيوه بتحذفه
- [ ] لأ، بتتجاهله

CSS مسؤولة عن العرض والمظهر، المحتوى بيفضل في HTML.

## refs

- [MDN: ما هو CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS)
