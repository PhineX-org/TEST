---
id: text-wrap
kind: property
cat: typography
chip: text-wrap
title: طريقة لف النص
en: CSS text-wrap property
status: stable
support: all
size: compact
mdn: text-wrap
summary: text-wrap بتتحكم في توزيع السطور: balance لتساوي أطوال السطور في العناوين، pretty لتجنب كلمة وحيدة في آخر الفقرة، nowrap لمنع اللف.
keywords: text-wrap, balance, pretty, nowrap, عناوين متوازنة, orphan, wrap
related: white-space, word-break, overflow-wrap, text-align
---

## intro

الخاصية `text-wrap` أداة حديثة بتحسّن **شكل توزيع النص على السطور**. القيم المهمة: **`balance`** (يوزّع الكلمات على السطور عشان تقارب بعض في الطول، ممتازة للعناوين اللي بتلف على سطرين أو تلاتة)، **`pretty`** (يتجنّب ترك كلمة وحيدة «يتيمة» في آخر الفقرة)، **`nowrap`** (مبيلفش النص)، و**`wrap`** (الافتراضي).

الفرق عن [[white-space]]: `text-wrap` بتتحكم في **جودة اللف**، وبعدين `nowrap` فيها بتقابل `white-space: nowrap`. بتشتغل في المتصفحات الحديثة، وفي القديمة بتتجاهل بدون ضرر (**progressive enhancement**).

## try

```html
<style>
  h4 { width:200px; margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; font-size:1.3rem; }
</style>
<h4 style="text-wrap:wrap">عنوان طويل بيلف بشكل غير متوازن على سطرين</h4>
<h4 style="text-wrap:balance">عنوان طويل بيلف بشكل متوازن على سطرين</h4>
```

## syntax

```css nolive
text-wrap: wrap;
text-wrap: balance;
text-wrap: pretty;
text-wrap: nowrap;
```

- **القيمة المبدئية**: `wrap`.
- تحسين تدريجي (قديم يتجاهلها).

## values

### balance
سطور متساوية تقريباً.

### pretty
تجنب كلمة وحيدة.

### nowrap
بدون لف.

### wrap
الافتراضي.

## use

- balance للعناوين.
- pretty للفقرات.

## avoid

- balance على فقرات طويلة (مكلفة).

## examples

### 1) balance
مقارنة بالعادي.

```html
<style>
  h4 { width:190px; margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; font-size:1.2rem; }
</style>
<h4>تعلّم تطوير المواقع من الصفر للاحتراف</h4><h4 style="text-wrap:balance">تعلّم تطوير المواقع من الصفر للاحتراف</h4>
```



### 2) pretty
بدون كلمة يتيمة.

```html
<style>
  p { width:190px; margin:0; padding:6px 10px; background:#efe0bd; color:#3d2c18; text-wrap:pretty; line-height:1.7; }
</style>
<p>فقرة قصيرة بتنتهي بكلمة واحدة أخيرة طويلة جداً أحياناً</p>
```



### 3) nowrap
سطر واحد.

```html
<style>
  p { width:190px; margin:0; padding:6px 10px; background:#efe0bd; color:#3d2c18; text-wrap:nowrap; overflow:hidden; }
</style>
<p>نص طويل جداً مبيلفش على سطر تاني أبداً</p>
```



## mistakes

### balance على فقرة طويلة

```css bad
p { text-wrap:balance; }  /* مكلف */
```

```css good
h1,h2,h3 { text-wrap:balance; }
```

للعناوين القصيرة فقط.

## quiz

### balance مفيدة لـ؟
- [x] العناوين
- [ ] الأكواد
- [ ] الجداول
- [ ] الصور

توزيع متساوي.

### لو المتصفح قديم؟
- [x] تتجاهل بدون ضرر
- [ ] تكسر الصفحة
- [ ] تظهر خطأ
- [ ] تخفي النص

تحسين تدريجي.

## refs

- [MDN: text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
