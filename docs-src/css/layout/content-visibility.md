---
id: content-visibility
kind: property
cat: layout
chip: content-visibility
title: تأجيل رسم المحتوى
en: CSS content-visibility property
status: stable
support: all
size: compact
mdn: content-visibility
summary: content-visibility بتخلّي المتصفح يتخطى رسم وحساب المحتوى اللي برّه الشاشة لحد ما يقرّب، فتتحسن سرعة الصفحات الطويلة.
keywords: content-visibility, auto, hidden, أداء, performance, contain-intrinsic-size, lazy rendering
related: contain, overflow, will-change, display
---

## intro

الخاصية `content-visibility` أداة **أداء**: بتخلّي المتصفح **يتخطى** حساب التخطيط والرسم لعناصر **برّه الشاشة** لحد ما المستخدم يقرّب منها. ده بيسرّع تحميل الصفحات الطويلة جداً (فيها أقسام كتير).

القيمة المهمة **`auto`**: العنصر بيتحسب لما يقرّب من الشاشة (لكن محتواه لسه قابل للبحث بـ Ctrl+F وللوصولية). ومعاها لازم تحدد حجم تقديري بـ `contain-intrinsic-size` علشان الـ scrollbar ميقفزش.

القيمة `hidden`: بيخفي المحتوى ويحفظ حالته (أسرع من display:none في بعض الحالات). و`visible`: الافتراضي.

مدعومة في المتصفحات الحديثة. مفيش خطر لو متدعمتش: بتتجاهل بس.

> [!tip] طبّقها على الأقسام الطويلة بعيدة عن أول الشاشة، مش على الهيدر.

## try

```html
<style>
  .sec { content-visibility:auto; contain-intrinsic-size:auto 100px; background:#efe0bd; color:#3d2c18; padding:10px; margin:4px 0; }
</style>
<div class="sec">قسم 1</div><div class="sec">قسم 2</div><div class="sec">قسم 3</div>
```

## syntax

```css nolive
content-visibility: auto;
contain-intrinsic-size: auto 500px;
content-visibility: hidden;
content-visibility: visible;
```

- **القيمة المبدئية**: `visible`.
- حط معاها `contain-intrinsic-size`.

## values

### auto
يتخطى الرسم لو برّه الشاشة.

### hidden
محتواه متخطى دايماً مع حفظ الحالة.

### visible
عادي (الافتراضي).

## use

- صفحات طويلة بأقسام كتيرة.
- قوائم ضخمة بعناصر متكررة.

## avoid

- على المحتوى الظاهر أول الصفحة (LCP).
- من غير contain-intrinsic-size (scrollbar بيقفز).

## examples

### 1) قسم تقيل
تأجيل رسم قسم بعيد.

```html
<style>
  .s { content-visibility:auto; contain-intrinsic-size:auto 120px; background:#bcd4a8; color:#3d2c18; padding:10px; margin:4px 0; }
</style>
<div class="s">قسم بيتأجل رسمه</div>
```



### 2) hidden
بيخفي ويحفظ الحالة.

```html
<style>
  .h { content-visibility:hidden; }
  p { color:#3d2c18; }
</style>
<p>قبل</p><div class="h">مخفي</div><p>بعد</p>
```



### 3) قائمة طويلة
كل كارت قابل للتأجيل.

```html
<style>
  .k { content-visibility:auto; contain-intrinsic-size:auto 50px; padding:10px; background:#efe0bd; color:#3d2c18; margin:3px 0; }
</style>
<div class="k">كارت 1</div><div class="k">كارت 2</div><div class="k">كارت 3</div>
```



## mistakes

### نسيان intrinsic size

```css bad
.s { content-visibility:auto; }
```

```css good
.s { content-visibility:auto; contain-intrinsic-size:auto 400px; }
```

من غيره الارتفاع يبقى 0 فالـ scrollbar بيقفز.

## quiz

### أفضل قيمة لتحسين الأداء؟
- [ ] visible
- [x] auto
- [ ] none
- [ ] block

auto.

### بتأثر على Ctrl+F في auto؟
- [ ] أيوه بتمنعه
- [x] لأ
- [ ] أحياناً
- [ ] فقط hidden

محتواه لسه قابل للبحث.

## refs

- [MDN: content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
