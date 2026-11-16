---
id: center
kind: element
cat: old-text
tag: center
title: التوسيط القديم (center)
en: HTML center element (deprecated)
status: deprecated
display: block
void: no
support: all
size: compact
summary: عنصر center كان بيوسّط أي محتوى جواه أفقياً. اتحذف لأنه تنسيق بحت، والبديل CSS: text-align وmargin auto وFlexbox لتوسيط النص والعناصر.
keywords: center, توسيط, منتصف, text-align, margin auto, flex, قديم, deprecated, محاذاة
related: div, p, span, style
---

## intro

في التسعينات، عشان توسّط عنوان أو صورة كنت بتلفها بـ `<center>`. بسيط وبيشتغل. لكنه **وسم تنسيق مش معنى**: هو مش بيقول «ده إيه»، هو بيقول «اعرضه في النص». وده بيخلط المحتوى بالشكل، فاتشال من HTML5.

لسه المتصفحات بتعرضه (هو `display: block; text-align: -webkit-center`)، وده خلّاه موجود في صفحات قديمة كتير. النهارده التوسيط بتعمله بـ CSS: **`text-align: center`** للنص والعناصر inline، و**`margin-inline: auto`** لعنصر block بعرض محدد، و**Flexbox** (`justify-content: center`) أو **Grid** (`place-items: center`) لأي حاجة. وده أقوى بكتير وبيشتغل رأسياً كمان.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<center>` اتحذف. التوسيط بـ `text-align: center` أو `margin: auto` أو Flexbox.

## try

```html
<center>
  <h3>أنا في النص</h3>
  <p>ومعايا الفقرة دي كمان.</p>
</center>
```

## syntax

```html nolive
<center>المحتوى هنا</center>
```

- `<center>` — **الوسم الافتتاحي** (قديم).
- المحتوى — **أي حاجة** بتتوسّط.
- `</center>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة محتاج تفهمها.
- للتعرّف على تاريخ التنسيق في HTML.

## avoid

- متستخدمهوش في أي كود جديد.

## instead

استخدم CSS: `text-align: center` للنص، و`margin-inline: auto` لعنصر بعرض محدد، و`display: flex; justify-content: center` لتوسيط عناصر.

```html
<div style="text-align:center">
  <h3>أنا في النص</h3>
  <p>ومعايا الفقرة دي كمان.</p>
</div>
```

## examples

### 1) توسيط نص
text-align.

```html
<h3 style="text-align:center">عنوان متوسّط</h3>
<p style="text-align:center">فقرة متوسّطة</p>
```

- `text-align: center` بيوسّط النص والعناصر inline جوه العنصر.
- بنطبّقه على العنصر نفسه أو على الحاوية.
- ده أبسط بديل مباشر لـ `<center>`.

### 2) توسيط صندوق بعرض محدد
margin auto.

```html
<div style="width:200px; margin-inline:auto; padding:12px; background:#e2e8f0; text-align:center">
  صندوق في النص
</div>
```

- `margin-inline: auto` بيوزّع المسافة الفاضية على الجانبين.
- لازم العنصر يكون له `width` محدد وإلا ياخد العرض كله.
- ده اللي كان `<center>` بيعمله مع الجداول والصور.

### 3) توسيط أفقي ورأسي
Flexbox.

```html
<div style="display:flex; justify-content:center; align-items:center; height:120px; background:#f1f5f9; border-radius:8px">
  في النص تماماً
</div>
```

- `justify-content` للمحور الأفقي، و`align-items` للرأسي.
- `<center>` عمره ما عرف يوسّط رأسياً.
- الـ Flexbox أقوى بديل لأي توسيط.

## mistakes

### توسيط صورة بـ center
```html bad
<center><img src="a.jpg" alt="صورة"></center>
```
```html good
<img src="a.jpg" alt="صورة" style="display:block; margin-inline:auto">
```
ليه؟ `<center>` تنسيق قديم ومحذوف. `margin-inline:auto` مع `display:block` بيوسّط الصورة.

## quiz

### إيه بديل `<center>` لتوسيط النص؟
- [x] `text-align: center`
- [ ] `<align>`
- [ ] `<middle>`
- [ ] `position: center`
خاصية CSS.

### ليه اتحذف `<center>`؟
- [ ] بطيء
- [x] تنسيق بحت والـ CSS بيعمله
- [ ] مش معروف
- [ ] بيبوّظ الصفحة
الفصل بين المحتوى والشكل.

## refs

- [MDN: center](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/center)
