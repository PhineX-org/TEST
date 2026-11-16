---
id: at-starting-style
kind: atrule
cat: at-rules
chip: @starting-style
title: قاعدة @starting-style: نقطة بداية الانتقال
en: CSS @starting-style at-rule
status: stable
support: all
size: compact
mdn: @starting-style
summary: قاعدة @starting-style بتعرّف ستايل بداية لعنصر لسه ظاهر جديد، فتعمل transition دخول (fade-in) بدون JavaScript.
keywords: @starting-style, transition, دخول, fade in, display none, popover, dialog
related: transition, animation, at-keyframes, display
---

## intro

مشكلة قديمة: لما تضيف عنصر جديد للصفحة (أو تظهره من `display: none`) مفيش «حالة سابقة» يتحرّك منها، فالـ `transition` مبيشتغلش وبيظهر فجأة. القاعدة `@starting-style` بتحل ده: بتقول للمتصفح **«ابدأ الانتقال من الستايل ده»** في **أول لحظة** العنصر بيتعرض فيها.

مثال: `.card { opacity: 1; transition: opacity .5s; } @starting-style { .card { opacity: 0; } }` يعني: أول ما الـ card تظهر، تبدأ من شفافية 0 وتتحول لـ 1 بنعومة (fade-in). ومن غير أي JavaScript! وشغّالة مع العناصر المُضافة بالـ DOM، و`popover` و`<dialog>`، وعناصر `display` اللي بتتحول من `none`.

للخروج (exit)، لازم تضيف `transition-behavior: allow-discrete` عشان `display` و`overlay` يتحركوا. وتذكّر `@starting-style` بتحدد **البداية** والـ transition العادي هو اللي بيحرّك.

## try

```html
<style>
  .n { padding:10px; margin:4px 0; border-radius:8px; background:#bcd4a8; color:#3d2c18; opacity:1; transform:none; transition:opacity .6s, transform .6s; }
  @starting-style { .n { opacity:0; transform:translateY(12px); } }
  button { padding:6px 14px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<button onclick="var d=document.createElement('div');d.className='n';d.textContent='عنصر جديد دخل بنعومة';document.getElementById('box').appendChild(d)">أضف عنصر</button><div id="box"></div>
```

## syntax

```css nolive
.card {
  opacity: 1;
  transition: opacity .5s;
}
@starting-style {
  .card { opacity: 0; }
}
```

- بتحدد البداية فقط.
- محتاجة transition عادي.
- للخروج: allow-discrete.

## use

- fade-in لعناصر جديدة.
- انتقال ظهور popover وdialog.

## avoid

- نسيان الـ transition الأساسي.
- توقع إنها تحرّك الخروج بنفسها.

## examples

### 1) إضافة عنصر
يدخل بنعومة.

```html
<style>
  .n { padding:10px; margin:4px 0; border-radius:8px; background:#bcd4a8; color:#3d2c18; opacity:1; transition:opacity .6s; }
  @starting-style { .n { opacity:0; } }
  button { padding:6px 14px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<button onclick="var d=document.createElement('div');d.className='n';d.textContent='أنا جديد';document.getElementById('b').appendChild(d)">أضف</button><div id="b"></div>
```



### 2) إظهار وإخفاء
من display:none.

```html
<style>
  .p { display:block; padding:10px; margin:6px 0; border-radius:8px; background:#e4c490; color:#3d2c18; opacity:1; transition:opacity .5s, display .5s allow-discrete; }
  .p.off { display:none; opacity:0; }
  @starting-style { .p { opacity:0; } }
  button { padding:6px 14px; border:0; border-radius:8px; background:#7a4a1d; color:#f3ede0; font-weight:bold; }
</style>
<button onclick="document.getElementById('q').classList.toggle('off')">إظهار / إخفاء</button><div id="q" class="p">لوحة بتظهر وتختفي بنعومة</div>
```



### 3) بدون starting-style
بيظهر فجأة.

```html
<style>
  .n { padding:10px; margin:4px 0; border-radius:8px; background:#e4c490; color:#3d2c18; opacity:1; transition:opacity .6s; }
  button { padding:6px 14px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<button onclick="var d=document.createElement('div');d.className='n';d.textContent='بيظهر فجأة';document.getElementById('c').appendChild(d)">أضف</button><div id="c"></div>
```



## mistakes

### نسيان transition

```css bad
@starting-style { .a { opacity:0; } }  /* مفيش transition */
```

```css good
.a { transition:opacity .5s; }
```

لازم transition.

## quiz

### @starting-style بتعمل؟
- [x] تحدد ستايل البداية لأول عرض
- [ ] توقف الأنيميشن
- [ ] تلوّن
- [ ] تخفي

نقطة بداية.

### بتحل مشكلة؟
- [x] transition لعنصر جديد
- [ ] حجم الخط
- [ ] اللون
- [ ] الترتيب

مفيش حالة سابقة.

## refs

- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
