---
id: canvas
kind: element
cat: embedded
tag: canvas
title: لوحة الرسم (canvas)
en: HTML canvas element
status: stable
display: inline
void: no
support: all
summary: لوحة بيكسلات بترسم عليها بجافاسكربت: أشكال وصور ونصوص وحركة وألعاب ورسوم بيانية. العنصر نفسه فاضي، والرسم كله بيتم من خلال getContext وأوامر الرسم.
keywords: canvas, لوحة, رسم, 2d, getContext, fillRect, arc, requestAnimationFrame, لعبة, animation, رسوم بيانية, بكسل, webgl, width, height
related: svg, img, video, script
---

## intro

الـ `<canvas>` (**كانفاس**: لوحة رسم) هو **ورقة بيضا من البكسلات** جوه صفحتك، وإنت اللي بترسم عليها **بجافاسكربت**. من غير جافاسكربت هو فاضي تماماً. بتجيب منه «قلم رسم» اسمه **Context** بـ `canvas.getContext('2d')`، وبعدين بتدّيه أوامر: ارسم مستطيل، ارسم دايرة، اكتب نص، حط صورة، لوّن، امسح.

الفرق الجوهري بينه وبين [[svg]]: الـ SVG **كائنات** (كل شكل عنصر في الـ DOM تقدر تدوس عليه وتغيّره). أما الـ `canvas` فهو **بكسلات**: بمجرد ما ترسم، الشكل بقى جزء من الصورة ومفيش «دايرة» تقدر تسأل عنها. عشان كده الـ canvas أسرع بكتير لو فيه آلاف العناصر المتحركة (**ألعاب**، **محاكاة**، **معالجة صور**)، والـ SVG أنسب لما فيه شويّة أشكال محتاجة تفاعل وإتاحة.

**نقطة مهمة جداً:** الـ `width` و`height` **كخاصية HTML** (`<canvas width="300" height="150">`) هما **دقة اللوحة** (عدد البكسلات الفعلي). لو غيّرت المقاس بـ CSS بس، اللوحة بتتمدّد (blur/تشوّه) لأنها بتفضل 300×150 بكسل بس بتتعرض أكبر. خلّي الدقة بالخصائص، والتنسيق بـ CSS.

المحتوى اللي جوه الوسم (بين `<canvas>` و`</canvas>`) هو **المحتوى الاحتياطي**: بيظهر لو المتصفح مش بيدعم الكانفاس، وبيقراه قارئ الشاشة. فحط فيه وصف نصي.

> [!analogy] الـ `canvas` زي **لوح رسم أبيض** وإنت الرسّام: كل ما ترسم بتحط لون على اللوح. اللوح مش بيفتكر «ده كان مستطيل»، هو بس لونه. أما الـ SVG فزي **لوحة مغناطيسية** بقطع تقدر تحرّكها.

> [!key] `<canvas width height>` + `getContext('2d')` + أوامر رسم. الدقة بخصائص HTML، والتنسيق بـ CSS. الكانفاس بكسلات (مش كائنات).

## try

غيّر الألوان والأرقام وشوف الرسم.

```html
<canvas id="c" width="260" height="130" style="border:1px solid #888; border-radius:8px">
  رسمة: مستطيل أزرق ودايرة برتقالي.
</canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(20, 20, 100, 80);
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(190, 65, 40, 0, Math.PI * 2);
  ctx.fill();
</script>
```

## syntax

```html nolive
<canvas id="c" width="400" height="200">وصف نصي للرسمة.</canvas>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'tomato';
  ctx.fillRect(10, 10, 100, 50);
</script>
```

- `<canvas ...>` — **الوسم الافتتاحي**.
- `width` و`height` — **دقة اللوحة** بالبكسل.
- المحتوى جواه — **احتياطي** وللإتاحة.
- `getContext('2d')` — **بيجيب أدوات الرسم**.
- `</canvas>` — **الوسم الختامي** إجباري.

