---
id: background-clip
kind: property
cat: borders-bg
chip: background-clip
title: قص الخلفية
en: CSS background-clip property
status: stable
support: all
size: compact
mdn: background-clip
summary: background-clip بتحدد لحد فين الخلفية تتمدد: border-box أو padding-box أو content-box أو text (لتلوين النص بتدرج).
keywords: background-clip, text, border-box, padding-box, content-box, نص بتدرج, gradient text
related: background, background-origin, border, color
---

## intro

الخاصية `background-clip` بتحدد **المنطقة اللي الخلفية بتتقص عندها**. القيم: **`border-box`** (الافتراضي: تحت الحد كمان)، **`padding-box`** (لحد الـ padding بس)، **`content-box`** (تحت المحتوى بس)، و**`text`** (الخلفية بتظهر **جوه حروف النص فقط**). الحيلة الشهيرة: **نص بتدرج لوني** (`background: linear-gradient(...); background-clip: text; color: transparent`). ومحتاجة `-webkit-background-clip: text` للتوافق في بعض المتصفحات. وتختلف عن [[background-origin]] اللي بتحدد **مكان بداية** الصورة. وبتتكتب في [[background]].

## try

```html
<style>
  .t { font-size:2rem; font-weight:800; background:linear-gradient(90deg,#c9772f,#3d7a5a);
       -webkit-background-clip:text; background-clip:text; color:transparent; }
</style>
<div class="t">نص بتدرج لوني</div>
```

## syntax

```css nolive
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;
```

- **القيمة المبدئية**: `border-box`.
- `text` محتاجة `color: transparent`.

## values

### border-box
تحت الحد (الافتراضي).

### padding-box
لحد الـ padding.

### content-box
المحتوى فقط.

### text
داخل حروف النص.

## use

- نص بتدرج لوني.
- خلفية بدون ما تظهر تحت الحد.

## avoid

- `text` من غير `color: transparent`.
- نص صغير بتدرج (بيصعب القراءة).

## examples

### 1) نص بتدرج
عنوان بألوان متدرجة.

```html
<style>
  .t { font-size:1.8rem; font-weight:800; background:linear-gradient(90deg,#b5551f,#3d7a5a); -webkit-background-clip:text; background-clip:text; color:transparent; }
</style>
<div class="t">PhineX Docs</div>
```



### 2) padding-box
الخلفية مش تحت الحد.

```html
<style>
  .b { border:8px dashed #7a4a1d; padding:10px; background:#bcd4a8; background-clip:padding-box; color:#3d2c18; }
</style>
<div class="b">padding-box</div>
```



### 3) content-box
الخلفية على المحتوى بس.

```html
<style>
  .b { border:4px solid #7a4a1d; padding:14px; background:#bcd4a8; background-clip:content-box; color:#3d2c18; }
</style>
<div class="b">content-box</div>
```



## mistakes

### نسيان transparent

```css bad
.t { background-clip:text; }  /* النص بلونه فمبيبانش التدرج */
```

```css good
.t { background-clip:text; color:transparent; }
```

لازم لون النص شفاف.

## quiz

### background-clip:text بتعمل؟
- [ ] تخفي النص
- [x] الخلفية تظهر داخل الحروف
- [ ] تكبّر
- [ ] تقصّ

نص بتدرج.

### الافتراضي؟
- [ ] padding-box
- [x] border-box
- [ ] content-box
- [ ] text

border-box.

## refs

- [MDN: background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)
