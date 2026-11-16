---
id: content
kind: property
cat: lists-tables
chip: content
title: المحتوى المولّد بـ CSS
en: CSS content property
status: stable
support: all
mdn: content
summary: content بتحط نص أو صورة أو عداد جوه ::before و::after. أساس الأيقونات والزخارف والعدادات بدون HTML إضافي.
keywords: content, before, after, attr, counter, محتوى مولد, زخارف
related: before, after, marker, counter-reset, counter-increment, fn-attr
---

## intro

الخاصية `content` بتولّد **محتوى من CSS نفسه** (من غير ما تكتبه في HTML). بتشتغل مع [[before]] و[[after]] (والـ `::marker` كمان)، وهي **الشرط** لظهور العنصر المولّد: لو معملتش `content` الـ pseudo-element مش هيتعمل أصلاً (حتى `content: ""` فاضية كافية).

القيم الممكنة:
- **نص**: `content: "★ ";` (بين تنصيص).
- **الخاصية من HTML**: `content: attr(data-label);` أو `attr(href)` عشان تطبع رابط الصفحة عند الطباعة.
- **عدّاد**: `content: counter(step);` (مع [[counter-increment]]).
- **صورة**: `content: url(icon.svg);`
- **علامات اقتباس**: `open-quote` و`close-quote`.
- **فاضي**: `content: "";` للزخارف الهندسية بخلفية وحجم.
- وبدائل نصية للوصولية: `content: "★" / "نجمة";`.

نصايح: المحتوى المولّد **مش جزء من الـ DOM**، فمتحطش فيه معلومة مهمة (القارئات ممكن تقراه أو لا). استخدمه للزخارف والإضافات الجمالية فقط.

## try

```html
<style>
  .t { color:#3d2c18; font-weight:bold; }
  .t::before { content:"★ "; color:#c9772f; }
  .t::after { content:" ✓"; color:#3d7a5a; }
</style>
<p class="t">عنوان بزخرفة</p>
```

## syntax

```css nolive
.a::before { content: "★ "; }
.b::after { content: attr(data-label); }
.c::before { content: counter(step); }
.d::after { content: ""; }
```

- **القيمة المبدئية**: `normal`.
- تشتغل على ::before و::after.
- `content: ""` كفاية لإظهار العنصر.

## values

### "نص"
نص مولّد.

### attr(name)
قيمة خاصية HTML.

### counter(name)
قيمة عدّاد.

### url()
صورة.

### none / normal
بدون محتوى.

## use

- زخارف وأيقونات صغيرة.
- طباعة الروابط بـ attr(href).
- ترقيم بعدّادات.

## avoid

- وضع معلومات أساسية في content.
- نسيان content فيختفي الـ pseudo-element.

## examples

### 1) نص مولّد
قبل وبعد.

```html
<style>
  h4 { color:#7a4a1d; margin:6px 0; }
  h4::before { content:"« "; color:#c9772f; }
  h4::after { content:" »"; color:#c9772f; }
</style>
<h4>عنوان بين أقواس</h4>
```



### 2) attr من HTML
نص من data-label.

```html
<style>
  .b { display:inline-block; padding:6px 12px; background:#efe0bd; color:#3d2c18; border-radius:8px; margin:4px; }
  .b::after { content:" (" attr(data-label) ")"; color:#b5551f; font-size:.85em; }
</style>
<span class="b" data-label="جديد">كورس CSS</span><span class="b" data-label="مجاني">كورس HTML</span>
```



### 3) زخرفة هندسية
content فاضي.

```html
<style>
  .d { position:relative; padding-inline-start:20px; color:#3d2c18; }
  .d::before { content:""; position:absolute; inset-inline-start:0; top:.45em; width:10px; height:10px; border-radius:50%; background:#c9772f; }
</style>
<p class="d">نقطة مصنوعة من CSS</p>
```



### 4) علامات اقتباس
open-quote.

```html
<style>
  q { color:#7a4a1d; font-style:italic; }
  blockquote::before { content:open-quote; font-size:1.6em; color:#c9772f; }
  blockquote { color:#3d2c18; margin:4px; }
</style>
<blockquote>اتعلّم شوية كل يوم.</blockquote>
```



## mistakes

### نسيان content

```css bad
.dot::before { width:10px; height:10px; background:#c9772f; }  /* مفيش حاجة هتظهر */
```

```css good
.dot::before { content:""; width:10px; height:10px; background:#c9772f; }
```

لازم content.

### معلومة مهمة في content

```css bad
.price::after { content:"50 جنيه"; }
```

```css good
<span>50 جنيه</span> في HTML
```

القارئات والبحث مش هيلقوها.

## quiz

### ليه نكتب content: ""؟
- [x] عشان الـ pseudo-element يظهر
- [ ] لمسح النص
- [ ] لتلوين
- [ ] لتكبير

الشرط لظهوره.

### بتشتغل مع؟
- [x] ::before و::after
- [ ] div
- [ ] img فقط
- [ ] head

الـ pseudo-elements.

### بتجيب قيمة خاصية HTML بـ؟
- [x] attr()
- [ ] var()
- [ ] calc()
- [ ] url()

attr(name).

## refs

- [MDN: content](https://developer.mozilla.org/en-US/docs/Web/CSS/content)
