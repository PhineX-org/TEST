---
id: marker
kind: pseudoelement
cat: pseudo-elements
chip: ::marker
title: علامة عنصر القائمة
en: CSS ::marker pseudo-element
status: stable
support: all
size: compact
mdn: ::marker
summary: العنصر الوهمي marker بينسّق نقطة أو رقم عنصر القائمة. تقدر تغيّر لون وحجم العلامة بدون تعديل القائمة.
keywords: ::marker, marker, نقطة القائمة, bullet, list-style
related: list-style, color, font-size, before
---

## intro

`::marker` بتنسّق **العلامة** اللي قبل كل عنصر في القايمة: **النقطة** في `ul` أو **الرقم** في `ol` أو سهم `summary`. قبلها كان صعب تغيّر لون النقطة من غير حيل (`::before` وخلافه). دلوقتي سهل: `li::marker { color: #c9772f; }`. الخصائص المسموحة: اللون والخط والحجم و`content`. ومفيش margins أو مواضع. ومرتبطة بـ [[list-style]] اللي بتحدد نوع العلامة. بمعنى: `list-style` تقول «نقطة ولا رقم»، و`::marker` تقول «بأي لون وحجم».

## try

```html
<style>
  li::marker { color:#c9772f; font-size:1.3rem; }
  li { color:#3d2c18; margin:3px 0; }
</style>
<ul><li>نقطة برتقالية كبيرة</li><li>عنصر تاني</li></ul>
```

## syntax

```css nolive
li::marker { color: #c9772f; }
ol li::marker { font-weight: bold; }
li::marker { content: '✓ '; }
```

- خصائص محدودة.
- مع list-style.

## use

- لون مميز للنقاط.
- أرقام عريضة.
- علامة مخصصة.

## avoid

- محاولة تغيير الـ margins.

## examples

### 1) نقطة ملونة
لون وحجم.

```html
<style>
  li::marker { color:#3d7a5a; font-size:1.4rem; }
  li { color:#3d2c18; margin:2px 0; }
</style>
<ul><li>أول</li><li>تاني</li></ul>
```



### 2) أرقام
سميكة بلون.

```html
<style>
  ol li::marker { color:#b5551f; font-weight:bold; }
  li { color:#3d2c18; margin:2px 0; }
</style>
<ol><li>أول</li><li>تاني</li></ol>
```



### 3) علامة مخصصة
content في marker.

```html
<style>
  li::marker { content:'✓  '; color:#3d7a5a; }
  li { color:#3d2c18; margin:2px 0; }
</style>
<ul><li>تم</li><li>تم كمان</li></ul>
```



## mistakes

### حيل قديمة

```css bad
li::before { content:"•"; color:red; }
```

```css good
li::marker { color:red; }
```

marker مخصصة لده.

## quiz

### marker بتنسّق؟
- [x] نقطة/رقم القائمة
- [ ] النص
- [ ] الحد
- [ ] الصورة

علامة العنصر.

### تغيير لون النقطة؟
- [x] li::marker
- [ ] li::before
- [ ] li:first
- [ ] ul::bullet

marker.

## refs

- [MDN: ::marker](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker)
