---
id: align-items
kind: property
cat: flexbox
chip: align-items
title: محاذاة العناصر على المحور العرضي
en: CSS align-items property
status: stable
support: all
mdn: align-items
summary: align-items بتحدد محاذاة الأبناء على المحور العرضي: stretch وcenter وflex-start وflex-end وbaseline. أساس التوسيط الرأسي.
keywords: align-items, محاذاة, توسيط رأسي, stretch, center, baseline, flex-start, flex-end, cross axis
related: justify-content, align-self, align-content, place-items, flexbox-guide
---

## intro

الخاصية `align-items` بتحدد **إزاي الأبناء بيتحاذوا على المحور العرضي (cross axis)**، يعني العمودي على اتجاه الصف. في `row` (الافتراضي) ده هو **الرأسي**، فهي اللي بتوسّط العناصر **رأسياً**.

القيم:
- **`stretch`** (الافتراضي): العناصر بتتمدد لتملأ ارتفاع الحاوية (علشان كده الأعمدة بتبقى بنفس الطول).
- **`flex-start`**: لأول المحور العرضي (فوق).
- **`flex-end`**: لآخره (تحت).
- **`center`**: في النص.
- **`baseline`**: محاذاة خط الأساس للنص (مفيد لو أحجام الخطوط مختلفة).

بتتحط على **الحاوية** وبتأثر على كل أولادها. وعلشان تغيّر محاذاة ابن واحد استخدم [[align-self]]. وفي Grid بتحاذي الخلايا رأسياً.

> [!tip] توسيط كامل: `display:flex; justify-content:center; align-items:center; min-height:200px`.

> [!analogy] في صف أشخاص بأطوال مختلفة: `flex-start` كلهم بيلزقوا الراس فوق، `flex-end` الرجلين على الأرض، `center` في النص، و`stretch` كأنهم اتمدوا لنفس الطول.

## try

```html
<style>
  .f { display:flex; align-items:center; gap:6px; height:100px; background:#efe0bd; padding:6px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:6px 14px; }
  .f .t { padding:24px 14px; background:#3d7a5a; }
</style>
<div class="f"><div>قصير</div><div class="t">طويل</div></div>
```

## syntax

```css nolive
align-items: stretch;
align-items: flex-start;
align-items: center;
align-items: flex-end;
align-items: baseline;
```

- **القيمة المبدئية**: `normal` (stretch في flex).
- **بتتوارث؟** لأ.
- بتتحط على الحاوية.

## values

### stretch
يمدد العناصر لارتفاع الحاوية (الافتراضي).

### flex-start
لأعلى المحور العرضي.

### center
توسيط.

### flex-end
لأسفل.

### baseline
محاذاة خطوط النص.

## use

- توسيط رأسي `center`.
- أيقونة بجنب نص.
- كروت بنفس الارتفاع (stretch).
- محاذاة نصوص بأحجام مختلفة (`baseline`).

## avoid

- نسيان إن للحاوية لازم ارتفاع علشان التأثير يبان.
- استخدامها في column وتتوقع رأسي.

## examples

### 1) center
توسيط رأسي.

```html
<style>
  .f { display:flex; align-items:center; height:90px; background:#efe0bd; gap:6px; padding:6px; }
  .f div { background:#c9772f; color:#fff3e0; padding:6px 14px; }
  .t { padding:20px 14px !important; background:#3d7a5a !important; }
</style>
<div class="f"><div>صغير</div><div class="t">كبير</div></div>
```



### 2) stretch
العناصر اتمدّدت لنفس الارتفاع.

```html
<style>
  .f { display:flex; align-items:stretch; gap:6px; background:#efe0bd; padding:6px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:8px; }
</style>
<div class="f"><div>قصير</div><div>سطر<br>سطر<br>سطر</div></div>
```



### 3) flex-start وflex-end
فوق وتحت.

```html
<style>
  .f { display:flex; height:80px; background:#efe0bd; gap:6px; padding:6px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:6px 14px; }
</style>
<div class="f" style="align-items:flex-start"><div>start</div></div>
<div class="f" style="align-items:flex-end;margin-top:6px"><div>end</div></div>
```



### 4) baseline
النصوص بأحجام مختلفة على نفس الخط.

```html
<style>
  .f { display:flex; align-items:baseline; gap:10px; background:#efe0bd; padding:8px; color:#3d2c18; }
</style>
<div class="f"><span style="font-size:2rem">كبير</span><span>صغير</span></div>
```



## mistakes

### نسيان ارتفاع الحاوية

```css bad
.f { display:flex; align-items:center; }  /* مفيش مساحة رأسية */
```

```css good
.f { display:flex; align-items:center; min-height:150px; }
```

لو الحاوية على قد المحتوى مفيش فراغ يتوزّع.

### align-items مع column للأفقي

```css bad
.f { flex-direction:column; align-items:center; }  /* أفقي مش رأسي */
```

```css good
/* الرأسي: justify-content */
```

في column الأدوار بتتبدل.

## quiz

### القيمة الافتراضية؟
- [ ] center
- [x] stretch
- [ ] flex-start
- [ ] baseline

stretch.

### align-items بتحاذي على؟
- [ ] المحور الرئيسي
- [x] المحور العرضي
- [ ] الاتنين
- [ ] حسب الاتجاه فقط

cross axis.

### أحسن لتوسيط رأسي في row؟
- [ ] justify-content:center
- [x] align-items:center
- [ ] text-align:center
- [ ] margin:auto

center على العرضي.

## refs

- [MDN: align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
