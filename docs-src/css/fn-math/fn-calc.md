---
id: fn-calc
kind: function
cat: fn-math
chip: calc()
title: دالة calc(): حسابات داخل CSS
en: CSS calc() function
status: stable
support: all
mdn: calc
summary: calc() بتعمل عمليات حسابية (جمع وطرح وضرب وقسمة) وتخلط وحدات مختلفة: calc(100% - 40px).
keywords: calc, حساب, mix units, percent, px, عرض
related: fn-min, fn-max, fn-clamp, fn-var, units
---

## intro

الدالة `calc()` بتخلّيك تعمل **حسابات جوه CSS** وتخلط **وحدات مختلفة** في معادلة واحدة، وده شيء مستحيل من غيرها. أشهر مثال: `width: calc(100% - 40px);` يعني «عرض الأب كله ناقص 40 بكسل» (نسبة ناقص بكسل!). المتصفح بيحسبها وقت العرض وبيعرف حجم الأب الفعلي.

العمليات: **`+` و`-`** (لازم **مسافة حوالين** العلامة!)، **`*`** و**`/`** (من غير مسافات إجبارية، وواحد من الطرفين لازم رقم بدون وحدة). مثال: `calc(2 * 1rem)` و`calc(100% / 3)`.

استخدامات عملية:
- عرض عمود = الباقي بعد شريط جانبي ثابت: `calc(100% - 250px)`.
- ارتفاع = الشاشة ناقص الهيدر: `height: calc(100vh - 60px)`.
- مسافات متناسقة بمتغيرات: `padding: calc(var(--gap) * 2)`.
- أحجام خطوط متجاوبة: `font-size: calc(1rem + 1vw)`.

وتقدر **تتداخل** `calc(calc(...) + ...)` أو تستخدم الأقواس فقط. والأهم: **المسافة قبل وبعد + و-**، وإلا الخاصية بتتجاهل!

## try

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:calc(100% - 60px); font-weight:bold; }
</style>
<div class="p"><div class="a">العرض = 100% - 60px</div></div>
```

## syntax

```css nolive
width: calc(100% - 40px);
height: calc(100vh - 60px);
font-size: calc(1rem + 1vw);
padding: calc(var(--gap) * 2);
```

- **مسافة** حوالين `+` و`-` إجبارية.
- `*` و`/` لازم أحد الطرفين رقم بدون وحدة.
- الأقواس والتداخل مسموح.

## use

- خلط % مع px.
- أبعاد = شاشة ناقص ثابت.
- مسافات من متغيرات.

## avoid

- نسيان المسافة حوالين + و-.
- القسمة على صفر.

## examples

### 1) نسبة ناقص بكسل
الأشهر.

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; width:calc(100% - 60px); font-weight:bold; }
</style>
<div class="p"><div class="a">100% - 60px</div></div>
```



### 2) عمود مرن بجانب ثابت
sidebar 80px.

```html
<style>
  .r { display:flex; gap:6px; }
  .s { width:80px; background:#7a4a1d; color:#f3ede0; padding:8px; border-radius:6px; }
  .m { width:calc(100% - 80px - 6px); background:#e4c490; color:#3d2c18; padding:8px; border-radius:6px; }
</style>
<div class="r"><div class="s">ثابت</div><div class="m">الباقي</div></div>
```



### 3) مع متغير
gap × 2.

```html
<style>
  :root { --gap:10px; }
  .a { padding:calc(var(--gap) * 2); background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">حشو = gap × 2</div>
```



### 4) خط مرن
rem + vw.

```html
<style>
  h4 { font-size:calc(1rem + 1.2vw); color:#7a4a1d; margin:6px 0; }
</style>
<h4>حجم الخط بيكبر مع عرض الشاشة</h4>
```



## mistakes

### نسيان المسافة

```css bad
width:calc(100%-40px);  /* غلط */
```

```css good
width:calc(100% - 40px);
```

لازم مسافات حوالين -.

### ضرب وحدتين

```css bad
width:calc(10px * 5px);  /* غلط */
```

```css good
width:calc(10px * 5);
```

أحد الطرفين رقم صافي.

## quiz

### calc(100% - 40px) معناها؟
- [x] الكل ناقص 40 بكسل
- [ ] 100 ناقص 40
- [ ] 40%
- [ ] خطأ

نسبة ناقص بكسل.

### المسافة حوالين + و- ؟
- [x] إجبارية
- [ ] اختيارية
- [ ] ممنوعة
- [ ] للضرب فقط

لازم.

### تخلط وحدات؟
- [x] أيوه (% مع px)
- [ ] لأ
- [ ] بس px
- [ ] بس em

قوتها.

## refs

- [MDN: calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
