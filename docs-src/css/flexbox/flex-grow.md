---
id: flex-grow
kind: property
cat: flexbox
chip: flex-grow
title: معامل التمدد
en: CSS flex-grow property
status: stable
support: all
size: compact
mdn: flex-grow
summary: flex-grow بتحدد نصيب العنصر المرن من المساحة الفاضية في الحاوية. الصفر = ميتمدش، رقم أكبر = نصيب أكبر.
keywords: flex-grow, تمدد, نصيب, مساحة فاضية, flex 1, grow factor
related: flex, flex-shrink, flex-basis, flexbox-guide
---

## intro

الخاصية `flex-grow` بتحدد **لو في مساحة فاضية في الحاوية، العنصر ده ياخد قد إيه منها**. القيمة رقم: الافتراضي `0` يعني **مبيتمدّدش** ويفضل على حجمه. لو كل الأبناء `flex-grow: 1` بيقتسموا المساحة الفاضية **بالتساوي**. ولو واحد `2` والباقي `1` ياخد **ضعف** النصيب. المهم: النسبة بتتوزع على **المساحة الفاضية** مش على العرض الكلي. غالباً بتكتبها من خلال الاختصار [[flex]] (`flex: 1`).

## try

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#c9772f; color:#fff3e0; padding:10px; }
  .g1 { flex-grow:1; } .g2 { flex-grow:2; background:#3d7a5a !important; }
</style>
<div class="f"><div>ثابت</div><div class="g1">1</div><div class="g2">2</div></div>
```

## syntax

```css nolive
flex-grow: 0;
flex-grow: 1;
flex-grow: 2.5;
```

- **القيمة المبدئية**: `0`.
- **بتتحرك؟** أيوه.
- ممنوع السالب.

## values

### 0
مبيتمدّدش.

### `<number>`
نصيب نسبي من المساحة الفاضية.

## use

- عنصر ياخد الباقي (`flex-grow:1`).
- نسب مختلفة بين الأعمدة.

## avoid

- توقع إنها بتوزع على العرض الكلي (بتوزع الفاضي بس).

## examples

### 1) كلهم 1
بيقتسموا المساحة بالتساوي.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { flex-grow:1; background:#bcd4a8; color:#3d2c18; padding:10px; text-align:center; }
</style>
<div class="f"><div>1</div><div>1</div><div>1</div></div>
```



### 2) 1 و2
التاني ياخد ضعف الفاضي.

```html
<style>
  .f { display:flex; gap:4px; }
  .f div { background:#c9772f; color:#fff3e0; padding:10px; text-align:center; }
  .a { flex-grow:1; } .b { flex-grow:2; }
</style>
<div class="f"><div class="a">1</div><div class="b">2</div></div>
```



### 3) عنصر ياخد الباقي
الشعار ثابت والبحث ياخد الباقي.

```html
<style>
  .f { display:flex; gap:6px; align-items:center; }
  .logo { background:#7a4a1d; color:#f3ede0; padding:8px 12px; }
  .search { flex-grow:1; background:#efe0bd; color:#3d2c18; padding:8px; }
</style>
<div class="f"><div class="logo">لوجو</div><div class="search">بحث (يتمدد)</div></div>
```



## mistakes

### توقع نسبة من العرض الكلي

```css bad
.a { flex-grow:1; } .b { flex-grow:2; }  /* مش 1/3 و2/3 بالظبط */
```

```css good
.a { flex:1 1 0; } .b { flex:2 1 0; }
```

grow بتوزع المساحة الفاضية بعد basis. لو عايز نسب دقيقة خلّي basis صفر.

## quiz

### القيمة الافتراضية؟
- [ ] 1
- [x] 0
- [ ] auto
- [ ] none

0 = مبيتمدّدش.

### grow:2 مقابل grow:1؟
- [ ] نص
- [x] ضعف نصيب المساحة الفاضية
- [ ] نفس
- [ ] صفر

ضعف نصيب الفاضي.

## refs

- [MDN: flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
