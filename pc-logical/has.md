---
id: has
kind: pseudoclass
cat: pc-logical
chip: :has
title: يحتوي على (محدد الأب)
en: CSS :has() pseudo-class
status: stable
support: all
mdn: :has
summary: الدالة has بتختار العنصر لو جواه عنصر يطابق محدد معين: محدد الأب الأخيرة اللي كنا نحلم بيها. ثورة في CSS.
keywords: :has, has, parent selector, محدد الأب, يحتوي, card:has(img)
related: is, not, where, focus-within, checked, specificity
---

## intro

`:has()` أخيراً **«محدد الأب»**! بتختار العنصر **لو جواه (أو بعده كشقيق) عنصر يطابق شرط معين**. قبلها CSS كان بيختار من الأب للابن بس؛ دلوقتي تقدر تختار الأب **بناءً على أبنائه**.

أمثلة تفتح الدماغ:
- `.card:has(img)` = البطاقات اللي فيها صورة فقط.
- `.card:not(:has(img))` = اللي مفيهاش صورة.
- `label:has(input:checked)` = التسمية اللي الـ checkbox اللي جواها محدد ([[checked]]).
- `form:has(:invalid)` = نموذج فيه حقل غير صالح.
- `h2:has(+ p)` = عنوان بعده فقرة مباشرة.
- `body:has(dialog[open]) { overflow: hidden; }` = امنع سكرول الصفحة لما مودال مفتوح!

كده بتتخلص من JavaScript في حالات كتير: تمييز عنصر حسب حالة ابنه، تنسيق Layout حسب المحتوى، إلخ.

**ملاحظات**:
- ممكن تتداخل `:has(:has())`؟ لا، غير مسموح داخل نفسها، لكن بتتركب مع `is` و`not`.
- **أداء**: المتصفحات محسّنة لها، لكن تجنّب محددات واسعة جداً (`*:has(...)`) على صفحات ضخمة.
- مدعومة في كل المتصفحات الحديثة.

> [!analogy] `:has` زي إنك تسأل «أنهي بيوت فيها قطة؟» وتختار البيت نفسه بناءً على اللي جواه.

## try

```html
<style>
  .c { padding:8px; margin:4px 0; border-radius:8px; background:#efe0bd; color:#3d2c18; }
  .c:has(img-x), .c:has(b) { background:#bcd4a8; border:2px solid #3d7a5a; }
</style>
<div class="c">بطاقة عادية</div><div class="c">بطاقة فيها <b>عنصر b</b> (تتميز)</div>
```

## syntax

```css nolive
.card:has(img) { }
.card:not(:has(img)) { }
label:has(input:checked) { }
form:has(:invalid) { }
h2:has(+ p) { }
```

- بتختار الأب بناءً على الأبناء.
- بتقبل محدد نسبي (+ و~ و>).

## use

- تمييز بطاقات حسب محتواها.
- تنسيق label حسب input:checked.
- منع scroll عند فتح dialog.

## avoid

- محددات واسعة جداً على صفحات ضخمة.
- تداخل has جوه has.

## examples

### 1) بطاقة بصورة
تنسيق مختلف لو فيها صورة.

```html
<style>
  .c { padding:8px; margin:4px 0; border-radius:8px; background:#efe0bd; color:#3d2c18; }
  .c:has(.pic) { background:#bcd4a8; display:flex; gap:8px; align-items:center; }
  .pic { width:40px; height:40px; background:#c9772f; border-radius:6px; }
</style>
<div class="c">بدون صورة</div><div class="c"><div class="pic"></div>بصورة</div>
```



### 2) label حسب الـ checkbox
يتلوّن لما يتحدد.

```html
<style>
  label { display:inline-block; padding:8px 14px; border:2px solid #bda27a; border-radius:8px; color:#3d2c18; cursor:pointer; }
  label:has(input:checked) { background:#c9772f; border-color:#7a4a1d; color:#f3ede0; }
  input { margin-inline-end:6px; }
</style>
<label><input type="checkbox">خيار</label>
```



### 3) نموذج به خطأ
form:has(:invalid).

```html
<style>
  form { padding:8px; border-radius:8px; background:#efe0bd; border:2px solid transparent; }
  form:has(:invalid) { border-color:#b5551f; }
  input { padding:6px; border:1px solid #bda27a; border-radius:6px; background:#f3ede0; }
</style>
<form onsubmit="return false"><input required placeholder="إجباري"></form>
```



### 4) عنوان بعده فقرة
محدد شقيق داخل has.

```html
<style>
  h4 { margin:2px 0; color:#7a4a1d; }
  h4:has(+ p) { color:#b5551f; }
  p { margin:0 0 6px; color:#3d2c18; }
</style>
<h4>عنوان بعده فقرة</h4><p>فقرة</p><h4>عنوان بدون فقرة</h4><div></div>
```



## mistakes

### تداخل has

```css bad
.a:has(.b:has(.c)) { }
```

```css good
.a:has(.b .c) { }
```

has جوه has غير مسموح.

### محدد واسع

```css bad
*:has(.x) { }  /* ثقيل */
```

```css good
.card:has(.x) { }
```

حدّد النطاق.

## quiz

### has() بتختار؟
- [x] الأب بناءً على أبنائه
- [ ] الابن
- [ ] الأخ فقط
- [ ] الجذر

محدد الأب.

### تمييز نموذج به حقل خطأ؟
- [x] form:has(:invalid)
- [ ] form:invalid
- [ ] input:has(form)
- [ ] form:not(input)

has.

### تتحل بدون JS؟
- [x] حالات كتير
- [ ] لا شيء
- [ ] الأنيميشن فقط
- [ ] الشبكة فقط

بدائل JS.

## refs

- [MDN: :has](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
