# خطة المنهج — موجة ١ (HTML · CSS · JavaScript · Tailwind)

الترتيب هنا = ترتيب التعلّم. **متستخدمش مفهوم لسه متشرحش قبل ملفك.** الملفات بتتسمّى `NN-id.md` (درس) أو `NN-id/` (مشروع) جوه فولدر الوحدة. الـ id = الاسم من غير الرقم.
`✔` = موجود بالفعل (مثال ذهبي، متعدّلوش).

مقاسات: درس ٧–١٤ KB (نثر ≥ ٣٠٠٠ حرف، ٥–٨ أقسام، `try` ١–٣، `quiz` ٣–٥)، اختبار وحدة ٨–١٢ سؤال، مشروع حسب الأرقام تحت. `time` للدرس ١٢–٢٥ دقيقة، للمشروع = (عدد الخطوات × ٣–٥) دقيقة.

---
## HTML — `learn/src/html/`

### u1-first-page «أول صفحة ويب»
- `01-how-the-web-works` — إزاي الويب شغال (browser/server/URL/HTML/CSS/JS)، Developer Tools و View Source، إيه هو الـ HTML، أول عنصر.
- `02-page-structure` — `DOCTYPE`/`html`/`head`/`body`/`meta charset`/`title`، الـ comments، العنصر والوسم والـ attribute.
- `03-headings-paragraphs` ✔
- `04-text-formatting` — `strong` `em` `b` `i` `mark` `small` `sub` `sup` `code` `pre` `blockquote` `q` `abbr` `br` `hr`، والـ entities (`&lt;` `&amp;`).
- `05-links` — `<a>`: href مطلق/نسبي، anchors داخل الصفحة، `mailto:` `tel:`، `target` و`rel`، `download`.
- `06-images` — `<img>`: src/alt/width/height، الصيغ (jpg/png/webp/svg)، `figure`/`figcaption`، alt الصح. (الأمثلة الشغّالة بـ SVG data-URI أو emoji لأن مفيش صور خارجية.)
- `07-lists` — `ul` `ol` `li` `dl`، التداخل، `start` `reversed` `type`.
- `08-profile-page` ✔ مشروع (٧ خطوات)
- `09-html-quiz-1` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال)

### u2-content «محتوى أغنى»
- `01-tables` — `table` `thead` `tbody` `tfoot` `tr` `th` `td` `caption` `colspan` `rowspan` `scope`، إمتى الجدول ومتى لأ.
- `02-audio-video-embeds` — `audio` `video` `source` `controls` `autoplay`/`muted`/`loop`، `iframe`، `loading`، قيود الـ autoplay. (المعاينة مفيهاش ملفات ميديا: اشرح بـ `nolive` أو `controls` فاضي.)
- `03-semantic-layout` — `header` `nav` `main` `section` `article` `aside` `footer` `figure`، ليه أحسن من `div`، مثال صفحة مدوّنة.
- `04-div-span-id-class` — `div`/`span`، `id` و`class` (الفرق)، `data-*`، `title` `hidden` `lang` `dir`.
- `05-file-paths` — فولدرات الموقع، مسارات نسبية/مطلقة، `index.html`، أسماء الملفات، ربط ملفات CSS/JS (كمقدمة).
- `06-recipe-page` — مشروع «صفحة وصفة أكل»: header + مكوّنات `ul` + خطوات `ol` + جدول قيم غذائية + `footer`. **٩ خطوات**.
- `07-html-quiz-2` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u3-forms «الفورمز وجمع البيانات»
- `01-form-basics` — `form` `action` `method`، `input` `name`، `button`، GET vs POST (مفهوم)، إيه اللي بيحصل لما تضغط Submit.
- `02-input-types` — `text` `email` `password` `number` `tel` `url` `date` `time` `color` `range` `file` `search` `hidden` `checkbox` `radio`.
- `03-labels-accessibility` — `label` (`for`/`id`، والـ wrapping)، `fieldset`/`legend`، `name` للـ radio، `autocomplete`، `placeholder` مش بديل الـ label.
- `04-textarea-select-datalist` — `textarea` `select` `option` `optgroup` `datalist` `button type` `output`.
- `05-validation` — `required` `minlength` `maxlength` `min` `max` `step` `pattern` `title`، رسائل المتصفح، `novalidate`، حدود الـ validation (لازم في السيرفر برضه).
- `06-contact-form` — مشروع «فورم اتصل بينا». **٩ خطوات**.
- `07-survey-form` — مشروع «استبيان رأي» (radio/checkbox/select/textarea/validation). **١٠ خطوات**.
- `08-html-quiz-3` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u4-pro «احترف الـ HTML»
- `01-accessibility` — لماذا، `alt`، landmarks، العناوين، الـ labels، الـ keyboard، `aria-label`/`role` (مقدمة)، skip link، الألوان والتباين.
- `02-head-meta-seo` — `meta description`، `viewport`، Open Graph، `link rel=icon`، `lang`، `canonical`، `title` الجيد.
- `03-responsive-images` — `srcset` `sizes` `picture` `loading="lazy"` `decoding`، `meta viewport`. (nolive لو محتاج صور.)
- `04-best-practices` — indentation، أسماء، validation (W3C)، أخطاء شائعة، الأداء، قائمة مراجعة.
- `05-restaurant-page` — مشروع ختامي «صفحة مطعم»: semantic layout + قائمة طعام (جدول وقوايم) + فورم حجز. **١٢ خطوة**.
- `06-html-quiz-4` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

