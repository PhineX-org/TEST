---
id: at-supports
kind: atrule
cat: at-rules
chip: @supports
title: اختبار دعم الميزة
en: CSS @supports at-rule
status: stable
support: all
mdn: @supports
summary: قاعدة @supports بتطبّق ستايل بس لو المتصفح بيدعم خاصية أو قيمة معينة. مثالية للتحسين التدريجي.
keywords: @supports, feature query, دعم المتصفح, progressive enhancement, fallback
related: at-media, display-flow, grid-guide, css-best-practices
---

## intro

القاعدة `@supports` (Feature Query) بتسأل المتصفح: **«إنت بتفهم الخاصية دي؟»** ولو أيوه بتطبّق الستايل اللي جواها، ولو لأ بتتجاهله. وده بيخلّيك تستخدم ميزات حديثة **بأمان** وتكتب **حل بديل (fallback)** للمتصفحات القديمة، وده اسمه **التحسين التدريجي (progressive enhancement)**.

الصيغ:
- **اختبار خاصية وقيمة**: `@supports (display: grid) { ... }`.
- **النفي**: `@supports not (display: grid) { ... }` (لو مش مدعومة).
- **الدمج**: `and` و`or`: `@supports (display: grid) and (gap: 10px)`.
- **اختبار selector**: `@supports selector(:has(a)) { ... }`.

الأسلوب المعتاد: اكتب الستايل **الأساسي** اللي يشتغل على الكل خارج `@supports`، وبعدين حط التحسين الحديث جواه. ومتنساش: القاعدة بتختبر **الدعم** مش حجم الشاشة (ده شغل `@media`)، وبعض الخصائص المدعومة جزئياً ممكن تعدّي الاختبار وتتصرف بشكل ناقص، فاختبر القيمة المحددة.

## try

```html
<style>
  .a, .b { padding:10px; border-radius:8px; margin:4px 0; color:#3d2c18; background:#e4c490; }
  @supports (display:grid) { .a { background:#bcd4a8; } .a::after { content:" ✓ grid مدعوم"; } }
  @supports not (display:grid) { .b { background:#e4a080; } }
  @supports (display:foobar) { .b { background:#bcd4a8; } }
</style>
<div class="a">اختبار grid</div><div class="b">اختبار قيمة وهمية (مش مدعومة)</div>
```

## syntax

```css nolive
@supports (display: grid) {
  .layout { display: grid; }
}
@supports not (backdrop-filter: blur(4px)) {
  .glass { background: #f3ede0; }
}
@supports selector(:has(a)) { ... }
```

- `not` و`and` و`or` متاحين.
- اختبر القيمة مش الخاصية بس.
- للـ selectors: `selector()`.

## use

- تحسين تدريجي لميزات حديثة.
- بديل لـ backdrop-filter وغيره.
- اختبار :has() وغيره.

## avoid

- اختبار ميزات مدعومة في كل مكان (لا داعي).
- الخلط مع @media.

## examples

### 1) grid مع بديل
الأساس ثم التحسين.

```html
<style>
  .l { display:block; }
  .l div { background:#efe0bd; color:#3d2c18; padding:8px; margin:3px; border-radius:6px; }
  @supports (display:grid) { .l { display:grid; grid-template-columns:repeat(3,1fr); } }
</style>
<div class="l"><div>1</div><div>2</div><div>3</div></div>
```



### 2) not
البديل لو مش مدعوم.

```html
<style>
  .g { padding:12px; border-radius:8px; background:#f3e6c9; color:#3d2c18; }
  @supports (backdrop-filter:blur(4px)) { .g { background:rgba(243,230,201,.6); backdrop-filter:blur(4px); } }
  @supports not (backdrop-filter:blur(4px)) { .g { background:#f3e6c9; } }
</style>
<div class="g">ستايل زجاجي أو بديل</div>
```



### 3) and
شرطين معاً.

```html
<style>
  .a { padding:10px; border-radius:8px; background:#e4c490; color:#3d2c18; }
  @supports (display:grid) and (gap:10px) { .a { background:#bcd4a8; } }
</style>
<div class="a">grid وgap</div>
```



### 4) selector()
اختبار :has().

```html
<style>
  .s { padding:10px; border-radius:8px; background:#e4c490; color:#3d2c18; }
  @supports selector(:has(a)) { .s { background:#bcd4a8; } .s::after { content:" ✓ :has مدعوم"; } }
</style>
<div class="s">اختبار selector</div>
```



## mistakes

### اختبار خاصية بدون قيمة محددة

```css bad
@supports (position:sticky) { }  /* ممكن مدعوم جزئياً */
```

```css good
@supports (position:sticky) and (top:0) { }
```

اختبر القيمة المحددة.

### وضع الأساسي جوه @supports

```css bad
@supports (display:grid) { .box { color:red; } }  /* الباقي بدون ستايل */
```

```css good
.box { color:red; }  /* خارج */
@supports (...) { تحسين فقط }
```

الأساس لازم يشتغل على الكل.

## quiz

### @supports بتختبر؟
- [x] دعم المتصفح لميزة
- [ ] حجم الشاشة
- [ ] اللغة
- [ ] السرعة

feature query.

### النفي بـ؟
- [x] not
- [ ] no
- [ ] except
- [ ] without

@supports not (...).

### اختبار selector بـ؟
- [x] selector()
- [ ] test()
- [ ] has()
- [ ] if()

@supports selector().

## refs

- [MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)
