---
id: block-inline
kind: guide
cat: start
title: عناصر Block و Inline
en: Block-level vs inline elements (display and flow)
status: stable
summary: الفرق بين العناصر اللي بتاخد سطر لوحدها (Block) واللي بتمشي مع الكلام (Inline)، وإزاي inline-block بيجمع الاتنين، وليه width و margin بيتصرفوا بشكل مختلف.
keywords: block, inline, inline-block, display, سطر, عرض, ارتفاع, margin, flow, تدفق, div, span, وين العنصر, الفرق بين div و span
related: nesting-rules, div, span, p, a, img, anatomy, semantic-html
---

## intro

لما تفتح صفحة ويب وتبص على العناصر هتلاحظ إن فيه عناصر **بتاخد سطر لوحدها** من أول الصفحة لآخرها، زي العنوان `<h1>` والفقرة `<p>`. وفيه عناصر **بتمشي مع الكلام** في نفس السطر زي الكلمة المهمة `<strong>` والرابط `<a>`. الفرق ده مش صدفة، ده اسمه **نوع العرض** (Display Type)، وهو اللي بيحدد إزاي العنصر هيتحط في الصفحة.

العناصر في HTML ليها نوعين أساسيين. **Block**: بتبدأ في سطر جديد، وبتاخد عرض الأب كله (لحد آخر الصفحة) حتى لو الكلام اللي جواها قصير. **Inline**: بتمشي جوه السطر زي الكلام العادي، وبتاخد على قد محتواها بس. وفيه نوع تالت هجين اسمه **inline-block** بيمشي في السطر زي Inline لكن بيقبل عرض وارتفاع زي Block.

الحتة المهمة: النوع ده **مش جزء من الـ HTML نفسه**، ده شغل الـ CSS. المتصفح بيدّي كل عنصر `display` افتراضي من ورقة تنسيق مدمجة فيه (User Agent Stylesheet): الـ `<div>` بياخد `display: block` والـ `<span>` بياخد `display: inline`. إنت تقدر تغيّر ده بأي وقت: تخلي `<span>` يبقى Block، أو `<div>` يبقى Inline. فالاسم «عنصر Block» معناه فعلياً «عنصر `display` الافتراضي بتاعه block».

وخلّي بالك إن ده **مختلف** عن قواعد التداخل اللي في [[nesting-rules]]. هناك الكلام عن «إيه المسموح يتحط جوه إيه» (Flow و Phrasing)، هنا الكلام عن «العنصر بيتحط في الصفحة إزاي». الاتنين بيتشابهوا في الاسم لكن مختلفين في المعنى.

> [!analogy] تخيّل بتعمل رصّ في رف: العناصر الـ Block زي الكتب الكبيرة اللي كل واحد بياخد رف لوحده من الحيطة للحيطة. والـ Inline زي حبّات العملة الصغيرة اللي بتتحط جنب بعض في نفس الصف وبتاخد على قد حجمها بس.

> [!key] **Block** = سطر جديد + عرض كامل. **Inline** = جوه السطر + على قد المحتوى. **Inline-block** = جوه السطر + بيقبل width و height.

## try

الاتنين فيهم نفس الستايل بالظبط، بس `div` هو Block و `span` هو Inline. جرّب غيّر `display` لـ `inline-block` وشوف إيه اللي بيحصل.

```html
<style>
  .box { background: #ffd54f; padding: 8px; margin: 6px; border: 2px solid #333; }
</style>
<div class="box">أنا div (Block)</div>
<div class="box">أنا div تاني</div>
<span class="box">أنا span (Inline)</span>
<span class="box">وأنا span تاني</span>
```

## section: الفرق بالتفصيل (مرجع سريع)

المرجع ده بيجمع كل الفروق اللي هتحتاجها. ارجعله وقت ما تتلخبط:

