---
id: descendant-combinator
kind: selector
cat: selectors
chip: A B
title: محدد النسل (A B)
en: Descendant combinator
status: stable
support: all
mdn: Descendant_combinator
summary: المسافة بين محددين بتختار كل B جوه A بأي عمق: ابن أو حفيد أو أبعد. أكتر Combinator استخداماً لتنسيق محتوى مكوّن معين.
keywords: descendant combinator, descendant selector, المسافة, نسل, حفيد, nested elements, .card p
related: child-combinator, class-selector, selectors-guide, specificity
---

## intro

المسافة بين محددين `A B` هي **Combinator** اسمه **النسل (Descendant)**: بيختار كل عنصر يطابق `B` **ويكون جوه** عنصر يطابق `A`، سواء ابن مباشر أو حفيد أو أبعد بكتير.

مثلاً `.card p` = كل فقرة جوه `.card`، مهما كانت بعيدة جوه divs تانية. ده مفيد جداً لتنسيق **محتوى مكوّن** من غير ما تحط class على كل عنصر جواه.

كيف بيشتغل؟ المتصفح بيقرأ المحدد من **اليمين لليسار**: يلاقي كل `p`، وبعدين يسأل «هل فيه أب (أو جد) ليه class card؟». لو أيوه، يطبّق القاعدة.

والمحدد ده ما بيضيفش specificity جديدة: بتحسب من اللي حواليه بس. `.card p` = (0,1,1).

نقطة مهمة: لأنه بياخد **كل مستويات** النسل، ساعات بينطبق على عناصر مش عايزها (مثلاً فقرة جوه كارت جوه كارت). لو عايز ابن مباشر بس استخدم [[child-combinator]].

> [!analogy] «كل الطلبة اللي في المدرسة» (النسل): مش مهم هما في أنهي فصل أو دور. أما «الطلبة اللي في الفصل ده بس» فده الابن المباشر.

> [!tip] متكتبش سلسلة طويلة (`a b c d e`). بتصعّب التعديل وتزوّد الـ specificity. 2–3 مستويات كفاية.

## try

```html
<style>
  .card p { color:#3d7a5a; font-weight:bold; }
</style>
<div class="card"><p>فقرة مباشرة</p><div><p>فقرة جوه div (برضه)</p></div></div>
<p>فقرة برّه الكارت</p>
```

## syntax

```css nolive
.card p { color: green; }
nav ul li a { text-decoration: none; }
article > p { }  /* ده الابن المباشر مش النسل */
```

- المسافة = أي مستوى نسل.
- بتتقرأ من اليمين لليسار.

## use

- تنسيق محتوى جوه مكوّن (`.card p`, `.article img`).
- قوائم التنقل (`nav a`).
- نطاق تنسيق محدد من غير classes كتيرة.

## avoid

- سلاسل طويلة جداً (`a b c d e`).
- لو محتاج ابن مباشر بس (استخدم `>`).

## examples

### 1) كل الفقرات جوه الكارت
`.card p` بيتخطى المستويات الوسيطة.

```html
<style>
  .card { background:#efe0bd; padding:8px; margin-bottom:6px; }
  .card p { color:#3d7a5a; margin:4px 0; font-weight:bold; }
</style>
<div class="card"><p>مباشر</p><div><div><p>حفيد بعيد</p></div></div></div>
<p style="color:#3d2c18">برّه الكارت</p>
```



### 2) روابط القائمة
`nav a` بينسّق كل الروابط جوه الـ nav.

```html
<style>
  nav { background:#7a4a1d; padding:8px; }
  nav a { color:#f3ede0; margin-inline-end:12px; text-decoration:none; }
  nav a:hover { color:#e4c490; }
</style>
<nav><ul style="margin:0;padding:0;list-style:none"><li style="display:inline"><a href="#">الرئيسية</a></li><li style="display:inline"><a href="#">الدروس</a></li></ul></nav>
```



### 3) النسل ينطبق على المتداخل
فقرة جوه كارت جوه كارت بتاخد التنسيق.

```html
<style>
  .card p { color:#a63b2f; }
  .card { border:2px solid #c9772f; padding:6px; margin:4px; background:#efe0bd; }
</style>
<div class="card"><p>أول</p><div class="card"><p>تاني متداخل</p></div></div>
```

- ممكن تبقى مشكلة لو مش مقصودة.

### 4) تضييق بـ class
`.card .title` أدق من `.card p`.

```html
<style>
  .card .title { color:#b5551f; font-weight:bold; }
  .card { background:#efe0bd; padding:8px; color:#3d2c18; }
</style>
<div class="card"><p class="title">عنوان</p><p>فقرة عادية</p></div>
```



## mistakes

### الخلط مع الـ class المدمج

```css bad
.a .b { }  /* b جوه a */
```

```css good
.a.b { }  /* عنصر عليه الاتنين */
```

المسافة معناها «جوه»، من غير مسافة معناها «نفس العنصر».

### سلسلة طويلة

```css bad
body div.page section.main ul li a.link { }
```

```css good
.main-link { }
```

المحدد الطويل بيصعّب التخطّي ويلخبط.

## quiz

### `.a p` بيختار؟
- [ ] p ابن مباشر لـ a بس
- [x] أي p جوه .a بأي عمق
- [ ] p أخ لـ a
- [ ] a جوه p

مسافة = نسل.

### المتصفح بيقرا المحدد من؟
- [ ] اليسار لليمين
- [x] اليمين لليسار
- [ ] الوسط
- [ ] عشوائي

من الأخير للأول.

### لابن مباشر بس تستخدم؟
- [ ] المسافة
- [x] >
- [ ] +
- [ ] ~

`A > B`.

## refs

- [MDN: A B](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator)
- [MDN: Descendant combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator)
