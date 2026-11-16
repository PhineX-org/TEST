---
id: float
kind: property
cat: layout
chip: float
title: الطفو (Float)
en: CSS float property
status: stable
support: all
mdn: float
summary: float بتخلّي العنصر يطفو لليمين أو الشمال والنص يلف حواليه. كانت أساس التخطيط قديماً، دلوقتي بنستخدمها للصور وسط النص فقط.
keywords: float, left, right, clear, طفو, لف النص حوالين صورة, clearfix, flow-root
related: clear, display, flexbox-guide, grid-guide, shape-outside
---

## intro

الخاصية `float` بتشيل العنصر من التدفق العادي وتخلّيه **يطفو** على جنب (`left` أو `right`)، والنص والعناصر الـ inline **بتلف حواليه**. اتصممت أصلاً علشان **صورة في مقال** والنص بيلف حواليها زي الجرايد.

قبل Flexbox وGrid كان الناس بيستخدموها في التخطيط الكامل (أعمدة وقوايم)، وده سبب مشاكل كتير (الأب بيتهد ارتفاعه لأن الأبناء الطافيين مبيتحسبوش). دلوقتي **متستخدمهاش للتخطيط**، استخدم [[flexbox-guide]] أو [[grid-guide]].

بعد الطفو، بنستخدم [[clear]] علشان عنصر تاني ينزل تحت الطافيين. ولو الأب مش بيحتوي أبناءه الطافيين، الحل الحديث: `display: flow-root` على الأب ([[display]]).

في الصفحات العربية استخدم القيمة المنطقية `float: inline-start` / `inline-end` علشان تشتغل في أي اتجاه.

> [!analogy] زي صورة في مجلة: الصورة طافية على جنب والنص بيلف حواليها.

> [!warn] الأب اللي كل أولاده طافيين بيبقى ارتفاعه صفر. حلها `display: flow-root`.

## try

```html
<style>
  .img { float:right; width:60px; height:60px; background:#c9772f; margin-inline-start:10px; border-radius:8px; }
  p { color:#3d2c18; background:#efe0bd; padding:8px; }
</style>
<p><span class="img"></span>النص بيلف حوالين الصورة الطافية. جرّب تغيّر right لـ left وشوف الفرق وكمّل الكلام لتشوف اللف.</p>
```

## syntax

```css nolive
float: left;
float: right;
float: none;
float: inline-start;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** لأ.
- العنصر الطافي بيتحول لـ block.

## values

### left
يطفو لليسار (الشمال).

### right
يطفو لليمين.

### none
لا يطفو (الافتراضي).

### inline-start / inline-end
حسب اتجاه اللغة (أفضل للعربي).

## use

- صورة وسط مقال والنص يلف حواليها.
- حرف أول كبير (drop cap).
- `shape-outside` لأشكال النص حوالين الطافي.

## avoid

- التخطيط الكامل بـ float (استخدم flex/grid).
- نسيان `clear` أو `flow-root` بعد الطافيين.

## examples

### 1) صورة والنص بيلف
الشكل الكلاسيكي.

```html
<style>
  .img { float:right; width:70px; height:70px; background:#3d7a5a; margin:0 0 6px 10px; border-radius:8px; }
  p { color:#3d2c18; background:#efe0bd; padding:8px; }
</style>
<p><span class="img"></span>نص طويل بيلف حوالين الصورة الطافية على اليمين. كمّل كتابة لحد ما ينزل تحت الصورة. النص ده بيوضح إزاي بيلف.</p>
```



### 2) الأب بيتهد
الأب ارتفاعه صفر لأن ابنه طافي.

```html
<style>
  .p { border:3px solid #a63b2f; background:#efe0bd; }
  .c { float:right; width:60px; height:40px; background:#c9772f; }
</style>
<div class="p"><div class="c"></div></div><div style="clear:both;height:6px"></div>
```



### 3) الحل: flow-root
`display:flow-root` على الأب.

```html
<style>
  .p { display:flow-root; border:3px solid #3d7a5a; background:#efe0bd; }
  .c { float:right; width:60px; height:40px; background:#c9772f; }
</style>
<div class="p"><div class="c"></div></div>
```



### 4) drop cap
حرف أول كبير بطفو.

```html
<style>
  p::first-letter { float:right; font-size:2.6em; line-height:.9; color:#b5551f; margin-inline-start:6px; }
  p { color:#3d2c18; background:#efe0bd; padding:8px; }
</style>
<p>بدايتنا النهاردة بحرف كبير زي الجرايد القديمة ونكمل باقي الكلام هنا.</p>
```



## mistakes

### تخطيط أعمدة بـ float

```css bad
.col { float:left; width:50%; }
```

```css good
.row { display:flex; }
.col { flex:1; }
```

الـ float بتعمل مشاكل ارتفاع وترتيب. flex/grid أنسب.

### نسيان clear

```css bad
.footer { /* بيطلع جنب الطافي */ }
```

```css good
.footer { clear:both; }
```

أي عنصر بعد الطافي لازم clear أو الأب flow-root.

## quiz

### الاستخدام الأنسب للـ float حالياً؟
- [ ] تخطيط الصفحة
- [x] صورة والنص بيلف حواليها
- [ ] أزرار
- [ ] أعمدة

دايمًا لف النص.

### لحل ارتفاع الأب الصفري؟
- [x] display:flow-root
- [ ] width:0
- [ ] position
- [ ] z-index

flow-root بيحتوي الطافيين.

### القيمة الافتراضية؟
- [ ] left
- [ ] right
- [x] none
- [ ] both

none.

## refs

- [MDN: float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
