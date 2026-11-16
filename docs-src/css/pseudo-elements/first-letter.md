---
id: first-letter
kind: pseudoelement
cat: pseudo-elements
chip: ::first-letter
title: أول حرف
en: CSS ::first-letter pseudo-element
status: stable
support: all
mdn: ::first-letter
summary: العنصر الوهمي first-letter بينسّق أول حرف من النص: تأثير الحرف الاستهلالي الكبير (drop cap) في المقالات.
keywords: ::first-letter, first-letter, drop cap, حرف استهلالي, initial-letter
related: first-line, font-size, float, line-height
---

## intro

`::first-letter` بتنسّق **أول حرف** من أول سطر في عنصر block. الاستخدام الكلاسيكي: **الحرف الاستهلالي الكبير (Drop Cap)** في بداية المقالات والكتب: بتكبّر الحرف وتعمله `float` عشان النص يلتف حواليه.

الخصائص المسموحة: الخط والألوان والخلفية و`float` والهوامش والحشو والحدود و`text-transform` و`line-height`. وفي الحديث `initial-letter` لعمل drop cap بسطر واحد. **للعربي**: الحرف الأول في العربي ممكن يتأثر بالاتصال، فجرّب النتيجة بشكل جيد، وغالباً بتشتغل كويس مع خط مناسب.

ملحوظة: الحروف الأولى زي علامات الترقيم أو الأقواس بتتحسب جزء من `::first-letter` أيضاً. ومقابلها [[first-line]] لأول سطر.

## try

```html
<style>
  p { margin:0; width:260px; color:#3d2c18; line-height:1.8; }
  p::first-letter { float:inline-start; font-size:2.8rem; line-height:.9; color:#b5551f; font-weight:bold; padding-inline-end:6px; }
</style>
<p>في قديم الزمان كان الحرف الأول من المقالة بيتكتب بحجم كبير عشان يلفت العين ويدّي شكل كتب التراث.</p>
```

## syntax

```css nolive
p::first-letter { font-size: 3rem; float: inline-start; }
p::first-letter { initial-letter: 3; }
```

- عناصر block.
- float لعمل drop cap.

## use

- حرف استهلالي كبير.
- تمييز بداية مقال.
- تنسيق صحفي.

## avoid

- تكبير بدون ضبط line-height.
- إهمال الاختبار مع العربي.

## examples

### 1) drop cap
float وحجم كبير.

```html
<style>
  p { margin:0; width:240px; color:#3d2c18; line-height:1.8; }
  p::first-letter { float:inline-start; font-size:2.6rem; line-height:.9; color:#c9772f; font-weight:bold; padding-inline-end:6px; }
</style>
<p>بدأت الحكاية في يوم هادي من أيام الصيف الجميلة وسط الحقول الخضراء الواسعة.</p>
```



### 2) لون فقط
تمييز بسيط.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.2rem; }
  p::first-letter { color:#b5551f; font-weight:bold; font-size:1.6rem; }
</style>
<p>بداية مميزة</p>
```



### 3) إنجليزي
حرف كبير.

```html
<style>
  p { margin:0; width:240px; color:#3d2c18; line-height:1.7; direction:ltr; text-align:left; font-family:Georgia,serif; }
  p::first-letter { float:left; font-size:3rem; line-height:.85; color:#7a4a1d; padding-right:6px; }
</style>
<p>Once upon a time in a land far away there lived a curious young reader.</p>
```



### 4) علامة ترقيم في البداية
القوس بيتحسب مع الحرف.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.1rem; }
  p::first-letter { color:#b5551f; font-size:1.8rem; font-weight:bold; }
</style>
<p>«اقتباس يبدأ بعلامة» وبيتنسق أول حرف معاها</p>
```



## mistakes

### نسيان line-height

```css bad
p::first-letter { font-size:3rem; }  /* بيكبّر السطر */
```

```css good
p::first-letter { font-size:3rem; line-height:.85; float:inline-start; }
```

ضبط الارتفاع.

### توقع تأثير على inline

```css bad
span::first-letter { }  /* inline مبتشتغلش */
```

```css good
p::first-letter { }
```

لازم block.

## quiz

### first-letter بتنسّق؟
- [x] أول حرف
- [ ] أول سطر
- [ ] أول كلمة
- [ ] آخر حرف

أول حرف.

### الاستخدام الكلاسيكي؟
- [x] Drop cap
- [ ] ظل
- [ ] حد
- [ ] أنيميشن

حرف استهلالي.

### بتشتغل على؟
- [x] عناصر block
- [ ] inline فقط
- [ ] صور
- [ ] كل شيء

block.

## refs

- [MDN: ::first-letter](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter)
