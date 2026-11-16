---
id: word-break
kind: property
cat: typography
chip: word-break
title: كسر الكلمات
en: CSS word-break property
status: stable
support: all
mdn: word-break
summary: word-break بتتحكم في مكان كسر الكلمات الطويلة. break-all بتكسر في أي مكان، keep-all بتمنع الكسر في CJK، وbreak-word للقديم.
keywords: word-break, break-all, keep-all, كسر الكلمة, كلمة طويلة, url طويل
related: overflow-wrap, white-space, hyphens, text-overflow
---

## intro

الخاصية `word-break` بتحدد **هل المتصفح يقدر يكسر الكلمة نفسها** (مش بس بين الكلمات) عشان النص ميطلعش بره الصندوق. القيم:

- **`normal`** (الافتراضي): يكسر **بين الكلمات** بس، فكلمة طويلة جداً (رابط مثلاً) ممكن تخرج بره الصندوق.
- **`break-all`**: يكسر **في أي مكان** بين الحروف عشان يملا السطر، مفيد للروابط والنصوص الغريبة، لكنه بيكسر الكلمات العادية بشكل مش مريح.
- **`keep-all`**: يمنع الكسر داخل الكلمات في لغات CJK (صيني/ياباني/كوري).
- **`break-word`**: قديمة (deprecated) وبتتصرف زي `overflow-wrap: anywhere`.

**الأفضل في أغلب الحالات** إنك تستخدم [[overflow-wrap]]`: anywhere` أو `break-word` بدل `word-break: break-all` لأنها بتكسر الكلمة **فقط لو مفيش بديل** (لو الكلمة أطول من السطر)، بينما `break-all` بتكسر على طول. وللعربي: كسر الحروف المتصلة بيبوّظ القراءة، فاستخدم الكسر بحذر.

## try

```html
<style>
  div { width:130px; margin:4px 0; padding:4px 8px; background:#efe0bd; color:#3d2c18; font-size:.95rem; direction:ltr; text-align:left; }
</style>
<div style="word-break:normal">normal: https://phinex.example/very-long-link-here</div>
<div style="word-break:break-all">break-all: https://phinex.example/very-long-link-here</div>
```

## syntax

```css nolive
word-break: normal;
word-break: break-all;
word-break: keep-all;
word-break: break-word;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
كسر بين الكلمات فقط.

### break-all
كسر بين أي حرفين.

### keep-all
لا كسر داخل CJK.

### break-word
قديمة، زي overflow-wrap:anywhere.

## use

- كسر روابط طويلة.
- منع خروج نص مولّد بره الصندوق.
- تحكم في كسر CJK.

## avoid

- break-all على نص عادي.
- break-all على نص عربي متصل.

## examples

### 1) كلمة طويلة
normal تطلع بره، break-all تتكسر.

```html
<style>
  div { width:130px; margin:4px 0; padding:4px 8px; background:#efe0bd; color:#3d2c18; font-size:.95rem; direction:ltr; text-align:left; }
</style>
<div style="word-break:normal">Supercalifragilisticexpialidocious</div><div style="word-break:break-all">Supercalifragilisticexpialidocious</div>
```



### 2) رابط في بطاقة
بيتكسر عشان ميطلعش بره.

```html
<style>
  .c { width:150px; background:#efe0bd; color:#3d2c18; padding:8px; word-break:break-all; direction:ltr; text-align:left; font-size:.9rem; }
</style>
<div class="c">https://phinex.academy/courses/css/lesson-12</div>
```



### 3) break-all على كلام عادي
بيكسر كلمات عادية بشكل وحش.

```html
<style>
  p { width:120px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; word-break:break-all; direction:ltr; text-align:left; }
</style>
<p>This is a normal sentence for reading.</p>
```



### 4) الأفضل: overflow-wrap
بتكسر لو لازم بس.

```html
<style>
  p { width:120px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; overflow-wrap:anywhere; direction:ltr; text-align:left; }
</style>
<p>Normal words stay; Supercalifragilisticexpialidocious breaks.</p>
```



## mistakes

### break-all لكل النصوص

```css bad
p { word-break:break-all; }
```

```css good
p { overflow-wrap:break-word; }
```

break-all بتكسر كل كلمة.

### نسيان الروابط الطويلة

```css bad
.card { width:150px; }  /* الرابط بيخرج */
```

```css good
.card { width:150px; overflow-wrap:anywhere; }
```

تأمين النص المولّد.

## quiz

### break-all بتكسر؟
- [ ] بين الكلمات
- [x] بين أي حرفين
- [ ] مفيش
- [ ] بعد النقطة

في أي مكان.

### الأفضل للنص العادي؟
- [ ] break-all
- [x] overflow-wrap
- [ ] keep-all
- [ ] normal فقط

overflow-wrap.

### الافتراضي؟
- [x] normal
- [ ] break-all
- [ ] keep-all
- [ ] break-word

normal.

## refs

- [MDN: word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)