- **السطر:** الـ Block بيبدأ سطر جديد، والـ Inline والـ Inline-block بيكملوا في نفس السطر.
- **العرض الافتراضي:** الـ Block بياخد عرض الأب كله، والاتنين التانيين على قد المحتوى.
- **`width` و `height`:** بيشتغلوا مع Block و Inline-block، لكن **بيتجاهلوا** مع Inline.
- **`margin` أعلى وأسفل:** بيشتغل مع Block و Inline-block، و**بيتجاهل** مع Inline.
- **`margin` يمين وشمال:** بيشتغل مع التلاتة.
- **`padding`:** بيشتغل ويدفع اللي حواليه مع Block و Inline-block. مع Inline بيتشاف لكن **مش بيدفع** السطور اللي فوقه وتحته.
- **أمثلة:** Block: `<div>` و `<p>` و `<h1>` و `<ul>` و `<section>`. Inline: `<span>` و `<a>` و `<strong>` و `<em>` و `<code>`. Inline-block بالفطرة: `<img>` و `<button>` و `<input>` و `<select>`.

النقطة التالتة هي اللي بتوقّع الناس: لو حطيت `width: 200px` على `<span>` مفيش حاجة هتحصل، لأن الـ Inline مالوش عرض يتحكم فيه، هو بياخد حجم الكلام. لازم تغيّره لـ `inline-block` أو `block` الأول.

## section: إزاي المتصفح بيرتّب الـ Block

العناصر الـ Block بتترصّ **فوق بعض** بالترتيب اللي كتبته، كل واحد بياخد عرض أبوه. ولما عنصرين Block مجاورين بيبقى لكل واحد `margin` من فوق وتحت، المسافة بينهم **مش بتتجمع**، المتصفح بياخد الأكبر بس، وده اسمه **Margin Collapsing**.

مثلاً لو الفقرة الأولى `margin-bottom: 20px` والتانية `margin-top: 30px`، المسافة الفعلية بينهم **30px** مش 50px. ده سلوك طبيعي ومقصود مش خطأ.

## section: إزاي المتصفح بيرتّب الـ Inline

العناصر الـ Inline بتتعامل زي **حروف في سطر**. بتتحط جنب بعض لحد ما السطر يخلص، وبعدين المتصفح بينزّلها لسطر جديد (ده اسمه Line Wrapping). ولو عنصر Inline طويل (رابط فيه جملة طويلة) هيتقسّم على سطرين أو أكتر.

وبسبب إن الـ Inline بيتعامل زي النص، فالمسافات اللي في الكود بين العناصر **بتظهر كمسافة** صغيرة. يعني `<span>أ</span> <span>ب</span>` بيطلع فيه مسافة بين أ و ب، لكن `<span>أ</span><span>ب</span>` من غير مسافة بيطلعوا ملزوقين.

## examples

### 1) كل Block ياخد سطر لوحده
حتى لو الكلام قصير جداً الـ Block بياخد العرض كله. الحدود بتوريك ده.

```html
<style>
  .b { border: 2px solid #1565c0; margin: 4px 0; }
</style>
<div class="b">أ</div>
<div class="b">ب</div>
<p class="b">ج (فقرة)</p>
<h3 class="b">د (عنوان)</h3>
```

- كل واحد فيهم امتد من أول الصندوق لآخره رغم إن الكلام حرف واحد.

### 2) الـ Inline بيمشي مع الكلام
هنا الحدود بتلف حوالين الكلام بالظبط، والعناصر بتكمل في نفس السطر.

```html
<style>
  .i { border: 2px solid #c62828; }
</style>
<p>
  الكلمة <span class="i">الأولى</span> والكلمة <strong class="i">التانية</strong>
  والرابط <a class="i" href="#">التالت</a> كلهم في سطر واحد.
</p>
```

- لاحظ إن الحدود ضيقة على قد الكلمة مش ممتدة.

### 3) width و height مع Inline (مش بيشتغلوا)
الـ `<span>` بيتجاهل العرض والارتفاع. نفس الستايل على `<div>` بيشتغل.

```html
<style>
  .s { width: 200px; height: 60px; background: #a5d6a7; }
</style>
<p>span (Inline): <span class="s">مفيش تأثير</span></p>
<p>div (Block):</p>
<div class="s">اشتغل</div>
```

- العرض والارتفاع اتطبقوا على الـ `div` بس.

### 4) inline-block: أحسن الاتنين
نفس الـ `<span>` بعد ما نحط `display: inline-block` بقى بيقبل العرض والارتفاع وبيفضل جنب أخواته.

```html
<style>
  .ib { display: inline-block; width: 100px; height: 60px; background: #81d4fa; text-align: center; line-height: 60px; }
</style>
<span class="ib">1</span>
<span class="ib">2</span>
<span class="ib">3</span>
```

