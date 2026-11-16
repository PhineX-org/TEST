---
id: margin-bottom
kind: property
cat: spacing
chip: margin-bottom
title: هامش التحت
en: CSS margin-bottom property
status: stable
support: all
size: compact
mdn: margin-bottom
summary: الخاصية margin-bottom بتحدد المسافة الخارجية على جهة التحت من العنصر.
keywords: margin-bottom, margin, هامش تحت, مسافة, spacing
related: margin, padding, box-model, margin-inline, padding-bottom
---

## intro

الخاصية `margin-bottom` بتحدد **الهامش على جهة التحت** من العنصر لوحدها، من غير ما تأثر على باقي الجهات. هي واحدة من أربع خصائص بتكوّن الاختصار [[margin]]، وبتستخدمها لما عايز تظبط جهة واحدة بس. زي ما عرفنا في [[box-model]]، الهامش هو المسافة **برّه** حدود العنصر، وهو **شفاف** ومبياخدش لون الخلفية. وده بيتأثر بـ **دمج الهوامش الرأسية (margin collapsing)**: لو العنصر اللي فوقه عنده margin-bottom فهياخدوا الأكبر بس.

المنطقي المقابل: `margin-block-end`. القيمة ممكن تكون طول زي `20px` أو نسبة (من عرض الأب) أو `auto` أو قيمة سالبة.

## try

```html
<style>
  .box { background:#c9772f; color:#fff3e0; padding:10px; margin-bottom:30px; border:2px solid #7a4a1d; }
  .wrap { background:#efe0bd; outline:2px dashed #7a4a1d; display:inline-block; }
</style>
<div class="wrap"><div class="box">غيّر القيمة</div></div>
```

## syntax

```css nolive
margin-bottom: 20px;
margin-bottom: 2rem;
margin-bottom: auto;
margin-bottom: -10px;
```

- **القيمة المبدئية**: `0`.
- **بتتوارث؟** لأ.
- **بتتحرك؟** أيوه.

## values

### `<length>`
قيمة ثابتة مثل `20px` أو `1.5rem`.

### auto
المتصفح بيحسبها (مع الأفقي بيوسّط أو بيدفع العنصر).

### `<percentage>`
نسبة من عرض الأب.

## use

- ظبط جهة واحدة من غير ما تكتب الاختصار الكامل.
- تنسيق استثنائي لعنصر معين (مثلاً آخر عنصر).

## avoid

- كتابة الأربع خصائص منفصلة بدل الاختصار `margin`.

## examples

### 1) مسافة تحت العنصر
`margin-bottom` بتفصل العنصر عن اللي بعده.

```html
<style>
  .a { background:#c9772f; color:#fff3e0; padding:8px; margin-bottom:30px; }
  .b { background:#efe0bd; color:#3d2c18; padding:8px; }
</style>
<div class="a">margin-bottom: 30px</div><div class="b">اللي بعده</div>
```



### 2) فقرات بمسافة
المسافة بين الفقرات عن طريق `margin-bottom`.

```html
<style>
  p { margin:0 0 1rem; color:#3d2c18; background:#efe0bd; padding:6px; }
</style>
<p>فقرة 1</p><p>فقرة 2</p><p>فقرة 3</p>
```



### 3) تداخل مع margin-top
الأكبر بيكسب بين margin-bottom وmargin-top المتجاورين.

```html
<style>
  .a { margin-bottom:10px; background:#bcd4a8; color:#3d2c18; padding:6px; }
  .b { margin-top:40px; background:#efe0bd; color:#3d2c18; padding:6px; }
</style>
<div class="a">10</div><div class="b">40 (المسافة 40 مش 50)</div>
```



## mistakes

### الخلط بين margin-bottom وpadding

```css bad
.a { margin-bottom:20px; }  /* عايز مسافة جوه العنصر */
```

```css good
.a { padding-bottom:20px; }
```

الهامش برّه العنصر والحشو جوّاه. الخلفية بتظهر في الحشو.

## quiz

### `margin-bottom` بتحدد؟
- [ ] مسافة داخلية
- [x] مسافة خارجية على جهة التحت
- [ ] سُمك الحد
- [ ] لون الخلفية

هامش جهة واحدة.

### الهامش شفاف؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط جوه flex

مبياخدش لون الخلفية.

## refs

- [MDN: margin-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom)
