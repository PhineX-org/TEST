---
id: background
kind: property
cat: borders-bg
chip: background
title: اختصار الخلفية
en: CSS background property
status: stable
support: all
mdn: background
summary: background اختصار بيجمع لون وصورة وتكرار وموضع وحجم ومرفق وأصل وقص الخلفية. أكتر خاصية بتتكرر في أي ستايل.
keywords: background, خلفية, background-color, background-image, background-size, shorthand, اختصار, تدرج, صورة خلفية
related: background-color, background-image, background-size, background-repeat, background-position, fn-linear-gradient
---

## intro

الخاصية `background` هي **اختصار** بيجمع كل خصائص الخلفية في سطر واحد: [[background-color]] و[[background-image]] و[[background-repeat]] و[[background-position]] و[[background-size]] و[[background-attachment]] و[[background-origin]] و[[background-clip]].

أمثلة: `background: #efe0bd` (لون بس)، `background: url(a.png) no-repeat center / cover` (صورة بدون تكرار في النص وتغطي)، و`background: linear-gradient(...)` (تدرج).

نقطتين مهمين:
1. **الاختصار بيصفّر** أي خاصية فرعية مش مكتوبة. يعني لو كنت حاطط `background-size: cover` وبعدين كتبت `background: url(x.png)`، الـ `cover` هتتلغي. لذلك لو بتعدّل خاصية واحدة استخدم **المفردة** (مثلاً `background-color`).
2. **الـ `/`** بتفصل بين الموضع والحجم: `center / cover` (الموضع / الحجم).

وممكن تحط **أكتر من خلفية** (طبقات) مفصولة بفاصلة، **الأولى هي الأعلى**، واللون بيتحط في **آخر طبقة** فقط.

> [!tip] في الأمثلة هنا استخدم تدرجات (`linear-gradient`) بدل الصور علشان تشتغل من غير ملفات خارجية.

> [!analogy] `background` زي ورقة جدران: لون أساسي + رسمة + طريقة تكرارها + حجمها، كلهم في أمر واحد.

## try

```html
<style>
  .b { height:90px; border-radius:10px; padding:10px; color:#fff3e0;
       background:linear-gradient(135deg,#c9772f,#3d7a5a) center / cover no-repeat; }
</style>
<div class="b">خلفية بتدرج</div>
```

## syntax

```css nolive
background: #efe0bd;
background: linear-gradient(135deg, #c9772f, #3d7a5a);
background: url(img.png) no-repeat center / cover;
background: url(a.png), linear-gradient(#efe0bd, #e4c490);  /* طبقتين */
```

- **القيمة المبدئية**: كل خاصية فرعية بقيمتها الافتراضية.
- **بتتوارث؟** لأ.
- الاختصار بيصفّر اللي مش مكتوب.
- الأولى الأعلى، واللون في الأخيرة.

## values

### `<color>`
لون الخلفية (في آخر طبقة).

### `<image>`
صورة `url()` أو تدرج.

### `<repeat-style>`
`no-repeat` `repeat` `repeat-x`…

### `<position> / <size>`
الموضع وبعده `/` الحجم.

### `<attachment>`
`scroll` أو `fixed`.

## use

- لون خلفية سريع `background: #efe0bd`.
- تدرجات `linear-gradient`.
- صورة غلاف `cover`.
- خلفيات متعددة الطبقات.

## avoid

- الاختصار لو عايز تعدّل خاصية واحدة (بيصفّر الباقي).
- صور ثقيلة بدون ضغط.

## examples

### 1) لون بس
أبسط استخدام.

```html
<style>
  .b { background:#efe0bd; color:#3d2c18; padding:12px; border-radius:8px; }
</style>
<div class="b">لون خلفية</div>
```



### 2) تدرج
خلفية بتدرج لوني.

```html
<style>
  .b { background:linear-gradient(90deg,#7a4a1d,#c9772f); color:#f3ede0; padding:16px; border-radius:8px; }
</style>
<div class="b">تدرج أفقي</div>
```



### 3) طبقات متعددة
نقط فوق لون.

```html
<style>
  .b { padding:20px; color:#3d2c18; border-radius:8px;
       background:radial-gradient(circle,#c9772f 20%,transparent 21%) 0 0 / 20px 20px, #efe0bd; }
</style>
<div class="b">نقط على خلفية كريمية</div>
```



### 4) الاختصار بيصفّر
`background` الثانية مسحت الـ size.

```html
<style>
  .a { background-size:10px 10px; background-image:radial-gradient(#7a4a1d 30%,transparent 31%); height:50px; background-color:#efe0bd; margin-bottom:6px; }
  .b { background-size:10px 10px; background-image:radial-gradient(#7a4a1d 30%,transparent 31%); background:#e4c490; height:50px; }
</style>
<div class="a"></div><div class="b"></div>
```

- التاني اتصفّر.

## mistakes

### الاختصار بعد المفردة

```css bad
.a { background-size:cover; background:url(x.png); }  /* cover اتلغى */
```

```css good
.a { background:url(x.png) center / cover; }
```

الاختصار بيرجع الباقي للافتراضي.

### نسيان no-repeat

```css bad
.hero { background:url(a.png); }  /* بيتكرر */
```

```css good
.hero { background:url(a.png) no-repeat center / cover; }
```

الصورة الصغيرة بتتكرر افتراضياً.

## quiz

### الـ / في الاختصار بتفصل بين؟
- [ ] اللون والصورة
- [x] الموضع والحجم
- [ ] الصورة والتكرار
- [ ] لا شيء

position / size.

### الاختصار بيعمل إيه للخصائص اللي مش مكتوبة؟
- [ ] بيتجاهلها
- [x] بيصفّرها للافتراضي
- [ ] بيحتفظ بها
- [ ] بيحذفها

بيصفّرها.

### أي طبقة هي الأعلى؟
- [ ] الأخيرة
- [x] الأولى
- [ ] الوسطى
- [ ] عشوائي

الأولى.

## refs

- [MDN: background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
