---
id: fn-steps
kind: function
cat: fn-misc
chip: steps()
title: حركة بخطوات منفصلة
en: CSS steps() function
status: stable
support: all
size: compact
mdn: easing-function
summary: steps(n) بتقسّم الحركة لخطوات منفصلة بدل الانسياب: مفيدة لـ sprite sheets وعدّاد وكتابة نص (typewriter).
keywords: steps, step-end, sprite, typewriter, animation-timing-function
related: fn-cubic-bezier, dt-easing, animation, at-keyframes
---

## intro

الدالة `steps(n)` هي نوع من دوال التوقيت (زي [[fn-cubic-bezier]]) لكن بدل الحركة **السلسة** بتقسّمها لـ **خطوات متقطعة** (`n` خطوة). الصيغة: `steps(<عدد>, <jump-start|jump-end|...>)` وفيه اختصارات `step-start` و`step-end`. استخدامات: **sprite sheet** (تحريك صور شخصية فريم فريم)، **تأثير الآلة الكاتبة** (typewriter: النص يظهر حرف حرف بـ `width` متحركة)، **عدّاد/ساعة** بخطوات، **مؤشر وامض**. مثال: `animation: type 2s steps(20) forwards;` يعني 20 خطوة منفصلة في ثانيتين.

## try

```html
<style>
  @keyframes tw { from { width:0; } to { width:11ch; } }
  .t { font-family:monospace; direction:ltr; width:11ch; overflow:hidden; white-space:nowrap; border-inline-end:2px solid #7a4a1d; color:#3d2c18; font-size:1.2rem; animation:tw 2.4s steps(11) infinite alternate; }
</style>
<div class="t">Hello World</div>
```

## syntax

```css nolive
animation: type 2s steps(20) forwards;
animation-timing-function: steps(4, jump-end);
animation-timing-function: step-end;
```

- عدد الخطوات.
- jump-end هو الافتراضي.

## use

- typewriter.
- sprite sheets.
- عدّادات.

## avoid

- steps لحركة المفروض تكون ناعمة.

## examples

### 1) typewriter
حرف حرف.

```html
<style>
  @keyframes tw { from { width:0; } to { width:11ch; } }
  .t { font-family:monospace; direction:ltr; width:11ch; overflow:hidden; white-space:nowrap; border-inline-end:2px solid #7a4a1d; color:#3d2c18; font-size:1.2rem; animation:tw 2.4s steps(11) infinite alternate; }
</style>
<div class="t">Hello World</div>
```



### 2) 4 خطوات
حركة متقطعة.

```html
<style>
  @keyframes mv { to { transform:translateX(120px); } }
  .b { width:30px; height:30px; background:#c9772f; border-radius:6px; animation:mv 2s steps(4) infinite alternate; }
</style>
<div class="b"></div>
```



### 3) مؤشر وامض
step-end.

```html
<style>
  @keyframes bl { 50% { opacity:0; } }
  .c { display:inline-block; width:3px; height:1.2em; background:#7a4a1d; vertical-align:middle; animation:bl 1s step-end infinite; }
</style>
<span style="color:#3d2c18">اكتب هنا </span><span class="c"></span>
```



## mistakes

### عدد خطوات غير مطابق

```css bad
steps(5)  /* والنص 11 حرف */
```

```css good
steps(11)
```

طابق عدد الأحرف.

## quiz

### steps(n) بتعمل؟
- [x] حركة بخطوات منفصلة
- [ ] حركة ناعمة
- [ ] توقف
- [ ] عكس

متقطعة.

### typewriter محتاج؟
- [x] steps بعدد الأحرف
- [ ] ease
- [ ] linear
- [ ] bounce

خطوة لكل حرف.

## refs

- [MDN: steps()](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)
