---
id: flex-shrink
kind: property
cat: flexbox
chip: flex-shrink
title: معامل الانكماش
en: CSS flex-shrink property
status: stable
support: all
size: compact
mdn: flex-shrink
summary: flex-shrink بتحدد العنصر المرن بيصغر قد إيه لما المساحة تضيق. الافتراضي 1 يعني بيتقلص، 0 يعني ثابت.
keywords: flex-shrink, انكماش, تقلص, shrink, flex, min-width
related: flex, flex-grow, flex-basis, min-width
---

## intro

الخاصية `flex-shrink` عكس `flex-grow`: بتحدد **لو المساحة ضاقت، العنصر يصغر قد إيه**. القيمة الافتراضية `1` يعني كل العناصر بتتقلص بالتساوي (بنسبة حجمها). `0` يعني **ثابت** ومبيتقلصش أبداً (ممكن يطلع برّه الحاوية). ولو واحد `2` بيتقلص أسرع. **مهم**: العنصر مبيتقلصش أقل من `min-content` إلا لو حطيت `min-width: 0` ([[min-width]]). الاختصار [[flex]].

> [!tip] لو عايز أيقونة أو صورة ما تتعصرش أبداً لما النص جنبها يطول، اكتب لها `flex-shrink: 0`.

## try

```html
<style>
  .f { display:flex; width:220px; background:#efe0bd; }
  .f div { width:120px; padding:8px; color:#3d2c18; background:#bcd4a8; }
  .s0 { flex-shrink:0; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="f"><div class="s0">ثابت</div><div>بيتقلص</div></div>
```

## syntax

```css nolive
flex-shrink: 1;
flex-shrink: 0;
flex-shrink: 2;
```

- **القيمة المبدئية**: `1`.
- ممنوع السالب.

## values

### 1
يتقلص بنسبة حجمه (الافتراضي).

### 0
ثابت، مبيتقلصش.

### `<number>`
معامل نسبي.

## use

- أيقونة أو صورة مبتصغرش (`flex-shrink:0`).
- عنصر يتقلص أسرع.

## avoid

- `flex-shrink:0` على عناصر كتير في شاشة ضيقة (هتطلع برّه).

## examples

### 1) ثابت ومتقلص
الأول ثابت العرض 120px والتاني بيتقلص.

```html
<style>
  .f { display:flex; width:200px; background:#efe0bd; }
  .f div { width:120px; padding:8px; color:#3d2c18; background:#bcd4a8; }
  .a { flex-shrink:0; background:#e4c490 !important; }
</style>
<div class="f"><div class="a">0</div><div>1</div></div>
```



### 2) انكماش أسرع
shrink:3 بيتقلص أكتر.

```html
<style>
  .f { display:flex; width:200px; background:#efe0bd; }
  .f div { width:120px; padding:8px; color:#3d2c18; }
  .a { background:#bcd4a8; } .b { background:#e4c490; flex-shrink:3; }
</style>
<div class="f"><div class="a">1</div><div class="b">3</div></div>
```



### 3) أيقونة محمية
الأيقونة مبتتعصرش لما النص طويل.

```html
<style>
  .f { display:flex; gap:6px; width:200px; align-items:center; }
  .i { flex-shrink:0; width:36px; height:36px; background:#3d7a5a; border-radius:50%; }
  .t { background:#efe0bd; color:#3d2c18; padding:6px; min-width:0; }
</style>
<div class="f"><div class="i"></div><div class="t">نص طويل جداً جداً هنا</div></div>
```



## mistakes

### عنصر أبعد من الحاوية

```css bad
.i { flex-shrink:0; width:300px; }  /* في شاشة 200px */
```

```css good
.i { flex-shrink:1; max-width:100%; }
```

shrink:0 بتمنع التقلص فتعدّي الحاوية.

## quiz

### القيمة الافتراضية؟
- [ ] 0
- [x] 1
- [ ] 2
- [ ] auto

1.

### shrink:0 معناها؟
- [ ] يتقلص أسرع
- [x] مبيتقلصش
- [ ] يختفي
- [ ] يتمدد

ثابت.

## refs

- [MDN: flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)
