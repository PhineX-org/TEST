---
id: all
kind: property
cat: modern-props
chip: all
title: إعادة ضبط كل الخصائص
en: CSS all property
status: stable
support: all
mdn: all
summary: all بتعمل reset لكل خصائص CSS مرة واحدة (initial أو inherit أو unset أو revert). مفيدة لعزل مكوّن عن ستايل الصفحة.
keywords: all, reset, unset, revert, initial, عزل, مكون
related: kw-initial, kw-inherit, kw-unset, kw-revert, display
---

## intro

الخاصية `all` هي **زرار «أعمل reset للكل»**: بتطبّق قيمة واحدة على **كل خصائص CSS** (ما عدا `direction` و`unicode-bidi` والمتغيرات المخصصة `--x`) في سطر واحد: `all: unset;`.

القيم:
- **`initial`**: كل خاصية ترجع لقيمتها الابتدائية في المواصفات (مش قيمة المتصفح! فمثلاً `display` هتبقى `inline` حتى لو العنصر div).
- **`inherit`**: كل خاصية ترث من الأب.
- **`unset`**: الخصائص الموروثة ترث، وغير الموروثة ترجع initial. وهي الأكتر استخداماً.
- **`revert`**: يرجع لستايل المتصفح الافتراضي (يعني div يرجع block).
- **`revert-layer`**: يرجع للطبقة اللي قبلها ([[at-layer]]).

أشهر استخدام: تفرّغ ستايل **زرار** قبل ما تصممه من الصفر: `button { all: unset; }`، أو تعزل **مكوّن** (widget) من ستايل الموقع حوله. حذار: `all: initial` ممكن يبوظ الشكل لأنه بيشيل حتى `display` الافتراضي، فاستخدم `revert` لو عايز يرجع كأن مفيش CSS.

## try

```html
<style>
  .a { color:#b5551f; font-weight:bold; background:#e4c490; padding:10px; margin:4px; display:block; }
  .b { all:unset; display:block; background:#efe0bd; color:#3d2c18; padding:6px; margin:4px; }
</style>
<div class="a">عادي: بياخد ستايل الصفحة</div><div class="a" style="all:revert">all: revert بيشيل الستايل ده كله</div>
```

## syntax

```css nolive
button { all: unset; }
.widget { all: initial; }
.reset { all: revert; }
.layered { all: revert-layer; }
```

- لا تؤثر على `direction` و`unicode-bidi` وvariables.
- بتتوارث؟ تعتمد على الخاصية الفرعية.
- تطبّق على **كل** الخصائص بما فيها `display`.

## values

### initial
القيمة الابتدائية في المواصفات.

### inherit
ورث من الأب.

### unset
موروثة ترث وغيرها initial.

### revert
ستايل المتصفح.

### revert-layer
طبقة cascade اللي قبلها.

## use

- تفريغ الأزرار قبل التصميم المخصص: `button { all: unset }`.
- عزل مكوّن أو widget من CSS خارجي.
- رجوع عنصر لستايل المتصفح بـ `revert`.

## avoid

- `all: initial` بدون وعي (بيشيل display).
- استخدامها على body أو * كله (تخرب الصفحة).

## examples

### 1) revert
يرجع لشكل المتصفح.

```html
<style>
  .x { all:revert; }
  div { color:#b5551f; background:#e4c490; padding:10px; font-weight:bold; }
</style>
<div>عنصر متلوّن</div><div class="x">نفس العنصر بعد all: revert</div>
```



### 2) unset لزرار
نبدأ من الصفر.

```html
<style>
  button.u { all:unset; cursor:pointer; padding:8px 18px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; }
</style>
<button class="u">زرار من الصفر</button>
```



### 3) initial
بيرجع inline.

```html
<style>
  .i1 { all:initial; color:#3d2c18; }
</style>
<div class="i1">div بقى inline بعد initial</div><div class="i1">والتاني جنبه</div>
```



### 4) عزل مكوّن
widget مستقل.

```html
<style>
  p { color:#b5551f; font-size:1.2rem; }
  .widget { all:initial; display:block; font-family:sans-serif; color:#3d2c18; background:#efe0bd; padding:8px; border-radius:8px; }
</style>
<p>فقرة خارجية</p><div class="widget">widget معزول عن ستايل p</div>
```



## mistakes

### all: initial على عنصر block

```css bad
.box { all:initial; }  /* بقى inline ومفيش حاجة شغالة */
```

```css good
.box { all:revert; }  /* أو all:initial; display:block; */
```

initial بيحط display:inline.

### وضعها قبل باقي الخصائص

```css bad
.a { color:red; all:unset; }  /* التصفير بيمسح اللون */
```

```css good
.a { all:unset; color:red; }
```

اكتب all الأول.

## quiz

### all بتأثر على؟
- [x] كل الخصائص تقريباً
- [ ] color فقط
- [ ] margin فقط
- [ ] العناصر التانية

كل الخصائص.

### أشهر قيمة لتفريغ الزرار؟
- [x] unset
- [ ] inherit
- [ ] auto
- [ ] none

all: unset.

### revert بترجّع؟
- [x] ستايل المتصفح
- [ ] القيمة الابتدائية
- [ ] ستايل الأب
- [ ] لا شيء

user-agent.

## refs

- [MDN: all](https://developer.mozilla.org/en-US/docs/Web/CSS/all)
