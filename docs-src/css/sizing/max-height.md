---
id: max-height
kind: property
cat: sizing
chip: max-height
title: أقصى ارتفاع
en: CSS max-height property
status: stable
support: all
size: compact
mdn: max-height
summary: max-height بتحدد أكبر ارتفاع للعنصر. أساس القوائم اللي بتسكرول، وأكورديون بسيط بتحريك max-height.
keywords: max-height, اقصى ارتفاع, scroll, overflow, اكورديون, dropdown, حد اقصى
related: min-height, height, overflow, transition, max-width
---

## intro

الخاصية `max-height` بتحط **حد أقصى** لارتفاع العنصر. لو المحتوى أطول، بيطلع برّه الصندوق إلا لو استخدمت [[overflow]] علشان تتحكم فيه (مثلاً `overflow-y: auto` علشان يظهر scrollbar).

استخداماتها: **قائمة منسدلة** أو box فيه كتير عناصر بحد أقصى وسكرول، و**الأكورديون** بتحريك `max-height` من 0 لقيمة كبيرة بـ `transition` (حيلة قديمة قبل ما `height: auto` يتحرك بسهولة). والقيمة الافتراضية `none`.

لو `height` و`max-height` اتعارضوا، `max-height` بتكسب.

> [!analogy] `max-height` زي رف بحد أقصى للارتفاع: لو الكتب أطول بتتقص أو بتحتاج سكرول.

## try

```html
<style>
  .b { max-height:70px; overflow-y:auto; background:#efe0bd; color:#3d2c18; padding:6px; }
</style>
<div class="b">1<br>2<br>3<br>4<br>5<br>6<br>7</div>
```

## syntax

```css nolive
max-height: 300px;
max-height: 50vh;
max-height: none;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** لأ.

## values

### `<length>`
حد أقصى ثابت.

### none
مفيش حد (الافتراضي).

### `<percentage>`
من ارتفاع الأب.

## use

- قائمة طويلة بسكرول (`max-height: 300px; overflow-y:auto`).
- أكورديون بسيط.

## avoid

- `max-height` من غير `overflow` (المحتوى بيطلع برّه).

## examples

### 1) قائمة بسكرول
اسحب جوه الصندوق.

```html
<style>
  .l { max-height:80px; overflow-y:auto; background:#efe0bd; color:#3d2c18; padding:4px 8px; }
</style>
<div class="l">عنصر 1<br>عنصر 2<br>عنصر 3<br>عنصر 4<br>عنصر 5<br>عنصر 6</div>
```



### 2) أكورديون بـ transition
مرّر الماوس على العنوان.

```html
<style>
  .acc { background:#efe0bd; color:#3d2c18; }
  .acc .h { padding:8px; background:#7a4a1d; color:#f3ede0; cursor:pointer; }
  .acc .b { max-height:0; overflow:hidden; transition:max-height .4s; padding:0 8px; }
  .acc:hover .b { max-height:120px; }
</style>
<div class="acc"><div class="h">مرّر عليّ</div><div class="b">محتوى مخفي بيظهر بحركة ناعمة</div></div>
```



### 3) حد أقصى بدون سكرول
المحتوى بيطلع برّه الصندوق.

```html
<style>
  .b { max-height:40px; background:#e4a090; color:#3d2c18; border:2px solid #7a4a1d; }
</style>
<div class="b">1<br>2<br>3<br>4</div>
```

- استخدم `overflow` علشان تتحكم.

## mistakes

### نسيان overflow

```css bad
.box { max-height:100px; }
```

```css good
.box { max-height:100px; overflow-y:auto; }
```

من غير overflow المحتوى الزايد بيطلع برّه.

## quiz

### القيمة الافتراضية؟
- [ ] 0
- [ ] auto
- [x] none
- [ ] 100%

none.

### مع max-height بنضيف؟
- [ ] float
- [x] overflow
- [ ] z-index
- [ ] order

علشان نتحكم في الزايد.

## refs

- [MDN: max-height](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)
