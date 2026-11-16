---
id: attribute-selector
kind: selector
cat: selectors
chip: [attr]
title: محدد الخاصية [attr]
en: Attribute selector
status: stable
support: all
mdn: Attribute_selectors
summary: بيختار العناصر بحسب وجود خاصية HTML أو قيمتها: [type="text"] و[href^="https"] و[class*="btn"]. مرن جداً للفورم والروابط.
keywords: attribute selector, [attr], [type=text], ^=, $=, *=, محدد الخاصية, فورم, روابط خارجية, data-
related: class-selector, type-selector, selectors-guide, specificity
---

## intro

**محدد الخاصية** بتكتبه بين أقواس مربعة `[ ]`، وبيختار العناصر بناءً على **الـ attributes** بتاعتهم في HTML، من غير ما تحتاج class!

الأشكال:
- `[title]`: أي عنصر **عنده** خاصية `title`.
- `[type="text"]`: الخاصية **تساوي** القيمة بالظبط.
- `[href^="https"]`: **تبدأ** بـ ("starts").
- `[href$=".pdf"]`: **تنتهي** بـ ("ends").
- `[class*="btn"]`: **تحتوي** على ("contains").
- `[lang|="ar"]`: تساوي أو تبدأ بـ `ar-`.
- `[class~="a"]`: كلمة منفصلة من قائمة.
- ضيف `i` قبل القوس لتجاهل حالة الأحرف: `[type="TEXT" i]`.

الـ specificity (0,1,0) زي الـ class. وبتشتغل ممتاز مع الفورم (`input[type="checkbox"]`) والروابط (`a[href^="http"]` للروابط الخارجية) وبيانات `data-*`.

> [!analogy] زي ما تقول «كل الناس اللي اسمهم بيبدأ بـ أ»، بتختار بنمط مش باسم دقيق.

> [!tip] الأقواس المربعة + `data-state="open"` أسلوب نظيف تتحكم بيه في الحالات من JS من غير classes كتير.

## try

```html
<style>
  a[href^="https"] { color:#3d7a5a; }
  a[href$=".pdf"] { color:#a63b2f; }
  a[href^="https"]::after { content:" ↗"; }
</style>
<a href="https://example.com">رابط خارجي</a><br><a href="file.pdf">ملف PDF</a>
```

## syntax

```css nolive
[attr] { }
[attr="value"] { }
[attr^="start"] { }
[attr$="end"] { }
[attr*="mid"] { }
input[type="email"] { }
```

- `^=` يبدأ، `$=` ينتهي، `*=` يحتوي.
- `i` بعد القيمة = تجاهل حالة الأحرف.
- (0,1,0).

## use

- تنسيق الفورم حسب النوع (`input[type=…]`).
- تمييز الروابط الخارجية والملفات.
- حالات JS عبر `data-*`.

## avoid

- `*=` على class لأنه ممكن يطابق بالغلط.
- قواعد معقدة بتغني عن class واضح.

## examples

### 1) حسب نوع الـ input
تنسيق مختلف لكل نوع.

```html
<style>
  input { padding:6px; margin:4px; border:2px solid #c9772f; background:#f3e6c9; color:#3d2c18; }
  input[type="email"] { border-color:#3d7a5a; }
  input[type="password"] { border-color:#a63b2f; }
</style>
<input type="text" placeholder="نص"><input type="email" placeholder="بريد"><input type="password" placeholder="سر">
```



### 2) روابط خارجية وملفات
`^=` للبداية و`$=` للنهاية.

```html
<style>
  a { color:#7a4a1d; display:block; margin:4px 0; }
  a[href^="http"]::after { content:" ↗"; color:#3d7a5a; }
  a[href$=".pdf"]::before { content:"📄 "; }
</style>
<a href="/page">داخلي</a><a href="https://x.com">خارجي</a><a href="a.pdf">كتاب</a>
```



### 3) data-attributes
حالة بتتغيّر من JS عبر `data-state`.

```html
<style>
  .panel { padding:10px; background:#efe0bd; color:#3d2c18; margin:4px 0; }
  .panel[data-state="open"] { background:#bcd4a8; border:2px solid #3d7a5a; }
</style>
<div class="panel" data-state="closed">مقفول</div><div class="panel" data-state="open">مفتوح</div>
```



### 4) وجود الخاصية فقط
`[required]` بتختار الحقول اللي عليها required.

```html
<style>
  input { padding:6px; margin:4px; border:2px solid #d8c7a0; background:#f3e6c9; color:#3d2c18; }
  input[required] { border-color:#b5551f; }
</style>
<input placeholder="اختياري"><input required placeholder="إجباري">
```

- مش محتاج قيمة.

## mistakes

### نسيان علامات التنصيص

```css bad
a[href=https://x.com] { }
```

```css good
a[href="https://x.com"] { }
```

القيم اللي فيها رموز لازم تتحط بين `" "`.

### استخدام *= بشكل واسع

```css bad
[class*="a"] { }  /* بيطابق card و data وغيرهم */
```

```css good
.a { }
```

الجزء من النص ممكن يطابق كلمات تانية.

## quiz

### أنهي بيختار الروابط اللي بتبدأ بـ https؟
- [ ] a[href*="https"]
- [x] a[href^="https"]
- [ ] a[href$="https"]
- [ ] a[https]

`^=` = يبدأ بـ.

### `[title]` بيختار؟
- [ ] title بقيمة معينة
- [x] كل عنصر عنده خاصية title
- [ ] أول عنصر
- [ ] العنوان

وجود الخاصية.

### الـ specificity؟
- [ ] (0,0,1)
- [x] (0,1,0)
- [ ] (1,0,0)
- [ ] صفر

زي الـ class.

## refs

- [MDN: [attr]](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
- [MDN: Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
