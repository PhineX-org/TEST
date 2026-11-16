---
id: min-width
kind: property
cat: sizing
chip: min-width
title: أقل عرض
en: CSS min-width property
status: stable
support: all
mdn: min-width
summary: min-width بتمنع العنصر إنه يضيق عن عرض معين. بتمنع الانكماش الزايد في flex وتحمي التصميم من الانهيار.
keywords: min-width, أقل عرض, حد أدنى, flex, shrink, responsive, min-content
related: max-width, width, flex-shrink, min-height, box-sizing
---

## intro

الخاصية `min-width` بتحط **حد أدنى** لعرض العنصر. يعني مهما انكمشت الحاوية أو حاولت `width` النسبية تصغّره، العنصر **مش هينزل** عن القيمة دي. لو `width` أصغر من `min-width`، فـ `min-width` هي اللي بتكسب.

استخداماتها الأساسية:
- **حماية التصميم**: زرار أو حقل مينزلش عن عرض معقول (`min-width: 120px`).
- **في Flexbox**: العناصر المرنة بتنكمش افتراضياً حتى `min-content`. ولو فيها نص طويل ممكن تعمل overflow، فبنكتب `min-width: 0` علشان نسمح للعنصر إنه يضيق ويلف النص ([[flex-shrink]]).
- **تجنّب انهيار المحتوى** في الشاشات الصغيرة (مع سكرول أفقي مقصود).

القيمة الافتراضية `auto` (بتساوي صفر في أغلب الحالات، لكن في flex/grid بتساوي حجم `min-content`). النسبة `%` من عرض الأب.

> [!analogy] `min-width` زي أقل مقاس ممكن للحذاء: مهما قلّلت، مش هيصغر عن كده.

> [!key] مشكلة flex الشهيرة «العنصر مش بيلف النص ويعدّي الحاوية» حلها غالباً: `min-width: 0`.

## try

```html
<style>
  .p { width:150px; background:#efe0bd; padding:4px; }
  .c { width:50%; min-width:120px; background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="p"><div class="c">50% لكن ≥ 120px</div></div>
```

## syntax

```css nolive
min-width: 200px;
min-width: 50%;
min-width: 0;          /* مهم في flex */
min-width: min-content;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- بتغلب `width` لو أصغر منها.

## values

### `<length>`
حد أدنى ثابت `200px`.

### `<percentage>`
نسبة من عرض الأب.

### auto
الافتراضي. في flex = min-content.

### min-content
أضيق عرض بدون كسر كلمة.

## use

- حماية الأزرار والحقول من الانكماش.
- `min-width:0` لحل overflow النص في flex.
- أعمدة بحد أدنى في تخطيطات مرنة.

## avoid

- حد أدنى كبير مع شاشات الموبايل (بيعمل scroll أفقي).
- استخدامه بدل `width` للتخطيط الأساسي.

## examples

### 1) حد أدنى بيغلب النسبة
الأب ضيق، والابن 50% لكنه ≥ 120px.

```html
<style>
  .p { width:160px; background:#efe0bd; padding:4px; }
  .c { width:30%; min-width:100px; background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="p"><div class="c">30% = 48px لكن 100px</div></div>
```



### 2) min-width:0 في flex
من غيرها النص الطويل بيدفع العنصر برّه.

```html
<style>
  .f { display:flex; width:200px; background:#efe0bd; gap:6px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:4px; }
  .grow { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
</style>
<div class="f"><div>أيقونة</div><div class="grow">نص طويل جداً جداً جداً</div></div>
```



### 3) زرار بعرض أدنى
الزرار القصير متساوي مع الطويل.

```html
<style>
  .b { min-width:110px; padding:8px; background:#7a4a1d; color:#f3ede0; border:0; border-radius:8px; margin:4px; }
</style>
<button class="b">حفظ</button><button class="b">حفظ التغييرات</button>
```



### 4) min-width مع max-width
لو اتعارضوا، `min-width` بتكسب.

```html
<style>
  .x { max-width:80px; min-width:140px; background:#e4c490; color:#3d2c18; padding:8px; }
</style>
<div class="x">عرضه 140px</div>
```

- الحد الأدنى أقوى من الأقصى.

## mistakes

### حد أدنى كبير للموبايل

```css bad
.card { min-width:500px; }
```

```css good
.card { min-width:min(500px,100%); }
```

الحد الأدنى الكبير بيعمل scroll أفقي على الشاشات الضيقة.

### نسيان min-width:0 في flex

```css bad
.row { display:flex; }
.txt { flex:1; }  /* النص الطويل بيدفع */
```

```css good
.row { display:flex; }
.txt { flex:1; min-width:0; }
```

الحد الأدنى الافتراضي في flex هو حجم المحتوى، فبيمنع الانكماش.

## quiz

### لو `width:50px` و`min-width:100px` العرض؟
- [ ] 50px
- [x] 100px
- [ ] 150px
- [ ] auto

الحد الأدنى بيكسب.

### حل flex الكلاسيكي لتجاوز النص؟
- [x] min-width:0
- [ ] width:100%
- [ ] float
- [ ] position

بيسمح بالانكماش.

### `min-width` بتتعارض مع `max-width` الأصغر منها؟
- [ ] max-width بتكسب
- [x] min-width بتكسب
- [ ] بتتجمع
- [ ] خطأ

الأدنى أقوى.

## refs

- [MDN: min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)
