---
id: table-layout
kind: property
cat: lists-tables
chip: table-layout
title: طريقة توزيع أعمدة الجدول
en: CSS table-layout property
status: stable
support: all
size: compact
mdn: table-layout
summary: table-layout: fixed بتخلّي الأعمدة بعرض ثابت من أول صف (أسرع وأكثر توقعاً)، وauto بتحسب حسب المحتوى.
keywords: table-layout, fixed, auto, جدول, أعمدة, عرض
related: border-collapse, border-spacing, width, overflow
---

## intro

الخاصية `table-layout` بتحدد **الطريقة اللي المتصفح بيحسب بيها عرض أعمدة الجدول**. الافتراضي **`auto`**: المتصفح بيقرا **كل محتوى الجدول** عشان يحسب العرض المناسب (بطيء شوية ومش متوقع، والعمود بيتمدد بمحتوى طويل). و**`fixed`**: العرض بيتحدد من **صف الرأس (أو عرض الأعمدة اللي كتبتها)** وبعرض الجدول `width`، من غير ما ينتظر المحتوى. النتيجة: **أسرع وثابت** وأعمدة متساوية. لازم تحدد `width` للجدول (مثلاً `100%`) عشان `fixed` تشتغل. ولو المحتوى طويل في خلية ثابتة استخدم `overflow: hidden; text-overflow: ellipsis;` أو `word-break`. مناسب للجداول الكبيرة ولوحات البيانات.

## try

```html
<style>
  table { width:100%; border-collapse:collapse; table-layout:fixed; color:#3d2c18; }
  td, th { border:1px solid #bda27a; padding:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  th { background:#e4c490; }
</style>
<table><tr><th>الاسم</th><th>الوصف</th><th>السعر</th></tr><tr><td>كورس</td><td>وصف طويل جداً جداً بيتقص بنقط</td><td>50</td></tr></table>
```

## syntax

```css nolive
table { table-layout: fixed; width: 100%; }
table { table-layout: auto; }
```

- **القيمة المبدئية**: `auto`.
- fixed تحتاج width.

## values

### auto
حسب المحتوى (افتراضي).

### fixed
أعمدة ثابتة من الرأس.

## use

- جداول كبيرة وسريعة.
- أعمدة متساوية.

## avoid

- fixed من غير width للجدول.

## examples

### 1) fixed
أعمدة متساوية.

```html
<style>
  table { width:100%; border-collapse:collapse; table-layout:fixed; color:#3d2c18; }
  td, th { border:1px solid #bda27a; padding:6px; text-align:center; }
  th { background:#e4c490; }
</style>
<table><tr><th>أ</th><th>ب</th><th>ج</th></tr><tr><td>1</td><td>نص طويل جداً جداً للمقارنة</td><td>3</td></tr></table>
```



### 2) auto
حسب المحتوى.

```html
<style>
  table { width:100%; border-collapse:collapse; table-layout:auto; color:#3d2c18; }
  td, th { border:1px solid #bda27a; padding:6px; text-align:center; }
  th { background:#e4c490; }
</style>
<table><tr><th>أ</th><th>ب</th><th>ج</th></tr><tr><td>1</td><td>نص طويل جداً جداً للمقارنة</td><td>3</td></tr></table>
```



### 3) تقطيع النص
ellipsis مع fixed.

```html
<style>
  table { width:100%; table-layout:fixed; border-collapse:collapse; color:#3d2c18; }
  td { border:1px solid #bda27a; padding:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
</style>
<table><tr><td>نص طويل جداً بيتقص بنقط في الآخر لأن الأعمدة ثابتة</td><td>ثابت</td></tr></table>
```



## mistakes

### fixed بدون عرض

```css bad
table { table-layout:fixed; }
```

```css good
table { table-layout:fixed; width:100%; }
```

لازم width.

## quiz

### fixed بتحسب الأعمدة من؟
- [x] صف الرأس وعرض الجدول
- [ ] كل المحتوى
- [ ] الخلفية
- [ ] الحد

من غير انتظار المحتوى.

### الافتراضي؟
- [x] auto
- [ ] fixed
- [ ] none
- [ ] inherit

auto.

## refs

- [MDN: table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
