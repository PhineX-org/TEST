---
id: fn-url
kind: function
cat: fn-misc
chip: url()
title: مسار ملف
en: CSS url() function
status: stable
support: all
mdn: url_function
summary: url() بتشير لملف خارجي (صورة أو خط أو cursor) أو data URI: background-image: url("photo.jpg").
keywords: url, صورة, background-image, data uri, مسار
related: background-image, at-font-face, cursor, list-style-image, fn-linear-gradient
---

## intro

الدالة `url()` بتشير لـ **ملف خارجي** تحتاجه CSS: **صورة** خلفية (`background-image: url("hero.jpg")`)، **خط** في [[at-font-face]] (`src: url("font.woff2")`)، **cursor** مخصص، **علامة قائمة**، `mask-image`، وغيره. المسار بيتحسب **نسبة لملف الـ CSS** نفسه (مش لصفحة HTML!) لو كان نسبي، وده مصدر ارتباك شائع.

تنسيقات المسار: نسبي `url("../img/a.png")`، من الجذر `url("/img/a.png")`، رابط كامل `url("https://...")`.

وفيه **data URI**: بتحط الملف **جوه** الـ CSS كنص: `url("data:image/svg+xml;utf8,<svg ...>")`، مفيد لأيقونات صغيرة بدون طلب شبكة (لازم تشفّر `#` بـ `%23`).

نصايح: علامات التنصيص اختيارية لكن **مستحسنة** (خصوصاً لو المسار فيه مسافات أو أقواس). وملف الصورة اللي مش موجود بيعدّي بصمت (مفيش خطأ ظاهر)، فاتأكد من المسار في أدوات المطور (Network). وللصور المتعددة: `background-image: url(a.png), url(b.png)`.

## try

```html
<style>
  .b { width:150px; height:70px; border-radius:10px; border:2px solid #7a4a1d; color:#3d2c18; display:grid; place-items:center; font-weight:bold;
       background:#efe0bd url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='4' fill='%23c9772f'/></svg>") 0 0/20px 20px; }
</style>
<div class="b">خلفية من data URI</div>
```

## syntax

```css nolive
background-image: url("hero.jpg");
background-image: url("../img/a.png"), url("/img/b.png");
src: url("font.woff2") format("woff2");
cursor: url("hand.png") 4 4, pointer;
```

- المسار النسبي نسبة لملف CSS.
- علامات التنصيص مستحسنة.
- `data:` لتضمين الملف.
- صور متعددة بفاصلة.

## use

- صور خلفية.
- خطوط @font-face.
- أيقونات data URI صغيرة.

## avoid

- افتراض إن المسار نسبة لصفحة HTML.
- data URI لصور كبيرة (يزوّد حجم CSS).

## examples

### 1) data URI
أيقونة مضمّنة.

```html
<style>
  .b { width:150px; height:70px; border-radius:10px; border:2px solid #7a4a1d; color:#3d2c18; display:grid; place-items:center; font-weight:bold;
       background:#efe0bd url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='4' fill='%23c9772f'/></svg>") 0 0/20px 20px; }
</style>
<div class="b">نقاط</div>
```



### 2) أكتر من خلفية
قايمة بفواصل.

```html
<style>
  .b { width:160px; height:80px; border-radius:10px; background:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='12' fill='%23c9772f'/></svg>") no-repeat 10px 10px,
      linear-gradient(#efe0bd,#e4c490); }
</style>
<div class="b"></div>
```



### 3) مسارات نسبية
شرح بالكود.

```html nolive
<style>
/* ملف: css/main.css */
.hero { background: url("../img/hero.jpg"); }   /* نسبة لـ css/ */
.logo { background: url("/assets/logo.svg"); }  /* من جذر الموقع */
</style>
```



### 4) cursor مخصص
صورة مع احتياطي.

```html nolive
<style>
.btn { cursor: url("hand.png") 4 4, pointer; }
</style>
```



## mistakes

### مسار نسبة لـ HTML

```css bad
.a { background:url("img/a.png"); }  /* لو CSS في مجلد css/ */
```

```css good
.a { background:url("../img/a.png"); }
```

نسبة لملف CSS.

### # في data URI

```css bad
url("data:image/svg+xml;utf8,<svg ... fill='#c9772f'>")
```

```css good
... fill='%23c9772f' ...
```

شفّر # بـ %23.

## quiz

### المسار النسبي في url() نسبة لـ؟
- [x] ملف CSS
- [ ] صفحة HTML
- [ ] الجذر
- [ ] المتصفح

CSS.

### الحرف # في data URI؟
- [x] يتشفّر %23
- [ ] يتساب
- [ ] يتحذف
- [ ] يتضاعف

%23.

### هل علامات التنصيص إجبارية؟
- [x] لأ لكن مستحسنة
- [ ] أيوه
- [ ] فقط مع http
- [ ] فقط مع data

اختيارية.

## refs

- [MDN: url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url_function)
