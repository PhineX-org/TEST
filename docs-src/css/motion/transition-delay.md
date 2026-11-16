---
id: transition-delay
kind: property
cat: motion
chip: transition-delay
title: تأخير الانتقال
en: CSS transition-delay property
status: stable
support: all
size: compact
mdn: transition-delay
summary: transition-delay بتأخر بداية الانتقال لحد ما الوقت المحدد يعدي. مفيدة لتتابع الحركات (stagger).
keywords: transition-delay, تأخير, delay, stagger, تتابع
related: transition, transition-duration, animation-delay
---

## intro

الخاصية `transition-delay` بتحدد **كام وقت الانتقال يستنى قبل ما يبدأ** بعد حصول التغيير. القيمة الافتراضية `0s` يعني يبدأ فوراً. مفيدة لـ**تتابع الحركات (Stagger)**: عناصر كتير تظهر واحد ورا التاني بتأخير مختلف (`.1s` و`.2s` و`.3s`). كمان بتفيد لإعطاء المستخدم **فرصة** قبل ما قايمة تتقفل (تأخير بسيط عند الخروج يمنع الإغلاق بالغلط). ولو كتبت قيمة **سالبة** الحركة بتبدأ وكأنها اشتغلت من قبل كده. جزء من [[transition]].

## try

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:4px; background:#c9772f; border-radius:6px; transition:transform .4s; }
  .w:hover .b { transform:translateY(-18px); }
</style>
<div class="w"><span class="b" style="transition-delay:0s"></span><span class="b" style="transition-delay:.1s"></span><span class="b" style="transition-delay:.2s"></span><span class="b" style="transition-delay:.3s"></span></div>
```

## syntax

```css nolive
transition-delay: 0s;
transition-delay: 200ms;
transition-delay: .1s, .3s;
```

- **القيمة المبدئية**: `0s`.
- القيمة السالبة تبدأ من النص.

## values

### `<time>`
التأخير.

### 0s
يبدأ فوراً (الافتراضي).

## use

- تتابع عناصر.
- منع إغلاق القوايم بالغلط.

## avoid

- تأخير طويل يحسس إن الواجهة بطيئة.

## examples

### 1) تتابع
تأخير مختلف لكل عنصر.

```html
<style>
  .b { display:inline-block; width:34px; height:34px; margin:4px; background:#3d7a5a; border-radius:6px; transition:transform .4s; }
  .w:hover .b { transform:translateY(-18px); }
</style>
<div class="w"><span class="b" style="transition-delay:0s"></span><span class="b" style="transition-delay:.12s"></span><span class="b" style="transition-delay:.24s"></span><span class="b" style="transition-delay:.36s"></span></div>
```



### 2) تأخير بسيط
قبل البداية.

```html
<style>
  .b { width:60px; height:40px; background:#c9772f; border-radius:6px; margin:10px; transition:transform .4s .5s; }
  .b:hover { transform:translateX(60px); }
</style>
<div class="b"></div>
```



### 3) تأخير عند الخروج فقط
hover داخل بدون تأخير.

```html
<style>
  .b { width:60px; height:40px; background:#7a4a1d; border-radius:6px; margin:10px; transition:transform .3s .4s; }
  .b:hover { transform:scale(1.4); transition-delay:0s; }
</style>
<div class="b"></div>
```



## mistakes

### تأخير طويل

```css bad
.b { transition:transform .3s 2s; }
```

```css good
.b { transition:transform .3s .1s; }
```

الواجهة تبان بطيئة.

## quiz

### الافتراضي؟
- [x] 0s
- [ ] 1s
- [ ] .5s
- [ ] auto

فوري.

### الاستخدام الشائع؟
- [x] تتابع الحركات
- [ ] ألوان
- [ ] حدود
- [ ] نص

stagger.

## refs

- [MDN: transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)
