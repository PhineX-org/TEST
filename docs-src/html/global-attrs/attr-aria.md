---
id: attr-aria
kind: attribute
cat: global-attrs
chip: aria-*
title: خصائص ARIA
en: ARIA aria-* attributes
status: stable
support: all
mdn: Global_attributes/aria-label
summary: خصائص aria-* بتضيف معلومات إتاحة لقارئ الشاشة: aria-label للاسم، aria-expanded للحالة، aria-live للإعلان، aria-hidden للإخفاء. بتكمّل HTML ومش بتغيّر السلوك.
keywords: aria-label, aria-labelledby, aria-describedby, aria-hidden, aria-expanded, aria-live, aria-current, aria-checked, إتاحة, accessibility, WAI-ARIA
related: attr-role, attr-tabindex, button, attr-hidden, attr-inert
---

## intro

**ARIA** (Accessible Rich Internet Applications) مجموعة خصائص بتبدأ بـ `aria-` وظيفتها **تدّي قارئ الشاشة معلومات مش ظاهرة في HTML**. زي: «الزرار ده اسمه إيه؟» (`aria-label`)، «القايمة دي مفتوحة ولا مقفولة؟» (`aria-expanded`)، «اعلن التغيير ده فوراً» (`aria-live`)، «تجاهل العنصر ده» (`aria-hidden`).

مهم تفهم: ARIA **بتغيّر اللي قارئ الشاشة بيعرفه، مش اللي المتصفح بيعمله**. يعني `aria-expanded="true"` بتقول للقارئ «مفتوح» لكن مبتفتحش حاجة. إنت لازم تفتح بالجافاسكربت وتحدّث الخاصية. وده نفس قاعدة [[attr-role]]: استخدم HTML الأصلي أولاً (`<label>` و`<button>` و`<details>`)، وARIA لما مفيش بديل.

> [!warn] **ARIA الغلط أسوأ من مفيش ARIA.** كل خاصية بتغيّر الحقيقة اللي قارئ الشاشة بيسمعها، فتأكد إنها صح ومحدّثة.

## try

```html
<button aria-label="إغلاق" style="padding:6px 12px; font-size:18px">✕</button>
<p>الزرار شكله أيقونة بس، والـ <code>aria-label</code> بتديه اسم يتقرا.</p>
```

## syntax

```html nolive
<button aria-label="إغلاق">✕</button>
<button aria-expanded="false" aria-controls="menu">القائمة</button>
<div aria-live="polite">رسالة جديدة</div>
```

- `aria-label` — **اسم** مباشر للعنصر.
- `aria-expanded` — **حالة** مفتوح/مقفول.
- `aria-live` — **إعلان** تغييرات المحتوى.
- `aria-hidden` — **إخفاء** من قارئ الشاشة.

## use

- اسم لعنصر أيقونة بدون نص (`aria-label`).
- ربط عنصر بنص وصف (`aria-describedby`).
- حالة عنصر تفاعلي (`aria-expanded`، `aria-pressed`، `aria-checked`).
- إعلان رسائل ديناميكية (`aria-live`).

## avoid

- متحطّش `aria-label` لو في نص ظاهر كفاية.
- متخبّيش عنصر مهم بـ `aria-hidden` من غير داعي (خصوصاً لو فيه فوكس).

## section: أهم الخصائص

- **تسمية:** `aria-label` و`aria-labelledby` و`aria-describedby`.
- **حالة:** `aria-expanded` و`aria-pressed` و`aria-checked` و`aria-selected` و`aria-disabled` و`aria-current`.
- **علاقات:** `aria-controls` و`aria-owns`.
- **محتوى حي:** `aria-live` و`aria-atomic`.
- **إخفاء:** `aria-hidden`.

## examples

### 1) زرار قايمة مع حالة
مثال على aria-expanded.

