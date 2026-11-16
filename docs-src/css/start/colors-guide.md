---
id: colors-guide
kind: guide
cat: start
title: الألوان في CSS
en: CSS colors guide
status: stable
summary: كل طرق كتابة اللون في CSS: الأسماء وhex وrgb وhsl وoklch، والشفافية، وإزاي تختار ألوان مريحة للعين مع أمثلة جاهزة.
keywords: colors, الوان, hex, rgb, hsl, oklch, شفافية, alpha, color, background-color, تدرج, ألوان مريحة
related: color, background-color, fn-rgb, fn-hsl, dt-color, opacity, fn-color-mix
---

## intro

اللون في CSS ممكن يتكتب بكذا طريقة، وكلها بتوصل لنفس النتيجة: **ثلاث قنوات (أحمر/أخضر/أزرق) + شفافية اختيارية**.

الطرق الشائعة:
- **الأسماء**: `tomato`، `navy`. سهلة لكن محدودة.
- **Hex**: `#b5551f` (6 أرقام)، أو `#b5551f80` مع شفافية. الأكتر انتشاراً.
- **rgb()**: `rgb(181 85 31 / 50%)` ([[fn-rgb]]).
- **hsl()**: `hsl(22 71% 41%)` ([[fn-hsl]]) وفيها **الدرجة (Hue)** و**التشبع (Saturation)** و**السطوع (Lightness)**. **الأسهل للبشر**: تغيّر السطوع بس وتطلع نسخة أفتح أو أغمق.
- **oklch()**: الأحدث والأدق إدراكياً ([[fn-oklch]]).
- **`currentColor`**: يأخد لون النص الحالي.
- **`transparent`**: شفاف تماماً.

وللشفافية، استخدم القناة الرابعة في الـ rgb/hsl بدل [[opacity]] لو عايز الخلفية بس شفافة من غير النص.

> [!tip] **للقراءة المريحة**: تجنّب الأبيض النقي `#fff` والأسود النقي `#000` مع بعض. جرّب خلفية كريمية دافئة `#f1e9d9` ونص بني غامق `#2f2820`. التباين لسه عالي، لكن العين مش بتتعب.

> [!key] نسبة التباين بين النص والخلفية لازم تبقى **4.5:1** على الأقل علشان القراءة تبقى سهلة وللوصولية.

## try

```html
<style>
  .c { padding:10px; margin:4px 0; color:#f3ede0; }
</style>
<div class="c" style="background:#b5551f">hex</div>
<div class="c" style="background:rgb(61 122 90)">rgb</div>
<div class="c" style="background:hsl(210 30% 40%)">hsl</div>
```

## syntax

```css nolive
color: red;
color: #b5551f;
color: rgb(181 85 31);
color: rgb(181 85 31 / 0.5);
color: hsl(22 71% 41%);
color: oklch(55% 0.13 45);
color: currentColor;
```

- كل الصيغ بتدّي نفس النتيجة تقريباً.
- الشرطة المائلة `/` قبل الشفافية في الصيغة الحديثة.

## examples

### 1) hsl: غيّر السطوع بس
نفس الدرجة والتشبع، والسطوع بس هو اللي بيتغيّر.

```html
<style>
  .row { display:flex; } .row div { flex:1; padding:14px 4px; text-align:center; color:#2f2820; }
</style>
<div class="row">
  <div style="background:hsl(28 50% 85%)">85%</div>
  <div style="background:hsl(28 50% 70%)">70%</div>
  <div style="background:hsl(28 50% 55%)">55%</div>
  <div style="background:hsl(28 50% 40%);color:#f3ede0">40%</div>
</div>
```

- مفيد جداً في بناء لوحة ألوان.

### 2) الشفافية (alpha)
القناة الرابعة بتخلّي الخلفية شفافة، والنص فوقها لسه واضح.

```html
<style>
  .bg { background:linear-gradient(90deg,#3d7a5a,#b5551f); padding:20px; }
  .glass { background:rgb(243 233 217 / 0.55); padding:14px; border-radius:8px; color:#2f2820; }
</style>
<div class="bg"><div class="glass">خلفية شفافة والنص واضح</div></div>
```

- `opacity` كانت هتخلّي النص باهت كمان.

### 3) currentColor
الحد بياخد نفس لون النص تلقائياً.

```html
<style>
  .t { color:#3d7a5a; border:3px solid currentColor; padding:10px; }
  .t.b { color:#b5551f; }
</style>
<div class="t">أخضر</div><br><div class="t b">بني</div>
```



### 4) ألوان القراءة المريحة
مقارنة بين الأبيض الصريح والتنسيق الدافئ.

```html
<style>
  .harsh { background:#fff; color:#000; padding:14px; }
  .warm { background:#f1e9d9; color:#2f2820; padding:14px; }
</style>
<div class="harsh">أبيض صريح وأسود (مجهد)</div>
<div class="warm">كريمي وبني غامق (مريح)</div>
```

- الأفضل للقراءة الطويلة.

## mistakes

### الاعتماد على اللون وحده

```css bad
.error { color:#a63b2f; }   /* لون بس */
```

```css good
.error { color:#a63b2f; }
.error::before { content:"⚠ "; }
```

ناس كتير مبتفرقش بين الأحمر والأخضر. ضيف أيقونة أو نص.

### تباين ضعيف

```css bad
p { color:#b8aa90; background:#efe0bd; }
```

```css good
p { color:#3d2c18; background:#efe0bd; }
```

النص الفاتح على خلفية فاتحة صعب القراءة.

## quiz

### أنهي صيغة أسهل لتغيير سطوع اللون؟
- [ ] hex
- [ ] rgb
- [x] hsl
- [ ] اسم اللون

hsl فيها قناة سطوع مستقلة.

### `currentColor` يعني؟
- [x] اللون الحالي للنص
- [ ] شفاف
- [ ] أسود
- [ ] لون الخلفية

يعني لون الخاصية `color` الحالية.

### أقل نسبة تباين مقبولة للنص العادي؟
- [ ] 1.5:1
- [ ] 3:1
- [x] 4.5:1
- [ ] 21:1

معيار WCAG AA = 4.5:1.

## refs

- [MDN: Color](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors)
