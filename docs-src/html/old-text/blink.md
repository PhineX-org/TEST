---
id: blink
kind: element
cat: old-text
tag: blink
title: النص الوامض (blink)
en: HTML blink element (obsolete)
status: obsolete
display: inline
void: no
support: none
size: compact
summary: عنصر blink كان بيخلّي النص يومض (يختفي ويظهر). اتشال خلاص من المتصفحات لأنه مزعج وخطر على بعض المستخدمين، والبديل CSS animation مع احترام prefers-reduced-motion.
keywords: blink, وميض, يومض, نص وامض, animation, Netscape, قديم, obsolete, flash, مزعج
related: marquee, span, style
---

## intro

`<blink>` من أشهر مزحات الويب القديمة: عنصر من Netscape بيخلّي النص **يومض** (يظهر ويختفي مرة كل نص ثانية). الناس كرهته، وحتى مصممين المتصفحات سخروا منه. وهو **مش جزء من أي معيار** فعلي، ومتصفحاتنا الحديثة **شالته بالكامل**: لو كتبته هتلاقي النص عادي من غير وميض.

وبعيداً عن الإزعاج، الوميض بيضر: بيأثر على ناس عندها **حساسية للضوء (نوبات صرع)** وبيشتّت ناس عندها صعوبات تركيز. لو فعلاً عايز لفت انتباه لحظي، استخدم **CSS animation** بحذر، وعلى الأقل **احترم `prefers-reduced-motion`**، ومتخلّيش حاجة تومض أكتر من 3 مرات في الثانية (WCAG 2.3.1).

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<blink>` اتشال تماماً. لو لازم تأثير: CSS animation مع `prefers-reduced-motion`.

## instead

استخدم CSS animation على [[span]] مع `@keyframes`، وأضف `@media (prefers-reduced-motion: reduce)` لإلغاء الحركة، ومتجعلهوش أسرع من 3 مرات في الثانية.

```html
<style>
  .pulse { animation: pulse 1.6s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: .35 } }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none } }
</style>
<p>انتبه: <span class="pulse">عرض لفترة محدودة</span></p>
```

## examples

### 1) الكود القديم (مش شغال)
ما بيومضش.

```html nolive
<blink>ده كان بيومض في Netscape</blink>
```

- المتصفحات الحديثة بتعرض النص عادي من غير وميض.
- مفيش أي تأثير للعنصر.
- لو شفته في كود قديم، شيله أو بدّله.

### 2) بديل ناعم بـ CSS
نبض بدل وميض.

```html
<style>
  .pulse { animation: pulse 1.6s ease-in-out infinite; font-weight:bold; color:#b91c1c }
  @keyframes pulse { 50% { opacity: .35 } }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none } }
</style>
<p>عرض <span class="pulse">لفترة محدودة</span> فقط!</p>
```

- `opacity` بيتغيّر بنعومة بدل ما يختفي فجأة.
- الدورة 1.6 ثانية: أبطأ بكتير من حد الخطورة.
- `prefers-reduced-motion` بيلغي الحركة لو المستخدم طلب كده.

### 3) لفت الانتباه من غير حركة
بدائل ثابتة.

```html
<p style="background:#fef3c7; border:2px solid #f59e0b; padding:10px; border-radius:8px">
  <strong>تنبيه:</strong> الخصم ينتهي النهارده.
</p>
```

- اللون والإطار بيلفتوا الانتباه من غير حركة.
- ده أنسب لكل المستخدمين بما فيهم قارئات الشاشة.
- فكّر في الحركة كآخر خيار.

## refs

- [MDN: blink](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blink)
