---
id: at-media
kind: atrule
cat: at-rules
chip: @media
title: قاعدة @media: الاستعلامات الإعلامية
en: CSS @media at-rule
status: stable
support: all
mdn: @media
summary: قاعدة @media بتطبّق ستايل بس لما شرط معين يتحقق: عرض الشاشة أو الاتجاه أو الوضع الداكن أو الطباعة. أساس التصميم المتجاوب.
keywords: media query, @media, responsive, min-width, max-width, prefers-color-scheme, print, استعلام
related: at-container, at-supports, responsive-guide, at-import
---

## intro

القاعدة `@media` (Media Query) هي اللي بتخلّي الموقع **«يتصرف»** حسب الجهاز: ما تطبّقش مجموعة ستايلات إلا **لو شرط معين اتحقق**. هي قلب **التصميم المتجاوب (responsive)**.

الصيغة: `@media <type?> and (<condition>) { ...rules... }`.

الشروط الأشهر:
- **العرض**: `(min-width: 768px)` يعني «من 768 فأكتر»، و`(max-width: 600px)` «من 600 فأقل».
- **الاتجاه**: `(orientation: landscape)` أو `portrait`.
- **تفضيلات المستخدم**: `(prefers-color-scheme: dark)` وضع داكن، و`(prefers-reduced-motion: reduce)` تقليل الحركة.
- **القدرات**: `(hover: hover)` جهاز بماوس، و`(pointer: coarse)` لمس.
- **النوع**: `print` للطباعة، `screen` للشاشة.

وتقدر تدمج بـ `and` و`,` (أو) و`not`. ونقدر نكتبها بصيغة حديثة: `@media (width >= 768px)`.

نصيحة: ابدأ **mobile-first**: اكتب ستايل الموبايل كأساس، وبعدين `@media (min-width: ...)` تزوّد للشاشات الأكبر. وراعي إن `@media` بتقيس **الشاشة/النافذة** مش الحاوية؛ لو عايز تقيس حاوية معيّنة استخدم [[at-container]].

## try

```html
<style>
  .b { padding:10px; border-radius:8px; margin:4px 0; color:#3d2c18; background:#e4c490; }
  @media (min-width: 200px) { .a { background:#bcd4a8; } .a::after { content:" ✓ شرط 200+ اتحقق"; } }
  @media (min-width: 5000px) { .c { background:#bcd4a8; } }
</style>
<div class="b a">عرض النافذة ≥ 200</div><div class="b c">عرض النافذة ≥ 5000 (مش هيتحقق)</div>
```

## syntax

```css nolive
@media (min-width: 768px) {
  .menu { display: flex; }
}
@media (prefers-color-scheme: dark) { ... }
@media print { nav { display: none; } }
@media (width >= 768px) { ... }
```

- **ممكن تدمج**: `and` و`,` (أو) و`not`.
- mobile-first بـ `min-width`.
- القياس على النافذة مش الحاوية.

## use

- تصميم متجاوب لأحجام الشاشات.
- وضع داكن بـ prefers-color-scheme.
- ستايل طباعة منفصل.

## avoid

- نقاط كسر كتير جداً (breakpoints) من غير حاجة.
- استخدام @media لمكوّن يعتمد على حاويته (استخدم @container).

## examples

### 1) mobile-first
الأساس للموبايل وبعدين نزوّد.

```html
<style>
  .g { display:grid; gap:6px; }
  .g div { background:#efe0bd; color:#3d2c18; padding:8px; border-radius:6px; text-align:center; }
  @media (min-width: 300px) { .g { grid-template-columns:repeat(2,1fr); } }
  @media (min-width: 500px) { .g { grid-template-columns:repeat(3,1fr); } }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```



### 2) الاتجاه
landscape وportrait.

```html
<style>
  .o { padding:10px; border-radius:8px; color:#3d2c18; background:#e4c490; }
  @media (orientation: landscape) { .o::after { content:" (أفقي)"; } }
  @media (orientation: portrait) { .o::after { content:" (رأسي)"; } }
</style>
<div class="o">اتجاه النافذة</div>
```



### 3) وضع داكن
prefers-color-scheme.

```html
<style>
  .d { padding:10px; border-radius:8px; background:#efe0bd; color:#3d2c18; }
  @media (prefers-color-scheme: dark) { .d { background:#3d2c18; color:#f3ede0; } }
</style>
<div class="d">بيتبدّل لو جهازك على الوضع الداكن</div>
```



### 4) هل الجهاز بماوس؟
hover وpointer.

```html
<style>
  .h { padding:10px; border-radius:8px; background:#e4c490; color:#3d2c18; }
  @media (hover: hover) { .h::after { content:" 🖱 ماوس"; } }
  @media (hover: none) { .h::after { content:" 👆 لمس"; } }
</style>
<div class="h">نوع المؤشر</div>
```



### 5) الطباعة
ستايل منفصل.

```html
<style>
  .nav { background:#7a4a1d; color:#f3ede0; padding:8px; border-radius:6px; }
  @media print { .nav { display:none; } }
</style>
<div class="nav">القايمة (بتختفي عند الطباعة)</div>
```



## mistakes

### نسيان viewport meta

```css bad
/* الموبايل بيعرض الصفحة كأنها 980px */
```

```css good
<meta name="viewport" content="width=device-width, initial-scale=1">
```

من غيرها @media مبتشتغلش صح على الموبايل.

### desktop-first بالعكس

```css bad
@media (max-width:1200px){...} @media (max-width:900px){...} /* تراكم تعقيد */
```

```css good
@media (min-width:600px){...} @media (min-width:900px){...}
```

mobile-first أبسط.

## quiz

### أشهر شرط للتجاوب؟
- [x] min-width وmax-width
- [ ] color
- [ ] hover فقط
- [ ] src

عرض النافذة.

### mobile-first بتعتمد على؟
- [x] min-width
- [ ] max-width
- [ ] print
- [ ] orientation

نزوّد للأكبر.

### للوضع الداكن؟
- [x] prefers-color-scheme: dark
- [ ] dark-mode
- [ ] theme:dark
- [ ] color:dark

media feature.

## refs

- [MDN: @media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
