---
id: outline
kind: property
cat: borders-bg
chip: outline
title: الإطار الخارجي (Outline)
en: CSS outline property
status: stable
support: all
mdn: outline
summary: outline بترسم خط حوالين العنصر من غير ما تاخد مساحة أو تغيّر التخطيط. أساس مؤشر التركيز (focus) للوصولية.
keywords: outline, اطار خارجي, focus, outline-offset, accessibility, focus ring, تركيز
related: border, outline-offset, focus-visible, box-shadow, css-best-practices
---

## intro

الخاصية `outline` بترسم خط **حوالين** العنصر (برّه الحد)، وشكلها زي [[border]]: `outline: 2px solid #c9772f`. لكن فيه فروق جوهرية:
- **مبتاخدش مساحة**: مبتزوّدش حجم العنصر ومبتحرّكش جيرانه (مفيدة لـ hover بدون قفز).
- **مش بتتبع الزوايا المدوّرة** تاريخياً (المتصفحات الحديثة بتتبعها دلوقتي).
- **مش ممكن تحدد جهة واحدة**: دايماً على كل الأطراف.
- ممكن **تتحرك بعيد** عن العنصر بـ [[outline-offset]].

الاستخدام الأهم: **مؤشر التركيز (focus ring)**: لما المستخدم بيستخدم الكيبورد (Tab) المتصفح بيرسم outline على العنصر اللي واخد التركيز. **متشيلوش** (`outline: none`) من غير بديل واضح، لأن ده بيخلّي مستخدمي الكيبورد ما يعرفوش هما فين (مشكلة وصولية كبيرة). والأفضل تخصصه بـ `:focus-visible` ([[focus-visible]]).

> [!warn] `outline: none` من غير بديل = موقع مش قابل للاستخدام بالكيبورد.

> [!analogy] الـ outline زي مرسوم خط بقلم رصاص حوالين الصورة من برّه: مبيحتلش مساحة وممكن تمسحه وتحطه بسهولة.

## try

```html
<style>
  button { padding:8px 18px; background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; border-radius:8px; }
  button:focus-visible { outline:3px solid #c9772f; outline-offset:3px; }
</style>
<button>اضغط Tab للتركيز</button>
```

## syntax

```css nolive
outline: 2px solid #c9772f;
outline: 3px dashed currentColor;
outline-offset: 3px;
outline: none;   /* خطر! */
```

- **القيمة المبدئية**: `medium none currentcolor`.
- لا تاخد مساحة.
- مش بتقبل جهة واحدة.

## values

### `<width> <style> <color>`
نفس صيغة border.

### auto
شكل المتصفح الافتراضي للتركيز.

### none
بدون (حذر!).

## use

- مؤشر التركيز `:focus-visible`.
- إبراز عنصر بدون تغيير التخطيط.
- تصحيح (debug) حدود العناصر.

## avoid

- `outline:none` من غير بديل.
- استخدامه كبديل للحدود الدائمة.

## examples

### 1) focus ring
اضغط Tab لتشوف الإطار.

```html
<style>
  a { display:inline-block; padding:8px 16px; background:#7a4a1d; color:#f3ede0; border-radius:8px; text-decoration:none; }
  a:focus-visible { outline:3px solid #e4c490; outline-offset:3px; }
</style>
<a href="#">رابط</a>
```



### 2) مفيش قفز
الـ border بيحرّك التخطيط، الـ outline لأ. مرّر الماوس.

```html
<style>
  div { padding:8px; margin:6px 0; background:#efe0bd; color:#3d2c18; }
  .b:hover { border:4px solid #a63b2f; }
  .o:hover { outline:4px solid #3d7a5a; }
</style>
<div class="b">border (بيقفز)</div><div class="o">outline (ثابت)</div>
```



### 3) outline-offset
المسافة بين العنصر والـ outline.

```html
<style>
  .o { outline:3px solid #c9772f; outline-offset:8px; padding:8px; background:#efe0bd; color:#3d2c18; margin:12px; display:inline-block; }
</style>
<div class="o">بعيد 8px</div>
```



### 4) debug
outline على كل العناصر.

```html
<style>
  .d * { outline:1px solid #c9772f; }
  .d { padding:8px; color:#3d2c18; }
</style>
<div class="d">أب<p style="margin:6px">فقرة<span>span</span></p></div>
```



## mistakes

### إزالة التركيز

```css bad
a:focus { outline:none; }
```

```css good
a:focus-visible { outline:3px solid #c9772f; outline-offset:3px; }
```

المستخدمين بالكيبورد بيضيعوا.

### محاولة جهة واحدة

```css bad
.a { outline-top:2px solid red; }  /* مش موجودة */
```

```css good
.a { border-top:2px solid red; }
```

outline على كل الجهات دايماً.

## quiz

### outline بتاخد مساحة؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط solid

مبتغيّرش التخطيط.

### أهم استخدام؟
- [ ] تزيين
- [x] مؤشر تركيز الكيبورد
- [ ] ظل
- [ ] تدوير

focus ring.

### outline:none من غير بديل؟
- [ ] مفيد
- [x] مشكلة وصولية
- [ ] أسرع
- [ ] مطلوب

بتخفي التركيز.

## refs

- [MDN: outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)