## use

- للألعاب والحركة.
- للرسوم البيانية الديناميكية.
- لمعالجة الصور والفلاتر (بكسل ببكسل).
- لأدوات الرسم والتوقيع الإلكتروني.
- للمؤثرات البصرية والخلفيات المتحركة.

## avoid

- متستخدمهوش للنص العادي أو الأزرار: محتوى غير متاح وغير قابل للتحديد.
- متحطش `width`/`height` بـ CSS بس: هيتشوّه الرسم.
- متستخدمهوش لرسومات بسيطة ثابتة أو أيقونات: `<svg>` أحسن.
- متنساش المحتوى الاحتياطي ووصف الرسمة.

## attributes

### width
**عرض اللوحة بالبكسل (الدقة).** الافتراضي 300. تغييره بيمسح الرسم.

### height
**ارتفاع اللوحة بالبكسل (الدقة).** الافتراضي 150.

```html nolive
<canvas width="800" height="400"></canvas>
```

### id
**معرّف** عشان تجيب العنصر بالجافاسكربت.

### role
**دور إتاحة** لو الكانفاس بيمثّل صورة (`img`) مع `aria-label`.

### aria-label
**وصف نصي** للرسمة لقارئ الشاشة.

### moz-opaque {deprecated}
كانت تلميح من Firefox بأن اللوحة معتمة. **قديمة**، استخدم `getContext('2d', {alpha:false})`.

## examples

### 1) أشكال أساسية
مستطيل وخط ودايرة.

```html
<canvas id="a" width="260" height="120" style="border:1px solid #aaa">رسم أشكال</canvas>
<script>
  const ctx = document.getElementById('a').getContext('2d');
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(15, 15, 70, 50);

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.lineTo(160, 90);
  ctx.stroke();

  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(210, 55, 30, 0, Math.PI * 2);
  ctx.fill();
</script>
```

- `fillRect(x, y, width, height)` بيرسم مستطيل ملون.
- الخط بـ `moveTo` ثم `lineTo` ثم `stroke()` (الأمر اللي بيرسم فعلاً).
- الدايرة بـ `arc(x, y, radius, start, end)` والزاوية بالراديان، و`Math.PI * 2` دايرة كاملة.
- `beginPath()` بيبدأ مسار جديد عشان الأشكال متتلخبطش.

### 2) نص وتدرج لوني
`fillText` و`createLinearGradient`.

```html
<canvas id="b" width="260" height="100" style="border:1px solid #aaa">نص بتدرج</canvas>
<script>
  const ctx = document.getElementById('b').getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 260, 0);
  g.addColorStop(0, '#39ff14');
  g.addColorStop(1, '#0ea5e9');
  ctx.fillStyle = g;
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PhineX', 130, 62);
</script>
```

- `createLinearGradient` بيعمل تدرج من نقطة لنقطة.
- `addColorStop` بيحط ألوان على امتداد التدرج (من 0 لـ 1).
- `fillText(النص, x, y)` بيكتب نص، والتنسيق بـ `font` و`textAlign`.
- النص هنا صورة مش نص حقيقي: مينفعش يتحدد ولا يتقرا من قارئ الشاشة.

### 3) حركة بـ requestAnimationFrame
كورة بترتد.

```html
<canvas id="d" width="260" height="130" style="border:1px solid #aaa">كرة بترتد</canvas>
<script>
  const cv = document.getElementById('d');
  const ctx = cv.getContext('2d');
  let x = 30, y = 30, vx = 2.4, vy = 2;
  function frame() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    x += vx; y += vy;
    if (x < 12 || x > cv.width - 12) vx = -vx;
    if (y < 12 || y > cv.height - 12) vy = -vy;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    requestAnimationFrame(frame);
  }
  frame();
</script>
```

