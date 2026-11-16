---
id: input-image
kind: inputtype
cat: input-types
chip: type="image"
title: زرار الصورة
en: <input type="image">
status: stable
support: all
mdn: Elements/input/image
summary: type="image" زرار إرسال شكله صورة، وبيبعت مع الفورم إحداثيات الضغطة (name.x وname.y). لازم alt وsrc. للحالات العادية الأفضل button فيه img.
keywords: input image, زرار صورة, submit image, alt, src, coordinates, name.x, name.y, formaction, خريطة صورة
related: input, input-submit, button, form, attr-alt, attr-src
---

## intro

ده زرار **إرسال (submit)** بس شكله **صورة** بدل زرار عادي. تضغط على الصورة فالفورم يتبعت. وفيه ميزة فريدة: بيبعت مع الفورم **إحداثيات النقطة اللي ضغطت عليها** داخل الصورة، كـ `name.x` و`name.y` (لو `name="map"` يبعت `map.x` و`map.y`). ده كان بيستخدم زمان في «الخرايط الخادمة» (server-side image maps).

لازم تحط [[attr-alt]] (النص البديل، ده بيشتغل كاسم الزرار لقارئ الشاشة) و[[attr-src]] (مسار الصورة). وفي الاستخدام الحديث الغالب مفيش داعي ليه: لو عايز زرار بشكل صورة أو أيقونة، استخدم `<button type="submit"><img alt="…"></button>` وده أمرن في التنسيق وأوضح. فاستخدم `type="image"` بس لو محتاج الإحداثيات فعلاً.

## try

```html
<form onsubmit="event.preventDefault()">
  <input type="image" name="go" alt="ابدأ" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%2322c55e'/%3E%3Ctext x='60' y='37' font-size='20' text-anchor='middle' fill='black'%3EGO%3C/text%3E%3C/svg%3E" onclick="event.preventDefault(); o.textContent = 'ضغطت عند x=' + event.offsetX + ' و y=' + event.offsetY">
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input type="image" name="go" src="button.png" alt="ابدأ" width="120" height="60">
```

- `src` و`alt` — الصورة ووصفها (الـ alt إلزامي).
- `name.x` و`name.y` — إحداثيات الضغطة تتبعت.
- `width` و`height` — حجم العرض.

## use

- إرسال فورم بصورة مخصّصة.
- اختيار موضع على صورة والسيرفر يستقبله.
- تعامل قديم مع خرايط الصور.

## avoid

- متنساش `alt`: من غيره الزرار من غير اسم.
- الأفضل `button` فيه `img` لو مفيش حاجة للإحداثيات.

## examples

### 1) إحداثيات الضغطة
offsetX وoffsetY.

```html
<input type="image" alt="لوحة" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%2322c55e'/%3E%3Ctext x='60' y='37' font-size='20' text-anchor='middle' fill='black'%3EGO%3C/text%3E%3C/svg%3E" onclick="event.preventDefault(); o.textContent = [event.offsetX, event.offsetY].join(' , ')">
<p id="o" dir="ltr"></p>
```

- الإحداثيات نسبة لأعلى يسار الصورة.
- الفورم الحقيقي بيبعتها كـ `name.x` و`name.y`.
- هنا منعنا الإرسال للتجربة.

### 2) الأفضل: button فيه img
بديل أمرن.

```html
<button type="submit" style="border:0; background:none; padding:0; cursor:pointer" onclick="event.preventDefault(); o.textContent='اتدوس'">
  <img alt="ابدأ" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%2322c55e'/%3E%3Ctext x='60' y='37' font-size='20' text-anchor='middle' fill='black'%3EGO%3C/text%3E%3C/svg%3E">
</button>
<p id="o"></p>
```

- نفس الشكل بتحكم أكتر.
- تقدر تضيف نص أو أيقونة.
- ده اللي بنفضّله حالياً.

### 3) صورة مختلفة عند الضغط
مثال على CSS active.

```html
<style>.im:active { filter: brightness(.7); }</style>
<input class="im" type="image" alt="زرار" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%2322c55e'/%3E%3Ctext x='60' y='37' font-size='20' text-anchor='middle' fill='black'%3EGO%3C/text%3E%3C/svg%3E" onclick="event.preventDefault()">
```

- `:active` بيغيّر الشكل أثناء الضغط.
- `filter` بيغمّق الصورة.
- بتدّي إحساس الضغط.

### 4) إرسال لفورم تاني
مثال على formaction.

```html
<form action="/a" onsubmit="event.preventDefault(); o.textContent = event.submitter.getAttribute('formaction') || this.getAttribute('action')">
  <input type="image" alt="أ" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' rx='10' fill='%2322c55e'/%3E%3Ctext x='60' y='37' font-size='20' text-anchor='middle' fill='black'%3EGO%3C/text%3E%3C/svg%3E" formaction="/b">
</form>
<p id="o"></p>
```

- `formaction` بتتخطّى `action` بتاع الفورم.
- نفس الفكرة مع submit و`button`.
- `event.submitter` بيعرفك مين الزرار.

## mistakes

### من غير alt
```html bad
<input type="image" src="go.png">
```
```html good
<input type="image" src="go.png" alt="ابدأ">
```
ليه؟ قارئ الشاشة مش هيعرف الزرار بيعمل إيه.

### استخدام image كصورة عادية
```html bad
<input type="image" src="logo.png" alt="">
```
```html good
<img src="logo.png" alt="الشعار">
```
ليه؟ ده زرار إرسال مش صورة: هيبعت الفورم عند الضغط.

## a11y

- `alt` هو اسم الزرار: خلّيه فعل ("إرسال" مش "سهم").
- قارئ الشاشة بيعامله كزرار.
- تأكد إن الصورة واضحة وتبان ككبسة.

## quiz

### بيبعت إيه بشكل خاص؟
- [x] إحداثيات الضغطة
- [ ] حجم الصورة
- [ ] اسم الملف
- [ ] لون الصورة
`name.x` و`name.y`.

### أهم خاصية للإتاحة؟
- [x] `alt`
- [ ] `title`
- [ ] `class`
- [ ] `id`
هي اسم الزرار.

### البديل الأحدث؟
- [x] `<button>` فيه `<img>`
- [ ] `<a>`
- [ ] `<div>`
- [ ] `<picture>`
أمرن وأوضح.

## refs

- [MDN: image](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/image)
- [WHATWG: Image Button state](https://html.spec.whatwg.org/multipage/input.html#image-button-state-(type=image))
