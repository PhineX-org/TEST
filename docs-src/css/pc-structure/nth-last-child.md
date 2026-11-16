---
id: nth-last-child
kind: pseudoclass
cat: pc-structure
chip: :nth-last-child
title: الابن رقم n من الآخر
en: CSS :nth-last-child() pseudo-class
status: stable
support: all
size: compact
mdn: :nth-last-child
summary: الحالة nth-last-child زي nth-child لكن العد من الآخر. مفيدة لتنسيق آخر ثلاثة عناصر مثلاً.
keywords: :nth-last-child, nth-last-child, من الآخر, last N
related: nth-child, last-child, nth-of-type
---

## intro

`:nth-last-child(n)` شبه [[nth-child]] **بس العد من الآخر**: `:nth-last-child(1)` = [[last-child]]، و`:nth-last-child(2)` = ما قبل الأخير، و`:nth-last-child(-n+3)` = **آخر ثلاثة** عناصر. مفيدة لتنسيق العناصر الأخيرة (مثلاً آخر صف في شبكة). وبتقبل نفس صيغ `an+b` و`odd`/`even`. ومن التركيبات القوية: `li:nth-last-child(n+2)` = كل العناصر ماعدا الأخير. والفكرة ببساطة إنك بتقف في آخر الصف وبتعدّ ناحية الأول: الأخير رقم 1، وقبله رقم 2، وهكذا.

## try

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-last-child(-n+2) { background:#c9772f; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span><span class="b">5</span></div>
```

## syntax

```css nolive
li:nth-last-child(2) { }
li:nth-last-child(-n+3) { }
li:nth-last-child(n+2) { }
```

- العد من الآخر.

## use

- آخر N عناصر.
- كل العناصر ماعدا الأخير.

## avoid

- الخلط مع nth-child.

## examples

### 1) آخر عنصرين
-n+2.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-last-child(-n+2) { background:#3d7a5a; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span><span class="b">5</span></div>
```



### 2) ما قبل الأخير
2.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-last-child(2) { background:#b5551f; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span></div>
```



### 3) كل العناصر ماعدا الأخير
n+2.

```html
<style>
  li { list-style:none; padding:5px 10px; background:#efe0bd; color:#3d2c18; }
  li:nth-last-child(n+2) { border-bottom:2px solid #bda27a; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li><li>ج</li></ul>
```



## mistakes

### الخلط مع nth-child

```css bad
li:nth-child(2) { }  /* من الأول */
```

```css good
li:nth-last-child(2) { }
```

العد من الآخر.

## quiz

### nth-last-child(1) بتساوي؟
- [x] last-child
- [ ] first-child
- [ ] only-child
- [ ] empty

آخر ابن.

### آخر ثلاثة؟
- [x] -n+3
- [ ] n+3
- [ ] 3n
- [ ] 3

-n+3 من الآخر.

## refs

- [MDN: :nth-last-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child)
