---
id: fn-clamp
kind: function
cat: fn-math
chip: clamp()
title: قيمة بين حدين
en: CSS clamp() function
status: stable
support: all
mdn: clamp
summary: clamp(min, ideal, max) بتخلّي القيمة تتغير بمرونة لكن تفضل بين حد أدنى وأقصى. مثالية للخطوط المتجاوبة.
keywords: clamp, fluid typography, خط متجاوب, min max, responsive
related: fn-min, fn-max, fn-calc, responsive-guide
---

## intro

الدالة `clamp(min, preferred, max)` هي **أفضل أداة للقيم المرنة المحكومة**: بتاخد **3 قيم** وبترجّع القيمة **المفضّلة** بس **بتحبسها بين حد أدنى وأقصى**. يعني: لو المفضّلة أقل من الأدنى بترجع الأدنى، ولو أكبر من الأقصى بترجع الأقصى، وإلا بترجع المفضّلة.

أشهر استخدام: **خطوط متجاوبة (fluid typography)** من غير media queries: `font-size: clamp(1rem, 2.5vw, 2rem);` يعني: الخط يتبع عرض الشاشة (`2.5vw`) لكن **ما يصغرش عن 1rem** وما **يكبرش عن 2rem**. وبنفس الفكرة: `width: clamp(280px, 50%, 600px);` و`padding: clamp(8px, 3vw, 32px);`.

هي اختصار لـ `max(min, min(preferred, max))`. نصيحة للوصولية: لو بتستخدم `vw` فقط للخط ممكن يتعطل التكبير بالمتصفح؛ فاخلط `rem` مع `vw`: `clamp(1rem, 1rem + 1vw, 2rem)`.

## try

```html
<style>
  h4 { font-size:clamp(1rem, 4vw, 1.8rem); color:#7a4a1d; margin:6px 0; }
  .a { width:clamp(120px, 50%, 220px); background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; font-weight:bold; }
</style>
<h4>خط متجاوب بـ clamp</h4><div class="a">clamp عرض</div>
```

## syntax

```css nolive
font-size: clamp(1rem, 2.5vw, 2rem);
width: clamp(280px, 50%, 600px);
padding: clamp(8px, 3vw, 32px);
```

- الترتيب: أدنى، مفضّل، أقصى.
- اختصار لـ `max(a, min(b, c))`.
- اخلط rem مع vw للوصولية.

## use

- خطوط متجاوبة.
- عروض مرنة محكومة.
- مسافات متناسبة.

## avoid

- vw وحدها للخط (تعطل التكبير).
- أدنى أكبر من الأقصى.

## examples

### 1) خط متجاوب
بدون media queries.

```html
<style>
  h4 { font-size:clamp(1rem, 4vw, 1.8rem); color:#7a4a1d; margin:6px 0; }
</style>
<h4>عنوان بيتبع الشاشة بحدود</h4>
```



### 2) عرض محكوم
280 → 600.

```html
<style>
  .p { background:#efe0bd; padding:6px; border-radius:8px; }
  .a { width:clamp(100px, 60%, 240px); background:#3d7a5a; color:#f3ede0; padding:8px; border-radius:6px; font-weight:bold; }
</style>
<div class="p"><div class="a">clamp عرض</div></div>
```



### 3) وصولية
rem + vw.

```html
<style>
  p { font-size:clamp(1rem, 1rem + 1vw, 1.5rem); color:#3d2c18; margin:6px 0; }
</style>
<p>خط يحترم تكبير المستخدم</p>
```



### 4) padding مرن
3vw بحدود.

```html
<style>
  .a { padding:clamp(8px, 3vw, 28px); background:#bcd4a8; color:#3d2c18; border-radius:8px; }
</style>
<div class="a">padding مرن</div>
```



## mistakes

### ترتيب غلط

```css bad
font-size:clamp(2rem, 2vw, 1rem);  /* أدنى > أقصى */
```

```css good
font-size:clamp(1rem, 2vw, 2rem);
```

أدنى، مفضّل، أقصى.

### vw فقط للخط

```css bad
font-size:clamp(14px, 3vw, 24px);  /* ممكن يمنع التكبير */
```

```css good
font-size:clamp(1rem, 1rem + 1vw, 1.5rem);
```

استخدم rem.

## quiz

### ترتيب clamp؟
- [x] أدنى، مفضّل، أقصى
- [ ] أقصى، أدنى، مفضّل
- [ ] مفضّل، أدنى، أقصى
- [ ] أي ترتيب

min, val, max.

### أشهر استخدام؟
- [x] خط متجاوب
- [ ] لون
- [ ] حركة
- [ ] ظل

fluid typography.

### تشبه؟
- [x] max(min, min(val, max))
- [ ] calc
- [ ] var
- [ ] url

اختصار.

## refs

- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
