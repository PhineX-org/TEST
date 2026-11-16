---
id: opacity
kind: property
cat: colors-effects
chip: opacity
title: الشفافية
en: CSS opacity property
status: stable
support: all
mdn: opacity
summary: opacity بتحدد شفافية العنصر كله (نص وخلفية وأولاد) من 0 لـ 1. بتعمل stacking context. للخلفية بس استخدم alpha في اللون.
keywords: opacity, شفافية, transparency, alpha, fade, 0.5, تلاشي, stacking context
related: background-color, visibility, filter, transition, z-index
---

## intro

الخاصية `opacity` بتحدد **شفافية العنصر كله**: من `0` (شفاف تماماً) لـ `1` (معتم، الافتراضي). بتأثر على **كل حاجة**: الخلفية والنص والحدود **وكل الأولاد** (مش ممكن ابن يكون أعتم من أبوه). `opacity: 0.5` = نص شفاف.

نقاط مهمة:
- لو عايز **خلفية شفافة والنص واضح** استخدم القناة الرابعة في اللون: `background: rgb(0 0 0 / .5)` ([[background-color]])، مش opacity.
- أي `opacity` أقل من 1 بتعمل **سياق تراص (stacking context)** جديد فبتأثر على [[z-index]].
- `opacity: 0` بيخفي العنصر **لكنه بيفضل ياخد مكان وبيستقبل ضغط وتركيز**. للإخفاء الكامل استخدم [[visibility]] أو `display`.
- ممتازة في **الـ transition** لعمل تلاشي (fade) سلس وخفيف على الأداء.

> [!analogy] `opacity` زي ورقة شفافة بتتحط فوق كل حاجة: كل اللي تحتها (النص والخلفية) بيبهت مع بعض.

## try

```html
<style>
  .b { padding:12px; background:#7a4a1d; color:#f3ede0; border-radius:8px; opacity:.5; }
</style>
<div class="b">opacity: 0.5 (كل حاجة بتبهت)</div>
```

## syntax

```css nolive
opacity: 1;
opacity: 0.5;
opacity: 0;
opacity: 50%;
```

- **القيمة المبدئية**: `1`.
- **بتتوارث؟** لأ (لكن بتأثر على الأولاد).
- **بتتحرك؟** أيوه.

## values

### 1
معتم تماماً.

### 0.5
نص شفاف.

### 0
شفاف تماماً (لسه ياخد مكان).

## use

- تلاشي (fade) في الانتقالات.
- عنصر معطّل باهت.
- تعتيم طبقة overlay.

## avoid

- opacity للخلفية بس (النص هيبهت كمان).
- opacity:0 لإخفاء محتوى مهم عن الكيبورد.

## examples

### 1) مستويات
1 و.6 و.3.

```html
<style>
  .b { display:inline-block; padding:10px 18px; background:#7a4a1d; color:#f3ede0; margin:4px; border-radius:8px; }
</style>
<div class="b" style="opacity:1">1</div><div class="b" style="opacity:.6">.6</div><div class="b" style="opacity:.3">.3</div>
```



### 2) opacity مقابل alpha
الأولى بتبهّت النص كمان.

```html
<style>
  .p { background:linear-gradient(90deg,#3d7a5a,#c9772f); padding:10px; }
  .a, .b { padding:8px; margin:4px 0; color:#2f2820; }
  .a { background:#f3ede0; opacity:.5; } .b { background:rgb(243 237 224 / .5); }
</style>
<div class="p"><div class="a">opacity: النص باهت</div><div class="b">alpha: النص واضح</div></div>
```



### 3) fade بالـ hover
مرّر الماوس.

```html
<style>
  .b { padding:12px; background:#3d7a5a; color:#f3ede0; border-radius:8px; opacity:.5; transition:opacity .3s; }
  .b:hover { opacity:1; }
</style>
<div class="b">مرّر عليّ</div>
```



### 4) opacity:0 لسه ياخد مكان
المكان محجوز.

```html
<style>
  span { display:inline-block; padding:8px 14px; background:#efe0bd; color:#3d2c18; margin:3px; }
</style>
<span>1</span><span style="opacity:0">2 (opacity 0)</span><span>3</span>
```



## mistakes

### opacity للخلفية

```css bad
.glass { background:#000; opacity:.5; }
```

```css good
.glass { background:rgb(0 0 0 / .5); }
```

opacity بتبهّت النص كمان.

### opacity:0 للإخفاء

```css bad
.menu { opacity:0; }  /* لسه بيستقبل ضغط */
```

```css good
.menu { opacity:0; visibility:hidden; }
```

ضيف visibility أو pointer-events.

## quiz

### opacity:0.5؟
- [ ] نص الحجم
- [x] نص الشفافية
- [ ] نص اللون
- [ ] خطأ

نص شفاف.

### بتأثر على الأولاد؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط النص

كل العنصر.

### للخلفية الشفافة بس؟
- [ ] opacity
- [x] rgb(… / alpha)
- [ ] visibility
- [ ] z-index

القناة الرابعة.

## refs

- [MDN: opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
