---
id: svg
kind: element
cat: embedded
tag: svg
title: الرسومات المتجهة (svg)
en: HTML SVG element
status: stable
display: inline
void: no
support: all
summary: بيرسم صور متجهية (Vector) بالكود جوه الصفحة: أشكال وخطوط ونصوص وتدرجات وحركة، من غير ما تتشوه مهما كبّرتها، وتقدر تتحكم فيها بـ CSS وجافاسكربت.
keywords: svg, رسم متجه, vector, viewBox, path, rect, circle, line, text, gradient, أيقونة, شعار, رسوم بيانية, animate, inline svg
related: img, canvas, math, picture, object
---

## intro

الصور العادية (JPG وPNG) مكوّنة من **بكسلات**: لو كبّرتها بتتشوه وتبقى مكعبات. أما **SVG** (**Scalable Vector Graphics**: رسوم متجهية قابلة للتكبير) فهي **أوامر رسم**: «ارسم دايرة نصف قطرها 40 في المكان ده، لونها أخضر». المتصفح بيرسمها من الأول بأي حجم، فتفضل **حادة جداً** على أي شاشة. وحجمها صغير جداً غالباً.

العنصر `<svg>` هو **حاوية الرسمة** جوه صفحة HTML (اسمها Inline SVG). وجواه عناصر الرسم: `<rect>` مستطيل، `<circle>` دايرة، `<ellipse>`، `<line>` خط، `<polygon>` شكل متعدد، `<path>` أي مسار معقد، `<text>` نص، `<g>` لتجميع عناصر. وكلهم بيتلوّنوا بـ `fill` (التعبئة) و`stroke` (الحدود).

أهم خاصية: **`viewBox="x y width height"`**: ده **نظام الإحداثيات الداخلي** للرسمة. بتصمّم على مساحة مثلاً `0 0 100 100`، وبعدين تقدر تعرض الـ svg بأي `width` و`height` والرسمة بتتكبّر وتتصغّر تلقائياً. من غير `viewBox` الرسمة بتبقى ثابتة المقاس.

والحلو في **Inline SVG** إنك تقدر تتحكم فيه بـ **CSS** (ألوان، hover، انتقالات) وبـ **جافاسكربت** (تضيف وتعدل عناصر). ده بيخليه الأنسب للأيقونات والشعارات والرسوم البيانية والتفاعل. وكمان تقدر تحطه كملف خارجي: `<img src="logo.svg">` (بس ساعتها مبتتحكمش فيه من CSS الصفحة).

> [!analogy] الصورة العادية زي **صورة فوتوغرافية** لو كبرتها بتتشوه. الـ SVG زي **وصفة**: «اعمل دايرة قطرها كذا». تطبخها صغيرة أو بحجم حيطة، تطلع نفس الجودة.

> [!key] `<svg viewBox="0 0 100 100">` + أشكال (`rect`, `circle`, `path`...) بـ `fill` و`stroke`. بيتكبّر من غير تشوّه ويتنسّق بـ CSS.

## try

غيّر الألوان والأرقام وشوف الرسمة بتتحرك.

```html
<svg viewBox="0 0 200 120" width="240" role="img" aria-label="شمس وجبل ونهر">
  <rect width="200" height="120" fill="#bae6fd" rx="10"/>
  <circle cx="160" cy="30" r="16" fill="#fbbf24"/>
  <polygon points="0,120 70,40 130,120" fill="#16a34a"/>
  <polygon points="80,120 140,60 200,120" fill="#15803d"/>
</svg>
```

## syntax

```html nolive
<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="orange" stroke="black" stroke-width="3"/>
  <text x="110" y="55" font-size="20">نص</text>
</svg>
```

- `<svg ...>` — **الحاوية**.
- `viewBox` — **نظام الإحداثيات الداخلي**.
- `width` و`height` — **المقاس المعروض**.
- `xmlns` — **مساحة الأسماء** (مطلوبة بس في ملفات `.svg` المستقلة، مش جوه HTML).
- العناصر — `circle`, `rect`, `path`, `text`...
- `</svg>` — **الوسم الختامي**.

## use

- للأيقونات والشعارات.
- للرسوم البيانية والإنفوجرافيك.
- للرسوم التوضيحية اللي لازم تتكبّر بدون تشوه.
- لحركات وتفاعل بسيط بـ CSS أو جافاسكربت.
- لخلفيات وأنماط صغيرة الحجم.

## avoid

- متستخدمهوش للصور الفوتوغرافية: JPG أو WebP أحسن.
- متكتبش رسمة معقدة جداً بالإيد: استخدم أداة (Figma, Inkscape).
- متنساش `viewBox` لو عايزها تتجاوب.
- متحطش `svg` من مصدر غير موثوق inline: ممكن يحتوي سكريبت.

