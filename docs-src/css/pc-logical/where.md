---
id: where
kind: pseudoclass
cat: pc-logical
chip: :where
title: أي من القائمة بوزن صفر
en: CSS :where() pseudo-class
status: stable
support: all
mdn: :where
summary: الدالة where زي is بالظبط لكن specificity بتاعتها صفر، فسهل تتجاوزها. ممتازة لإعدادات أساسية قابلة للتغيير.
keywords: :where, where, specificity zero, reset, اختصار المحددات
related: is, not, specificity, layers-guide
---

## intro

`:where()` هي **توأم `:is()`** في كل حاجة (قايمة محددات، متسامحة مع الأخطاء) **ما عدا الـ specificity**: وزنها **صفر دايماً**، مهما كان اللي جواها (حتى `#id`). ده بيخلّيها مثالية لكتابة **قواعد أساسية (defaults/resets)** سهل أي حد يتجاوزها بقاعدة أبسط، من غير ما يحتاج `!important` أو محدد أقوى.

مثلاً مكتبة CSS بتكتب `:where(ul, ol) { margin: 0; padding-inline-start: 1.5rem; }` والمستخدم يقدر يغيّرها بـ `ul { padding: 0 }` وتشتغل فوراً، لأن `ul` (0,0,1) أقوى من `:where(ul)` (0,0,0).

متى تستخدم أي واحدة؟
- **`:is`**: لما عايز اختصار مع **الحفاظ على قوة** المحدد.
- **`:where`**: لما عايز اختصار مع **قوة صفر** (إعدادات أساسية/reset).

ومرتبطة بـ [[layers-guide]] اللي هي طريقة تانية للتحكم في الأولويات. وبتدعم المتصفحات الحديثة.

> [!tip] استخدم `:where` في الـ reset والـ base styles، و`:is` في تنسيقات المكونات.

## try

```html
<style>
  :where(h4, p) { color:#7a4a1d; }   /* وزن 0 */
  p { color:#3d7a5a; font-weight:bold; }    /* أضعف محدد بيغلبها */
</style>
<h4 style="margin:0">عنوان (بني)</h4><p style="margin:0">فقرة (أخضر)</p>
```

## syntax

```css nolive
:where(ul, ol) { margin: 0; }
:where(h1, h2, h3) { line-height: 1.2; }
:where(.btn, button) { cursor: pointer; }
```

- specificity = صفر.
- سهلة التجاوز.
- مناسبة للـ reset.

## use

- reset وإعدادات أساسية.
- مكتبات CSS قابلة للتخصيص.
- اختصار بدون رفع الوزن.

## avoid

- استخدامها لقاعدة عايزها تفرض نفسها.
- الخلط بين is وwhere دون قصد.

## examples

### 1) وزن صفر
أي محدد يغلبها.

```html
<style>
  :where(.card p) { color:#b5551f; }
  p { color:#3d7a5a; font-weight:bold; }
</style>
<div class="card"><p style="margin:0">أخضر لأن p أقوى من where</p></div>
```



### 2) مقارنة مع is
is بتغلب p، where لا.

```html
<style>
  :is(.c p) { color:#b5551f; } :where(.d p) { color:#b5551f; }
  p { color:#3d7a5a; font-weight:bold; margin:2px 0; }
</style>
<div class="c"><p>is → برتقالي</p></div><div class="d"><p>where → أخضر</p></div>
```



### 3) reset للقوائم
سهل التغيير.

```html
<style>
  :where(ul, ol) { margin:0; padding-inline-start:1.2rem; color:#3d2c18; }
  .special { padding-inline-start:2.2rem; }
</style>
<ul><li>عادي</li></ul><ul class="special"><li>مخصص</li></ul>
```



### 4) مع زرار
اختصار.

```html
<style>
  :where(button, .btn) { padding:6px 14px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; cursor:pointer; }
</style>
<button>زرار</button> <span class="btn">كلاس</span>
```



## mistakes

### where لقاعدة عايزها تغلب

```css bad
.a :where(p) { color:red; }  /* بتتغلب بسهولة */
```

```css good
.a :is(p) { color:red; }
```

is بتحافظ على الوزن.

### تعارض مش واضح

```css bad
p { } :where(p) { }
```

```css good
// اعرف أيهم أقوى
```

where وزنها صفر.

## quiz

### specificity :where؟
- [x] صفر
- [ ] أعلى محدد
- [ ] 1
- [ ] 10

دايماً صفر.

### مناسبة لـ؟
- [x] reset وbase styles
- [ ] قواعد قوية
- [ ] حركات
- [ ] نصوص

سهلة التجاوز.

### الفرق عن is؟
- [x] الوزن
- [ ] الصيغة
- [ ] الدعم
- [ ] لا فرق

specificity.

## refs

- [MDN: :where](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)
