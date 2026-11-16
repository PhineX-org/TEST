---
id: position
kind: property
cat: layout
chip: position
title: طريقة التموضع
en: CSS position property
status: stable
support: all
mdn: position
summary: position بتحدد طريقة تحديد مكان العنصر: static وrelative وabsolute وfixed وsticky. مرجع التموضع وإزاي تستخدم top/left معاها.
keywords: position, static, relative, absolute, fixed, sticky, top, left, z-index, تموضع, مرجع, sticky header
related: top, left, z-index, inset, positioning-guide, display
---

## intro

الخاصية `position` بتحدد **إزاي المتصفح بيحدد مكان العنصر** ومعاها خصائص الإزاحة [[top]] و[[right]] و[[bottom]] و[[left]] (أو الاختصار [[inset]]). دليل كامل مبسّط في [[positioning-guide]].

القيم:
- **`static`**: الافتراضي. العنصر في التدفق الطبيعي، و`top/left` بتتجاهل.
- **`relative`**: في مكانه الطبيعي (ويسيب فراغه)، وبتقدر تزحزحه بـ `top/left`. وبيبقى **مرجع** للأبناء absolute.
- **`absolute`**: بيخرج من التدفق ويتحط بالنسبة لأقرب أب **غير static**. لو مفيش، بالنسبة للصفحة (initial containing block).
- **`fixed`**: بالنسبة لنافذة المتصفح، ويفضل ثابت مع السكرول.
- **`sticky`**: عادي لحد ما توصله بالسكرول، وبعدين بيلزق في مكانه (محتاج `top` مثلاً).

أي قيمة غير `static` بتخلّي العنصر **positioned**، وبتخلّي [[z-index]] يشتغل عليه، وبتخلّيه مرجع للأبناء absolute.

> [!analogy] relative = ورقة معلقة اتزحزحت. absolute = دبوس على لوحة الأب. fixed = ملصق على زجاج الشاشة. sticky = شريط بيلزق في الحيطة لما توصله.

> [!key] علشان `absolute` يتحط بالنسبة للأب: خلّي الأب `position: relative`.

## try

```html
<style>
  .p { position:relative; height:90px; background:#efe0bd; color:#3d2c18; padding:8px; }
  .c { position:absolute; bottom:8px; left:8px; background:#b5551f; color:#f3ede0; padding:4px 12px; }
</style>
<div class="p">الأب relative<span class="c">absolute جوّاه</span></div>
```

## syntax

```css nolive
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
top: 10px; left: 0;
```

- **القيمة المبدئية**: `static`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** لأ (discrete).

## values

### static
التدفق الطبيعي. `top/left` مالهاش أثر.

### relative
زحزحة نسبية من مكانه الأصلي، ومرجع للأبناء.

### absolute
خارج التدفق، بالنسبة لأقرب أب positioned.

### fixed
بالنسبة لنافذة المتصفح، ثابت مع السكرول.

### sticky
يلزق عند حد معين أثناء السكرول.

## use

- `absolute` لشارات وأيقونات فوق عنصر (مع أب relative).
- `fixed` لشريط تنقل أو زر «لأعلى».
- `sticky` لعناوين الجداول والـ sidebar.
- `relative` لتفعيل z-index أو كمرجع.

## avoid

- استخدام absolute للتخطيط الأساسي (استخدم flex/grid).
- `fixed` على عناصر كبيرة تغطي المحتوى على الموبايل.

## examples

### 1) absolute جوه relative
الشارة اتثبّتت في ركن الأب.

```html
<style>
  .c { position:relative; width:200px; height:90px; background:#efe0bd; color:#3d2c18; padding:10px; }
  .t { position:absolute; top:0; right:0; background:#3d7a5a; color:#f3ede0; padding:3px 10px; }
</style>
<div class="c">كارت<span class="t">جديد</span></div>
```



### 2) relative بيزحزح
زحزحة 20px لتحت مع بقاء المكان الأصلي.

```html
<style>
  .b { background:#efe0bd; color:#3d2c18; padding:8px; margin:4px 0; }
  .m { position:relative; top:16px; left:24px; background:#bcd4a8; }
</style>
<div class="b">1</div><div class="b m">2 (relative)</div><div class="b">3</div>
```



### 3) sticky
اسحب جوه الصندوق.

```html
<style>
  .s { height:110px; overflow:auto; background:#efe0bd; color:#3d2c18; }
  .s h4 { position:sticky; top:0; background:#7a4a1d; color:#f3ede0; margin:0; padding:6px; }
  .s p { margin:0; padding:14px 8px; }
</style>
<div class="s"><h4>عنوان لازق</h4><p>1</p><p>2</p><p>3</p><p>4</p></div>
```



### 4) fixed في iframe
العنصر ثابت بالنسبة للنافذة.

```html
<style>
  .f { position:fixed; bottom:8px; left:8px; background:#b5551f; color:#f3ede0; padding:6px 12px; border-radius:20px; }
</style>
<div style="height:140px;color:#3d2c18">محتوى الصفحة</div><div class="f">fixed</div>
```



## mistakes

### نسيان position للأب

```css bad
.badge { position:absolute; top:0; right:0; }  /* هيروح لركن الصفحة */
```

```css good
.card { position:relative; }
.badge { position:absolute; top:0; right:0; }
```

absolute بيدوّر على أقرب أب positioned.

### sticky من غير top

```css bad
.h { position:sticky; }  /* مبيلزقش */
```

```css good
.h { position:sticky; top:0; }
```

لازم تحدد حافة يلزق عندها.

## quiz

### أنهي بيتحط بالنسبة لنافذة المتصفح؟
- [ ] absolute
- [x] fixed
- [ ] relative
- [ ] static

fixed.

### الافتراضي؟
- [ ] relative
- [ ] absolute
- [x] static
- [ ] sticky

static.

### absolute بيرجع لـ؟
- [ ] الصفحة دايماً
- [x] أقرب أب positioned
- [ ] الأخ
- [ ] نفسه

أقرب جد غير static.

## refs

- [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
