---
id: word-spacing
kind: property
cat: typography
chip: word-spacing
title: المسافة بين الكلمات
en: CSS word-spacing property
status: stable
support: all
size: compact
mdn: word-spacing
summary: word-spacing بتزوّد أو تقلّل المسافة بين الكلمات. عكس letter-spacing، هي آمنة للعربي لأنها مبتقطّعش اتصال الحروف.
keywords: word-spacing, مسافة الكلمات, space, spacing
related: letter-spacing, line-height, text-align, font-size
---

## intro

الخاصية `word-spacing` بتحدد **المسافة بين الكلمات** (مش بين الحروف). القيمة الافتراضية `normal`، والموجبة بتوسّع الفراغ بين الكلمات والسالبة بتضمّها. بعكس [[letter-spacing]]، هي **آمنة للعربي** لأنها مبتلمسش اتصال الحروف جوه الكلمة الواحدة، فممكن تستخدمها لو عايز تفرّد النص قليلاً.

الاستخدام قليل: تحسين قراءة سطور ضيقة، أو تأثير بصري في عناوين. والأفضل تستخدم `em` عشان تتناسب مع الحجم. وبتتوارث.

## try

```html
<style>
  p { margin:4px 0; color:#3d2c18; font-size:1.15rem; }
</style>
<p style="word-spacing:-.1em">كلمات قريبة من بعض جداً</p>
<p>كلمات مسافتها عادية</p>
<p style="word-spacing:.5em">كلمات بعيدة عن بعض شوية</p>
```

## syntax

```css nolive
word-spacing: normal;
word-spacing: 0.3em;
word-spacing: 8px;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
الافتراضي.

### `<length>`
موجبة توسّع وسالبة تضم.

## use

- توسيع بسيط لنص ضيق.
- تأثير في عناوين.

## avoid

- قيم كبيرة تفكّك الجملة.

## examples

### 1) مقارنة
ثلاث قيم.

```html
<style>
  p { margin:3px 0; color:#3d2c18; font-size:1.1rem; }
</style>
<p style="word-spacing:0">مسافة عادية بين الكلمات</p><p style="word-spacing:.4em">مسافة واسعة بين الكلمات</p><p style="word-spacing:-.15em">مسافة ضيقة بين الكلمات</p>
```



### 2) آمنة للعربي
الحروف متصلة ولسه الكلمات متباعدة.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.4rem; word-spacing:.6em; }
</style>
<p>مرحبا بك في الموقع</p>
```



### 3) عنوان
تباعد بسيط لعنوان.

```html
<style>
  h4 { margin:0; color:#7a4a1d; font-size:1.6rem; word-spacing:.3em; }
</style>
<h4>مكتبة فينيكس التعليمية</h4>
```



## mistakes

### خلط مع letter-spacing

```css bad
p { letter-spacing:.3em; }  /* يقطّع العربي */
```

```css good
p { word-spacing:.3em; }
```

للعربي استخدم word-spacing.

## quiz

### word-spacing بتأثر على؟
- [ ] الحروف
- [x] الكلمات
- [ ] الأسطر
- [ ] الألوان

المسافة بين الكلمات.

### آمنة للعربي؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط الإنجليزي

لا تقطّع الاتصال.

## refs

- [MDN: word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)
