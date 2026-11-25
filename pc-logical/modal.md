---
id: modal
kind: pseudoclass
cat: pc-logical
chip: :modal
title: نافذة مودال
en: CSS :modal pseudo-class
status: stable
support: all
size: compact
mdn: :modal
summary: الحالة modal بتنطبق على العنصر اللي معروض كمودال (مثل dialog بعد showModal) وبتمنع التفاعل مع باقي الصفحة.
keywords: :modal, modal, dialog, showModal, نافذة منبثقة
related: backdrop, fullscreen, popover-open
---

## intro

`:modal` بتنطبق على العنصر اللي **معروض كنافذة مودال**: يعني `<dialog>` اتفتح بـ `showModal()` (وكمان عناصر الـ fullscreen). النافذة المودال بتعطّل باقي الصفحة وبتحبس التركيز جواها، وده بيفرّق عن `<dialog open>` العادي. بتستخدمها لتنسيق الـ dialog المودال بشكل مختلف عن غير المودال، مع [[backdrop]] لتغميق الخلفية. والمودال بيتعرض في «الطبقة العليا» فوق كل حاجة من غير ما تحتاج z-index، وبيقفل بزرار Esc تلقائياً.

## try

```html
<style>
  dialog { border:0; border-radius:10px; padding:18px; background:#f3e6c9; color:#3d2c18; }
  dialog:modal { box-shadow:0 10px 30px rgba(61,44,24,.4); }
  dialog::backdrop { background:rgba(61,44,24,.5); }
</style>
<button onclick="d.showModal()">افتح مودال</button>
<dialog id="d"><p>أنا مودال</p><button onclick="d.close()">إغلاق</button></dialog>
```

## syntax

```css nolive
dialog:modal { box-shadow: 0 10px 30px rgba(0,0,0,.4); }
dialog::backdrop { background: rgba(0,0,0,.5); }
```

- dialog.showModal().
- مع ::backdrop.

## use

- تنسيق مودال مميز.
- خلفية معتمة.

## avoid

- استخدام open العادي لو عايز مودال.

## examples

### 1) مودال بظل
مختلف عن open.

```html
<style>
  dialog { border:0; border-radius:10px; padding:18px; background:#f3e6c9; color:#3d2c18; }
  dialog:modal { box-shadow:0 10px 30px rgba(61,44,24,.4); }
  dialog::backdrop { background:rgba(61,44,24,.5); }
</style>
<button onclick="m1.showModal()">مودال</button><dialog id="m1">مودال <button onclick="m1.close()">x</button></dialog>
```



### 2) غير مودال
show() مش showModal.

```html
<style>
  dialog { border:2px solid #bda27a; border-radius:8px; padding:12px; background:#f3e6c9; color:#3d2c18; }
  dialog:not(:modal) { border-style:dashed; }
</style>
<button onclick="m2.show()">غير مودال</button><dialog id="m2">عادي <button onclick="m2.close()">x</button></dialog>
```



### 3) حركة ظهور
بتبدأ من المودال.

```html
<style>
  dialog { border:0; border-radius:10px; padding:16px; background:#f3e6c9; color:#3d2c18; }
  dialog:modal { animation:pop .25s; }
  @keyframes pop { from { transform:scale(.9); opacity:0; } to { transform:scale(1); opacity:1; } }
  dialog::backdrop { background:rgba(61,44,24,.5); }
</style>
<button onclick="m3.showModal()">مودال متحرك</button><dialog id="m3">مرحباً <button onclick="m3.close()">x</button></dialog>
```



## mistakes

### open بدل showModal

```css bad
<dialog open>  /* مش مودال */
```

```css good
dialog.showModal()
```

showModal بتعمل مودال حقيقي.

## quiz

### modal بتنطبق على؟
- [x] dialog المفتوح بـ showModal
- [ ] أي div
- [ ] الجسم
- [ ] الصور

مودال حقيقي.

### بتتكامل مع؟
- [x] ::backdrop
- [ ] ::before
- [ ] ::marker
- [ ] ::selection

خلفية المودال.

## refs

- [MDN: :modal](https://developer.mozilla.org/en-US/docs/Web/CSS/:modal)
