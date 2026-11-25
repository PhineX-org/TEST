---
id: margin-right
kind: property
cat: spacing
chip: margin-right
title: margin من اليمين
en: CSS margin-right property
status: stable
support: all
size: compact
mdn: margin-right
summary: الخاصية margin-right بتحدد المسافة الخارجية على جهة اليمين من العنصر.
keywords: margin-right, margin, هامش يمين, مسافة, spacing
related: margin, padding, box-model, margin-inline, padding-right
---

## intro

الخاصية `margin-right` بتحدد **الـ margin على جهة اليمين** من العنصر لوحدها، من غير ما تأثر على باقي الجهات. هي واحدة من أربع خصائص بتكوّن الاختصار [[margin]]، وبتستخدمها لما عايز تظبط جهة واحدة بس. زي ما عرفنا في [[box-model]]، الـ margin هو المسافة **برّه** حدود العنصر، وهو **شفاف** ومبياخدش لون الخلفية. ومهم: في الصفحات **العربية (RTL)** الاتجاه بيتعكس، فالأفضل تستخدم الخصائص المنطقية ([[margin-inline]]) علشان التصميم يشتغل في أي لغة.

المنطقي المقابل: `margin-inline-end` (في الإنجليزي) أو `margin-inline-start` (في العربي). القيمة ممكن تكون طول زي `20px` أو نسبة (من عرض الأب) أو `auto` أو قيمة سالبة.

## try

```html
<style>
  .box { background:#c9772f; color:#fff3e0; padding:10px; margin-right:30px; border:2px solid #7a4a1d; }
  .wrap { background:#efe0bd; outline:2px dashed #7a4a1d; display:inline-block; }
</style>
<div class="wrap"><div class="box">غيّر القيمة</div></div>
```

## syntax

```css nolive
margin-right: 20px;
margin-right: 2rem;
margin-right: auto;
margin-right: -10px;
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
margin يمين بيبعد العنصر ناحية يمين.

```html
<style>
  .row { background:#efe0bd; padding:6px; }
  .i { display:inline-block; background:#c9772f; color:#fff3e0; padding:8px; margin-right:30px; }
  .j { display:inline-block; background:#3d7a5a; color:#f3ede0; padding:8px; }
</style>
<div class="row"><span class="i">margin-right</span><span class="j">جاره</span></div>
```

- العنصر `inline-block` علشان الـ margin الأفقي يظهر.

### 2) auto لدفع عنصر في flex
`margin-right: auto` بياخد كل المساحة الفاضية فيدفع العنصر للطرف التاني.

```html
<style>
  .bar { display:flex; background:#efe0bd; padding:6px; }
  .bar div { background:#7a4a1d; color:#f3ede0; padding:6px 12px; }
  .bar .push { margin-right:auto; background:#3d7a5a; }
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

### الخلط بين margin-right وpadding

```css bad
.a { margin-right:20px; }  /* عايز مسافة جوه العنصر */
```

```css good
.a { padding-right:20px; }
```

الـ margin برّه العنصر والـ padding جوّاه. الخلفية بتظهر في الـ padding.

## quiz

### `margin-right` بتحدد؟
- [ ] مسافة داخلية
- [x] مسافة خارجية على جهة اليمين
- [ ] سُمك الحد
- [ ] لون الخلفية

margin جهة واحدة.

### الـ margin شفاف؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط جوه flex

مبياخدش لون الخلفية.

## refs

- [MDN: margin-right](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right)
