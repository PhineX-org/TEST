---
id: box-shadow
kind: property
cat: borders-bg
chip: box-shadow
title: ظل الصندوق
en: CSS box-shadow property
status: stable
support: all
mdn: box-shadow
summary: box-shadow بتضيف ظل حوالين العنصر: إزاحة أفقية ورأسية وتمويه وانتشار ولون، وtوحقيقي inset. أساس الكروت العايمة.
keywords: box-shadow, ظل, shadow, blur, spread, inset, elevation, كارت عايم, تأثير عمق
related: border-radius, filter, text-shadow, outline, background
---

## intro

الخاصية `box-shadow` بترسم **ظل** حوالين صندوق العنصر، فتدّي إحساس بالعمق وإن العنصر «مرفوع» عن الصفحة. الصيغة: **`offset-x offset-y blur spread color`**، مثلاً `0 6px 16px rgba(60,40,20,.2)`:
1. **الإزاحة الأفقية (x)**: موجبة لليمين، سالبة لليسار.
2. **الإزاحة الرأسية (y)**: موجبة لتحت.
3. **التمويه (blur)**: كل ما زاد الظل بقى أنعم وأوسع (اختياري).
4. **الانتشار (spread)**: يكبّر أو يصغّر الظل (اختياري).
5. **اللون**: غالباً شفاف (rgba).
6. **`inset`**: بيحط الظل **جوه** العنصر.

ممكن تحط **أكتر من ظل** مفصولين بفاصلة (ظل ناعم + ظل أقرب). والظل بيتبع [[border-radius]]، ومبياخدش مساحة ومبيأثرش على التخطيط، ومبيستقبلش ضغط.

> [!tip] الظل **الخفيف والناعم** (شفافية 10–25%، تمويه كبير) أريح للعين وأشيك من الظل الغامق القاسي.

> [!analogy] الظل زي بُعد الكارت عن الطاولة: كل ما رفعته أكتر الظل بقى أبعد وأنعم.

## try

```html
<style>
  .c { width:140px; padding:16px; background:#f3e6c9; color:#3d2c18; border-radius:12px;
       box-shadow:0 8px 20px rgba(60,40,20,.22); }
</style>
<div class="c">كارت عايم</div>
```

## syntax

```css nolive
box-shadow: 0 4px 12px rgba(60,40,20,.2);
box-shadow: 0 0 0 3px #c9772f;          /* حلقة (بدون تمويه) */
box-shadow: inset 0 2px 6px rgba(0,0,0,.2); /* داخلي */
box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 8px 20px rgba(0,0,0,.15); /* متعدد */
```

- **القيمة المبدئية**: `none`.
- **بتتحرك؟** أيوه.
- مبياخدش مساحة.

## values

### `<offset-x> <offset-y>`
الإزاحة الأفقية والرأسية (إجباري).

### `<blur-radius>`
التمويه (اختياري، 0 = حاد).

### `<spread-radius>`
الانتشار (اختياري).

### `<color>`
لون الظل.

### inset
ظل داخلي.

## use

- كروت وقوائم بعمق.
- مستويات ارتفاع (elevation).
- حلقة تركيز بـ spread.
- تأثير hover يرفع العنصر.

## avoid

- ظلال سوداء غامقة قاسية.
- ظلال تقيلة كتير على صفحة طويلة (أداء).

## examples

### 1) مستويات العمق
ظل صغير وأوسط وكبير.

```html
<style>
  .s { display:inline-block; width:80px; height:60px; margin:14px; background:#f3e6c9; border-radius:8px; }
</style>
<div class="s" style="box-shadow:0 1px 3px rgba(60,40,20,.25)"></div>
<div class="s" style="box-shadow:0 6px 14px rgba(60,40,20,.22)"></div>
<div class="s" style="box-shadow:0 14px 28px rgba(60,40,20,.25)"></div>
```



### 2) inset
ظل داخلي لشكل «مضغوط».

```html
<style>
  .i { padding:14px; background:#efe0bd; color:#3d2c18; border-radius:10px; box-shadow:inset 0 3px 8px rgba(60,40,20,.3); }
</style>
<div class="i">ظل داخلي</div>
```



### 3) حلقة بدون blur
spread فقط = شبه حد.

```html
<style>
  .r { padding:10px; background:#efe0bd; color:#3d2c18; border-radius:8px; box-shadow:0 0 0 4px #c9772f; margin:8px; display:inline-block; }
</style>
<div class="r">حلقة</div>
```



### 4) hover يرفع الكارت
مرّر الماوس.

```html
<style>
  .c { width:130px; padding:14px; background:#f3e6c9; color:#3d2c18; border-radius:10px;
       box-shadow:0 2px 6px rgba(60,40,20,.2); transition:box-shadow .25s, transform .25s; }
  .c:hover { box-shadow:0 12px 24px rgba(60,40,20,.28); transform:translateY(-4px); }
</style>
<div class="c">مرّر عليّ</div>
```



## mistakes

### ظل أسود قاسي

```css bad
.c { box-shadow:5px 5px 0 black; }
```

```css good
.c { box-shadow:0 6px 16px rgba(60,40,20,.2); }
```

الظل الناعم الشفاف أريح وأشيك.

### نسيان إن الظل بيتقص

```css bad
.p { overflow:hidden; }
.c { box-shadow:0 8px 20px rgba(0,0,0,.3); }  /* اتقص */
```

```css good
.p { padding:20px; }  /* مساحة للظل */
```

الأب overflow:hidden بيقص الظل.

## quiz

### الترتيب في box-shadow؟
- [x] x y blur spread color
- [ ] color x y
- [ ] blur x y
- [ ] spread only

إزاحتين ثم تمويه ثم انتشار ثم لون.

### inset معناها؟
- [ ] ظل برّه
- [x] ظل جوه العنصر
- [ ] بدون ظل
- [ ] ظل نص

ظل داخلي.

### الظل بياخد مساحة؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط مع blur

لا يؤثر على التخطيط.

## refs

- [MDN: box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
