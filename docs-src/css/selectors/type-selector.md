---
id: type-selector
kind: selector
cat: selectors
chip: element
title: محدد النوع (اسم العنصر)
en: Type selector
status: stable
support: all
mdn: Type_selectors
summary: محدد النوع بيختار كل العناصر اللي ليها نفس الاسم، زي p وh1 وa. أبسط محدد وأضعفه في الأولويات، ومناسب للتنسيق العام.
keywords: type selector, element selector, محدد النوع, اسم العنصر, p, h1, div, تنسيق عام, محدد بسيط
related: class-selector, universal-selector, selectors-guide, specificity
---

## intro

**محدد النوع (Type Selector)** هو أبسط محدد: بتكتب **اسم العنصر** زي ما هو في HTML من غير أي رموز، فيختار **كل** العناصر من النوع ده في الصفحة. `p` يختار كل الفقرات، و`h1` كل العناوين الكبيرة، و`a` كل الروابط.

المتصفح بيدوّر في الـ DOM على كل عنصر اسمه كده وبيطبّق عليه القاعدة، مش مهم مكانه ولا الـ class بتاعه. ولأنه بيختار **الكل** فهو مثالي للتنسيقات **العامة الأساسية** (خط الجسم، لون الروابط، مسافات العناوين) اللي بتفضل أساس بتبني عليه.

والمحدد ده **ضعيف** في الأولويات: الـ specificity بتاعته (0,0,1)، يعني أي class أو id بيغلبه بسهولة. وده كويس! لأنه بيسيبلك حرية تتخطاه بـ classes في الحالات الخاصة. ([[specificity]]).

نقطة بتلخبط المبتدئين: **اسم العنصر مش حسّاس لحالة الأحرف** في HTML (`P` = `p`) لكن الأفضل تكتبه lowercase.

> [!analogy] محدد النوع زي ما تقول «كل الطلبة لازم يلبسوا زي موحد»، بتخاطب الكل بنوعهم.

> [!tip] اعتمد على محددات النوع لـ **الأساسيات** (`body`, `h1`–`h6`, `p`, `a`)، وaستخدم الـ classes للمكونات المخصصة.

## try

```html
<style>
  p { color:#3d2c18; background:#efe0bd; padding:8px; border-radius:6px; }
  h3 { color:#7a4a1d; }
</style>
<h3>عنوان</h3><p>فقرة 1</p><p>فقرة 2 (نفس التنسيق)</p>
```

## syntax

```css nolive
p { color: brown; }
h1, h2 { margin-bottom: 0.5em; }
a { text-decoration: none; }
```

- اسم العنصر من غير نقطة أو #.
- الـ specificity = (0,0,1).

## use

- تنسيق أساسي عام للصفحة (body وp وa).
- أساس ملف الـ reset والـ base styles.
- تنسيق محتوى مقالات مجهول الـ classes (زي محتوى جاي من محرر).

## avoid

- لتنسيق مكوّن واحد بعينه (استخدم class).
- لما محتاج تتخطاه بسهولة من غير ما تكتب محددات طويلة (هو أصلاً ضعيف).

## examples

### 1) كل الفقرات
قاعدة واحدة بتنسّق كل `p` في الصفحة.

```html
<style>
  p { background:#efe0bd; color:#3d2c18; padding:8px; margin:6px 0; border-radius:6px; }
</style>
<p>فقرة أولى</p><p>فقرة تانية</p><div>div مش متأثر</div>
```

- الـ `div` مبيتأثرش.

### 2) عناوين وروابط
تنسيق عناصر مختلفة بقواعد منفصلة.

```html
<style>
  h3 { color:#7a4a1d; border-bottom:2px solid #c9772f; padding-bottom:4px; }
  a { color:#3d7a5a; font-weight:bold; }
</style>
<h3>عنوان</h3><a href="#">رابط أخضر</a>
```



### 3) تجميع بفاصلة
نفس التنسيق لأكتر من نوع.

```html
<style>
  h2, h3, h4 { color:#b5551f; margin:4px 0; }
</style>
<h2>H2</h2><h3>H3</h3><h4>H4</h4>
```

- الفاصلة = أو ([[selector-list]]).

### 4) class بيتخطّى النوع
النوع ضعيف: الـ class غلبه.

```html
<style>
  p { color:#3d7a5a; }
  .warn { color:#a63b2f; }
</style>
<p>أخضر</p><p class="warn">أحمر: الـ class أقوى</p>
```



## mistakes

### كتابة نقطة قبل الاسم

```css bad
.p { color:red; }  /* بتدوّر على class اسمه p */
```

```css good
p { color:red; }
```

النقطة معناها class. اسم العنصر من غير رموز.

### اسم عنصر غلط

```css bad
paragraph { color:red; }
```

```css good
p { color:red; }
```

لازم الاسم يطابق وسم HTML (`p` مش `paragraph`).

## quiz

### محدد `h1` بيختار؟
- [ ] أول h1 بس
- [x] كل عناصر h1
- [ ] class اسمه h1
- [ ] id اسمه h1

كل العناصر من النوع ده.

### الـ specificity لمحدد النوع؟
- [ ] (1,0,0)
- [ ] (0,1,0)
- [x] (0,0,1)
- [ ] (0,0,0)

خانة الـ Type.

### أنهي أقوى؟
- [ ] p
- [x] .p
- [ ] نفس القوة
- [ ] حسب الترتيب فقط

class أقوى من type.

## refs

- [MDN: element](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)
- [MDN: Type selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)
