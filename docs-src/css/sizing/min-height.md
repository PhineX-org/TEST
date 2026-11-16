---
id: min-height
kind: property
cat: sizing
chip: min-height
title: أقل ارتفاع
en: CSS min-height property
status: stable
support: all
size: compact
mdn: min-height
summary: min-height بتضمن إن العنصر ميقلّش عن ارتفاع معين لكن يكبر لو المحتوى زاد. أنسب بكتير من height للأقسام وملء الشاشة.
keywords: min-height, اقل ارتفاع, حد ادنى, 100vh, 100dvh, قسم ملء الشاشة, sticky footer
related: height, max-height, min-width, units, display-flow
---

## intro

الخاصية `min-height` بتحط **حد أدنى** لارتفاع العنصر: ممكن يكبر لو المحتوى زاد، لكن **مش هيصغر** عن القيمة دي. ده بيخليها أكتر أمان من [[height]] الثابتة، لأن المحتوى مش هيطلع برّه الصندوق لو زاد.

أشهر استخداماتها: **قسم ملء الشاشة** (`min-height: 100dvh`) علشان الصفحة تملا الشاشة حتى لو محتواها قليل، لكن تطول عادي لو المحتوى أكتر. وكمان **الـ sticky footer**: `body { min-height: 100dvh; display: flex; flex-direction: column }` والـ `main { flex: 1 }` فالفوتر دايماً في آخر الشاشة.

القيمة الافتراضية `auto` (صفر عملياً). النسبة `%` تحتاج أب بارتفاع محدد، زي `height` بالظبط.

> [!analogy] `min-height` زي علبة تتمدد: على الأقل بحجم معين، وتكبر لو حطيت فيها أكتر.

## try

```html
<style>
  .b { min-height:90px; background:#bcd4a8; color:#3d2c18; padding:8px; }
</style>
<div class="b">قصير لكن ليه حد أدنى 90px</div>
```

## syntax

```css nolive
min-height: 200px;
min-height: 100dvh;
min-height: 0;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.

## values

### `<length>`
حد أدنى ثابت `200px`.

### dvh / vh
نسبة من ارتفاع الشاشة `100dvh`.

### `<percentage>`
من ارتفاع الأب المحدد.

## use

- قسم hero بارتفاع شاشة كاملة.
- sticky footer مع flex.

## avoid

- `height` ثابت لقسم فيه نص (استخدم min-height).

## examples

### 1) حد أدنى بيزيد مع المحتوى
لو المحتوى أطول، الصندوق بيكبر.

```html
<style>
  .b { min-height:60px; background:#efe0bd; color:#3d2c18; padding:8px; border:2px solid #7a4a1d; margin-bottom:6px; }
</style>
<div class="b">قصير</div><div class="b">سطر<br>تاني<br>تالت<br>رابع</div>
```



### 2) sticky footer
الفوتر لازق تحت حتى لو المحتوى قصير.

```html
<style>
  .pg { min-height:160px; display:flex; flex-direction:column; background:#efe0bd; color:#3d2c18; }
  .pg main { flex:1; padding:8px; }
  .pg footer { background:#7a4a1d; color:#f3ede0; padding:8px; }
</style>
<div class="pg"><main>محتوى قصير</main><footer>الفوتر</footer></div>
```



### 3) مقارنة مع height
الثابت بيقص، الأدنى بيتمدد.

```html
<style>
  .a { height:40px; background:#e4a090; color:#3d2c18; overflow:hidden; }
  .b { min-height:40px; background:#bcd4a8; color:#3d2c18; margin-top:6px; }
</style>
<div class="a">سطر<br>سطر<br>سطر</div><div class="b">سطر<br>سطر<br>سطر</div>
```



## mistakes

### استخدام height لقسم فيه نص

```css bad
.hero { height:400px; }
```

```css good
.hero { min-height:400px; }
```

المحتوى الزايد ممكن يطلع برّه.

## quiz

### الفرق بين height وmin-height؟
- [ ] مفيش
- [x] الأدنى يتمدد مع المحتوى
- [ ] الأدنى للعرض
- [ ] height للـ flex

الحد الأدنى مش بيمنع النمو.

### أنسب وحدة لقسم ملء الشاشة؟
- [ ] px
- [ ] em
- [x] dvh
- [ ] %

`100dvh`.

## refs

- [MDN: min-height](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height)
