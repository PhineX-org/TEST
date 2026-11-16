---
id: scrollbar-width
kind: property
cat: ui
chip: scrollbar-width
title: عرض شريط التمرير
en: CSS scrollbar-width property
status: stable
support: all
size: compact
mdn: scrollbar-width
summary: scrollbar-width بتتحكم في عرض شريط التمرير: auto وthin وnone (يخفيه مع بقاء التمرير).
keywords: scrollbar-width, thin, none, شريط التمرير, scrollbar
related: scrollbar-color, overflow, overscroll-behavior
---

## intro

الخاصية `scrollbar-width` بتتحكم في **عرض شريط التمرير**: **`auto`** (الافتراضي)، **`thin`** (رفيع)، **`none`** (مخفي لكن **التمرير لسه شغال** بالعجلة واللمس). بتتحط على العنصر اللي فيه `overflow` وبتشتغل في المتصفحات الحديثة بشكل قياسي (القديم كان `::-webkit-scrollbar` المتخصص). تنبيه: إخفاء الشريط بيصعّب على المستخدم يعرف إن فيه محتوى تاني للتمرير، فاستخدمه حيث الحاجة واضحة (كاروسيل). ومكمّلتها [[scrollbar-color]] لتلوين الشريط.

## try

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-width:thin; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6<br>7</div>
```

## syntax

```css nolive
scrollbar-width: auto;
scrollbar-width: thin;
scrollbar-width: none;
```

- **القيمة المبدئية**: `auto`.

## values

### auto
افتراضي.

### thin
رفيع.

### none
مخفي.

## use

- شريط أنحف.
- إخفاء في كاروسيل.

## avoid

- إخفاء بدون إشارة بديلة.

## examples

### 1) thin
أنحف.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-width:thin; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 2) none
مخفي والتمرير شغال.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-width:none; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



### 3) مع اللون
عرض ولون.

```html
<style>
  .c { width:150px; height:60px; overflow:auto; scrollbar-width:thin; scrollbar-color:#c9772f #efe0bd; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:8px; }
</style>
<div class="c">1<br>2<br>3<br>4<br>5<br>6</div>
```



## mistakes

### إخفاء بدون مؤشر

```css bad
.list { scrollbar-width:none; }  /* المستخدم مش عارف يسكرول */
```

```css good
.list { scrollbar-width:thin; }
```

أبقِ إشارة.

## quiz

### none بتعمل؟
- [x] تخفي الشريط والتمرير شغال
- [ ] تمنع التمرير
- [ ] تلوّنه
- [ ] تكبّره

مخفي فقط.

### الافتراضي؟
- [x] auto
- [ ] thin
- [ ] none
- [ ] wide

auto.

## refs

- [MDN: scrollbar-width](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width)
