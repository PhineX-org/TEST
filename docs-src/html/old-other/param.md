---
id: param
kind: element
cat: old-other
tag: param
title: معامل التضمين (param)
en: HTML param element (deprecated)
status: deprecated
display: none
void: yes
support: limited
support_note: ما بيتعرضش، وبيتقري بس عن طريق DOM أو المشغّلات القديمة داخل object.
size: compact
summary: عنصر param كان بيمرّر معاملات (اسم وقيمة) لإضافة أو object مضمّنة. اتحذف تقريباً مع اختفاء الإضافات، والبديل data attributes أو عناوين URL أو خصائص JavaScript.
keywords: param, معامل, object, name, value, إضافة, plugin, data attributes, قديم, deprecated, إعدادات
related: object, embed
---

## intro

لما كنت بتضمّن **إضافة** (Flash أو Java أو Silverlight) بـ [[object]]، كنت محتاج تبعتلها **إعدادات**: رابط الفيديو، لون الخلفية، السرعة. وده كان شغل `<param name="…" value="…">`: عنصر فاضي بيتحط **جوه `<object>`** وبيمرّر زوج اسم وقيمة للإضافة.

الإضافات اختفت، فالعنصر ده فقد معظم قيمته. المتصفح لسه بيحلله ويحطه في الـ DOM (وبتقدر تقراه بجافاسكربت)، لكنه **مش بيتعرض** (`display: none`) ومفيش حاجة بتستخدمه. للإعدادات النهارده استخدم **`data-*` attributes** على العنصر، أو معاملات الـ URL، أو خصائص بجافاسكربت.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<param>` مرتبط بإضافات اختفت. استخدم `data-*` أو معاملات URL.

## try

```html
<object id="ob" data="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'/>" type="image/svg+xml" width="1" height="1">
  <param name="speed" value="fast">
  <param name="theme" value="dark">
</object>
<p id="o"></p>
<script>
  const ps = document.querySelectorAll('#ob param');
  document.getElementById('o').textContent = [...ps].map(p => p.name + '=' + p.value).join(' | ');
</script>
```

## syntax

```html nolive
<object data="player.swf" type="application/x-shockwave-flash">
  <param name="autoplay" value="true">
  <param name="volume" value="80">
</object>
```

- `name` — **اسم المعامل**.
- `value` — **قيمته**.
- بيتحط **أول ابن** جوه `<object>`.
- عنصر فاضي: **مفيش وسم ختامي**.

## use

- لفهم كود قديم بيضمّن إضافات.

## avoid

- متستخدمهوش: الإضافات اللي كانت بتقرأه انتهت.

## instead

مرّر الإعدادات بـ `data-*` attributes على العنصر وقراءتها بجافاسكربت، أو بمعاملات في الـ URL (`?speed=fast`)، أو بخصائص CSS custom properties.

```html
<div id="player" data-speed="fast" data-theme="dark"></div>
<p id="o"></p>
<script>
  const el = document.getElementById('player');
  document.getElementById('o').textContent = 'speed=' + el.dataset.speed + ' | theme=' + el.dataset.theme;
</script>
```

## examples

### 1) param مع object القديم
الاستخدام الأصلي.

```html nolive
<object data="game.swf" type="application/x-shockwave-flash" width="400" height="300">
  <param name="quality" value="high">
  <param name="bgcolor" value="#000000">
  <p>محتاج Flash لتشغيل اللعبة.</p>
</object>
```

- كل `<param>` بيمرّر إعداد واحد للإضافة.
- النص بعدهم هو المحتوى الاحتياطي.
- Flash نفسه اتشال سنة 2020.

### 2) إعدادات بـ data attributes
الأسلوب الحديث.

```html
<div id="w" data-color="#0ea5e9" data-size="22" style="font-weight:bold">نص متنسّق من الإعدادات</div>
<script>
  const w = document.getElementById('w');
  w.style.color = w.dataset.color;
  w.style.fontSize = w.dataset.size + 'px';
</script>
```

- `data-*` بتتقري بـ `element.dataset`.
- الأسماء بتتحول من `data-my-key` لـ `dataset.myKey`.
- ده المكان الطبيعي لإعدادات عنصر صغير.

## mistakes

### param خارج object
```html bad
<div>
  <param name="a" value="1">
</div>
```
```html good
<div data-a="1"></div>
```
ليه؟ الـ `<param>` مصمّم يتحط جوه `<object>` فقط، و`data-*` أنسب للإعدادات اليوم.

## quiz

### فين بيتحط `<param>`؟
- [x] جوه `<object>`
- [ ] جوه `<head>`
- [ ] جوه `<ul>`
- [ ] جوه `<table>`
كطفل لـ object.

### إيه بديل تمرير الإعدادات اليوم؟
- [x] `data-*` attributes
- [ ] `<param>` برضو
- [ ] `<br>`
- [ ] `<hr>`
بتتقري بـ dataset.

## refs

- [MDN: param](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/param)
