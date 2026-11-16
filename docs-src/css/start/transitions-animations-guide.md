---
id: transitions-animations-guide
kind: guide
cat: start
title: الحركة: transition و animation
en: Transitions and animations
status: stable
summary: اتعلّم تحرّك العناصر بنعومة: transition للتغيّر البسيط (hover) وanimation مع @keyframes للحركات المعقدة، وإزاي تحافظ على الأداء وراحة المستخدم.
keywords: transition, animation, keyframes, hover, حركة, تحريك, ease, duration, transform, prefers-reduced-motion, تأثيرات
related: transition, animation, at-keyframes, transform, fn-cubic-bezier, hover
---

## intro

الحركة في CSS نوعين:

**1) الـ Transition (الانتقال)**: بتقول «لما الخاصية دي تتغير، متغيّرهاش فجأة، غيّرها **بالتدريج**». بتحتاج نقطتين: الحالة العادية والحالة المتغيّرة (غالباً `:hover`). بتكتب `transition: property duration timing` مثلاً `transition: background .3s ease`.

**2) الـ Animation (التحريك)**: للحركات اللي بتشتغل لوحدها أو بتتكرر. بتعرّف الإطارات بـ [[at-keyframes]] (من `0%` لـ `100%`)، وبتشغّلها بـ [[animation]] مثلاً `animation: pulse 2s infinite`.

نصايح مهمة:
- **حرّك الخصائص الخفيفة**: `transform` و`opacity` ([[transform]]) بتتحرك على كرت الشاشة بسلاسة. تجنّب تحريك `width` و`top` لأنها بتبطّئ الصفحة.
- **المدة المناسبة**: 150–300ms للتفاعلات الصغيرة، و300–600ms للحركات الأكبر.
- **السرعة (easing)**: `ease-out` للدخول، `ease-in` للخروج، و`ease-in-out` للتنقل.
- **احترم المستخدم**: ناس بتتعب من الحركة، فاستخدم `@media (prefers-reduced-motion: reduce)` علشان تقلّلها.

> [!analogy] Transition زي إنك تفتح ستارة ببطء بدل ما تشدّها فجأة. Animation زي مروحة سقف: بتلف لوحدها طول الوقت.

## try

```html
<style>
  .btn { background:#7a4a1d; color:#f3ede0; padding:12px 22px; border:0; border-radius:8px;
         cursor:pointer; transition:background .3s, transform .2s; }
  .btn:hover { background:#3d7a5a; transform:translateY(-3px); }
</style>
<button class="btn">مرّر الماوس</button>
```

## examples

### 1) transition على hover
اللون والحجم بيتغيّروا بسلاسة لما تقف بالماوس.

```html
<style>
  .card { width:120px; padding:20px; background:#efe0bd; color:#3d2c18; text-align:center;
          border-radius:10px; transition:transform .3s ease, box-shadow .3s ease; }
  .card:hover { transform:scale(1.08); box-shadow:0 8px 18px rgba(60,40,20,.25); }
</style>
<div class="card">مرّر عليّ</div>
```

- شيل `transition` وشوف الفرق.

### 2) animation بسيطة
مربع بيطلع وينزل بشكل متكرر.

```html
<style>
  @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-30px); } }
  .ball { width:40px; height:40px; background:#b5551f; border-radius:50%;
          animation:bounce 1s ease-in-out infinite; margin-top:34px; }
</style>
<div class="ball"></div>
```

- `infinite` = تكرار للأبد.

### 3) spinner (لودنج)
دايرة بتلف: أشهر استخدام للـ animation.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .sp { width:44px; height:44px; border:5px solid #efe0bd; border-top-color:#7a4a1d;
        border-radius:50%; animation:spin .9s linear infinite; }
</style>
<div class="sp"></div>
```

- `linear` علشان الدوران يبقى ثابت.

### 4) تقليل الحركة
`prefers-reduced-motion` بتوقف الحركة لمن يحتاج.

```html
<style>
  @keyframes pulse { 50% { opacity:.4; } }
  .dot { width:30px; height:30px; background:#3d7a5a; border-radius:50%; animation:pulse 1.2s infinite; }
  @media (prefers-reduced-motion: reduce) { .dot { animation:none; } }
</style>
<div class="dot"></div>
```

- احترام إعدادات المستخدم نقطة وصولية مهمة.

## mistakes

### تحريك خصائص تقيلة

```css bad
.box { transition:width .3s; }
```

```css good
.box { transition:transform .3s; }
.box:hover { transform:scaleX(1.2); }
```

تحريك الأبعاد بيعمل إعادة حساب للتخطيط (reflow) وبيبطّئ.

### حركة طويلة جداً

```css bad
.btn { transition:all 2s; }
```

```css good
.btn { transition:background .2s; }
```

الحركة البطيئة بتدّي إحساس بتقل التطبيق.

## quiz

### أنهي خاصيتين أخف في التحريك؟
- [ ] width و height
- [x] transform و opacity
- [ ] top و left
- [ ] margin و padding

بيتحركوا على GPU.

### الـ keyframes بتتكتب بـ؟
- [ ] @media
- [x] @keyframes
- [ ] @import
- [ ] @font-face

`@keyframes اسم { ... }`.

### prefers-reduced-motion بتخدم مين؟
- [ ] الشاشات الكبيرة
- [x] اللي بيفضّلوا حركة أقل
- [ ] الموبايل
- [ ] المبرمجين

إعداد النظام للمستخدمين الحساسين للحركة.

## refs

- [MDN: Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations)
