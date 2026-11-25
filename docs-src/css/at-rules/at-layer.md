---
id: at-layer
kind: atrule
cat: at-rules
chip: @layer
title: طبقات الـ cascade
en: CSS @layer at-rule
status: stable
support: all
mdn: @layer
summary: قاعدة @layer بتقسّم الستايلات لطبقات بترتيب أولوية صريح، فتتحكم في مين يكسب من غير حرب specificity.
keywords: @layer, cascade layers, specificity, أولوية, طبقات
related: at-import, specificity, cascade-inheritance, layers-guide
---

## intro

القاعدة `@layer` بتدّيك **طبقات (Cascade Layers)** تتحكم بيها في **ترتيب أولوية الستايلات** بشكل صريح، من غير ما تدخل في حرب `specificity` أو `!important`.

الفكرة: بتعرّف طبقات بالترتيب: `@layer reset, base, components, utilities;`. وبعدين تحط الستايلات في كل طبقة: `@layer base { a { color: blue; } }`. القاعدة الذهبية: **الطبقة اللي بتتعرّف بعدين بتكسب** على اللي قبلها، **بغض النظر عن الـ specificity**! يعني قاعدة بسيطة في طبقة `utilities` بتغلب selector قوي جداً في طبقة `base`.

نقاط مهمة:
- الستايل **اللي برّه أي طبقة (unlayered)** بيكسب على **كل** الطبقات (أقوى حاجة، إلا لو `!important` وده بيعكس الترتيب).
- ممكن تعمل طبقات متداخلة: `@layer framework { @layer reset { } }`.
- مثالية لدمج مكتبات خارجية (Bootstrap مثلاً) في طبقة وتتغلب عليها بسهولة.
- تقدر تستورد ملف في طبقة: `@import url(lib.css) layer(vendor);`.

## try

```html
<style>
  @layer base, theme;
  @layer base { #x.t { color:#b5551f; } }   /* specificity عالي لكن طبقة أقل */
  @layer theme { .t { color:#3d7a5a; font-weight:bold; } }  /* بسيط لكن طبقة أعلى */
  .t { background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<div id="x" class="t">اللون أخضر: طبقة theme غلبت رغم specificity الـ id</div>
```

## syntax

```css nolive
@layer reset, base, components, utilities;

@layer base {
  a { color: blue; }
}
@layer utilities {
  .red { color: red; }
}
```

- الترتيب الأول = أولوية أقل.
- ستايل بره الطبقات أقوى من كل الطبقات.
- `!important` بيعكس الترتيب.

## use

- دمج مكتبات خارجية.
- تنظيم CSS كبير.
- تفادي حرب specificity.

## avoid

- وضع كل الستايلات في طبقات وبعضها بره بشكل عشوائي.
- نسيان إن unlayered بيكسب.

## examples

### 1) طبقة أعلى بتغلب
رغم specificity أقل.

```html
<style>
  @layer base, theme;
  @layer base { #x.t { color:#b5551f; } }
  @layer theme { .t { color:#3d7a5a; font-weight:bold; } }
  .t { background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<div id="x" class="t">أخضر: theme فوق base</div>
```



### 2) خارج الطبقات يكسب
unlayered أقوى.

```html
<style>
  @layer ui { p { color:#3d7a5a; font-weight:bold; } }
  p { color:#b5551f; }   /* خارج الطبقات */
  p { background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<p>برتقالي: الستايل اللي برّه الطبقات كسب</p>
```



### 3) تحديد الترتيب مقدماً
سطر واحد.

```html
<style>
  @layer reset, base, components, utilities;
  @layer utilities { .big { font-size:1.5rem; } }
  @layer components { .big { font-size:1rem; } }
  .big { color:#3d2c18; background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<div class="big">حجمه كبير: utilities بعد components</div>
```



### 4) طبقات متداخلة
طبقة جوه طبقة.

```html
<style>
  @layer framework { @layer base { .n { color:#b5551f; } } @layer theme { .n { color:#7a4a1d; font-weight:bold; } } }
  .n { background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<div class="n">طبقات متداخلة</div>
```



## mistakes

### ظن إن unlayered أضعف

```css bad
p { color:red; }  /* بيكسب على كل الطبقات */
```

```css good
@layer utilities { p { color:red; } }
```

حط كل شيء في طبقات للاتساق.

### ترتيب غير مقصود

```css bad
@layer b { } @layer a { }  /* b أولاً */
```

```css good
@layer a, b;  /* صريح */
```

حدد الترتيب أول الملف.

## quiz

### أي طبقة بتكسب؟
- [x] اللي اتعرّفت بعدين
- [ ] اللي قبل
- [ ] العشوائية
- [ ] الأولى دايماً

الأحدث ترتيباً.

### الستايل بره الطبقات؟
- [x] أقوى من كل الطبقات
- [ ] أضعف
- [ ] بيتجاهل
- [ ] بيتعطل

unlayered.

### هدفها؟
- [x] تحكم صريح في أولوية cascade
- [ ] تسريع
- [ ] ألوان
- [ ] حركة

بدل specificity.

## refs

- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
