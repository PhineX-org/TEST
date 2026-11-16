---
id: focus-within
kind: pseudoclass
cat: pc-user
chip: :focus-within
title: التركيز داخل الحاوية
en: CSS :focus-within pseudo-class
status: stable
support: all
mdn: :focus-within
summary: الحالة focus-within بتنطبق على الأب لو هو أو أي ابن جواه متركز عليه. ممتازة لتمييز مجموعة حقول أو قايمة بالكيبورد.
keywords: :focus-within, focus-within, حاوية, تركيز الأبناء, form group, search box
related: focus, focus-visible, hover, has, pseudo-guide
---

## intro

`:focus-within` بتنطبق على **العنصر الأب** لو **هو نفسه أو أي حاجة جواه** متركز عليها. يعني لو عندك `div` فيه `input`، وضغطت على الـ input، الـ `div` ياخد حالة `:focus-within`.

دي حاجة **كانت مستحيلة بدون JavaScript** قبل كده: تمييز **الحاوية كلها** لما حقل جواها يتركز. استخدامات رائعة:
- **مربع بحث**: الإطار الخارجي (اللي حواليه الأيقونة والحقل) يتلوّن لما تكتب.
- **مجموعة حقول**: تمييز بطاقة النموذج اللي بتشتغل عليها.
- **قوائم منسدلة بالكيبورد**: تخلي القايمة تفضل مفتوحة طول ما التركيز جواها (`.menu:focus-within .sub { display: block; }`).

بتكمّل [[hover]] في القوايم عشان تشتغل بالكيبورد كمان. وبديل حديث ليها: [[has]] مع `:has(:focus)`. وهي مدعومة في كل المتصفحات الحديثة.

## try

```html
<style>
  .box { display:flex; gap:6px; align-items:center; padding:6px 10px; border:2px solid #bda27a; border-radius:10px; background:#f3ede0; transition:all .2s; width:220px; }
  .box:focus-within { border-color:#c9772f; box-shadow:0 0 0 3px rgba(201,119,47,.3); }
  input { border:0; outline:0; background:transparent; color:#3d2c18; flex:1; font-size:1rem; }
</style>
<div class="box">🔍 <input placeholder="ابحث..."></div>
```

## syntax

```css nolive
.search:focus-within { border-color: #c9772f; }
.menu:focus-within .sub { display: block; }
```

- الأب هو اللي بياخد الحالة.
- بتشمل أي مستوى نسل.

## use

- تمييز مربع البحث كله.
- تمييز مجموعة حقول.
- قوايم تفتح بالكيبورد.

## avoid

- استخدامها على عناصر مفيهاش حقول قابلة للتركيز.
- نسيان إن الحالة بتشمل أي مستوى نسل (ممكن تنطبق أكتر مما تتوقع).

## examples

### 1) مربع بحث
الحاوية تتلوّن.

```html
<style>
  .box { display:flex; gap:6px; align-items:center; padding:6px 10px; border:2px solid #bda27a; border-radius:10px; background:#f3ede0; transition:all .2s; }
  .box:focus-within { border-color:#3d7a5a; box-shadow:0 0 0 3px rgba(61,122,90,.3); }
  input { border:0; outline:0; background:transparent; color:#3d2c18; flex:1; }
</style>
<div class="box">🔍 <input placeholder="ابحث"></div>
```



### 2) بطاقة نموذج
تتميز وأنت بتكتب.

```html
<style>
  .card { padding:10px; border-radius:10px; background:#efe0bd; border:2px solid transparent; transition:all .25s; }
  .card:focus-within { background:#fff3d6; border-color:#c9772f; }
  input { padding:6px; border:1px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px 0; }
</style>
<div class="card"><label>الاسم<br><input></label><br><label>الإيميل<br><input></label></div>
```



### 3) قايمة بالكيبورد
تفضل مفتوحة مع التركيز.

```html
<style>
  .m { position:relative; display:inline-block; }
  .m .sub { display:none; padding:6px; background:#7a4a1d; color:#f3ede0; border-radius:6px; margin-top:4px; }
  .m:focus-within .sub, .m:hover .sub { display:block; }
  button { padding:6px 14px; border:0; border-radius:6px; background:#c9772f; color:#f3ede0; font-weight:bold; }
</style>
<div class="m"><button>القايمة</button><div class="sub">خيار 1<br>خيار 2</div></div>
```



### 4) نموذج بتسمية
التسمية تتلوّن مع الحقل.

```html
<style>
  .f { padding:8px; border-radius:8px; color:#3d2c18; }
  .f label { display:block; color:#8a7a62; transition:color .2s; }
  .f:focus-within label { color:#b5551f; font-weight:bold; }
  input { padding:6px; border:1px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
</style>
<div class="f"><label>اسم المستخدم</label><input></div>
```



## mistakes

### الخلط مع focus

```css bad
.box:focus { }  /* الأب مبيتركزش */
```

```css good
.box:focus-within { }
```

focus-within للأب.

### توقع تأثير على عنصر بلا أبناء قابلين للتركيز

```css bad
.p:focus-within { }  /* مفيش input */
```

```css good
.p:has(:focus) { }  /* أو ضيف tabindex */
```

لازم عنصر قابل للتركيز جواها.

## quiz

### focus-within بتنطبق على؟
- [x] الأب لما ابن يتركز
- [ ] الابن فقط
- [ ] الصفحة
- [ ] الصورة

الأب.

### بدون JS كانت مستحيلة؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط في Chrome

كانت محتاجة JS.

### المحدد المناسب لمربع بحث كله؟
- [x] .box:focus-within
- [ ] .box:hover
- [ ] .box:target
- [ ] .box:link

الأب بيتلوّن.

## refs

- [MDN: :focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
