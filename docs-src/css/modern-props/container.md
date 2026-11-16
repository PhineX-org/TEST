---
id: container
kind: property
cat: modern-props
chip: container
title: اختصار الحاوية
en: CSS container shorthand
status: stable
support: all
size: compact
mdn: container
summary: container اختصار بيجمع container-name وcontainer-type: container: card / inline-size.
keywords: container, shorthand, container queries, اختصار
related: container-name, container-type, at-container
---

## intro

الخاصية `container` هي **اختصار** بيجمع [[container-name]] و[[container-type]] في سطر واحد بالشكل: `container: <name> / <type>`. يعني `container: card / inline-size;` تساوي `container-name: card; container-type: inline-size;`. ولو كتبت الاسم فقط (`container: card;`) النوع بيبقى `normal` وبالتالي مش حاوية فعلياً! فاكتب النوع دايماً. الشكل ده بيقصّر الكود ويوضّح إن الاسم والنوع شغلة واحدة، وهو الشكل اللي بتشوفه في معظم الأمثلة الحديثة. فكّر فيها زي كارت التعريف: الاسم بيقول «أنا مين» والنوع بيقول «أنا بتابع إيه»، والاتنين مع بعض في سطر واحد.

## try

```html
<style>
  .w { container: card / inline-size; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">container: card / inline-size</div></div>
```

## syntax

```css nolive
.wrap { container: card / inline-size; }
.wrap { container: inline-size; }  /* بدون اسم */
```

- `name / type`.
- الفاصل `/` إجباري بين الاتنين.

## values

### `<name> / <type>`
الاسم ثم النوع.

### `<type>`
نوع فقط (بدون اسم؟ لا: النوع لازم بعد الاسم).

## use

- تعريف حاوية بسطر واحد.
- أسماء مع أنواع.

## avoid

- كتابة الاسم من غير نوع.

## examples

### 1) اسم ونوع
الشكل الكامل.

```html
<style>
  .w { container: card / inline-size; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">card / inline-size</div></div>
```



### 2) بالتفصيل
مكافئ.

```html
<style>
  .w { container-name:card; container-type:inline-size; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 200px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">نفس النتيجة</div></div>
```



### 3) اسم بدون نوع
مش بيشتغل.

```html
<style>
  .w { container: card; width:240px; max-width:100%; border:2px dashed #bda27a; padding:6px; }
  .t { background:#e4c490; color:#3d2c18; padding:8px; border-radius:8px; }
  @container card (min-width: 100px) { .t { background:#bcd4a8; } }
</style>
<div class="w"><div class="t">لسه بنفس اللون: النوع مش محدد</div></div>
```



## mistakes

### اسم من غير نوع

```css bad
.w { container: card; }  /* normal = مش حاوية */
```

```css good
.w { container: card / inline-size; }
```

حدد النوع.

## quiz

### الفاصل بين الاسم والنوع؟
- [x] /
- [ ] ،
- [ ] :
- [ ] -

شرطة مائلة.

### container: card فقط بتعمل؟
- [x] حاوية بدون نوع (مش فعّالة)
- [ ] حاوية كاملة
- [ ] خطأ
- [ ] إخفاء

النوع normal.

## refs

- [MDN: container](https://developer.mozilla.org/en-US/docs/Web/CSS/container)
