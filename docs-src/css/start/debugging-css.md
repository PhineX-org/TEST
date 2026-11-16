---
id: debugging-css
kind: guide
cat: start
title: إزاي تلاقي غلطة في CSS
en: Debugging CSS
status: stable
summary: التنسيق مش شغال؟ خطوات ثابتة تتّبعها وأدوات DevTools تكشف المشكلة في دقايق: Inspect وComputed وطي الخصائص الغلط والـ specificity.
keywords: debug, devtools, inspect, مش شغال, css مش بيشتغل, اخطاء, computed, specificity, عدل, فحص, F12
related: specificity, cascade-inheritance, selectors-guide, css-best-practices, box-model
---

## intro

كل مبرمج CSS بيقابل اللحظة دي: «كتبت التنسيق وماشتغلش!». الخبر الحلو إن المشاكل بتتكرر وفيه خطوات ثابتة تكتشفها بسرعة.

**افتح DevTools** (اضغط `F12` أو كليك يمين ثم Inspect)، وركّز العنصر:
1. **Styles**: بتشوف كل القواعد المطبقة. أي خاصية **مشطوبة** معناها إنها غلّبتها قاعدة تانية (specificity أو ترتيب)، أو **تحت مثلث أصفر** يعني قيمتها غير صحيحة/اسمها غلط.
2. **Computed**: القيمة النهائية الفعلية لكل خاصية، ومنين جت.
3. **Box model diagram**: بتشوف المحتوى والحشو والحد والهامش بالأرقام.

أسباب الشلل الشائعة:
- **المحدد مش بيطابق العنصر** (غلط في اسم class أو نسيت النقطة).
- **الـ specificity**: قاعدة تانية أقوى ([[specificity]]).
- **غلط كتابي**: `colour` بدل `color`، أو نسيان `;` أو `}`.
- **الخاصية مش بتشتغل مع نوع العنصر** (width على inline، z-index من غير position).
- **الملف مش بيتحمّل** (مسار غلط أو cache). جرّب `Ctrl+Shift+R`.

> [!tip] حيلة سريعة: حط `outline: 2px solid red` على العنصر علشان تشوف مكانه وحجمه الفعلي.

> [!key] غيّر القيم مباشرة في DevTools وجرّب قبل ما تعدّل الكود.

## try

```html
<style>
  .a { color:#3d7a5a; }
  p.a { color:#b5551f; }   /* أقوى (class + type) */
</style>
<p class="a">أنهي لون هيظهر؟ افتح Inspect في ذهنك</p>
```

## examples

### 1) محدد غلط
النقطة منسية، فالمحدد بيدوّر على عنصر اسمه `box`.

```html
<style>
  box { background:#a63b2f; }          /* غلط: مفيش عنصر اسمه box */
  .box { background:#3d7a5a; color:#f3ede0; padding:10px; }  /* صح */
</style>
<div class="box">أخضر</div>
```



### 2) خاصية مكتوبة غلط
المتصفح بيتجاهل `colour` ويكمّل.

```html
<style>
  .t { colour:#a63b2f; color:#3d7a5a; padding:10px; background:#efe0bd; }
</style>
<div class="t">أخضر (الغلط اتجاهل)</div>
```

- في DevTools بتظهر مشطوبة.

### 3) outline للفحص
`outline` بيوريك حدود كل عنصر من غير ما يغيّر التخطيط.

```html
<style>
  * { outline:1px solid #c9772f; }
  .a { padding:10px; margin:6px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="a">عنصر<p style="margin:4px">فقرة جواه</p></div>
```



## mistakes

### الإصرار بـ !important

```css bad
.btn { color:red !important; }  /* حل سريع مؤقت */
```

```css good
/* ابحث عن القاعدة الأقوى وعدّل المحدد */
.card .btn { color:red; }
```

`!important` بيخبّي المشكلة وبيعقّد اللي بعده.

## quiz

### خاصية مشطوبة في Styles معناها؟
- [ ] اتحذفت
- [x] قاعدة تانية غلبتها أو غير صالحة
- [ ] سريعة
- [ ] مش محتاجة

غالباً specificity أو قيمة غلط.

### أنهي تبويب بيوريك القيمة النهائية؟
- [ ] Console
- [x] Computed
- [ ] Network
- [ ] Sources

Computed.

## refs

- [MDN: Debugging CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Debugging_CSS)
