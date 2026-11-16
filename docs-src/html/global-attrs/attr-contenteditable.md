---
id: attr-contenteditable
kind: attribute
cat: global-attrs
chip: contenteditable
title: خاصية التحرير المباشر
en: HTML contenteditable global attribute
status: stable
support: all
mdn: Global_attributes/contenteditable
summary: خاصية contenteditable بتخلّي أي عنصر قابل للكتابة والتعديل مباشرة في الصفحة زي حقل نص. بتشتغل على أي عنصر وبتنفع لمحررات النصوص والملاحظات السريعة.
keywords: contenteditable, تحرير, editable, محرر نصوص, plaintext-only, isContentEditable, WYSIWYG, كتابة مباشرة, input event
related: textarea, attr-spellcheck, attr-inputmode, attr-tabindex, div
---

## intro

في الوضع العادي، النص في الصفحة بتقراه بس. لكن لو حطيت `contenteditable` على أي عنصر (`<div>` أو `<p>` أو حتى `<h1>`)، المستخدم يقدر **يدوس عليه ويكتب ويمسح ويعدّل** كأنه حقل نص. ده الأساس اللي بتتعمل بيه محررات النصوص الغنية (زي Notion وGoogle Docs) والملاحظات السريعة.

القيم: **`true`** (أو من غير قيمة `contenteditable`) يعني قابل للتعديل، **`false`** يعني لأ، و**`plaintext-only`** يعني نص عادي بس (من غير تنسيق لما المستخدم يلصق). المتصفح بيدّيك التحرير جاهز (مؤشر، تحديد، نسخ، لصق، تراجع Ctrl+Z)، وإنت بتسمع لحدث **`input`** لتعرف إن المحتوى اتغيّر، وبتقرا الناتج من **`innerText`** أو **`innerHTML`**. ⚠️ لو هتحفظ `innerHTML` من المستخدم وتعرضه لناس تانية لازم تنقّيه (ثغرة XSS).

> [!warn] محتوى `contenteditable` ممكن يجيب HTML من اللصق. لو هتحفظه أو تعرضه لمستخدمين تانيين، استخدم `plaintext-only` أو نقّي الـ HTML بمكتبة (مثل DOMPurify).

## try

```html
<div contenteditable="true" style="border:2px dashed #0ea5e9; padding:12px; border-radius:8px; min-height:50px">
  اضغط هنا وعدّل النص ده…
</div>
```

## syntax

```html nolive
<element contenteditable="true | false | plaintext-only">المحتوى</element>
```

- `true` أو بدون قيمة — **قابل للتعديل**.
- `false` — **غير قابل** (حتى لو الأب قابل).
- `plaintext-only` — **نص خام** من غير تنسيق.

## use

- محررات نصوص بسيطة وملاحظات سريعة.
- تعديل فوري على عنوان أو خلية جدول (inline edit).
- معاينة حيّة لتأثير تنسيق على نص.
- تجارب وتعليم.

## avoid

- متحفظش `innerHTML` من المستخدم من غير تنقية.
- متستخدمهاش بدل `<input>` و`<textarea>` في الفورمز العادية: مش بتتبعت مع الفورم.

## section: القيم

- `true` أو `""`: المستخدم يقدر يعدّل.
- `false`: ممنوع التعديل.
- `plaintext-only`: تعديل نص خام فقط (مدعوم في المتصفحات الحديثة).
- `inherit` (ضمني): يرث من الأب لو الخاصية مش مكتوبة.

## examples

### 1) تعديل خلية جدول
مثال على inline edit.

```html
<table border="1" cellpadding="8" style="border-collapse:collapse">
  <tr><td>الاسم</td><td contenteditable>أحمد</td></tr>
  <tr><td>المدينة</td><td contenteditable>القاهرة</td></tr>
</table>
```

- الخلية التانية بس هي القابلة للتعديل.
- مفيش جافاسكربت: المتصفح بيتكفّل بالباقي.
- مناسب لجداول بيانات بسيطة.

