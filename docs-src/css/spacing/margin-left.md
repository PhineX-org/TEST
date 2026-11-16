---
id: margin-left
kind: property
cat: spacing
chip: margin-left
title: هامش الشمال
en: CSS margin-left property
status: stable
support: all
size: compact
mdn: margin-left
summary: الخاصية margin-left بتحدد المسافة الخارجية على جهة الشمال من العنصر.
keywords: margin-left, margin, هامش شمال, مسافة, spacing
related: margin, padding, box-model, margin-inline, padding-left
---

## intro

الخاصية `margin-left` بتحدد **الهامش على جهة الشمال** من العنصر لوحدها، من غير ما تأثر على باقي الجهات. هي واحدة من أربع خصائص بتكوّن الاختصار [[margin]]، وبتستخدمها لما عايز تظبط جهة واحدة بس. زي ما عرفنا في [[box-model]]، الهامش هو المسافة **برّه** حدود العنصر، وهو **شفاف** ومبياخدش لون الخلفية. ومهم: في الصفحات **العربية (RTL)** الاتجاه بيتعكس، فالأفضل تستخدم الخصائص المنطقية ([[margin-inline]]) علشان التصميم يشتغل في أي لغة.

المنطقي المقابل: `margin-inline-start` (في الإنجليزي) أو `margin-inline-end` (في العربي). القيمة ممكن تكون طول زي `20px` أو نسبة (من عرض الأب) أو `auto` أو قيمة سالبة.

## try

```html
<style>
  .box { background:#c9772f; color:#fff3e0; padding:10px; margin-left:30px; border:2px solid #7a4a1d; }
  .wrap { background:#efe0bd; outline:2px dashed #7a4a1d; display:inline-block; }
</style>
<div class="wrap"><div class="box">غيّر القيمة</div></div>
```

## syntax

```css nolive
margin-left: 20px;
margin-left: 2rem;
margin-left: auto;
margin-left: -10px;
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<length>`
قيمة ثابتة مثل `20px` أو `1.5rem`.

### auto
المتصفح بيحسبها (مع الأفقي بيوسّط أو بيدفع العنصر).

### `<percentage>`
نسبة من عرض الأب.

## use

- ظبط جهة واحدة من غير ما تكتب الاختصار الكامل.
- تنسيق استثنائي لعنصر معين (مثلاً آخر عنصر).

## avoid

- كتابة الأربع خصائص منفصلة بدل الاختصار `margin`.

## examples

### 1) مسافة جنب العنصر
هامش شمال بيبعد العنصر ناحية شمال.

```html
<style>
  .row { background:#efe0bd; padding:6px; }
  .i { display:inline-block; background:#c9772f; color:#fff3e0; padding:8px; margin-left:30px; }
  .j { display:inline-block; background:#3d7a5a; color:#f3ede0; padding:8px; }
</style>
<div class="row"><span class="i">margin-left</span><span class="j">جاره</span></div>
```

- العنصر `inline-block` علشان الهامش الأفقي يظهر.

### 2) auto لدفع عنصر في flex
`margin-left: auto` بياخد كل المساحة الفاضية فيدفع العنصر للطرف التاني.

```html
<style>
  .bar { display:flex; background:#efe0bd; padding:6px; }
  .bar div { background:#7a4a1d; color:#f3ede0; padding:6px 12px; }
  .bar .push { margin-left:auto; background:#3d7a5a; }
</style>
<div class="bar"><div>شعار</div><div class="push">زر</div></div>
```

- أسلوب معروف في الـ navbar.

### 3) مقارنة بالمنطقي
`margin-inline-start` بيشتغل صح في العربي والإنجليزي.

```html
<style>
  .a { margin-inline-start:40px; background:#bcd4a8; color:#3d2c18; padding:8px; margin-bottom:6px; }
</style>
<div class="a">مسافة من بداية السطر</div>
<div class="a" dir="ltr">Start margin (LTR)</div>
```

- الحد انتقل لوحده.

## mistakes

### الخلط بين margin-left وpadding

```css bad
.a { margin-left:20px; }  /* عايز مسافة جوه العنصر */
```

```css good
.a { padding-left:20px; }
```

الهامش برّه العنصر والحشو جوّاه. الخلفية بتظهر في الحشو.

## quiz

### `margin-left` بتحدد؟
- [ ] مسافة داخلية
- [x] مسافة خارجية على جهة الشمال
- [ ] سُمك الحد
- [ ] لون الخلفية

هامش جهة واحدة.

### الهامش شفاف؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط جوه flex

مبياخدش لون الخلفية.

## refs

- [MDN: margin-left](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left)
