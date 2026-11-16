---
id: attr-dir
kind: attribute
cat: global-attrs
chip: dir
title: خاصية اتجاه النص
en: HTML dir global attribute
status: stable
support: all
mdn: Global_attributes/dir
summary: خاصية dir بتحدد اتجاه الكتابة: rtl لليمين لليسار (عربي)، ltr لليسار لليمين، وauto بيحدد حسب المحتوى. على html بتخلّي الصفحة كلها بالاتجاه الصح.
keywords: dir, اتجاه, rtl, ltr, auto, من اليمين لليسار, direction, bdi, عربي, محاذاة
related: attr-lang, bdi, bdo, html, attr-style
---

## intro

الـ `dir` بتحدد **اتجاه قراءة النص**. العربي بيتكتب من **اليمين لليسار (rtl)**، والإنجليزي من **اليسار لليمين (ltr)**. لو الصفحة عربية ومحطّتش `dir="rtl"`، هتلاقي الأرقام والنقط وعلامات الترقيم في أماكن غلط، والفقرات متحاذية للشمال.

القيم التلاتة: **`rtl`** و**`ltr`** و**`auto`** (المتصفح يحدّد الاتجاه من أول حرف قوي في النص: ممتاز لحقول إدخال المستخدم اللي ممكن يكتب فيها بأي لغة). بتحطها على `<html>` للصفحة كلها: `<html lang="ar" dir="rtl">`، وبتغيّرها على أي جزء بلغة مختلفة. تأثيرها مش بس على النص: بتقلب **ترتيب عناصر الـ flex والـ grid، وحدود الجداول، وأماكن الـ scrollbar**. وفي CSS فيه خاصية `direction` لكن **الأفضل تحط `dir` في HTML** لأنها جزء من المعنى (مش مجرد شكل).

> [!key] صفحة عربية = `<html lang="ar" dir="rtl">`. وأي مقطع كود أو إنجليزي جواها: `dir="ltr"` على العنصر ده.

## try

```html
<p dir="rtl">هذا نص عربي (123) يتحاذى لليمين.</p>
<p dir="ltr">This is English text (123) aligned left.</p>
```

## syntax

```html nolive
<element dir="rtl | ltr | auto">المحتوى</element>
```

- `rtl` — **من اليمين لليسار**.
- `ltr` — **من اليسار لليمين**.
- `auto` — **المتصفح يختار** حسب أول حرف قوي.

## use

- على `<html>` لصفحة عربية: `dir="rtl"`.
- مقاطع كود إنجليزي جوه صفحة عربية: `dir="ltr"`.
- حقول إدخال المستخدم: `dir="auto"`.
- قلب اتجاه مكوّن كامل (قائمة، جدول).

## avoid

- متعتمدش على CSS `direction` وحده: حط `dir` في HTML.
- متحطش `dir="rtl"` على نص إنجليزي طويل من غير داعي.

## section: القيم

- `rtl`: كتابة من اليمين لليسار (عربي، عبري، فارسي، أوردو).
- `ltr`: من اليسار لليمين (الافتراضي).
- `auto`: يتحدد من محتوى العنصر نفسه.

## examples

### 1) صفحة عربية صح
html مع dir.

```html nolive
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head><meta charset="UTF-8"><title>صفحة</title></head>
  <body><p>كل حاجة هتتحاذى لليمين</p></body>
</html>
```

- `dir="rtl"` على `<html>` بتورّث لكل الصفحة.
- محاذاة النص لليمين تلقائياً.
- ترتيب الأعمدة في الجداول بيتعكس.

### 2) كود إنجليزي جوه نص عربي
مثال على dir=ltr.

```html
<p dir="rtl">اكتب الأمر ده: <code dir="ltr">npm install express</code> في التيرمنال.</p>
```

- `<code>` بـ `dir="ltr"` يتعرض بالترتيب الصح.
- من غيرها ممكن الأوامر تتلخبط والشرطات تتحرك.
- استخدمها دايماً مع الكود.

### 3) الاتجاه التلقائي لحقل إدخال
مثال على dir=auto.

```html
<input dir="auto" placeholder="اكتب بالعربي أو English" style="width:100%; padding:8px">
```

- لو كتبت عربي يتحاذى لليمين، ولو English لليسار.
- ممتاز للتعليقات والبحث متعدد اللغات.
- بيتأثر بأول حرف قوي في المحتوى.

### 4) تأثير الاتجاه على flex
ترتيب العناصر.

```html
<style> .row { display:flex; gap:6px } .row span { background:#bae6fd; padding:6px 12px } </style>
<div class="row" dir="rtl"><span>1</span><span>2</span><span>3</span></div>
<div class="row" dir="ltr"><span>1</span><span>2</span><span>3</span></div>
```

- في `rtl` العنصر الأول على اليمين.
- الـ flex بيتبع الاتجاه من غير ما تغيّر الكود.
- استخدم خصائص منطقية (`margin-inline-start`) بدل left/right.

### 5) عزل نص بـ bdi
bdi بيتجاهل الاتجاه المحيط.

```html
<ul dir="rtl">
  <li>المستخدم: <bdi>Ahmed</bdi> — 10 نقاط</li>
  <li>المستخدم: <bdi>أحمد</bdi> — 12 نقطة</li>
</ul>
```

- `<bdi>` بيعزل اسم المستخدم عن اتجاه الجملة.
- بيمنع الأرقام والشرطات تتنقل لمكان غلط.
- مفيد لأي بيانات جاية من المستخدمين.

## mistakes

### نسيان dir في صفحة عربية
```html bad
<html lang="ar">
<body><p>(مثال) 123</p></body></html>
```
```html good
<html lang="ar" dir="rtl">
<body><p>(مثال) 123</p></body></html>
```
ليه؟ من غير `dir="rtl"` علامات الترقيم والأرقام بتظهر في أماكن غلط والمحاذاة للشمال.

### قيمة غير صحيحة
```html bad
<p dir="right">نص</p>
```
```html good
<p dir="rtl">نص</p>
```
ليه؟ القيم الصحيحة: `rtl` و`ltr` و`auto` فقط.

## a11y

- اتجاه صح بيخلّي قارئ الشاشة يقرا الجمل المختلطة بالترتيب المفهوم.
- استخدم `dir="auto"` لمدخلات المستخدم المتعددة اللغات.
- اتأكد إن الأيقونات الاتجاهية (أسهم) بتتعكس في `rtl`.

## quiz

### أي قيمة للعربي؟
- [x] `rtl`
- [ ] `ltr`
- [ ] `center`
- [ ] `right`
من اليمين لليسار.

### إيه بيعمله `dir="auto"`؟
- [x] يحدد الاتجاه من محتوى النص
- [ ] يقلب الصفحة
- [ ] يخفي النص
- [ ] يغيّر اللغة
مناسب للمدخلات.

### الأفضل: `dir` ولا `direction` في CSS؟
- [x] `dir` في HTML
- [ ] `direction` فقط
- [ ] الاتنين سواء
- [ ] مفيش فرق
الاتجاه جزء من المعنى.

## refs

- [MDN: dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir)
- [W3C: Structural markup and right-to-left text](https://www.w3.org/International/questions/qa-html-dir)
