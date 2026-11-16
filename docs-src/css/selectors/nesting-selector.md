---
id: nesting-selector
kind: selector
cat: selectors
chip: &
title: محدد التداخل (&)
en: Nesting selector
status: stable
support: all
mdn: Nesting_selector
summary: الرمز & جوه قاعدة متداخلة معناه «المحدد الأب». بيسمح بحالات مثل &:hover و&.active و.dark & بشكل نظيف.
keywords: nesting selector, &, ampersand, css nesting, المحدد الاب, هوفر داخل, sass
related: nesting-guide, hover, class-selector, specificity
---

## intro

الرمز **`&`** جوه قاعدة متداخلة (CSS Nesting) بيمثّل **المحدد الأب** بالكامل. بيستخدم لما عايز تضيف شيء **على نفس العنصر** مش على نسله:

```
.btn {
  &:hover { ... }      /* .btn:hover */
  &.active { ... }     /* .btn.active */
  .dark & { ... }      /* .dark .btn */
  & + & { ... }        /* .btn + .btn */
}
```

من غير `&`، المحدد المتداخل بيتعامل كنسل (مسافة): `.btn { :hover {} }` = `.btn :hover` وده غالباً مش اللي أنت عايزه!

وفي أنماط أحدث، تقدر تكتب المحدد الفرعي من غير `&` لو بدأ بحرف أو class (`h2 {}` جوه `.card`)، لكن لو بدأ بـ combinator أو pseudo الأفضل `&` صريحة.

والـ specificity: `&` بياخد specificity الأب (زي `:is()`)، فلو الأب فيه قائمة محددات، بياخد أعلى واحدة.

> [!tip] اقرأ `&` في ذهنك على إنها «ده العنصر نفسه».

> [!warn] المتصفحات القديمة ما بتدعمش Nesting. اتأكد من الجمهور المستهدف أو استخدم أداة بناء.

## try

```html
<style>
  .btn { display:inline-block; padding:8px 16px; background:#7a4a1d; color:#f3ede0; border-radius:8px;
    &:hover { background:#3d7a5a; }
    &.big { padding:14px 28px; font-size:1.2rem; }
  }
</style>
<span class="btn">عادي</span> <span class="btn big">كبير</span>
```

## syntax

```css nolive
.card {
  &:hover { }        /* .card:hover */
  &.active { }       /* .card.active */
  .dark & { }        /* .dark .card */
  & > p { }          /* .card > p */
}
```

- `&` = المحدد الأب.
- لازم داخل قاعدة متداخلة.

## use

- حالات: `&:hover` و`&:focus` و`&.active`.
- سياق خارجي: `.dark &` و`@media`.
- تكرار نفس العنصر: `& + &`.

## avoid

- نسيان `&` قبل pseudo-class (بيتحول لنسل).
- تداخل أعمق من 3 مستويات.

## examples

### 1) & مع hover
`&:hover` = نفس العنصر لما الماوس عليه.

```html
<style>
  .t { padding:10px; background:#efe0bd; color:#3d2c18; transition:background .2s;
    &:hover { background:#bcd4a8; }
  }
</style>
<div class="t">مرّر عليّ</div>
```



### 2) & مع class إضافية
`&.on` = العنصر نفسه لما يكون عليه class on.

```html
<style>
  .sw { padding:8px 16px; background:#efe0bd; color:#3d2c18; display:inline-block;
    &.on { background:#3d7a5a; color:#f3ede0; }
  }
</style>
<span class="sw">OFF</span> <span class="sw on">ON</span>
```



### 3) & بعد السياق
`.dark &` = العنصر لما يكون جوه `.dark`.

```html
<style>
  .card { padding:10px; background:#efe0bd; color:#3d2c18;
    .dark & { background:#3d2c18; color:#efe0bd; }
  }
</style>
<div class="card">عادي</div><div class="dark"><div class="card">جوه dark</div></div>
```



### 4) & + & للإخوة
مسافة بين الأخوة المتشابهين.

```html
<style>
  .it { padding:8px; background:#bcd4a8; color:#3d2c18;
    & + & { margin-top:6px; }
  }
</style>
<div class="it">1</div><div class="it">2</div><div class="it">3</div>
```



## mistakes

### نسيان & مع hover

```css bad
.a { :hover { color:red; } }
```

```css good
.a { &:hover { color:red; } }
```

من غير `&` بيتحول لنسل `.a :hover`.

### استخدام & برّه تداخل

```css bad
& { color:red; }
```

```css good
.a { color:red; }
```

`&` برّه قاعدة أب لا معنى لها (أو تشير للـ :scope).

## quiz

### `&` معناها؟
- [ ] كل العناصر
- [x] المحدد الأب
- [ ] العنصر الأول
- [ ] الأخ

المحدد الأب.

### `.dark &` بتختار؟
- [ ] dark نفسه
- [x] العنصر جوه .dark
- [ ] الأخ
- [ ] الابن

السياق قبل العنصر.

### من غير & قبل `:hover`؟
- [ ] نفس العنصر
- [x] نسل
- [ ] أخ
- [ ] خطأ فقط

بيتحول لمسافة.

## refs

- [MDN: &](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector)
- [MDN: Nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector)
