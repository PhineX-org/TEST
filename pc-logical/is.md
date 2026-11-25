---
id: is
kind: pseudoclass
cat: pc-logical
chip: :is
title: أي من القائمة
en: CSS :is() pseudo-class
status: stable
support: all
mdn: :is
summary: الدالة is بتختصر محددات متكررة: :is(h1, h2, h3) بدل تكرار الكتابة. الـ specificity بتاعها = أعلى محدد جواها.
keywords: :is, is, matches, اختصار المحددات, selector list, specificity
related: where, not, has, specificity, selectors-guide, nesting-guide
---

## intro

`:is()` بتاخد **قايمة محددات** وبتختار أي عنصر يطابق **واحد منها على الأقل**. فايدتها الأولى **اختصار الكتابة المتكررة**. بدل:

```
header a:hover, nav a:hover, footer a:hover { color: red; }
```

تكتب: `:is(header, nav, footer) a:hover { color: red; }`.

مميزات:
- **تفاديها لتكرار مكلف** في المحددات الطويلة (قوائم متداخلة، تنسيق مكونات).
- **متسامحة مع الأخطاء**: لو محدد جوه القايمة غير صالح أو غير مدعوم، المتصفح **بيتجاهله فقط** ويكمل الباقي. (القاعدة العادية بالفاصلة بتبوظ كلها لو فيها محدد خطأ.)
- بتتعامل بسلاسة مع **pseudo-elements في الأحدث**.

**الـ specificity**: بتاخد **specificity أعلى محدد** داخل القايمة (حتى لو العنصر الفعلي طابق محدد أبسط). فلو جواها `#id` فكل القايمة بقوة id. وده فرق جوهري عن [[where]] اللي specificity بتاعها **صفر**.

أسماء قديمة: `:matches()` و`:-webkit-any()`. وبتشتغل في كل المتصفحات الحديثة.

## try

```html
<style>
  :is(h4, h5, p) { margin:4px 0; }
  .box :is(h4, p) { color:#3d7a5a; font-weight:bold; }
</style>
<div class="box"><h4>عنوان</h4><p>فقرة</p><span>span (غير متأثر)</span></div>
```

## syntax

```css nolive
:is(h1, h2, h3) { margin-top: 0; }
.card :is(h2, p) { color: #3d2c18; }
:is(ul, ol) li { }
```

- قايمة محددات.
- specificity = الأعلى جواها.
- متسامحة مع المحدد الخطأ.

## use

- اختصار محددات متكررة.
- تنسيق مجموعة عناصر داخل حاوية.
- محددات متسامحة.

## avoid

- الاعتماد عليها لو محتاج specificity منخفضة (استخدم where).
- قوائم ضخمة بلا داعي.

## examples

### 1) اختصار
عدة وسوم بسطر واحد.

```html
<style>
  :is(h4, p, li) { color:#7a4a1d; }
  div { background:#efe0bd; padding:6px; }
</style>
<div><h4>عنوان</h4><p>فقرة</p><ul><li>عنصر</li></ul></div>
```



### 2) مع hover
أي رابط في هيدر أو فوتر.

```html
<style>
  :is(header, footer) a { color:#3d7a5a; font-weight:bold; }
  :is(header, footer) a:hover { color:#b5551f; }
</style>
<header><a href="#" onclick="return false">رابط الهيدر</a></header><footer><a href="#" onclick="return false">رابط الفوتر</a></footer>
```



### 3) specificity
id داخلها يرفع القوة.

```html
<style>
  :is(#x, .y) { color:#b5551f; }   /* قوة id */
  .y { color:#3d7a5a; }
</style>
<p class="y" style="margin:0">لونها برتقالي لأن is أخدت قوة id</p>
```



### 4) متسامحة
محدد غير صالح بيتجاهل.

```html
<style>
  :is(.a, ::غير-موجود) { color:#3d7a5a; font-weight:bold; }
</style>
<p class="a" style="margin:0">اشتغلت رغم المحدد الخطأ</p>
```



## mistakes

### توقع specificity منخفضة

```css bad
article :is(p, #x) { color:red; }  /* وزنها وزن id */
```

```css good
article :where(p, #x) { color:red; }
```

where بوزن صفر.

### تكرار المحددات

```css bad
.a h2, .a h3, .a h4 { }
```

```css good
.a :is(h2,h3,h4) { }
```

أقصر وأوضح.

## quiz

### is() بتعمل؟
- [x] تختصر قايمة محددات
- [ ] تلوّن
- [ ] تخفي
- [ ] تكرر

اختصار.

### specificity بتاعتها؟
- [x] أعلى محدد جواها
- [ ] صفر
- [ ] دايماً 1
- [ ] الأقل

الأعلى.

### لو محدد جواها غلط؟
- [x] يتجاهل المحدد فقط
- [ ] القاعدة كلها تبوظ
- [ ] خطأ
- [ ] لا شيء

متسامحة.

## refs

- [MDN: :is](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)
