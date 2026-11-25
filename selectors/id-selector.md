---
id: id-selector
kind: selector
cat: selectors
chip: #id
title: محدد الـ id
en: ID selector
status: stable
support: all
mdn: ID_selectors
summary: محدد الـ id (#name) بيختار عنصر واحد فريد في الصفحة. بيتميّز بأولوية عالية، ولهذا الأفضل تستخدمه للروابط الداخلية مش للتنسيق.
keywords: id selector, #id, محدد الid, فريد, anchor, specificity, الرابط الداخلي, id مقابل class
related: class-selector, specificity, selectors-guide, target
---

## intro

**محدد الـ id** بيبدأ بـ `#` قبل الاسم: `#header`. بيختار العنصر اللي ليه `id="header"` في الـ HTML. والـ id **لازم يكون فريد** في الصفحة: مفيش عنصرين بنفس الـ id.

بيستخدم الـ id في حاجات مهمة غير التنسيق:
- **الروابط الداخلية**: `<a href="#section2">` بيودّيك للعنصر اللي `id="section2"`.
- ربط `<label for="email">` بـ `<input id="email">`.
- الوصول للعنصر من JavaScript بـ `getElementById`.

أما للتنسيق فهو **قوي زيادة**: الـ specificity (1,0,0) بيكسب على أي عدد من الـ classes. ده بيخلّي تخطّيه صعب جداً، فيعمل «حرب أولويات» ([[specificity]]).

> [!warn] القاعدة الشائعة: **استخدم الـ id للربط والـ JS، والـ class للتنسيق.** بتتجنّب مشاكل كتير.

> [!note] الـ id حساس لحالة الأحرف، ويبدأ بحرف، ومبيحتويش مسافات. وممكن تستخدمه مع `:target` ([[target]]) علشان تنسّق القسم اللي الرابط بيودّي له.

## try

```html
<style>
  #main-title { color:#b5551f; border-bottom:3px solid #c9772f; padding-bottom:4px; }
</style>
<h3 id="main-title">عنوان فريد</h3>
```

## syntax

```css nolive
#header { background: #7a4a1d; }
h1#title { color: brown; }
a[href="#top"] { }
```

- `#` ثم اسم الـ id.
- الـ id فريد في الصفحة.
- (1,0,0) أقوى من الـ classes.

## use

- الروابط الداخلية (anchors) والتنقل بين الأقسام.
- ربط label بـ input.
- استهداف عنصر فريد من JS.

## avoid

- كتنسيق رئيسي: بيصعّب التخطّي.
- تكرار نفس الـ id على أكتر من عنصر (غير صالح HTML).

## examples

### 1) تنسيق id
عنصر واحد فريد.

```html
<style>
  #hero { background:#7a4a1d; color:#f3ede0; padding:16px; border-radius:10px; }
</style>
<div id="hero">القسم الرئيسي</div>
```



### 2) id أقوى من class
الـ id غلب الـ class رغم وجودهم على نفس العنصر.

```html
<style>
  #x { color:#3d7a5a; }
  .y { color:#a63b2f; }
</style>
<p id="x" class="y">أخضر: الـ id كسب</p>
```

- (1,0,0) > (0,1,0).

### 3) رابط داخلي بـ :target
اضغط الرابط وشوف الـ id المستهدف بيتلوّن.

```html
<style>
  #sec:target { background:#bcd4a8; padding:8px; }
  a { color:#7a4a1d; }
</style>
<a href="#sec">روح للقسم</a>
<div style="height:30px"></div>
<div id="sec">القسم المستهدف</div>
```

- `:target` بيستهدف الـ id اللي في الرابط.

### 4) label و input
الـ id بيربط الاتنين فالضغط على النص يركّز الحقل.

```html
<style>
  label { color:#3d2c18; margin-inline-end:6px; }
  input { padding:6px; border:2px solid #c9772f; background:#f3e6c9; color:#3d2c18; }
</style>
<label for="nm">اسمك:</label><input id="nm" placeholder="اضغط على النص">
```



## mistakes

### تكرار الـ id

```html bad
<div id="box"></div>
<div id="box"></div>
```

```html good
<div class="box"></div>
<div class="box"></div>
```

الـ id فريد. للتكرار استخدم class.

### التنسيق بالـ id ثم تعارض

```css bad
#nav a { color:red; }
.link { color:blue; }  /* هيخسر */
```

```css good
.nav a { color:red; }
.link { color:blue; }
```

الـ id بيعمل specificity عالية يصعّب التعديل.

## quiz

### الـ id في الصفحة؟
- [ ] ممكن يتكرر
- [x] فريد
- [ ] اختياري للتنسيق فقط
- [ ] بيتحول لـ class

لازم يكون فريد.

### أنهي أقوى specificity؟
- [ ] .a
- [ ] a
- [x] #a
- [ ] a.b

الـ id (1,0,0).

### الاستخدام الأنسب للـ id؟
- [ ] تنسيق كل الأزرار
- [x] الروابط الداخلية والـ JS
- [ ] كل الـ divs
- [ ] الألوان

للربط والمعرّف الفريد.

## refs

- [MDN: #id](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)
- [MDN: ID selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)
