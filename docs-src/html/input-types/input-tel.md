---
id: input-tel
kind: inputtype
cat: input-types
chip: type="tel"
title: حقل رقم التليفون
en: <input type="tel">
status: stable
support: all
mdn: Elements/input/tel
summary: type="tel" بيفتح لوحة أرقام التليفون على الموبايل، لكنه مش بيفحص الشكل لأن أرقام التليفونات مختلفة من بلد لبلد. استخدم pattern لو عايز قاعدة معيّنة.
keywords: input tel, تليفون, رقم موبايل, pattern, autocomplete tel, inputmode, لوحة أرقام, مفتاح الأرقام
related: input, input-number, attr-pattern, attr-autocomplete, attr-inputmode, form
---

## intro

حقل مخصّص لأرقام التليفون. أهم فايدة ليه: على الموبايل بيفتح **لوحة أرقام التليفون** (الأرقام + `+` و`*` و`#`) بدل الكيبورد العادي، فالمستخدم يكتب أسرع بكتير. لكن على الكمبيوتر هو **شبه حقل نص عادي**.

المفاجأة اللي بتصدم المبتدئين: المتصفح **مبيفحصش** الشكل خالص. السبب إن أرقام التليفونات بتختلف جداً حسب الدولة (طول، مسافات، شرطات، كود دولة)، ومفيش قاعدة عالمية. فلو عايز تفرض شكل معيّن (مثلاً موبايل مصري: `01` وبعدها 9 أرقام) لازم تستخدم [[attr-pattern]]. وخلّي بالك: **التليفون مش رقم رياضي**، فمتستخدمش `type="number"` معاه (هيشيل الصفر اللي في الأول ويضيف أسهم الزيادة).

## try

```html
<label>موبايلك: <input id="t" type="tel" name="phone" placeholder="01012345678" pattern="01[0125][0-9]{8}" title="رقم موبايل مصري: 11 رقم يبدأ بـ 01" autocomplete="tel"></label>
<button onclick="o.textContent = t.checkValidity() ? 'رقم صحيح ✅' : 'غلط ❌'">افحص</button>
<p id="o"></p>
```

## syntax

```html nolive
<input type="tel" name="phone" autocomplete="tel" pattern="01[0125][0-9]{8}">
```

- `type="tel"` — لوحة أرقام التليفون.
- `pattern` — هو اللي بيفرض الشكل.
- `autocomplete="tel"` — تعبئة تلقائية.

## use

- أرقام الموبايل في التسجيل والتواصل.
- نماذج الطلب والتوصيل.
- أي رقم هو في الحقيقة "نص" مش حسابي.

## avoid

- متستخدمش `type="number"` للتليفون.
- متفترضش إن المتصفح هيفحص الشكل لوحده.

## examples

### 1) موبايل مصري
pattern للرقم.

```html
<input type="tel" pattern="01[0125][0-9]{8}" placeholder="01XXXXXXXXX" title="11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015" required>
```

- `01` ثم الشبكة (0 أو 1 أو 2 أو 5) ثم 8 أرقام.
- التلميح في `title` بيظهر في رسالة الخطأ.
- عدّل النمط حسب بلدك.

### 2) كود دولة
رقم دولي.

```html
<input type="tel" pattern="\+[0-9]{10,14}" placeholder="+201012345678" title="رقم دولي يبدأ بـ +" size="18">
```

- الرقم الدولي بيبدأ بـ `+`.
- الطول بيتغيّر من دولة لدولة.
- استخدم مكتبة لو محتاج دقة عالية.

### 3) تنسيق أثناء الكتابة
إزالة غير الأرقام.

```html
<input type="tel" oninput="this.value = this.value.replace(/[^0-9+]/g, '')" placeholder="أرقام بس">
```

- الكود بيمسح أي حرف مش رقم.
- ده راحة للمستخدم مش بديل للفحص.
- احتفظ بـ `pattern` برضه.

### 4) رابط اتصال
مثال على tel: link.

```html
<input id="t" type="tel" value="+201012345678">
<button onclick="location.href='tel:' + t.value">اتصل</button>
```

- الرابط `tel:` بيفتح تطبيق الاتصال على الموبايل.
- القيمة بتتاخد من الحقل.
- جرّبه على جهاز فيه مكالمات.

## mistakes

### type="number" للتليفون
```html bad
<input type="number" name="phone" value="01012345678">
```
```html good
<input type="tel" name="phone" value="01012345678">
```
ليه؟ النوع number بيشيل الصفر الأول وبيضيف أسهم ملهاش لازمة.

### افتراض فحص تلقائي
```html bad
<input type="tel" name="phone" required>
```
```html good
<input type="tel" name="phone" required pattern="01[0125][0-9]{8}">
```
ليه؟ من غير `pattern` أي نص هيعدّي، حتى حروف.

## a11y

- اكتب صيغة الرقم المطلوبة في label أو نص مساعد.
- لوحة الأرقام على الموبايل بتساعد ذوي صعوبات الكتابة.
- اسمح بمسافات وشرطات واشيلها في السيرفر.

## quiz

### هل `type="tel"` بيفحص شكل الرقم؟
- [x] لأ، لازم pattern
- [ ] أيوه
- [ ] للأرقام المصرية بس
- [ ] لو فيه +
مفيش فحص تلقائي.

### ليه مش `number` للتليفون؟
- [x] بيشيل الصفر الأول
- [ ] أبطأ
- [ ] مش بيشتغل
- [ ] بيفتح كاميرا
التليفون نص مش حساب.

### الفايدة الأساسية لـ tel؟
- [x] لوحة أرقام على الموبايل
- [ ] فحص تلقائي
- [ ] اتصال تلقائي
- [ ] تشفير
كيبورد مناسب.

## refs

- [MDN: tel](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/tel)
- [WHATWG: Telephone state](https://html.spec.whatwg.org/multipage/input.html#telephone-state-(type=tel))
