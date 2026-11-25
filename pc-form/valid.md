---
id: valid
kind: pseudoclass
cat: pc-form
chip: :valid
title: قيمة صحيحة
en: CSS :valid pseudo-class
status: stable
support: all
mdn: :valid
summary: الحالة valid بتنطبق على الحقول اللي قيمتها بتطابق قواعد التحقق (type وpattern وrequired…). مفيدة لإظهار علامة صح.
keywords: :valid, valid, صحيح, validation, نموذج, تحقق
related: invalid, required, in-range, placeholder-shown, pseudo-guide
---

## intro

`:valid` بتنطبق على **حقل النموذج اللي قيمته صالحة** حسب قواعد التحقق المضمّنة في HTML: النوع (`type="email"`)، و`required`، و`pattern`، و`min/max`، و`minlength`. بتستخدمها عشان تعرض **علامة صح ✓ أو حد أخضر** للمستخدم.

**تحذير مهم**: الحقل الفاضي غير الإجباري **صالح فوراً**، والإجباري الفاضي **غير صالح** من أول لحظة، يعني لو لوّنت `:invalid` بالأحمر هيبان **الأحمر من أول تحميل الصفحة** قبل ما المستخدم يكتب أي حاجة، وده مزعج! الحل الحديث: استخدم `:user-valid` و`:user-invalid` اللي بيشتغلوا **بعد** ما المستخدم يتفاعل مع الحقل، أو استخدم `:not(:placeholder-shown)` مع الحالات ([[placeholder-shown]]).

كمان متنساش إن التحقق من جانب المتصفح **للتجربة فقط** ولازم تتحقق من جهة الخادم دايماً. وفي الوصولية: ضيف رسالة نصية للخطأ، متعتمدش على اللون.

> [!warn] تلوين `:invalid` بالأحمر مباشرة بيخلي كل الحقول الفاضية حمرا عند فتح الصفحة؛ استخدم `:user-invalid` أو `:not(:placeholder-shown):invalid`.

## try

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:not(:placeholder-shown):valid { border-color:#3d7a5a; background:#e6f0dc; }
  input:not(:placeholder-shown):invalid { border-color:#b5551f; background:#fbe3d4; }
</style>
<input type="email" placeholder="اكتب إيميل صحيح">
```

## syntax

```css nolive
input:valid { border-color: #3d7a5a; }
input:not(:placeholder-shown):valid { }
input:user-valid { }
```

- حسب قواعد HTML (type, required, pattern).
- الفاضي الإجباري غير صالح من البداية.

## use

- علامة صح للحقل.
- تلوين حد أخضر.
- رسائل نجاح.

## avoid

- تلوين valid/invalid من أول تحميل.
- الاعتماد على اللون وحده.

## examples

### 1) إيميل
أخضر لو صحيح.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:not(:placeholder-shown):valid { border-color:#3d7a5a; }
</style>
<input type="email" placeholder="ايميلك">
```



### 2) علامة ✓
باستخدام after على حاوية.

```html
<style>
  .f { display:flex; gap:6px; align-items:center; }
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:valid + .ok { opacity:1; } .ok { opacity:0; color:#3d7a5a; font-weight:bold; }
</style>
<div class="f"><input type="email" required placeholder="ايميل"><span class="ok">✓</span></div>
```



### 3) رقم في نطاق
min وmax.

```html
<style>
  input { padding:8px; width:100px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:valid { border-color:#3d7a5a; } input:invalid { border-color:#b5551f; }
</style>
<input type="number" min="1" max="10" value="5">
```



### 4) pattern
نمط محدد.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; direction:ltr; }
  input:not(:placeholder-shown):valid { border-color:#3d7a5a; } input:not(:placeholder-shown):invalid { border-color:#b5551f; }
</style>
<input pattern="[0-9]{4}" placeholder="4 أرقام">
```



## mistakes

### أحمر من البداية

```css bad
input:invalid { border-color:red; }
```

```css good
input:not(:placeholder-shown):invalid { border-color:red; }
```

انتظر تفاعل المستخدم.

### الاعتماد على التحقق من المتصفح فقط

```css bad
<input type="email" required>
```

```css good
// وتحقق من جهة الخادم كمان
```

المتصفح للتجربة فقط.

## quiz

### valid بتنطبق إمتى؟
- [x] القيمة بتطابق القواعد
- [ ] الحقل فاضي
- [ ] الحقل معطّل
- [ ] دايماً

قيمة صالحة.

### المشكلة الشائعة؟
- [x] تلوين أحمر من أول تحميل
- [ ] تلوين أخضر
- [ ] نسيان type
- [ ] نسيان name

الحقول الفاضية غير صالحة.

### البديل الحديث؟
- [x] :user-invalid
- [ ] :hover
- [ ] :root
- [ ] :target

بعد التفاعل.

## refs

- [MDN: :valid](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid)
