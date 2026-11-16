---
id: flex-wrap
kind: property
cat: flexbox
chip: flex-wrap
title: لف العناصر في سطور
en: CSS flex-wrap property
status: stable
support: all
mdn: flex-wrap
summary: flex-wrap بتحدد هل العناصر المرنة تفضل في سطر واحد (nowrap) ولا تنزل لسطر جديد لو المساحة ضاقت (wrap).
keywords: flex-wrap, wrap, nowrap, wrap-reverse, لف, سطور, flexbox, responsive
related: flex-direction, flex-flow, align-content, gap, flexbox-guide
---

## intro

افتراضياً العناصر في حاوية flex **بتفضل في سطر واحد** حتى لو ضاقت المساحة، وبتتقلص (`flex-shrink`) لحد ما متعودش تتقلص أكتر وبعدين **تطلع برّه**. الخاصية `flex-wrap` هي اللي بتغيّر السلوك ده.

القيم:
- **`nowrap`** (الافتراضي): سطر واحد.
- **`wrap`**: العناصر **تنزل لسطر جديد** لما تتخطى العرض. دي اللي بتستخدمها عشان تعمل **شبكة متجاوبة**.
- **`wrap-reverse`**: زي wrap لكن السطور بترتيب معكوس.

لما بيكون في أكتر من سطر، بيشتغل [[align-content]] للتحكم في توزيع **السطور** نفسها (مش العناصر). والمسافات بين العناصر بـ [[gap]]. وفي الكتير بنستخدم الاختصار [[flex-flow]]: `flex-flow: row wrap`.

> [!tip] وصفة سريعة لـ cards متجاوبة: `display:flex; flex-wrap:wrap; gap:12px` والكارت `flex: 1 1 200px`.

## try

```html
<style>
  .f { display:flex; flex-wrap:wrap; gap:6px; }
  .f div { flex:0 0 90px; background:#c9772f; color:#fff3e0; padding:10px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
```

## syntax

```css nolive
flex-wrap: nowrap;
flex-wrap: wrap;
flex-wrap: wrap-reverse;
```

- **القيمة المبدئية**: `nowrap`.
- **بتتوارث؟** لأ.

## values

### nowrap
سطر واحد، العناصر بتتقلص.

### wrap
العناصر بتنزل لسطر جديد.

### wrap-reverse
سطور بترتيب معكوس (من تحت لفوق).

## use

- كروت متجاوبة.
- وسوم (tags) أو أزرار بتلف.
- قائمة روابط بتنزل على الموبايل.

## avoid

- نسيان `gap` والاعتماد على margin (مسافات زيادة).
- wrap مع عرض ثابت كبير جداً.

## examples

### 1) nowrap مقابل wrap
الأولى بتتقلص، التانية بتنزل سطر.

```html
<style>
  .f { display:flex; gap:4px; width:200px; background:#efe0bd; margin-bottom:8px; padding:4px; }
  .f div { flex:0 0 70px; background:#7a4a1d; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="f" style="flex-wrap:nowrap"><div>1</div><div>2</div><div>3</div><div>4</div></div>
<div class="f" style="flex-wrap:wrap"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) كروت متجاوبة
`flex: 1 1 100px` + wrap.

```html
<style>
  .f { display:flex; flex-wrap:wrap; gap:8px; }
  .f div { flex:1 1 100px; background:#bcd4a8; color:#3d2c18; padding:14px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 3) وسوم
tags بتلف تلقائي.

```html
<style>
  .t { display:flex; flex-wrap:wrap; gap:6px; width:220px; }
  .t span { background:#7a4a1d; color:#f3ede0; padding:4px 12px; border-radius:14px; }
</style>
<div class="t"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Python</span><span>React</span></div>
```



### 4) wrap-reverse
السطور معكوسة.

```html
<style>
  .f { display:flex; flex-wrap:wrap-reverse; gap:4px; width:180px; height:100px; background:#efe0bd; }
  .f div { flex:0 0 70px; background:#3d7a5a; color:#f3ede0; padding:6px; text-align:center; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```



## mistakes

### نسيان wrap

```css bad
.f { display:flex; }  /* العناصر هتتقلص أو تطلع برّه */
```

```css good
.f { display:flex; flex-wrap:wrap; }
```

بدون wrap مفيش سطور جديدة.

### margin بدل gap

```css bad
.f div { margin:5px; }  /* مسافات إضافية على الأطراف */
```

```css good
.f { gap:10px; }
```

`gap` بتحط مسافة بين العناصر فقط.

## quiz

### الافتراضي؟
- [ ] wrap
- [x] nowrap
- [ ] wrap-reverse
- [ ] none

nowrap.

### wrap بتعمل؟
- [ ] بتلغي الاتجاه
- [x] تنزّل العناصر لسطر جديد
- [ ] بتصغّر
- [ ] بتخفي

سطور متعددة.

### ببعد السطور بـ؟
- [ ] align-items
- [x] align-content
- [ ] justify-content
- [ ] order

align-content للسطور.

## refs

- [MDN: flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