---
## CSS — `learn/src/css/`  (الـ HTML في الأمثلة بسيط؛ التركيز على الـ CSS)

### u1-basics «أساسيات CSS»
- `01-what-is-css` — إيه هو CSS، الصيغة (selector/property/value)، ٣ طرق الربط (inline/internal/external) وإزاي نربط `style.css`، الـ comments.
- `02-selectors` — type / class / id / universal / group / descendant / child، الفرق بين class و id، متى تستخدم إيه.
- `03-colors-units` — أسماء ألوان، hex، rgb/rgba، hsl، `opacity`؛ وحدات: `px` `em` `rem` `%` `vw` `vh`.
- `04-text-fonts` — `font-family` (stacks وfallbacks)، `font-size/weight/style`، `line-height`، `text-align/decoration/transform`، `letter-spacing`، Google Fonts (بالشرح بس — مفيش شبكة في المعاينة).
- `05-box-model` — content/padding/border/margin، `box-sizing: border-box`، `width/height/max-width`، margin collapse، `margin: auto`.
- `06-backgrounds-borders` — `background` (color/image/gradient/size/position/repeat)، `border` shorthand، `border-radius`، `box-shadow`، `outline`.
- `07-profile-card` — مشروع «كارت تعريف». **٩ خطوات** (من الصفر: HTML + CSS في ملفين).
- `08-css-quiz-1` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u2-selectors-cascade «السلكتور والـ Cascade»
- `01-pseudo-classes` — `:hover` `:focus` `:active` `:first-child` `:last-child` `:nth-child()` `:not()` `:checked` `:disabled` `:focus-visible`.
- `02-pseudo-elements` — `::before` `::after` (و`content`) `::first-line` `::first-letter` `::placeholder` `::selection` `::marker`.
- `03-attribute-combinators` — `[attr]` `[attr=val]` `^=` `$=` `*=`، `>` `+` `~`.
- `04-cascade-specificity` — الوراثة (inheritance)، الـ specificity بالأرقام، الترتيب، `!important` (ومتى لأ)، `inherit/initial/unset`.
- `05-lists-links-buttons` — `list-style`، حالات الروابط، تصميم زرار حقيقي (padding/transition خفيف/cursor/focus).
- `06-login-page` — مشروع «صفحة تسجيل دخول» (فورم متصمّم بالكامل بـ ::placeholder و:focus). **١٠ خطوات**.
- `07-css-quiz-2` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u3-layout «التخطيط: Flexbox و Grid»
- `01-display-position` — `display` (block/inline/inline-block/none)، `position` (static/relative/absolute/fixed/sticky)، `top/left`، `z-index`، `overflow`.
- `02-flexbox-container` — `display:flex`، `flex-direction`، `flex-wrap`، `justify-content`، `align-items`، `align-content`، `gap`، التوسيط.
- `03-flexbox-items` — `flex-grow/shrink/basis` والـ shorthand `flex`، `order`، `align-self`، `margin-inline-start:auto`، أنماط شائعة (navbar، sticky footer، cards row).
- `04-grid-basics` — `display:grid`، `grid-template-columns/rows`، `fr`، `repeat()`، `gap`، `auto-fit`/`minmax`.
- `05-grid-advanced` — `grid-template-areas`، `grid-column/row` والـ span، `place-items`، `grid-auto-flow`، متى Flex ومتى Grid.
- `06-navbar-and-cards` — مشروع «نافبار + كروت منتجات» بـ Flexbox. **١١ خطوة**.
- `07-pricing-cards` — مشروع «كروت الأسعار» بـ Grid (٣ باقات، واحدة مميّزة). **١٠ خطوات**.
- `08-css-quiz-3` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u4-responsive «التصميم المتجاوب»
- `01-responsive-basics` — `meta viewport`، mobile-first، العرض المرن، `max-width:100%`، `img`، `min()` / `max()`.
- `02-media-queries` — `@media` (min-width/max-width)، breakpoints، `orientation`، `prefers-color-scheme`، `prefers-reduced-motion`، `hover`.
- `03-fluid-modern-units` — `clamp()`، `rem` للـ typography، `vw`، `aspect-ratio`، `object-fit`، `dvh`، container مرن.
- `04-landing-page` — **مشروع كبير**: Landing page كاملة (hero + features + testimonials + pricing + CTA + footer)، متجاوبة. **١٨ خطوة**، موبايل أول.
- `05-css-quiz-4` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u5-modern «CSS الحديثة والحركة»
- `01-custom-properties` — `--var` و`var()` وfallback، الـ scope، ثيمات light/dark بتبديل class، `color-scheme`.
- `02-transitions` — `transition` (property/duration/timing-function/delay)، hover effects، إيه اللي ينفع يتحرّك ولأ.
- `03-transforms` — `translate` `rotate` `scale` `skew`، `transform-origin`، تركيبهم، مقدمة 3D (`perspective`) وإمتى نستخدم transform بدل top/left.
- `04-animations` — `@keyframes`، `animation-*`، iteration/direction/fill-mode، `prefers-reduced-motion`.
- `05-modern-features` — `calc()`، `:is()` `:where()` `:has()`، CSS nesting، `backdrop-filter`، `filter`، `scroll-snap`، `position:sticky`، `accent-color`.
- `06-register-login-page` — مشروع «Register + Login في كارت واحد» (التبديل بين التبويبين بـ CSS فقط: radio + `:checked` أو `:has`)، بـ variables وtransitions. **١٢ خطوة**.
- `07-animated-ui` — مشروع «عناصر واجهة متحرّكة» (loader، زرار بـ ripple/shine، كارت بـ flip). **٩ خطوات**.
- `08-css-quiz-5` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u6-pro «احترف الـ CSS»
- `01-architecture` — reset/normalize، تسمية (BEM)، تنظيم الملفات، الـ utility vs component، الـ specificity المنخفضة.
- `02-accessible-css` — `:focus-visible`، التباين، حجم النص والـ rem، `prefers-reduced-motion`، إخفاء المحتوى للشاشة فقط، اتجاه RTL و logical properties (`margin-inline`, `padding-block`, `inset-inline`).
- `03-debugging-performance` — DevTools (inspect/computed/box model)، أخطاء شائعة وإزاي تلاقيها، الأداء (reflow، التحريك بالـ transform)، قائمة مراجعة.
- `04-portfolio-site` — مشروع ختامي «موقع Portfolio شخصي» (متجاوب + dark mode + animations). **١٦ خطوة**.
- `05-css-quiz-6` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

