---
id: frame
kind: element
cat: old-other
tag: frame
title: الإطار (frame)
en: HTML frame element (deprecated)
status: deprecated
display: block
void: yes
support: limited
support_note: بيشتغل فقط جوه frameset، والمتصفحات بتعرضه للتوافق فقط.
size: compact
summary: عنصر frame هو إطار واحد جوه frameset بيحمّل صفحة مستقلة بـ src. محذوف من المعيار، والبديل iframe للتضمين وCSS Grid لتقسيم الصفحة.
keywords: frame, frameset, إطار, src, name, target, iframe, قديم, deprecated, تضمين
related: frameset, noframes, iframe
---

## intro

`<frame>` هو **القطعة الواحدة** جوه [[frameset]]. كل `<frame>` بيحمّل **صفحة HTML مستقلة** بالخاصية `src`، وليه `name` عشان الروابط في إطار تفتح في إطار تاني (`target="main"`). مينفعش تستخدمه خارج `<frameset>` وإلا المتصفح يتجاهله.

بعد ما الإطارات اتحذفت من المعيار، استخدم [[iframe]] لو محتاج تضمين صفحة جوه صفحة (وده بيشتغل في أي مكان جوه `<body>` عادي)، أو CSS Grid للتخطيط. الفرق المهم: `<frame>` عنصر فاضي (من غير وسم ختامي)، و`<iframe>` ليه وسم ختامي.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<frame>` بيشتغل جوه `<frameset>` بس. استخدم `<iframe>` للتضمين.

## try

```html
<iframe title="مثال frame" style="width:100%;height:100px;border:1px solid #cbd5e1"
  srcdoc="<frameset cols='50%,50%'><frame src='data:text/html;charset=utf-8,%3Cbody style=font-family:sans-serif%3E%D8%A5%D8%B7%D8%A7%D8%B1 1%3C/body%3E'><frame src='data:text/html;charset=utf-8,%3Cbody style=font-family:sans-serif%3E%D8%A5%D8%B7%D8%A7%D8%B1 2%3C/body%3E'></frameset>"></iframe>
```

## syntax

```html nolive
<frame src="page.html" name="main" scrolling="auto">
```

- `src` — **عنوان الصفحة** اللي بتتحمّل في الإطار.
- `name` — **اسم الإطار** عشان الروابط تستهدفه.
- `scrolling` — **التمرير** (`auto` أو `yes` أو `no`).
- عنصر فاضي: **مفيش وسم ختامي**.

## use

- لفهم صفحات قديمة مبنية بإطارات.
- لتعرف الفرق مع iframe.

## avoid

- متستخدمهوش في أي كود جديد.

## instead

استخدم [[iframe]] لتضمين صفحة داخل صفحة، أو اعمل الصفحة بمكوّنات (components) أو بنفس الصفحة بـ CSS Grid.

```html
<iframe src="page.html" title="محتوى الإطار" width="100%" height="200"></iframe>
```

## examples

### 1) frame داخل frameset
الاستخدام الأصلي.

```html nolive
<frameset rows="60,*">
  <frame src="top.html" name="top" scrolling="no">
  <frame src="main.html" name="main">
</frameset>
```

- الصف الأول 60 بكسل والتاني الباقي (`*`).
- `scrolling="no"` بيشيل شريط التمرير.
- الاسم `main` بيستخدمه `target="main"`.

### 2) رابط يفتح في إطار
target.

```html nolive
<!-- في menu.html -->
<a href="lesson1.html" target="main">الدرس الأول</a>
```

- `target` بيحدد اسم الإطار اللي هيفتح فيه الرابط.
- ده السبب إن الـ URL الرئيسي مش بيتغيّر.
- مع iframe ممكن نستخدم نفس `target` بنفس طريقة اسم `name`.

### 3) iframe بدل frame
الحديث.

```html
<iframe name="view" title="العارض" style="width:100%;height:80px;border:1px solid #cbd5e1"
  srcdoc="<p style='font-family:sans-serif'>الصفحة الأولى</p>"></iframe>
<p><a href="#" onclick="document.querySelector('[name=view]').srcdoc='<p style=\'font-family:sans-serif\'>الصفحة الثانية</p>'; return false">حمّل صفحة تانية</a></p>
```

- الـ iframe بيتحط في أي مكان عادي.
- بنغيّر المحتوى بـ `srcdoc` أو `src`.
- ليه `title` عشان قارئ الشاشة.

## mistakes

### frame خارج frameset
```html bad
<body>
  <frame src="page.html">
</body>
```
```html good
<body>
  <iframe src="page.html" title="صفحة"></iframe>
</body>
```
ليه؟ الـ `<frame>` مبيشتغلش إلا جوه `<frameset>`، والـ `<iframe>` هو اللي يتحط في الصفحة العادية.

## quiz

### فين بيشتغل `<frame>`؟
- [x] جوه `<frameset>` بس
- [ ] أي مكان
- [ ] جوه `<body>`
- [ ] جوه `<head>`
خارجه بيتجاهل.

### الفرق بين frame وiframe؟
- [x] frame جوه frameset وiframe جوه الصفحة العادية
- [ ] مفيش فرق
- [ ] iframe أقدم
- [ ] frame أسرع
iframe هو الحديث.

## refs

- [MDN: frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/frame)
