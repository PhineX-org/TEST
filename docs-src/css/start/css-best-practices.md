---
id: css-best-practices
kind: guide
cat: start
title: أفضل ممارسات CSS
en: CSS best practices
status: stable
summary: عادات بتخلّي CSS نضيف وسهل الصيانة: ابدأ بـ reset بسيط، اكتب classes بأسماء واضحة، استخدم متغيّرات، وتجنّب الـ !important والتداخل العميق.
keywords: best practices, BEM, naming, classes, organization, تنظيم, تسمية, reset, maintainable, اسلوب, نظافة الكود
related: variables-guide, specificity, layers-guide, box-sizing, debugging-css
---

## intro

أي حد يقدر يكتب CSS شغال، لكن الكود **الكويس** هو اللي بتقدر تقراه بعد 6 شهور وتعدّله من غير ما يتهد. دي عادات بسيطة بتفرق:

1. **ابدأ بـ reset بسيط**: `*, *::before, *::after { box-sizing: border-box; }` ([[box-sizing]]) و`body { margin: 0 }`.
2. **استخدم classes بأسماء واضحة**: `.card-title` أفضل من `.red-big`. اوصف **الوظيفة** مش الشكل.
3. **متغيّرات للألوان والمسافات** ([[variables-guide]]) علشان تغيّر الثيم من مكان واحد.
4. **تجنّب `!important`** و**المحددات الطويلة** ([[specificity]]) و**الـ id للتنسيق**.
5. **اكتب للموبايل أول** ([[responsive-guide]]).
6. **وحدات نسبية** (`rem`/`%`) و**لا تحط أبعاد ثابتة** للنصوص.
7. **رتّب الخصائص** في كل قاعدة بشكل ثابت (تخطيط، صندوق، شكل، نص).
8. **علّق** على الأجزاء الغريبة بس.
9. **راعي الوصولية**: تباين كافي، وإظهار `:focus-visible`، واحترام `prefers-reduced-motion`.
10. **راقب الأداء**: حرّك `transform`/`opacity` فقط، وقلل الظلال التقيلة.

> [!tip] قاعدة ذهبية: لو بتعدّل نفس الخاصية في 10 أماكن، يبقى لازم متغيّر أو class مشترك.

> [!note] **مدارس التسمية**: BEM (`.card__title--big`) مشهورة وواضحة، بس أي نظام ثابت كويس.

## try

```html
<style>
  :root { --bg:#f3e6c9; --text:#3d2c18; --brand:#7a4a1d; --radius:10px; }
  *,*::before,*::after { box-sizing:border-box; }
  .card { background:var(--bg); color:var(--text); border-radius:var(--radius); padding:14px; }
  .card__title { color:var(--brand); margin:0 0 6px; }
</style>
<div class="card"><h3 class="card__title">عنوان الكارت</h3>محتوى</div>
```

## examples

### 1) تسمية بالوظيفة
اسم يصف الاستخدام مش اللون.

```html
<style>
  .btn-primary { background:#7a4a1d; color:#f3ede0; padding:10px 18px; border:0; border-radius:8px; }
  .btn-danger  { background:#a63b2f; color:#f3ede0; padding:10px 18px; border:0; border-radius:8px; }
</style>
<button class="btn-primary">حفظ</button> <button class="btn-danger">حذف</button>
```

- لو غيّرت اللون الاسم لسه صح.

### 2) متغيّرات مركزية
غيّر `--brand` مرة واحدة.

```html
<style>
  :root { --brand:#3d7a5a; }
  .a { background:var(--brand); color:#f3ede0; padding:8px; }
  .b { border:2px solid var(--brand); color:var(--brand); padding:8px; margin-top:6px; }
</style>
<div class="a">أ</div><div class="b">ب</div>
```



### 3) Focus واضح
لا تشيل الـ outline من غير بديل.

```html
<style>
  a { color:#7a4a1d; padding:4px; }
  a:focus-visible { outline:3px solid #c9772f; outline-offset:3px; border-radius:4px; }
</style>
<a href="#">اضغط Tab للتركيز</a>
```



## mistakes

### إزالة outline بدون بديل

```css bad
a:focus { outline:none; }
```

```css good
a:focus-visible { outline:3px solid #c9772f; }
```

المستخدم بالكيبورد بيضيع لو التركيز مش ظاهر.

### اسم class بيوصف الشكل

```css bad
.red-text { color:red; }
```

```css good
.error-text { color:red; }
```

لو غيّرت اللون الاسم يبقى مضلل.

## quiz

### أنهي أحسن اسم class؟
- [ ] .big-red
- [x] .alert-error
- [ ] .x1
- [ ] .div2

بيوصف الوظيفة.

### ليه نتجنب !important؟
- [ ] بطيء
- [x] بيخلّي التعديل صعب
- [ ] مش مدعوم
- [ ] مش بيشتغل

بيعقّد الأولويات.

## refs

- [MDN: Organizing your CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Organizing)
