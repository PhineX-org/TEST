---
id: specificity
kind: guide
cat: start
title: الـ Specificity: مين يكسب؟
en: CSS specificity
status: stable
summary: الـ Specificity هي «قوة» المحدد. لما قاعدتين تتعارضوا على نفس الخاصية، المحدد الأقوى بيكسب. اتعلّم تحسبها بالأرقام (id, class, type) وتتحكّم فيها.
keywords: specificity, الاولويات, الاقوى, تعارض, specificity calculator, important, ليه css مش بتشتغل, override, ترتيب القواعد
related: cascade-inheritance, selectors-guide, kw-important, is, where, layers-guide
---

## intro

تخيّل إنك كاتب قاعدتين: واحدة تقول «الفقرات لونها أخضر» وواحدة تقول «الفقرات اللي عليها class مميّز لونها أحمر». أنهي تتطبّق؟ المتصفح مش بيقرا بالترتيب بس، هو بيحسب **قوة** كل محدد (**Specificity**) والأقوى بيكسب، وده بيحصل حتى لو القاعدة الضعيفة جت متأخر.

الحساب بيتعمل بثلاث خانات (من الأقوى للأضعف): **(ID، Class، Type)**.
- كل `#id` = خانة الـ ID (1،0،0).
- كل `.class` أو `[attr]` أو `:pseudo-class` = خانة الـ Class (0،1،0).
- كل نوع عنصر `p` أو `::pseudo-element` = خانة الـ Type (0،0،1).
- `*` والـ combinators (`>`، `+`، المسافة) = صفر.
- الـ `style` الـ inline أقوى من كلهم، و`!important` ([[kw-important]]) أقوى من أي حاجة (ما عدا important تاني أقوى).

وبتقارن الخانات **من اليسار**: خانة الـ ID الأول، لو اتساووا تنتقل للـ Class، وبعدين الـ Type. يعني `#a` (1،0،0) بيكسب على عشرة classes (0،10،0). ولو الـ specificity اتساوت تماماً، **آخر قاعدة في الترتيب بتكسب**.

> [!key] الأرقام مش بتتجمع كرقم واحد: (0,10,0) **أضعف** من (1,0,0) مهما كان عدد الـ classes.

> [!tip] اكتب محددات **قصيرة** وبـ classes، فتتجنب حرب الأولويات. ولو محتاج تقلّلها استخدم [[where]] (specificity صفر).

## try

```html
<style>
  p { color: #3d7a5a; }
  .x { color: #b5551f; }
</style>
<p class="x">أحمر-بني: الـ class أقوى من الاسم</p>
```

## syntax

```css nolive
p              /* (0,0,1) */
.card          /* (0,1,0) */
p.card         /* (0,1,1) */
#nav .link     /* (1,1,0) */
style="..."    /* inline: أقوى */
a:hover        /* (0,1,1) */
:where(.a)     /* (0,0,0) */
```

- تقارن الخانات من اليسار لليمين.
- لو اتساووا: آخر قاعدة تكسب.
- `!important` بتكسر القواعد (استخدمه نادراً).

## examples

### 1) class بيكسب على الاسم
المحددين بيستهدفوا نفس الفقرة. `.t` (0،1،0) أقوى من `p` (0،0،1) حتى لو `p` جاية بعده.

```html
<style>
  .t { color:#b5551f; }
  p  { color:#3d7a5a; }
</style>
<p class="t">اللون بني من الـ class</p>
```

- الترتيب مش مهم هنا.
- الأقوى بيكسب.

### 2) id أقوى من أي عدد classes
`#a` بيكسب على `.x.y.z` رغم إن الـ classes تلاتة.

```html
<style>
  #a { color:#3d7a5a; }
  .x.y.z { color:#a63b2f; }
</style>
<p id="a" class="x y z">أخضر: الـ id كسب</p>
```

- (1,0,0) أكبر من (0,3,0).

### 3) تعادل: الأحدث يكسب
المحددين نفس القوة (0،1،0) فالأخيرة بتكسب.

```html
<style>
  .m { color:#3d7a5a; }
  .m { color:#b5551f; }
</style>
<p class="m">بني: آخر قاعدة</p>
```

- لو غيّرت الترتيب النتيجة بتتغيّر.

### 4) تقليل القوة بـ :where
`:where()` بيخلّي specificity الجزء ده صفر فسهل تتخطّاه لاحقاً.

```html
<style>
  :where(.card p) { color:#3d7a5a; }   /* (0,0,0) */
  p { color:#b5551f; }                  /* (0,0,1) أقوى */
</style>
<div class="card"><p>بني</p></div>
```

- مفيد في الـ resets وملفات الـ framework.

## mistakes

### محاولة التغلّب بـ !important

```css bad
.btn { background:#3d7a5a !important; }
.btn.big { background:#b5551f !important; }
```

```css good
.btn { background:#3d7a5a; }
.btn.big { background:#b5551f; }
```

لو بقيت تحط `!important` في كل حتة هتدخل في سباق. الأفضل تظبط المحددات أو تستخدم [[layers-guide]].

### تركيب محددات طويلة

```css bad
body div.page section.box ul li a.link { color:#7a4a1d; }
```

```css good
.page-link { color:#7a4a1d; }
```

المحدد الطويل (0,3,5) صعب تتخطّاه. class واحد واضح أحسن.

## quiz

### أنهي أقوى: `#a` ولا `.x.y.z.w`؟
- [ ] `.x.y.z.w`
- [x] `#a`
- [ ] نفس القوة
- [ ] حسب الترتيب

الـ ID (1,0,0) بيكسب على أي عدد من الـ classes.

### لو اتعادلت القوة تماماً مين يكسب؟
- [ ] الأولى
- [x] الأخيرة في الترتيب
- [ ] الأطول
- [ ] عشوائي

الأحدث ترتيباً بيكسب.

### قوة `p.big:hover` تقريباً؟
- [ ] (0,0,1)
- [ ] (0,1,1)
- [x] (0,2,1)
- [ ] (1,0,0)

class + pseudo-class + type = (0,2,1).

## refs

- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
