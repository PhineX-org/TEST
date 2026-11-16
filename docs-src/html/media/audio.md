---
id: audio
kind: element
cat: media
tag: audio
title: عنصر الصوت
en: HTML audio element
status: stable
display: inline
void: no
support: all
summary: بيشغّل ملف صوت جوه الصفحة بمشغّل جاهز بيتحكم فيه المستخدم بخاصية controls. بيدعم مصادر متعددة بـ source وتحكم كامل بجافاسكربت: play وpause وvolume.
keywords: audio, صوت, mp3, ogg, wav, controls, autoplay, loop, muted, preload, مشغل, موسيقى, بودكاست, source
related: video, source, track, a, figure
---

## intro

عشان تحط صوت في صفحتك (بودكاست، موسيقى، نطق كلمة، تسجيل محاضرة) كان زمان لازم تحمّل Flash. دلوقتي كفاية عنصر `<audio>` (اختصار **Audio**) اللي بيشغّل الصوت **من المتصفح مباشرة** من غير أي إضافات. كل اللي محتاجه: ملف صوت و`controls` عشان يظهر المشغّل.

أبسط شكل: `<audio src="song.mp3" controls></audio>`. الخاصية **`controls`** بتظهر **مشغّل جاهز** (زرار تشغيل/إيقاف، شريط تقدّم، تحكم في الصوت). من غيرها العنصر مش بيظهر خالص ومحدش هيعرف يشغّله (إلا لو شغّلته بجافاسكربت أو `autoplay`).

وزي ما اتكلمنا عن [[source]]: الصيغ مش كلها مدعومة في كل المتصفحات، فتقدر تحط جوه `<audio>` أكتر من `<source>` (MP3 وOGG وغيرهم) والمتصفح يختار اللي يعرفه. والنص اللي تكتبه جواه بيظهر **احتياطي** في المتصفحات القديمة جداً.

حاجة مهمة جداً: المتصفحات الحديثة **بتمنع التشغيل التلقائي** (`autoplay`) للصوت لحد ما المستخدم يتفاعل مع الصفحة (يضغط أو يلمس)، لأنه مزعج. فلا تعتمد على `autoplay` لتشغيل صوت أول ما الصفحة تفتح.

> [!analogy] `<audio>` زي **مسجّل كاسيت** صغير جوه صفحتك. الملف هو الشريط، والـ `controls` هما الأزرار (تشغيل، إيقاف، صوت). من غير `controls` بيبقى المسجّل مخفي ومحدش يعرف يضغط عليه.

> [!key] `<audio controls>` = مشغّل صوت جاهز. ملفات متعددة بـ `<source>`. `autoplay` غالباً بيتمنع من المتصفح.

## try

اضغط تشغيل. جرّب تضيف `loop` أو `muted`.

```html
<audio controls src="sample.mp3">
  متصفحك مش بيدعم الصوت.
</audio>
```

## syntax

```html nolive
<audio src="song.mp3" controls preload="metadata" loop>
  متصفحك مش بيدعم الصوت.
</audio>
```

- `<audio ...>` — **الوسم الافتتاحي**.
- `src` — **ملف الصوت** (أو استخدم `<source>` جواه).
- `controls` — **بيظهر المشغّل**.
- `preload` و`loop` و`muted` و`autoplay` — خصائص تحكم اختيارية.
- النص جواه — **احتياطي** للمتصفحات القديمة.
- `</audio>` — **الوسم الختامي** إجباري.

## use

- لبودكاست أو تسجيل محاضرة أو درس.
- لموسيقى أو مؤثرات صوتية في صفحة.
- لنطق كلمة (قاموس لغات).
- لتشغيل صوت عن طريق جافاسكربت في ألعاب أو تنبيهات.

## avoid

