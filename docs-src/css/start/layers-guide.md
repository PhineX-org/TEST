---
id: layers-guide
kind: guide
cat: start
title: الـ Cascade Layers
en: Cascade layers
status: stable
summary: الطبقات (@layer) بتخليك تتحكم في أولوية القواعد بشكل صريح بدل حروب الـ specificity: base ثم components ثم utilities.
keywords: layer, cascade layers, @layer, طبقات, اولوية, specificity, framework, base, utilities, تنظيم css
related: at-layer, specificity, cascade-inheritance, kw-important, css-best-practices
---

## intro

مشكلة CSS الكبيرة في المشاريع الكبيرة: قواعد من مكتبات وقواعد منك وكلها بتتصارع على الـ specificity. الحل الحديث: **الطبقات (Cascade Layers)** بـ [[at-layer]].

الفكرة: بتقسّم الستايل لطبقات مرتبة، وطبقة **أحدث ترتيباً** بتكسب على القديمة **بغض النظر عن specificity**:

```
@layer base, components, utilities;
```

السطر ده بيعرّف الترتيب. وبعدين بتحط القواعد جوه كل طبقة: `@layer base { ... }`. فقاعدة `p {}` (ضعيفة) في `utilities` هتكسب على `#id .x p {}` (قوية جداً) في `base`، لأن utilities أحدث.

الاستخدامات:
- تحط **reset وstyle المكتبات** في طبقة بدائية، وتفضل تتخطاها بسهولة بكودك.
- **تنظّم** مشروعك لـ base / components / utilities.

قواعد **بدون طبقة** بتكسب على كل الطبقات (كأنها آخر طبقة). و`!important` بتعكس الترتيب.

> [!analogy] الطبقات زي طبقات Photoshop: اللي فوق بيغطي اللي تحتها، مهما كانت «قوة» اللي تحت.

## try

```html
<style>
  @layer base, theme;
  @layer base { #t.x { color:#a63b2f; } }   /* قوي لكن في طبقة أقدم */
  @layer theme { p { color:#3d7a5a; } }      /* ضعيف لكن في طبقة أحدث */
</style>
<p id="t" class="x">أخضر: الطبقة الأحدث كسبت</p>
```

## syntax

```css nolive
@layer base, components, utilities;

@layer base {
  a { color: inherit; }
}
@layer utilities {
  .hidden { display: none; }
}
```

- الترتيب بيتحدد بأول سطر `@layer a, b, c;`.
- القواعد خارج أي طبقة بتكسب على الطبقات.

## examples

### 1) الطبقة الأحدث تكسب
محدد ضعيف بيكسب لأن طبقته أحدث.

```html
<style>
  @layer one, two;
  @layer one { div.box.big { background:#a63b2f; } }
  @layer two { div { background:#3d7a5a; } }
  .box { height:40px; color:#f3ede0; padding:8px; }
</style>
<div class="box big">أخضر</div>
```



### 2) قاعدة بدون طبقة
اللي برّه الطبقات بيكسب على اللي جواها.

```html
<style>
  @layer a { p { color:#a63b2f; } }
  p { color:#3d7a5a; }
</style>
<p>أخضر</p>
```



### 3) ترتيب الطبقات
بنعرّف الترتيب في أول سطر وبعدين نكتب بأي ترتيب.

```html
<style>
  @layer reset, theme;
  @layer theme { p { color:#7a4a1d; } }
  @layer reset { p { color:#3d7a5a; } }
</style>
<p>بني (theme أحدث)</p>
```



## mistakes

### استخدام !important مع الطبقات

```css bad
@layer a { p { color:red !important; } }
```

```css good
@layer a { p { color:red; } }
```

`!important` بيعكس ترتيب الطبقات وبيلخبط.

### نسيان تعريف الترتيب

```css bad
@layer b { } @layer a { }  /* الترتيب بالتعريف الأول */
```

```css good
@layer a, b;
```

عرّف الترتيب صراحة في أول الملف.

## quiz

### طبقة أحدث تكسب على القديمة حتى لو؟
- [ ] أطول
- [x] specificity أقل
- [ ] !important
- [ ] مفيش

الطبقات أهم من الـ specificity.

### القواعد بدون @layer مقارنة بالطبقات؟
- [ ] أضعف
- [x] أقوى
- [ ] نفس القوة
- [ ] بتتجاهل

غير الطبقية بتكسب.

## refs

- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
