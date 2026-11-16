---
id: will-change
kind: property
cat: motion
chip: will-change
title: تلميح الأداء للمتصفح
en: CSS will-change property
status: stable
support: all
size: compact
mdn: will-change
summary: will-change بتنبّه المتصفح مسبقاً إن خاصية معينة هتتغير فيحضّر نفسه. استخدمها بحذر وعلى عناصر محدودة.
keywords: will-change, أداء, GPU, transform, optimization
related: transform, transition, animation, opacity
---

## intro

الخاصية `will-change` هي **تلميح للمتصفح** إن عنصر معين **هتتغيّر فيه خاصية معينة قريباً** (`will-change: transform`) فيحضّر نفسه (يعمل له طبقة رسم مستقلة على كارت الرسوميات) فتبقى الحركة أنعم. لكن **استخدامها بحذر**: كل عنصر بـ `will-change` بياخد **ذاكرة** وبيعمل طبقة، فلو استخدمتها على الكتير هتأذي الأداء بدل ما تحسّنه. القواعد: حطها على عناصر **قليلة** هتتحرك فعلاً، وأضفها **قبل** الحركة بوقت بسيط (مثلاً على `:hover` للأب) وشيلها بعد الانتهاء، ومتكتبهاش على `*` أبداً. ومتحتاجهاش لو الحركة بسيطة أصلاً.

## try

```html
<style>
  .c { width:70px; height:50px; background:#c9772f; border-radius:8px; margin:14px; transition:transform .3s; will-change:transform; }
  .c:hover { transform:scale(1.2); }
</style>
<div class="c"></div>
```

## syntax

```css nolive
will-change: transform;
will-change: opacity, transform;
will-change: auto;
```

- **القيمة المبدئية**: `auto`.
- بحذر وعلى عناصر قليلة.

## values

### auto
بدون تلميح.

### `<property>`
الخاصية المتوقع تغيّرها.

## use

- عناصر هتتحرك كتير.
- تحسين حركات تقيلة.

## avoid

- will-change على كل العناصر.
- تركها دايماً على العنصر.

## examples

### 1) transform
تحضير للحركة.

```html
<style>
  .c { width:70px; height:44px; background:#3d7a5a; border-radius:8px; margin:14px; will-change:transform; transition:transform .3s; }
  .c:hover { transform:translateY(-8px); }
</style>
<div class="c"></div>
```



### 2) على hover الأب
إضافة قبل الحركة.

```html
<style>
  .w:hover .c { will-change:transform; }
  .c { width:70px; height:44px; background:#7a4a1d; border-radius:8px; margin:14px; transition:transform .3s; }
  .c:hover { transform:scale(1.15); }
</style>
<div class="w"><div class="c"></div></div>
```



### 3) ضرر الإفراط
مثال لما لا نفعله.

```html
<style>
  /* لا تفعل: * { will-change:transform; } */
  .c { width:70px; height:44px; background:#c9772f; border-radius:8px; margin:14px; }
</style>
<div class="c"></div>
```



## mistakes

### على كل العناصر

```css bad
* { will-change:transform; }
```

```css good
.card:hover { will-change:transform; }
```

يستهلك ذاكرة.

## quiz

### will-change بتعمل؟
- [x] تلميح للمتصفح للتحضير
- [ ] تحرّك العنصر
- [ ] تلوّن
- [ ] تخفي

تحسين مسبق.

### خطأ شائع؟
- [x] استخدامها على عناصر كتير
- [ ] استخدامها على عنصر
- [ ] استخدامها مع transform
- [ ] كتابتها

تأذي الأداء.

## refs

- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
