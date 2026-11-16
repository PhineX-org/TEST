---
id: kbd
kind: element
cat: code
tag: kbd
title: عنصر إدخال لوحة المفاتيح (kbd)
en: HTML keyboard input element
status: stable
display: inline
void: no
support: all
summary: عنصر kbd بيعلّم على مدخلات المستخدم (غالباً أزرار لوحة المفاتيح زي Ctrl+C)، وبيظهر بخط ثابت العرض، ولو اتلفّ kbd جوه kbd بنوصف اختصار مركّب.
keywords: kbd, لوحة المفاتيح, keyboard, اختصار, shortcut, Ctrl, زر, مفتاح, إدخال, شورتكت
related: code, samp, var, pre, span
---

## intro

كل ما تشرح لحد «اضغط Ctrl + S عشان تحفظ»، الأزرار دي لازم تتميّز عن الكلام العادي. العنصر `<kbd>` (اختصار **Keyboard Input**) بيعلّم على **ما يكتبه المستخدم** (بإيده أو بالمفاتيح): ضغطة زرار، اختصار لوحة مفاتيح، أمر في الـ Terminal، أو حتى أمر صوتي. والمتصفح بيعرضه بخط ثابت العرض (Monospace).

أكتر استخدام: **اختصارات لوحة المفاتيح**. والنمط الشائع إنك بتلف كل زرار في `<kbd>` لوحده، وبتلف المجموعة كلها في `<kbd>` برّه: `<kbd><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd>`. الـ `<kbd>` الخارجي معناه «الاختصار كله»، والداخلي «كل زرار». وده بيسهّل تنسيقهم بـ CSS لشكل الأزرار (حدود وظل ومظهر زرار فعلي).

فرّق بينه وبين التلاتة التانيين في القسم: `<code>` للكود البرمجي، `<samp>` لـ**خرج** البرنامج (اللي الكمبيوتر بيرجّعه)، `<kbd>` لـ**مدخلات** المستخدم، `<var>` للمتغيرات. فلو بتشرح في Terminal: الأمر اللي المستخدم بيكتبه `<kbd>`، والرد اللي بيظهر `<samp>`.

والتنسيق الافتراضي بسيط (خط ثابت)، فبنضيف بالـ CSS مظهر زرار لوحة المفاتيح: خلفية فاتحة وحد وظل خفيف.

> [!analogy] تخيّل دليل مستخدم لجهاز بيقولك «اضغط على زرار `ON` ثم `MENU`». الأزرار بتكون مكتوبة بشكل مميز عشان تعرف إنها حاجة فعلية بتضغط عليها. ده `<kbd>`.

> [!key] `<kbd>` = **مدخلات** المستخدم (أزرار، اختصارات، أوامر). `<samp>` = **خرج** البرنامج.

## try

جرّب تضيف اختصار تاني.

```html
<style>
  kbd { background:#f1f5f9; border:1px solid #cbd5e1; border-bottom-width:3px;
        border-radius:6px; padding:1px 7px; font-size:0.9em; }
</style>
<p>اضغط <kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd> للحفظ،
و<kbd><kbd>Ctrl</kbd> + <kbd>Z</kbd></kbd> للتراجع.</p>
```

## syntax

```html nolive
<kbd><kbd>Ctrl</kbd> + <kbd>C</kbd></kbd>
```

- `<kbd>` — **الوسم الافتتاحي**.
- النص — اسم الزرار أو الأمر المكتوب.
- `</kbd>` — **الوسم الختامي** إجباري.
- التداخل: الخارجي للاختصار، والداخلي لكل زرار.

## use

- لاختصارات لوحة المفاتيح (Ctrl+C).
- لأسماء الأزرار (Enter، Esc).
- لأوامر المستخدم في Terminal.
- لأوامر صوتية أو أي إدخال.

## avoid

- متستخدمهوش لخرج البرنامج: `<samp>`.
- متستخدمهوش لكود: `<code>`.
- متستخدمهوش لأزرار الواجهة (`<button>`).
- متستخدمهوش للتزيين.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق (`class="key"`).

