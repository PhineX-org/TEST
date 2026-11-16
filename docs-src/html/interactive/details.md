---
id: details
kind: element
cat: interactive
tag: details
title: عنصر التفاصيل القابلة للطي
en: HTML disclosure details element
status: stable
display: block
void: no
support: all
summary: بيعمل صندوق بيتفتح ويتقفل (Accordion) من غير جافاسكربت: عنوان summary ظاهر دايماً ومحتوى بيظهر لما تدوس. بيدعم open والـ name لعمل أكورديون حصري، وحدث toggle.
keywords: details, تفاصيل, أكورديون, accordion, طي, فتح, summary, open, name, toggle, FAQ, أسئلة شائعة, collapse, disclosure
related: summary, dialog, button, dl, fieldset
---

## intro

الأسئلة الشائعة (FAQ)، الإعدادات المتقدمة، «اقرأ المزيد»، قايمة جانبية بتتفتح وتتقفل: كلها بتحتاج **محتوى مخفي يظهر لما المستخدم يطلبه**. زمان ده كان لازم جافاسكربت وCSS وعناصر `div` وأحداث. دلوقتي عنصر واحد بيعمل كل ده بدون أي سطر كود: `<details>` (**تفاصيل**).

بيتكوّن من حاجتين: [[summary]] (**العنوان**: بيظهر دايماً، وهو اللي بتدوس عليه، ومعاه سهم صغير) وبعده **أي محتوى** (ده اللي بيظهر ويختفي). لما المستخدم يدوس على الـ `<summary>`، الـ `<details>` بيفتح (بيضيف خاصية `open`) والمحتوى بيظهر. دوسة تانية تقفله. وده **شغال بالكيبورد** كمان (Tab وEnter وSpace) ومتاح لقارئ الشاشة (بيعلن «مطوي/مفتوح») من غير ما تعمل حاجة.

خاصية **`open`** بتخلّيه مفتوح من البداية. وخاصية **`name`** (حديثة) بتعمل **أكورديون حصري**: لو عندك كذا `<details>` بنفس الـ `name`، فتح واحد بيقفل التاني تلقائياً. وبالجافاسكربت: `details.open = true` للفتح، وحدث **`toggle`** لما حالته تتغيّر.

وبما إن المحتوى المطوي **موجود في الصفحة فعلاً** (مش بيتحمّل بعدين)، فالبحث في الصفحة (Ctrl+F) بيفتحه تلقائياً في المتصفحات الحديثة، ومحركات البحث بتشوفه.

> [!analogy] `<details>` زي **درج المكتب**: الواجهة (summary) هي اللي مكتوب عليها اسم الدرج، ولما تسحبه بيتفتح ويبان اللي جواه. وممكن تعمل «خزانة» بتفتح درج واحد بس في المرة (`name`).

> [!key] `<details><summary>العنوان</summary>المحتوى</details>`. `open` لفتحه مبدئياً، و`name` لأكورديون حصري. من غير جافاسكربت.

## try

دوس على العنوان.

```html
<details>
  <summary>إيه هو HTML؟</summary>
  <p>لغة بتبني هيكل صفحات الويب باستخدام وسوم.</p>
</details>
```

## syntax

```html nolive
<details open name="faq">
  <summary>السؤال</summary>
  <p>الجواب الطويل هنا…</p>
</details>
```

- `<details ...>` — **الوسم الافتتاحي**.
- `<summary>` — **العنوان** (أول ابن).
- المحتوى — **اللي بيتفتح ويتقفل**.
- `open` — **مفتوح مبدئياً**.
- `name` — **مجموعة أكورديون حصري**.
- `</details>` — **الوسم الختامي** إجباري.

## use

- للأسئلة الشائعة (FAQ).
- لإخفاء تفاصيل ثانوية («خيارات متقدمة»).
- للأكورديون (قوايم جانبية وإعدادات).
- لمحتوى طويل اختياري («اقرأ المزيد»).
- لـ «حل التمرين» في الدروس.

## avoid

- متخبّيش بيه محتوى مهم لازم الكل يشوفه.
- متحطش عناصر تفاعلية جوه الـ `<summary>` (زرار أو رابط).
- متستخدمهوش للقوايم المنسدلة للتنقل الرئيسي الكبيرة: فكّر في الإتاحة.
- متنساش `<summary>`: من غيره المتصفح بيحط عنوان افتراضي «Details».

## attributes

### open {boolean}
**مفتوح مبدئياً.** وبيتحدّث تلقائياً لما المستخدم يفتح ويقفل.

```html nolive
<details open><summary>مفتوح</summary>محتوى</details>
```

### name
**اسم مجموعة**: كل `<details>` بنفس الاسم بيفتح واحد فقط في المرة (أكورديون حصري).

```html nolive
<details name="g"><summary>أ</summary>…</details>
<details name="g"><summary>ب</summary>…</details>
```

### class
للتنسيق.

## examples

### 1) أسئلة شائعة
FAQ.

```html
<style>
  details { border:1px solid #cbd5e1; border-radius:8px; padding:8px 12px; margin-bottom:8px }
  summary { cursor:pointer; font-weight:bold }
  details[open] { background:#f0fdf4 }
</style>
<details>
  <summary>الكورسات مجانية؟</summary>
  <p>أيوه، كل الكورسات مجانية 100%.</p>
</details>
<details>
  <summary>محتاج خبرة قبل ما أبدأ؟</summary>
  <p>لأ، بنبدأ من الصفر.</p>
</details>
```

