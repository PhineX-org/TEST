---
id: geolocation
kind: element
cat: interactive
tag: geolocation
title: عنصر الموقع الجغرافي (geolocation)
en: HTML geolocation element
status: experimental
display: inline-block
void: no
support: limited
support_note: تجريبي جداً ومقترح في مواصفات حديثة؛ دعمه محدود ومتغيّر. الطريقة المعتمدة حالياً هي واجهة navigator.geolocation بالجافاسكربت.
size: compact
summary: عنصر مقترح تجريبي بيطلب موقع المستخدم بضغطة زرار تعرضه المتصفح نفسه، بدل الاعتماد على سكريبت. الطريقة المستقرة الحالية هي navigator.geolocation مع إذن المستخدم.
keywords: geolocation, الموقع, GPS, خريطة, تجريبي, navigator.geolocation, إذن, permission, أين أنا, إحداثيات
related: button, input, iframe
---

## intro

عشان تعرف مكان المستخدم (لخريطة أو «أقرب فرع») المتصفح بيوفّر واجهة جافاسكربت مستقرة هي `navigator.geolocation`، وبتطلب **إذن** من المستخدم. العنصر `<geolocation>` ده **مقترح تجريبي جديد** بيحاول يخلي طلب الموقع **زرار بيرسمه المتصفح نفسه**: المستخدم بيدوس عليه فيفهم إنها طلب مقصود، وبكده الإذن يبقى أوضح وأأمن.

**مهم تفهم:** العنصر ده **غير مستقر**: الاسم والخصائص والدعم ممكن يتغيّروا، وغالباً **مش شغّال في أغلب المتصفحات** دلوقتي. عشان كده الصفحة دي بتشرح **الفكرة** وبتوريك **الطريقة المستقرة** اللي لازم تستخدمها فعلاً: `navigator.geolocation.getCurrentPosition`.

> [!warn] **تجريبي**: متعتمدش عليه. استخدم `navigator.geolocation` مع فحص الدعم ومعالجة رفض الإذن.

> [!key] للإنتاج: `navigator.geolocation.getCurrentPosition(success, error)` بعد ضغطة المستخدم. الموقع بيحتاج HTTPS وإذن.

## try

الطريقة المستقرة: دوس الزرار (المتصفح هيسأل عن الإذن، وفي المعاينة ممكن يترفض).

```html
<button onclick="
  const o = document.getElementById('o');
  if (!navigator.geolocation) { o.textContent = 'المتصفح مش بيدعم الموقع'; return; }
  navigator.geolocation.getCurrentPosition(
    p => o.textContent = 'خط العرض ' + p.coords.latitude.toFixed(3) + '، خط الطول ' + p.coords.longitude.toFixed(3),
    e => o.textContent = 'اتعذّر: ' + e.message
  );
">أين أنا؟</button>
<p id="o"></p>
```

## syntax

```html nolive
<!-- العنصر التجريبي المقترح (غير مستقر) -->
<geolocation></geolocation>

<!-- الطريقة المستقرة -->
<button id="loc">موقعي</button>
<script>
  loc.onclick = () => navigator.geolocation.getCurrentPosition(
    pos => console.log(pos.coords.latitude, pos.coords.longitude),
    err => console.warn(err.message)
  );
</script>
```

- `<geolocation>` — **مقترح تجريبي**.
- `navigator.geolocation` — **الواجهة المستقرة**.
- `getCurrentPosition(success, error)` — **طلب الموقع**.

## use

- لتجارب مستقبلية في طلب الموقع الآمن.
- لمعرفة الاتجاه الذي ينتقل إليه معيار الويب.

## avoid

- متعتمدش عليه في إنتاج: استخدم `navigator.geolocation`.

## attributes

مالوش خصائص مستقرة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### autolocate {experimental}
**طلب الموقع تلقائياً** عند ظهور العنصر لو الإذن معطى مسبقاً (مقترح تجريبي).

### watch {experimental}
**متابعة الموقع باستمرار** بدل طلب واحد (مقترح تجريبي).

## examples

### 1) طلب الموقع (المستقر)
طلب لمرة واحدة.

```html nolive
<button id="b">موقعي</button>
<script>
  document.getElementById('b').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(
      pos => alert(pos.coords.latitude + ', ' + pos.coords.longitude),
      err => alert('اتعذّر: ' + err.message)
    );
  });
</script>
```

- بنطلب الموقع **بعد ضغطة المستخدم**، مش تلقائياً عند تحميل الصفحة.
- أول دالة للنجاح بتديك `pos.coords`، والتانية للفشل (رفض الإذن، مفيش GPS).
- المتصفح بيعرض مربع إذن للمستخدم.

### 2) متابعة الموقع
متابعة مستمرة.

```html nolive
<script>
  const id = navigator.geolocation.watchPosition(
    pos => console.log('اتحرّك:', pos.coords.latitude, pos.coords.longitude),
    err => console.warn(err.message),
    { enableHighAccuracy: true }
  );
  // لإيقاف المتابعة:
  // navigator.geolocation.clearWatch(id);
</script>
```

- `watchPosition` بيشتغل كل ما الموقع يتغيّر.
- `enableHighAccuracy` بيطلب دقة أعلى (استهلاك بطارية أكتر).
- دايماً أوقف المتابعة لما متحتاجهاش.

### 3) فحص الدعم والأخطاء
بشكل آمن.

```html nolive
<script>
  if (!('geolocation' in navigator)) {
    console.log('مش مدعوم');
  } else {
    navigator.geolocation.getCurrentPosition(ok, fail, { timeout: 8000 });
  }
  function ok(p) { console.log(p.coords.accuracy + ' متر دقة'); }
  function fail(e) {
    if (e.code === e.PERMISSION_DENIED) console.log('رفض المستخدم الإذن');
  }
</script>
```

- بنتأكد من وجود `geolocation` الأول.
- `timeout` بيمنع الانتظار للأبد.
- بنفرّق بين رفض الإذن وباقي الأخطاء لتعرض رسالة مناسبة.

## rules

- parents: أي عنصر بيقبل **Phrasing content** (غير مستقر).
- children: **مفيش** تقريباً (بيرسمه المتصفح).
- closing: الوسم الختامي `</geolocation>` مطلوب.
- role: غير محدد.
- dom: `HTMLGeolocationElement` (تجريبي).
- layout: `display: inline-block`.

## mistakes

### طلب الموقع عند التحميل
```html nolive bad
<script>navigator.geolocation.getCurrentPosition(show);</script>
```
```html nolive good
<button id="b">موقعي</button>
<script>b.onclick = () => navigator.geolocation.getCurrentPosition(show);</script>
```
ليه؟ طلب الإذن فجأة بيخلّي المستخدم يرفض غالباً. اطلبه بعد ضغطة مفهومة.

## a11y

- وضّح للمستخدم ليه محتاج الموقع.
- وفّر بديل يدوي (إدخال العنوان).

## tips

- الموقع بيشتغل على HTTPS فقط.
- متحفظش الإحداثيات من غير موافقة.

## quiz

### أنهي طريقة مستقرة لطلب الموقع؟
- [ ] `<geolocation>`
- [x] `navigator.geolocation`
- [ ] `<location>`
- [ ] `window.where`
الواجهة المعتمدة.

### متى تطلب الإذن؟
- [ ] أول ما الصفحة تفتح
- [x] بعد فعل واضح من المستخدم
- [ ] كل ثانية
- [ ] مرة في الشهر
عشان يفهم ليه.

## refs

- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [WICG: HTML geolocation element](https://github.com/WICG/PEPC)
