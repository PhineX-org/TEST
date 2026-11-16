---
id: noembed
kind: element
cat: old-other
tag: noembed
title: بديل التضمين (noembed)
en: HTML noembed element (deprecated)
status: deprecated
display: none
void: no
support: limited
support_note: محتواه مخفي في المتصفحات الحديثة لأنها بتدعم embed.
size: compact
summary: عنصر noembed كان بيحط محتوى بديل للمتصفحات اللي مش بتدعم embed. اتحذف، والبديل وضع المحتوى الاحتياطي جوه object أو audio أو video مباشرة.
keywords: noembed, embed, بديل, fallback, plugin, object, قديم, deprecated, محتوى بديل
related: embed, object, noscript
---

## intro

`<noembed>` كان بيتحط **بعد** [[embed]] عشان يعرض محتوى **بديل** لو المتصفح مش بيدعم `<embed>` (زمان لما كانت المتصفحات لسه بتفرق). المتصفحات اللي بتدعم `<embed>` بتتجاهل محتوى `<noembed>` وتخفيه.

الغريب إن `<embed>` نفسه (عنصر void من غير محتوى) مفيش فيه مكان للمحتوى البديل، فكان `<noembed>` الحل. دلوقتي كل المتصفحات بتدعم `<embed>`، والعنصر ده بقى **مش مفيد**. الأفضل: [[object]] (محتواه الاحتياطي جواه)، أو [[audio]] و[[video]] اللي ليهم محتوى احتياطي كطبيعتهم.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<noembed>` محتواه بيتخفي دلوقتي. استخدم محتوى احتياطي جوه `<object>` أو `<video>`.

## try

```html
<noembed id="n">محتوى بديل للتضمين</noembed>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'قيمة display: ' + getComputedStyle(document.getElementById('n')).display;
</script>
```

## syntax

```html nolive
<embed src="movie.swf" type="application/x-shockwave-flash">
<noembed>محتوى بديل لو embed مش مدعوم.</noembed>
```

- `<noembed>` — **بعد `<embed>`** عادة.
- المحتوى — **البديل** لو embed مش مدعوم.
- `</noembed>` — **الوسم الختامي**.

## use

- لفهم صفحات قديمة بتضمّن بـ embed.

## avoid

- متستخدمهوش: حط المحتوى الاحتياطي جوه `<object>` أو في `<video>`.

## instead

استخدم [[object]] والمحتوى الاحتياطي جواه، أو [[audio]] و[[video]] اللي بتعرض نصها الاحتياطي لو مش مدعومة.

```html
<object data="missing-file.pdf" type="application/pdf" width="100%" height="60">
  <p>مش قادر أعرض الملف. <a href="missing-file.pdf">نزّله من هنا</a>.</p>
</object>
```

## examples

### 1) noembed الأصلي
بعد embed.

```html nolive
<embed src="clip.swf" width="300" height="200">
<noembed>
  <a href="clip.swf">حمّل المقطع</a>
</noembed>
```

- `<noembed>` بيتحط بعد `<embed>` مباشرة.
- المتصفحات الحديثة بتخفيه.
- ملف SWF/Flash نفسه كمان اتشال.

### 2) محتوى احتياطي جوه object
البديل الأفضل.

```html
<object data="nonexistent.pdf" type="application/pdf" width="100%" height="70">
  <p>المتصفح مش قادر يعرض الملف. <a href="#">نزّله</a>.</p>
</object>
```

- لو الملف ماتحملش أو النوع مش مدعوم، النص اللي جوه بيظهر.
- ده أسلوب معتمد وأنضف من `<noembed>`.
- حط رابط تحميل دايماً.

### 3) نص احتياطي في video
مدمج.

```html
<video controls width="260">
  <source src="not-found.mp4" type="video/mp4">
  متصفحك مش بيدعم الفيديو.
</video>
```

- النص جوه `<video>` بيظهر للمتصفحات اللي مش بتدعمه.
- مفيش عنصر خاص للبديل: هو جوه العنصر نفسه.
- ده نموذج حديث لنفس الفكرة.

## mistakes

### الاعتماد على noembed لعرض البديل
```html bad
<embed src="file.pdf">
<noembed>مش هيظهر البديل ده</noembed>
```
```html good
<object data="file.pdf" type="application/pdf">
  <a href="file.pdf">حمّل الملف</a>
</object>
```
ليه؟ محتوى `<noembed>` مخفي في المتصفحات الحديثة، و`<object>` بيعرض بديله فعلاً لو فشل التحميل.

## quiz

### إيه وظيفة `<noembed>`؟
- [x] محتوى بديل لـ `<embed>`
- [ ] تضمين فيديو
- [ ] تضمين صورة
- [ ] تنسيق
بديل قديم.

### أنسب بديل حديث؟
- [x] محتوى احتياطي جوه `<object>`
- [ ] `<br>`
- [ ] `<hr>`
- [ ] `<center>`
بيتعرض فعلاً عند الفشل.

## refs

- [MDN: noembed](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noembed)
