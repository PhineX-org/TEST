---
id: justify-items
kind: property
cat: flexbox
chip: justify-items
title: محاذاة العناصر داخل خلاياها
en: CSS justify-items property
status: stable
support: all
size: compact
mdn: justify-items
summary: justify-items بتحدد محاذاة العناصر على المحور الأفقي جوه خلاياها في Grid (start وcenter وend وstretch).
keywords: justify-items, grid, محاذاة افقية, start, center, end, stretch, place-items
related: justify-self, align-items, place-items, grid-guide
---

## intro

الخاصية `justify-items` بتُستخدم في **Grid** وبتحدد **محاذاة كل الأبناء أفقياً جوه خليتهم**. القيمة الافتراضية `stretch` بتمدد العنصر على عرض الخلية كله. لو كتبت `center` بيتوسّط جوه خليته، و`start`/`end` لحافة الخلية. بتتحط على **الحاوية** وبتأثر على كل الأبناء، وعلشان ابن واحد بس استخدم [[justify-self]]. الاختصار مع `align-items` هو [[place-items]]. (ملحوظة: في Flexbox هي بتتجاهل لأن `justify-content` هي اللي بتشتغل).

## try

```html
<style>
  .g { display:grid; grid-template-columns:repeat(2,1fr); justify-items:center; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#7a4a1d; color:#f3ede0; padding:8px 14px; }
</style>
<div class="g"><div>1</div><div>2</div></div>
```

## syntax

```css nolive
justify-items: stretch;
justify-items: center;
justify-items: start;
justify-items: end;
```

- **القيمة المبدئية**: `legacy`/`stretch`.
- للـ Grid فقط عملياً.

## values

### stretch
تمدد لعرض الخلية.

### center
وسط الخلية.

### start
بداية الخلية.

### end
نهاية الخلية.

## use

- توسيط محتوى كل خلايا Grid.
- محاذاة موحدة.

## avoid

- استخدامها في Flexbox.

## examples

### 1) center
كل عنصر في وسط خليته.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; justify-items:center; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#c9772f; color:#fff3e0; padding:8px 14px; }
</style>
<div class="g"><div>1</div><div>2</div></div>
```



### 2) start وend
لحافة الخلية.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#3d7a5a; color:#f3ede0; padding:8px 14px; width:fit-content; }
</style>
<div class="g" style="justify-items:start"><div>start</div><div>start</div></div>
<div class="g" style="justify-items:end;margin-top:6px"><div>end</div><div>end</div></div>
```



### 3) stretch الافتراضي
العنصر ملا الخلية.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#efe0bd; padding:6px; }
  .g div { background:#bcd4a8; color:#3d2c18; padding:8px; }
</style>
<div class="g"><div>1</div><div>2</div></div>
```



## mistakes

### استخدام في flex

```css bad
.f { display:flex; justify-items:center; }
```

```css good
.f { display:flex; justify-content:center; }
```

justify-items للـ Grid.

## quiz

### justify-items تشتغل أساساً مع؟
- [ ] Flexbox
- [x] Grid
- [ ] float
- [ ] table

Grid.

### الافتراضي؟
- [ ] center
- [x] stretch
- [ ] start
- [ ] end

stretch.

## refs

- [MDN: justify-items](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
