---
id: background-origin
kind: property
cat: borders-bg
chip: background-origin
title: مكان بداية الخلفية
en: CSS background-origin property
status: stable
support: all
size: compact
mdn: background-origin
summary: background-origin بتحدد المربع المرجعي اللي background-position بيتحسب منه: border-box أو padding-box (الافتراضي) أو content-box.
keywords: background-origin, padding-box, border-box, content-box, background-position, مرجع
related: background-clip, background-position, background, border
---

## intro

الخاصية `background-origin` بتحدد **مربع المرجع** اللي بيتحسب منه موضع صورة الخلفية ([[background-position]]): هل «الركن العلوي الأيمن» هو ركن **الحد** (`border-box`)، ولا ركن **الحشو** (`padding-box`، الافتراضي)، ولا ركن **المحتوى** (`content-box`)؟ مفيدة لما تعايز الصورة تبدأ بعد الحشو. وتختلف عن [[background-clip]] اللي بتقص الخلفية. **ملحوظة**: لا تؤثر لو `background-attachment: fixed`. وعشان تفهمها بسهولة: تخيّل إطار صورة؛ الـ origin بيقولك «ابدأ ألصق الصورة من أنهي ركن» (الحد ولا الحشو ولا المحتوى).

## try

```html
<style>
  .b { padding:20px; border:6px dashed #7a4a1d; color:#3d2c18; background:radial-gradient(#c9772f 40%,transparent 41%) no-repeat, #efe0bd;
       background-size:30px 30px; background-origin:content-box; }
</style>
<div class="b">content-box origin</div>
```

## syntax

```css nolive
background-origin: padding-box;
background-origin: border-box;
background-origin: content-box;
```

- **القيمة المبدئية**: `padding-box`.

## values

### padding-box
من حافة الحشو (الافتراضي).

### border-box
من حافة الحد.

### content-box
من حافة المحتوى.

## use

- صورة تبدأ بعد الحشو.
- تحكم دقيق في موضع الخلفية.

## avoid

- الخلط بينها وبين background-clip.

## examples

### 1) padding-box
الافتراضي.

```html
<style>
  .b { padding:20px; border:6px dashed #7a4a1d; color:#3d2c18; background:radial-gradient(#c9772f 40%,transparent 41%) no-repeat, #efe0bd; background-size:30px 30px; background-origin:padding-box; }
</style>
<div class="b">padding-box</div>
```



### 2) border-box
من الحد.

```html
<style>
  .b { padding:20px; border:6px dashed #7a4a1d; color:#3d2c18; background:radial-gradient(#3d7a5a 40%,transparent 41%) no-repeat, #efe0bd; background-size:30px 30px; background-origin:border-box; }
</style>
<div class="b">border-box</div>
```



### 3) content-box
من المحتوى.

```html
<style>
  .b { padding:20px; border:6px dashed #7a4a1d; color:#3d2c18; background:radial-gradient(#7a4a1d 40%,transparent 41%) no-repeat, #efe0bd; background-size:30px 30px; background-origin:content-box; }
</style>
<div class="b">content-box</div>
```



## mistakes

### الخلط مع clip

```css bad
.a { background-origin:content-box; }  /* مش بتقص الخلفية */
```

```css good
.a { background-clip:content-box; }
```

origin بتحدد البداية، clip بتحدد القص.

## quiz

### الافتراضي؟
- [ ] content-box
- [x] padding-box
- [ ] border-box
- [ ] text

padding-box.

### بتأثر على؟
- [x] موضع الصورة
- [ ] اللون
- [ ] الخط
- [ ] الظل

مرجع background-position.

## refs

- [MDN: background-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin)
