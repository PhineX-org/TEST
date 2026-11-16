---
id: attr-type
kind: attribute
cat: attrs
chip: type
title: خاصية النوع
en: HTML type attribute
status: stable
support: all
mdn: Elements/input#type
summary: خاصية type بتحدد نوع العنصر: في input نوع الحقل (text, email…)، في button سلوك الزرار (submit, button, reset)، في script نوع الكود (module)، وفي ol نوع الترقيم.
keywords: type, input type, button type, script type module, ol type, نوع, submit, button, reset, text, email, source type, link type
related: input, button, script, ol, source, link
---

## intro

الخاصية `type` اسم متكرر بيظهر في عناصر مختلفة بمعاني مختلفة، والمعنى العام: **«نوع الحاجة دي إيه؟»**. أشهر استخداماتها:

**في [[input]]:** نوع الحقل: `text` و`email` و`password` و`number` و`date` و`checkbox` و`radio` و`file` و`submit` وغيرها (في قسم «أنواع حقل input» في الموسوعة صفحة لكل واحد). لو متكتبتش، الافتراضي `text`. **في [[button]]:** سلوك الزرار: `submit` (الافتراضي، بيبعت الفورم) و`button` (بدون سلوك) و`reset`. **في [[script]]:** `type="module"` لوحدات ES، أو `application/json` لبيانات. **في [[ol]]:** شكل الترقيم (`1` و`a` و`A` و`i` و`I`). **في [[source]] و[[link]]:** نوع الملف (MIME) زي `video/mp4` عشان المتصفح يختار الصيغة اللي يدعمها.

أخطر فخ: **زرار `<button>` من غير type داخل form** بيتعامل كـ `submit` وبيبعت الفورم بالغلط. اكتب `type="button"` لو مش عايز إرسال.

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اتبعت'">
  <input type="email" placeholder="إيميل (type=email)">
  <input type="number" placeholder="رقم" style="width:70px">
  <input type="date">
  <button type="button" onclick="o.textContent='زرار عادي'">button</button>
  <button type="submit">submit</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<input type="email">
<button type="button">زرار</button>
<script type="module" src="app.js"></script>
<ol type="a"><li>أ</li></ol>
```

- `input` — نوع الحقل (الافتراضي text).
- `button` — submit أو button أو reset.
- `script` — `module` أو JSON.
- `source/link` — نوع الملف (MIME).

## use

- اختيار نوع حقل input المناسب.
- منع زرار من إرسال الفورم (`type="button"`).
- تحميل سكربت كوحدة (`module`).
- تحديد صيغ فيديو/صوت في `source`.

## avoid

- متنساش `type="button"` للأزرار اللي مش بتبعت جوه الفورم.
- متستخدمش `type="text"` لكل حاجة: النوع المخصّص أفضل.

## examples

### 1) أنواع input
كيبورد وفحص مختلف.

```html
<input type="email" placeholder="email">
<input type="tel" placeholder="tel">
<input type="url" placeholder="url">
<input type="number" placeholder="number" style="width:80px">
<input type="color">
<input type="range">
```

- كل نوع ليه واجهة وفحص.
- الموبايل بيغيّر الكيبورد.
- جرّب الكتابة فيهم.

### 2) الزرار داخل فورم
مثال على button type.

```html
<form onsubmit="event.preventDefault(); o.textContent = 'اتبعت الفورم!'">
  <button type="button" onclick="o.textContent = 'ما اتبعتش'">مش هيبعت</button>
  <button type="submit">هيبعت</button>
  <button>من غير type = submit!</button>
</form>
<p id="o"></p>
```

- الافتراضي submit: فخ شائع.
- `type="button"` آمن.
- `type="reset"` بيرجّع القيم.

### 3) ترقيم القوائم
مثال على ol type.

```html
<ol type="A"><li>HTML</li><li>CSS</li></ol>
<ol type="i"><li>أول</li><li>تاني</li></ol>
```

- `A` حروف كبيرة و`a` صغيرة.
- `I` و`i` أرقام رومانية.
- الأفضل CSS (`list-style-type`) اليوم.

### 4) سكربت كوحدة
مثال على module.

```html
<script type="module">
  const msg = 'مكتوب جوه module'; // modules strict by default
  document.write('<p>' + msg + '</p>');
</script>
```

- `module` بيفعّل `import` و`export`.
- بيتأجّل تلقائياً (زي defer).
- strict mode افتراضياً.

### 5) صيغ الفيديو
مثال على source type.

```html
<video controls width="200">
  <source src="sample.mp4" type="video/mp4">
  <source src="x.webm" type="video/webm">
</video>
```

- المتصفح بيختار أول صيغة بيدعمها.
- `type` بيوفّر تحميل ملف مش مدعوم.
- ترتيب المصادر مهم.

## mistakes

### زرار بدون type داخل form
```html bad
<form><button onclick="clear()">مسح</button></form>
```
```html good
<form><button type="button" onclick="clear()">مسح</button></form>
```
ليه؟ الافتراضي submit: هيبعت الفورم.

### استخدام text للإيميل
```html bad
<input type="text" name="email">
```
```html good
<input type="email" name="email">
```
ليه؟ النوع المخصّص بيدّي فحص وكيبورد مناسب.

## a11y

- النوع الصح بيحسّن الكيبورد والتعبئة التلقائية.
- متغيّرش النوع بالجافاسكربت بشكل مفاجئ.
- الأزرار الحقيقية أفضل من `div` بـ role.

## quiz

### الافتراضي لـ `<button>` داخل form؟
- [x] `submit`
- [ ] `button`
- [ ] `reset`
- [ ] مفيش
فخ شائع.

### الافتراضي لـ `<input>`؟
- [x] `text`
- [ ] `email`
- [ ] `submit`
- [ ] `search`
لو من غير type.

### سكربت بـ import؟
- [x] `type="module"`
- [ ] `type="es"`
- [ ] `type="import"`
- [ ] `type="js"`
وحدات ES.

## refs

- [MDN: type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#type)
- [MDN: button type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
