---
id: text-decoration-thickness
kind: property
cat: typography
chip: text-decoration-thickness
title: سُمك الخط التحتاني
en: CSS text-decoration-thickness property
status: stable
support: all
size: compact
mdn: text-decoration-thickness
summary: text-decoration-thickness بتحدد سُمك خط underline أو line-through أو overline. تعاونها مع text-underline-offset بيدّي روابط أنضف.
keywords: text-decoration-thickness, سمك الخط, underline, thickness
related: text-decoration, text-underline-offset, color, font-weight
---

## intro

الخاصية `text-decoration-thickness` بتحدد **سُمك الخط الزخرفي** (تحت أو فوق أو شطب). القيم: `auto` (المتصفح يحدد)، `from-font` (يستخدم سُمك مضمّن في الخط لو موجود)، أو **طول** زي `2px` أو `0.1em`.

الاستخدام الأشهر: روابط بخط أسمك وأنيق مع [[text-underline-offset]] ولون مخصص من [[text-decoration]]. والـ `em` بتخلّي السُمك يتناسب مع حجم الخط. بتتوارث للأولاد اللي بيتلوّنوا بنفس الخط الزخرفي.

## try

```html
<style>
  a { color:#b5551f; font-size:1.4rem; font-weight:bold; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:.2em; }
</style>
<a href="#">رابط بخط سميك</a>
```

## syntax

```css nolive
text-decoration-thickness: auto;
text-decoration-thickness: from-font;
text-decoration-thickness: 2px;
text-decoration-thickness: 0.1em;
```

- **القيمة المبدئية**: `auto`.

## values

### auto
المتصفح يحدد.

### from-font
من الخط.

### `<length>`
طول مخصص.

## use

- روابط أنيقة.
- تمييز عناوين.

## avoid

- سُمك زائد يخنق الحروف.

## examples

### 1) سُمك مختلف
1px و3px و6px.

```html
<style>
  a { display:block; margin:5px 0; color:#7a4a1d; font-size:1.2rem; text-decoration:underline; }
</style>
<a href="#" style="text-decoration-thickness:1px">1px</a><a href="#" style="text-decoration-thickness:3px">3px</a><a href="#" style="text-decoration-thickness:6px">6px</a>
```



### 2) بالـ em
يتناسب مع الحجم.

```html
<style>
  p { margin:2px 0; color:#7a4a1d; text-decoration:underline; text-decoration-thickness:.1em; text-underline-offset:.2em; }
</style>
<p style="font-size:1rem">صغير</p><p style="font-size:2rem">كبير</p>
```



### 3) line-through
سُمك الشطب.

```html
<style>
  p { margin:0; color:#8a7a62; font-size:1.4rem; text-decoration:line-through; text-decoration-thickness:3px; text-decoration-color:#b5551f; }
</style>
<p>500 جنيه</p>
```



## mistakes

### خط رفيع جداً

```css bad
a { text-decoration:underline; }
```

```css good
a { text-decoration:underline; text-decoration-thickness:2px; }
```

الأسمك أوضح للروابط.

## quiz

### from-font معناها؟
- [x] السُمك من الخط
- [ ] سُمك صفر
- [ ] سُمك كبير
- [ ] لون

قيمة مضمّنة في الخط.

### تتكامل مع؟
- [x] text-underline-offset
- [ ] grid
- [ ] float
- [ ] order

الإزاحة.

## refs

- [MDN: text-decoration-thickness](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness)
