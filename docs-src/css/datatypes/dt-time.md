---
id: dt-time
kind: datatype
cat: datatypes
chip: <time>
title: الأزمنة
en: CSS <time> data type
status: stable
support: all
size: compact
mdn: time
summary: نوع time هو مدة زمنية بوحدة s (ثواني) أو ms (ملي ثانية): transition: .3s وanimation-duration: 800ms.
keywords: time, s, ms, transition-duration, animation-delay, مدة
related: transition, animation, fn-cubic-bezier
---

## intro

النوع `<time>` هو **مدة زمنية** بوحدة: **`s`** (ثواني) أو **`ms`** (ملي ثانية). بيستخدم في [[transition]] و[[animation]] (`duration` و`delay`) وغيرهم. `0.3s` تساوي `300ms`. الأرقام العشرية مسموحة (`.5s` أو `0.5s`) وكمان **السالب** في `delay` (يبدأ الأنيميشن كأنه اشتغل من قبل). **الصفر لازم وحدة**: `0s` (مش `0`) في خاصيات الوقت. أزمنة مريحة: انتقالات الواجهة **150–300ms**؛ أقل من كده بيبان فجائي، وأكتر بيبان بطيء.

## try

```html
<style>
  .b { padding:8px 16px; border-radius:8px; border:0; background:#c9772f; color:#f3ede0; font-weight:bold; margin:4px; }
  .f { transition:transform .15s; } .m { transition:transform .6s; } .f:hover, .m:hover { transform:translateX(30px); }
</style>
<button class="b f">150ms</button><button class="b m">600ms</button>
```

## syntax

```css nolive
transition: transform .3s;
animation-duration: 800ms;
animation-delay: -1s;   /* يبدأ كأنه اشتغل من ثانية */
```

- `1s` = `1000ms`.
- الصفر `0s` بوحدة.

## use

- انتقالات 150–300ms.
- delays لتتابع الأنيميشن.

## avoid

- أزمنة طويلة جداً في الواجهة.
- `0` بدون وحدة.

## examples

### 1) سريع وبطيء
150 و600.

```html
<style>
  .b { padding:8px 16px; border-radius:8px; border:0; background:#c9772f; color:#f3ede0; font-weight:bold; margin:4px; }
  .f { transition:transform .15s; } .m { transition:transform .6s; } .f:hover, .m:hover { transform:translateX(30px); }
</style>
<button class="b f">150ms</button><button class="b m">600ms</button>
```



### 2) delay
تأخير.

```html
<style>
  .b { padding:8px 16px; border-radius:8px; border:0; background:#3d7a5a; color:#f3ede0; font-weight:bold; margin:4px; transition:transform .3s .4s; }
  .b:hover { transform:translateY(-8px); }
</style>
<button class="b">تأخير 400ms</button>
```



### 3) delay سالب
يبدأ في النص.

```html
<style>
  @keyframes mv { from { transform:translateX(0); } to { transform:translateX(120px); } }
  .b { width:26px; height:26px; background:#c9772f; border-radius:6px; margin:4px 0; animation:mv 2s linear infinite alternate; }
</style>
<div class="b"></div><div class="b" style="animation-delay:-1s"></div>
```



## mistakes

### صفر بدون وحدة

```css bad
transition-duration:0;  /* غير صالح */
```

```css good
transition-duration:0s;
```

وحدة إجبارية.

## quiz

### 1s = ؟
- [x] 1000ms
- [ ] 100ms
- [ ] 10ms
- [ ] 1ms

ألف.

### الصفر في الوقت؟
- [x] 0s
- [ ] 0
- [ ] zero
- [ ] none

بوحدة.

## refs

- [MDN: `<time>`](https://developer.mozilla.org/en-US/docs/Web/CSS/time)
