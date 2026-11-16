---
id: attr-dirname
kind: attribute
cat: attrs
chip: dirname
title: خاصية اتجاه النص
en: HTML dirname attribute
status: stable
support: all
size: compact
mdn: Attributes/dirname
summary: خاصية dirname على input وtextarea بتبعت اتجاه النص (ltr أو rtl) كحقل إضافي مع الفورم، فالسيرفر يعرف لو النص عربي أو إنجليزي. تتطلب قيمة تحدد اسم الحقل.
keywords: dirname, ltr, rtl, اتجاه النص, bidi, form data, textarea, input, عربي, name.dir
related: input-text, textarea, attr-dir, attr-name, form
---

## intro

لما المستخدم يكتب بالعربي (يمين لشمال) أو بالإنجليزي (شمال لليمين) السيرفر بيستقبل **النص بس** من غير ما يعرف اتجاهه. الخاصية `dirname` بتبعت **حقل إضافي** مع الفورم فيه اتجاه النص (`ltr` أو `rtl`)، وده بيفيد لو هتعرض النص ده لمستخدمين تانيين وتحتاج تحافظ على اتجاهه. قيمتها هي **اسم الحقل الإضافي** (عادةً `الاسم.dir`): `<input name="comment" dirname="comment.dir">` بيبعت `comment=...` و`comment.dir=rtl`. بتشتغل مع [[input-text]] و`search` و[[textarea]] بس، والاتجاه نفسه بيتحدد بخاصية [[attr-dir]] (أو `auto`).

## try

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <textarea name="comment" dirname="comment.dir" dir="auto" rows="2" placeholder="اكتب بالعربي أو English"></textarea>
  <button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<textarea name="comment" dirname="comment.dir" dir="auto"></textarea>
```

- `dirname="اسم.dir"` — اسم الحقل الإضافي.
- بيبعت `ltr` أو `rtl`.
- مع `dir="auto"` بيكتشف الاتجاه.

## use

- تعليقات بلغات مختلطة.
- تخزين اتجاه النص مع المحتوى.

## avoid

- متستخدمهاش لو مفيش حاجة تستفيد من اتجاه النص.

## examples

### 1) تعليق بلغتين
مثال على dir=auto.

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <input name="msg" dirname="msg.dir" dir="auto" placeholder="Write أو اكتب">
  <button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

- السيرفر بيستقبل `msg` و`msg.dir`.
- الاتجاه بيتحدد حسب أول حروف قوية.
- مفيد لعرض التعليقات صح.

### 2) اتجاه ثابت
مثال على dir=rtl.

```html
<form onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <textarea name="t" dirname="t.dir" dir="rtl" rows="2">نص</textarea><button>ابعت</button>
</form>
<p id="o" dir="ltr"></p>
```

- الاتجاه ثابت `rtl`.
- بيتبعت `t.dir=rtl`.
- مفيش اكتشاف تلقائي.

### 3) استخدام الاتجاه المحفوظ
عرض.

```html
<p dir="rtl" style="border:1px solid #cbd5e1; padding:6px">نص اتحفظ كـ rtl</p>
<p dir="ltr" style="border:1px solid #cbd5e1; padding:6px">Text saved as ltr</p>
```

- لما تعرض، حط `dir` المحفوظ.
- يحافظ على ترتيب الكلمات.
- مهم للغات المختلطة.

## mistakes

### dirname من غير name
```html bad
<input dirname="c.dir">
```
```html good
<input name="c" dirname="c.dir">
```
ليه؟ الحقل لازم له name عشان يتبعت.

## a11y

- حافظ على اتجاه النص صح لقارئات الشاشة.
- استخدم `dir="auto"` للمحتوى المختلط.

## quiz

### بتبعت إيه؟
- [x] اتجاه النص (ltr/rtl)
- [ ] اللغة
- [ ] الخط
- [ ] الطول
حقل إضافي.

### بتشتغل على؟
- [x] input نصي وtextarea
- [ ] كل العناصر
- [ ] checkbox
- [ ] img
حقول نصية.

## refs

- [MDN: dirname](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/dirname)
- [WHATWG: dirname](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname)
