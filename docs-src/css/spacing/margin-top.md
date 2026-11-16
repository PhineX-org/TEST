---
id: margin-top
kind: property
cat: spacing
chip: margin-top
title: هامش الفوق
en: CSS margin-top property
status: stable
support: all
size: compact
mdn: margin-top
summary: الخاصية margin-top بتحدد المسافة الخارجية على جهة الفوق من العنصر.
keywords: margin-top, margin, هامش فوق, مسافة, spacing
related: margin, padding, box-model, margin-inline, padding-top
---

## intro

الخاصية `margin-top` بتحدد **الهامش على جهة الفوق** من العنصر لوحدها، من غير ما تأثر على باقي الجهات. هي واحدة من أربع خصائص بتكوّن الاختصار [[margin]]، وبتستخدمها لما عايز تظبط جهة واحدة بس. زي ما عرفنا في [[box-model]]، الهامش هو المسافة **برّه** حدود العنصر، وهو **شفاف** ومبياخدش لون الخلفية. وده بيتأثر بـ **دمج الهوامش الرأسية (margin collapsing)**: لو العنصر اللي فوقه عنده margin-bottom فهياخدوا الأكبر بس.

المنطقي المقابل: `margin-block-start`. القيمة ممكن تكون طول زي `20px` أو نسبة (من عرض الأب) أو `auto` أو قيمة سالبة.

## try

```html
<style>
  .box { background:#c9772f; color:#fff3e0; padding:10px; margin-top:30px; border:2px solid #7a4a1d; }
  .wrap { background:#efe0bd; outline:2px dashed #7a4a1d; display:inline-block; }
</style>
<div class="wrap"><div class="box">غيّر القيمة</div></div>
```

## syntax

```css nolive
margin-top: 20px;
margin-top: 2rem;
margin-top: auto;
margin-top: -10px;
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

### 1) مسافة فوق العنصر
`margin-top` بتبعد العنصر عن اللي فوقه.

```html
<style>
  .a { background:#efe0bd; color:#3d2c18; padding:8px; }
  .b { background:#c9772f; color:#fff3e0; padding:8px; margin-top:30px; }
</style>
<div class="a">فوق</div><div class="b">margin-top: 30px</div>
```



### 2) أول عنصر بيدفع الأب
ممكن هامش أول ابن يتسرّب برّه الأب (margin collapsing) فبنمنعه بـ `padding` أو `overflow`.

```html
<style>
  .p { background:#efe0bd; color:#3d2c18; overflow:hidden; }
  .c { margin-top:30px; background:#3d7a5a; color:#f3ede0; padding:8px; }
</style>
<div class="p"><div class="c">ابن بهامش علوي (جوه الأب لأن overflow)</div></div>
```

- من غير `overflow` الهامش بيطلع برّه الأب.

### 3) قائمة بمسافات
نفس الهامش على كل عنصر ما عدا الأول بـ `* + *`.

```html
<style>
  li { list-style:none; background:#bcd4a8; color:#3d2c18; padding:6px; }
  li + li { margin-top:8px; }
  ul { padding:0; margin:0; }
</style>
<ul><li>1</li><li>2</li><li>3</li></ul>
```



## mistakes

### الخلط بين margin-top وpadding

```css bad
.a { margin-top:20px; }  /* عايز مسافة جوه العنصر */
```

```css good
.a { padding-top:20px; }
```

الهامش برّه العنصر والحشو جوّاه. الخلفية بتظهر في الحشو.

## quiz

### `margin-top` بتحدد؟
- [ ] مسافة داخلية
- [x] مسافة خارجية على جهة الفوق
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

- [MDN: margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)
