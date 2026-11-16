---
id: selectors-guide
kind: guide
cat: start
title: المحددات: اختار العنصر
en: CSS selectors guide
status: stable
summary: المحدد (Selector) هو الجزء اللي بيقول لـ CSS «طبّق التنسيق على أنهي عناصر». خريطة كاملة: بالاسم والـ class والـ id والخصائص والعلاقات والحالات.
keywords: selectors, محددات, class, id, اختيار العناصر, combinators, pseudo, attribute, كيف اختار عنصر, استهداف
related: type-selector, class-selector, id-selector, descendant-combinator, specificity, pseudo-guide
---

## intro

قبل ما تنسّق أي عنصر لازم تقول للمتصفح **أنهي عنصر** تقصده. ده شغل **المحدد (Selector)**، وهو أهم مهارة في CSS: لو عرفت تختار صح، التنسيق نفسه بيبقى سهل.

المحددات عيلات، وهنمشي عليها من الأبسط للأقوى:
- **بالاسم**: `p` بيختار كل الفقرات ([[type-selector]]).
- **بالـ class**: `.card` بيختار كل عنصر عليه `class="card"` ([[class-selector]]). ده **الأكتر استخداماً**.
- **بالـ id**: `#header` بيختار عنصر واحد بالـ `id` ([[id-selector]]).
- **الكل**: `*` ([[universal-selector]]).
- **بالخاصية**: `[type="text"]` ([[attribute-selector]]).
- **بالعلاقة**: `A B` و`A > B` و`A + B` و`A ~ B` ([[descendant-combinator]]، [[child-combinator]]، [[adjacent-sibling-combinator]]، [[general-sibling-combinator]]).
- **بالحالة**: `a:hover` و`li:first-child` ([[pseudo-guide]]).

وتقدر **تجمّع** المحددات: `a.btn:hover` يعني «رابط عليه كلاس btn ولما الماوس يقف عليه». كل ما المحدد أدق، كل ما بقى أقوى في الأولويات (شوف [[specificity]]).

> [!analogy] المحددات زي طرق وصف شخص: «أي حد في الشارع» (`*`)، «كل الطلبة» (`student`)، «اللي لابس أزرق» (`.blue`)، «أحمد» بالاسم (`#ahmed`)، «ابن الجيران اللي في الدور التاني» (`A B`).

> [!tip] ابدأ دايماً بـ **class**. هو مرن ومش بيعمل مشاكل أولويات زي الـ id.

## try

```html
<style>
  p { color: #3d2c18; }
  .hot { color: #b5551f; font-weight: bold; }
  #main { background: #efe0bd; padding: 10px; border-radius: 8px; }
</style>
<div id="main"><p>فقرة عادية</p><p class="hot">فقرة hot</p></div>
```

## examples

### 1) بالاسم والـ class والـ id
تلات محددات على نفس الصفحة: الاسم يطبّق على الكل، والـ class على المجموعة، والـ id على العنصر الواحد.

```html
<style>
  p { background:#efe0bd; padding:6px 10px; border-radius:6px; }
  .special { background:#c9772f; color:#fff3e0; }
  #only { border:3px solid #3d7a5a; }
</style>
<p>عادية</p><p class="special">class</p><p id="only">id</p>
```

- `p` بيطبّق على الفقرات الثلاثة.
- `.special` على واحدة، و`#only` على واحدة.

### 2) محددات العلاقات
الفرق بين الأحفاد والأبناء والإخوات: كل واحد بيختار عناصر مختلفة.

```html
<style>
  .box span { background:#bcd4a8; }         /* كل الأحفاد */
  .box > span { outline:2px solid #3d7a5a; } /* الأبناء المباشرين */
  h4 + p { color:#b5551f; font-weight:bold; }
</style>
<div class="box"><span>ابن</span><div><span>حفيد</span></div></div>
<h4>عنوان</h4><p>الفقرة اللي بعده مباشرة</p>
```

- الفراغ = نسل بأي عمق.
- `>` = ابن مباشر.
- `+` = الأخ التالي مباشرة.

### 3) تجميع محددات ودمجها
`a.btn:hover` بيدمج النوع والـ class والحالة. مرّر الماوس على الرابط.

```html
<style>
  a.btn { background:#7a4a1d; color:#f3ede0; padding:8px 18px; border-radius:20px; text-decoration:none; display:inline-block; }
  a.btn:hover { background:#3d7a5a; }
</style>
<a class="btn" href="#">مرّر عليّ</a>
```

- بدون مسافة = لازم الشروط كلها تتحقق على نفس العنصر.

### 4) قائمة المحددات
الفاصلة بتخلّي نفس القاعدة تنطبق على أكتر من محدد.

```html
<style>
  h1, h2, .title { color:#3d7a5a; }
</style>
<h1>H1</h1><h2>H2</h2><p class="title">class title</p>
```

- الفاصلة = «أو» ([[selector-list]]).

## mistakes

### مسافة غلط بتغيّر المعنى

```css bad
.box .item { color:#a63b2f; }   /* بتدوّر على .item جوه .box */
```

```css good
.box.item { color:#a63b2f; }   /* عنصر واحد عليه الكلاسين */
```

`A B` معناها «B جوه A»، أما `A.B` من غير مسافة فمعناها «عنصر واحد عليه A وB».

### الإفراط في الـ id

```css bad
#nav { color:#7a4a1d; }
.nav-link { color:#3d7a5a; }  /* مش هتشتغل؟ */
```

```css good
.nav { color:#7a4a1d; }
.nav-link { color:#3d7a5a; }
```

الـ id ليه أولوية عالية جداً وبيصعّب تغيير التنسيق بعدين. استخدم classes.

## quiz

### محدد `.card` بيختار؟
- [ ] كل عناصر `<card>`
- [x] كل عنصر عليه `class="card"`
- [ ] العنصر اللي `id="card"`
- [ ] أول عنصر

النقطة قبل الاسم = class.

### الفرق بين `div p` و`div > p`؟
- [ ] مفيش فرق
- [x] الأول أي فقرة جوه div بأي عمق والتاني الأبناء المباشرين بس
- [ ] الأول للأبناء والتاني للأحفاد
- [ ] التاني أضعف

المسافة نسل، و`>` ابن مباشر.

### `.a.b` بيختار؟
- [ ] عنصر عليه a أو b
- [x] عنصر عليه الكلاسين a و b معاً
- [ ] b جوه a
- [ ] a بعد b

من غير مسافة = نفس العنصر.

## refs

- [MDN: المحددات](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors)
