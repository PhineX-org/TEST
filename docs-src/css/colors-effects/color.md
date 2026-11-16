---
id: color
kind: property
cat: colors-effects
chip: color
title: لون النص
en: CSS color property
status: stable
support: all
mdn: color
summary: color بتحدد لون النص (والحد الافتراضي currentcolor). بتتوارث. اختار ألوان بتباين كافي ومريحة للعين.
keywords: color, لون النص, text color, currentcolor, hex, rgb, hsl, تباين, وراثة
related: background-color, opacity, colors-guide, dt-color, border-color
---

## intro

الخاصية `color` بتحدد **لون النص** للعنصر (وكمان لون أي حاجة بتعتمد على `currentcolor` زي الحد والأيقونات SVG). وهي من الخصائص **اللي بتتوارث**: لو حطيتها على `body` كل النصوص جواه ياخدوا اللون ده، إلا لو اتغير.

بتقبل كل صيغ الألوان ([[colors-guide]]): `#3d2c18` أو `rgb()` أو `hsl()` أو `oklch()` أو الأسماء. والافتراضي بيختلف حسب المتصفح (غالباً أسود)، وللروابط ألوان خاصة.

**للقراءة المريحة والوصولية**:
- تجنّب الأسود `#000` على أبيض `#fff` صريحين: استخدم بني غامق على كريمي.
- التباين مع [[background-color]] لازم **4.5:1** على الأقل للنص العادي (3:1 للنص الكبير).
- متعتمدش على اللون وحده لنقل معنى (أحمر = خطأ) بل ضيف نص أو أيقونة.

> [!tip] اللون على `body` ثم عدّل الاستثناءات: بتستفيد من الوراثة.

## try

```html
<style>
  .t { color:#b5551f; font-size:1.3rem; font-weight:bold; }
</style>
<p class="t">نص بلون بني محروق</p>
```

## syntax

```css nolive
color: #3d2c18;
color: rgb(61 44 24);
color: hsl(30 43% 18%);
color: currentColor;
color: inherit;
```

- **القيمة المبدئية**: بيعتمد على المتصفح.
- **بتتوارث؟** أيوه.
- **بتتحرك؟** أيوه.

## values

### `<color>`
أي لون.

### currentcolor
لون النص الحالي (للحد والأيقونات).

### inherit
ياخد لون الأب.

## use

- لون النص الأساسي على body.
- ألوان الروابط والعناوين.
- currentColor لأيقونات SVG.

## avoid

- تباين ضعيف.
- الأسود الصريح على الأبيض الصريح للنص الطويل.
- اللون وحده لنقل معنى.

## examples

### 1) وراثة اللون
الأب بيورّث اللون للأولاد.

```html
<style>
  .p { color:#3d7a5a; }
</style>
<div class="p">أخضر<p>ابن بياخد اللون</p><span>حفيد</span></div>
```



### 2) ألوان بصيغ مختلفة
نفس اللون تقريباً.

```html
<style>
  p { margin:4px 0; font-weight:bold; }
</style>
<p style="color:#b5551f">hex</p><p style="color:rgb(181 85 31)">rgb</p><p style="color:hsl(22 71% 41%)">hsl</p>
```



### 3) currentColor
الحد والأيقونة بياخدوا لون النص.

```html
<style>
  .t { color:#7a4a1d; border:3px solid currentColor; padding:8px; display:inline-block; }
  svg { fill:currentColor; width:18px; vertical-align:middle; }
</style>
<div class="t"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg> نص</div>
```



### 4) تباين
نص مريح مقابل ضعيف.

```html
<style>
  .a { background:#efe0bd; color:#b8aa90; padding:8px; margin:4px 0; }
  .b { background:#efe0bd; color:#3d2c18; padding:8px; }
</style>
<div class="a">تباين ضعيف</div><div class="b">تباين كويس</div>
```



## mistakes

### اللون وحده للخطأ

```css bad
.error { color:red; }
```

```css good
.error { color:#a63b2f; }
.error::before { content:"⚠ "; }
```

ضيف أيقونة أو نص.

### تباين ضعيف

```css bad
p { color:#999; background:#ddd; }
```

```css good
p { color:#3d2c18; background:#efe0bd; }
```

النص لازم يتقري بسهولة.

## quiz

### color بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط في links

أيوه.

### أقل تباين للنص العادي؟
- [ ] 2:1
- [ ] 3:1
- [x] 4.5:1
- [ ] 21:1

WCAG AA.

### currentcolor معناه؟
- [ ] شفاف
- [x] لون النص الحالي
- [ ] أسود
- [ ] لون الخلفية

لون color الحالي.

## refs

- [MDN: color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
