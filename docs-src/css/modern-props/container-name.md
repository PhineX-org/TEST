---
id: container-name
kind: property
cat: modern-props
chip: container-name
title: اسم الحاوية
en: CSS container-name property
status: stable
support: all
size: compact
mdn: container-name
summary: container-name بتدّي الحاوية اسم عشان @container يستهدفها بالاسم لو عندك حاويات متداخلة.
keywords: container-name, container queries, اسم الحاوية
related: container-type, container, at-container
---

## intro

الخاصية `container-name` بتدّي **اسم** لحاوية الاستعلام. لما يكون عندك حاويات **متداخلة** (حاوية جوه حاوية)، `@container` من غير اسم بيستعلم عن **أقرب حاوية** فقط. بالاسم تقدر تستهدف حاوية معينة: `container-name: sidebar;` وبعدين `@container sidebar (min-width: 300px) { ... }`. تقدر تدّي الحاوية أكتر من اسم مفصولين بمسافة. وغالباً بتتكتب مع [[container-type]] أو بالاختصار [[container]]. اختار أسماء وصفية (card, sidebar, main).

## try

```html
<style>
  .a { container-type:inline-size; container-name:card; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="a"><div class="t">محتوى بيتأثر بالحاوية card</div></div>
```

## syntax

```css nolive
.sidebar { container-type: inline-size; container-name: sidebar; }
@container sidebar (min-width: 300px) { ... }
```

- **القيمة المبدئية**: `none`.
- ممكن أكتر من اسم.

## values

### `<name>`
اسم الحاوية.

### none
بدون اسم.

## use

- حاويات متداخلة.
- وضوح الكود.

## avoid

- أسماء غامضة.

## examples

### 1) حاوية مسمّاة
card.

```html
<style>
  .a { container-type:inline-size; container-name:card; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="a"><div class="t">card</div></div>
```



### 2) اسمين
قائمة أسماء.

```html
<style>
  .a { container-type:inline-size; container-name:box widget; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container widget (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="a"><div class="t">اسمين للحاوية</div></div>
```



### 3) تداخل
استهداف الخارجية.

```html
<style>
  .o { container-type:inline-size; container-name:outer; width:280px; max-width:100%; padding:6px; border:2px dashed #7a4a1d; }
  .n { container-type:inline-size; container-name:inner; width:140px; padding:6px; border:2px dashed #bda27a; }
  .t { background:#e4c490; color:#3d2c18; padding:6px; border-radius:6px; }
  @container outer (min-width: 250px) { .t { background:#bcd4a8; } }
</style>
<div class="o"><div class="n"><div class="t">خضراء بسبب outer</div></div></div>
```



## mistakes

### اسم بدون type

```css bad
.a { container-name:card; }  /* مش حاوية فعلياً */
```

```css good
.a { container-name:card; container-type:inline-size; }
```

لازم container-type.

## quiz

### ليه الاسم؟
- [x] استهداف حاوية معينة
- [ ] تلوين
- [ ] تحريك
- [ ] إخفاء

مع التداخل.

### الاختصار؟
- [x] container
- [ ] container-all
- [ ] cq
- [ ] box

container.

## refs

- [MDN: container-name](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name)