- متعتمدش على `autoplay`: المتصفحات بتمنعه، وبيزعج المستخدمين.
- متنساش `controls` لو مش هتتحكم بالجافاسكربت.
- متحمّلش ملفات ضخمة من غير `preload="none"` أو `metadata`.
- متحطش معلومة مهمة في الصوت بس: وفّر نص مكتوب للنسخة (Transcript).

## attributes

### src
**مسار ملف الصوت.** لو عندك أكتر من صيغة استخدم `<source>` جواه بدلاً منها.

### controls {boolean}
**بتظهر المشغّل** الجاهز في المتصفح. من غيرها العنصر مخفي.

### autoplay {boolean}
**تشغيل تلقائي** أول ما الملف يجهز. المتصفحات بتمنعه غالباً إلا لو المستخدم تفاعل مع الصفحة، أو الصوت `muted`.

### loop {boolean}
**إعادة التشغيل** من الأول لما الملف يخلص.

### muted {boolean}
**يبدأ من غير صوت.** بيسمح بالتشغيل التلقائي في بعض الحالات.

### preload
**بيقول للمتصفح يحمّل قد إيه قبل التشغيل**: `none` (ولا حاجة)، `metadata` (المدة بس)، `auto` (الملف كله لو ينفع).

```html nolive
<audio src="podcast.mp3" controls preload="none"></audio>
```

### crossorigin
**طلب الملف بإذن CORS** لو جاي من دومين تاني (وبتستخدمه مع Web Audio API).

### controlslist
**تلميح لإخفاء بعض أزرار المشغّل** (مثل `nodownload`). دعمه مش متساوي بين المتصفحات.

### disableremoteplayback {boolean}
**بيمنع إرسال الصوت** لأجهزة خارجية (Cast).

## examples

### 1) مشغّل صوت بسيط
`controls` و`src`.

```html
<audio controls src="sample.mp3">
  متصفحك مش بيدعم الصوت.
</audio>
```

- `controls` بتظهر المشغّل الجاهز.
- `src` بيشاور على الملف.
- النص جواه بيظهر بس لو المتصفح قديم جداً ومبيعرفش `<audio>`.

### 2) أكتر من صيغة
`<source>`.

```html
<audio controls>
  <source src="sample.ogg" type="audio/ogg">
  <source src="sample.mp3" type="audio/mpeg">
  متصفحك مش بيدعم الصوت.
</audio>
```

- المتصفح بيجرّب الصيغ بالترتيب ويأخد أول واحدة يفهمها.
- الملف الأول هنا مش موجود فالمتصفح يرجع للتاني.
- `type` بيوفر تحميل ملفات مش هتتشغّل.

### 3) تحكم بالجافاسكربت
أزرار خاصة.

```html
<audio id="a" src="sample.mp3"></audio>
<button onclick="document.getElementById('a').play()">▶ شغّل</button>
<button onclick="document.getElementById('a').pause()">⏸ إيقاف</button>
<button onclick="document.getElementById('a').currentTime = 0">⏮ من الأول</button>
```

- الـ `<audio>` من غير `controls` مخفي، وبنتحكم فيه بالأزرار.
- `play()` و`pause()` دوال جاهزة في العنصر، و`currentTime` بيحدد مكان التشغيل بالثواني.
- التشغيل بيتم بعد ضغطة المستخدم فمفيش مشكلة `autoplay`.

### 4) تكرار وصوت منخفض
`loop` و`volume`.

```html
<audio id="b" src="sample.mp3" loop controls></audio>
<script>
  document.getElementById('b').volume = 0.4;
</script>
```

- `loop` بيخلّيه يعيد التشغيل بعد النهاية.
- `volume` قيمته من 0 (صامت) لـ 1 (أقصى مستوى)، وبيتغيّر بالجافاسكربت بس.
- المستخدم يقدر يغيّره بعد كده من المشغّل.

### 5) متابعة التقدّم
أحداث الصوت.

