---
id: scroll-behavior
kind: property
cat: ui
chip: scroll-behavior
title: سلاسة التمرير
en: CSS scroll-behavior property
status: stable
support: all
mdn: scroll-behavior
summary: scroll-behavior:smooth بتخلّي التمرير للروابط الداخلية (#section) ناعم بدل القفز. اضبطها على html.
keywords: scroll-behavior, smooth, auto, تمرير ناعم, anchor
related: scroll-margin, scroll-padding, scroll-snap-type, target
---

## intro

الخاصية `scroll-behavior` بتحدد **شكل التمرير** لما يحصل بالبرمجة أو بالروابط الداخلية: **`auto`** (قفز فوري، الافتراضي) أو **`smooth`** (تمرير ناعم متحرك). أشهر استخدام: `html { scroll-behavior: smooth; }` فلما المستخدم يضغط على رابط `<a href="#section2">` الصفحة تنزل بنعومة للقسم، من غير أي JavaScript. وكمان بتأثر على `element.scrollTo()` و`scrollIntoView()`.

ملاحظات:
- بتتحط على **عنصر الـ scroller** (غالباً `html`)، مش على العنصر المتحرك إليه.
- **احترم المستخدمين الحساسين للحركة**: `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`.
- اجمعها مع [[scroll-margin]] لو عندك header ثابت عشان القسم ميختفيش تحته. وتخيّلها زي الفرق بين مصعد بيطلع بسلاسة للدور وآخر بيقفزك مرة واحدة: الاتنين بيوصّلوك، بس النعومة بتخلّي المستخدم يفهم هو رايح فين ويحس بالاتجاه. ولو الصفحة طويلة جداً التمرير الناعم ممكن ياخد وقت، فاستخدمه بتوازن.

## try

```html
<style>
  .s { height:80px; overflow:auto; scroll-behavior:smooth; background:#efe0bd; padding:6px; color:#3d2c18; }
  .t { height:120px; background:#e4c490; margin:6px 0; padding:6px; }
  a { color:#b5551f; font-weight:bold; }
</style>
<div class="s" id="sc"><a href="#end" onclick="document.getElementById('end').scrollIntoView();return false">انزل للنهاية</a><div class="t">محتوى طويل</div><div id="end">النهاية</div></div>
```

## syntax

```css nolive
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- **القيمة المبدئية**: `auto`.
- على html غالباً.
- احترم reduced-motion.

## values

### auto
قفز فوري.

### smooth
تمرير ناعم.

### inherit
مش بتتوارث تلقائياً؛ تقدر تجبرها بـ inherit.

## use

- روابط داخلية بتمرير ناعم.
- scrollIntoView ناعم.
- زرار «ارجع لفوق» بحركة لطيفة.

## avoid

- تجاهل prefers-reduced-motion.
- تمرير ناعم لمسافات طويلة جداً.

## examples

### 1) smooth على html
سطر واحد.

```html
<style>
  .s { height:70px; overflow:auto; scroll-behavior:smooth; background:#efe0bd; padding:6px; color:#3d2c18; }
  button { padding:4px 10px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; margin-bottom:6px; }
</style>
<div class="s"><button onclick="end1.scrollIntoView({block:'nearest'})">النهاية</button><div style="height:140px"></div><div id="end1">وصلنا</div></div>
```



### 2) auto للمقارنة
بدون نعومة.

```html
<style>
  .s { height:70px; overflow:auto; scroll-behavior:auto; background:#efe0bd; padding:6px; color:#3d2c18; }
  button { padding:4px 10px; border:0; border-radius:6px; background:#7a4a1d; color:#f3ede0; margin-bottom:6px; }
</style>
<div class="s"><button onclick="end2.scrollIntoView({block:'nearest'})">النهاية</button><div style="height:140px"></div><div id="end2">وصلنا</div></div>
```



### 3) reduced-motion
احترام الإعدادات.

```html
<style>
  .s { height:60px; overflow:auto; scroll-behavior:smooth; background:#efe0bd; padding:6px; color:#3d2c18; }
  @media (prefers-reduced-motion: reduce) { .s { scroll-behavior:auto; } }
</style>
<div class="s">سطر<br>سطر<br>سطر<br>سطر</div>
```



### 4) مع scroll-margin
عشان header ثابت.

```html
<style>
  h4 { scroll-margin-top:50px; margin:0; color:#7a4a1d; }
</style>
<h4 id="x">عنوان بمسافة أمان</h4>
```



## mistakes

### تجاهل الحساسية للحركة

```css bad
html { scroll-behavior:smooth; }
```

```css good
@media (prefers-reduced-motion: reduce) { html { scroll-behavior:auto; } }
```

احترم الإعدادات.

### على العنصر الهدف

```css bad
#section { scroll-behavior:smooth; }
```

```css good
html { scroll-behavior:smooth; }
```

على الـ scroller.

## quiz

### smooth معناها؟
- [x] تمرير ناعم
- [ ] قفز
- [ ] بدون تمرير
- [ ] تمرير للأعلى

تحريك ناعم.

### بتتحط على؟
- [x] html (الـ scroller)
- [ ] العنصر الهدف
- [ ] img
- [ ] a

عنصر التمرير.

### للحساسين للحركة؟
- [x] prefers-reduced-motion
- [ ] hover
- [ ] target
- [ ] print

media query.

## refs

- [MDN: scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
