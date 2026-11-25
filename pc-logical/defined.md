---
id: defined
kind: pseudoclass
cat: pc-logical
chip: :defined
title: عنصر معرّف
en: CSS :defined pseudo-class
status: stable
support: all
size: compact
mdn: :defined
summary: الحالة defined بتنطبق على كل العناصر المعروفة، وعلى Custom Elements بعد ما يتسجّلوا. مفيدة لإخفاء مكوّن لحد ما يجهز.
keywords: :defined, defined, custom elements, web components
related: has, not
---

## intro

`:defined` بتنطبق على **أي عنصر معرّف**: كل عناصر HTML الأصلية دايماً معرّفة، والعناصر المخصصة (**Custom Elements** / Web Components) بتبقى معرّفة **بعد ما JavaScript يسجّلها** بـ `customElements.define()`. فايدتها: تخفي المكوّن أو تحط له شكل «تحميل» لحد ما يجهز، وتمنع وميض المحتوى غير المنسّق. مثلاً `my-card:not(:defined) { visibility: hidden; }`. ولو مبتستخدمش Web Components مش هتحتاجها خالص، فمتقلقش لو مفهمتهاش دلوقتي.

## try

```html
<style>
  my-card:not(:defined) { display:block; padding:8px; background:#e4c490; color:#3d2c18; border-radius:6px; }
  my-card:not(:defined)::before { content:'جاري التحميل...'; }
</style>
<my-card></my-card>
```

## syntax

```css nolive
my-card:not(:defined) { visibility: hidden; }
:defined { }
```

- للمكوّنات المخصصة.

## use

- إخفاء مكوّن لحد التسجيل.
- حالة تحميل.

## avoid

- استخدامها بدون Web Components.

## examples

### 1) قبل التسجيل
حالة تحميل.

```html
<style>
  x-box:not(:defined) { display:block; padding:8px; background:#efe0bd; color:#8a7a62; }
  x-box:not(:defined)::before { content:'غير معرّف بعد'; }
</style>
<x-box></x-box>
```



### 2) بعد التسجيل
بالـ JS.

```html
<style>
  y-box:defined { display:block; padding:8px; background:#bcd4a8; color:#3d2c18; border-radius:6px; }
</style>
<y-box>أنا معرّف</y-box><script>customElements.define('y-box', class extends HTMLElement{})</script>
```



### 3) عناصر HTML
دايماً معرّفة.

```html
<style>
  p:defined { color:#3d7a5a; font-weight:bold; }
</style>
<p style="margin:0">وسم عادي معرّف دايماً</p>
```



## mistakes

### انتظار ظهور المكوّن

```css bad
my-card { }  /* وميض قبل التسجيل */
```

```css good
my-card:not(:defined) { visibility:hidden; }
```

إخفاء مؤقت.

## quiz

### defined بتنطبق على؟
- [x] عناصر معرّفة (ومنها المخصصة بعد التسجيل)
- [ ] فقط الصور
- [ ] فقط الأزرار
- [ ] لا شيء

المعرّفة.

### الاستخدام الشائع؟
- [x] إخفاء المكوّن لحد ما يجهز
- [ ] تلوين
- [ ] حدود
- [ ] ظل

تجنب الوميض.

## refs

- [MDN: :defined](https://developer.mozilla.org/en-US/docs/Web/CSS/:defined)
