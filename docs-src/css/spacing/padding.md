---
id: padding
kind: property
cat: spacing
chip: padding
title: المسافة الداخلية (padding)
en: CSS padding property
status: stable
support: all
mdn: padding
summary: بتحدد المسافة الفاضية اللي بين محتوى العنصر والحد بتاعه من جوه، يعني بتدّي المحتوى مساحة يتنفس فيها.
keywords: حشو, بادينج, مسافة داخلية, padding, spacing, inner space, box model, تباعد
related: margin, border, box-sizing, box-model, padding-top, margin-inline
---

## intro

الخاصية `padding` (يعني **المسافة الداخلية**) هي المسافة الفاضية اللي بتتحط **جوه** العنصر، بين المحتوى بتاعه (الكلام أو الصورة) وبين الـ border بتاعه. لو العنصر زرار، فالـ padding هو اللي بيخلّي الكلمة مش لازقة في أطراف الزرار. ومن غير padding بتلاقي أي صندوق فيه نص شكله مخنوق وصعب يتقري.

عشان تفهمها صح لازم تعرف إن أي عنصر في الصفحة المتصفح بيعامله على إنه **صندوق** من أربع طبقات من جوه لبرّه: المحتوى، بعدين الـ padding، بعدين الحد، بعدين الـ margin. الـ padding هو الطبقة التانية، وهو **بياخد لون الخلفية** بتاعة العنصر (`background`). ده الفرق الأساسي بينه وبين `margin` اللي دايماً شفاف ومبيتلونش. تفاصيل الصندوق كله في [[box-model|دليل الـ Box Model]].

الـ padding بيكبّر مساحة العنصر الكلية. لو عملت `width: 200px` وحطيت `padding: 20px` فالعنصر هيبقى عرضه الفعلي 240px، لأن الـ padding بيتضاف من الشمال واليمين (20 + 20). ده بيلخبط المبتدئين كتير، وعشان كده معظم المشاريع بتحط `box-sizing: border-box` عشان الـ padding يدخل جوه العرض اللي حددته. اتعرّف عليها في [[box-sizing]].

> [!analogy] تخيّل إنك حاطط هدية في علبة. **المحتوى** هو الهدية نفسها، و**الـ padding** هو الفلين أو الورق المفروم اللي حواليها جوه العلبة عشان متتخبطش، و**الحد** هو جدار العلبة الكرتون، و**الـ margin** هو المسافة بين العلبة والعلب التانية على الرف.

> [!key] `padding` = مسافة **جوه** العنصر وبياخد لون خلفيته. أما `margin` فمسافة **برّه** العنصر وشفافة.

## try

غيّر قيمة `padding` من 4px لـ 40px وشوف الكلمة بتبعد عن الحدود إزاي، ولاحظ إن لون الخلفية بيملا المساحة الجديدة كلها.

```html
<style>
  .btn {
    background: #c9772f;
    color: #fff8ec;
    border: 3px solid #7a4a1d;
    padding: 20px;
    display: inline-block;
    font-size: 18px;
  }
</style>
<span class="btn">اشترك دلوقتي</span>
```

## syntax

```css nolive
/* قيمة واحدة: الأربع جهات */
padding: 16px;
/* قيمتين: فوق وتحت | يمين وشمال */
padding: 10px 24px;
/* تلات قيم: فوق | يمين وشمال | تحت */
padding: 10px 24px 6px;
/* أربع قيم: فوق | يمين | تحت | شمال (عقارب الساعة) */
padding: 10px 24px 6px 12px;
```

- **قيمة واحدة** — نفس المسافة على الجهات الأربع.
- **قيمتين** — الأولى للفوق والتحت، والتانية لليمين والشمال.
- **تلات قيم** — الأولى فوق، التانية يمين وشمال مع بعض، التالتة تحت.
- **أربع قيم** — بتمشي مع عقارب الساعة: فوق، يمين، تحت، شمال. فكّرها بكلمة **«ف-ي-ت-ش»**.
- الخاصية دي **اختصار (Shorthand)** لأربع خصائص: `padding-top` و `padding-right` و `padding-bottom` و `padding-left`.

## values

القيم المسموحة هي أطوال أو نسب، **ومفيش قيم سالبة** خالص.

### `<length>`
طول بأي وحدة زي `px` أو `em` أو `rem`. أشهر اختيار للـ padding الثابت، والأفضل `rem` أو `em` عشان الـ padding يكبر مع حجم الخط. مثال: `padding: 1rem`. شوف [[dt-length]].

### `<percentage>`
نسبة مئوية، **وبتتحسب من عرض الأب (الحاوية)** حتى لو كنت بتحدد الـ padding من فوق أو تحت. يعني `padding-top: 10%` معناها 10% من **عرض** الأب مش ارتفاعه. ده بيستخدم في حيلة الـ aspect-ratio القديمة.

### `0`
من غير وحدة. بتلغي الـ padding خالص، وهي المبدئية لمعظم العناصر. كتير من العناصر (زي `<ul>` و `<body>`) المتصفح بيحط ليها padding أو margin مبدئي.

