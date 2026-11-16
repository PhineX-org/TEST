---
id: at-container
kind: atrule
cat: at-rules
chip: @container
title: قاعدة @container: استعلام الحاوية
en: CSS @container at-rule
status: stable
support: all
mdn: @container
summary: قاعدة @container بتطبّق ستايل حسب حجم الحاوية القريبة (مش الشاشة). تخلّي المكوّن يتأقلم مع مكانه.
keywords: @container, container query, حاوية, مكون متجاوب, inline-size
related: container-type, container-name, container, at-media
---

## intro

القاعدة `@container` هي «`@media` الجديدة»، لكن بدل ما تسأل عن **حجم الشاشة** بتسأل عن **حجم الحاوية** اللي العنصر جواها. وده بيخلّي **المكوّن (component)** ذكي ومستقل: نفس البطاقة تتصرف بشكل مضغوط في شريط جانبي ضيق، وبشكل واسع في المحتوى الرئيسي، من غير ما تعرف حجم الشاشة.

خطوتين:
1. **عرّف الحاوية**: `.wrap { container-type: inline-size; }` ([[container-type]]) وممكن اسم بـ [[container-name]].
2. **اكتب الاستعلام**: `@container (min-width: 400px) { .card { display: flex; } }` أو باسم: `@container sidebar (min-width: 300px) { ... }`.

الشروط تشبه media: `min-width` و`max-width` (و`width >= 400px`) والارتفاع مع `size`، وكمان **وحدات الحاويات** `cqw` و`cqi` (نسبة من عرض الحاوية).

قاعدة مهمة: الاستعلام بيؤثر على **أبناء** الحاوية، مش الحاوية نفسها. وممكن تدمجه مع `@media` لتحكم أشمل.

## try

```html
<style>
  .w { container-type:inline-size; resize:horizontal; overflow:auto; width:260px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .c { display:grid; gap:6px; background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 250px) { .c { grid-template-columns:1fr 1fr; background:#bcd4a8; } }
</style>
<div class="w"><div class="c"><span>عمود 1</span><span>عمود 2</span></div></div>
```

## syntax

```css nolive
.wrap { container-type: inline-size; container-name: card; }
@container card (min-width: 400px) {
  .card { display: flex; gap: 16px; }
}
@container (width < 300px) { ... }
```

- لازم container-type على الأب.
- الاستعلام على الأبناء مش الحاوية.
- وحدات `cqw` و`cqi` متاحة.

## use

- مكونات قابلة لإعادة الاستخدام.
- بطاقات بتتغير حسب مكانها.
- تصميم Design System.

## avoid

- استخدامها بدون container-type.
- استعلام على الحاوية نفسها.

## examples

### 1) بطاقة تتغير
حسب عرض الحاوية.

```html
<style>
  .w { container-type:inline-size; resize:horizontal; overflow:auto; width:280px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .c { display:grid; gap:6px; background:#efe0bd; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 260px) { .c { grid-template-columns:1fr 1fr; } }
</style>
<div class="w"><div class="c"><span>أ</span><span>ب</span></div></div>
```



### 2) حاوية مسمّاة
card.

```html
<style>
  .w { container:card / inline-size; width:260px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">card</div></div>
```



### 3) وحدة cqw
نسبة من عرض الحاوية.

```html
<style>
  .w { container-type:inline-size; width:260px; max-width:100%; border:2px dashed #bda27a; padding:6px; resize:horizontal; overflow:auto; }
  .t { font-size:clamp(.9rem, 6cqw, 1.8rem); color:#3d2c18; font-weight:bold; }
</style>
<div class="w"><div class="t">حجم الخط يتبع الحاوية</div></div>
```



### 4) بدون حاوية
الاستعلام ميتحققش.

```html
<style>
  .w { width:260px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container (min-width: 100px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">لسه بنفس اللون لأن مفيش حاوية</div></div>
```



## mistakes

### بدون container-type

```css bad
@container (min-width:400px) { .a { } }
```

```css good
.wrap { container-type:inline-size; }
```

لازم تعرّف الحاوية.

### استعلام على الحاوية نفسها

```css bad
.wrap { container-type:inline-size; }
@container (min-width:400px) { .wrap { padding:20px; } }
```

```css good
@container (min-width:400px) { .wrap > .card { padding:20px; } }
```

الاستعلام بيؤثر على الأبناء.

## quiz

### @container بتقيس؟
- [x] حجم الحاوية
- [ ] حجم الشاشة
- [ ] لون
- [ ] خط

الحاوية القريبة.

### محتاجة؟
- [x] container-type على الأب
- [ ] position
- [ ] float
- [ ] overflow

تعريف الحاوية.

### بتأثر على؟
- [x] أبناء الحاوية
- [ ] الحاوية نفسها
- [ ] الصفحة كلها
- [ ] الـ head

الأبناء.

## refs

- [MDN: @container](https://developer.mozilla.org/en-US/docs/Web/CSS/@container)
