---
id: flex
kind: property
cat: flexbox
chip: flex
title: اختصار flex للعناصر المرنة
en: CSS flex property
status: stable
support: all
mdn: flex
summary: flex اختصار لـ flex-grow وflex-shrink وflex-basis. بتحدد إزاي الابن المرن بيكبر ويصغر ويبدأ. flex:1 هي أشهر قيمة.
keywords: flex, flex-grow, flex-shrink, flex-basis, flex 1, مرن, تمدد, اختصار, flexbox
related: flex-grow, flex-shrink, flex-basis, flexbox-guide, align-self, order
---

## intro

الخاصية `flex` بتتكتب على **الأبناء** جوه حاوية `display: flex`، وهي **اختصار لتلات خصائص**:
1. [[flex-grow]]: **يكبر** قد إيه لو في مساحة فاضية؟
2. [[flex-shrink]]: **يصغر** قد إيه لو المساحة ضاقت؟
3. [[flex-basis]]: **حجمه المبدئي** قبل التمدد والانكماش.

الصيغ الشائعة:
- **`flex: 1`** = `1 1 0`: يتمدد ويتقلص ويقتسم المساحة بالتساوي مع اخوته. **أشهر قيمة** لجعل الأعمدة متساوية.
- **`flex: 0 0 200px`**: عرض ثابت 200px (مبيكبرش ومبيصغرش).
- **`flex: auto`** = `1 1 auto`: يبدأ من حجم محتواه ويتمدد.
- **`flex: none`** = `0 0 auto`: مبيتغيّرش.
- **`flex: 2`**: ياخد ضعف نصيب اللي `flex: 1`.

الافتراضي من غير flex: `0 1 auto` (مبيتمدّدش، لكن بيتقلص، وبيبدأ بحجمه).

> [!analogy] زي توزيع كعكة على الأولاد: `flex: 1` للكل = حصص متساوية. واحد `flex: 2` = ياخد ضعف الباقي. و`flex: none` = حصة ثابتة محدش يغيّرها.

> [!key] أبسط تخطيط: الحاوية `display:flex` والأبناء `flex:1` = أعمدة متساوية.

## try

```html
<style>
  .f { display:flex; gap:6px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:12px; }
  .f .a { flex:1; } .f .b { flex:2; background:#3d7a5a; } .f .c { flex:none; width:60px; background:#b5551f; }
</style>
<div class="f"><div class="a">1</div><div class="b">2</div><div class="c">ثابت</div></div>
```

## syntax

```css nolive
flex: 1;
flex: 0 0 200px;
flex: 1 1 auto;
flex: auto;
flex: none;
```

- **القيمة المبدئية**: `0 1 auto`.
- **بتتوارث؟** لأ.
- تتحط على الأبناء.

## values

### `<number>`
`flex: 1` = grow 1، shrink 1، basis 0.

### auto
`1 1 auto`: يبدأ من حجمه ويتمدد.

### none
`0 0 auto`: ثابت.

### initial
`0 1 auto` (الافتراضي).

## use

- أعمدة متساوية `flex:1`.
- عنصر ياخد الباقي (`flex:1`) وجنبه ثابت.
- نسب مختلفة (`flex:2` و`flex:1`).
- منع الانكماش `flex:none`.

## avoid

- كتابة flex على الحاوية نفسها (بتتحط على الأبناء).
- نسيان `min-width:0` لما النص الطويل بيدفع.

## examples

### 1) أعمدة متساوية
كل ابن `flex:1`.

```html
<style>
  .f { display:flex; gap:6px; }
  .f div { flex:1; background:#bcd4a8; color:#3d2c18; padding:12px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



### 2) نسب 2:1
التاني ضعف الأول.

```html
<style>
  .f { display:flex; gap:6px; }
  .f div { background:#c9772f; color:#fff3e0; padding:12px; text-align:center; }
  .a { flex:1; } .b { flex:2; }
</style>
<div class="f"><div class="a">1</div><div class="b">2</div></div>
```



### 3) ثابت ومرن
الشريط الجانبي ثابت والباقي مرن.

```html
<style>
  .f { display:flex; gap:6px; }
  .s { flex:0 0 90px; background:#7a4a1d; color:#f3ede0; padding:10px; }
  .m { flex:1; background:#efe0bd; color:#3d2c18; padding:10px; }
</style>
<div class="f"><div class="s">جانبي</div><div class="m">المحتوى بياخد الباقي</div></div>
```



### 4) flex:none
العنصر مبيتغيّرش حتى لو ضاقت المساحة.

```html
<style>
  .f { display:flex; width:200px; gap:4px; background:#efe0bd; }
  .f div { padding:8px; color:#3d2c18; background:#bcd4a8; }
  .n { flex:none; width:120px; background:#e4c490 !important; }
</style>
<div class="f"><div class="n">ثابت</div><div>ضاغط</div></div>
```



## mistakes

### flex على الحاوية

```css bad
.parent { flex:1; }  /* مش لتفعيل flex */
```

```css good
.parent { display:flex; }
.child { flex:1; }
```

`flex` للأبناء، و`display:flex` للحاوية.

### flex:1 مع width

```css bad
.c { flex:1; width:200px; }  /* basis بتتجاهل width */
```

```css good
.c { flex:1 1 200px; }
```

الاختصار `flex:1` بيحط basis=0 فبيتجاهل width.

## quiz

### `flex:1` معناها؟
- [x] يتمدد ويشارك المساحة بالتساوي
- [ ] ثابت
- [ ] مخفي
- [ ] عرض 1px

grow 1.

### أنهي ثابت؟
- [ ] flex:1
- [ ] flex:auto
- [x] flex:none
- [ ] flex:2

none = 0 0 auto.

### flex بتتحط على؟
- [ ] الحاوية
- [x] الأبناء
- [ ] body
- [ ] الاتنين

الأبناء.

## refs

- [MDN: flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
