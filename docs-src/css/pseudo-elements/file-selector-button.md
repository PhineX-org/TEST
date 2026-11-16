---
id: file-selector-button
kind: pseudoelement
cat: pseudo-elements
chip: ::file-selector-button
title: زرار اختيار الملف
en: CSS ::file-selector-button pseudo-element
status: stable
support: all
size: compact
mdn: ::file-selector-button
summary: العنصر الوهمي file-selector-button بينسّق زرار «اختر ملف» داخل input type=file بدون JavaScript.
keywords: ::file-selector-button, file input, رفع ملف, input file, زرار
related: appearance, background-color, border-radius, hover
---

## intro

`::file-selector-button` بتنسّق **زرار «اختر ملف»** اللي جوه `<input type="file">`. قبلها كان تنسيق حقل الملف حاجة صعبة ومزعجة (مضطر تخفي الـ input وتعمل label مخصص بـ JS). دلوقتي تقدر تنسّق الزرار مباشرة بأي خصائص (لون، حشو، حد، ظل، hover): `input::file-selector-button { background: #c9772f; }`. وتقدر تضيف حالة [[hover]]. ومدعومة في كل المتصفحات الحديثة (القديم: `::-webkit-file-upload-button`). وده بيخلّي حقل رفع الملفات يتماشى مع باقي نموذجك بدل الزرار الرمادي القديم، ومن غير ما تفقد الوصولية الأصلية.

## try

```html
<style>
  input[type=file] { color:#3d2c18; }
  input::file-selector-button { padding:8px 16px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; cursor:pointer; margin-inline-end:10px; transition:background .2s; }
  input::file-selector-button:hover { background:#7a4a1d; }
</style>
<input type="file">
```

## syntax

```css nolive
input::file-selector-button { padding: 8px 16px; background: #c9772f; }
input::file-selector-button:hover { background: #7a4a1d; }
```

- للقديم ::-webkit-file-upload-button.

## use

- تنسيق زرار رفع الملف.
- هوية موحدة للنماذج.

## avoid

- إخفاء الـ input وفقدان الوصولية.

## examples

### 1) زرار ملون
تنسيق كامل.

```html
<style>
  input[type=file] { color:#3d2c18; }
  input::file-selector-button { padding:8px 16px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; cursor:pointer; margin-inline-end:10px; }
</style>
<input type="file">
```



### 2) hover
تأثير التمرير.

```html
<style>
  input::file-selector-button { padding:8px 16px; border:2px solid #c9772f; border-radius:8px; background:transparent; color:#7a4a1d; font-weight:bold; cursor:pointer; margin-inline-end:10px; transition:all .2s; }
  input::file-selector-button:hover { background:#c9772f; color:#f3ede0; }
  input { color:#3d2c18; }
</style>
<input type="file">
```



### 3) زرار بحد
بدون خلفية.

```html
<style>
  input { color:#3d2c18; }
  input::file-selector-button { padding:6px 14px; border:2px dashed #bda27a; border-radius:6px; background:#efe0bd; color:#3d2c18; margin-inline-end:8px; cursor:pointer; }
</style>
<input type="file">
```



## mistakes

### إخفاء input

```css bad
input[type=file] { display:none; }  /* مش قابل للوصول */
```

```css good
input::file-selector-button { }
```

نسّق الزرار مباشرة.

## quiz

### file-selector-button بتنسّق؟
- [x] زرار اختيار الملف
- [ ] حقل النص
- [ ] الصورة
- [ ] القايمة

زرار input file.

### ميزتها؟
- [x] بدون JS
- [ ] أسرع
- [ ] أكبر
- [ ] أصغر

تنسيق مباشر.

## refs

- [MDN: ::file-selector-button](https://developer.mozilla.org/en-US/docs/Web/CSS/::file-selector-button)
