---
id: border-inline-start
kind: property
cat: logical
chip: border-inline-start
title: حد بداية السطر (منطقي)
en: CSS border-inline-start property
status: stable
support: all
size: compact
mdn: border-inline-start
summary: border-inline-start حد عند بداية السطر: يمين في العربي وشمال في الإنجليزي. مثالي لخطوط تمييز الاقتباسات والتنبيهات.
keywords: border-inline-start, حد جانبي, logical, blockquote, callout
related: border-left, border-right, border-radius, padding-inline-start
---

## intro

الخاصية `border-inline-start` بتحط **حد (border)** عند بداية السطر فقط: يمين في العربي وشمال في الإنجليزي. اختصار بيجمع العرض والنمط واللون: `border-inline-start: 4px solid #c9772f;`. أشهر استخدام: **الخط الجانبي المميّز** للاقتباسات والتنبيهات (callouts)، وده بالظبط شكل التنبيهات اللي في الموقع ده. بدل `border-left` اللي في العربي هتحط الخط في الجهة الغلط، `border-inline-start` بتحطه جنب بداية النص صح. فيه `border-inline-end` و`border-block-start` وغيرهم، و`border-inline` لكلا الجانبين.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w" style="border-inline-start:5px solid #c9772f;padding-inline-start:12px">اقتباس بخط جانبي (RTL)</div>
<div dir="ltr" class="w" style="border-inline-start:5px solid #3d7a5a;padding-inline-start:12px">quote with start border (LTR)</div>
```

## syntax

```css nolive
blockquote { border-inline-start: 4px solid #c9772f; padding-inline-start: 12px; }
```

- **القيمة المبدئية**: `medium none currentcolor`.
- لازم style عشان يظهر.

## values

### `<width> <style> <color>`
العرض والنمط واللون.

### none
بدون حد.

## use

- اقتباسات وتنبيهات.
- تمييز عنصر نشط في قايمة.

## avoid

- border-left في محتوى عربي.
- نسيان style فلا يظهر الحد.

## examples

### 1) تنبيه
خط جانبي.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="border-inline-start:5px solid #b5551f;padding-inline-start:12px;background:#efe0bd">تنبيه مهم بخط جانبي</div>
```



### 2) RTL مقابل LTR
نفس الكود.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w" style="border-inline-start:5px solid #c9772f;padding-inline-start:10px">عربي</div><div dir="ltr" class="w" style="border-inline-start:5px solid #c9772f;padding-inline-start:10px">English</div>
```



### 3) قايمة نشطة
تمييز العنصر.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="padding:0"><div style="padding:8px 12px">عادي</div><div style="padding:8px 12px;background:#e4c490;border-inline-start:4px solid #7a4a1d">نشط</div></div>
```



## mistakes

### border-left في العربي

```css bad
.q { border-left:4px solid #c9772f; }  /* جهة غلط في RTL */
```

```css good
.q { border-inline-start:4px solid #c9772f; }
```

بداية السطر الصح.

## quiz

### border-inline-start في RTL؟
- [x] يمين
- [ ] شمال
- [ ] فوق
- [ ] تحت

يمين.

### أشهر استخدام؟
- [x] خط جانبي للتنبيهات
- [ ] ظل
- [ ] خلفية
- [ ] حركة

callouts.

## refs

- [MDN: border-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start)
