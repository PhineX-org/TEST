---
id: kw-revert
kind: datatype
cat: datatypes
chip: revert
title: رجوع لستايل المتصفح
en: CSS revert keyword
status: stable
support: all
size: compact
mdn: revert
summary: revert بترجع الخاصية لقيمة ستايل المتصفح الافتراضي (user-agent)، كأن CSS الموقع مكانش موجود.
keywords: revert, user agent, ستايل المتصفح, reset, revert-layer
related: kw-initial, kw-unset, kw-inherit, all
---

## intro

الكلمة `revert` بترجّع الخاصية لقيمتها **في ستايل المتصفح الافتراضي** (user-agent stylesheet)، **كأن CSS الموقع ما اتكتبش**. هي الأنسب لما تعوز «ألغي تصميمي وارجع للأصل»: مثلاً `div { display: revert; }` ترجع `block` (عكس `initial` اللي بترجع `inline`)، و`ul { list-style: revert; }` يرجّع النقط الافتراضية، و`h2 { all: revert; }` يرجّع شكل العنوان الافتراضي. وفيه **`revert-layer`** اللي بترجّع لطبقة [[at-layer]] اللي قبلها بدل المتصفح. نقطة: لو المستخدم عنده ستايل خاص بيه (user stylesheet) بترجّع له.

## try

```html
<style>
  h4 { color:#b5551f; background:#e4c490; padding:10px; margin:6px 0; }
  h4.r { all:revert; color:#3d2c18; }
  ul.r { list-style:revert; }
  ul { list-style:none; color:#3d2c18; }
</style>
<h4>عنوان بستايل الموقع</h4><h4 class="r">عنوان revert: شكل المتصفح</h4><ul><li>بدون نقط</li></ul><ul class="r"><li>revert: نقطة</li></ul>
```

## syntax

```css nolive
div { display: revert; }       /* block */
ul { list-style: revert; }
h2 { all: revert; }
.x { all: revert-layer; }
```

- يرجع لستايل المتصفح.
- `revert-layer` للطبقة السابقة.

## use

- تراجع عن reset للقوائم.
- إعادة عنصر لشكله الافتراضي.

## avoid

- الخلط مع initial.

## examples

### 1) عنوان
all: revert.

```html
<style>
  h4 { color:#b5551f; background:#e4c490; padding:10px; margin:6px 0; }
  h4.r { all:revert; color:#3d2c18; }
</style>
<h4>بستايل الموقع</h4><h4 class="r">revert</h4>
```



### 2) قايمة
list-style: revert.

```html
<style>
  ul { list-style:none; color:#3d2c18; margin:2px 0; }
  ul.r { list-style:revert; padding-inline-start:26px; }
</style>
<ul><li>بدون نقط</li></ul><ul class="r"><li>revert: نقطة</li></ul>
```



### 3) display
block مش inline.

```html
<style>
  span.x { display:revert; background:#e4c490; color:#3d2c18; margin:3px 0; }
  div.x { display:revert; background:#bcd4a8; color:#3d2c18; margin:3px 0; }
</style>
<span class="x">span يرجع inline</span><div class="x">div يرجع block</div>
```



## mistakes

### initial بدل revert

```css bad
div { display:initial; }  /* inline */
```

```css good
div { display:revert; }  /* block */
```

revert للمتصفح.

## quiz

### div { display: revert }؟
- [x] block
- [ ] inline
- [ ] none
- [ ] flex

ستايل المتصفح.

### revert-layer ترجّع لـ؟
- [x] الطبقة السابقة
- [ ] المتصفح
- [ ] الأب
- [ ] الابتدائي

cascade layer.

## refs

- [MDN: revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)
