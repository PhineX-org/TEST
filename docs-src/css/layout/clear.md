---
id: clear
kind: property
cat: layout
chip: clear
title: إيقاف الطفو
en: CSS clear property
status: stable
support: all
size: compact
mdn: clear
summary: clear بتخلّي العنصر ينزل تحت العناصر الطافية (float) على اليمين أو الشمال أو الاتنين.
keywords: clear, both, left, right, float, clearfix, نزول تحت الطافي
related: float, display, flexbox-guide, positioning-guide
---

## intro

الخاصية `clear` بتتحكم في العنصر **جنب العناصر الطافية** ([[float]]): بتخليه **ينزل تحت** الطافي بدل ما يطلع جنبه. القيمة `left` تنزّله تحت الطافيين على الشمال، `right` على اليمين، و`both` على الاتنين (الأكتر استخداماً). و`none` الافتراضي.

كانت الحيلة القديمة **clearfix**: تحط على الأب `::after { content:""; display:table; clear:both }` علشان الأب يحتوي أبناءه الطافيين. دلوقتي الأبسط: `display: flow-root` على الأب.

## try

```html
<style>
  .f { float:right; width:60px; height:50px; background:#c9772f; }
  .c { clear:both; background:#bcd4a8; color:#3d2c18; padding:6px; margin-top:6px; }
</style>
<div class="f"></div><div class="c">نزلت تحت الطافي</div>
```

## syntax

```css nolive
clear: none;
clear: left;
clear: right;
clear: both;
```

- **القيمة المبدئية**: `none`.
- بتشتغل على عناصر block.

## values

### both
تنزل تحت الطافيين من الجهتين.

### left
تحت الطافيين على الشمال.

### right
تحت الطافيين على اليمين.

## use

- عنصر بعد صور طافية (فوتر مثلاً).
- clearfix قديم.

## avoid

- استخدامها بدل `flow-root` للأب.

## examples

### 1) بدون clear وبـ clear
الأول جنب الطافي والتاني نزل.

```html
<style>
  .f { float:right; width:60px; height:50px; background:#c9772f; }
  p { background:#efe0bd; color:#3d2c18; padding:6px; margin:4px 0; }
  .c { clear:both; background:#bcd4a8; }
</style>
<div class="f"></div><p>جنب الطافي</p><p class="c">clear: both</p>
```



### 2) clearfix بـ ::after
الأب بقى يحتوي الطافي.

```html
<style>
  .p { border:3px solid #3d7a5a; background:#efe0bd; }
  .p::after { content:""; display:table; clear:both; }
  .c { float:right; width:60px; height:40px; background:#c9772f; }
</style>
<div class="p"><div class="c"></div></div>
```



### 3) clear left
بيتجاهل الطافي اليمين.

```html
<style>
  .f { float:right; width:60px; height:50px; background:#c9772f; }
  .c { clear:left; background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="f"></div><div class="c">clear:left (الطافي يمين فمفيش تأثير)</div>
```



## mistakes

### clear على عنصر inline

```css bad
span { clear:both; }
```

```css good
span { display:block; clear:both; }
```

clear بتشتغل على block.

## quiz

### أكتر قيمة استخداماً؟
- [ ] left
- [ ] right
- [x] both
- [ ] none

both.

### بديل clearfix الحديث؟
- [x] display:flow-root
- [ ] z-index
- [ ] position
- [ ] float

على الأب.

## refs

- [MDN: clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear)
