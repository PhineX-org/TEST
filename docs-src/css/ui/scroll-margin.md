---
id: scroll-margin
kind: property
cat: ui
chip: scroll-margin
title: هامش التقاط التمرير
en: CSS scroll-margin property
status: stable
support: all
size: compact
mdn: scroll-margin
summary: scroll-margin بتضيف مسافة حوالين العنصر لما المتصفح يمرر له (anchor أو snap). مفيدة مع header ثابت.
keywords: scroll-margin, scroll-margin-top, header ثابت, anchor, offset
related: scroll-padding, scroll-snap-align, scroll-behavior, target
---

## intro

الخاصية `scroll-margin` بتضيف **مسافة أمان حوالين العنصر** في حسابات التمرير. لما المتصفح يمرر للعنصر (رابط داخلي `#id` أو `scrollIntoView` أو snap)، بيراعي المسافة دي. أشهر استخدام: **عندك header ثابت** (`position: sticky/fixed`) ارتفاعه 70px، فلما المستخدم ينتقل لعنوان `#sec` العنوان بيختفي تحت الـ header. الحل: `h2 { scroll-margin-top: 80px; }`. بتتحط على **العنصر الهدف** نفسه (عكس [[scroll-padding]] اللي بتتحط على الحاوية). وفيه نسخ لكل جهة: `scroll-margin-top` و`-bottom` و`-inline`.

## try

```html
<style>
  h4 { scroll-margin-top:40px; margin:0; padding:6px; background:#efe0bd; color:#7a4a1d; }
</style>
<h4 id="t">عنوان بمسافة تمرير</h4>
```

## syntax

```css nolive
h2 { scroll-margin-top: 80px; }
.item { scroll-margin: 10px; }
```

- على العنصر الهدف.
- **القيمة المبدئية**: `0`.

## values

### `<length>`
المسافة.

### 0
بدون (الافتراضي).

## use

- header ثابت.
- مسافة حول عناصر snap.

## avoid

- نسيانها مع header ثابت.

## examples

### 1) header ثابت
العنوان مبيختفيش.

```html
<style>
  .h { position:sticky; top:0; background:#7a4a1d; color:#f3ede0; padding:8px; }
  h4 { scroll-margin-top:44px; margin:0; padding:6px; color:#7a4a1d; }
</style>
<div class="h">Header ثابت</div><h4 id="sec">القسم</h4>
```



### 2) كل الجهات
scroll-margin.

```html
<style>
  .i { scroll-margin:20px; padding:8px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="i">عنصر بمسافة</div>
```



### 3) مع snap
مسافة التقاط.

```html
<style>
  .r { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; gap:6px; background:#efe0bd; padding:6px; }
  .i { flex:0 0 90px; height:40px; background:#c9772f; scroll-snap-align:start; scroll-margin-inline-start:10px; border-radius:6px; }
</style>
<div class="r"><div class="i"></div><div class="i"></div><div class="i"></div><div class="i"></div></div>
```



## mistakes

### على الحاوية

```css bad
.page { scroll-margin-top:80px; }
```

```css good
h2 { scroll-margin-top:80px; }
```

على الهدف.

## quiz

### scroll-margin بتتحط على؟
- [x] العنصر الهدف
- [ ] الحاوية
- [ ] body
- [ ] html

الهدف.

### الاستخدام الأشهر؟
- [x] header ثابت
- [ ] ألوان
- [ ] حدود
- [ ] نص

منع الاختفاء.

## refs

- [MDN: scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin)
