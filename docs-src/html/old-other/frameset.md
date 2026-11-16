---
id: frameset
kind: element
cat: old-other
tag: frameset
title: مجموعة الإطارات (frameset)
en: HTML frameset element (deprecated)
status: deprecated
display: block
void: no
support: limited
support_note: المتصفحات لسه بتعرضه للتوافق مع صفحات قديمة، لكنه محذوف من المعيار ومش مناسب لأي موقع جديد.
size: compact
summary: عنصر frameset كان بيقسّم نافذة المتصفح لإطارات (frames) كل واحد بصفحة مستقلة. اتشال لمشاكله، والبديل CSS Grid أو Flexbox للتخطيط وiframe لتضمين صفحات.
keywords: frameset, frame, إطارات, تقسيم, rows, cols, framesetting, iframe, grid, قديم, deprecated, layout
related: frame, noframes, iframe
---

## intro

قبل CSS، كانت طريقة عمل «تخطيط ثابت» (قايمة جانبية وصفحة محتوى) إنك تقسّم النافذة بـ `<frameset>` لـ **إطارات**، وكل إطار (`<frame>`) بيحمّل **صفحة HTML مستقلة**. الصفحة بتبدأ بـ `<frameset>` **بدل `<body>`**، وبتحدد التقسيم بـ `cols` (أعمدة) أو `rows` (صفوف) بالنسب أو البكسل.

اتحذف لأن مشاكله كتير: الـ **URL** في شريط العنوان ما بيتغيّرش لما تتنقل جوه الإطارات (مش ينفع تحفظ أو تشارك)، **زر الرجوع** بيتلخبط، **محركات البحث** بتفهرس الإطار لوحده، و**الإتاحة** سيئة. البديل: **CSS Grid/Flexbox** للتخطيط، و[[iframe]] لو فعلاً محتاج تضمّن صفحة.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<frameset>` و`<frame>` محذوفين. التخطيط بـ CSS Grid، والتضمين بـ `<iframe>`.

## try

```html
<iframe title="مثال frameset" style="width:100%;height:120px;border:1px solid #cbd5e1"
  srcdoc="<frameset cols='40%,60%'><frame src='data:text/html;charset=utf-8,%3Cbody%20style%3Dfont-family%3Asans-serif%3E%3Ch4%3E%D8%A7%D9%84%D9%82%D8%A7%D9%8A%D9%85%D8%A9%3C%2Fh4%3E'><frame src='data:text/html;charset=utf-8,%3Cbody%20style%3Dfont-family%3Asans-serif%3E%3Ch4%3E%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D9%88%D9%89%3C%2Fh4%3E'></frameset>"></iframe>
```

## syntax

```html nolive
<frameset cols="30%,70%">
  <frame src="menu.html">
  <frame src="content.html">
</frameset>
```

- `<frameset>` — **بيحل محل `<body>`** (قديم).
- `cols` — **تقسيم أفقي** بنسب أو بكسل.
- `rows` — **تقسيم رأسي**.
- `<frame>` — **كل إطار** بـ `src` لصفحة.

## use

- موجود في صفحات قديمة محتاج تفهمها أو تحوّلها.
- لتعرف تاريخ تخطيط الويب.

## avoid

- متستخدمهوش في أي موقع جديد: بيكسر الروابط والرجوع والبحث.

## instead

للتخطيط استخدم **CSS Grid** (أعمدة وصفوف). لو محتاج تضمين صفحة تانية استخدم [[iframe]]. ولتكرار هيدر وقايمة: component أو template على السيرفر أو JavaScript.

```html
<div style="display:grid; grid-template-columns: 30% 1fr; gap:8px; height:110px">
  <nav style="background:#e2e8f0; padding:8px">القايمة</nav>
  <main style="background:#f1f5f9; padding:8px">المحتوى</main>
</div>
```

## examples

### 1) frameset الأساسي
عمودين.

```html nolive
<!DOCTYPE html>
<html>
<head><title>إطارات</title></head>
<frameset cols="30%,70%">
  <frame src="menu.html" name="menu">
  <frame src="home.html" name="main">
</frameset>
</html>
```

- مفيش `<body>`: الـ `<frameset>` هو الجسم.
- كل `<frame>` بيحمّل صفحة منفصلة.
- الرابط ممكن يستهدف إطار بالاسم عن طريق `target="main"`.

### 2) تخطيط بـ Grid بدل الإطارات
نفس الشكل.

```html
<style>
  .lay { display:grid; grid-template-columns: 1fr 2fr; grid-template-rows: 40px 1fr; gap:6px; height:130px; direction: rtl }
  .lay > * { background:#e2e8f0; padding:6px; border-radius:6px }
  .lay header { grid-column: 1 / -1; background:#0f172a; color:#fff }
</style>
<div class="lay"><header>الهيدر</header><nav>القايمة</nav><main>المحتوى</main></div>
```

- الهيدر بيمتد على العمودين بـ `grid-column: 1 / -1`.
- ده تخطيط في صفحة واحدة وURL واحد.
- الروابط والرجوع والبحث كلها شغالة صح.

### 3) تضمين صفحة بـ iframe
لما تحتاج.

```html
<iframe title="صفحة مضمّنة" style="width:100%;height:100px;border:1px solid #cbd5e1"
  srcdoc="<p style='font-family:sans-serif'>صفحة مضمّنة جوه الصفحة.</p>"></iframe>
```

- `<iframe>` بيتحط في أي مكان في الصفحة العادية.
- ليه `title` لقارئ الشاشة.
- متستخدمهوش للتخطيط العام، بس للمحتوى المضمّن فعلاً.

## mistakes

### استخدام الإطارات للتخطيط
```html bad
<frameset cols="25%,75%">
  <frame src="menu.html">
  <frame src="page.html">
</frameset>
```
```html good
<div style="display:grid;grid-template-columns:25% 1fr">
  <nav>القايمة</nav><main>المحتوى</main>
</div>
```
ليه؟ الإطارات بتكسر الروابط وزر الرجوع وفهرسة البحث، وCSS Grid بيدّيك نفس التخطيط في صفحة واحدة.

## quiz

### إيه أكبر عيب في الإطارات؟
- [x] الـ URL مش بيتغيّر وبتكسر الرجوع والمشاركة
- [ ] غالية
- [ ] مش بتدعم ألوان
- [ ] بتستهلك رام
الصفحة المعروضة مش مطابقة للعنوان.

### إيه بديل تقسيم الشاشة؟
- [x] CSS Grid
- [ ] `<table>`
- [ ] `<hr>`
- [ ] `<center>`
تخطيط حديث ومرن.

## refs

- [MDN: frameset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/frameset)
