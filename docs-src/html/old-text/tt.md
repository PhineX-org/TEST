---
id: tt
kind: element
cat: old-text
tag: tt
title: خط الآلة الكاتبة (tt)
en: HTML tt element (deprecated)
status: deprecated
display: inline
void: no
support: all
size: compact
summary: عنصر tt كان بيعرض النص بخط ثابت العرض (آلة كاتبة). اتحذف لأنه تنسيق بحت، والبديل عناصر دلالية زي code وkbd وsamp وvar، أو CSS font-family monospace.
keywords: tt, teletype, آلة كاتبة, monospace, خط ثابت, كود, code, kbd, samp, قديم, deprecated
related: code, kbd, samp, var, pre
---

## intro

`<tt>` اسمه اختصار **Teletype** (الآلة الكاتبة عن بعد). كان بيعرض النص بخط **ثابت العرض** (كل حرف بنفس العرض) زي الكود. استخدموه في أيامه لأي حاجة «تقنية» الشكل: كود، أوامر، مخرجات.

المشكلة إنه **بيوصف الشكل مش المعنى**: هل اللي جواه كود؟ ولا زرار لوحة مفاتيح؟ ولا ناتج برنامج؟ HTML5 قسّمت المعنى ده لعناصر دلالية واضحة: [[code]] للكود، [[kbd]] لمدخلات الكيبورد، [[samp]] لمخرجات البرنامج، [[var]] للمتغيرات. وكلها بتظهر بخط ثابت العرض افتراضياً. ولو الغرض شكل بس: `font-family: monospace` بـ CSS.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<tt>` = خط ثابت العرض بدون معنى. اختار `<code>` أو `<kbd>` أو `<samp>` أو `<var>` حسب المعنى.

## try

```html
<p>الأمر: <tt>npm install</tt> وبعدها <tt>npm start</tt></p>
```

## syntax

```html nolive
<tt>نص بخط آلة كاتبة</tt>
```

- `<tt>` — **الوسم الافتتاحي** (قديم).
- النص — **بيتعرض بخط ثابت العرض**.
- `</tt>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة محتاج تفهمها.
- لفهم الفرق بين التنسيق والمعنى.

## avoid

- متستخدمهوش: `<code>` وأخواته أدق وأنضف.

## instead

اختار العنصر حسب المعنى: [[code]] للكود، [[kbd]] لما المستخدم يكتب أو يدوس، [[samp]] لناتج البرنامج، [[var]] لمتغير. ولو شكل بس: `font-family: monospace`.

```html
<p>الأمر: <code>npm install</code> وبعدها <code>npm start</code></p>
```

## examples

### 1) tt مقابل code
نفس الشكل.

```html
<p>القديم: <tt>let x = 5;</tt></p>
<p>الحديث: <code>let x = 5;</code></p>
```

- الاتنين بيظهروا بخط ثابت العرض.
- `<code>` بيقول لقارئ الشاشة ومحركات البحث إن ده كود.
- الانتقال بسيط: غيّر الاسم.

### 2) اختيار العنصر حسب المعنى
kbd وsamp وvar.

```html
<p>دوس <kbd>Ctrl</kbd> + <kbd>C</kbd> لنسخ النص.</p>
<p>البرنامج هيكتب: <samp>تم الحفظ بنجاح</samp></p>
<p>المعادلة: <var>x</var> + <var>y</var> = 10</p>
```

- `<kbd>` لمدخلات المستخدم من الكيبورد.
- `<samp>` لمخرجات البرنامج.
- `<var>` لمتغير في معادلة أو كود.

### 3) الشكل فقط بـ CSS
font-family.

```html
<style>.mono { font-family: ui-monospace, Menlo, Consolas, monospace; background:#f1f5f9; padding:2px 6px; border-radius:4px }</style>
<p>كود <span class="mono">a + b</span> شكلي بدون معنى برمجي.</p>
```

- لو مفيش معنى «كود» حقيقي استخدم class مع `font-family: monospace`.
- بنضيف خلفية وحشو عشان الشكل يتميز.
- تفضّل العناصر الدلالية لو في معنى.

## mistakes

### tt للكود
```html bad
<tt>console.log("hi")</tt>
```
```html good
<code>console.log("hi")</code>
```
ليه؟ الكود له عنصره الخاص، و`<tt>` محذوف من المعيار.

## quiz

### إيه البديل الأنسب لكود برمجي بدل `<tt>`؟
- [x] `<code>`
- [ ] `<b>`
- [ ] `<small>`
- [ ] `<mark>`
عنصر دلالي للكود.

### إمتى نستخدم `<kbd>`؟
- [x] لمدخلات الكيبورد
- [ ] لمخرجات البرنامج
- [ ] للمتغيرات
- [ ] للعناوين
`<kbd>` للمفاتيح اللي المستخدم بيدوسها.

## refs

- [MDN: tt](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tt)
