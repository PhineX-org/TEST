---
id: inset-inline-start
kind: property
cat: logical
chip: inset-inline-start
title: إزاحة بداية السطر (منطقي)
en: CSS inset-inline-start property
status: stable
support: all
size: compact
mdn: inset-inline-start
summary: inset-inline-start بتزيح العنصر الموضوع (absolute/fixed/sticky) من جهة بداية السطر: right في العربي وleft في الإنجليزي.
keywords: inset-inline-start, position, rtl, logical, right, left
related: inset, top, left, right, position
---

## intro

الخاصية `inset-inline-start` بتحدد **إزاحة العنصر المتموضع** (`position: absolute` أو `fixed` أو `sticky`) من **جهة بداية السطر**: بتساوي `right` في العربي (RTL) و`left` في الإنجليزي (LTR). مثال: زرار «إغلاق» في ركن بطاقة: `.close { position: absolute; inset-inline-end: 8px; top: 8px; }` هيظهر في الركن الصح في الاتجاهين. [[inset]] هو الاختصار للأربع جهات، وفيه `inset-inline-end` للنهاية و`inset-block-start` للأعلى. بتحتاج عنصر متموضع وإلا مبتعملش حاجة. يعني لازم الأول تكتب `position: absolute` (أو fixed أو sticky) وبعدين تستخدمها، والأب لازم يكون `position: relative` عشان الإزاحة تتحسب منه مش من الصفحة كلها.

## try

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="rtl" class="w" style="position:relative;height:50px"><span class="i" style="position:absolute;inset-inline-start:8px;top:8px">start (RTL: يمين)</span></div>
<div dir="ltr" class="w" style="position:relative;height:50px"><span class="i" style="position:absolute;inset-inline-start:8px;top:8px">start (LTR: left)</span></div>
```

## syntax

```css nolive
.icon { position: absolute; inset-inline-start: 10px; }
.close { position: absolute; inset-inline-end: 8px; top: 8px; }
```

- **القيمة المبدئية**: `auto`.
- لازم position غير static.

## values

### `<length>`
إزاحة ثابتة.

### `<percentage>`
نسبة من الأب.

### auto
تلقائي.

## use

- أيقونات داخل حقول.
- أزرار إغلاق في الأركان.

## avoid

- استخدامها على عنصر static.

## examples

### 1) زاوية البطاقة
end وstart.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="position:relative;height:56px;background:#efe0bd"><span class="i" style="position:absolute;inset-inline-start:8px;top:8px">start</span><span class="i" style="position:absolute;inset-inline-end:8px;top:8px;background:#3d7a5a">end</span></div>
```



### 2) أيقونة في حقل
تتقلب لوحدها.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div class="w" style="position:relative"><span style="position:absolute;inset-inline-start:12px;top:50%;transform:translateY(-50%)">🔍</span><input placeholder="بحث" style="width:100%;box-sizing:border-box;padding:8px;padding-inline-start:36px;border:2px solid #bda27a;border-radius:8px;background:#f3ede0;color:#3d2c18"></div>
```



### 3) LTR
نفس الكود.

```html
<style>
  .w { margin:6px 0; padding:6px; background:#f3e6c9; border-radius:8px; color:#3d2c18; }
  .i { background:#c9772f; color:#f3ede0; padding:6px 10px; border-radius:6px; font-weight:bold; }
</style>
<div dir="ltr" class="w" style="position:relative;height:50px"><span class="i" style="position:absolute;inset-inline-start:0;top:8px">start</span></div>
```



## mistakes

### عنصر غير متموضع

```css bad
.a { inset-inline-start:10px; }  /* مفيش تأثير */
```

```css good
.a { position:absolute; inset-inline-start:10px; }
```

محتاج position.

## quiz

### inset-inline-start في RTL تساوي؟
- [x] right
- [ ] left
- [ ] top
- [ ] bottom

يمين.

### محتاجة؟
- [x] position غير static
- [ ] display:flex
- [ ] float
- [ ] overflow

تموضع.

## refs

- [MDN: inset-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start)
