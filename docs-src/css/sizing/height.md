---
id: height
kind: property
cat: sizing
chip: height
title: خاصية الارتفاع
en: CSS height property
status: stable
support: all
mdn: height
summary: height بتحدد ارتفاع العنصر. الافتراضي auto حسب المحتوى. النسبة % محتاجة ارتفاع للأب، وفيه وحدات vh وdvh لارتفاع الشاشة.
keywords: height, ارتفاع, الطول, vh, dvh, auto, percent, min-height, ارتفاع العنصر, 100vh
related: width, min-height, max-height, box-sizing, box-model, units
---

## intro

الخاصية `height` بتحدد **ارتفاع** العنصر. الافتراضي `auto` يعني الارتفاع بيتحدد **حسب المحتوى**: كل ما تزوّد نص العنصر بيطول. فالأفضل متثبتش ارتفاع ثابت للنصوص، لأن لو المحتوى زاد (أو المستخدم كبّر الخط) هيطلع برّه الصندوق.

أهم نقطة بتلخبط المبتدئين: **`height: 50%` مبتشتغلش** إلا لو الأب **ليه ارتفاع محدد** (مش auto). لأن النسبة بتتحسب من ارتفاع الأب، ولو الأب ارتفاعه مرتبط بالأولاد بيبقى دايرة مفرغة، فالمتصفح بيتجاهل النسبة ويرجّع `auto`.

الحل لملء الشاشة: استخدم **وحدات الـ viewport**: `100vh` (ارتفاع الشاشة)، أو `100dvh` الأدق على الموبايل لأنه بيراعي شريط المتصفح المتغيّر. أو `min-height: 100vh` ([[min-height]]) علشان الصفحة ما تقلّش عن الشاشة لكن تزيد لو المحتوى أكتر.

زي [[width]]، النتيجة بتتأثر بـ [[box-sizing]].

> [!analogy] `height` زي ارتفاع رف الكتب: لو حددته بـ 30 سم وحطيت كتب أطول، هتطلع من الرف!

> [!tip] للأقسام الكبيرة استخدم `min-height` مش `height` علشان المحتوى الزايد ميتقصش.

## try

```html
<style>
  .b { height:80px; background:#bcd4a8; color:#3d2c18; padding:8px; box-sizing:border-box; }
</style>
<div class="b">height: 80px</div>
```

## syntax

```css nolive
height: 200px;
height: 50vh;
height: 100dvh;
height: auto;
height: 50%;   /* لو الأب ارتفاعه محدد */
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<length>`
ارتفاع ثابت: `200px`، `12rem`.

### `<percentage>`
نسبة من ارتفاع الأب (لازم يكون محدد).

### auto
حسب المحتوى (الافتراضي).

### vh / dvh
نسبة من ارتفاع نافذة العرض. `dvh` أدق في الموبايل.

## use

- صور أو صناديق بارتفاع ثابت (`height: 200px`).
- قسم ملء الشاشة (`min-height: 100dvh`).
- أيقونات ودوائر بأبعاد محددة.

## avoid

- ارتفاع ثابت لنص (بيطلع برّه الصندوق).
- `height:100%` من غير ارتفاع للأب.

## examples

### 1) ارتفاع ثابت يقصّ المحتوى
المحتوى الزايد بيطلع برّه من غير overflow.

```html
<style>
  .b { height:50px; background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; overflow:hidden; }
</style>
<div class="b">سطر أول<br>سطر تاني<br>سطر تالت (مقصوص)</div>
```



### 2) النسبة محتاجة أب محدد
الأول شغال لأن الأب له ارتفاع. التاني مفيش.

```html
<style>
  .p { height:100px; background:#efe0bd; padding:4px; display:flex; gap:6px; }
  .c { background:#bcd4a8; color:#3d2c18; height:50%; width:80px; }
</style>
<div class="p"><div class="c">50%</div></div>
```



### 3) min-height
أقل ارتفاع مضمون، بيزيد لو المحتوى أكتر.

```html
<style>
  .b { min-height:90px; background:#e4c490; color:#3d2c18; padding:8px; }
</style>
<div class="b">قصير لكن ليه حد أدنى</div>
```



### 4) مربع بالـ aspect-ratio
بدل ما تحسب الارتفاع.

```html
<style>
  .s { width:120px; aspect-ratio:1; background:#7a4a1d; color:#f3ede0; display:grid; place-items:center; }
</style>
<div class="s">1:1</div>
```



## mistakes

### height:100% بدون أب محدد

```css bad
.c { height:100%; }  /* مفيش تأثير */
```

```css good
html, body { height:100%; }
.c { height:100%; }
```

النسبة محتاجة ارتفاع للأب كله حتى الجذر.

### ارتفاع ثابت للنص

```css bad
.card { height:100px; }
```

```css good
.card { min-height:100px; }
```

المحتوى لو زاد هيطلع برّه.

## quiz

### `height:auto` معناها؟
- [ ] 0
- [x] حسب المحتوى
- [ ] 100%
- [ ] ثابت

الافتراضي.

### ليه `height:50%` ممكن متشتغلش؟
- [ ] خطأ في الصياغة
- [x] الأب ارتفاعه auto
- [ ] النسب ممنوعة
- [ ] العنصر inline

النسبة تحتاج أب محدد.

### أنسب وحدة لملء شاشة الموبايل؟
- [ ] px
- [ ] vh
- [x] dvh
- [ ] em

`dvh` بيراعي الشريط المتحرك.

## refs

- [MDN: height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
