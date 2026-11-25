---
id: popover-open
kind: pseudoclass
cat: pc-logical
chip: :popover-open
title: نافذة popover مفتوحة
en: CSS :popover-open pseudo-class
status: stable
support: all
size: compact
mdn: :popover-open
summary: الحالة popover-open بتنطبق على عنصر popover وهو مفتوح. لتنسيق ظهور القوايم والتلميحات الحديثة.
keywords: :popover-open, popover, popover-open, قائمة, tooltip
related: modal, backdrop, has
---

## intro

`:popover-open` بتنطبق على العنصر اللي ليه خاصية `popover` وهو **مفتوح** حالياً. الـ **Popover API** بيخلّيك تعمل قوايم وتلميحات ونوافذ صغيرة **بدون JavaScript تقريباً**: بتضيف `popover` للعنصر و`popovertarget` للزرار. و`:popover-open` بتخلّيك تنسّق حالة الفتح وتضيف حركات. والـ popover بيتحط في «الطبقة العليا» (top layer) فمش هتحتاج z-index. وحالة الإغلاق افتراضياً `display: none`. وبيقفل لوحده لو المستخدم ضغط بره أو ضغط Esc، وده بيوفر عليك كود كتير.

## try

```html
<style>
  [popover] { border:0; border-radius:10px; padding:14px; background:#f3e6c9; color:#3d2c18; box-shadow:0 8px 24px rgba(61,44,24,.3); }
  [popover]:popover-open { border:2px solid #c9772f; }
  button { padding:6px 14px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<button popovertarget="p">افتح</button><div id="p" popover>أنا popover</div>
```

## syntax

```css nolive
[popover]:popover-open { }
<button popovertarget="p">فتح</button>
<div id="p" popover>...</div>
```

- Popover API.
- طبقة top layer.

## use

- قوايم منسدلة.
- تلميحات وballoons.

## avoid

- استخدامها بدون دعم المتصفح.

## examples

### 1) popover بسيط
زرار وعنصر.

```html
<style>
  [popover] { border:0; border-radius:10px; padding:14px; background:#f3e6c9; color:#3d2c18; }
  [popover]:popover-open { box-shadow:0 8px 24px rgba(61,44,24,.35); }
  button { padding:6px 14px; border:0; border-radius:6px; background:#3d7a5a; color:#f3ede0; font-weight:bold; }
</style>
<button popovertarget="a">افتح</button><div id="a" popover>محتوى منبثق</div>
```



### 2) حركة دخول
انيميشن عند الفتح.

```html
<style>
  [popover] { border:0; border-radius:10px; padding:14px; background:#f3e6c9; color:#3d2c18; }
  [popover]:popover-open { animation:in .25s; }
  @keyframes in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
  button { padding:6px 14px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<button popovertarget="b">افتح</button><div id="b" popover>مرحباً</div>
```



### 3) قايمة
عناصر داخل popover.

```html
<style>
  [popover] { border:0; border-radius:10px; padding:8px 14px; background:#f3e6c9; color:#3d2c18; }
  button { padding:6px 14px; border:0; border-radius:6px; background:#7a4a1d; color:#f3ede0; font-weight:bold; }
</style>
<button popovertarget="c">قايمة</button><div id="c" popover><div>خيار 1</div><div>خيار 2</div></div>
```



## mistakes

### ربط خاطئ

```css bad
<button popovertarget="x"> مع id مختلف
```

```css good
<button popovertarget="p"><div id="p" popover>
```

الـ id لازم يتطابق.

## quiz

### popover-open بتنطبق؟
- [x] وهو مفتوح
- [ ] وهو مغلق
- [ ] دايماً
- [ ] أبداً

حالة الفتح.

### بتحتاج JS؟
- [x] تقريباً لأ
- [ ] أيوه كتير
- [ ] دايماً
- [ ] أبداً

Popover API.

## refs

- [MDN: :popover-open](https://developer.mozilla.org/en-US/docs/Web/CSS/:popover-open)
