---
id: footer
kind: element
cat: sections
tag: footer
title: عنصر التذييل (footer)
en: HTML footer element
status: stable
display: block
void: no
support: all
summary: عنصر footer بيحتوي معلومات ختامية للصفحة أو المقال أو القسم، زي حقوق النشر والكاتب وروابط تانوية، ولو على مستوى الصفحة بيبقى منطقة contentinfo.
keywords: footer, فوتر, تذييل, حقوق النشر, copyright, contentinfo, landmark, ذيل الصفحة, روابط ختامية
related: header, nav, main, article, section, aside, address, p
---

## intro

في آخر أي كتاب بتلاقي صفحة فيها اسم الناشر وسنة الطباعة وحقوق النشر. وفي آخر أي موقع بتلاقي شريط فيه «© 2026 كل الحقوق محفوظة» وروابط «الخصوصية» و«اتصل بينا». الحتة دي في HTML اسمها `<footer>` (**التذييل**)، وهو بيلفّ **المعلومات الختامية** لأقرب أب ليه.

زي ما `<header>` مش بس لأعلى الصفحة، `<footer>` كمان **مش بس لآخرها**. تقدر تحط `<footer>` للصفحة كلها، وتحط `<footer>` جوه كل `<article>` (فيه التصنيف والكاتب والتاريخ)، وجوه `<section>` لو للقسم خاتمة. كل واحد بيبقى «ذيل» أقرب أب ليه بس.

نقطة الـ Landmark: لو الـ `<footer>` على مستوى الصفحة (مش جوه `<article>` ولا `<section>` ولا `<aside>` ولا `<main>` ولا `<nav>`) فبياخد دور `contentinfo`، يعني علامة طريق لقارئ الشاشة بتقول «ده معلومات عن الصفحة نفسها». أما لو جوه واحد من دول فهو مجرد حاوية عادية. وزي `<header>` المفروض يبقى فيه `contentinfo` واحد بس في الصفحة.

وفيه قيدين مهمين: الـ `<footer>` **مينفعش يحتوي `<header>` ولا `<footer>` تاني**. وهو مش لازم يكون **فعلياً** في آخر الصفحة على الشاشة (ممكن تحطه في أي مكان بالـ CSS)، لكن بالمعنى هو «معلومات ختامية» عن أبوه.

> [!analogy] تخيّل فاتورة: في آخرها اسم الشركة وأرقام التواصل وشروط الاسترجاع بخط صغير. ده التذييل: معلومات ثابتة بتتكرر في كل فاتورة مش جزء من بياناتها.

> [!key] `<footer>` على مستوى الصفحة = Landmark `contentinfo`. جوه `<article>` أو `<section>` = تذييل لأبوه بس.

## try

الصندوق الرمادي هو الـ `<footer>`. جرّب تضيف رابط «الخصوصية» جواه.

```html
<style>
  footer { background: #1f2937; color: #e5e7eb; padding: 12px; text-align: center; border-radius: 8px; }
  footer a { color: #39ff14; }
</style>
<main><p>محتوى الصفحة هنا…</p></main>
<footer>
  <p>© 2026 PhineX Academy. كل الحقوق محفوظة.</p>
  <p><a href="#">الخصوصية</a> · <a href="#">اتصل بينا</a></p>
</footer>
```

## syntax

```html nolive
<footer>
  <p>© 2026 اسم الموقع</p>
  <nav aria-label="روابط التذييل">…</nav>
</footer>
```

- `<footer>` — **الوسم الافتتاحي**.
- المحتوى — حقوق نشر، روابط، معلومات تواصل.
- `<nav>` — اختياري: لو فيه مجموعة روابط ينفع تتسمّى.
- `</footer>` — **الوسم الختامي** إجباري.

## use

- لحقوق النشر وسنة الموقع في آخر الصفحة.
- لروابط ثانوية: الخصوصية، الشروط، اتصل بينا.
- لمعلومات الكاتب والتصنيف والتاريخ في آخر المقال.
- لمعلومات الاتصال (مع `<address>`).
- لأيقونات السوشيال ميديا في آخر الصفحة.

## avoid

- متحطش جواه `<header>` أو `<footer>`.
- متستخدمهوش للمحتوى الأساسي.
- متعتمدش إنه لازم يبقى آخر عنصر في الكود؛ هو معنى مش مكان.
- متحطش أكتر من `contentinfo` واحد على مستوى الصفحة.
- متستخدمهوش كحاوية عامة لأي حاجة تحت.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق، زي `class="site-footer"`.

### id
اسم فريد لو عايز تستهدفه.

## examples

### 1) تذييل صفحة بسيط
حقوق نشر وبس.

```html
<footer>
  <p>© 2026 موقعي. كل الحقوق محفوظة.</p>
</footer>
```

- أبسط وأشهر استخدام: سطر حقوق النشر في آخر الصفحة.
- لأنه على مستوى الصفحة (مش جوه مقال) بياخد دور `contentinfo`.
- الرمز © بيتكتب كحرف عادي أو `&copy;` (راجع [[entities]]).

### 2) تذييل بروابط
روابط ثانوية في قايمة.

