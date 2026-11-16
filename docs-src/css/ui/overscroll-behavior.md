---
id: overscroll-behavior
kind: property
cat: ui
chip: overscroll-behavior
title: سلوك التمرير الزائد
en: CSS overscroll-behavior property
status: stable
support: all
size: compact
mdn: overscroll-behavior
summary: overscroll-behavior بتمنع انتقال التمرير من الحاوية للصفحة (scroll chaining) وبتتحكم في تأثير السحب للتحديث على الموبايل.
keywords: overscroll-behavior, contain, none, scroll chaining, modal
related: overflow, scroll-behavior, touch-action
---

## intro

الخاصية `overscroll-behavior` بتتحكم فيما يحصل لما المستخدم يوصل **لآخر الحاوية** ويكمل تمرير: **`auto`** (الافتراضي) يكمل التمرير على **الصفحة اللي ورا** (scroll chaining)، و**`contain`** يمنع الانتقال ده (التمرير يفضل جوه الحاوية)، و**`none`** يمنع كمان تأثيرات المتصفح (زي السحب للتحديث والارتداد). أشهر استخدام: **قايمة/مودال** قابلة للسكرول: لما توصل لآخرها متسكرولش الصفحة اللي ورا فجأة. `overscroll-behavior: contain` على الحاوية. وبتتحط على عنصر `overflow` فعلي.

## try

```html
<style>
  .c { width:150px; height:60px; overflow:auto; overscroll-behavior:contain; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">سطر 1<br>سطر 2<br>سطر 3<br>سطر 4<br>سطر 5<br>سطر 6</div>
```

## syntax

```css nolive
overscroll-behavior: auto;
overscroll-behavior: contain;
overscroll-behavior: none;
```

- **القيمة المبدئية**: `auto`.

## values

### auto
يكمل على الصفحة.

### contain
يبقى جوه الحاوية.

### none
بدون تأثيرات كمان.

## use

- مودال وقوايم قابلة للسكرول.
- منع السحب للتحديث.

## avoid

- none بدون حاجة.

## examples

### 1) contain
منع السكرول الخلفي.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; overscroll-behavior:contain; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 2) auto
الانتقال للصفحة.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; overscroll-behavior:auto; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 3) لوحة جانبية
contain عملي.

```html
<style>
  .p { width:120px; height:70px; overflow:auto; overscroll-behavior:contain; background:#3d7a5a; color:#f3ede0; padding:6px; border-radius:8px; }
</style>
<div class="p">قايمة<br>خيار<br>خيار<br>خيار<br>خيار<br>خيار</div>
```



## mistakes

### مودال بدون contain

```css bad
.modal { overflow:auto; }  /* الصفحة تتحرك ورا */
```

```css good
.modal { overflow:auto; overscroll-behavior:contain; }
```

contain.

## quiz

### contain بتمنع؟
- [x] انتقال التمرير للصفحة
- [ ] التمرير نفسه
- [ ] النص
- [ ] الأنيميشن

scroll chaining.

### الافتراضي؟
- [x] auto
- [ ] contain
- [ ] none
- [ ] hidden

auto.

## refs

- [MDN: overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)
