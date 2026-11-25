---
id: placeholder
kind: pseudoelement
cat: pseudo-elements
chip: ::placeholder
title: النص التوضيحي
en: CSS ::placeholder pseudo-element
status: stable
support: all
mdn: ::placeholder
summary: العنصر الوهمي placeholder بينسّق نص placeholder داخل الحقول. اللون الافتراضي رمادي فاتح وغالباً بيحتاج تباين أحسن.
keywords: ::placeholder, placeholder, نص توضيحي, input, لون
related: placeholder-shown, color, font-style, caret-color
---

## intro

`::placeholder` بتنسّق **النص التوضيحي** اللي بيظهر جوه الحقل وهو فاضي (من الخاصية `placeholder` في HTML). المتصفحات بتدّيه لون رمادي فاتح افتراضياً، وده **غالباً تباينه ضعيف**.

الخصائص: اللون والخط و`opacity` (بتلاحظ إن Firefox بيحط opacity أقل افتراضياً فبتحتاج تظبطها). مثال: `::placeholder { color: #8a7a62; opacity: 1; }`.

**تنبيه وصولية مهم**: الـ placeholder **مش بديل للتسمية (label)**. بيختفي أول ما المستخدم يكتب، وتباينه ضعيف عادةً، وقارئات الشاشة بتتعامل معاه مختلف. لازم دايماً `<label>` ظاهر. واستخدم الـ placeholder للتلميحات والأمثلة فقط («مثال: ahmed@mail.com»).

وللتحكم في حالة الحقل الفاضي استخدم [[placeholder-shown]].

## try

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  input::placeholder { color:#8a7a62; opacity:1; font-style:italic; }
</style>
<input placeholder="مثال: ahmed@mail.com">
```

## syntax

```css nolive
input::placeholder { color: #8a7a62; opacity: 1; }
textarea::placeholder { font-style: italic; }
```

- لون وخط وopacity.
- مش بديل عن label.

## use

- تحسين تباين placeholder.
- أمثلة للإدخال.
- هوية الموقع.

## avoid

- استخدام placeholder بدل label.
- تباين ضعيف.

## examples

### 1) لون مناسب
تباين أحسن.

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  input::placeholder { color:#7d6d55; opacity:1; }
</style>
<input placeholder="الاسم بالكامل">
```



### 2) خط مائل
تمييز النص التوضيحي.

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; direction:ltr; }
  input::placeholder { font-style:italic; color:#8a7a62; opacity:1; }
</style>
<input placeholder="e.g. ahmed@mail.com">
```



### 3) textarea
نفس الفكرة.

```html
<style>
  textarea { padding:8px; width:90%; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  textarea::placeholder { color:#8a7a62; opacity:1; }
</style>
<textarea rows="2" placeholder="اكتب رسالتك"></textarea>
```



### 4) مع label
الصح: label ظاهر.

```html
<style>
  label { display:block; color:#3d2c18; font-weight:bold; margin-bottom:3px; }
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  input::placeholder { color:#8a7a62; opacity:1; }
</style>
<label for="e">الإيميل</label><input id="e" placeholder="مثال: ahmed@mail.com">
```



## mistakes

### placeholder بدل label

```css bad
<input placeholder="الاسم">
```

```css good
<label for="n">الاسم</label><input id="n" placeholder="مثال: أحمد">
```

التسمية ضرورية.

### نسيان opacity في Firefox

```css bad
::placeholder { color:#999; }  /* opacity افتراضي أقل */
```

```css good
::placeholder { color:#7d6d55; opacity:1; }
```

اضبط opacity.

## quiz

### placeholder بتنسّق؟
- [x] النص التوضيحي في الحقل
- [ ] الحقل نفسه
- [ ] الزرار
- [ ] التسمية

النص التوضيحي.

### بديل عن label؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] في الجوال فقط

مش بديل.

### مشكلة شائعة؟
- [x] تباين ضعيف
- [ ] حجم كبير
- [ ] غياب
- [ ] تكرار

لون رمادي فاتح.

## refs

- [MDN: ::placeholder](https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder)
