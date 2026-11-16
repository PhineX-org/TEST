---
id: scroll-snap-align
kind: property
cat: ui
chip: scroll-snap-align
title: نقطة التقاط العنصر
en: CSS scroll-snap-align property
status: stable
support: all
size: compact
mdn: scroll-snap-align
summary: scroll-snap-align بتحدد أنهي جزء من العنصر (start أو center أو end) يتحاذى مع حافة الحاوية عند الالتقاط.
keywords: scroll-snap-align, start, center, end, snap
related: scroll-snap-type, scroll-padding, scroll-margin
---

## intro

الخاصية `scroll-snap-align` بتتحط على **العناصر الأبناء** داخل حاوية [[scroll-snap-type]] وبتحدد **أنهي جزء من العنصر** يلتصق بحافة الحاوية لما التمرير يلتقط: **`start`** (بداية العنصر)، **`center`** (منتصفه)، **`end`** (نهايته)، **`none`** (مفيش نقطة التقاط). من غير الخاصية دي حاوية snap مبتعملش حاجة. وبتتعدّل بـ [[scroll-margin]] على العنصر و[[scroll-padding]] على الحاوية لضبط الإزاحة. الأفضل `start` للقوائم و`center` للمعارض.

## try

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 100px; height:50px; background:#c9772f; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:center; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```

## syntax

```css nolive
scroll-snap-align: start;
scroll-snap-align: center;
scroll-snap-align: end;
```

- **القيمة المبدئية**: `none`.
- على الأبناء.

## values

### start
بداية العنصر.

### center
المنتصف.

### end
النهاية.

### none
بدون.

## use

- كاروسيل بمحاذاة start.
- معرض صور بمحاذاة center.

## avoid

- وضعها على الحاوية.

## examples

### 1) start
الأشهر.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 100px; height:48px; background:#3d7a5a; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:start; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```



### 2) center
في المنتصف.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 100px; height:48px; background:#7a4a1d; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:center; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```



### 3) end
عند النهاية.

```html
<style>
  .r { display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px; background:#efe0bd; border-radius:8px; }
  .i { flex:0 0 100px; height:48px; background:#b5551f; color:#f3ede0; display:flex; align-items:center; justify-content:center; border-radius:8px; scroll-snap-align:end; font-weight:bold; }
</style>
<div class="r"><div class="i">1</div><div class="i">2</div><div class="i">3</div><div class="i">4</div></div>
```



## mistakes

### على الحاوية

```css bad
.row { scroll-snap-align:start; }
```

```css good
.item { scroll-snap-align:start; }
```

للأبناء.

## quiz

### بتتحط على؟
- [x] الأبناء
- [ ] الحاوية
- [ ] html
- [ ] body

العناصر.

### الافتراضي؟
- [x] none
- [ ] start
- [ ] center
- [ ] end

none.

## refs

- [MDN: scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)
