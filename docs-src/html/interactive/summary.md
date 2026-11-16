---
id: summary
kind: element
cat: interactive
tag: summary
title: عنوان التفاصيل (summary)
en: HTML disclosure summary element
status: stable
display: list-item
void: no
support: all
size: compact
summary: عنصر summary هو العنوان القابل للضغط داخل details، وبيظهر دايماً ومعاه سهم، والضغط عليه بيفتح ويقفل المحتوى. لازم يكون أول ابن، وبيقبل نص أو عناوين.
keywords: summary, عنوان, details, ملخص, سهم, marker, قابل للضغط, أكورديون, disclosure
related: details, button, h2, dialog
---

## intro

الـ `<summary>` (**ملخص**) هو **الجزء الظاهر دايماً** من [[details]]، وهو اللي المستخدم **بيدوس عليه** عشان يفتح أو يقفل المحتوى. عليه سهم صغير افتراضياً (`display: list-item` وعلامة `::marker`). لازم يتحط **أول ابن** في `<details>`.

جواه نص أو **Phrasing content**، وممكن عناوين (`<h3>` مثلاً) لو الـ details جزء من هيكل المستند. وهو **بيتصرف زي زرار**: بياخد فوكس بالكيبورد ومنه Enter وSpace، فمتحطش فيه عناصر تفاعلية تانية.

> [!key] `<summary>` أول ابن في `<details>`: العنوان اللي بتدوس عليه.

## try

```html
<details>
  <summary>اضغط عليا</summary>
  <p>المحتوى المخفي.</p>
</details>
```

## syntax

```html nolive
<details>
  <summary>العنوان</summary>
  المحتوى
</details>
```

- `<summary>` — **الوسم الافتتاحي**، أول ابن.
- النص — **العنوان**.
- `</summary>` — **الوسم الختامي** إجباري.

## use

- كعنوان لـ `<details>`.
- كسؤال في FAQ.

## avoid

- متحطش جواه زرار أو رابط.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### class
للتنسيق.

## examples

### 1) summary بعنوان داخلي
هيكل المستند.

```html
<details>
  <summary><h3 style="display:inline; margin:0">الفصل الأول</h3></summary>
  <p>محتوى الفصل…</p>
</details>
```

- `<h3>` جوه `<summary>` مسموح، وبيدخل في هيكل العناوين.
- `display:inline` عشان العنوان ميعملش سطر منفصل عن السهم.
- ده مهم لقارئ الشاشة اللي بيتنقل بالعناوين.

### 2) تغيير نص العنوان حسب الحالة
CSS.

```html
<style>
  details > summary::after { content: ' (اضغط للفتح)'; color: #64748b; font-weight: normal; }
  details[open] > summary::after { content: ' (اضغط للقفل)'; }
</style>
<details>
  <summary>تفاصيل</summary>
  <p>محتوى.</p>
</details>
```

- بنغيّر النص المضاف بـ `::after` حسب `[open]`.
- من غير جافاسكربت ومن غير تغيير الـ HTML.
- نصيحة: متحطش معلومة أساسية في `::after` لأن قارئ الشاشة ممكن ما يقراهاش.

### 3) summary كزرار بشكل مخصص
بدون السهم.

```html
<style>
  summary { list-style: none; background:#0f172a; color:#fff; padding:8px 16px; border-radius:8px; cursor:pointer; display:inline-block; }
  summary::-webkit-details-marker { display:none; }
  summary:hover { background:#1e293b; }
</style>
<details>
  <summary>إظهار الحل</summary>
  <p style="margin-top:8px">الحل: 42</p>
</details>
```

- `list-style: none` بيشيل السهم.
- الـ `<summary>` بقى شكل زرار لكن لسه بيتصرف زي summary.
- ده شائع لـ «إظهار الحل» في الدروس.

## rules

- parents: [[details]] (أول ابن).
- children: **Phrasing content** (وعناوين).
- closing: الوسم الختامي `</summary>` إجباري.
- role: `button` (ضمنياً بيعلن الحالة `expanded`).
- dom: `HTMLElement`.
- layout: `display: list-item`.

## mistakes

### زرار جوه summary
```html bad
<summary><button>اضغط</button></summary>
```
```html good
<summary>اضغط</summary>
```
ليه؟ الـ `<summary>` تفاعلي بنفسه فمتداخل مع زرار بيتعارض.

## a11y

- بيتعلن كزرار مع حالة مفتوح/مطوي.
- لو غيّرت السهم لازم يفضل في مؤشر للحالة.

## tips

- `cursor: pointer` وحط حشو كويس.
- `summary::marker` لتنسيق السهم.

## quiz

### فين بيتحط `<summary>`؟
- [ ] آخر `<details>`
- [x] أول ابن في `<details>`
- [ ] برّه
- [ ] في `<body>`
هو العنوان.

### هل ينفع نحط رابط جوه `<summary>`؟
- [ ] أيوه
- [x] لأ، بيتعارض مع سلوكه
- [ ] أيوه بشروط
- [ ] لازم
عنصر تفاعلي جوه تفاعلي.

## refs

- [MDN: summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary)
- [WHATWG: The summary element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-summary-element)
