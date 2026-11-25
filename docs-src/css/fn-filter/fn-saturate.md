---
id: fn-saturate
kind: function
cat: fn-filter
chip: saturate()
title: التشبّع اللوني
en: CSS saturate() function
status: stable
support: all
size: compact
mdn: filter-function/saturate
summary: saturate(n) بتغيّر زهاء الألوان: 1 الأصلي، 0 رمادي، أكبر من 1 ألوان أزهى. filter: saturate(1.3).
keywords: saturate, filter, تشبع, زهاء الألوان
related: fn-grayscale, fn-contrast, filter
---

## intro

الدالة `saturate()` (داخل [[filter]]) بتغيّر **تشبّع الألوان** (زهاءها): **1** = الأصلي، **0** = رمادي تماماً (زي grayscale)، **أقل من 1** = باهتة، **أكبر من 1** = أزهى وأقوى (مثلاً `1.4`). مفيدة لإحياء صورة باهتة أو لتخفيف زهاء مبالغ. ومع [[fn-contrast]] و[[fn-brightness]] بتعمل «تحسين صورة» بسيط. نصيحة لراحة العين: ألوان **مشبّعة بشدة** بتتعب؛ فالقيم قرب 1 أو تحتها شوية أريح.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:saturate(0)"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:saturate(1.8)"><br>1.8</figure>
```

## syntax

```css nolive
filter: saturate(1.3);
filter: saturate(0);
filter: saturate(60%);
```

- 1 = الأصلي.
- 0 = رمادي.

## use

- تحسين صور باهتة.
- تخفيف ألوان زاهية.

## avoid

- تشبّع مبالغ يتعب العين.

## examples

### 1) 3 قيم
0 و1 و1.8.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:saturate(0)"><br>0</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>1</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:saturate(1.8)"><br>1.8</figure>
```



### 2) تخفيف
أريح للعين.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:saturate(.7)"><br>.7</figure>
```



### 3) hover
يزهّي.

```html
<style>
  img { width:110px; height:77px; border-radius:8px; filter:saturate(.6); transition:filter .3s; }
  img:hover { filter:saturate(1.2); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



## mistakes

### تشبّع عالٍ

```css bad
filter:saturate(3);
```

```css good
filter:saturate(1.2);
```

قيم معتدلة.

## quiz

### saturate(0)؟
- [x] رمادي
- [ ] أصلي
- [ ] أزهى
- [ ] أسود

بدون ألوان.

### أكبر من 1؟
- [x] ألوان أزهى
- [ ] أبهت
- [ ] رمادي
- [ ] أغمق

تشبّع أعلى.

## refs

- [MDN: saturate()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate)
