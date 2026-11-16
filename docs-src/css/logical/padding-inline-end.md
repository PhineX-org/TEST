---
id: padding-inline-end
kind: property
cat: logical
chip: padding-inline-end
title: حشو نهاية السطر
en: CSS padding-inline-end property
status: stable
support: all
size: compact
mdn: padding-inline-end
summary: padding-inline-end حشو عند نهاية السطر: شمال في العربي ويمين في الإنجليزي. مفيد لسهم في آخر الحقل.
keywords: padding-inline-end, نهاية, حشو, rtl
related: padding-inline-start, padding-inline, padding-left, padding-right
---

## intro

الخاصية `padding-inline-end` بتحط حشو **عند نهاية السطر**: شمال في العربي (RTL) ويمين في الإنجليزي (LTR). مفيدة لما يكون في آخر الحقل أيقونة أو سهم، فتسيب مكان للأيقونة عشان النص ميعديش فوقها: `select { padding-inline-end: 32px; }`. وكمان للنص الطويل جوه صندوق عشان ميلزقش في الحافة. عكس [[padding-inline-start]] وجزء من [[padding-inline]]. والفكرة كلها إنك تتكلم بلغة «بداية ونهاية» بدل «يمين وشمال» عشان الكود يفضل صح مع أي اتجاه.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="padding-inline-end:50px">end حشو 50</div></div>
<div dir="ltr" class="w"><div class="i" style="padding-inline-end:50px">end padding 50</div></div>
```

## syntax

```css nolive
padding-inline-end: 32px;
select { padding-inline-end: 2rem; }
```

- **القيمة المبدئية**: `0`.

## values

### `<length>`
مسافة.

### `<percentage>`
نسبة.

## use

- مكان لسهم في آخر حقل.
- نص طويل بحشو نهاية.

## avoid

- padding-right ثابتة.

## examples

### 1) مكان لسهم
حقل select.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<select style="appearance:none;padding:8px;padding-inline-end:36px;border:2px solid #bda27a;border-radius:8px;background:#f3ede0;color:#3d2c18"><option>اختار</option></select>
```



### 2) RTL وLTR
بيتقلب.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w"><div class="i" style="padding-inline-end:40px">عربي</div></div><div dir="ltr" class="w"><div class="i" style="padding-inline-end:40px">English</div></div>
```



### 3) نص طويل
متلزقش في الحافة.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="padding-inline-end:40px;background:#efe0bd">نص طويل نوعاً ما بحشو نهاية كبير عشان ميلزقش</div>
```



## mistakes

### right ثابتة

```css bad
select { padding-right:32px; }
```

```css good
select { padding-inline-end:32px; }
```

لـ RTL.

## quiz

### end في RTL؟
- [x] شمال
- [ ] يمين
- [ ] فوق
- [ ] تحت

شمال.

### مفيد لـ؟
- [x] مكان لسهم أو أيقونة
- [ ] تغيير اللون
- [ ] حركة
- [ ] تكبير

آخر الحقل.

## refs

- [MDN: padding-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end)