- كل إطار: بنمسح اللوحة (`clearRect`)، نغيّر المكان، نرسم من جديد.
- `requestAnimationFrame` بيستدعي الدالة قبل الرسم الجاي للشاشة (60 مرة في الثانية تقريباً).
- لما الكورة توصل حافة بنعكس السرعة، فبتبان بترتد.
- الانميشن في الكانفاس = «امسح وارسم» كل إطار.

### 4) الرسم بالماوس واللمس
تفاعل.

```html
<canvas id="e" width="260" height="130" style="border:1px solid #aaa; touch-action:none; cursor:crosshair">ارسم بإصبعك</canvas>
<button onclick="document.getElementById('e').getContext('2d').clearRect(0,0,260,130)">مسح</button>
<script>
  const cv = document.getElementById('e');
  const ctx = cv.getContext('2d');
  ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#6366f1';
  let drawing = false;
  const pos = ev => { const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  cv.addEventListener('pointerdown', ev => { drawing = true; ctx.beginPath(); ctx.moveTo(...pos(ev)); });
  cv.addEventListener('pointermove', ev => { if (drawing) { ctx.lineTo(...pos(ev)); ctx.stroke(); } });
  addEventListener('pointerup', () => drawing = false);
</script>
```

- `pointer` events بتشتغل على الماوس واللمس والقلم.
- `getBoundingClientRect` بيحوّل مكان الماوس لإحداثيات داخل اللوحة.
- `touch-action: none` بيمنع الصفحة من التمرير وإنت بترسم بإصبعك.
- ده أساس أي أداة رسم أو توقيع إلكتروني.

### 5) رسم صورة ومعالجتها
`drawImage`.

```html
<canvas id="f" width="260" height="110" style="border:1px solid #aaa">صورة بتتحول لأبيض وأسود</canvas>
<script>
  const cv = document.getElementById('f');
  const ctx = cv.getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 130, 110);
    const d = ctx.getImageData(0, 0, 130, 110);
    for (let i = 0; i < d.data.length; i += 4) {
      const g = (d.data[i] + d.data[i+1] + d.data[i+2]) / 3;
      d.data[i] = d.data[i+1] = d.data[i+2] = g;
    }
    ctx.putImageData(d, 130, 0);
  };
  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='110'%3E%3Crect width='130' height='110' fill='%2338bdf8'/%3E%3Ccircle cx='65' cy='55' r='35' fill='%23f97316'/%3E%3C/svg%3E";
</script>
```

- `drawImage` بيرسم صورة على اللوحة (يمين الأصل).
- `getImageData` بيجيب بكسلات (R, G, B, A) كمصفوفة، وبنمرّ عليها كل 4 قيم.
- بنحسب المتوسط ونحطه في الـ R وG وB فتتحول لرمادي، ثم `putImageData` بيرسمها على اليمين.
- الصور من دومين تاني ممكن تمنع `getImageData` لأسباب أمنية (CORS).

### 6) الدقة العالية للشاشات الحادة
`devicePixelRatio`.

```html
<canvas id="g" style="width:240px; height:80px; border:1px solid #aaa">نص حاد</canvas>
<script>
  const cv = document.getElementById('g');
  const dpr = window.devicePixelRatio || 1;
  cv.width = 240 * dpr; cv.height = 80 * dpr;
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('نص حاد وواضح', 14, 50);
</script>
```

- على شاشات الموبايل بنسبة 2 أو 3، الكانفاس العادي بيطلع باهت.
- الحل: نضرب الدقة في `devicePixelRatio`، ونثبّت المقاس المعروض بـ CSS، ثم `scale`.
- كده كل أمر رسم بنفس الإحداثيات القديمة لكن بوضوح أعلى.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **محتوى احتياطي** (Transparent): بيظهر لو الكانفاس مش مدعوم، ويقراه قارئ الشاشة.
- closing: الوسم الختامي `</canvas>` إجباري.
- role: مفيش (أو `img` لو حطيته).
- dom: `HTMLCanvasElement`.
- layout: `display: inline`، Replaced Element بمقاس 300×150 افتراضياً.

