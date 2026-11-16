---
id: last-child
kind: pseudoclass
cat: pc-structure
chip: :last-child
title: آخر ابن
en: CSS :last-child pseudo-class
status: stable
support: all
mdn: :last-child
summary: الحالة last-child بتختار العنصر لو هو آخر ابن لأبوه. مفيدة لإزالة الهامش السفلي أو الفاصل من آخر عنصر.
keywords: :last-child, last-child, آخر عنصر, list, إزالة الفاصل
related: first-child, only-child, nth-last-child, last-of-type, not, pseudo-guide
---

## intro

`:last-child` بتختار العنصر **لو كان آخر ابن لأبوه**. وهي مرآة [[first-child]]. استخدامها الأشهر: **إزالة الهامش السفلي أو الحد** من آخر عنصر في قايمة أو بطاقة عشان ميبقاش فيه مسافة زيادة في آخر الحاوية: `li:last-child { margin-bottom: 0; }` أو `li:last-child { border-bottom: 0; }`.

نفس فخ `first-child`: بتشترط إن العنصر يكون **آخر ابن فعلاً** مهما كان نوعه. فلو آخر ابن في الـ `div` هو `<span>`، فـ `p:last-child` مش هتنطبق على آخر فقرة. لاختيار آخر عنصر **من نوعه** استخدم [[last-of-type]].

ومعاها تركيبات قوية: `li:first-child:last-child` = [[only-child]]، و`li:not(:last-child)` = «كل العناصر ماعدا الأخير» وده مفيد لإضافة **فاصل** (حد أو margin) بين العناصر بدون الأخير.

## try

```html
<style>
  li { list-style:none; padding:6px 10px; color:#3d2c18; border-bottom:2px solid #bda27a; background:#efe0bd; }
  li:last-child { border-bottom:0; font-weight:bold; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li><li>الأخير (من غير حد)</li></ul>
```

## syntax

```css nolive
li:last-child { border-bottom: 0; }
.card > :last-child { margin-bottom: 0; }
li:not(:last-child) { margin-bottom: 8px; }
```

- آخر ابن فعلاً.
- مرآة first-child.

## use

- إزالة الحد/الهامش من آخر عنصر.
- فاصل بين العناصر ماعدا الأخير.
- تمييز آخر عنصر.

## avoid

- توقع إنها بتختار آخر عنصر من نوعه.
- استخدام هوامش وإلغائها بدل gap.

## examples

### 1) إزالة الفاصل
آخر عنصر من غير حد.

```html
<style>
  li { list-style:none; padding:6px 10px; color:#3d2c18; border-bottom:2px solid #bda27a; background:#efe0bd; }
  li:last-child { border-bottom:0; }
</style>
<ul style="padding:0;margin:0"><li>أ</li><li>ب</li><li>ج</li></ul>
```



### 2) هامش للكل ماعدا الأخير
not مع last-child.

```html
<style>
  .b { display:inline-block; padding:6px 12px; background:#c9772f; color:#f3ede0; border-radius:6px; }
  .b:not(:last-child) { margin-inline-end:8px; }
</style>
<span class="b">أ</span><span class="b">ب</span><span class="b">ج</span>
```



### 3) آخر فقرة
بدون هامش سفلي.

```html
<style>
  .c { background:#efe0bd; padding:10px; border-radius:8px; color:#3d2c18; }
  .c p { margin:0 0 10px; }
  .c p:last-child { margin-bottom:0; }
</style>
<div class="c"><p>فقرة 1</p><p>فقرة 2</p><p>فقرة 3</p></div>
```



### 4) تمييز الأخير
لون مختلف.

```html
<style>
  li { list-style:none; padding:6px; color:#3d2c18; background:#efe0bd; margin:2px 0; border-radius:4px; }
  li:last-child { background:#3d7a5a; color:#f3ede0; }
</style>
<ul style="padding:0;margin:0"><li>1</li><li>2</li><li>3</li></ul>
```



## mistakes

### آخر فقرة وبعدها وسم تاني

```css bad
p:last-child { }  /* بعد الفقرة span */
```

```css good
p:last-of-type { }
```

اعتمد على النوع.

### هوامش يدوية

```css bad
.i { margin-bottom:8px; }
.i:last-child { margin-bottom:0; }
```

```css good
.list { display:flex; flex-direction:column; gap:8px; }
```

gap أنضف.

## quiz

### last-child بتختار؟
- [x] آخر ابن لأبوه
- [ ] آخر عنصر من نوعه
- [ ] أول ابن
- [ ] كل الأبناء

آخر ابن فعلاً.

### لكل العناصر ماعدا الأخير؟
- [x] li:not(:last-child)
- [ ] li:last-child
- [ ] li:first-child
- [ ] li:empty

not.

### تركيبة first-child:last-child = ؟
- [x] only-child
- [ ] root
- [ ] empty
- [ ] nth-child

ابن وحيد.

## refs

- [MDN: :last-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-child)
