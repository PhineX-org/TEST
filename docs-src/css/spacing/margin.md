---
id: margin
kind: property
cat: spacing
chip: margin
title: المسافة الخارجية (margin)
en: CSS margin property
status: stable
support: all
mdn: margin
summary: الـ margin هو المسافة اللي بره حدود العنصر بتفصله عن جيرانه. بتتحكم في التباعد بين العناصر، وبتوسّط العنصر بـ auto، وبتتدمج رأسياً.
keywords: margin, هامش, مسافة خارجية, توسيط, auto, margin collapse, تباعد, spacing, outer space, سالب
related: padding, box-model, border, margin-top, margin-inline, box-sizing
---

## intro

الخاصية `margin` (**المسافة الخارجية**) هي المسافة **برّه** حدود العنصر، اللي بتفصله عن العناصر اللي حواليه. لو تخيّلت كل عنصر صندوق، فالـ margin هو **المساحة اللي حوالين الصندوق** اللي مفيش حاجة تانية تقدر تدخلها (غير لو اتداخلت الـ margins). على عكس `padding` ([[padding]])، الـ margin **شفاف دايماً** ومبياخدش لون الخلفية.

بتكتبه زي الـ padding بالظبط: قيمة واحدة للأربع جهات، أو اتنين (فوق/تحت ثم يمين/شمال)، أو أربعة (فوق، يمين، تحت، شمال، باتجاه عقارب الساعة). والقيمة ممكن تكون **طول** (`20px`, `2rem`) أو **نسبة** (`5%`، دايماً من عرض الأب حتى للـ margins الرأسية) أو **`auto`** أو حتى **قيمة سالبة** (`-10px`) علشان تسحب العنصر أو تخليه يتداخل مع جاره.

أشهر استخدام لـ `margin: auto`: **التوسيط الأفقي** لعنصر block ليه عرض محدد: `width: 600px; margin: 0 auto`. المتصفح بيقسّم المساحة الفاضية يمين وشمال بالتساوي. ([[box-model]]).

فيه حاجتين لازم تفهمهم:
- **Margin Collapsing**: الـ margins **الرأسية** المتجاورة (أخ فوق أخ، أو أب مع أول ابن) **بتتدمج** وبتاخد الأكبر بدل ما تتجمع. فـ 30px و20px بيبقوا 30px مش 50.
- الـ margins **الأفقية** مش بتتدمج أبداً.

> [!analogy] الـ margin زي «المسافة الاجتماعية» بين الناس في الطابور: بتفصلك عن اللي جنبك، ومحدش بياخد منها لون أو شكل. لو اتنين واقفين، المسافة بينهم هي الأكبر مش مجموع الاتنين.

> [!warn] متستخدمش الـ margin علشان تدّي مساحة جوه الزرار؛ ده شغل `padding`. الـ margin لبرّه.

## try

```html
<style>
  .box { background:#c9772f; color:#fff3e0; padding:10px; margin:20px; border:3px solid #7a4a1d; }
  .wrap { background:#efe0bd; outline:2px dashed #7a4a1d; display:inline-block; }
</style>
<div class="wrap"><div class="box">غيّر margin</div></div>
```

## syntax

