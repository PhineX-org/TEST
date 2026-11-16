---
id: font-style
kind: property
cat: typography
chip: font-style
title: نمط الخط (مائل)
en: CSS font-style property
status: stable
support: all
mdn: font-style
summary: font-style بتحدد إذا كان النص عادي (normal) أو مائل (italic/oblique). مفيش «مائل» حقيقي في العربي فاستخدمه بحذر.
keywords: font-style, italic, oblique, مائل, em, خط مائل
related: font-weight, font-family, font, text-decoration
---

## intro

الخاصية `font-style` بتحدد **إذا كان النص عادي أو مائل**. القيم: **`normal`** (الافتراضي)، **`italic`** (استخدام النسخة المائلة المصممة خصيصاً في الخط)، **`oblique`** (إمالة الحروف العادية ميكانيكياً، وممكن تحدد زاوية `oblique 10deg`).

وسوم HTML زي `<em>` و`<i>` و`<cite>` بتطلع مائلة افتراضياً بسبب الخاصية دي.

**ملحوظة مهمة للعربي**: الحروف العربية **مفيهاش مائل حقيقي** في التقاليد الطباعية، والإمالة الآلية للعربي بتطلع **شكلها مش جميل ويصعب قراءتها**. فاستخدم المائل في **الكلمات الإنجليزية** داخل النص، وللتأكيد في العربي استخدم [[font-weight]] أو لون مختلف بدل الإمالة.

لو عايز تلغي إمالة `<em>` اكتب `font-style: normal`.

## try

```html
<style>
  p { margin:3px 0; color:#3d2c18; font-size:1.2rem; }
</style>
<p style="font-style:normal">normal — عادي</p>
<p style="font-style:italic">italic — Hello مائل</p>
<p style="font-style:oblique 12deg">oblique — Hello بزاوية</p>
```

## syntax

```css nolive
font-style: normal;
font-style: italic;
font-style: oblique;
font-style: oblique 12deg;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
عادي.

### italic
النسخة المائلة المصممة.

### oblique
إمالة ميكانيكية (ويقبل زاوية).

## use

- كلمات إنجليزية/مصطلحات مائلة.
- اقتباسات.
- أسماء كتب وأفلام بالإنجليزي.

## avoid

- إمالة نصوص عربية طويلة.
- مائل على فقرات كاملة.

## examples

### 1) italic
للكلمات الإنجليزية.

```html
<style>
  p { color:#3d2c18; font-size:1.2rem; }
</style>
<p>مصطلح <span style="font-style:italic">Responsive Design</span> معناه تصميم متجاوب</p>
```



### 2) إلغاء em
em مائلة افتراضياً.

```html
<style>
  p { color:#3d2c18; font-size:1.2rem; margin:3px 0; }
  .n em { font-style:normal; color:#b5551f; font-weight:bold; }
</style>
<p><em>Emphasis</em> افتراضي مائل</p><p class="n"><em>مهم</em> بدون إمالة وبلون</p>
```



### 3) oblique بزاوية
زاوية مخصصة.

```html
<style>
  p { color:#3d2c18; font-size:1.3rem; margin:3px 0; }
</style>
<p style="font-style:oblique 5deg">Slight</p><p style="font-style:oblique 20deg">Strong</p>
```



### 4) تأكيد بديل
لون وسُمك بدل الميلان.

```html
<style>
  .k { color:#b5551f; font-weight:700; }
</style>
<p style="color:#3d2c18;font-size:1.2rem">النقطة <span class="k">المهمة</span> دي لازم تتذكرها</p>
```



## mistakes

### مائل لفقرة عربية

```css bad
p { font-style:italic; }
```

```css good
p { font-style:normal; }
.term { font-style:italic; }
```

المائل للعربي مش مقروء كويس.

### استخدام i للأيقونات

```css bad
<i class="icon"></i>  /* الوسم i معناه مائل */
```

```css good
<span class="icon" aria-hidden="true"></span>
```

i للنص المائل فقط.

## quiz

### italic وoblique الفرق؟
- [ ] مفيش
- [x] italic نسخة مصممة وoblique إمالة آلية
- [ ] oblique أحلى
- [ ] italic للعربي فقط

تصميم مقابل ميكانيكي.

### الافتراضي؟
- [ ] italic
- [x] normal
- [ ] oblique
- [ ] bold

normal.

### لإلغاء ميلان em؟
- [x] font-style:normal
- [ ] font-weight:normal
- [ ] display:none
- [ ] text-decoration:none

normal.

## refs

- [MDN: font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
