---
id: root
kind: pseudoclass
cat: pc-structure
chip: :root
title: عنصر الجذر
en: CSS :root pseudo-class
status: stable
support: all
mdn: :root
summary: الحالة root بتختار عنصر الجذر في المستند (html). مكان المتغيّرات العامة (CSS variables) وإعدادات الصفحة الأساسية.
keywords: :root, root, html, متغيرات, CSS variables, --color, الجذر
related: variables-guide, fn-var, color-scheme, font-size, pseudo-guide
---

## intro

`:root` بتختار **عنصر الجذر** في المستند، وفي صفحات HTML ده هو وسم `<html>`. يعني `:root` و`html` بيختاروا نفس العنصر، لكن `:root` ليها **specificity أعلى** (لأنها pseudo-class) فبتغلب `html` لو الاتنين اتكتبوا.

استخدامها الأشهر بلا منازع: **تعريف المتغيّرات العامة (CSS Custom Properties)**: `:root { --main: #c9772f; }`، فتبقى متاحة لكل عناصر الصفحة عن طريق [[fn-var]]: `color: var(--main)`. وده بيخلّي تغيير ثيم الموقع كله تغيير سطر واحد (زي ما موقعنا بيعمل بين dusk وpaper وsepia).

استخدامات تانية:
- ضبط **حجم الخط الأساسي** للـ rem: `:root { font-size: 100%; }`.
- ضبط [[color-scheme]] للصفحة كلها.
- تعريف `scroll-behavior` و`accent-color` العامين.

عشان تتجنب التعارض، حط المتغيّرات في `:root` والتنسيقات الفعلية في عناصرها.

> [!analogy] `:root` زي «جذر الشجرة»: أي حاجة تحطها فيه بتوصل لكل الفروع (العناصر) تحته بالوراثة.

## try

```html
<style>
  :root { --main:#c9772f; --bg:#efe0bd; }
  .box { background:var(--bg); color:#3d2c18; padding:10px; border-inline-start:6px solid var(--main); border-radius:6px; }
</style>
<div class="box">اللون ده جاي من متغيّر في :root</div>
```

## syntax

```css nolive
:root {
  --main: #c9772f;
  --radius: 8px;
  font-size: 100%;
}
button { background: var(--main); border-radius: var(--radius); }
```

- بتختار html.
- أعلى specificity من html.
- مكان المتغيّرات العامة.

## use

- تعريف CSS variables للثيم.
- ضبط حجم الخط الأساسي.
- color-scheme للصفحة.

## avoid

- كتابة تنسيقات عنصر فعلية في :root.
- تكرار تعريف نفس المتغيّر في أماكن كتير.

## examples

### 1) متغيّرات عامة
مرة واحدة وتستخدمها كل مكان.

```html
<style>
  :root { --brand:#7a4a1d; --soft:#efe0bd; }
  .a { background:var(--brand); color:var(--soft); padding:8px; border-radius:6px; }
  .b { background:var(--soft); color:var(--brand); padding:8px; border-radius:6px; margin-top:4px; }
</style>
<div class="a">خلفية brand</div><div class="b">خلفية soft</div>
```



### 2) غيّر القيمة مرة واحدة
تتغير في كل مكان.

```html
<style>
  :root { --brand:#3d7a5a; }
  .a, .b { padding:8px; margin:3px 0; border-radius:6px; background:var(--brand); color:#f3ede0; }
</style>
<div class="a">أول</div><div class="b">تاني</div>
```



### 3) root مقابل html
root أقوى.

```html
<style>
  html { --c:#b5551f; }
  :root { --c:#3d7a5a; }
  .t { color:var(--c); font-weight:bold; }
</style>
<div class="t">اللون أخضر (root بتغلب)</div>
```



### 4) حجم الخط للـ rem
تكبير الصفحة كلها.

```html
<style>
  :root { font-size:100%; }
  .t { font-size:1.2rem; color:#3d2c18; }
</style>
<div class="t">1.2rem من الجذر</div>
```



## mistakes

### تنسيق عنصر فعلي في root

```css bad
body, :root { background:red; }
```

```css good
body { background:var(--bg); }
:root { --bg:#efe0bd; }
```

root للمتغيّرات.

### متغيّر مكتوب بدون --

```css bad
root { main:#c9772f; }
```

```css good
root { --main:#c9772f; }
```

لازم --.

## quiz

### :root بتختار؟
- [x] عنصر html
- [ ] body
- [ ] أي عنصر
- [ ] الصورة

الجذر.

### الاستخدام الأشهر؟
- [x] تعريف CSS variables
- [ ] ظل
- [ ] حد
- [ ] حجم صورة

المتغيّرات العامة.

### مين أعلى specificity؟
- [x] :root
- [ ] html
- [ ] متساويين
- [ ] body

pseudo-class.

## refs

- [MDN: :root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
