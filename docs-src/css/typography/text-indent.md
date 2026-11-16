---
id: text-indent
kind: property
cat: typography
chip: text-indent
title: مسافة بداية الفقرة
en: CSS text-indent property
status: stable
support: all
size: compact
mdn: text-indent
summary: text-indent بتحدد المسافة قبل أول سطر في الفقرة، زي الإزاحة في الكتب. في RTL بتبقى من اليمين.
keywords: text-indent, إزاحة, indent, أول سطر, فقرة
related: text-align, padding, margin, direction
---

## intro

الخاصية `text-indent` بتحدد **إزاحة أول سطر** من الفقرة، زي المسافة اللي بنسيبها أول الفقرة في الكتب. القيمة بتتحسب من **بداية السطر** (يعني اليمين في العربي RTL). ممكن تكتب بـ `em` (مثلاً `2em` = عرض حرفين تقريباً) أو px أو %.

وليها استخدام تاني معروف: **إخفاء نص** رمزي بقيمة سالبة ضخمة (`text-indent: -9999px`) في تقنيات قديمة لاستبدال النص بصورة، لكن دي طريقة قديمة وسيئة للوصولية، واستخدم بدلها أساليب حديثة. وبتتوارث.

## try

```html
<style>
  p { margin:0; color:#3d2c18; background:#efe0bd; padding:8px; text-indent:2em; line-height:1.8; }
</style>
<p>الفقرة دي أول سطر فيها متزحزح لجوه بمسافة حرفين، وباقي السطور على الحافة عادي زي الكتب بالظبط.</p>
```

## syntax

```css nolive
text-indent: 2em;
text-indent: 20px;
text-indent: 5%;
text-indent: 0;
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** أيوه.

## values

### `<length>`
إزاحة بالوحدة.

### `<percentage>`
نسبة من عرض الصندوق.

## use

- إزاحة فقرات بأسلوب الكتب.
- تنسيق نصوص أدبية.

## avoid

- text-indent سالب ضخم لإخفاء النص.

## examples

### 1) إزاحة
2em مقابل 0.

```html
<style>
  p { margin:4px 0; color:#3d2c18; background:#efe0bd; padding:6px; line-height:1.7; }
</style>
<p style="text-indent:2em">بإزاحة: سطر أول جوه شوية وكمان سطر ثاني للتوضيح والشرح.</p><p>بدون إزاحة: سطر أول على الحافة وكمان سطر ثاني للتوضيح والشرح.</p>
```



### 2) إزاحة بالنسبة
10% من العرض.

```html
<style>
  p { margin:0; color:#3d2c18; background:#efe0bd; padding:6px; line-height:1.7; text-indent:10%; }
</style>
<p>إزاحة بنسبة مئوية من عرض الصندوق نفسه مش من الخط.</p>
```



### 3) إزاحة سالبة
أول سطر بيطلع بره للتعليق.

```html
<style>
  p { margin:0; color:#3d2c18; background:#efe0bd; padding:6px 24px; line-height:1.7; text-indent:-18px; }
</style>
<p>• أول سطر طالع لبره زي القوائم المعلّقة وباقي السطور جوه.</p>
```



## mistakes

### إخفاء بإزاحة -9999px

```css bad
.logo { text-indent:-9999px; }
```

```css good
.logo { /* نص مخفي للقارئ فقط */ }
```

متخفيش النص بهالطريقة.

## quiz

### text-indent بتحدد؟
- [x] إزاحة أول سطر
- [ ] لون النص
- [ ] حجم الخط
- [ ] ارتفاع السطر

إزاحة السطر الأول.

### الافتراضي؟
- [ ] 2em
- [x] 0
- [ ] 10px
- [ ] auto

0.

## refs

- [MDN: text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent)
