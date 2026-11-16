---
id: focus-visible
kind: pseudoclass
cat: pc-user
chip: :focus-visible
title: التركيز بالكيبورد
en: CSS :focus-visible pseudo-class
status: stable
support: all
mdn: :focus-visible
summary: الحالة focus-visible بتنطبق على التركيز اللي المتصفح شايف إنه محتاج إطار (غالباً بالكيبورد). الأحسن من focus للأزرار والروابط.
keywords: :focus-visible, focus-visible, كيبورد, outline, وصولية, tab
related: focus, focus-within, outline, outline-offset, pseudo-guide
---

## intro

`:focus-visible` هي **النسخة الذكية** من `:focus`. بتنطبق بس لما المتصفح يشوف إن المستخدم **محتاج يشوف إطار التركيز**، وده غالباً بيحصل لما يتنقل **بالكيبورد (Tab)**، لكن **مبتنطبقش** لما يضغط على زرار بالماوس. ليه ده حلو؟ لأن الإطار بيطلع للي محتاجه (مستخدم الكيبورد) ومبيزعجش اللي بيستخدم الماوس.

بدل ما تكتب `button:focus { outline: ... }` وبعدين تلاقي الإطار بيظهر لما تضغط بالماوس وده بيضايق المصممين، اكتب `button:focus-visible { outline: ... }` ويبقى الكل مبسوط.

الاستثناء: في **حقول الكتابة** (input وtextarea) المتصفحات بتطبّقها دايماً حتى بالماوس، لأن المستخدم هيكتب.

دعمها حديث وواسع. ولو عايز احتياط للمتصفحات القديمة جداً استخدم `:focus:not(:focus-visible)` لإزالة التنسيق عن الماوس.

> [!tip] اعتمد `:focus-visible` كحلقة التركيز الافتراضية لكل الأزرار والروابط في مشروعك.

## try

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; margin:2px; }
  button:focus-visible { outline:3px solid #7a4a1d; outline-offset:3px; }
</style>
<button>اضغط بالماوس (بدون إطار)</button> <button>اضغط Tab (بإطار)</button>
```

## syntax

```css nolive
:focus-visible { outline: 3px solid #c9772f; outline-offset: 2px; }
button:focus:not(:focus-visible) { outline: none; }
```

- بتنطبق غالباً مع الكيبورد.
- في input وtextarea بتنطبق دايماً.

## use

- حلقة تركيز الأزرار والروابط.
- تنسيق وصولية بدون إزعاج الماوس.
- تصميم نظام تركيز موحّد.

## avoid

- افتراض إنها بتنطبق مع الماوس.
- إزالة التركيز تماماً.

## examples

### 1) زرار
إطار للكيبورد فقط.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; }
  button:focus-visible { outline:3px solid #7a4a1d; outline-offset:3px; }
</style>
<button>جرّب Tab</button>
```



### 2) رابط
حلقة مرنة.

```html
<style>
  a { color:#7a4a1d; font-weight:bold; padding:4px 8px; border-radius:6px; }
  a:focus-visible { outline:2px dashed #c9772f; outline-offset:2px; background:#efe0bd; }
</style>
<a href="#" onclick="return false">رابط</a>
```



### 3) احتياط
focus:not(focus-visible).

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
  button:focus { outline:3px solid #7a4a1d; outline-offset:3px; }
  button:focus:not(:focus-visible) { outline:none; }
</style>
<button>احتياط</button>
```



### 4) حقل نص
دايماً بيظهر مع الكتابة.

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  input:focus-visible { outline:3px solid #c9772f; outline-offset:2px; }
</style>
<input placeholder="اضغط واكتب">
```



## mistakes

### focus بدل focus-visible

```css bad
button:focus { outline:3px solid blue; }  /* بيطلع مع الماوس */
```

```css good
button:focus-visible { outline:3px solid blue; }
```

أنسب للأزرار.

### إزالة التركيز كله

```css bad
button:focus-visible { outline:none; }
```

```css good
button:focus-visible { outline:3px solid #c9772f; }
```

مستخدم الكيبورد محتاجه.

## quiz

### focus-visible بتظهر إمتى؟
- [x] غالباً مع الكيبورد
- [ ] مع الماوس فقط
- [ ] دايماً
- [ ] أبداً

لما التركيز مرئي.

### مميزتها على focus؟
- [x] مبتزعجش مستخدم الماوس
- [ ] أسرع
- [ ] تدعم الألوان
- [ ] تعمل ظل

إطار للي محتاجه.

### في input وtextarea؟
- [x] بتظهر دايماً
- [ ] أبداً
- [ ] بالكيبورد فقط
- [ ] مع hover

لأن المستخدم هيكتب.

## refs

- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
