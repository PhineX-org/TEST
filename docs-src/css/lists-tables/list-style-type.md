---
id: list-style-type
kind: property
cat: lists-tables
chip: list-style-type
title: نوع علامة القائمة
en: CSS list-style-type property
status: stable
support: all
size: compact
mdn: list-style-type
summary: list-style-type بتحدد شكل العلامة: disc وcircle وsquare للنقط، وdecimal وlower-alpha وlower-roman للأرقام والحروف، أو نص مخصص.
keywords: list-style-type, disc, decimal, lower-alpha, roman, arabic-indic
related: list-style, list-style-position, marker, counter-reset
---

## intro

الخاصية `list-style-type` بتحدد **شكل العلامة** نفسه قدام كل عنصر في القائمة. للقوائم غير المرتبة: `disc` (نقطة ممتلئة) و`circle` (دايرة فاضية) و`square` (مربع). وللمرتبة: `decimal` (1 2 3) و`decimal-leading-zero` (01 02) و`lower-alpha` (a b c) و`upper-alpha` و`lower-roman` (i ii iii) و`upper-roman`. وفيه أنظمة لغات زي **`arabic-indic`** (١ ٢ ٣) لو عايز أرقام عربية. وتقدر تكتب **نص** بين علامات تنصيص: `list-style-type: "✓ ";` وهتتحط قدام كل عنصر. ولتحكم أكتر في شكل العلامة (لون وحجم) استخدم [[marker]].

## try

```html
<style>
  ol { color:#3d2c18; background:#efe0bd; border-radius:8px; margin:3px; padding:8px 34px 8px 8px; display:inline-block; vertical-align:top; }
</style>
<ol style="list-style-type:arabic-indic"><li>أول</li><li>تاني</li></ol><ol style="list-style-type:upper-roman"><li>أول</li><li>تاني</li></ol><ul style="list-style-type:'✓ '"><li>تمام</li><li>تمام</li></ul>
```

## syntax

```css nolive
list-style-type: disc;
list-style-type: decimal;
list-style-type: lower-roman;
list-style-type: arabic-indic;
list-style-type: "✓ ";
```

- **القيمة المبدئية**: `disc`.
- النص المخصص بين علامات تنصيص.

## values

### disc / circle / square
للنقط.

### decimal / lower-alpha / lower-roman
أرقام وحروف.

### arabic-indic
أرقام عربية ٠١٢.

### none
بدون علامة.

## use

- `decimal` للخطوات.
- `arabic-indic` للمحتوى العربي الرسمي.
- نص مخصص زي ✓ للمزايا.

## avoid

- استخدام `none` وفقدان معنى الترتيب.

## examples

### 1) حروف وأرقام
أنظمة عدّ مختلفة.

```html
<style>
  ol { color:#3d2c18; background:#efe0bd; border-radius:8px; margin:3px; padding:8px 34px 8px 8px; display:inline-block; vertical-align:top; }
</style>
<ol style="list-style-type:decimal-leading-zero"><li>أ</li><li>ب</li></ol><ol style="list-style-type:lower-alpha"><li>أ</li><li>ب</li></ol><ol style="list-style-type:lower-roman"><li>أ</li><li>ب</li></ol>
```



### 2) أرقام عربية
arabic-indic.

```html
<style>
  ol { color:#3d2c18; background:#f3e6c9; border-radius:8px; padding:10px 34px 10px 10px; list-style-type:arabic-indic; }
</style>
<ol><li>اتفتح الملف</li><li>اكتب الكود</li><li>جرّب النتيجة</li></ol>
```



### 3) علامة نصية
✓ بدل النقطة.

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; padding:10px 30px 10px 10px; list-style-type:"✓ "; }
  li::marker { color:#3d7a5a; }
</style>
<ul><li>أمثلة كتير</li><li>شرح بالعامية</li><li>مجاني</li></ul>
```



## mistakes

### نص بدون مسافة

```css bad
ul { list-style-type:"✓"; }  /* النص لازق في العلامة */
```

```css good
ul { list-style-type:"✓ "; }
```

ضيف مسافة جوه التنصيص.

## quiz

### أرقام عربية ١ ٢ ٣؟
- [x] arabic-indic
- [ ] decimal
- [ ] roman
- [ ] alpha

arabic-indic.

### تحط علامة نص مخصصة إزاي؟
- [x] بين علامات تنصيص
- [ ] بين أقواس
- [ ] بـ url()
- [ ] مستحيل

list-style-type: "✓ ".

## refs

- [MDN: list-style-type](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type)
