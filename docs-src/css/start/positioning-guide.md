---
id: positioning-guide
kind: guide
cat: start
title: التموضع: position
en: CSS positioning
status: stable
summary: إزاي تحرّك عنصر من مكانه الطبيعي: static وrelative وabsolute وfixed وsticky، ومرجع كل واحد، وإزاي تعمل شارة فوق صورة أو شريط ثابت.
keywords: position, absolute, relative, fixed, sticky, top, left, z-index, تموضع, عنصر ثابت, شريط ثابت, badge, طبقات
related: position, top, bottom, z-index, inset, display-flow, box-model
---

## intro

الـ [[position]] بتحدد **إزاي العنصر بيتحط** في الصفحة، وبتشتغل مع [[top]] و[[right]] و[[bottom]] و[[left]] (وتقدر تختصرهم بـ [[inset]]).

القيم الخمسة:
- **`static`**: الافتراضي. مبيقبلش `top/left`. بيمشي في التدفق الطبيعي.
- **`relative`**: بيفضل في مكانه الأصلي (ويسيب فراغه)، لكن تقدر **تزحزحه** بـ `top/left`. وأهم استخدام له إنه يبقى **مرجع** للأبناء `absolute`.
- **`absolute`**: بيخرج من التدفق (مبياخدش مكان) وبيتحط **بالنسبة لأقرب أب فيه position غير static**. لو مفيش، بالنسبة للصفحة.
- **`fixed`**: بيتحط **بالنسبة لنافذة المتصفح** وبيفضل ثابت وانت بتسكرول (شريط تنقل ثابت، زر «لأعلى»).
- **`sticky`**: خليط: عادي لحد ما توصله بالسكرول، وبعدين **يلزق** في مكانه (عناوين الجداول، الـ sidebar).

> [!analogy] relative زي ورقة معلّقة بتتحرك شوية من مكانها. absolute زي دبوس بتثبته على لوحة معينة (الأب). fixed زي ملصق على زجاج الشاشة نفسها. sticky زي شريط بيلزق في الحيطة لما توصله.

> [!key] القاعدة الذهبية: اعمل للأب `position: relative` علشان الابن الـ absolute يتحط بالنسبة له.

ولو عنصرين اتداخلوا، **[[z-index]]** هو اللي بيحدد مين فوق مين (بس على عناصر عندها position).

## try

```html
<style>
  .parent { position:relative; height:100px; background:#efe0bd; }
  .badge { position:absolute; top:8px; left:8px; background:#b5551f; color:#f3ede0;
           padding:4px 10px; border-radius:12px; }
</style>
<div class="parent">الأب<span class="badge">جديد</span></div>
```

## examples

### 1) absolute جوه relative
الشارة اتحطت في ركن الأب بالظبط.

```html
<style>
  .card { position:relative; width:220px; height:110px; background:#efe0bd; color:#3d2c18; padding:10px; }
  .tag { position:absolute; top:0; left:0; background:#3d7a5a; color:#f3ede0; padding:3px 10px; }
</style>
<div class="card">كارت<span class="tag">جديد</span></div>
```

- من غير relative للأب الشارة كانت هتروح لركن الصفحة.

### 2) relative للزحزحة
العنصر اتزحزح 20px لتحت لكن سيب مكانه الأصلي فارغ.

```html
<style>
  .b { padding:10px; background:#efe0bd; color:#3d2c18; margin:4px 0; }
  .mv { position:relative; top:20px; left:30px; background:#bcd4a8; }
</style>
<div class="b">1</div><div class="b mv">2 (relative)</div><div class="b">3</div>
```



### 3) sticky: سكرول جوه الصندوق
اسحب جوه الصندوق وشوف العنوان بيلزق فوق.

```html
<style>
  .scroll { height:130px; overflow:auto; background:#efe0bd; color:#3d2c18; }
  .scroll h4 { position:sticky; top:0; margin:0; padding:6px; background:#7a4a1d; color:#f3ede0; }
  .scroll p { margin:0; padding:14px 8px; }
</style>
<div class="scroll"><h4>عنوان لازق</h4><p>سطر 1</p><p>سطر 2</p><p>سطر 3</p><p>سطر 4</p><p>سطر 5</p></div>
```

- sticky محتاج `top`.

### 4) z-index والطبقات
التلات مربعات متداخلين. الأعلى z-index هو اللي فوق.

```html
<style>
  .s { position:absolute; width:90px; height:90px; color:#2f2820; padding:6px; }
  .s1 { background:#efe0bd; top:10px; right:10px; z-index:1; }
  .s2 { background:#bcd4a8; top:40px; right:50px; z-index:3; }
  .s3 { background:#e4c490; top:70px; right:90px; z-index:2; }
  .wrap { position:relative; height:180px; }
</style>
<div class="wrap"><div class="s s1">1</div><div class="s s2">3</div><div class="s s3">2</div></div>
```



## mistakes

### نسيان position للأب

```css bad
.icon { position:absolute; top:0; left:0; }  /* هيطلع لركن الصفحة */
```

```css good
.card { position:relative; }
.icon { position:absolute; top:0; left:0; }
```

الابن absolute بيدوّر على أقرب أب positioned.

### z-index من غير position

```css bad
.a { z-index:10; }  /* ملوش أثر */
```

```css good
.a { position:relative; z-index:10; }
```

z-index بيشتغل على العناصر positioned (أو في flex/grid).

## quiz

### أنهي قيمة بتثبّت العنصر بالنسبة لنافذة المتصفح؟
- [ ] relative
- [ ] absolute
- [x] fixed
- [ ] static

fixed مرجعه الـ viewport.

### absolute بيتحط بالنسبة لـ؟
- [ ] الصفحة دايماً
- [x] أقرب أب positioned
- [ ] أخوه
- [ ] نفسه

أقرب جد غير static.

### sticky بيحتاج؟
- [ ] width
- [x] top (أو left/…)
- [ ] z-index
- [ ] display:block

لازم تحدد أنهي حافة يلزق فيها.

## refs

- [MDN: Positioning](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning)
