---
id: font
kind: property
cat: typography
chip: font
title: اختصار الخط
en: CSS font shorthand property
status: stable
support: all
mdn: font
summary: font اختصار لضبط style وweight وsize/line-height وfamily في سطر واحد. الحجم والعائلة إجباريين وبالترتيب.
keywords: font, shorthand, font-size, line-height, font-family, اختصار
related: font-family, font-size, font-weight, line-height, font-style
---

## intro

الخاصية `font` هي **اختصار** بيجمع خصائص الخط في سطر واحد: `font: [style] [variant] [weight] size[/line-height] family`.

القواعد المهمة (ودي بتوقّع ناس كتير):
- **`size` و`family` إجباريين**. لو نقص واحد فيهم، السطر كله بيتلغي!
- الترتيب: الاختيارية الأول (style وweight)، ثم الحجم، وبعده `/` ثم ارتفاع السطر لو عايز، وأخيراً العائلة.
- **اللي متكتبش بيرجع للقيمة المبدئية**: لو كتبت `font: 1rem Arial` هتتصفّر `font-weight` وغيرها.

مثال كامل: `font: italic 700 1.25rem/1.6 "Segoe UI", sans-serif;` يعني مائل وغامق وحجم 1.25rem وارتفاع سطر 1.6 وعائلة Segoe UI.

الاختصار مناسب عند ضبط خط جديد من الصفر على `body`. وللتعديل المحدد استخدم الخصائص الفردية ([[font-size]] و[[font-weight]] و[[line-height]]) عشان متصفّرش حاجات بالغلط.

## try

```html
<style>
  p { margin:0; color:#3d2c18; font:italic 700 1.4rem/1.8 Georgia, serif; }
</style>
<p>اختصار font كامل في سطر</p>
```

## syntax

```css nolive
font: 1rem sans-serif;
font: bold 1.25rem/1.5 Georgia, serif;
font: italic 600 1rem "Segoe UI", sans-serif;
font: system-ui;
```

- **size وfamily إجباريين**.
- اللي مش مكتوب يرجع للمبدئي.

## values

### style
normal | italic | oblique (اختياري).

### weight
100–900 (اختياري).

### size/line-height
الحجم وبعده ارتفاع السطر.

### family
قايمة الخطوط (إجباري).

## use

- ضبط الخط الأساسي على body.
- أنماط ثابتة للعناصر.
- تعريف نمط جاهز لعناوين المكوّنات.

## avoid

- نسيان size أو family.
- استخدامها لتعديل بند واحد.

## examples

### 1) اختصار كامل
كل الأجزاء.

```html
<style>
  p { margin:0; color:#3d2c18; font:italic 700 1.3rem/1.7 Georgia, serif; }
</style>
<p>style + weight + size/line-height + family</p>
```



### 2) الحد الأدنى
size وfamily فقط.

```html
<style>
  p { margin:0; color:#3d2c18; font:1.3rem Tahoma, sans-serif; }
</style>
<p>حجم وعائلة فقط</p>
```



### 3) سطر خاطئ يتلغي
بدون family السطر كله مرفوض.

```html
<style>
  .a { font:bold 1.6rem; color:#3d2c18; margin:0; }   /* ناقص family */
  .b { font:bold 1.6rem sans-serif; color:#3d2c18; margin:0; }
</style>
<p class="a">مرفوض (عادي)</p><p class="b">صح (غامق)</p>
```



### 4) مع ارتفاع السطر
1.3rem بارتفاع 2.

```html
<style>
  p { margin:0; color:#3d2c18; font:1.1rem/2 Tahoma, sans-serif; background:#efe0bd; padding:4px 8px; }
</style>
<p>سطر أول طويل شوية عشان نشوف<br>المسافة بين الأسطر الواسعة</p>
```



## mistakes

### نسيان family

```css bad
p { font: bold 1rem; }  /* مرفوض */
```

```css good
p { font: bold 1rem sans-serif; }
```

family إجباري.

### تصفير weight بالغلط

```css bad
h2 { font-weight:700; }
h2 { font:1.5rem sans-serif; }  /* يصفّر weight */
```

```css good
h2 { font:700 1.5rem sans-serif; }
```

الاختصار بيصفّر الباقي.

## quiz

### الإجباريين في font؟
- [x] size وfamily
- [ ] style وweight
- [ ] line-height
- [ ] لا شيء

الاتنين.

### بيتكتب line-height ازاي؟
- [x] بعد size بعلامة /
- [ ] قبل size
- [ ] بعد family
- [ ] لا يمكن

size/line-height.

### لو اتكتب font:bold 1rem بدون family؟
- [ ] يشتغل
- [x] السطر كله يتلغي
- [ ] يستخدم serif
- [ ] يتكبّر

declaration مرفوضة.

## refs

- [MDN: font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)
