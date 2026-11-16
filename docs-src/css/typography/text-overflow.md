---
id: text-overflow
kind: property
cat: typography
chip: text-overflow
title: النص الزايد (…)
en: CSS text-overflow property
status: stable
support: all
mdn: text-overflow
summary: text-overflow بتحدد شكل النص الزايد عن عرض الصندوق: ellipsis بتحط ... في آخره. محتاجة overflow:hidden وwhite-space:nowrap.
keywords: text-overflow, ellipsis, ..., قص النص, truncate, overflow, nowrap
related: overflow, white-space, word-break, width
---

## intro

الخاصية `text-overflow` بتحدد **ازاي النص الزايد** عن عرض الصندوق هيتعرض: `clip` (يتقص بحدة، الافتراضي) أو **`ellipsis`** (يتقص ويتحط `…` في آخره). لكنها لوحدها **مبتشتغلش**؛ لازم تتجمع مع شرطين:

1. [[overflow]]: `hidden` (أو غير visible) عشان الزايد يتقص.
2. [[white-space]]: `nowrap` عشان النص يفضل في سطر واحد.
3. ولازم الصندوق يكون ليه **عرض محدد** (width/max-width أو عنصر flex بـ `min-width: 0`).

التركيبة الجاهزة اللي هتستخدمها كتير: `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;` لعناوين وأسماء ملفات وبطاقات.

لو عايز قص على **عدة أسطر** (مثلاً 3 أسطر ثم نقط) استخدم `-webkit-line-clamp` مع `display: -webkit-box`.

> [!tip] أضف `title` على العنصر عشان المستخدم يشوف النص كامل عند hover.

## try

```html
<style>
  .t { width:160px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; background:#efe0bd; color:#3d2c18; padding:6px 10px; border-radius:6px; }
</style>
<div class="t">عنوان طويل جداً مش هيكفي في الصندوق ده</div>
```

## syntax

```css nolive
text-overflow: clip;
text-overflow: ellipsis;
/* التركيبة الكاملة */
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

- **القيمة المبدئية**: `clip`.
- محتاجة overflow وnowrap.
- لازم عرض محدد.

## values

### clip
قص حاد (الافتراضي).

### ellipsis
قص مع نقط ... في الآخر.

### `<string>`
نص مخصص بدل النقط (دعم محدود).

## use

- عناوين وأسماء ملفات في مساحات ضيقة.
- بطاقات منتجات.
- أسماء مستخدمين في قوائم.

## avoid

- text-overflow بدون overflow:hidden.
- قص معلومة مهمة بدون title.

## examples

### 1) clip مقابل ellipsis
الفرق بين الاتنين.

```html
<style>
  .t { width:140px; overflow:hidden; white-space:nowrap; background:#efe0bd; color:#3d2c18; padding:4px 8px; margin:4px 0; }
</style>
<div class="t" style="text-overflow:clip">نص طويل جداً جداً يتقص</div><div class="t" style="text-overflow:ellipsis">نص طويل جداً جداً يتقص</div>
```



### 2) بدون overflow
مبتشتغلش.

```html
<style>
  .t { width:140px; white-space:nowrap; text-overflow:ellipsis; background:#efe0bd; color:#3d2c18; padding:4px 8px; }
</style>
<div class="t">نص طويل جداً بيخرج بره</div>
```



### 3) جوه flex
محتاجة min-width:0.

```html
<style>
  .row { display:flex; gap:8px; width:220px; background:#efe0bd; padding:6px; color:#3d2c18; }
  .name { min-width:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; flex:1; }
</style>
<div class="row"><span class="name">اسم ملف طويل جداً.pdf</span><b>2MB</b></div>
```



### 4) عدة أسطر
line-clamp لسطرين.

```html
<style>
  .t { width:180px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; background:#efe0bd; color:#3d2c18; padding:6px 10px; line-height:1.6; }
</style>
<div class="t">فقرة طويلة بتتقص بعد سطرين وبتتحط نقط في آخر السطر التاني عشان تفهم إن فيه كلام تاني.</div>
```



## mistakes

### نسيان nowrap

```css bad
.t { overflow:hidden; text-overflow:ellipsis; }  /* النص بيلف لسطر تاني */
```

```css good
.t { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
```

لازم سطر واحد.

### flex بدون min-width:0

```css bad
.name { flex:1; overflow:hidden; text-overflow:ellipsis; }  /* مبتتقصّش */
```

```css good
.name { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
```

عناصر flex ليها min-width:auto.

## quiz

### ellipsis بتعمل؟
- [ ] تخفي
- [x] تقص وتحط ...
- [ ] تلف النص
- [ ] تكبّر

نقط في الآخر.

### الشروط المطلوبة معاها؟
- [x] overflow:hidden وwhite-space:nowrap
- [ ] display:grid
- [ ] position:fixed
- [ ] float

الاتنين.

### لقص على أكتر من سطر؟
- [x] -webkit-line-clamp
- [ ] ellipsis فقط
- [ ] word-wrap
- [ ] tab-size

line-clamp.

## refs

- [MDN: text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
