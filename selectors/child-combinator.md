---
id: child-combinator
kind: selector
cat: selectors
chip: A > B
title: محدد الابن المباشر (A > B)
en: Child combinator
status: stable
support: all
mdn: Child_combinator
summary: علامة الأكبر من بتختار B اللي هي ابن مباشر لـ A بس، مش الأحفاد. مفيدة لقوائم متداخلة وتنسيقات دقيقة.
keywords: child combinator, >, ابن مباشر, direct child, ul > li, نسل مباشر
related: descendant-combinator, selectors-guide, specificity, class-selector
---

## intro

علامة `>` بين محددين `A > B` بتسمى **Child Combinator**، وبتختار العناصر `B` اللي هي **ابن مباشر** لـ `A` (الجيل اللي تحته على طول)، **ومش** الأحفاد ولا الأبعد.

الفرق عن النسل (المسافة): لو عندك `ul` جواه `li` وجوه `li` ده `ul` تاني فيه `li`، فـ `ul li` هتختار **كل** الـ `li`، لكن `ul > li` هتختار **الأول بس** (ولو كتبت `ul > li > ul > li` توصل للتاني).

مفيدة جداً في:
- **القوائم المتداخلة**: تنسّق مستوى واحد من غير ما تتأثر بالمستويات التانية.
- **تجنّب التأثير على المكونات الداخلية**: `.tabs > .tab` ميأثرش على أي `.tab` جوه محتوى متداخل.
- **أداء ووضوح**: بتحدد بالظبط.

الـ specificity مبتتأثرش بالعلامة نفسها.

> [!analogy] `>` زي «الأولاد المباشرين»: ولادك. أما النسل فهو «ولادك وأحفادك وأحفاد أحفادك».

> [!tip] في الـ Flexbox والـ Grid، الأبناء المباشرين بس هم اللي بيتأثروا بالـ display، فـ `.container > *` مفيدة جداً.

## try

```html
<style>
  ul > li { color:#3d7a5a; font-weight:bold; }
</style>
<ul><li>مباشر<ul><li>حفيد (مش متأثر)</li></ul></li></ul>
```

## syntax

```css nolive
ul > li { }
.tabs > .tab { }
.container > * { }
```

- المحدد الأيمن لازم يكون ابن مباشر للأيسر.
- مسافات حوالين `>` اختيارية.

## use

- القوائم المتداخلة.
- تنسيق عناصر مكوّن من غير تأثير على المحتوى الداخلي.
- `.container > *` لتطبيق قاعدة على كل أبناء الحاوية.

## avoid

- لما عايز كل النسل (استخدم مسافة).
- لما HTML مش ثابت (لو لفّيت العنصر في wrapper هيتكسر المحدد).

## examples

### 1) ابن مباشر مقابل نسل
الأخضر = ابن مباشر. البني = نسل.

```html
<style>
  .a > p { color:#3d7a5a; font-weight:bold; }
  .a p { text-decoration:underline; }
</style>
<div class="a"><p>مباشر</p><div><p>حفيد (مسطّر بس)</p></div></div>
```



### 2) القوائم المتداخلة
المستوى الأول فقط اتلوّن.

```html
<style>
  .menu > li { background:#efe0bd; color:#3d2c18; padding:4px 8px; margin:3px 0; }
</style>
<ul class="menu" style="list-style:none;padding:0"><li>أول<ul><li>فرعي</li></ul></li><li>تاني</li></ul>
```



### 3) كل الأبناء بـ *
`.box > *` بيطبّق على كل ابن مباشر مهما كان نوعه.

```html
<style>
  .box > * { margin:6px; padding:6px; background:#bcd4a8; color:#3d2c18; }
  .box { background:#efe0bd; padding:4px; }
</style>
<div class="box"><p>فقرة</p><div>div<span>span جواه</span></div></div>
```



### 4) الابن + class
دقة أعلى باستخدام class على الابن.

```html
<style>
  .tabs > .tab { display:inline-block; padding:6px 14px; background:#7a4a1d; color:#f3ede0; margin:2px; }
</style>
<div class="tabs"><span class="tab">أ</span><span class="tab">ب</span></div>
```



## mistakes

### توقع وصول الأحفاد

```css bad
.a > p { color:red; }  /* مبيوصلش للحفيد */
```

```css good
.a p { color:red; }
```

لو عايز الأحفاد استخدم المسافة.

### تغليف عنصر يكسر المحدد

```css bad
.a > p { }  /* بعد ما لفّيت p في div */
```

```css good
.a p { }
```

التغيير في HTML بيكسر `>`.

## quiz

### `ul > li` بيختار؟
- [ ] كل li في الصفحة
- [x] li ابن مباشر لـ ul
- [ ] li أخ لـ ul
- [ ] ul جوه li

الجيل الأول بس.

### أنهي أوسع؟
- [ ] A > B
- [x] A B
- [ ] نفس الاتنين
- [ ] A + B

النسل بياخد كل المستويات.

### `.c > *` يعني؟
- [ ] كل أحفاد c
- [x] كل أبناء c المباشرين
- [ ] c نفسه
- [ ] c والأخوات

الأبناء المباشرين.

## refs

- [MDN: A > B](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator)
- [MDN: Child combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator)
