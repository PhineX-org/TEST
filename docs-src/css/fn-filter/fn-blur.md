---
id: fn-blur
kind: function
cat: fn-filter
chip: blur()
title: تغبيش
en: CSS blur() function
status: stable
support: all
mdn: filter-function/blur
summary: blur(r) بتعمل تغبيش جاوسي بنصف قطر معين: filter: blur(4px). مع backdrop-filter بتعمل تأثير الزجاج.
keywords: blur, filter, backdrop-filter, تغبيش, glass, glassmorphism
related: filter, backdrop-filter, fn-brightness, fn-drop-shadow
---

## intro

الدالة `blur()` (داخل [[filter]]) بتعمل **تغبيش** للعنصر بنصف قطر بالبكسل: `filter: blur(4px);`. كل ما الرقم يكبر التغبيش يزيد. **ما بتقبلش نسبة مئوية**، بس أطوال (`px`, `rem`). استخدامات: **تغبيش الخلفية** لما يفتح مودال (blur على المحتوى اللي وراه)، **تأثير تحميل** (صورة معمّية قبل ما تتحمّل)، وتغبيش **الظلال والتوهّج**.

والأشهر: **تأثير الزجاج (glassmorphism)** بخاصية [[backdrop-filter]]: بتغبّش **اللي ورا** العنصر مش العنصر نفسه: `backdrop-filter: blur(8px); background: rgba(243,237,224,.5);`. فتبان زي زجاج مصنفر.

تنبيه: التغبيش **تقيل على الأداء** مع نصف قطر كبير أو عناصر كتير، وبيغبّش **كل** محتوى العنصر (نصوص كمان). وخلّي بالك إن الحواف بتتغبّش خارج حدود العنصر الأصلية فممكن تتقص بـ `overflow:hidden` على الأب.

## try

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>بدون</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:blur(2px)"><br>2px</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:blur(5px)"><br>5px</figure>
```

## syntax

```css nolive
filter: blur(4px);
backdrop-filter: blur(8px);
filter: blur(0);   /* بدون */
```

- أطوال فقط (px) مش نسب.
- تقيلة مع القيم الكبيرة.

## use

- تغبيش خلفية المودال.
- تأثير الزجاج بـ backdrop-filter.
- صور تحميل تدريجي.

## avoid

- تغبيش كبير على عناصر كتير.
- تغبيش نص مهم.

## examples

### 1) 3 درجات
blur متدرج.

```html
<style>
  img { width:100px; height:70px; border-radius:8px; margin:3px; vertical-align:top; }
  figure { display:inline-block; margin:2px; text-align:center; color:#3d2c18; font-size:.75rem; }
</style><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:none"><br>بدون</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:blur(2px)"><br>2px</figure><figure><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>" style="filter:blur(5px)"><br>5px</figure>
```



### 2) تأثير الزجاج
backdrop-filter.

```html
<style>
  .bg { position:relative; width:200px; height:100px; border-radius:10px; background:linear-gradient(90deg,#c9772f,#3d7a5a); overflow:hidden; }
  .gl { position:absolute; inset:20px 30px; border-radius:10px; background:rgba(243,237,224,.45); backdrop-filter:blur(6px); display:grid; place-items:center; color:#3d2c18; font-weight:bold; }
  .dot { position:absolute; width:40px; height:40px; border-radius:50%; background:#efe0bd; top:30px; left:70px; }
</style>
<div class="bg"><div class="dot"></div><div class="gl">زجاج</div></div>
```



### 3) hover يوضّح
blur يتشال.

```html
<style>
  img { width:140px; height:98px; border-radius:8px; filter:blur(5px); transition:filter .4s; }
  img:hover { filter:blur(0); }
</style>
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='70'><rect width='100' height='70' fill='%23e4c490'/><circle cx='28' cy='35' r='22' fill='%23c9772f'/><rect x='55' y='15' width='34' height='40' rx='6' fill='%233d7a5a'/></svg>">
```



### 4) تغبيش نص
تأثير حالم.

```html
<style>
  .t { font-size:1.5rem; font-weight:bold; color:#7a4a1d; filter:blur(2px); transition:filter .3s; display:inline-block; }
  .t:hover { filter:blur(0); }
</style>
<span class="t">مرّر لتوضيح النص</span>
```



## mistakes

### نسبة مئوية

```css bad
filter:blur(10%);  /* غلط */
```

```css good
filter:blur(4px);
```

أطوال بس.

### تغبيش خلفية مودال بدون overflow

```css bad
.page { filter:blur(6px); }
```

```css good
.page { filter:blur(6px); } /* مع overflow:hidden على الأب */
```

تفادي حواف مقطوعة.

## quiz

### blur بتاخد؟
- [x] طول (px)
- [ ] نسبة
- [ ] لون
- [ ] رقم فقط

نصف قطر.

### تأثير الزجاج بـ؟
- [x] backdrop-filter
- [ ] filter فقط
- [ ] opacity
- [ ] clip-path

يغبّش اللي ورا.

### عيبها؟
- [x] تقيلة على الأداء
- [ ] مبتشتغلش
- [ ] بتلوّن
- [ ] بتصغّر

GPU.

## refs

- [MDN: blur()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)