## mistakes

### تغيير المقاس بـ CSS بس
```html bad
<canvas style="width:600px; height:300px"></canvas>
```
```html good
<canvas width="600" height="300"></canvas>
```
ليه؟ الـ CSS بيمدد لوحة 300×150 بكسل لتبان 600×300 فتبقى مشوشة. الدقة الحقيقية بخصائص `width` و`height`.

### الرسم قبل تحميل العنصر
```html bad
<script>
  document.getElementById('c').getContext('2d').fillRect(0,0,50,50);
</script>
<canvas id="c"></canvas>
```
```html good
<canvas id="c"></canvas>
<script>
  document.getElementById('c').getContext('2d').fillRect(0,0,50,50);
</script>
```
ليه؟ السكريبت اتنفّذ قبل ما العنصر يتعمل، فـ `getElementById` رجّع `null` وحصل خطأ.

### نسيان beginPath
```html bad
ctx.moveTo(0,0); ctx.lineTo(50,50); ctx.stroke();
ctx.moveTo(50,0); ctx.lineTo(0,50); ctx.stroke();  // بيعيد رسم الخط الأول كمان
```
```html good
ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(50,50); ctx.stroke();
ctx.beginPath(); ctx.moveTo(50,0); ctx.lineTo(0,50); ctx.stroke();
```
ليه؟ من غير `beginPath()` المسارات بتتراكم وكل `stroke()` بيعيد رسم اللي قبله.

## a11y

- الكانفاس **مش متاح** تلقائياً: قارئ الشاشة مش بيشوف اللي مرسوم.
- حط وصف نصي جوه الوسم، و`role="img"` و`aria-label` للرسمة الثابتة.
- للعناصر التفاعلية (ألعاب، رسوم بيانية) وفّر بديل نصي أو أزرار HTML حقيقية.
- متعتمدش على اللون بس لنقل معلومة.
- احترم `prefers-reduced-motion` في الحركات.

## tips

- لحركات كتير استخدم `requestAnimationFrame` مش `setInterval`.
- لرسم ثلاثي الأبعاد استخدم `getContext('webgl')` أو مكتبة (Three.js).
- لو الأداء بطيء، قلّل الرسم في كل إطار أو استخدم `OffscreenCanvas`.
- احفظ الرسمة بـ `canvas.toDataURL()` أو `canvas.toBlob()`.
- استخدم `ctx.save()` و`ctx.restore()` لحفظ واسترجاع الإعدادات.

## quiz

### إيه الفرق بين `width` كخاصية HTML و`width` في CSS على الكانفاس؟
- [ ] مفيش فرق
- [x] الخاصية بتحدد الدقة الفعلية، والـ CSS بيمدّد المعروض بس
- [ ] الـ CSS أدق
- [ ] الخاصية بتلوّن
الدقة الأصلية بتتحدد بالخصائص.

### أنهي أنسب للألعاب وآلاف العناصر المتحركة؟
- [ ] `<svg>`
- [x] `<canvas>`
- [ ] `<table>`
- [ ] `<img>`
الكانفاس أسرع لأنه بكسلات.

### إيه بيحصل لو نسيت `beginPath()`؟
- [ ] مفيش حاجة
- [x] المسارات القديمة بتتراكم وبتتعاد رسمها
- [ ] اللوحة بتتمسح
- [ ] بيطلع خطأ
`beginPath()` بيبدأ مسار جديد.

### إزاي تمسح اللوحة؟
- [x] `ctx.clearRect(0, 0, w, h)`
- [ ] `ctx.delete()`
- [ ] `canvas.remove()`
- [ ] `ctx.erase()`
`clearRect` بيمسح مستطيل.

## refs

- [MDN: canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas)
- [MDN: Canvas API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [WHATWG: The canvas element](https://html.spec.whatwg.org/multipage/canvas.html)
