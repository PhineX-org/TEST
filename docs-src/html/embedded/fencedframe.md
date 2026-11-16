---
id: fencedframe
kind: element
cat: embedded
tag: fencedframe
title: الإطار المسوّر (fencedframe)
en: HTML fenced frame element
status: experimental
display: inline
void: no
support: limited
support_note: تجريبي، مدعوم في Chrome ضمن Privacy Sandbox فقط، ومحتاج سياق آمن وإعدادات خاصة.
size: compact
summary: عنصر تجريبي زي iframe بس معزول تماماً عن الصفحة اللي حاططاه، علشان الإعلانات تتعرض من غير ما تعرف بيانات المستخدم ولا الصفحة تعرف إيه اللي جواه.
keywords: fencedframe, fenced frame, privacy sandbox, إعلانات, خصوصية, iframe, تجريبي, FLEDGE, Protected Audience, config
related: iframe, embed, object
---

## intro

الـ `<iframe>` العادي بيعرض صفحة تانية، لكن الصفحتين **ممكن يتواصلوا** (postMessage، تخزين مشترك، وغيره). في الإعلانات ده بيسرّب بيانات: الإعلان ممكن يعرف إنت دخلت أنهي موقع، والموقع ممكن يعرف أنهي إعلان اتعرض لك على حسب اهتماماتك.

`<fencedframe>` (**Fenced Frame**: إطار مسوّر) عنصر **تجريبي** بيحل ده: هو إطار **معزول تماماً**، مفيش أي قناة اتصال بين الصفحة والمحتوى اللي جواه. بيتحمّل من `config` أو من عنوان مقنّع (Opaque URL) بيطلع من واجهات خصوصية زي **Protected Audience** و**Shared Storage**.

متحاولش تستخدمه في مشروع عادي: **دعمه محدود** (Chrome بس وبشروط) ومواصفاته لسه بتتغيّر. اتعلّمه كفكرة ومستقبل خصوصية الويب.

> [!warn] **تجريبي**: مفيش ضمان إنه يفضل بنفس الشكل. مش مناسب للإنتاج.

> [!key] `<fencedframe>` = `<iframe>` بعزل كامل: مفيش تواصل بين الصفحة والمحتوى، خدمةً للخصوصية.

## try

مثال توضيحي للشكل (مش شغّال في المعاينة لأنه تجريبي).

```html nolive
<fencedframe width="300" height="250"></fencedframe>
```

## syntax

```html nolive
<fencedframe id="ad" width="300" height="250" allow="attribution-reporting"></fencedframe>
<script>
  // config بييجي من واجهة Privacy Sandbox (مثلاً Protected Audience)
  document.getElementById('ad').config = frameConfig;
</script>
```

- `<fencedframe ...>` — **الوسم الافتتاحي**.
- `width` و`height` — **المقاس**.
- `config` — **خاصية جافاسكربت** (مش HTML) بتاخد كائن `FencedFrameConfig`.
- `</fencedframe>` — **الوسم الختامي**.

## use

- لعرض إعلانات بطريقة تحافظ على الخصوصية.
- لتجارب Privacy Sandbox (Protected Audience, Shared Storage).

## avoid

- متستخدمهوش في مشروع حقيقي: تجريبي وغير مدعوم في أغلب المتصفحات.

## attributes

### width
**عرض الإطار** بالبكسل.

### height
**ارتفاع الإطار** بالبكسل.

### allow {experimental}
**سياسة صلاحيات** محدودة جداً للإطار المسوّر.

### config {experimental}
**كائن جافاسكربت** بيحدد محتوى الإطار. بيتحط عن طريق الـ DOM مش من خاصية HTML.

## examples

### 1) الشكل الأساسي
عنصر بحجم ثابت.

```html nolive
<fencedframe width="300" height="250"></fencedframe>
```

- ده الشكل الأساسي: الإطار نفسه فاضي لحد ما يتحط له `config`.
- مفيش `src` زي `<iframe>` لأن العنوان بيتحدد بـ config.
- المحتوى بيتحمّل من واجهات الخصوصية.

### 2) ربط config من جافاسكربت
التهيئة.

```html nolive
<fencedframe id="f" width="300" height="250"></fencedframe>
<script>
  const f = document.getElementById('f');
  if ('FencedFrameConfig' in window) {
    f.config = new FencedFrameConfig('https://ads.example/ad');
  }
</script>
```

- بنتأكد إن المتصفح بيدعم الواجهة الأول (`FencedFrameConfig`).
- بيتبني `config` من عنوان، وبيتربط بالإطار.
- في الواقع الأغلب بييجي من `navigator.runAdAuction`.

### 3) التحقق من الدعم
تجنّب الأخطاء.

```html nolive
<script>
  if (!('HTMLFencedFrameElement' in window)) {
    console.log('الإطار المسوّر مش مدعوم هنا');
  }
</script>
```

- `HTMLFencedFrameElement` موجود بس في المتصفحات اللي بتدعمه.
- دايماً اعمل فحص دعم (Feature Detection) قبل استخدام ميزة تجريبية.
- لو مش مدعوم، ارجع لحل بديل أو اعرض محتوى عادي.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **مفيش**.
- closing: الوسم الختامي `</fencedframe>` مطلوب.
- role: مفيش.
- dom: `HTMLFencedFrameElement`.
- layout: `display: inline`.

## mistakes

### استخدام src
```html bad
<fencedframe src="https://ads.example/ad"></fencedframe>
```
```html good
<fencedframe id="f" width="300" height="250"></fencedframe>
<script>document.getElementById('f').config = adConfig;</script>
```
ليه؟ الإطار المسوّر مفيهوش `src`، لأن العنوان لازم يفضل مخفي عن الصفحة وبيتحدد بـ `config`.

## a11y

- المحتوى جوه الإطار معزول فمفيش وصول من الصفحة، فاحرص على `title` مناسب لو أمكن.
- متخليش الإطار المسوّر هو الطريقة الوحيدة لتوصيل معلومة مهمة.

## tips

- متابع تطور Privacy Sandbox قبل ما تستخدمه.
- جرّب في Chrome مع تفعيل الـ flags المخصوصة.

## quiz

### إيه الفرق الأساسي بين `<fencedframe>` و`<iframe>`؟
- [ ] السرعة
- [x] العزل الكامل بين الصفحة والمحتوى
- [ ] الألوان
- [ ] مفيش فرق
مفيش قناة اتصال بينهم لحماية الخصوصية.

### هل ينفع نستخدمه في مشاريع الإنتاج؟
- [ ] أيوه
- [x] لأ، تجريبي ودعمه محدود
- [ ] أيوه في كل المتصفحات
- [ ] أيوه مع `src`
لسه في مرحلة التجريب.

## refs

- [MDN: fencedframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fencedframe)
- [Privacy Sandbox: Fenced Frames](https://privacysandbox.google.com/private-advertising/fenced-frame)
