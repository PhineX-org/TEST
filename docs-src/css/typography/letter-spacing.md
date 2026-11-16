---
id: letter-spacing
kind: property
cat: typography
chip: letter-spacing
title: المسافة بين الحروف
en: CSS letter-spacing property
status: stable
support: all
mdn: letter-spacing
summary: letter-spacing بتزوّد أو تقلّل المسافة بين الحروف. للإنجليزي بتحسّن العناوين، لكن للعربي لا تستخدمها لأنها بتقطّع اتصال الحروف.
keywords: letter-spacing, مسافة الحروف, tracking, em, arabic, اتصال الحروف
related: word-spacing, font-size, text-transform, font-weight
---

## intro

الخاصية `letter-spacing` بتضيف (أو تشيل) **مسافة بين كل حرفين**. القيمة الموجبة بتفرّد الحروف، والسالبة بتضمّها. وبيفضّل تكتبها بـ **`em`** عشان تتناسب مع حجم الخط: `letter-spacing: 0.05em`.

استخدامات مناسبة للإنجليزي: **عناوين صغيرة بحروف كبيرة** (`text-transform: uppercase` + `letter-spacing: .1em`) بتدي شكل أنيق، وأزرار، وشعارات.

**تحذير مهم جداً للعربي** ⚠️: الحروف العربية **متصلة ببعض** والكتابة بتعتمد على الاتصال، وأي `letter-spacing` غير صفر بيقطّع الاتصال وبيبوّظ الكلمة (مثلاً «مرحبا» تبقى «م ر ح ب ا» مفككة). فلازم تخلّيها `0` أو `normal` على النص العربي. وده السبب إن أحسن حاجة تعمله إنك **متضيفهاش** على نصوص عربية أبداً.

وبتتوارث، فلو حطيتها على `body` وانت عندك عربي هتبوّظ كل حاجة، فحطها على عناصر إنجليزية بس.

## try

```html
<style>
  p { margin:4px 0; color:#3d2c18; font-size:1.2rem; direction:ltr; text-align:left; }
</style>
<p style="letter-spacing:-.05em">Tight spacing</p>
<p>Normal spacing</p>
<p style="letter-spacing:.2em">WIDE SPACING</p>
```

## syntax

```css nolive
letter-spacing: normal;
letter-spacing: 0.05em;
letter-spacing: 2px;
letter-spacing: -0.02em;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.
- **للعربي**: صفر دايماً.

## values

### normal
الافتراضي.

### `<length>`
قيمة موجبة تفرّد وسالبة تضم (يفضّل em).

### inherit
ياخد القيمة من الأب.

## use

- عناوين إنجليزية بحروف كبيرة.
- أزرار وشعارات إنجليزية.
- تحسين قراءة نص صغير جداً بالإنجليزي.

## avoid

- letter-spacing على النص العربي.
- قيم كبيرة على نص طويل.

## examples

### 1) عنوان إنجليزي أنيق
uppercase مع مسافة.

```html
<style>
  h4 { margin:0; color:#7a4a1d; font-size:1rem; text-transform:uppercase; letter-spacing:.18em; direction:ltr; text-align:left; }
</style>
<h4>Section Title</h4>
```



### 2) خراب العربي
التباعد بيقطّع الاتصال.

```html
<style>
  p { margin:4px 0; color:#3d2c18; font-size:1.4rem; }
</style>
<p>مرحبا بك في الموقع</p><p style="letter-spacing:.2em">مرحبا بك في الموقع</p>
```



### 3) تباعد سالب
للعناوين الكبيرة.

```html
<style>
  h4 { margin:0; color:#3d2c18; font-size:2rem; letter-spacing:-.03em; direction:ltr; text-align:left; }
</style>
<h4>Big Headline</h4>
```



### 4) قيم بالـ em
تتناسب مع الحجم.

```html
<style>
  .a { font-size:1rem; letter-spacing:.1em; } .b { font-size:2rem; letter-spacing:.1em; }
  div { direction:ltr; text-align:left; color:#3d2c18; }
</style>
<div class="a">small .1em</div><div class="b">big .1em</div>
```



## mistakes

### على body فيه عربي

```css bad
body { letter-spacing:.05em; }  /* بيقطّع العربي */
```

```css good
.latin-heading { letter-spacing:.05em; }
```

حصرها على الإنجليزي.

### px بدل em

```css bad
h1 { letter-spacing:3px; }
```

```css good
h1 { letter-spacing:.05em; }
```

em بيتناسب مع حجم الخط.

## quiz

### letter-spacing للعربي؟
- [ ] مفيدة
- [x] تبوّظ اتصال الحروف
- [ ] تلوّن
- [ ] تكبّر

بتقطّع الاتصال.

### الوحدة المفضلة؟
- [ ] px
- [x] em
- [ ] vh
- [ ] deg

em.

### بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط في body

بتتوارث.

## refs

- [MDN: letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
