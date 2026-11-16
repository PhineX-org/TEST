---
id: lang
kind: pseudoclass
cat: pc-logical
chip: :lang
title: لغة العنصر
en: CSS :lang() pseudo-class
status: stable
support: all
size: compact
mdn: :lang
summary: الدالة lang بتختار العناصر حسب لغتها (attribute lang في HTML). مفيدة لتخصيص الخطوط وعلامات الاقتباس لكل لغة.
keywords: :lang, lang, لغة, ar, en, multi-language, خط عربي
related: dir, quotes, font-family
---

## intro

`:lang(code)` بتختار العناصر **حسب لغتها**، سواء اللغة معرّفة على العنصر نفسه أو موروثة من أبيه (الخاصية `lang` في HTML). مثلاً `:lang(ar)` بتختار كل العناصر العربية، و`:lang(en)` الإنجليزية. مفيدة جداً في **المواقع متعددة اللغات**: تخصيص الخط (`:lang(ar) { font-family: Cairo }`) أو علامات الاقتباس ([[quotes]]) أو حجم الخط لكل لغة. وبتتوارث اللغة من `<html lang="ar">` فلازم تضبطها صح. وكمان بتفيد قارئات الشاشة عشان تنطق النص باللغة الصحيحة، فضبط `lang` مش بس للـ CSS.

## try

```html
<style>
  :lang(ar) { color:#3d7a5a; font-weight:bold; }
  :lang(en) { color:#b5551f; font-family:Georgia,serif; direction:ltr; }
  div { margin:3px 0; }
</style>
<div lang="ar">مرحبا (عربي)</div><div lang="en">Hello (English)</div>
```

## syntax

```css nolive
:lang(ar) { font-family: Cairo, sans-serif; }
:lang(en) { font-family: Georgia, serif; }
q:lang(ar) { quotes: '«' '»'; }
```

- حسب lang في HTML.
- بتتوارث من الأب.

## use

- خطوط مختلفة لكل لغة.
- اقتباسات حسب اللغة.

## avoid

- نسيان lang على html.

## examples

### 1) خط لكل لغة
عربي وإنجليزي.

```html
<style>
  :lang(ar) { font-family:Tahoma,sans-serif; color:#3d7a5a; }
  :lang(en) { font-family:Georgia,serif; color:#b5551f; direction:ltr; text-align:left; }
</style>
<p lang="ar" style="margin:3px 0">نص عربي</p><p lang="en" style="margin:3px 0">English text</p>
```



### 2) وراثة اللغة
lang على الأب.

```html
<style>
  :lang(ar) span { color:#7a4a1d; font-weight:bold; }
</style>
<div lang="ar"><span>ابن موروث</span></div>
```



### 3) اقتباس
علامات حسب اللغة.

```html
<style>
  q:lang(ar) { quotes:'«' '»'; color:#3d7a5a; }
  q:lang(en) { quotes:'“' '”'; color:#b5551f; }
</style>
<q lang="ar">اقتباس</q> <q lang="en">quote</q>
```



## mistakes

### نسيان lang

```css bad
<html>  /* مفيش لغة */
```

```css good
<html lang="ar" dir="rtl">
```

حدد اللغة.

## quiz

### lang() بتختار؟
- [x] حسب اللغة
- [ ] حسب الاتجاه
- [ ] حسب النوع
- [ ] حسب الحجم

attribute lang.

### بتتوارث؟
- [x] أيوه من الأب
- [ ] لأ
- [ ] أحياناً
- [ ] فقط body

من الأب.

## refs

- [MDN: :lang](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang)
