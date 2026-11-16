---
id: grid-template-areas
kind: property
cat: grid
chip: grid-template-areas
title: تسمية مناطق الشبكة
en: CSS grid-template-areas property
status: stable
support: all
mdn: grid-template-areas
summary: grid-template-areas بتخليك ترسم تخطيط الصفحة بنص: كل سطر صف، وكل اسم منطقة. بعدين تحط العناصر بـ grid-area.
keywords: grid-template-areas, مناطق, areas, grid-area, تخطيط, header, sidebar, main, footer, رسم التخطيط
related: grid-area, grid-template-columns, grid-template-rows, grid-guide
---

## intro

`grid-template-areas` هي أطرف وأسهل طريقة لتحديد تخطيط الصفحة: **بترسمه بالنص**. كل سطر بين علامات تنصيص بيمثّل **صف**، وكل كلمة جواه بتمثّل **خلية**، والكلمات المتكررة جنب بعض بتعمل **منطقة** ممتدة. مثلاً:

```
grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";
```

وبعدين على كل عنصر بتكتب [[grid-area]]: `header { grid-area: header }` فيروح للمنطقة دي. النقطة `.` = خلية فاضية.

قواعد: كل سطر لازم له نفس عدد الخلايا، والمنطقة لازم تكون **مستطيلة** (مينفعش شكل L). وعدد الأعمدة بيتحدد بالنص ولسه بتحدد عرضها بـ [[grid-template-columns]]. وميزتها الكبرى: **تغيير التخطيط في الموبايل** بتغيير النص بس في media query، من غير ما تلمس العناصر.

> [!analogy] زي ما ترسم خريطة الشقة: «غرفة نوم، غرفة نوم، صالة، مطبخ»، وبعدين تحط كل أثاث في اسم الغرفة.

> [!tip] في RTL الأعمدة بتتقرا من اليمين لليسار، فـ `"sidebar main"` معناها الجانبي يمين.

## try

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:70px 1fr;
       grid-template-areas:"h h" "s m" "f f"; }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; }
  .m { grid-area:m; background:#efe0bd; } .f { grid-area:f; background:#e4c490; }
</style>
<div class="g"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div><div class="f">تذييل</div></div>
```

## syntax

```css nolive
grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";
grid-template-areas: "a . b";   /* نقطة = خلية فاضية */
grid-template-areas: none;
```

- **القيمة المبدئية**: `none`.
- كل سطر نفس عدد الخلايا.
- المنطقة لازم تكون مستطيلة.

## values

### "name name"
سطر = صف، والكلمات خلايا.

### .
خلية فاضية.

### none
مفيش مناطق.

## use

- تخطيط صفحة كامل بالرسم.
- تغيير التخطيط في الموبايل بتغيير النص.
- تخطيطات قابلة للقراءة.

## avoid

- مناطق غير مستطيلة (مرفوضة).
- تكرار اسم منطقة في أماكن غير متصلة.

## examples

### 1) تخطيط صفحة
رأس وجانب ومحتوى وتذييل.

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:70px 1fr; grid-template-areas:"h h" "s m" "f f"; }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; }
  .m { grid-area:m; background:#efe0bd; } .f { grid-area:f; background:#e4c490; }
</style>
<div class="g"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div><div class="f">تذييل</div></div>
```



### 2) خلية فاضية بنقطة
`.` بتعمل فراغ.

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:1fr 1fr 1fr; grid-template-areas:"a . b"; }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .a { grid-area:a; background:#bcd4a8; } .b { grid-area:b; background:#e4c490; }
</style>
<div class="g"><div class="a">أ</div><div class="b">ب</div></div>
```



### 3) تغيير للموبايل
media query بتغيّر النص بس.

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:1fr; grid-template-areas:"h" "m" "s"; }
  @media (min-width:400px) { .g { grid-template-columns:80px 1fr; grid-template-areas:"h h" "s m"; } }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .h { grid-area:h; background:#e4c490; } .s { grid-area:s; background:#bcd4a8; } .m { grid-area:m; background:#efe0bd; }
</style>
<div class="g"><div class="h">رأس</div><div class="s">جانب</div><div class="m">محتوى</div></div>
```

- وسّع النافذة.

### 4) منطقة ممتدة
المحتوى بياخد عمودين.

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:1fr 1fr 1fr; grid-template-areas:"a a b"; }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .a { grid-area:a; background:#bcd4a8; } .b { grid-area:b; background:#e4c490; }
</style>
<div class="g"><div class="a">a (عمودين)</div><div class="b">b</div></div>
```



## mistakes

### منطقة غير مستطيلة

```css bad
grid-template-areas: "a a" "b a";  /* a على شكل L */
```

```css good
grid-template-areas: "a a" "b b";
```

المنطقة لازم تكون مستطيلة.

### سطور بأعداد مختلفة

```css bad
grid-template-areas: "a b" "c";
```

```css good
grid-template-areas: "a b" "c c";
```

كل سطر نفس عدد الخلايا.

## quiz

### سطر بين علامات تنصيص يمثّل؟
- [ ] عمود
- [x] صف
- [ ] عنصر
- [ ] لون

صف.

### النقطة `.` معناها؟
- [ ] منطقة
- [x] خلية فاضية
- [ ] فاصلة
- [ ] خطأ

فراغ.

### بعد تعريف المناطق نحط العنصر بـ؟
- [x] grid-area
- [ ] position
- [ ] order
- [ ] z-index

grid-area.

## refs

- [MDN: grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