```html
<audio id="c" src="sample.mp3" controls></audio>
<p>الوقت: <span id="t">0</span> ثانية</p>
<script>
  const a = document.getElementById('c');
  a.addEventListener('timeupdate', () => {
    document.getElementById('t').textContent = a.currentTime.toFixed(1);
  });
</script>
```

- الحدث `timeupdate` بيتنفّذ كل ما وقت التشغيل يتغيّر.
- `currentTime` بيرجّع الثواني الحالية.
- ممكن تستخدمه لعرض شريط تقدّم مخصص أو ترجمة متزامنة.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: صفر أو أكتر من [[source]]، وبعدهم [[track]]، وبعدهم محتوى احتياطي (نص).
- closing: الوسم الختامي `</audio>` إجباري.
- role: مفيش دور محدد.
- dom: `HTMLAudioElement`.
- layout: `display: inline`؛ لو مفيش `controls` بيتخفى.

## mistakes

### نسيان controls
```html bad
<audio src="song.mp3"></audio>
```
```html good
<audio src="song.mp3" controls></audio>
```
ليه؟ من غير `controls` مفيش مشغّل ظاهر، فالمستخدم مايعرفش يشغّل الصوت.

### الاعتماد على autoplay
```html bad
<audio src="intro.mp3" autoplay></audio>
```
```html good
<audio src="intro.mp3" controls></audio>
```
ليه؟ المتصفحات بتمنع التشغيل التلقائي للصوت، وكمان بيزعج المستخدم. سيب القرار ليه.

### صوت بس من غير نص
```html bad
<audio src="lecture.mp3" controls></audio>
```
```html good
<audio src="lecture.mp3" controls></audio>
<p><a href="lecture.txt">اقرأ النص الكامل للمحاضرة</a></p>
```
ليه؟ الصم وضعاف السمع محتاجين نص مكتوب. الـ Transcript بيفيد أيضاً محركات البحث.

## a11y

- وفّر **Transcript** (نص مكتوب) لأي محتوى صوتي مهم.
- متشغّلش صوت تلقائي: بيعطّل قارئ الشاشة وبيزعج المستخدم.
- المشغّل الجاهز (`controls`) متاح بالكيبورد وقارئات الشاشة.
- لو عملت مشغّل مخصص، استخدم `<button>` حقيقية وأضف `aria-label` وضبط الفوكس.

## tips

- استخدم `preload="metadata"` للصفحات اللي فيها كذا ملف صوت.
- MP3 هو الأضمن، ولو عايز احتياطي ضيف OGG.
- جرّب الصوت على الموبايل، وخاصة الـ iOS اللي بيحتاج ضغطة قبل التشغيل.
- لو عايز مؤثرات صوتية في لعبة بتحتاج تحكم دقيق، شوف Web Audio API.

## quiz

### إيه الخاصية اللي بتظهر مشغّل الصوت؟
- [ ] `show`
- [x] `controls`
- [ ] `player`
- [ ] `display`
من غيرها `<audio>` مخفي.

### ليه `autoplay` ممكن ما يشتغلش؟
- [ ] لأن الملف تالف
- [x] المتصفحات بتمنع الصوت التلقائي قبل تفاعل المستخدم
- [ ] لأنه مش موجود
- [ ] لأنه قديم
ده قرار حماية من الإزعاج.

### إزاي تدعم أكتر من صيغة صوت؟
- [ ] تكتب `src` اتنين
- [x] تحط `<source>` متعددة جوه `<audio>`
- [ ] تحط `<img>`
- [ ] مش ممكن
المتصفح يختار أول صيغة يفهمها.

### إيه معنى `preload="none"`؟
- [x] متحمّلش حاجة قبل ما المستخدم يشغّل
- [ ] حمّل الملف كله
- [ ] اعمل تكرار
- [ ] أخفي المشغّل
بيوفر داتا للملفات الكبيرة.

## refs

- [MDN: audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio)
- [WHATWG: The audio element](https://html.spec.whatwg.org/multipage/media.html#the-audio-element)
