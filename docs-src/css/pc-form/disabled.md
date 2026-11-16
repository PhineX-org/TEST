---
id: disabled
kind: pseudoclass
cat: pc-form
chip: :disabled
title: عنصر معطّل
en: CSS :disabled pseudo-class
status: stable
support: all
mdn: :disabled
summary: الحالة disabled بتنطبق على عناصر النماذج المعطّلة بخاصية disabled. تُستخدم لتنسيق الأزرار والحقول غير النشطة.
keywords: :disabled, disabled, معطل, زرار, input, غير نشط
related: enabled, read-only, cursor, opacity, pointer-events, pseudo-guide
---

## intro

`:disabled` بتنطبق على **عناصر النماذج اللي عليها الخاصية `disabled`** (زي `<button disabled>` و`<input disabled>` و`<select disabled>`). العنصر المعطّل **مبيستقبلش ضغط ولا تركيز ولا بياناته بتتبعت** مع النموذج.

بتستخدمها عشان تبيّن **بصرياً** إن العنصر غير متاح: لون باهت، مؤشر ماوس `not-allowed`، وإزالة تأثيرات الـ hover. من غير تنسيق المتصفح بيدّي شكل رمادي افتراضي، لكنك غالباً هتخصّصه ليتماشى مع التصميم.

نصايح:
- **التباين**: العنصر المعطّل معفى من اشتراطات التباين الصارمة، لكن خلّيه **مقروء** بشكل معقول.
- لو عايز **تفرّق** بين الزرار المعطّل والتاني استخدم `button:disabled`، وللحالة المعاكسة [[enabled]].
- للحقول اللي تقرأ فقط ولسه بتتبعت بياناتها استخدم `readonly` و[[read-only]] مش disabled.
- لا تعتمد على اللون وحده؛ ضيف وصف (نص «غير متاح»).

## try

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; margin:3px; }
  button:disabled { background:#d8cbb0; color:#8a7a62; cursor:not-allowed; }
</style>
<button>متاح</button><button disabled>معطّل</button>
```

## syntax

```css nolive
button:disabled { opacity: .5; cursor: not-allowed; }
input:disabled { background: #eee; }
fieldset:disabled { }
```

- عناصر النماذج فقط.
- بتتجاهل الضغط والتركيز.

## use

- تنسيق أزرار الإرسال قبل اكتمال النموذج.
- حقول غير متاحة حالياً.
- fieldset كامل معطّل.

## avoid

- الاعتماد على اللون فقط.
- استخدام disabled للحقول اللي لازم تتبعت بياناتها (استخدم readonly).

## examples

### 1) زرار معطّل
رمادي بمؤشر ممنوع.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; }
  button:disabled { background:#d8cbb0; color:#8a7a62; cursor:not-allowed; }
</style>
<button disabled>إرسال</button>
```



### 2) حقل معطّل
خلفية باهتة.

```html
<style>
  input { padding:8px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; }
  input:disabled { background:#e8dcc2; color:#8a7a62; border-style:dashed; }
</style>
<input disabled value="حقل معطّل">
```



### 3) fieldset معطّل
كل اللي جواه يتعطّل.

```html
<style>
  fieldset { border:2px solid #bda27a; border-radius:8px; color:#3d2c18; }
  fieldset:disabled { opacity:.5; }
  input { padding:6px; margin:3px; }
</style>
<fieldset disabled><legend>مجموعة</legend><input placeholder="1"><input placeholder="2"></fieldset>
```



### 4) مقارنة مع enabled
تنسيق الحالتين.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; font-weight:bold; margin:3px; }
  button:enabled { background:#c9772f; color:#f3ede0; cursor:pointer; }
  button:disabled { background:#d8cbb0; color:#8a7a62; cursor:not-allowed; }
</style>
<button>نشط</button><button disabled>معطّل</button>
```



## mistakes

### الاعتماد على اللون فقط

```css bad
button:disabled { color:#ccc; }
```

```css good
button:disabled { color:#8a7a62; }
/* وضيف نص يوضّح السبب */
```

متأكد إنه مقروء.

### disabled لحقل لازم يتبعت

```css bad
<input disabled value="123">  /* مبيتبعتش */
```

```css good
<input readonly value="123">
```

readonly بيتبعت.

## quiz

### disabled بتنطبق على؟
- [x] عناصر النماذج المعطّلة
- [ ] أي عنصر
- [ ] الصور
- [ ] الروابط

عناصر النماذج.

### العنصر المعطّل بيتبعت مع النموذج؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط الأزرار

لأ.

### لحقل مقروء فقط ويتبعت؟
- [x] readonly
- [ ] disabled
- [ ] hidden
- [ ] none

readonly.

## refs

- [MDN: :disabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled)
