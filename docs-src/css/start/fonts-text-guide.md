---
id: fonts-text-guide
kind: guide
cat: start
title: تنسيق الخطوط والنصوص
en: Fonts and text styling
status: stable
summary: كل اللي تحتاجه علشان نصوصك تبقى حلوة ومريحة للقراءة: نوع الخط، الحجم، السُمك، ارتفاع السطر، المحاذاة، والتزيين، مع أمثلة عربي.
keywords: fonts, text, خطوط, نصوص, font-family, font-size, line-height, text-align, عربي, تنسيق نص, قراءة مريحة
related: font-family, font-size, font-weight, line-height, text-align, letter-spacing, text-decoration
---

## intro

أغلب الموقع **كلام**، فلو نصوصك مش مريحة الموقع كله هيتعب القارئ. وفي CSS فيه خصائص قليلة بتعمل فرق كبير جداً.

**الخط ([[font-family]])**: بتكتب قائمة بالترتيب، والمتصفح بيستخدم أول خط موجود: `font-family: "Cairo", "Segoe UI", sans-serif`. آخر واحد دايماً **عائلة عامة** (`sans-serif` أو `serif` أو `monospace`) كاحتياطي.

**الحجم ([[font-size]])**: ابدأ بـ `1rem` (16px) للنص الأساسي. ومتنزلش عن 14px.

**السُمك ([[font-weight]])**: `400` عادي و`700` عريض (bold).

**ارتفاع السطر ([[line-height]])**: أهم خاصية للقراءة! في العربي **جرّب `1.8` أو أكتر** لأن الحروف فيها نقط وزوائد فوق وتحت. اكتبها من غير وحدة (`1.8`) علشان تتحسب نسبة لحجم الخط.

**المحاذاة ([[text-align]])**: للعربي الافتراضي يمين، وتقدر تستخدم `start` و`end` بدل `left` و`right` علشان تشتغل في أي اتجاه.

**التزيين ([[text-decoration]])**: خط تحت (`underline`) للروابط، `none` لو عايز تشيله.

> [!analogy] تنسيق النص زي ترتيب الكتاب: لو السطور مزدحمة والخط صغير هتزهق من أول صفحة. المسافات والحجم المناسب بيخلّوك تقرا ساعات من غير تعب.

> [!tip] للقراءة الطويلة: `font-size: 1.1rem` + `line-height: 1.9` + `max-width: 65ch` + لون نص غامق مش أسود صريح.

## try

```html
<style>
  p { font-size:1.2rem; line-height:1.9; color:#3d2c18; background:#efe0bd;
      padding:12px; font-family:"Cairo", sans-serif; max-width:45ch; }
</style>
<p>ده نص تجريبي بحجم وارتفاع سطر مريحين للقراءة، جرّب تغيّر القيم وشوف الفرق.</p>
```

## examples

### 1) تأثير line-height
نفس النص بارتفاعين مختلفين. الثاني أسهل في القراءة بكتير.

```html
<style>
  p { color:#3d2c18; background:#efe0bd; padding:10px; margin:6px 0; max-width:40ch; }
  .tight { line-height:1.1; } .roomy { line-height:1.9; }
</style>
<p class="tight">سطور ملزوقة في بعض بتتعب العين وبتخلّي القارئ يتوه بين السطور.</p>
<p class="roomy">سطور فيها مسافة كويسة بتخلّي القراءة أسهل وأمتع بكتير.</p>
```

- `line-height` من غير وحدة أفضل.

### 2) الوزن والأسلوب
عريض ومائل وعادي، وإزاي تتحكم فيهم.

```html
<style>
  p { color:#3d2c18; font-size:1.2rem; margin:4px 0; }
  .a { font-weight:400; } .b { font-weight:700; } .c { font-style:italic; }
</style>
<p class="a">عادي 400</p><p class="b">عريض 700</p><p class="c">مائل italic</p>
```

- العربي مفيهوش italic حقيقي في أغلب الخطوط.

### 3) محاذاة وتباعد
`text-align` و`letter-spacing`. (متستخدمش letter-spacing في العربي: بتفصل الحروف المتصلة!)

```html
<style>
  div { background:#efe0bd; color:#3d2c18; padding:8px; margin:4px 0; }
  .c { text-align:center; } .e { text-align:end; }
  .ls { letter-spacing:.2em; direction:ltr; text-align:left; }
</style>
<div class="c">وسط</div><div class="e">النهاية (end)</div>
<div class="ls">Spaced Latin</div>
```

- `letter-spacing` للإنجليزي بس.

### 4) زخرفة النص
خط تحت وفوق وفي النص، وتحويل الحروف الإنجليزي.

```html
<style>
  p { font-size:1.2rem; color:#3d2c18; margin:6px 0; }
  .u { text-decoration:underline; text-decoration-color:#b5551f; text-underline-offset:6px; }
  .s { text-decoration:line-through; color:#a63b2f; }
  .up { text-transform:uppercase; direction:ltr; }
</style>
<p class="u">تحته خط ملوّن</p><p class="s">سعر قديم</p><p class="up">uppercase</p>
```



## mistakes

### خط بدون بديل

```css bad
body { font-family:"MyFancyFont"; }
```

```css good
body { font-family:"MyFancyFont", "Cairo", sans-serif; }
```

لو الخط مش موجود المتصفح هيستخدم الافتراضي (ممكن مش حلو). حط بدائل.

### letter-spacing مع العربي

```css bad
h1 { letter-spacing:.1em; }  /* بيفصل الحروف */
```

```css good
h1 { letter-spacing:normal; }
```

الحروف العربية متصلة، فتباعد الحروف بيبوّظ شكل الكلمة.

## quiz

### أنسب line-height للعربي في الفقرات؟
- [ ] 1
- [ ] 1.2
- [x] 1.8
- [ ] 10px

العربي محتاج مسافة أكبر بسبب النقط والزوائد.

### آخر قيمة في font-family دايماً؟
- [ ] اسم خط عربي
- [x] عائلة عامة زي sans-serif
- [ ] رقم
- [ ] none

احتياطي لو الخطوط اللي قبلها مش موجودة.

### `1rem` للنص الأساسي تساوي؟
- [ ] 10px
- [x] 16px (غالباً)
- [ ] 20px
- [ ] 8px

الافتراضي في أغلب المتصفحات.

## refs

- [MDN: Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Text_styling_fundamentals)
