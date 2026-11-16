---
id: samp
kind: element
cat: code
tag: samp
title: عنصر خرج البرنامج (samp)
en: HTML sample output element
status: stable
display: inline
void: no
support: all
summary: عنصر samp بيعلّم على خرج (ناتج) برنامج أو رسالة نظام بترجع من الكمبيوتر، زي رسالة خطأ أو نتيجة أمر، وبيظهر بخط ثابت العرض، وده عكس kbd اللي هو مدخلات المستخدم.
keywords: samp, خرج, output, sample output, رسالة خطأ, نتيجة أمر, terminal, console, مخرجات البرنامج
related: kbd, code, var, pre
---

## intro

لما الكمبيوتر أو برنامج يرد عليك برسالة («تم الحفظ بنجاح»، «خطأ 404»، «Hello World»)، الرد ده اسمه **خرج** (Output). العنصر `<samp>` (اختصار **Sample Output**) بيعلّم على الخرج ده: «ده كلام طالع من برنامج، مش كلامي أنا». والمتصفح بيعرضه بخط ثابت العرض (Monospace) زي `<code>`.

فهم الفرق بين التلاتة (`<code>` و`<kbd>` و`<samp>`) أساسي: **`<code>`** للكود نفسه (اللي بتكتبه في الملف)، **`<kbd>`** للمدخلات (اللي المستخدم بيكتبه أو بيضغطه)، **`<samp>`** للمخرجات (اللي البرنامج بيرجّعه). يعني في شرح لأمر Terminal: الأمر اللي بتكتبه `<kbd>`، والرد اللي بيظهر `<samp>`.

بنستخدمه كتير في **التوثيق** و**الدروس**: «لما تشغّل الكود هيظهر: `Hello World`»، أو «لو الرقم غلط هتشوف: `Invalid input`». ومعاه `<pre>` لو الخرج متعدد الأسطر. ممكن كمان تلفّ جزء متغيّر من الخرج بـ `<var>` (زي «الملف `<var>name</var>` مش موجود»).

والتنسيق الافتراضي بسيط (خط ثابت العرض)، وبنضيف بالـ CSS شكل Terminal (خلفية غامقة ونص أخضر مثلاً) للدروس.

> [!analogy] تخيّل بتتكلم مع الصراف الآلي: إنت بتضغط زراير (مدخلات) والجهاز بيطبعلك إيصال (مخرجات). الإيصال المطبوع هو `<samp>`، والزراير اللي ضغطتها `<kbd>`.

> [!key] `<samp>` = **ناتج** البرنامج. المدخلات `<kbd>`، الكود `<code>`.

## try

لاحظ إن الأمر `<kbd>` والرد `<samp>`.

```html
<style>
  pre { background:#0f172a; color:#e2e8f0; padding:10px; border-radius:8px; }
  samp { color:#39ff14; }
  kbd { color:#fbbf24; }
</style>
<pre>$ <kbd>node -v</kbd>
<samp>v22.0.0</samp></pre>
```

## syntax

```html nolive
<p>الناتج: <samp>Hello World</samp></p>
```

- `<samp>` — **الوسم الافتتاحي**.
- النص — الخرج.
- `</samp>` — **الوسم الختامي** إجباري.

## use

- لرسائل الخطأ والنجاح اللي بيطلعها برنامج.
- لنتيجة أمر في Terminal.
- لعرض ناتج كود في درس.
- لسجلات (Logs) مختصرة.

## avoid

- متستخدمهوش لمدخلات المستخدم: `<kbd>`.
- متستخدمهوش للكود: `<code>`.
- متستخدمهوش للتنسيق فقط.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) رسالة خطأ
عرض ناتج.

```html
<p>لو الملف مش موجود هتشوف: <samp>Error: file not found</samp></p>
```

- النص طالع من البرنامج مش مكتوب منك.
- الخط الثابت بيفرّقه عن الكلام العادي.

### 2) ناتج كود
في درس.

```html
<p>اكتب <code>console.log("مرحباً")</code> وهيظهر <samp>مرحباً</samp>.</p>
```

- `<code>` للكود، `<samp>` للناتج.
- الاتنين بنفس الخط لكن بمعاني مختلفة.

### 3) جلسة terminal
مدخل ومخرج.

```html
<pre>$ <kbd>ls</kbd>
<samp>index.html  style.css  app.js</samp></pre>
```

- `<kbd>` للأمر و`<samp>` للرد.
- `<pre>` بيحافظ على الأسطر.
- المستخدم بيشوف الفرق بين اللي كتبه (الأمر) واللي رجع له (الرد).
- ده النمط المعتمد في كل دروس سطر الأوامر.

### 4) جزء متغيّر في الخرج
مع `<var>`.

```html
<p>الرسالة: <samp>الملف <var>filename</var> مش موجود</samp></p>
```

- `<var>` جوه `<samp>` بيعلّم على الجزء المتغيّر.
- ده بيوضّح إن اسم الملف بيتغير حسب الحالة.

### 5) شكل terminal
CSS مخصص.

```html
<style>
  samp { display:block; background:#000; color:#39ff14; padding:8px 12px; border-radius:6px; font-family:monospace; }
</style>
<samp>Build succeeded in 1.2s</samp>
```

- `display:block` عشان الخرج ياخد عرض كامل.
- شكل مألوف في الدروس: خلفية سودا ونص أخضر زي شاشة الـ Terminal.
- التنسيق كله CSS، والعنصر لسه `<samp>` بمعنى «خرج برنامج».
- لو شلت `display:block` هيرجع Inline ويمشي مع الكلام.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</samp>` إجباري.
- role: `generic`.
- dom: `HTMLElement`.
- layout: `display: inline`، وخط ثابت العرض.

## mistakes

### samp للمدخلات
```html bad
<p>اكتب <samp>npm install</samp> في الـ terminal.</p>
```
```html good
<p>اكتب <kbd>npm install</kbd> في الـ terminal.</p>
```
ليه؟ المستخدم هو اللي بيكتب الأمر، فهو مدخل.

### samp للكود
```html bad
<p>الدالة <samp>parseInt()</samp> بتحوّل النص.</p>
```
```html good
<p>الدالة <code>parseInt()</code> بتحوّل النص.</p>
```
ليه؟ دي كود مش ناتج.

## a11y

- قارئ الشاشة بيقراه كنص عادي.
- لو الخرج مهم (رسالة خطأ)، استخدم `role="alert"` على عنصر الرسالة الفعلية.

## tips

- في الدروس، اعرض الأمر والرد مع بعض في `<pre>`.
- لون الأخطاء بالأحمر، والنجاح بالأخضر.

## quiz

### أنهي أنسب لرسالة طلعها برنامج؟
- [ ] `<code>`
- [ ] `<kbd>`
- [x] `<samp>`
- [ ] `<var>`
خرج البرنامج.

### أنهي أنسب لأمر بيكتبه المستخدم؟
- [x] `<kbd>`
- [ ] `<samp>`
- [ ] `<code>`
- [ ] `<b>`
مدخلات.

### أنهي عنصر يلف جزء متغيّر جوه رسالة خرج (مثل اسم الملف)؟
- [ ] `<kbd>`
- [ ] `<b>`
- [x] `<var>`
- [ ] `<cite>`
الجزء اللي بيتغيّر من حالة لحالة هو متغير.

## refs

- [MDN: samp](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/samp)
- [WHATWG: The samp element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-samp-element)
