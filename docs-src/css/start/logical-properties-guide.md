---
id: logical-properties-guide
kind: guide
cat: start
title: الخصائص المنطقية (RTL)
en: Logical properties
status: stable
summary: بدل left/right استخدم start/end: تصميم واحد يشتغل صح بالعربي (RTL) والإنجليزي (LTR) من غير تعديل، مع margin-inline وpadding-block.
keywords: logical, rtl, ltr, inline, block, margin-inline, padding-block, start, end, عربي, اتجاه, direction, منطقي
related: margin-inline, padding-block, inline-size, block-size, direction, writing-mode
---

## intro

لو موقعك عربي (RTL) وكتبت `margin-left: 20px`، فالمسافة هتظهر على **شمال** الشاشة. بس في العربي «بداية السطر» هي **اليمين**! وده بيخلي التصميم يبوظ لو غيّرت اللغة.

الحل: **الخصائص المنطقية (Logical Properties)** بتتكلم بالمعنى مش بالاتجاه الفيزيائي:
- **inline** = اتجاه الكتابة (أفقي في العربي والإنجليزي).
- **block** = اتجاه تتابع الأسطر (رأسي).
- **start / end** = بداية ونهاية بالنسبة لاتجاه اللغة.

يعني بدل:
- `margin-left` → [[margin-inline-start]] 
- `margin-right` → [[margin-inline-end]]
- `padding-left/right` → [[padding-inline]]
- `padding-top/bottom` → [[padding-block]]
- `width` → [[inline-size]]، و`height` → [[block-size]]
- `left` → [[inset-inline-start]]، و`border-left` → [[border-inline-start]]

ولو كتبت `text-align: start` فهتبقى يمين في العربي وشمال في الإنجليزي، تلقائياً.

> [!tip] **لو بتبني موقع عربي**: ابدأ بالخصائص المنطقية من الأول. هتوفّر على نفسك تعديلات الـ RTL كلها.

> [!analogy] «على يمينك» بتتغيّر لو لفّيت. أما «قدّامك» ثابتة. الخصائص المنطقية بتتكلم بلغة «قدّامك/وراك».

## try

```html
<style>
  .a { border-inline-start:6px solid #b5551f; padding-inline:14px; padding-block:8px;
       background:#efe0bd; color:#3d2c18; }
</style>
<div class="a">الحد على بداية السطر (اليمين في العربي)</div>
```

## examples

### 1) start بدل right/left
نفس الكود في عربي وإنجليزي، والحد دايماً في البداية.

```html
<style>
  .q { border-inline-start:6px solid #3d7a5a; padding-inline-start:12px; background:#efe0bd;
       color:#3d2c18; margin:6px 0; padding-block:8px; }
</style>
<div class="q">عربي (RTL)</div>
<div class="q" dir="ltr">English (LTR)</div>
```

- الحد انتقل لوحده.

### 2) margin-inline-start
مسافة في بداية العنصر بالنسبة للغة.

```html
<style>
  .i { margin-inline-start:40px; background:#bcd4a8; color:#3d2c18; padding:8px; }
</style>
<div class="i">مسافة بداية</div>
```



### 3) inline-size
عرض منطقي. في اللغات الرأسية بيبقى ارتفاع تلقائياً.

```html
<style>
  .s { inline-size:200px; block-size:50px; background:#e4c490; color:#3d2c18; padding:6px; }
</style>
<div class="s">200×50</div>
```



## mistakes

### استخدام left/right في موقع RTL

```css bad
.icon { margin-left:10px; }
```

```css good
.icon { margin-inline-start:10px; }
```

لو غيّرت اتجاه الصفحة الأيقونة مش هتنقل.

### تعميم text-align:left

```css bad
p { text-align:left; }
```

```css good
p { text-align:start; }
```

في العربي left مش البداية.

## quiz

### بداية السطر في العربي هي؟
- [ ] اليسار
- [x] اليمين
- [ ] فوق
- [ ] تحت

RTL: البداية يمين.

### بديل margin-left المنطقي؟
- [x] margin-inline-start
- [ ] margin-block-start
- [ ] margin-top
- [ ] left

start في اتجاه inline.

## refs

- [MDN: Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