## attributes

### viewBox
**نظام الإحداثيات الداخلي**: أربع أرقام `min-x min-y width height`. بيخلّي الرسمة تتكبّر وتتصغّر.

```html nolive
<svg viewBox="0 0 100 100" width="300">...</svg>
```

### width
**عرض الـ svg المعروض.** لو مش محدد، بياخد عرض المساحة المتاحة أو 300.

### height
**ارتفاع الـ svg المعروض.** (الافتراضي 150).

### xmlns
**مساحة الأسماء** `http://www.w3.org/2000/svg`. بتتكتب في ملفات `.svg` المستقلة، ومش لازم جوه HTML.

### preserveAspectRatio
**بيتحكم في سلوك الرسمة** لو نسبة `viewBox` مختلفة عن نسبة المساحة (توسيط، قص، تمدد).

### fill
**لون تعبئة الأشكال** جواه (بيتوارث).

### stroke
**لون الحدود** (بيتوارث).

### role
**دور إتاحة**، زي `img` لو الرسمة صورة ليها معنى.

### aria-label
**وصف نصي** للرسمة لقارئ الشاشة.

### focusable {deprecated}
كانت لـ IE فقط. **قديمة**، متستخدمهاش.

## examples

### 1) أشكال أساسية
مستطيل ودايرة وخط.

```html
<svg viewBox="0 0 240 100" width="260" role="img" aria-label="مستطيل ودائرة وخط">
  <rect x="10" y="10" width="70" height="60" fill="#38bdf8" rx="8"/>
  <circle cx="130" cy="40" r="30" fill="#f97316"/>
  <line x1="180" y1="10" x2="230" y2="80" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
</svg>
```

- كل شكل ليه إحداثيات (`x`, `y`, `cx`, `cy`) وأبعاد (`width`, `r`).
- `rx` بيدوّر زوايا المستطيل.
- `stroke-linecap="round"` بيدوّر أطراف الخط.
- نقطة (0,0) في **أعلى اليسار**، و`y` بتزيد لتحت.

### 2) path: أي شكل
أوامر المسار.

```html
<svg viewBox="0 0 100 100" width="120" role="img" aria-label="قلب">
  <path d="M50 88 C10 55 10 20 32 20 C42 20 50 28 50 36 C50 28 58 20 68 20 C90 20 90 55 50 88 Z"
        fill="#ef4444"/>
</svg>
```

- `M` ابدأ من نقطة، `C` منحنى بيزييه، `Z` اقفل المسار.
- الأحرف الكبيرة إحداثيات مطلقة، والصغيرة نسبية.
- `<path>` هو الأقوى: أي شكل ممكن يترسم بيه.
- الأيقونات الجاهزة غالباً `<path>` واحد.

### 3) نص وتدرج لوني
`text` و`linearGradient`.

```html
<svg viewBox="0 0 240 80" width="260" role="img" aria-label="نص بتدرج لوني">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#39ff14"/>
      <stop offset="1" stop-color="#0ea5e9"/>
    </linearGradient>
  </defs>
  <text x="120" y="55" font-size="44" font-weight="bold" text-anchor="middle" fill="url(#g)">PhineX</text>
</svg>
```

- `<defs>` بتخزّن عناصر للاستخدام (زي التدرجات).
- `fill="url(#g)"` بيستخدم التدرج بالـ `id`.
- `text-anchor="middle"` بيوسّط النص على `x`.
- النص في SVG حقيقي: قابل للتحديد والبحث.

### 4) تنسيق بـ CSS وتفاعل
hover وانتقال.

```html
<style>
  .btn { fill: #6366f1; transition: fill .2s, transform .2s; transform-origin: center; transform-box: fill-box; cursor: pointer; }
  .btn:hover { fill: #ec4899; transform: scale(1.15); }
</style>
<svg viewBox="0 0 160 80" width="200" role="img" aria-label="دائرة تفاعلية">
  <circle class="btn" cx="80" cy="40" r="28"/>
</svg>
```

- ده الميزة الكبيرة لـ Inline SVG: الـ CSS بيتحكم في `fill` وغيره.
- `transform-box: fill-box` بيخلّي نقطة الدوران في مركز الشكل نفسه.
- الـ `:hover` بيغيّر اللون والحجم بسلاسة.
- لو الـ SVG في `<img>` الـ CSS ده مش هيشتغل عليه.

### 5) حركة SMIL
`animate`.

