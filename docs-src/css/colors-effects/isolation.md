---
id: isolation
kind: property
cat: colors-effects
chip: isolation
title: عزل سياق التراص
en: CSS isolation property
status: stable
support: all
size: compact
mdn: isolation
summary: isolation:isolate بتنشئ stacking context جديد، فتحصر المزج وz-index جوه العنصر ومتأثرش على اللي بره.
keywords: isolation, isolate, stacking context, z-index, mix-blend-mode, عزل
related: z-index, mix-blend-mode, position, opacity
---

## intro

الخاصية `isolation` بقيمتها `isolate` بتنشئ **سياق تراص (stacking context)** جديد للعنصر من غير ما تحتاج `z-index` أو `position`. فايدتها: **تحصر** تأثير [[mix-blend-mode]] وترتيب [[z-index]] **جوه العنصر**، فمتتسربش للعناصر اللي بره.

مثال شائع: كارت فيه عنصر بـ `mix-blend-mode: multiply`؛ لو مش معزول هيتمازج مع خلفية الصفحة كلها، ولو حطيت `isolation: isolate` على الكارت المزج يفضل جواه. وكمان بتحل مشاكل z-index «العناصر اللي بتطلع فوق الـ header بالغلط».

القيم: `auto` (الافتراضي) و`isolate`.

## try

```html
<style>
  .bg { background:linear-gradient(90deg,#c9772f,#3d7a5a); padding:12px; border-radius:8px; }
  .card { isolation:isolate; background:#efe0bd; padding:10px; }
  .m { background:#b5551f; color:#f3ede0; padding:8px; mix-blend-mode:multiply; }
</style>
<div class="bg"><div class="card"><div class="m">المزج جوه الكارت</div></div></div>
```

## syntax

```css nolive
isolation: auto;
isolation: isolate;
```

- **القيمة المبدئية**: `auto`.

## values

### auto
لا ينشئ سياق (الافتراضي).

### isolate
ينشئ stacking context جديد.

## use

- حصر mix-blend-mode.
- حل مشاكل z-index.
- مكونات مستقلة (cards).

## avoid

- الإفراط بدون سبب.

## examples

### 1) معزول
المزج جوه الصندوق.

```html
<style>
  .bg { background:#3d7a5a; padding:10px; }
  .card { isolation:isolate; background:#efe0bd; padding:10px; }
  .m { background:#c9772f; padding:8px; color:#2f2820; mix-blend-mode:multiply; }
</style>
<div class="bg"><div class="card"><div class="m">isolate</div></div></div>
```



### 2) غير معزول
المزج بيتسرب.

```html
<style>
  .bg { background:#3d7a5a; padding:10px; }
  .card { background:#efe0bd; padding:10px; }
  .m { background:#c9772f; padding:8px; color:#2f2820; mix-blend-mode:multiply; }
</style>
<div class="bg"><div class="card"><div class="m">auto</div></div></div>
```



### 3) z-index جوه الكارت
ترتيب محصور.

```html
<style>
  .card { isolation:isolate; position:relative; height:70px; background:#efe0bd; }
  .a, .b { position:absolute; width:60px; height:44px; color:#f3ede0; padding:4px; }
  .a { background:#7a4a1d; left:10px; top:10px; z-index:2; }
  .b { background:#3d7a5a; left:40px; top:20px; z-index:1; }
</style>
<div class="card"><div class="a">A</div><div class="b">B</div></div>
```



## mistakes

### z-index متسرب

```css bad
.badge { z-index:9999; }
```

```css good
.card { isolation:isolate; }
.badge { z-index:1; }
```

حصر الترتيب جوه الكارت.

## quiz

### isolate بتنشئ؟
- [x] stacking context
- [ ] مزج
- [ ] حد
- [ ] ظل

سياق تراص.

### الافتراضي؟
- [ ] isolate
- [x] auto
- [ ] none
- [ ] block

auto.

## refs

- [MDN: isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation)
