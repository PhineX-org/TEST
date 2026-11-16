---
id: display
kind: property
cat: layout
chip: display
title: نوع عرض العنصر
en: CSS display property
status: stable
support: all
mdn: display
summary: display بتحدد إزاي العنصر بيتصرّف في التخطيط: block أو inline أو flex أو grid أو none. أهم خاصية في CSS بعد الألوان.
keywords: display, block, inline, inline-block, flex, grid, none, contents, flow-root, نوع العنصر, اخفاء, تخطيط
related: display-flow, visibility, position, flexbox-guide, grid-guide, float
---

## intro

الخاصية `display` من أهم خصائص CSS كلها، لأنها بتحدد **نوع الصندوق** اللي المتصفح هيعمله للعنصر، يعني **إزاي هيتصرّف** مع اللي حواليه وإزاي هيرتّب اللي جواه. كل عنصر ليه قيمة افتراضية: `div` و`p` **block**، و`span` و`a` **inline**.

فيه حاجتين بتحددهم القيمة: **الـ outer display** (العنصر بيتصرّف كـ block ولا inline مع جيرانه)، و**الـ inner display** (إزاي بيرتّب أولاده: عادي، أو flex، أو grid).

أهم القيم:
- **`block`**: بياخد سطر كامل ويقبل width وheight وmargin.
- **`inline`**: بيمشي مع الكلام ومبيقبلش width/height.
- **`inline-block`**: يمشي مع الكلام ويقبل الأبعاد.
- **`flex` / `grid`**: بيحوّل العنصر لحاوية تخطيط حديثة ([[flexbox-guide]]، [[grid-guide]]). والمقابلين `inline-flex` و`inline-grid`.
- **`none`**: العنصر يختفي ومبياخدش مكان.
- **`contents`**: الصندوق نفسه بيتشال والأولاد بيتعاملوا كأنهم أبناء الجد.
- **`flow-root`**: يعمل سياق تنسيق جديد (يحتوي floats).

الفرق بين `display: none` و`visibility: hidden` ([[visibility]]) إن الأول بيشيل المكان.

> [!analogy] `display` زي «نوع الأثاث»: الدولاب (block) بياخد مساحته كاملة، والكتاب (inline) بيتحط جنب غيره على الرف، والمكتبة (flex/grid) فيها تنظيم خاص جواها.

> [!key] لو `width` مش بيشتغل على عنصر، افحص `display`. غالباً هو `inline`.

## try

```html
<style>
  .box { padding:8px 14px; background:#bcd4a8; color:#3d2c18; margin:3px; }
  .a { display:block; } .b { display:inline-block; } .c { display:inline; }
</style>
<span class="box a">block</span><span class="box b">inline-block</span><span class="box b">inline-block</span><span class="box c">inline</span>
```

## syntax

```css nolive
display: block;
display: inline;
display: inline-block;
display: flex;
display: grid;
display: none;
display: contents;
display: flow-root;
```

- **القيمة المبدئية**: `inline` (لكن كل عنصر له افتراضي).
- **بتتوارث؟** لأ.
- **بتتحرك؟** بشكل منفصل.

## values

### block
سطر كامل ويقبل الأبعاد والهوامش.

### inline
مع الكلام، من غير width/height.

### inline-block
مع الكلام ويقبل الأبعاد.

### flex
حاوية Flexbox (صف أو عمود).

### grid
حاوية Grid (صفوف وأعمدة).

### none
العنصر مش موجود في التخطيط.

### contents
الصندوق يختفي والأولاد يتصرفوا كأنهم أبناء الجد.

### flow-root
سياق تنسيق مستقل: يحتوي floats ويمنع margin collapse.

## use

- `display:flex` لرص العناصر في صف أو عمود.
- `display:grid` لتخطيطات الشبكة.
- `display:none` لإخفاء عنصر بالكامل (مع JS).
- `inline-block` للأزرار والـ badges.

## avoid

- `display:none` لإخفاء محتوى عايز قارئ الشاشة يقراه بدون تفكير.
- تغيير display العناصر الجدولية (table) بشكل يكسر الـ semantics.

## examples

### 1) block مقابل inline
الصناديق الخضراء block بتاخد سطر، والبنية inline بتمشي مع بعض.

```html
<style>
  .b { display:block; background:#bcd4a8; color:#3d2c18; padding:6px; margin:4px 0; }
  .i { display:inline; background:#e4c490; color:#3d2c18; padding:6px; }
</style>
<span class="b">block</span><span class="b">block</span><span class="i">inline</span><span class="i">inline</span>
```



### 2) flex بيرص جنب بعض
تغيير سطر واحد حوّل التخطيط.

```html
<style>
  .f { display:flex; gap:8px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:10px 16px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



### 3) none يشيل المكان
العنصر التاني اختفى والجيران قرّبوا.

```html
<style>
  .r span { display:inline-block; padding:8px 14px; background:#efe0bd; color:#3d2c18; margin:3px; }
  .n { display:none !important; }
</style>
<div class="r"><span>1</span><span class="n">2</span><span>3</span></div>
```



### 4) contents
الغلاف اتشال والأولاد بقوا أبناء الـ grid مباشرة.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .w { display:contents; }
  .g span { background:#c9772f; color:#fff3e0; padding:8px; text-align:center; }
</style>
<div class="g"><div class="w"><span>1</span><span>2</span></div><span>3</span></div>
```



## mistakes

### width على عنصر inline

```css bad
span { width:100px; }  /* مفيش أثر */
```

```css good
span { display:inline-block; width:100px; }
```

العنصر inline مبيقبلش width/height.

### نسيان display:flex على الأب

```css bad
.item { justify-content:center; }
```

```css good
.parent { display:flex; justify-content:center; }
```

خصائص flex بتتحط على الحاوية.

## quiz

### القيمة الافتراضية لـ div؟
- [ ] inline
- [x] block
- [ ] flex
- [ ] none

block.

### `display:none` بيعمل؟
- [ ] يخفي ويسيب المكان
- [x] يشيل العنصر من التخطيط
- [ ] يشفّفه
- [ ] يقصّه

مفيش مكان محجوز.

### أنسب قيمة لرص عناصر جنب بعض بسهولة؟
- [ ] block
- [ ] inline
- [x] flex
- [ ] none

`flex`.

## refs

- [MDN: display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
