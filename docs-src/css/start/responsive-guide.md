---
id: responsive-guide
kind: guide
cat: start
title: التصميم المتجاوب
en: Responsive design guide
status: stable
summary: إزاي موقعك يبان حلو على الموبايل والتابلت واللابتوب: meta viewport وmedia queries ووحدات مرنة وشبكات متجاوبة، بدون تعقيد.
keywords: responsive, متجاوب, media query, mobile first, viewport, موبايل, breakpoint, @media, clamp, صور مرنة
related: at-media, fn-clamp, grid-guide, flexbox-guide, units, at-container
---

## intro

النهاردة أغلب الزوار بيدخلوا من **الموبايل**، فلازم الموقع يتأقلم مع أي حجم شاشة. ده معنى **التصميم المتجاوب (Responsive Design)**، وبيتعمل بثلاث ركائز:

1. **الـ meta viewport**: في الـ `<head>` لازم تكتب `<meta name="viewport" content="width=device-width, initial-scale=1">`. من غيرها الموبايل هيعرض الصفحة على عرض 980px ويصغّرها.
2. **تصميم مرن**: استخدم وحدات نسبية (`%`, `rem`, `fr`) و`max-width: 100%` للصور، وGrid/Flex مع `wrap`، علشان العناصر تتمدد وتنكمش.
3. **Media Queries**: [[at-media]] بتغيّر القواعد حسب الشاشة: `@media (min-width: 768px) { ... }`.

**منهج Mobile First**: اكتب التنسيق للموبايل الأول (الأبسط)، وبعدين استخدم `min-width` علشان تضيف تحسينات للشاشات الأكبر. ده بيخلّي الكود أنضف وأخف على الموبايل.

أدوات حديثة بتقلل الحاجة للـ media queries: [[fn-clamp]] للخطوط المرنة، و`auto-fit` + `minmax` في Grid ([[grid-guide]])، و[[at-container]] لتغيير الشكل حسب حجم الحاوية.

> [!analogy] التصميم المتجاوب زي الميّة: بتاخد شكل الإناء اللي اتحطت فيه. الموقع بياخد شكل الشاشة.

> [!warn] متحدّدش عرض ثابت بالـ px للحاويات الكبيرة. استخدم `max-width` علشان الموبايل ميعملش سكرول أفقي.

## try

```html
<style>
  .box { padding:20px; background:#efe0bd; color:#3d2c18; }
  @media (min-width: 400px) { .box { background:#bcd4a8; } }
</style>
<div class="box">ضيّق/وسّع النافذة وشوف اللون بيتغيّر</div>
```

## syntax

```css nolive
/* موبايل أولاً */
.card { padding:12px; }
@media (min-width:768px) {
  .card { padding:24px; display:flex; }
}
```

- `min-width` = من العرض ده وطالع (Mobile First).
- `max-width` = من العرض ده ونازل.

## examples

### 1) media query بسيط
اللون بيتغيّر لما العرض يعدّي 350px.

```html
<style>
  .b { padding:20px; background:#efe0bd; color:#3d2c18; }
  @media (min-width:350px) { .b { background:#bcd4a8; } }
  @media (min-width:500px) { .b { background:#e4c490; } }
</style>
<div class="b">غيّر عرض النافذة</div>
```

- كل media بتبدّل اللون.

### 2) أعمدة متجاوبة
عمود واحد على الموبايل، وعمودين على الشاشات الأكبر.

```html
<style>
  .g { display:grid; gap:8px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:16px; }
  @media (min-width:400px) { .g { grid-template-columns:1fr 1fr; } }
</style>
<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) خط متجاوب
`clamp()` بيخلّي الخط يكبر ويصغر لكن بين حدين.

```html
<style>
  h2 { font-size:clamp(1.2rem, 5vw, 2.2rem); color:#7a4a1d; margin:0; }
</style>
<h2>عنوان بيتأقلم</h2>
```

- بدون media query.

### 4) صور مرنة
`max-width:100%` يمنع الصورة تخرج برّه الأب.

```html
<style>
  .p { width:60%; background:#efe0bd; padding:8px; }
  .img { max-width:100%; width:400px; height:60px; background:#c9772f; }
</style>
<div class="p"><div class="img"></div></div>
```

- الصورة (البرتقالي) اتحصرت جوه الأب.

## mistakes

### نسيان meta viewport

```html bad
<!-- مفيش meta viewport -->
```

```html good
<meta name="viewport" content="width=device-width, initial-scale=1">
```

من غيرها الـ media queries مش هتشتغل صح على الموبايل.

### عرض ثابت

```css bad
.page { width:1200px; }
```

```css good
.page { width:min(1200px,100%); margin-inline:auto; }
```

العرض الثابت بيعمل سكرول أفقي على الموبايل.

## quiz

### Mobile First معناها؟
- [ ] نكتب للشاشات الكبيرة أول
- [x] نكتب للموبايل أول ونضيف بـ min-width
- [ ] نكتب للعربي
- [ ] نتجنب media

ابدأ بالأبسط وحسّن للأكبر.

### أنهي سطر ضروري في head؟
- [ ] meta charset
- [x] meta viewport
- [ ] link rel
- [ ] title

بدونه الصفحة مش متجاوبة على الموبايل.

### `min-width:768px` يعني؟
- [ ] العرض ≤ 768
- [x] العرض ≥ 768
- [ ] العرض = 768
- [ ] دايماً

من 768 وأكبر.

## refs

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_design)