---
## JavaScript — `learn/src/javascript/`
**كل تمارين الـ JS** بتتكتب في `script.js` (`:::try js`) وتتختبر بـ `logs`/`out()`/`ev()`/الـ DOM. الأمثلة الثابتة بـ ```` ```js ```` و```` ```out ````. `console.log` هو الأساس في الوحدات الأولى.

### u1-first-steps «أولى الخطوات»
- `01-what-is-js` — إيه هي JavaScript وبتشتغل فين، `console.log`، ربط `<script>`، الـ comments، الأخطاء في Console، الـ statement والـ semicolon.
- `02-variables` — `let` `const` (و`var` للتعرّف)، التسمية، إعادة التعيين، لماذا `const` أولاً.
- `03-data-types` — string / number / boolean / `null` / `undefined`، `typeof`، التحويل التلقائي (مقدمة).
- `04-operators` — حسابية، مقارنة، `==` vs `===`، منطقية `&&` `||` `!`، assignment `+=` `++`، الأولوية.
- `05-strings` — template literals، `length`، indexing، `slice` `toUpperCase` `includes` `split` `trim` `replace` `padStart`.
- `06-numbers-math` — `Number()` `parseInt` `parseFloat` `isNaN`، `NaN` و`Infinity`، `toFixed`، كائن `Math` (`round` `floor` `ceil` `max` `min` `random`)، دقة الكسور.
- `07-js-quiz-1` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u2-control-flow «الشروط والتكرار»
- `01-conditions` — `if` / `else if` / `else`، truthy/falsy، المقارنات المركّبة، الـ early return (مقدمة).
- `02-switch-ternary` — `switch` و`break`، الـ ternary، `??` و`||` للقيم الافتراضية.
- `03-loops` — `for` `while` `do…while`، `break` `continue`، حلقات متداخلة.
- `04-loop-patterns` — FizzBuzz، مجموع وعدّاد، أنماط النجوم، البحث عن أكبر قيمة (بدون arrays — بـ range).
- `05-js-quiz-2` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u3-functions «الدوال»
- `01-function-basics` — declaration، parameters/arguments، `return`، default params، الدوال اللي من غير return.
- `02-function-expressions-arrows` — function expression، arrow function (الصيغ)، الدوال كقيم، IIFE.
- `03-scope-closures` — global/function/block scope، hoisting، الـ closures (مثال عدّاد).
- `04-callbacks-higher-order` — callbacks، دوال بتاخد دوال، `setTimeout` كمثال، مقدمة لـ map/filter.
- `05-js-quiz-3` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u4-data «البيانات: Arrays و Objects»
- `01-arrays` — إنشاء، index، `length`، `push/pop/shift/unshift`، `splice/slice`، `includes/indexOf`، `join`، `for…of`.
- `02-array-methods` — `forEach` `map` `filter` `find` `some` `every` `reduce` `sort` (مع comparator) و chaining.
- `03-objects` — properties/methods، dot vs bracket، `this`، `Object.keys/values/entries`، destructuring، spread، array of objects.
- `04-json-dates` — `JSON.stringify/parse`، عمل نسخة، `Date` (إنشاء، getters، تنسيق `toLocaleDateString('ar-EG')`).
- `05-sets-maps` — `Set` و`Map` ومتى تستخدمهم، إزالة التكرار.
- `06-js-quiz-4` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u5-dom «الـ DOM والأحداث»
- `01-dom-intro` — شجرة الـ DOM، `document`، `querySelector(All)` `getElementById`، `textContent` vs `innerHTML`.
- `02-changing-elements` — `classList` `style` `setAttribute` `createElement` `append` `remove` `dataset`.
- `03-events` — `addEventListener`، `click` `input` `keydown` `submit`، كائن `event`، `preventDefault`، bubbling و event delegation.
- `04-forms-input` — قراءة `value` و`checked`، `submit`، validation بالـ JS ورسائل الخطأ.
- `05-counter-app` — مشروع «عدّاد». **٧ خطوات**.
- `06-jokes-cards` — مشروع **«كروت نكت»**: مصفوفة نكت، زرار «نكتة جديدة»، كارت متصمّم، copy، favorite، تصفية بالفئة. **١٢ خطوة**.
- `07-todo-app` — مشروع «قائمة مهام» (إضافة/حذف/إنجاز/تصفية/عدّاد). **١٢ خطوة**.
- `08-js-quiz-5` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u6-browser «المتصفح والـ Async»
- `01-localstorage` — `localStorage` (set/get/remove)، تخزين JSON، حدود التخزين، الأمان (متخزّنش باسورد حقيقي).
- `02-timers-events-loop` — `setTimeout` `setInterval` `clearInterval`، الـ event loop (مفهوم)، callback hell.
- `03-promises-async-await` — `Promise` (pending/fulfilled/rejected)، `then/catch/finally`، `async/await`، `Promise.all`.
- `04-fetch-api` — `fetch`، `response.json()`، الـ status، POST بـ body، التعامل مع الأخطاء (الأمثلة الحيّة بتعتمد على `data:` URLs أو بيانات محلية؛ الشبكة مش مضمونة).
- `05-error-handling` — `try/catch/finally`، `throw` و`Error`، أنواع الأخطاء، debugging بـ console و breakpoints.
- `06-quiz-app` — مشروع «تطبيق كويز» (أسئلة من array، نتيجة، progress). **١٢ خطوة**.
- `07-register-login-app` — مشروع **«Register + Login بـ localStorage»**: فورم تسجيل، تسجيل دخول، حماية صفحة، logout، رسائل خطأ (مع تنبيه: ده تعليمي مش أمان حقيقي). **١٤ خطوة**.
- `08-js-quiz-6` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u7-advanced «JavaScript المتقدمة»
- `01-classes-oop` — `class` / `constructor` / methods / `extends` / `super` / getters / static / private `#`.
- `02-modern-js` — destructuring متقدم، spread/rest، optional chaining `?.`، nullish `??`، `Array.from`، `structuredClone`، tagged-basic.
- `03-modules-tooling` — مفهوم الـ modules (`import`/`export`)، npm، bundlers (مفهوم فقط)، Git مقدمة.
- `04-weather-dashboard` — مشروع «لوحة طقس» ببيانات محلية (cards، تحويل °C/°F، بحث). **١٢ خطوة**.
- `05-expense-tracker` — مشروع ختامي «متتبّع مصاريف» (localStorage + فلتر + إجمالي + رسم أعمدة بسيط بـ CSS). **١٥ خطوة**.
- `06-js-quiz-7` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