- ثلاث صناديق بحجم ثابت جنب بعض في سطر واحد.

### 5) تحويل Block لـ Inline
الـ `<div>` عادةً Block، لكن لو غيّرنا `display` لـ `inline` بيمشي مع الكلام.

```html
<style>
  .d { display: inline; background: #ffcc80; padding: 4px; }
</style>
<div class="d">أنا</div>
<div class="d">div</div>
<div class="d">بس Inline</div>
```

- نفس العنصر `div` بس الشكل اتغيّر بالـ CSS، العنصر نفسه لسه عنصر `div`.

### 6) padding و margin الرأسي مع Inline
الـ padding بيتشاف لكن **مش بيزق** اللي فوقه وتحته. وmargin الرأسي بيتجاهل.

```html
<style>
  .p { background: #ce93d8; padding: 20px; margin: 20px; }
</style>
<p>سطر قبل</p>
<p>الكلمة <span class="p">دي</span> فيها padding و margin كبار.</p>
<p>سطر بعد</p>
```

- الـ padding الرأسي بيغطي على السطور اللي حواليه. الـ margin الرأسي مالوش تأثير.
- الـ margin الأفقي (يمين وشمال) بيشتغل.

### 7) المسافة بين عناصر الـ Inline
المسافة اللي في الكود بتظهر. لو عايز تشيلها لازم تلزق العناصر.

```html
<style>
  .t { display: inline-block; width: 60px; height: 40px; background: #ef9a9a; }
</style>
<p>بمسافة:</p>
<span class="t"></span>
<span class="t"></span>
<span class="t"></span>
<p>من غير مسافة:</p>
<span class="t"></span><span class="t"></span><span class="t"></span>
```

- المسافة اللي بتظهر هي نفسها مسافة الكلمات (المتصفح بيعتبر الـ Enter مسافة).
- الحل الحديث: `display: flex` على الأب (هتتعلمه في الـ CSS).

### 8) عناصر Inline-block بالفطرة
فيه عناصر بتيجي Inline-block من غير ما تعمل حاجة: الصور والأزرار وحقول الإدخال.

```html
<style>
  .big { width: 120px; height: 50px; }
</style>
<p>
  <button class="big">زرار</button>
  <input class="big" placeholder="حقل">
  <img class="big" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect width='10' height='10' fill='%2339ff14'/%3E%3C/svg%3E">
</p>
```

- ثلاثتهم Inline لكنهم بيقبلوا العرض والارتفاع (Replaced Elements).

### 9) كشف نوع العرض بالجافاسكربت
`getComputedStyle` بيرجعلك القيمة الفعلية.

```html
<div id="a">div</div>
<span id="b">span</span>
<img id="c" alt="" src="data:,">
<pre id="out"></pre>
<script>
  ['a','b','c'].forEach(id => {
    const d = getComputedStyle(document.getElementById(id)).display;
    out.textContent += id + ' → ' + d + '\n';
  });
</script>
```

- النتيجة: block و inline و inline (الصورة Replaced Inline).

### 10) تقسيم الصفحة بـ div وتنسيق الكلمات بـ span
مثال متكامل: الهيكل بـ Block والتفاصيل بـ Inline.

```html
<style>
  .card { border: 1px solid #ccc; border-radius: 8px; padding: 12px; max-width: 320px; }
  .price { color: #2e7d32; font-weight: bold; }
</style>
<div class="card">
  <h3>كورس HTML</h3>
  <p>السعر: <span class="price">مجاني</span> وبدون <strong>اشتراك</strong>.</p>
  <a href="#">ابدأ الآن</a>
</div>
```

- الكارت والعنوان والفقرة Block (هيكل)، والسعر والكلمة المهمة والرابط Inline (تفاصيل جوه السطر).

## use

- استخدم **Block** لهيكل الصفحة: أقسام وفقرات وعناوين وقوايم.
- استخدم **Inline** لتنسيق كلمات داخل جملة: تلوين، تأكيد، روابط، كود.
- استخدم **inline-block** لعناصر عايزها جنب بعض وليها حجم ثابت (أزرار، بطاقات صغيرة، شارات).
- لو حاجة مش بتشتغل (width مش بيتطبق مثلاً)، أول حاجة تتأكد منها هي نوع الـ `display`.

