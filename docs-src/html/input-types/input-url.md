---
id: input-url
kind: inputtype
cat: input-types
chip: type="url"
title: حقل الرابط
en: <input type="url">
status: stable
support: all
mdn: Elements/input/url
summary: type="url" بيفحص إن القيمة رابط مطلق صحيح (فيه بروتوكول زي https://) ويعرض كيبورد مناسب. مش بيتأكد إن الرابط شغّال، ولازم تكتب http أو https بالكامل.
keywords: input url, رابط, validation, typeMismatch, https, pattern, كيبورد, website, عنوان موقع
related: input, input-text, attr-pattern, attr-required, a, form
---

## intro

حقل للروابط (عناوين المواقع). المتصفح بيفحص إن القيمة **رابط مطلق صحيح**: لازم تبدأ بـ **بروتوكول** (`https://` أو `http://` أو `ftp://`…). يعني `example.com` لوحده **مش هيعدّي** لأنه ناقصه البروتوكول، بينما `https://example.com` تمام. ده بيضايق الناس أحياناً، فوضّح في التلميح إن الرابط لازم يبدأ بـ `https://`.

زي الإيميل: الفحص **شكلي**. المتصفح مبيزورش الرابط عشان يتأكد إنه شغّال. وعلى الموبايل بيفتح كيبورد فيه `/` و`.com` أسهل. ولو عايز تقيّد على بروتوكول معيّن زي https بس، استخدم [[attr-pattern]]. وفي الغالب الأفضل إنك تحمّل المستخدم أقل مجهود: لو كتب `example.com` ممكن بالجافاسكربت تضيف `https://` له بدل ما ترفضه.

## try

```html
<input id="u" type="url" placeholder="https://example.com" size="28">
<button onclick="o.textContent = u.checkValidity() ? 'رابط صحيح ✅' : 'رابط غلط ❌ (لازم https://)'">افحص</button>
<p id="o"></p>
```

## syntax

```html nolive
<input type="url" name="website" placeholder="https://example.com" required>
```

- `type="url"` — فحص رابط مطلق.
- `placeholder` — اكتب مثال بالبروتوكول.
- `pattern` — لتقييد https فقط.

## use

- موقع المستخدم أو بروفايله.
- إدخال رابط صورة أو فيديو.
- نموذج إضافة مراجع.

## avoid

- متنسيش تذكّر المستخدم بكتابة https://.
- متفتكرش إن الرابط بيتفتح ويتأكد.

## examples

### 1) https فقط
مثال على pattern.

```html
<input type="url" pattern="https://.*" placeholder="https://…" title="لازم يبدأ بـ https://" size="28">
```

- `pattern` بيمنع http العادي.
- التلميح بيظهر في رسالة الخطأ.
- مناسب للأمان.

### 2) فتح الرابط
قراءة القيمة.

```html
<input id="u" type="url" value="https://developer.mozilla.org" size="30">
<button onclick="if (u.checkValidity()) window.open(u.value, '_blank', 'noopener')">افتح</button>
```

- `checkValidity()` بيرجّع true أو false.
- فتح في تبويب جديد مع `noopener`.
- متفتحش رابط مش متأكد منه.

### 3) معاينة نطاق
مثال على URL API.

```html
<input id="u" type="url" value="https://phinex.com/docs?x=1" size="30">
<button onclick="o.textContent = new URL(u.value).hostname">اعرض النطاق</button>
<p id="o"></p>
```

- `new URL()` بتحلّل الرابط.
- بتعطيك `hostname` و`pathname`…
- بتفيد قبل ما تستخدم الرابط.

### 4) قائمة اقتراحات
مثال على list.

```html
<input type="url" list="s" placeholder="https://…">
<datalist id="s"><option value="https://github.com/"><option value="https://developer.mozilla.org/"></datalist>
```

- اقتراحات لروابط مشهورة.
- القيمة تظل حرة.
- بتسرّع الإدخال.

## mistakes

### رابط من غير بروتوكول
```html bad
<input type="url" value="example.com">
```
```html good
<input type="url" value="https://example.com">
```
ليه؟ من غير البروتوكول الفحص بيفشل.

### استخدام text
```html bad
<input type="text" name="site">
```
```html good
<input type="url" name="site">
```
ليه؟ النوع url بيدّي فحص وكيبورد أنسب.

## a11y

- وضّح الصيغة المطلوبة (https://…) في label أو نص مساعد.
- متعتمدش على الـ placeholder للتوضيح لوحده.
- رسائل الخطأ لازم تكون نص.

## quiz

### هل `example.com` وحده يعدّي في `type="url"`؟
- [x] لأ، لازم بروتوكول
- [ ] أيوه
- [ ] لو فيه www
- [ ] أحياناً
لازم https:// أو http://.

### هل بيتأكد إن الرابط شغّال؟
- [x] لأ، شكلي فقط
- [ ] أيوه
- [ ] بيفتحه
- [ ] بيعمل ping
الفحص شكلي.

### تقييد https فقط؟
- [x] `pattern`
- [ ] `max`
- [ ] `https`
- [ ] `secure`
باستخدام pattern.

## refs

- [MDN: url](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/url)
- [WHATWG: URL state](https://html.spec.whatwg.org/multipage/input.html#url-state-(type=url))
