---
id: noframes
kind: element
cat: old-other
tag: noframes
title: بديل الإطارات (noframes)
en: HTML noframes element (deprecated)
status: deprecated
display: none
void: no
support: limited
support_note: المحتوى جواه مخفي في المتصفحات الحديثة لأنها بتدعم الإطارات، وبتتجاهل العنصر.
size: compact
summary: عنصر noframes كان بيحط محتوى بديل للمتصفحات اللي مش بتدعم الإطارات. اتحذف مع frameset، والمحتوى جواه بيتخفي دلوقتي، وعدم الاعتماد على الإطارات أصلاً هو الحل.
keywords: noframes, بديل, frameset, fallback, noembed, noscript, قديم, deprecated, محتوى بديل
related: frameset, frame, noscript
---

## intro

المتصفحات القديمة (Lynx وغيرها) كانت **ما بتفهمش الإطارات**. فكان المطوّر يحط `<noframes>` جوه [[frameset]] ويكتب جواه نسخة عادية من الصفحة: «متصفحك مش بيدعم الإطارات، اضغط هنا». المتصفحات اللي بتفهم الإطارات **بتتجاهل المحتوى ده** وتعرض الإطارات.

دلوقتي الإطارات نفسها اتحذفت، فالعنصر ده اتحذف معاها. وفي المتصفحات الحديثة محتواه **display: none** لو الإطارات مدعومة. الحل الحقيقي إنك **متستخدمش إطارات** من الأساس (CSS Grid + [[iframe]])، ولو محتاج محتوى بديل لـ JavaScript استخدم [[noscript]].

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<noframes>` بديل لمتصفحات ما بتدعمش الإطارات. مفيش مبرر ليه دلوقتي.

## try

```html
<noframes id="n">محتوى بديل للمتصفحات اللي مش بتدعم الإطارات</noframes>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'قيمة display للعنصر: ' + getComputedStyle(document.getElementById('n')).display;
</script>
```

## syntax

```html nolive
<frameset cols="50%,50%">
  <frame src="a.html">
  <frame src="b.html">
  <noframes>
    <body>متصفحك مش بيدعم الإطارات.</body>
  </noframes>
</frameset>
```

- `<noframes>` — **بيتحط جوه `<frameset>`**.
- المحتوى — **بديل** للمتصفحات اللي مش بتدعم الإطارات.
- `</noframes>` — **الوسم الختامي**.

## use

- لفهم صفحات قديمة مبنية بإطارات.

## avoid

- متستخدمهوش: متبنيش صفحات بإطارات من الأساس.

## instead

متستخدمش إطارات. اعمل الصفحة بـ CSS Grid، ولو محتاج بديل لحالة بدون JavaScript استخدم [[noscript]].

```html
<noscript>
  <p>الصفحة دي محتاجة JavaScript. فعّله من إعدادات المتصفح.</p>
</noscript>
```

## examples

### 1) noframes داخل frameset
الاستخدام الأصلي.

```html nolive
<frameset cols="25%,75%">
  <frame src="menu.html">
  <frame src="main.html">
  <noframes>
    <body>
      <p>اضغط <a href="main.html">هنا</a> لو متصفحك مش بيدعم الإطارات.</p>
    </body>
  </noframes>
</frameset>
```

- المتصفح الحديث بيتجاهل `<noframes>` ويعرض الإطارات.
- المتصفح القديم بيعرض المحتوى ده.
- كان بيحافظ على إتاحة الموقع.

### 2) هو مخفي في المتصفح الحديث
اختبار.

```html
<noframes id="n">أنا مخفي</noframes>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'display = ' + getComputedStyle(document.getElementById('n')).display;
</script>
```

- القيمة `none` يعني المحتوى مبيتعرضش.
- المتصفحات بتخفيه افتراضياً في ورقة التنسيق.
- عشان كده الزوّار مش بيشوفوه.

## mistakes

### الاعتماد على noframes لتجربة المستخدم
```html bad
<noframes>الموقع شغال بإطارات</noframes>
```
```html good
<!-- ابني الموقع بدون إطارات -->
<nav>القايمة</nav><main>المحتوى</main>
```
ليه؟ المحتوى جوه `<noframes>` مبيظهرش في المتصفحات الحديثة، فاعمل الموقع بدون إطارات أصلاً.

## quiz

### إيه وظيفة `<noframes>`؟
- [x] محتوى بديل لمتصفح مش بيدعم الإطارات
- [ ] يقسّم الصفحة
- [ ] يضيف إطار
- [ ] يحذف الإطارات
بديل قديم.

### إيه بديل المحتوى لو JavaScript مش شغال؟
- [x] `<noscript>`
- [ ] `<noframes>`
- [ ] `<noembed>`
- [ ] `<nobr>`
لجافاسكربت مش `noframes`.

## refs

- [MDN: noframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noframes)
