---
id: max-width
kind: property
cat: sizing
chip: max-width
title: أقصى عرض
en: CSS max-width property
status: stable
support: all
mdn: max-width
summary: max-width بتحدد أكبر عرض للعنصر. أهم أداة للتصميم المتجاوب: عرض مرن ما يتخطاش حد، مع توسيط وصور مرنة.
keywords: max-width, اقصى عرض, حد اقصى, responsive, متجاوب, ch, توسيط, صور مرنة, container
related: min-width, width, units, responsive-guide, margin
---

## intro

الخاصية `max-width` بتحط **حد أقصى** لعرض العنصر. العنصر ممكن يكون أضيق، لكن **مش هيزيد** عن القيمة دي. وده بيخليها أهم أداة في **التصميم المتجاوب**: بدل `width: 800px` اللي بتعمل scroll أفقي على الموبايل، بتكتب `max-width: 800px`، فالعنصر ياخد 800px على الشاشات الكبيرة ويتأقلم لعرض الأب لو أضيق.

أشهر استخدامات:
- **الحاوية الرئيسية**: `max-width: 1100px; margin-inline: auto;` (وسط وبحد أقصى).
- **الصور المرنة**: `img { max-width: 100%; height: auto }` علشان الصورة ماتزيدش عن الأب.
- **عرض الفقرات المريح**: `max-width: 65ch` بيحدد حوالي 65 حرف في السطر (أنسب للقراءة).

لو القيمتين `width` و`max-width` اتعارضوا، `max-width` بتكسب. و`min-width` بتكسب على `max-width` لو اتعارضوا.

القيمة الافتراضية `none` يعني مفيش حد.

> [!analogy] `max-width` زي «الحمولة القصوى للأسانسير»: ممكن يشيل أقل، بس مش أكتر.

> [!tip] `img { max-width:100%; height:auto; display:block }` أول ما تبدأ مشروع. هتوفّر ساعات.

## try

```html
<style>
  .c { max-width:300px; margin-inline:auto; background:#efe0bd; color:#3d2c18; padding:12px; }
</style>
<div class="c">أقصى عرض 300px وأضيق على الشاشات الضيقة</div>
```

## syntax

```css nolive
max-width: 800px;
max-width: 100%;
max-width: 65ch;
max-width: none;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** لأ.
- بتغلب `width` لو أصغر منها.

## values

### `<length>`
حد أقصى ثابت `800px`.

### `<percentage>`
نسبة من عرض الأب `100%`.

### none
مفيش حد (الافتراضي).

### ch
وحدة عرض الحرف `65ch`: مثالية للنصوص.

## use

- حاوية الصفحة الرئيسية بتوسيط.
- صور مرنة: `max-width:100%`.
- عرض نص مريح بـ `ch`.
- كروت ومودالز بحد أقصى.

## avoid

- استخدام `width` ثابت لحاويات المحتوى.
- نسيان `margin-inline:auto` (العنصر هيلزق في طرف).

## examples

### 1) حاوية مرنة
عرض أقصى 300 والعنصر أضيق من كده لو الأب أضيق.

```html
<style>
  .wrap { width:100%; background:#efe0bd; padding:6px; box-sizing:border-box; }
  .c { max-width:260px; margin-inline:auto; background:#bcd4a8; color:#3d2c18; padding:10px; }
</style>
<div class="wrap"><div class="c">max-width: 260px (متوسّط)</div></div>
```



### 2) صورة مرنة
الصورة الكبيرة بتتحصر جوه الأب.

```html
<style>
  .p { width:200px; background:#efe0bd; padding:4px; }
  .img { max-width:100%; width:400px; height:50px; background:#c9772f; }
</style>
<div class="p"><div class="img"></div></div>
```



### 3) عرض الفقرة بـ ch
فقرة مريحة للقراءة.

```html
<style>
  p { max-width:32ch; line-height:1.9; color:#3d2c18; background:#efe0bd; padding:10px; }
</style>
<p>النص الطويل لو اتمد على عرض الشاشة كله بيتعب العين. نحدد عرض مناسب.</p>
```



### 4) width وmax-width معاً
العرض 100% لكن لا يتخطى 220px.

```html
<style>
  .b { width:100%; max-width:220px; background:#3d7a5a; color:#f3ede0; padding:8px; box-sizing:border-box; }
</style>
<div class="b">100% بحد أقصى</div>
```



## mistakes

### width ثابت بدل max-width

```css bad
.page { width:1000px; }
```

```css good
.page { max-width:1000px; }
```

الأول بيعمل scroll أفقي في الشاشات الأصغر.

### نسيان التوسيط

```css bad
.c { max-width:600px; }  /* هيلزق في طرف */
```

```css good
.c { max-width:600px; margin-inline:auto; }
```

العنصر المحدود بيحتاج هامش auto علشان يتوسّط.

## quiz

### `max-width` بتحط؟
- [ ] حد أدنى
- [x] حد أقصى
- [ ] عرض ثابت
- [ ] ارتفاع

أكبر عرض مسموح.

### أحسن حل لصورة متجاوبة؟
- [ ] width:500px
- [x] max-width:100%
- [ ] height:100%
- [ ] float

بتتحصر في الأب.

### القيمة الافتراضية؟
- [ ] 0
- [ ] auto
- [x] none
- [ ] 100%

none.

## refs

- [MDN: max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)
