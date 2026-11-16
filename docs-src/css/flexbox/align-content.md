---
id: align-content
kind: property
cat: flexbox
chip: align-content
title: توزيع السطور
en: CSS align-content property
status: stable
support: all
size: compact
mdn: align-content
summary: align-content بتوزع سطور (rows) الحاوية على المحور العرضي لما يكون فيه أكتر من سطر (wrap) ومساحة فاضية.
keywords: align-content, توزيع السطور, wrap, space-between, stretch, center, multi-line
related: align-items, justify-content, flex-wrap, place-content
---

## intro

الخاصية `align-content` بتتحكم في **توزيع السطور نفسها** (مش العناصر) على المحور العرضي، وبتشتغل **بس لو فيه أكتر من سطر** (يعني `flex-wrap: wrap` والعناصر نزلت لأكتر من سطر) **ولو الحاوية ليها ارتفاع زيادة**. الفرق عن [[align-items]]: الأخيرة بتحاذي العناصر جوه **كل سطر**، أما `align-content` فبتوزّع **السطور كلها** جوه الحاوية.

القيم: `stretch` (الافتراضي: السطور بتتمدد)، `flex-start`، `flex-end`، `center`، `space-between`، `space-around`، `space-evenly`. وفي Grid بتوزّع الصفوف.

## try

```html
<style>
  .f { display:flex; flex-wrap:wrap; align-content:space-between; height:130px; width:150px; background:#efe0bd; gap:4px; }
  .f div { width:60px; padding:8px; background:#c9772f; color:#fff3e0; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```

## syntax

```css nolive
align-content: stretch;
align-content: center;
align-content: space-between;
align-content: flex-start;
```

- **القيمة المبدئية**: `normal`.
- لازم `flex-wrap: wrap` وارتفاع للحاوية.

## values

### stretch
السطور بتتمدد.

### center
السطور في النص.

### space-between
أول سطر في الأول وآخر سطر في الآخر.

### flex-start
لازقين فوق.

## use

- حاوية متعددة السطور بارتفاع ثابت.
- توزيع صفوف Grid.

## avoid

- استخدامها على سطر واحد (مفيش تأثير).

## examples

### 1) center
السطور في النص.

```html
<style>
  .f { display:flex; flex-wrap:wrap; align-content:center; height:120px; width:150px; background:#efe0bd; gap:4px; }
  .f div { width:60px; padding:6px; background:#7a4a1d; color:#f3ede0; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 2) space-between
السطور بعيدة عن بعض.

```html
<style>
  .f { display:flex; flex-wrap:wrap; align-content:space-between; height:120px; width:150px; background:#efe0bd; gap:4px; }
  .f div { width:60px; padding:6px; background:#3d7a5a; color:#f3ede0; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div><div>4</div></div>
```



### 3) سطر واحد فمفيش أثر
align-content بتتجاهل.

```html
<style>
  .f { display:flex; align-content:center; height:80px; background:#bcd4a8; gap:4px; }
  .f div { padding:6px; background:#c9772f; color:#fff3e0; }
</style>
<div class="f"><div>1</div><div>2</div></div>
```



## mistakes

### خلط مع align-items

```css bad
.f { align-content:center; }  /* سطر واحد */
```

```css good
.f { align-items:center; }
```

align-content للسطور المتعددة بس.

## quiz

### align-content بتوزّع؟
- [ ] العناصر
- [x] السطور
- [ ] الألوان
- [ ] الحجم

سطور الحاوية.

### بتشتغل لو؟
- [ ] سطر واحد
- [x] أكتر من سطر
- [ ] دايماً
- [ ] فقط column

wrap مع أكتر من سطر.

## refs

- [MDN: align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
