---
id: variables-guide
kind: guide
cat: start
title: المتغيّرات في CSS
en: CSS custom properties
status: stable
summary: المتغيّرات (Custom Properties) بتخليك تعرّف لون أو حجم مرة واحدة وتستخدمه في كل مكان، وتغيّر ثيم الموقع كله من مكان واحد.
keywords: variables, var, custom properties, --color, متغيرات, ثيم, theme, dark mode, root, تغيير الالوان, design tokens
related: fn-var, root, fn-calc, color-scheme, css-best-practices
---

## intro

تخيّل إنك استخدمت اللون `#b5551f` في 50 مكان، وبعدين عايز تغيّره! هتدوّر وتعدّل 50 مرة. الحل: **المتغيّرات (Custom Properties)**.

بتعرّف المتغيّر بـ `--` في أولها:
`:root { --brand: #b5551f; }` ([[root]] هو عنصر `<html>`، فالمتغيّر متاح في الصفحة كلها).

وتستخدمه بالدالة [[fn-var]]: `color: var(--brand);`. ولو المتغيّر مش موجود تحط قيمة احتياطية: `var(--brand, #333)`.

**الميزة الأقوى**: المتغيّرات **بتتوارث وتتغيّر ديناميكياً**. يعني تقدر تعرّف نسخة تانية من نفس المتغيّر جوه عنصر معيّن (أو تحت `[data-theme="dark"]`) فكل اللي جواه يتغيّر لوحده. ده أساس **الثيمات** (فاتح/غامق) في الموقع ده بالظبط!

وتقدر تغيّرها بالـ JavaScript بـ `el.style.setProperty('--brand','#3d7a5a')`.

> [!analogy] المتغيّر زي «اسم» في جهات الاتصال: بدل ما تكتب الرقم كل مرة، بتكتب «ماما» ولو الرقم اتغيّر بتعدّله مرة واحدة.

> [!tip] اسم المتغيّر حسّاس لحالة الأحرف: `--Brand` غير `--brand`. واختار أسماء بمعنى (`--text`, `--bg`) مش بشكل (`--brown`).

## try

```html
<style>
  .t { --bg:#efe0bd; --fg:#3d2c18; --accent:#b5551f; background:var(--bg); color:var(--fg);
       padding:14px; border-right:6px solid var(--accent); }
</style>
<div class="t">جرّب تغيّر قيمة --accent</div>
```

## syntax

```css nolive
:root {
  --brand: #b5551f;
  --gap: 12px;
}
.card {
  color: var(--brand);
  padding: var(--gap);
  margin: var(--space, 8px); /* قيمة احتياطية */
}
```

- `--اسم` لتعريف المتغيّر، و`var(--اسم)` للاستخدام.
- المتغيّرات بتتوارث للأبناء.

## examples

### 1) تعريف واستخدام
لون واحد معرّف مرة، ومستخدم في مكانين.

```html
<style>
  :root { --brand:#7a4a1d; }
  .a { background:var(--brand); color:#f3ede0; padding:10px; }
  .b { border:3px solid var(--brand); color:var(--brand); padding:10px; margin-top:8px; }
</style>
<div class="a">خلفية</div><div class="b">حد</div>
```

- غيّر `--brand` وشوف الاتنين بيتغيّروا.

### 2) ثيم فاتح وغامق
نفس الكلاسات بتتغيّر شكلها لما نغيّر المتغيّرات.

```html
<style>
  .theme { --bg:#f1e9d9; --fg:#2f2820; background:var(--bg); color:var(--fg); padding:12px; margin:6px 0; }
  .theme.dark { --bg:#1d1916; --fg:#eadfce; }
</style>
<div class="theme">فاتح</div><div class="theme dark">غامق</div>
```

- الموقع ده بيشتغل بنفس الطريقة.

### 3) قيمة احتياطية
لو المتغيّر مش معرّف، بياخد القيمة التانية.

```html
<style>
  .x { color:var(--missing, #3d7a5a); font-size:1.3rem; }
</style>
<p class="x">لون احتياطي</p>
```



### 4) متغيّر محلي
متغيّر معرّف جوه عنصر بيتغيّر شكل أبنائه بس.

```html
<style>
  .card { --c:#b5551f; border:3px solid var(--c); padding:10px; margin:6px 0; color:var(--c); }
  .card.green { --c:#3d7a5a; }
</style>
<div class="card">بني</div><div class="card green">أخضر</div>
```



## mistakes

### نسيان var()

```css bad
.a { color:--brand; }
```

```css good
.a { color:var(--brand); }
```

لازم تستخدم الدالة `var()` علشان تقرا المتغيّر.

### اسم متغيّر بمسافة

```css bad
--brand color: red;
```

```css good
--brand-color: red;
```

اسم المتغيّر مبيقبلش مسافات.

## quiz

### المتغيّر بيتعرّف بـ؟
- [ ] $name
- [x] --name
- [ ] @name
- [ ] var name

بتبدأ بشرطتين.

### المتغيّر المعرّف في :root متاح؟
- [x] في الصفحة كلها
- [ ] في الـ head بس
- [ ] في العنصر نفسه بس
- [ ] في JS بس

الأبناء بيتوارثوه.

### ازاي تحط قيمة احتياطية؟
- [ ] var(--a || red)
- [x] var(--a, red)
- [ ] var(--a) red
- [ ] var(red)

القيمة التانية بعد الفاصلة.

## refs

- [MDN: Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
