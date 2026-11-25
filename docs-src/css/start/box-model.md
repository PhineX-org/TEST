---
id: box-model
kind: guide
cat: start
title: الـ Box Model: كل عنصر صندوق
en: CSS box model
status: stable
summary: كل عنصر في الصفحة عبارة عن صندوق من أربع طبقات: المحتوى، الـ padding، الـ border، الـ margin. فهمها هو مفتاح التحكم في المسافات والأحجام.
keywords: box model, صندوق, margin, padding, border, content, مسافات, حشو, هامش, حجم العنصر, box-sizing, عرض حقيقي
related: padding, margin, border, box-sizing, width, height
---

## intro

أول حاجة لازم تعرفها في CSS: **كل عنصر في الصفحة هو صندوق مستطيل**، حتى لو شكله دايرة أو نص عادي. والصندوق ده له **أربع طبقات** من جوه لبرّه:

1. **المحتوى (Content)**: النص أو الصورة نفسها، وحجمها بتتحكم فيه [[width]] و[[height]].
2. **الـ padding (المسافة الداخلية)**: مسافة **جوه** الصندوق بين المحتوى والحد ([[padding]]). بياخد لون الخلفية.
3. **الـ border**: الإطار اللي حوالين الـ padding ([[border]]).
4. **الـ margin (المسافة الخارجية)**: مسافة **برّه** الصندوق بتفصله عن الجيران ([[margin]]). شفافة دايماً.

> [!analogy] تخيّل لوحة متعلقة على الحيطة: الصورة نفسها = المحتوى، الكرتون اللي حواليها = padding، الإطار الخشب = border، والمسافة بين اللوحة واللي جنبها = margin.

بس فيه فخ بيلخبط كل المبتدئين: لو كتبت `width: 200px` و`padding: 20px`، العرض الفعلي اللي بيحتله الصندوق هيبقى 240px مش 200! علشان الـ `width` بيحدد **المحتوى بس**. الحل المحترف إنك تكتب في أول ملفك `*, *::before, *::after { box-sizing: border-box }` ([[box-sizing]])، فيبقى الـ `width` شامل الـ padding والحد، وتحسب بسهولة.

والـ margins الرأسية (فوق وتحت) ساعات **بتتدمج**: لو فيه عنصرين فوق بعض، الأول `margin-bottom: 30px` والتاني `margin-top: 20px`، المسافة بينهم 30px مش 50 (**Margin Collapsing**).

## try

```html
<style>
  .box { width:200px; padding:20px; border:6px solid #7a4a1d; margin:20px auto;
         background:#efe0bd; color:#3d2c18; }
</style>
<div class="box">محتوى الصندوق</div>
```

## examples

### 1) الطبقات الأربعة
كل طبقة بلون: المحتوى أخضر، الـ padding كريمي، الحد بني، والـ margin (بنقط) بره.

```html
<style>
  .wrap { outline:2px dashed #c9772f; display:inline-block; }
  .b { margin:24px; border:8px solid #7a4a1d; padding:20px; background:#efe0bd; color:#3d2c18; }
  .c { background:#bcd4a8; padding:8px 14px; }
</style>
<div class="wrap"><div class="b"><div class="c">المحتوى</div></div></div>
```

- الحد البني فاصل بين الـ padding والـ margin.
- الـ margin بره الحد وملوش لون.

### 2) فخ العرض: content-box
العرض 200px والـ padding 20px والحد 5px يبقى المجموع 250px (المحتوى 200 + 40 + 10).

```html
<style>
  .a { width:200px; padding:20px; border:5px solid #7a4a1d; background:#efe0bd;
       color:#3d2c18; box-sizing:content-box; }
  .ruler { width:200px; height:8px; background:#3d7a5a; margin-bottom:6px; }
</style>
<div class="ruler"></div><div class="a">أوسع من الـ 200px</div>
```

- الشريط الأخضر = 200px بالظبط.
- الصندوق طلع أعرض منه.

### 3) الحل: border-box
نفس الأرقام لكن `box-sizing: border-box` فالصندوق كله 200px.

```html
<style>
  .a { width:200px; padding:20px; border:5px solid #7a4a1d; background:#efe0bd;
       color:#3d2c18; box-sizing:border-box; }
  .ruler { width:200px; height:8px; background:#3d7a5a; margin-bottom:6px; }
</style>
<div class="ruler"></div><div class="a">مضبوط على 200px</div>
```

- الـ padding والحد اتحسبوا جوه الـ width.

### 4) تداخل الـ margins
الـ margin بين فقرتين بياخد الأكبر: 30px مش 50px.

```html
<style>
  .x { margin-bottom:30px; background:#bcd4a8; color:#3d2c18; padding:6px; }
  .y { margin-top:20px; background:#efe0bd; color:#3d2c18; padding:6px; }
</style>
<div class="x">الأول (margin-bottom: 30)</div>
<div class="y">التاني (margin-top: 20)</div>
```

- المسافة بينهم 30px.
- ده بيحصل في الاتجاه الرأسي بس.

## mistakes

### نسيان الـ padding في حساب العرض

```css bad
.col { width:50%; padding:20px; }   /* اتنين جنب بعض مش هيكفّوا */
```

```css good
* { box-sizing:border-box; }
.col { width:50%; padding:20px; }
```

من غير `border-box` العمودين هيتخطوا 100% وينزل واحد تحت التاني.

### استخدام margin بدل padding

```css bad
.btn { margin:10px 20px; background:#7a4a1d; }   /* مفيش مساحة في الزرار */
```

```css good
.btn { padding:10px 20px; background:#7a4a1d; }
```

الخلفية بتظهر في الـ padding بس، مش في الـ margin.

## quiz

### أنهي طبقة بتاخد لون الخلفية؟
- [ ] margin
- [x] padding والمحتوى (وبتمتد تحت الحد)
- [ ] border بس
- [ ] مفيش

الخلفية بتغطي المحتوى والـ padding (وتحت الحد).

### width:100px مع padding:10px و content-box. العرض الفعلي؟
- [ ] 100px
- [ ] 110px
- [x] 120px
- [ ] 140px

100 + 10 + 10 = 120px.

### `box-sizing: border-box` معناه؟
- [ ] الحد بيختفي
- [x] الـ width بيشمل الـ padding والحد
- [ ] الـ margin بيتلغي
- [ ] الصندوق بيبقى دايرة

الحجم المحدد هو الحجم النهائي.

## refs

- [MDN: Box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
