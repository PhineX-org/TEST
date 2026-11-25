---
id: fn-rgb
kind: function
cat: fn-color
chip: rgb()
title: ألوان أحمر أخضر أزرق
en: CSS rgb() function
status: stable
support: all
mdn: color_value/rgb
summary: rgb() بتكوّن لون من 3 قنوات (أحمر وأخضر وأزرق من 0 لـ 255) وقناة شفافية اختيارية: rgb(201 119 47 / 50%).
keywords: rgb, rgba, color, أحمر أخضر أزرق, alpha, شفافية
related: fn-hsl, fn-hwb, colors-guide, dt-color, color
---

## intro

الدالة `rgb()` بتكوّن لون من **3 قنوات ضوء**: **R**ed (أحمر) و**G**reen (أخضر) و**B**lue (أزرق)، كل قناة من **0 (مفيش)** لـ **255 (أقصى)**. الصيغة الحديثة (بمسافات): `rgb(201 119 47)`، والقديمة (بفواصل): `rgb(201, 119, 47)` وبتشتغل برضه. القنوات ممكن تكون **نسب**: `rgb(79% 47% 18%)`.

**الشفافية (alpha)** بتتحط بعد `/`: `rgb(201 119 47 / 0.5)` أو `/ 50%` (يعني نص شفافة). وفي القديم كان فيه `rgba()` منفصلة، لكن دلوقتي `rgb()` بتعمل الاتنين، و`rgba` لسه شغالة.

تخيّلها زي **مزج 3 كشافات**: حاطط أحمر بقوة وأخضر متوسط وأزرق خفيف فتطلع درجة برتقالية. حلوة لما بتاخد اللون من مصمم (نسخ من Figma) لكن **صعبة في التفكير**: لو عايز تعمل اللون أفتح شوية مش هتعرف أنهي رقم تزوّد، وده سبب إن [[fn-hsl]] أسهل في الاستخدام اليومي.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:rgb(201 119 47)">برتقالي</span><span class="s" style="background:rgb(61 122 90)">أخضر</span><span class="s" style="background:rgb(201 119 47 / 50%)">50% شفاف</span><span class="s" style="background:rgb(0,0,0,.1)">قديمة</span>
```

## syntax

```css nolive
color: rgb(201 119 47);
color: rgb(201 119 47 / 50%);
color: rgb(79% 47% 18%);
color: rgba(201, 119, 47, 0.5);  /* قديمة وتعمل */
```

- كل قناة 0 → 255 أو 0% → 100%.
- الشفافية بعد `/`.
- `rgba()` لسه شغالة.

## use

- ألوان منسوخة من أدوات التصميم.
- شفافية عبر alpha.
- ظلال بـ rgb(... / alpha).

## avoid

- استخدامها لعمل درجات (hsl أسهل).
- خلط الصيغة القديمة بالجديدة في نفس الدالة.

## examples

### 1) ألوان أساسية
3 قنوات.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:rgb(201 119 47)">201 119 47</span><span class="s" style="background:rgb(61 122 90);color:#f3ede0">61 122 90</span><span class="s" style="background:rgb(122 74 29);color:#f3ede0">122 74 29</span>
```



### 2) شفافية
alpha.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<div style="background:#efe0bd;padding:6px;border-radius:8px"><span class="s" style="background:rgb(201 119 47 / 1)">1</span><span class="s" style="background:rgb(201 119 47 / .6)">.6</span><span class="s" style="background:rgb(201 119 47 / .3)">.3</span></div>
```



### 3) نسب مئوية
نسب بدل أرقام.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:rgb(79% 47% 18%)">79 47 18</span>
```



### 4) الصيغة القديمة
فواصل وrgba.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:rgb(201, 119, 47)">قديمة</span><span class="s" style="background:rgba(201,119,47,.5)">rgba</span>
```



## mistakes

### قناة خارج المدى

```css bad
color:rgb(300 0 0);  /* بتتقص لـ 255 */
```

```css good
color:rgb(255 0 0);
```

المدى 0-255.

### خلط الصيغ

```css bad
color:rgb(201, 119 47);
```

```css good
color:rgb(201 119 47);
```

متخلطش فواصل ومسافات.

## quiz

### rgb بتتكون من؟
- [x] 3 قنوات ضوء
- [ ] 4 ألوان
- [ ] لون واحد
- [ ] درجة وتشبّع وإضاءة

أحمر أخضر أزرق.

### الشفافية بتتحط بعد؟
- [x] /
- [ ] ،
- [ ] ؛
- [ ] :

rgb(... / alpha).

### أعلى قيمة لقناة؟
- [x] 255
- [ ] 100
- [ ] 360
- [ ] 1

255.

## refs

- [MDN: rgb()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb)
