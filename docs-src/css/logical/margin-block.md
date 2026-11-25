---
id: margin-block
kind: property
cat: logical
chip: margin-block
title: margin الاتجاه الرأسي (منطقي)
en: CSS margin-block property
status: stable
support: all
size: compact
mdn: margin-block
summary: margin-block بتحط margin قبل وبعد العنصر في اتجاه الكتل (فوق وتحت في الكتابة الأفقية).
keywords: margin-block, هامش رأسي, logical, margin-top, margin-bottom
related: margin-inline, margin-top, margin-bottom, logical-properties-guide
---

## intro

الخاصية `margin-block` هي النسخة المنطقية من `margin-top` و`margin-bottom`. «block» هو **الاتجاه اللي الفقرات بتتراص فيه**: في الكتابة العربية والإنجليزية العادية ده من **فوق لتحت**. فـ `margin-block: 20px 40px;` يعني 20 قبل (فوق) و40 بعد (تحت). الفرق عن top وbottom بيظهر مع **writing-mode** تاني (زي الكتابة الرأسية في اليابانية) حيث الكتل بتتراص أفقياً. للمواقع العربية العادية هي بتساوي `margin-top` و`margin-bottom`، لكن استخدامها بيخلّي الكود **جاهز للمستقبل** وبيكمّل `margin-inline` في نفس العائلة.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="margin-block:12px 30px">margin-block: 12px 30px</div><div class="i">بعده</div></div>
```

## syntax

```css nolive
margin-block: 16px;
margin-block: 8px 24px;   /* قبل ثم بعد */
margin-block-start: 8px;
```

- **القيمة المبدئية**: `0`.
- الأولى قبل والتانية بعد.

## values

### `<length>`
مسافة ثابتة.

### auto
تلقائي.

## use

- مسافات رأسية بين الأقسام.
- كود يدعم writing-mode تاني.

## avoid

- خلط top/bottom مع block في نفس الملف بدون سبب.

## examples

### 1) قبل وبعد
فوق وتحت.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="margin-block:10px 28px">عنصر</div><div class="i">التالي</div></div>
```



### 2) نفس القيمة
قيمة واحدة.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w"><div class="i" style="margin-block:14px">الاتنين 14</div></div>
```



### 3) writing-mode رأسي
الكتل بتتراص أفقياً.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="writing-mode:vertical-rl;height:90px"><div class="i" style="margin-block:6px 24px">رأسي</div></div>
```



## mistakes

### ظن إنه أفقي

```css bad
.a { margin-block:20px; }  /* بيأثر على فوق وتحت مش اليمين */
```

```css good
.a { margin-inline:20px; }
```

block = رأسي، inline = أفقي.

## quiz

### margin-block في الكتابة العادية يساوي؟
- [x] top وbottom
- [ ] left وright
- [ ] كل الجهات
- [ ] لا شيء

رأسي.

### القيمة الأولى؟
- [x] قبل (start)
- [ ] بعد
- [ ] يمين
- [ ] شمال

block-start.

## refs

- [MDN: margin-block](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block)