- كل سؤال في `<details>` لوحده، والجواب بيظهر بالدوسة.
- `details[open]` بيلوّن اللي اتفتح.
- كل ده من غير سطر جافاسكربت.

### 2) أكورديون حصري
`name`.

```html
<details name="acc" open><summary>HTML</summary><p>هيكل الصفحة.</p></details>
<details name="acc"><summary>CSS</summary><p>شكل الصفحة.</p></details>
<details name="acc"><summary>JavaScript</summary><p>تفاعل الصفحة.</p></details>
```

- لما تفتح واحد، اللي كان مفتوح بيتقفل تلقائياً.
- ده بيحل مشكلة الأكورديون اللي كان محتاج جافاسكربت.
- لو متصفحك قديم هيشتغل كأنهم مستقلين (مفيش ضرر).

### 3) تتبع الحالة بالجافاسكربت
`toggle`.

```html
<details id="d">
  <summary>دوس عليا</summary>
  <p>أنا ظاهر!</p>
</details>
<p id="o">الحالة: مقفول</p>
<button onclick="document.getElementById('d').open = !document.getElementById('d').open">تبديل بالكود</button>
<script>
  document.getElementById('d').addEventListener('toggle', e => {
    document.getElementById('o').textContent = 'الحالة: ' + (e.target.open ? 'مفتوح' : 'مقفول');
  });
</script>
```

- حدث `toggle` بيشتغل لما الحالة تتغيّر (بدوسة أو بالكود).
- `details.open` خاصية قراءة وكتابة.
- الزرار بيبدّل الحالة برمجياً.

### 4) تنسيق السهم
`::marker`.

```html
<style>
  summary { list-style: none; cursor: pointer; padding: 6px 0; font-weight: bold; }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: '◀'; display: inline-block; margin-left: 8px; transition: transform .2s; }
  details[open] > summary::before { transform: rotate(-90deg); }
</style>
<details>
  <summary>تفاصيل بسهم مخصص</summary>
  <p>السهم بيلف لما تفتح.</p>
</details>
```

- `list-style: none` بيشيل السهم الافتراضي.
- بنحط سهمنا بـ `::before` ونلفّه لما `[open]`.
- الشكل كله من CSS، والسلوك من المتصفح.

### 5) أقسام متداخلة
details جوه details.

```html
<details open>
  <summary>الدروس</summary>
  <details>
    <summary>HTML</summary>
    <ul><li>الوسوم</li><li>الخصائص</li></ul>
  </details>
  <details>
    <summary>CSS</summary>
    <ul><li>الألوان</li><li>التخطيط</li></ul>
  </details>
</details>
```

- ممكن تعمل شجرة من التفاصيل المتداخلة.
- كل مستوى بيتفتح لوحده.
- مناسب لقوائم تنقل شجرية.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: [[summary]] (أول ابن)، ثم **Flow content**.
- closing: الوسم الختامي `</details>` إجباري.
- role: `group`.
- dom: `HTMLDetailsElement`.
- layout: `display: block`.

## mistakes

### نسيان summary
```html bad
<details><p>محتوى من غير عنوان</p></details>
```
```html good
<details><summary>العنوان</summary><p>محتوى</p></details>
```
ليه؟ من غير `<summary>` المتصفح بيحط عنوان افتراضي مش واضح.

### summary مش أول ابن
```html bad
<details><p>نص</p><summary>عنوان</summary></details>
```
```html good
<details><summary>عنوان</summary><p>نص</p></details>
```
ليه؟ الـ `<summary>` لازم أول ابن.

### زرار جوه summary
```html bad
<details><summary><button>اضغط</button></summary>…</details>
```
```html good
<details><summary>العنوان</summary><button>اضغط</button></details>
```
ليه؟ الـ `<summary>` نفسه تفاعلي، وعنصر تفاعلي جواه بيتصارع معاه.

## a11y

- شغّال بالكيبورد وقارئ الشاشة بشكل افتراضي: أحسن من الـ `div` المخصص.
- اكتب نص `<summary>` واضح.
- متغيّرش سلوك الفتح والقفل.
- لو غيّرت السهم، خلّي في مؤشر بصري على الحالة.

## tips

- `details[open]` لتنسيق الحالة المفتوحة.
- `::details-content` (حديث) لتنسيق وتحريك المحتوى.
- `summary { cursor: pointer }` لتوضيح إنه قابل للضغط.
- Ctrl+F بيفتح الـ details المحتوي على الكلمة.
- لتحريك الفتح والقفل ممكن تستخدم `interpolate-size` و`::details-content`.

## quiz

### إيه الخاصية اللي بتخلّي `<details>` مفتوح من البداية؟
- [ ] `show`
- [x] `open`
- [ ] `expanded`
- [ ] `visible`
بتتضاف وتتشال تلقائياً.

### إزاي تعمل أكورديون حصري؟
- [ ] جافاسكربت بس
- [x] نفس `name` على كل الـ `<details>`
- [ ] نفس `id`
- [ ] `class`
فتح واحد بيقفل الباقي.

### إيه العنصر اللي لازم يكون أول ابن في `<details>`؟
- [x] `<summary>`
- [ ] `<p>`
- [ ] `<h1>`
- [ ] `<div>`
هو العنوان.

## refs

- [MDN: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- [WHATWG: The details element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
