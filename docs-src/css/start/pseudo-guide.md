---
id: pseudo-guide
kind: guide
cat: start
title: حالات وعناصر وهمية (Pseudo)
en: Pseudo-classes and pseudo-elements
status: stable
summary: الـ Pseudo-classes بتستهدف عنصر في حالة معينة (hover, focus, first-child) والـ Pseudo-elements بتستهدف جزء من العنصر (::before, ::after). فرق وأمثلة.
keywords: pseudo, hover, focus, before, after, first-child, nth-child, pseudo-class, pseudo-element, حالات, :hover, ::before
related: hover, focus, before, after, first-child, nth-child, selectors-guide
---

## intro

أحياناً عايز تنسّق عنصر **في حالة معينة** (لما الماوس عليه، أو لما يبقى أول واحد)، أو تنسّق **جزء** منه (أول حرف، أو تضيف علامة قبله). ده شغل الـ Pseudo.

**الـ Pseudo-class (بنقطة واحدة `:`)** = **حالة** للعنصر:
- حالات التفاعل: [[hover]] (الماوس عليه)، [[focus]] (واخد التركيز)، [[active]] (بيتضغط).
- حالات الموقع: [[first-child]]، [[last-child]]، [[nth-child]] (`:nth-child(2n)` = كل عنصر زوجي).
- حالات الفورم: [[checked]]، [[disabled]]، [[invalid]].
- الـ [[not]] لاستبعاد، و[[has]] لاختيار الأب بناءً على أبنائه.

**الـ Pseudo-element (بنقطتين `::`)** = **جزء** من العنصر:
- [[before]] و[[after]]: بتضيف محتوى قبل/بعد العنصر بخاصية `content` (لازم تكتبها حتى لو فاضية `content:""`).
- [[first-letter]] و[[first-line]]: أول حرف/سطر.
- [[selection]] لتلوين النص المحدد، و[[placeholder]] لنص الحقل.

> [!analogy] الـ pseudo-class زي «لما يكون الباب مفتوح» (حالة)، والـ pseudo-element زي «مقبض الباب» (جزء منه).

> [!key] الـ pseudo-class بتتعامل زي class في الأولويات (0,1,0)، والـ pseudo-element زي عنصر (0,0,1).

## try

```html
<style>
  a { color:#7a4a1d; }
  a:hover { color:#3d7a5a; text-decoration:underline; }
  a::after { content:" ↗"; }
</style>
<a href="#">رابط (مرّر الماوس)</a>
```

## examples

### 1) hover و focus
الزرار بيتغيّر لما الماوس يقف عليه أو تدوس Tab.

```html
<style>
  button { background:#7a4a1d; color:#f3ede0; padding:10px 20px; border:0; border-radius:8px; }
  button:hover { background:#3d7a5a; }
  button:focus-visible { outline:3px solid #c9772f; outline-offset:3px; }
</style>
<button>اضغط Tab أو مرّر</button>
```



### 2) nth-child للتلوين
تلوين الصفوف الزوجية (zebra stripes).

```html
<style>
  ul { list-style:none; padding:0; margin:0; }
  li { padding:8px; color:#3d2c18; }
  li:nth-child(even) { background:#efe0bd; }
  li:first-child { font-weight:bold; }
</style>
<ul><li>الأول</li><li>التاني</li><li>التالت</li><li>الرابع</li></ul>
```



### 3) ::before علامة
بنضيف علامة قبل كل عنصر من غير تعديل HTML.

```html
<style>
  li { list-style:none; color:#3d2c18; margin:6px 0; }
  li::before { content:"✔ "; color:#3d7a5a; }
</style>
<ul><li>الدرس الأول</li><li>الدرس التاني</li></ul>
```



### 4) ::first-letter
حرف أول كبير زي المجلات.

```html
<style>
  p::first-letter { font-size:2.4em; float:right; color:#b5551f; padding-left:6px; line-height:1; }
  p { color:#3d2c18; background:#efe0bd; padding:10px; }
</style>
<p>بسم الله نبدأ الدرس الجديد ونتعلم كيف نزين الفقرة بحرف أول كبير.</p>
```



## mistakes

### نسيان content في ::before

```css bad
p::before { color:red; }
```

```css good
p::before { content:"★ "; color:red; }
```

من غير `content` الـ pseudo-element مبيظهرش.

### hover على الموبايل

```css bad
.menu:hover .sub { display:block; }  /* مفيش hover على اللمس */
```

```css good
.menu:focus-within .sub { display:block; }
```

الموبايل مفيهوش hover حقيقي، فكمّل بـ focus.

## quiz

### الفرق بين : و :: ؟
- [ ] مفيش
- [x] : للحالة و :: للجزء من العنصر
- [ ] العكس
- [ ] للـ JS

pseudo-class vs pseudo-element.

### ::before محتاج دايماً؟
- [ ] width
- [x] content
- [ ] display
- [ ] color

بدون content مش بيتولّد.

### `li:nth-child(2n)` بتختار؟
- [x] كل عنصر زوجي
- [ ] العنصر الثاني بس
- [ ] الفردي
- [ ] آخر عنصر

2n = 2, 4, 6…

## refs

- [MDN: Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements)
