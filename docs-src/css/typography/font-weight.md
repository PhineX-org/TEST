---
id: font-weight
kind: property
cat: typography
chip: font-weight
title: سُمك الخط
en: CSS font-weight property
status: stable
support: all
mdn: font-weight
summary: font-weight بتحدد سُمك الخط من 100 لـ 900. normal = 400 وbold = 700. الخطوط المتغيّرة بتدعم أي رقم.
keywords: font-weight, bold, سمك الخط, 400, 700, غامق, variable fonts, strong
related: font-style, font-family, font, font-size, text-transform
---

## intro

الخاصية `font-weight` بتحدد **سُمك (غلظة) الحروف**. القيم بالأرقام من **100** (رفيع جداً) لـ **900** (غامق جداً)، والكلمات: **`normal`** = 400 و**`bold`** = 700 و`lighter` و`bolder` (نسبية للأب). المتصفح الافتراضي بيكتب `<strong>` و`<b>` و`<h1>`–`<h6>` بـ bold.

نقطة مهمة جداً للمبتدئين: **الخط لازم يكون فيه الوزن ده فعلاً**. لو خطك ليه نسختين بس (عادي وغامق) وأنت كتبت `font-weight: 300` هيتعرض بالعادي، لأن المتصفح مش لاقي وزن 300؛ وممكن «يزوّر» الغامق لو الخط مفيهوش (faux bold) وده بيطلع شكله وحش. الخطوط المتغيّرة (**variable fonts**) بتدعم أي رقم بينهم (مثلاً 350).

للعربي: وزن 400 و700 كفاية للقراءة، ومتخلّيش كل الصفحة bold عشان التمييز يفضل واضح.

> [!tip] استخدم 400 للنص الأساسي و600–700 للعناوين والتأكيد؛ ده كفاية جداً.

## try

```html
<style>
  p { margin:2px 0; color:#3d2c18; font-size:1.2rem; }
</style>
<p style="font-weight:300">رفيع 300</p>
<p style="font-weight:400">عادي 400</p>
<p style="font-weight:600">نص غامق 600</p>
<p style="font-weight:800">غامق جداً 800</p>
```

## syntax

```css nolive
font-weight: normal;
font-weight: bold;
font-weight: 600;
font-weight: lighter;
font-weight: bolder;
```

- **القيمة المبدئية**: `normal` (400).
- **بتتوارث؟** أيوه.
- رقم من 1 لـ 1000.

## values

### 100–900
الأرقام (تتوقف على الخط).

### normal
= 400.

### bold
= 700.

### lighter / bolder
نسبي للأب.

## use

- العناوين والتأكيد.
- تدرج بصري بين العناصر.
- تمييز الأزرار والتسميات المهمة.

## avoid

- bold على كل النص.
- أوزان مش موجودة في الخط.

## examples

### 1) الأوزان
من الأرفع للأغمق.

```html
<style>
  span { display:block; font-size:1.1rem; color:#3d2c18; }
</style>
<span style="font-weight:100">100</span><span style="font-weight:300">300</span><span style="font-weight:400">400</span><span style="font-weight:600">600</span><span style="font-weight:900">900</span>
```



### 2) normal وbold
الكلمات الأشهر.

```html
<style>
  p { color:#3d2c18; font-size:1.2rem; margin:3px 0; }
</style>
<p style="font-weight:normal">normal</p><p style="font-weight:bold">bold</p>
```



### 3) bolder نسبي
بيعتمد على وزن الأب.

```html
<style>
  .a { font-weight:400; color:#3d2c18; font-size:1.2rem; }
  .a b { font-weight:bolder; }
</style>
<div class="a">عادي و<b>أغمق منه</b></div>
```



### 4) إلغاء سُمك العنوان
العنوان افتراضياً bold.

```html
<style>
  h4 { margin:4px 0; color:#7a4a1d; }
  .n { font-weight:normal; }
</style>
<h4>عنوان افتراضي (bold)</h4><h4 class="n">عنوان عادي</h4>
```



## mistakes

### وزن مش موجود

```css bad
body { font-weight:300; }  /* والخط مفيهوش 300 */
```

```css good
body { font-weight:400; }
```

تأكد إن الوزن محمّل.

### كل حاجة bold

```css bad
* { font-weight:bold; }
```

```css good
h1,h2,h3,strong { font-weight:700; }
```

لو كله غامق مفيش تمييز.

## quiz

### bold بتساوي؟
- [ ] 300
- [ ] 500
- [x] 700
- [ ] 900

700.

### لو الخط مفيهوش الوزن؟
- [ ] خطأ
- [x] أقرب وزن موجود
- [ ] النص يختفي
- [ ] يتكبّر

المتصفح بيختار الأقرب.

### الخطوط المتغيّرة بتدعم؟
- [x] أي رقم
- [ ] 100 و900 فقط
- [ ] bold فقط
- [ ] لا شيء

variable fonts.

## refs

- [MDN: font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
