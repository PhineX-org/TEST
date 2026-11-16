---
id: attr-download
kind: attribute
cat: attrs
chip: download
title: خاصية التحميل
en: HTML download attribute
status: stable
support: all
size: compact
mdn: Elements/a#download
summary: خاصية download على a وarea بتخلّي الرابط ينزّل الملف بدل ما يفتحه، وممكن تحدد اسم الملف المحفوظ. بتشتغل لنفس النطاق وblob وdata فقط.
keywords: download, تحميل ملف, a download, blob, data URI, اسم الملف, same-origin, تنزيل, save as
related: a, area, attr-href, attr-type, attr-target
---

## intro

رابط عادي لملف PDF أو صورة بيفتحه المتصفح. لو عايزه **ينزّل مباشرة** استخدم `download` على [[a]] (أو [[area]]): `<a href="file.pdf" download>`. وتقدر تكتب قيمة: `download="دليل.pdf"` تحدد **اسم الملف المحفوظ**. **شرط:** بتشتغل مع روابط **نفس النطاق** أو `blob:` أو `data:` (للنطاقات التانية المتصفح بيتجاهلها لأسباب أمنية، إلا لو السيرفر بعت `Content-Disposition: attachment`). وفي JavaScript بنستخدمها مع `Blob` عشان تنزّل ملفات **بتتولّد في المتصفح** (CSV، JSON، صورة canvas).

## try

```html
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;a href="guide.pdf" download&gt;نزّل الدليل&lt;/a&gt;
&lt;a href="guide.pdf" download="دليل-HTML.pdf"&gt;نزّله باسم تاني&lt;/a&gt;</pre>
<p style="color:#64748b">التحميل بيتمنع داخل الـ iframe التجريبي، لكن شغّال في صفحتك.</p>
```

## syntax

```html nolive
<a href="file.pdf" download>تحميل</a>
<a href="file.pdf" download="الاسم.pdf">تحميل باسم</a>
```

- `download` — بدون قيمة: اسم أصلي.
- `download="اسم"` — اسم مقترح.
- نفس النطاق أو blob/data فقط.

## use

- تنزيل ملفات (PDF، ZIP).
- تصدير بيانات من الصفحة (CSV/JSON).

## avoid

- متفترضش إنها تنزّل ملفات من نطاق تاني.

## examples

### 1) تحميل ملف
نفس النطاق.

```html nolive
<a href="guide.pdf" download>نزّل الدليل</a>
```

- بينزّل بدل ما يفتح.
- اسم الملف الأصلي.
- نفس نطاق الموقع.

### 2) تصدير CSV
مثال على Blob.

```html nolive
<button onclick="const b = new Blob(['اسم,عمر\nأحمد,30'], {type: 'text/csv'}); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'users.csv'; a.click()">صدّر CSV</button>
```

- `Blob` بيولّد الملف في المتصفح.
- `createObjectURL` بيعمل رابط مؤقت.
- `a.click()` بيبدأ التنزيل.

### 3) حفظ صورة canvas
مثال على toDataURL.

```html nolive
<canvas id="c" width="50" height="50"></canvas>
<script>c.getContext('2d').fillRect(0, 0, 50, 50);</script>
<a id="l" download="مربع.png" href="#" onclick="this.href = c.toDataURL()">نزّل الصورة</a>
```

- `toDataURL()` بيدّي data URI.
- نحط الرابط عند الضغط.
- شغّال على نفس الأصل.

## mistakes

### رابط خارجي
```html bad
<a href="https://other.com/file.pdf" download>تنزيل</a>
```
```html good
<a href="/files/file.pdf" download>تنزيل</a>
```
ليه؟ المتصفح بيتجاهل download للنطاقات التانية.

## a11y

- اذكر نوع وحجم الملف في نص الرابط.
- اعرض حالة التنزيل إن أمكن.

## quiz

### بتشتغل مع؟
- [x] نفس النطاق وblob وdata
- [ ] أي رابط
- [ ] روابط HTTP فقط
- [ ] الصور فقط
قيود أمنية.

### لتحديد الاسم؟
- [x] قيمة `download`
- [ ] `name`
- [ ] `title`
- [ ] `filename`
اقتراح للمتصفح.

## refs

- [MDN: download](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download)
- [MDN: Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
