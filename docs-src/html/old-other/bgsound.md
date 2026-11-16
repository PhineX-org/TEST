---
id: bgsound
kind: element
cat: old-other
tag: bgsound
title: صوت الخلفية (bgsound)
en: HTML bgsound element (obsolete)
status: obsolete
display: none
void: yes
support: none
size: compact
summary: عنصر bgsound كان بيشغّل صوت تلقائي في خلفية الصفحة (خاص بإنترنت إكسبلورر). اتشال، والبديل audio مع controls، ومتصفحات اليوم بتمنع التشغيل التلقائي.
keywords: bgsound, صوت الخلفية, موسيقى, Internet Explorer, audio, autoplay, loop, قديم, obsolete
related: audio, source, embed, video
---

## intro

`<bgsound>` كان عنصر **خاص بإنترنت إكسبلورر** (مش معياري) بيشغّل ملف صوتي أول ما الصفحة تفتح: `<bgsound src="song.mid" loop="infinite">`. كل صفحات المنتديات والمواقع الشخصية في التسعينات كان عليها «موسيقى خلفية» تفاجئك أول ما تدخل.

بعد كده الناس كرهت الفكرة، وIE اتقفل، والمتصفحات الحديثة مش بتدعمه. وكمان **سياسات التشغيل التلقائي** في كروم وسفاري وفايرفوكس بتمنع أي صوت من غير تفاعل من المستخدم. الصح: **[[audio]] مع `controls`** عشان المستخدم هو اللي يختار يشغّل أو لأ.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<bgsound>` خاص بـ IE ومش شغال. استخدم `<audio controls>` ومتشغّلش صوت تلقائي.

## instead

استخدم [[audio]] مع `controls` عشان المستخدم هو اللي يتحكم. التشغيل التلقائي بيتمنع غالباً، وهو مزعج وبيضر الإتاحة.

```html
<audio controls src="sample.mp3">متصفحك مش بيدعم الصوت.</audio>
```

## examples

### 1) الكود القديم (مش شغال)
موسيقى تلقائية.

```html nolive
<bgsound src="music.mid" loop="infinite" volume="-1000">
```

- `loop="infinite"` كان بيعيد الصوت للأبد.
- عنصر فاضي (من غير وسم ختامي).
- المتصفحات الحديثة تتجاهله بالكامل.

### 2) مشغّل صوت بزرار تحكم
audio.

```html
<audio controls loop src="sample.mp3" style="width:100%">
  متصفحك مش بيدعم الصوت.
</audio>
```

- `controls` بيظهر أزرار تشغيل وإيقاف وصوت.
- `loop` بيعيد التشغيل لو المستخدم عايز.
- المستخدم هو اللي يضغط تشغيل: ده الأسلوب المقبول.

### 3) تشغيل بزرار من عندك
جافاسكربت.

```html
<button id="b">▶ شغّل الصوت</button>
<audio id="a" src="sample.mp3"></audio>
<script>
  const a = document.getElementById('a'), b = document.getElementById('b');
  b.onclick = () => { a.paused ? a.play() : a.pause(); b.textContent = a.paused ? '▶ شغّل الصوت' : '⏸ إيقاف'; };
</script>
```

- `play()` بتشتغل لأنها جت بعد ضغطة المستخدم.
- بنبدّل بين تشغيل وإيقاف بنفس الزرار.
- دايماً سيب للمستخدم إيقاف الصوت بسهولة.

## refs

- [MDN: bgsound](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bgsound)
