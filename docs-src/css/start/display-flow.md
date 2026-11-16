---
id: display-flow
kind: guide
cat: start
title: الـ Display والتدفق الطبيعي
en: Display and normal flow
status: stable
summary: إزاي المتصفح بيرتّب العناصر بشكل افتراضي: block بتاخد سطر كامل وinline بتمشي جنب بعض، وإزاي تغيّر ده بـ display وتخفي عناصر.
keywords: display, block, inline, inline-block, none, flow, normal flow, تدفق, العناصر جنب بعض, اخفاء عنصر, رص العناصر
related: display, visibility, positioning-guide, flexbox-guide, box-model
---

## intro

من غير أي CSS، المتصفح بيرصّ العناصر بقواعد بسيطة اسمها **التدفق الطبيعي (Normal Flow)**: العناصر **من فوق لتحت** بترتيب ما كتبتها.

وكل عنصر بيتصرّف بحسب نوعه الظاهري ([[display]]):
- **`block`**: بياخد **السطر كله** ويبدأ سطر جديد، وتقدر تتحكم في `width` و`height` و`margin` بتاعه. أمثلة: `<div>` و`<p>` و`<h1>`.
- **`inline`**: بيمشي **جنب** اللي قبله زي الكلمات في الجملة، و**مبيقبلش** `width`/`height`، والهوامش الرأسية مش بتأثر. أمثلة: `<span>` و`<a>` و`<strong>`.
- **`inline-block`**: يمشي جنب غيره (زي inline) **وبيقبل** الأبعاد (زي block). مفيد للأزرار والـ badges.
- **`none`**: العنصر **يختفي تماماً** ومبياخدش مكان.
- **`flex` و`grid`**: أنظمة تخطيط حديثة هنشوفها في [[flexbox-guide]] و[[grid-guide]].

ولو عايز تخفي العنصر لكن يفضل ياخد مكانه، استخدم [[visibility]]`: hidden`.

> [!analogy] block زي «سطر مستقل في الكراسة»، وinline زي «كلمات جوه السطر». وinline-block زي «ستيكر» بتحطه جوه السطر بس له حجم محدد.

> [!key] لو `width` أو `margin` مش بيشتغلوا على عنصر `span`، السبب غالباً إنه inline. غيّره لـ `inline-block` أو `block`.

## try

```html
<style>
  span { background:#bcd4a8; color:#3d2c18; padding:6px; }
  .blk { display:block; margin-top:6px; }
</style>
<span>inline</span><span>inline</span><span class="blk">block</span>
```

## examples

### 1) block مقابل inline
الـ `div` بياخد سطر، والـ `span` بيمشي مع الكلام.

```html
<style>
  div { background:#efe0bd; color:#3d2c18; margin:4px 0; padding:6px; }
  span { background:#bcd4a8; color:#3d2c18; padding:4px 8px; }
</style>
<div>div (block)</div><div>div تاني</div>
<span>span</span><span>span</span><span>span</span>
```

- الـ div كل واحد في سطر.

### 2) الأبعاد مش بتشتغل على inline
`width` بتتجاهل على `span`، وبتشتغل لما نخليه `inline-block`.

```html
<style>
  span { width:120px; height:40px; background:#e4c490; color:#3d2c18; margin:4px; }
  .ib { display:inline-block; background:#3d7a5a; color:#f3ede0; }
</style>
<span>inline: مفيش أبعاد</span><span class="ib">inline-block: 120×40</span>
```



### 3) none مقابل hidden
`display:none` بيشيل مكانه تماماً، و`visibility:hidden` بيسيب فراغ.

```html
<style>
  .row div { display:inline-block; padding:10px; background:#efe0bd; color:#3d2c18; margin:3px; }
  .n { display:none; } .h { visibility:hidden; }
</style>
<div class="row"><div>1</div><div class="n">2 (none)</div><div class="h">3 (hidden)</div><div>4</div></div>
```

- شوف الفراغ مكان 3.

### 4) قائمة أفقية
`li` اتحولت من block لـ inline-block فبقت جنب بعض (أساس القوائم الأفقية).

```html
<style>
  ul { list-style:none; padding:0; margin:0; }
  li { display:inline-block; padding:8px 14px; background:#7a4a1d; color:#f3ede0;
       border-radius:6px; margin-inline-end:6px; }
</style>
<ul><li>الرئيسية</li><li>الدروس</li><li>اتصل بينا</li></ul>
```

- بعدين هتستخدم flex للشغل ده.

## mistakes

### استخدام width على span

```css bad
span { width:200px; }  /* مفيش تأثير */
```

```css good
span { display:inline-block; width:200px; }
```

العناصر inline مبتقبلش أبعاد.

### إخفاء بـ display:none للقارئ الشاشة

```css bad
.menu { display:none; }  /* يتخفّى للكل حتى قارئ الشاشة */
```

```css good
.sr { position:absolute; width:1px; height:1px; overflow:hidden; }
```

display:none بيخفي من الجميع. للمحتوى اللي لازم يتقري، استخدم تقنيات الإخفاء البصري.

## quiz

### أنهي عنصر بياخد سطر كامل افتراضياً؟
- [ ] span
- [ ] a
- [x] div
- [ ] strong

div عنصر block.

### الفرق بين display:none و visibility:hidden؟
- [ ] مفيش فرق
- [x] الأول بيشيل المكان والتاني بيسيبه فارغ
- [ ] التاني أسرع
- [ ] الأول بيسيب المكان

none بيلغي العنصر من الـ layout.

### أنسب قيمة لعنصر جنب غيره وبياخد width؟
- [ ] block
- [ ] inline
- [x] inline-block
- [ ] none

inline-block بيجمع الاتنين.

## refs

- [MDN: Normal flow](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction)
