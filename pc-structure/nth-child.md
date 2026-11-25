---
id: nth-child
kind: pseudoclass
cat: pc-structure
chip: :nth-child
title: الابن رقم n
en: CSS :nth-child() pseudo-class
status: stable
support: all
mdn: :nth-child
summary: الحالة nth-child بتختار العناصر حسب ترتيبها بين إخواتها بصيغة an+b: فردي وزوجي وكل تالت عنصر وأول ثلاثة عناصر.
keywords: :nth-child, nth-child, odd, even, 2n+1, زوجي, فردي, جدول مخطط, zebra
related: nth-last-child, first-child, nth-of-type, not, pseudo-guide
---

## intro

`:nth-child(n)` من أقوى المحددات: بتختار العناصر **حسب ترتيبها بين إخواتها** (من أول ابن، العد بيبدأ من **1**). بتاخد **صيغة**: رقم محدد أو كلمة أو معادلة **`an + b`**.

أشهر الاستخدامات:
- **`:nth-child(2)`**: الابن التاني بالظبط.
- **`:nth-child(odd)`** (الفردي: 1، 3، 5…) و**`:nth-child(even)`** (الزوجي: 2، 4، 6…) لعمل **جدول مخطط (zebra striping)** بسهولة.
- **`:nth-child(3n)`**: كل تالت عنصر (3، 6، 9…).
- **`:nth-child(3n+1)`**: 1، 4، 7…
- **`:nth-child(-n+3)`**: **أول ثلاثة** عناصر.
- **`:nth-child(n+4)`**: كل العناصر من الرابع وبعد.

الـ `n` بتبدأ من صفر وتزيد (0، 1، 2…) فالصيغة `2n+1` تدي 1 و3 و5. ولو الناتج صفر أو سالب بيتجاهل.

`nth-child` بتحسب **كل الإخوة بغض النظر عن النوع**؛ لو عايز تعد من نوع معين استخدم [[nth-of-type]]. ومن الآخر [[nth-last-child]]. وفي الحديث تقدر تضيف فلتر: `:nth-child(2n of .item)`.

> [!tip] ابدأ بـ `odd`/`even` لأي جدول؛ ده أشهر استخدام للـ nth-child.

## try

```html
<style>
  li { list-style:none; padding:6px 12px; color:#3d2c18; background:#efe0bd; }
  li:nth-child(even) { background:#e4c490; }
  li:nth-child(1) { font-weight:bold; }
</style>
<ul style="padding:0;margin:0"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>
```

## syntax

```css nolive
li:nth-child(3) { }
li:nth-child(odd) { }
li:nth-child(even) { }
li:nth-child(3n) { }
li:nth-child(-n+3) { }
li:nth-child(n+4) { }
```

- العد من 1.
- an+b: n بتبدأ من 0.
- بتعدّ كل الإخوة.

## use

- جدول مخطط (odd/even).
- تنسيق أول N عناصر.
- تنسيق كل X عنصر (شبكة).

## avoid

- نسيان إنها بتعدّ كل الأنواع.
- معادلات معقدة لا حاجة لها.

## examples

### 1) جدول مخطط
أسطر متبادلة.

```html
<style>
  tr:nth-child(odd) { background:#efe0bd; }
  tr:nth-child(even) { background:#e4c490; }
  td { padding:6px 12px; color:#3d2c18; }
  table { border-collapse:collapse; width:100%; }
</style>
<table><tr><td>أحمد</td><td>10</td></tr><tr><td>منى</td><td>20</td></tr><tr><td>سارة</td><td>30</td></tr><tr><td>خالد</td><td>40</td></tr></table>
```



### 2) كل تالت عنصر
3n.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-child(3n) { background:#c9772f; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span><span class="b">5</span><span class="b">6</span><span class="b">7</span><span class="b">8</span><span class="b">9</span></div>
```



### 3) أول ثلاثة
-n+3.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-child(-n+3) { background:#3d7a5a; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span><span class="b">5</span><span class="b">6</span></div>
```



### 4) من الرابع وبعد
n+4.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:2px; background:#bcd4a8; color:#3d2c18; text-align:center; line-height:34px; border-radius:6px; }
  .b:nth-child(n+4) { background:#b5551f; color:#f3ede0; }
</style>
<div><span class="b">1</span><span class="b">2</span><span class="b">3</span><span class="b">4</span><span class="b">5</span><span class="b">6</span></div>
```



## mistakes

### العد من صفر

```css bad
li:nth-child(0) { }  /* مفيش عنصر رقم 0 */
```

```css good
li:nth-child(1) { }
```

العد من 1.

### توقع عد النوع

```css bad
p:nth-child(2) { }  /* بتعدّ كل الأنواع */
```

```css good
p:nth-of-type(2) { }
```

للعد حسب النوع.

## quiz

### odd بتختار؟
- [x] 1 و3 و5
- [ ] 2 و4 و6
- [ ] كل الأبناء
- [ ] لا شيء

الفردي.

### أول ثلاثة عناصر؟
- [x] :nth-child(-n+3)
- [ ] :nth-child(3n)
- [ ] :nth-child(n+3)
- [ ] :nth-child(3)

-n+3.

### العد بيبدأ من؟
- [ ] 0
- [x] 1
- [ ] 2
- [ ] -1

1.

## refs

- [MDN: :nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
