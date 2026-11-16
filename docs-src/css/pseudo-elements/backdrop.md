---
id: backdrop
kind: pseudoelement
cat: pseudo-elements
chip: ::backdrop
title: خلفية الطبقة العليا
en: CSS ::backdrop pseudo-element
status: stable
support: all
size: compact
mdn: ::backdrop
summary: العنصر الوهمي backdrop هو الطبقة اللي ورا dialog المودال أو العنصر في ملء الشاشة. لتغميق الخلفية أو تمويهها.
keywords: ::backdrop, backdrop, dialog, modal, خلفية معتمة
related: modal, fullscreen, popover-open, backdrop-filter
---

## intro

`::backdrop` بتمثل **طبقة الخلفية** اللي بتتحط **ورا عنصر في الطبقة العليا (top layer)**: زي `<dialog>` المفتوح بـ `showModal()`، أو عنصر في وضع ملء الشاشة، أو popover. فايدتها: **تغميق** الصفحة ورا المودال بلون شبه شفاف أو **تمويهها** بـ [[backdrop-filter]]. بتتطبق على الـ `::backdrop` مباشرة: `dialog::backdrop { background: rgba(0,0,0,.5); }`. مش بتورّث من الأب، فالمتغيّرات CSS مش هتوصلها غالباً. ولو عايز لون الخلفية يتغيّر مع الثيم، اكتب القيمة مباشرة جوه القاعدة.

## try

```html
<style>
  dialog { border:0; border-radius:10px; padding:16px; background:#f3e6c9; color:#3d2c18; }
  dialog::backdrop { background:rgba(61,44,24,.55); }
</style>
<button onclick="d.showModal()">افتح</button><dialog id="d">مودال <button onclick="d.close()">x</button></dialog>
```

## syntax

```css nolive
dialog::backdrop { background: rgba(0,0,0,.5); }
dialog::backdrop { backdrop-filter: blur(4px); }
```

- لا تتوارث من الأب.
- مع dialog وfullscreen.

## use

- تغميق خلفية المودال.
- تمويه الخلفية.

## avoid

- استخدام متغيّرات CSS غير مُعرّفة على backdrop.

## examples

### 1) تغميق
لون شفاف.

```html
<style>
  dialog { border:0; border-radius:10px; padding:16px; background:#f3e6c9; color:#3d2c18; }
  dialog::backdrop { background:rgba(61,44,24,.55); }
</style>
<button onclick="a.showModal()">مودال</button><dialog id="a">مودال <button onclick="a.close()">x</button></dialog>
```



### 2) تمويه
blur للخلفية.

```html
<style>
  dialog { border:0; border-radius:10px; padding:16px; background:#f3e6c9; color:#3d2c18; }
  dialog::backdrop { background:rgba(61,44,24,.3); backdrop-filter:blur(4px); }
</style>
<button onclick="b.showModal()">مودال</button><dialog id="b">مودال <button onclick="b.close()">x</button></dialog>
```



### 3) تدرج
خلفية متدرجة.

```html
<style>
  dialog { border:0; border-radius:10px; padding:16px; background:#f3e6c9; color:#3d2c18; }
  dialog::backdrop { background:linear-gradient(135deg,rgba(201,119,47,.5),rgba(61,122,90,.5)); }
</style>
<button onclick="c.showModal()">مودال</button><dialog id="c">مودال <button onclick="c.close()">x</button></dialog>
```



## mistakes

### انتظار وراثة المتغيّرات

```css bad
dialog::backdrop { background:var(--c); }  /* مش معرّف */
```

```css good
dialog::backdrop { background:rgba(0,0,0,.5); }
```

حدد القيمة مباشرة.

## quiz

### backdrop هي؟
- [x] طبقة خلفية ورا الطبقة العليا
- [ ] عنصر في الصفحة
- [ ] حد
- [ ] ظل

خلفية.

### بتُستخدم مع؟
- [x] dialog وfullscreen
- [ ] img
- [ ] table
- [ ] ul

الطبقة العليا.

## refs

- [MDN: ::backdrop](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)
