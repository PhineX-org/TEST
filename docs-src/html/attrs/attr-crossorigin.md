---
id: attr-crossorigin
kind: attribute
cat: attrs
chip: crossorigin
title: خاصية المشاركة بين النطاقات
en: HTML crossorigin attribute
status: stable
support: all
mdn: Attributes/crossorigin
summary: خاصية crossorigin بتحدد طريقة طلب مورد من نطاق تاني (CORS) في img وscript وlink وvideo وaudio: anonymous بدون كوكيز، أو use-credentials مع الكوكيز.
keywords: crossorigin, CORS, anonymous, use-credentials, integrity, SRI, script, img, link, font, canvas, cross-origin
related: img, script, link, attr-integrity, attr-src, attr-rel
---

## intro

المتصفح بيطبّق **سياسة نفس المصدر (Same-Origin Policy)**: صفحة من `a.com` متقدرش تقرا بيانات من `b.com` بسهولة. لكن بتقدر **تحمّل** صور وسكربتات وخطوط من نطاقات تانية. السؤال: لو عايز تتعامل مع المورد ده بشكل أعمق (تقرا الصورة على `canvas`، أو تتتبع أخطاء سكربت، أو تتحقق من `integrity`) لازم تطلبه بـ **CORS**. وهنا بتيجي `crossorigin`.

بتتكتب على [[img]] و[[script]] و[[link]] و`video` و`audio`. قيمتها: **`anonymous`** (أو الخاصية فاضية `crossorigin`): اطلب بدون كوكيز وبيانات اعتماد. **`use-credentials`**: اطلب **مع** كوكيز وبيانات الدخول (والسيرفر لازم يسمح صراحةً). من غير الخاصية: الطلب عادي (no-cors) والمتصفح بيمنعك من قراءة المحتوى.

متى تحتاجها؟ (1) مع [[attr-integrity]] (SRI) لتحميل مكتبة من CDN: الـ CORS ضروري. (2) لرسم صورة من نطاق تاني على `canvas` من غير ما «تلوّثه». (3) لخطوط الويب من نطاق تاني (`<link rel="preload" as="font" crossorigin>`). (4) لتتبع تفاصيل أخطاء السكربتات الخارجية. **والسيرفر الخارجي لازم يرجّع هيدر `Access-Control-Allow-Origin`**، وإلا المورد هيفشل.

## try

```html
<p>مثال توضيحي (الأكواد بتتطلب سيرفر خارجي):</p>
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;script src="https://cdn.example.com/lib.js"
  integrity="sha384-…"
  crossorigin="anonymous"&gt;&lt;/script&gt;</pre>
```

## syntax

```html nolive
<script src="https://cdn.example.com/lib.js" integrity="sha384-…" crossorigin="anonymous"></script>
<img src="https://other.com/a.png" crossorigin="anonymous" alt="">
<link rel="preload" href="font.woff2" as="font" crossorigin>
```

- `anonymous` (أو فاضية) — CORS بدون كوكيز.
- `use-credentials` — CORS مع كوكيز.
- السيرفر لازم يسمح (`Access-Control-Allow-Origin`).

## use

- تحميل سكربت/CSS من CDN مع `integrity`.
- قراءة صورة خارجية على `canvas`.
- تحميل خطوط الويب من نطاق آخر.
- تتبع أخطاء سكربتات خارجية بتفاصيل.

## avoid

- متحطش `use-credentials` من غير داعي.
- متحطش crossorigin لو السيرفر مش بيدعم CORS (المورد هيفشل).

## section: القيم

- `anonymous` (أو بدون قيمة) — طلب CORS من غير كوكيز.
- `use-credentials` — طلب CORS مع كوكيز وبيانات اعتماد.
- من غير الخاصية — طلب عادي، مفيش وصول لمحتوى المورد.

## examples

### 1) SRI مع CDN
مثال على integrity + crossorigin.

```html nolive
<script src="https://cdn.jsdelivr.net/npm/example@1.0.0/dist/lib.min.js"
  integrity="sha384-ABC123…"
  crossorigin="anonymous"></script>
```

- `integrity` بيتحقق إن الملف مطابق للبصمة.
- `crossorigin` ضروري لعمل الفحص.
- بيحميك لو الـ CDN اتخترق.

### 2) صورة على canvas
من غير تلويث.

```html
<img id="i" crossorigin="anonymous" alt="" src="https://placehold.co/60">
<canvas id="c" width="60" height="60"></canvas>
<button onclick="try { c.getContext('2d').drawImage(i,0,0); c.toDataURL(); o.textContent = 'اتقرت ✅' } catch (e) { o.textContent = 'محجوبة: ' + e.name }">ارسم واقرا</button>
<p id="o"></p>
```

- من غير crossorigin الـ canvas بيتلوّث ويمنع القراءة.
- مع crossorigin والسيرفر داعم، ينفع.
- لو السيرفر مش بيدعم هتشوف خطأ.

### 3) خط ويب
مثال على preload font.

```html nolive
<!-- في <head> -->
<link rel="preload" href="https://example.com/font.woff2" as="font" type="font/woff2" crossorigin>
```

- الخطوط دايماً بتتحمّل بـ CORS.
- من غير crossorigin بيتحمّل مرتين.
- ضروري حتى لنفس النطاق.

### 4) use-credentials
مع كوكيز.

```html nolive
<img src="https://api.example.com/avatar" crossorigin="use-credentials" alt="الصورة الشخصية">
```

- بيبعت الكوكيز مع الطلب.
- السيرفر لازم `Access-Control-Allow-Credentials`.
- نادر الاستخدام.

## mistakes

### SRI من غير crossorigin
```html bad
<script src="https://cdn.com/a.js" integrity="sha384-…"></script>
```
```html good
<script src="https://cdn.com/a.js" integrity="sha384-…" crossorigin="anonymous"></script>
```
ليه؟ الفحص مبيشتغلش على مورد من نطاق آخر من غير CORS.

### crossorigin على سيرفر مش داعم
```html bad
<img src="https://no-cors.com/a.png" crossorigin="anonymous">
```
```html good
<img src="https://no-cors.com/a.png">
```
ليه؟ المورد هيتحجب لو السيرفر مبيرجّعش هيدر CORS.

## a11y

- مالهاش علاقة مباشرة بالإتاحة.
- تأكد إن الصورة لسه عندها `alt`.
- فشل التحميل لازم يكون له بديل.

## quiz

### `crossorigin` بتتعلق بـ؟
- [x] CORS (طلب من نطاق تاني)
- [ ] الألوان
- [ ] الخطوط فقط
- [ ] الكوكيز فقط
مشاركة الموارد بين النطاقات.

### الافتراضي لو كتبتها فاضية؟
- [x] `anonymous`
- [ ] `use-credentials`
- [ ] خطأ
- [ ] تتجاهل
بدون كوكيز.

### محتاجها مع `integrity` ليه؟
- [x] الفحص على مورد خارجي يحتاج CORS
- [ ] للسرعة
- [ ] للألوان
- [ ] لا حاجة
SRI بيتطلب CORS.

## refs

- [MDN: crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin)
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