### `calc()` و `clamp()`
تقدر تحسب القيمة: `padding: clamp(12px, 3vw, 32px)` يعني padding بيكبر مع الشاشة بس مش أقل من 12px ولا أكتر من 32px. شوف [[fn-clamp]].

### `inherit` / `initial` / `unset`
الكلمات العامة. `inherit` بتاخد padding الأب، و `initial` بترجع للقيمة المبدئية وهي 0.

## use

- تدّي النص مساحة جوه الأزرار والكروت والصناديق عشان يبقى مريح للعين.
- لما تعوز الخلفية أو الحد يبقى حوالين المحتوى بمسافة، مش لازق فيه.
- لتكبير منطقة الضغط للأزرار والروابط (Tap Target) على الموبايل، وده بيحسّن الاستخدام.
- في الحاويات الرئيسية (`<section>` و `<main>`) عشان المحتوى ميلزقش في حافة الشاشة.

## avoid

- متستخدمش `padding` لما تعوز مسافة **بين** عنصرين، ده شغل `margin` أو `gap`.
- متحطش padding على عنصر عايزه يبقى بالظبط بعرض معين من غير ما تحط `box-sizing: border-box`، وإلا العرض هيكبر عن اللي حسبته.
- متستخدمش قيم سالبة، لأن `padding` مبيقبلهاش والقاعدة كلها هتتجاهل.
- لو بتحتاج توسّط محتوى جوه صندوق، `display: flex` مع `justify-content` و `align-items` أنضف من padding بقيم يدوي.

## examples

### 1) padding من غير ولا padding: الفرق قدامك
لازم تشوف الفرق بعينك. الصندوق الأول من غير `padding` فالكلمة لازقة في الحد، والتاني بـpadding 20px فالكلمة بتتنفس. لاحظ إن لون الخلفية بيملا الـ padding كمان.

```html
<style>
  div { border: 2px solid #7a4a1d; background: #e9c98f; margin-bottom: 10px; }
  .b { padding: 20px; }
</style>
<div>من غير padding</div>
<div class="b">بـpadding 20px</div>
```

- `.b { padding: 20px }` بيحط 20px على الجهات الأربع.
- الصندوق الأول شكله ضيّق لأن المحتوى لازق في الحد.

### 2) padding مختلف لكل اتجاه
بنستخدم قيمتين: الأولى للفوق والتحت (8px) والتانية لليمين والشمال (30px). ده الشكل الكلاسيكي للزرار: عريض أكتر من ما هو طويل.

```html
<style>
  .pill {
    display: inline-block;
    background: #3d7a5a;
    color: #f3ede0;
    padding: 8px 30px;
    border-radius: 30px;
  }
</style>
<span class="pill">زرار عريض</span>
```

- `padding: 8px 30px` = فوق وتحت 8px، يمين وشمال 30px.
- جرّب تحط `padding: 30px 8px` وشوف الشكل بيتقلب.

### 3) الأربع قيم: ترتيب عقارب الساعة
هنا كل جهة ليها قيمة مختلفة عشان تشوف الترتيب: فوق 5، يمين 40، تحت 20، شمال 10. الكلمة هتتحرك جوه الصندوق.

```html
<style>
  .box {
    border: 3px dashed #7a4a1d;
    background: #efe0bd;
    display: inline-block;
    padding: 5px 40px 20px 10px;
  }
</style>
<div class="box">أربع قيم</div>
```

- الترتيب: **فوق، يمين، تحت، شمال** (مع عقارب الساعة).
- ملحوظة: في صفحة بالعربي (RTL) اليمين بيبقى بداية السطر، بس `padding-right` لسه يعني اليمين الفعلي. لو عايز "بداية ونهاية" استخدم [[padding-inline-start]].

### 4) الـ padding بيكبّر العنصر: مشكلة العرض
نفس العرض 200px، بس الصندوق التاني فيه `padding: 30px` فبقى أعرض من الأول (260px). الحل في الصندوق التالت: `box-sizing: border-box` بيدخل الـ padding جوه الـ 200px.

```html
<style>
  div { width: 200px; background: #d8b878; margin-bottom: 8px; border: 2px solid #7a4a1d; }
  .p { padding: 30px; }
  .fix { padding: 30px; box-sizing: border-box; }
</style>
<div>عادي 200</div>
<div class="p">padding: بقى أعرض</div>
<div class="fix">border-box: مظبوط</div>
```

- الصندوق التاني: 200 + 30 + 30 + حدود = أكبر.
- الصندوق التالت نفس العرض الأصلي لأن المتصفح بيطرح الـ padding من جوه.

### 5) padding بالنسبة المئوية
النسبة بتتحسب من **عرض الأب**، حتى للفوق والتحت. هنا الأب عرضه 300px والـ padding 10%، يعني 30px على كل الجهات.

```html
<style>
  .parent { width: 300px; border: 2px solid #7a4a1d; }
  .child { background: #bcd4a8; padding: 10%; }
</style>
<div class="parent"><div class="child">10% من عرض الأب</div></div>
```

