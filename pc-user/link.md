---
id: link
kind: pseudoclass
cat: pc-user
chip: :link
title: الروابط غير المزارة
en: CSS :link pseudo-class
status: stable
support: all
size: compact
mdn: :link
summary: الحالة link بتختار الروابط (a بـ href) اللي لسه ما اتزارتش. جزء من ترتيب LVHA.
keywords: :link, link, رابط, a, LVHA, unvisited
related: visited, any-link, hover, active, pseudo-guide
---

## intro

`:link` بتختار الروابط (`<a href>`) **اللي لسه متفتحتش** (مش في تاريخ المتصفح). بتستخدمها عادةً لتحديد **لون الرابط الأساسي** قبل الزيارة. مقابلها [[visited]] للروابط المزارة.

ملحوظة: لو العنصر `<a>` من غير `href` مش بيتعدّ رابط ومش هيتختار بـ `:link`. وبتتبع قاعدة **LVHA** لترتيب الحالات: `:link` ثم `:visited` ثم `:hover` ثم `:active`. وغالباً هتكتفي بـ `a` وتبعاً [[any-link]] اللي بتشمل المزار وغير المزار.

## try

```html
<style>
  a:link { color:#3d7a5a; font-weight:bold; }
</style>
<a href="#" onclick="return false">رابط عادي</a>
```

## syntax

```css nolive
a:link { color: #3d7a5a; }
a:visited { color: #7a4a1d; }
a:hover { color: #b5551f; }
a:active { color: #c9772f; }
```

- رابط لسه ما اتفتحش.
- لازم href.

## use

- لون الرابط الأساسي.
- جزء من LVHA.

## avoid

- تغيير ترتيب LVHA.

## examples

### 1) LVHA كامل
ترتيب الحالات.

```html
<style>
  a:link { color:#3d7a5a; } a:visited { color:#7a4a1d; } a:hover { color:#b5551f; text-decoration:underline; } a:active { color:#c9772f; }
  a { font-weight:bold; font-size:1.2rem; }
</style>
<a href="#" onclick="return false">رابط بكل الحالات</a>
```



### 2) a بدون href
مبتتختارش.

```html
<style>
  a:link { color:#3d7a5a; font-weight:bold; }
</style>
<a href="#" onclick="return false">بـ href</a> | <a>بدون href</a>
```



### 3) تحت خط مختلف
تنسيق الرابط الأساسي.

```html
<style>
  a:link { color:#7a4a1d; text-decoration:underline; text-underline-offset:.2em; font-size:1.2rem; }
</style>
<a href="#" onclick="return false">رابط</a>
```



## mistakes

### ترتيب غلط

```css bad
a:hover { color:red; }
a:link { color:blue; }
```

```css good
a:link{color:blue}
a:hover{color:red}
```

LVHA.

## quiz

### link بتختار؟
- [x] روابط لسه مفتحتش
- [ ] كل الروابط
- [ ] الأزرار
- [ ] الصور

غير المزارة.

### اختصار الترتيب؟
- [x] LVHA
- [ ] HLVA
- [ ] ALVH
- [ ] VHAL

LVHA.

## refs

- [MDN: :link](https://developer.mozilla.org/en-US/docs/Web/CSS/:link)
