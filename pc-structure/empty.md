---
id: empty
kind: pseudoclass
cat: pc-structure
chip: :empty
title: عنصر فاضي
en: CSS :empty pseudo-class
status: stable
support: all
size: compact
mdn: :empty
summary: الحالة empty بتختار العناصر اللي مفيهاش أي أبناء أو نص (حتى المسافات). مفيدة لإخفاء الحاويات الفاضية.
keywords: :empty, empty, فاضي, hide empty, عنصر بلا محتوى
related: first-child, only-child, not, has, pseudo-guide
---

## intro

`:empty` بتختار **العناصر اللي مفيهاش أي حاجة جواها**: لا نص ولا عناصر أبناء. **حتى مسافة بيضاء واحدة** (أو سطر جديد) بتخلّي العنصر مش فاضي في أغلب المتصفحات القديمة (النسخ الحديثة بتتجاهل المسافات البيضاء بحسب معيار جديد، لكن الأفضل متعتمدش على ده). التعليقات `<!-- -->` مبتأثرش.

الاستخدام الشائع: **إخفاء الحاويات الفاضية** اللي بتاخد مساحة بسبب `padding` أو `margin` (مثلاً div للرسايل بيتملى بالـ JS أحياناً): `.msg:empty { display: none; }`.

تنبيه: لو عندك محتوى ديناميكي، تأكد إن مفيش مسافات ورا العناصر لأنها ممكن تخلّي العنصر مش `:empty`. والبديل الأقوى والحديث هو [[has]] مع [[not]] مثلاً `.card:not(:has(*))`.

## try

```html
<style>
  .box { padding:10px; background:#efe0bd; color:#3d2c18; margin:4px 0; border-radius:6px; min-height:20px; }
  .box:empty { background:#d8cbb0; }
  .box:empty::before { content:'(فاضي)'; color:#8a7a62; }
</style>
<div class="box">فيه محتوى</div><div class="box"></div>
```

## syntax

```css nolive
.msg:empty { display: none; }
p:empty { margin: 0; }
.card:empty::before { content: 'لا يوجد محتوى'; }
```

- مفيش أبناء ولا نص.
- انتبه للمسافات.

## use

- إخفاء الحاويات الفاضية.
- رسالة «مفيش بيانات».

## avoid

- الاعتماد عليها مع مسافات بيضاء.

## examples

### 1) إخفاء الفاضي
display:none.

```html
<style>
  .m { padding:10px; background:#e4c490; color:#3d2c18; margin:4px 0; border-radius:6px; }
  .m:empty { display:none; }
</style>
<div class="m">رسالة</div><div class="m"></div><div class="m">رسالة تانية</div>
```



### 2) رسالة افتراضية
مع before.

```html
<style>
  .list { padding:8px; background:#efe0bd; color:#3d2c18; border-radius:6px; min-height:24px; }
  .list:empty::before { content:'لا توجد عناصر بعد'; color:#8a7a62; }
</style>
<div class="list"></div>
```



### 3) مسافة تخرّبها
نص مسافة.

```html
<style>
  .b { padding:10px; background:#efe0bd; margin:4px 0; }
  .b:empty { background:#c9772f; }
</style>
<div class="b"></div><div class="b"> </div>
```



## mistakes

### مسافات داخل العنصر

```css bad
<div class="m"> </div>  /* مش empty في المتصفحات القديمة */
```

```css good
<div class="m"></div>
```

لا تترك مسافات.

## quiz

### empty بتختار؟
- [x] عناصر بلا محتوى
- [ ] أول ابن
- [ ] آخر ابن
- [ ] الجذر

الفاضية.

### الفخ؟
- [x] المسافات البيضاء
- [ ] الألوان
- [ ] الخطوط
- [ ] الحجم

المسافة تخلّيه مش فاضي.

## refs

- [MDN: :empty](https://developer.mozilla.org/en-US/docs/Web/CSS/:empty)