- 10% من 300px = 30px، حتى للفوق والتحت.
- لو غيّرت عرض `.parent` الـ padding هيتغيّر تلقائي.

### 6) كارت حقيقي: padding متدرّج بحسب المحتوى
مثال عملي: كارت منتج فيه padding خارجي للكارت ككل و padding أصغر للشريط اللي فوق. الـ padding بـ `rem` عشان يتناسب مع حجم الخط لو المستخدم كبّره.

```html
<style>
  .card { max-width: 260px; border: 2px solid #7a4a1d; border-radius: 12px; background: #f3e6c9; overflow: hidden; }
  .tag { background: #b5551f; color: #fff3e0; padding: .4rem 1rem; font-size: .85rem; }
  .body { padding: 1rem 1.25rem 1.5rem; }
  .body h3 { margin: 0 0 .5rem; }
  .body p { margin: 0; }
</style>
<div class="card">
  <div class="tag">جديد</div>
  <div class="body">
    <h3>كورس CSS</h3>
    <p>اتعلّم تنسّق صفحاتك من الصفر.</p>
  </div>
</div>
```

- `.tag` padding صغير (0.4rem فوق وتحت)، و `.body` padding أوسع.
- استخدمنا `rem` علشان الـ padding يكبر لو المستخدم كبّر الخط.

## mistakes

### نسيان إن الـ padding بيتجمّع مع العرض

```css bad
.sidebar {
  width: 100%;
  padding: 20px;
}
```

```css good
.sidebar {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
```

العرض 100% + padding 40px معناه إن العنصر هيطلع برّه الأب ويعمل scroll أفقي. بـ `box-sizing: border-box` الـ padding بيدخل جوه الـ 100%.

### استخدام الـ padding بدل الـ margin بين العناصر

```css bad
.card + .card {
  padding-top: 30px; /* عايز مسافة بين الكروت */
}
```

```css good
.card + .card {
  margin-top: 30px;
}
```

الـ padding بيكبّر الكارت الثاني نفسه ويلوّن المسافة بلون خلفيته، أما المسافة **بين** الكروت فمكانها `margin`. القاعدة: جوه العنصر = `padding`، بينه وبين غيره = `margin`.

### قيمة سالبة

```css bad
.box {
  padding: -10px;
}
```

```css good
.box {
  padding: 0;
  margin-top: -10px; /* لو فعلاً محتاج تسحبه لفوق */
}
```

الـ padding مبيقبلش قيم سالبة والمتصفح بيتجاهل القاعدة كلها. لو عايز تقرّب العناصر أو تسحبها استخدم `margin` سالب (بحذر).

## a11y

- padding الأزرار والروابط بيكبّر منطقة الضغط، والمفروض تبقى 44×44 بكسل على الأقل للموبايل علشان الناس اللي إيديها مش ثابتة.
- بلاش تحط padding بالبكسل بس: استخدم `rem` أو `em` علشان لو المستخدم كبّر الخط من إعدادات المتصفح الـ padding يتناسب معاه.

## quiz

### أي من القيم دي هي ترتيب الأربع جهات في `padding: 10px 20px 30px 40px`؟
- [ ] فوق، تحت، يمين، شمال
- [x] فوق، يمين، تحت، شمال
- [ ] شمال، فوق، يمين، تحت
- [ ] يمين، شمال، فوق، تحت

الترتيب مع عقارب الساعة: **فوق (10)، يمين (20)، تحت (30)، شمال (40)**.

### إيه الفرق الأساسي بين `padding` و `margin`؟
- [ ] مفيش فرق، الاتنين نفس الشيء
- [x] الـ padding جوه الحد وبياخد لون الخلفية، والـ margin برّه الحد وشفاف
- [ ] الـ padding للنص بس والـ margin للصور بس
- [ ] الـ margin بيتجاهل الألوان والـ padding لأ

الـ padding **داخل** العنصر ويتلوّن بخلفيته، أما الـ margin فمسافة **خارجية** ومفيهاش لون.

### العنصر ده عرضه `200px` والـ `padding` بتاعه `20px` من اليمين والشمال ومفيش حدود ولا `box-sizing`. عرضه الفعلي هيبقى كام؟
- [ ] 200px
- [ ] 220px
- [x] 240px
- [ ] 160px

من غير `box-sizing: border-box` العرض بيبقى للمحتوى بس، فالنتيجة 200 + 20 + 20 = **240px**.

### إيه اللي هيحصل لو كتبت `padding: -5px`؟
- [ ] العنصر هيصغر 5px
- [ ] هيتحط padding 5px عادي
- [x] المتصفح هيتجاهل القاعدة لأن القيم السالبة مرفوضة
- [ ] هيحصل error في الصفحة كلها

القيم السالبة غير مسموحة في `padding`، فالمتصفح ببساطة بيرمي القاعدة دي ويكمّل.

## refs

- [MDN: padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
- [MDN: box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
