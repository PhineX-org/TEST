---
id: padding-inline
kind: property
cat: logical
chip: padding-inline
title: حشو الاتجاه الأفقي (منطقي)
en: CSS padding-inline property
status: stable
support: all
mdn: padding-inline
summary: padding-inline بتحط حشو على جانبي العنصر في اتجاه الكتابة (بداية ونهاية). بتتقلب لوحدها في RTL.
keywords: padding-inline, حشو, logical, rtl, padding
related: padding-block, padding-inline-start, padding-inline-end, padding, logical-properties-guide
---

## intro

الخاصية `padding-inline` هي النسخة المنطقية من `padding-left` و`padding-right`. زي [[margin-inline]] بالظبط لكن للحشو **جوه** الصندوق بدل الهامش بره. `padding-inline: 16px;` يعني 16 على **بداية ونهاية** السطر. وبقيمتين: `padding-inline: 8px 20px;` (بداية ثم نهاية). وبتتقلب مع اتجاه الصفحة تلقائي: لو عندك زرار بحشو أكبر من جهة البداية عشان أيقونة، `padding-inline-start: 40px;` هتشتغل في العربي والإنجليزي بنفس السطر. وشائعة جداً في الأزرار: `padding-block: 8px; padding-inline: 16px;` بدل `padding: 8px 16px`. ولا تنسى إن الحشو بيزوّد حجم الصندوق إلا لو `box-sizing: border-box`. تخيّل الحشو زي «البطانة» جوه علبة هدايا: بتبعد الهدية عن جدار العلبة، وكلمة inline بتقول لك إنك بتتكلم عن البطانة اللي على جنبي السطر، من غير ما تقول يمين ولا شمال. وده بيخلّي نفس الستايل يشتغل صح لو موقعك عربي وإنجليزي مع بعض، وكمان لو حد قلب الصفحة بـ `dir`.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><span class="i" style="display:inline-block;padding-inline:30px">حشو أفقي 30</span> <span class="i" style="display:inline-block;padding-inline:6px">حشو 6</span></div>
```

## syntax

```css nolive
padding-inline: 16px;
padding-inline: 8px 24px;
button { padding-block: 8px; padding-inline: 18px; }
```

- **القيمة المبدئية**: `0`.
- الأولى بداية والتانية نهاية.
- لا تقبل `auto`.

## values

### `<length>`
مسافة.

### `<percentage>`
نسبة من عرض الأب.

### 0
بدون حشو (الافتراضي).

## use

- أزرار بحشو أفقي.
- قوايم وبطاقات بحشو جانبي.
- حشو أكبر عند أيقونة (start).

## avoid

- padding-left في موقع بيتقلب.
- نسيان box-sizing فيتخطى الصندوق العرض.

## examples

### 1) زرار
block وinline.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<button style="padding-block:8px;padding-inline:22px;border:0;border-radius:8px;background:#c9772f;color:#f3ede0;font-weight:bold">زرار</button>
```



### 2) قيمتين
بداية ونهاية مختلفة.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="padding-inline:40px 8px">بداية 40 / نهاية 8</div></div>
```



### 3) LTR
نفس الكود بيتقلب.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="ltr" class="w"><div class="i" style="padding-inline:40px 8px">start 40 / end 8</div></div>
```



### 4) بطاقة
حشو جانبي.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="padding-inline:24px;background:#efe0bd">بطاقة بحشو جانبي 24</div>
```



## mistakes

### حشو left ثابت

```css bad
.btn { padding-left:20px; padding-right:12px; }
```

```css good
.btn { padding-inline:12px 20px; }
```

يتقلب مع الاتجاه.

### محاولة auto

```css bad
.a { padding-inline:auto; }
```

```css good
.a { padding-inline:16px; }
```

الحشو مش بيقبل auto.

## quiz

### padding-inline مكافئة لـ؟
- [x] left وright
- [ ] top وbottom
- [ ] كل الجهات
- [ ] margin

الأفقي.

### بتقبل auto؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] فقط flex

مفيش auto للحشو.

### الأولى بتمثل؟
- [x] البداية
- [ ] النهاية
- [ ] اليمين
- [ ] الأعلى

start.

## refs

- [MDN: padding-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline)
