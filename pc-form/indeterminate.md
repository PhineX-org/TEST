---
id: indeterminate
kind: pseudoclass
cat: pc-form
chip: :indeterminate
title: حالة غير محددة
en: CSS :indeterminate pseudo-class
status: stable
support: all
size: compact
mdn: :indeterminate
summary: الحالة indeterminate بتنطبق على checkbox في حالة وسط (شرطة) وعلى radio مجموعة غير مختارة وعلى progress بدون قيمة.
keywords: :indeterminate, indeterminate, وسط, checkbox, progress
related: checked, accent-color
---

## intro

`:indeterminate` بتنطبق على حالات «**مش محدد ولا غير محدد**»: **checkbox** اللي اتظبطت بالـ JavaScript على `indeterminate = true` (شرطة `−` بدل صح، زي «بعض العناصر محددة»)، و**مجموعة radio** ما اتختارش فيها حاجة، و**`<progress>`** من غير `value` (شريط تحميل غير معروف المدة). مفيدة في واجهات «تحديد الكل» اللي فيها تحديد جزئي. ولازم تظبط الـ checkbox بـ JS لأن مفيش خاصية HTML ليها.

## try

```html
<style>
  input:indeterminate { accent-color:#c9772f; width:22px; height:22px; }
</style>
<input type="checkbox" id="ind"><script>document.getElementById('ind').indeterminate=true</script> حالة وسط
```

## syntax

```css nolive
input:indeterminate { accent-color: #c9772f; }
progress:indeterminate { }
```

- checkbox يتظبط بـ JS.
- progress بدون value.

## use

- تحديد جزئي في قوائم.
- شريط تحميل غير معروف.

## avoid

- افتراض وجود خاصية HTML ليها.

## examples

### 1) checkbox وسط
بـ JS.

```html
<style>
  input { width:22px; height:22px; accent-color:#c9772f; }
</style>
<input type="checkbox" id="c1"><script>document.getElementById('c1').indeterminate=true</script>
```



### 2) progress
بدون value.

```html
<style>
  progress { width:160px; accent-color:#3d7a5a; }
</style>
<progress></progress>
```



### 3) تنسيق الحالة
لون مختلف.

```html
<style>
  input:indeterminate + span { color:#b5551f; font-weight:bold; }
  label { color:#3d2c18; }
</style>
<label><input type="checkbox" id="c2"><span> تحديد الكل</span></label><script>document.getElementById('c2').indeterminate=true</script>
```



## mistakes

### انتظار خاصية HTML

```css bad
<input type="checkbox" indeterminate>
```

```css good
document.querySelector("input").indeterminate = true;
```

بـ JS فقط.

## quiz

### indeterminate للـ checkbox بتتظبط؟
- [x] بـ JavaScript
- [ ] بـ HTML
- [ ] بـ CSS
- [ ] تلقائي

خاصية DOM.

### progress بدون value؟
- [x] indeterminate
- [ ] valid
- [ ] default
- [ ] checked

غير معروف.

## refs

- [MDN: :indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate)
