---
id: animation-delay
kind: property
cat: motion
chip: animation-delay
title: تأخير الأنيميشن
en: CSS animation-delay property
status: stable
support: all
size: compact
mdn: animation-delay
summary: animation-delay بتحدد كام وقت يستنى الأنيميشن قبل ما تبدأ. القيم السالبة بتبدأ من منتصف الحركة، وبتفيد في التتابع.
keywords: animation-delay, تأخير, stagger, delay, سالب
related: animation, animation-duration, transition-delay
---

## intro

الخاصية `animation-delay` بتحدد **الوقت اللي الأنيميشن تستنى قبل ما تبدأ**. الافتراضي `0s`. استخداماتها: **تتابع (stagger)** عناصر كتير بتظهر بتأخير متصاعد، وتأخير حركة لحد ما تخلص حركة تانية. والمميز في الأنيميشن إن **القيمة السالبة** بتخلّي الحركة تبدأ **كأنها اشتغلت من زمان**: `animation-delay: -1s` يعني ابدأ من الثانية الأولى جوه الدورة؛ ده بيفيد لعمل نقاط تحميل (dots) متزامنة لكن بمراحل مختلفة. جزء من [[animation]].

## try

```html
<style>
  @keyframes b { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
  .d { display:inline-block; width:16px; height:16px; margin:10px 4px; background:#c9772f; border-radius:50%; animation:b .9s ease-in-out infinite; }
</style>
<div><span class="d" style="animation-delay:0s"></span><span class="d" style="animation-delay:.15s"></span><span class="d" style="animation-delay:.3s"></span></div>
```

## syntax

```css nolive
animation-delay: 0s;
animation-delay: 500ms;
animation-delay: -1s;
```

- **القيمة المبدئية**: `0s`.
- السالب يبدأ من النص.

## values

### `<time>`
التأخير (موجب أو سالب).

### 0s
يبدأ فوراً (الافتراضي).

## use

- نقاط تحميل متتابعة.
- ظهور عناصر بتتابع.

## avoid

- تأخير طويل يخلي الصفحة تبان فاضية.

## examples

### 1) نقاط
ثلاث نقاط بتأخير.

```html
<style>
  @keyframes b { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
  .d { display:inline-block; width:16px; height:16px; margin:10px 4px; background:#3d7a5a; border-radius:50%; animation:b .9s ease-in-out infinite; }
</style>
<div><span class="d"></span><span class="d" style="animation-delay:.15s"></span><span class="d" style="animation-delay:.3s"></span></div>
```



### 2) ظهور متتابع
لكل بطاقة تأخير.

```html
<style>
  @keyframes up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
  .c { display:inline-block; width:50px; height:40px; margin:4px; background:#c9772f; border-radius:6px; animation:up .5s ease-out both; }
</style>
<div><span class="c" style="animation-delay:0s"></span><span class="c" style="animation-delay:.2s"></span><span class="c" style="animation-delay:.4s"></span></div>
```



### 3) تأخير سالب
يبدأ من منتصف الدورة.

```html
<style>
  @keyframes mv { to { transform:translateX(100px); } }
  .b { width:30px; height:18px; margin:6px; background:#7a4a1d; border-radius:5px; animation:mv 2s linear infinite alternate; }
</style>
<div class="b"></div><div class="b" style="animation-delay:-1s"></div>
```



## mistakes

### تأخير بدون fill-mode

```css bad
.a { animation:up .5s 1s; }  /* العنصر ظاهر قبل الحركة */
```

```css good
.a { animation:up .5s 1s both; }
```

both بتخفيه لحد البداية.

## quiz

### delay سالب معناه؟
- [x] يبدأ من وسط الدورة
- [ ] يتوقف
- [ ] يتكرر
- [ ] خطأ

كأنه اشتغل من قبل.

### الافتراضي؟
- [x] 0s
- [ ] 1s
- [ ] -1s
- [ ] auto

فوراً.

## refs

- [MDN: animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)
