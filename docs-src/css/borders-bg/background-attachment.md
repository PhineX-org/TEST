---
id: background-attachment
kind: property
cat: borders-bg
chip: background-attachment
title: تثبيت الخلفية مع السكرول
en: CSS background-attachment property
status: stable
support: all
size: compact
mdn: background-attachment
summary: background-attachment بتحدد هل الخلفية تتحرك مع السكرول (scroll) أو ثابتة مع النافذة (fixed) أو مع محتوى العنصر (local). أساس تأثير الـ parallax.
keywords: background-attachment, fixed, scroll, local, parallax, خلفية ثابتة
related: background, background-image, background-position, overflow
---

## intro

الخاصية `background-attachment` بتحدد **سلوك الخلفية أثناء السكرول**. القيم: **`scroll`** (الافتراضي): الخلفية ثابتة بالنسبة للعنصر نفسه، ومبتتحركش لو سكرولت جوه العنصر. **`fixed`**: الخلفية **ثابتة بالنسبة لنافذة المتصفح**، فبتبان إنها «بتتحرك ورا» المحتوى أثناء السكرول (تأثير **parallax** البسيط). **`local`**: الخلفية بتسكرول **مع محتوى العنصر** نفسه. تنبيه: `fixed` **بتتجاهل أحياناً على الموبايل** (خاصة iOS) وممكن تأثر على الأداء، فاعتمد عليها كتحسين مش كأساس. مرتبطة بـ [[background]] و[[background-image]].

## try

```html
<style>
  .s { height:90px; overflow:auto; background:linear-gradient(#c9772f,#3d7a5a) local; background-attachment:local; color:#fff3e0; padding:6px; }
</style>
<div class="s">اسحب<br>جوه<br>الصندوق<br>الخلفية<br>بتسكرول<br>معاك<br>(local)</div>
```

## syntax

```css nolive
background-attachment: scroll;
background-attachment: fixed;
background-attachment: local;
```

- **القيمة المبدئية**: `scroll`.
- `fixed` ممكن مش تشتغل على الموبايل.

## values

### scroll
ثابتة مع العنصر (الافتراضي).

### fixed
ثابتة مع نافذة المتصفح.

### local
بتسكرول مع محتوى العنصر.

## use

- parallax بسيط بـ fixed.
- خلفية بتتحرك مع محتوى قابل للسكرول (local).

## avoid

- الاعتماد على fixed للموبايل.
- fixed على صور ثقيلة (أداء).

## examples

### 1) local
الخلفية بتسكرول مع المحتوى.

```html
<style>
  .s { height:80px; overflow:auto; background:repeating-linear-gradient(#efe0bd 0 30px,#e4c490 30px 60px); background-attachment:local; color:#3d2c18; padding:4px 8px; }
</style>
<div class="s">1<br><br>2<br><br>3<br><br>4<br><br>5</div>
```



### 2) scroll
الخلفية ثابتة مع الصندوق.

```html
<style>
  .s { height:80px; overflow:auto; background:repeating-linear-gradient(#efe0bd 0 30px,#e4c490 30px 60px); background-attachment:scroll; color:#3d2c18; padding:4px 8px; }
</style>
<div class="s">1<br><br>2<br><br>3<br><br>4<br><br>5</div>
```



### 3) fixed
الخلفية ثابتة مع النافذة.

```html
<style>
  .s { height:80px; overflow:auto; background:repeating-linear-gradient(#bcd4a8 0 30px,#efe0bd 30px 60px); background-attachment:fixed; color:#3d2c18; padding:4px 8px; }
</style>
<div class="s">اسحب<br><br>وشوف<br><br>الخلفية<br><br>ثابتة</div>
```



## mistakes

### fixed على الموبايل

```css bad
.hero { background-attachment:fixed; }  /* ممكن مش تشتغل */
```

```css good
.hero { background-attachment:scroll; }
@media (min-width:900px){ .hero { background-attachment:fixed; } }
```

فعّلها للشاشات الكبيرة فقط.

## quiz

### الافتراضي؟
- [ ] fixed
- [x] scroll
- [ ] local
- [ ] none

scroll.

### fixed بتثبّت الخلفية بالنسبة لـ؟
- [ ] العنصر
- [x] نافذة المتصفح
- [ ] الأب
- [ ] الصفحة فقط

viewport.

## refs

- [MDN: background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment)
