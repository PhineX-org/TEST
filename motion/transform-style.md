---
id: transform-style
kind: property
cat: motion
chip: transform-style
title: أسلوب التحويل ثلاثي الأبعاد
en: CSS transform-style property
status: stable
support: all
size: compact
mdn: transform-style
summary: transform-style بتحدد هل أبناء العنصر بيعيشوا في نفس الفضاء ثلاثي الأبعاد (preserve-3d) أو يتسطّحوا (flat).
keywords: transform-style, preserve-3d, 3D, flat, مكعب
related: perspective, transform, backface-visibility
---

## intro

الخاصية `transform-style` بتحدد **هل أبناء العنصر هيبقوا في فضاء ثلاثي الأبعاد مشترك** (`preserve-3d`) **ولا هيتسطّحوا على مستوى العنصر الأب** (`flat`، الافتراضي). لازم تحطها على **الأب** لما تعمل مجسّمات 3D زي **مكعب** له 6 أوجه: كل وجه ابن بـ `transform` خاص (`rotateY` و`translateZ`)، والأب بـ `transform-style: preserve-3d` عشان الأوجه تتحرك مع بعض في المساحة. من غيرها الأوجه بتتسطّح وتتخرب الصورة. وغالباً بتستخدم مع [[perspective]].

## try

```html
<style>
  .s { width:80px; height:80px; perspective:300px; margin:20px auto; }
  .cube { position:relative; width:100%; height:100%; transform-style:preserve-3d; transform:rotateX(-20deg) rotateY(35deg); }
  .f { position:absolute; inset:0; border:2px solid #7a4a1d; background:rgba(201,119,47,.8); display:flex; align-items:center; justify-content:center; color:#f3ede0; font-weight:bold; }
  .f1 { transform:translateZ(40px); } .f2 { transform:rotateY(90deg) translateZ(40px); background:rgba(61,122,90,.8); } .f3 { transform:rotateX(90deg) translateZ(40px); background:rgba(122,74,29,.8); }
</style>
<div class="s"><div class="cube"><div class="f f1">1</div><div class="f f2">2</div><div class="f f3">3</div></div></div>
```

## syntax

```css nolive
transform-style: flat;
transform-style: preserve-3d;
```

- **القيمة المبدئية**: `flat`.
- تتحط على الأب.

## values

### flat
الأبناء مسطّحين (الافتراضي).

### preserve-3d
الأبناء في فضاء 3D.

## use

- مكعبات ومجسّمات 3D.
- كروت تنقلب بوجهين.

## avoid

- نسيان preserve-3d على الأب.

## examples

### 1) مكعب
ثلاث أوجه.

```html
<style>
  .s { width:70px; height:70px; perspective:260px; margin:20px auto; }
  .cube { position:relative; width:100%; height:100%; transform-style:preserve-3d; transform:rotateX(-25deg) rotateY(40deg); }
  .f { position:absolute; inset:0; border:2px solid #7a4a1d; display:flex; align-items:center; justify-content:center; color:#f3ede0; font-weight:bold; }
  .f1 { transform:translateZ(35px); background:rgba(201,119,47,.85); } .f2 { transform:rotateY(90deg) translateZ(35px); background:rgba(61,122,90,.85); } .f3 { transform:rotateX(90deg) translateZ(35px); background:rgba(122,74,29,.85); }
</style>
<div class="s"><div class="cube"><div class="f f1">أ</div><div class="f f2">ب</div><div class="f f3">ج</div></div></div>
```



### 2) بدون preserve-3d
الأوجه تتسطّح.

```html
<style>
  .s { width:70px; height:70px; perspective:260px; margin:20px auto; }
  .cube { position:relative; width:100%; height:100%; transform:rotateX(-25deg) rotateY(40deg); }
  .f { position:absolute; inset:0; border:2px solid #7a4a1d; display:flex; align-items:center; justify-content:center; color:#f3ede0; font-weight:bold; }
  .f1 { transform:translateZ(35px); background:rgba(201,119,47,.85); } .f2 { transform:rotateY(90deg) translateZ(35px); background:rgba(61,122,90,.85); }
</style>
<div class="s"><div class="cube"><div class="f f1">أ</div><div class="f f2">ب</div></div></div>
```



### 3) كارت بوجهين
انقلاب عند hover.

```html
<style>
  .s { width:110px; height:60px; perspective:400px; margin:10px auto; }
  .c { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .6s; }
  .s:hover .c { transform:rotateY(180deg); }
  .f, .b { position:absolute; inset:0; backface-visibility:hidden; display:flex; align-items:center; justify-content:center; border-radius:8px; font-weight:bold; color:#f3ede0; }
  .f { background:#c9772f; } .b { background:#3d7a5a; transform:rotateY(180deg); }
</style>
<div class="s"><div class="c"><div class="f">الوجه</div><div class="b">الخلف</div></div></div>
```



## mistakes

### نسيان preserve-3d

```css bad
.cube { }  /* الأوجه تتسطّح */
```

```css good
.cube { transform-style:preserve-3d; }
```

على الأب.

## quiz

### preserve-3d بتخلّي؟
- [x] الأبناء في فضاء 3D
- [ ] الأبناء مسطّحين
- [ ] العنصر يختفي
- [ ] لا شيء

3D.

### بتتحط على؟
- [x] الأب
- [ ] الابن
- [ ] body فقط
- [ ] img

الأب.

## refs

- [MDN: transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
