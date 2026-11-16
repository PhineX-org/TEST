---
id: applet
kind: element
cat: old-other
tag: applet
title: أبلت جافا (applet)
en: HTML applet element (obsolete)
status: obsolete
display: inline
void: no
support: none
size: compact
summary: عنصر applet كان بيشغّل برامج جافا صغيرة جوه الصفحة. اتشال بعد ما المتصفحات وقفت إضافات جافا، والبديل جافاسكربت وWebAssembly وCanvas لتطبيقات تفاعلية.
keywords: applet, جافا, Java, applet, برنامج صغير, إضافة, plugin, قديم, obsolete, WebAssembly, canvas
related: object, embed, iframe, canvas
---

## intro

في التسعينات، لو عايز تشغّل لعبة أو رسم تفاعلي في الصفحة كنت بتكتب برنامج بـ **جافا** وتحطه جوه `<applet code="Game.class" width="400" height="300">`. المتصفح كان بيحمّل **إضافة (Plugin)** اسمها Java Plugin وتشغّل البرنامج.

النهارده ده كله انتهى: الإضافات دي كانت بتسبب **ثغرات أمنية** كتير وبطيئة، فالمتصفحات وقفتها (بين 2015 و2017)، والعنصر `<applet>` **اتشال** ومبيعملش حاجة. اللي بياخد مكانه: **جافاسكربت** للتفاعل، و**Canvas** أو **SVG** للرسم، و**WebAssembly** لو عندك كود تقيل (C++ أو Rust أو حتى جافا متحوّلة).

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<applet>` اتشال مع إضافة جافا. استخدم جافاسكربت وCanvas وWebAssembly.

## instead

اكتب التفاعل بـ جافاسكربت على [[canvas]] أو [[svg]]. ولو عندك كود جافا قديم، في أدوات بتحوّله لـ JavaScript أو WebAssembly (زي CheerpJ وTeaVM).

```html
<canvas id="c" width="260" height="80" style="border:1px solid #cbd5e1"></canvas>
<script>
  const g = document.getElementById('c').getContext('2d');
  g.fillStyle = '#39ff14'; g.fillRect(10, 10, 120, 60);
  g.fillStyle = '#0f172a'; g.font = '16px sans-serif'; g.fillText('بديل الأبلت', 150, 45);
</script>
```

## examples

### 1) الكود القديم (مش شغال)
أبلت جافا.

```html nolive
<applet code="Clock.class" width="200" height="100">
  <param name="color" value="blue">
  لازم تثبّت جافا لعرض الساعة.
</applet>
```

- `code` اسم ملف الـ `.class` اللي بيتشغّل.
- النص جوه العنصر كان رسالة لما جافا مش مثبّتة، وهو اللي هيظهر دلوقتي.
- ولا متصفح حديث هيشغّله.

### 2) ساعة بجافاسكربت
بديل مباشر.

```html
<p id="clk" style="font:bold 28px monospace; direction:ltr"></p>
<script>
  const clk = document.getElementById('clk');
  const tick = () => clk.textContent = new Date().toLocaleTimeString('en-GB');
  tick(); setInterval(tick, 1000);
</script>
```

- ساعة حية بدون أي إضافة.
- `setInterval` بيحدّث الوقت كل ثانية.
- بتشتغل على الموبايل والكمبيوتر بنفس الكود.

### 3) رسم تفاعلي بـ Canvas
ارسم بالماوس.

```html
<canvas id="pad" width="280" height="110" style="border:1px solid #94a3b8; touch-action:none"></canvas>
<script>
  const cv = document.getElementById('pad'), g = cv.getContext('2d');
  let down = false;
  cv.onpointerdown = e => { down = true; g.beginPath(); g.moveTo(e.offsetX, e.offsetY); };
  cv.onpointermove = e => { if (!down) return; g.lineTo(e.offsetX, e.offsetY); g.stroke(); };
  cv.onpointerup = () => down = false;
</script>
```

- أحداث `pointer` بتشتغل بالماوس واللمس.
- `touch-action: none` بيمنع الصفحة من التمرير أثناء الرسم.
- ده النوع من التفاعل اللي كان محتاج أبلت زمان.

## refs

- [MDN: applet](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/applet)
