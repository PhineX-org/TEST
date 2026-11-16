---
id: overflow
kind: property
cat: sizing
chip: overflow
title: التعامل مع المحتوى الزايد
en: CSS overflow property
status: stable
support: all
mdn: overflow
summary: overflow بتحدد اللي يحصل لما المحتوى يكون أكبر من الصندوق: يظهر، يتقص، يسكرول. وبتتحكم في scrollbars وفي منع بعض مشاكل التخطيط.
keywords: overflow, scroll, hidden, auto, visible, clip, سكرول, محتوى زايد, قص, scrollbar
related: overflow-x, overflow-y, max-height, height, text-overflow, scroll-behavior
---

## intro

لما المحتوى يبقى **أكبر** من الصندوق اللي حاطه فيه (عشان حطيت `height` ثابت أو `width` صغير)، فيه سؤال: «يعمل إيه؟». الإجابة بتحددها الخاصية `overflow`.

القيم:
- **`visible`** (الافتراضي): المحتوى **يطلع برّه** الصندوق ويفضل ظاهر (ممكن يغطي عناصر تانية).
- **`hidden`**: المحتوى الزايد **يتقص ويتخفي**. ومفيد جداً لقص الصور داخل زوايا دائرية.
- **`scroll`**: دايماً يظهر scrollbar (حتى لو مفيش محتوى زايد).
- **`auto`**: scrollbar **بس لو محتاج**. ده الأنسب غالباً.
- **`clip`**: زي hidden لكن مفيش سكرول حتى برمجياً.

فيه تأثيرات جانبية مهمة: `overflow` غير `visible` بيخلّي العنصر **يحتوي على الـ floats** وبيمنع **Margin Collapsing** مع الأب (بيعمل «سياق تنسيق مستقل» BFC). وبتتحكم في الاتجاهين مع بعض، أو كل واحد لوحده بـ [[overflow-x]] و[[overflow-y]].

> [!analogy] الصندوق زي كوب: لو صبّيت أكتر منه ممكن الميّة تفيض (visible)، أو تتقص بالحد (hidden)، أو تبقى في كوب بيتحرك لفوق وتحت (scroll).

> [!warn] مع `overflow: hidden` ممكن تقص ظل أو عنصر `position: absolute` طالع برّه الصندوق.

## try

```html
<style>
  .b { width:200px; height:60px; background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; overflow:auto; }
</style>
<div class="b">سطر 1<br>سطر 2<br>سطر 3<br>سطر 4<br>سطر 5</div>
```

## syntax

```css nolive
overflow: visible;
overflow: hidden;
overflow: scroll;
overflow: auto;
overflow: hidden auto;   /* x y */
```

- **القيمة المبدئية**: `visible`.
- **بتتوارث؟** لأ.
- اختصار لـ `overflow-x` و`overflow-y`.

## values

### visible
المحتوى يطلع برّه الصندوق.

### hidden
المحتوى الزايد يتقص.

### scroll
scrollbar دايماً.

### auto
scrollbar لو محتاج بس.

### clip
زي hidden من غير سكرول برمجي.

## use

- قوائم وصناديق بحد أقصى (`overflow-y: auto`).
- قص الصور جوه إطار مدوّر (`overflow: hidden`).
- منع Margin Collapsing أو احتواء floats.
- جداول عريضة: `overflow-x: auto` على الغلاف.

## avoid

- `overflow:hidden` على body بدون داعي (بيمنع السكرول).
- `scroll` لو مش عايز scrollbar ظاهر دايماً.

## examples

### 1) visible مقابل hidden
الأول بيفيض، التاني بيتقص.

```html
<style>
  .b { width:120px; height:40px; background:#efe0bd; color:#3d2c18; border:2px solid #7a4a1d; margin:20px 0; }
  .v { overflow:visible; } .h { overflow:hidden; }
</style>
<div class="b v">فائض بيطلع برّه الصندوق للأسفل</div><div class="b h">فائض بيتقص ومش ظاهر</div>
```



### 2) auto بسكرول
scrollbar بس لو لازم.

```html
<style>
  .b { width:160px; height:70px; overflow:auto; background:#bcd4a8; color:#3d2c18; padding:6px; }
</style>
<div class="b">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 3) قص بزوايا مدوّرة
`overflow:hidden` + `border-radius` = صورة بزوايا ناعمة.

```html
<style>
  .c { width:140px; height:80px; border-radius:20px; overflow:hidden; background:#efe0bd; }
  .img { width:200px; height:120px; background:linear-gradient(135deg,#c9772f,#3d7a5a); }
</style>
<div class="c"><div class="img"></div></div>
```



### 4) جدول عريض
scroll أفقي على الغلاف.

```html
<style>
  .w { overflow-x:auto; width:200px; background:#efe0bd; padding:4px; }
  table { width:420px; border-collapse:collapse; color:#3d2c18; }
  td { border:1px solid #7a4a1d; padding:4px; }
</style>
<div class="w"><table><tr><td>عمود 1</td><td>عمود 2</td><td>عمود 3</td><td>عمود 4</td></tr></table></div>
```



## mistakes

### hidden مع ظل أو عنصر absolute

```css bad
.card { overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,.3); }  /* الظل اتقص لو على الأب */
```

```css good
.card { box-shadow:0 8px 20px rgba(0,0,0,.3); }
.card .img { overflow:hidden; }
```

overflow بيقص كل اللي برّه حدود العنصر ومنه عناصر absolute.

### overflow:scroll حيثما كان

```css bad
.list { overflow:scroll; }
```

```css good
.list { overflow:auto; }
```

`scroll` بيظهر scrollbar حتى بدون حاجة.

## quiz

### القيمة الافتراضية؟
- [ ] hidden
- [x] visible
- [ ] auto
- [ ] scroll

visible.

### أنسب قيمة لسكرول لو محتاج؟
- [ ] scroll
- [ ] hidden
- [x] auto
- [ ] clip

auto بيظهر لو لازم.

### `overflow:hidden` بيعمل إيه للمحتوى الزايد؟
- [ ] يظهره
- [x] يقصه
- [ ] يلفه
- [ ] يصغّره

بيتقص.

## refs

- [MDN: overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