```css nolive
margin: 16px;                 /* الأربع جهات */
margin: 10px 24px;            /* فوق/تحت | يمين/شمال */
margin: 10px 24px 6px;        /* فوق | يمين/شمال | تحت */
margin: 10px 24px 6px 12px;   /* فوق | يمين | تحت | شمال */
margin: 0 auto;               /* توسيط أفقي */
margin: -8px;                 /* سالب */
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه (animatable).
- الاختصار لـ [[margin-top]] و[[margin-right]] و[[margin-bottom]] و[[margin-left]].

## values

### `<length>`
قيمة بالبكسل أو rem أو em… مثلاً `20px`. هي الأكتر استخداماً.

### `<percentage>`
نسبة من **عرض** الأب (حتى في الـ margins الرأسية). مفيدة في التصميم المرن: `margin: 5%`.

### auto
المتصفح يحسب الـ margin. مع الـ margins الأفقية على block ليه عرض = **توسيط**. وفي flex بيدفع العنصر لآخر الحاوية.

### negative
قيم سالبة زي `-10px` بتسحب العنصر ناحية الجار أو بتخليه يتداخل. استخدمها بحذر.

## use

- توسيط حاوية بعرض محدد: `margin-inline: auto`.
- مسافة بين العناصر في العمود: `margin-bottom: 1rem`.
- في flex: `margin-inline-start: auto` يدفع عنصر لأقصى الطرف.
- تصفير الـ margins الافتراضية للعناوين والفقرات: `margin: 0`.

## avoid

- استخدامه لإعطاء مساحة داخل زرار أو كارت (استخدم `padding`).
- الاعتماد على margins رأسية بين أب وابن (بتتدمج وتلخبط).
- margins سالبة كبيرة بتخلّي العناصر تخرج بره الشاشة.

## examples

### 1) margins بين العناصر
كل صندوق عليه `margin-bottom` فبينهم مسافة. الخطوط المنقطة = حدود الصندوق.

```html
<style>
  .item { background:#efe0bd; color:#3d2c18; padding:10px; margin-bottom:20px; outline:2px dashed #7a4a1d; }
</style>
<div class="item">الأول</div><div class="item">التاني</div><div class="item">التالت</div>
```

- المسافة بين الصناديق = الـ margin.
- الـ margin مش ملوّن.

### 2) التوسيط بـ auto
عنصر ليه `width` محدد و`margin: 0 auto` = في نص الصفحة.

```html
<style>
  .c { width:200px; margin:0 auto; background:#3d7a5a; color:#f3ede0; padding:12px; text-align:center; }
  .p { background:#efe0bd; padding:8px; }
</style>
<div class="p"><div class="c">في النص</div></div>
```

- لازم عرض محدد، وإلا هياخد العرض كله.

### 3) دمج الـ margins الرأسية
30px و20px → المسافة 30px مش 50px.

```html
<style>
  .a { margin-bottom:30px; background:#bcd4a8; color:#3d2c18; padding:8px; }
  .b { margin-top:20px; background:#efe0bd; color:#3d2c18; padding:8px; }
</style>
<div class="a">فوق (margin-bottom: 30)</div><div class="b">تحت (margin-top: 20)</div>
```

- بياخد الأكبر.
- قياس المسافة 30px بالظبط.

### 4) margin سالب
`margin-top: -14px` بيسحب العنصر لفوق فيتداخل مع الجار.

```html
<style>
  .x { background:#efe0bd; color:#3d2c18; padding:12px; }
  .y { background:#c9772f; color:#fff3e0; padding:8px; margin-top:-14px; margin-inline:20px; position:relative; }
</style>
<div class="x">الأول</div><div class="y">اتسحب لفوق</div>
```

- مفيد في تأثيرات التداخل.

## mistakes

### نسيان الوحدة

```css bad
.a { margin:20; }  /* مش هتشتغل */
```

```css good
.a { margin:20px; }
```

أي رقم غير الصفر محتاج وحدة.

### توقع إن الـ margins الرأسية بتتجمع

```css bad
.a { margin-bottom:30px; }
.b { margin-top:20px; }  /* بتتوقع 50 */
```

```css good
.a { margin-bottom:50px; }
/* أو استخدم gap في flex/grid */
```

الـ margins الرأسية المتجاورة بتتدمج وبتاخد الأكبر. لو عايز مسافة محددة استخدم `gap`.

### auto مع عنصر inline

```css bad
span { margin:0 auto; }  /* مفيش توسيط */
```

```css good
span { display:block; width:max-content; margin:0 auto; }
```

التوسيط بـ auto بيحتاج عنصر block له عرض.

## quiz

### `margin: 10px 20px` معناها؟
- [x] 10 فوق وتحت و20 يمين وشمال
- [ ] 10 يمين و20 فوق
- [ ] 10 للكل
- [ ] 20 للكل

اتنين قيم: رأسي ثم أفقي.

### الـ margins الرأسية المتجاورة؟
- [ ] بتتجمع
- [x] بتتدمج وبتاخد الأكبر
- [ ] بتتلغي
- [ ] بتتضاعف

Margin collapsing.

### أنهي بيوسّط عنصر block ليه width؟
- [ ] margin:auto 0
- [x] margin:0 auto
- [ ] padding:auto
- [ ] text-align:auto

الـ margin الأفقي auto.

### الـ margin بياخد لون الخلفية؟
- [ ] أيوه
- [x] لأ، شفاف
- [ ] أحياناً
- [ ] فقط في flex

الـ margin شفاف دايماً.

## refs

- [MDN: margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
- [CSS-Tricks: margin](https://css-tricks.com/almanac/properties/m/margin/)
