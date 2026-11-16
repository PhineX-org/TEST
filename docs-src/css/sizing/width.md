---
id: width
kind: property
cat: sizing
chip: width
title: خاصية العرض
en: CSS width property
status: stable
support: all
mdn: width
summary: width بتحدد عرض منطقة المحتوى في العنصر. تقدر تستخدم px أو % أو rem أو auto أو max-content، وتتأثر بـ box-sizing.
keywords: width, عرض, العرض, حجم, auto, percent, max-content, fit-content, box-sizing, عرض العنصر
related: height, max-width, min-width, box-sizing, box-model, dt-length
---

## intro

الخاصية `width` بتحدد **عرض** العنصر. وبشكل افتراضي (`box-sizing: content-box`) بتحدد عرض **منطقة المحتوى بس**، وبعدين الحشو والحد بيتضافوا عليها ([[box-model]]). فلو حطيت `box-sizing: border-box` ([[box-sizing]]) الـ `width` هيشمل الحشو والحد.

القيمة الافتراضية `auto`: عناصر الـ block بتتمدد لحد عرض الأب كله، وعناصر الـ inline مبتقبلش `width` أصلاً (لازم تخليها `inline-block` أو `block`).

الأنواع المهمة:
- **طول ثابت**: `300px`، `20rem`، `50ch`.
- **نسبة**: `50%` من عرض **الأب**.
- **`auto`**: المتصفح يحسب (block = الأب كله).
- **كلمات مفتاحية**: `max-content` (أعرض من المحتوى بدون سطر جديد)، `min-content` (أضيق شيء ممكن)، `fit-content` (بيكبر حسب المحتوى لحد حد أقصى).

ولو عايز عرض **مرن** (مناسب للموبايل) استخدم `max-width` ([[max-width]]) بدل `width` الثابت، علشان العنصر ميطلعش برّه الشاشة.

> [!analogy] `width` زي عرض ورقة: ممكن تحدد بالسنتيمتر (px)، أو تقول «نص عرض الطاولة» (%)، أو «على قد الكلام» (fit-content).

> [!warn] لو حطيت `width: 100%` ومعاه `padding` من غير `border-box`، العنصر هيعدّي الأب ويعمل سكرول أفقي.

## try

```html
<style>
  .b { width:60%; background:#bcd4a8; color:#3d2c18; padding:10px; margin-bottom:6px; }
  .p { width:240px; background:#efe0bd; padding:6px; }
</style>
<div class="p"><div class="b">60% من 240px</div></div>
```

## syntax

```css nolive
width: 300px;
width: 50%;
width: auto;
width: max-content;
width: min(100%, 600px);
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.
- لا تقبل قيم سالبة.

## values

### `<length>`
عرض ثابت بوحدة: `300px` أو `20rem`.

### `<percentage>`
نسبة من عرض الأب (container block). `50%` = نص الأب.

### auto
القيمة الافتراضية: block بيملا الأب، inline حسب المحتوى.

### max-content
أعرض ما يمكن للمحتوى من غير لف الأسطر.

### min-content
أضيق عرض ممكن (أطول كلمة).

### fit-content
بيتمدد حسب المحتوى لكن مش أكتر من المساحة المتاحة.

## use

- تحديد عرض عمود جانبي ثابت (`width: 280px`).
- عرض نسبي لعناصر في الصفحة (`width: 50%`).
- `width: fit-content` لعنصر يلف على قد محتواه.
- `width: min(100%, 600px)` علشان مرونة.

## avoid

- `width` ثابت كبير للحاويات (بيعمل scroll أفقي في الموبايل).
- `width:100%` مع padding من غير `border-box`.

## examples

### 1) px مقابل نسبة
الأول ثابت 150px والتاني نص عرض الأب.

```html
<style>
  .p { width:300px; background:#efe0bd; padding:6px; }
  .a { width:150px; background:#bcd4a8; color:#3d2c18; padding:6px; margin-bottom:4px; }
  .b { width:50%; background:#e4c490; color:#3d2c18; padding:6px; }
</style>
<div class="p"><div class="a">150px</div><div class="b">50%</div></div>
```



### 2) فخ الحشو
العرض 100% + حشو 20px بيزيد عن الأب. `border-box` بيحلها.

```html
<style>
  .p { width:240px; background:#efe0bd; padding:4px; }
  .bad { width:100%; padding:20px; background:#e4a090; color:#3d2c18; }
  .good { width:100%; padding:20px; background:#bcd4a8; color:#3d2c18; box-sizing:border-box; margin-top:6px; }
</style>
<div class="p"><div class="bad">طلع برّه</div><div class="good">مضبوط</div></div>
```



### 3) fit-content
العنصر على قد الكلام مش الأب كله.

```html
<style>
  .t { width:fit-content; background:#7a4a1d; color:#f3ede0; padding:8px 18px; border-radius:20px; }
</style>
<div class="t">وسم قصير</div>
```



### 4) min و max
العرض بيتحدد بالأصغر: 100% أو 300px.

```html
<style>
  .w { width:min(100%, 300px); background:#3d7a5a; color:#f3ede0; padding:10px; box-sizing:border-box; }
</style>
<div class="w">لا يزيد عن 300px</div>
```

- `min()` بتختار الأصغر.

## mistakes

### width على عنصر inline

```css bad
span { width:200px; }  /* مفيش تأثير */
```

```css good
span { display:inline-block; width:200px; }
```

العناصر inline مبتقبلش width.

### عرض ثابت للحاوية

```css bad
.page { width:1200px; }
```

```css good
.page { width:min(1200px,100%); margin-inline:auto; }
```

العرض الثابت بيعمل scroll أفقي على الموبايل.

## quiz

### القيمة الافتراضية للـ width؟
- [ ] 0
- [ ] 100%
- [x] auto
- [ ] none

auto.

### `width: 50%` نسبة من؟
- [ ] عرض الشاشة
- [x] عرض الأب
- [ ] ارتفاع الأب
- [ ] عرض الصفحة كلها

عرض الأب (containing block).

### أنهي عنصر مبيقبلش width؟
- [ ] div
- [ ] p
- [x] span (inline)
- [ ] img

العناصر inline.

## refs

- [MDN: width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
