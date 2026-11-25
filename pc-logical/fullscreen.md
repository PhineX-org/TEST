---
id: fullscreen
kind: pseudoclass
cat: pc-logical
chip: :fullscreen
title: وضع ملء الشاشة
en: CSS :fullscreen pseudo-class
status: stable
support: all
size: compact
mdn: :fullscreen
summary: الحالة fullscreen بتنطبق على العنصر لما يدخل وضع ملء الشاشة بواجهة Fullscreen API. لتخصيص مشغلات الفيديو.
keywords: :fullscreen, fullscreen, ملء الشاشة, video, requestFullscreen
related: modal, backdrop, popover-open
---

## intro

`:fullscreen` بتنطبق على **العنصر اللي دخل وضع ملء الشاشة** (عن طريق JavaScript: `element.requestFullscreen()`، أو زرار ملء الشاشة في مشغل الفيديو). بتفيد لتخصيص شكل العنصر وهو بياخد الشاشة كلها: خلفية سوداء، إخفاء حدود، تغيير حجم. والـ `::backdrop` بيتحكم في اللي ورا العنصر. للتوافق مع المتصفحات القديمة أحياناً محتاج `:-webkit-full-screen`. وعادةً بتشوف الوضع ده في مشغلات الفيديو والعروض التقديمية والألعاب، ويقدر المستخدم يخرج منه بزرار Esc في أي وقت.

## try

```html
<style>
  .v { background:#efe0bd; padding:10px; color:#3d2c18; border-radius:8px; }
  .v:fullscreen { background:#3d2c18; color:#f3ede0; padding:40px; }
</style>
<div class="v" id="fs">اضغط الزرار<br><button onclick="document.getElementById('fs').requestFullscreen&&document.getElementById('fs').requestFullscreen()">ملء الشاشة</button></div>
```

## syntax

```css nolive
.player:fullscreen { background: #000; }
.player:fullscreen video { width: 100%; height: 100%; }
```

- بتحتاج Fullscreen API.
- للقديم :-webkit-full-screen.

## use

- تخصيص مشغل فيديو.
- عرض عروض تقديمية.

## avoid

- نسيان prefix للمتصفحات القديمة.

## examples

### 1) تغيير الخلفية
لما يدخل الوضع.

```html
<style>
  .v { background:#efe0bd; padding:10px; color:#3d2c18; border-radius:8px; }
  .v:fullscreen { background:#3d2c18; color:#f3ede0; }
</style>
<div class="v" id="a1">عنصر<br><button onclick="a1.requestFullscreen&&a1.requestFullscreen()">كبّر</button></div>
```



### 2) زرار يظهر فقط
في ملء الشاشة.

```html
<style>
  .x { display:none; }
  .v:fullscreen .x { display:block; }
  .v { background:#efe0bd; padding:10px; color:#3d2c18; }
</style>
<div class="v" id="a2">محتوى<div class="x">زرار خروج</div><button onclick="a2.requestFullscreen&&a2.requestFullscreen()">كبّر</button></div>
```



### 3) تكبير الخط
داخل ملء الشاشة.

```html
<style>
  .v { font-size:1rem; padding:10px; background:#efe0bd; color:#3d2c18; }
  .v:fullscreen { font-size:2.5rem; }
</style>
<div class="v" id="a3">نص<br><button onclick="a3.requestFullscreen&&a3.requestFullscreen()">كبّر</button></div>
```



## mistakes

### بدون prefix

```css bad
.v:fullscreen { }
```

```css good
.v:-webkit-full-screen { }
.v:fullscreen { }
```

للمتصفحات القديمة.

## quiz

### fullscreen بتنطبق إمتى؟
- [x] لما يدخل ملء الشاشة
- [ ] عند hover
- [ ] عند focus
- [ ] دايماً

وضع ملء الشاشة.

### بتحتاج؟
- [x] Fullscreen API
- [ ] Geolocation
- [ ] WebGL
- [ ] Canvas

API.

## refs

- [MDN: :fullscreen](https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen)
