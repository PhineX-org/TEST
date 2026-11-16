---
id: list-style
kind: property
cat: lists-tables
chip: list-style
title: شكل القوائم (اختصار)
en: CSS list-style shorthand
status: stable
support: all
mdn: list-style
summary: list-style اختصار بيجمع النوع والموضع والصورة لعلامات القوائم: list-style: none بتشيل النقط، وdisc inside بتحط نقطة جوه.
keywords: list-style, list-style-type, ul, ol, none, قوائم, نقط
related: list-style-type, list-style-position, list-style-image, marker, display
---

## intro

الخاصية `list-style` هي **اختصار** بيتحكم في **علامة القائمة** (النقطة أو الرقم) قدام كل عنصر `li`. بتجمع تلات خصائص في سطر واحد: النوع [[list-style-type]]، والموضع [[list-style-position]]، والصورة [[list-style-image]].

أشهر سطر في الدنيا بالنسبة للقوائم: **`list-style: none;`** عشان تشيل النقط والأرقام خالص. بنعمله لما القائمة بتكون **قايمة تنقل (nav)** أو أزرار أو بطاقات، مش قائمة نصية حقيقية. بس خد بالك: في **Safari مع VoiceOver** لما تشيل `list-style` من `ul` بيتعامل معاها كأنها مش قائمة (مشكلة وصولية)، فلو القائمة محتواها قائمة فعلاً أضف `role="list"` للأمان.

مثال كامل: `ul { list-style: square inside; }` يعني مربعات بتبدأ جوه صندوق العنصر. وعادة بنصفّر الحشو الافتراضي بـ `padding: 0; margin: 0;` لأن المتصفح بيدّي `ul` حشو من اليمين (في العربي) عشان العلامات.

وتذكّر إن `list-style` بتتوارث، فلو حطيتها على `ul` كل الـ `li` بتاخدها.

## try

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; padding:10px 28px 10px 10px; margin:4px; }
  .a { list-style: square inside; }
  .b { list-style: none; padding-inline-start:10px; }
</style>
<ul class="a"><li>مربعات جوه</li><li>العنصر التاني</li></ul>
<ul class="b"><li>بدون علامة</li><li>العنصر التاني</li></ul>
```

## syntax

```css nolive
list-style: disc;
list-style: square inside;
list-style: none;
list-style: decimal outside;
list-style: url(star.svg) inside;
```

- **القيمة المبدئية**: `disc outside none`.
- **بتتوارث؟** أيوه.
- ممكن تكتب أي ترتيب للقيم.

## values

### none
يشيل العلامة خالص.

### disc / circle / square
نقطة / دايرة / مربع.

### decimal
أرقام 1 2 3.

### inside / outside
العلامة جوه أو بره صندوق العنصر.

## use

- `none` لقوائم التنقل والبطاقات.
- تغيير شكل النقط حسب هوية الموقع.
- `inside` لما تحب العلامة تلتف مع النص.

## avoid

- شيل العلامات من قايمة نصية حقيقية بدون `role="list"`.
- نسيان تصفير الحشو الافتراضي بعد `none`.

## examples

### 1) إزالة العلامات
أشهر استخدام: قايمة تنقل.

```html
<style>
  nav ul { list-style:none; margin:0; padding:0; display:flex; gap:8px; }
  nav a { display:block; padding:6px 12px; background:#c9772f; color:#f3ede0; border-radius:8px; text-decoration:none; font-weight:bold; }
</style>
<nav><ul><li><a href="#" onclick="return false">الرئيسية</a></li><li><a href="#" onclick="return false">الدروس</a></li><li><a href="#" onclick="return false">تواصل</a></li></ul></nav>
```



### 2) أنواع النقط
disc وcircle وsquare.

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; margin:3px; padding:8px 26px 8px 8px; display:inline-block; vertical-align:top; }
</style>
<ul style="list-style:disc"><li>disc</li><li>نقطة</li></ul><ul style="list-style:circle"><li>circle</li><li>دايرة</li></ul><ul style="list-style:square"><li>square</li><li>مربع</li></ul>
```



### 3) قايمة مرقمة
decimal وlower-alpha.

```html
<style>
  ol { color:#3d2c18; background:#f3e6c9; border-radius:8px; margin:3px; padding:8px 30px 8px 8px; display:inline-block; vertical-align:top; }
</style>
<ol style="list-style:decimal"><li>أول</li><li>تاني</li></ol><ol style="list-style:lower-alpha"><li>أول</li><li>تاني</li></ol>
```



### 4) inside مقابل outside
موضع العلامة.

```html
<style>
  ul { color:#3d2c18; background:#efe0bd; border-radius:8px; margin:3px; padding:8px 8px 8px 8px; width:140px; display:inline-block; vertical-align:top; }
  li { background:#e4c490; margin:3px 0; padding:2px 6px; }
</style>
<ul style="list-style:disc inside"><li>inside: النقطة جوه والنص بيلتف تحتها</li></ul><ul style="list-style:disc outside; padding-inline-start:26px"><li>outside: النقطة بره</li></ul>
```



## mistakes

### شيل الحشو غلط

```css bad
ul { list-style:none; }  /* لسه فيه فراغ على اليمين */
```

```css good
ul { list-style:none; margin:0; padding:0; }
```

list-style مبتشيلش الحشو الافتراضي.

### إزالة سياق القايمة

```css bad
ul { list-style:none; }  /* ممكن VoiceOver ميعتبرهاش قايمة */
```

```css good
<ul role="list"> مع list-style:none
```

للوصولية على Safari.

## quiz

### أشهر قيمة لإزالة النقط؟
- [x] none
- [ ] disc
- [ ] square
- [ ] inside

list-style: none.

### list-style بتجمع كام خاصية؟
- [x] 3 (نوع وموضع وصورة)
- [ ] 1
- [ ] 5
- [ ] 2

النوع والموضع والصورة.

### بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] بس على ol

بتتوارث للـ li.

## refs

- [MDN: list-style](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style)