```html
<svg viewBox="0 0 200 60" width="240" role="img" aria-label="دائرة بتتحرك">
  <circle cy="30" r="14" fill="#f59e0b">
    <animate attributeName="cx" values="20;180;20" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

- `<animate>` بيغيّر خاصية (`cx`) بمرور الوقت.
- `values` قايمة القيم، و`dur` المدة، و`repeatCount="indefinite"` تكرار دايم.
- ده اسمه SMIL، وبيشتغل من غير CSS أو JS.
- للحركات المعقدة النهارده بنفضّل CSS animations أو مكتبة.

### 6) إعادة استخدام بـ use
مرّة تعريف وكذا نسخة.

```html
<svg viewBox="0 0 200 60" width="240" role="img" aria-label="نجوم متكررة">
  <defs>
    <polygon id="star" points="15,2 19,11 29,12 21,19 24,29 15,24 6,29 9,19 1,12 11,11"/>
  </defs>
  <use href="#star" x="0" y="10" fill="#fbbf24"/>
  <use href="#star" x="50" y="10" fill="#f97316"/>
  <use href="#star" x="100" y="10" fill="#ef4444"/>
  <use href="#star" x="150" y="10" fill="#a855f7"/>
</svg>
```

- بتعرّف الشكل مرة واحدة في `<defs>` وبتكرره بـ `<use>`.
- كل نسخة ممكن يكون ليها لون ومكان مختلف.
- بيقلل الكود، وده الأساس في «أيقونات sprite».

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: عناصر SVG (أشكال، `g`، `defs`، `text`...) وبعض عناصر HTML المسموحة في SVG.
- closing: الوسم الختامي `</svg>` إجباري.
- role: `graphics-document` (أو `img` لو حطيت `role="img"`).
- dom: `SVGSVGElement`.
- layout: `display: inline`، Replaced Element بمقاس 300×150 افتراضياً.

## mistakes

### نسيان viewBox
```html bad
<svg width="100" height="100"><circle cx="50" cy="50" r="50"/></svg>
```
```html good
<svg viewBox="0 0 100 100" width="100"><circle cx="50" cy="50" r="50"/></svg>
```
ليه؟ من غير `viewBox` الرسمة ثابتة ومش بتتكبّر مع تغيير `width`.

### نسيان وصف الإتاحة
```html bad
<svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
```
```html good
<svg viewBox="0 0 24 24" role="img" aria-label="نجمة">
  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
</svg>
```
ليه؟ قارئ الشاشة مش هيعرف الرسمة دي إيه. لو زينة بس اكتب `aria-hidden="true"`.

### كتابة اسم العنصر غلط في الحروف
```html bad
<svg viewbox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>
```
```html good
<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>
```
ليه؟ جوه SVG الأسماء حساسة لحالة الحروف (`viewBox` بـ B كبيرة).

## a11y

- لو الرسمة معبّرة: `role="img"` و`aria-label` أو `<title>` جواها.
- لو زينة: `aria-hidden="true"`.
- الرسوم البيانية المعقدة: وفّر جدول أو نص بالبيانات.
- تأكد من التباين الكافي بين الألوان.
- لو تفاعلية، خلّي العناصر قابلة للوصول بالكيبورد (`tabindex`, `role`, أحداث).

## tips

- `currentColor` في `fill` بيخلّي الأيقونة تاخد لون النص المحيط.
- حسّن الـ SVG بأدوات زي SVGO قبل النشر.
- للأيقونات المتكررة استخدم `<symbol>` و`<use>`.
- لو الرسمة ثابتة وكبيرة، `<img src="x.svg">` بيستفيد من الكاش.
- ابدأ بـ `viewBox` مربع بسيط (24×24 أو 100×100).

## quiz

### إيه الخاصية اللي بتخلّي الـ SVG يتكبّر ويتصغّر مع الحفاظ على الشكل؟
- [ ] `size`
- [x] `viewBox`
- [ ] `scale`
- [ ] `zoom`
هي نظام الإحداثيات الداخلي.

### فين نقطة (0,0) في SVG؟
- [ ] أسفل اليسار
- [x] أعلى اليسار
- [ ] المركز
- [ ] أعلى اليمين
و`y` بيزيد لتحت.

### إيه الفرق بين `fill` و`stroke`؟
- [x] التعبئة والحدود
- [ ] الحجم واللون
- [ ] الخط والنص
- [ ] مفيش فرق
`fill` للتعبئة و`stroke` للحدود.

### ليه SVG أحسن من PNG للأيقونات؟
- [ ] لأنه أبطأ
- [x] لأنه بيتكبّر بدون تشوه وحجمه صغير وبيتنسّق بـ CSS
- [ ] لأنه صورة فوتوغرافية
- [ ] مفيش ميزة
قابل للتحجيم والتحكم.

## refs

- [MDN: svg](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/svg)
- [MDN: SVG tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials)
- [WHATWG: SVG in HTML](https://html.spec.whatwg.org/multipage/embedded-content-other.html#svg-0)
