---
id: attr-alt
kind: attribute
cat: attrs
chip: alt
title: خاصية النص البديل
en: HTML alt attribute
status: stable
support: all
mdn: Elements/img#alt
summary: خاصية alt بتوصف الصورة بالنص: بيقراه قارئ الشاشة وبيظهر لو الصورة فشلت، وبيفهمه محركات البحث. للصور الزينة اكتب alt فاضي. من أهم خصائص الإتاحة.
keywords: alt, نص بديل, alternative text, قارئ الشاشة, accessibility, img, area, input image, SEO, صورة مكسورة, إتاحة
related: img, area, input-image, attr-src, figure, picture
---

## intro

الخاصية `alt` اختصار **alternative text** (النص البديل). وظيفتها: **تقول بالكلام اللي الصورة بتقوله بالشكل**. أهميتها في تلات حالات: (1) **المستخدم الكفيف** بيستخدم قارئ شاشة بيقرا الـ alt بصوت عالي بدل الصورة. (2) **لو الصورة مش اتحمّلت** (نت بطيء أو مسار غلط) بيظهر النص مكانها. (3) **محركات البحث** بتفهم محتوى الصورة منه، وده بيفيد الـ SEO.

**كيف تكتب alt كويس؟** اوصف **الغرض** مش الشكل بالتفصيل: صورة زرار «بحث» اكتب `alt="بحث"` مش «عدسة مكبّرة زرقا». وبلاش تبدأ بـ «صورة…» أو «لقطة…» (القارئ بيقول إنها صورة تلقائي). وفي نقطة مهمة: لو الصورة **زينة بس** (خط فاصل، خلفية) اكتب **`alt=""` فاضية** (مش تحذفها) عشان قارئ الشاشة يتجاهلها. لو حذفت الخاصية كلها قارئ الشاشة ممكن يقرا اسم الملف (`IMG_2034.jpg`)!

بتتكتب على [[img]] و[[area]] و[[input-image]]، وبتشتغل مع [[attr-src]].

## try

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='60'%3E%3Crect width='90' height='60' fill='%23facc15'/%3E%3C/svg%3E" alt="مستطيل أصفر" width="90" height="60">
<img src="مش-موجودة.png" alt="الصورة دي بتوضح شكل المنتج" style="margin:0 12px">
<p style="color:#64748b">التانية مكسورة فبتشوف الـ alt بدالها.</p>
```

## syntax

```html nolive
<img src="chart.png" alt="رسم بياني: المبيعات زادت 20% في 2026">
<img src="line.png" alt="">
```

- `alt="وصف"` — للصور المعبّرة.
- `alt=""` — **فاضية** للزينة (قارئ الشاشة يتجاهلها).
- من غير `alt` خالص — ❌ خطأ في الإتاحة.

## use

- وصف أي صورة فيها معلومة.
- اسم الوظيفة لصورة جوه رابط أو زرار.
- `alt=""` للصور الزخرفية.
- رسوم بيانية: لخّص الفكرة.

## avoid

- متحذفش `alt` خالص (حتى للزينة: اكتبها فاضية).
- متبدأش بـ "صورة" أو "لقطة" ولا تحط اسم الملف.

## examples

### 1) صورة جوه رابط
alt = وجهة الرابط.

```html
<a href="#home"><img alt="الصفحة الرئيسية" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ctext y='30' font-size='30'%3E🏠%3C/text%3E%3C/svg%3E"></a>
```

- لو الصورة هي الرابط، الـ alt هو اسم الرابط.
- من غيره الرابط من غير اسم لقارئ الشاشة.
- اكتب الوجهة مش وصف الصورة.

### 2) صورة زينة
alt فاضية.

```html
<p>عنوان</p>
<img alt="" role="presentation" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='6'%3E%3Crect width='120' height='6' rx='3' fill='%2339ff14'/%3E%3C/svg%3E">
<p>محتوى</p>
```

- الخط الأخضر زينة فقط.
- `alt=""` بيخلّي القارئ يتخطّاه.
- الأفضل تعمل الزينة بـ CSS.

### 3) رسم بياني
ملخّص للفكرة.

```html
<figure>
  <img alt="أعمدة: HTML 90% وCSS 75% وJS 60% من الدروس خلصت" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='10' y='6' width='24' height='54' fill='%2322c55e'/%3E%3Crect x='46' y='16' width='24' height='44' fill='%2338bdf8'/%3E%3Crect x='82' y='26' width='24' height='34' fill='%23f59e0b'/%3E%3C/svg%3E">
  <figcaption>تقدّم الدروس</figcaption>
</figure>
```

- الـ alt بيلخّص اللي بيقوله الرسم.
- التفاصيل الطويلة في `figcaption` أو جدول.
- الرقم المهم اكتبه.

### 4) قراءة alt
مثال على JS.

```html
<img id="i" alt="شعار بتاع PhineX" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%2339ff14'/%3E%3C/svg%3E">
<script>document.write('<p>الـ alt: ' + i.alt + '</p>')</script>
```

- `img.alt` بيرجّع النص.
- بتقدر تختبر الصفحة: كل `img` ليه alt؟
- أداة سريعة لمراجعة الإتاحة.

## mistakes

### من غير alt
```html bad
<img src="team.jpg">
```
```html good
<img src="team.jpg" alt="فريق PhineX في المكتب">
```
ليه؟ قارئ الشاشة هيقرا اسم الملف أو يتجاهل.

### alt محشو
```html bad
<img src="a.jpg" alt="صورة صورة جميلة صورة شخص بيبتسم IMG_2034">
```
```html good
<img src="a.jpg" alt="أحمد بيبتسم قدام الكاميرا">
```
ليه؟ الوصف مختصر ومعبّر من غير تكرار.

## a11y

- كل `img` لازم يبقى فيه `alt` (حتى لو فاضي).
- اوصف الغرض والمعلومة، مش كل التفاصيل.
- للصور المعقدة ضيف وصف طويل بجانبها.

## quiz

### صورة زينة بس؟
- [x] `alt=""` فاضية
- [ ] من غير alt
- [ ] `alt="زينة"`
- [ ] `alt="image"`
القارئ يتجاهلها.

### هل تبدأ بـ "صورة…"؟
- [x] لأ، القارئ بيعلنها
- [ ] أيوه دايماً
- [ ] أحياناً
- [ ] لازم
تكرار بلا فايدة.

### صورة جوه رابط، الـ alt يكون؟
- [x] وجهة الرابط/وظيفته
- [ ] وصف الألوان
- [ ] اسم الملف
- [ ] فاضي
هو اسم الرابط.

## refs

- [MDN: alt](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#alt)
- [W3C WAI: Images tutorial](https://www.w3.org/WAI/tutorials/images/)
