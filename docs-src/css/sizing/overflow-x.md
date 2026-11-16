---
id: overflow-x
kind: property
cat: sizing
chip: overflow-x
title: التمرير الأفقي
en: CSS overflow-x property
status: stable
support: all
size: compact
mdn: overflow-x
summary: overflow-x بتتحكم في المحتوى الزايد أفقياً بس. مفيدة للجداول والكود العريض، من غير ما تأثر على السكرول الرأسي.
keywords: overflow-x, scroll افقي, horizontal scroll, جدول, كود, auto, hidden
related: overflow, overflow-y, width, max-width, scroll-snap-type
---

## intro

الخاصية `overflow-x` هي نفس [[overflow]] لكنها بتتحكم في **الاتجاه الأفقي** بس (يمين/شمال). بتستخدمها لما عايز مثلاً **جدول عريض** أو **سطر كود طويل** يسكرول أفقياً جوه صندوقه من غير ما الصفحة كلها تعمل scroll أفقي (وده بيبوّظ تجربة الموبايل).

القيم نفسها: `visible` و`hidden` و`scroll` و`auto` و`clip`.

نقطة مهمة: لو كتبت `overflow-x` بقيمة غير `visible`، والـ `overflow-y` سيبته `visible`، المتصفح بيحوّل `overflow-y` لـ `auto` تلقائياً. مينفعش واحد visible والتاني scroll.

> [!tip] ضيف على الغلاف: `overflow-x: auto; max-width: 100%` لأي جدول أو كود عريض.

## try

```html
<style>
  .w { width:180px; overflow-x:auto; background:#efe0bd; padding:6px; white-space:nowrap; color:#3d2c18; }
</style>
<div class="w">سطر طويل جداً بيعمل سكرول أفقي جوه الصندوق فقط</div>
```

## syntax

```css nolive
overflow-x: auto;
overflow-x: hidden;
overflow-x: scroll;
```

- **القيمة المبدئية**: `visible`.
- لو غير visible و y visible → y بتبقى auto.

## values

### auto
scrollbar أفقي لو لازم.

### hidden
يقص الزايد أفقياً.

### scroll
scrollbar أفقي دايماً.

## use

- غلاف جدول عريض.
- سلايدر أفقي بسيط.

## avoid

- `overflow-x:hidden` على body لإخفاء مشكلة عرض (بيخبّي العيب).

## examples

### 1) غلاف جدول
الجدول بيسكرول جوه الغلاف.

```html
<style>
  .w { overflow-x:auto; width:200px; background:#efe0bd; }
  table { width:400px; border-collapse:collapse; color:#3d2c18; }
  td { border:1px solid #7a4a1d; padding:6px; }
</style>
<div class="w"><table><tr><td>أ</td><td>ب</td><td>ج</td><td>د</td><td>هـ</td></tr></table></div>
```



### 2) سلايدر أفقي
بطاقات جنب بعض بسكرول.

```html
<style>
  .s { display:flex; gap:8px; overflow-x:auto; width:220px; padding:6px; background:#efe0bd; }
  .s div { flex:0 0 100px; height:60px; background:#c9772f; color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="s"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) hidden يقص
الجزء الزايد على اليمين مش ظاهر.

```html
<style>
  .b { width:140px; overflow-x:hidden; white-space:nowrap; background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="b">نص طويل جداً جداً هيتقص</div>
```



## mistakes

### إخفاء مشكلة الـ overflow بـ hidden على body

```css bad
body { overflow-x:hidden; }
```

```css good
/* دوّر على العنصر اللي بيعدّي العرض وصلحه */
img { max-width:100%; }
```

الحل المؤقت بيخبّي المشكلة ويمنع sticky.

## quiz

### `overflow-x` بتتحكم في؟
- [ ] الرأسي
- [x] الأفقي
- [ ] الاتنين
- [ ] الحجم

أفقي بس.

### لو x=auto وy=visible؟
- [ ] y تبقى visible
- [x] y تتحول لـ auto
- [ ] خطأ
- [ ] y hidden

تحويل تلقائي.

## refs

- [MDN: overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x)
