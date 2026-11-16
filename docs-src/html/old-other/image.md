---
id: image
kind: element
cat: old-other
tag: image
title: صورة قديمة (image)
en: HTML image element (obsolete alias of img)
status: obsolete
display: inline-block
void: no
support: none
size: compact
summary: الوسم image مش عنصر حقيقي في HTML: المتصفح بيحوّله تلقائياً لـ img. ده خطأ شائع من أيام المتصفحات القديمة، واستخدم img، أو image بس جوه SVG.
keywords: image, img, صورة, alias, parser, svg image, خطأ شائع, قديم, obsolete
related: img, picture, svg
---

## intro

لو كتبت `<image src="a.png">` في HTML، **المتصفح مش هيزعل**، لكنه كمان مش هيفهم إنك قصدت عنصر اسمه `image`. في خطوة الـ **parser**، أي وسم `<image>` (خارج SVG) بيتحوّل **تلقائياً لـ `<img>`**. ده موروث من أيام ناس كتير كانت بتغلط في الاسم، فالمتصفحات قررت «تصلّحه» بنفسها.

يعني ما فيش عنصر `image` في HTML: اكتب **[[img]]** من الأول. والتحذير: جوه **[[svg]]** فيه عنصر اسمه `<image>` حقيقي (بيحط صورة جوه رسمة SVG) ودي حاجة تانية خالص وبتحتاج `href` مش `src`.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<image>` في HTML بيتحوّل لـ `<img>`. اكتب `<img>`، و`<image>` الحقيقي جوه SVG بس.

## instead

اكتب [[img]] مع `alt` دايماً. ولو بتشتغل جوه [[svg]] وعايز صورة: `<image href="…">` (مع `href` مش `src`).

```html
<img src="photo.jpg" alt="وصف الصورة" width="120" height="80">
```

## examples

### 1) المتصفح بيحوّل image لـ img
اختبر بنفسك.

```html
<image id="a" alt="" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40'><rect width='80' height='40' rx='6' fill='%2339ff14'/></svg>">
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'اسم الوسم بعد الـ parser: ' + document.getElementById('a').tagName;
</script>
```

- الصورة ظهرت لأن المتصفح عاملها كـ `<img>`.
- الاسم اللي اتطبع هو `IMG` مش `IMAGE`.
- ده سلوك مقصود في معيار HTML، مش عيب في المتصفح.

### 2) image الحقيقي داخل SVG
بـ href.

```html
<svg width="120" height="60" viewBox="0 0 120 60">
  <image href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40'><rect width='80' height='40' rx='6' fill='%2339ff14'/></svg>" x="10" y="10" width="100" height="40"/>
</svg>
```

- جوه `<svg>` العنصر `<image>` حقيقي وليه معناه.
- بياخد `href` (وكان زمان `xlink:href`).
- لازم تحدد `x` و`y` و`width` و`height`.

### 3) img الصح
مع alt.

```html
<img alt="مستطيل أخضر" width="80" height="40" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40'><rect width='80' height='40' rx='6' fill='%2339ff14'/></svg>">
```

- `alt` بيوصف الصورة لقارئ الشاشة.
- تحديد `width` و`height` بيمنع قفز الصفحة أثناء التحميل.
- ده الوسم الوحيد الصح لصورة في HTML.

## refs

- [MDN: image](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/image)
