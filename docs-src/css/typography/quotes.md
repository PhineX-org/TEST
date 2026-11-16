---
id: quotes
kind: property
cat: typography
chip: quotes
title: علامات الاقتباس
en: CSS quotes property
status: stable
support: all
size: compact
mdn: quotes
summary: quotes بتحدد علامات الاقتباس اللي بيستخدمها وسم q وcontent مع open-quote وclose-quote. مناسبة للاقتباسات متعددة اللغات.
keywords: quotes, open-quote, close-quote, اقتباس, q, blockquote
related: content, before, after, font-family
---

## intro

الخاصية `quotes` بتحدد **أزواج علامات الاقتباس** (فتح/إغلاق) اللي بيستخدمها وسم `<q>` وقيم `content: open-quote / close-quote` في [[before]] و[[after]]. مثلاً للعربي: `quotes: "«" "»"` (الجيمة الفرنسية)، أو `"“" "”"` للإنجليزي. وتقدر تحدد مستوى تاني للاقتباس المتداخل.

بتخلّي التصميم متسق ومحلي للغة، بدل ما تكتب العلامات يدوياً. والمتصفح بيختار تلقائياً علامات حسب `lang` لو متحددتش. وده بيخلّي مواقع متعددة اللغات تحترم عادات كل لغة في الاقتباس.

## try

```html
<style>
  q { quotes:"«" "»" "‹" "›"; color:#7a4a1d; font-size:1.3rem; }
</style>
<p style="margin:0;color:#3d2c18;font-size:1.2rem">قال: <q>الصبر <q>مفتاح</q> الفرج</q></p>
```

## syntax

```css nolive
quotes: "«" "»";
quotes: "“" "”" "‘" "’";
quotes: none;
```

- **القيمة المبدئية**: بيعتمد على المتصفح/اللغة.
- **بتتوارث؟** أيوه.

## values

### `<string> <string>`
فتح وإغلاق (ومستوى تاني اختياري).

### none
بدون علامات.

## use

- علامات حسب اللغة.
- اقتباسات متداخلة.

## avoid

- كتابة العلامات يدوياً في كل مكان.

## examples

### 1) جيمة فرنسية
«» للعربي.

```html
<style>
  q { quotes:"«" "»"; color:#7a4a1d; font-size:1.2rem; }
</style>
<p style="margin:0;color:#3d2c18">قال المعلم: <q>اقرأ</q></p>
```



### 2) إنجليزي
علامات “ ”.

```html
<style>
  q { quotes:"“" "”"; color:#7a4a1d; font-size:1.2rem; }
</style>
<p style="margin:0;color:#3d2c18;direction:ltr;text-align:left">He said <q>Hello</q></p>
```



### 3) بـ content
مع before وafter.

```html
<style>
  .t { quotes:"«" "»"; color:#7a4a1d; font-size:1.2rem; }
  .t::before { content:open-quote; } .t::after { content:close-quote; }
</style>
<span class="t">اقتباس مخصص</span>
```



## mistakes

### علامات يدوية

```css bad
<p>"مرحبا"</p>
```

```css good
q { quotes:"«" "»"; }  <q>مرحبا</q>
```

CSS تتحكم بالشكل.

## quiz

### quotes بتحدد؟
- [x] أزواج علامات الاقتباس
- [ ] الخط
- [ ] اللون
- [ ] الحجم

فتح وإغلاق.

### بتُستخدم مع؟
- [x] q وopen-quote
- [ ] table
- [ ] grid
- [ ] float

q وcontent.

## refs

- [MDN: quotes](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes)
