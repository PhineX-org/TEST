---
id: focus
kind: pseudoclass
cat: pc-user
chip: :focus
title: التركيز على العنصر
en: CSS :focus pseudo-class
status: stable
support: all
mdn: :focus
summary: الحالة focus بتنطبق لما العنصر ياخد التركيز (بالنقر أو Tab). مهمة جداً للكيبورد وقارئ الشاشة، وممنوع تشيل الإطار بدون بديل.
keywords: :focus, focus, تركيز, outline, كيبورد, input, وصولية
related: focus-visible, focus-within, outline, hover, css-best-practices, pseudo-guide
---

## intro

`:focus` هي **حالة** بتنطبق على العنصر **اللي عليه التركيز دلوقتي**، يعني اللي هيستقبل الكتابة أو الضغط على Enter. بيحصل التركيز لما المستخدم **يضغط على حقل** أو **يتنقل بـ Tab**. المتصفح بيرسم افتراضياً **إطار (outline)** حوالين العنصر المتركز عليه.

**ده مهم جداً للوصولية**: ناس كتير بتستخدم الكيبورد بس (إعاقة حركية، قارئ شاشة) ومحتاجة تشوف «أنا فين» في الصفحة. **متشيلش** الإطار (`outline: none`) من غير ما تحط بديل واضح، دي من أكبر أخطاء الوصولية.

نصائح:
- استخدم `:focus` لتنسيق حقول الإدخال (لون حد مميز وظل خفيف).
- لو الإطار بيزعجك لما تضغط بالماوس بس، استخدم [[focus-visible]] بدل focus.
- للتركيز على أي ابن داخل حاوية استخدم [[focus-within]].
- بتشتغل على العناصر القابلة للتركيز: `input` و`button` و`a[href]` و`select` و`textarea` وأي عنصر عليه `tabindex`.

> [!warn] `outline: none` بدون بديل = المستخدم بالكيبورد تايه. لو شلته، حط `box-shadow` أو `border` واضح مكانه.

## try

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; transition:border-color .2s, box-shadow .2s; }
  input:focus { outline:none; border-color:#c9772f; box-shadow:0 0 0 3px rgba(201,119,47,.35); }
</style>
<input placeholder="اضغط هنا واكتب">
```

## syntax

```css nolive
input:focus { border-color: #c9772f; }
button:focus { outline: 3px solid #c9772f; outline-offset: 2px; }
```

- بتنطبق على العنصر المتركز عليه حالياً.
- لا تشيل outline بدون بديل.

## use

- تمييز حقول النماذج عند الكتابة.
- إظهار حلقة تركيز واضحة للكيبورد.
- تغيير شكل الأزرار عند Tab.

## avoid

- outline:none بدون بديل.
- الاعتماد على hover فقط.

## examples

### 1) حقل بحد مميز
حد وظل عند التركيز.

```html
<style>
  input { padding:8px 12px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; font-size:1rem; transition:all .2s; }
  input:focus { outline:none; border-color:#3d7a5a; box-shadow:0 0 0 3px rgba(61,122,90,.3); }
</style>
<input placeholder="اكتب اسمك">
```



### 2) حلقة تركيز لزرار
للتنقل بـ Tab.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
  button:focus { outline:3px solid #7a4a1d; outline-offset:3px; }
</style>
<button>اضغط Tab عليّ</button>
```



### 3) رابط
تمييز رابط عند التركيز.

```html
<style>
  a { color:#7a4a1d; font-weight:bold; padding:4px 6px; }
  a:focus { background:#efe0bd; outline:2px solid #c9772f; border-radius:4px; }
</style>
<a href="#" onclick="return false">اضغط Tab لهنا</a>
```



### 4) تنسيق textarea
تكبير عند التركيز.

```html
<style>
  textarea { width:90%; padding:8px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; transition:all .3s; }
  textarea:focus { outline:none; border-color:#c9772f; background:#fff7e6; }
</style>
<textarea rows="2" placeholder="اكتب رسالتك"></textarea>
```



## mistakes

### إزالة الإطار تماماً

```css bad
*:focus { outline:none; }
```

```css good
input:focus { outline:none; box-shadow:0 0 0 3px rgba(201,119,47,.4); }
```

لازم بديل مرئي.

### تنسيق focus لعنصر مش قابل للتركيز

```css bad
div:focus { }  /* لا يتركز */
```

```css good
div[tabindex="0"]:focus { }
```

العنصر لازم يكون قابل للتركيز.

## quiz

### focus بتنطبق على؟
- [x] العنصر المتركز عليه
- [ ] أي عنصر
- [ ] الصفحة
- [ ] الصورة فقط

اللي عليه التركيز.

### خطأ شائع؟
- [x] outline:none بدون بديل
- [ ] استخدام box-shadow
- [ ] استخدام border
- [ ] استخدام outline

مشكلة وصولية.

### للتركيز بالكيبورد فقط؟
- [x] focus-visible
- [ ] hover
- [ ] active
- [ ] link

focus-visible.

## refs

- [MDN: :focus](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus)
