---
id: line-height
kind: property
cat: typography
chip: line-height
title: ارتفاع السطر
en: CSS line-height property
status: stable
support: all
mdn: line-height
summary: line-height بتحدد المسافة الرأسية بين السطور. الرقم بدون وحدة (زي 1.6) هو الأفضل، وبيحسّن القراءة جداً خاصة في العربي.
keywords: line-height, ارتفاع السطر, مسافة بين السطور, 1.6, قراءة, leading
related: font-size, font, letter-spacing, margin, text-align
---

## intro

الخاصية `line-height` بتحدد **ارتفاع صندوق السطر** يعني المسافة الرأسية بين سطر والسطر اللي بعده. هي من أكتر الخصائص تأثيراً على **راحة القراءة**: سطور متزحمة بتتعب العين، وسطور واسعة أوي بتفكّك الفقرة.

أحسن طريقة للكتابة هي **رقم بدون وحدة**: `line-height: 1.6`. معناها «١.٦ ضعف حجم خط العنصر نفسه»، وبتتوارث **كنسبة** فكل عنصر بيحسبها على حجم خطه هو. أما لو كتبت `1.6em` أو `160%` فالمتصفح بيحسب **القيمة النهائية** عند الأب ويورّثها كرقم ثابت، وده ممكن يعمل أسطر متداخلة لو الابن خطه أكبر.

قيم مناسبة: للنص الأساسي **1.5 – 1.8** (والعربي بيحب مسافة أوسع شوية بسبب التشكيل والنقاط أعلى وأسفل الحروف)، وللعناوين **1.2 – 1.3**. القيمة `normal` بتخلّي المتصفح يحدد (حوالي 1.2).

> [!analogy] `line-height` زي مسافة بين خطوط كراسة المدرسة: ضيقة أوي مش هتعرف تكتب بوضوح، ووسيعة أوي هتفضل الورقة فاضية.

وتقدر تستخدمها في توسيط نص رأسياً داخل عنصر بجعل `line-height` مساوية للارتفاع (لسطر واحد).

## try

```html
<style>
  p { margin:0 0 6px; color:#3d2c18; background:#efe0bd; padding:6px 10px; }
</style>
<p style="line-height:1.1">سطر أول طويل شوية عشان يلف<br>وسطر تاني قريب جداً من الأول</p>
<p style="line-height:2">سطر أول طويل شوية عشان يلف<br>وسطر تاني بعيد عن الأول</p>
```

## syntax

```css nolive
line-height: 1.6;
line-height: normal;
line-height: 24px;
line-height: 150%;
```

- **القيمة المبدئية**: `normal` (~1.2).
- **بتتوارث؟** أيوه.
- **الأفضل**: رقم بدون وحدة.

## values

### `<number>`
مضاعف لحجم الخط (الأفضل).

### `<length>`
قيمة ثابتة مثل 24px.

### `<percentage>`
نسبة من حجم الخط (تتوارث كقيمة نهائية).

### normal
الافتراضي.

## use

- 1.5–1.8 للنص الأساسي.
- 1.2–1.3 للعناوين.
- توسيط نص سطر واحد رأسياً.

## avoid

- وحدات em أو % مع الوراثة.
- سطور متزحمة بـ 1 أو أقل.

## examples

### 1) مقارنة قيم
1.1 مقابل 1.6 مقابل 2.2.

```html
<style>
  p { margin:0 0 6px; color:#3d2c18; background:#efe0bd; padding:6px 10px; font-size:.95rem; }
</style>
<p style="line-height:1.1">ضيق: سطر أول<br>سطر تاني</p><p style="line-height:1.6">مريح: سطر أول<br>سطر تاني</p><p style="line-height:2.2">واسع: سطر أول<br>سطر تاني</p>
```



### 2) رقم مقابل em
الرقم يتوارث كنسبة.

```html
<style>
  .a { line-height:1.6; } .b { line-height:1.6em; }
  .a, .b { background:#efe0bd; color:#3d2c18; padding:6px; margin:4px 0; }
  .a small, .b small { font-size:1.6rem; }
</style>
<div class="a">رقم <small>كبير</small></div><div class="b">em <small>كبير</small></div>
```



### 3) توسيط رأسي
line-height = الارتفاع.

```html
<style>
  .btn { height:48px; line-height:48px; text-align:center; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; }
</style>
<div class="btn">زرار متوسّط</div>
```



### 4) عنوان مقابل فقرة
العنوان أضيق.

```html
<style>
  h4 { line-height:1.2; margin:0 0 6px; color:#7a4a1d; font-size:1.4rem; }
  p { line-height:1.8; margin:0; color:#3d2c18; }
</style>
<h4>عنوان طويل يلف على سطرين لو ضاق المكان</h4><p>فقرة بمسافة مريحة بين الأسطر عشان القراءة تبقى سهلة وسلسة للعين.</p>
```



## mistakes

### وحدة مع وراثة

```css bad
body { line-height:1.6em; }  /* القيمة تتحسب مرة وتتوارث ثابتة */
```

```css good
body { line-height:1.6; }
```

الرقم يتحسب على كل عنصر بحجم خطه.

### سطور متزحمة

```css bad
p { line-height:1; }
```

```css good
p { line-height:1.6; }
```

التزاحم بيتعب العين.

## quiz

### أفضل صيغة لـ line-height؟
- [x] رقم بدون وحدة
- [ ] px
- [ ] em
- [ ] %

بتتوارث كنسبة.

### قيمة مناسبة للنص الأساسي؟
- [ ] 0.8
- [x] 1.5 – 1.8
- [ ] 3
- [ ] 0

مريحة للقراءة.

### line-height بتأثر على؟
- [x] المسافة الرأسية بين السطور
- [ ] العرض
- [ ] اللون
- [ ] الحد

ارتفاع السطر.

## refs

- [MDN: line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