```html
<button id="b" aria-expanded="false" aria-controls="m" onclick="const o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', !o); m.hidden = o;">القائمة ▾</button>
<ul id="m" hidden><li>الصفحة الرئيسية</li><li>الدروس</li></ul>
```

- الحالة في `aria-expanded` لازم تتحدّث مع الفتح.
- `aria-controls` بيشاور على العنصر اللي بيتحكم فيه.
- القارئ بيعلن «مفتوح» أو «مطوي».

### 2) وصف لحقل
مثال على aria-describedby.

```html
<label for="p">كلمة السر</label>
<input id="p" type="password" aria-describedby="hint">
<p id="hint" style="color:#64748b; font-size:.9em">8 حروف على الأقل.</p>
```

- قارئ الشاشة بيقرا التلميح بعد اسم الحقل.
- النص الوصفي بيفضل ظاهر للكل.
- ده أفضل من `title` للتلميحات.

### 3) رسالة حيّة
مثال على aria-live.

```html
<div id="s" aria-live="polite" style="min-height:24px; background:#dcfce7; padding:6px"></div>
<button onclick="document.getElementById('s').textContent = 'تم الحفظ ' + new Date().toLocaleTimeString('ar-EG')">احفظ</button>
```

- أي تغيير في المحتوى بيتعلن لقارئ الشاشة.
- `polite` بيستنى لحد ما يخلص الكلام.
- `assertive` للمقاطعة (للأخطاء المهمة).

### 4) تسمية بالربط
مثال على aria-labelledby.

```html
<h3 id="t">إعدادات الحساب</h3>
<section aria-labelledby="t" style="border:1px solid #cbd5e1; padding:8px">محتوى الإعدادات…</section>
```

- اسم القسم بيتاخد من العنوان الظاهر.
- مناسب مع `section` و`nav` المتعددة.
- أحسن من تكرار النص في `aria-label`.

### 5) إخفاء الزينة
مثال على aria-hidden.

```html
<button>حفظ <span aria-hidden="true">💾</span></button>
```

- الأيقونة شكلية فبنخفيها من القارئ.
- الزرار يتقري «حفظ» بس.
- متحطّهاش على عنصر ياخد فوكس.

## mistakes

### aria-expanded من غير تحديث
```html bad
<button aria-expanded="false" onclick="menu.hidden=false">فتح</button>
```
```html good
<button aria-expanded="false" onclick="menu.hidden=false; this.setAttribute('aria-expanded','true')">فتح</button>
```
ليه؟ الخاصية مش بتتغيّر لوحدها: لازم تحدّثها مع كل تغيير.

### aria-label بدل نص ظاهر
```html bad
<button aria-label="إرسال"></button>
```
```html good
<button>إرسال</button>
```
ليه؟ النص الظاهر أفضل للكل (الترجمة والبحث). الـ aria-label للأيقونات.

## a11y

- جرّب بقارئ شاشة حقيقي: NVDA أو VoiceOver أو TalkBack.
- استخدم أدوات DevTools (Accessibility tab) للتأكد من الأسماء والحالات.
- العنصر الأصلي بيدّيك معظم ده من غير ARIA.

## quiz

### وظيفة `aria-label`؟
- [x] اسم لعنصر لقارئ الشاشة
- [ ] تغيير الشكل
- [ ] إخفاء العنصر
- [ ] تنسيق
اسم متاح.

### هل `aria-expanded="true"` بيفتح القايمة؟
- [x] لأ، بيوصف الحالة بس
- [ ] أيوه
- [ ] أحياناً
- [ ] بس على الموبايل
لازم تفتحها بنفسك.

### إيه المشكلة في `aria-hidden` على زرار؟
- [x] القارئ ميعرفش بيه بس الفوكس لسه
- [ ] بطيء
- [ ] بيوقف الجافاسكربت
- [ ] مفيش مشكلة
تعارض إتاحة.

## refs

- [MDN: ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes)
- [W3C: WAI-ARIA](https://www.w3.org/TR/wai-aria/)
