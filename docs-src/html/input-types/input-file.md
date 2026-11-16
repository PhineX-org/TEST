---
id: input-file
kind: inputtype
cat: input-types
chip: type="file"
title: رفع الملفات
en: <input type="file">
status: stable
support: all
mdn: Elements/input/file
summary: type="file" بيخلّي المستخدم يختار ملف أو أكتر من جهازه. استخدم accept للفلترة وmultiple لعدة ملفات وfiles في JS. ومحتاج enctype=multipart/form-data للرفع.
keywords: input file, رفع ملفات, accept, multiple, files, FileReader, enctype multipart/form-data, capture, upload, معاينة صورة
related: input, form, attr-accept, attr-multiple, attr-capture, label
---

## intro

الحقل ده بيفتح **نافذة اختيار ملف** من جهاز المستخدم. بعد ما يختار، الملفات بتبقى متاحة لك في `input.files` (قايمة كائنات `File`: اسم وحجم ونوع). مهم جداً: المتصفح **مبيرفعش الملف لوحده**: لازم ترسله مع فورم أو ترفعه بالجافاسكربت.

عشان الفورم يبعت الملف فعلاً لازم تحط على الـ `<form>`: **`method="post"`** و**`enctype="multipart/form-data"`**. من غير الـ `enctype` بيتبعت اسم الملف بس مش محتواه! وبخاصية [[attr-accept]] بتفلتر النوع المعروض (مثلاً `image/*` أو `.pdf`)، لكن **ده مجرد تسهيل**: المستخدم يقدر يتجاوزه، فلازم تتحقق من النوع والحجم على السيرفر. و[[attr-multiple]] بتسمح بأكتر من ملف.

حاجة تانية: شكل الزرار نفسه ثابت تقريباً ومش سهل تغييره، فالحل الشائع إنك تخفي الحقل وتستخدم `label` منسّق كزرار.

## try

```html
<input id="f" type="file" accept="image/*" multiple onchange="o.textContent = [...this.files].map(f => f.name + ' (' + Math.round(f.size / 1024) + ' KB)').join(' | ') || 'مفيش ملفات'">
<p id="o"></p>
```

## syntax

```html nolive
<form method="post" enctype="multipart/form-data">
  <input type="file" name="photo" accept="image/*" required>
  <button>ارفع</button>
</form>
```

- `accept` — فلترة النوع (تسهيل مش أمان).
- `multiple` — أكتر من ملف.
- `enctype="multipart/form-data"` — **ضروري** على الفورم للرفع.

## use

- رفع صورة بروفايل أو مستند.
- رفع عدة ملفات.
- قراءة ملف محلي بالجافاسكربت (معاينة، CSV).

## avoid

- متعتمدش على `accept` كحماية: افحص السيرفر.
- متنساش `enctype="multipart/form-data"` على الفورم.

## examples

### 1) معاينة صورة
مثال على FileReader.

```html
<input type="file" accept="image/*" onchange="const f = this.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => p.src = r.result; r.readAsDataURL(f)">
<br><img id="p" alt="معاينة" style="max-width:160px; margin-top:8px; border-radius:8px">
```

- `FileReader` بيقرا الملف محلياً.
- `readAsDataURL` بيدّي صورة تتحط في `src`.
- مفيش رفع للسيرفر هنا.

### 2) فحص الحجم والنوع
مثال على files[0].

```html
<input type="file" onchange="const f = this.files[0]; o.textContent = !f ? '' : f.size > 1048576 ? 'أكبر من 1MB ❌' : 'حجمه ' + f.size + ' بايت، نوعه ' + (f.type || 'غير معروف')">
<p id="o"></p>
```

- `size` بالبايت و`type` بنوع MIME.
- الفحص هنا لراحة المستخدم فقط.
- السيرفر هو الحكم النهائي.

### 3) قراءة ملف نصي
مثال على text().

```html
<input type="file" accept=".txt,.csv" onchange="this.files[0]?.text().then(t => o.textContent = t.slice(0, 200))">
<pre id="o" style="white-space:pre-wrap"></pre>
```

- `file.text()` بتقرا المحتوى كنص.
- مفيش رفع: القراءة كلها في المتصفح.
- مناسب لأدوات بتفتح CSV أو JSON.

### 4) زرار مخصّص
مثال على label + hidden.

```html
<label style="display:inline-block; padding:8px 16px; background:#22c55e; color:#000; border-radius:8px; cursor:pointer">
  اختار ملف
  <input type="file" hidden onchange="n.textContent = this.files[0]?.name || ''">
</label> <span id="n"></span>
```

- الحقل `hidden` والـ label هو الزرار.
- الضغط على label بيفتح نافذة الاختيار.
- لازم تعرض اسم الملف بنفسك.

### 5) رفع بـ fetch
مثال على FormData.

```html
<input id="f" type="file">
<button onclick="const fd = new FormData(); fd.append('file', f.files[0]); o.textContent = 'هيتبعت ' + (f.files[0] ? f.files[0].name : 'لا شيء') + ' (توضيحي: ما فيش سيرفر)'">ارفع</button>
<p id="o"></p>
<!-- الرفع الحقيقي: fetch('/upload', { method: 'POST', body: fd }) -->
```

- `FormData` بيبني multipart تلقائياً.
- مفيش داعي لتحديد `Content-Type` بنفسك.
- ده مثال توضيحي من غير سيرفر حقيقي.

## mistakes

### نسيان enctype
```html bad
<form method="post"><input type="file" name="f"></form>
```
```html good
<form method="post" enctype="multipart/form-data"><input type="file" name="f"></form>
```
ليه؟ من غيره بيتبعت اسم الملف بس.

### الاعتماد على accept
```html bad
<input type="file" accept="image/*">  <!-- كده آمن؟ -->
```
```html good
<!-- السيرفر بيتأكد من نوع وحجم الملف الفعلي -->
```
ليه؟ المستخدم يقدر يتجاوز accept بسهولة.

## a11y

- اربطه بـ label أو زرار واضح.
- اعرض اسم الملف المختار كنص.
- لو بتخفي الحقل، سيب وسيلة وصول بالكيبورد (الـ label مع tabindex أو خلّي الحقل مرئي بصرياً بس).

## quiz

### إيه اللازم على الفورم للرفع؟
- [x] `enctype="multipart/form-data"`
- [ ] `type="upload"`
- [ ] `method="get"`
- [ ] مفيش
من غيره المحتوى مش بيتبعت.

### هل `accept` حماية؟
- [x] لأ، تسهيل فقط
- [ ] أيوه
- [ ] في كروم بس
- [ ] مع multiple
افحص السيرفر.

### قراءة الملفات في JS؟
- [x] `input.files`
- [ ] `input.value`
- [ ] `input.data`
- [ ] `input.paths`
قايمة File.

## refs

- [MDN: file](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)
- [WHATWG: File upload state](https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file))