---
## Tailwind — `learn/src/tailwind/`  (`runtime: tailwind` في **كل** ملف — Tailwind v4 browser build)
في أي HTML لازم السطر ده في `<head>` (بيتحوّل لنسخة محلية تلقائياً): `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`.
بعد تحميل Tailwind الاختبارات بتستنى ١٤٠ms تلقائياً. ألوان v4 بـ oklch؛ استخدم `colorIs('sel','background-color','#155dfc')` (hex تقريبي من palette v4).

### u1-start «البداية مع Tailwind»
- `01-what-is-tailwind` — utility-first vs CSS عادي، إيه الميزة والعيب، الـ CDN في v4، أول كلاسات.
- `02-spacing-sizing` — `p-*` `m-*` `space-x/y-*` `gap-*` `w-*` `h-*` `max-w-*` `size-*`، المقياس (4px)، القيم الاختيارية `w-[320px]`.
- `03-colors-typography` — `text-*` `bg-*` ألوان v4، `/opacity`، `text-lg` `font-bold` `leading-*` `tracking-*` `text-center`، `truncate`.
- `04-borders-shadows` — `border-*` `rounded-*` `shadow-*` `ring-*` `outline`، `divide-*`.
- `05-tw-quiz-1` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u2-layout «التخطيط والتجاوب»
- `01-flex-grid` — `flex` `items-*` `justify-*` `gap-*` `grow` `flex-col`، `grid` `grid-cols-*` `col-span-*`.
- `02-responsive-design` — prefixes `sm:` `md:` `lg:` `xl:`، mobile-first، `max-*:`، `hidden md:block`، `container`.
- `03-states-dark-mode` — `hover:` `focus:` `active:` `disabled:` `group-hover:` `peer-*`، `dark:` (media + class variant بـ `@custom-variant`)، `transition`.
- `04-pricing-page` — مشروع «صفحة الأسعار» (٣ كروت، toggle شهري/سنوي بـ JS بسيط). **١٠ خطوات**.
- `05-tw-quiz-2` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).

### u3-pro «احترف Tailwind»
- `01-customizing-theme` — `@theme` (ألوان/خطوط/spacing مخصصة)، arbitrary values/properties، `@import "tailwindcss"` (شرح)، `@layer`.
- `02-components-reuse` — مشكلة التكرار، استخراج component (JS template/partials)، `@apply` (إمتى ومتى لأ)، `@utility`، كتابة classes مقروءة.
- `03-animation-transitions` — `transition-*` `duration-*` `ease-*` `animate-*` (spin/pulse/bounce/ping)، `@keyframes` مخصصة داخل `@theme`، `transform`.
- `04-landing-page-tw` — مشروع «Landing page لمنتج» كاملة بـ Tailwind، متجاوبة + dark. **١٢ خطوة**.
- `05-dashboard-ui` — مشروع «لوحة تحكم» (sidebar، stat cards، جدول، responsive). **١٠ خطوات**.
- `06-tw-quiz-3` — اختبار وحدة (`type: quiz`، ٨–١٢ سؤال).
