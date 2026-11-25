---
id: inset
kind: property
cat: layout
chip: inset
title: اختصار الإزاحة
en: CSS inset property
status: stable
support: all
size: compact
mdn: inset
summary: inset بتختصر top وright وbottom وleft في سطر واحد، زي margin وpadding. inset:0 = تمطيط العنصر على كل الأب.
keywords: inset, اختصار, top right bottom left, تمطيط, overlay, inset 0, position
related: top, right, bottom, left, position, margin
---

## intro

`inset` هي **اختصار** للخصائص الأربعة [[top]] و[[right]] و[[bottom]] و[[left]]، بنفس منطق [[margin]]: قيمة واحدة للكل، أو اتنين (رأسي ثم أفقي)، أو أربع (فوق، يمين، تحت، شمال).

أشهر استخدام: **`inset: 0`** على عنصر `absolute` أو `fixed` = **يتمطّط على الأب كله**، وده أساس الـ overlays والـ modals والخلفيات الشفافة. وبتشتغل برضه مع `position: relative` و`sticky`.

زي أخواتها، **لازم positioned**. والنسخ المنطقية: `inset-inline` و`inset-block` ([[inset-inline-start]]).

## try

```html
<style>
  .p { position:relative; height:110px; background:#efe0bd; }
  .o { position:absolute; inset:0; background:rgba(122,74,29,.35); display:grid; place-items:center; color:#3d2c18; }
</style>
<div class="p">الأب<div class="o">overlay (inset:0)</div></div>
```

## syntax

```css nolive
inset: 0;
inset: 10px 20px;
inset: 0 auto auto 0;
```

- **القيمة المبدئية**: `auto`.
- لازم `position` غير static.

## values

### `<length>`
قيمة ثابتة للأربع جهات.

### auto
حسب التموضع الطبيعي.

## use

- overlay أو modal يغطي الأب (`inset:0`).
- لصق عنصر في ركن (`inset: 0 0 auto auto`).

## avoid

- استخدامه على عنصر static.

## examples

### 1) تمطيط كامل
`inset:0` = العنصر ملا الأب.

```html
<style>
  .p { position:relative; height:90px; background:#efe0bd; }
  .o { position:absolute; inset:0; background:rgba(61,122,90,.4); }
</style>
<div class="p"><div class="o"></div></div>
```



### 2) margins داخلية
`inset:10px` بيسيب 10px من كل جهة.

```html
<style>
  .p { position:relative; height:90px; background:#efe0bd; }
  .o { position:absolute; inset:10px; background:#c9772f; }
</style>
<div class="p"><div class="o"></div></div>
```



### 3) ركن
`inset: auto 0 0 auto` = ركن أسفل-يمين.

```html
<style>
  .p { position:relative; height:90px; background:#efe0bd; }
  .o { position:absolute; inset:auto 8px 8px auto; background:#7a4a1d; color:#f3ede0; padding:6px 12px; }
</style>
<div class="p"><div class="o">ركن</div></div>
```



## mistakes

### نسيان position

```css bad
.o { inset:0; }
```

```css good
.o { position:absolute; inset:0; }
```

inset لازم positioned.

## quiz

### `inset:0` على absolute بتعمل؟
- [ ] تخفي العنصر
- [x] تمطّطه على الأب
- [ ] تحذفه
- [ ] تلغي الإزاحة

ملا الأب.

### inset اختصار لـ؟
- [ ] margin
- [x] top/right/bottom/left
- [ ] padding
- [ ] border

الإزاحات الأربعة.

## refs

- [MDN: inset](https://developer.mozilla.org/en-US/docs/Web/CSS/inset)
