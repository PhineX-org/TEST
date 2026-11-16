---
id: dir
kind: element
cat: old-text
tag: dir
title: قايمة الدليل القديمة (dir)
en: HTML dir element (deprecated)
status: deprecated
display: block
void: no
support: all
size: compact
summary: عنصر dir كان لقايمة ملفات أو أدلة بشكل مدمج. اتحذف، وبتتعامل المتصفحات معاه زي ul. استخدم ul مع li للقوائم غير المرتبة، أو menu لقايمة أوامر.
keywords: dir, directory, قايمة, ملفات, ul, li, menu, قديم, deprecated, قائمة
related: ul, ol, li, menu
---

## intro

`<dir>` (من **directory** يعني دليل ملفات) كان مخصص لقايمة صغيرة من الأسماء، زي قايمة ملفات في مجلد. الفكرة كانت إن المتصفح يعرضها مضغوطة في أعمدة، لكن عملياً **ولا متصفح عمل كده**، وبقى بيتصرف **زي `<ul>` بالظبط**.

عشان كده HTML5 حذفته. استخدم [[ul]] مع [[li]] للقوائم العادية، [[ol]] للمرتبة، و[[menu]] لو القايمة أوامر أو أدوات. لو لقيت `<dir>` في كود قديم: غيّره لـ `<ul>` وهتشتغل بنفس الشكل.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<dir>` = `<ul>` عملياً. استخدم `<ul>` أو `<menu>`.

## try

```html
<dir>
  <li>index.html</li>
  <li>style.css</li>
  <li>app.js</li>
</dir>
```

## syntax

```html nolive
<dir>
  <li>عنصر</li>
</dir>
```

- `<dir>` — **الوسم الافتتاحي** (قديم).
- `<li>` — **عناصر القايمة**.
- `</dir>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة.
- لفهم إن بعض الوسوم بتتحوّل عملياً لوسوم تانية.

## avoid

- متستخدمهوش: `<ul>` هو الأصل.

## instead

استخدم [[ul]] للقايمة غير المرتبة (نفس الشكل)، و[[ol]] لو الترتيب مهم، و[[menu]] لقايمة أوامر.

```html
<ul>
  <li>index.html</li>
  <li>style.css</li>
  <li>app.js</li>
</ul>
```

## examples

### 1) dir مقابل ul
نفس العرض.

```html
<dir><li>ملف 1</li><li>ملف 2</li></dir>
<ul><li>ملف 1</li><li>ملف 2</li></ul>
```

- الشكل نفسه: نقط وقايمة عمودية.
- `<ul>` هو المعيار والـ `<dir>` محذوف.
- تبديل الوسم الافتتاحي والختامي كفاية.

### 2) قايمة مرتبة لو الترتيب مهم
ol.

```html
<ol>
  <li>افتح المجلد</li>
  <li>انسخ الملف</li>
  <li>الصقه في المكان الجديد</li>
</ol>
```

- لو الترتيب مهم `<ol>` بتديك أرقام.
- `<dir>` عمره ما كان فيه ترقيم.
- اختار حسب المعنى.

### 3) قايمة أوامر
menu.

```html
<menu>
  <li><button>فتح</button></li>
  <li><button>حفظ</button></li>
  <li><button>طباعة</button></li>
</menu>
```

- `<menu>` قايمة أدوات أو أوامر تفاعلية.
- بتتصرف زي `<ul>` شكلياً.
- مفيد لأشرطة الأدوات.

## mistakes

### dir لقايمة ملفات
```html bad
<dir><li>a.txt</li></dir>
```
```html good
<ul><li>a.txt</li></ul>
```
ليه؟ العنصر محذوف، و`<ul>` بيعمل نفس الشغل.

## quiz

### إيه البديل الأنسب لـ `<dir>`؟
- [x] `<ul>`
- [ ] `<table>`
- [ ] `<div>`
- [ ] `<select>`
بيتصرف زي `<ul>` أصلاً.

### هل `<dir>` بيعرض أعمدة مضغوطة؟
- [ ] أيوه دايماً
- [x] لأ، بيتعرض زي `<ul>`
- [ ] بس في كروم
- [ ] بس موبايل
المتصفحات تجاهلت الفكرة.

## refs

- [MDN: dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dir)