### 2) نص عادي فقط
مثال على plaintext-only.

```html
<div contenteditable="plaintext-only" style="border:1px solid #94a3b8; padding:10px; min-height:40px">
  الصق نص منسّق هنا: هيتحوّل لنص عادي.
</div>
```

- لو لصقت نص بخط وألوان، التنسيق بيتشال.
- ده أأمن من `true` لو هتحفظ المحتوى.
- مش مدعوم في متصفحات قديمة جداً (بيتعامل كـ true).

### 3) قراءة المحتوى بعد التعديل
حدث input.

```html
<div id="e" contenteditable style="border:2px solid #22c55e; padding:10px; border-radius:8px">اكتب هنا</div>
<p>عدد الحروف: <b id="n">0</b></p>
<script>
  const e = document.getElementById('e'), n = document.getElementById('n');
  e.addEventListener('input', () => n.textContent = e.innerText.length);
</script>
```

- حدث `input` بيتطلق مع كل تغيير.
- `innerText` بيرجّع النص الظاهر فقط.
- ده الأساس لأي محرر مع عدّاد كلمات.

### 4) تنسيق بسيط بأزرار
execCommand (قديم).

```html
<button onclick="document.execCommand('bold')"><b>B</b></button>
<button onclick="document.execCommand('italic')"><i>I</i></button>
<div contenteditable style="border:1px solid #94a3b8; padding:10px; margin-top:6px">حدّد كلمة واضغط B أو I</div>
```

- `execCommand` قديمة (deprecated) لكن لسه شغّالة في المتصفحات.
- للمشاريع الجدية استخدم مكتبات محررات (TipTap، Lexical).
- مفيدة للتعلّم والتجارب السريعة.

### 5) منع التعديل على جزء
false داخل true.

```html
<div contenteditable style="border:1px solid #94a3b8; padding:10px">
  اكتب اسمك: <span contenteditable="false" style="background:#fee2e2; padding:0 6px">[غير قابل للتعديل]</span> وكمّل.
</div>
```

- العنصر جوه `contenteditable="false"` بيتحجز.
- تقدر تعمل «حقول ثابتة» داخل نص قابل للتعديل.
- الأب قابل للتعديل والابن لأ.

## mistakes

### استخدامه بدل input في فورم
```html bad
<form><div contenteditable>اكتب اسمك</div><button>إرسال</button></form>
```
```html good
<form><input name="n" placeholder="اكتب اسمك"><button>إرسال</button></form>
```
ليه؟ عنصر `contenteditable` مش بيتبعت مع الفورم. استخدم حقل أصلي.

### حفظ innerHTML خام
```html bad
save(el.innerHTML)  // ممكن فيه <script> أو <img onerror=...>
```
```html good
save(el.innerText)  // نص خام آمن
```
ليه؟ HTML جاي من المستخدم ممكن يحمل كود ضار. احفظ النص أو نقّي الـ HTML.

## a11y

- العنصر القابل للتعديل لازم `role="textbox"` و`aria-label` علشان قارئ الشاشة يفهمه.
- اتأكد إنه ياخد فوكس بالكيبورد وفيه `outline` ظاهر.
- لو فيه شريط أدوات، خلّيه قابل للوصول بالكيبورد.

## quiz

### إيه اللي بيعمله `contenteditable`؟
- [x] بيخلّي العنصر قابل للتعديل
- [ ] بيخفيه
- [ ] بيحذفه
- [ ] بيحميه
تحرير مباشر.

### أنهي قيمة بتمنع التنسيق عند اللصق؟
- [x] `plaintext-only`
- [ ] `false`
- [ ] `true`
- [ ] `inherit`
نص خام.

### هل `contenteditable` بيتبعت مع الفورم؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] بس مع POST
مش حقل أصلي.

## refs

- [MDN: contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable)
- [WHATWG: contenteditable](https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable)
