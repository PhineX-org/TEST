---
id: fn-hsl
kind: function
cat: fn-color
chip: hsl()
title: دالة hsl(): درجة وتشبّع وإضاءة
en: CSS hsl() function
status: stable
support: all
mdn: color_value/hsl
summary: hsl() بتكوّن لون من الدرجة (0-360) والتشبّع % والإضاءة %. أسهل دالة لعمل درجات وثيمات.
keywords: hsl, hsla, hue, saturation, lightness, درجة اللون, ثيم
related: fn-rgb, fn-hwb, fn-oklch, colors-guide, fn-color-mix
---

## intro

الدالة `hsl()` أسهل دالة ألوان **للتفكير البشري**. بتوصف اللون بـ 3 أرقام: **H** (Hue = درجة اللون) من **0 لـ 360** على عجلة الألوان (0 أحمر، 30 برتقالي، 60 أصفر، 120 أخضر، 200 أزرق، 300 بنفسجي)، و**S** (Saturation = التشبّع) من 0% (رمادي) لـ 100% (لون صافي)، و**L** (Lightness = الإضاءة) من 0% (أسود) لـ 100% (أبيض)، و50% هو اللون الطبيعي.

مثال: `hsl(30 60% 50%)` برتقالي. و**السحر**: عشان تعمل **درجات من نفس اللون** غيّر **L** بس: `hsl(30 60% 30%)` أغمق، `hsl(30 60% 80%)` أفتح. وده بيخلّيها الأنسب لـ **الثيمات** مع متغيرات CSS: `--h: 30; color: hsl(var(--h) 60% 40%)`.

الشفافية بعد `/`: `hsl(30 60% 50% / 0.5)`. والصيغة بفواصل (`hsl(30, 60%, 50%)`) لسه تشتغل. لمطابقة العين الأدق استخدم [[fn-oklch]]، لكن `hsl` كفاية لمعظم الشغل.

## try

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hsl(30 60% 30%);color:#f3ede0">L 30</span><span class="s" style="background:hsl(30 60% 50%)">L 50</span><span class="s" style="background:hsl(30 60% 70%)">L 70</span><span class="s" style="background:hsl(30 60% 85%)">L 85</span>
```

## syntax

```css nolive
color: hsl(30 60% 50%);
color: hsl(30 60% 50% / 0.5);
color: hsl(var(--h) 60% 40%);
```

- H من 0-360 (درجة).
- S وL نسب مئوية.
- غيّر L للدرجات.

## use

- درجات من لون واحد.
- ثيمات بمتغيرات.
- تعديل فاتح/غامق سهل.

## avoid

- افتراض إن الإضاءة المتساوية = سطوع متساوي إدراكياً (استخدم oklch).
- ألوان نص وخلفية بإضاءة قريبة (تباين ضعيف).

## examples

### 1) درجات من لون
غيّر L.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hsl(30 60% 30%);color:#f3ede0">30</span><span class="s" style="background:hsl(30 60% 50%)">50</span><span class="s" style="background:hsl(30 60% 70%)">70</span><span class="s" style="background:hsl(30 60% 85%)">85</span>
```



### 2) عجلة الألوان
H مختلف.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hsl(0 50% 60%)">0</span><span class="s" style="background:hsl(30 50% 60%)">30</span><span class="s" style="background:hsl(60 50% 60%)">60</span><span class="s" style="background:hsl(120 40% 60%)">120</span><span class="s" style="background:hsl(200 40% 60%)">200</span>
```



### 3) تشبّع
S من 0 لـ 100.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:hsl(30 0% 60%)">0</span><span class="s" style="background:hsl(30 40% 60%)">40</span><span class="s" style="background:hsl(30 80% 60%)">80</span>
```



### 4) بمتغير
ثيم بسطر واحد.

```html
<style>
  .s { display:inline-block; width:64px; height:44px; border-radius:8px; margin:3px; color:#3d2c18; font-size:.7rem; text-align:center; line-height:44px; border:1px solid rgba(61,44,24,.25); }
</style>
<style>.t { --h:30; } .t2 { --h:140; } .s2 { background:hsl(var(--h) 45% 55%); }</style>
<span class="t"><span class="s s2">h30</span></span><span class="t2"><span class="s s2">h140</span></span>
```



## mistakes

### نسيان %

```css bad
color:hsl(30 60 50);  /* غلط */
```

```css good
color:hsl(30 60% 50%);
```

S وL لازم نسب.

### تعديل درجات بـ rgb

```css bad
/* تحاول تفتّح rgb بالتخمين */
```

```css good
hsl(30 60% 70%)
```

L أسهل.

## quiz

### H معناها؟
- [x] درجة اللون
- [ ] تشبّع
- [ ] إضاءة
- [ ] شفافية

Hue.

### عشان تعمل لون أفتح؟
- [x] زوّد L
- [ ] زوّد H
- [ ] قلل S
- [ ] غيّر الصيغة

الإضاءة.

### مدى H؟
- [x] 0-360
- [ ] 0-255
- [ ] 0-100
- [ ] 0-1

عجلة.

## refs

- [MDN: hsl()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)
