---
id: at-page
kind: atrule
cat: at-rules
chip: @page
title: قاعدة @page: تنسيق صفحة الطباعة
en: CSS @page at-rule
status: stable
support: all
size: compact
mdn: @page
summary: قاعدة @page بتتحكم في صفحة الطباعة: الحجم والهوامش والاتجاه (size وmargin). للتقارير وPDF.
keywords: @page, print, طباعة, size, margin, PDF
related: at-media, margin, padding
---

## intro

القاعدة `@page` بتتحكم في **شكل الصفحة المطبوعة** نفسها (مش محتواها): **حجم الورقة** و**هوامشها** واتجاهها. مفيدة لتقارير وفواتير وتصدير PDF من المتصفح. أشهر الخصائص جواها: **`size`** (`A4` أو `A4 landscape` أو `210mm 297mm`) و**`margin`** (هامش الصفحة). مثال: `@page { size: A4; margin: 20mm; }`. وفيه **صفحات مسمّاة** و**pseudo-classes** زي `@page :first { margin-top: 40mm; }` للصفحة الأولى، و`:left`/`:right` لصفحات الكتاب. بتظهر نتيجتها فقط **عند الطباعة** أو معاينتها (Ctrl+P). ودعمها جزئي: `size` و`margin` شغالين في معظم المتصفحات، لكن غيرهم (زي صناديق الهوامش `@top-center`) دعمه محدود.

## try

```html
<style>
  .pg { width:105px; height:148px; background:#f3ede0; border:1px solid #bda27a; box-shadow:2px 3px 8px rgba(61,44,24,.25); position:relative; margin:6px; }
  .pg::after { content:""; position:absolute; inset:12px; border:1px dashed #c9772f; }
  .cap { color:#3d2c18; font-size:.8rem; }
</style>
<div class="pg"></div><div class="cap">A4 (مصغّرة) بهامش 20mm = الحد المنقّط</div>
```

## syntax

```css nolive
@page {
  size: A4 portrait;
  margin: 20mm;
}
@page :first {
  margin-top: 40mm;
}
@media print { nav { display: none; } }
```

- بتظهر عند الطباعة فقط.
- مع `@media print` للتحكم في المحتوى.
- دعم الخصائص محدود.

## use

- تقارير وفواتير للطباعة.
- تصدير PDF بحجم ورقة محدد.

## avoid

- توقع صناديق الهوامش (@top-center) تشتغل في كل المتصفحات.

## examples

### 1) حجم وهوامش
A4 بهامش 20mm.

```html nolive
<style>
@page { size: A4; margin: 20mm; }
@media print {
  nav, .no-print { display: none; }
}
</style>
```



### 2) الصفحة الأولى
هامش أعلى أكبر.

```html nolive
<style>
@page { margin: 15mm; }
@page :first { margin-top: 50mm; }   /* مساحة لترويسة */
</style>
```



### 3) اتجاه أفقي
landscape.

```html nolive
<style>
@page wide { size: A4 landscape; }
.table-report { page: wide; }
</style>
```



## mistakes

### نسيان إخفاء عناصر الواجهة

```css bad
/* القايمة بتتطبع */
```

```css good
@media print { nav { display:none; } }
```

نظّف الطباعة.

## quiz

### @page بتتحكم في؟
- [x] صفحة الطباعة
- [ ] الشاشة
- [ ] الألوان
- [ ] الخطوط

الطباعة.

### خاصية الحجم؟
- [x] size
- [ ] width
- [ ] paper
- [ ] dim

size.

## refs

- [MDN: @page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
