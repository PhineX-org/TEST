---
id: animation-fill-mode
kind: property
cat: motion
chip: animation-fill-mode
title: حالة العنصر قبل وبعد الأنيميشن
en: CSS animation-fill-mode property
status: stable
support: all
size: compact
mdn: animation-fill-mode
summary: animation-fill-mode بتحدد هل قيم الأنيميشن تفضل مطبقة قبل البدء (backwards) أو بعد الانتهاء (forwards) أو الاتنين (both).
keywords: animation-fill-mode, forwards, backwards, both, آخر إطار
related: animation, animation-delay, animation-iteration-count
---

## intro

الخاصية `animation-fill-mode` بتحدد **شكل العنصر قبل ما الأنيميشن تبدأ وبعد ما تخلص**. الافتراضي `none`: العنصر بيرجع لتنسيقه الأصلي بعد الانتهاء (فتحس إن الحركة «بتقفز» للبداية). **`forwards`**: يفضل العنصر على **آخر إطار** (100%) بعد الانتهاء، وهي الأكتر استخداماً لحركات الظهور. **`backwards`**: يتطبق **أول إطار** (0%) أثناء فترة [[animation-delay]] قبل البداية. **`both`**: الاتنين، وهي الأمثل لعناصر تظهر بتأخير (تفضل مخفية لحد الدور). جزء من [[animation]].

## try

```html
<style>
  @keyframes grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  .b { height:14px; width:140px; margin:10px; background:#c9772f; border-radius:7px; transform-origin:right; animation:grow 1s ease-out forwards; }
</style>
<div class="b"></div>
```

## syntax

```css nolive
animation-fill-mode: none;
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;
```

- **القيمة المبدئية**: `none`.

## values

### none
يرجع للأصل.

### forwards
يفضل آخر إطار.

### backwards
يطبق أول إطار أثناء التأخير.

### both
الاتنين.

## use

- حركات ظهور تفضل ظاهرة.
- عناصر بتأخير ومخفية قبله.

## avoid

- نسيانها فيرجع العنصر للشكل القديم.

## examples

### 1) forwards
يفضل ظاهر.

```html
<style>
  @keyframes up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  .c { padding:10px 16px; background:#efe0bd; color:#3d2c18; border-radius:8px; margin:6px; animation:up .6s ease-out forwards; }
</style>
<div class="c">forwards</div>
```



### 2) none
بيرجع للأصل.

```html
<style>
  @keyframes up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  .c { padding:10px 16px; background:#efe0bd; color:#3d2c18; border-radius:8px; margin:6px; animation:up .6s ease-out 1s; }
</style>
<div class="c">none (ظاهر قبل الحركة)</div>
```



### 3) both
مخفي لحد البداية وبيفضل.

```html
<style>
  @keyframes up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  .c { padding:10px 16px; background:#bcd4a8; color:#3d2c18; border-radius:8px; margin:6px; animation:up .6s ease-out 1s both; }
</style>
<div class="c">both</div>
```



## mistakes

### الرجوع للأصل

```css bad
.a { animation:up .5s; }  /* بيقفز بعد الانتهاء */
```

```css good
.a { animation:up .5s forwards; }
```

forwards.

## quiz

### forwards معناه؟
- [x] يفضل آخر إطار
- [ ] يرجع للأول
- [ ] يتكرر
- [ ] يتوقف

آخر إطار.

### الأنسب لعنصر بتأخير؟
- [x] both
- [ ] none
- [ ] forwards فقط
- [ ] backwards فقط

مخفي ثم ظاهر.

## refs

- [MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)