## examples

### 1) زرار واحد
اسم زرار.

```html
<p>اضغط <kbd>Enter</kbd> للإرسال.</p>
```

- الزرار بيظهر بخط ثابت العرض.
- من غير `<kbd>` مش هتعرف إنه زرار حقيقي.

### 2) اختصار مركّب
تداخل `<kbd>`.

```html
<p>للنسخ: <kbd><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd></p>
```

- `<kbd>` الخارجي بيمثّل الاختصار كله.
- التلاتة بيتنسقوا بالـ CSS كل واحد لوحده.

### 3) شكل زرار لوحة مفاتيح
تنسيق CSS.

```html
<style>
  kbd { display:inline-block; background:#0f172a; color:#e2e8f0; border-radius:6px;
        padding:2px 8px; font:600 14px monospace; box-shadow:0 2px 0 #475569; }
</style>
<p>افتح الأدوات بـ <kbd>F12</kbd> أو <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.</p>
```

- الظل السفلي بيدّي إحساس زرار مرتفع.
- المعنى لسه «مدخلات».

### 4) أمر في terminal مع samp
المدخل `<kbd>` والخرج `<samp>`.

```html
<pre>$ <kbd>node --version</kbd>
<samp>v22.0.0</samp></pre>
```

- الأمر اللي المستخدم بيكتبه `<kbd>`.
- الرد اللي بيرجع `<samp>`.
- الاتنين جوه `<pre>` عشان الأسطر.

### 5) قايمة اختصارات
جدول سريع.

```html
<style>
  kbd { background:#e2e8f0; padding:1px 6px; border-radius:4px; }
</style>
<ul>
  <li><kbd>Ctrl</kbd>+<kbd>A</kbd> — تحديد الكل</li>
  <li><kbd>Ctrl</kbd>+<kbd>F</kbd> — بحث</li>
  <li><kbd>Esc</kbd> — إغلاق</li>
</ul>
```

- كل اختصار في سطر مع وصفه.
- نمط شائع في صفحات المساعدة.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Phrasing content**.
- closing: الوسم الختامي `</kbd>` إجباري.
- role: `generic`.
- dom: `HTMLElement`.
- layout: `display: inline`، وخط ثابت العرض.

## mistakes

### kbd لخرج البرنامج
```html bad
<p>طلع: <kbd>تم بنجاح</kbd></p>
```
```html good
<p>طلع: <samp>تم بنجاح</samp></p>
```
ليه؟ الخرج `<samp>` مش `<kbd>`.

### كل الاختصار في kbd واحد
```html bad
<kbd>Ctrl+C</kbd>
```
```html good
<kbd><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd>
```
ليه؟ الأفضل تفصل كل زرار لتنسيقه والمعنى.

## a11y

- قارئ الشاشة بيقرا النص عادي: اكتب «Control» لو في لبس.
- اشرح الاختصار في الجملة (مش بس `<kbd>`).
- ضيف بدائل لمستخدم اللمس.

## tips

- خلي أسماء الأزرار بالإنجليزي (زي ما على الكيبورد).
- جرّب `<kbd>` لـ Mac: `⌘`.
- اعمل تنسيق واحد لكل الأزرار.

## quiz

### أنهي أنسب لاختصار Ctrl+C؟
- [ ] `<code>`
- [x] `<kbd>`
- [ ] `<samp>`
- [ ] `<var>`
مدخلات المستخدم.

### أنهي أنسب لخرج برنامج؟
- [ ] `<kbd>`
- [x] `<samp>`
- [ ] `<code>`
- [ ] `<b>`
`<samp>` للخرج.

### إيه معنى تداخل `<kbd>`؟
- [x] الخارجي للاختصار، والداخلي لكل زرار
- [ ] خطأ
- [ ] بيكبّر الخط
- [ ] بيمسح
نمط شائع.

## refs

- [MDN: kbd](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd)
- [WHATWG: The kbd element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-kbd-element)
