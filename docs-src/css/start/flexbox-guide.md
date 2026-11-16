---
id: flexbox-guide
kind: guide
cat: start
title: Flexbox: رص العناصر بسهولة
en: Flexbox layout guide
status: stable
summary: Flexbox أسهل طريقة ترص بيها العناصر في صف أو عمود: توزيع، محاذاة، توسيط، ومسافات. دليل عملي من الصفر بأمثلة حيّة.
keywords: flexbox, flex, توسيط, justify-content, align-items, صف, عمود, gap, navbar, رص العناصر, مرن, تخطيط
related: flex, flex-direction, justify-content, align-items, gap, flex-wrap, grid-guide
---

## intro

**Flexbox** هو أسهل نظام تخطيط في CSS. بتحط على الأب `display: flex`، فكل أولاده المباشرين **يترصّوا جنب بعض** بشكل مرن، وبتتحكم في توزيعهم ومحاذاتهم ومسافاتهم بخصائص بسيطة.

في Flexbox فيه **محورين**:
- **المحور الرئيسي (main axis)**: اتجاه الصف (أفقي افتراضياً). بتتحكم فيه [[justify-content]].
- **المحور العرضي (cross axis)**: العمودي على الأول. بتتحكم فيه [[align-items]].
- اتجاه المحور الرئيسي بيتغيّر بـ [[flex-direction]] (`row` أو `column`).

الخصائص اللي هتستخدمها 90% من الوقت:
- على **الأب**: `display:flex`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, و[[gap]] للمسافات.
- على **الأبناء**: [[flex]] (`flex: 1` يخلّي الابن ياخد المساحة المتاحة)، و[[align-self]]، و[[order]].

> [!analogy] Flexbox زي رف مرن بتحط عليه كتب: تقدر توزعهم بالتساوي، تلزّقهم يمين، تفصلهم عن بعض، أو تخلّي كتاب واحد ياخد المساحة الفاضية.

> [!tip] أشهر سطرين في CSS: `display:flex; justify-content:center; align-items:center;` = **توسيط أي حاجة في النص**.

> [!note] في RTL (العربي) الاتجاه بيتقلب تلقائياً: `flex-start` بيبقى يمين. وده معناه إن الكود ده بيشتغل صح في أي لغة.

## try

```html
<style>
  .f { display:flex; gap:8px; justify-content:space-between; align-items:center;
       background:#efe0bd; padding:10px; height:90px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:10px 16px; border-radius:6px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```

## examples

### 1) أول flex
أولاد الـ `div` كانوا هيتحطوا تحت بعض، دلوقتي بقوا جنب بعض.

```html
<style>
  .row { display:flex; gap:8px; }
  .row > div { background:#7a4a1d; color:#f3ede0; padding:12px 18px; border-radius:6px; }
</style>
<div class="row"><div>أ</div><div>ب</div><div>ج</div></div>
```

- `gap` بدل margin بين العناصر.

### 2) توزيع المحور الرئيسي
`justify-content` بتوزع المساحة الفاضية.

```html
<style>
  .f { display:flex; background:#efe0bd; padding:6px; margin:6px 0; }
  .f span { background:#3d7a5a; color:#f3ede0; padding:6px 12px; margin:2px; }
</style>
<div class="f" style="justify-content:flex-start"><span>start</span><span>2</span></div>
<div class="f" style="justify-content:center"><span>center</span><span>2</span></div>
<div class="f" style="justify-content:space-between"><span>between</span><span>2</span></div>
```



### 3) التوسيط الكامل
أشهر استخدام: توسيط عنصر أفقي ورأسي.

```html
<style>
  .c { display:flex; justify-content:center; align-items:center;
       height:140px; background:#efe0bd; }
  .c div { background:#b5551f; color:#f3ede0; padding:12px 20px; border-radius:8px; }
</style>
<div class="c"><div>في النص</div></div>
```

- سطرين بس!

### 4) flex:1 لتقسيم المساحة
الأوسط بياخد كل المساحة الفاضية.

```html
<style>
  .bar { display:flex; gap:6px; }
  .bar div { background:#7a4a1d; color:#f3ede0; padding:10px; }
  .bar .grow { flex:1; background:#3d7a5a; }
</style>
<div class="bar"><div>يمين</div><div class="grow">بيتمدد</div><div>يسار</div></div>
```

- أساس الـ navbar والـ cards.

### 5) flex-wrap
لو العناصر كتير بتنزل سطر جديد.

```html
<style>
  .w { display:flex; flex-wrap:wrap; gap:6px; }
  .w div { flex:0 0 100px; background:#c9772f; color:#f3ede0; padding:10px; text-align:center; }
</style>
<div class="w"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```

- غيّر عرض النافذة.

## mistakes

### flex على الأبناء بدل الأب

```css bad
.child { display:flex; justify-content:center; }
```

```css good
.parent { display:flex; justify-content:center; }
```

الـ flex بيتحط على **الحاوية** مش على الأولاد.

### مفيش ارتفاع للتوسيط الرأسي

```css bad
.c { display:flex; align-items:center; }  /* مفيش مساحة */
```

```css good
.c { display:flex; align-items:center; min-height:200px; }
```

لازم الأب يبقى ليه ارتفاع أكبر من المحتوى علشان تشوف التوسيط.

## quiz

### أنهي خاصية للتوسيط الرأسي في flex الافتراضي؟
- [ ] justify-content
- [x] align-items
- [ ] text-align
- [ ] flex-wrap

المحور العرضي = align-items.

### `gap` بتعمل إيه؟
- [x] مسافة بين الأبناء
- [ ] مسافة جوه الأب
- [ ] بتغيّر الاتجاه
- [ ] بتخفي العناصر

مسافة بين العناصر.

### الأبناء اللي بيتأثروا بالـ flex هما؟
- [ ] كل الأحفاد
- [x] الأبناء المباشرين
- [ ] الأب
- [ ] الإخوة

المباشرين بس.

## refs

- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox)
