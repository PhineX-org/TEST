---
id: dt-color
kind: datatype
cat: datatypes
chip: <color>
title: الألوان
en: CSS <color> data type
status: stable
support: all
mdn: color_value
summary: نوع color يغطي كل صيغ الألوان: الأسماء وhex وrgb وhsl وoklch وcurrentColor وtransparent وcolor-mix.
keywords: color, hex, rgb, hsl, named colors, currentColor, transparent
related: fn-rgb, fn-hsl, fn-oklch, fn-color-mix, colors-guide
---

## intro

النوع `<color>` بيغطي **كل الطرق** اللي تكتب بيها لون في CSS. استخدمه في `color` و`background-color` و`border-color` و`box-shadow` و`outline`... الصيغ:

- **أسماء**: `red`, `tomato`, `rebeccapurple` (148 اسم). سهلة لكن محدودة.
- **hex**: `#c9772f` أو مختصر `#c72`، و`#c9772f80` (مع شفافية).
- **الدوال**: [[fn-rgb]] و[[fn-hsl]] و`hwb()` و`lab()` و[[fn-oklch]] و`color()` و[[fn-color-mix]] و`light-dark()`.
- **كلمات خاصة**: **`transparent`** (شفاف تماماً)، و**`currentColor`** (لون النص الحالي، رائعة للأيقونات والحدود التي تتبع لون النص).
- **ألوان النظام**: `Canvas`, `CanvasText` وغيرها.

نصايح: استخدم **متغيرات CSS** للألوان الأساسية. و`currentColor` بتوفّر عليك تكرار اللون. والشفافية `rgb(... / .5)`. ولراحة العين: ألوان **دافية معتدلة** بدل الأسود/الأبيض الصريحين.

## try

```html
<style>
  .s { display:inline-block; width:58px; height:40px; border-radius:8px; margin:3px; font-size:.7rem; text-align:center; line-height:40px; color:#3d2c18; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:tomato">اسم</span><span class="s" style="background:#c9772f">hex</span><span class="s" style="background:rgb(61 122 90)">rgb</span><span class="s" style="background:hsl(40 60% 70%)">hsl</span><span class="s" style="background:transparent">شفاف</span>
```

## syntax

```css nolive
color: tomato;            /* اسم */
color: #c9772f;          /* hex */
color: rgb(201 119 47 / 50%);
color: hsl(30 60% 50%);
border-color: currentColor;
background: transparent;
```

- hex 3 أو 4 أو 6 أو 8 خانات.
- `currentColor` بيتبع color.
- الدوال الحديثة بتدعم alpha بـ `/`.

## use

- hex لنسخ ألوان التصميم.
- hsl لعمل درجات.
- `currentColor` للأيقونات.

## avoid

- `#000` و`#fff` الصريحين لمحتوى طويل.
- أسماء ألوان غير متسقة مع هوية الموقع.

## examples

### 1) كل الصيغ
نفس العائلة.

```html
<style>
  .s { display:inline-block; width:58px; height:40px; border-radius:8px; margin:3px; font-size:.7rem; text-align:center; line-height:40px; color:#3d2c18; border:1px solid rgba(61,44,24,.25); }
</style>
<span class="s" style="background:tomato">اسم</span><span class="s" style="background:#c9772f">hex</span><span class="s" style="background:rgb(61 122 90)">rgb</span><span class="s" style="background:hsl(40 60% 70%)">hsl</span>
```



### 2) currentColor
الحد يتبع النص.

```html
<style>
  .a { color:#7a4a1d; border:3px solid currentColor; padding:6px 12px; border-radius:8px; display:inline-block; font-weight:bold; margin:3px; }
  .b { color:#3d7a5a; border:3px solid currentColor; padding:6px 12px; border-radius:8px; display:inline-block; font-weight:bold; margin:3px; }
</style>
<span class="a">بني</span><span class="b">أخضر</span>
```



### 3) شفافية
hex 8 خانات.

```html
<style>
  .s { display:inline-block; width:58px; height:40px; border-radius:8px; margin:3px; }
  .w { background:#efe0bd; padding:6px; border-radius:8px; }
</style>
<div class="w"><span class="s" style="background:#c9772fff"></span><span class="s" style="background:#c9772f99"></span><span class="s" style="background:#c9772f44"></span></div>
```



### 4) hex مختصر
3 خانات.

```html
<style>
  .s { display:inline-block; width:58px; height:40px; border-radius:8px; margin:3px; }
</style>
<span class="s" style="background:#c72"></span><span class="s" style="background:#cc7722"></span>
```



## mistakes

### أسود/أبيض صريح

```css bad
body { color:#000; background:#fff; }
```

```css good
body { color:#3d2c18; background:#f3ede0; }
```

أريح للعين.

### تكرار اللون

```css bad
.i { color:#7a4a1d; border-color:#7a4a1d; }
```

```css good
.i { color:#7a4a1d; border-color:currentColor; }
```

currentColor.

## quiz

### currentColor بتعني؟
- [x] لون النص الحالي
- [ ] الأسود
- [ ] شفاف
- [ ] لون الخلفية

تتبع color.

### hex بـ 8 خانات؟
- [x] فيه شفافية
- [ ] خطأ
- [ ] أسود
- [ ] أبيض

#rrggbbaa.

### أنسب للدرجات؟
- [x] hsl
- [ ] اسم اللون
- [ ] rgb فقط
- [ ] hex فقط

تغيير L.

## refs

- [MDN: `<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
