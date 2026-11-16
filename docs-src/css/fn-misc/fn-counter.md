---
id: fn-counter
kind: function
cat: fn-misc
chip: counter()
title: دالة counter(): عرض قيمة عدّاد
en: CSS counter() function
status: stable
support: all
size: compact
mdn: counter
summary: counter(name, style) بتعرض قيمة عدّاد CSS جوه content: content: counter(step) ". ". مع counter-reset وcounter-increment.
keywords: counter, counters, content, ترقيم, عداد
related: counter-reset, counter-increment, content, list-style-type
---

## intro

الدالة `counter()` بتعرض **القيمة الحالية** لعدّاد CSS، وبتتكتب **جوه** [[content]] لـ `::before`/`::after`: `content: counter(step) ". ";`. الصيغة: `counter(<name>, <style?>)` والنمط اختياري (`decimal` افتراضي، أو `upper-roman`, `lower-alpha`, `arabic-indic`...): `counter(step, arabic-indic)` ⇒ ١ ٢ ٣. وفيه `counters(name, ".")` للترقيم **المتداخل** (1.1، 1.2). بتشتغل مع [[counter-reset]] (ينشئ العدّاد) و[[counter-increment]] (يزوّده). يعني ثلاثتهم فريق واحد: واحد ينشئ العداد، واحد يزوّده، وcounter() هي اللي تعرضه للمستخدم، زي شاشة بتعرض رقم الدور في طابور.

## try

```html
<style>
  .l { counter-reset:s; }
  .l p { counter-increment:s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s, arabic-indic) " - "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>أول</p><p>تاني</p><p>تالت</p></div>
```

## syntax

```css nolive
.item::before { content: counter(step) ". "; }
.item::before { content: counter(step, upper-roman); }
li::before { content: counters(sec, ".") " "; }
```

- داخل content فقط.
- الأسلوب بعد الاسم.
- counters() للمتداخل.

## use

- ترقيم مخصص.
- ترقيم عناوين وفصول.

## avoid

- استخدامها خارج content.

## examples

### 1) عربي
arabic-indic.

```html
<style>
  .l { counter-reset:s; }
  .l p { counter-increment:s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s, arabic-indic) " - "; color:#c9772f; font-weight:bold; }
</style>
<div class="l"><p>أول</p><p>تاني</p><p>تالت</p></div>
```



### 2) متداخل
counters().

```html
<style>
  ol { counter-reset:n; list-style:none; padding-inline-start:18px; margin:2px 0; color:#3d2c18; }
  li { counter-increment:n; }
  li::before { content:counters(n,".") " "; color:#b5551f; font-weight:bold; }
</style>
<ol><li>أول<ol><li>فرعي</li><li>فرعي 2</li></ol></li><li>تاني</li></ol>
```



### 3) رومانية
upper-roman.

```html
<style>
  .l { counter-reset:s; }
  .l p { counter-increment:s; margin:4px 0; color:#3d2c18; }
  .l p::before { content:counter(s, upper-roman) ". "; color:#3d7a5a; font-weight:bold; }
</style>
<div class="l"><p>أ</p><p>ب</p><p>ج</p></div>
```



## mistakes

### خارج content

```css bad
.a { color:counter(x); }  /* غلط */
```

```css good
.a::before { content:counter(x); }
```

داخل content.

## quiz

### counter() بتتكتب في؟
- [x] content
- [ ] color
- [ ] width
- [ ] margin

content.

### الترقيم المتداخل؟
- [x] counters()
- [ ] counter()
- [ ] nested()
- [ ] list()

counters.

## refs

- [MDN: counter()](https://developer.mozilla.org/en-US/docs/Web/CSS/counter)
