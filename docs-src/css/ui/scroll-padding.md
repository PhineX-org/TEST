---
id: scroll-padding
kind: property
cat: ui
chip: scroll-padding
title: حشو منطقة التمرير
en: CSS scroll-padding property
status: stable
support: all
size: compact
mdn: scroll-padding
summary: scroll-padding بتحدد مسافة أمان داخل حاوية السكرول لمنطقة التمرير (optimal viewing region). بديل عام لـ scroll-margin.
keywords: scroll-padding, حاوية, header ثابت, snap
related: scroll-margin, scroll-snap-type, scroll-snap-align
---

## intro

الخاصية `scroll-padding` شبه [[scroll-margin]] لكن **بتتحط على الحاوية** (الـ scroller) بدل كل عنصر. بتحدد **مسافة داخل حواف الحاوية** المتصفح يتجنبها لما يمرر لعنصر. فبدل ما تحط `scroll-margin-top` على كل العناوين، تحط `html { scroll-padding-top: 80px; }` **مرة واحدة** وتتحل المشكلة لكل الروابط الداخلية. وكمان بتفيد مع [[scroll-snap-type]] لضبط نقطة الالتقاط. وفيها نسخ لكل جهة (`scroll-padding-top`/`inline`…).

## try

```html
<style>
  html { scroll-padding-top:60px; }
  .c { height:80px; overflow:auto; scroll-padding-top:30px; background:#efe0bd; color:#3d2c18; padding:6px; }
</style>
<div class="c"><div style="height:60px">محتوى</div><div id="x2">هدف</div><div style="height:100px"></div></div>
```

## syntax

```css nolive
html { scroll-padding-top: 80px; }
.scroller { scroll-padding: 10px; }
```

- على الحاوية.
- **القيمة المبدئية**: `auto`.

## values

### `<length>`
المسافة.

### auto
افتراضي.

## use

- header ثابت (مرة واحدة على html).
- ضبط نقطة snap.

## avoid

- خلطها مع scroll-margin بدون سبب.

## examples

### 1) على html
لكل الروابط الداخلية.

```html
<style>
  html { scroll-padding-top:70px; }
  h4 { margin:0; color:#7a4a1d; padding:6px; background:#efe0bd; }
</style>
<h4 id="a">أي عنوان هيتزحزح لتحت الهيدر</h4>
```



### 2) مع snap
حاوية بمسافة.

```html
<style>
  .r { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-inline-start:20px; gap:6px; background:#efe0bd; padding:6px; }
  .i { flex:0 0 90px; height:40px; background:#3d7a5a; scroll-snap-align:start; border-radius:6px; }
</style>
<div class="r"><div class="i"></div><div class="i"></div><div class="i"></div><div class="i"></div></div>
```



### 3) كل الجهات
قيمة واحدة.

```html
<style>
  .c { height:70px; overflow:auto; scroll-padding:10px; background:#efe0bd; color:#3d2c18; padding:6px; }
</style>
<div class="c">محتوى طويل<br><br><br><br>نهاية</div>
```



## mistakes

### تكرار scroll-margin

```css bad
h1,h2,h3 { scroll-margin-top:80px; }
```

```css good
html { scroll-padding-top:80px; }
```

مرة واحدة.

## quiz

### scroll-padding بتتحط على؟
- [x] الحاوية
- [ ] العنصر
- [ ] img
- [ ] button

الـ scroller.

### ميزتها؟
- [x] مرة واحدة لكل الروابط
- [ ] أسرع
- [ ] أصغر
- [ ] أجمل

تبسيط.

## refs

- [MDN: scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding)
