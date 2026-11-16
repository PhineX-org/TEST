---
id: text-transform
kind: property
cat: typography
chip: text-transform
title: تحويل حالة الحروف
en: CSS text-transform property
status: stable
support: all
mdn: text-transform
summary: text-transform بتغيّر حالة الحروف الإنجليزية: uppercase للكبيرة، lowercase للصغيرة، capitalize لأول حرف من كل كلمة. العربي مش متأثر.
keywords: text-transform, uppercase, lowercase, capitalize, حروف كبيرة, حالة الحروف
related: font-variant, letter-spacing, text-align, font-weight
---

## intro

الخاصية `text-transform` بتغيّر **حالة الحروف** (كبيرة/صغيرة) في النص **بدون تغيير الـ HTML الأصلي**. القيم: **`uppercase`** (كل الحروف كبيرة)، **`lowercase`** (كلها صغيرة)، **`capitalize`** (أول حرف من كل كلمة كبير)، و**`none`** (الافتراضي).

ملحوظة مهمة للعربي: الحروف العربية **مفيهاش حالة كبيرة وصغيرة**، فالخاصية دي **مبتأثرش** على الحروف العربية، لكنها بتأثر على أي **كلمات إنجليزية** وسط النص العربي.

ليه تستخدمها بدل ما تكتب النص كابيتال في الـ HTML؟ لأن الشكل (التنسيق) مكانه CSS، والمحتوى يفضل طبيعي، فقارئ الشاشة بيقرأه بشكل أحسن، ولو غيّرت رأيك في التصميم بتغيّر سطر CSS بس. وتتوارث. غالباً بتتجمع مع [[letter-spacing]] لعناوين إنجليزية أنيقة.

## try

```html
<style>
  p { margin:3px 0; color:#3d2c18; font-size:1.15rem; direction:ltr; text-align:left; }
</style>
<p style="text-transform:uppercase">uppercase hello world</p>
<p style="text-transform:lowercase">LOWERCASE HELLO WORLD</p>
<p style="text-transform:capitalize">capitalize hello world</p>
```

## syntax

```css nolive
text-transform: none;
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;
```

- **القيمة المبدئية**: `none`.
- **بتتوارث؟** أيوه.
- **العربي**: مش متأثر.

## values

### uppercase
كل الحروف كبيرة.

### lowercase
كلها صغيرة.

### capitalize
أول حرف من كل كلمة كبير.

### none
بدون تغيير.

## use

- أزرار وعناوين إنجليزية uppercase.
- تنسيق أسماء capitalize.
- توحيد شكل بيانات المستخدم.

## avoid

- uppercase لفقرات طويلة (صعبة القراءة).
- الاعتماد عليها لنص عربي (مفيش تأثير).

## examples

### 1) الأنواع
كل قيمة على نفس الجملة.

```html
<style>
  p { margin:3px 0; color:#3d2c18; direction:ltr; text-align:left; font-size:1.1rem; }
</style>
<p style="text-transform:uppercase">phinex academy</p><p style="text-transform:capitalize">phinex academy</p><p style="text-transform:lowercase">PHINEX ACADEMY</p>
```



### 2) زرار uppercase
شكل زراير شائع.

```html
<style>
  button { text-transform:uppercase; letter-spacing:.08em; background:#c9772f; color:#f3ede0; border:0; padding:8px 18px; border-radius:6px; font-weight:bold; }
</style>
<button>Get started</button>
```



### 3) العربي مش بيتأثر
بس الإنجليزي بيتحول.

```html
<style>
  p { margin:0; color:#3d2c18; font-size:1.2rem; text-transform:uppercase; }
</style>
<p>مرحبا بك في phinex</p>
```



### 4) capitalize لأسماء
أسماء بحروف صغيرة.

```html
<style>
  .n { text-transform:capitalize; color:#7a4a1d; font-size:1.2rem; direction:ltr; text-align:left; }
</style>
<div class="n">ahmed elgohary</div>
```



## mistakes

### كتابة النص كابيتال في HTML

```css bad
<h2>ABOUT US</h2>
```

```css good
<h2>About us</h2>
h2 { text-transform:uppercase; }
```

المحتوى طبيعي والشكل في CSS.

### uppercase لفقرة طويلة

```css bad
p { text-transform:uppercase; }
```

```css good
p { text-transform:none; }
```

الكابيتال يصعّب القراءة.

## quiz

### capitalize بتعمل؟
- [ ] كل الحروف كبيرة
- [x] أول حرف من كل كلمة كبير
- [ ] تصغّر الكل
- [ ] لا شيء

أول حرف.

### تأثيرها على العربي؟
- [ ] كبير
- [x] مفيش
- [ ] تقلب الاتجاه
- [ ] تمسح

العربي مفيهوش حالات.

### الافتراضي؟
- [ ] uppercase
- [x] none
- [ ] capitalize
- [ ] lowercase

none.

## refs

- [MDN: text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)
