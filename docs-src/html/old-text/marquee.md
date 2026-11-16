---
id: marquee
kind: element
cat: old-text
tag: marquee
title: النص المتحرك (marquee)
en: HTML marquee element (deprecated)
status: deprecated
display: inline-block
void: no
support: all
size: compact
summary: عنصر marquee بيحرّك النص أو الصورة أفقياً أو رأسياً بشكل تلقائي. اتحذف لأنه مزعج وغير متاح، والبديل CSS animation مع احترام prefers-reduced-motion.
keywords: marquee, نص متحرك, شريط, تمرير, animation, scrollamount, direction, behavior, قديم, deprecated, أخبار
related: div, span, style
---

## intro

`<marquee>` كان من أشهر عناصر التسعينات: نص بيجري على الصفحة زي شريط الأخبار. اخترعته Microsoft وبقى منتشر، لكنه **مش جزء من أي معيار** رسمي، ومزعج: الحركة بتشتّت وبتأذي ناس كتير (حساسية الحركة، صعوبات التركيز، قارئات الشاشة اللي بتتلخبط).

المتصفحات الحديثة لسه بتدعمه للتوافق، لكن الأفضل جداً تعمل نفس التأثير بـ **CSS animation** (`@keyframes` و`transform`) وتتحكم فيه: زرار إيقاف مؤقت، واحترام إعداد المستخدم `prefers-reduced-motion`. وبكده تبقى متحكم في الحركة ومتاحة.

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<marquee>` مزعج وغير معياري. استخدم CSS animation مع إمكانية الإيقاف.

## try

```html
<marquee behavior="scroll" direction="right" scrollamount="4">نص بيجري على الشاشة ➜</marquee>
```

## syntax

```html nolive
<marquee behavior="scroll" direction="left" scrollamount="6">النص</marquee>
```

- `behavior` — **`scroll` أو `slide` أو `alternate`**.
- `direction` — **الاتجاه** (`left` أو `right` أو `up` أو `down`).
- `scrollamount` — **السرعة**.
- `</marquee>` — **الوسم الختامي**.

## use

- موجود في صفحات قديمة محتاج تفهمها.
- للتعرّف على الفرق مع CSS animation.

## avoid

- متستخدمهوش: غير معياري ومش متاح.
- متعملش حركة مستمرة من غير زرار إيقاف.

## instead

استخدم CSS animation مع `@keyframes`، وأضف احترام `prefers-reduced-motion` ويفضّل زرار إيقاف.

```html
<style>
  .ticker { overflow: hidden; white-space: nowrap; }
  .ticker span { display: inline-block; animation: run 8s linear infinite; }
  @keyframes run { from { transform: translateX(100%) } to { transform: translateX(-100%) } }
  @media (prefers-reduced-motion: reduce) { .ticker span { animation: none } }
</style>
<div class="ticker"><span>نص بيجري على الشاشة</span></div>
```

## examples

### 1) اتجاهات مختلفة
direction.

```html
<marquee direction="left" scrollamount="5">← شمال</marquee>
<marquee direction="right" scrollamount="5">يمين →</marquee>
```

- `direction` بيحدد اتجاه الحركة.
- `scrollamount` أكبر = أسرع.
- القيمة الافتراضية للحركة بتختلف حسب اتجاه اللغة.

### 2) التمرير بالتناوب
التناوب.

```html
<marquee behavior="alternate" scrollamount="4" style="border:1px solid #cbd5e1">رايح جاي ↔</marquee>
```

- `alternate` بيخلّي النص يروح ويرجع بدل ما يكرر من الأول.
- `slide` بيمشي مرة واحدة ويقف عند الحافة.
- كل ده ممكن تعمله بـ CSS مع تحكم أدق.

### 3) البديل الحديث بـ CSS
ticker قابل للتوقف.

```html
<style>
  .t { overflow:hidden; white-space:nowrap; border:1px solid #cbd5e1; padding:6px }
  .t span { display:inline-block; animation: go 7s linear infinite }
  .t:hover span { animation-play-state: paused }
  @keyframes go { from { transform: translateX(100%) } to { transform: translateX(-100%) } }
  @media (prefers-reduced-motion: reduce) { .t span { animation: none } }
</style>
<div class="t"><span>خبر عاجل: الكورسات مجانية للجميع</span></div>
```

- `animation-play-state: paused` بيوقف الحركة لما تقف بالماوس.
- `prefers-reduced-motion` بيحترم تفضيل المستخدم.
- ده بديل متاح وقابل للتحكم.

## mistakes

### حركة مستمرة من غير تحكم
```html bad
<marquee>إعلان</marquee>
```
```html good
<div class="ticker"><span>إعلان</span></div>
<!-- مع animation قابل للإيقاف و prefers-reduced-motion -->
```
ليه؟ الحركة المستمرة بتأذي ناس كتير، ولازم المستخدم يقدر يوقفها (WCAG 2.2.2).

## quiz

### إيه المشكلة الأكبر في `<marquee>`؟
- [ ] حجمه كبير
- [x] مزعج وغير معياري وغير متاح
- [ ] مش بيعرض عربي
- [ ] بيبوّظ CSS
الحركة التلقائية من غير تحكم.

### إيه البديل؟
- [x] CSS animation مع احترام prefers-reduced-motion
- [ ] `<move>`
- [ ] `<slide>`
- [ ] `<scroll>`
بتتحكم بالكامل.

## refs

- [MDN: marquee](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/marquee)
