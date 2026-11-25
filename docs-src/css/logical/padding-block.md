---
id: padding-block
kind: property
cat: logical
chip: padding-block
title: padding الاتجاه الرأسي (منطقي)
en: CSS padding-block property
status: stable
support: all
size: compact
mdn: padding-block
summary: padding-block بتحط padding قبل وبعد المحتوى في اتجاه الكتل (فوق وتحت). بديل padding-top وpadding-bottom.
keywords: padding-block, حشو رأسي, logical, padding
related: padding-inline, padding-top, padding-bottom, logical-properties-guide
---

## intro

الخاصية `padding-block` هي النسخة المنطقية من `padding-top` و`padding-bottom`: padding **قبل وبعد** المحتوى في اتجاه تراص الكتل (فوق وتحت في الكتابة العادية). `padding-block: 12px 20px;` يعني 12 قبل و20 بعد. بتكمل [[padding-inline]]، والاتنين مع بعض بيعوّضوا `padding` المختصر: `padding-block: 10px; padding-inline: 20px;`. مفيدة في الأزرار والبطاقات والأقسام (`section { padding-block: 60px; }`) وبتبقى صح حتى مع الكتابة الرأسية. تخيّل إنك بتسيب مسافة فوق وتحت الفقرة جوه الإطار عشان الكلام ميلزقش في الحافة: ده بالظبط شغل `padding-block`، والاسم «block» معناه الاتجاه اللي الفقرات بتتحط فيه فوق بعض.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="padding-block:18px 4px">قبل 18 / بعد 4</div></div>
```

## syntax

```css nolive
padding-block: 12px;
padding-block: 8px 20px;
section { padding-block: 60px; }
```

- **القيمة المبدئية**: `0`.

## values

### `<length>`
مسافة.

### `<percentage>`
نسبة من عرض الأب.

## use

- أقسام بـpadding رأسي كبير.
- أزرار.

## avoid

- الالتباس مع inline.

## examples

### 1) قسم
padding رأسي كبير.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="padding-block:28px;background:#efe0bd">قسم بـpadding رأسي 28</div>
```



### 2) قبل وبعد
قيمتين.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="padding-block:20px 2px">20 قبل / 2 بعد</div></div>
```



### 3) مع inline
الاتنين.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="padding-block:14px;padding-inline:40px;display:inline-block">block+inline</div></div>
```



## mistakes

### عكس block وinline

```css bad
.b { padding-block:0 30px; }  /* ظننتها أفقي */
```

```css good
.b { padding-inline:0 30px; }
```

block = رأسي.

## quiz

### padding-block هو؟
- [x] رأسي
- [ ] أفقي
- [ ] كل الجهات
- [ ] margin

قبل وبعد.

### مع padding-inline بيعوّضوا؟
- [x] padding المختصر
- [ ] margin
- [ ] border
- [ ] gap

اختصار مقسّم.

## refs

- [MDN: padding-block](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block)