```html
<style>
  footer ul { display: flex; gap: 12px; list-style: none; padding: 0; justify-content: center; }
</style>
<footer>
  <ul>
    <li><a href="#">الخصوصية</a></li>
    <li><a href="#">الشروط</a></li>
    <li><a href="#">اتصل بينا</a></li>
  </ul>
  <p style="text-align:center">© 2026</p>
</footer>
```

- القايمة أفقية بـ Flexbox، والنقط اتشالت.

### 3) تذييل مقال
التذييل هنا يخص المقال بس.

```html
<article>
  <h2>مقدمة في CSS</h2>
  <p>CSS بتجمّل صفحات الويب.</p>
  <footer>
    <p>التصنيف: CSS · كتبه أحمد</p>
  </footer>
</article>
```

- الـ footer دي مش contentinfo، هي تذييل المقال ده.

### 4) تذييل مع معلومات اتصال
`<address>` بيعبّر عن بيانات الاتصال.

```html
<footer>
  <address>
    تواصل معانا: <a href="mailto:hello@example.com">hello@example.com</a>
  </address>
</footer>
```

- `<address>` للتواصل مع صاحب الصفحة، مش لأي عنوان.

### 5) تذييل بأعمدة
تنسيق متقدم شوية.

```html
<style>
  .cols { display: flex; gap: 20px; justify-content: center; text-align: right; }
  .cols h3 { font-size: 15px; margin: 0 0 6px; }
  .cols a { display: block; font-size: 13px; }
</style>
<footer>
  <div class="cols">
    <div><h3>الكورسات</h3><a href="#">HTML</a><a href="#">CSS</a></div>
    <div><h3>عنّا</h3><a href="#">مين إحنا</a><a href="#">وظايف</a></div>
  </div>
</footer>
```

- العناوين جوه الـ footer بتساعد المستخدم يفهم كل عمود.

### 6) تذييل لقسم
القسم ممكن يبقى له خاتمة.

```html
<section>
  <h2>الأسئلة الشائعة</h2>
  <p>…</p>
  <footer><p>لسه عندك سؤال؟ <a href="#">كلمنا</a></p></footer>
</section>
```

- ده تذييل القسم «الأسئلة الشائعة» بس، مش تذييل الصفحة.
- بما إنه جوه `<section>`، مش بياخد دور `contentinfo`.
- مفيد لو القسم ليه خاتمة زي «لسه عندك سؤال؟».

## rules

- parents: أي عنصر بيقبل **Flow content** (زي `<body>` و `<article>` و `<section>`)، لكن مش جوه `<header>` أو `<footer>` تاني.
- children: **Flow content**، لكن **مينفعش** فيه `<header>` أو `<footer>`.
- closing: الوسم الختامي `</footer>` إجباري.
- role: `contentinfo` لو على مستوى الصفحة، وإلا `generic`.
- dom: `HTMLElement`.
- layout: `display: block`.

## mistakes

### footer جوه footer
```html bad
<footer>
  <footer>حقوق</footer>
</footer>
```
```html good
<footer>
  <p>حقوق</p>
</footer>
```
ليه؟ الـ `<footer>` مينفعش يحتوي `<footer>` تاني.

### header جوه footer
```html bad
<footer>
  <header>عنوان</header>
</footer>
```
```html good
<footer>
  <h2>عنوان</h2>
</footer>
```
ليه؟ كمان `<header>` ممنوع جوه `<footer>`.

### footer لمحتوى أساسي
```html bad
<footer>
  <h1>مقال كامل طويل</h1>
  <p>…</p>
</footer>
```
```html good
<main>
  <article><h1>مقال</h1><p>…</p></article>
</main>
<footer>…</footer>
```
ليه؟ الـ `<footer>` للمعلومات الختامية بس.

## a11y

- الـ `<footer>` على مستوى الصفحة Landmark `contentinfo`.
- متحطش جواه كتير من الروابط من غير تنظيم، استخدم `<nav aria-label="…">` للمجموعات.
- حافظ على تباين الألوان: التذييل غالباً غامق ونص فاتح، اتأكد إن النص مقروء.

## tips

- لو التذييل فيه روابط تنقل رئيسية، لفّها في `<nav aria-label>`.
- في الموبايل خلّي الأعمدة تتحول لعمود واحد.
- متنساش تحدّث سنة حقوق النشر.
- جرّب تخليه يلزق في آخر الصفحة لو المحتوى قصير بـ CSS.

## quiz

### أنهي الدور (role) للـ `<footer>` على مستوى الصفحة؟
- [ ] `banner`
- [ ] `main`
- [x] `contentinfo`
- [ ] `navigation`
الـ footer اللي على مستوى الصفحة بياخد دور `contentinfo`.

### أنهي مسموح جوه `<footer>`؟
- [ ] `<header>`
- [ ] `<footer>`
- [x] `<p>` و `<nav>`
- [ ] `<main>`
الـ footer مينفعش يحتوي header أو footer.

### جوه `<article>`، الـ `<footer>` بيبقى؟
- [x] تذييل المقال بس، مش contentinfo
- [ ] تذييل الصفحة
- [ ] غلط
- [ ] بيتجاهله المتصفح
الـ footer بيخص أقرب أب ليه.

## refs

- [MDN: footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer)
- [WHATWG: The footer element](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element)