## avoid

- متحاولش تدّي `width` أو `height` لعنصر Inline عادي: غيّر الـ display الأول.
- متعتمدش على `<br>` أو المسافات لتظبيط شكل عناصر جنب بعض: استخدم `display` أو Flexbox.
- متفتكرش إن «Block» و«Flow content» نفس الحاجة: دي أسماء من مفاهيم مختلفة (شكل وتخطيط vs. قواعد تداخل).

## mistakes

### عرض على span من غير تغيير display
```html bad
<style>
  span.btn { width: 120px; height: 40px; background: orange; }
</style>
<span class="btn">اضغط</span>
```
```html good
<style>
  span.btn { display: inline-block; width: 120px; height: 40px; background: orange; }
</style>
<span class="btn">اضغط</span>
```
ليه؟ الـ `<span>` Inline فبيتجاهل `width` و `height`. محتاج `inline-block` الأول (والأفضل تستخدم `<button>` لو هو زرار).

### توقع إن margin الرأسي هيشتغل على Inline
```html bad
<style>
  a { margin-top: 30px; }
</style>
<a href="#">رابط</a>
```
```html good
<style>
  a { display: inline-block; margin-top: 30px; }
</style>
<a href="#">رابط</a>
```
ليه؟ الـ margin الرأسي بيتجاهل مع Inline. الـ `inline-block` بيخليه يشتغل.

### الخلط بين عناصر Block و Content model
```html bad
<p>
  <div>صندوق</div>
</p>
```
```html good
<div>
  <p>فقرة</p>
</div>
```
ليه؟ دي مش مشكلة display، دي قاعدة تداخل: الفقرة `<p>` بتقبل Phrasing content بس، فالـ `<div>` بيقفل الفقرة تلقائياً. التفاصيل في [[nesting-rules]].

## a11y

- تغيير `display` بالـ CSS **مش بيغيّر معنى العنصر**. لكن `display: none` بيخبّي العنصر من قارئ الشاشة كمان.
- بعض المتصفحات بتشيل دلالة القوايم والجداول لو غيّرت `display` بتاعها (مثلاً `ul { display: flex }`). ده بيتصلّح بإضافة `role="list"` يدوياً أو متابعة آخر تحديثات المتصفح.
- العنصر اللي شكله زرار لازم يبقى `<button>` فعلاً، بغض النظر عن الـ display.

## tips

- افتح DevTools واضغط على أي عنصر، هتشوف الـ `display` الفعلي في تبويب Computed.
- لو عايز العناصر تقعد جنب بعض وتتحكم فيها كويس، جرّب `display: flex` أو `display: grid` على الأب (في الـ CSS لاحقاً).
- الـ `<img>` و `<button>` و `<input>` Inline افتراضياً لكنها بتقبل أبعاد، علشان كده شكلها «inline-block».
- مصطلح «Block level elements» اتشال من المواصفة الحديثة، لكن لسه شغال كوصف مفيد للسلوك الافتراضي.

## quiz

### إيه الفرق الأساسي بين Block و Inline؟
- [ ] الـ Block للنصوص والـ Inline للصور
- [x] الـ Block بيبدأ سطر جديد ويمتد، والـ Inline بيمشي مع الكلام على قد محتواه
- [ ] الـ Inline أسرع في التحميل
- [ ] مفيش فرق في الشكل
ده الفرق الأساسي في السلوك الافتراضي.

### عايز تدّي `<span>` عرض ثابت 150px. تعمل إيه؟
- [ ] تكتب `width: 150px` وبس
- [x] تغيّر `display` لـ `inline-block` وبعدين تكتب `width`
- [ ] تحط جواه `<br>`
- [ ] تغيّره لـ `<p>`
الـ Inline بيتجاهل width، فلازم تغيّر الـ display الأول.

### أنهي عنصر Inline-block بالفطرة؟
- [ ] `<div>`
- [ ] `<h1>`
- [x] `<button>`
- [ ] `<ul>`
الأزرار والصور وحقول الإدخال بتتصرف كـ Inline لكن بتقبل أبعاد.

## refs

- [MDN: Block and inline layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_and_Inline_Layout_in_Normal_Flow)
- [MDN: display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
