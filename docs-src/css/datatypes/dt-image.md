---
id: dt-image
kind: datatype
cat: datatypes
chip: <image>
title: الصور
en: CSS <image> data type
status: stable
support: all
mdn: image
summary: نوع image هو أي قيمة تمثل صورة: url() أو دوال التدرجات أو image-set() أو cross-fade().
keywords: image, url, gradient, image-set, background-image
related: fn-url, fn-linear-gradient, fn-radial-gradient, fn-conic-gradient, background-image
---

## intro

النوع `<image>` هو **أي قيمة بتمثّل صورة** في CSS، وبتتقبل في `background-image` و`list-style-image` و`border-image` و`mask-image` و`content` و`cursor`. الأشكال:

- **ملف**: [[fn-url]]: `url("photo.jpg")`.
- **تدرجات** (كلها صور!): [[fn-linear-gradient]]، [[fn-radial-gradient]]، [[fn-conic-gradient]] والمتكررة منها.
- **`image-set()`**: اختيار صورة حسب دقة الشاشة: `image-set("a.png" 1x, "a-2x.png" 2x)`.
- **`cross-fade()`** و**`element()`** (أقل دعماً).
- **`none`**: بدون صورة.

نقطة مهمة: التدرج **صورة** مش **لون**، فمينفعش في `background-color`؛ لازم `background` أو `background-image`. وتقدر تحط **أكتر من صورة** مفصولة بفواصل: الأولى فوق. وده بيخلّي نوع الصورة أوسع بكتير من مجرد «ملف صورة»؛ ممكن تكون رسم مولّد بالكود من غير أي ملف خالص، وبكده توفّر طلبات شبكة وحجم صفحة. وكمان تدمج صورة وتدرج: `background: linear-gradient(transparent, rgba(0,0,0,.4)), url(photo.jpg)`.

## try

```html
<style>
  .b { width:170px; height:80px; border-radius:10px;
       background:linear-gradient(rgba(61,44,24,.5),transparent), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' fill='%23c9772f'/></svg>") 0 0/30px 30px, #efe0bd; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
background-image: url("photo.jpg");
background-image: linear-gradient(#c9772f, #efe0bd);
background-image: linear-gradient(transparent, rgba(61,44,24,.5)), url("photo.jpg");
background-image: image-set("a.png" 1x, "a-2x.png" 2x);
```

- التدرج صورة مش لون.
- أكتر من صورة بفواصل: الأولى فوق.

## use

- صور خلفية.
- تدرجات.
- صور بدقتين image-set.

## avoid

- تدرج في background-color.
- صور ضخمة بدون ضغط.

## examples

### 1) تدرج وصورة
طبقتين.

```html
<style>
  .b { width:170px; height:80px; border-radius:10px; background:linear-gradient(rgba(61,44,24,.5),transparent), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' fill='%23c9772f'/></svg>") 0 0/30px 30px, #efe0bd; }
</style>
<div class="b"></div>
```



### 2) تدرج فقط
linear.

```html
<style>
  .g { width:170px; height:70px; border-radius:10px; background-image:linear-gradient(90deg,#c9772f,#efe0bd); }
</style>
<div class="g"></div>
```



### 3) image-set
حسب الدقة.

```html nolive
<style>
.hero { background-image: image-set("hero.jpg" 1x, "hero@2x.jpg" 2x); }
</style>
```



### 4) list-style-image
صورة علامة.

```html
<style>
  ul { list-style-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><rect width='12' height='12' rx='3' fill='%233d7a5a'/></svg>"); color:#3d2c18; background:#efe0bd; padding:8px 28px 8px 8px; border-radius:8px; }
</style>
<ul><li>صورة علامة</li><li>تاني</li></ul>
```



## mistakes

### تدرج كلون

```css bad
background-color:linear-gradient(#c9772f,#efe0bd);
```

```css good
background:linear-gradient(#c9772f,#efe0bd);
```

صورة.

### ترتيب الطبقات

```css bad
background:url(photo.jpg), linear-gradient(transparent,black);  /* التدرج تحت */
```

```css good
background:linear-gradient(transparent,black), url(photo.jpg);
```

الأولى فوق.

## quiz

### التدرجات تعتبر؟
- [x] صور
- [ ] ألوان
- [ ] خطوط
- [ ] حدود

نوع image.

### أول صورة في القايمة؟
- [x] الأعلى
- [ ] الأسفل
- [ ] الأصغر
- [ ] الأكبر

فوق.

### اختيار حسب الدقة؟
- [x] image-set()
- [ ] url()
- [ ] calc()
- [ ] var()

1x و2x.

## refs

- [MDN: `<image>`](https://developer.mozilla.org/en-US/docs/Web/CSS/image)
